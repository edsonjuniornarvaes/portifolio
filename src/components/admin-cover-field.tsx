"use client";

import { useRef, useState } from "react";
import styled from "styled-components";

const Row = styled.div`
  margin-bottom: 1rem;
  label.primary {
    display: block;
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const FileBtn = styled.button`
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 0.85rem;
  cursor: pointer;
  &:hover:not(:disabled) {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ThumbWrap = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 8px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid var(--border-color);
  max-width: 220px;

  img {
    display: block;
    width: 100%;
    height: auto;
    max-height: 120px;
    object-fit: cover;
  }
`;

const RemoveThumb = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  border: none;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  &:hover {
    background: rgba(239, 68, 68, 0.9);
  }
`;

const UrlInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.85rem;
  margin-top: 6px;
`;

const Hint = styled.p`
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: 6px 0 0;
`;

type Props = {
  value: string;
  onChange: (url: string) => void;
  getAuthHeader: () => string;
};

export function AdminCoverField({ value, onChange, getAuthHeader }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  const upload = async (file: File) => {
    setErr("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await fetch("/api/admin/upload-cover", {
        method: "POST",
        headers: { Authorization: getAuthHeader() },
        body: fd,
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        setErr(j.error || "Upload falhou");
        return;
      }
      if (j.url) onChange(j.url);
    } catch {
      setErr("Erro de rede");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <Row>
      <label className="primary">Capa</label>
      <Actions>
        <FileBtn type="button" disabled={uploading} onClick={() => inputRef.current?.click()}>
          {uploading ? "Enviando…" : "Enviar imagem"}
        </FileBtn>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          style={{ display: "none" }}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
          }}
        />
      </Actions>
      {err ? (
        <p style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: 8 }}>{err}</p>
      ) : null}
      {value ? (
        <ThumbWrap>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" />
          <RemoveThumb type="button" onClick={() => onChange("")} aria-label="Remover capa">
            ×
          </RemoveThumb>
        </ThumbWrap>
      ) : null}
      <label className="primary" style={{ marginTop: 14 }}>
        Ou URL da imagem (opcional)
      </label>
      <UrlInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://… ou /images/…"
      />
      <Hint>JPEG, PNG, WebP ou GIF · até 5 MB no upload. Bucket público `blog-covers` no Supabase.</Hint>
    </Row>
  );
}
