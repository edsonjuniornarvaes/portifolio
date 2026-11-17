import { cookies } from "next/headers";
import { DEFAULT_LANG, LANG_COOKIE, normalizeLang, type Lang } from "./config";

/** Idioma da requisição: o que o visitante escolheu (cookie); sem escolha, português. */
export async function getLang(): Promise<Lang> {
  try {
    const c = normalizeLang((await cookies()).get(LANG_COOKIE)?.value);
    if (c) return c;
    return DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}
