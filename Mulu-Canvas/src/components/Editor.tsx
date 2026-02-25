'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useApp } from '@/store/AppContext';
import { getTranslation, TranslationKey } from '@/lib/i18n';
import { BrushType, LayerMode, Stroke, Point, Artwork, WALL_THICKNESS } from '@/lib/types';
import { Language } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Pen, 
  Sparkles, 
  GlassWater, 
  Droplets, 
  Lightbulb,
  Box,
  Layers,
  Square,
  Rotate3D,
  Sun,
  Palette,
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useDeviceOrientation, useMouseGravity } from '@/hooks/useDeviceOrientation';
import { updatePhysics, PhysicsBody, createPhysicsBody } from '@/lib/physics';

function t(language: Language, key: TranslationKey): string {
  return getTranslation(language, key);
}

const BRUSH_CONFIG: Record<BrushType, { icon: React.ReactNode; label: TranslationKey }> = {
  pen: { icon: <Pen className="w-5 h-5" />, label: 'pen' },
  fur: { icon: <Sparkles className="w-5 h-5" />, label: 'fur' },
  glass: { icon: <GlassWater className="w-5 h-5" />, label: 'glass' },
  slime: { icon: <Droplets className="w-5 h-5" />, label: 'slime' },
  light: { icon: <Lightbulb className="w-5 h-5" />, label: 'light' },
};

const LAYER_CONFIG: Record<LayerMode, { icon: React.ReactNode; label: TranslationKey }> = {
  background: { icon: <Layers className="w-5 h-5" />, label: 'background' },
  wall: { icon: <Square className="w-5 h-5" />, label: 'wall' },
  object: { icon: <Box className="w-5 h-5" />, label: 'object' },
};

