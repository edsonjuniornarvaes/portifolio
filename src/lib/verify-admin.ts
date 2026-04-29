import { NextRequest } from 'next/server';
import { ADMIN_EMAIL } from '@/lib/admin-auth';

export function verifyAdminToken(request: NextRequest): boolean {
  if (!ADMIN_EMAIL) return false;

  const authHeader = request.headers.get('authorization');
  const token =
    authHeader?.replace('Bearer ', '') || request.cookies.get('admin_token')?.value;
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [email] = decoded.split(':');
    return email === ADMIN_EMAIL;
  } catch {
    return false;
  }
}
