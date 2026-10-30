import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyAdminToken } from '@/lib/verify-admin';
import { safeImageUrl, slugify } from '@/lib/post-utils';

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
    if (!title) {
      return NextResponse.json({ error: 'Título obrigatório' }, { status: 400 });
    }
    if (title.length > 200) {
      return NextResponse.json({ error: 'Título muito longo (máx. 200 caracteres)' }, { status: 400 });
    }
    const slug = slugify(String(body.slug || '') || title);
    if (!slug) {
      return NextResponse.json({ error: 'Slug inválido' }, { status: 400 });
    }

    let supabase;
    try {
      supabase = createServerClient();
    } catch (envErr) {
      const msg = envErr instanceof Error ? envErr.message : String(envErr);
      return NextResponse.json(
        { error: 'Supabase não configurado no servidor', details: msg },
        { status: 500 },
      );
    }

    const row = {
      slug,
      title,
      excerpt: body.excerpt ? String(body.excerpt).slice(0, 400) : null,
      cover_image_url: safeImageUrl(body.cover_image_url),
      body_markdown: String(body.body_markdown || ''),
      published: Boolean(body.published),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from('blog_posts').insert(row).select('*').single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Slug já existe', code: error.code }, { status: 409 });
      }
      return NextResponse.json(
        {
          error: 'Erro ao gravar no Supabase',
          details: error.message,
          code: error.code,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ post: data });
  } catch (e) {
    console.error(e);
    const details = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: 'Erro ao criar post', details }, { status: 500 });
  }
}
