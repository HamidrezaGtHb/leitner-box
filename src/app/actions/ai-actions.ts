'use server';

import { createClient } from '@/lib/supabase/server';
import { generateNewTerm, generateCardBack } from '@/lib/gemini';
import { Level, POS, CardBackJSON } from '@/types';
import { normalizeTerm, calculateAvailableNewCardSlots } from '@/lib/utils';
import { getErrorMessage, ErrorMessages } from '@/lib/errors';
import { decryptApiKey } from '@/lib/crypto';
import type { NewTermResponse } from '@/lib/ai/schemas';

/**
 * Get user's personal API key from settings (decrypted)
 */
async function getUserApiKey(supabase: any, userId: string): Promise<string | null> {
  const { data: settings } = await supabase
    .from('settings')
    .select('gemini_api_key')
    .eq('user_id', userId)
    .single();
  
  if (!settings?.gemini_api_key) {
    return null;
  }
  
  return decryptApiKey(settings.gemini_api_key);
}

/**
 * Server Action: Generate a new German term
 */
export async function generateNewTermAction(
  level: Level,
  pos: POS,
  topic?: string
): Promise<{ success: true; data: NewTermResponse } | { success: false; error: string }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: ErrorMessages.AUTH_UNAUTHORIZED.en,
      };
    }

    // Get existing terms to avoid duplicates
    const { data: cards } = await supabase
      .from('cards')
      .select('term_normalized')
      .eq('user_id', user.id);

    const { data: backlog } = await supabase
      .from('backlog')
      .select('term_normalized')
      .eq('user_id', user.id);

    const existingTerms = [
      ...(cards?.map((c) => c.term_normalized) || []),
      ...(backlog?.map((b) => b.term_normalized) || []),
    ];

    // Get user's personal API key (if set)
    const apiKey = await getUserApiKey(supabase, user.id);

    // Generate term with AI using user's key or default
    const result = await generateNewTerm({
      level,
      pos,
      topic,
      existingTerms,
      apiKey,
    });

    return { success: true, data: result };
  } catch (error: any) {
    console.error('generateNewTermAction error:', error);
    return {
      success: false,
      error: getErrorMessage(error, 'en'),
    };
  }
}

/**
 * Server Action: Generate card back JSON for a term
 */
export async function generateCardBackAction(
  term: string,
  level?: string,
  pos?: string
): Promise<{ success: true; data: CardBackJSON } | { success: false; error: string }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: ErrorMessages.AUTH_UNAUTHORIZED.en,
      };
    }

    // Get user's personal API key (if set)
    const apiKey = await getUserApiKey(supabase, user.id);

    // Generate card back with AI using user's key or default
    const cardBack = await generateCardBack({
      term,
      level,
      pos,
      apiKey,
    });

    return { success: true, data: cardBack };
  } catch (error: any) {
    console.error('generateCardBackAction error:', error);
    return {
      success: false,
      error: getErrorMessage(error, 'en'),
    };
  }
}

/**
 * Server Action: Convert backlog item to card (AI or manual mode)
 */
export async function completeBacklogToCardAction(
  backlogId: string,
  mode: 'ai' | 'manual'
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: ErrorMessages.AUTH_UNAUTHORIZED.en,
      };
    }

    // Get backlog item
    const { data: backlogItem, error: fetchError } = await supabase
      .from('backlog')
      .select('*')
      .eq('id', backlogId)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !backlogItem) {
      return {
        success: false,
        error: ErrorMessages.DB_OPERATION_FAILED.en,
      };
    }

    // Check available slots before creating card
    const { availableSlots } = await calculateAvailableNewCardSlots(supabase, user.id);
    
    if (availableSlots <= 0) {
      return {
        success: false,
        error: 'Daily limit reached. Review existing cards first or wait until tomorrow.',
      };
    }

    let cardBack: CardBackJSON;

    if (mode === 'ai') {
      // Get user's personal API key (if set)
      const apiKey = await getUserApiKey(supabase, user.id);
      
      // Generate with AI using user's key or default
      const result = await generateCardBack({
        term: backlogItem.term,
        level: backlogItem.level || undefined,
        pos: backlogItem.pos || undefined,
        apiKey,
      });
      cardBack = result;
    } else {
      // Manual: create minimal back
      cardBack = {
        term: backlogItem.term,
        language: 'de' as const,
        level: backlogItem.level || 'B1',
        pos: (backlogItem.pos || 'other') as any,
        ipa: null,
        meaning_fa: ['Add meaning'],
        meaning_en: ['Add meaning'],
        examples: [],
        synonyms: [],
        antonyms: [],
        collocations: [],
        register_note: null,
        grammar: {},
        learning_tips: [],
      };
    }

    // Insert card
    const { error: insertError } = await supabase.from('cards').insert({
      user_id: user.id,
      term: backlogItem.term,
      term_normalized: backlogItem.term_normalized,
      level: backlogItem.level,
      pos: backlogItem.pos,
      box: 1,
      due_date: new Date().toISOString().split('T')[0], // Due today
      back_json: cardBack,
      direction: backlogItem.direction || 'de-fa',
    });

    if (insertError) {
      return {
        success: false,
        error: getErrorMessage(insertError, 'en'),
      };
    }

    // Remove from backlog
    await supabase.from('backlog').delete().eq('id', backlogId);

    return { success: true };
  } catch (error: any) {
    console.error('completeBacklogToCardAction error:', error);
    return {
      success: false,
      error: getErrorMessage(error, 'en'),
    };
  }
}

/**
 * Server Action: Batch generate multiple terms
 */
