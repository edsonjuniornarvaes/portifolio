/** Limite simples em memória (por instância): protege o login contra tentativa e erro. */
const hits = new Map<string, { n: number; reset: number }>();

export function rateLimit(key: string, max = 8, windowMs = 10 * 60 * 1000): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const cur = hits.get(key);
  if (!cur || cur.reset < now) {
    hits.set(key, { n: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  cur.n += 1;
  if (cur.n > max) return { ok: false, retryAfter: Math.ceil((cur.reset - now) / 1000) };
  return { ok: true, retryAfter: 0 };
}

export function clearRateLimit(key: string) {
  hits.delete(key);
}
