import { getSupabase, isSupabaseConfigured } from './supabase';
import { LeitnerCard, UserSettings, DailyStats, BacklogItem, WordData } from '@/types';

const DEFAULT_SETTINGS_ID = '00000000-0000-0000-0000-000000000001';

// Row types for Supabase responses
interface CardRow {
  id: string;
  word_data: WordData;
  box: number;
  last_reviewed: number | null;
  next_review: number;
  correct_count: number;
  incorrect_count: number;
  created_at: string;
}

interface SettingsRow {
  id: string;
  daily_new_words: number;
  theme: string;
  auto_add_from_backlog: boolean;
  max_backlog_size: number;
}

interface DailyStatsRow {
  id: string;
  date: string;
  new_words: number;
  reviewed: number;
  correct: number;
  incorrect: number;
}

interface BacklogRow {
  id: string;
  word_data: WordData;
  scheduled_for: number;
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
    wordData: row.word_data as WordData,
    box: row.box as 1 | 2 | 3 | 4 | 5,
    lastReviewed: row.last_reviewed,
    nextReview: row.next_review,
    correctCount: row.correct_count,
    incorrectCount: row.incorrect_count,
    createdAt: new Date(row.created_at).getTime(),
  }));
}

export async function dbSaveCard(card: LeitnerCard): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  const { error } = await supabase
    .from('cards')
    .upsert({
      id: card.id,
      word_data: card.wordData,
      box: card.box,
      last_reviewed: card.lastReviewed,
      next_review: card.nextReview,
      correct_count: card.correctCount,
      incorrect_count: card.incorrectCount,
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

// ============ SETTINGS ============

export async function dbLoadSettings(): Promise<UserSettings | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('id', DEFAULT_SETTINGS_ID)
    .single();

  if (error || !data) {
    return null;
  }

  const row = data as SettingsRow;
  return {
    dailyNewWords: row.daily_new_words as 5 | 10 | 15,
    theme: row.theme as 'light' | 'dark' | 'system',
    autoAddFromBacklog: row.auto_add_from_backlog,
    maxBacklogSize: row.max_backlog_size,
  };
}

export async function dbSaveSettings(settings: UserSettings): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  const { error } = await supabase
    .from('settings')
    .upsert({
      id: DEFAULT_SETTINGS_ID,
      daily_new_words: settings.dailyNewWords,
      theme: settings.theme,
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

  const { data, error } = await supabase
    .from('daily_stats')
    .select('*')
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
  }));
}

export async function dbUpdateTodayStats(
  newWords: number = 0,
  reviewed: number = 0,
  correct: number = 0,
  incorrect: number = 0
): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  const today = new Date().toISOString().split('T')[0];

  // Try to get existing stats for today
  const { data: existing } = await supabase
    .from('daily_stats')
    .select('*')
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
      })
      .eq('date', today);

    if (error) {
      console.error('Error updating daily stats:', error);
    }
  } else {
    // Insert new
    const { error } = await supabase
      .from('daily_stats')
      .insert({
        date: today,
        new_words: newWords,
        reviewed,
        correct,
        incorrect,
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

  const { data, error } = await supabase
    .from('backlog')
    .select('*')
    .order('scheduled_for', { ascending: true });

  if (error) {
    console.error('Error loading backlog:', error);
    return [];
  }

  return ((data as BacklogRow[]) || []).map((row) => ({
    id: row.id,
    wordData: row.word_data as WordData,
    scheduledFor: row.scheduled_for,
    priority: row.priority as 'high' | 'medium' | 'low',
    source: row.source as 'manual' | 'generated' | 'imported' | 'ocr',
    createdAt: new Date(row.created_at).getTime(),
  }));
}

export async function dbSaveBacklogItem(item: BacklogItem): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  const { error } = await supabase
    .from('backlog')
    .upsert({
      id: item.id,
      word_data: item.wordData,
      scheduled_for: item.scheduledFor,
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

  const { error } = await supabase
    .from('backlog')
    .delete()
    .neq('id', '');

  if (error) {
    console.error('Error clearing backlog:', error);
  }
}
