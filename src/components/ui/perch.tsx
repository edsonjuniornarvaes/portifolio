"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";

const W = 18, H = 18;
/** Onde ele gosta de pousar: títulos, botões e o que estiver marcado com `data-perch`. */
const SPOTS = "[data-perch], .btn, section h2, .roles li, .tags li, footer h4";

/**
 * Xicarazinha de café que, de vez em quando, pula e pousa em alguma coisa visível da tela
 * (títulos, botões, links do topo). Silenciosa. Só em telas com mouse.
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
      // pousa na pontinha do lado direito, com os pezinhos bem em cima da borda
      return { px: r.right - Math.min(18, r.width * 0.25) - W / 2, py: r.top - H + 1 };
    };
    const visible = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return r.width > 48 && r.height > 14 && r.top > (el.hasAttribute("data-perch") ? 20 : 84) && r.bottom < window.innerHeight - 24 && r.left > 8 && r.right < window.innerWidth - 8;
    };
    const pick = () => {
      const list = Array.from(document.querySelectorAll<HTMLElement>(SPOTS)).filter((e) => e !== target.current && visible(e));
      return list.length ? list[Math.floor(Math.random() * list.length)] : null;
    };

    const fly = async (el: HTMLElement) => {
      if (flying.current) return;
      flying.current = true;
      const { px, py } = spot(el);
      const fromX = x.get(), fromY = y.get();
      const first = fromX < -20;
      target.current = el;
      if (first) { x.set(px); y.set(py - 120); }
      const dist = Math.hypot(px - fromX, py - fromY);
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
      }, 9000 + Math.random() * 8000);
    };
    // chega logo no começo, sem barulho
    const start = setTimeout(() => { const el = pick(); if (el) void fly(el); next(); }, 1800);

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
      <svg width={W} height={H} viewBox="0 0 24 24" fill="none">
        {/* xícara de café com fumacinha */}
        <path d="M8 5c-1.4-1.2 1.4-2 0-3.4M12 5c-1.4-1.2 1.4-2 0-3.4M16 5c-1.4-1.2 1.4-2 0-3.4" stroke="var(--accent-ink)" strokeWidth="1.2" strokeLinecap="round" opacity="0.8"><animate attributeName="opacity" values="0.25;0.9;0.25" dur="2.4s" repeatCount="indefinite" /></path>
        <path d="M4 9h13v5.5a5.5 5.5 0 0 1-5.5 5.5h-2A5.5 5.5 0 0 1 4 14.5Z" fill="var(--accent)" />
        <path d="M17 11h1.6a2.4 2.4 0 0 1 0 4.8H16.6" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6.5 11.5h8" stroke="#04130d" strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" />
        <rect x="2.5" y="20.6" width="16" height="1.8" rx="0.9" fill="var(--accent-2)" />
      </svg>
    </motion.div>
  );
}
