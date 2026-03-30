"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";

const fade = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrap = styled.div`
  min-height: 100vh;
  padding: 100px 24px 80px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.35rem);
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--text-primary);
`;

const Sub = styled.p`
  color: var(--text-secondary);
  margin-bottom: 40px;
  max-width: 520px;
  line-height: 1.55;
  font-size: 0.98rem;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const YearBlock = styled.section`
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 0 20px;
  margin-bottom: 8px;

  @media (max-width: 520px) {
    grid-template-columns: 44px minmax(0, 1fr);
    gap: 0 14px;
  }
`;

const YearLabel = styled.div`
  position: sticky;
  top: 88px;
  align-self: start;
  text-align: right;
  padding-top: 6px;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.02em;
`;

const Rail = styled.div`
  border-left: 2px solid var(--border-color);
  padding-left: 22px;
  padding-bottom: 28px;

  @media (max-width: 520px) {
    padding-left: 16px;
  }
`;

const Entry = styled.div`
  position: relative;
  margin-bottom: 22px;
  animation: ${fade} 0.45s ease forwards;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: "";
    position: absolute;
    left: -27px;
    top: 6px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--bg-primary);
    border: 2px solid var(--accent-primary);
    box-shadow: 0 0 0 3px var(--bg-primary);

    @media (max-width: 520px) {
      left: -21px;
    }
  }
`;

const EntryDate = styled.time`
  display: block;
  font-size: 0.78rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const EntryTitle = styled(Link)`
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  line-height: 1.35;
  &:hover {
    color: var(--accent-primary);
  }
`;

const EntryExcerpt = styled.p`
  margin: 8px 0 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CoverThumb = styled.div`
  margin-top: 10px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid var(--border-color);
  max-width: 280px;
  aspect-ratio: 16 / 9;
  background: var(--bg-secondary);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  created_at: string;
};

function formatEntryDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function groupPostsByYear(posts: Post[]): [number, Post[]][] {
  const map = new Map<number, Post[]>();
  for (const p of posts) {
    const y = new Date(p.created_at).getFullYear();
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(p);
  }
  return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
}

export default function ArtigosPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((d) => setPosts(d.posts || []))
      .catch(() => setPosts([]));
  }, []);

  const byYear = useMemo(() => groupPostsByYear(posts), [posts]);

  return (
    <Wrap>
      <Title>Artigos</Title>
      <Sub>
        Textos sobre desenvolvimento, produto e experiências do dia a dia.
      </Sub>

      {posts.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>Nenhum artigo publicado ainda.</p>
      ) : (
        <Timeline>
          {byYear.map(([year, items]) => (
            <YearBlock key={year} aria-labelledby={`year-${year}`}>
              <YearLabel id={`year-${year}`}>{year}</YearLabel>
              <Rail>
                {items.map((p) => (
                  <Entry key={p.id}>
                    <EntryDate dateTime={p.created_at}>{formatEntryDate(p.created_at)}</EntryDate>
                    <EntryTitle href={`/blog/${p.slug}`}>{p.title}</EntryTitle>
                    {p.excerpt && <EntryExcerpt>{p.excerpt}</EntryExcerpt>}
                    {p.cover_image_url && (
                      <CoverThumb>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.cover_image_url} alt="" />
                      </CoverThumb>
                    )}
                  </Entry>
                ))}
              </Rail>
            </YearBlock>
          ))}
        </Timeline>
      )}
    </Wrap>
  );
}
