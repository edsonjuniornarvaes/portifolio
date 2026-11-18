import { NextResponse } from 'next/server';
import { db } from '@/lib/admin-api';

export const revalidate = 60;

/** Textos e links editáveis do site (público). Sem banco/tabela, devolve vazio e o site usa os padrões do código. */
export async function GET() {
  const supabase = db();
  if (!supabase) return NextResponse.json({});
  const { data, error } = await supabase.from('site_settings').select('key,value');
  if (error || !data) return NextResponse.json({});
  return NextResponse.json(Object.fromEntries(data.map((r) => [r.key, r.value])));
}
