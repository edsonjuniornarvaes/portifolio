"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";
import type { Feature, Project, ProjectCmsPatch } from "@/app/projects/helper";

const Wrap = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem;
`;

const Top = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 1.5rem;
`;

const Ghost = styled(Link)`
  padding: 10px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.9rem;
`;

const Field = styled.div`
  margin-bottom: 1rem;
  label {
    display: block;
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: 6px;
  }
  input[type="text"],
  textarea {
    width: 100%;
    padding: 10px 12px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-color);
    background: var(--bg-secondary);
    color: var(--text-primary);
    box-sizing: border-box;
  }
  textarea {
    min-height: 100px;
    font-family: var(--font-mono);
    font-size: 0.85rem;
  }
`;

const Check = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  color: var(--text-primary);
  font-size: 0.9rem;
  input {
    width: 18px;
    height: 18px;
  }
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

const FeatureRow = styled.div`
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 8px;
  margin-bottom: 10px;
  align-items: start;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureInputs = styled.div`
  display: grid;
  gap: 8px;
`;

const RemoveBtn = styled.button`
  background: transparent;
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #ef4444;
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.8rem;
`;

const Msg = styled.p<{ $err?: boolean }>`
  color: ${(p) => (p.$err ? "#ef4444" : "var(--accent-primary)")};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = decodeURIComponent(String(params?.id || ""));

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [showPreview, setShowPreview] = useState(true);
  const [showApple, setShowApple] = useState(true);
  const [showPlay, setShowPlay] = useState(true);
  const [appleUrl, setAppleUrl] = useState("");
  const [playUrl, setPlayUrl] = useState("");
  const [showHighlights, setShowHighlights] = useState(true);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryText, setGalleryText] = useState("");
  const [ctaLabel, setCtaLabel] = useState("Confira");
  const [features, setFeatures] = useState<Feature[]>([]);

  const authHeaders = (): HeadersInit => ({
    Authorization: `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("admin_token") || "" : ""}`,
  });

  useEffect(() => {
    const t = sessionStorage.getItem("admin_token");
    if (!t) {
      router.push("/adminaccess/login");
      return;
    }
    if (!id) return;

    (async () => {
      setLoading(true);
      const res = await fetch(`/api/admin/projects/${encodeURIComponent(id)}`, { headers: authHeaders() });
      if (res.status === 401) {
        sessionStorage.removeItem("admin_token");
        router.push("/adminaccess/login");
        return;
      }
      if (!res.ok) {
        setLoadError(res.status === 404 ? "Projeto não existe no código." : "Não foi possível carregar.");
        setLoading(false);
        return;
      }
      setLoadError("");
      const j = await res.json();
      const m = j.merged as Project;
      setShowPreview(m.showPreview !== false);
      setShowApple(m.showMockupApple !== false);
      setShowPlay(m.showMockupPlay !== false);
      setAppleUrl(m.mockupAppleUrl || "");
      setPlayUrl(m.mockupPlayUrl || "");
      setShowHighlights(m.showHighlights !== false);
      setShowGallery(m.showGallery === true);
      setGalleryText((m.galleryImages || []).join("\n"));
      setCtaLabel(m.liveCtaLabel || "Confira");
      setFeatures(Array.isArray(m.features) ? [...m.features] : []);
      setLoading(false);
    })();
  }, [id, router]);

  const addFeature = () => {
    setFeatures((f) => [...f, { icon: "✨", title: "", description: "" }]);
  };

  const removeFeature = (index: number) => {
    setFeatures((f) => f.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, patch: Partial<Feature>) => {
    setFeatures((f) => f.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  };

  const save = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    const galleryImages = galleryText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const patch: ProjectCmsPatch = {
      showPreview,
      showMockupApple: showApple,
      showMockupPlay: showPlay,
      mockupAppleUrl: appleUrl.trim() || undefined,
      mockupPlayUrl: playUrl.trim() || undefined,
      showHighlights,
      showGallery,
      galleryImages,
      liveCtaLabel: ctaLabel.trim() || undefined,
      features: features.map((f) => ({
        icon: f.icon.trim() || "•",
        title: f.title.trim(),
        description: f.description.trim(),
      })).filter((f) => f.title || f.description),
    };

    try {
      const res = await fetch(`/api/admin/projects/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ patch }),
      });
      if (res.status === 401) {
        sessionStorage.removeItem("admin_token");
        router.push("/adminaccess/login");
        return;
      }
      if (!res.ok) {
        const jr = await res.json().catch(() => ({}));
        setError(jr.error || "Erro ao salvar.");
        setSaving(false);
        return;
      }
      setMessage("Salvo. A página pública atualiza na próxima visita.");
    } catch {
      setError("Erro de rede.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Wrap>
        <p style={{ color: "var(--text-secondary)" }}>Carregando…</p>
      </Wrap>
    );
  }

  if (loadError) {
    return (
      <Wrap>
        <Top>
          <Ghost href="/adminaccess/projects">← Lista de projetos</Ghost>
        </Top>
        <p style={{ color: "#ef4444" }}>{loadError}</p>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Top>
        <Ghost href="/adminaccess/projects">← Lista de projetos</Ghost>
      </Top>

      <h1 style={{ color: "var(--text-primary)", marginBottom: 8 }}>Editar projeto</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: 24, fontSize: "0.9rem" }}>
        <code style={{ color: "var(--accent-primary)" }}>{id}</code> — mockups use URLs públicas (ex.: imagens no
        `/public` ou link direto).
      </p>

      {error ? <Msg $err>{error}</Msg> : null}
      {message ? <Msg>{message}</Msg> : null}

      <Check>
        <input type="checkbox" checked={showPreview} onChange={(e) => setShowPreview(e.target.checked)} />
        Mostrar seção Preview (mockups App Store / Play)
      </Check>
      {showPreview && (
        <>
          <Check>
            <input type="checkbox" checked={showApple} onChange={(e) => setShowApple(e.target.checked)} />
            Mostrar mockup App Store
          </Check>
          <Check>
            <input type="checkbox" checked={showPlay} onChange={(e) => setShowPlay(e.target.checked)} />
            Mostrar mockup Google Play
          </Check>
          <Field>
            <label>URL imagem mockup Apple (fundo do “telefone”)</label>
            <input type="text" value={appleUrl} onChange={(e) => setAppleUrl(e.target.value)} placeholder="/images/..." />
          </Field>
          <Field>
            <label>URL imagem mockup Google Play</label>
            <input type="text" value={playUrl} onChange={(e) => setPlayUrl(e.target.value)} placeholder="/images/..." />
          </Field>
        </>
      )}

      <Check>
        <input type="checkbox" checked={showHighlights} onChange={(e) => setShowHighlights(e.target.checked)} />
        Mostrar seção Destaques
      </Check>

      <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: 8 }}>Itens de destaque</p>
      {features.map((f, i) => (
        <FeatureRow key={i}>
          <Field style={{ marginBottom: 0 }}>
            <label>Ícone</label>
            <input
              type="text"
              value={f.icon}
              onChange={(e) => updateFeature(i, { icon: e.target.value })}
              placeholder="📅"
            />
          </Field>
          <FeatureInputs>
            <Field style={{ marginBottom: 0 }}>
              <label>Título</label>
              <input type="text" value={f.title} onChange={(e) => updateFeature(i, { title: e.target.value })} />
            </Field>
            <Field style={{ marginBottom: 0 }}>
              <label>Descrição</label>
              <input
                type="text"
                value={f.description}
                onChange={(e) => updateFeature(i, { description: e.target.value })}
              />
            </Field>
            <RemoveBtn type="button" onClick={() => removeFeature(i)}>
              Remover item
            </RemoveBtn>
          </FeatureInputs>
        </FeatureRow>
      ))}
      <button
        type="button"
        onClick={addFeature}
        style={{
          marginBottom: "1.25rem",
          padding: "8px 14px",
          borderRadius: 8,
          border: "1px solid var(--border-color)",
          background: "var(--bg-card)",
          color: "var(--text-primary)",
          cursor: "pointer",
        }}
      >
        + Adicionar destaque
      </button>

      <Check>
        <input type="checkbox" checked={showGallery} onChange={(e) => setShowGallery(e.target.checked)} />
        Mostrar galeria (carrossel abaixo do Preview)
      </Check>
      <Field>
        <label>URLs das imagens da galeria (uma por linha)</label>
        <textarea
          value={galleryText}
          onChange={(e) => setGalleryText(e.target.value)}
          placeholder={"https://...\n/images/screenshot2.png"}
        />
      </Field>

      <Field>
        <label>Texto do botão do link principal (ex.: Confira)</label>
        <input type="text" value={ctaLabel} onChange={(e) => setCtaLabel(e.target.value)} />
      </Field>

      <Btn type="button" onClick={save} disabled={saving}>
        {saving ? "Salvando…" : "Salvar"}
      </Btn>
    </Wrap>
  );
}
