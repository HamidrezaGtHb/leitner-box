import { NextRequest, NextResponse } from 'next/server';

const WORD_LIST_PROMPT = `You are a German language expert. Generate a list of {COUNT} most important and high-frequency German words for {LEVEL} level learners.

Level: {LEVEL}
Number of words: {COUNT}

Focus on:
- High-frequency vocabulary used in daily life, work, and academic contexts
- Words appropriate for {LEVEL} level (CEFR standard)
- Mix of nouns, verbs, adjectives, and adverbs
- Practical words that learners at this level need to know

Return ONLY a valid JSON object with this structure:
{
  "words": ["word1", "word2", "word3", ...]
}

Rules:
- Return exactly {COUNT} words
- Only base forms (infinitive for verbs, singular for nouns without articles)
- No duplicates
- Appropriate difficulty for {LEVEL} level
- Return ONLY the JSON, no markdown or other text`;

async function callOpenAI(level: string, count: number, apiKey: string) {
  const prompt = WORD_LIST_PROMPT
    .replace(/{LEVEL}/g, level)
    .replace(/{COUNT}/g, count.toString());

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
          content: 'You are a German language expert that generates word lists for language learners. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  const result = JSON.parse(data.choices[0].message.content);
  return result.words || [];
}

async function callGemini(level: string, count: number, apiKey: string) {
  const prompt = WORD_LIST_PROMPT
    .replace(/{LEVEL}/g, level)
    .replace(/{COUNT}/g, count.toString());

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
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
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

  const result = JSON.parse(content);
  return result.words || [];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { level, count, provider } = body;

    if (!level || !['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(level)) {
      return NextResponse.json(
        { error: 'Valid level is required (A1, A2, B1, B2, C1, C2)' },
        { status: 400 }
      );
    }

    if (!count || count < 1 || count > 100) {
      return NextResponse.json(
        { error: 'Count must be between 1 and 100' },
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

    const words = validProvider === 'openai'
      ? await callOpenAI(level, count, apiKey)
      : await callGemini(level, count, apiKey);

    return NextResponse.json({ words });
  } catch (error) {
    console.error('Generate words API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate word list' },
      { status: 500 }
    );
  }
}
