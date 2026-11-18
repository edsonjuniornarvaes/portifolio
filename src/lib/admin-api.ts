import { NextRequest, NextResponse } from 'next/server';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createServerClient } from '@/lib/supabase';
import { sameOrigin, verifyAdminToken } from '@/lib/verify-admin';

/** Confere login e origem. Devolve a resposta de erro (ou null se pode seguir). */
export function guard(request: NextRequest, write = false): NextResponse | null {
  if (!verifyAdminToken(request)) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  if (write && !sameOrigin(request)) return NextResponse.json({ error: 'Origem não permitida' }, { status: 403 });
  return null;
}

/** Cliente do banco com a chave de serviço; null quando o Supabase não está configurado. */
export function db(): SupabaseClient | null {
  try {
    return createServerClient();
  } catch {
    return null;
  }
}

/** A tabela ainda não existe (o SQL do painel não foi rodado)? */
export function isMissingTable(error: { code?: string; message?: string } | null | undefined): boolean {
  if (!error) return false;
  return error.code === '42P01' || error.code === 'PGRST205' || /does not exist|Could not find the table|schema cache/i.test(error.message || '');
}

export const MISSING_SQL = 'As tabelas do painel ainda não existem. Rode o arquivo supabase-admin.sql no SQL Editor do Supabase.';

export function fail(error: { code?: string; message?: string } | null | undefined, fallback = 'Não foi possível concluir.') {
  if (isMissingTable(error)) return NextResponse.json({ error: MISSING_SQL, setup: true }, { status: 503 });
  console.error(error);
  return NextResponse.json({ error: fallback }, { status: 500 });
}

export const noDb = () => NextResponse.json({ error: 'Supabase não configurado neste ambiente.', setup: true }, { status: 503 });
