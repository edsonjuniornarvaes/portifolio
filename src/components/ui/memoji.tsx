"use client";

import { useEffect, useRef } from "react";
import { MemojiAvatar } from "@/components/ui/avatar";

/** Memoji que acompanha o mouse com uma leve inclinação (usado espiando sobre a colina do rodapé). */
export default function Memoji({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 400);
      el.style.transform = `perspective(600px) rotateY(${(dx / d) * k * 14}deg) rotateX(${(-dy / d) * k * 10}deg)`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div ref={ref} role="img" aria-label={label} style={{ width: "100%", transition: "transform 0.25s ease-out" }}>
      <MemojiAvatar size={150} bare />
    </div>
  );
}
