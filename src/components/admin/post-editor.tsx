"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { MarkdownBody } from "@/components/markdown-body";
import { AdminMdEditor } from "@/components/admin-md-editor";
import { AdminCoverField } from "@/components/admin-cover-field";
import { readingMinutes, slugify } from "@/lib/post-utils";

export type PostData = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  body_markdown: string;
  published: boolean;
  updated_at?: string;
};

const Wrap = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 2rem 1.5rem 5rem;
`;

const Header = styled.div`
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 22px;
  h1 { color: var(--text-primary); font-size: 1.4rem; font-weight: 700; display: flex; align-items: center; gap: 12px; }
`;

const Badge = styled.span<{ $on: boolean }>`
  font-size: 0.7rem; font-weight: 600; padding: 4px 10px; border-radius: 999px; letter-spacing: 0.03em;
  color: ${(p) => (p.$on ? "#4ade80" : "#fbbf24")};
  background: ${(p) => (p.$on ? "rgba(74,222,128,0.1)" : "rgba(251,191,36,0.1)")};
  border: 1px solid ${(p) => (p.$on ? "rgba(74,222,128,0.3)" : "rgba(251,191,36,0.3)")};
`;

const Ghost = styled(Link)`
  padding: 8px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);
  color: var(--text-secondary); text-decoration: none; font-size: 0.85rem;
  &:hover { color: var(--text-primary); border-color: var(--accent-primary); }
`;

const Notice = styled.div<{ $tone: "ok" | "err" | "info" }>`
  display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
  padding: 10px 14px; border-radius: var(--radius-sm); margin-bottom: 16px; font-size: 0.86rem;
  color: ${(p) => (p.$tone === "err" ? "#fca5a5" : p.$tone === "ok" ? "#86efac" : "var(--text-secondary)")};
  background: ${(p) => (p.$tone === "err" ? "rgba(239,68,68,0.1)" : p.$tone === "ok" ? "rgba(74,222,128,0.1)" : "var(--bg-card)")};
  border: 1px solid ${(p) => (p.$tone === "err" ? "rgba(239,68,68,0.35)" : p.$tone === "ok" ? "rgba(74,222,128,0.3)" : "var(--border-color)")};
  button { background: none; border: 1px solid currentColor; color: inherit; border-radius: 6px; padding: 4px 10px; cursor: pointer; font-size: 0.8rem; margin-left: 6px; }
`;

const Field = styled.div`
  margin-bottom: 1.1rem;
  label { display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em; }
  label small { text-transform: none; letter-spacing: 0; font-weight: 400; color: var(--text-muted); }
  input, textarea {
    width: 100%; padding: 10px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);
    background: var(--bg-secondary); color: var(--text-primary); font-size: 0.92rem; font-family: inherit;
  }
  textarea { resize: vertical; min-height: 64px; line-height: 1.5; }
  input:focus, textarea:focus { outline: none; border-color: var(--accent-primary); }
  .hint { font-size: 0.74rem; color: var(--text-muted); margin-top: 5px; }
`;

const Row2 = styled.div`
  display: grid; grid-template-columns: 1.4fr 1fr; gap: 16px;
  @media (max-width: 700px) { grid-template-columns: 1fr; }
`;

const Tabs = styled.div`
  display: flex; border-bottom: 1px solid var(--border-color);
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 10px 18px; border: none; background: none; font-size: 0.85rem; font-weight: 600; cursor: pointer;
  color: ${(p) => (p.$active ? "var(--accent-primary)" : "var(--text-muted)")};
  border-bottom: 2px solid ${(p) => (p.$active ? "var(--accent-primary)" : "transparent")};
  &:hover { color: var(--text-primary); }
`;

const Pane = styled.div`
  border: 1px solid var(--border-color); border-top: none; border-radius: 0 0 var(--radius-md) var(--radius-md);
  background: var(--bg-secondary); overflow: hidden;
`;

const Preview = styled.div`
  padding: 1.75rem; background: var(--bg-card); min-height: 420px; max-height: 640px; overflow: auto;
  h1.title { color: var(--text-primary); font-size: 1.9rem; margin-bottom: 12px; line-height: 1.2; }
`;

const Status = styled.div`
  display: flex; flex-wrap: wrap; gap: 6px 18px; font-size: 0.78rem; color: var(--text-muted); margin-top: 10px;
  b { color: var(--text-secondary); font-weight: 600; }
`;

const Bar = styled.div`
  position: sticky; bottom: 0; z-index: 20; margin-top: 24px; padding: 14px 0;
  display: flex; flex-wrap: wrap; align-items: center; gap: 10px;
  background: linear-gradient(to top, var(--bg-primary) 70%, transparent);
