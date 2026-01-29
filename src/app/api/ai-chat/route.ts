import { NextRequest, NextResponse } from 'next/server';
import { processChatCommand } from '@/lib/ai-agent';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const message = formData.get('message') as string;
    const image = formData.get('image') as File | null;
    const userId = formData.get('userId') as string | undefined;

    if (!message && !image) {
      return NextResponse.json(
        { error: 'Message or image required' },
        { status: 400 }
      );
    }

    const result = await processChatCommand(message || '', image || undefined, userId);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('AI chat error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}
