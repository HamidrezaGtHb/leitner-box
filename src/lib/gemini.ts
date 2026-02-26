import { GoogleGenerativeAI } from '@google/generative-ai';
import { CardBackJSON, POS, Level } from '@/types';
import {
  NewTermResponseSchema,
  CardBackResponseSchema,
  parseWithSchema,
  type NewTermResponse,
  type CardBackResponse,
} from '@/lib/ai/schemas';
import { normalizeTerm } from '@/lib/utils';
import { ErrorMessages } from '@/lib/errors';

/**
 * Get Gemini AI instance with user's personal API key or default
 */
function getGeminiAI(apiKey?: string | null): GoogleGenerativeAI {
  const key = apiKey || process.env.GEMINI_API_KEY!;
  
  if (!key) {
    throw new Error('No Gemini API key available. Please add your personal API key in Settings.');
  }
  
  return new GoogleGenerativeAI(key);
}

/**
 * Generic function to generate JSON with retry logic
 * @param apiKey - Optional user's personal API key
 */
async function generateJson<T>(
  prompt: string,
  schema: any,
  apiKey?: string | null,
  maxRetries = 1
): Promise<T> {
  const genAI = getGeminiAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  let lastError: any;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      let text = response.text().trim();

      // Remove markdown code blocks if present
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

      // Try to parse JSON
      const parsed = JSON.parse(text);
      
      // Validate with Zod schema
      const validation = parseWithSchema(schema, parsed);
      
      if (validation.success) {
        return validation.data as T;
      } else {
        throw new Error(`Validation failed: ${validation.error}`);
      }
    } catch (error: any) {
      lastError = error;
      
      // If this is not the last attempt, try fix-to-json prompt
      if (attempt < maxRetries) {
        const fixPrompt = `The previous response was invalid JSON or didn't match the schema. 
Error: ${error.message}

Please fix and return ONLY valid JSON (no markdown, no explanation) that matches the required schema.

Original prompt was:
${prompt}`;
        
        prompt = fixPrompt;
        continue;
      }
    }
  }

  // All attempts failed
  throw new Error(
    lastError?.message || ErrorMessages.AI_INVALID_RESPONSE.en
  );
}

/**
 * Generate a new German term based on criteria
 * Returns structured JSON with term, normalized term, level, pos, topic, and reason
 * @param params.apiKey - Optional user's personal Gemini API key
 */
export async function generateNewTerm(params: {
  level: Level;
  pos: POS;
  topic?: string;
  existingTerms: string[]; // normalized terms to avoid
  apiKey?: string | null;
}): Promise<NewTermResponse> {
  const forbiddenTermsJson = JSON.stringify(params.existingTerms);
  const topicText = params.topic ? params.topic : '';

  const prompt = `SYSTEM:
You generate German vocabulary terms for flashcards. Output MUST be valid JSON only. No markdown, no commentary.

TASK:
Generate exactly 1 NEW German term that matches:
- level: ${params.level}
- part_of_speech: ${params.pos}
${params.topic ? `- topic: ${params.topic}` : ''}

It must NOT be in the forbidden list of normalized terms:
${forbiddenTermsJson}

Rules:
- Prefer high-utility modern standard German.
- Avoid rare/archaic terms.
- Avoid proper nouns, brand names, people names.
- If pos is noun: give singular form (not plural) as "term".
- If pos is verb: give infinitive as "term".
- If pos is adjective/adverb: base form as "term".
- If pos is phrase/idiom: keep it short (<= 6 words).
- If pos is nomen-verb: give the full combination (e.g. "Bescheid geben").
- If pos is idiom: give a common German idiom/Redewendung.

Normalization rule for checking duplicates:
lowercase, trim, collapse spaces to one, remove surrounding punctuation.

OUTPUT JSON SCHEMA:
{
  "term": "string",
  "term_normalized": "string",
  "level": "string",
  "pos": "noun|verb|adjective|adverb|phrase|nomen-verb|idiom|other",
  "topic": "string|null",
  "reason": "short Persian explanation why this term fits level and usefulness"
}

Return only JSON.`;

  return generateJson<NewTermResponse>(prompt, NewTermResponseSchema, params.apiKey);
}

/**
 * Generate the card back JSON for a given term
 * Returns complete CardBackJSON with all fields
 * Uses smart type detection for optimal flashcard content
 * @param params.apiKey - Optional user's personal Gemini API key
 */
