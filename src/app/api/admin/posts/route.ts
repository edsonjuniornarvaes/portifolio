import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyAdminToken } from '@/lib/verify-admin';

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ posts: data || [] });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Erro ao listar posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const title = String(body.title || '').trim();
    let slug = String(body.slug || '').trim().toLowerCase();
    if (!title) {
      return NextResponse.json({ error: 'Título obrigatório' }, { status: 400 });
    }
    if (!slug) slug = slugify(title);

    const supabase = createServerClient();
    const row = {
      slug,
      title,
      excerpt: body.excerpt ?? null,
      cover_image_url: body.cover_image_url ?? null,
      body_markdown: String(body.body_markdown || ''),
      published: Boolean(body.published),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from('blog_posts').insert(row).select('*').single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Slug já existe' }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ post: data });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Erro ao criar post' }, { status: 500 });
  }
}
