/** Ícones dos aplicativos (ids dos projetos). */
export const BRAND_ICON: Record<string, string> = {
  pjbank: "/images/brands/conta-superlogica.webp",
  gruvi: "/images/brands/gruvi.webp",
  "minha-navex": "/images/brands/navex.webp",
};

/**
 * Painéis administrativos que usavam o mesmo modelo (white label) com a marca de cada cliente:
 * mostramos a mesma tela com o logo trocado.
 */
export type AdminBrand = { name: string; color: string; logo?: string; glyph?: "mont" | "gazin" };
export const ADMIN_BRAND: Record<string, AdminBrand> = {
  "gazin-b2b-b2c": { name: "Gazin", color: "#5aa0ff", glyph: "gazin" },
  "venda-direta-gazin": { name: "Gazin", color: "#5aa0ff", glyph: "gazin" },
  "lojas-manao": { name: "Lojas do Manão", color: "#ffd84d", logo: "/images/projects/lojas-manao.webp" },
  "mont-b2b": { name: "Mont", color: "#47c2d6", glyph: "mont" },
};
