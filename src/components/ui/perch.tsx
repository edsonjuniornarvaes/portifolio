"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { play } from "@/lib/sound";

/**
 * Um passarinho que pousa no que você aponta: títulos e trabalhos marcados com `data-perch`.
 * Pula de um para o outro com uma mola. Só em telas com mouse.
 */
export default function Perch() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 170, damping: 15, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 170, damping: 15, mass: 0.7 });
  const lean = useTransform(sx, (v) => Math.max(-25, Math.min(25, (v - x.get()) * -0.5)));
  const target = useRef<HTMLElement | null>(null);
  const placed = useRef(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (min-width: 861px)").matches) return;
    const spot = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const tall = r.height > 160;
      return { px: Math.min(window.innerWidth - 56, r.left + (tall ? r.width * 0.78 : r.width - 70)), py: r.top - 26 };
    };
    const go = (el: HTMLElement, hop: boolean) => {
      target.current = el;
      const { px, py } = spot(el);
      if (!placed.current) { placed.current = true; x.jump(px); y.jump(py); sx.jump(px); sy.jump(py); return; }
      x.set(px); y.set(py - (hop ? 30 : 0));
      if (hop) { play("pop"); animate(y, py, { delay: 0.12, duration: 0.18 }); }
    };
    const first = document.querySelector<HTMLElement>("[data-perch]");
    if (first) go(first, false);
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-perch]") as HTMLElement | null;
      if (el && el !== target.current) go(el, true);
    };
    const follow = () => { if (target.current && document.contains(target.current)) { const { px, py } = spot(target.current); x.set(px); y.set(py); sx.jump(px); sy.jump(py); } };
    document.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("scroll", follow, { passive: true });
    window.addEventListener("resize", follow);
    return () => {
      document.removeEventListener("pointerover", over);
      window.removeEventListener("scroll", follow);
      window.removeEventListener("resize", follow);
    };
  }, [x, y, sx, sy]);

  return (
    <motion.div aria-hidden style={{ position: "fixed", left: 0, top: 0, x: sx, y: sy, rotate: lean, zIndex: 45, pointerEvents: "none", display: "var(--perch-display, block)" }}>
      <svg width="46" height="40" viewBox="0 0 46 40">
        <path d="M6 26c0-9 7-16 17-16s17 7 17 16-7 12-17 12S6 35 6 26Z" fill="#2eebaa" />
        <path d="M30 28c4-6 9-7 13-6-1 7-6 11-13 10Z" fill="#06b6d4" />
        <circle cx="14" cy="19" r="2.4" fill="#fff" /><circle cx="14.5" cy="19" r="1.1" fill="#04130d" />
        <path d="M5 21 0 24l6 1Z" fill="#ffcb6b" />
        <path d="M20 38v-4M27 38v-4" stroke="#ffcb6b" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}
