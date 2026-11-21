"use client";

import styled from "styled-components";
import { Page, Wrap } from "@/components/ui/layout";

/** Bloco cinza com brilho passando, no lugar do conteúdo que ainda está carregando. */
export const Sk = styled.span<{ $w?: string; $h?: string; $r?: string }>`
  display: block; width: ${(p) => p.$w || "100%"}; height: ${(p) => p.$h || "1em"}; border-radius: ${(p) => p.$r || "8px"};
  background: linear-gradient(100deg, color-mix(in srgb, var(--ink) 7%, transparent) 30%, color-mix(in srgb, var(--ink) 14%, transparent) 50%, color-mix(in srgb, var(--ink) 7%, transparent) 70%);
  background-size: 220% 100%; animation: sk 1.4s ease-in-out infinite;
  @keyframes sk { from { background-position: 120% 0; } to { background-position: -120% 0; } }
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

const Stack = styled.div`
  display: grid; gap: 14px; margin-top: 28px;
  .row { display: grid; gap: 10px; padding: 22px 0; border-bottom: 1px solid var(--line); }
  .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 30px; }
  .card { display: grid; gap: 12px; padding: 14px; border: 1px solid var(--line); border-radius: 16px; }
  @media (max-width: 1000px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 620px) { .grid { grid-template-columns: 1fr; } }
`;

/** Esqueleto de uma página com título, linha de apoio e lista de itens. */
export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Wrap>
      <Page aria-busy="true" aria-label="Carregando">
        <Sk $w="min(420px, 70%)" $h="clamp(2.4rem, 6vw, 4rem)" $r="12px" />
        <Sk $w="min(560px, 90%)" $h="1.1em" style={{ marginTop: 22 }} />
        <Stack>
          {Array.from({ length: rows }, (_, i) => (
            <div className="row" key={i}>
              <Sk $w={`${60 + ((i * 13) % 30)}%`} $h="1.6rem" />
              <Sk $w="85%" $h="0.9em" />
            </div>
          ))}
        </Stack>
      </Page>
    </Wrap>
  );
}

/** Esqueleto de uma grade de cartões (projetos). */
export function GridSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <Wrap>
      <Page aria-busy="true" aria-label="Carregando">
        <Sk $w="min(360px, 70%)" $h="clamp(2.4rem, 6vw, 4rem)" $r="12px" />
        <Sk $w="min(520px, 90%)" $h="1.1em" style={{ marginTop: 22 }} />
        <Stack>
          <div className="grid">
            {Array.from({ length: cards }, (_, i) => (
              <div className="card" key={i}>
                <Sk $h="clamp(150px, 16vw, 220px)" $r="12px" />
                <Sk $w="40%" $h="0.8em" />
                <Sk $w="70%" $h="1.4rem" />
                <Sk $w="95%" $h="0.9em" />
              </div>
            ))}
          </div>
        </Stack>
      </Page>
    </Wrap>
  );
}

/** Esqueleto de uma página de texto (artigo ou projeto): título, dados e parágrafos. */
export function ArticleSkeleton() {
  return (
    <Wrap>
      <Page aria-busy="true" aria-label="Carregando">
        <Sk $w="120px" $h="0.9em" />
        <Sk $w="min(640px, 90%)" $h="clamp(2.6rem, 7vw, 4.6rem)" $r="12px" style={{ marginTop: 22 }} />
        <Sk $w="min(520px, 80%)" $h="1.1em" style={{ marginTop: 20 }} />
        <Sk $h="clamp(180px, 30vw, 340px)" $r="16px" style={{ marginTop: 36 }} />
        <Stack>
          {[92, 100, 88, 96, 60].map((w, i) => <Sk key={i} $w={`${w}%`} $h="1em" />)}
        </Stack>
      </Page>
    </Wrap>
  );
}
