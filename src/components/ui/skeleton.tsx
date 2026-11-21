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

/** Esqueleto da lista de artigos: título, busca, ano e linhas com título, data e resumo. */
export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Wrap>
      <Page aria-busy="true" aria-label="Carregando">
        <Sk $w="min(360px, 70%)" $h="clamp(2.6rem, 6.4vw, 4.4rem)" $r="12px" />
        <Sk $w="min(540px, 90%)" $h="1.1em" style={{ marginTop: 22 }} />
        <Sk $w="min(460px, 100%)" $h="50px" $r="99px" style={{ marginTop: 38 }} />
        <Sk $w="46px" $h="0.8em" style={{ marginTop: 40 }} />
        <Stack style={{ marginTop: 14, gap: 0, borderTop: "1px solid var(--line)" }}>
          {Array.from({ length: rows }, (_, i) => (
            <div className="row" key={i} style={{ gap: 12, padding: "26px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "center" }}>
                <Sk $w={`${52 + ((i * 17) % 34)}%`} $h="clamp(1.5rem, 3vw, 2.1rem)" />
                <Sk $w="54px" $h="0.8em" />
              </div>
              <Sk $w={`${70 + ((i * 7) % 24)}%`} $h="0.95em" />
            </div>
          ))}
        </Stack>
      </Page>
    </Wrap>
  );
}

/** Esqueleto da grade de projetos: título, abas e cartões com imagem, selo, título e texto. */
export function GridSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <Wrap>
      <Page aria-busy="true" aria-label="Carregando">
        <Sk $w="min(420px, 70%)" $h="clamp(2.6rem, 6.4vw, 4.4rem)" $r="12px" />
        <Sk $w="min(560px, 90%)" $h="1.1em" style={{ marginTop: 22 }} />
        <div style={{ display: "flex", gap: 8, marginTop: 40, flexWrap: "wrap" }}>
          {[96, 112, 92, 138].map((w, i) => <Sk key={i} $w={`${w}px`} $h="42px" $r="99px" />)}
        </div>
        <Stack>
          <div className="grid" style={{ marginTop: 14 }}>
            {Array.from({ length: cards }, (_, i) => (
              <div className="card" key={i} style={{ padding: 0, overflow: "hidden", gap: 0 }}>
                <Sk $h="clamp(170px, 17vw, 230px)" $r="0" />
                <div style={{ display: "grid", gap: 12, padding: "18px 20px 22px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <Sk $w="74px" $h="0.8em" />
                    <Sk $w="40px" $h="0.8em" />
                    <Sk $w="52px" $h="0.8em" />
                  </div>
                  <Sk $w={`${50 + ((i * 13) % 30)}%`} $h="1.5rem" />
                  <Sk $w="92%" $h="0.9em" />
                  <Sk $w="64%" $h="0.9em" />
                </div>
              </div>
            ))}
          </div>
        </Stack>
      </Page>
    </Wrap>
  );
}

/** Esqueleto de uma página de texto (artigo ou projeto): voltar, título, dados, imagem e parágrafos. */
export function ArticleSkeleton() {
  return (
    <Wrap>
      <Page aria-busy="true" aria-label="Carregando">
        <Sk $w="150px" $h="0.9em" />
        <Sk $w="min(680px, 92%)" $h="clamp(2.8rem, 7.4vw, 5rem)" $r="12px" style={{ marginTop: 26 }} />
        <Sk $w="min(520px, 80%)" $h="1.15em" style={{ marginTop: 22 }} />
        <div style={{ display: "flex", gap: 40, marginTop: 34, paddingTop: 22, borderTop: "1px solid var(--line)" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ display: "grid", gap: 10 }}><Sk $w="56px" $h="0.7em" /><Sk $w="96px" $h="1em" /></div>
          ))}
        </div>
        <Sk $h="clamp(220px, 34vw, 400px)" $r="16px" style={{ marginTop: 40 }} />
        <Stack>
          {[94, 100, 88, 97, 62].map((w, i) => <Sk key={i} $w={`${w}%`} $h="1em" />)}
        </Stack>
      </Page>
    </Wrap>
  );
}
