import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Credenciais do admin (em produção, isso deveria estar no banco de dados)
const ADMIN_EMAIL = 'edsonjunior.narvaes@gmail.com';
const ADMIN_PASSWORD_HASH = '$2b$10$v72K7Iq8d1kquoEK.orSXuk/kdGZ1cvMzLmwC1obUSRr3WIcJuJ/u';

// Hash da senha: !Edsandrade@030adm
// Para gerar: bcrypt.hash('!Edsandrade@030adm', 10)

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar credenciais
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Gerar token simples (em produção, use JWT)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

    return NextResponse.json({
      token,
      email,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erro ao processar login' },
      { status: 500 }
    );
  }
}
