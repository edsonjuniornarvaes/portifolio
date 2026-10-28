import styled from "styled-components";
import Link from "next/link";

/* Sistema escuro moderno: Geist, 15px, cartões finos, acento verde-limão. */

export const Page = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  padding: 72px 24px 0;
  @media (max-width: 700px) { padding: 40px 16px 0; }
`;

export const Kicker = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 8px 14px;
  flex-wrap: wrap;
  font-size: 0.8rem;
  color: var(--muted);
  padding: 6px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: color-mix(in srgb, var(--paper-2) 60%, transparent);
  margin-bottom: 22px;
  .dot {
    display: inline-block; width: 7px; height: 7px; border-radius: 50%;
    background: var(--accent); margin-right: 8px; box-shadow: 0 0 0 0 var(--glow);
    animation: ping 2.2s ease-out infinite;
  }
  @keyframes ping { 0% { box-shadow: 0 0 0 0 var(--accent); } 80%, 100% { box-shadow: 0 0 0 8px transparent; } }
`;

export const Greeting = styled.p`
  font-size: 1rem;
  color: var(--muted);
  margin-bottom: 4px;
`;

export const Display = styled.h1`
  font-weight: 650;
  font-size: clamp(2.4rem, 5.6vw, 3.8rem);
  line-height: 1.04;
  letter-spacing: -0.045em;
  em { font-style: normal; color: var(--accent-ink); }
`;

export const Role = styled.h2`
  font-size: clamp(1.1rem, 2.2vw, 1.4rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--accent-ink);
  margin-top: 10px;
`;

export const H2 = styled.h2`
  font-weight: 600;
  font-size: clamp(1.3rem, 2.6vw, 1.7rem);
  line-height: 1.2;
  letter-spacing: -0.03em;
`;

export const Lead = styled.p`
  font-size: 1.02rem;
  line-height: 1.7;
  max-width: 36rem;
  color: var(--muted);
  margin-top: 18px;
  a { color: var(--ink); text-decoration: underline; text-decoration-color: var(--line); text-underline-offset: 3px; transition: text-decoration-color 0.2s ease; }
  a:hover { text-decoration-color: var(--accent); }
  b { color: var(--ink); font-weight: 500; }
`;

export const Section = styled.section`
  margin-top: 96px;
  scroll-margin-top: 88px;
  @media (max-width: 700px) { margin-top: 64px; }
`;

export const Label = styled.h2`
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  &::before { content: ""; width: 6px; height: 6px; border-radius: 2px; background: var(--accent); flex-shrink: 0; }
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
  display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; align-items: center;
`;

const btn = `
  display: inline-flex; align-items: center; gap: 8px;
  height: 40px; padding: 0 18px; border-radius: 999px;
  font-size: 0.88rem; font-weight: 550; line-height: 1;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
`;

export const Primary = styled(Link)`
  ${btn}
  background: var(--accent); color: var(--on-accent); border: 1px solid var(--accent);
  box-shadow: 0 0 0 0 var(--glow);
  &:hover { transform: translateY(-2px); box-shadow: 0 8px 28px var(--glow); }
`;

export const Ghost = styled.a`
  ${btn}
  background: transparent; color: var(--ink); border: 1px solid var(--line);
  &:hover { border-color: var(--muted); transform: translateY(-2px); background: var(--paper-2); }
`;

export const IconLink = styled.a`
  width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center;
  color: var(--muted); border: 1px solid var(--line); background: transparent;
  transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  &:hover { color: var(--accent-ink); border-color: var(--accent-ink); transform: translateY(-2px); }
`;

/* Linhas */
export const List = styled.ul`
  list-style: none;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--card);
  overflow: hidden;
`;

export const Row = styled.li`
  & + & { border-top: 1px solid var(--line); }
`;

