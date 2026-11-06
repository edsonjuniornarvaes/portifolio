import { createServerClient } from '@/lib/supabase';
import { STATIC_POSTS, type StaticPost } from '@/content/posts';

export type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  body_markdown: string;
  created_at: string;
};

const fromStatic = (p: StaticPost): PostRow => ({ ...p });

async function dbPosts(): Promise<PostRow[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, slug, title, excerpt, cover_image_url, body_markdown, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false });
    if (error) return [];
    return (data as PostRow[]) || [];
  } catch {
    return [];
  }
}

/** Artigos publicados: os do painel (Supabase) + os do código. Mesmo slug: o do painel vence. */
export async function getAllPosts(): Promise<PostRow[]> {
  const fromDb = await dbPosts();
  const slugs = new Set(fromDb.map((p) => p.slug));
  const merged = [...fromDb, ...STATIC_POSTS.filter((p) => !slugs.has(p.slug)).map(fromStatic)];
  return merged.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<PostRow | null> {
  const all = await getAllPosts();
  return all.find((p) => p.slug === slug) ?? null;
}
