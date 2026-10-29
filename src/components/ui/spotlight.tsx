"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Luz suave que acompanha o mouse (só em telas com ponteiro fino). */
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const hidden = pathname.startsWith("/adminaccess");

  useEffect(() => {
    if (hidden) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.background = `radial-gradient(420px circle at ${e.clientX}px ${e.clientY}px, var(--glow), transparent 70%)`;
      });
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, [hidden]);

  if (hidden) return null;
  return <div ref={ref} aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}
