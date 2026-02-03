import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalize a term for duplicate detection
 * - Trim whitespace
 * - Lowercase
 * - Collapse multiple spaces to single space
 */
export function normalizeTerm(term: string): string {
  return term.trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Get next due date based on box and intervals
 */
export function getNextDueDate(box: number): Date {
  const intervals: Record<number, number> = {
    1: 1,
    2: 2,
    3: 4,
    4: 8,
    5: 16,
  };

  const days = intervals[box] || 1;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

/**
 * Format date to YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Check if a date is today or in the past
 */
export function isDueToday(dueDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  return due <= today;
}

/**
 * Move card to new box after review
 */
export function getNextBox(currentBox: number, result: 'correct' | 'wrong'): number {
  if (result === 'wrong') {
    return 1;
  }
  
  // Correct: move up one box (max 5)
  return Math.min(currentBox + 1, 5);
}
