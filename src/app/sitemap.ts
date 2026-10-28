import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://portifolio-wheat-omega-16.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/home", "/projects", "/blog"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
