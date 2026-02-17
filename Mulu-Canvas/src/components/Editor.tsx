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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
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
  Globe,
  Settings,
  Sun,
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useDeviceOrientation, useMouseGravity } from '@/hooks/useDeviceOrientation';
import { updatePhysics, PhysicsBody, createPhysicsBody } from '@/lib/physics';

function t(language: Language, key: TranslationKey): string {
  return getTranslation(language, key);
}

const BRUSH_ICONS: Record<BrushType, React.ReactNode> = {
  pen: <Pen className="w-4 h-4" />,
  fur: <Sparkles className="w-4 h-4" />,
  glass: <GlassWater className="w-4 h-4" />,
  slime: <Droplets className="w-4 h-4" />,
  light: <Lightbulb className="w-4 h-4" />,
};

const LAYER_ICONS: Record<LayerMode, React.ReactNode> = {
  background: <Layers className="w-4 h-4" />,
  wall: <Square className="w-4 h-4" />,
  object: <Box className="w-4 h-4" />,
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
  
  const { currentArtwork, brushSettings, physics, currentLayerMode, is3DEffectEnabled, rotation3D } = state.editor;
  const language = state.language;

  // Device orientation for gravity (mobile)
  const handleGravityChange = useCallback((gravity: { x: number; y: number }) => {
    gravityRef.current = gravity;
    
    if (physics.isPlaying) {
      dispatch({ type: 'SET_GRAVITY', payload: gravity });
    }
    
    // Also update 3D rotation if enabled
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
  
  // Mouse gravity for PC
  useMouseGravity(containerRef, handleGravityChange);

  // Physics simulation loop
  useEffect(() => {
    if (!physics.isPlaying || !currentArtwork) return;
    
    const simulate = (timestamp: number) => {
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      
      if (deltaTime > 0 && deltaTime < 100) {
        // Create physics bodies from strokes
        const bodies: PhysicsBody[] = [];
        for (const stroke of currentArtwork.strokes) {
          const body = createPhysicsBody(stroke);
          if (body) bodies.push(body);
        }
        
        // Update physics
        const updatedBodies = updatePhysics(
          bodies,
          physics.gravity,
          currentArtwork.width,
          currentArtwork.height,
          deltaTime
        );
        
        // Update strokes from physics bodies
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

  // Render canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !currentArtwork) return;
    
    renderCanvas(ctx, canvas, currentArtwork, currentStroke, brushSettings, currentLayerMode, gravityRef.current);
    
  }, [currentArtwork, currentStroke, brushSettings, currentLayerMode, physics.isPlaying]);
  
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
    
    // Create stroke
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
    
    // Auto-save with preview
    await saveWithPreview();
  };
  
  // Save with preview image generation
  const saveWithPreview = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || !currentArtwork) return;
    
    // Generate preview image
    const previewCanvas = document.createElement('canvas');
    const previewCtx = previewCanvas.getContext('2d');
    if (previewCtx) {
      previewCanvas.width = 320;
      previewCanvas.height = 240;
      previewCtx.drawImage(canvas, 0, 0, 320, 240);
      const previewImage = previewCanvas.toDataURL('image/png');
      
      // Update artwork with preview
      const updatedArtwork: Artwork = {
        ...currentArtwork,
        previewImage,
        updatedAt: Date.now(),
      };
      
      dispatch({ type: 'UPDATE_ARTWORK', payload: updatedArtwork });
    }
    
    await saveCurrentArtwork();
  }, [currentArtwork, dispatch, saveCurrentArtwork]);
  
  const togglePhysics = () => {
    dispatch({ type: 'SET_PHYSICS_PLAYING', payload: !physics.isPlaying });
  };
  
  const toggle3DEffect = () => {
    dispatch({ type: 'TOGGLE_3D_EFFECT' });
  };
  
  // Update ambient settings
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
  
  // Go back to gallery with save
  const handleGoToGallery = useCallback(async () => {
    // Save preview image before leaving
    await saveWithPreview();
    goToGallery();
  }, [saveWithPreview, goToGallery]);
  
  const handleLanguageChange = (lang: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang });
  };

  if (!currentArtwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Top Toolbar */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleGoToGallery}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t(language, 'backToGallery')}
            </Button>
            <span className="text-white font-medium truncate max-w-[200px]">
              {currentArtwork.name}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Play/Pause */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={physics.isPlaying ? "default" : "outline"}
                    size="sm"
                    onClick={togglePhysics}
                    className={physics.isPlaying ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {physics.isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    {physics.isPlaying ? t(language, 'pause') : t(language, 'play')}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {physics.isPlaying ? t(language, 'pause') : t(language, 'play')}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {/* 3D Effect Toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={is3DEffectEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={toggle3DEffect}
                    className={is3DEffectEnabled ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    <Rotate3D className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {t(language, 'effect3D')}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {/* Ambient Settings */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Sun className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">{t(language, 'ambientColor')}</h4>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={currentArtwork.ambientColor}
                      onChange={(e) => updateAmbientSettings(e.target.value, currentArtwork.ambientIntensity)}
                      className="w-10 h-8 p-1"
                    />
                    <Input
                      value={currentArtwork.ambientColor}
                      onChange={(e) => updateAmbientSettings(e.target.value, currentArtwork.ambientIntensity)}
                      className="flex-1 h-8"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t(language, 'ambientIntensity')}: {currentArtwork.ambientIntensity.toFixed(2)}</Label>
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
            
            {/* Language Select */}
            <Select value={language} onValueChange={(v) => handleLanguageChange(v as Language)}>
              <SelectTrigger className="w-[100px] bg-gray-700 border-gray-600">
                <Globe className="w-4 h-4 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="ko">한국어</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Tools */}
        <aside className="w-16 md:w-64 bg-gray-800 border-r border-gray-700 p-2 md:p-4 flex flex-col gap-4">
          {/* Layer Mode */}
          <div className="space-y-2">
            <Label className="text-gray-300 hidden md:block">{t(language, 'background')}</Label>
            <ToggleGroup
              type="single"
              value={currentLayerMode}
              onValueChange={(value: LayerMode) => {
                if (value) dispatch({ type: 'SET_LAYER_MODE', payload: value });
              }}
              className="flex flex-col md:flex-row gap-1"
            >
              {(['background', 'wall', 'object'] as LayerMode[]).map((mode) => (
                <TooltipProvider key={mode}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem
                        value={mode}
                        aria-label={mode}
                        className="w-full md:w-auto data-[state=on]:bg-blue-600"
                      >
                        {LAYER_ICONS[mode]}
                        <span className="hidden md:inline ml-2">{t(language, mode)}</span>
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {t(language, `${mode}Tooltip` as TranslationKey)}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </ToggleGroup>
          </div>
          
          {/* Brush Type */}
          <div className="space-y-2">
            <Label className="text-gray-300 hidden md:block">{t(language, 'pen')}</Label>
            <ToggleGroup
              type="single"
              value={brushSettings.type}
              onValueChange={(value: BrushType) => {
                if (value) dispatch({ type: 'SET_BRUSH_SETTINGS', payload: { type: value } });
              }}
              className="flex flex-col md:flex-row gap-1"
            >
              {(['pen', 'fur', 'glass', 'slime', 'light'] as BrushType[]).map((brush) => (
                <TooltipProvider key={brush}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem
                        value={brush}
                        aria-label={brush}
                        className="w-full md:w-auto data-[state=on]:bg-orange-600"
                      >
                        {BRUSH_ICONS[brush]}
                        <span className="hidden md:inline ml-2">{t(language, brush)}</span>
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {t(language, `${brush}Tooltip` as TranslationKey)}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </ToggleGroup>
          </div>
          
          {/* Brush Settings */}
          <div className="space-y-3 flex-1 overflow-y-auto">
            {/* Color */}
            <div className="space-y-1">
              <Label className="text-gray-300 text-xs md:text-sm">{t(language, 'color')}</Label>
              <div className="flex gap-1">
                <Input
                  type="color"
                  value={brushSettings.color}
                  onChange={(e) => dispatch({ type: 'SET_BRUSH_SETTINGS', payload: { color: e.target.value } })}
                  className="w-10 h-8 p-1 bg-gray-700 border-gray-600"
                />
                <Input
                  value={brushSettings.color}
                  onChange={(e) => dispatch({ type: 'SET_BRUSH_SETTINGS', payload: { color: e.target.value } })}
                  className="flex-1 h-8 bg-gray-700 border-gray-600 text-white text-xs"
                />
              </div>
            </div>
            
            {/* Size */}
            <div className="space-y-1">
              <Label className="text-gray-300 text-xs md:text-sm">
                {t(language, 'size')}: {brushSettings.size}
              </Label>
              <Slider
                value={[brushSettings.size]}
                onValueChange={(v) => dispatch({ type: 'SET_BRUSH_SETTINGS', payload: { size: v[0] } })}
                min={1}
                max={50}
                step={1}
              />
            </div>
            
            {/* Pen-specific: Opacity */}
            {brushSettings.type === 'pen' && (
              <div className="space-y-1">
                <Label className="text-gray-300 text-xs md:text-sm">
                  {t(language, 'opacity')}: {brushSettings.opacity.toFixed(2)}
                </Label>
                <Slider
                  value={[brushSettings.opacity]}
                  onValueChange={(v) => dispatch({ type: 'SET_BRUSH_SETTINGS', payload: { opacity: v[0] } })}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </div>
            )}
            
            {/* Fur-specific */}
            {brushSettings.type === 'fur' && (
              <div className="space-y-1">
                <Label className="text-gray-300 text-xs md:text-sm">
                  {t(language, 'furLength')}: {brushSettings.furLength}
                </Label>
                <Slider
                  value={[brushSettings.furLength]}
                  onValueChange={(v) => dispatch({ type: 'SET_BRUSH_SETTINGS', payload: { furLength: v[0] } })}
                  min={5}
                  max={50}
                  step={1}
                />
              </div>
            )}
            
            {/* Glass-specific */}
            {brushSettings.type === 'glass' && (
              <div className="space-y-1">
                <Label className="text-gray-300 text-xs md:text-sm">
                  {t(language, 'blurLevel')}: {brushSettings.blurLevel}
                </Label>
                <Slider
                  value={[brushSettings.blurLevel]}
                  onValueChange={(v) => dispatch({ type: 'SET_BRUSH_SETTINGS', payload: { blurLevel: v[0] } })}
                  min={1}
                  max={20}
                  step={1}
                />
              </div>
            )}
            
            {/* Slime-specific */}
            {brushSettings.type === 'slime' && (
              <div className="space-y-1">
                <Label className="text-gray-300 text-xs md:text-sm">
                  {t(language, 'elasticity')}: {brushSettings.elasticity.toFixed(2)}
                </Label>
                <Slider
                  value={[brushSettings.elasticity]}
                  onValueChange={(v) => dispatch({ type: 'SET_BRUSH_SETTINGS', payload: { elasticity: v[0] } })}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </div>
            )}
            
            {/* Light-specific */}
            {brushSettings.type === 'light' && (
              <div className="space-y-1">
                <Label className="text-gray-300 text-xs md:text-sm">
                  {t(language, 'lightIntensity')}: {brushSettings.lightIntensity.toFixed(2)}
                </Label>
                <Slider
                  value={[brushSettings.lightIntensity]}
                  onValueChange={(v) => dispatch({ type: 'SET_BRUSH_SETTINGS', payload: { lightIntensity: v[0] } })}
                  min={0.1}
                  max={1}
                  step={0.01}
                />
              </div>
            )}
          </div>
        </aside>
        
        {/* Canvas Area */}
        <main 
          ref={containerRef}
          className="flex-1 flex items-center justify-center p-4 overflow-hidden"
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
              className="bg-white shadow-2xl rounded-lg touch-none cursor-crosshair"
              style={{
                maxWidth: '100%',
                maxHeight: 'calc(100vh - 200px)',
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
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw ambient light overlay
  const ambientR = parseInt(artwork.ambientColor.slice(1, 3), 16);
  const ambientG = parseInt(artwork.ambientColor.slice(3, 5), 16);
  const ambientB = parseInt(artwork.ambientColor.slice(5, 7), 16);
  ctx.fillStyle = `rgba(${ambientR}, ${ambientG}, ${ambientB}, ${artwork.ambientIntensity})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw wall borders (transparent, just for visual reference)
  ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
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
  if (currentStroke.length > 0) {
    drawCurrentStroke(ctx, currentStroke, brushSettings, currentLayerMode);
  }
  
  // Draw light effects (after all other strokes)
  const lightStrokes = artwork.strokes.filter(s => s.brushType === 'light');
  for (const stroke of lightStrokes) {
    applyLightEffect(ctx, stroke, artwork.strokes);
  }
}

// Drawing functions
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
  
  // Simple preview stroke
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
  
  // Draw fur strands - affected by gravity
  for (let i = 0; i < stroke.points.length; i += 3) {
    const point = stroke.points[i];
    const prevPoint = stroke.points[Math.max(0, i - 1)];
    const nextPoint = stroke.points[Math.min(stroke.points.length - 1, i + 1)];
    
    // Calculate tangent direction
    const dx = nextPoint.x - prevPoint.x;
    const dy = nextPoint.y - prevPoint.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    
    // Normal direction (perpendicular)
    const nx = -dy / len;
    const ny = dx / len;
    
    // Draw strands on both sides, influenced by gravity
    for (let side = -1; side <= 1; side += 2) {
      const strandLen = furLength * (0.5 + Math.random() * 0.5);
      
      // Base position at perpendicular direction
      let endX = point.x + nx * strandLen * side;
      let endY = point.y + ny * strandLen * side;
      
      // Apply gravity influence (fur hangs down based on gravity)
      endX += gravity.x * furLength * 0.5;
      endY += gravity.y * furLength * 0.8;
      
      // Control point for curve
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
  
  // Draw blurred stroke (refraction effect)
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
  
  // Add bright highlight on edges (glass reflection)
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
  
  // Add outer glow
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
  // Calculate bounds for gradient
  const bounds = stroke.bounds || calculateStrokeBounds(stroke.points);
  const centerX = (bounds.minX + bounds.maxX) / 2;
  const centerY = (bounds.minY + bounds.maxY) / 2;
  const radius = Math.max(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY) / 2 || stroke.size * 2;
  
  // Draw main blob with gradient for slimy effect
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
  
  // Fill with gradient
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
  
  // Add glossy highlight
  ctx.beginPath();
  ctx.arc(centerX - radius * 0.25, centerY - radius * 0.25, radius * 0.3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fill();
  
  // Add border
  ctx.strokeStyle = darkenColor(stroke.color, 30);
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawLightStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
  const intensity = stroke.lightIntensity || 0.5;
  
  // Draw glow for each point
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
    
    // Core bright center
    ctx.beginPath();
    ctx.arc(point.x, point.y, stroke.size * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = intensity;
    ctx.fill();
  }
}

function applyLightEffect(ctx: CanvasRenderingContext2D, lightStroke: Stroke, allStrokes: Stroke[]) {
  const intensity = lightStroke.lightIntensity || 0.5;
  
  // For each light source, illuminate nearby objects
  for (const lightPoint of lightStroke.points) {
    const lightRadius = lightStroke.size * 8;
    
    // Find strokes near this light
    for (const stroke of allStrokes) {
      if (stroke.id === lightStroke.id) continue;
      if (stroke.brushType === 'light') continue;
      
      for (const point of stroke.points) {
        const dx = point.x - lightPoint.x;
        const dy = point.y - lightPoint.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < lightRadius) {
          // Add subtle illumination
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

// Utility functions
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
