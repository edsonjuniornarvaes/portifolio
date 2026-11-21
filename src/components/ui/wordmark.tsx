"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const NAMES = ["Edson Junior", "EJ Sistemas"];

/** Marca do site: uma mini janela retrô (barra com três quadradinhos) com "EJ" e cursor piscando. Usa só as cores do tema. */
export default function Wordmark({ sub, size = 40 }: { sub?: string; size?: number }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => { if (document.visibilityState === "visible") setI((v) => v + 1); }, 4200);
    return () => clearInterval(id);
  }, [reduce]);
  const name = NAMES[i % NAMES.length];
  const w = Math.round(size * 1.12);
  const bar = Math.round(size * 0.28);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 12, whiteSpace: "nowrap" }}>
      <span
        aria-hidden
        style={{ position: "relative", display: "block", width: w, height: size, borderRadius: 7, overflow: "hidden", border: "1.5px solid var(--accent-ink)", background: "var(--paper)", flex: "none", boxShadow: "3px 3px 0 color-mix(in srgb, var(--accent-ink) 35%, transparent)" }}
      >
        <span style={{ position: "absolute", left: 0, right: 0, top: 0, height: bar, display: "flex", alignItems: "center", gap: 3, padding: "0 5px", background: "linear-gradient(90deg, var(--accent), var(--accent-2))" }}>
          {[0, 1, 2].map((k) => <i key={k} style={{ width: 4, height: 4, border: "1px solid var(--paper)", display: "block" }} />)}
        </span>
        <span style={{ position: "absolute", left: 0, right: 0, top: bar, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: size * 0.34, letterSpacing: "-0.04em", color: "var(--accent-ink)" }}>
          EJ
          <motion.i
            style={{ display: "inline-block", width: size * 0.17, height: 2, marginLeft: 2, marginTop: size * 0.2, background: "var(--accent-ink)" }}
            animate={reduce ? undefined : { opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
          />
        </span>
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
