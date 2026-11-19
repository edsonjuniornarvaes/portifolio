"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { play } from "@/lib/sound";
import { useLang } from "@/i18n/provider";

const Btn = styled(motion.button)`
  position: fixed; right: 16px; bottom: 16px; z-index: 60; width: 52px; height: 52px; padding: 0; border: 0; border-radius: 50%; cursor: pointer; background: color-mix(in srgb, var(--paper) 88%, var(--accent)); color: var(--ink); box-shadow: 0 14px 34px -14px rgba(0,0,0,0.6); overflow: visible;
  &:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
  .ring { position: absolute; inset: 0; transform: rotate(-90deg); }
  .ring circle { fill: none; stroke-width: 2.5; }
  .ring .bg { stroke: var(--line); }
  .ring .fg { stroke: var(--accent); stroke-linecap: round; transition: stroke-dashoffset 0.15s linear; }
  .rocket { position: absolute; inset: 0; display: grid; place-items: center; color: var(--accent-ink); }
  .rocket svg { width: 22px; height: 22px; overflow: visible; }
  .flame { transform-origin: 12px 17px; animation: flame 0.18s ease-in-out infinite alternate; }
  @keyframes flame { from { transform: scaleY(0.7); } to { transform: scaleY(1.25); } }
  &:hover .rocket { animation: idle 0.6s ease-in-out infinite alternate; }
  @keyframes idle { to { transform: translateY(-3px); } }
  @media (prefers-reduced-motion: reduce) { .flame, &:hover .rocket { animation: none; } }
`;

/** Botão fixo: aparece depois de rolar, mostra quanto da página você já percorreu e, ao apertar, o foguete decola e leva ao topo. */
export default function BackToTop() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { t } = useLang();
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [launching, setLaunching] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const f = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setShow(window.scrollY > 520);
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    window.addEventListener("resize", f);
    return () => { window.removeEventListener("scroll", f); window.removeEventListener("resize", f); if (timer.current) clearTimeout(timer.current); };
  }, []);

  if (pathname.startsWith("/adminaccess")) return null;
  const C = 2 * Math.PI * 24.5;
  const go = () => {
    if (launching) return;
    setLaunching(true);
    play("peel");
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    timer.current = setTimeout(() => setLaunching(false), 1300);
  };
  return (
    <AnimatePresence>
      {show && (
        <Btn
          type="button"
          onClick={go}
          aria-label={t.footer.top}
          title={t.footer.top}
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
        >
          <svg className="ring" viewBox="0 0 52 52" aria-hidden>
            <circle className="bg" cx="26" cy="26" r="24.5" />
            <circle className="fg" cx="26" cy="26" r="24.5" strokeDasharray={C} strokeDashoffset={C * (1 - progress)} />
          </svg>
          <span className="rocket" aria-hidden>
            <AnimatePresence mode="wait">
              {!launching ? (
                <motion.svg key="idle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" exit={{ opacity: 0 }}>
                  <path d="M12 3c3.2 2.4 4.6 5.6 4.6 9.4L12 17l-4.6-4.6C7.4 8.6 8.8 5.4 12 3Z" />
                  <circle cx="12" cy="9.5" r="1.5" />
                  <path d="M7.6 13.4 4.8 15v3l3-1.2M16.4 13.4l2.8 1.6v3l-3-1.2" />
                  <path className="flame" d="M10.6 18.4c0 1.2.5 2.2 1.4 3 .9-.8 1.4-1.8 1.4-3" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="fly"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: [0, 4, -90], opacity: [1, 1, 0], scale: [1, 1.05, 1.15] }}
                  transition={{ duration: 0.9, times: [0, 0.18, 1], ease: ["easeOut", "easeIn"] }}
                >
                  <path d="M12 3c3.2 2.4 4.6 5.6 4.6 9.4L12 17l-4.6-4.6C7.4 8.6 8.8 5.4 12 3Z" />
                  <circle cx="12" cy="9.5" r="1.5" />
                  <path d="M7.6 13.4 4.8 15v3l3-1.2M16.4 13.4l2.8 1.6v3l-3-1.2" />
                  <path className="flame" d="M10.2 18c0 2 .8 3.6 1.8 4.8 1-1.2 1.8-2.8 1.8-4.8" strokeWidth="2.2" />
                </motion.svg>
              )}
            </AnimatePresence>
          </span>
        </Btn>
      )}
    </AnimatePresence>
  );
}
