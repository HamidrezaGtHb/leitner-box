'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface KeyboardShortcutsOptions {
  onCommandPalette?: () => void;
  enabled?: boolean;
}

export function useKeyboardShortcuts({ 
  onCommandPalette, 
  enabled = true 
}: KeyboardShortcutsOptions = {}) {
  const router = useRouter();
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!enabled) return;
    
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modifier = isMac ? e.metaKey : e.ctrlKey;
    
    // Ignore shortcuts when typing in inputs/textareas
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      // Allow Cmd/Ctrl+K even in inputs
      if (!(modifier && e.key === 'k')) {
        return;
      }
    }
    
    // Cmd/Ctrl + K: Command Palette
    if (modifier && e.key === 'k') {
      e.preventDefault();
      onCommandPalette?.();
      return;
    }
    
    // Cmd/Ctrl + G: Generate
    if (modifier && e.key === 'g') {
      e.preventDefault();
      router.push('/generate');
      return;
    }
    
    // Cmd/Ctrl + I: Image/OCR
    if (modifier && e.key === 'i') {
      e.preventDefault();
      router.push('/ocr');
      return;
    }
    
    // Cmd/Ctrl + B: Backlog
    if (modifier && e.key === 'b') {
      e.preventDefault();
      router.push('/backlog');
      return;
    }
    
    // Cmd/Ctrl + R: Review (prevent default browser refresh)
    if (modifier && e.key === 'r') {
      e.preventDefault();
      router.push('/review');
      return;
    }
    
    // Cmd/Ctrl + D: Dashboard
    if (modifier && e.key === 'd') {
      e.preventDefault();
      router.push('/dashboard');
      return;
    }
    
    // Cmd/Ctrl + L: Library
    if (modifier && e.key === 'l') {
      e.preventDefault();
      router.push('/library');
      return;
    }
    
    // Cmd/Ctrl + ,: Settings
    if (modifier && e.key === ',') {
      e.preventDefault();
      router.push('/settings');
      return;
    }
    
    // Cmd/Ctrl + H: Home
    if (modifier && e.key === 'h') {
      e.preventDefault();
      router.push('/');
      return;
    }
  }, [enabled, onCommandPalette, router]);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  
  return {
    shortcuts: [
      { key: '⌘K', description: 'Command Palette' },
      { key: '⌘G', description: 'Generate Words' },
      { key: '⌘I', description: 'Extract from Image' },
      { key: '⌘B', description: 'Open Backlog' },
      { key: '⌘R', description: 'Start Review' },
      { key: '⌘D', description: 'Dashboard' },
      { key: '⌘L', description: 'Library' },
      { key: '⌘H', description: 'Home' },
      { key: '⌘,', description: 'Settings' },
    ],
  };
}
