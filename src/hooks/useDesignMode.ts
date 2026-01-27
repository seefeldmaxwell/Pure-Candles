import { useDesignModeStore } from '../stores/designModeStore';

/**
 * Custom hook for using design mode functionality
 * Provides a simplified interface to the design mode store
 */
export function useDesignMode() {
  const {
    isDesignMode,
    isPreviewMode,
    selectedElementId,
    hoveredElementId,
    edits,
    toggleDesignMode,
    setDesignMode,
    togglePreviewMode,
    setSelectedElement,
    setHoveredElement,
    updateElementContent,
    getElementContent,
    resetElement,
    resetAllEdits,
    undo,
    redo,
    canUndo,
    canRedo,
    exportEdits,
  } = useDesignModeStore();

  const editCount = Object.keys(edits).length;
  const hasEdits = editCount > 0;

  return {
    // State
    isDesignMode,
    isPreviewMode,
    selectedElementId,
    hoveredElementId,
    edits,
    editCount,
    hasEdits,

    // Actions
    toggleDesignMode,
    setDesignMode,
    togglePreviewMode,
    setSelectedElement,
    setHoveredElement,
    updateElementContent,
    getElementContent,
    resetElement,
    resetAllEdits,
    undo,
    redo,
    canUndo,
    canRedo,
    exportEdits,
  };
}
