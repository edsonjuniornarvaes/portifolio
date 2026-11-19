"use client";

import styled from "styled-components";

const Frame = styled.div`
  position: relative; width: var(--w, 240px); aspect-ratio: 560 / 1213; padding: calc(var(--w, 240px) * 0.03); border-radius: calc(var(--w, 240px) * 0.17);
  background: linear-gradient(145deg, #2a2d33, #0b0c0e 40%, #1a1c20);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.1) inset, 0 50px 90px -30px rgba(0,0,0,0.75), 0 0 0 1px rgba(0,0,0,0.6);
  .screen { position: relative; width: 100%; height: 100%; border-radius: calc(var(--w, 240px) * 0.14); overflow: hidden; background: #fff; }
  .screen img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top; opacity: 0; transform: scale(1.04); transition: opacity 0.7s ease, transform 1.2s cubic-bezier(.2,.7,.2,1); }
  .screen img[data-on="true"] { opacity: 1; transform: none; }
  .island { position: absolute; top: 3.1%; left: 50%; width: 28%; height: 2.7%; margin-left: -14%; border-radius: 99px; background: #000; box-shadow: 0 0 0 1px rgba(255,255,255,0.04); z-index: 3; }
  .island::after { content: ""; position: absolute; right: 9%; top: 50%; width: 14%; aspect-ratio: 1; transform: translateY(-50%); border-radius: 50%; background: radial-gradient(circle at 35% 35%, #2b3350, #0a0c14 70%); }
  .home { position: absolute; left: 50%; bottom: 1.6%; width: 34%; height: 0.55%; min-height: 3px; transform: translateX(-50%); border-radius: 99px; background: rgba(20,20,24,0.75); z-index: 3; box-shadow: 0 0 0 1px rgba(255,255,255,0.35); }
  .glare { position: absolute; inset: 0; z-index: 2; border-radius: inherit; pointer-events: none; background: linear-gradient(115deg, rgba(255,255,255,0.14), transparent 32%); }
`;

/** Celular com uma ou mais telas (a ativa aparece, as outras ficam escondidas). */
export default function Phone({ screens, active = 0, alt, width = 240, lazy = false }: { screens: string[]; active?: number; alt: string; width?: number | string; lazy?: boolean }) {
  return (
    <Frame style={{ ["--w" as string]: typeof width === "number" ? `${width}px` : width }}>
      <div className="island" />
      <div className="screen">
        {screens.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt={i === active ? alt : ""} data-on={i === active} loading={i === active && !lazy ? "eager" : "lazy"} decoding="async" />
        ))}
        <div className="home" />
        <div className="glare" />
      </div>
    </Frame>
  );
}
