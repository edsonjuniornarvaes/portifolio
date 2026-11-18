import { cookies, headers } from "next/headers";
import { DEFAULT_LANG, LANG_COOKIE, normalizeLang, type Lang } from "./config";

/**
 * Idioma da requisição:
 * 1) o que o visitante escolheu (cookie);
 * 2) quem acessa do Brasil, ou tem o navegador em português, vê português;
 * 3) país conhecido e diferente do Brasil, com navegador em outro idioma, vê inglês;
 * 4) sem informação nenhuma, português.
 */
export async function getLang(): Promise<Lang> {
  try {
    const c = normalizeLang((await cookies()).get(LANG_COOKIE)?.value);
    if (c) return c;
    const h = await headers();
    const country = (h.get("x-vercel-ip-country") || "").toUpperCase();
    if (country === "BR") return "pt";
    const accept = (h.get("accept-language") || "").toLowerCase();
    if (accept.startsWith("pt")) return "pt";
    if (country) return "en";
    return DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}
