"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";
import { MarkdownBody } from "@/components/markdown-body";

const Wrap = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
`;

const Field = styled.div`
  margin-bottom: 1rem;
  label {
    display: block;
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: 6px;
  }
  input,
  textarea {
    width: 100%;
    padding: 10px 12px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-color);
    background: var(--bg-secondary);
    color: var(--text-primary);
  }
  textarea {
    min-height: 220px;
    font-family: var(--font-mono);
    font-size: 0.9rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Preview = styled.div`
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1rem;
  background: var(--bg-card);
  max-height: 560px;
  overflow: auto;
`;

const Btn = styled.button`
  padding: 10px 20px;
  border-radius: var(--radius-sm);
  border: none;
  background: var(--accent-gradient);
  color: var(--text-primary);
  font-weight: 600;
  cursor: pointer;
  margin-right: 10px;
`;

const Ghost = styled(Link)`
  padding: 10px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  text-decoration: none;
`;

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  body_markdown: string;
  published: boolean;
};

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = String(params?.id || "");
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [cover, setCover] = useState("");
  const [body, setBody] = useState("");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);

  const authHeaders = (): HeadersInit => ({
    Authorization: `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("admin_token") || "" : ""}`,
    "Content-Type": "application/json",
  });

  useEffect(() => {
    if (!id) return;
    const t = sessionStorage.getItem("admin_token");
    if (!t) {
      router.push("/adminaccess/login");
      return;
    }
    fetch(`/api/admin/posts/${id}`, { headers: { Authorization: `Bearer ${t}` } })
      .then((r) => {
        if (r.status === 401) {
          router.push("/adminaccess/login");
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (!d?.post) return;
        const p = d.post as Post;
        setPost(p);
        setTitle(p.title);
        setSlug(p.slug);
        setExcerpt(p.excerpt || "");
        setCover(p.cover_image_url || "");
        setBody(p.body_markdown || "");
        setPublished(p.published);
      });
  }, [id, router]);

  const save = async () => {
    setSaving(true);
    try {
      const r = await fetch(`/api/admin/posts/${id}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
          title,
          slug,
          excerpt: excerpt || null,
          cover_image_url: cover || null,
          body_markdown: body,
          published,
        }),
      });
      if (r.status === 401) {
        router.push("/adminaccess/login");
        return;
      }
      if (!r.ok) {
        const d = await r.json();
        alert(d.error || "Erro");
        return;
      }
      alert("Salvo");
    } finally {
      setSaving(false);
    }
  };

  if (!post) {
    return (
      <Wrap>
        <p style={{ color: "var(--text-muted)" }}>Carregando…</p>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ color: "var(--text-primary)" }}>Editar post</h1>
        <Ghost href="/adminaccess/posts">← Lista de posts</Ghost>
      </div>
      <Grid>
        <div>
          <Field>
            <label>Título</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>
          <Field>
            <label>Slug</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} />
          </Field>
          <Field>
            <label>Resumo</label>
            <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
          </Field>
          <Field>
            <label>URL da capa</label>
            <input value={cover} onChange={(e) => setCover(e.target.value)} />
          </Field>
          <Field>
            <label>
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} /> Publicado
            </label>
          </Field>
          <Field>
            <label>Markdown</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} />
          </Field>
          <Btn type="button" onClick={save} disabled={saving}>
            {saving ? "Salvando…" : "Salvar alterações"}
          </Btn>
        </div>
        <div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 8 }}>Preview</p>
          <Preview>
            {cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cover} alt="" style={{ width: "100%", borderRadius: 8, marginBottom: 12 }} />
            )}
            <MarkdownBody markdown={body} />
          </Preview>
          <p style={{ marginTop: 12, fontSize: "0.85rem" }}>
            <Link href={`/blog/${slug}`} style={{ color: "var(--accent-primary)" }} target="_blank" rel="noreferrer">
              Ver no site (artigo público)
            </Link>
          </p>
        </div>
      </Grid>
    </Wrap>
  );
}
