"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { play } from "@/lib/sound";

const W = 22, H = 19;
/** Onde ele gosta de pousar: títulos, botões e o que estiver marcado com `data-perch`. */
const SPOTS = "[data-perch], h1, h2, .btn, section h3";

/**
 * Passarinho bem pequeno que, de vez em quando, voa e pousa em alguma coisa visível da tela
 * (títulos, botões, links do topo). Só faz barulho quando voa, e bem baixinho. Só em telas com mouse.
 */
export default function Perch() {
  const x = useMotionValue(-60), y = useMotionValue(-60), flip = useMotionValue(1), tilt = useMotionValue(0);
  const reduce = useReducedMotion();
  const target = useRef<HTMLElement | null>(null);
  const flying = useRef(false);

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover) and (min-width: 861px)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    let scrollTimer: ReturnType<typeof setTimeout>;
    let alive = true;

    const spot = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      // pousa perto de uma ponta do elemento (não no meio do texto), com os pezinhos na borda de cima
      const side = el.dataset.birdSide === "left" ? 0.12 : 0.82;
      return { px: r.left + Math.min(r.width * side, r.width - 14) - W / 2, py: r.top - H + 2 };
    };
    const visible = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return r.width > 48 && r.height > 14 && r.top > 84 && r.bottom < window.innerHeight - 24 && r.left > 8 && r.right < window.innerWidth - 8;
    };
    const pick = () => {
      const list = Array.from(document.querySelectorAll<HTMLElement>(SPOTS)).filter((e) => e !== target.current && visible(e));
      return list.length ? list[Math.floor(Math.random() * list.length)] : null;
    };

    const fly = async (el: HTMLElement, quiet = false) => {
      if (flying.current) return;
      flying.current = true;
      const { px, py } = spot(el);
      const fromX = x.get(), fromY = y.get();
      const first = fromX < -20;
      target.current = el;
      if (first) { x.set(px); y.set(py - 120); }
      const dist = Math.hypot(px - fromX, py - fromY);
      if (!first && !quiet && dist > 90) play("chirp", Math.floor(Math.random() * 4), 0.25);
      flip.set(px >= x.get() ? 1 : -1);
      const dur = first ? 0.9 : Math.min(1.1, 0.45 + dist / 1400);
      tilt.set(px >= x.get() ? 14 : -14);
      await Promise.all([
        animate(x, px, { duration: dur, ease: [0.45, 0.05, 0.3, 1] }),
        animate(y, [y.get(), Math.min(y.get(), py) - 38, py], { duration: dur, times: [0, 0.45, 1], ease: ["easeOut", "easeIn"] }),
      ]);
      animate(tilt, 0, { type: "spring", stiffness: 300, damping: 12 });
      flying.current = false;
    };

    const next = () => {
      if (!alive) return;
      timer = setTimeout(async () => {
        if (document.visibilityState === "visible") { const el = pick(); if (el) await fly(el); }
        next();
      }, 6500 + Math.random() * 7000);
    };
    // chega logo no começo, sem barulho
    const start = setTimeout(() => { const el = pick(); if (el) void fly(el, true); next(); }, 1800);

    // acompanha o elemento ao rolar; se ele sair da tela, escolhe outro lugar quando a rolagem parar
    const follow = () => {
      const el = target.current;
      if (el && document.contains(el) && !flying.current) { const { px, py } = spot(el); x.set(px); y.set(py); }
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const t = target.current;
        if (!flying.current && (!t || !document.contains(t) || !visible(t))) { const n = pick(); if (n) void fly(n); }
      }, 500);
    };
    window.addEventListener("scroll", follow, { passive: true });
    window.addEventListener("resize", follow);
    return () => {
      alive = false;
      clearTimeout(timer); clearTimeout(start); clearTimeout(scrollTimer);
      window.removeEventListener("scroll", follow);
      window.removeEventListener("resize", follow);
    };
  }, [x, y, flip, tilt, reduce]);

  return (
    <motion.div aria-hidden style={{ position: "fixed", left: 0, top: 0, x, y, rotate: tilt, scaleX: flip, zIndex: 45, pointerEvents: "none", display: "var(--perch-display, block)", opacity: 0.95 }}>
      <svg width={W} height={H} viewBox="0 0 46 40">
        <path d="M6 26c0-9 7-16 17-16s17 7 17 16-7 12-17 12S6 35 6 26Z" fill="#2eebaa" />
        <path d="M30 28c4-6 9-7 13-6-1 7-6 11-13 10Z" fill="#06b6d4" />
        <circle cx="14" cy="19" r="2.8" fill="#fff" /><circle cx="14.5" cy="19" r="1.3" fill="#04130d" />
        <path d="M5 21 0 24l6 1Z" fill="#ffcb6b" />
        <path d="M20 38v-4M27 38v-4" stroke="#ffcb6b" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}
