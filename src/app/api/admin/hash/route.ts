import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { guard } from '@/lib/admin-api';

export const dynamic = 'force-dynamic';

/** Gera o hash de uma senha nova para você colar em ADMIN_PASSWORD_HASH (a senha não é guardada em lugar nenhum). */
export async function POST(request: NextRequest) {
  const g = guard(request, true);
  if (g) return g;
  const { password } = await request.json().catch(() => ({}));
  const p = String(password || '');
  if (p.length < 10) return NextResponse.json({ error: 'Use pelo menos 10 caracteres.' }, { status: 400 });
  if (p.length > 100) return NextResponse.json({ error: 'Senha muito longa.' }, { status: 400 });
  return NextResponse.json({ hash: await bcrypt.hash(p, 12) });
}
