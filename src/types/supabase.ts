export interface Database {
  public: {
    Tables: {
      cards: {
        Row: {
          id: string;
          word_data: {
            id: string;
            word: string;
            type: 'noun' | 'verb' | 'other';
            article?: 'der' | 'die' | 'das';
            plural?: string;
            verbForms?: {
              presens: string;
              preteritum: string;
              perfekt: string;
            };
            prepositions?: string;
            meaning: string;
            examples: { de: string; fa: string }[];
            createdAt: number;
          };
          box: number;
          last_reviewed: number | null;
          next_review: number;
          correct_count: number;
          incorrect_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          word_data: Database['public']['Tables']['cards']['Row']['word_data'];
          box?: number;
          last_reviewed?: number | null;
          next_review: number;
          correct_count?: number;
          incorrect_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          word_data?: Database['public']['Tables']['cards']['Row']['word_data'];
          box?: number;
          last_reviewed?: number | null;
          next_review?: number;
          correct_count?: number;
          incorrect_count?: number;
          updated_at?: string;
        };
      };
      settings: {
        Row: {
          id: string;
          daily_new_words: number;
          theme: string;
          auto_add_from_backlog: boolean;
          max_backlog_size: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          daily_new_words?: number;
          theme?: string;
          auto_add_from_backlog?: boolean;
          max_backlog_size?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          daily_new_words?: number;
          theme?: string;
          auto_add_from_backlog?: boolean;
          max_backlog_size?: number;
          updated_at?: string;
        };
      };
      daily_stats: {
        Row: {
          id: string;
          date: string;
          new_words: number;
          reviewed: number;
          correct: number;
          incorrect: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          new_words?: number;
          reviewed?: number;
          correct?: number;
          incorrect?: number;
          created_at?: string;
        };
        Update: {
          new_words?: number;
          reviewed?: number;
          correct?: number;
          incorrect?: number;
        };
      };
      backlog: {
        Row: {
          id: string;
          word_data: Database['public']['Tables']['cards']['Row']['word_data'];
          scheduled_for: number;
          priority: 'high' | 'medium' | 'low';
          source: 'manual' | 'generated' | 'imported' | 'ocr';
          created_at: string;
        };
        Insert: {
          id?: string;
          word_data: Database['public']['Tables']['cards']['Row']['word_data'];
          scheduled_for: number;
          priority?: 'high' | 'medium' | 'low';
          source?: 'manual' | 'generated' | 'imported' | 'ocr';
          created_at?: string;
        };
        Update: {
          word_data?: Database['public']['Tables']['cards']['Row']['word_data'];
          scheduled_for?: number;
          priority?: 'high' | 'medium' | 'low';
          source?: 'manual' | 'generated' | 'imported' | 'ocr';
        };
      };
    };
  };
}
