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
 * Calculate available new card slots for today
 * Formula: dailyLimit - (box1DueToday - box1NewToday)
 * This ensures Box 1 never exceeds the daily capacity
 */
export async function calculateAvailableNewCardSlots(
  supabase: any,
  userId: string
): Promise<{ availableSlots: number; box1Due: number; box1New: number; dailyLimit: number }> {
  const today = new Date().toISOString().split('T')[0];
  
  // Count Box 1 cards due today
  const { count: box1Due } = await supabase
    .from('cards')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('box', 1)
    .lte('due_date', today);
  
  // Count Box 1 cards created today
  const { count: box1New } = await supabase
    .from('cards')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('box', 1)
    .gte('created_at', `${today}T00:00:00`)
    .lt('created_at', `${today}T23:59:59`);
  
  // Get daily limit from settings
  const { data: settings } = await supabase
    .from('settings')
    .select('daily_limit')
    .eq('user_id', userId)
    .single();
  
  const dailyLimit = settings?.daily_limit || 10;
  const availableSlots = Math.max(0, dailyLimit - ((box1Due || 0) - (box1New || 0)));
  
  return {
    availableSlots,
    box1Due: box1Due || 0,
    box1New: box1New || 0,
    dailyLimit,
  };
}
