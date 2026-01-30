import { AIWordResponse, WordData, WordType } from '@/types';
import { generateId } from './utils';
import { extractTextFromImage, extractGermanWordsFromImage } from './ocr';
import { checkMultipleDuplicates } from './duplicate-detector';

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
  provider: 'openai' | 'gemini' = 'gemini'
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
  provider: 'openai' | 'gemini' = 'gemini'
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

/**
 * Parse user intent from message
 */
function parseIntent(message: string): 'generate' | 'add' | 'extract' | 'help' {
  const lower = message.toLowerCase();
  
  if (lower.includes('generate') || lower.includes('give me') || lower.includes('create') || /\d+\s*(words|wörter)/i.test(lower)) {
    return 'generate';
  }
  
  if (lower.includes('add') || lower.includes('create card')) {
    return 'add';
  }
  
  if (lower.includes('extract') || lower.includes('from') || lower.includes('picture') || lower.includes('image')) {
    return 'extract';
  }
  
  return 'help';
}

/**
 * Extract parameters from generate request
 */
function parseGenerateParams(message: string): { count: number; level: string; topic?: string } {
  const countMatch = message.match(/(\d+)/);
  const count = countMatch ? parseInt(countMatch[1]) : 10;
  
  const levelMatch = message.match(/\b(A1|A2|B1|B2|C1|C2)\b/i);
  const level = levelMatch ? levelMatch[1].toUpperCase() : 'B1';
  
  const topicMatch = message.match(/about\s+(.+)$/i) || message.match(/zum\s+Thema\s+(.+)$/i);
  const topic = topicMatch ? topicMatch[1].trim() : undefined;
  
  return { count, level, topic };
}

/**
 * Process chat command with AI
 */
export async function processChatCommand(
  userMessage: string,
  imageFile?: File,
  userId?: string
): Promise<{
  response: string;
  cards: WordData[];
  duplicates: string[];
}> {
  // Use 'gemini' as default provider (consistent with use-commands.ts)
  const provider: 'openai' | 'gemini' = 'gemini';

  try {
    const { extractTextFromImage, extractGermanWordsFromImage } = await import('./ocr');
    const { checkMultipleDuplicates } = await import('./duplicate-detector');

    const intent = parseIntent(userMessage);
    
    // Handle image extraction
    if (imageFile || intent === 'extract') {
      if (!imageFile) {
        return {
          response: 'Please upload an image to extract words from.',
          cards: [],
          duplicates: [],
        };
      }
      
      const words = await extractGermanWordsFromImage(imageFile);
      
      if (words.length === 0) {
        return {
          response: 'No German words found in the image. Please try a clearer image.',
          cards: [],
          duplicates: [],
        };
      }
      
      // Check for duplicates
      const { unique, duplicates } = await checkMultipleDuplicates(words, userId);
      
      // Enrich unique words
      const enrichedCards: WordData[] = [];
      for (const word of unique.slice(0, 20)) { // Limit to 20 words
        try {
          const wordData = await enrichWord(word, provider);
          enrichedCards.push(wordData);
          await delay(500); // Rate limit
        } catch (err) {
          console.error(`Failed to enrich word: ${word}`, err);
        }
      }

      // Build detailed response
      let responseText = `I found ${words.length} German words in the image.\n`;
      responseText += `✅ Created ${enrichedCards.length} cards`;
      if (duplicates.length > 0) {
        const skippedPreview = duplicates.slice(0, 5).join(', ');
        const more = duplicates.length > 5 ? `, +${duplicates.length - 5} more` : '';
        responseText += `\n⚠️ Skipped ${duplicates.length} duplicates: ${skippedPreview}${more}`;
      }

      return {
        response: responseText,
        cards: enrichedCards,
        duplicates,
      };
    }
    
    // Handle word generation
    if (intent === 'generate') {
      const { count, level, topic } = parseGenerateParams(userMessage);

      const words = await generateWordList(level as any, count, provider);

      // Check for duplicates
      const { unique, duplicates } = await checkMultipleDuplicates(words, userId);

      // Enrich unique words
      const enrichedCards: WordData[] = [];
      for (const word of unique) {
        try {
          const wordData = await enrichWord(word, provider);
          enrichedCards.push(wordData);
          await delay(500); // Rate limit
        } catch (err) {
          console.error(`Failed to enrich word: ${word}`, err);
        }
      }
      
      // Build detailed response
      let responseText = `Generated ${count} ${level} words${topic ? ` about ${topic}` : ''}.\n`;
      responseText += `✅ Created ${enrichedCards.length} cards`;
      if (duplicates.length > 0) {
        const skippedPreview = duplicates.slice(0, 5).join(', ');
        const more = duplicates.length > 5 ? `, +${duplicates.length - 5} more` : '';
        responseText += `\n⚠️ Skipped ${duplicates.length} duplicates: ${skippedPreview}${more}`;
      }

      return {
        response: responseText,
        cards: enrichedCards,
        duplicates,
      };
    }
    
    // Handle single word addition
    if (intent === 'add') {
      const wordMatch = userMessage.match(/["'](.+?)["']|add\s+(.+)/i);
      const word = wordMatch ? (wordMatch[1] || wordMatch[2]).trim() : '';
      
      if (!word) {
        return {
          response: 'Please specify a word to add. For example: "Add der Bahnhof"',
          cards: [],
          duplicates: [],
        };
      }
      
      // Check duplicate
      const dupResult = await checkMultipleDuplicates([word], userId);
      
      if (dupResult.duplicates.length > 0) {
        return {
          response: `The word "${word}" already exists in your collection.`,
          cards: [],
          duplicates: [word],
        };
      }

      const wordData = await enrichWord(word, provider);

      return {
        response: `Created a card for "${word}".`,
        cards: [wordData],
        duplicates: [],
      };
    }
    
    // Help/fallback
    return {
      response: `I can help you with:
• Generating word lists: "Generate 10 B2 words about travel"
• Adding single words: "Add der Bahnhof"
• Extracting words from images: Upload an image with German text

What would you like to do?`,
      cards: [],
      duplicates: [],
    };
  } catch (error: any) {
    console.error('Chat command error:', error);
    throw new Error(error.message || 'Failed to process command');
  }
}

/**
 * Rate limiter for batch operations
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
