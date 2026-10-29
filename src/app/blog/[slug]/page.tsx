"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import styled from "styled-components";
import { MarkdownBody } from "@/components/markdown-body";
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
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4vw, 2.25rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
  line-height: 1.2;
`;

const Meta = styled.p`
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 28px;
`;

type Post = {
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  body_markdown: string;
  created_at: string;
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = String(params?.slug || "");
  const [post, setPost] = useState<Post | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/posts/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("404");
        return r.json();
      })
      .then((d) => setPost(d.post))
      .catch(() => setPost(null));
  }, [slug]);

  if (post === undefined) {
    return (
      <Wrap>
        <p style={{ color: "var(--text-muted)" }}>Carregando…</p>
      </Wrap>
    );
  }

  if (post === null) {
    return (
      <Wrap>
        <Back href="/blog">
          <FaArrowLeft /> Artigos
        </Back>
        <p style={{ color: "var(--text-secondary)" }}>Artigo não encontrado.</p>
      </Wrap>
    );
  }

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
      <Meta>{date}</Meta>
      <MarkdownBody markdown={post.body_markdown} />
    </Wrap>
  );
}
