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
  { id: "mont-capital", year: "2021 a 2024", screen: `${P}mont-home-alt.webp` },
  { id: "minha-navex", year: "2021 a 2023", screen: `${P}navex-home-new.webp` },
  { id: "gazin", year: "2022 a 2023" },
  // projetos próprios logo depois do Grupo Gazin
  { id: "clube-da-joia-marketplace", year: "2026" },
  { id: "multjet", year: "2026" },
  { id: "clube-da-joia-app", year: "2026", screen: `${P}clube-app-home.webp` },
  { id: "erp-sistemas", year: "2020 a 2023" },
];

/** Telas que se revezam no celular do início. */
export const HERO_SCREENS = [
  `${P}clube-app-home.webp`,
  `${P}pjbank-home.webp`,
  `${P}gruvi-home.webp`,
  `${P}mont-home-alt.webp`,
  `${P}consorcio-gazin-simulador.webp`,
  `${P}navex-home-new.webp`,
];

/** Anos mostrados nas listas (ids fora daqui mostram o status). */
export const YEARS: Record<string, string> = {
  ...Object.fromEntries(SHOWCASE.map((s) => [s.id, s.year])),
};

const WEB_IDS = new Set<string>([...webProjects.map((p) => p.id), "clube-da-joia-marketplace", "multjet", "gazin"]);
/** Site, loja ou sistema web (o resto é app). */
export const isWebId = (id: string) => WEB_IDS.has(id);

/** Cor da marca do projeto (com reserva). */
/** Todos os projetos usam a cor de destaque do site (a que a corda troca), para o visual ficar coeso. */
export const projectColor = (_id: string) => "var(--accent)";

/** Tela de app de um projeto (primeira de `screens` que não seja capa de divulgação). */
export function appScreen(id: string): string | undefined {
  const fromShowcase = SHOWCASE.find((s) => s.id === id)?.screen;
  if (fromShowcase) return fromShowcase;
  const p = getProjectById(id);
  return p?.screens?.find((u) => !/cover|board/.test(u));
}
