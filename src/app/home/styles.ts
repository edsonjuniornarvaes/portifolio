import styled from "styled-components";
import Link from "next/link";

/* Sistema escuro moderno: Geist, 15px, cartões finos, acento verde-limão. */

export const Page = styled.div`
  position: relative;
  max-width: 1160px;
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
  background: var(--brand-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 4px;
  border-bottom: 2px solid var(--accent);
  transition: opacity 0.2s ease;
  &:hover { opacity: 0.8; }
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
    background: linear-gradient(160deg, var(--accent), var(--accent-2) 45%, var(--line) 80%);
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
  strong { display: block; font-size: 2.4rem; font-weight: 700; letter-spacing: -0.04em; line-height: 1; background: var(--brand-gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
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


/* ============ Home: hero, projetos, bento ============ */

export const Blob = styled.div<{ $top?: string; $left?: string; $right?: string; $size?: number }>`
  position: absolute;
  top: ${(p) => p.$top ?? "0"};
  ${(p) => (p.$left ? `left: ${p.$left};` : "")}
  ${(p) => (p.$right ? `right: ${p.$right};` : "")}
  width: ${(p) => p.$size ?? 620}px;
  height: ${(p) => p.$size ?? 620}px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--glow) 0%, transparent 68%);
  filter: blur(40px);
  pointer-events: none;
  z-index: -1;
`;

export const HeroGrid = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 40px;
  align-items: center;
  min-height: calc(100vh - 150px);
  padding: 32px 0 16px;
  @media (max-width: 920px) { grid-template-columns: 1fr; min-height: auto; padding-top: 8px; gap: 32px; }
`;

export const MonoPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--accent) 40%, var(--line));
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-ink);
  .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: ping 2.2s ease-out infinite; }
  @keyframes ping { 0% { box-shadow: 0 0 0 0 var(--accent); } 80%, 100% { box-shadow: 0 0 0 9px transparent; } }
