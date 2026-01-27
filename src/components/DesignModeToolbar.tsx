import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pencil,
  Eye,
  EyeOff,
  Undo2,
  Redo2,
  RotateCcw,
  Download,
  X,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { useDesignModeStore } from '../stores/designModeStore';

export function DesignModeToolbar() {
  const {
    isDesignMode,
    isPreviewMode,
    selectedElementId,
    edits,
    toggleDesignMode,
    togglePreviewMode,
    setSelectedElement,
    resetElement,
    resetAllEdits,
    undo,
    redo,
    canUndo,
    canRedo,
    exportEdits,
  } = useDesignModeStore();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const editCount = Object.keys(edits).length;
  const hasEdits = editCount > 0;

  // Handle export to clipboard
  const handleExport = async () => {
    const exportData = exportEdits();
    try {
      await navigator.clipboard.writeText(exportData);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Floating toggle button when design mode is off
  if (!isDesignMode) {
    return (
      <motion.button
        data-design-toolbar
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={toggleDesignMode}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        title="Enter Design Mode (Ctrl+Shift+E)"
      >
        <Sparkles className="w-5 h-5" />
        <span className="font-medium">Design Mode</span>
      </motion.button>
    );
  }

  return (
    <>
      <AnimatePresence>
        {/* Main Toolbar */}
        <motion.div
          data-design-toolbar
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
            {/* Collapsed state */}
            {isCollapsed ? (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                className="flex items-center gap-2 px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">Design Mode</span>
                  {hasEdits && (
                    <span className="text-xs bg-violet-500 px-2 py-0.5 rounded-full">
                      {editCount} edit{editCount !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsCollapsed(false)}
                  className="p-1 hover:bg-slate-800 rounded"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </motion.div>
            ) : (
              /* Expanded state */
              <div className="px-2 py-2">
                {/* Header */}
                <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-700/50 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-semibold">Design Mode</span>
                    {hasEdits && (
                      <span className="text-xs bg-violet-500 px-2 py-0.5 rounded-full">
                        {editCount} edit{editCount !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setIsCollapsed(true)}
                      className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                      title="Minimize"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={toggleDesignMode}
                      className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                      title="Exit Design Mode"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  {/* Preview Toggle */}
                  <ToolbarButton
                    onClick={togglePreviewMode}
                    active={isPreviewMode}
                    title={isPreviewMode ? 'Exit Preview' : 'Preview Changes'}
                  >
                    {isPreviewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span className="text-xs">{isPreviewMode ? 'Edit' : 'Preview'}</span>
                  </ToolbarButton>

                  <Divider />

                  {/* Undo */}
                  <ToolbarButton
                    onClick={undo}
                    disabled={!canUndo()}
                    title="Undo (Ctrl+Z)"
                  >
                    <Undo2 className="w-4 h-4" />
                  </ToolbarButton>

                  {/* Redo */}
                  <ToolbarButton
                    onClick={redo}
                    disabled={!canRedo()}
                    title="Redo (Ctrl+Shift+Z)"
                  >
                    <Redo2 className="w-4 h-4" />
                  </ToolbarButton>

                  <Divider />

                  {/* Reset Selected */}
                  {selectedElementId && (
                    <ToolbarButton
                      onClick={() => {
                        resetElement(selectedElementId);
                        setSelectedElement(null);
                      }}
                      title="Reset Selected Element"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span className="text-xs">Reset</span>
                    </ToolbarButton>
                  )}

                  {/* Reset All */}
                  <ToolbarButton
                    onClick={resetAllEdits}
                    disabled={!hasEdits}
                    variant="danger"
                    title="Reset All Changes"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="text-xs">Reset All</span>
                  </ToolbarButton>

                  <Divider />

                  {/* Export */}
                  <ToolbarButton
                    onClick={handleExport}
                    disabled={!hasEdits}
                    variant="primary"
                    title="Export Changes"
                  >
                    {copySuccess ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span className="text-xs">{copySuccess ? 'Copied!' : 'Export'}</span>
                  </ToolbarButton>
                </div>

                {/* Help text */}
                <div className="px-2 pt-2 text-xs text-slate-500 border-t border-slate-700/50 mt-2">
                  Click to select • Double-click to edit • Escape to deselect
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Selection info popup */}
        {selectedElementId && !isPreviewMode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg"
          >
            <span className="text-slate-400">Selected:</span>{' '}
            <span className="font-mono text-violet-400">{selectedElementId}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Toolbar Button Component
function ToolbarButton({
  onClick,
  disabled,
  active,
  title,
  variant = 'default',
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  title?: string;
  variant?: 'default' | 'primary' | 'danger';
  children: React.ReactNode;
}) {
  const baseStyles =
    'flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium';

  const variantStyles = {
    default: `hover:bg-slate-800 ${active ? 'bg-slate-700 text-white' : 'text-slate-300'}`,
    primary: 'bg-violet-600 hover:bg-violet-500 text-white',
    danger: 'hover:bg-red-500/20 text-red-400 hover:text-red-300',
  };

  const disabledStyles = 'opacity-40 cursor-not-allowed pointer-events-none';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${baseStyles} ${variantStyles[variant]} ${disabled ? disabledStyles : ''}`}
    >
      {children}
    </button>
  );
}

// Divider Component
function Divider() {
  return <div className="w-px h-6 bg-slate-700 mx-1" />;
}
