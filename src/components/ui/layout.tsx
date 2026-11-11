"use client";

import Link from "next/link";
import styled from "styled-components";

/** Coluna central do site. */
export const Wrap = styled.div`
  max-width: var(--wrap); margin: 0 auto; padding: 0 var(--gutter);
`;

const Head = styled.header`
  display: flex; align-items: baseline; justify-content: space-between; gap: 16px; margin-bottom: 30px;
  font-family: var(--font-mono); font-size: 0.8rem; color: var(--muted);
  .c { color: var(--syn-c); margin-right: 8px; }
  .n { color: var(--accent); margin-right: 10px; }
  a { color: var(--ink); transition: color 0.2s ease; }
  a:hover { color: var(--accent); }
`;

/** Cabeçalho de seção em estilo de comentário de código: `// 01 trabalhos`. */
export function SectionHead({ n, label, action }: { n: string; label: string; action?: { href: string; label: string } }) {
  return (
    <Head>
      <span><span className="c">{"//"}</span><span className="n">{n}</span>{label}</span>
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
  font-size: clamp(2.8rem, 8vw, 6rem); font-weight: 700; line-height: 1; letter-spacing: -0.04em;
  &::before { content: "~/"; color: var(--accent); font-family: var(--font-mono); font-weight: 400; letter-spacing: 0; margin-right: 0.12em; }
`;

export const Lead = styled.p`
  max-width: 40rem; margin-top: 20px; font-size: 1.1rem; line-height: 1.65; color: var(--muted);
`;

export const Page = styled.div`
  padding-top: 72px;
  @media (max-width: 700px) { padding-top: 44px; }
`;
