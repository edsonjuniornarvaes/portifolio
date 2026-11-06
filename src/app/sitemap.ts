import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://portifolio-wheat-omega-16.vercel.app";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = ["/home", "/about", "/projects", "/blog"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const posts = await getAllPosts();
  posts.forEach((p) => pages.push({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.created_at) }));
  return pages;
}
