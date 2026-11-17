"use client";

import { useEffect, useRef } from "react";

/** Formato da abertura de cada olho (em coordenadas da imagem de 420 px) e onde fica a íris. */
const EYES = [
  { shape: "M166.7 201 Q171 197 176 196.4 Q184 195.4 192 200.2 L197.4 204.6 Q194 208.6 188 208.4 Q180 208.8 172 206 Z", lid: "M165.8 201.2 Q175 194.6 184 195.6 Q192 196.8 198 204.4", cx: 185.8, cy: 201.8, hl: [181.7, 199.4] },
  { shape: "M231 207.4 Q236 202 244 201 Q256 200.8 266 205.6 L269 207.6 Q264 212 254 212.4 Q242 212.8 235 210.6 Z", lid: "M229.6 206.6 Q238 198.6 248 199 Q259 199.8 269.6 207.4", cx: 248.4, cy: 206, hl: [247.6, 203.4] },
];

/**
 * Seu Memoji em círculo. O fundo acompanha a cor de destaque do site e os olhos seguem o mouse
 * (cobrimos a íris original e desenhamos outra por cima, que se move).
 */
export function MemojiAvatar({ size = 40, look = true }: { size?: number; look?: boolean }) {
  const box = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!look) return;
    const el = box.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * 0.45);
        const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 260);
        el.style.setProperty("--ex", `${((dx / d) * k * 5.4).toFixed(2)}px`);
        el.style.setProperty("--ey", `${((dy / d) * k * 2.2).toFixed(2)}px`);
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); };
  }, [look]);

  return (
    <span
      ref={box}
      style={{
        display: "block", position: "relative", width: size, height: size, borderRadius: "50%", overflow: "hidden", flex: "none",
        background: "linear-gradient(180deg, color-mix(in srgb, var(--accent) 52%, #fff) 0%, color-mix(in srgb, var(--accent) 78%, #000) 100%)",
        transition: "background 0.4s ease",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/edson-memoji-cutout.webp" alt="Edson Junior" width={size} height={size} draggable={false} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      {look && (
        <svg viewBox="0 0 420 420" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          <defs>
            {EYES.map((e, i) => <clipPath key={i} id={`mjeye${i}-${size}`}><path d={e.shape} /></clipPath>)}
          </defs>
          {EYES.map((e, i) => (
            <g key={i} clipPath={`url(#mjeye${i}-${size})`}>
              <path d={e.shape} fill="#f3efe8" />
              <g style={{ transform: "translate(var(--ex, 0px), var(--ey, 0px))", transition: "transform 0.12s ease-out" }}>
                <circle cx={e.cx} cy={e.cy} r="9.4" fill="#6a6a2b" />
                <circle cx={e.cx} cy={e.cy} r="6.1" fill="#101208" />
                <circle cx={e.hl[0]} cy={e.hl[1]} r="1.9" fill="#fff" />
              </g>
              <path d={e.shape} fill="none" stroke="rgba(60,40,30,0.18)" strokeWidth="1.2" />
            </g>
          ))}
          {EYES.map((e, i) => <path key={`l${i}`} d={e.lid} fill="none" stroke="#1d1613" strokeWidth="2.6" strokeLinecap="round" />)}
        </svg>
      )}
    </span>
  );
}
