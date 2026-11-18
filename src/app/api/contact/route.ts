import { NextRequest, NextResponse } from 'next/server';
import { db, isMissingTable } from '@/lib/admin-api';
import { rateLimit } from '@/lib/rate-limit';
import { sameOrigin } from '@/lib/verify-admin';

export const dynamic = 'force-dynamic';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Formulário de contato do site (público): grava a mensagem para você ler no painel. */
export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: 'Origem não permitida' }, { status: 403 });
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const rl = rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);
  if (!rl.ok) return NextResponse.json({ error: 'Muitas mensagens. Tente mais tarde.' }, { status: 429 });

  let body: { name?: string; email?: string; message?: string; website?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Pedido inválido' }, { status: 400 });
  }
  // Campo-isca: robôs preenchem, pessoas não. Finge sucesso.
  if (body.website) return NextResponse.json({ ok: true });

  const name = String(body.name || '').trim().slice(0, 120);
  const email = String(body.email || '').trim().slice(0, 200);
  const message = String(body.message || '').trim().slice(0, 4000);
  if (name.length < 2) return NextResponse.json({ error: 'Informe seu nome.' }, { status: 400 });
  if (!EMAIL.test(email)) return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 });
  if (message.length < 10) return NextResponse.json({ error: 'Escreva uma mensagem um pouco maior.' }, { status: 400 });

  const supabase = db();
  if (!supabase) return NextResponse.json({ error: 'Envio indisponível no momento.' }, { status: 503 });
  const { error } = await supabase.from('contact_messages').insert({ name, email, message });
  if (error) {
    if (!isMissingTable(error)) console.error(error);
    return NextResponse.json({ error: 'Não foi possível enviar agora.' }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