export async function generateCardBack(params: {
  term: string;
  level?: string;
  pos?: string;
  apiKey?: string | null;
}): Promise<CardBackJSON> {
  const prompt = `You are a German flashcard content generator. Output ONLY valid JSON.
Use Persian for meanings, German for examples. All content must be 100% accurate and verified.

TERM: ${params.term}
LEVEL: ${params.level || 'B1'}
POS: ${params.pos || 'auto-detect'}

REQUIREMENTS:
- 2-4 Persian meanings (meaning_fa)
- 2 German example sentences with Persian translations and register tag (formal/informal/colloquial)
- 2-4 real collocations
- 2-4 word_family members (e.g., for "fahren": ["der Fahrer", "die Fahrt", "erfahren"])
- usage_context: {register, colloquial_alternative (if formal, else null), contexts [1-2]}
- 1-2 synonyms (or antonyms for adjectives)
- Grammar based on POS:
  * NOUN: article (der/die/das), plural
  * VERB: prasens (3rd sg), praeteritum, perfekt_aux (haben/sein), partizip2, separable (bool), prepositions [{preposition, case, example}]
  * ADJECTIVE: comparative, superlative
- learning_tips: [] (empty)
- Examples must be natural German (B1-C1), not translations

JSON SCHEMA:
{
  "term": "string",
  "language": "de",
  "level": "string",
  "pos": "noun|verb|adjective|adverb|phrase|nomen-verb|idiom|other",
  "ipa": "string|null",
  "meaning_fa": ["string"],
  "meaning_en": ["string"],
  "examples": [{"de":"string","fa":"string","note":"string|null","register":"formal|informal|colloquial"}],
  "synonyms": ["string"],
  "antonyms": ["string"],
  "collocations": ["string"],
  "register_note": "string|null",
  "word_family": ["string"],
  "usage_context": {"register":"formal|informal|colloquial","colloquial_alternative":"string|null","contexts":["string"]},
  "grammar": {
    "noun": {"article":"der|die|das|null","plural":"string|null"},
    "verb": {"perfekt_aux":"haben|sein|null","partizip2":"string|null","praeteritum":"string|null","prasens":"string|null","rektion":"string|null","valency":"string|null","separable":"boolean|null"},
    "adjective": {"comparative":"string|null","superlative":"string|null"},
    "prepositions": [{"preposition":"string","case":"string","example":"string"}]
  },
  "learning_tips": []
}

Return only JSON.`;

  const response = await generateJson<CardBackResponse>(
    prompt,
    CardBackResponseSchema,
    params.apiKey
  );

  // Validate generated content quality
  const cardBack = response as CardBackJSON;
  const validation = validateCardContent(cardBack);
  
  if (!validation.valid && validation.warnings.length > 0) {
    console.warn('⚠️ Card content validation warnings:', validation.warnings);
    console.warn('Term:', params.term, '| Generated data may need review');
  }

  return cardBack;
}

/**
 * Validate generated card content for quality and accuracy
 * Helps catch AI errors in meanings, examples, and other fields
 */
function validateCardContent(cardBack: CardBackJSON): {
  valid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];
  
  // Check meanings exist and are substantive
  if (!cardBack.meaning_fa || cardBack.meaning_fa.length === 0) {
    warnings.push('No Persian meanings provided');
  } else {
    cardBack.meaning_fa.forEach((meaning, i) => {
      if (meaning.length < 3) {
        warnings.push(`Meaning ${i + 1} too short (likely error)`);
      }
    });
  }
  
  // Check examples exist and are substantive
  if (!cardBack.examples || cardBack.examples.length < 2) {
    warnings.push('Insufficient examples (need at least 2)');
  } else {
    cardBack.examples.forEach((ex, i) => {
      if (ex.de.length < 8) {
        warnings.push(`German example ${i + 1} too short (likely error)`);
      }
      if (ex.fa.length < 3) {
        warnings.push(`Persian translation ${i + 1} too short (likely error)`);
      }
      if (!ex.register) {
        warnings.push(`Example ${i + 1} missing register tag`);
      }
    });
  }
  
  // Check collocations
  if (!cardBack.collocations || cardBack.collocations.length === 0) {
    warnings.push('No collocations provided (should have 2-4)');
  }
  
  // Check grammar for nouns
  if (cardBack.pos === 'noun' && cardBack.grammar.noun) {
    if (!cardBack.grammar.noun.article) {
      warnings.push('Noun missing article (der/die/das)');
    }
  }
  
  // Check grammar for verbs
  if (cardBack.pos === 'verb' && cardBack.grammar.verb) {
    if (!cardBack.grammar.verb.partizip2) {
      warnings.push('Verb missing Partizip II');
    }
    if (!cardBack.grammar.verb.perfekt_aux) {
      warnings.push('Verb missing perfect auxiliary (haben/sein)');
    }
  }
  
  return {
    valid: warnings.length === 0,
    warnings
  };
}
