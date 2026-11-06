"use client";

import styled from "styled-components";
import TechIcon from "./tech-icon";
import { useLang } from "@/i18n/provider";

export type TickerItem = { label: string; value?: string; tone?: "live" | "info" };

const Bar = styled.div`
  display: flex;
  align-items: stretch;
  border-block: 1px solid var(--line);
  background: color-mix(in srgb, var(--paper-2) 55%, transparent);
  overflow: hidden;
  .tag {
    display: flex; align-items: center; gap: 8px; padding: 0 16px; flex-shrink: 0; z-index: 2;
    font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 600;
    color: var(--on-accent); background: var(--accent);
  }
  .tag i { width: 7px; height: 7px; border-radius: 50%; background: var(--on-accent); animation: blip 1.6s ease-in-out infinite; }
  @keyframes blip { 50% { opacity: 0.25; } }
  .view { position: relative; flex: 1; min-width: 0; overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); }
  .track { display: flex; width: max-content; animation: ticker 60s linear infinite; }
  &:hover .track { animation-play-state: paused; }
  .item { display: inline-flex; align-items: center; gap: 8px; padding: 11px 22px; font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.05em; text-transform: uppercase; color: var(--muted); white-space: nowrap; border-right: 1px solid var(--line); }
  .item b { color: var(--ink); font-weight: 600; }
  .item em { font-style: normal; color: var(--accent-ink); }
  .item .dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; }
  @keyframes ticker { to { transform: translateX(-50%); } }
  @media (prefers-reduced-motion: reduce) { .track { animation: none; } }
`;

/** Faixa estilo placar esportivo, com itens passando devagar (pausa no hover). */
export default function Ticker({ items, label }: { items: TickerItem[]; label?: string }) {
  const { t } = useLang();
  const list = [...items, ...items];
  return (
    <Bar role="region" aria-label={t.ticker.aria}>
      <span className="tag">
        <i /> {label ?? t.ticker.label}
      </span>
      <div className="view">
        <div className="track">
          {list.map((it, i) => (
            <span className="item" key={i} aria-hidden={i >= items.length}>
              {it.tone === "live" && <span className="dot" />}
              {it.tone !== "live" && <TechIcon name={it.label} size={15} />}
              <b>{it.label}</b>
              {it.value && <em>{it.value}</em>}
            </span>
          ))}
        </div>
      </div>
    </Bar>
  );
}
