import { NextRequest } from 'next/server';
import { ADMIN_EMAIL } from '@/lib/admin-auth';
import { readAdminToken } from '@/lib/admin-session';
import { ADMIN_COOKIE } from '@/lib/admin-cookie';

/** Token da requisição: primeiro o cookie HttpOnly, depois (compatibilidade) o cabeçalho Authorization. */
export function getRequestToken(request: NextRequest): string | undefined {
  const fromCookie = request.cookies.get(ADMIN_COOKIE)?.value;
  if (fromCookie) return fromCookie;
  const authHeader = request.headers.get('authorization');
  return authHeader?.replace(/^Bearer\s+/i, '') || undefined;
}

export function verifyAdminToken(request: NextRequest): boolean {
  if (!ADMIN_EMAIL) return false;
  return readAdminToken(getRequestToken(request)) === ADMIN_EMAIL;
}

/** Pedidos que alteram dados só valem se vierem do próprio site (bloqueia envio de outros domínios). */
export function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get('host');
  } catch {
    return false;
  }
}
