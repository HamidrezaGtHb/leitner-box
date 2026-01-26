import { AIWordResponse, WordData, WordType } from '@/types';
import { generateId } from './utils';

/**
 * Prompt template for AI word enrichment
 */
const WORD_ENRICHMENT_PROMPT = `You are a German language expert. Analyze the following German word and provide detailed information in Persian.

Word: {WORD}

Return ONLY a valid JSON object with this exact structure:
{
  "word": "the German word",
  "article": "der" | "die" | "das" (ONLY if it's a noun, otherwise omit),
  "plural": "plural form" (ONLY if it's a noun, otherwise omit),
  "verbForms": {
    "presens": "present tense conjugation (ich/er/sie form)",
    "preteritum": "past tense",
    "perfekt": "perfect tense with auxiliary verb"
  } (ONLY if it's a verb, otherwise omit),
  "prepositions": "common prepositions used with this verb" (ONLY if verb needs specific prepositions),
  "meaning": "Persian translation and explanation",
  "examples": [
    { "de": "German example sentence 1", "fa": "Persian translation 1" },
    { "de": "German example sentence 2", "fa": "Persian translation 2" }
  ]
}

Rules:
- If the word is a noun, include article and plural
- If the word is a verb, include verbForms and prepositions (if applicable)
- Always include exactly 2 example sentences
- Ensure all Persian text is grammatically correct
- Return ONLY the JSON, no markdown or other text`;

/**
 * Call OpenAI API to enrich word data
 */
async function callOpenAI(word: string, apiKey: string): Promise<AIWordResponse> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a German language expert that provides word information in Persian. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: WORD_ENRICHMENT_PROMPT.replace('{WORD}', word),
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  return JSON.parse(content);
}

/**
 * Call Gemini API to enrich word data
 */
async function callGemini(word: string, apiKey: string): Promise<AIWordResponse> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: WORD_ENRICHMENT_PROMPT.replace('{WORD}', word),
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.3,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error?.message || response.statusText;
    throw new Error(`Gemini API error: ${errorMessage}. Please check your API key in Settings.`);
  }

  const data = await response.json();
  
  if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
    throw new Error('Invalid response from Gemini API. Please try again.');
  }
  
  let content = data.candidates[0].content.parts[0].text;
  
  // Remove markdown code blocks if present (```json ... ```)
  content = content.replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();
  
  try {
    return JSON.parse(content);
  } catch (parseError) {
    console.error('Failed to parse Gemini response:', content);
    throw new Error('Failed to parse response from Gemini. The AI returned invalid JSON.');
  }
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
 * Main function to enrich word using AI
 */
export async function enrichWord(
  word: string,
  provider: 'openai' | 'gemini' = 'openai',
  apiKey: string
): Promise<WordData> {
  try {
    const response = provider === 'openai' 
      ? await callOpenAI(word, apiKey)
      : await callGemini(word, apiKey);

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
 * Validate API key format
 */
export function validateApiKey(provider: 'openai' | 'gemini', key: string): boolean {
  if (!key) return false;
  
  if (provider === 'openai') {
    return key.startsWith('sk-');
  } else {
    // Gemini keys start with "AIza" and are typically 39 characters
    return key.startsWith('AIza') && key.length >= 35;
  }
}