export default function Editor() {
  const { state, dispatch, goToGallery, saveCurrentArtwork } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const gravityRef = useRef<{ x: number; y: number }>({ x: 0, y: 1 });
  
  // Track if we need to save
  const needsSaveRef = useRef(false);
  
  const { currentArtwork, brushSettings, physics, currentLayerMode, is3DEffectEnabled, rotation3D } = state.editor;
  const language = state.language;

  // Device orientation for gravity (mobile)
  const handleGravityChange = useCallback((gravity: { x: number; y: number }) => {
    gravityRef.current = gravity;
    
    if (physics.isPlaying) {
      dispatch({ type: 'SET_GRAVITY', payload: gravity });
    }
    
    if (is3DEffectEnabled) {
      dispatch({ 
        type: 'SET_3D_ROTATION', 
        payload: { x: gravity.y * 15, y: -gravity.x * 15 }
      });
    }
  }, [dispatch, physics.isPlaying, is3DEffectEnabled]);
  
  useDeviceOrientation({
    onGravityChange: handleGravityChange,
  });
  
  useMouseGravity(containerRef, handleGravityChange);

  // Physics simulation loop
  useEffect(() => {
    if (!physics.isPlaying || !currentArtwork) return;
    
    const simulate = (timestamp: number) => {
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      
      if (deltaTime > 0 && deltaTime < 100) {
        const bodies: PhysicsBody[] = [];
        for (const stroke of currentArtwork.strokes) {
          const body = createPhysicsBody(stroke);
          if (body) bodies.push(body);
        }
        
        const updatedBodies = updatePhysics(
          bodies,
          physics.gravity,
          currentArtwork.width,
          currentArtwork.height,
          deltaTime
        );
        
        const updatedStrokes = currentArtwork.strokes.map(stroke => {
          const body = updatedBodies.find(b => b.strokeId === stroke.id);
          if (body && stroke.layerMode === 'object') {
            return {
              ...stroke,
              points: body.points,
              bounds: body.bounds,
              velocity: body.velocity,
            };
          }
          return stroke;
        });
        
        dispatch({ type: 'UPDATE_ARTWORK_STROKES', payload: updatedStrokes });
        needsSaveRef.current = true;
      }
      
      animationFrameRef.current = requestAnimationFrame(simulate);
    };
    
    lastTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(simulate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [physics.isPlaying, physics.gravity, currentArtwork, dispatch]);

  // Render canvas - use a ref to track artwork for rendering
  const artworkRef = useRef<Artwork | null>(null);
  const currentStrokeRef = useRef<Point[]>([]);
  
  useEffect(() => {
    artworkRef.current = currentArtwork;
  }, [currentArtwork]);
  
  useEffect(() => {
    currentStrokeRef.current = currentStroke;
  }, [currentStroke]);

  // Main render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const render = () => {
      if (!artworkRef.current) return;
      
      renderCanvas(
        ctx, 
        canvas, 
        artworkRef.current, 
        currentStrokeRef.current, 
        brushSettings, 
        currentLayerMode, 
        gravityRef.current
      );
    };
    
    render();
    
    // Animation loop for continuous rendering when physics is playing
    let frameId: number;
    const animate = () => {
      render();
      frameId = requestAnimationFrame(animate);
    };
    
    if (physics.isPlaying) {
      frameId = requestAnimationFrame(animate);
    } else {
      render();
    }
    
    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [brushSettings, currentLayerMode, physics.isPlaying]);
  
  // Mouse/Touch event handlers
  const getPointerPosition = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
      pressure: e.pressure || 0.5,
    };
  };
  
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (physics.isPlaying && currentLayerMode !== 'background') return;
    
    setIsDrawing(true);
    const point = getPointerPosition(e);
    setCurrentStroke([point]);
  };
  
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const point = getPointerPosition(e);
    setCurrentStroke(prev => [...prev, point]);
  };
  
  const handlePointerUp = async () => {
    if (!isDrawing || currentStroke.length < 2) {
      setIsDrawing(false);
      setCurrentStroke([]);
      return;
    }
    
    setIsDrawing(false);
    
    const stroke: Stroke = {
      id: uuidv4(),
      layerMode: currentLayerMode,
      brushType: brushSettings.type,
      points: currentStroke,
      color: brushSettings.color,
      size: brushSettings.size,
      opacity: brushSettings.opacity,
      furLength: brushSettings.furLength,
      blurLevel: brushSettings.blurLevel,
      elasticity: brushSettings.elasticity,
      lightIntensity: brushSettings.lightIntensity,
      velocity: { x: 0, y: 0 },
    };
    
    dispatch({ type: 'ADD_STROKE', payload: stroke });
    setCurrentStroke([]);
    
    // Generate preview and save
    setTimeout(() => {
      saveWithPreview();
    }, 50);
  };
  
  const saveWithPreview = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || !currentArtwork) return;
    
    const previewCanvas = document.createElement('canvas');
    const previewCtx = previewCanvas.getContext('2d');
    if (previewCtx) {
      previewCanvas.width = 320;
      previewCanvas.height = 240;
      previewCtx.drawImage(canvas, 0, 0, 320, 240);
      const previewImage = previewCanvas.toDataURL('image/png');
      
      const updatedArtwork: Artwork = {
        ...currentArtwork,
        previewImage,
        updatedAt: Date.now(),
      };
      
      dispatch({ type: 'UPDATE_ARTWORK', payload: updatedArtwork });
      await saveCurrentArtwork();
    }
  }, [currentArtwork, dispatch, saveCurrentArtwork]);
  
  const togglePhysics = () => {
    dispatch({ type: 'SET_PHYSICS_PLAYING', payload: !physics.isPlaying });
  };
  
  const toggle3DEffect = () => {
    dispatch({ type: 'TOGGLE_3D_EFFECT' });
  };
  
  const updateBackgroundColor = useCallback((color: string) => {
    if (!currentArtwork) return;
    
    const updatedArtwork: Artwork = {
      ...currentArtwork,
      backgroundColor: color,
      updatedAt: Date.now(),
    };
    
    dispatch({ type: 'UPDATE_ARTWORK', payload: updatedArtwork });
  }, [currentArtwork, dispatch]);
  
  const updateAmbientSettings = useCallback((color: string, intensity: number) => {
    if (!currentArtwork) return;
    
    const updatedArtwork: Artwork = {
      ...currentArtwork,
      ambientColor: color,
      ambientIntensity: intensity,
      updatedAt: Date.now(),
    };
    
    dispatch({ type: 'UPDATE_ARTWORK', payload: updatedArtwork });
  }, [currentArtwork, dispatch]);
  
  const handleGoToGallery = useCallback(async () => {
    await saveWithPreview();
    goToGallery();
  }, [saveWithPreview, goToGallery]);

  if (!currentArtwork) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleGoToGallery} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t(language, 'backToGallery')}
          </Button>
          <span className="text-gray-800 font-medium truncate max-w-[200px]">
            {currentArtwork.name}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Play/Pause */}
          <Button
            variant={physics.isPlaying ? "default" : "outline"}
            size="sm"
            onClick={togglePhysics}
            className={physics.isPlaying 
              ? "bg-green-500 hover:bg-green-600 text-white" 
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }
          >
            {physics.isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-1" />
                {t(language, 'pause')}
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" />
                {t(language, 'play')}
              </>
            )}
          </Button>
          
          {/* 3D Effect Toggle */}
          <Button
            variant={is3DEffectEnabled ? "default" : "outline"}
            size="sm"
            onClick={toggle3DEffect}
            className={is3DEffectEnabled 
              ? "bg-purple-500 hover:bg-purple-600 text-white" 
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }
          >
            <Rotate3D className="w-4 h-4" />
          </Button>
          
          {/* Background Color */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                <Palette className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 bg-white" align="end">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">{t(language, 'backgroundColor')}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={currentArtwork.backgroundColor || '#ffffff'}
                    onChange={(e) => updateBackgroundColor(e.target.value)}
                    className="w-10 h-8 p-1 bg-white border-gray-300"
                  />
                  <Input
                    value={currentArtwork.backgroundColor || '#ffffff'}
                    onChange={(e) => updateBackgroundColor(e.target.value)}
                    className="flex-1 h-8 text-xs bg-white border-gray-300"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Ambient Settings */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                <Sun className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 bg-white" align="end">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">{t(language, 'ambientColor')}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={currentArtwork.ambientColor}
                    onChange={(e) => updateAmbientSettings(e.target.value, currentArtwork.ambientIntensity)}
                    className="w-10 h-8 p-1 bg-white border-gray-300"
                  />
                  <Input
                    value={currentArtwork.ambientColor}
                    onChange={(e) => updateAmbientSettings(e.target.value, currentArtwork.ambientIntensity)}
                    className="flex-1 h-8 text-xs bg-white border-gray-300"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500">
                    {t(language, 'ambientIntensity')}: {currentArtwork.ambientIntensity.toFixed(2)}
                  </Label>
                  <Slider
                    value={[currentArtwork.ambientIntensity]}
                    onValueChange={(v) => updateAmbientSettings(currentArtwork.ambientColor, v[0])}
                    min={0}
                    max={1}
                    step={0.01}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar - Size Settings */}
        <aside className="w-16 bg-gray-50 border-r border-gray-200 p-2 flex flex-col items-center gap-2">
          <Label className="text-[10px] text-gray-500 uppercase tracking-wide">{t(language, 'size')}</Label>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div 
              className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center"
              style={{ 
                width: `${Math.min(32, Math.max(8, brushSettings.size))}px`,
                height: `${Math.min(32, Math.max(8, brushSettings.size))}px`,
                backgroundColor: brushSettings.color,
              }}
            />
          </div>
          <Slider
            orientation="vertical"
            value={[brushSettings.size]}
            onValueChange={(v) => dispatch({ type: 'SET_BRUSH_SETTINGS', payload: { size: v[0] } })}
            min={1}
            max={50}
            step={1}
            className="h-32"
          />
          <span className="text-xs text-gray-600 font-medium">{brushSettings.size}</span>
        </aside>
        
        {/* Canvas Area */}
        <main 
          ref={containerRef}
          className="flex-1 flex items-center justify-center p-4 bg-gray-100 overflow-hidden"
          style={{
            perspective: is3DEffectEnabled ? '1000px' : 'none',
          }}
        >
          <div
            style={{
              transform: is3DEffectEnabled 
                ? `rotateX(${rotation3D.x}deg) rotateY(${rotation3D.y}deg)` 
                : 'none',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.1s ease-out',
            }}
          >
            <canvas
              ref={canvasRef}
              width={currentArtwork.width}
              height={currentArtwork.height}
              className="shadow-xl rounded-lg touch-none cursor-crosshair"
              style={{
                maxWidth: '100%',
                maxHeight: 'calc(100vh - 220px)',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            />
          </div>
        </main>
        
        {/* Right Sidebar - Brush-specific Settings */}
        <aside className="w-20 bg-gray-50 border-l border-gray-200 p-2 flex flex-col items-center gap-1 overflow-y-auto">
          <Label className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">
            {brushSettings.type === 'pen' && t(language, 'opacity')}
            {brushSettings.type === 'fur' && t(language, 'furLength')}
            {brushSettings.type === 'glass' && t(language, 'blurLevel')}
            {brushSettings.type === 'slime' && t(language, 'elasticity')}
            {brushSettings.type === 'light' && t(language, 'lightIntensity')}
          </Label>
          
          {/* Opacity for Pen */}
          {brushSettings.type === 'pen' && (
            <>
              <Slider
                orientation="vertical"
                value={[brushSettings.opacity]}
                onValueChange={(v) => dispatch({ type: 'SET_BRUSH_SETTINGS', payload: { opacity: v[0] } })}
                min={0.1}
                max={1}
                step={0.05}
                className="h-24"
              />
              <span className="text-xs text-gray-600">{Math.round(brushSettings.opacity * 100)}%</span>
            </>
          )}
          
          {/* Fur Length */}
          {brushSettings.type === 'fur' && (
            <>
              <Slider
                orientation="vertical"
                value={[brushSettings.furLength]}
                onValueChange={(v) => dispatch({ type: 'SET_BRUSH_SETTINGS', payload: { furLength: v[0] } })}
                min={5}
                max={50}
                step={1}
                className="h-24"
              />
              <span className="text-xs text-gray-600">{brushSettings.furLength}px</span>
            </>
          )}
          
          {/* Blur Level */}
          {brushSettings.type === 'glass' && (
            <>
              <Slider
                orientation="vertical"
                value={[brushSettings.blurLevel]}
                onValueChange={(v) => dispatch({ type: 'SET_BRUSH_SETTINGS', payload: { blurLevel: v[0] } })}
                min={1}
                max={20}
                step={1}
                className="h-24"
              />
              <span className="text-xs text-gray-600">{brushSettings.blurLevel}</span>
            </>
          )}
          
          {/* Elasticity */}
          {brushSettings.type === 'slime' && (
            <>
              <Slider
                orientation="vertical"
                value={[brushSettings.elasticity]}
                onValueChange={(v) => dispatch({ type: 'SET_BRUSH_SETTINGS', payload: { elasticity: v[0] } })}
                min={0.1}
                max={1}
                step={0.05}
                className="h-24"
              />
              <span className="text-xs text-gray-600">{Math.round(brushSettings.elasticity * 100)}%</span>
            </>
          )}
          
          {/* Light Intensity */}
          {brushSettings.type === 'light' && (
            <>
              <Slider
                orientation="vertical"
                value={[brushSettings.lightIntensity]}
                onValueChange={(v) => dispatch({ type: 'SET_BRUSH_SETTINGS', payload: { lightIntensity: v[0] } })}
                min={0.1}
                max={1}
                step={0.05}
                className="h-24"
              />
              <span className="text-xs text-gray-600">{Math.round(brushSettings.lightIntensity * 100)}%</span>
            </>
          )}
          
          <div className="mt-auto pt-2 border-t border-gray-200 w-full">
            <Label className="text-[10px] text-gray-500 uppercase tracking-wide">{t(language, 'color')}</Label>
            <Input
              type="color"
              value={brushSettings.color}
              onChange={(e) => dispatch({ type: 'SET_BRUSH_SETTINGS', payload: { color: e.target.value } })}
              className="w-full h-8 p-1 mt-1 bg-white border-gray-300"
            />
          </div>
        </aside>
        
        {/* Bottom Toolbar - Floating */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          {/* Layer Mode Selector */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-1 flex gap-1">
            {(['background', 'wall', 'object'] as LayerMode[]).map((mode) => (
              <TooltipProvider key={mode}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => dispatch({ type: 'SET_LAYER_MODE', payload: mode })}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                        ${currentLayerMode === mode 
                          ? 'bg-black text-white shadow-md' 
                          : 'text-gray-600 hover:bg-gray-100'
                        }
                      `}
                    >
                      {LAYER_CONFIG[mode].icon}
                      <span className="text-sm font-medium">{t(language, LAYER_CONFIG[mode].label)}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {t(language, `${mode}Tooltip` as TranslationKey)}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          
          {/* Brush Type Selector */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-1 flex gap-1">
            {(['pen', 'fur', 'glass', 'slime', 'light'] as BrushType[]).map((brush) => (
              <TooltipProvider key={brush}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => dispatch({ type: 'SET_BRUSH_SETTINGS', payload: { type: brush } })}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                        ${brushSettings.type === brush 
                          ? 'bg-orange-500 text-white shadow-md' 
                          : 'text-gray-600 hover:bg-gray-100'
                        }
                      `}
                    >
                      {BRUSH_CONFIG[brush].icon}
                      <span className="text-sm font-medium">{t(language, BRUSH_CONFIG[brush].label)}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {t(language, `${brush}Tooltip` as TranslationKey)}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Render canvas function
function renderCanvas(
  ctx: CanvasRenderingContext2D, 
  canvas: HTMLCanvasElement,
  artwork: Artwork,
  currentStroke: Point[],
  brushSettings: typeof import('@/lib/types').DEFAULT_BRUSH_SETTINGS,
  currentLayerMode: LayerMode,
  gravity: { x: number; y: number }
) {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw background color
  ctx.fillStyle = artwork.backgroundColor || '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw ambient light overlay
  const ambientR = parseInt(artwork.ambientColor.slice(1, 3), 16);
  const ambientG = parseInt(artwork.ambientColor.slice(3, 5), 16);
  const ambientB = parseInt(artwork.ambientColor.slice(5, 7), 16);
  ctx.fillStyle = `rgba(${ambientR}, ${ambientG}, ${ambientB}, ${artwork.ambientIntensity})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw wall borders (dashed line)
  ctx.strokeStyle = 'rgba(180, 180, 180, 0.4)';
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 4]);
  ctx.strokeRect(WALL_THICKNESS, WALL_THICKNESS, 
    canvas.width - WALL_THICKNESS * 2, 
    canvas.height - WALL_THICKNESS * 2);
  ctx.setLineDash([]);
  
  // Draw strokes by layer mode order
  const layers: LayerMode[] = ['background', 'wall', 'object'];
  
  for (const layer of layers) {
    const layerStrokes = artwork.strokes.filter(s => s.layerMode === layer);
    for (const stroke of layerStrokes) {
      drawStroke(ctx, stroke, gravity);
    }
  }
  
  // Draw current stroke
  if (currentStroke.length > 1) {
    drawCurrentStroke(ctx, currentStroke, brushSettings, currentLayerMode);
  }
  
  // Draw light effects
  const lightStrokes = artwork.strokes.filter(s => s.brushType === 'light');
  for (const stroke of lightStrokes) {
    applyLightEffect(ctx, stroke, artwork.strokes);
  }
}

function drawStroke(ctx: CanvasRenderingContext2D, stroke: Stroke, gravity: { x: number; y: number }) {
  if (stroke.points.length < 2) return;
  
  ctx.save();
  ctx.globalAlpha = stroke.opacity;
  
  switch (stroke.brushType) {
    case 'pen':
      drawPenStroke(ctx, stroke);
      break;
    case 'fur':
      drawFurStroke(ctx, stroke, gravity);
      break;
    case 'glass':
      drawGlassStroke(ctx, stroke);
      break;
    case 'slime':
      drawSlimeStroke(ctx, stroke);
      break;
    case 'light':
      drawLightStroke(ctx, stroke);
      break;
  }
  
  ctx.restore();
}

function drawCurrentStroke(
  ctx: CanvasRenderingContext2D, 
  points: Point[], 
  settings: Stroke,
  _layerMode: LayerMode
) {
  if (points.length < 2) return;
  
  ctx.save();
  ctx.globalAlpha = settings.opacity;
  
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  
  for (let i = 1; i < points.length; i++) {
    const midX = (points[i - 1].x + points[i].x) / 2;
    const midY = (points[i - 1].y + points[i].y) / 2;
    ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, midX, midY);
  }
  
  ctx.strokeStyle = settings.color;
  ctx.lineWidth = settings.size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
  
  ctx.restore();
}

function drawPenStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
  ctx.beginPath();
  ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
  
  for (let i = 1; i < stroke.points.length; i++) {
    const midX = (stroke.points[i - 1].x + stroke.points[i].x) / 2;
    const midY = (stroke.points[i - 1].y + stroke.points[i].y) / 2;
    ctx.quadraticCurveTo(stroke.points[i - 1].x, stroke.points[i - 1].y, midX, midY);
  }
  
  ctx.strokeStyle = stroke.color;
  ctx.lineWidth = stroke.size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
}

function drawFurStroke(ctx: CanvasRenderingContext2D, stroke: Stroke, gravity: { x: number; y: number }) {
  const furLength = stroke.furLength || 20;
  
  // Draw main stroke
  ctx.beginPath();
  ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
  
  for (let i = 1; i < stroke.points.length; i++) {
    const midX = (stroke.points[i - 1].x + stroke.points[i].x) / 2;
    const midY = (stroke.points[i - 1].y + stroke.points[i].y) / 2;
    ctx.quadraticCurveTo(stroke.points[i - 1].x, stroke.points[i - 1].y, midX, midY);
  }
  
  ctx.strokeStyle = stroke.color;
  ctx.lineWidth = stroke.size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
  
  // Draw fur strands
  for (let i = 0; i < stroke.points.length; i += 3) {
    const point = stroke.points[i];
    const prevPoint = stroke.points[Math.max(0, i - 1)];
    const nextPoint = stroke.points[Math.min(stroke.points.length - 1, i + 1)];
    
    const dx = nextPoint.x - prevPoint.x;
    const dy = nextPoint.y - prevPoint.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    
    const nx = -dy / len;
    const ny = dx / len;
    
    for (let side = -1; side <= 1; side += 2) {
      const strandLen = furLength * (0.5 + Math.random() * 0.5);
      
      let endX = point.x + nx * strandLen * side;
      let endY = point.y + ny * strandLen * side;
      
      endX += gravity.x * furLength * 0.5;
      endY += gravity.y * furLength * 0.8;
      
      const ctrlX = point.x + nx * strandLen * 0.5 * side + gravity.x * furLength * 0.3;
      const ctrlY = point.y + ny * strandLen * 0.5 * side + gravity.y * furLength * 0.5;
      
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = Math.max(1, stroke.size * 0.3);
      ctx.globalAlpha = stroke.opacity * 0.7;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
  }
}

function drawGlassStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
  const blurLevel = stroke.blurLevel || 5;
  
  ctx.save();
  ctx.filter = `blur(${blurLevel}px)`;
  
  ctx.beginPath();
  ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
  
  for (let i = 1; i < stroke.points.length; i++) {
    const midX = (stroke.points[i - 1].x + stroke.points[i].x) / 2;
    const midY = (stroke.points[i - 1].y + stroke.points[i].y) / 2;
    ctx.quadraticCurveTo(stroke.points[i - 1].x, stroke.points[i - 1].y, midX, midY);
  }
  
  ctx.strokeStyle = stroke.color;
  ctx.lineWidth = stroke.size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.globalAlpha = 0.6;
  ctx.stroke();
  ctx.restore();
  
  // Highlight
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
  
  for (let i = 1; i < stroke.points.length; i++) {
    const midX = (stroke.points[i - 1].x + stroke.points[i].x) / 2;
    const midY = (stroke.points[i - 1].y + stroke.points[i].y) / 2;
    ctx.quadraticCurveTo(stroke.points[i - 1].x, stroke.points[i - 1].y, midX, midY);
  }
  
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.lineWidth = stroke.size * 0.4;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.restore();
  
  // Outer glow
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
  
  for (let i = 1; i < stroke.points.length; i++) {
    const midX = (stroke.points[i - 1].x + stroke.points[i].x) / 2;
    const midY = (stroke.points[i - 1].y + stroke.points[i].y) / 2;
    ctx.quadraticCurveTo(stroke.points[i - 1].x, stroke.points[i - 1].y, midX, midY);
  }
  
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = stroke.size * 1.5;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.restore();
}

function drawSlimeStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
  const bounds = stroke.bounds || calculateStrokeBounds(stroke.points);
  const centerX = (bounds.minX + bounds.maxX) / 2;
  const centerY = (bounds.minY + bounds.maxY) / 2;
  const radius = Math.max(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY) / 2 || stroke.size * 2;
  
  ctx.beginPath();
  
  if (stroke.points.length === 2) {
    ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.size, 0, Math.PI * 2);
  } else {
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    
    for (let i = 1; i < stroke.points.length; i++) {
      const midX = (stroke.points[i - 1].x + stroke.points[i].x) / 2;
      const midY = (stroke.points[i - 1].y + stroke.points[i].y) / 2;
      ctx.quadraticCurveTo(stroke.points[i - 1].x, stroke.points[i - 1].y, midX, midY);
    }
  }
  
  const gradient = ctx.createRadialGradient(
    centerX - radius * 0.3,
    centerY - radius * 0.3,
    0,
    centerX,
    centerY,
    radius
  );
  
  gradient.addColorStop(0, lightenColor(stroke.color, 60));
  gradient.addColorStop(0.3, lightenColor(stroke.color, 30));
  gradient.addColorStop(0.6, stroke.color);
  gradient.addColorStop(1, darkenColor(stroke.color, 40));
  
  ctx.fillStyle = gradient;
  ctx.fill();
  
  // Glossy highlight
  ctx.beginPath();
  ctx.arc(centerX - radius * 0.25, centerY - radius * 0.25, radius * 0.3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fill();
  
  ctx.strokeStyle = darkenColor(stroke.color, 30);
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawLightStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
  const intensity = stroke.lightIntensity || 0.5;
  
  for (const point of stroke.points) {
    const radius = stroke.size * 4;
    const gradient = ctx.createRadialGradient(
      point.x, point.y, 0,
      point.x, point.y, radius
    );
    
    gradient.addColorStop(0, lightenColor(stroke.color, 100));
    gradient.addColorStop(0.2, stroke.color);
    gradient.addColorStop(0.5, `${stroke.color}80`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.globalAlpha = intensity;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(point.x, point.y, stroke.size * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = intensity;
    ctx.fill();
  }
}

function applyLightEffect(ctx: CanvasRenderingContext2D, lightStroke: Stroke, allStrokes: Stroke[]) {
  const intensity = lightStroke.lightIntensity || 0.5;
  
  for (const lightPoint of lightStroke.points) {
    const lightRadius = lightStroke.size * 8;
    
    for (const stroke of allStrokes) {
      if (stroke.id === lightStroke.id) continue;
      if (stroke.brushType === 'light') continue;
      
      for (const point of stroke.points) {
        const dx = point.x - lightPoint.x;
        const dy = point.y - lightPoint.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < lightRadius) {
          const illumination = (1 - dist / lightRadius) * intensity * 0.3;
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, stroke.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 200, ${illumination})`;
          ctx.fill();
        }
      }
    }
  }
}

function calculateStrokeBounds(points: Point[]) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  
  for (const point of points) {
    minX = Math.min(minX, point.x);
    maxX = Math.max(maxX, point.x);
    minY = Math.min(minY, point.y);
    maxY = Math.max(maxY, point.y);
  }
  
  return { minX, maxX, minY, maxY };
}

function lightenColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const r = Math.min(255, parseInt(hex.slice(0, 2), 16) + amount);
  const g = Math.min(255, parseInt(hex.slice(2, 4), 16) + amount);
  const b = Math.min(255, parseInt(hex.slice(4, 6), 16) + amount);
  return `rgb(${r}, ${g}, ${b})`;
}

function darkenColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const r = Math.max(0, parseInt(hex.slice(0, 2), 16) - amount);
  const g = Math.max(0, parseInt(hex.slice(2, 4), 16) - amount);
  const b = Math.max(0, parseInt(hex.slice(4, 6), 16) - amount);
  return `rgb(${r}, ${g}, ${b})`;
}
