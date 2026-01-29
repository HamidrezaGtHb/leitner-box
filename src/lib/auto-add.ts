/**
 * Auto-Add from Backlog
 * Automatically adds ready backlog items to active cards based on daily limits
 */

import { BacklogItem, LeitnerCard } from '@/types';
import { createCard } from './leitner';

export interface AutoAddResult {
  addedCards: LeitnerCard[];
  remainingSlots: number;
  skippedItems: BacklogItem[];
}

/**
 * Calculate how many new words can be added today
 */
export function getRemainingDailySlots(
  newWordsToday: number,
  dailyLimit: number
): number {
  return Math.max(0, dailyLimit - newWordsToday);
}

/**
 * Get ready items from backlog (scheduled for now or past)
 */
export function getReadyItems(backlog: BacklogItem[]): BacklogItem[] {
  const now = Date.now();
  return backlog
    .filter((item) => item.scheduledFor <= now)
    .sort((a, b) => {
      // Sort by priority first (high > medium > low)
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      // Then by scheduled time (earliest first)
      return a.scheduledFor - b.scheduledFor;
    });
}

/**
 * Process auto-add from backlog
 * Returns cards to add and items to skip
 */
export function processAutoAdd(
  backlog: BacklogItem[],
  newWordsToday: number,
  dailyLimit: number
): AutoAddResult {
  const remainingSlots = getRemainingDailySlots(newWordsToday, dailyLimit);
  const readyItems = getReadyItems(backlog);

  const itemsToAdd = readyItems.slice(0, remainingSlots);
  const skippedItems = readyItems.slice(remainingSlots);

  const addedCards = itemsToAdd.map((item) => {
    return createCard(item.wordData, item.normalizedKey);
  });

  return {
    addedCards,
    remainingSlots: remainingSlots - addedCards.length,
    skippedItems,
  };
}

/**
 * Check if auto-add should run
 */
export function shouldRunAutoAdd(
  autoAddEnabled: boolean,
  readyCount: number,
  remainingSlots: number
): boolean {
  return autoAddEnabled && readyCount > 0 && remainingSlots > 0;
}
