import styled from "styled-components";
import Link from "next/link";

/* Sistema editorial: texto em primeiro lugar, linhas finas, uma cor de destaque. */

export const Page = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 72px 24px 0;
  @media (max-width: 700px) { padding: 40px 16px 0; }
`;

export const Kicker = styled.p`
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  color: var(--muted);
  margin-bottom: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  .dot {
    display: inline-block; width: 7px; height: 7px; border-radius: 50%;
    background: #3f9b5c; margin-right: 8px; vertical-align: 1px;
  }
`;

export const Display = styled.h1`
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: clamp(2.7rem, 7.4vw, 5.6rem);
  line-height: 1.02;
  letter-spacing: -0.025em;
  max-width: 17ch;
  em { font-style: italic; color: var(--accent); }
`;

export const H2 = styled.h2`
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: clamp(2rem, 4.6vw, 3.2rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  em { font-style: italic; color: var(--accent); }
`;

export const Lead = styled.p`
  font-size: clamp(1.1rem, 1.7vw, 1.3rem);
  line-height: 1.65;
  max-width: 40rem;
  color: var(--ink);
  margin-top: 36px;
  & + & { margin-top: 18px; }
  a { text-decoration: underline; text-decoration-color: var(--accent); text-underline-offset: 4px; text-decoration-thickness: 1px; }
  a:hover { color: var(--accent); }
`;

export const Section = styled.section`
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 24px 48px;
  margin-top: 128px;
  scroll-margin-top: 80px;
  @media (max-width: 800px) { grid-template-columns: 1fr; margin-top: 88px; }
`;

export const Label = styled.h2`
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--muted);
  padding-top: 6px;
`;

export const Prose = styled.div`
  max-width: 38rem;
  p { margin-bottom: 1.1em; }
  p:last-child { margin-bottom: 0; }
  a { text-decoration: underline; text-decoration-color: var(--accent); text-underline-offset: 4px; text-decoration-thickness: 1px; }
  a:hover { color: var(--accent); }
  strong { font-weight: 600; }
`;

/* Linha de índice (trabalho, experiência, jornada) */
export const List = styled.ul`
  list-style: none;
  border-bottom: 1px solid var(--line);
`;

export const Row = styled.li`
  border-top: 1px solid var(--line);
`;

const rowInner = `
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr) auto;
  gap: 8px 28px;
  align-items: baseline;
  padding: 22px 0;
  @media (max-width: 700px) { grid-template-columns: 1fr; padding: 18px 0; }
  .year { font-size: 0.85rem; color: var(--muted); font-variant-numeric: tabular-nums; }
  .name { font-family: var(--font-serif); font-size: clamp(1.5rem, 2.6vw, 2rem); line-height: 1.1; letter-spacing: -0.01em; transition: color 0.2s ease, transform 0.25s ease; }
  .what { display: block; color: var(--muted); font-size: 0.95rem; margin-top: 6px; line-height: 1.5; max-width: 34rem; }
  .meta { font-size: 0.82rem; color: var(--muted); text-align: right; @media (max-width: 700px) { text-align: left; } }
`;

export const RowLink = styled(Link)`
  ${rowInner}
  &:hover .name { color: var(--accent); transform: translateX(6px); }
  &::after { content: none; }
`;

export const RowStatic = styled.div`
  ${rowInner}
`;

export const TextLink = styled(Link)`
  display: inline-block;
  margin-top: 22px;
  font-size: 0.95rem;
  text-decoration: underline;
  text-decoration-color: var(--accent);
  text-underline-offset: 4px;
  &:hover { color: var(--accent); }
`;

export const Big = styled.a`
  display: inline-block;
  font-family: var(--font-serif);
  font-size: clamp(1.9rem, 6.2vw, 4.4rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  background: linear-gradient(var(--accent), var(--accent)) 0 100% / 100% 2px no-repeat;
  padding-bottom: 4px;
  word-break: break-word;
  transition: color 0.2s ease;
  &:hover { color: var(--accent); }
`;

export const Plain = styled.p`
  font-size: 0.98rem;
  line-height: 1.7;
  color: var(--muted);
  b { color: var(--ink); font-weight: 600; }
  & + & { margin-top: 10px; }
`;

export const Photo = styled.figure`
  img { display: block; width: 100%; height: auto; border-radius: 4px; aspect-ratio: 4 / 5; object-fit: cover; object-position: top; filter: grayscale(0.15) contrast(1.02); }
  figcaption { font-size: 0.8rem; color: var(--muted); margin-top: 10px; }
`;