`;

const Btn = styled.button<{ $variant?: "primary" | "ghost" | "danger" }>`
  padding: 11px 20px; border-radius: var(--radius-sm); font-weight: 600; font-size: 0.88rem; cursor: pointer;
  border: 1px solid ${(p) => (p.$variant === "danger" ? "rgba(239,68,68,0.5)" : p.$variant === "primary" ? "transparent" : "var(--border-color)")};
  background: ${(p) => (p.$variant === "primary" ? "var(--accent-gradient)" : "transparent")};
  color: ${(p) => (p.$variant === "primary" ? "var(--bg-primary)" : p.$variant === "danger" ? "#ef4444" : "var(--text-primary)")};
  &:disabled { opacity: 0.55; cursor: not-allowed; }
  &:hover:not(:disabled) { border-color: ${(p) => (p.$variant === "primary" ? "transparent" : "var(--accent-primary)")}; }
`;

const draftKey = (id?: string) => `post-draft:${id ?? "new"}`;

type Notice = { tone: "ok" | "err" | "info"; text: string } | null;

export default function PostEditor({ initial }: { initial?: PostData }) {
  const router = useRouter();
  const isNew = !initial?.id;
  const [id, setId] = useState(initial?.id);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [cover, setCover] = useState(initial?.cover_image_url ?? "");
  const [body, setBody] = useState(initial?.body_markdown ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);
  const [tab, setTab] = useState<"edit" | "split" | "site">("edit");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [draftFound, setDraftFound] = useState<PostData | null>(null);

  const saved = useRef(JSON.stringify({ title, slug, excerpt, cover, body, published }));
  const snapshot = useMemo(() => JSON.stringify({ title, slug, excerpt, cover, body, published }), [title, slug, excerpt, cover, body, published]);
  const dirty = snapshot !== saved.current;

  const token = () => (typeof window !== "undefined" ? sessionStorage.getItem("admin_token") || "" : "");
  const bearer = useCallback(() => `Bearer ${token()}`, []);

  // slug automático enquanto o usuário não mexer nele
  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  // rascunho local (autosave)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey(id));
      if (raw) {
        const d = JSON.parse(raw) as PostData & { at?: number };
        const same = JSON.stringify({ title: d.title, slug: d.slug, excerpt: d.excerpt ?? "", cover: d.cover_image_url ?? "", body: d.body_markdown, published: d.published }) === saved.current;
        if (!same && (d.body_markdown || d.title)) setDraftFound(d);
      }
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(draftKey(id), JSON.stringify({ title, slug, excerpt, cover_image_url: cover, body_markdown: body, published, at: Date.now() }));
      } catch { /* ignore */ }
    }, 800);
    return () => clearTimeout(t);
  }, [dirty, title, slug, excerpt, cover, body, published, id]);

  // aviso ao sair com alterações
  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const { words, minutes } = readingMinutes(body);

  const save = useCallback(
    async (nextPublished?: boolean) => {
      if (!title.trim()) {
        setNotice({ tone: "err", text: "O título é obrigatório." });
        return;
      }
      const pub = nextPublished ?? published;
      setSaving(true);
      setNotice(null);
      try {
        const payload = {
          title: title.trim(),
          slug: slug || undefined,
          excerpt: excerpt.trim() || null,
          cover_image_url: cover.trim() || null,
          body_markdown: body,
          published: pub,
        };
        const r = await fetch(id ? `/api/admin/posts/${id}` : "/api/admin/posts", {
          method: id ? "PATCH" : "POST",
          headers: { Authorization: bearer(), "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (r.status === 401) {
          sessionStorage.removeItem("admin_token");
          router.push("/adminaccess/login");
          return;
        }
        const d = await r.json().catch(() => ({}));
        if (!r.ok) {
          setNotice({ tone: "err", text: [d.error, d.details].filter(Boolean).join(" — ") || "Não foi possível salvar." });
          return;
        }
        const p = d.post as PostData;
        setPublished(Boolean(p.published));
        setSlug(p.slug);
        saved.current = JSON.stringify({ title: p.title, slug: p.slug, excerpt: p.excerpt ?? "", cover: p.cover_image_url ?? "", body: p.body_markdown, published: Boolean(p.published) });
        try { localStorage.removeItem(draftKey(id)); } catch { /* ignore */ }
        setDraftFound(null);
        setNotice({ tone: "ok", text: p.published ? "Salvo e publicado no site." : "Rascunho salvo." });
        if (!id && p.id) {
          setId(p.id);
          router.replace(`/adminaccess/posts/${p.id}`);
        }
      } catch {
        setNotice({ tone: "err", text: "Falha de rede ao salvar. Seu texto está guardado neste navegador." });
      } finally {
        setSaving(false);
      }
    },
    [title, slug, excerpt, cover, body, published, id, bearer, router],
  );

  // Ctrl/Cmd + S
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (!saving) save();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [save, saving]);

  const remove = async () => {
    if (!id || !confirm("Excluir este artigo definitivamente?")) return;
    const r = await fetch(`/api/admin/posts/${id}`, { method: "DELETE", headers: { Authorization: bearer() } });
    if (r.ok) {
      saved.current = snapshot;
      try { localStorage.removeItem(draftKey(id)); } catch { /* ignore */ }
      router.push("/adminaccess/posts");
    } else setNotice({ tone: "err", text: "Não foi possível excluir." });
  };

  const genExcerpt = () => {
    const plain = body
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[#>*_`~-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!plain) return;
    setExcerpt(plain.length > 155 ? `${plain.slice(0, 155).replace(/\s\S*$/, "")}…` : plain);
  };

  const restoreDraft = () => {
    if (!draftFound) return;
    setTitle(draftFound.title);
    setSlug(draftFound.slug);
    setSlugTouched(true);
    setExcerpt(draftFound.excerpt ?? "");
    setCover(draftFound.cover_image_url ?? "");
    setBody(draftFound.body_markdown);
    setPublished(draftFound.published);
    setDraftFound(null);
  };

  const discardDraft = () => {
    try { localStorage.removeItem(draftKey(id)); } catch { /* ignore */ }
    setDraftFound(null);
  };

  return (
    <Wrap>
      <Header>
        <h1>
          {isNew && !id ? "Novo artigo" : "Editar artigo"}
          <Badge $on={published}>{published ? "Publicado" : "Rascunho"}</Badge>
          {dirty && <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 400 }}>• alterações não salvas</span>}
        </h1>
        <div style={{ display: "flex", gap: 8 }}>
          {id && published && (
            <Ghost href={`/blog/${slug}`} target="_blank" rel="noreferrer">Ver no site ↗</Ghost>
          )}
          <Ghost href="/adminaccess/posts">← Artigos</Ghost>
        </div>
      </Header>

      {draftFound && (
        <Notice $tone="info">
          <span>Há um rascunho local mais recente deste artigo neste navegador.</span>
          <span>
            <button onClick={restoreDraft}>Restaurar</button>
            <button onClick={discardDraft}>Descartar</button>
          </span>
        </Notice>
      )}
      {notice && <Notice $tone={notice.tone}><span>{notice.text}</span></Notice>}

      <Row2>
        <Field>
          <label>Título <small>{title.length}/200</small></label>
          <input value={title} maxLength={200} onChange={(e) => setTitle(e.target.value)} placeholder="Título do artigo" />
        </Field>
        <Field>
          <label>Endereço (slug)</label>
          <input
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
            placeholder="gerado-do-titulo"
          />
          <div className="hint">/blog/{slug || "…"}</div>
        </Field>
      </Row2>

      <Field>
        <label>
          Resumo
          <small>
            {excerpt.length}/160 ideal · <a onClick={genExcerpt} style={{ cursor: "pointer", color: "var(--accent-primary)" }}>gerar do texto</a>
          </small>
        </label>
        <textarea value={excerpt} maxLength={400} onChange={(e) => setExcerpt(e.target.value)} placeholder="Uma ou duas frases que aparecem na lista de artigos e nas redes." />
      </Field>

      <AdminCoverField value={cover} onChange={setCover} getAuthHeader={bearer} />

      <div style={{ marginTop: 22 }}>
        <Tabs>
          <Tab type="button" $active={tab === "edit"} onClick={() => setTab("edit")}>Escrever</Tab>
          <Tab type="button" $active={tab === "split"} onClick={() => setTab("split")}>Lado a lado</Tab>
          <Tab type="button" $active={tab === "site"} onClick={() => setTab("site")}>Como no site</Tab>
        </Tabs>
        {tab !== "site" ? (
          <Pane>
            <AdminMdEditor
              value={body}
              onChange={setBody}
              height={tab === "split" ? 560 : 480}
              mode={tab === "split" ? "live" : "edit"}
              getAuthHeader={bearer}
              onError={(m) => setNotice({ tone: "err", text: m })}
            />
          </Pane>
        ) : (
          <Pane>
            <Preview>
              {cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cover} alt="" style={{ width: "100%", borderRadius: 10, marginBottom: 18 }} />
              )}
              <h1 className="title">{title || "Sem título"}</h1>
              {body ? <MarkdownBody markdown={body} /> : <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Nenhum conteúdo ainda.</p>}
            </Preview>
          </Pane>
        )}
        <Status>
          <span><b>{words}</b> palavras</span>
          <span><b>~{minutes} min</b> de leitura</span>
          <span>Atalho: <b>Ctrl/⌘ + S</b> para salvar</span>
          <span>Imagens: cole, arraste ou use o botão ↑ da barra</span>
        </Status>
      </div>

      <Bar>
        <Btn type="button" $variant="primary" disabled={saving} onClick={() => save(true)}>
          {saving ? "Salvando…" : published ? "Atualizar publicação" : "Publicar"}
        </Btn>
        <Btn type="button" disabled={saving} onClick={() => save(published ? true : false)}>
          {published ? "Salvar alterações" : "Salvar rascunho"}
        </Btn>
        {published && (
          <Btn type="button" disabled={saving} onClick={() => save(false)}>Despublicar</Btn>
        )}
        {id && (
          <Btn type="button" $variant="danger" onClick={remove} style={{ marginLeft: "auto" }}>Excluir</Btn>
        )}
      </Bar>
    </Wrap>
  );
}
