"use client";

import styled from "styled-components";
import type { IconType } from "react-icons";

export type OrbitItem = { label: string; icon: IconType; ring: 1 | 2 | 3; angle: number };

const Stage = styled.div`
  position: relative;
  width: min(100%, 460px);
  aspect-ratio: 1;
  margin-inline: auto;
  container-type: inline-size;

  .glow {
    position: absolute;
    inset: 8%;
    border-radius: 50%;
    background: radial-gradient(circle, var(--glow) 0%, transparent 68%);
    filter: blur(24px);
  }
  .ring {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    border: 1px solid var(--line);
    transform: translate(-50%, -50%);
  }
  .r1 { width: 46%; height: 46%; }
  .r2 { width: 70%; height: 70%; }
  .r3 { width: 90%; height: 90%; }

  .spin { position: absolute; inset: 0; animation: orbit var(--dur) linear infinite; }
  .spin.rev { animation-direction: reverse; }
  @keyframes orbit { to { transform: rotate(360deg); } }

  .slot {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    transform: rotate(var(--a)) translateX(calc(var(--rf) * 100cqw));
  }
  .pill {
    position: absolute;
    transform: translate(-50%, -50%) rotate(calc(var(--a) * -1));
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 0.74rem;
    white-space: nowrap;
    color: var(--ink);
    background: color-mix(in srgb, var(--paper) 80%, transparent);
    border: 1px solid var(--line);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    animation: upright var(--dur) linear infinite;
  }
  .rev .pill { animation-name: upright-rev; }
  .pill svg { color: var(--accent-ink); font-size: 0.95rem; }
  @keyframes upright { to { transform: translate(-50%, -50%) rotate(calc(var(--a) * -1 - 360deg)); } }
  @keyframes upright-rev { to { transform: translate(-50%, -50%) rotate(calc(var(--a) * -1 + 360deg)); } }

  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 34%;
    aspect-ratio: 1;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    padding: 3px;
    background: var(--brand-gradient);
    box-shadow: 0 0 60px var(--glow);
  }
  .center img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; object-position: top; display: block; }

  @media (prefers-reduced-motion: reduce) {
    .spin, .pill { animation: none; }
  }
  @media (max-width: 520px) { .pill { font-size: 0.66rem; padding: 4px 9px; } }
`;

const RING = {
  1: { rf: 0.23, dur: "46s", rev: false },
  2: { rf: 0.35, dur: "70s", rev: true },
  3: { rf: 0.45, dur: "96s", rev: false },
} as const;

/** Foto no centro com tecnologias girando em três órbitas. */
export default function Orbit({ src, alt, items }: { src: string; alt: string; items: OrbitItem[] }) {
  return (
    <Stage aria-label="Tecnologias que uso">
      <div className="glow" />
      <div className="ring r1" />
      <div className="ring r2" />
      <div className="ring r3" />
      {([1, 2, 3] as const).map((ring) => (
        <div
          key={ring}
          className={`spin${RING[ring].rev ? " rev" : ""}`}
          style={{ ["--dur" as string]: RING[ring].dur }}
        >
          {items
            .filter((i) => i.ring === ring)
            .map(({ label, icon: Icon, angle }) => (
              <div
                key={label}
                className="slot"
                style={{ ["--a" as string]: `${angle}deg`, ["--rf" as string]: RING[ring].rf }}
              >
                <span className="pill">
                  <Icon /> {label}
                </span>
              </div>
            ))}
        </div>
      ))}
      <div className="center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
      </div>
    </Stage>
  );
}
