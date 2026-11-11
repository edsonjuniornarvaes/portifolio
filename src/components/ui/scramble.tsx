"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";

/**
 * Texto que se "decodifica": cada letra passa por símbolos aleatórios até assentar.
 * Use em texto mono (a largura não pula). `hover` repete o efeito ao passar o mouse.
 */
export default function Scramble({
  text,
  delay = 0,
  hover = false,
  inView = true,
  className,
}: {
  text: string;
  delay?: number;
  hover?: boolean;
  inView?: boolean;
  className?: string;
}) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);
  const started = useRef(false);

  const run = useCallback(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setOut(text);
    cancelAnimationFrame(raf.current);
    const chars = text.split("");
    const total = chars.length;
    const t0 = performance.now();
    const step = (now: number) => {
      const progress = (now - t0) / (260 + total * 38);
      let done = true;
      const next = chars
        .map((ch, i) => {
          if (ch === " ") return ch;
          if (progress * 1.25 > i / total + 0.08) return ch;
          done = false;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setOut(next);
      if (!done) raf.current = requestAnimationFrame(step);
      else setOut(text);
    };
    raf.current = requestAnimationFrame(step);
  }, [text]);

  useEffect(() => {
    setOut(text);
    const el = ref.current;
    if (!el || started.current) return;
    const go = () => {
      started.current = true;
      setTimeout(run, delay);
    };
    if (!inView || typeof IntersectionObserver === "undefined") return go();
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        go();
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [text, delay, inView, run]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <span ref={ref} className={className} aria-label={text} onPointerEnter={hover ? run : undefined}>
      <span aria-hidden>{out}</span>
    </span>
  );
}
