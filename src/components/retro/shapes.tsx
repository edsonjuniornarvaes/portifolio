import styled, { keyframes } from "styled-components";

const drift = keyframes`
  0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
  50% { transform: translateY(-10px) rotate(calc(var(--r, 0deg) + 6deg)); }
`;

const Layer = styled.div`
  position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0;
  svg { position: absolute; animation: ${drift} 9s ease-in-out infinite; }
  .a { top: 8%; left: 2%; --r: -8deg; width: 74px; }
  .b { top: 62%; left: 4%; --r: 12deg; width: 70px; animation-delay: -2s; }
  .c { top: 14%; right: 3%; --r: 6deg; width: 90px; animation-delay: -4s; }
  .d { top: 70%; right: 6%; --r: -14deg; width: 64px; animation-delay: -1s; }
  .dots { position: absolute; width: 90px; height: 70px; background: radial-gradient(circle at 2px 2px, var(--accent-2) 2px, transparent 2.5px) 0 0 / 18px 18px; opacity: 0.5; }
  .dots.l { left: 10%; top: 40%; } .dots.r { right: 12%; top: 46%; }
  @media (max-width: 900px) { svg, .dots { display: none; } }
  @media (prefers-reduced-motion: reduce) { svg { animation: none; } }
`;

const stroke = { fill: "none", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Formas de contorno (código, chaves, celular) espalhadas e flutuando devagar. */
export default function Shapes() {
  return (
    <Layer aria-hidden>
      <svg className="a" viewBox="0 0 80 80" {...stroke} stroke="#c4a1ff"><path d="M28 24 12 40l16 16M52 24l16 16-16 16" /></svg>
      <svg className="b" viewBox="0 0 80 80" {...stroke} stroke="#2eebaa"><rect x="22" y="8" width="36" height="64" rx="8" /><path d="M34 62h12" /></svg>
      <svg className="c" viewBox="0 0 100 80" {...stroke} stroke="#06b6d4"><path d="M30 12c-10 0-14 4-14 14v6c0 6-4 8-8 8 4 0 8 2 8 8v6c0 10 4 14 14 14M70 12c10 0 14 4 14 14v6c0 6 4 8 8 8-4 0-8 2-8 8v6c0 10-4 14-14 14" /></svg>
      <svg className="d" viewBox="0 0 80 80" {...stroke} stroke="#ff7eb6"><path d="M12 64 40 14l28 50z" /></svg>
      <span className="dots l" />
      <span className="dots r" />
    </Layer>
  );
}
