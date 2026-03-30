import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyAdminToken } from '@/lib/verify-admin';

type Ctx = { params: { id: string } };

export async function GET(request: NextRequest, context: Ctx) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const { id } = context.params;
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();
    if (error || !data) {
      return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ post: data });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Erro ao buscar post' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: Ctx) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const { id } = context.params;
  try {
    const body = await request.json();
    const patch: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (body.title !== undefined) patch.title = String(body.title).trim();
    if (body.slug !== undefined) patch.slug = String(body.slug).trim().toLowerCase();
    if (body.excerpt !== undefined) patch.excerpt = body.excerpt;
    if (body.cover_image_url !== undefined) patch.cover_image_url = body.cover_image_url;
    if (body.body_markdown !== undefined) patch.body_markdown = String(body.body_markdown);
    if (body.published !== undefined) patch.published = Boolean(body.published);

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .update(patch)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Slug já existe' }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ post: data });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Erro ao atualizar post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: Ctx) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const { id } = context.params;
  try {
    const supabase = createServerClient();
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Erro ao excluir post' }, { status: 500 });
  }
}
