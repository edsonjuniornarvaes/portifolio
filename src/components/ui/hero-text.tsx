"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** Letras que entram uma a uma (sobem, desfocam e assentam). Leitores de tela leem o texto inteiro. */
const mix = (a: number[], b: number[], t: number) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;

export function Letters({ text, delay = 0, gradient = false }: { text: string; delay?: number; gradient?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <span aria-label={text} style={{ display: "inline-block" }}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          aria-hidden
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            ...(gradient ? { color: mix([46, 235, 170], [6, 182, 212], i / Math.max(1, text.length - 1)) } : null),
          }}
          initial={reduce ? false : { y: "0.55em", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: delay + i * 0.045, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/** Frases que se revezam com uma transição vertical suave. */
export function Rotating({ words, interval = 2800 }: { words: string[]; interval?: number }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduce, words.length, interval]);
  return (
    <span className="rot" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          style={{ display: "block" }}
          initial={reduce ? false : { y: 16, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={reduce ? undefined : { y: -16, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
