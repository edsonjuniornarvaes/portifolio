/**
 * Trabalhos em destaque na home, na ordem em que aparecem. O texto vem de `projects/helper.ts`;
 * aqui ficam o ano e a imagem que aparece ao passar o mouse (só telas de app, sem prints de site).
 */
export type WorkMeta = { year?: string; preview?: string };

const P = "/images/projects/";

export const WORK_META: Record<string, WorkMeta> = {
  pjbank: { year: "2025", preview: `${P}pjbank-home.webp` },
  gruvi: { year: "2024", preview: `${P}gruvi-home.webp` },
  "clube-da-joia-marketplace": { year: "2026" },
  "clube-da-joia-app": { year: "2026", preview: `${P}clube-app-home.webp` },
  "mont-b2b": { year: "2021–24", preview: `${P}mont-b2b-home.webp` },
  "mont-b2c": { year: "2021–24", preview: `${P}mont-b2c-carteira.webp` },
  "consorcio-gazin": { year: "2023", preview: `${P}consorcio-gazin-simulador.webp` },
  "minha-navex": { year: "2021–23", preview: `${P}navex-home.webp` },
};

export const SELECTED_IDS = ["pjbank", "gruvi", "clube-da-joia-marketplace", "clube-da-joia-app", "mont-b2b", "consorcio-gazin", "minha-navex"] as const;

import { webProjects } from "@/app/projects/helper";

const WEB_IDS = new Set<string>([...webProjects.map((p) => p.id), "clube-da-joia-marketplace"]);
/** Site, loja ou sistema web (o resto é app). */
export const isWebId = (id: string) => WEB_IDS.has(id);
