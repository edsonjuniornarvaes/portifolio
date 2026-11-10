"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Lead, Page, PageTitle, Wrap } from "@/components/ui/layout";
import { useLang } from "@/i18n/provider";
import { LOCALE } from "@/i18n/config";

type Post = { id: string; slug: string; title: string; excerpt: string | null; cover_image_url: string | null; created_at: string };

const List = styled.div`
  .search { margin: 40px 0 6px; display: block; width: 100%; max-width: 420px; padding: 12px 2px; border: 0; border-bottom: 1px solid var(--line); background: transparent; color: var(--ink); font: inherit; font-size: 1rem; }
  .search:focus { outline: none; border-color: var(--accent); }
  .year { font-family: var(--font-mono); font-size: 0.76rem; color: var(--accent-ink); margin: 40px 0 10px; }
  ul { list-style: none; border-top: 1px solid var(--line); }
  li { border-bottom: 1px solid var(--line); }
  a.row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 6px 28px; align-items: baseline; padding: 24px 0; transition: padding 0.3s cubic-bezier(.2,.7,.2,1); }
  a.row:hover { padding-left: 12px; }
  @media (max-width: 700px) { a.row:hover { padding-left: 0; } }
  h2 { font-family: var(--font-serif); font-weight: 400; font-size: clamp(1.5rem, 3vw, 2.2rem); line-height: 1.12; transition: color 0.2s ease; }
  a.row:hover h2 { color: var(--accent-ink); }
  .ex { grid-column: 1 / -1; max-width: 46rem; color: var(--muted); font-size: 0.95rem; line-height: 1.55; }
  time { font-family: var(--font-mono); font-size: 0.74rem; color: var(--muted); white-space: nowrap; }
  .empty { margin-top: 32px; color: var(--muted); }
`;

export default function BlogPage() {
  const { lang, t } = useLang();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch(`/api/posts?lang=${lang}`)
      .then((r) => r.json())
      .then((d) => setPosts(d.posts || []))
      .catch(() => setPosts([]));
  }, [lang]);

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
    <Wrap>
      <Page>
        <PageTitle>{t.blogPage.title}</PageTitle>
        <Lead>{t.blogPage.lead}</Lead>
        <List>
          {posts === null ? (
            <p className="empty">{t.blogPage.loading}</p>
          ) : posts.length === 0 ? (
            <p className="empty">{t.blogPage.empty}</p>
          ) : (
            <>
              <input className="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.blogPage.search} aria-label={t.blogPage.searchAria} />
              {groups.length === 0 && <p className="empty">{t.blogPage.none}</p>}
              {groups.map(([year, items]) => (
                <section key={year}>
                  <p className="year">{year}</p>
                  <ul>
                    {items.map((p) => (
                      <li key={p.id}>
                        <Link className="row" href={`/blog/${p.slug}`}>
                          <h2>{p.title}</h2>
                          <time>{new Date(p.created_at).toLocaleDateString(LOCALE[lang], { day: "2-digit", month: "short" })}</time>
                          {p.excerpt && <p className="ex">{p.excerpt}</p>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </>
          )}
        </List>
      </Page>
    </Wrap>
  );
}
