import { LeitnerCard, WordData, StrictLeitnerConfig, BoxStats, DashboardStats } from '@/types';
import { generateId } from './utils';

// Default Leitner configuration
export const DEFAULT_LEITNER_CONFIG: StrictLeitnerConfig = {
  intervals: [1, 2, 4, 7, 14], // days per box
  maxBox: 5,
};

// ============================================
// Core Strict Leitner Functions
// ============================================

/**
 * Compute which cards are due for review
 */
export function computeDueCards(
  cards: LeitnerCard[],
  now: Date = new Date()
): LeitnerCard[] {
  return cards.filter((card) => card.nextReviewAt <= now.getTime());
}

/**
 * Compute milliseconds until the next card becomes due
 * Returns null if no future cards exist
 */
export function computeNextDueIn(
  cards: LeitnerCard[],
  now: Date = new Date()
): number | null {
  const futureCards = cards
    .filter((card) => card.nextReviewAt > now.getTime())
    .sort((a, b) => a.nextReviewAt - b.nextReviewAt);

  if (futureCards.length === 0) return null;

  return futureCards[0].nextReviewAt - now.getTime();
}

/**
 * Apply user's answer and update card according to strict Leitner rules
 */
export function applyAnswer(
  card: LeitnerCard,
  answer: 'correct' | 'wrong' | 'hard',
  config: StrictLeitnerConfig = DEFAULT_LEITNER_CONFIG
): LeitnerCard {
  const now = Date.now();
  let newBoxIndex = card.boxIndex;

  // Apply Leitner rules
  if (answer === 'correct') {
    newBoxIndex = Math.min(card.boxIndex + 1, config.maxBox) as 1 | 2 | 3 | 4 | 5;
  } else if (answer === 'wrong') {
    newBoxIndex = 1; // Reset to Box 1
  } else if (answer === 'hard') {
    newBoxIndex = Math.max(1, card.boxIndex - 1) as 1 | 2 | 3 | 4 | 5; // Move back one box
  }

  // Calculate next review time
  const intervalDays = config.intervals[newBoxIndex - 1];
  const nextReviewAt = now + intervalDays * 24 * 60 * 60 * 1000;

  return {
    ...card,
    boxIndex: newBoxIndex,
    lastReviewedAt: now,
    nextReviewAt,
    lastAnswer: answer,
    correctCount: answer === 'correct' ? card.correctCount + 1 : card.correctCount,
    incorrectCount: answer === 'wrong' ? card.incorrectCount + 1 : card.incorrectCount,
    hardCount: answer === 'hard' ? card.hardCount + 1 : card.hardCount,
  };
}

/**
 * Get cards in a specific box
 */
export function getCardsByBox(
  cards: LeitnerCard[],
  boxIndex: 1 | 2 | 3 | 4 | 5
): LeitnerCard[] {
  return cards.filter((card) => card.boxIndex === boxIndex);
}

/**
 * Get new cards (Box 1, never reviewed)
 */
export function getNewCards(cards: LeitnerCard[]): LeitnerCard[] {
  return cards.filter((card) => card.boxIndex === 1 && card.lastReviewedAt === null);
}

/**
 * Create a new Leitner card from word data
 */
export function createCard(
  wordData: WordData,
  normalizedKey: string,
  config: StrictLeitnerConfig = DEFAULT_LEITNER_CONFIG
): LeitnerCard {
  const now = Date.now();
  const firstIntervalDays = config.intervals[0];
  const nextReviewAt = now + firstIntervalDays * 24 * 60 * 60 * 1000;

  return {
    id: generateId(),
    normalizedKey,
    wordData,
    boxIndex: 1,
    lastReviewedAt: null,
    nextReviewAt,
    correctCount: 0,
    incorrectCount: 0,
    hardCount: 0,
    createdAt: now,
  };
}

/**
 * Check if user has reached daily new words limit
 */
export function hasReachedDailyLimit(
  todayNewWords: number,
  limit: number
): boolean {
  return todayNewWords >= limit;
}

