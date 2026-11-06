import { NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/posts';

type Ctx = { params: { slug: string } };

export async function GET(_request: Request, context: Ctx) {
  const post = await getPostBySlug(context.params.slug);
  if (!post) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
  return NextResponse.json({ post });
}
