import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateNewTerm } from '@/lib/gemini';
import { Level, POS } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { level, pos, topic } = body as {
      level: Level;
      pos: POS;
      topic?: string;
    };

    // Get existing terms (normalized) to avoid duplicates
    const { data: cards } = await supabase
      .from('cards')
      .select('term_normalized')
      .eq('user_id', user.id);

    const { data: backlog } = await supabase
      .from('backlog')
      .select('term_normalized')
      .eq('user_id', user.id);

    const existingTerms = [
      ...(cards?.map((c) => c.term_normalized) || []),
      ...(backlog?.map((b) => b.term_normalized) || []),
    ];

    const term = await generateNewTerm({
      level,
      pos,
      topic,
      existingTerms,
    });

    return NextResponse.json({ term });
  } catch (error: any) {
    console.error('Error generating term:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate term' },
      { status: 500 }
    );
  }
}