const rowInner = `
  display: grid;
  grid-template-columns: 140px minmax(0, 1fr) auto;
  gap: 4px 20px;
  align-items: baseline;
  padding: 16px 20px;
  transition: background 0.2s ease;
  @media (max-width: 700px) { grid-template-columns: 1fr; padding: 14px 16px; }
  .year { font-size: 0.78rem; color: var(--muted); font-variant-numeric: tabular-nums; font-family: var(--font-mono); }
  .name { font-size: 0.95rem; font-weight: 550; letter-spacing: -0.01em; }
  .what { display: block; color: var(--muted); font-size: 0.85rem; margin-top: 3px; line-height: 1.55; max-width: 38rem; }
  .meta { font-size: 0.76rem; color: var(--muted); text-align: right; font-family: var(--font-mono); @media (max-width: 700px) { text-align: left; } }
`;

export const RowLink = styled(Link)`
  ${rowInner}
  &:hover { background: var(--paper-2); }
  &:hover .name { color: var(--accent-ink); }
`;

export const RowStatic = styled.div`
  ${rowInner}
`;

/* Cartões de projeto */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  align-items: start;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

export const Card = styled(Link)<{ $color?: string }>`
  display: flex; flex-direction: column; position: relative; z-index: 2;
  .thumb {
    height: 72px; display: grid; place-items: center; overflow: hidden;
    background:
      radial-gradient(ellipse at 20% 0%, color-mix(in srgb, ${(p) => p.$color ?? "#71717a"} 70%, transparent), transparent 70%),
      var(--paper-2);
    color: #fff; font-weight: 650; font-size: 1.3rem; letter-spacing: -0.02em;
  }
  .thumb:has(img) { height: auto; aspect-ratio: 16 / 9; border-bottom: 1px solid var(--line); }
  .thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform 0.6s ease; }
  &:hover .thumb img { transform: scale(1.04); }
  .body { padding: 16px 18px 18px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
  .top { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
  h3 { font-size: 0.98rem; font-weight: 600; letter-spacing: -0.015em; }
  .status { font-size: 0.7rem; color: var(--muted); font-family: var(--font-mono); white-space: nowrap; }
  p { font-size: 0.86rem; color: var(--muted); line-height: 1.55; flex: 1; }
`;

export const Chips = styled.div`
  display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;
  span {
    font-size: 0.72rem; padding: 3px 9px; border-radius: 999px;
    color: var(--muted); background: transparent; border: 1px solid var(--line);
    font-family: var(--font-mono);
  }
`;

export const TextLink = styled(Link)`
  font-size: 0.82rem; font-weight: 500; color: var(--muted); letter-spacing: 0;
  text-transform: none;
  &:hover { color: var(--accent-ink); }
`;

export const Big = styled.a`
  display: inline-block;
  font-size: clamp(1.3rem, 4vw, 2.2rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  word-break: break-word;
  background: linear-gradient(var(--accent), var(--accent)) 0 100% / 100% 2px no-repeat;
  padding-bottom: 4px;
  transition: color 0.2s ease;
  &:hover { color: var(--accent-ink); }
`;

export const Plain = styled.p`
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--muted);
  b { color: var(--ink); font-weight: 550; }
  & + & { margin-top: 8px; }
`;

export const Photo = styled.figure`
  img { display: block; width: 100%; height: auto; border-radius: 20px; aspect-ratio: 1 / 1; object-fit: cover; object-position: top; border: 1px solid var(--line); }
  figcaption { font-size: 0.78rem; color: var(--muted); margin-top: 8px; }
`;

export const Panel = styled.div`
  border: 1px solid var(--line); border-radius: 20px; background: var(--card); padding: 28px;
  @media (max-width: 600px) { padding: 20px; }
`;

/* ----- Hero ----- */
export const Hero = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 48px;
  align-items: center;
  @media (max-width: 860px) { grid-template-columns: 1fr; gap: 40px; }
