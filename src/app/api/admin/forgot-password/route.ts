import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { ADMIN_EMAIL } from '@/lib/admin-auth';
import { randomBytes } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Informe o e-mail' }, { status: 400 });
    }

    if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      // Não revelar se o e-mail existe
      return NextResponse.json({
        ok: true,
        message: 'Se esse e-mail estiver cadastrado, você receberá instruções em breve.',
      });
    }

    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    const supabase = createServerClient();

    await supabase.from('password_reset_tokens').delete().eq('email', ADMIN_EMAIL);

    const { error } = await supabase.from('password_reset_tokens').insert({
      token,
      email: ADMIN_EMAIL,
      expires_at: expiresAt,
    });

    if (error) {
      console.error('reset token insert', error);
      return NextResponse.json(
        { error: 'Não foi possível gerar o link. Verifique o Supabase (tabela password_reset_tokens).' },
        { status: 500 }
      );
    }

    const base =
      request.headers.get('origin') ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'http://localhost:3000';
    const resetUrl = `${base}/adminaccess/reset-password?token=${token}`;

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>',
          to: [ADMIN_EMAIL],
          subject: 'Redefinir senha do painel',
          html: `<p>Clique para redefinir sua senha:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>O link expira em 1 hora.</p>`,
        }),
      }).catch(() => null);
    }

    return NextResponse.json({
      ok: true,
      message: resendKey
        ? 'Se o e-mail estiver correto, enviamos o link de recuperação.'
        : 'Link gerado. Configure RESEND_API_KEY no Vercel para envio automático por e-mail.',
      ...(process.env.NODE_ENV === 'development' ? { devResetUrl: resetUrl } : {}),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Erro ao processar solicitação' }, { status: 500 });
  }
}
