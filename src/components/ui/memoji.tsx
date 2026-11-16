"use client";

import { useEffect, useRef, useState } from "react";
import { MemojiArt } from "@/components/ui/memoji-art";

/**
 * Avatar no estilo Memoji do iPhone: traços suaves, óculos, headset e barba por fazer.
 * Os olhos seguem o mouse e piscam de vez em quando.
 */
export default function Memoji({ label }: { label: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height * 0.5);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 300);
      setLook({ x: (dx / d) * k, y: (dy / d) * k });
    };
    window.addEventListener("pointermove", move, { passive: true });
    let t: ReturnType<typeof setTimeout>;
    const loop = () => { t = setTimeout(() => { setBlink(true); setTimeout(() => setBlink(false), 140); loop(); }, 2600 + Math.random() * 2600); };
    loop();
    return () => { window.removeEventListener("pointermove", move); clearTimeout(t); };
  }, []);

  const px = look.x * 3, py = look.y * 2.2;
  return (
    <svg ref={ref} viewBox="0 0 200 210" role="img" aria-label={label} style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}>
      <MemojiArt px={px} py={py} blink={blink} id="mjf" />
    </svg>
  );
}
