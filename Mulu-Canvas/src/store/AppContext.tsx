'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  AppState,
  Artwork,
  Stroke,
  Language,
  LayerMode,
  BrushSettings,
  EditorState,
  DEFAULT_BRUSH_SETTINGS,
  DEFAULT_PHYSICS,
} from '@/lib/types';
import { detectLanguage } from '@/lib/i18n';
import { useIndexedDB } from '@/hooks/useIndexedDB';

// Action types
type AppAction =
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_ARTWORKS'; payload: Artwork[] }
  | { type: 'ADD_ARTWORK'; payload: Artwork }
  | { type: 'UPDATE_ARTWORK'; payload: Artwork }
  | { type: 'DELETE_ARTWORK'; payload: string }
  | { type: 'SET_CURRENT_VIEW'; payload: 'gallery' | 'editor' }
  | { type: 'SET_CURRENT_ARTWORK'; payload: Artwork | null }
  | { type: 'SET_LAYER_MODE'; payload: LayerMode }
  | { type: 'SET_BRUSH_SETTINGS'; payload: Partial<BrushSettings> }
  | { type: 'ADD_STROKE'; payload: Stroke }
  | { type: 'UPDATE_STROKE'; payload: { id: string; updates: Partial<Stroke> } }
  | { type: 'SET_PHYSICS_PLAYING'; payload: boolean }
  | { type: 'SET_GRAVITY'; payload: { x: number; y: number } }
  | { type: 'TOGGLE_3D_EFFECT' }
  | { type: 'SET_3D_ROTATION'; payload: { x: number; y: number } }
  | { type: 'UPDATE_ARTWORK_STROKES'; payload: Stroke[] };

// Initial state
const initialEditorState: EditorState = {
  currentArtwork: null,
  currentLayerMode: 'background',
  brushSettings: DEFAULT_BRUSH_SETTINGS,
  physics: DEFAULT_PHYSICS,
  is3DEffectEnabled: false,
  rotation3D: { x: 0, y: 0 },
};

