'use client';

import React, { useState, useRef } from 'react';
import { useApp } from '@/store/AppContext';
import { getTranslation, TranslationKey } from '@/lib/i18n';
import { Artwork } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Language } from '@/lib/types';
import { Plus, Trash2, Download, Upload, Palette, Settings, Globe } from 'lucide-react';

function t(language: Language, key: TranslationKey): string {
  return getTranslation(language, key);
}

interface NewArtworkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (name: string, width: number, height: number, ambientColor: string, ambientIntensity: number) => void;
}

function NewArtworkDialog({ open, onOpenChange, onCreate }: NewArtworkDialogProps) {
  const { state } = useApp();
  const [name, setName] = useState('');
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [ambientColor, setAmbientColor] = useState('#ffffff');
  const [ambientIntensity, setAmbientIntensity] = useState(0.3);
  
  const handleCreate = () => {
    onCreate(name, width, height, ambientColor, ambientIntensity);
    setName('');
    setWidth(800);
    setHeight(600);
    setAmbientColor('#ffffff');
    setAmbientIntensity(0.3);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t(state.language, 'newArtworkTitle')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">{t(state.language, 'artworkName')}</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`Artwork ${new Date().toLocaleDateString()}`}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="width">{t(state.language, 'width')}</Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value) || 800)}
                min={100}
                max={2000}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="height">{t(state.language, 'height')}</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value) || 600)}
                min={100}
                max={2000}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ambientColor">{t(state.language, 'ambientColor')}</Label>
            <div className="flex items-center gap-2">
              <Input
                id="ambientColor"
                type="color"
                value={ambientColor}
                onChange={(e) => setAmbientColor(e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input
                value={ambientColor}
                onChange={(e) => setAmbientColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>{t(state.language, 'ambientIntensity')}: {ambientIntensity.toFixed(2)}</Label>
            <Slider
              value={[ambientIntensity]}
              onValueChange={(v) => setAmbientIntensity(v[0])}
              min={0}
              max={1}
              step={0.01}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t(state.language, 'cancel')}
          </Button>
          <Button onClick={handleCreate}>{t(state.language, 'create')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface ArtworkCardProps {
  artwork: Artwork;
  onOpen: () => void;
  onDelete: () => void;
  onExport: () => void;
}

function ArtworkCard({ artwork, onOpen, onDelete, onExport }: ArtworkCardProps) {
  const { state } = useApp();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(state.language === 'ja' ? 'ja-JP' : 
      state.language === 'zh' ? 'zh-CN' :
      state.language === 'ko' ? 'ko-KR' : 'en-US');
  };
  
  return (
    <>
      <Card className="group cursor-pointer hover:shadow-lg transition-shadow" onClick={onOpen}>
        <CardHeader className="p-4">
          <CardTitle className="text-base truncate">{artwork.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div 
            className="aspect-video bg-gray-100 relative overflow-hidden"
            style={{ 
              backgroundColor: artwork.ambientColor,
              backgroundBlendMode: 'multiply',
            }}
          >
            {artwork.previewImage ? (
              <img 
                src={artwork.previewImage} 
                alt={artwork.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Palette className="w-12 h-12 text-gray-300" />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-3 flex justify-between items-center">
          <span className="text-xs text-gray-500">{formatDate(artwork.updatedAt)}</span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onExport();
              }}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirm(true);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t(state.language, 'confirm')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t(state.language, 'deleteConfirm')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t(state.language, 'cancel')}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                onDelete();
                setShowDeleteConfirm(false);
              }}
            >
              {t(state.language, 'delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function Gallery() {
  const { state, dispatch, createArtwork, deleteArtwork, openArtwork, exportArtwork, importArtwork } = useApp();
  const [showNewDialog, setShowNewDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleCreate = async (
    name: string,
    width: number,
    height: number,
    ambientColor: string,
    ambientIntensity: number
  ) => {
    const artwork = await createArtwork(name, width, height, ambientColor, ambientIntensity);
    openArtwork(artwork.id);
  };
  
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await importArtwork(file);
    }
    e.target.value = '';
  };
  
  const handleLanguageChange = (lang: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {t(state.language, 'gallery')}
          </h1>
          <div className="flex items-center gap-2">
            <Select value={state.language} onValueChange={(v) => handleLanguageChange(v as Language)}>
              <SelectTrigger className="w-[140px]">
                <Globe className="w-4 h-4 mr-2" />
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
      
      {/* Toolbar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex gap-2">
        <Button onClick={() => setShowNewDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {t(state.language, 'newArtwork')}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
        <Button 
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          {t(state.language, 'import')}
        </Button>
      </div>
      
      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-4 pb-8">
        {state.artworks.length === 0 ? (
          <div className="text-center py-16">
            <Palette className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">{t(state.language, 'noArtworks')}</p>
            <p className="text-gray-400 mt-2">{t(state.language, 'createFirst')}</p>
            <Button className="mt-4" onClick={() => setShowNewDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              {t(state.language, 'newArtwork')}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {state.artworks
              .sort((a, b) => b.updatedAt - a.updatedAt)
              .map((artwork) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  onOpen={() => openArtwork(artwork.id)}
                  onDelete={() => deleteArtwork(artwork.id)}
                  onExport={() => exportArtwork(artwork.id)}
                />
              ))}
          </div>
        )}
      </main>
      
      <NewArtworkDialog
        open={showNewDialog}
        onOpenChange={setShowNewDialog}
        onCreate={handleCreate}
      />
    </div>
  );
}
