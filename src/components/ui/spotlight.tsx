"use client";

import { useEffect } from "react";

/**
 * Luz que segue o mouse: um brilho suave no fundo da página e um destaque dentro dos cartões
 * marcados com `data-spot` (o CSS está em globals.css). Só para mouse; some com toque.
 */
export default function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const root = document.documentElement;
    let raf = 0;
    let ex = 0;
    let ey = 0;
    let target: Element | null = null;

    const apply = () => {
      raf = 0;
      root.style.setProperty("--cx", `${ex}px`);
      root.style.setProperty("--cy", `${ey}px`);
      if (target instanceof HTMLElement) {
        const r = target.getBoundingClientRect();
        target.style.setProperty("--mx", `${ex - r.left}px`);
        target.style.setProperty("--my", `${ey - r.top}px`);
      }
    };
    const onMove = (e: PointerEvent) => {
      ex = e.clientX;
      ey = e.clientY;
      target = (e.target as Element | null)?.closest?.("[data-spot]") ?? null;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="cursor-glow" aria-hidden />;
}
