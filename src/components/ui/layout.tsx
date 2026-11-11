"use client";

import Link from "next/link";
import styled from "styled-components";

/** Coluna central do site. */
export const Wrap = styled.div`
  max-width: var(--wrap); margin: 0 auto; padding: 0 var(--gutter);
`;

const Head = styled.header`
  display: flex; align-items: center; gap: 18px; margin-bottom: 34px;
  .n { font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent); }
  h2 { font-size: 1rem; font-weight: 600; letter-spacing: 0.02em; }
  .line { flex: 1; height: 1px; background: var(--line); }
  a { font-size: 0.92rem; color: var(--muted); transition: color 0.2s ease; white-space: nowrap; }
  a:hover { color: var(--accent); }
`;

/** Cabeçalho de seção: número, nome e uma linha fina; link opcional à direita. */
export function SectionHead({ n, label, action }: { n: string; label: string; action?: { href: string; label: string } }) {
  return (
    <Head>
      <span className="n">{n}</span>
      <h2>{label}</h2>
      <span className="line" />
      {action && <Link href={action.href}>{action.label} →</Link>}
    </Head>
  );
}

export const Section = styled.section`
  margin-top: 150px; scroll-margin-top: 90px;
  @media (max-width: 700px) { margin-top: 96px; }
`;

/** Título de página interna. */
export const PageTitle = styled.h1`
  font-size: clamp(2.8rem, 7.4vw, 5.6rem); font-weight: 700; line-height: 1; letter-spacing: -0.045em;
`;

export const Lead = styled.p`
  max-width: 40rem; margin-top: 20px; font-size: 1.15rem; line-height: 1.65; color: var(--muted);
`;

export const Page = styled.div`
  padding-top: 72px;
  @media (max-width: 700px) { padding-top: 44px; }
`;
