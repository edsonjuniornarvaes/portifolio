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
        fontSize: "0.85rem",
        height: 40,
        padding: "0 18px",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(26,26,36,0.6)",
        color: done ? "#2eebaa" : "#a1a1aa",
        cursor: "pointer",
        transition: "color 0.2s ease, border-color 0.2s ease",
      }}
    >
      {done ? "Copiado ✓" : "Copiar e-mail"}
    </button>
  );
}
