import { getProjectById, webProjects } from "@/app/projects/helper";

/**
 * Trabalhos em destaque, na ordem da rolagem horizontal da home.
 * `screen`: tela do app (vai num celular). Sem tela = site (vai numa janela de navegador desenhada).
 */
export type Showcase = { id: string; year: string; screen?: string };

const P = "/images/projects/";

export const SHOWCASE: Showcase[] = [
  { id: "pjbank", year: "2025", screen: `${P}pjbank-home.webp` },
  { id: "gruvi", year: "2024", screen: `${P}gruvi-home.webp` },
  { id: "clube-da-joia-marketplace", year: "2026" },
  { id: "clube-da-joia-app", year: "2026", screen: `${P}clube-app-home.webp` },
  { id: "mont-b2b", year: "2021–24", screen: `${P}mont-b2b-home.webp` },
  { id: "consorcio-gazin", year: "2023", screen: `${P}consorcio-gazin-simulador.webp` },
  { id: "minha-navex", year: "2021–23", screen: `${P}navex-home.webp` },
];

/** Telas que se revezam no celular do início. */
export const HERO_SCREENS = [
  `${P}clube-app-home.webp`,
  `${P}pjbank-home.webp`,
  `${P}gruvi-home.webp`,
  `${P}mont-b2b-home.webp`,
  `${P}consorcio-gazin-simulador.webp`,
  `${P}navex-home.webp`,
];

/** Anos mostrados nas listas (ids fora daqui mostram o status). */
export const YEARS: Record<string, string> = {
  ...Object.fromEntries(SHOWCASE.map((s) => [s.id, s.year])),
  "mont-b2c": "2021–24",
};

const WEB_IDS = new Set<string>([...webProjects.map((p) => p.id), "clube-da-joia-marketplace"]);
/** Site, loja ou sistema web (o resto é app). */
export const isWebId = (id: string) => WEB_IDS.has(id);

/** Cor da marca do projeto (com reserva). */
export const projectColor = (id: string) => getProjectById(id)?.iconColor || "#2eebaa";

/** Tela de app de um projeto (primeira de `screens` que não seja capa de divulgação). */
export function appScreen(id: string): string | undefined {
  const fromShowcase = SHOWCASE.find((s) => s.id === id)?.screen;
  if (fromShowcase) return fromShowcase;
  const p = getProjectById(id);
  return p?.screens?.find((u) => !/cover|board/.test(u));
}
