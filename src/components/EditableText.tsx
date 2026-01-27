import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDesignModeStore, ElementEdit } from '../stores/designModeStore';
import { cn } from '../lib/utils';

interface EditableTextProps {
  id: string;
  children: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  elementType?: ElementEdit['elementType'];
  multiline?: boolean;
  style?: React.CSSProperties;
}

export function EditableText({
  id,
  children,
  as: Component = 'span',
  className,
  elementType = 'text',
  multiline = false,
  style,
}: EditableTextProps) {
  const {
    isDesignMode,
    isPreviewMode,
    selectedElementId,
    hoveredElementId,
    setSelectedElement,
    setHoveredElement,
    updateElementContent,
    getElementContent,
    edits,
  } = useDesignModeStore();

  const [isEditing, setIsEditing] = useState(false);
  const [localContent, setLocalContent] = useState(children);
  const contentRef = useRef<HTMLElement>(null);
  const originalContent = children;

  // Get the current content (either edited or original)
  const currentContent = getElementContent(id, originalContent);
  const hasEdits = edits[id] !== undefined && edits[id].currentContent !== edits[id].originalContent;

  // Sync local content with store
  useEffect(() => {
    setLocalContent(currentContent);
  }, [currentContent]);

  // Focus on the editable element when editing starts
  useEffect(() => {
    if (isEditing && contentRef.current) {
      contentRef.current.focus();
      // Place cursor at end
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(contentRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [isEditing]);

  // Handle click to select/edit
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!isDesignMode || isPreviewMode) return;

    e.preventDefault();
    e.stopPropagation();

    if (selectedElementId === id) {
      // Already selected, start editing
      setIsEditing(true);
    } else {
      // Select this element
      setSelectedElement(id);
      setIsEditing(false);
    }
  }, [isDesignMode, isPreviewMode, selectedElementId, id, setSelectedElement]);

  // Handle double-click to directly edit
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    if (!isDesignMode || isPreviewMode) return;

    e.preventDefault();
    e.stopPropagation();

    setSelectedElement(id);
    setIsEditing(true);
  }, [isDesignMode, isPreviewMode, id, setSelectedElement]);

  // Handle blur to save changes
  const handleBlur = useCallback(() => {
    if (!isEditing) return;

    setIsEditing(false);

    if (localContent !== originalContent) {
      updateElementContent(id, localContent, originalContent, elementType);
    }
  }, [isEditing, localContent, originalContent, id, elementType, updateElementContent]);

  // Handle input changes
  const handleInput = useCallback((e: React.FormEvent<HTMLElement>) => {
    const target = e.currentTarget;
    setLocalContent(target.textContent || '');
  }, []);

  // Handle key down for special keys
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setLocalContent(currentContent);
      setIsEditing(false);
      setSelectedElement(null);
    } else if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleBlur();
    }
  }, [currentContent, multiline, handleBlur, setSelectedElement]);

  // Handle mouse enter/leave for hover state
  const handleMouseEnter = useCallback(() => {
    if (isDesignMode && !isPreviewMode) {
      setHoveredElement(id);
    }
  }, [isDesignMode, isPreviewMode, id, setHoveredElement]);

  const handleMouseLeave = useCallback(() => {
    if (isDesignMode && !isPreviewMode) {
      setHoveredElement(null);
    }
  }, [isDesignMode, isPreviewMode, setHoveredElement]);

  // Determine styling based on state
  const isSelected = selectedElementId === id;
  const isHovered = hoveredElementId === id;

  // If not in design mode, just render the content
  if (!isDesignMode) {
    return React.createElement(
      Component,
      { className, style },
      currentContent
    );
  }

  // In design mode, render with editing capabilities
  const editableStyles: React.CSSProperties = {
    ...style,
    outline: 'none',
    position: 'relative',
  };

  return React.createElement(
    Component,
    {
      ref: contentRef as React.Ref<HTMLElement>,
      'data-editable-id': id,
      'data-editable-type': elementType,
      className: cn(
        className,
        'editable-element',
        isSelected && 'editable-selected',
        isHovered && !isSelected && 'editable-hovered',
        isEditing && 'editable-editing',
        hasEdits && 'editable-modified'
      ),
      style: editableStyles,
      onClick: handleClick,
      onDoubleClick: handleDoubleClick,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onBlur: handleBlur,
      onInput: handleInput,
      onKeyDown: handleKeyDown,
      contentEditable: isEditing,
      suppressContentEditableWarning: true,
    },
    localContent
  );
}

// Convenience components for common element types
export function EditableHeading({
  id,
  children,
  level = 1,
  className,
  style,
}: {
  id: string;
  children: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  style?: React.CSSProperties;
}) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <EditableText
      id={id}
      as={Tag}
      className={className}
      elementType="heading"
      style={style}
    >
      {children}
    </EditableText>
  );
}

export function EditableParagraph({
  id,
  children,
  className,
  style,
}: {
  id: string;
  children: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <EditableText
      id={id}
      as="p"
      className={className}
      elementType="text"
      multiline
      style={style}
    >
      {children}
    </EditableText>
  );
}

export function EditableButton({
  id,
  children,
  className,
  style,
  onClick,
}: {
  id: string;
  children: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const { isDesignMode, isPreviewMode } = useDesignModeStore();

  // In design mode, don't trigger button actions
  const handleClick = (e: React.MouseEvent) => {
    if (!isDesignMode || isPreviewMode) {
      onClick?.();
    }
  };

  return (
    <EditableText
      id={id}
      as="span"
      className={className}
      elementType="button"
      style={style}
    >
      {children}
    </EditableText>
  );
}
