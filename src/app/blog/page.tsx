"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Lead, Page, PageTitle, Wrap } from "@/components/ui/layout";
import { useLang } from "@/i18n/provider";
import { LOCALE } from "@/i18n/config";
import { Sk } from "@/components/ui/skeleton";

type Post = { id: string; slug: string; title: string; excerpt: string | null; cover_image_url: string | null; created_at: string };

const List = styled.div`
  .sbox { position: relative; margin: 36px 0 4px; max-width: 460px; }
  .sbox svg { position: absolute; left: 16px; top: 50%; width: 18px; height: 18px; transform: translateY(-50%); color: var(--muted); pointer-events: none; transition: color 0.2s ease; }
  .search { display: block; width: 100%; height: 50px; padding: 0 44px 0 46px; border: 1px solid var(--line); border-radius: 99px; background: color-mix(in srgb, var(--card) 70%, transparent); color: var(--ink); font: inherit; font-size: 0.98rem; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
  .search::placeholder { color: var(--muted); }
  .search:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 14%, transparent); }
  .search::-webkit-search-cancel-button { display: none; }
  .sbox:focus-within svg { color: var(--accent-ink); }
  .clear { position: absolute; right: 8px; top: 50%; width: 34px; height: 34px; transform: translateY(-50%); display: grid; place-items: center; border: 0; border-radius: 50%; background: none; color: var(--muted); cursor: pointer; font-size: 1.1rem; }
  .clear:hover { color: var(--ink); background: color-mix(in srgb, var(--ink) 8%, transparent); }
  .count { margin: 12px 4px 0; font-family: var(--font-mono); font-size: 0.78rem; color: var(--muted); }
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
            <div aria-busy="true" aria-label={t.blogPage.loading} style={{ marginTop: 0, display: "grid", gap: 0 }}>
              <Sk $w="min(460px, 100%)" $h="50px" $r="99px" style={{ marginBottom: 40 }} />
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} style={{ display: "grid", gap: 12, padding: "26px 0", borderTop: "1px solid var(--line)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "center" }}>
                    <Sk $w={`${52 + ((i * 17) % 34)}%`} $h="clamp(1.5rem, 3vw, 2.1rem)" />
                    <Sk $w="54px" $h="0.8em" />
                  </div>
                  <Sk $w={`${70 + ((i * 7) % 24)}%`} $h="0.95em" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="empty">{t.blogPage.empty}</p>
          ) : (
            <>
              <div className="sbox">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                <input className="search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.blogPage.search} aria-label={t.blogPage.searchAria} />
                {q && <button type="button" className="clear" onClick={() => setQ("")} aria-label="Limpar busca">×</button>}
              </div>
              {q && <p className="count" aria-live="polite">{groups.reduce((n, [, i]) => n + i.length, 0)} / {posts.length}</p>}
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
