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

    const results: NewTermResponse[] = [];

    // Generate terms one by one (to avoid duplicates in the batch itself)
    for (let i = 0; i < count; i++) {
      try {
        const result = await generateNewTerm({
          level,
          pos,
          topic,
          existingTerms,
        });
        results.push(result);
        // Add to existing terms to avoid duplicates in next iteration
        existingTerms.push(result.term_normalized);
      } catch (error) {
        console.error(`Failed to generate term ${i + 1}:`, error);
        // Continue with next term
      }
    }

    if (results.length === 0) {
      return {
        success: false,
        error: ErrorMessages.AI_GENERATION_FAILED.en,
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
