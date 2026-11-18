import { NextRequest, NextResponse } from 'next/server';
import { db, guard } from '@/lib/admin-api';

export const dynamic = 'force-dynamic';

const ENV = [
  ['ADMIN_EMAIL', 'E-mail do admin'],
  ['ADMIN_PASSWORD_HASH', 'Hash da senha'],
  ['ADMIN_SESSION_SECRET', 'Segredo da sessão'],
  ['NEXT_PUBLIC_SUPABASE_URL', 'Supabase (URL)'],
  ['SUPABASE_SERVICE_ROLE_KEY', 'Supabase (chave de serviço)'],
  ['NEXT_PUBLIC_SUPABASE_ANON_KEY', 'Supabase (chave pública)'],
  ['NEXT_PUBLIC_SITE_URL', 'Endereço do site'],
  ['RESEND_API_KEY', 'Resend (e-mail de recuperar senha)'],
  ['INSTAGRAM_FEED_URL', 'Feed do Instagram'],
] as const;
const TABLES = ['blog_posts', 'contact_messages', 'team_items', 'site_settings'] as const;

/** Só diz se cada item está configurado (sim/não). Nunca devolve valores. */
export async function GET(request: NextRequest) {
  const g = guard(request);
  if (g) return g;
  const env = ENV.map(([k, label]) => ({ key: k, label, ok: !!process.env[k] }));
  const supabase = db();
  const started = Date.now();
  const tables = await Promise.all(
    TABLES.map(async (t) => {
      if (!supabase) return { table: t, ok: false };
      const { error } = await supabase.from(t).select('*', { head: true, count: 'exact' }).limit(1);
      return { table: t, ok: !error };
    }),
  );
  return NextResponse.json({ env, tables, ms: Date.now() - started, node: process.version, vercel: !!process.env.VERCEL, region: process.env.VERCEL_REGION || null, commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || null });
}
