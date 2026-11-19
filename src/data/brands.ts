/** Ícones dos aplicativos (ids dos projetos). */
export const BRAND_ICON: Record<string, string> = {
  pjbank: "/images/brands/conta-superlogica.webp",
  multjet: "/images/brands/multjet-icon.webp",
  gruvi: "/images/brands/gruvi.webp",
  "minha-navex": "/images/brands/navex.webp",
  "mont-b2b": "/images/brands/mont-icon.svg",
  "mont-b2c": "/images/brands/mont-icon.svg",
  "clube-da-joia-marketplace": "/images/brands/clube-da-joia.webp",
  "clube-da-joia-app": "/images/brands/clube-da-joia.webp",
  "consorcio-gazin": "/images/brands/gazin.webp",
  "gazin-b2b-b2c": "/images/brands/gazin.webp",
  "venda-direta-gazin": "/images/brands/gazin.webp",
};

/**
 * Painéis administrativos que usavam o mesmo modelo (white label) com a marca de cada cliente:
 * mostramos a mesma tela com o ícone e o nome do cliente no canto.
 */
export type AdminBrand = { name: string; color: string; icon?: string; pos?: string; scale?: number };
export const ADMIN_BRAND: Record<string, AdminBrand> = {
  "gazin-b2b-b2c": { name: "Gazin", color: "#3f7cf0" },
  "lojas-manao": { name: "Lojas do Manão", color: "#ffd84d", icon: "/images/projects/lojas-manao.webp", pos: "22% 50%", scale: 1.7 },
};
