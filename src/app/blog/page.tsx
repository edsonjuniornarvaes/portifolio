"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import * as R from "../home/retro";

type Post = { id: string; slug: string; title: string; excerpt: string | null; cover_image_url: string | null; created_at: string };

const Wrap = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: 56px 0 0;
  h1 { font-family: var(--font-condensed); font-weight: 400; text-transform: uppercase; font-size: clamp(3rem, 9vw, 6rem); line-height: 0.95; letter-spacing: 0.01em; }
  .lead { color: var(--muted); margin-top: 12px; max-width: 34rem; line-height: 1.7; }
  .search { margin: 32px 0 8px; display: block; width: 100%; padding: 12px 14px; border: 2px solid var(--line); border-radius: 0; background: transparent; color: var(--ink); font: inherit; font-family: var(--font-mono); font-size: 0.88rem; }
  .search:focus { outline: none; border-color: var(--accent-ink); }
  .year { font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-ink); margin: 34px 0 6px; }
  .year::before { content: "// "; color: var(--muted); }
  .thumb { width: 72px; height: 48px; object-fit: cover; border: 1px solid var(--line); }
  a.row { display: grid; grid-template-columns: 72px minmax(0, 1fr) auto; gap: 4px 18px; align-items: center; padding: 16px 0; }
  a.row.nothumb { grid-template-columns: minmax(0, 1fr) auto; }
  @media (max-width: 560px) { a.row { grid-template-columns: 56px minmax(0, 1fr); } a.row.nothumb { grid-template-columns: 1fr; } time { grid-column: 2; } }
  a.row:hover h2 { color: var(--accent-ink); }
  h2 { font-size: 1.12rem; font-weight: 600; letter-spacing: -0.02em; transition: color 0.2s ease; }
  .ex { color: var(--muted); font-size: 0.9rem; line-height: 1.5; margin-top: 3px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  time { font-family: var(--font-mono); font-size: 0.74rem; color: var(--muted); white-space: nowrap; }
  li { border-top: 1px solid var(--line); list-style: none; }
  .empty { margin-top: 32px; padding: 22px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); color: var(--muted); }
`;

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((d) => setPosts(d.posts || []))
      .catch(() => setPosts([]));
  }, []);

  const groups = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = (posts || []).filter((p) => !term || p.title.toLowerCase().includes(term) || (p.excerpt || "").toLowerCase().includes(term));
    const map = new Map<string, Post[]>();
    list.forEach((p) => {
      const y = String(new Date(p.created_at).getFullYear());
      map.set(y, [...(map.get(y) || []), p]);
    });
    return Array.from(map.entries());
  }, [posts, q]);

  return (
    <R.Section as="div" style={{ marginTop: 0 }}>
      <Wrap>
        <R.Heading style={{ marginBottom: 0 }}>
          <span className="tag">05 blog</span>
        </R.Heading>
        <h1>Escrita</h1>
        <p className="lead">Artigos sobre mobile, arquitetura, autenticação, pagamentos e o que aprendo no dia a dia.</p>

        {posts === null ? (
          <p className="empty">Carregando…</p>
        ) : posts.length === 0 ? (
          <p className="empty">Em breve, os primeiros textos por aqui.</p>
        ) : (
          <>
            <input className="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="buscar artigos…" aria-label="Buscar artigos" />
            {groups.length === 0 && <p className="empty">Nada encontrado.</p>}
            {groups.map(([year, items]) => (
              <section key={year}>
                <p className="year">{year}</p>
                <ul>
                  {items.map((p) => (
                    <li key={p.id}>
                      <Link className={`row${p.cover_image_url ? "" : " nothumb"}`} href={`/blog/${p.slug}`}>
                        {p.cover_image_url && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img className="thumb" src={p.cover_image_url} alt="" />
                        )}
                        <div>
                          <h2>{p.title}</h2>
                          {p.excerpt && <p className="ex">{p.excerpt}</p>}
                        </div>
                        <time>{new Date(p.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</time>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </>
        )}
      </Wrap>
    </R.Section>
  );
}
