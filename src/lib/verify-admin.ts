import { NextRequest } from 'next/server';
import { ADMIN_EMAIL } from '@/lib/admin-auth';
import { readAdminToken } from '@/lib/admin-session';

export function getRequestToken(request: NextRequest): string | undefined {
  const authHeader = request.headers.get('authorization');
  return authHeader?.replace(/^Bearer\s+/i, '') || request.cookies.get('admin_token')?.value;
}

export function verifyAdminToken(request: NextRequest): boolean {
  if (!ADMIN_EMAIL) return false;
  return readAdminToken(getRequestToken(request)) === ADMIN_EMAIL;
}
