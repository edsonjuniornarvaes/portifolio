"use client";

import styled from "styled-components";
import type { AdminBrand } from "@/data/brands";

const Box = styled.div`
  position: relative; width: 100%; height: 100%; container-type: inline-size; background: #f0f3f8;
  img.bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top left; display: block; }
  .logo { position: absolute; left: 0; top: 0; width: 12.6%; height: 5.6%; background: rgb(23, 20, 31); display: flex; align-items: center; gap: 1cqw; padding-left: 1.7cqw; overflow: hidden; }
  .logo b { font-size: 2.1cqw; font-weight: 700; letter-spacing: -0.02em; color: #fff; white-space: nowrap; }
  .logo .g { flex: none; width: 2.6cqw; height: 2.6cqw; border-radius: 0.7cqw; background: var(--bc); display: grid; place-items: center; }
  .logo .g svg { width: 70%; height: 70%; }
  .logo .chip { flex: none; display: grid; place-items: center; height: 80%; aspect-ratio: 1.5; border-radius: 0.6cqw; background: #ffe58a; overflow: hidden; }
  .logo .chip img { width: 100%; height: 100%; object-fit: cover; object-position: center 45%; }
`;

/** Tela do painel administrativo com o logo do cliente no lugar do logo original. */
export default function AdminShot({ brand }: { brand: AdminBrand }) {
  return (
    <Box style={{ ["--bc" as string]: brand.color }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="bg" src="/images/projects/painel-admin.webp" alt="" loading="lazy" />
      <div className="logo">
        {brand.logo ? (
          <span className="chip">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={brand.logo} alt="" /></span>
        ) : (
          <span className="g" aria-hidden>
            {brand.glyph === "mont" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="#06161a" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"><path d="M3 19 9 7l4 7 3-5 5 10Z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="#06161a" strokeWidth="3.4" strokeLinecap="round"><path d="M17 8a6 6 0 1 0 0 8v-3h-5" /></svg>
            )}
          </span>
        )}
        {!brand.logo && <b>{brand.name}</b>}
      </div>
    </Box>
  );
}
