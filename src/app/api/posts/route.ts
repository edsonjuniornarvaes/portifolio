import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';

export const revalidate = 60;

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json({
    posts: posts.slice(0, 24).map(({ id, slug, title, excerpt, cover_image_url, created_at }) => ({
      id,
      slug,
      title,
      excerpt,
      cover_image_url,
      created_at,
    })),
  });
}
