import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * Mantém o projeto Supabase ativo: uma consulta leve conta como atividade
 * (o plano gratuito pausa depois de 7 dias sem uso). Chamada 1x por dia pelo cron da Vercel
 * (veja vercel.json). Nunca devolve erro 5xx para não gerar alarme falso.
 */
export async function GET() {
  const startedAt = Date.now();
  try {
    const supabase = createServerClient();
    const { error } = await supabase.from('blog_posts').select('id').limit(1);
    return NextResponse.json(
      { ok: true, db: !error, ms: Date.now() - startedAt, at: new Date().toISOString() },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    // Supabase não configurado neste ambiente (ex.: build local).
    return NextResponse.json(
      { ok: true, db: false, at: new Date().toISOString() },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
