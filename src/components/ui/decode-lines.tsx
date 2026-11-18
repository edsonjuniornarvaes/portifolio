"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { useReducedMotion } from "framer-motion";

const CH = "01{}[]<>/\\=+*#$%&;:_";

const List = styled.ul`
  margin-top: 28px; padding: 0; list-style: none; display: grid; gap: 8px; font-family: var(--font-mono); font-size: clamp(0.92rem, 1.5vw, 1.08rem); line-height: 1.5;
  li { display: flex; gap: 12px; color: var(--ink); }
  li::before { content: ">"; color: var(--accent-ink); flex: none; }
  li span { min-height: 1.5em; }
  li:last-child span::after { content: ""; display: inline-block; width: 0.55em; height: 1.05em; margin-left: 4px; vertical-align: -0.15em; background: var(--accent); animation: dl-blink 1.1s steps(1) infinite; }
  @keyframes dl-blink { 50% { opacity: 0; } }
  @media (prefers-reduced-motion: reduce) { li:last-child span::after { animation: none; } }
`;

/** Linhas curtas no estilo terminal: cada uma "decodifica" (letras embaralhadas viram o texto) uma depois da outra. */
export default function DecodeLines({ lines, delay = 500 }: { lines: string[]; delay?: number }) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState<string[]>(() => lines.map((l) => (reduce ? l : "")));

  useEffect(() => {
    if (reduce) { setOut(lines); return; }
    setOut(lines.map(() => ""));
    const timers: ReturnType<typeof setTimeout>[] = [];
    const ints: ReturnType<typeof setInterval>[] = [];
    lines.forEach((line, li) => {
      timers.push(setTimeout(() => {
        let step = 0;
        const total = line.length + 8;
        const id = setInterval(() => {
          step++;
          const done = Math.max(0, step - 8);
          const text = line.slice(0, done) + Array.from({ length: Math.min(8, line.length - done) }, () => CH[(Math.random() * CH.length) | 0]).join("");
          setOut((o) => { const n = [...o]; n[li] = step >= total ? line : text; return n; });
          if (step >= total) clearInterval(id);
        }, 28);
        ints.push(id);
      }, delay + li * 650));
    });
    return () => { timers.forEach(clearTimeout); ints.forEach(clearInterval); };
  }, [lines, delay, reduce]);

  return (
    <List aria-label={lines.join(". ")}>
      {lines.map((l, i) => <li key={l} aria-hidden><span>{out[i] || " "}</span></li>)}
    </List>
  );
}
