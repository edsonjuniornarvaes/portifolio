"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { play } from "@/lib/sound";

/**
 * Bonequinho do Edson: os olhos seguem o mouse, a cabeça acompanha e, ao passar o mouse ou tocar,
 * ele acena e diz oi.
 */
export default function Mascot({ hello, label }: { hello: string; label: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [hi, setHi] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = svg.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height * 0.35);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 260);
      setLook({ x: (dx / d) * k, y: (dy / d) * k });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const greet = () => {
    setHi(true);
    play("pop");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setHi(false), 1800);
  };

  const ex = look.x * 4.2, ey = look.y * 3.2;
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <motion.svg
        ref={svg}
        viewBox="0 0 200 250"
        role="img"
        aria-label={label}
        onPointerEnter={greet}
        onPointerDown={greet}
        style={{ position: "absolute", left: "50%", bottom: 0, width: "min(100%, 300px)", height: "auto", x: "-50%", cursor: "pointer", overflow: "visible", filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.4))" }}
        animate={{ rotate: look.x * 3.5, y: hi ? [0, -12, 0] : 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 14 }}
      >
        {/* corpo: moletom menta */}
        <path d="M30 250c0-46 28-70 70-70s70 24 70 70Z" fill="#2eebaa" />
        <path d="M30 250c0-46 28-70 70-70s70 24 70 70h-22c0-30-18-48-48-48s-48 18-48 48Z" fill="#1fcf94" />
        <path d="M82 182c4 14 32 14 36 0l-4-6H86Z" fill="#e9c9a8" />
        <rect x="84" y="206" width="6" height="30" rx="3" fill="#04130d" opacity=".35" /><rect x="110" y="206" width="6" height="30" rx="3" fill="#04130d" opacity=".35" />
        {/* braço que acena */}
        <motion.g style={{ originX: "166px", originY: "206px" }} animate={{ rotate: hi ? [0, -28, 8, -28, 0] : 0 }} transition={{ duration: 1.1 }}>
          <path d="M160 214c14-6 24-26 22-48" fill="none" stroke="#2eebaa" strokeWidth="22" strokeLinecap="round" />
          <circle cx="182" cy="162" r="11" fill="#e9c9a8" />
        </motion.g>
        {/* cabeça */}
        <g>
          <ellipse cx="100" cy="112" rx="56" ry="60" fill="#e9c9a8" />
          <ellipse cx="44" cy="116" rx="8" ry="12" fill="#e1bd98" /><ellipse cx="156" cy="116" rx="8" ry="12" fill="#e1bd98" />
          <path d="M44 100c-4-40 22-62 58-62 38 0 60 22 54 62-8-18-22-30-46-30-26 0-46 12-66 30Z" fill="#3a2418" />
          <path d="M70 150c10 10 50 10 60 0-2 18-14 28-30 28s-28-10-30-28Z" fill="#3a2418" opacity=".55" />
          {/* olhos */}
          <circle cx="78" cy="114" r="13" fill="#fff" /><circle cx="122" cy="114" r="13" fill="#fff" />
          <circle cx={78 + ex} cy={114 + ey} r="6.5" fill="#1b1b1f" /><circle cx={122 + ex} cy={114 + ey} r="6.5" fill="#1b1b1f" />
          <circle cx={80 + ex} cy={111.5 + ey} r="2" fill="#fff" /><circle cx={124 + ex} cy={111.5 + ey} r="2" fill="#fff" />
          <path d="M64 96q14-8 28-2M108 94q14-6 28 2" stroke="#3a2418" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d={hi ? "M82 142q18 20 36 0" : "M84 144q16 12 32 0"} stroke="#7a3b2e" strokeWidth="4.5" strokeLinecap="round" fill={hi ? "#7a3b2e" : "none"} />
          <circle cx="62" cy="134" r="7" fill="#ff9aa2" opacity=".45" /><circle cx="138" cy="134" r="7" fill="#ff9aa2" opacity=".45" />
        </g>
      </motion.svg>
      <AnimatePresence>
        {hi && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            style={{ position: "absolute", left: "50%", top: "2%", marginLeft: 50, padding: "8px 18px 10px", borderRadius: 18, background: "var(--accent)", color: "var(--on-accent)", fontFamily: "var(--font-hand)", fontSize: "2rem", fontWeight: 700, lineHeight: 1, boxShadow: "4px 4px 0 var(--accent-2)", pointerEvents: "none" }}
          >
            {hello}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
