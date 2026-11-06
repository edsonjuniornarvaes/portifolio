import { NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/posts';
import { normalizeLang } from '@/i18n/config';

type Ctx = { params: { slug: string } };

export async function GET(request: Request, context: Ctx) {
  const lang = normalizeLang(new URL(request.url).searchParams.get('lang')) ?? 'pt';
  const post = await getPostBySlug(context.params.slug, lang);
  if (!post) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
  return NextResponse.json({ post });
}
