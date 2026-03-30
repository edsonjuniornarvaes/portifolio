import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, slug, title, excerpt, cover_image_url, created_at, updated_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(24);

    if (error) throw error;
    return NextResponse.json({ posts: data || [] });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ posts: [] });
  }
}
