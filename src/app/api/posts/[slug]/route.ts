import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

type Ctx = { params: { slug: string } };

export async function GET(_request: Request, context: Ctx) {
  const { slug } = context.params;
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ post: data });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Erro ao carregar' }, { status: 500 });
  }
}
