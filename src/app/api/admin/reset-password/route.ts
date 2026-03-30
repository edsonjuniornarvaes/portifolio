import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { ADMIN_EMAIL, setAdminPasswordHash } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();
    if (!token || !password || password.length < 8) {
      return NextResponse.json(
        { error: 'Token inválido ou senha muito curta (mín. 8 caracteres)' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { data: row, error: findError } = await supabase
      .from('password_reset_tokens')
      .select('*')
      .eq('token', token)
      .maybeSingle();

    if (findError || !row) {
      return NextResponse.json({ error: 'Link inválido ou expirado' }, { status: 400 });
    }

    if (new Date(row.expires_at) < new Date()) {
      await supabase.from('password_reset_tokens').delete().eq('token', token);
      return NextResponse.json({ error: 'Link expirado. Solicite outro.' }, { status: 400 });
    }

    if (row.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 400 });
    }

    const hash = await bcrypt.hash(password, 10);
    await setAdminPasswordHash(hash);
    await supabase.from('password_reset_tokens').delete().eq('token', token);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Erro ao redefinir senha' }, { status: 500 });
  }
}
