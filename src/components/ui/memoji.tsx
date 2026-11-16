"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Avatar no estilo Memoji do iPhone: traços suaves, óculos, headset e barba por fazer.
 * Os olhos seguem o mouse e piscam de vez em quando.
 */
export default function Memoji({ label }: { label: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height * 0.5);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 300);
      setLook({ x: (dx / d) * k, y: (dy / d) * k });
    };
    window.addEventListener("pointermove", move, { passive: true });
    let t: ReturnType<typeof setTimeout>;
    const loop = () => { t = setTimeout(() => { setBlink(true); setTimeout(() => setBlink(false), 140); loop(); }, 2600 + Math.random() * 2600); };
    loop();
    return () => { window.removeEventListener("pointermove", move); clearTimeout(t); };
  }, []);

  const px = look.x * 3.2, py = look.y * 2.4;
  const lid = blink ? 9 : 0;
  return (
    <svg ref={ref} viewBox="0 0 200 210" role="img" aria-label={label} style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}>
      <defs>
        <radialGradient id="mj-skin" cx="50%" cy="38%" r="70%"><stop offset="0" stopColor="#ffdcbd" /><stop offset="1" stopColor="#efb286" /></radialGradient>
        <linearGradient id="mj-hair" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e08a3f" /><stop offset="1" stopColor="#9c4a1a" /></linearGradient>
        <linearGradient id="mj-tee" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6fa83a" /><stop offset="1" stopColor="#4a7a22" /></linearGradient>
        <linearGradient id="mj-cup" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4a4d55" /><stop offset="1" stopColor="#202227" /></linearGradient>
        <radialGradient id="mj-stub" cx="50%" cy="20%" r="70%"><stop offset="0" stopColor="#7a4a2a" stopOpacity="0" /><stop offset="1" stopColor="#6b3f22" stopOpacity=".55" /></radialGradient>
      </defs>
      {/* ombros */}
      <path d="M10 210c2-40 34-58 90-58s88 18 90 58Z" fill="url(#mj-tee)" />
      <path d="M72 152c8 16 48 16 56 0l-4-10H76Z" fill="#f2bf96" />
      <path d="M76 152c10 12 38 12 48 0" fill="none" stroke="#3b5c1a" strokeWidth="5" strokeLinecap="round" opacity=".6" />
      {/* orelhas */}
      <ellipse cx="44" cy="108" rx="8" ry="13" fill="#eaa77b" /><ellipse cx="156" cy="108" rx="8" ry="13" fill="#eaa77b" />
      {/* cabeça */}
      <path d="M46 100c0-40 22-62 54-62s54 22 54 62c0 36-20 66-54 66S46 136 46 100Z" fill="url(#mj-skin)" />
      <path d="M52 120c6 30 24 46 48 46s42-16 48-46c-8 22-24 30-48 30s-40-8-48-30Z" fill="url(#mj-stub)" />
      {/* cabelo */}
      <path d="M44 92c-6-40 18-66 58-66 36 0 58 22 54 62-8-16-20-26-34-30-18 10-40 14-62 8-8 6-12 16-16 26Z" fill="url(#mj-hair)" />
      <path d="M70 34c10-14 36-16 50-6-14-2-28 0-40 8Z" fill="#f0a35a" opacity=".7" />
      {/* headset */}
      <path d="M40 100C34 40 70 18 100 18s66 22 60 82" fill="none" stroke="#2a2c32" strokeWidth="8" strokeLinecap="round" />
      <rect x="28" y="88" width="20" height="46" rx="10" fill="url(#mj-cup)" /><rect x="152" y="88" width="20" height="46" rx="10" fill="url(#mj-cup)" />
      <path d="M36 128c0 22 12 34 30 38" fill="none" stroke="#2a2c32" strokeWidth="4" strokeLinecap="round" /><circle cx="70" cy="166" r="7" fill="#2a2c32" />
      {/* sobrancelhas */}
      <path d="M64 86q14-8 28-2M108 84q14-6 28 2" stroke="#8a4a1f" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      {/* olhos */}
      <g>
        <ellipse cx="78" cy="104" rx="11" ry="9" fill="#fff" /><ellipse cx="122" cy="104" rx="11" ry="9" fill="#fff" />
        <circle cx={78 + px} cy={104 + py} r="5.4" fill="#5a3418" /><circle cx={122 + px} cy={104 + py} r="5.4" fill="#5a3418" />
        <circle cx={78 + px} cy={104 + py} r="2.6" fill="#140a04" /><circle cx={122 + px} cy={104 + py} r="2.6" fill="#140a04" />
        <circle cx={80 + px} cy={102 + py} r="1.4" fill="#fff" /><circle cx={124 + px} cy={102 + py} r="1.4" fill="#fff" />
        <rect x="64" y="94" width="28" height={lid} fill="#f4c49a" /><rect x="108" y="94" width="28" height={lid} fill="#f4c49a" />
      </g>
      {/* óculos */}
      <g fill="rgba(255,255,255,0.1)" stroke="#16171a" strokeWidth="5" strokeLinejoin="round">
        <rect x="58" y="90" width="40" height="29" rx="8" /><rect x="102" y="90" width="40" height="29" rx="8" />
      </g>
      <path d="M98 100h4M58 100l-12-2M142 100l12-2" stroke="#16171a" strokeWidth="4" strokeLinecap="round" />
      {/* nariz, bigode e sorriso */}
      <path d="M99 112c-4 8-6 12 0 14s8-2 3-14" fill="none" stroke="#d58f66" strokeWidth="3" strokeLinecap="round" opacity=".8" />
      <path d="M72 132c10-8 20-6 28-2 8-4 18-6 28 2-8 4-20 8-28 4-8 4-20 0-28-4Z" fill="#7a4220" />
      <path d="M86 146q14 10 28 0" fill="none" stroke="#b5503f" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
