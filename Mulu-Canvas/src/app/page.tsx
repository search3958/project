'use client';

import { AppProvider, useApp } from '@/store/AppContext';
import Gallery from '@/components/Gallery';
import Editor from '@/components/Editor';
import { TooltipProvider } from '@/components/ui/tooltip';

function AppContent() {
  const { state } = useApp();
  
  return (
    <>
      {state.currentView === 'gallery' && <Gallery />}
      {state.currentView === 'editor' && <Editor />}
    </>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <TooltipProvider>
        <AppContent />
      </TooltipProvider>
    </AppProvider>
  );
}
