import { LeitnerCard, LockedModeState, EnhancedLockedModeState } from '@/types';
import { computeDueCards, computeNextDueIn, getBoxStats, computeDueCardsInBox, computeNextDueInBox } from './leitner';

/**
 * Check if a card can be accessed in locked mode
 */
export function canAccessCard(
  card: LeitnerCard,
  isLockedMode: boolean,
  now: Date = new Date()
): boolean {
  if (!isLockedMode) return true;
  return card.nextReviewAt <= now.getTime();
}

/**
 * Check if library can be viewed in locked mode
 */
export function canViewLibrary(isLockedMode: boolean): boolean {
  return !isLockedMode; // Library is blocked in locked mode
}

/**
 * Check if card back should be blurred
 */
export function shouldBlurCardBack(
  card: LeitnerCard,
  isLockedMode: boolean,
  isReviewSession: boolean,
  now: Date = new Date()
): boolean {
  if (!isLockedMode) return false;
  if (isReviewSession && canAccessCard(card, true, now)) return false;
  return true; // Blur if locked and not in active review session
}

/**
 * Get locked mode state
 */
export function getLockedModeState(
  cards: LeitnerCard[],
  isLockedMode: boolean,
  now: Date = new Date()
): LockedModeState {
  const dueCards = computeDueCards(cards, now);
  const nextDueIn = computeNextDueIn(cards, now);

  return {
    isEnabled: isLockedMode,
    dueCount: dueCards.length,
    nextDueIn,
  };
}

/**
 * Check if user can start a review session
 */
export function canStartReview(
  cards: LeitnerCard[],
  isLockedMode: boolean,
  now: Date = new Date()
): boolean {
  if (!isLockedMode) return true;
  const dueCards = computeDueCards(cards, now);
  return dueCards.length > 0;
}

/**
 * Get message for locked empty state
 */
export function getLockedEmptyMessage(
  nextDueIn: number | null
): string {
  if (nextDueIn === null) {
    return 'No cards scheduled for review. Add more cards to continue learning!';
  }

  const hours = Math.floor(nextDueIn / (1000 * 60 * 60));
  const minutes = Math.floor((nextDueIn % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `Come back in ${days} day${days > 1 ? 's' : ''} for your next review!`;
  } else if (hours > 0) {
    return `Come back in ${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes > 1 ? 's' : ''} for your next review!`;
  } else {
    return `Come back in ${minutes} minute${minutes > 1 ? 's' : ''} for your next review!`;
  }
}

// ============================================
// Enhanced Locked Mode Functions (Per-Box)
// ============================================

/**
 * Check if a specific box can be accessed in locked mode
 */
export function canAccessBox(
  cards: LeitnerCard[],
  boxIndex: 1 | 2 | 3 | 4 | 5,
  isLockedMode: boolean,
  now: Date = new Date()
): boolean {
  if (!isLockedMode) return true;

  // In locked mode, can only access box if it has due cards
  const dueInBox = computeDueCardsInBox(cards, boxIndex, now);
  return dueInBox.length > 0;
}

/**
 * Get all accessible boxes in locked mode
 */
export function getAccessibleBoxes(
  cards: LeitnerCard[],
  isLockedMode: boolean,
  now: Date = new Date()
): (1 | 2 | 3 | 4 | 5)[] {
  if (!isLockedMode) return [1, 2, 3, 4, 5];

  return ([1, 2, 3, 4, 5] as const).filter(
    (boxIndex) => canAccessBox(cards, boxIndex, isLockedMode, now)
  );
}

/**
 * Get enhanced locked mode state with per-box info
 */
export function getEnhancedLockedModeState(
  cards: LeitnerCard[],
  isLockedMode: boolean,
  now: Date = new Date()
): EnhancedLockedModeState {
  const dueCards = computeDueCards(cards, now);
  const nextDueIn = computeNextDueIn(cards, now);

  const boxStates = {} as EnhancedLockedModeState['boxStates'];
  for (const boxIndex of [1, 2, 3, 4, 5] as const) {
    const dueCount = computeDueCardsInBox(cards, boxIndex, now).length;
    boxStates[boxIndex] = {
      accessible: canAccessBox(cards, boxIndex, isLockedMode, now),
      dueCount,
      nextDueIn: computeNextDueInBox(cards, boxIndex, now),
    };
  }

  return {
    isEnabled: isLockedMode,
    dueCount: dueCards.length,
    nextDueIn,
    accessibleBoxes: getAccessibleBoxes(cards, isLockedMode, now),
    boxStates,
  };
}
