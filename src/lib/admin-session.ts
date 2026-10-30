import { createHmac, timingSafeEqual } from 'crypto';

const TTL_MS = 1000 * 60 * 60 * 12; // 12 horas

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
}

const b64 = (s: string) => Buffer.from(s, 'utf-8').toString('base64url');
const sign = (data: string, key: string) => createHmac('sha256', key).update(data).digest('base64url');

/** Gera um token assinado (HMAC) com e-mail e validade. Não é forjável sem o segredo do servidor. */
export function createAdminToken(email: string): string {
  const key = secret();
  if (!key) {
    throw new Error('Defina ADMIN_SESSION_SECRET (ou SUPABASE_SERVICE_ROLE_KEY) para assinar a sessão do admin.');
  }
  const payload = b64(JSON.stringify({ e: email, exp: Date.now() + TTL_MS }));
  return `${payload}.${sign(payload, key)}`;
}

/** Valida assinatura e validade; devolve o e-mail ou null. */
export function readAdminToken(token: string | null | undefined): string | null {
  const key = secret();
  if (!key || !token) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = sign(payload, key);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const { e, exp } = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
    if (typeof e !== 'string' || typeof exp !== 'number' || exp < Date.now()) return null;
    return e;
  } catch {
    return null;
  }
}
