import { LeitnerCard, WordData } from '@/types';
import { generateId, getTodayString } from './utils';

// Leitner system intervals in days
export const BOX_INTERVALS = {
  1: 1,    // Review daily (tomorrow)
  2: 2,    // Review every 2 days
  3: 4,    // Review every 4 days
  4: 7,    // Review weekly
  5: 14,   // Review bi-weekly
} as const;

/**
 * Get start of today (midnight)
 */
function getStartOfToday(): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.getTime();
}

/**
 * Get start of a specific day (midnight)
 */
function getStartOfDay(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/**
 * Create a new Leitner card from word data
 */
export function createCard(wordData: WordData): LeitnerCard {
  const now = Date.now();
  return {
    id: generateId(),
    wordData,
    box: 1,
    lastReviewed: null,
    nextReview: getStartOfToday(), // Due today (immediately)
    correctCount: 0,
    incorrectCount: 0,
    createdAt: now,
  };
}

/**
 * Calculate next review date based on box number
 * Returns the start of the day (midnight) when the card should be reviewed
 */
export function calculateNextReview(box: 1 | 2 | 3 | 4 | 5): number {
  const days = BOX_INTERVALS[box];
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + days);
  nextDate.setHours(0, 0, 0, 0);
  return nextDate.getTime();
}

/**
 * Move card to next box (correct answer)
 */
export function moveCardUp(card: LeitnerCard): LeitnerCard {
  const newBox = Math.min(5, card.box + 1) as 1 | 2 | 3 | 4 | 5;
  return {
    ...card,
    box: newBox,
    lastReviewed: Date.now(),
    nextReview: calculateNextReview(newBox),
    correctCount: card.correctCount + 1,
  };
}

/**
 * Move card back to box 1 (incorrect answer)
 */
export function moveCardDown(card: LeitnerCard): LeitnerCard {
  return {
    ...card,
    box: 1,
    lastReviewed: Date.now(),
    nextReview: calculateNextReview(1),
    incorrectCount: card.incorrectCount + 1,
  };
}

/**
 * Check if card is due for review (today or earlier)
 */
export function isCardDue(card: LeitnerCard): boolean {
  const todayStart = getStartOfToday();
  const cardDueDate = getStartOfDay(new Date(card.nextReview));
  return cardDueDate <= todayStart;
}

/**
 * Get cards due today
 */
export function getDueCards(cards: LeitnerCard[]): LeitnerCard[] {
  return cards.filter(isCardDue).sort((a, b) => a.nextReview - b.nextReview);
}

/**
 * Get new cards (never reviewed)
 */
export function getNewCards(cards: LeitnerCard[]): LeitnerCard[] {
  return cards.filter((card) => card.lastReviewed === null);
}

/**
 * Get cards by box number
 */
export function getCardsByBox(
  cards: LeitnerCard[],
  box: 1 | 2 | 3 | 4 | 5
): LeitnerCard[] {
  return cards.filter((card) => card.box === box);
}

/**
 * Check if user has reached daily limit
 */
export function hasReachedDailyLimit(
  cards: LeitnerCard[],
  dailyLimit: number
): boolean {
  const todayString = getTodayString();
  const newCardsToday = cards.filter((card) => {
    if (!card.createdAt) return false;
    const cardDate = new Date(card.createdAt).toISOString().split('T')[0];
    return cardDate === todayString;
  });
  return newCardsToday.length >= dailyLimit;
}

/**
 * Get upcoming reviews (not due yet)
 */
export function getUpcomingReviews(cards: LeitnerCard[]): { date: string; count: number }[] {
  const todayStart = getStartOfToday();
  const upcoming: Record<string, number> = {};

  cards.forEach((card) => {
    const cardDueDate = getStartOfDay(new Date(card.nextReview));
    if (cardDueDate > todayStart) {
      const dateStr = new Date(cardDueDate).toISOString().split('T')[0];
      upcoming[dateStr] = (upcoming[dateStr] || 0) + 1;
    }
  });

  return Object.entries(upcoming)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
