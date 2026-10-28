"use client";

import { useEffect, useRef } from "react";

/** Barra fina no topo mostrando o progresso da rolagem. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${pct / 100})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 200,
        transformOrigin: "0 50%",
        transform: "scaleX(0)",
        background: "var(--accent-gradient-wide)",
      }}
    />
  );
}
