import { NextRequest, NextResponse } from 'next/server';
import { db, fail, guard, noDb } from '@/lib/admin-api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const g = guard(request);
  if (g) return g;
  const supabase = db();
  if (!supabase) return noDb();
  const { data, error } = await supabase.from('team_items').select('*').order('due_date', { ascending: true, nullsFirst: false }).order('created_at', { ascending: false }).limit(300);
  if (error) return fail(error);
  return NextResponse.json({ items: data });
}

export async function POST(request: NextRequest) {
  const g = guard(request, true);
  if (g) return g;
  const supabase = db();
  if (!supabase) return noDb();
  const b = await request.json().catch(() => ({}));
  const kind = b.kind === 'event' ? 'event' : 'note';
  const title = String(b.title || '').trim().slice(0, 200);
  if (!title) return NextResponse.json({ error: 'Título obrigatório' }, { status: 400 });
  const due = /^\d{4}-\d{2}-\d{2}$/.test(b.due_date || '') ? b.due_date : null;
  const { data, error } = await supabase.from('team_items').insert({ kind, title, body: String(b.body || '').slice(0, 4000), due_date: kind === 'event' ? due : null }).select().single();
  if (error) return fail(error);
  return NextResponse.json({ item: data });
}

export async function PATCH(request: NextRequest) {
  const g = guard(request, true);
  if (g) return g;
  const supabase = db();
  if (!supabase) return noDb();
  const b = await request.json().catch(() => ({}));
  if (!b.id) return NextResponse.json({ error: 'id obrigatório' }, { status: 400 });
  const patch: Record<string, unknown> = {};
  if (typeof b.done === 'boolean') patch.done = b.done;
  if (typeof b.title === 'string' && b.title.trim()) patch.title = b.title.trim().slice(0, 200);
  if (typeof b.body === 'string') patch.body = b.body.slice(0, 4000);
  const { error } = await supabase.from('team_items').update(patch).eq('id', b.id);
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
  const { error } = await supabase.from('team_items').delete().eq('id', id);
  if (error) return fail(error);
  return NextResponse.json({ ok: true });
}
