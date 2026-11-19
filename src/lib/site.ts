/** Endereço público do site (sem barra no fim). Em produção vem de NEXT_PUBLIC_SITE_URL; este é o padrão. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://edsonjuniordev.com.br").replace(/\/+$/, "");
