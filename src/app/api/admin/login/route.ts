import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_EMAIL, verifyAdminPassword } from '@/lib/admin-auth';
import { createAdminToken } from '@/lib/admin-session';
import { clearRateLimit, rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const limit = rateLimit(`login:${ip}`);
  if (!limit.ok) {
    return NextResponse.json(
      { error: `Muitas tentativas. Tente de novo em ${Math.ceil(limit.retryAfter / 60)} min.` },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 });
    }

    const emailOk = ADMIN_EMAIL !== '' && String(email).trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
    const passwordOk = emailOk ? await verifyAdminPassword(String(password)) : false;

    if (!emailOk || !passwordOk) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    clearRateLimit(`login:${ip}`);
    const token = createAdminToken(ADMIN_EMAIL);
    return NextResponse.json({ token, email: ADMIN_EMAIL });
  } catch (error) {
    console.error('Login error:', error);
    const msg = error instanceof Error ? error.message : '';
    return NextResponse.json(
      { error: msg.includes('ADMIN_SESSION_SECRET') ? msg : 'Erro ao processar login' },
      { status: 500 },
    );
  }
}
