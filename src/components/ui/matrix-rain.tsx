"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "01{}[]<>/=+*;:#$%&_";

/**
 * Chuva de código estilo Matrix, bem discreta, atrás do início. Usa a cor de destaque do site,
 * pausa quando sai da tela ou a aba fica escondida, e não anima se a pessoa pediu menos movimento.
 */
export default function MatrixRain() {
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = box.current, canvas = cv.current;
    if (!el || !canvas) return;
    const c = canvas.getContext("2d");
    if (!c) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const FS = 16;
    let W = 0, H = 0, cols = 0, drops: number[] = [], speeds: number[] = [];
    let accent = "#2eebaa", paper = "#090b0d";
    let raf = 0, last = 0, visible = true;

    const colors = () => {
      const s = getComputedStyle(document.documentElement);
      accent = s.getPropertyValue("--accent").trim() || accent;
      paper = s.getPropertyValue("--paper").trim() || paper;
    };
    const size = () => {
      const r = el.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / FS);
      drops = Array.from({ length: cols }, () => Math.random() * -40);
      speeds = Array.from({ length: cols }, () => 0.35 + Math.random() * 0.55);
      c.fillStyle = paper; c.fillRect(0, 0, W, H);
      colors();
    };
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || t - last < 55) return;
      last = t;
      // rastro: escurece um pouco o quadro anterior
      c.globalAlpha = 0.16; c.fillStyle = paper; c.fillRect(0, 0, W, H); c.globalAlpha = 1;
      c.font = `${FS}px var(--font-jetbrains), monospace`;
      for (let i = 0; i < cols; i++) {
        const y = drops[i] * FS;
        if (y > 0) {
          c.fillStyle = "#e8fff7"; c.globalAlpha = 0.85;
          c.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], i * FS, y);
          c.fillStyle = accent; c.globalAlpha = 0.5;
          c.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], i * FS, y - FS);
          c.globalAlpha = 1;
        }
        drops[i] += speeds[i];
        if (y > H + 40 && Math.random() > 0.975) { drops[i] = Math.random() * -20; speeds[i] = 0.35 + Math.random() * 0.55; }
      }
    };

    size();
    const ro = new ResizeObserver(size); ro.observe(el);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(el);
    const vis = () => { visible = document.visibilityState === "visible"; };
    document.addEventListener("visibilitychange", vis);
    const mo = new MutationObserver(colors); mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-accent"] });
    if (reduce) { for (let i = 0; i < 60; i++) frame(i * 60); cancelAnimationFrame(raf); } else raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); mo.disconnect(); document.removeEventListener("visibilitychange", vis); };
  }, []);

  return (
    <div ref={box} aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.2, WebkitMaskImage: "linear-gradient(90deg, transparent 20%, #000 75%), linear-gradient(#000 60%, transparent)", maskImage: "linear-gradient(90deg, transparent 20%, #000 75%)" }}>
      <canvas ref={cv} style={{ display: "block" }} />
    </div>
  );
}
