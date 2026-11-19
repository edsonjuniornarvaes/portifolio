"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { play } from "@/lib/sound";

const GAP = 26;      // distância entre as cordas
const ROWS = 15;     // cordas na horizontal
const PTS = 15;      // pontos de cada corda (para ela poder envergar)
const SIZE_H = ROWS * GAP;
const MAX_W = 16 * GAP;
const WRAP = 1240;   // largura da coluna de conteúdo do site (--wrap)

/**
 * Grade de cordinhas no canto de baixo à direita, esmaecendo para dentro da tela. Ela só ocupa a margem livre ao lado
 * da coluna de conteúdo (em telas largas), então nunca passa por cima de textos nem de cards.
 * Só toca quando você clica e ARRASTA o mouse por cima: as cordas envergam, vibram e soam como um violão.
 * Passar o mouse sem clicar não faz nada.
 */
export default function CornerStrings() {
  const pathname = usePathname();
  const cv = useRef<HTMLCanvasElement>(null);
  const hidden = pathname.startsWith("/adminaccess");
  const [w, setW] = useState(0); // largura livre ao lado do conteúdo (0 = não cabe)

  useEffect(() => {
    const calc = () => {
      const free = Math.floor((window.innerWidth - WRAP) / 2) + 8;
      const cols = Math.min(16, Math.floor(free / GAP));
      setW(cols >= 3 ? cols * GAP : 0);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    const canvas = cv.current;
    if (hidden || !canvas || w < 3 * GAP) return;
    const COLS = Math.round(w / GAP), SIZE_W = COLS * GAP;
    const c = canvas.getContext("2d");
    if (!c) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = SIZE_W * dpr; canvas.height = SIZE_H * dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0);

    // 0..COLS-1 = verticais (deslocam em x); COLS..COLS+ROWS-1 = horizontais (deslocam em y)
    const total = COLS + ROWS;
    const off = Array.from({ length: total }, () => new Float32Array(PTS));
    const vel = Array.from({ length: total }, () => new Float32Array(PTS));
    const lastHit = new Array(total).fill(0);
    let raf = 0, running = false, pressed = false, lx = -1, ly = -1;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // posição base de cada corda (a de baixo/direita encosta na borda da tela)
    const vx = (i: number) => SIZE_W - GAP / 2 - (COLS - 1 - i) * GAP;
    const hy = (j: number) => SIZE_H - GAP / 2 - (ROWS - 1 - j) * GAP;

    const draw = () => {
      const s = getComputedStyle(document.documentElement);
      const base = s.getPropertyValue("--ink").trim() || "#cfd6dd";
      const hot = s.getPropertyValue("--accent").trim() || "#2eebaa";
      c.globalCompositeOperation = "source-over";
      c.clearRect(0, 0, SIZE_W, SIZE_H);
      for (let n = 0; n < total; n++) {
        const o = off[n];
        let m = 0; for (let k = 0; k < PTS; k++) m = Math.max(m, Math.abs(o[k]));
        c.beginPath();
        for (let k = 0; k < PTS; k++) {
          const t = k / (PTS - 1);
          const x = n < COLS ? vx(n) + o[k] : t * SIZE_W;
          const y = n < COLS ? t * SIZE_H : hy(n - COLS) + o[k];
          if (k) c.lineTo(x, y); else c.moveTo(x, y);
        }
        c.strokeStyle = m > 0.8 ? hot : base;
        c.globalAlpha = m > 0.8 ? 0.95 : 0.2;
        c.lineWidth = m > 0.8 ? 1.6 : 1;
        c.stroke();
      }
      c.globalAlpha = 1;
      // esmaece para dentro da tela (o brilho fica no canto)
      c.globalCompositeOperation = "destination-in";
      const g = c.createRadialGradient(SIZE_W, SIZE_H, 0, SIZE_W, SIZE_H, Math.hypot(SIZE_W, SIZE_H) * 0.95);
      g.addColorStop(0, "rgba(0,0,0,1)"); g.addColorStop(0.55, "rgba(0,0,0,0.7)"); g.addColorStop(1, "rgba(0,0,0,0)");
      c.fillStyle = g; c.fillRect(0, 0, SIZE_W, SIZE_H);
      c.globalCompositeOperation = "source-over";
    };

    const step = () => {
      let e = 0;
      for (let n = 0; n < total; n++) {
        const o = off[n], v = vel[n];
        for (let k = 1; k < PTS - 1; k++) v[k] += -0.07 * o[k] + 0.15 * (o[k - 1] + o[k + 1] - 2 * o[k]);
        for (let k = 1; k < PTS - 1; k++) { v[k] *= 0.972; o[k] += v[k]; e += Math.abs(o[k]) + Math.abs(v[k]); }
      }
      draw();
      if (e < 0.3 && !pressed) { running = false; return; }
      raf = requestAnimationFrame(step);
    };
    const wake = () => { if (!running && !reduce) { running = true; raf = requestAnimationFrame(step); } };

    const pluck = (n: number, at: number, dir: number, note: number) => {
      const idx = Math.round(at * (PTS - 1));
      for (let k = 1; k < PTS - 1; k++) vel[n][k] += Math.sign(dir) * Math.max(0, 1 - Math.abs(k - idx) / 5) * 3.4;
      const now = performance.now();
      if (now - lastHit[n] > 110) { lastHit[n] = now; play("pluck", note, 0.5); }
      wake();
    };

    const hit = (cx: number, cy: number) => {
      const r = canvas.getBoundingClientRect();
      const x = cx - r.left, y = cy - r.top;
      if (lx < 0) { lx = x; ly = y; return; }
      const px = lx, py = ly;
      lx = x; ly = y;
      for (let i = 0; i < COLS; i++) {
        const sx = vx(i);
        if (px !== x && (px - sx) * (x - sx) <= 0 && y >= 0 && y <= SIZE_H) pluck(i, Math.min(1, Math.max(0, y / SIZE_H)), x - px, COLS - 1 - i);
      }
      for (let j = 0; j < ROWS; j++) {
        const sy = hy(j);
        if (py !== y && (py - sy) * (y - sy) <= 0 && x >= 0 && x <= SIZE_W) pluck(COLS + j, Math.min(1, Math.max(0, x / SIZE_W)), y - py, ROWS - 1 - j + 3);
      }
    };

    const inside = (x: number, y: number) => {
      const r = canvas.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    };
    const down = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (!inside(e.clientX, e.clientY)) return;
      pressed = true; lx = -1; ly = -1;
      document.documentElement.classList.add("strumming");
    };
    const up = () => {
      if (!pressed) return;
      pressed = false; lx = -1; ly = -1;
      document.documentElement.classList.remove("strumming");
    };
    const mv = (e: PointerEvent) => { if (pressed) hit(e.clientX, e.clientY); };
    // arrastar por cima de um link/imagem começaria um "arrastar e soltar" do navegador e cancelaria o toque nas cordas
    const noDrag = (e: Event) => { if (pressed) e.preventDefault(); };
    window.addEventListener("dragstart", noDrag);
    window.addEventListener("selectstart", noDrag);
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointermove", mv, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("pointercancel", up, { passive: true });
    draw();
    // refaz o desenho quando o tema muda (a cor das cordas acompanha)
    const mo = new MutationObserver(() => draw());
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-accent", "class"] });
    return () => {
      cancelAnimationFrame(raf); up(); mo.disconnect();
      window.removeEventListener("pointerdown", down); window.removeEventListener("pointermove", mv);
      window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up);
      window.removeEventListener("dragstart", noDrag); window.removeEventListener("selectstart", noDrag);
    };
  }, [hidden, w]);

  if (hidden || w < 3 * GAP) return null;
  return (
    <canvas className="corner-strings" ref={cv} aria-hidden style={{ position: "fixed", right: 0, bottom: 0, width: w, height: SIZE_H, zIndex: -1, pointerEvents: "none" }} />
  );
}
