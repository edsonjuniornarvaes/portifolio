"use client";

import { useId } from "react";

/**
 * Ilustração do Edson programando (baseada na foto: de costas, óculos, fone, camiseta preta,
 * notebook, monitor com código, celular, livros e café). Desenho vetorial, sem foto.
 * `crop="head"` mostra só a cabeça e os ombros (para o ícone redondo do cabeçalho).
 */
export default function DeskScene({ crop = "full", title }: { crop?: "full" | "head"; title?: string }) {
  const id = useId().replace(/:/g, "");
  const vb = crop === "head" ? "34 76 120 120" : "0 0 360 380";
  const code = [
    [0, 7, "#ff7ab6", 30], [12, 0, "#ffffff", 22], [12, 28, "#7fdbca", 40], [12, 72, "#ffcb6b", 26],
    [24, 0, "#c792ea", 34], [24, 40, "#ffffff", 20], [24, 64, "#ff8a65", 30],
    [36, 14, "#82aaff", 44], [36, 62, "#ffffff", 18],
    [48, 14, "#7fdbca", 28], [48, 46, "#ffcb6b", 36],
    [60, 0, "#ff7ab6", 24], [60, 30, "#ffffff", 30], [60, 66, "#c792ea", 22],
    [72, 14, "#82aaff", 38],
  ] as const;
  return (
    <svg viewBox={vb} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} style={{ display: "block", width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1f2a3a" /><stop offset="1" stopColor="#141a24" /></linearGradient>
        <linearGradient id={`${id}-scr`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4a1fa8" /><stop offset="1" stopColor="#1d1052" /></linearGradient>
        <linearGradient id={`${id}-wood`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9a7656" /><stop offset="1" stopColor="#7a5a40" /></linearGradient>
        <linearGradient id={`${id}-tee`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0e1013" /><stop offset=".6" stopColor="#1a1d23" /><stop offset="1" stopColor="#262b33" /></linearGradient>
        <clipPath id={`${id}-card`}><rect width="360" height="380" rx="26" /></clipPath>
      </defs>
      <g clipPath={`url(#${id}-card)`}>
        {/* parede, painel verde e piso */}
        <rect width="360" height="380" fill={`url(#${id}-wall)`} />
        <rect x="230" y="18" width="26" height="40" fill="var(--accent)" opacity=".5" /><rect x="258" y="18" width="26" height="40" fill="var(--accent)" opacity=".28" />
        <g stroke="#fff" strokeOpacity=".07" strokeWidth="2" fill="none"><path d="M312 0v40l16 16v60M334 0v28l-12 12" /></g>
        <rect y="338" width="360" height="42" fill="#2d343f" />
        <rect y="338" width="360" height="3" fill="#fff" opacity=".06" />

        {/* bancada escura ao fundo e mesa de madeira */}
        <rect x="130" y="204" width="230" height="52" fill="#171b21" />
        <path d="M110 262 360 236v70L150 336Z" fill={`url(#${id}-wood)`} />
        <path d="M150 336 360 306v8L150 344Z" fill="#5d4330" />
        <rect x="318" y="314" width="42" height="70" fill="#2a3038" />

        {/* monitor */}
        <rect x="262" y="164" width="14" height="40" fill="#0e1115" />
        <ellipse cx="270" cy="204" rx="38" ry="6" fill="#0e1115" />
        <rect x="200" y="52" width="150" height="116" rx="5" fill="#101318" />
        <rect x="205" y="57" width="140" height="102" rx="3" fill={`url(#${id}-scr)`} />
        <g transform="translate(212 66)">
          {code.map(([y, x, c, w], i) => <rect key={i} x={x} y={y} width={w} height="5" rx="2.5" fill={c} opacity={c === "#ffffff" ? 0.8 : 0.95} />)}
        </g>
        <g transform="translate(296 68)" opacity=".55">
          {[0, 10, 20, 30, 40].map((y) => <rect key={y} x={0} y={y} width={26 - (y % 20)} height="4" rx="2" fill="#c792ea" />)}
        </g>

        {/* notebook prateado */}
        <path d="M104 186h104l12 26H92Z" fill="#d6dae0" />
        <path d="M112 196h88l6 10H106Z" fill="#aab0ba" opacity=".7" />
        <rect x="116" y="112" width="86" height="62" rx="4" fill="#cfd3d9" />
        <rect x="120" y="116" width="78" height="52" rx="2" fill="#1c2c55" />
        <g transform="translate(125 122)" opacity=".9">
          {[0, 8, 16, 24, 32].map((y, i) => <rect key={y} x={i % 2 ? 6 : 0} y={y} width={52 - i * 6} height="3.4" rx="1.7" fill={i % 2 ? "#ffcb6b" : "#7fdbca"} />)}
        </g>

        {/* celular em pé, livros, café */}
        <rect x="181" y="196" width="22" height="40" rx="5" fill="#25a3d8" /><rect x="183" y="198" width="18" height="36" rx="4" fill="#161d27" />
        <path d="M236 224 283 218l4 14-47 7Z" fill="#c8342b" /><path d="M236 239l47-7 1 4-47 8Z" fill="#7a1f1a" />
        <path d="M262 236 322 228l3 18-60 9Z" fill="#14161a" /><path d="M262 255l60-9 1 4-60 9Z" fill="#fff" opacity=".85" />
        <ellipse cx="338" cy="274" rx="16" ry="5" fill="#e8e6e2" /><path d="M328 262h20v8c0 5-4 8-10 8s-10-3-10-8Z" fill="#fff" /><ellipse cx="338" cy="262" rx="10" ry="3" fill="#6a3d1c" />

        {/* tapete, teclado e mouse */}
        <path d="M112 270 244 252l66 36-122 28Z" fill="#101215" />
        <path d="M134 268 232 254l36 24-92 14Z" fill="#1b1e23" />
        <g stroke="#3a3f47" strokeWidth="1.6">{[0, 1, 2, 3].map((r) => <path key={r} d={`M${146 + r * 6} ${272 + r * 6}L${232 + r * 6} ${258 + r * 5}`} />)}</g>
        <ellipse cx="286" cy="292" rx="11" ry="6" fill="#1d2025" />

        {/* cadeira (encosto de tela) */}
        <path d="M14 214c-4 40-2 96 18 130l22-6c-14-30-16-80-10-118Z" fill="#0d0f12" />
        <g stroke="#2a2f37" strokeWidth="2">{[236, 252, 268, 284, 300].map((y) => <path key={y} d={`M20 ${y}l24 -3`} />)}</g>
        <path d="M54 340h150c12 0 18 6 18 12v4H54Z" fill="#101216" />
        <path d="M150 330h66c8 0 10 6 6 9h-72Z" fill="#171a1f" />
        <rect x="116" y="354" width="10" height="26" fill="#0a0b0d" />

        {/* calça */}
        <path d="M52 316c34-12 96-10 150 6l-6 24c-52-8-100-8-140 0Z" fill="#2c4170" />

        {/* tronco de camiseta preta */}
        <path d="M24 326C18 262 22 212 56 184c18-14 44-12 62 2 14 12 22 34 28 70l8 70c-40 8-84 6-130 0Z" fill={`url(#${id}-tee)`} />
        <path d="M30 322c-4-56 0-106 30-134" stroke="#2c323b" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".8" />
        {/* braços: manga preta + antebraço */}
        <path d="M104 190c18 6 32 24 46 46l-16 12c-12-14-24-26-40-34Z" fill="#171a1f" />
        <path d="M140 232 200 266l-8 14-66-26Z" fill="#cf9772" />
        <path d="M120 206c34 4 78 36 120 76l-8 14c-44-26-86-48-120-56Z" fill="#14171b" opacity="0" />
        <path d="M196 262c26 6 52 14 82 24l-4 14c-34-8-62-18-90-30Z" fill="#d9a27c" />
        <ellipse cx="200" cy="270" rx="13" ry="7" fill="#d9a27c" /><ellipse cx="282" cy="292" rx="14" ry="7" fill="#d9a27c" />
        <rect x="270" y="288" width="6" height="4" rx="2" fill="#f2d7a4" />

        {/* pescoço e cabeça (de costas, olhando para a tela) */}
        <path d="M84 166 116 168 122 196 78 192Z" fill="#cf9772" />
        <path d="M58 136C54 112 70 94 98 94c24 0 38 12 40 30l2 6 6 12-7 4 1 8c-2 10-14 16-26 16l-20 2C74 172 60 158 58 136Z" fill="#d9a27c" />
        <path d="M56 138C50 108 68 88 98 88c26 0 42 14 42 34-12-14-28-16-42-14-14 2-24 12-28 26-2 8-2 16 0 24-8-4-14-10-14-20Z" fill="#26211e" />
        <path d="M76 98 84 82 94 94 104 80 110 94 122 84 126 100Z" fill="#26211e" />
        <path d="M62 138c4 8 8 16 16 22l-2-24Z" fill="#3a322d" opacity=".7" />
        {/* orelha, óculos e fio do fone */}
        <ellipse cx="90" cy="140" rx="7" ry="11" fill="#c78f69" /><path d="M88 134c2 4 2 10 0 14" stroke="#a97352" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M96 136 124 134" stroke="#1a1c20" strokeWidth="2.6" strokeLinecap="round" />
        <rect x="122" y="126" width="19" height="16" rx="6" fill="#bcd7ff" fillOpacity=".25" stroke="#1a1c20" strokeWidth="2.6" />
        <circle cx="133" cy="135" r="2" fill="#2a1d14" />
        <path d="M90 146c2 14 8 28 6 44 0 12 10 24 26 30" stroke="#17181b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <circle cx="88" cy="148" r="2.6" fill="#17181b" />
      </g>
    </svg>
  );
}
