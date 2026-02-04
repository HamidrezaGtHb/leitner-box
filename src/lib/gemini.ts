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

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Generic function to generate JSON with retry logic
 */
async function generateJson<T>(
  prompt: string,
  schema: any,
  maxRetries = 1
): Promise<T> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
 */
export async function generateNewTerm(params: {
  level: Level;
  pos: POS;
  topic?: string;
  existingTerms: string[]; // normalized terms to avoid
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
- If pos is phrase: keep it short (<= 6 words).

Normalization rule for checking duplicates:
lowercase, trim, collapse spaces to one, remove surrounding punctuation.

OUTPUT JSON SCHEMA:
{
  "term": "string",
  "term_normalized": "string",
  "level": "string",
  "pos": "noun|verb|adjective|adverb|phrase|other",
  "topic": "string|null",
  "reason": "short Persian explanation why this term fits level and usefulness"
}

Return only JSON.`;

  return generateJson<NewTermResponse>(prompt, NewTermResponseSchema);
}

/**
 * Generate the card back JSON for a given term
 * Returns complete CardBackJSON with all fields
 */
export async function generateCardBack(params: {
  term: string;
  level?: string;
  pos?: string;
}): Promise<CardBackJSON> {
  const prompt = `SYSTEM:
You are a German language teacher. Produce STRICT JSON only (no markdown). The JSON must match the given schema exactly. Use Persian for meanings and tips, German for examples.

USER INPUT:
term: ${params.term}
level: ${params.level || 'B1'}
pos: ${params.pos || 'unknown'}

CONSTRAINTS:
- Must be accurate. If unsure, set the specific field to null instead of guessing.
- Use at least 2 German example sentences, each with Persian translation.
- Include collocations (2-5) that are natural.
- synonyms/antonyms: 0-4 each (empty array allowed).
- register_note: mention formality, typical context, and one common mistake if relevant.
- grammar fields:
  - noun: article + plural when known.
  - verb: perfekt auxiliary + Partizip II; include rection (preposition/case) if common; separable if applicable.
  - adjective: comparative/superlative if common.
- meaning_fa: 1-3 concise items.
- learning_tips: 2-4 short Persian tips.

OUTPUT JSON SCHEMA:
{
  "term": "string",
  "language": "de",
  "level": "string",
  "pos": "noun|verb|adjective|adverb|phrase|other",
  "ipa": "string|null",
  "meaning_fa": ["string"],
  "meaning_en": ["string"],
  "examples": [{"de":"string","fa":"string","note":"string|null"}],
  "synonyms": ["string"],
  "antonyms": ["string"],
  "collocations": ["string"],
  "register_note": "string|null",
  "grammar": {
    "noun": {"article":"der|die|das|null","plural":"string|null"},
    "verb": {"perfekt_aux":"haben|sein|null","partizip2":"string|null","praeteritum":"string|null","rektion":"string|null","valency":"string|null","separable":"boolean|null"},
    "adjective": {"comparative":"string|null","superlative":"string|null"}
  },
  "learning_tips": ["string"]
}

Return only JSON.`;

  const response = await generateJson<CardBackResponse>(
    prompt,
    CardBackResponseSchema
  );

  // Convert CardBackResponse to CardBackJSON (they're compatible)
  return response as CardBackJSON;
}
