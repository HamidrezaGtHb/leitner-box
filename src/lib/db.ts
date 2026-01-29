import { getSupabase, isSupabaseConfigured } from './supabase';
import { LeitnerCard, UserSettings, DailyStats, BacklogItem, WordData } from '@/types';

// Row types for Supabase responses
interface CardRow {
  id: string;
  user_id: string;
  normalized_key: string;
  word_data: WordData;
  box_index: number;
  last_reviewed_at: string | null;
  next_review_at: string;
  last_answer: string | null;
  correct_count: number;
  incorrect_count: number;
  hard_count: number;
  created_at: string;
}

interface SettingsRow {
  id: string;
  user_id: string;
  daily_new_words: number;
  theme: string;
  is_locked_mode: boolean;
  review_intervals: number[];
  auto_add_from_backlog: boolean;
  max_backlog_size: number;
}

interface DailyStatsRow {
  id: string;
  user_id: string;
  date: string;
  new_words: number;
  reviewed: number;
  correct: number;
  incorrect: number;
  hard: number;
}

interface BacklogRow {
  id: string;
  user_id: string;
  normalized_key: string;
  word_data: WordData;
  scheduled_for: string;
  priority: string;
  source: string;
  created_at: string;
}

// ============ CARDS ============

export async function dbLoadCards(): Promise<LeitnerCard[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error loading cards:', error);
    return [];
  }

  return ((data as CardRow[]) || []).map((row) => ({
    id: row.id,
    userId: row.user_id,
    normalizedKey: row.normalized_key,
    wordData: row.word_data as WordData,
    boxIndex: row.box_index as 1 | 2 | 3 | 4 | 5,
    lastReviewedAt: row.last_reviewed_at ? new Date(row.last_reviewed_at).getTime() : null,
    nextReviewAt: new Date(row.next_review_at).getTime(),
    lastAnswer: row.last_answer as 'correct' | 'wrong' | 'hard' | undefined,
    correctCount: row.correct_count,
    incorrectCount: row.incorrect_count,
    hardCount: row.hard_count,
    createdAt: new Date(row.created_at).getTime(),
  }));
}

export async function dbSaveCard(card: LeitnerCard): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from('cards')
    .upsert({
      id: card.id,
      user_id: user.id,
      normalized_key: card.normalizedKey,
      word_data: card.wordData,
      box_index: card.boxIndex,
      last_reviewed_at: card.lastReviewedAt ? new Date(card.lastReviewedAt).toISOString() : null,
      next_review_at: new Date(card.nextReviewAt).toISOString(),
      last_answer: card.lastAnswer || null,
      correct_count: card.correctCount,
      incorrect_count: card.incorrectCount,
      hard_count: card.hardCount,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error saving card:', error);
  }
}

export async function dbDeleteCard(cardId: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  const { error } = await supabase
    .from('cards')
    .delete()
    .eq('id', cardId);

  if (error) {
    console.error('Error deleting card:', error);
  }
}

export async function dbFindCardByNormalizedKey(
  normalizedKey: string,
  userId: string
): Promise<LeitnerCard | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('user_id', userId)
    .eq('normalized_key', normalizedKey)
    .single();

  if (error || !data) return null;

  const row = data as CardRow;
  return {
    id: row.id,
    userId: row.user_id,
    normalizedKey: row.normalized_key,
    wordData: row.word_data as WordData,
    boxIndex: row.box_index as 1 | 2 | 3 | 4 | 5,
    lastReviewedAt: row.last_reviewed_at ? new Date(row.last_reviewed_at).getTime() : null,
    nextReviewAt: new Date(row.next_review_at).getTime(),
    lastAnswer: row.last_answer as 'correct' | 'wrong' | 'hard' | undefined,
    correctCount: row.correct_count,
    incorrectCount: row.incorrect_count,
    hardCount: row.hard_count,
    createdAt: new Date(row.created_at).getTime(),
  };
}

// ============ SETTINGS ============

export async function dbLoadSettings(): Promise<UserSettings | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error || !data) {
    // Create default settings if not found
    const defaultSettings: UserSettings = {
      dailyNewWords: 10,
      theme: 'system',
      isLockedMode: false,
      reviewIntervals: [1, 2, 4, 7, 14],
      autoAddFromBacklog: true,
      maxBacklogSize: 500,
    };
    
    await dbSaveSettings(defaultSettings);
    return defaultSettings;
  }

  const row = data as SettingsRow;
  return {
    dailyNewWords: row.daily_new_words as 5 | 10 | 15,
    theme: row.theme as 'light' | 'dark' | 'system',
    isLockedMode: row.is_locked_mode,
    reviewIntervals: row.review_intervals,
    autoAddFromBacklog: row.auto_add_from_backlog,
    maxBacklogSize: row.max_backlog_size,
  };
}

