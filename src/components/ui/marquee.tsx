"use client";

import styled from "styled-components";

const Wrap = styled.div<{ $rev?: boolean }>`
  overflow: hidden; border-block: 1px solid var(--line); padding: 16px 0;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  .track { display: flex; width: max-content; gap: 38px; animation: mq 60s linear infinite; animation-direction: ${(p) => (p.$rev ? "reverse" : "normal")}; }
  &:hover .track { animation-play-state: paused; }
  span { font-family: var(--font-mono); font-size: 0.84rem; letter-spacing: 0.04em; color: var(--muted); white-space: nowrap; display: inline-flex; align-items: center; gap: 38px; transition: color 0.2s ease; }
  span:hover { color: var(--accent); }
  span::after { content: "/"; color: var(--syn-c); }
  @keyframes mq { to { transform: translateX(-50%); } }
  @media (prefers-reduced-motion: reduce) { .track { animation: none; } overflow-x: auto; }
`;

export default function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const list = [...items, ...items];
  return (
    <Wrap $rev={reverse} aria-hidden>
      <div className="track">{list.map((t, i) => <span key={`${t}-${i}`}>{t}</span>)}</div>
    </Wrap>
  );
}
