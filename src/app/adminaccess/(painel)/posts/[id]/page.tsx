"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";
import { MarkdownBody } from "@/components/markdown-body";
import { AdminMdEditor } from "@/components/admin-md-editor";
import { AdminCoverField } from "@/components/admin-cover-field";

const Wrap = styled.div`
  max-width: 780px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 28px;

  h1 {
    color: var(--text-primary);
    font-size: 1.35rem;
    font-weight: 700;
  }
`;

const BackLink = styled(Link)`
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.85rem;
  &:hover {
    color: var(--text-primary);
    border-color: var(--accent-primary);
  }
`;

const Field = styled.div`
  margin-bottom: 1.25rem;

  label {
    display: block;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-secondary);
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  input {
    width: 100%;
    padding: 10px 12px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-color);
    background: var(--bg-secondary);
    color: var(--text-primary);
    font-size: 0.9rem;
    font-family: inherit;
  }
`;

const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  cursor: pointer;
  margin-bottom: 1.25rem;

  input[type="checkbox"] {
    accent-color: #2eebaa;
    width: 16px;
    height: 16px;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border-color);
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  border: none;
  background: none;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  color: ${(p) => (p.$active ? "var(--accent-primary)" : "var(--text-muted)")};
  border-bottom: 2px solid ${(p) => (p.$active ? "var(--accent-primary)" : "transparent")};
  transition: color 0.2s, border-color 0.2s;
  &:hover {
    color: var(--text-primary);
  }
`;

const EditorPane = styled.div`
  border: 1px solid var(--border-color);
  border-top: none;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  overflow: hidden;
  background: var(--bg-secondary);
`;

const PreviewPane = styled.div`
  border: 1px solid var(--border-color);
  border-top: none;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  padding: 1.5rem;
  background: var(--bg-card);
  min-height: 320px;
  max-height: 560px;
  overflow: auto;
`;

const BtnRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 1.5rem;
`;

const Btn = styled.button`
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  border: none;
  background: var(--accent-gradient);
  color: var(--bg-primary);
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PublicLink = styled(Link)`
  font-size: 0.85rem;
  color: var(--accent-primary);
  margin-left: auto;
  &:hover {
    text-decoration: underline;
  }
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
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  const authHeaders = (): HeadersInit => ({
    Authorization: `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("admin_token") || "" : ""}`,
    "Content-Type": "application/json",
  });

  const authBearer = () =>
    `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("admin_token") || "" : ""}`;

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
      const d = await r.json().catch(() => ({}));
      if (!r.ok) {
        alert(d.error || "Erro ao salvar");
        return;
      }
      alert("Salvo com sucesso!");
    } catch {
      alert("Falha de rede ao salvar. Tente de novo.");
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
      <Header>
        <h1>Editar artigo</h1>
        <BackLink href="/adminaccess/posts">← Artigos</BackLink>
      </Header>

      <Row2>
        <Field>
          <label>Título</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>
        <Field>
          <label>Slug</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} />
        </Field>
      </Row2>

      <Field>
        <label>Resumo</label>
        <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      </Field>

      <AdminCoverField value={cover} onChange={setCover} getAuthHeader={authBearer} />

      <CheckboxLabel>
        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
        Publicado
      </CheckboxLabel>

      <Tabs>
        <Tab type="button" $active={tab === "edit"} onClick={() => setTab("edit")}>
          Escrever
        </Tab>
        <Tab type="button" $active={tab === "preview"} onClick={() => setTab("preview")}>
          Preview
        </Tab>
      </Tabs>

      {tab === "edit" ? (
        <EditorPane>
          <AdminMdEditor value={body} onChange={setBody} height={420} />
        </EditorPane>
      ) : (
        <PreviewPane>
          {cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt="" style={{ width: "100%", borderRadius: 8, marginBottom: 16 }} />
          )}
          {body ? (
            <MarkdownBody markdown={body} />
          ) : (
            <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Nenhum conteúdo ainda.</p>
          )}
        </PreviewPane>
      )}

      <BtnRow>
        <Btn type="button" onClick={save} disabled={saving}>
          {saving ? "Salvando…" : "Salvar alterações"}
        </Btn>
        <PublicLink href={`/blog/${slug}`} target="_blank" rel="noreferrer">
          Ver no site ↗
        </PublicLink>
      </BtnRow>
    </Wrap>
  );
}
