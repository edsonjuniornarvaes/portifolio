"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { MarkdownBody } from "@/components/markdown-body";
import { AdminMdEditor } from "@/components/admin-md-editor";
import { AdminCoverField } from "@/components/admin-cover-field";

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
    font-family: var(--font-display);
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
  max-height: 520px;
  overflow: auto;
`;

const BtnRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 1rem;
`;

const Btn = styled.button`
  padding: 10px 20px;
  border-radius: var(--radius-sm);
  border: none;
  background: var(--accent-gradient);
  color: var(--text-primary);
  font-weight: 600;
  cursor: pointer;
`;

const Ghost = styled(Link)`
  padding: 10px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  text-decoration: none;
  align-self: center;
`;

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [cover, setCover] = useState("");
  const [body, setBody] = useState("# Título\n\nConteúdo do artigo.");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);

  const authHeaders = (): HeadersInit => ({
    Authorization: `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("admin_token") || "" : ""}`,
    "Content-Type": "application/json",
  });

  const authBearer = () =>
    `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("admin_token") || "" : ""}`;

  const save = async () => {
    if (!title.trim()) return;
    setSaving(true);
    try {
      const r = await fetch("/api/admin/posts", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          title,
          slug: slug || undefined,
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
      const d = await r.json().catch(() => ({}));
      if (!r.ok) {
        const parts = [d.error, d.details, d.code ? `código: ${d.code}` : ""].filter(Boolean);
        alert(parts.join("\n\n") || "Erro ao criar post");
        return;
      }
      router.push(`/adminaccess/posts/${d.post.id}`);
    } catch {
      alert("Falha de rede ao salvar. Tente de novo.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Wrap>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ color: "var(--text-primary)" }}>Novo post</h1>
        <Ghost href="/adminaccess/posts">← Lista de posts</Ghost>
      </div>
      <Grid>
        <div>
          <Field>
            <label>Título</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>
          <Field>
            <label>Slug (opcional)</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="gerado-do-titulo" />
          </Field>
          <Field>
            <label>Resumo</label>
            <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
          </Field>
          <AdminCoverField value={cover} onChange={setCover} getAuthHeader={authBearer} />
          <Field>
            <label>
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />{" "}
              Publicado
            </label>
          </Field>
          <Field>
            <label>Conteúdo</label>
            <AdminMdEditor value={body} onChange={setBody} height={440} />
          </Field>
          <BtnRow>
            <Btn type="button" onClick={save} disabled={saving}>
              {saving ? "Salvando…" : "Criar post"}
            </Btn>
          </BtnRow>
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
        </div>
      </Grid>
    </Wrap>
  );
}
