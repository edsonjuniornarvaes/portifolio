/** Ícones dos aplicativos (ids dos projetos). */
export const BRAND_ICON: Record<string, string> = {
  pjbank: "/images/brands/conta-superlogica.webp",
  multjet: "/images/brands/multjet-icon.webp",
  "mont-capital": "/images/brands/mont-icon.svg",
  gazin: "/images/brands/gazin.webp",
  gruvi: "/images/brands/gruvi.webp",
  "minha-navex": "/images/brands/navex.webp",
  "clube-da-joia-marketplace": "/images/brands/clube-da-joia.webp",
  "clube-da-joia-app": "/images/brands/clube-da-joia.webp",
};

/**
 * Painéis administrativos que usavam o mesmo modelo (white label) com a marca de cada cliente:
 * mostramos a mesma tela com o ícone e o nome do cliente no canto.
 */
export type AdminBrand = { name: string; color: string; icon?: string; pos?: string; scale?: number };
export const ADMIN_BRAND: Record<string, AdminBrand> = {
};
