export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
}

/** Aceita só URLs http(s) ou caminhos do próprio site (evita javascript: e similares). */
export function safeImageUrl(value: unknown): string | null {
  if (value === null || value === undefined || value === '') return null;
  const v = String(value).trim();
  if (v.startsWith('/') && !v.startsWith('//')) return v;
  try {
    const u = new URL(v);
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString() : null;
  } catch {
    return null;
  }
}

export function readingMinutes(markdown: string) {
  const words = markdown.replace(/```[\s\S]*?```/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return { words, minutes: Math.max(1, Math.round(words / 200)) };
}
