"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const COLORS = ["var(--accent-ink)", "var(--accent-2)", "var(--lilac)", "#f5b942"];
const NAMES = ["Edson Junior", "EJ Sistemas"];

/** Marca do site: monograma EJ num quadrado de vidro escuro, com brilho que muda de cor, com o nome ao lado alternando entre "Edson Junior" e "EJ Sistemas". */
export default function Wordmark({ sub, size = 38 }: { sub?: string; size?: number }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => { if (document.visibilityState === "visible") setI((v) => v + 1); }, 4200);
    return () => clearInterval(id);
  }, [reduce]);
  const color = COLORS[i % COLORS.length];
  const name = NAMES[i % NAMES.length];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 11, whiteSpace: "nowrap" }}>
      <span
        aria-hidden
        style={{ position: "relative", display: "grid", placeItems: "center", width: size, height: size, borderRadius: Math.round(size * 0.3), background: "color-mix(in srgb, var(--paper) 78%, #000)", border: `1px solid color-mix(in srgb, ${color} 42%, transparent)`, boxShadow: `0 0 0 3px color-mix(in srgb, ${color} 9%, transparent), inset 0 0 ${size * 0.35}px color-mix(in srgb, ${color} 14%, transparent)`, color, transition: "color 0.8s ease, border-color 0.8s ease, box-shadow 0.8s ease", flex: "none" }}
      >
        <span style={{ fontWeight: 800, fontSize: size * 0.42, letterSpacing: "-0.08em", lineHeight: 1 }}>EJ</span>
        <i style={{ position: "absolute", right: size * 0.13, top: size * 0.13, width: size * 0.13, height: size * 0.13, borderRadius: "50%", background: "currentColor" }} />
      </span>
      <span style={{ display: "grid", lineHeight: 1.1 }}>
        <span style={{ display: "block", height: "1.2em", overflow: "hidden" }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.b
              key={name}
              style={{ display: "block", fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-0.02em" }}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            >
              {name}
            </motion.b>
          </AnimatePresence>
        </span>
        {sub ? <small style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>{sub}</small> : null}
      </span>
    </span>
  );
}
