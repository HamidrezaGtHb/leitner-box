'use client';

import { useCallback, useEffect, useState } from 'react';
import { useLeitner } from './use-leitner';
import { useBacklog } from './use-backlog';
import { useSettings } from './use-settings';
import { processAutoAdd, getRemainingDailySlots, shouldRunAutoAdd } from '@/lib/auto-add';

export interface AutoAddState {
  lastRunDate: string | null;
  addedCount: number;
  isRunning: boolean;
}

/**
 * Hook for automatic backlog-to-active card conversion
 */
export function useAutoAdd() {
  const { cards, addCard, getProgress } = useLeitner();
  const { backlog, readyItems, removeFromBacklog } = useBacklog();
  const { settings } = useSettings();
  const [state, setState] = useState<AutoAddState>({
    lastRunDate: null,
    addedCount: 0,
    isRunning: false,
  });

  const progress = getProgress();
  const remainingSlots = getRemainingDailySlots(
    progress.newWordsToday,
    settings.dailyNewWords
  );

  /**
   * Manually trigger auto-add
   */
  const performAutoAdd = useCallback(async () => {
    if (!settings.autoAddFromBacklog) return { added: 0, skipped: 0 };
    if (readyItems.length === 0) return { added: 0, skipped: 0 };
    if (remainingSlots === 0) return { added: 0, skipped: 0 };

    setState((prev) => ({ ...prev, isRunning: true }));

    try {
      const result = processAutoAdd(
        backlog,
        progress.newWordsToday,
        settings.dailyNewWords
      );

      // Add cards one by one
      for (const card of result.addedCards) {
        await addCard(card);
        // Find and remove the corresponding backlog item
        const backlogItem = readyItems.find(
          (item) => item.normalizedKey === card.normalizedKey
        );
        if (backlogItem) {
          removeFromBacklog(backlogItem.id);
        }
      }

      const today = new Date().toISOString().split('T')[0];
      setState({
        lastRunDate: today,
        addedCount: result.addedCards.length,
        isRunning: false,
      });

      return {
        added: result.addedCards.length,
        skipped: result.skippedItems.length,
      };
    } catch (error) {
      setState((prev) => ({ ...prev, isRunning: false }));
      throw error;
    }
  }, [
    settings.autoAddFromBacklog,
    settings.dailyNewWords,
    readyItems,
    remainingSlots,
    backlog,
    progress.newWordsToday,
    addCard,
    removeFromBacklog,
  ]);

  /**
   * Auto-run on mount if enabled and there are ready items
   */
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    // Only run once per day
    if (state.lastRunDate === today) return;

    // Check if should run
    const shouldRun = shouldRunAutoAdd(
      settings.autoAddFromBacklog,
      readyItems.length,
      remainingSlots
    );

    if (shouldRun) {
      performAutoAdd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only on mount

  return {
    performAutoAdd,
    canAutoAdd: settings.autoAddFromBacklog && readyItems.length > 0 && remainingSlots > 0,
    remainingSlots,
    readyCount: readyItems.length,
    isRunning: state.isRunning,
    lastAddedCount: state.addedCount,
  };
}
