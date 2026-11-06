import { cookies, headers } from "next/headers";
import { DEFAULT_LANG, LANG_COOKIE, fromAcceptLanguage, normalizeLang, type Lang } from "./config";

/** Idioma da requisição: cookie escolhido pelo visitante, senão Accept-Language do navegador. */
export async function getLang(): Promise<Lang> {
  try {
    const c = normalizeLang((await cookies()).get(LANG_COOKIE)?.value);
    if (c) return c;
    return fromAcceptLanguage((await headers()).get("accept-language"));
  } catch {
    return DEFAULT_LANG;
  }
}
