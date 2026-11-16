"use client";

import { useEffect } from "react";
import { play } from "@/lib/sound";

/** Barulhinho de "selecionar" de videogame ao clicar em botões, abas e etiquetas (se o som estiver ligado). */
export default function SoundEffects() {
  useEffect(() => {
    const click = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("button, [role='tab'], a.btn, [data-select]");
      if (!el || el.closest("[data-nosound]")) return;
      play("select");
    };
    document.addEventListener("click", click, { passive: true });
    return () => document.removeEventListener("click", click);
  }, []);
  return null;
}