`;

export const PhotoStage = styled.div`
  position: relative;
  max-width: 340px;
  margin-left: auto;
  @media (max-width: 860px) { margin: 0 auto 0 0; max-width: 300px; }
  .frame {
    position: relative; border-radius: 28px; padding: 1px; overflow: hidden;
    background: linear-gradient(160deg, color-mix(in srgb, var(--accent) 55%, transparent), var(--line) 40%, var(--line));
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
  }
  .frame img { display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: top; border-radius: 27px; }
  .float {
    position: absolute; padding: 8px 12px; border-radius: 12px; font-size: 0.78rem; font-weight: 500;
    background: color-mix(in srgb, var(--paper) 78%, transparent); backdrop-filter: blur(12px);
    border: 1px solid var(--line); display: flex; align-items: center; gap: 8px;
    animation: floaty 6s ease-in-out infinite;
    svg { color: var(--accent-ink); }
  }
  .float.a { top: 14%; left: -18%; }
  .float.b { bottom: 20%; right: -14%; animation-delay: -2s; }
  .float.c { bottom: -4%; left: 8%; animation-delay: -4s; }
  @media (max-width: 520px) { .float.a { left: -4%; } .float.b { right: -4%; } }
  @keyframes floaty { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
`;

/* ----- Números ----- */
export const Stats = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 72px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
  > div { padding: 22px 24px; }
  strong { display: block; font-size: 2.3rem; font-weight: 650; letter-spacing: -0.045em; line-height: 1; color: var(--ink); }
  strong span { color: var(--accent-ink); }
  small { display: block; margin-top: 8px; font-size: 0.82rem; color: var(--muted); }
`;

/* ----- Projetos (bento) ----- */
export const Bento = styled.div`
  display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px;
  @media (max-width: 760px) { grid-template-columns: 1fr; }
`;

export const BentoCell = styled.div<{ $span: number }>`
  grid-column: span ${(p) => p.$span};
  > div, > div > div { height: 100%; }
  a { height: 100%; }
  .thumb:not(:has(img)) { flex: 1; min-height: 72px; }
  @media (max-width: 760px) { grid-column: auto; }
`;

/* ----- Linha do tempo ----- */
export const Timeline = styled.div`
  position: relative; padding-left: 28px;
  .rail { position: absolute; left: 5px; top: 8px; bottom: 8px; width: 2px; background: var(--line); border-radius: 2px; overflow: hidden; }
  .fill { position: absolute; inset: 0; background: var(--accent); transform-origin: top; }
  .item { position: relative; margin-bottom: 14px; }
  .item::before {
    content: ""; position: absolute; left: -28px; top: 24px; width: 12px; height: 12px; border-radius: 50%;
    background: var(--paper); border: 2px solid var(--accent);
  }
`;

export const JobCard = styled.div`
  padding: 20px 22px;
  .head { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px 16px; }
  h3 { font-size: 0.98rem; font-weight: 600; letter-spacing: -0.015em; }
  .period { font-size: 0.76rem; color: var(--accent-ink); font-family: var(--font-mono); }
  .company { font-size: 0.84rem; color: var(--muted); margin-top: 3px; }
  p { font-size: 0.88rem; color: var(--muted); line-height: 1.6; margin-top: 12px; }
`;

/* ----- Stack ----- */
export const StackGrid = styled.div`
  display: grid; grid-template-columns: repeat(8, 1fr); gap: 12px;
  @media (max-width: 860px) { grid-template-columns: repeat(4, 1fr); }
  @media (max-width: 520px) { grid-template-columns: repeat(3, 1fr); }
`;

export const StackItem = styled.div`
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  padding: 18px 8px 14px; border-radius: 16px; border: 1px solid var(--line); background: var(--card);
  font-size: 0.76rem; color: var(--muted); text-align: center;
  transition: transform 0.25s ease, border-color 0.25s ease, color 0.25s ease;
  svg { font-size: 1.6rem; color: var(--ink); transition: color 0.25s ease; }
  &:hover { transform: translateY(-4px); border-color: color-mix(in srgb, var(--accent) 50%, var(--line)); color: var(--ink); }
  &:hover svg { color: var(--accent-ink); }
`;
