import { NextRequest, NextResponse } from 'next/server';
import { getTranslationSlug } from '@/lib/blog/translations';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const from = searchParams.get('from') as 'en' | 'vi';
  const to = searchParams.get('to') as 'en' | 'vi';

  if (!slug || !from || !to) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const translationSlug = getTranslationSlug(slug, from, to);
    return NextResponse.json({ slug: translationSlug });
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
