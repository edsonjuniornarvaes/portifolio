import type { NextResponse } from 'next/server';

export const ADMIN_COOKIE = 'admin_token';
const MAX_AGE = 60 * 60 * 12; // 12 horas, igual à validade do token

/** Guarda a sessão num cookie HttpOnly: o JavaScript da página não consegue ler (protege contra XSS). */
export function setAdminCookie(res: NextResponse, token: string) {
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export function clearAdminCookie(res: NextResponse) {
  res.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 0 });
}
