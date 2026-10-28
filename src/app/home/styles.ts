import styled from "styled-components";
import Link from "next/link";

/* Sistema compacto: Geist, 15px, cartões finos, um acento azul. */

export const Page = styled.div`
  max-width: 880px;
  margin: 0 auto;
  padding: 56px 24px 0;
  @media (max-width: 700px) { padding: 32px 16px 0; }
`;

export const Kicker = styled.p`
  font-size: 0.8rem;
  color: var(--muted);
  margin-bottom: 14px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 14px;
  .dot {
    display: inline-block; width: 7px; height: 7px; border-radius: 50%;
    background: #22c55e; margin-right: 7px; box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.18);
  }
`;

export const Greeting = styled.p`
  font-size: 1rem;
  color: var(--muted);
  margin-bottom: 2px;
`;

export const Role = styled.h2`
  font-size: clamp(1.1rem, 2.4vw, 1.4rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--accent);
  margin-top: 6px;
`;

export const Display = styled.h1`
  font-weight: 600;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  line-height: 1.12;
  letter-spacing: -0.035em;
  em { font-style: normal; color: var(--accent); }
`;

export const H2 = styled.h2`
  font-weight: 600;
  font-size: clamp(1.3rem, 2.6vw, 1.7rem);
  line-height: 1.2;
  letter-spacing: -0.025em;
  em { font-style: normal; color: var(--accent); }
`;

export const Lead = styled.p`
  font-size: 1.02rem;
  line-height: 1.7;
  max-width: 38rem;
  color: var(--muted);
  margin-top: 16px;
  a { color: var(--ink); text-decoration: underline; text-decoration-color: var(--line); text-underline-offset: 3px; transition: text-decoration-color 0.2s ease; }
  a:hover { text-decoration-color: var(--accent); }
  b { color: var(--ink); font-weight: 500; }
`;

export const Section = styled.section`
  margin-top: 72px;
  scroll-margin-top: 72px;
  @media (max-width: 700px) { margin-top: 56px; }
`;

export const Label = styled.h2`
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const Prose = styled.div`
  max-width: 38rem;
  color: var(--muted);
  p { margin-bottom: 0.9em; }
  p:last-child { margin-bottom: 0; }
  a { color: var(--ink); text-decoration: underline; text-decoration-color: var(--line); text-underline-offset: 3px; }
  a:hover { text-decoration-color: var(--accent); }
  strong { color: var(--ink); font-weight: 500; }
  h1, h2, h3 { color: var(--ink); font-size: 1rem; margin: 1.4em 0 0.5em; font-weight: 600; }
  ul, ol { padding-left: 1.2em; margin-bottom: 0.9em; }
`;

export const Actions = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; align-items: center;
`;

const btn = `
  display: inline-flex; align-items: center; gap: 8px;
  height: 36px; padding: 0 14px; border-radius: 8px;
  font-size: 0.88rem; font-weight: 500; line-height: 1;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
`;

export const Primary = styled(Link)`
  ${btn}
  background: var(--ink); color: var(--paper); border: 1px solid var(--ink);
  &:hover { opacity: 0.88; }
`;

export const Ghost = styled.a`
  ${btn}
  background: var(--card); color: var(--ink); border: 1px solid var(--line);
  &:hover { border-color: var(--muted); }
`;

export const IconLink = styled.a`
  width: 36px; height: 36px; border-radius: 8px; display: grid; place-items: center;
  color: var(--muted); border: 1px solid var(--line); background: var(--card);
  transition: color 0.15s ease, border-color 0.15s ease;
  &:hover { color: var(--ink); border-color: var(--muted); }
`;

/* Linhas (experiência, jornada, escrita) */
export const List = styled.ul`
  list-style: none;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--card);
  overflow: hidden;
`;

export const Row = styled.li`
  & + & { border-top: 1px solid var(--line); }
`;

const rowInner = `
  display: grid;
  grid-template-columns: 128px minmax(0, 1fr) auto;
  gap: 4px 20px;
  align-items: baseline;
  padding: 14px 18px;
  transition: background 0.15s ease;
  @media (max-width: 700px) { grid-template-columns: 1fr; padding: 14px; }
  .year { font-size: 0.8rem; color: var(--muted); font-variant-numeric: tabular-nums; font-family: var(--font-mono); }
  .name { font-size: 0.95rem; font-weight: 500; letter-spacing: -0.01em; }
  .what { display: block; color: var(--muted); font-size: 0.85rem; margin-top: 3px; line-height: 1.5; max-width: 36rem; }
  .meta { font-size: 0.78rem; color: var(--muted); text-align: right; font-family: var(--font-mono); @media (max-width: 700px) { text-align: left; } }
`;

export const RowLink = styled(Link)`
  ${rowInner}
  &:hover { background: var(--paper-2); }
  &:hover .name { color: var(--accent); }
`;

export const RowStatic = styled.div`
  ${rowInner}
`;

/* Cartões de projeto */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  align-items: start;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

export const Card = styled(Link)<{ $color?: string }>`
  display: flex; flex-direction: column;
  border: 1px solid var(--line); border-radius: 12px; background: var(--card);
  overflow: hidden;
  transition: border-color 0.2s ease, transform 0.2s ease;
  &:hover { border-color: var(--muted); transform: translateY(-2px); }
  .thumb {
    height: 64px; display: grid; place-items: center; overflow: hidden;
    background: linear-gradient(135deg, ${(p) => p.$color ?? "#71717a"}, color-mix(in srgb, ${(p) => p.$color ?? "#71717a"} 55%, #000));
    color: #fff; font-weight: 600; font-size: 1.4rem; letter-spacing: -0.02em;
  }
  .thumb:has(img) { height: auto; aspect-ratio: 16 / 9; }
  .thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .body { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
  .top { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
  h3 { font-size: 0.95rem; font-weight: 600; letter-spacing: -0.01em; }
  .status { font-size: 0.7rem; color: var(--muted); font-family: var(--font-mono); white-space: nowrap; }
  p { font-size: 0.85rem; color: var(--muted); line-height: 1.5; flex: 1; }
`;

export const Chips = styled.div`
  display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;
  span {
    font-size: 0.72rem; padding: 3px 8px; border-radius: 6px;
    color: var(--muted); background: var(--paper-2); border: 1px solid var(--line);
    font-family: var(--font-mono);
  }
`;

export const TextLink = styled(Link)`
  font-size: 0.85rem; font-weight: 500; color: var(--muted);
  &:hover { color: var(--accent); }
`;

export const Big = styled.a`
  display: inline-block;
  font-size: clamp(1.2rem, 3.4vw, 1.7rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  border-bottom: 2px solid var(--accent);
  padding-bottom: 2px;
  word-break: break-word;
  &:hover { color: var(--accent); }
`;

export const Plain = styled.p`
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--muted);
  b { color: var(--ink); font-weight: 500; }
  & + & { margin-top: 8px; }
`;

export const Photo = styled.figure`
  img { display: block; width: 100%; height: auto; border-radius: 12px; aspect-ratio: 1 / 1; object-fit: cover; object-position: top; border: 1px solid var(--line); }
  figcaption { font-size: 0.78rem; color: var(--muted); margin-top: 8px; }
`;

export const Panel = styled.div`
  border: 1px solid var(--line); border-radius: 12px; background: var(--card); padding: 24px;
`;
