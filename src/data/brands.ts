/** Ícones dos aplicativos (ids dos projetos). */
export const BRAND_ICON: Record<string, string> = {
  pjbank: "/images/brands/conta-superlogica.webp",
  gruvi: "/images/brands/gruvi.webp",
  "minha-navex": "/images/brands/navex.webp",
  "mont-b2b": "/images/brands/mont-icon.svg",
  "mont-b2c": "/images/brands/mont-icon.svg",
  "clube-da-joia-marketplace": "/images/brands/clube-da-joia.webp",
  "clube-da-joia-app": "/images/brands/clube-da-joia.webp",
};

/**
 * Painéis administrativos que usavam o mesmo modelo (white label) com a marca de cada cliente:
 * mostramos a mesma tela com o logo trocado.
 */
export type AdminBrand = { name: string; color: string; logo?: string; wide?: string; glyph?: "mont" | "gazin" };
export const ADMIN_BRAND: Record<string, AdminBrand> = {
  "gazin-b2b-b2c": { name: "Gazin", color: "#5aa0ff", glyph: "gazin" },
  "venda-direta-gazin": { name: "Gazin", color: "#5aa0ff", glyph: "gazin" },
  "lojas-manao": { name: "Lojas do Manão", color: "#ffd84d", logo: "/images/projects/lojas-manao.webp" },
  "mont-b2b": { name: "Mont Capital", color: "#47c2d6", wide: "/images/brands/mont-logo.svg" },
};
