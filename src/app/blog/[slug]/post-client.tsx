"use client";

import Link from "next/link";
import styled from "styled-components";
import { MarkdownBody } from "@/components/markdown-body";
import { readingMinutes } from "@/lib/post-utils";
import { FaArrowLeft } from "react-icons/fa";

const Wrap = styled.article`
  max-width: 720px;
  margin: 0 auto;
  padding: 100px 24px 80px;
`;

const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 28px;
  &:hover {
    color: var(--accent-primary);
  }
`;

const Cover = styled.div`
  position: relative;
  aspect-ratio: 21 / 9;
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 28px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const H1 = styled.h1`
  font-family: var(--font-sans);
  font-size: clamp(1.6rem, 4vw, 2.25rem);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
  line-height: 1.2;
`;

const Meta = styled.p`
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 28px;
`;

export type Post = {
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  body_markdown: string;
  created_at: string;
};

export default function BlogPostClient({ post }: { post: Post }) {
  const date = new Date(post.created_at).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Wrap>
      <Back href="/blog">
        <FaArrowLeft /> Artigos
      </Back>
      {post.cover_image_url && (
        <Cover>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover_image_url} alt="" />
        </Cover>
      )}
      <H1>{post.title}</H1>
      <Meta>{date} · {readingMinutes(post.body_markdown).minutes} min de leitura</Meta>
      <MarkdownBody markdown={post.body_markdown} />
    </Wrap>
  );
}
