"use client";

import { useState } from "react";

/** Copia o texto e mostra confirmação rápida. */
export default function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        } catch {
          /* ignore */
        }
      }}
      style={{
        font: "inherit",
        fontSize: "0.82rem",
        height: 34,
        padding: "0 14px",
        borderRadius: 999,
        border: "1px solid var(--line)",
        background: "var(--paper-2)",
        color: done ? "var(--accent-ink)" : "var(--muted)",
        cursor: "pointer",
        transition: "color 0.2s ease",
      }}
    >
      {done ? "Copiado ✓" : "Copiar e-mail"}
    </button>
  );
}
