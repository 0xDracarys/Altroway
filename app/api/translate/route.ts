import { NextRequest, NextResponse } from 'next/server';
import { translateText, translateBatch, detectLanguage, getSupportedLanguages } from '@/lib/google-translate';

/**
 * POST /api/translate
 * Translate text using Google Translate API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, targetLanguage, sourceLanguage } = body;

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'text and targetLanguage are required' },
        { status: 400 }
      );
    }

    const result = await translateText({
      text,
      targetLanguage,
      sourceLanguage,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: 'Failed to translate text' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/translate?action=detect&text=...
 * Detect language or get supported languages
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const text = searchParams.get('text');

    if (action === 'detect' && text) {
      const language = await detectLanguage(text);
      return NextResponse.json({ detectedLanguage: language });
    }

    if (action === 'languages') {
      const languages = await getSupportedLanguages();
      return NextResponse.json({ languages });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "detect" or "languages"' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Translation GET error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
