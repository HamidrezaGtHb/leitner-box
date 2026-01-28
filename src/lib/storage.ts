import { LeitnerCard, UserSettings, DailyStats, BacklogItem } from '@/types';

const STORAGE_KEYS = {
  CARDS: 'leitner_cards',
  SETTINGS: 'leitner_settings',
  STATS: 'leitner_daily_stats',
  BACKLOG: 'leitner_backlog',
} as const;

// Default settings
const DEFAULT_SETTINGS: UserSettings = {
  dailyNewWords: 10,
  theme: 'system',
  autoAddFromBacklog: true,
  maxBacklogSize: 500,
};

/**
 * Load cards from localStorage
 */
export function loadCards(): LeitnerCard[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CARDS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading cards:', error);
    return [];
  }
}

/**
 * Save cards to localStorage
 */
export function saveCards(cards: LeitnerCard[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
  } catch (error) {
    console.error('Error saving cards:', error);
  }
}

/**
 * Load settings from localStorage
 */
export function loadSettings(): UserSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error loading settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Save settings to localStorage
 */
export function saveSettings(settings: UserSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

/**
 * Load daily stats from localStorage
 */
export function loadDailyStats(): DailyStats[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STATS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading stats:', error);
    return [];
  }
}

/**
 * Save daily stats to localStorage
 */
export function saveDailyStats(stats: DailyStats[]): void {
  if (typeof window === 'undefined') return;
  try {
    // Keep only last 30 days
    const recentStats = stats.slice(-30);
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(recentStats));
  } catch (error) {
    console.error('Error saving stats:', error);
  }
}

/**
 * Update today's stats
 */
export function updateTodayStats(
  newWords: number = 0,
  reviewed: number = 0,
  correct: number = 0,
  incorrect: number = 0
): void {
  const stats = loadDailyStats();
  const today = new Date().toISOString().split('T')[0];
  
  const todayIndex = stats.findIndex((s) => s.date === today);
  
  if (todayIndex >= 0) {
    stats[todayIndex] = {
      date: today,
      newWords: stats[todayIndex].newWords + newWords,
      reviewed: stats[todayIndex].reviewed + reviewed,
      correct: stats[todayIndex].correct + correct,
      incorrect: stats[todayIndex].incorrect + incorrect,
    };
  } else {
    stats.push({
      date: today,
      newWords,
      reviewed,
      correct,
      incorrect,
    });
  }
  
  saveDailyStats(stats);
}

/**
 * Load backlog from localStorage
 */
export function loadBacklog(): BacklogItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BACKLOG);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading backlog:', error);
    return [];
  }
}

/**
 * Save backlog to localStorage
 */
export function saveBacklog(backlog: BacklogItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.BACKLOG, JSON.stringify(backlog));
  } catch (error) {
    console.error('Error saving backlog:', error);
  }
}

/**
 * Get backlog items ready for today
 */
export function getReadyBacklogItems(backlog: BacklogItem[]): BacklogItem[] {
  const now = Date.now();
  return backlog.filter((item) => item.scheduledFor <= now).sort((a, b) => {
    // Sort by priority first, then by scheduled date
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return a.scheduledFor - b.scheduledFor;
  });
}
