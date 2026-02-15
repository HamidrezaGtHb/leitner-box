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

/**
 * Get responsive font size class based on term length
 * Handles long German compound words gracefully
 */
export function getTermFontSize(term: string): string {
  const length = term.length;
  if (length <= 10) return 'text-5xl md:text-6xl'; // Very large - short words
  if (length <= 15) return 'text-4xl md:text-5xl'; // Large - normal words
  if (length <= 20) return 'text-3xl md:text-4xl'; // Medium - longer words
  if (length <= 30) return 'text-2xl md:text-3xl'; // Small - compound words
  return 'text-xl md:text-2xl'; // Very small - very long compounds
}

/**
 * Calculate available new card slots for today - Pure Leitner Method
 * Formula: availableSlots = dailyLimit - box1DueToday
 * This ensures sustainable daily workload based on cognitive capacity
 */
export async function calculateAvailableNewCardSlots(
  supabase: any,
  userId: string
): Promise<{ availableSlots: number; box1DueToday: number; dailyLimit: number }> {
  const today = new Date().toISOString().split('T')[0];
  
  // Count ONLY Box 1 cards due today or in past
  const { count: box1DueToday } = await supabase
    .from('cards')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('box', 1)
    .lte('due_date', today);
  
  // Get daily limit from settings
  const { data: settings } = await supabase
    .from('settings')
    .select('daily_limit')
    .eq('user_id', userId)
    .single();
  
  const dailyLimit = settings?.daily_limit || 10;
  // Pure Leitner: Available slots = daily capacity - cards due today
  const availableSlots = Math.max(0, dailyLimit - (box1DueToday || 0));
  
  return {
    availableSlots,
    box1DueToday: box1DueToday || 0,
    dailyLimit,
  };
}
