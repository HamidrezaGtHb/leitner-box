import { NextRequest, NextResponse } from 'next/server';

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

async function callOpenAI(word: string, apiKey: string) {
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
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

async function callGemini(word: string, apiKey: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
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
    throw new Error(`Gemini API error: ${errorMessage}`);
  }

  const data = await response.json();

  if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
    throw new Error('Invalid response from Gemini API');
  }

  let content = data.candidates[0].content.parts[0].text;
  content = content.replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();

  return JSON.parse(content);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { word, provider } = body;

    if (!word || typeof word !== 'string') {
      return NextResponse.json(
        { error: 'Word is required' },
        { status: 400 }
      );
    }

    const validProvider = provider === 'gemini' ? 'gemini' : 'openai';

    // Get API key from environment variables
    const apiKey = validProvider === 'openai'
      ? process.env.OPENAI_API_KEY
      : process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: `${validProvider.toUpperCase()} API key not configured. Please set ${validProvider === 'openai' ? 'OPENAI_API_KEY' : 'GEMINI_API_KEY'} environment variable.` },
        { status: 500 }
      );
    }

    const result = validProvider === 'openai'
      ? await callOpenAI(word, apiKey)
      : await callGemini(word, apiKey);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Enrich API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to enrich word' },
      { status: 500 }
    );
  }
}
