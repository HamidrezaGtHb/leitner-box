import { GoogleGenerativeAI } from '@google/generative-ai';
import { CardBackJSON, POS, Level } from '@/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Generate a new German term based on criteria
 * Avoids duplicates by checking against existing normalized terms
 */
export async function generateNewTerm(params: {
  level: Level;
  pos: POS;
  topic?: string;
  existingTerms: string[]; // normalized terms to avoid
}): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `Generate ONE German ${params.pos} at CEFR level ${params.level}${
    params.topic ? ` related to topic: ${params.topic}` : ''
  }.

IMPORTANT: Do NOT generate any of these existing terms: ${params.existingTerms.join(', ')}

Requirements:
- Return ONLY the German term (with article if noun, e.g., "der Bahnhof")
- No explanation, no translation, no extra text
- Must be appropriate for ${params.level} level
- Must be a ${params.pos}

Example output for noun: der Computer
Example output for verb: lernen`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const term = response.text().trim();

  return term;
}

/**
 * Generate the card back JSON for a given term
 */
export async function generateCardBack(params: {
  term: string;
  level?: string;
  pos?: string;
}): Promise<CardBackJSON> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `You are a German language expert. Generate a comprehensive flashcard back for the German term: "${params.term}"

Return ONLY valid JSON (no markdown, no explanation) following this EXACT schema:

{
  "term": "${params.term}",
  "language": "de",
  "level": "estimated CEFR level (A1-C2)",
  "pos": "noun|verb|adjective|adverb|phrase|other",
  "ipa": "IPA pronunciation or null",
  "meaning_fa": ["Persian meaning 1", "Persian meaning 2"],
  "meaning_en": ["English meaning 1"],
  "examples": [
    {"de": "German example sentence", "fa": "Persian translation", "note": null}
  ],
  "synonyms": ["synonym1", "synonym2"],
  "antonyms": ["antonym1"],
  "collocations": ["common collocation 1", "common collocation 2"],
  "register_note": "formal/informal/common pitfall note or null",
  "grammar": {
    ${params.pos === 'noun' || !params.pos ? '"noun": {"article": "der|die|das", "plural": "plural form"},' : ''}
    ${params.pos === 'verb' || !params.pos ? '"verb": {"perfekt_aux": "haben|sein", "partizip2": "past participle", "praeteritum": "simple past", "rektion": "case requirement", "valency": "valency pattern", "separable": true|false},' : ''}
    ${params.pos === 'adjective' || !params.pos ? '"adjective": {"comparative": "comparative form", "superlative": "superlative form"}' : ''}
  },
  "learning_tips": ["tip 1", "tip 2"]
}

IMPORTANT:
- Return ONLY the JSON object, no markdown code blocks
- All strings must be properly escaped
- Include at least 2 Persian meanings
- Include at least 2 example sentences with Persian translations
- Grammar section should only include relevant fields for the part of speech`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  let text = response.text().trim();

  // Remove markdown code blocks if present
  text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

  try {
    const cardBack = JSON.parse(text) as CardBackJSON;
    return cardBack;
  } catch (error) {
    console.error('Failed to parse Gemini response:', text);
    throw new Error('Invalid JSON response from Gemini');
  }
}
