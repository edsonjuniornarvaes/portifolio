import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';
import { normalizeLang } from '@/i18n/config';

export async function GET(request: Request) {
  const lang = normalizeLang(new URL(request.url).searchParams.get('lang')) ?? 'pt';
  const posts = await getAllPosts(lang);
  return NextResponse.json(
    {
      posts: posts.slice(0, 24).map(({ id, slug, title, excerpt, cover_image_url, created_at }) => ({
        id,
        slug,
        title,
        excerpt,
        cover_image_url,
        created_at,
      })),
    },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } },
  );
}
