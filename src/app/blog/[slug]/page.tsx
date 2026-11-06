import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";
import BlogPostClient, { type Post } from "./post-client";
import { getLang } from "@/i18n/server";
import { ui } from "@/i18n/dict";

async function getPost(slug: string): Promise<Post | null> {
  const p = await getPostBySlug(slug, await getLang());
  return p ? { title: p.title, slug: p.slug, excerpt: p.excerpt, cover_image_url: p.cover_image_url, body_markdown: p.body_markdown, created_at: p.created_at } : null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: ui[await getLang()].post.notFound };
  const description = post.excerpt || post.body_markdown.replace(/[#>*_`\[\]()!-]+/g, " ").replace(/\s+/g, " ").trim().slice(0, 155);
  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.created_at,
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : undefined,
    },
    twitter: { card: post.cover_image_url ? "summary_large_image" : "summary", title: post.title, description },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  return <BlogPostClient post={post} />;
}
