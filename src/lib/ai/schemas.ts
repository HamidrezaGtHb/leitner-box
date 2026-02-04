import { z } from 'zod';

/**
 * Zod schema for New Term Generation response
 * Matches the strict output format from requirements:
 * {term, term_normalized, level, pos, topic, reason}
 */
export const NewTermResponseSchema = z.object({
  term: z.string().min(1, 'Term is required'),
  term_normalized: z.string().min(1, 'Normalized term is required'),
  level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
  pos: z.enum(['noun', 'verb', 'adjective', 'adverb', 'phrase', 'other']),
  topic: z.string().nullable(),
  reason: z.string().min(1, 'Reason is required'),
});

export type NewTermResponse = z.infer<typeof NewTermResponseSchema>;

/**
 * Zod schema for Card Back JSON
 * Matches the strict CardBackJSON schema from requirements
 */
export const CardBackResponseSchema = z.object({
  term: z.string().min(1),
  language: z.literal('de'),
  level: z.string(),
  pos: z.enum(['noun', 'verb', 'adjective', 'adverb', 'phrase', 'other']),
  ipa: z.string().nullable(),
  meaning_fa: z.array(z.string()).min(1, 'At least one Persian meaning required'),
  meaning_en: z.array(z.string()),
  examples: z.array(
    z.object({
      de: z.string(),
      fa: z.string(),
      note: z.string().nullable(),
    })
  ),
  synonyms: z.array(z.string()),
  antonyms: z.array(z.string()),
  collocations: z.array(z.string()),
  register_note: z.string().nullable(),
  grammar: z.object({
    noun: z
      .object({
        article: z.enum(['der', 'die', 'das']).nullable(),
        plural: z.string().nullable(),
      })
      .optional(),
    verb: z
      .object({
        perfekt_aux: z.enum(['haben', 'sein']).nullable(),
        partizip2: z.string().nullable(),
        praeteritum: z.string().nullable(),
        rektion: z.string().nullable(),
        valency: z.string().nullable(),
        separable: z.boolean().nullable(),
      })
      .optional(),
    adjective: z
      .object({
        comparative: z.string().nullable(),
        superlative: z.string().nullable(),
      })
      .optional(),
  }),
  learning_tips: z.array(z.string()),
});

export type CardBackResponse = z.infer<typeof CardBackResponseSchema>;

/**
 * Helper function to safely parse and validate JSON with Zod
 */
export function parseWithSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  try {
    const parsed = schema.parse(data);
    return { success: true, data: parsed };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
      return { success: false, error: errorMessages };
    }
    return { success: false, error: 'Unknown validation error' };
  }
}
