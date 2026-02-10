export type POS = 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase' | 'nomen-verb' | 'idiom' | 'other';

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type Register = 'formal' | 'informal' | 'colloquial' | 'general';

export interface CardBackJSON {
  term: string;
  language: 'de';
  level: string;
  pos: POS;
  ipa: string | null;
  meaning_fa: string[];
  meaning_en: string[];
  examples: Array<{
    de: string;
    fa: string;
    note: string | null;
    register?: Register;
  }>;
  synonyms: string[];
  antonyms: string[];
  collocations: string[];
  register_note: string | null;
  word_family?: string[];
  usage_context?: {
    register: 'formal' | 'informal' | 'colloquial';
    colloquial_alternative?: string;
    contexts?: string[];
  };
  grammar: {
    noun?: {
      article: 'der' | 'die' | 'das' | null;
      plural: string | null;
    };
    verb?: {
      perfekt_aux: 'haben' | 'sein' | null;
      partizip2: string | null;
      praeteritum: string | null;
      prasens?: string | null;
      rektion: string | null;
      valency: string | null;
      separable: boolean | null;
    };
    adjective?: {
      comparative: string | null;
      superlative: string | null;
    };
    prepositions?: Array<{
      preposition: string;
      case: string;
      example: string;
    }>;
  };
  learning_tips: string[];
}

export interface Card {
  id: string;
  user_id: string;
  term: string;
  term_normalized: string;
  level: string | null;
  pos: string | null;
  box: number;
  due_date: string;
  back_json: CardBackJSON;
  created_at: string;
  updated_at: string;
}

export interface BacklogItem {
  id: string;
  user_id: string;
  term: string;
  term_normalized: string;
  level: string | null;
  pos: string | null;
  topic: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  card_id: string;
  user_id: string;
  result: 'correct' | 'wrong';
  reviewed_at: string;
  from_box: number;
  to_box: number;
}

export interface Settings {
  user_id: string;
  intervals: Record<string, number>;
  daily_limit: number; // 5, 10, or 15 cards per day
  hide_future_cards: boolean; // Hide Box 2+ cards until due date
  gemini_api_key: string | null; // Personal Gemini API key (optional)
  created_at: string;
  updated_at: string;
}
