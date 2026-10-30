"use client";

import { useRef } from "react";
import MDEditor, { commands, type ICommand } from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  height: number;
  preview: "edit" | "live";
  getAuthHeader: () => string;
  onError: (msg: string) => void;
};

async function uploadImage(file: File, auth: string): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const r = await fetch("/api/admin/upload-cover", { method: "POST", headers: { Authorization: auth }, body: fd });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.url) throw new Error(j.error || "Falha no upload da imagem");
  return j.url as string;
}

const icon = (d: string) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export default function MdEditorInner({ value, onChange, height, preview, getAuthHeader, onError }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const pending = useRef<((url: string) => void) | null>(null);

  const insertAtCursor = (el: HTMLTextAreaElement, text: string) => {
    const start = el.selectionStart ?? value.length;
    const end = el.selectionEnd ?? value.length;
    onChange(value.slice(0, start) + text + value.slice(end));
  };

  const handleFiles = async (files: FileList | File[], el: HTMLTextAreaElement | null, via?: (url: string) => void) => {
    const imgs = Array.from(files).filter((f) => f.type.startsWith("image/"));
    for (const f of imgs) {
      try {
        const url = await uploadImage(f, getAuthHeader());
        const md = `\n![${f.name.replace(/\.[^.]+$/, "")}](${url})\n`;
        if (via) via(md);
        else if (el) insertAtCursor(el, md);
      } catch (e) {
        onError(e instanceof Error ? e.message : "Falha no upload");
      }
    }
  };

  const uploadCmd: ICommand = {
    name: "upload-image",
    keyCommand: "upload-image",
    buttonProps: { "aria-label": "Enviar imagem", title: "Enviar imagem para o artigo" },
    icon: icon("M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"),
    execute: (_state, api) => {
      pending.current = (md) => api.replaceSelection(md);
      fileRef.current?.click();
    },
  };

  const calloutCmd: ICommand = {
    name: "callout",
    keyCommand: "callout",
    buttonProps: { "aria-label": "Destaque", title: "Bloco de destaque" },
    icon: icon("M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"),
    execute: (state, api) => {
      const sel = state.selectedText || "Texto do destaque";
      api.replaceSelection(`\n> **Nota:** ${sel}\n`);
    },
  };

  const codeBlockCmd: ICommand = {
    name: "code-lang",
    keyCommand: "code-lang",
    buttonProps: { "aria-label": "Bloco de código TypeScript", title: "Bloco de código (TypeScript)" },
    icon: icon("M16 18l6-6-6-6M8 6l-6 6 6 6"),
    execute: (state, api) => {
      const sel = state.selectedText || "// seu código aqui";
      api.replaceSelection(`\n\`\`\`ts\n${sel}\n\`\`\`\n`);
    },
  };

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        style={{ display: "none" }}
        onChange={(e) => {
          const fs = e.target.files;
          if (fs && fs.length && pending.current) handleFiles(fs, null, pending.current);
          e.target.value = "";
        }}
      />
      <MDEditor
        value={value}
        onChange={(v) => onChange(v ?? "")}
        height={height}
        preview={preview}
        visibleDragbar={false}
        commands={[...commands.getCommands(), commands.divider, uploadCmd, calloutCmd, codeBlockCmd]}
        textareaProps={{
          placeholder: "Escreva em Markdown. Cole ou arraste imagens aqui para enviar.",
          onPaste: (e) => {
            const files = e.clipboardData?.files;
            if (files && files.length && Array.from(files).some((f) => f.type.startsWith("image/"))) {
              e.preventDefault();
              handleFiles(files, e.currentTarget);
            }
          },
          onDrop: (e) => {
            const files = e.dataTransfer?.files;
            if (files && files.length) {
              e.preventDefault();
              handleFiles(files, e.currentTarget as HTMLTextAreaElement);
            }
          },
        }}
      />
    </>
  );
}
