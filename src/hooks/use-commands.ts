'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLeitner } from './use-leitner';
import { enrichWord, generateWordList, batchEnrichWords } from '@/lib/ai-agent';
import { parseCommand, CommandType } from '@/lib/command-parser';
import {
  Home,
  BookOpen,
  BarChart3,
  Settings,
  Sparkles,
  Camera,
  Calendar,
  Library,
  Plus,
  LucideIcon,
} from 'lucide-react';

export interface Command {
  id: string;
  type: CommandType;
  label: string;
  description: string;
  keywords: string[];
  icon: LucideIcon;
  category: 'action' | 'navigation' | 'generation';
  execute: (args?: any) => Promise<void> | void;
  shortcut?: string;
}

export function useCommands() {
  const router = useRouter();
  const { addWord, canAddNewWord } = useLeitner();
  
  const commands: Command[] = useMemo(() => [
    // Actions
    {
      id: 'add-word',
      type: 'add-word',
      label: 'Add Word',
      description: 'Add a single German word',
      keywords: ['add', 'new', 'word', 'create'],
      icon: Plus,
      category: 'action',
      execute: async (args: { word: string }) => {
        if (!canAddNewWord()) {
          throw new Error('Daily limit reached');
        }
        
        const wordData = await enrichWord(args.word, 'gemini');
        addWord(wordData);
      },
    },
    {
      id: 'generate-words',
      type: 'generate',
      label: 'Generate Words',
      description: 'AI-powered word list generation',
      keywords: ['generate', 'create', 'ai', 'bulk', 'list'],
      icon: Sparkles,
      category: 'generation',
      execute: async (args: { count: number; level: string }) => {
        router.push(`/generate?count=${args.count}&level=${args.level}`);
      },
      shortcut: '⌘G',
    },
    {
      id: 'extract-image',
      type: 'extract-image',
      label: 'Extract from Image',
      description: 'OCR words from a photo',
      keywords: ['ocr', 'image', 'photo', 'scan', 'extract', 'picture'],
      icon: Camera,
      category: 'action',
      execute: () => {
        router.push('/ocr');
      },
      shortcut: '⌘I',
    },
    {
      id: 'show-stats',
      type: 'show-stats',
      label: 'Dashboard',
      description: 'View statistics and progress',
      keywords: ['stats', 'statistics', 'dashboard', 'progress', 'chart'],
      icon: BarChart3,
      category: 'navigation',
      execute: () => {
        router.push('/dashboard');
      },
    },
    // Navigation
    {
      id: 'nav-home',
      type: 'navigate',
      label: 'Home',
      description: 'Go to home page',
      keywords: ['home', 'main', 'start'],
      icon: Home,
      category: 'navigation',
      execute: () => {
        router.push('/');
      },
    },
    {
      id: 'nav-review',
      type: 'navigate',
      label: 'Review',
      description: 'Start reviewing cards',
      keywords: ['review', 'study', 'practice', 'learn'],
      icon: BookOpen,
      category: 'navigation',
      execute: () => {
        router.push('/review');
      },
      shortcut: '⌘R',
    },
    {
      id: 'nav-backlog',
      type: 'navigate',
      label: 'Backlog',
      description: 'Manage scheduled words',
      keywords: ['backlog', 'queue', 'scheduled', 'future'],
      icon: Calendar,
      category: 'navigation',
      execute: () => {
        router.push('/backlog');
      },
      shortcut: '⌘B',
    },
    {
      id: 'nav-library',
      type: 'navigate',
      label: 'Library',
      description: 'Browse all words',
      keywords: ['library', 'all', 'words', 'collection'],
      icon: Library,
      category: 'navigation',
      execute: () => {
        router.push('/library');
      },
    },
    {
      id: 'nav-settings',
      type: 'navigate',
      label: 'Settings',
      description: 'Configure app settings',
      keywords: ['settings', 'config', 'preferences', 'options'],
      icon: Settings,
      category: 'navigation',
      execute: () => {
        router.push('/settings');
      },
    },
  ], [router, addWord, canAddNewWord]);
  
  const executeCommand = useCallback(async (commandId: string, args?: any) => {
    const command = commands.find((c) => c.id === commandId);
    if (!command) {
      throw new Error(`Command not found: ${commandId}`);
    }
    
    await command.execute(args);
  }, [commands]);
  
  const parseAndExecute = useCallback(async (input: string) => {
    const parsed = parseCommand(input);
    
    if (parsed.type === 'unknown' || parsed.confidence < 50) {
      throw new Error('Could not understand command');
    }
    
    // Find matching command by type
    const command = commands.find((c) => c.type === parsed.type);
    if (!command) {
      throw new Error(`No command for type: ${parsed.type}`);
    }
    
    await command.execute(parsed.args);
  }, [commands]);
  
  const searchCommands = useCallback((query: string): Command[] => {
    if (!query) return commands;
    
    const lowerQuery = query.toLowerCase();
    
    return commands.filter((cmd) => {
      const matchLabel = cmd.label.toLowerCase().includes(lowerQuery);
      const matchDesc = cmd.description.toLowerCase().includes(lowerQuery);
      const matchKeywords = cmd.keywords.some((kw) => kw.includes(lowerQuery));
      
      return matchLabel || matchDesc || matchKeywords;
    });
  }, [commands]);
  
  return {
    commands,
    executeCommand,
    parseAndExecute,
    searchCommands,
  };
}
