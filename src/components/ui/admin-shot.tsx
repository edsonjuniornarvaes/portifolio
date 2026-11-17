"use client";

import styled from "styled-components";
import type { AdminBrand } from "@/data/brands";

const Box = styled.div`
  position: relative; width: 100%; height: 100%; container-type: inline-size; background: #f0f3f8;
  img.bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top left; display: block; }
  .logo { position: absolute; left: 0; top: 0; width: 12.5%; height: 5.55%; background: rgb(23, 20, 31); display: flex; align-items: center; gap: 1.1cqw; padding-left: 1.5cqw; overflow: hidden; }
  .tile { flex: none; width: 2.9cqw; height: 2.9cqw; border-radius: 0.8cqw; overflow: hidden; display: grid; place-items: center; background: var(--bc); color: #fff; font-size: 1.7cqw; font-weight: 700; }
  .tile img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .logo b { font-size: 1.9cqw; font-weight: 600; letter-spacing: -0.01em; color: #fff; white-space: nowrap; }
`;

/** Tela do painel administrativo com o ícone e o nome do cliente no canto (mesmo padrão para todos). */
export default function AdminShot({ brand }: { brand: AdminBrand }) {
  return (
    <Box style={{ ["--bc" as string]: brand.color }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="bg" src="/images/projects/painel-admin.webp" alt="" loading="lazy" />
      <div className="logo">
        <span className="tile" aria-hidden>
          {brand.icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={brand.icon} alt="" style={{ objectPosition: brand.pos ?? "center", transform: brand.scale ? `scale(${brand.scale})` : undefined, transformOrigin: brand.pos ?? "center" }} />
          ) : (
            brand.name[0]
          )}
        </span>
        <b>{brand.name}</b>
      </div>
    </Box>
  );
}
