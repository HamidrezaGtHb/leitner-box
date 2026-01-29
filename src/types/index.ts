// Word types
export interface VerbForms {
  presens: string;
  preteritum: string;
  perfekt: string;
}

export interface Example {
  de: string;
  fa: string;
}

export type WordType = 'noun' | 'verb' | 'other';

export interface WordData {
  id: string;
  word: string;
  type: WordType;
  article?: 'der' | 'die' | 'das'; // for nouns
  plural?: string;
  verbForms?: VerbForms;
  prepositions?: string;
  meaning: string;
  examples: Example[];
  createdAt: number;
}

// Leitner System types
export interface LeitnerCard {
  id: string;
  userId?: string;
  normalizedKey: string;
  wordData: WordData;
  boxIndex: 1 | 2 | 3 | 4 | 5;
  lastReviewedAt: number | null;
  nextReviewAt: number;
  lastAnswer?: 'correct' | 'wrong' | 'hard';
  correctCount: number;
  incorrectCount: number;
  hardCount: number;
  createdAt: number;
}

export interface LeitnerBox {
  boxNumber: 1 | 2 | 3 | 4 | 5;
  cards: LeitnerCard[];
  intervalDays: number;
}

export interface UserSettings {
  dailyNewWords: 5 | 10 | 15;
  theme: 'light' | 'dark' | 'system';
  isLockedMode: boolean;
  reviewIntervals: number[]; // days per box [1, 2, 4, 7, 14]
  autoAddFromBacklog: boolean;
  maxBacklogSize: number;
}

export interface Progress {
  totalCards: number;
  cardsInBox: Record<1 | 2 | 3 | 4 | 5, number>;
  cardsDueToday: number;
  newWordsToday: number;
  studiedToday: number;
  correctToday: number;
  incorrectToday: number;
  lastStudyDate: string;
}

export interface DailyStats {
  date: string;
  newWords: number;
  reviewed: number;
  correct: number;
  incorrect: number;
  hard: number;
}

// AI API Response
export interface AIWordResponse {
  word: string;
  article?: 'der' | 'die' | 'das';
  plural?: string;
  verbForms?: VerbForms;
  prepositions?: string;
  meaning: string;
  examples: Example[];
}

// Backlog types
export type BacklogSource = 'manual' | 'generated' | 'imported' | 'ocr';
export type Priority = 'high' | 'medium' | 'low';

export interface BacklogItem {
  id: string;
  userId?: string;
  normalizedKey: string;
  wordData: WordData;
  scheduledFor: number; // timestamp
  priority: Priority;
  source: BacklogSource;
  createdAt: number;
}

// Strict Leitner types
export interface StrictLeitnerConfig {
  intervals: number[]; // days per box
  maxBox: number;
}

export interface LockedModeState {
  isEnabled: boolean;
  dueCount: number;
  nextDueIn: number | null; // milliseconds until next card
}

// Per-box statistics
export interface BoxStats {
  boxNumber: 1 | 2 | 3 | 4 | 5;
  totalCount: number;
  dueCount: number;
  nextDueIn: number | null; // milliseconds until next card in this box
}

// Dashboard statistics
export interface DashboardStats {
  totalCards: number;
  totalDue: number;
  nextDueIn: number | null;
  boxes: Record<1 | 2 | 3 | 4 | 5, BoxStats>;
  newWordsToday: number;
  dailyLimit: number;
}

// Enhanced locked mode state with per-box info
export interface EnhancedLockedModeState extends LockedModeState {
  accessibleBoxes: (1 | 2 | 3 | 4 | 5)[];
  boxStates: Record<1 | 2 | 3 | 4 | 5, {
    accessible: boolean;
    dueCount: number;
    nextDueIn: number | null;
  }>;
}

// Auth types
export interface User {
  id: string;
  email?: string;
  createdAt: string;
}
