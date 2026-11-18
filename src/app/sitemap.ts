import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { professionalProjects, personalProjects, webProjects } from "@/app/projects/helper";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://portifolio-wheat-omega-16.vercel.app";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = ["/home", "/trajetoria", "/projects", "/blog", "/lab"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  [...personalProjects, ...professionalProjects, ...webProjects].forEach((p) => pages.push({ url: `${base}/projects/${p.id}`, lastModified: new Date() }));
  const posts = await getAllPosts();
  posts.forEach((p) => pages.push({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.created_at) }));
  return pages;
}
