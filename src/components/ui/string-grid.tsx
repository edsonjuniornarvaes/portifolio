"use client";

import { useEffect, useRef } from "react";
import { play } from "@/lib/sound";

type Str = { pos: number; off: Float32Array; vel: Float32Array; ring: number; last: number };

const GAP = 64; // distância entre cordas
const STEP = 18; // distância entre pontos de uma corda
const REACH = 80; // até onde o dedo/mouse alcança
const K = 0.045; // mola
const DAMP = 0.965; // amortecimento
const LINK = 0.32; // quanto cada ponto puxa o vizinho (onda)

/**
 * Grade feita de cordas: passe o mouse (ou o dedo) e elas vibram, voltam e, com o som ligado, tocam notas.
 * Tudo em canvas, sem imagens; pausa sozinho quando nada se mexe.
 */
export default function StringGrid() {
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = box.current;
    const canvas = cv.current;
    if (!el || !canvas) return;
    const c = canvas.getContext("2d");
    if (!c) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, dpr = 1;
    let vs: Str[] = [];
    let hs: Str[] = [];
    let raf = 0, running = false, idle = 0;
    let px = -999, py = -999, lx = -999, ly = -999, active = false;
    let colLine = "rgba(255,255,255,.1)", colHot = "#ff6a3d";

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      colLine = s.getPropertyValue("--line").trim() || colLine;
      colHot = s.getPropertyValue("--accent").trim() || colHot;
    };

    const make = (pos: number, n: number): Str => ({ pos, off: new Float32Array(n), vel: new Float32Array(n), ring: 0, last: 0 });

    const size = () => {
      const r = el.getBoundingClientRect();
      W = r.width; H = r.height; dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      vs = []; hs = [];
      for (let x = GAP / 2; x < W; x += GAP) vs.push(make(x, Math.ceil(H / STEP) + 1));
      for (let y = GAP / 2; y < H; y += GAP) hs.push(make(y, Math.ceil(W / STEP) + 1));
      readColors();
      draw();
    };

    const draw = () => {
      c.clearRect(0, 0, W, H);
      c.lineWidth = 1;
      const strokeSet = (list: Str[], vertical: boolean) => {
        for (const s of list) {
          let max = 0;
          for (let i = 0; i < s.off.length; i++) { const a = Math.abs(s.off[i]); if (a > max) max = a; }
          c.beginPath();
          for (let i = 0; i < s.off.length; i++) {
            const along = i * STEP;
            const x = vertical ? s.pos + s.off[i] : along;
            const y = vertical ? along : s.pos + s.off[i];
            if (i === 0) c.moveTo(x, y); else c.lineTo(x, y);
          }
          if (max > 1.5) { c.strokeStyle = colHot; c.globalAlpha = Math.min(1, 0.25 + max / 22); c.lineWidth = 1.4; }
          else { c.strokeStyle = colLine; c.globalAlpha = 1; c.lineWidth = 1; }
          c.stroke();
        }
        c.globalAlpha = 1;
      };
      strokeSet(vs, true);
      strokeSet(hs, false);
    };

    const pluck = (s: Str, vertical: boolean, idx: number, vmove: number) => {
      const now = performance.now();
      const speed = Math.abs(vmove);
      if (speed < 5 || now - s.last < 140) return;
      s.last = now;
      play("pluck", (vertical ? idx : idx + 4), Math.min(1, speed / 40));
    };

    const step = () => {
      const dx = px - lx, dy = py - ly;
      let moving = 0;
      const sim = (list: Str[], vertical: boolean) => {
        list.forEach((s, si) => {
          const { off, vel } = s;
          const n = off.length;
          // empurrão do ponteiro: corda vertical cede no eixo x, horizontal no eixo y
          if (active) {
            const dist = Math.abs((vertical ? px : py) - s.pos);
            if (dist < REACH) {
              const fall = 1 - dist / REACH;
              const push = vertical ? dx : dy;
              const crossed = (vertical ? lx - s.pos : ly - s.pos) * (vertical ? px - s.pos : py - s.pos) <= 0;
              for (let i = 0; i < n; i++) {
                const along = i * STEP;
                const d2 = Math.abs(along - (vertical ? py : px));
                if (d2 < REACH * 1.2) vel[i] += push * fall * (1 - d2 / (REACH * 1.2)) * 0.2;
              }
              if (crossed) pluck(s, vertical, si, push);
            }
          }
          for (let i = 1; i < n - 1; i++) {
            vel[i] += -K * off[i] + LINK * (off[i - 1] + off[i + 1] - 2 * off[i]) * 0.2;
          }
          let e = 0;
          for (let i = 1; i < n - 1; i++) {
            vel[i] *= DAMP;
            off[i] = Math.max(-42, Math.min(42, off[i] + vel[i]));
            e += Math.abs(off[i]) + Math.abs(vel[i]);
          }
          moving += e;
        });
      };
      sim(vs, true);
      sim(hs, false);
      lx = px; ly = py;
      draw();
      idle = moving < 0.4 && !active ? idle + 1 : 0;
      if (idle > 30) { running = false; return; }
      raf = requestAnimationFrame(step);
    };

    const wake = () => { if (!running && !reduce) { running = true; idle = 0; raf = requestAnimationFrame(step); } };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      if (!inside) { active = false; return; }
      if (!active) { lx = x; ly = y; }
      px = x; py = y; active = true;
      wake();
    };
    const onLeave = () => { active = false; };

    size();
    const ro = new ResizeObserver(size);
    ro.observe(el);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("themechange", size);
    const mo = new MutationObserver(() => { readColors(); draw(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("themechange", size);
    };
  }, []);

  return (
    <div ref={box} aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", WebkitMaskImage: "linear-gradient(#000 70%, transparent)", maskImage: "linear-gradient(#000 70%, transparent)" }}>
      <canvas ref={cv} style={{ display: "block" }} />
    </div>
  );
}
