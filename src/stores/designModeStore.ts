import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ElementEdit {
  originalContent: string;
  currentContent: string;
  elementType: 'text' | 'heading' | 'button' | 'link';
}

interface DesignModeState {
  // Mode state
  isDesignMode: boolean;
  isPreviewMode: boolean;

  // Selection state
  selectedElementId: string | null;
  hoveredElementId: string | null;

  // Content edits
  edits: Record<string, ElementEdit>;

  // History for undo/redo
  history: Record<string, ElementEdit>[];
  historyIndex: number;

  // Actions
  toggleDesignMode: () => void;
  setDesignMode: (enabled: boolean) => void;
  togglePreviewMode: () => void;
  setSelectedElement: (id: string | null) => void;
  setHoveredElement: (id: string | null) => void;
  updateElementContent: (id: string, content: string, originalContent: string, elementType: ElementEdit['elementType']) => void;
  getElementContent: (id: string, defaultContent: string) => string;
  resetElement: (id: string) => void;
  resetAllEdits: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  exportEdits: () => string;
}

export const useDesignModeStore = create<DesignModeState>()(
  persist(
    (set, get) => ({
      // Initial state
      isDesignMode: false,
      isPreviewMode: false,
      selectedElementId: null,
      hoveredElementId: null,
      edits: {},
      history: [],
      historyIndex: -1,

      // Toggle design mode
      toggleDesignMode: () => {
        set((state) => ({
          isDesignMode: !state.isDesignMode,
          selectedElementId: null,
          hoveredElementId: null,
          isPreviewMode: false,
        }));
      },

      setDesignMode: (enabled: boolean) => {
        set({
          isDesignMode: enabled,
          selectedElementId: null,
          hoveredElementId: null,
          isPreviewMode: false,
        });
      },

      // Toggle preview mode (show changes without design UI)
      togglePreviewMode: () => {
        set((state) => ({
          isPreviewMode: !state.isPreviewMode,
          selectedElementId: null,
          hoveredElementId: null,
        }));
      },

      // Selection
      setSelectedElement: (id: string | null) => {
        set({ selectedElementId: id });
      },

      setHoveredElement: (id: string | null) => {
        const state = get();
        if (state.isDesignMode && !state.isPreviewMode) {
          set({ hoveredElementId: id });
        }
      },

      // Content editing
      updateElementContent: (id: string, content: string, originalContent: string, elementType: ElementEdit['elementType']) => {
        set((state) => {
          const newEdits = {
            ...state.edits,
            [id]: {
              originalContent,
              currentContent: content,
              elementType,
            },
          };

          // Add to history
          const newHistory = state.history.slice(0, state.historyIndex + 1);
          newHistory.push({ ...newEdits });

          return {
            edits: newEdits,
            history: newHistory,
            historyIndex: newHistory.length - 1,
          };
        });
      },

      getElementContent: (id: string, defaultContent: string) => {
        const state = get();
        return state.edits[id]?.currentContent ?? defaultContent;
      },

      resetElement: (id: string) => {
        set((state) => {
          const newEdits = { ...state.edits };
          delete newEdits[id];
          return { edits: newEdits };
        });
      },

      resetAllEdits: () => {
        set({
          edits: {},
          history: [],
          historyIndex: -1,
          selectedElementId: null,
        });
      },

      // Undo/Redo
      undo: () => {
        set((state) => {
          if (state.historyIndex > 0) {
            const newIndex = state.historyIndex - 1;
            return {
              edits: state.history[newIndex],
              historyIndex: newIndex,
            };
          }
          if (state.historyIndex === 0) {
            return {
              edits: {},
              historyIndex: -1,
            };
          }
          return state;
        });
      },

      redo: () => {
        set((state) => {
          if (state.historyIndex < state.history.length - 1) {
            const newIndex = state.historyIndex + 1;
            return {
              edits: state.history[newIndex],
              historyIndex: newIndex,
            };
          }
          return state;
        });
      },

      canUndo: () => {
        const state = get();
        return state.historyIndex >= 0;
      },

      canRedo: () => {
        const state = get();
        return state.historyIndex < state.history.length - 1;
      },

      // Export edits as JSON
      exportEdits: () => {
        const state = get();
        return JSON.stringify(state.edits, null, 2);
      },
    }),
    {
      name: 'pure-candles-design-mode',
      partialize: (state) => ({
        edits: state.edits,
      }),
    }
  )
);