const initialState: AppState = {
  language: 'en',
  artworks: [],
  editor: initialEditorState,
  currentView: 'gallery',
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
      
    case 'SET_ARTWORKS':
      return { ...state, artworks: action.payload };
      
    case 'ADD_ARTWORK':
      return { ...state, artworks: [...state.artworks, action.payload] };
      
    case 'UPDATE_ARTWORK':
      return {
        ...state,
        artworks: state.artworks.map(a =>
          a.id === action.payload.id ? action.payload : a
        ),
        editor: state.editor.currentArtwork?.id === action.payload.id
          ? { ...state.editor, currentArtwork: action.payload }
          : state.editor,
      };
      
    case 'DELETE_ARTWORK':
      return {
        ...state,
        artworks: state.artworks.filter(a => a.id !== action.payload),
      };
      
    case 'SET_CURRENT_VIEW':
      return { ...state, currentView: action.payload };
      
    case 'SET_CURRENT_ARTWORK':
      return {
        ...state,
        editor: { ...state.editor, currentArtwork: action.payload },
      };
      
    case 'SET_LAYER_MODE':
      return {
        ...state,
        editor: { ...state.editor, currentLayerMode: action.payload },
      };
      
    case 'SET_BRUSH_SETTINGS':
      return {
        ...state,
        editor: {
          ...state.editor,
          brushSettings: { ...state.editor.brushSettings, ...action.payload },
        },
      };
      
    case 'ADD_STROKE':
      if (!state.editor.currentArtwork) return state;
      const updatedArtwork = {
        ...state.editor.currentArtwork,
        strokes: [...state.editor.currentArtwork.strokes, action.payload],
        updatedAt: Date.now(),
      };
      return {
        ...state,
        editor: { ...state.editor, currentArtwork: updatedArtwork },
        artworks: state.artworks.map(a =>
          a.id === updatedArtwork.id ? updatedArtwork : a
        ),
      };
      
    case 'UPDATE_STROKE':
      if (!state.editor.currentArtwork) return state;
      const updatedStrokes = state.editor.currentArtwork.strokes.map(s =>
        s.id === action.payload.id ? { ...s, ...action.payload.updates } : s
      );
      const artworkWithUpdatedStroke = {
        ...state.editor.currentArtwork,
        strokes: updatedStrokes,
        updatedAt: Date.now(),
      };
      return {
        ...state,
        editor: { ...state.editor, currentArtwork: artworkWithUpdatedStroke },
        artworks: state.artworks.map(a =>
          a.id === artworkWithUpdatedStroke.id ? artworkWithUpdatedStroke : a
        ),
      };
      
    case 'UPDATE_ARTWORK_STROKES':
      if (!state.editor.currentArtwork) return state;
      const artworkWithNewStrokes = {
        ...state.editor.currentArtwork,
        strokes: action.payload,
        updatedAt: Date.now(),
      };
      return {
        ...state,
        editor: { ...state.editor, currentArtwork: artworkWithNewStrokes },
        artworks: state.artworks.map(a =>
          a.id === artworkWithNewStrokes.id ? artworkWithNewStrokes : a
        ),
      };
      
    case 'SET_PHYSICS_PLAYING':
      return {
        ...state,
        editor: {
          ...state.editor,
          physics: { ...state.editor.physics, isPlaying: action.payload },
        },
      };
      
    case 'SET_GRAVITY':
      return {
        ...state,
        editor: {
          ...state.editor,
          physics: { ...state.editor.physics, gravity: action.payload },
        },
      };
      
    case 'TOGGLE_3D_EFFECT':
      return {
        ...state,
        editor: { ...state.editor, is3DEffectEnabled: !state.editor.is3DEffectEnabled },
      };
      
    case 'SET_3D_ROTATION':
      return {
        ...state,
        editor: { ...state.editor, rotation3D: action.payload },
      };
      
    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  createArtwork: (name: string, width: number, height: number, backgroundColor: string, ambientColor: string, ambientIntensity: number) => Promise<Artwork>;
  deleteArtwork: (id: string) => Promise<void>;
  saveCurrentArtwork: () => Promise<void>;
  openArtwork: (id: string) => void;
  goToGallery: () => void;
  exportArtwork: (id: string) => void;
  importArtwork: (file: File) => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { getAll, save, remove, init } = useIndexedDB();
  
  // Initialize on mount
  useEffect(() => {
    const initApp = async () => {
      await init();
      const artworks = await getAll();
      dispatch({ type: 'SET_ARTWORKS', payload: artworks });
      
      // Detect language
      const detectedLang = detectLanguage();
      dispatch({ type: 'SET_LANGUAGE', payload: detectedLang as Language });
    };
    initApp();
  }, []);
  
  const createArtwork = useCallback(async (
    name: string,
    width: number,
    height: number,
    backgroundColor: string,
    ambientColor: string,
    ambientIntensity: number
  ): Promise<Artwork> => {
    const artwork: Artwork = {
      id: uuidv4(),
      name: name || `Artwork ${state.artworks.length + 1}`,
      width,
      height,
      backgroundColor,
      ambientColor,
      ambientIntensity,
      strokes: [],
      previewImage: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    await save(artwork);
    dispatch({ type: 'ADD_ARTWORK', payload: artwork });
    return artwork;
  }, [state.artworks.length, save]);
  
  const deleteArtwork = useCallback(async (id: string) => {
    await remove(id);
    dispatch({ type: 'DELETE_ARTWORK', payload: id });
  }, [remove]);
  
  const saveCurrentArtwork = useCallback(async () => {
    if (state.editor.currentArtwork) {
      await save(state.editor.currentArtwork);
    }
  }, [state.editor.currentArtwork, save]);
  
  const openArtwork = useCallback((id: string) => {
    const artwork = state.artworks.find(a => a.id === id);
    if (artwork) {
      dispatch({ type: 'SET_CURRENT_ARTWORK', payload: artwork });
      dispatch({ type: 'SET_CURRENT_VIEW', payload: 'editor' });
    }
  }, [state.artworks]);
  
  const goToGallery = useCallback(() => {
    dispatch({ type: 'SET_CURRENT_VIEW', payload: 'gallery' });
    dispatch({ type: 'SET_CURRENT_ARTWORK', payload: null });
  }, []);
  
  const exportArtwork = useCallback((id: string) => {
    const artwork = state.artworks.find(a => a.id === id);
    if (artwork) {
      const json = JSON.stringify(artwork, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${artwork.name}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [state.artworks]);
  
  const importArtwork = useCallback(async (file: File) => {
    const text = await file.text();
    try {
      const artwork: Artwork = JSON.parse(text);
      artwork.id = uuidv4(); // Generate new ID
      artwork.createdAt = Date.now();
      artwork.updatedAt = Date.now();
      await save(artwork);
      dispatch({ type: 'ADD_ARTWORK', payload: artwork });
    } catch (e) {
      console.error('Failed to import artwork:', e);
    }
  }, [save]);
  
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        createArtwork,
        deleteArtwork,
        saveCurrentArtwork,
        openArtwork,
        goToGallery,
        exportArtwork,
        importArtwork,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
