"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { play } from "@/lib/sound";

const N = 9, GAP = 32, H = 360, PTS = 19;

/**
 * Cordinhas de violão no cantinho da tela, atrás do conteúdo: passe o mouse e elas vibram e tocam uma nota suave.
 */
export default function CornerStrings() {
  const pathname = usePathname();
  const cv = useRef<HTMLCanvasElement>(null);
  const hidden = pathname.startsWith("/adminaccess");

  useEffect(() => {
    const canvas = cv.current;
    if (hidden || !canvas) return;
    const c = canvas.getContext("2d");
    if (!c) return;
    const W = N * GAP + GAP;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = W * dpr; canvas.height = H * dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0);
    const off = Array.from({ length: N }, () => new Float32Array(PTS));
    const vel = Array.from({ length: N }, () => new Float32Array(PTS));
    const lastHit = new Array(N).fill(0);
    let raf = 0, running = false, px = -1, py = -1, lx = -1;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      const s = getComputedStyle(document.documentElement);
      const base = s.getPropertyValue("--muted").trim() || "#8b98a5";
      const hot = s.getPropertyValue("--accent").trim() || "#2eebaa";
      c.clearRect(0, 0, W, H);
      for (let i = 0; i < N; i++) {
        let m = 0; for (let k = 0; k < PTS; k++) m = Math.max(m, Math.abs(off[i][k]));
        c.beginPath();
        for (let k = 0; k < PTS; k++) { const x = GAP + i * GAP + off[i][k]; const y = (k / (PTS - 1)) * H; if (k) c.lineTo(x, y); else c.moveTo(x, y); }
        c.strokeStyle = m > 1 ? hot : base; c.globalAlpha = m > 1 ? 0.95 : 0.4; c.lineWidth = 1.4 + (N - i) * 0.28; c.stroke();
      }
      c.globalAlpha = 1;
    };

    const step = () => {
      let e = 0;
      for (let i = 0; i < N; i++) {
        const o = off[i], v = vel[i];
        for (let k = 1; k < PTS - 1; k++) v[k] += -0.06 * o[k] + 0.3 * (o[k - 1] + o[k + 1] - 2 * o[k]) * 0.5;
        for (let k = 1; k < PTS - 1; k++) { v[k] *= 0.972; o[k] += v[k]; e += Math.abs(o[k]) + Math.abs(v[k]); }
      }
      draw();
      if (e < 0.3 && px < 0) { running = false; return; }
      raf = requestAnimationFrame(step);
    };
    const wake = () => { if (!running && !reduce) { running = true; raf = requestAnimationFrame(step); } };

    const hit = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      const x = clientX - r.left, y = clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) { px = -1; lx = -1; return; }
      const prev = lx < 0 ? x : lx;
      px = x; py = y; lx = x;
      for (let i = 0; i < N; i++) {
        const sx = GAP + i * GAP;
        if ((prev - sx) * (x - sx) <= 0 && prev !== x) {
          const dir = x - prev;
          const idx = Math.round((py / H) * (PTS - 1));
          for (let k = 1; k < PTS - 1; k++) vel[i][k] += Math.sign(dir) * Math.max(0, 1 - Math.abs(k - idx) / 8) * 4.2;
          const now = performance.now();
          if (now - lastHit[i] > 120) { lastHit[i] = now; play("pluck", N - 1 - i, 0.55); }
          wake();
        }
      }
    };
    const mv = (e: PointerEvent) => hit(e.clientX, e.clientY);
    window.addEventListener("pointermove", mv, { passive: true });
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", mv); };
  }, [hidden]);

  if (hidden) return null;
  return (
    <canvas className="corner-strings" ref={cv} aria-hidden style={{ position: "fixed", left: 0, bottom: 0, width: N * GAP + GAP, height: H, zIndex: -1, pointerEvents: "none" }} />
  );
}