export async function batchGenerateTermsAction(
  level: Level,
  pos: POS,
  topic: string | undefined,
  count: number
): Promise<
  | { success: true; data: NewTermResponse[] }
  | { success: false; error: string }
> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: ErrorMessages.AUTH_UNAUTHORIZED.en,
      };
    }

    // Get existing terms
    const { data: cards } = await supabase
      .from('cards')
      .select('term_normalized')
      .eq('user_id', user.id);

    const { data: backlog } = await supabase
      .from('backlog')
      .select('term_normalized')
      .eq('user_id', user.id);

    let existingTerms = [
      ...(cards?.map((c) => c.term_normalized) || []),
      ...(backlog?.map((b) => b.term_normalized) || []),
    ];

    // Get user's personal API key (if set)
    const apiKey = await getUserApiKey(supabase, user.id);

    const results: NewTermResponse[] = [];
    let lastGenerationError: string | null = null;

    // Generate terms one by one (to avoid duplicates in the batch itself)
    for (let i = 0; i < count; i++) {
      try {
        const result = await generateNewTerm({
          level,
          pos,
          topic,
          existingTerms,
          apiKey,
        });
        results.push(result);
        // Add to existing terms to avoid duplicates in next iteration
        existingTerms.push(result.term_normalized);
      } catch (error) {
        console.error(`Failed to generate term ${i + 1}:`, error);
        lastGenerationError = getErrorMessage(error, 'en');
        // Continue with next term
      }
    }

    if (results.length === 0) {
      return {
        success: false,
        error: lastGenerationError || ErrorMessages.AI_GENERATION_FAILED.en,
      };
    }

    return { success: true, data: results };
  } catch (error: any) {
    console.error('batchGenerateTermsAction error:', error);
    return {
      success: false,
      error: getErrorMessage(error, 'en'),
    };
  }
}

/**
 * Server Action: Add generated term to backlog
 */
export async function addTermToBacklogAction(
  term: string,
  termNormalized: string,
  level: string,
  pos: string,
  topic?: string
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: ErrorMessages.AUTH_UNAUTHORIZED.en,
      };
    }

    const { error } = await supabase.from('backlog').insert({
      user_id: user.id,
      term,
      term_normalized: termNormalized,
      level,
      pos,
      topic: topic || null,
    });

    if (error) {
      return {
        success: false,
        error: getErrorMessage(error, 'en'),
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error('addTermToBacklogAction error:', error);
    return {
      success: false,
      error: getErrorMessage(error, 'en'),
    };
  }
}

/**
 * Server Action: Translate Persian to German (quick translation for preview)
 */
export async function translatePersianToGermanAction(
  persianText: string
): Promise<{ success: true; german: string } | { success: false; error: string }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: ErrorMessages.AUTH_UNAUTHORIZED.en,
      };
    }

    // Get user's API key or use default
    const userApiKey = await getUserApiKey(supabase, user.id);
    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        success: false,
        error: 'No API key available. Please set your Gemini API key in Settings.',
      };
    }

    // Use Gemini to translate
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Translate the following Persian sentence to natural, conversational German at B2-C1 level.
The German should sound natural and be appropriate for everyday conversation or professional contexts.

Persian sentence: "${persianText}"

Reply with ONLY the German translation, nothing else.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const germanTranslation = response.text().trim();

    if (!germanTranslation) {
      return {
        success: false,
        error: 'Translation failed. Please try again.',
      };
    }

    return {
      success: true,
      german: germanTranslation,
    };
  } catch (error: any) {
    console.error('translatePersianToGermanAction error:', error);
    return {
      success: false,
      error: error.message || 'Translation failed. Please try again.',
    };
  }
}

/**
 * Server Action: Generate rich card back for Persian→German cards
 */
export async function generatePersianCardBackAction(
  persianText: string
): Promise<
  | {
      success: true;
      translations: string[];
      examples: Array<{ de: string; fa: string }>;
      level: string;
      register: string;
    }
  | { success: false; error: string }
> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: ErrorMessages.AUTH_UNAUTHORIZED.en,
      };
    }

    // Get user's API key or use default
    const userApiKey = await getUserApiKey(supabase, user.id);
    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        success: false,
        error: 'No API key available. Please set your Gemini API key in Settings.',
      };
    }

    // Use Gemini to generate comprehensive card back
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are a German language teacher creating flashcard content for Persian speakers learning German.

Persian sentence: "${persianText}"

Generate a focused, practical card back with:
1. 2-3 natural German translations (B1-C1 level, work/life contexts)
2. 2-3 example sentences showing usage (German + Persian)
3. CEFR level (B1, B2, or C1)
4. Register (formal, informal, or neutral)

Reply ONLY with valid JSON (no markdown, no explanation):
{
  "translations": ["translation1", "translation2", "translation3"],
  "examples": [
    {"de": "German example", "fa": "Persian translation"},
    {"de": "German example", "fa": "Persian translation"}
  ],
  "level": "B2",
  "register": "neutral"
}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text().trim();

    // Clean markdown if present
    const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const data = JSON.parse(jsonText);

    if (!data.translations || !data.examples || !data.level || !data.register) {
      return {
        success: false,
        error: 'Invalid AI response format',
      };
    }

    return {
      success: true,
      translations: data.translations,
      examples: data.examples,
      level: data.level,
      register: data.register,
    };
  } catch (error: any) {
    console.error('generatePersianCardBackAction error:', error);
    return {
      success: false,
      error: error.message || 'Generation failed. Please try again.',
    };
  }
}
