'use client';

import { useMemo } from 'react';
import { useLeitner } from './use-leitner';
import { useBacklog } from './use-backlog';
import { useSettings } from './use-settings';

export interface Suggestion {
  id: string;
  type: 'info' | 'action' | 'warning' | 'success';
  message: string;
  action?: {
    label: string;
    execute: () => void;
  };
  priority: number; // 1-10 (higher = show first)
  dismissable: boolean;
}

export function useAISuggestions() {
  const { cards, getProgress, dueCards, isLoaded } = useLeitner();
  const { readyItems } = useBacklog();
  const { settings } = useSettings();
  
  const suggestions = useMemo((): Suggestion[] => {
    if (!isLoaded) return [];
    
    const progress = getProgress();
    const suggestions: Suggestion[] = [];
    
    // 1. Cards due for review (high priority)
    if (dueCards.length >= 10) {
      suggestions.push({
        id: 'review-reminder',
        type: 'warning',
        message: `${dueCards.length} cards waiting for review!`,
        action: {
          label: 'Start Review',
          execute: () => {
            window.location.href = '/review';
          },
        },
        priority: 9,
        dismissable: false,
      });
    } else if (dueCards.length > 0) {
      suggestions.push({
        id: 'review-available',
        type: 'info',
        message: `${dueCards.length} card${dueCards.length > 1 ? 's' : ''} ready to review`,
        action: {
          label: 'Review Now',
          execute: () => {
            window.location.href = '/review';
          },
        },
        priority: 7,
        dismissable: true,
      });
    }
    
    // 2. Backlog ready items
    if (readyItems.length > 0) {
      suggestions.push({
        id: 'backlog-ready',
        type: 'action',
        message: `${readyItems.length} word${readyItems.length > 1 ? 's' : ''} ready in backlog`,
        action: {
          label: 'Add Them',
          execute: () => {
            window.location.href = '/backlog';
          },
        },
        priority: 8,
        dismissable: true,
      });
    }
    
    // 3. No new words today
    if (progress.newWordsToday === 0) {
      suggestions.push({
        id: 'no-new-words',
        type: 'action',
        message: 'No new words added today',
        action: {
          label: 'Generate 10 B1',
          execute: () => {
            window.location.href = '/generate?count=10&level=B1';
          },
        },
        priority: 6,
        dismissable: true,
      });
    }
    
    // 4. Daily limit approaching
    const remaining = settings.dailyNewWords - progress.newWordsToday;
    if (remaining > 0 && remaining <= 3) {
      suggestions.push({
        id: 'limit-approaching',
        type: 'info',
        message: `${remaining} slot${remaining > 1 ? 's' : ''} left for today`,
        priority: 5,
        dismissable: true,
      });
    }
    
    // 5. Daily limit reached
    if (progress.newWordsToday >= settings.dailyNewWords) {
      suggestions.push({
        id: 'daily-complete',
        type: 'success',
        message: 'Daily goal completed! Great job! 🎉',
        priority: 6,
        dismissable: true,
      });
    }
    
    // 6. Empty collection
    if (cards.length === 0) {
      suggestions.push({
        id: 'getting-started',
        type: 'info',
        message: 'Get started by adding your first words',
        action: {
          label: 'Generate Words',
          execute: () => {
            window.location.href = '/generate';
          },
        },
        priority: 10,
        dismissable: false,
      });
    }
    
    // 7. Motivational milestone
    if (cards.length === 50) {
      suggestions.push({
        id: 'milestone-50',
        type: 'success',
        message: '50 words milestone! Keep going! 💪',
        priority: 7,
        dismissable: true,
      });
    }
    
    if (cards.length === 100) {
      suggestions.push({
        id: 'milestone-100',
        type: 'success',
        message: '100 words! You\'re doing amazing! 🌟',
        priority: 7,
        dismissable: true,
      });
    }
    
    // Sort by priority (higher first)
    return suggestions.sort((a, b) => b.priority - a.priority);
  }, [cards, dueCards, readyItems, isLoaded, getProgress, settings]);
  
  return {
    suggestions,
    topSuggestion: suggestions[0] || null,
    hasSuggestions: suggestions.length > 0,
  };
}
