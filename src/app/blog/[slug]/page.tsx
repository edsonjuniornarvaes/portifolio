import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import BlogPostClient, { type Post } from "./post-client";

export const revalidate = 60;

async function getPost(slug: string): Promise<Post | null> {
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("title, slug, excerpt, cover_image_url, body_markdown, created_at")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    return (data as Post) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Artigo não encontrado" };
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
