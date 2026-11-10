"use client";

import Link from "next/link";
import styled from "styled-components";

/** Coluna central do site. */
export const Wrap = styled.div`
  max-width: var(--wrap); margin: 0 auto; padding: 0 var(--gutter);
`;

const Head = styled.header`
  display: flex; align-items: baseline; justify-content: space-between; gap: 16px; margin-bottom: 28px;
  font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted);
  b { font-weight: 500; color: var(--accent-ink); margin-right: 10px; }
  a { color: var(--ink); text-transform: none; letter-spacing: 0; font-size: 0.86rem; font-family: var(--font-sans); border-bottom: 1px solid var(--line); padding-bottom: 1px; transition: border-color 0.2s ease, color 0.2s ease; }
  a:hover { color: var(--accent-ink); border-color: var(--accent-ink); }
`;

/** Cabeçalho pequeno de seção: número e nome à esquerda, link opcional à direita. */
export function SectionHead({ n, label, action }: { n: string; label: string; action?: { href: string; label: string } }) {
  return (
    <Head>
      <span><b>{n}</b>{label}</span>
      {action && <Link href={action.href}>{action.label}</Link>}
    </Head>
  );
}

export const Section = styled.section`
  margin-top: 120px; scroll-margin-top: 90px;
  @media (max-width: 700px) { margin-top: 84px; }
`;

/** Título de página interna (Trabalhos, Trajetória, Escrita). */
export const PageTitle = styled.h1`
  font-family: var(--font-serif); font-weight: 400; font-size: clamp(3rem, 8vw, 6.2rem); line-height: 0.98; letter-spacing: -0.02em;
  em { color: var(--accent-ink); }
`;

export const Lead = styled.p`
  max-width: 38rem; margin-top: 20px; font-size: 1.12rem; line-height: 1.65; color: var(--muted);
`;

export const Page = styled.div`
  padding-top: 72px;
  @media (max-width: 700px) { padding-top: 44px; }
`;
