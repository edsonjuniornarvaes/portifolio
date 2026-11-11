"use client";

import Link from "next/link";
import styled from "styled-components";
import { useLang } from "@/i18n/provider";

export type PostPreview = { id: string; slug: string; title: string; excerpt: string | null; created_at: string };

const List = styled.ul`
  list-style: none; border-top: 1px solid var(--line);
  li { border-bottom: 1px solid var(--line); }
  a { display: grid; grid-template-columns: 120px minmax(0, 1fr) auto; gap: 6px 28px; align-items: baseline; padding: 24px 0; transition: padding 0.3s cubic-bezier(.2,.7,.2,1); }
  a:hover { padding-left: 14px; }
  time { font-family: var(--font-mono); font-size: 0.78rem; color: var(--syn-c); }
  h3 { font-size: clamp(1.3rem, 2.6vw, 1.9rem); font-weight: 600; letter-spacing: -0.03em; line-height: 1.18; transition: color 0.2s ease; }
  a:hover h3 { color: var(--accent); }
  .go { font-family: var(--font-mono); color: var(--muted); transition: transform 0.3s ease, color 0.2s ease; }
  a:hover .go { transform: translateX(6px); color: var(--accent); }
  p { grid-column: 2 / 3; max-width: 46rem; color: var(--muted); font-size: 0.95rem; line-height: 1.55; }
  @media (max-width: 700px) { a { grid-template-columns: 1fr auto; } time { grid-column: 1 / -1; } p { grid-column: 1 / -1; } a:hover { padding-left: 0; } }
`;

export default function Writing({ posts }: { posts: PostPreview[] }) {
  const { t } = useLang();
  if (!posts.length) return <p style={{ color: "var(--muted)" }}>{t.writing.none}</p>;
  return (
    <List>
      {posts.map((p) => (
        <li key={p.id}>
          <Link href={`/blog/${p.slug}`}>
            <time>{p.created_at.slice(0, 10)}</time>
            <h3>{p.title}</h3>
            <span className="go" aria-hidden>→</span>
            {p.excerpt && <p>{p.excerpt}</p>}
          </Link>
        </li>
      ))}
    </List>
  );
}
