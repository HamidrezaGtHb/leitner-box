import { NextRequest, NextResponse } from 'next/server';

const VALIDATION_PROMPT = `You are a German language expert. Review the following list of words and:

1. Filter out non-German words or invalid entries
2. Keep only words at {LEVEL} level or higher (CEFR standard)
3. Remove conjugated verbs (keep infinitives only)
4. Remove plural nouns (keep singular forms only)
5. Remove duplicates and similar words

Words to validate:
{WORDS}

Return ONLY a valid JSON object:
{
  "validWords": ["word1", "word2", ...]
}

Rules:
- Only include valid German words
- Only base forms (infinitive verbs, singular nouns)
- Appropriate for {LEVEL}+ level learners
- Return ONLY the JSON, no explanations`;

async function callOpenAI(words: string[], minLevel: string, apiKey: string) {
  const prompt = VALIDATION_PROMPT
    .replace(/{LEVEL}/g, minLevel)
    .replace(/{WORDS}/g, words.join(', '));

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
          content: 'You are a German language expert. Respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
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
  const result = JSON.parse(data.choices[0].message.content);
  return result.validWords || [];
}

async function callGemini(words: string[], minLevel: string, apiKey: string) {
  const prompt = VALIDATION_PROMPT
    .replace(/{LEVEL}/g, minLevel)
    .replace(/{WORDS}/g, words.join(', '));

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
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  let content = data.candidates[0].content.parts[0].text;
  content = content.replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();

  const result = JSON.parse(content);
  return result.validWords || [];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { words, minLevel, provider } = body;

    if (!words || !Array.isArray(words) || words.length === 0) {
      return NextResponse.json(
        { error: 'Words array is required' },
        { status: 400 }
      );
    }

    const validProvider = provider === 'gemini' ? 'gemini' : 'openai';
    const apiKey = validProvider === 'openai'
      ? process.env.OPENAI_API_KEY
      : process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: `${validProvider.toUpperCase()} API key not configured` },
        { status: 500 }
      );
    }

    const validWords = validProvider === 'openai'
      ? await callOpenAI(words, minLevel || 'B1', apiKey)
      : await callGemini(words, minLevel || 'B1', apiKey);

    return NextResponse.json({ validWords });
  } catch (error) {
    console.error('Validate words API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to validate words' },
      { status: 500 }
    );
  }
}
