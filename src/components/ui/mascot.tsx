"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { play } from "@/lib/sound";

/**
 * Avatar em pixel art do Edson (de headset e óculos): inclina na direção do mouse como se estivesse olhando,
 * pula e diz oi quando você passa por cima ou toca.
 */
export default function Mascot({ hello, label }: { hello: string; label: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [hi, setHi] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 160, damping: 14 });
  const sy = useSpring(ry, { stiffness: 160, damping: 14 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = box.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 420);
      ry.set((dx / d) * k * 16);
      rx.set((-dy / d) * k * 14);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [rx, ry]);

  const greet = () => {
    setHi(true);
    play("pop");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setHi(false), 1800);
  };

  return (
    <div ref={box} style={{ position: "relative", width: "100%", height: "100%", display: "grid", placeItems: "end center", perspective: 700 }}>
      <motion.div
        role="img"
        aria-label={label}
        onPointerEnter={greet}
        onPointerDown={greet}
        style={{ rotateX: sx, rotateY: sy, width: "min(100%, 300px)", aspectRatio: "1", cursor: "pointer", transformStyle: "preserve-3d", filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.45))" }}
        animate={{ y: hi ? [0, -14, 0, -6, 0] : 0, scale: hi ? 1.04 : 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/edson-pixel.webp" alt="" draggable={false} style={{ width: "100%", height: "100%", display: "block", imageRendering: "pixelated", pointerEvents: "none" }} />
      </motion.div>
      <AnimatePresence>
        {hi && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            style={{ position: "absolute", right: "2%", top: "4%", padding: "8px 18px 10px", borderRadius: 6, background: "var(--accent)", color: "var(--on-accent)", fontFamily: "var(--font-mono)", fontSize: "1.1rem", fontWeight: 700, lineHeight: 1, boxShadow: "4px 4px 0 var(--accent-2)", pointerEvents: "none", textTransform: "uppercase", letterSpacing: "0.04em" }}
          >
            {hello}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