/**
 * Get cards distribution across boxes
 */
export function getBoxDistribution(cards: LeitnerCard[]): Record<1 | 2 | 3 | 4 | 5, number> {
  return {
    1: getCardsByBox(cards, 1).length,
    2: getCardsByBox(cards, 2).length,
    3: getCardsByBox(cards, 3).length,
    4: getCardsByBox(cards, 4).length,
    5: getCardsByBox(cards, 5).length,
  };
}

/**
 * Format next due time as human-readable string
 */
export function formatNextDueIn(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  return `${seconds} second${seconds > 1 ? 's' : ''}`;
}

// ============================================
// Per-Box Statistics Functions
// ============================================

/**
 * Compute due cards for a specific box
 */
export function computeDueCardsInBox(
  cards: LeitnerCard[],
  boxIndex: 1 | 2 | 3 | 4 | 5,
  now: Date = new Date()
): LeitnerCard[] {
  return cards.filter(
    (card) => card.boxIndex === boxIndex && card.nextReviewAt <= now.getTime()
  );
}

/**
 * Compute next due time for a specific box
 * Returns null if no future cards in this box
 */
export function computeNextDueInBox(
  cards: LeitnerCard[],
  boxIndex: 1 | 2 | 3 | 4 | 5,
  now: Date = new Date()
): number | null {
  const boxCards = cards
    .filter((card) => card.boxIndex === boxIndex && card.nextReviewAt > now.getTime())
    .sort((a, b) => a.nextReviewAt - b.nextReviewAt);

  if (boxCards.length === 0) return null;
  return boxCards[0].nextReviewAt - now.getTime();
}

/**
 * Get complete statistics for a specific box
 */
export function getBoxStats(
  cards: LeitnerCard[],
  boxIndex: 1 | 2 | 3 | 4 | 5,
  now: Date = new Date()
): BoxStats {
  const boxCards = getCardsByBox(cards, boxIndex);
  return {
    boxNumber: boxIndex,
    totalCount: boxCards.length,
    dueCount: computeDueCardsInBox(cards, boxIndex, now).length,
    nextDueIn: computeNextDueInBox(cards, boxIndex, now),
  };
}

/**
 * Get complete dashboard statistics
 */
export function getDashboardStats(
  cards: LeitnerCard[],
  dailyLimit: number,
  now: Date = new Date()
): DashboardStats {
  const todayString = now.toISOString().split('T')[0];
  const newWordsToday = cards.filter((card) => {
    const cardDate = new Date(card.createdAt).toISOString().split('T')[0];
    return cardDate === todayString;
  }).length;

  return {
    totalCards: cards.length,
    totalDue: computeDueCards(cards, now).length,
    nextDueIn: computeNextDueIn(cards, now),
    boxes: {
      1: getBoxStats(cards, 1, now),
      2: getBoxStats(cards, 2, now),
      3: getBoxStats(cards, 3, now),
      4: getBoxStats(cards, 4, now),
      5: getBoxStats(cards, 5, now),
    },
    newWordsToday,
    dailyLimit,
  };
}

// ============================================
// Legacy compatibility functions (deprecated)
// ============================================

/**
 * @deprecated Use computeDueCards instead
 */
export function getDueCards(cards: LeitnerCard[]): LeitnerCard[] {
  return computeDueCards(cards);
}

/**
 * @deprecated Use applyAnswer with 'correct' instead
 */
export function moveCardUp(
  card: LeitnerCard,
  intervalDays: number[]
): LeitnerCard {
  return applyAnswer(card, 'correct', {
    intervals: intervalDays,
    maxBox: 5,
  });
}

/**
 * @deprecated Use applyAnswer with 'wrong' instead
 */
export function moveCardDown(
  card: LeitnerCard,
  intervalDays: number[]
): LeitnerCard {
  return applyAnswer(card, 'wrong', {
    intervals: intervalDays,
    maxBox: 5,
  });
}
