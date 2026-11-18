import { NextRequest, NextResponse } from 'next/server';
import { db, guard } from '@/lib/admin-api';

export const dynamic = 'force-dynamic';

/** Números do "Início" do painel. Cada contagem falha sozinha (null) se a tabela ainda não existe. */
export async function GET(request: NextRequest) {
  const g = guard(request);
  if (g) return g;
  const supabase = db();
  if (!supabase) return NextResponse.json({ configured: false });
  const count = async (q: PromiseLike<{ count: number | null; error: unknown }>) => {
    const r = await q;
    return r.error ? null : r.count ?? 0;
  };
  const today = new Date().toISOString().slice(0, 10);
  const [unread, messages, posts, published, upcoming] = await Promise.all([
    count(supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('read', false).eq('archived', false)),
    count(supabase.from('contact_messages').select('id', { count: 'exact', head: true })),
    count(supabase.from('blog_posts').select('id', { count: 'exact', head: true })),
    count(supabase.from('blog_posts').select('id', { count: 'exact', head: true }).eq('published', true)),
    count(supabase.from('team_items').select('id', { count: 'exact', head: true }).eq('kind', 'event').eq('done', false).gte('due_date', today)),
  ]);
  const { data: next } = await supabase.from('team_items').select('id,title,due_date').eq('kind', 'event').eq('done', false).gte('due_date', today).order('due_date').limit(4);
  const { data: latest } = await supabase.from('contact_messages').select('id,name,message,read,created_at').eq('archived', false).order('created_at', { ascending: false }).limit(4);
  return NextResponse.json({ configured: true, unread, messages, posts, published, upcoming, next: next || [], latest: latest || [] });
}
