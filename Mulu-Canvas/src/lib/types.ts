// Types for the Physics Drawing App

export type Language = 'ja' | 'zh' | 'ko' | 'en';

export type LayerMode = 'background' | 'wall' | 'object';

export type BrushType = 'pen' | 'fur' | 'glass' | 'slime' | 'light';

export interface Point {
  x: number;
  y: number;
  pressure?: number;
}

export interface Stroke {
  id: string;
  layerMode: LayerMode;
  brushType: BrushType;
  points: Point[];
  color: string;
  size: number;
  opacity: number;
  // Brush-specific parameters
  furLength?: number;
  blurLevel?: number;
  elasticity?: number;
  lightIntensity?: number;
  // Physics properties (for object/wall mode)
  velocity?: { x: number; y: number };
  bounds?: { minX: number; maxX: number; minY: number; maxY: number };
}

export interface Artwork {
  id: string;
  name: string;
  width: number;
  height: number;
  backgroundColor: string;
  ambientColor: string;
  ambientIntensity: number;
  strokes: Stroke[];
  previewImage: string;
  createdAt: number;
  updatedAt: number;
}

export interface ProjectSettings {
  id: string;
  name: string;
  width: number;
  height: number;
  backgroundColor: string;
  ambientColor: string;
  ambientIntensity: number;
}

export interface BrushSettings {
  type: BrushType;
  color: string;
  size: number;
  opacity: number;
  furLength: number;
  blurLevel: number;
  elasticity: number;
  lightIntensity: number;
}

export interface PhysicsState {
  gravity: { x: number; y: number };
  isPlaying: boolean;
}

export interface EditorState {
  currentArtwork: Artwork | null;
  currentLayerMode: LayerMode;
  brushSettings: BrushSettings;
  physics: PhysicsState;
  is3DEffectEnabled: boolean;
  rotation3D: { x: number; y: number };
}

export interface AppState {
  language: Language;
  artworks: Artwork[];
  editor: EditorState;
  currentView: 'gallery' | 'editor';
}

// Default values
export const DEFAULT_BRUSH_SETTINGS: BrushSettings = {
  type: 'pen',
  color: '#000000',
  size: 10,
  opacity: 1,
  furLength: 20,
  blurLevel: 5,
  elasticity: 0.8,
  lightIntensity: 0.5,
};

export const DEFAULT_PROJECT_SETTINGS: ProjectSettings = {
  id: '',
  name: '',
  width: 800,
  height: 600,
  backgroundColor: '#ffffff',
  ambientColor: '#ffffff',
  ambientIntensity: 0.3,
};

export const DEFAULT_PHYSICS: PhysicsState = {
  gravity: { x: 0, y: 1 },
  isPlaying: false,
};

export const WALL_THICKNESS = 50;
