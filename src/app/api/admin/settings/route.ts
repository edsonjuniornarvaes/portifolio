import { NextRequest, NextResponse } from 'next/server';
import { db, fail, guard, noDb } from '@/lib/admin-api';

export const dynamic = 'force-dynamic';

const KEYS = ['links', 'status'] as const;
const clean = (v: unknown, max = 300) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const url = (v: unknown) => {
  const s = clean(v, 300);
  return /^(https?:\/\/|mailto:)/i.test(s) || s === '' ? s : `https://${s}`;
};

export async function GET(request: NextRequest) {
  const g = guard(request);
  if (g) return g;
  const supabase = db();
  if (!supabase) return noDb();
  const { data, error } = await supabase.from('site_settings').select('key,value');
  if (error) return fail(error);
  return NextResponse.json({ settings: Object.fromEntries((data || []).map((r) => [r.key, r.value])) });
}

export async function PUT(request: NextRequest) {
  const g = guard(request, true);
  if (g) return g;
  const supabase = db();
  if (!supabase) return noDb();
  const { key, value } = await request.json().catch(() => ({}));
  if (!KEYS.includes(key)) return NextResponse.json({ error: 'Chave inválida' }, { status: 400 });
  let safe: Record<string, unknown>;
  if (key === 'links') {
    safe = { email: clean(value?.email, 200), linkedin: url(value?.linkedin), github: url(value?.github), instagram: url(value?.instagram), twitter: url(value?.twitter) };
  } else {
    safe = { available: value?.available !== false, message: clean(value?.message, 160) };
  }
  const { error } = await supabase.from('site_settings').upsert({ key, value: safe, updated_at: new Date().toISOString() });
  if (error) return fail(error);
  return NextResponse.json({ ok: true, value: safe });
}
