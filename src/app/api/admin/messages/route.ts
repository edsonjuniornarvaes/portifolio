import { NextRequest, NextResponse } from 'next/server';
import { db, fail, guard, noDb } from '@/lib/admin-api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const g = guard(request);
  if (g) return g;
  const supabase = db();
  if (!supabase) return noDb();
  const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(200);
  if (error) return fail(error);
  return NextResponse.json({ messages: data });
}

export async function PATCH(request: NextRequest) {
  const g = guard(request, true);
  if (g) return g;
  const supabase = db();
  if (!supabase) return noDb();
  const { id, read, archived } = await request.json().catch(() => ({}));
  if (!id) return NextResponse.json({ error: 'id obrigatório' }, { status: 400 });
  const patch: Record<string, boolean> = {};
  if (typeof read === 'boolean') patch.read = read;
  if (typeof archived === 'boolean') patch.archived = archived;
  const { error } = await supabase.from('contact_messages').update(patch).eq('id', id);
  if (error) return fail(error);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const g = guard(request, true);
  if (g) return g;
  const supabase = db();
  if (!supabase) return noDb();
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id obrigatório' }, { status: 400 });
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);
  if (error) return fail(error);
  return NextResponse.json({ ok: true });
}
