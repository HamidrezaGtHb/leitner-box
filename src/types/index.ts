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
  wordData: WordData;
  box: 1 | 2 | 3 | 4 | 5;
  lastReviewed: number | null;
  nextReview: number;
  correctCount: number;
  incorrectCount: number;
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
  wordData: WordData;
  scheduledFor: number; // timestamp
  priority: Priority;
  source: BacklogSource;
  createdAt: number;
}