`;

export const BigName = styled.h1`
  margin-top: 22px;
  font-size: clamp(3rem, 7.2vw, 5.4rem);
  font-weight: 750;
  line-height: 0.98;
  letter-spacing: -0.05em;
  .grad {
    display: inline-block;
    background: var(--brand-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const Underline = styled.span`
  display: block;
  width: min(100%, 380px);
  height: 3px;
  margin-top: 14px;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--accent), transparent);
`;

export const TypeLine = styled.p`
  margin-top: 22px;
  font-family: var(--font-mono);
  font-size: clamp(1.05rem, 2.2vw, 1.4rem);
  color: var(--accent-ink);
  min-height: 1.6em;
  &::before { content: ">_ "; opacity: 0.7; }
`;

export const HeroText = styled.p`
  margin-top: 18px;
  max-width: 34rem;
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--muted);
  b { color: var(--ink); font-weight: 500; }
`;

export const BtnGrad = styled(Link)`
  display: inline-flex; align-items: center; gap: 10px;
  height: 50px; padding: 0 28px; border-radius: 999px;
  font-size: 0.98rem; font-weight: 600; color: var(--on-accent);
  background: var(--brand-gradient);
  box-shadow: 0 10px 34px var(--glow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover { transform: translateY(-3px); box-shadow: 0 14px 44px var(--glow); }
`;

export const BtnGhost = styled.a`
  display: inline-flex; align-items: center; gap: 10px;
  height: 50px; padding: 0 26px; border-radius: 999px;
  font-size: 0.98rem; font-weight: 500; color: var(--ink);
  border: 1px solid var(--line); background: color-mix(in srgb, var(--paper-2) 70%, transparent);
  transition: transform 0.2s ease, border-color 0.2s ease;
  &:hover { transform: translateY(-3px); border-color: var(--accent-ink); }
`;

export const HeroFoot = styled.div`
  display: flex; flex-wrap: wrap; align-items: center; gap: 18px 22px; margin-top: 30px;
  .socials { display: flex; gap: 10px; }
  .socials a {
    width: 46px; height: 46px; border-radius: 50%; display: grid; place-items: center;
    color: var(--muted); border: 1px solid var(--line); background: color-mix(in srgb, var(--paper-2) 70%, transparent);
    transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }
  .socials a:hover { color: var(--accent-ink); border-color: var(--accent-ink); transform: translateY(-3px); }
  .sep { width: 1px; height: 28px; background: var(--line); }
  .stat { font-size: 0.82rem; color: var(--muted); }
  .stat b { font-size: 1.15rem; color: var(--ink); font-weight: 650; margin-right: 6px; }
`;

export const StripWrap = styled.div`
  margin: 56px -24px 0;
  padding: 18px 0;
  border-block: 1px solid var(--line);
  background: color-mix(in srgb, var(--paper-2) 50%, transparent);
`;

export const Eyebrow = styled.p`
  font-family: var(--font-mono);
  font-size: 0.74rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent-ink);
  margin-bottom: 10px;
`;

export const BigTitle = styled.h2`
  font-size: clamp(2rem, 4.4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.05;
  .grad { background: var(--brand-gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
`;

export const SectionHead = styled.div`
  display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 12px 24px;
  margin-bottom: 36px;
  p { color: var(--muted); max-width: 30rem; margin-top: 10px; }
`;

export const SectionBig = styled.section`
  position: relative;
  margin-top: 120px;
  scroll-margin-top: 90px;
  @media (max-width: 700px) { margin-top: 80px; }
`;

/* ----- capas de projeto ----- */
export const Cover = styled.div<{ $color?: string }>`
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  display: grid;
  place-items: center;
  background:
    radial-gradient(ellipse 80% 70% at 50% 0%, color-mix(in srgb, ${(p) => p.$color ?? "#8b5cf6"} 75%, transparent), transparent 75%),
    linear-gradient(180deg, color-mix(in srgb, ${(p) => p.$color ?? "#8b5cf6"} 22%, var(--paper-2)), var(--paper-2));
  .shot { width: 86%; border-radius: 10px 10px 0 0; align-self: end; border: 1px solid rgba(255,255,255,0.15); border-bottom: 0; box-shadow: 0 -10px 50px rgba(0,0,0,0.4); object-fit: cover; object-position: top; aspect-ratio: 16 / 9.2; transition: transform 0.6s ease; }
  .phone {
    position: relative; width: 34%; aspect-ratio: 9 / 18; align-self: end; margin-bottom: -14%;
    border-radius: 26px; border: 5px solid #15131f; background: linear-gradient(160deg, color-mix(in srgb, ${(p) => p.$color ?? "#8b5cf6"} 70%, #000), #0a0912);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.12);
    display: grid; place-items: center; color: #fff; font-weight: 750; font-size: 1.7rem; letter-spacing: -0.03em;
    transition: transform 0.6s ease;
  }
  .phone::before { content: ""; position: absolute; top: 6px; width: 34%; height: 5px; border-radius: 4px; background: #15131f; }
`;

export const ProjCard = styled(Link)`
  display: flex; flex-direction: column; height: 100%;
  border: 1px solid var(--line); border-radius: 22px; overflow: hidden;
  background: color-mix(in srgb, var(--card) 80%, transparent);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  &:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--accent) 50%, var(--line)); box-shadow: 0 24px 60px var(--glow); }
  &:hover .shot, &:hover .phone { transform: translateY(-6px) scale(1.02); }
  .body { padding: 20px 22px 22px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
  .top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  h3 { font-size: 1.15rem; font-weight: 650; letter-spacing: -0.02em; }
  .sub { font-size: 0.82rem; color: var(--muted); }
  p { font-size: 0.92rem; line-height: 1.6; color: var(--muted); flex: 1; }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
  .tags span { font-size: 0.72rem; padding: 4px 10px; border-radius: 999px; border: 1px solid var(--line); color: var(--muted); font-family: var(--font-mono); }
`;

export const Badge = styled.span<{ $tone?: "live" | "dev" | "done" }>`
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.7rem; font-weight: 600; padding: 4px 10px; border-radius: 999px; white-space: nowrap;
  color: ${(p) => (p.$tone === "live" ? "#4ade80" : p.$tone === "dev" ? "#fbbf24" : "var(--muted)")};
  background: ${(p) => (p.$tone === "live" ? "rgba(74,222,128,0.1)" : p.$tone === "dev" ? "rgba(251,191,36,0.1)" : "var(--paper-2)")};
  border: 1px solid ${(p) => (p.$tone === "live" ? "rgba(74,222,128,0.3)" : p.$tone === "dev" ? "rgba(251,191,36,0.3)" : "var(--line)")};
  &::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
`;

export const ProjGrid4 = styled.div`
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px;
  @media (max-width: 700px) { grid-template-columns: 1fr; }
`;

/* destaque alternado (cartão de vidro sobre a imagem) */
export const Feature = styled.article<{ $flip?: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  margin-bottom: 40px;
  > .media { grid-column: ${(p) => (p.$flip ? "1 / 9" : "5 / 13")}; grid-row: 1; border-radius: 22px; overflow: hidden; border: 1px solid var(--line); }
  > .glass {
    grid-column: ${(p) => (p.$flip ? "7 / 13" : "1 / 7")}; grid-row: 1; z-index: 2;
    padding: 28px 30px; border-radius: 22px;
    background: color-mix(in srgb, var(--paper) 74%, transparent);
    backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
    border: 1px solid color-mix(in srgb, var(--accent) 28%, var(--line));
    box-shadow: 0 24px 70px rgba(0,0,0,0.35);
  }
  .glass .kicker { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent-ink); }
  .glass h3 { font-size: clamp(1.4rem, 2.6vw, 1.9rem); font-weight: 700; letter-spacing: -0.03em; margin: 8px 0 10px; }
  .glass p { color: var(--muted); line-height: 1.7; font-size: 0.95rem; }
  .glass .tags { display: flex; flex-wrap: wrap; gap: 6px; margin: 16px 0 18px; }
  .glass .tags span { font-size: 0.72rem; padding: 4px 10px; border-radius: 999px; border: 1px solid var(--line); color: var(--muted); font-family: var(--font-mono); }
  .glass a { display: inline-flex; gap: 8px; font-weight: 600; font-size: 0.9rem; color: var(--accent-ink); }
  .glass a:hover { gap: 12px; }
  @media (max-width: 860px) {
    display: block;
    > .media { margin-bottom: -28px; }
    > .glass { position: relative; margin: 0 14px; }
  }
`;

/* ----- bento ----- */
export const BentoGrid = styled.div`
  display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px;
  @media (max-width: 860px) { grid-template-columns: 1fr; }
`;

export const Tile = styled.div<{ $span: number }>`
  grid-column: span ${(p) => p.$span};
  position: relative;
  border: 1px solid var(--line); border-radius: 22px; padding: 26px;
  background: color-mix(in srgb, var(--card) 80%, transparent);
  overflow: hidden;
  transition: border-color 0.3s ease;
  &:hover { border-color: color-mix(in srgb, var(--accent) 40%, var(--line)); }
  @media (max-width: 860px) { grid-column: auto; padding: 22px; }
  .eyebrow { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; display: block; }
  h3 { font-size: 1.3rem; font-weight: 650; letter-spacing: -0.025em; line-height: 1.25; }
  p { color: var(--muted); line-height: 1.7; font-size: 0.96rem; }
  p + p { margin-top: 0.8em; }
  p b { color: var(--ink); font-weight: 500; }
  ul { list-style: none; display: grid; gap: 10px; margin-top: 14px; }
  li { color: var(--muted); font-size: 0.94rem; display: flex; gap: 10px; align-items: baseline; }
  li::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex-shrink: 0; transform: translateY(-1px); }
  li b { color: var(--ink); font-weight: 500; }
  .huge { font-size: clamp(3.4rem, 7vw, 4.6rem); font-weight: 750; letter-spacing: -0.06em; line-height: 0.95; background: var(--brand-gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .years { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 18px; }
  .years span { font-family: var(--font-mono); font-size: 0.72rem; padding: 4px 10px; border-radius: 8px; background: var(--paper-2); color: var(--muted); border: 1px solid var(--line); }
  .years span.on { color: var(--accent-ink); border-color: color-mix(in srgb, var(--accent) 40%, var(--line)); }
  a.more { display: inline-flex; margin-top: 18px; font-weight: 600; font-size: 0.9rem; color: var(--accent-ink); gap: 8px; }
  a.more:hover { gap: 12px; }
`;

/* ----- blog ----- */
export const BlogPanel = styled.div`
  display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 0;
  border: 1px solid var(--line); border-radius: 28px; overflow: hidden;
  background: color-mix(in srgb, var(--card) 80%, transparent);
  @media (max-width: 860px) { grid-template-columns: 1fr; }
  .left { padding: 44px; @media (max-width: 600px) { padding: 28px; } }
  .right { padding: 44px; border-left: 1px solid var(--line); display: grid; align-content: center; gap: 14px; background: radial-gradient(ellipse at 70% 30%, var(--glow), transparent 70%); @media (max-width: 860px) { border-left: 0; border-top: 1px solid var(--line); padding: 28px; } }
  h2 { font-size: clamp(1.8rem, 3.6vw, 2.6rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1.1; }
  h2 .grad { background: var(--brand-gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  p { color: var(--muted); margin-top: 14px; line-height: 1.7; max-width: 30rem; }
  .post { display: block; padding: 16px 18px; border-radius: 16px; border: 1px solid var(--line); background: color-mix(in srgb, var(--paper) 70%, transparent); transition: border-color 0.2s ease, transform 0.2s ease; }
  .post:hover { border-color: var(--accent-ink); transform: translateX(4px); }
  .post small { display: block; font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent-ink); margin-bottom: 6px; }
  .post strong { font-weight: 600; font-size: 0.98rem; line-height: 1.4; display: block; }
`;

export const ContactCard = styled.div`
  position: relative; overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--accent) 30%, var(--line)); border-radius: 28px; padding: 56px 44px; text-align: center;
  background: radial-gradient(ellipse 70% 120% at 50% 0%, var(--glow), transparent 70%), color-mix(in srgb, var(--card) 80%, transparent);
  @media (max-width: 600px) { padding: 36px 20px; }
  h2 { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 700; letter-spacing: -0.04em; }
  .mail { display: inline-block; margin-top: 22px; font-size: clamp(1.2rem, 3.6vw, 1.9rem); font-weight: 600; letter-spacing: -0.03em; word-break: break-word; background: var(--brand-gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .row { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 26px; }
`;