export async function dbSaveSettings(settings: UserSettings): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from('settings')
    .upsert({
      user_id: user.id,
      daily_new_words: settings.dailyNewWords,
      theme: settings.theme,
      is_locked_mode: settings.isLockedMode,
      review_intervals: settings.reviewIntervals,
      auto_add_from_backlog: settings.autoAddFromBacklog,
      max_backlog_size: settings.maxBacklogSize,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error saving settings:', error);
  }
}

// ============ DAILY STATS ============

export async function dbLoadDailyStats(): Promise<DailyStats[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('daily_stats')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false })
    .limit(30);

  if (error) {
    console.error('Error loading daily stats:', error);
    return [];
  }

  return ((data as DailyStatsRow[]) || []).map((row) => ({
    date: row.date,
    newWords: row.new_words,
    reviewed: row.reviewed,
    correct: row.correct,
    incorrect: row.incorrect,
    hard: row.hard,
  }));
}

export async function dbUpdateTodayStats(
  newWords: number = 0,
  reviewed: number = 0,
  correct: number = 0,
  incorrect: number = 0,
  hard: number = 0
): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const today = new Date().toISOString().split('T')[0];

  // Try to get existing stats for today
  const { data: existing } = await supabase
    .from('daily_stats')
    .select('*')
    .eq('user_id', user.id)
    .eq('date', today)
    .single();

  if (existing) {
    // Update existing
    const row = existing as DailyStatsRow;
    const { error } = await supabase
      .from('daily_stats')
      .update({
        new_words: row.new_words + newWords,
        reviewed: row.reviewed + reviewed,
        correct: row.correct + correct,
        incorrect: row.incorrect + incorrect,
        hard: row.hard + hard,
      })
      .eq('user_id', user.id)
      .eq('date', today);

    if (error) {
      console.error('Error updating daily stats:', error);
    }
  } else {
    // Insert new
    const { error } = await supabase
      .from('daily_stats')
      .insert({
        user_id: user.id,
        date: today,
        new_words: newWords,
        reviewed,
        correct,
        incorrect,
        hard,
      });

    if (error) {
      console.error('Error inserting daily stats:', error);
    }
  }
}

// ============ BACKLOG ============

export async function dbLoadBacklog(): Promise<BacklogItem[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('backlog')
    .select('*')
    .eq('user_id', user.id)
    .order('scheduled_for', { ascending: true });

  if (error) {
    console.error('Error loading backlog:', error);
    return [];
  }

  return ((data as BacklogRow[]) || []).map((row) => ({
    id: row.id,
    userId: row.user_id,
    normalizedKey: row.normalized_key,
    wordData: row.word_data as WordData,
    scheduledFor: new Date(row.scheduled_for).getTime(),
    priority: row.priority as 'high' | 'medium' | 'low',
    source: row.source as 'manual' | 'generated' | 'imported' | 'ocr',
    createdAt: new Date(row.created_at).getTime(),
  }));
}

export async function dbSaveBacklogItem(item: BacklogItem): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from('backlog')
    .upsert({
      id: item.id,
      user_id: user.id,
      normalized_key: item.normalizedKey,
      word_data: item.wordData,
      scheduled_for: new Date(item.scheduledFor).toISOString(),
      priority: item.priority,
      source: item.source,
    });

  if (error) {
    console.error('Error saving backlog item:', error);
  }
}

export async function dbDeleteBacklogItem(itemId: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  const { error } = await supabase
    .from('backlog')
    .delete()
    .eq('id', itemId);

  if (error) {
    console.error('Error deleting backlog item:', error);
  }
}

export async function dbClearBacklog(): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from('backlog')
    .delete()
    .eq('user_id', user.id);

  if (error) {
    console.error('Error clearing backlog:', error);
  }
}

export async function dbFindBacklogByNormalizedKey(
  normalizedKey: string,
  userId: string
): Promise<BacklogItem | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('backlog')
    .select('*')
    .eq('user_id', userId)
    .eq('normalized_key', normalizedKey)
    .single();

  if (error || !data) return null;

  const row = data as BacklogRow;
  return {
    id: row.id,
    userId: row.user_id,
    normalizedKey: row.normalized_key,
    wordData: row.word_data as WordData,
    scheduledFor: new Date(row.scheduled_for).getTime(),
    priority: row.priority as 'high' | 'medium' | 'low',
    source: row.source as 'manual' | 'generated' | 'imported' | 'ocr',
    createdAt: new Date(row.created_at).getTime(),
  };
}
