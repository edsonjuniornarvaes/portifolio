"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Wrap = styled.div`
  padding: 2rem;
  max-width: 960px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 20px;
`;

const ActionsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 28px;
`;

const Btn = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 10px 18px;
  border-radius: var(--radius-sm);
  background: var(--accent-gradient);
  color: var(--text-primary);
  font-weight: 600;
  text-decoration: none;
`;

const Row = styled.div`
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 16px 18px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  background: var(--bg-card);
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const SmallBtn = styled(Link)`
  font-size: 0.85rem;
  color: var(--accent-primary);
`;

const Danger = styled.button`
  background: transparent;
  border: 1px solid rgba(239, 68, 68, 0.5);
  color: #ef4444;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.8rem;
`;

type Post = {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  updated_at: string;
};

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  const authHeaders = (): HeadersInit => ({
    Authorization: `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("admin_token") || "" : ""}`,
  });

  const load = () => {
    const t = sessionStorage.getItem("admin_token");
    if (!t) {
      router.push("/adminaccess/login");
      return;
    }
    fetch("/api/admin/posts", { headers: authHeaders() })
      .then((r) => {
        if (r.status === 401) {
          sessionStorage.removeItem("admin_token");
          router.push("/adminaccess/login");
          return null;
        }
        return r.json();
      })
      .then((d) => d && setPosts(d.posts || []))
      .catch(() => setPosts([]));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Excluir este post?")) return;
    const r = await fetch(`/api/admin/posts/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (r.ok) load();
  };

  return (
    <Wrap>
      <PageHeader>
        <h1 style={{ fontSize: "1.5rem", color: "var(--text-primary)", margin: 0 }}>Artigos</h1>
        <p style={{ margin: "8px 0 0", fontSize: "0.9rem", color: "var(--text-secondary)", maxWidth: "42rem" }}>
          Gerencie o que aparece em /blog (linha do tempo pública). Rascunhos ficam só no painel até publicar.
        </p>
      </PageHeader>
      <ActionsRow>
        <Btn href="/adminaccess/posts/new">Novo post</Btn>
      </ActionsRow>
      {posts.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>Nenhum post ainda.</p>
      ) : (
        posts.map((p) => (
          <Row key={p.id}>
            <div>
              <strong style={{ color: "var(--text-primary)" }}>{p.title}</strong>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                /{p.slug} · {p.published ? "Publicado" : "Rascunho"}
              </div>
            </div>
            <Actions>
              <SmallBtn href={`/adminaccess/posts/${p.id}`}>Editar</SmallBtn>
              <Danger type="button" onClick={() => remove(p.id)}>
                Excluir
              </Danger>
            </Actions>
          </Row>
        ))
      )}
    </Wrap>
  );
}
