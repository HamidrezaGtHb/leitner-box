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

/**
 * Generate a list of German words for a specific level
 */
export async function generateWordList(
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2',
  count: number,
  provider: 'openai' | 'gemini' = 'openai'
): Promise<string[]> {
  try {
    const response = await fetch('/api/generate-words', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ level, count, provider }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate word list');
    }

    return data.words;
  } catch (error) {
    console.error('Error generating word list:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to generate word list'
    );
  }
}

/**
 * Batch enrich multiple words with progress tracking
 */
export async function batchEnrichWords(
  words: string[],
  provider: 'openai' | 'gemini',
  onProgress?: (current: number, total: number, word: string) => void
): Promise<WordData[]> {
  const enrichedWords: WordData[] = [];
  const delayMs = 200; // Rate limiting: 5 requests/second

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    
    try {
      if (onProgress) {
        onProgress(i + 1, words.length, word);
      }

      const wordData = await enrichWord(word, provider);
      enrichedWords.push(wordData);

      // Rate limiting delay (except for last item)
      if (i < words.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    } catch (error) {
      console.error(`Failed to enrich word "${word}":`, error);
      // Continue with next word instead of failing completely
    }
  }

  return enrichedWords;
}
