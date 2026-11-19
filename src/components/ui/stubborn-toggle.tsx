"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import styled from "styled-components";
import { play } from "@/lib/sound";

const Box = styled.div`
  display: inline-flex; align-items: center; gap: 16px;
  .stage { position: relative; width: 236px; height: 78px; }
  .sw { position: absolute; left: 0; top: 14px; width: 112px; height: 50px; padding: 0; border: 0; border-radius: 99px; cursor: pointer; background: color-mix(in srgb, var(--ink) 22%, transparent); transition: background 0.25s ease; box-shadow: inset 0 2px 6px rgba(0,0,0,0.35); }
  .sw[aria-checked="true"] { background: var(--accent); }
  .sw:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
  .knob { position: absolute; left: 5px; top: 5px; width: 40px; height: 40px; border-radius: 50%; background: #fff; box-shadow: 0 3px 8px rgba(0,0,0,0.4); }
  .cat { position: absolute; left: 112px; top: 0; width: 124px; height: 78px; overflow: visible; pointer-events: none; }
  .txt { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); max-width: 11rem; line-height: 1.5; }
  .txt b { display: block; color: var(--ink); font-size: 0.8rem; margin-bottom: 2px; }
`;

type Mood = "sleep" | "watch" | "smug";

/**
 * Interruptor impossível: você liga, o gatinho espia e desliga com a patinha (e vice-versa).
 * Quando ninguém mexe, de vez em quando ele mesmo vai lá e vira a chave, só para provocar.
 */
export default function StubbornToggle({ title, hint, labelOn, labelOff }: { title: string; hint: string; labelOn: string; labelOff: string }) {
  const [on, setOn] = useState(false);
  const [mood, setMood] = useState<Mood>("sleep");
  const paw = useAnimationControls();
  const head = useAnimationControls();
  const busy = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const idle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const state = useRef(false);
  state.current = on;

  const later = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };

  /** A patinha sai do canto, empurra a chave para `to` e volta. */
  const flip = async (to: boolean) => {
    busy.current = true;
    setMood("watch");
    await head.start({ y: [10, -2], transition: { duration: 0.22 } });
    await paw.start({ x: [74, -26], opacity: [0, 1], transition: { duration: 0.28, ease: "easeOut" } });
    setMood("smug");
    setOn(to); play("click");
    await paw.start({ x: -22, y: [0, -3, 0], transition: { duration: 0.18 } });
    await paw.start({ x: 74, opacity: 0, transition: { duration: 0.3, delay: 0.12 } });
    await head.start({ y: 10, transition: { duration: 0.3, delay: 0.2 } });
    setMood("sleep");
    busy.current = false;
    scheduleIdle();
  };

  const scheduleIdle = () => {
    if (idle.current) clearTimeout(idle.current);
    idle.current = setTimeout(() => { if (!busy.current) void flip(!state.current); }, 9000 + Math.random() * 6000);
  };

  useEffect(() => {
    scheduleIdle();
    return () => { if (idle.current) clearTimeout(idle.current); timers.current.forEach(clearTimeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const click = () => {
    if (busy.current) return;
    const next = !on;
    setOn(next); play(next ? "on" : "click");
    if (idle.current) clearTimeout(idle.current);
    later(() => { void flip(!next); }, 650);
  };

  return (
    <Box>
      <div className="stage">
        <button type="button" className="sw" role="switch" aria-checked={on} aria-label={title} onClick={click}>
          <motion.span className="knob" animate={{ x: on ? 62 : 0 }} transition={{ type: "spring", stiffness: 420, damping: 24 }} />
        </button>
        <svg className="cat" viewBox="0 0 124 78" aria-hidden>
          <motion.g animate={head} initial={{ y: 10 }}>
            {/* cabeça */}
            <path d="M58 24 L62 6 L74 16 Q88 12 102 16 L114 6 L118 24 Q124 40 112 52 Q92 62 70 52 Q54 40 58 24Z" fill="#f29a3d" />
            <path d="M64 12 L70 18 L63 22Z M112 12 L106 18 L113 22Z" fill="#ffc9d4" />
            <path d="M76 20 q4 4 8 0 M92 20 q4 4 8 0" stroke="#b86a1a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            {/* olhos */}
            {mood === "sleep" ? (
              <path d="M72 34 q4 3 8 0 M96 34 q4 3 8 0" stroke="#3a2210" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            ) : mood === "smug" ? (
              <path d="M72 35 q4 -4 8 0 M96 35 q4 -4 8 0" stroke="#3a2210" strokeWidth="2.6" fill="none" strokeLinecap="round" />
            ) : (
              <g><ellipse cx="76" cy="34" rx="4.2" ry="5.2" fill="#fff" /><ellipse cx="100" cy="34" rx="4.2" ry="5.2" fill="#fff" /><circle cx="74.6" cy="35" r="2.6" fill="#1b1209" /><circle cx="98.6" cy="35" r="2.6" fill="#1b1209" /></g>
            )}
            <path d="M85 41 l3 3 l3 -3 z" fill="#e06c7a" />
            <path d="M88 44 q-3 5 -7 3 M88 44 q3 5 7 3" stroke="#5a3515" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M70 42 h-9 M70 46 l-8 3 M106 42 h9 M106 46 l8 3" stroke="#fff" strokeOpacity=".85" strokeWidth="1.2" strokeLinecap="round" />
          </motion.g>
        </svg>
        {/* patinha: sai da direita até a chave */}
        <motion.svg className="cat" viewBox="0 0 124 78" aria-hidden animate={paw} initial={{ x: 74, opacity: 0 }}>
          <rect x="40" y="26" width="84" height="22" rx="11" fill="#f29a3d" />
          <circle cx="36" cy="37" r="15" fill="#f6a84e" />
          <circle cx="33" cy="37" r="5" fill="#f2a1b0" /><circle cx="26" cy="31" r="2.6" fill="#f2a1b0" /><circle cx="26" cy="43" r="2.6" fill="#f2a1b0" /><circle cx="32" cy="26.5" r="2.4" fill="#f2a1b0" />
        </motion.svg>
      </div>
      <div className="txt"><b>{title}</b>{hint} · <span style={{ color: on ? "var(--accent-ink)" : "var(--muted)" }}>{on ? labelOn : labelOff}</span></div>
    </Box>
  );
}
