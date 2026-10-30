import type { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://portifolio-wheat-omega-16.vercel.app";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = ["/home", "/about", "/projects", "/blog"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  try {
    const supabase = createServerClient();
    const { data } = await supabase.from("blog_posts").select("slug, updated_at").eq("published", true);
    (data || []).forEach((p: { slug: string; updated_at: string }) =>
      pages.push({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.updated_at) }),
    );
  } catch {
    /* sem Supabase configurado: só as páginas fixas */
  }
  return pages;
}
