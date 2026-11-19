"use client";

import { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import styled from "styled-components";
import { play } from "@/lib/sound";

const Box = styled.div`
  display: inline-flex; align-items: flex-end; gap: 12px;
  button { position: relative; display: block; width: 44px; height: 62px; padding: 0; border: 0; background: none; cursor: pointer; perspective: 300px; }
  button:focus-visible { outline: 2px solid var(--accent); outline-offset: 6px; border-radius: 12px; }
  .shadow { position: absolute; left: 50%; bottom: -2px; width: 30px; height: 7px; margin-left: -15px; border-radius: 50%; background: rgba(0,0,0,0.35); filter: blur(2px); }
  .n { font-family: var(--font-mono); font-size: 0.95rem; font-weight: 600; letter-spacing: 0.06em; color: var(--ink); font-variant-numeric: tabular-nums; padding-bottom: 4px; }
  .n small { display: block; font-size: 0.66rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
`;

/** Moeda de videogame: cada clique faz ela saltar girando e solta o "plim". Conta quantas você pegou. */
export default function MarioCoin({ label, hint }: { label: string; hint: string }) {
  const [n, setN] = useState(0);
  const ctl = useAnimationControls();
  const hop = () => {
    setN((v) => v + 1);
    play("coin");
    void ctl.start({ y: [0, -58, 0], rotateY: [0, 540, 720], scaleY: [1, 1.06, 0.94, 1], transition: { duration: 0.62, times: [0, 0.45, 1], ease: ["easeOut", "easeIn"] } });
  };
  return (
    <Box>
      <button type="button" onClick={hop} aria-label={label}>
        <span className="shadow" aria-hidden />
        <motion.svg animate={ctl} viewBox="0 0 44 62" width="44" height="62" aria-hidden style={{ display: "block", overflow: "visible" }}>
          <defs>
            <linearGradient id="mc-g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#b8780a" /><stop offset=".3" stopColor="#ffd84a" /><stop offset=".6" stopColor="#fff2a8" /><stop offset="1" stopColor="#d39a12" /></linearGradient>
          </defs>
          <ellipse cx="22" cy="31" rx="19" ry="28" fill="#9a6400" />
          <ellipse cx="22" cy="31" rx="17" ry="26" fill="url(#mc-g)" />
          <ellipse cx="22" cy="31" rx="11.5" ry="19.5" fill="none" stroke="#c88a0a" strokeWidth="2" />
          <rect x="19.2" y="19" width="5.6" height="24" rx="2.8" fill="#b57808" />
          <rect x="20.2" y="20" width="2" height="22" rx="1" fill="#ffe27a" opacity=".7" />
          <ellipse cx="14" cy="17" rx="3" ry="7" fill="#fff" opacity=".35" />
        </motion.svg>
      </button>
      <div className="n" aria-live="polite">× {String(n).padStart(2, "0")}<small>{hint}</small></div>
    </Box>
  );
}
