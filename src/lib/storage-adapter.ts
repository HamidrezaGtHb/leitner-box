import { LeitnerCard, UserSettings, DailyStats, BacklogItem } from '@/types';
import { getSupabase, isSupabaseConfigured } from './supabase';
import {
  loadCards as loadCardsLocal,
  saveCards as saveCardsLocal,
  loadSettings as loadSettingsLocal,
  saveSettings as saveSettingsLocal,
  loadDailyStats as loadStatsLocal,
  saveDailyStats as saveStatsLocal,
  loadBacklog as loadBacklogLocal,
  saveBacklog as saveBacklogLocal,
} from './storage';
import {
  dbLoadCards,
  dbSaveCard,
  dbDeleteCard,
  dbLoadSettings,
  dbSaveSettings,
  dbLoadDailyStats,
  dbUpdateTodayStats,
  dbLoadBacklog,
  dbSaveBacklogItem,
  dbDeleteBacklogItem,
  dbClearBacklog,
} from './db';

// ============================================
// Storage Adapter Interface
// ============================================

export interface StorageAdapter {
  // Cards
  loadCards(): Promise<LeitnerCard[]>;
  saveCard(card: LeitnerCard): Promise<void>;
  saveCards(cards: LeitnerCard[]): Promise<void>;
  deleteCard(id: string): Promise<void>;
  
  // Settings
  loadSettings(): Promise<UserSettings | null>;
  saveSettings(settings: UserSettings): Promise<void>;
  
  // Stats
  loadDailyStats(): Promise<DailyStats[]>;
  updateTodayStats(newWords?: number, reviewed?: number, correct?: number, incorrect?: number, hard?: number): Promise<void>;
  
  // Backlog
  loadBacklog(): Promise<BacklogItem[]>;
  saveBacklogItem(item: BacklogItem): Promise<void>;
  saveBacklog(items: BacklogItem[]): Promise<void>;
  deleteBacklogItem(id: string): Promise<void>;
  clearBacklog(): Promise<void>;
}

// ============================================
// Supabase Adapter (authenticated)
// ============================================

class SupabaseAdapter implements StorageAdapter {
  // Cards
  async loadCards(): Promise<LeitnerCard[]> {
    return await dbLoadCards();
  }

  async saveCard(card: LeitnerCard): Promise<void> {
    await dbSaveCard(card);
  }

  async saveCards(cards: LeitnerCard[]): Promise<void> {
    // Batch save
    for (const card of cards) {
      await dbSaveCard(card);
    }
  }

  async deleteCard(id: string): Promise<void> {
    await dbDeleteCard(id);
  }

  // Settings
  async loadSettings(): Promise<UserSettings | null> {
    return await dbLoadSettings();
  }

  async saveSettings(settings: UserSettings): Promise<void> {
    await dbSaveSettings(settings);
  }

  // Stats
  async loadDailyStats(): Promise<DailyStats[]> {
    return await dbLoadDailyStats();
  }

  async updateTodayStats(
    newWords: number = 0,
    reviewed: number = 0,
    correct: number = 0,
    incorrect: number = 0,
    hard: number = 0
  ): Promise<void> {
    await dbUpdateTodayStats(newWords, reviewed, correct, incorrect, hard);
  }

  // Backlog
  async loadBacklog(): Promise<BacklogItem[]> {
    return await dbLoadBacklog();
  }

  async saveBacklogItem(item: BacklogItem): Promise<void> {
    await dbSaveBacklogItem(item);
  }

  async saveBacklog(items: BacklogItem[]): Promise<void> {
    // Batch save
    for (const item of items) {
      await dbSaveBacklogItem(item);
    }
  }

  async deleteBacklogItem(id: string): Promise<void> {
    await dbDeleteBacklogItem(id);
  }

  async clearBacklog(): Promise<void> {
    await dbClearBacklog();
  }
}

// ============================================
// LocalStorage Adapter (fallback)
// ============================================

class LocalStorageAdapter implements StorageAdapter {
  // Cards
  async loadCards(): Promise<LeitnerCard[]> {
    return loadCardsLocal();
  }

  async saveCard(card: LeitnerCard): Promise<void> {
    const cards = loadCardsLocal();
    const index = cards.findIndex((c) => c.id === card.id);
    if (index >= 0) {
      cards[index] = card;
    } else {
      cards.push(card);
    }
    saveCardsLocal(cards);
  }

  async saveCards(cards: LeitnerCard[]): Promise<void> {
    saveCardsLocal(cards);
  }

  async deleteCard(id: string): Promise<void> {
    const cards = loadCardsLocal();
    const filtered = cards.filter((c) => c.id !== id);
    saveCardsLocal(filtered);
  }

  // Settings
  async loadSettings(): Promise<UserSettings | null> {
    return loadSettingsLocal();
  }

  async saveSettings(settings: UserSettings): Promise<void> {
    saveSettingsLocal(settings);
  }

  // Stats
  async loadDailyStats(): Promise<DailyStats[]> {
    return loadStatsLocal();
  }

  async updateTodayStats(
    newWords: number = 0,
    reviewed: number = 0,
    correct: number = 0,
    incorrect: number = 0,
    hard: number = 0
  ): Promise<void> {
    const stats = loadStatsLocal();
    const today = new Date().toISOString().split('T')[0];
    const todayStats = stats.find((s) => s.date === today);

    if (todayStats) {
      todayStats.newWords += newWords;
      todayStats.reviewed += reviewed;
      todayStats.correct += correct;
      todayStats.incorrect += incorrect;
      todayStats.hard += hard;
    } else {
      stats.push({
        date: today,
        newWords,
        reviewed,
        correct,
        incorrect,
        hard,
      });
    }

    saveStatsLocal(stats);
  }

  // Backlog
  async loadBacklog(): Promise<BacklogItem[]> {
    return loadBacklogLocal();
  }

  async saveBacklogItem(item: BacklogItem): Promise<void> {
    const backlog = loadBacklogLocal();
    const index = backlog.findIndex((b) => b.id === item.id);
    if (index >= 0) {
      backlog[index] = item;
    } else {
      backlog.push(item);
    }
    saveBacklogLocal(backlog);
  }

  async saveBacklog(items: BacklogItem[]): Promise<void> {
    saveBacklogLocal(items);
  }

  async deleteBacklogItem(id: string): Promise<void> {
    const backlog = loadBacklogLocal();
    const filtered = backlog.filter((b) => b.id !== id);
    saveBacklogLocal(filtered);
  }

  async clearBacklog(): Promise<void> {
    saveBacklogLocal([]);
  }
}

// ============================================
// Adapter Factory
// ============================================

let cachedAdapter: StorageAdapter | null = null;

export function getStorageAdapter(): StorageAdapter {
  // Return cached adapter if available
  if (cachedAdapter) {
    return cachedAdapter;
  }

  // Determine which adapter to use
  const supabase = getSupabase();
  
  if (isSupabaseConfigured() && supabase) {
    // Check if user is authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        cachedAdapter = new SupabaseAdapter();
      } else {
        cachedAdapter = new LocalStorageAdapter();
      }
    });
    
    // Default to Supabase if configured
    if (!cachedAdapter) {
      cachedAdapter = new SupabaseAdapter();
    }
  } else {
    cachedAdapter = new LocalStorageAdapter();
  }

  return cachedAdapter;
}

// Reset adapter (useful when auth state changes)
export function resetStorageAdapter() {
  cachedAdapter = null;
}

// Check if using Supabase
export function isUsingSupabase(): boolean {
  return cachedAdapter instanceof SupabaseAdapter;
}
