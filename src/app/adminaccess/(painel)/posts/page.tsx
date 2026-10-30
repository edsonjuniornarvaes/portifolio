"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Wrap = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
`;

const Top = styled.div`
  display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 14px; margin-bottom: 22px;
  h1 { font-size: 1.5rem; color: var(--text-primary); margin: 0; }
  p { margin: 6px 0 0; font-size: 0.88rem; color: var(--text-secondary); max-width: 38rem; }
`;

const NewBtn = styled(Link)`
  padding: 11px 20px; border-radius: var(--radius-sm); background: var(--accent-gradient); color: var(--bg-primary);
  font-weight: 700; font-size: 0.88rem; text-decoration: none;
`;

const Tools = styled.div`
  display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px;
  input { flex: 1; min-width: 200px; padding: 10px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); background: var(--bg-secondary); color: var(--text-primary); font-size: 0.9rem; }
  input:focus { outline: none; border-color: var(--accent-primary); }
`;

const Chip = styled.button<{ $on: boolean }>`
  padding: 8px 14px; border-radius: 999px; font-size: 0.82rem; cursor: pointer;
  border: 1px solid ${(p) => (p.$on ? "transparent" : "var(--border-color)")};
  background: ${(p) => (p.$on ? "var(--accent-gradient)" : "transparent")};
  color: ${(p) => (p.$on ? "var(--bg-primary)" : "var(--text-secondary)")};
  font-weight: ${(p) => (p.$on ? 700 : 500)};
`;

const Item = styled.div`
  display: grid; grid-template-columns: 64px minmax(0, 1fr) auto; gap: 14px; align-items: center;
  padding: 12px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-card); margin-bottom: 10px;
  @media (max-width: 680px) { grid-template-columns: 56px minmax(0, 1fr); .acts { grid-column: 1 / -1; } }
  .thumb { width: 64px; height: 44px; border-radius: 8px; overflow: hidden; background: var(--bg-secondary); border: 1px solid var(--border-color); }
  .thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
  strong { color: var(--text-primary); font-size: 0.98rem; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .meta { font-size: 0.78rem; color: var(--text-muted); margin-top: 3px; display: flex; flex-wrap: wrap; gap: 4px 12px; }
  .acts { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; }
`;

const Pill = styled.span<{ $on: boolean }>`
  color: ${(p) => (p.$on ? "#4ade80" : "#fbbf24")};
`;

const small = `padding: 7px 12px; border-radius: var(--radius-sm); font-size: 0.8rem; cursor: pointer; text-decoration: none; background: transparent;`;

const Act = styled(Link)`
  ${small} border: 1px solid var(--border-color); color: var(--text-primary);
  &:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
`;

const ActBtn = styled.button<{ $danger?: boolean }>`
  ${small}
  border: 1px solid ${(p) => (p.$danger ? "rgba(239,68,68,0.5)" : "var(--border-color)")};
  color: ${(p) => (p.$danger ? "#ef4444" : "var(--text-primary)")};
  &:hover { border-color: ${(p) => (p.$danger ? "#ef4444" : "var(--accent-primary)")}; }
`;

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  body_markdown?: string;
  published: boolean;
  updated_at: string;
};

type Filter = "all" | "published" | "draft";

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [error, setError] = useState("");

  const token = () => (typeof window !== "undefined" ? sessionStorage.getItem("admin_token") || "" : "");
  const headers = (): HeadersInit => ({ Authorization: `Bearer ${token()}`, "Content-Type": "application/json" });

  const load = () => {
    if (!token()) {
      router.push("/adminaccess/login");
      return;
    }
    fetch("/api/admin/posts", { headers: headers() })
      .then((r) => {
        if (r.status === 401) {
          sessionStorage.removeItem("admin_token");
          router.push("/adminaccess/login");
          return null;
        }
        return r.json();
      })
      .then((d) => d && setPosts(d.posts || []))
      .catch(() => {
        setPosts([]);
        setError("Não foi possível carregar os artigos.");
      });
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = async (p: Post) => {
    const r = await fetch(`/api/admin/posts/${p.id}`, { method: "PATCH", headers: headers(), body: JSON.stringify({ published: !p.published }) });
    if (r.ok) load();
    else setError("Não foi possível alterar a publicação.");
  };

  const remove = async (p: Post) => {
    if (!confirm(`Excluir "${p.title}" definitivamente?`)) return;
    const r = await fetch(`/api/admin/posts/${p.id}`, { method: "DELETE", headers: headers() });
    if (r.ok) load();
    else setError("Não foi possível excluir.");
  };

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (posts || []).filter((p) => {
      if (filter === "published" && !p.published) return false;
      if (filter === "draft" && p.published) return false;
      return !term || p.title.toLowerCase().includes(term) || p.slug.includes(term);
    });
  }, [posts, q, filter]);

  const nPub = (posts || []).filter((p) => p.published).length;
  const nDraft = (posts || []).length - nPub;

  return (
    <Wrap>
      <Top>
        <div>
          <h1>Artigos</h1>
          <p>O que aparece em /blog. Rascunhos ficam só no painel até você publicar.</p>
        </div>
        <NewBtn href="/adminaccess/posts/new">+ Novo artigo</NewBtn>
      </Top>

      <Tools>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por título ou endereço…" />
        <Chip $on={filter === "all"} onClick={() => setFilter("all")}>Todos ({(posts || []).length})</Chip>
        <Chip $on={filter === "published"} onClick={() => setFilter("published")}>Publicados ({nPub})</Chip>
        <Chip $on={filter === "draft"} onClick={() => setFilter("draft")}>Rascunhos ({nDraft})</Chip>
      </Tools>

      {error && <p style={{ color: "#fca5a5", marginBottom: 12 }}>{error}</p>}

      {posts === null ? (
        <p style={{ color: "var(--text-muted)" }}>Carregando…</p>
      ) : list.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>{(posts || []).length === 0 ? "Nenhum artigo ainda. Escreva o primeiro!" : "Nada encontrado com esse filtro."}</p>
      ) : (
        list.map((p) => (
          <Item key={p.id}>
            <div className="thumb">
              {p.cover_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.cover_image_url} alt="" />
              ) : null}
            </div>
            <div style={{ minWidth: 0 }}>
              <strong>{p.title}</strong>
              <div className="meta">
                <Pill $on={p.published}>{p.published ? "● Publicado" : "● Rascunho"}</Pill>
                <span>/{p.slug}</span>
                <span>Atualizado em {new Date(p.updated_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}</span>
              </div>
            </div>
            <div className="acts">
              <Act href={`/adminaccess/posts/${p.id}`}>Editar</Act>
              {p.published && (
                <Act href={`/blog/${p.slug}`} target="_blank" rel="noreferrer">Ver ↗</Act>
              )}
              <ActBtn type="button" onClick={() => toggle(p)}>{p.published ? "Despublicar" : "Publicar"}</ActBtn>
              <ActBtn type="button" $danger onClick={() => remove(p)}>Excluir</ActBtn>
            </div>
          </Item>
        ))
      )}
    </Wrap>
  );
}
