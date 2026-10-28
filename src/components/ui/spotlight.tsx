"use client";

import { useEffect } from "react";

/** Luz suave que acompanha o mouse (desktop). */
export default function Spotlight() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = document.getElementById("spotlight");
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.background = `radial-gradient(520px circle at ${e.clientX}px ${e.clientY}px, rgba(139,92,246,0.10), transparent 70%)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      id="spotlight"
      aria-hidden
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}
