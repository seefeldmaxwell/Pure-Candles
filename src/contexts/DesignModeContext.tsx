import React, { createContext, useContext, useEffect, useCallback } from 'react';
import { useDesignModeStore } from '../stores/designModeStore';

interface DesignModeContextValue {
  isDesignMode: boolean;
  isPreviewMode: boolean;
  selectedElementId: string | null;
  hoveredElementId: string | null;
}

const DesignModeContext = createContext<DesignModeContextValue | null>(null);

export function useDesignModeContext() {
  const context = useContext(DesignModeContext);
  if (!context) {
    throw new Error('useDesignModeContext must be used within DesignModeProvider');
  }
  return context;
}

interface DesignModeProviderProps {
  children: React.ReactNode;
}

export function DesignModeProvider({ children }: DesignModeProviderProps) {
  const {
    isDesignMode,
    isPreviewMode,
    selectedElementId,
    hoveredElementId,
    toggleDesignMode,
    setSelectedElement,
    undo,
    redo,
  } = useDesignModeStore();

  // Global keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Cmd/Ctrl + Shift + E to toggle design mode
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'e') {
      e.preventDefault();
      toggleDesignMode();
      return;
    }

    // Only handle other shortcuts in design mode
    if (!isDesignMode) return;

    // Escape to deselect
    if (e.key === 'Escape') {
      e.preventDefault();
      setSelectedElement(null);
      return;
    }

    // Cmd/Ctrl + Z to undo
    if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      undo();
      return;
    }

    // Cmd/Ctrl + Shift + Z to redo
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z') {
      e.preventDefault();
      redo();
      return;
    }
  }, [isDesignMode, toggleDesignMode, setSelectedElement, undo, redo]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Click outside to deselect
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isDesignMode || !selectedElementId) return;

      const target = e.target as HTMLElement;
      const isEditableElement = target.closest('[data-editable-id]');
      const isToolbar = target.closest('[data-design-toolbar]');

      if (!isEditableElement && !isToolbar) {
        setSelectedElement(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDesignMode, selectedElementId, setSelectedElement]);

  const value: DesignModeContextValue = {
    isDesignMode,
    isPreviewMode,
    selectedElementId,
    hoveredElementId,
  };

  return (
    <DesignModeContext.Provider value={value}>
      <div className={isDesignMode ? 'design-mode-active' : ''}>
        {children}
      </div>
    </DesignModeContext.Provider>
  );
}
