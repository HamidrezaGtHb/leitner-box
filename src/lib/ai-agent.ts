import { AIWordResponse, WordData, WordType } from '@/types';
import { generateId } from './utils';

/**
 * Call server-side API to enrich word data
 */
async function callEnrichAPI(word: string, provider: 'openai' | 'gemini'): Promise<AIWordResponse> {
  const response = await fetch('/api/enrich', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ word, provider }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to enrich word');
  }

  return data;
}

/**
 * Determine word type from AI response
 */
function determineWordType(response: AIWordResponse): WordType {
  if (response.article || response.plural) return 'noun';
  if (response.verbForms) return 'verb';
  return 'other';
}

/**
 * Main function to enrich word using AI (server-side)
 */
export async function enrichWord(
  word: string,
  provider: 'openai' | 'gemini' = 'openai'
): Promise<WordData> {
  try {
    const response = await callEnrichAPI(word, provider);

    const wordData: WordData = {
      id: generateId(),
      word: response.word,
      type: determineWordType(response),
      article: response.article,
      plural: response.plural,
      verbForms: response.verbForms,
      prepositions: response.prepositions,
      meaning: response.meaning,
      examples: response.examples,
      createdAt: Date.now(),
    };

    return wordData;
  } catch (error) {
    console.error('Error enriching word:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to enrich word'
    );
  }
}
