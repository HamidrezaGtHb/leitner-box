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

  return generateJson<NewTermResponse>(prompt, NewTermResponseSchema);
}

/**
 * Generate the card back JSON for a given term
 * Returns complete CardBackJSON with all fields
 * Uses smart type detection for optimal flashcard content
 */
export async function generateCardBack(params: {
  term: string;
  level?: string;
  pos?: string;
}): Promise<CardBackJSON> {
  const prompt = `SYSTEM:
You are a German Language Database and expert flashcard content designer.
Output ONLY valid JSON (no markdown, no commentary). The JSON must match the schema exactly.
Use Persian for meanings, German for examples.

USER INPUT:
term: ${params.term}
level: ${params.level || 'B1'}
pos_hint: ${params.pos || 'auto-detect'}

────────────────
TASK:
1. IDENTIFY the type: Verb, Noun, Adjective, Adverb, Nomen-Verb Verbindung, Idiom, or Phrase.
2. Generate ONLY relevant info for that type. Omit irrelevant sections.

────────────────
RULES:
- Practical, everyday German (B1–C1)
- Examples must sound natural
- ALWAYS include collocations (2-4 items) — REQUIRED
- ALWAYS include exactly 2 examples (with register tag) — REQUIRED for ALL types
- Each example MUST have a "register" field: "formal", "informal", or "colloquial"
- word_family: 2-4 related words from the same word family (e.g. for "fahren" → ["der Fahrer", "die Fahrt", "die Abfahrt", "erfahren"])
- usage_context: {
    register: "formal" | "informal" | "colloquial" (overall register of this term)
    colloquial_alternative: "string" (روزمره equivalent if this term is formal, or null)
    contexts: ["string"] (1-2 situations where this word is used, e.g. ["business", "daily conversation"])
  }
- learning_tips: always empty array []

────────────────
TYPE-SPECIFIC:

VERB:
- grammar.verb: prasens (3rd person singular, e.g. "er wartet"), praeteritum, perfekt_aux, partizip2, separable
- grammar.prepositions: Array of {preposition, case, example} — e.g. [{"preposition":"auf","case":"Akk","example":"Ich warte auf den Bus."}]
- synonyms: 1-2
- examples: 2 (with register tag) — REQUIRED
- collocations: 2-4
- word_family: 2-4 related words
- usage_context: register, colloquial_alternative (if formal), contexts

NOUN:
- grammar.noun: article (der/die/das), plural
- grammar.prepositions: if the noun has typical preposition usage
- synonyms: 1-2
- examples: 2 (with register tag) — REQUIRED
- collocations: 2-4
- word_family: 2-4 related words
- usage_context: register, colloquial_alternative (if formal), contexts

ADJECTIVE:
- grammar.adjective: comparative, superlative
- synonyms OR antonyms: 1-2
- examples: 2 (with register tag) — REQUIRED
- collocations: 2-4
- word_family: 2-4 related words
- usage_context: register, colloquial_alternative (if formal), contexts

NOMEN-VERB VERBINDUNG (pos: "nomen-verb"):
- grammar.verb: verb conjugation info
- register_note: variations/alternative forms
- synonyms: 1-2 alternative expressions
- examples: 2 (with register tag) — REQUIRED
- collocations: 2-4
- word_family: 2-4 related words
- usage_context: register, colloquial_alternative (if formal), contexts

IDIOM (pos: "idiom"):
- meaning_fa: clear explanation
- register_note: origin or context
- synonyms: 1-2 equivalent expressions
- examples: 2 (with register tag) — REQUIRED
- collocations: 2-4
- usage_context: register, colloquial_alternative (if formal), contexts

PHRASE (pos: "phrase"):
- register_note: formal/informal context
- synonyms: 1-2 alternatives
- examples: 2 (with register tag) — REQUIRED
- collocations: 2-4
- usage_context: register, colloquial_alternative (if formal), contexts

────────────────
OUTPUT JSON SCHEMA:
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
  "usage_context": {
    "register": "formal|informal|colloquial",
    "colloquial_alternative": "string|null",
    "contexts": ["string"]
  },
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
    CardBackResponseSchema
  );

  // Convert CardBackResponse to CardBackJSON (they're compatible)
  return response as CardBackJSON;
}
