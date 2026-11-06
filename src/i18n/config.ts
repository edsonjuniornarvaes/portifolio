export type Lang = "pt" | "en";

export const LANGS: Lang[] = ["pt", "en"];
export const LANG_COOKIE = "lang";
export const DEFAULT_LANG: Lang = "pt";

export function normalizeLang(v: string | null | undefined): Lang | null {
  const s = (v || "").toLowerCase();
  if (s.startsWith("pt")) return "pt";
  if (s.startsWith("en")) return "en";
  return null;
}

/** Primeiro idioma suportado do cabeçalho Accept-Language (ex.: "en-US,en;q=0.9,pt;q=0.8"). */
export function fromAcceptLanguage(header: string | null | undefined): Lang {
  for (const part of (header || "").split(",")) {
    const l = normalizeLang(part.trim().split(";")[0]);
    if (l) return l;
  }
  return DEFAULT_LANG;
}

export const LOCALE: Record<Lang, string> = { pt: "pt-BR", en: "en-US" };
