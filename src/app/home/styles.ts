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


/* ============ Home: identidade "git" (mono + verde-menta) ============ */

export const HeroWrap = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: 48px;
  align-items: center;
  min-height: calc(100vh - 140px);
  padding: 40px 0 16px;
  @media (max-width: 960px) { grid-template-columns: 1fr; min-height: auto; padding-top: 12px; gap: 36px; }
`;

export const Caption = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 18px;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--muted);
  .hi { color: var(--accent-ink); }
  .status { display: inline-flex; align-items: center; gap: 8px; }
  .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: beat 2.2s ease-out infinite; }
  @keyframes beat { 0% { box-shadow: 0 0 0 0 var(--accent); } 80%, 100% { box-shadow: 0 0 0 8px transparent; } }
`;

export const Name = styled.h1`
  margin-top: 18px;
  font-size: clamp(2.8rem, 6vw, 4.4rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.045em;
`;

export const RoleLine = styled.h2`
  margin-top: 12px;
  font-size: clamp(1.2rem, 2.4vw, 1.55rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  background: var(--brand-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  width: fit-content;
`;

export const Desc = styled.p`
  margin-top: 18px;
  max-width: 33rem;
  font-size: 1.06rem;
  line-height: 1.75;
  color: var(--muted);
  b { color: var(--ink); font-weight: 500; }
`;

export const BtnMint = styled(Link)`
  display: inline-flex; align-items: center; gap: 8px; height: 46px; padding: 0 24px; border-radius: 12px;
  font-size: 0.95rem; font-weight: 600; color: var(--on-accent); background: var(--accent);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 10px 30px var(--glow), 0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent); }
`;

export const BtnLine = styled.a`
  display: inline-flex; align-items: center; gap: 8px; height: 46px; padding: 0 22px; border-radius: 12px;
  font-size: 0.95rem; font-weight: 500; color: var(--ink); border: 1px solid var(--line); background: transparent;
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  &:hover { transform: translateY(-2px); border-color: var(--accent-ink); color: var(--accent-ink); }
`;

export const Shortlog = styled.dl`
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: start;
  gap: 0 32px;
  margin-top: 34px;
  padding-top: 20px;
  border-top: 1px dashed var(--line);
  dt { font-family: var(--font-mono); font-size: 1.6rem; font-weight: 600; color: var(--ink); letter-spacing: -0.03em; }
  dt span { color: var(--accent-ink); }
  dd { font-size: 0.78rem; color: var(--muted); margin-top: 2px; }
  @media (max-width: 480px) { gap: 0 20px; }
`;

export const Window = styled.div`
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--card);
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35), 0 0 0 1px color-mix(in srgb, var(--accent) 6%, transparent);
`;

export const Head2 = styled.div`
  display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 10px 24px; margin-bottom: 32px;
  .tag { font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-ink); margin-bottom: 8px; display: block; }
  .tag::before { content: "## "; color: var(--muted); }
  h2 { font-size: clamp(1.9rem, 4vw, 2.7rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1.05; }
  p { color: var(--muted); margin-top: 10px; max-width: 32rem; }
`;

export const Block = styled.section`
  position: relative;
  margin-top: 96px;
  scroll-margin-top: 90px;
  @media (max-width: 700px) { margin-top: 80px; }
`;

/* ----- projetos (lista compacta, estilo lista de repositórios) ----- */
export const ProjList = styled.div`
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--card);
  overflow: hidden;
`;

export const ProjRow = styled(Link)`
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) auto 20px;
  align-items: center;
  gap: 16px;
  padding: 12px 18px;
  transition: background 0.2s ease;
  & + & { border-top: 1px solid var(--line); }
  &:hover { background: var(--paper-2); }
  &:hover h3 { color: var(--accent-ink); }
  &:hover .go { transform: translateX(4px); color: var(--accent-ink); }
  @media (max-width: 720px) { grid-template-columns: 52px minmax(0, 1fr) 16px; .side { display: none; } gap: 12px; padding: 12px 14px; }
  .lead { width: 64px; height: 44px; }
  @media (max-width: 720px) { .lead { width: 52px; height: 38px; } }
  .lead img { width: 100%; height: 100%; object-fit: cover; object-position: top; border-radius: 8px; border: 1px solid var(--line); display: block; }
  .lead span { width: 100%; height: 100%; border-radius: 8px; display: grid; place-items: center; font-weight: 700; font-size: 0.95rem; color: #fff; letter-spacing: -0.02em; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12); }
  h3 { font-size: 0.98rem; font-weight: 600; letter-spacing: -0.015em; transition: color 0.2s ease; }
  .main p { font-size: 0.86rem; color: var(--muted); margin-top: 1px; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
  .side { display: flex; align-items: center; gap: 14px; justify-content: flex-end; }
  .langs { display: flex; gap: 12px; font-family: var(--font-mono); font-size: 0.7rem; color: var(--muted); }
  .langs span { display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; }
  .langs span::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--c, var(--accent)); }
  @media (max-width: 1000px) { .langs { display: none; } }
  .go { color: var(--muted); transition: transform 0.2s ease, color 0.2s ease; text-align: right; }
`;

export const StatusTag = styled.span<{ $tone: "live" | "dev" | "done" }>`
  font-family: var(--font-mono); font-size: 0.68rem; padding: 3px 9px; border-radius: 999px; white-space: nowrap;
  color: ${(p) => (p.$tone === "live" ? "#4ade80" : p.$tone === "dev" ? "#fbbf24" : "var(--muted)")};
  border: 1px solid ${(p) => (p.$tone === "live" ? "rgba(74,222,128,0.35)" : p.$tone === "dev" ? "rgba(251,191,36,0.35)" : "var(--line)")};
`;

/* ----- histórico de commits (experiência) ----- */
export const Commits = styled.div`
  position: relative; padding-left: 34px;
  .rail { position: absolute; left: 7px; top: 10px; bottom: 10px; width: 2px; background: var(--line); border-radius: 2px; overflow: hidden; }
  .fill { position: absolute; inset: 0; background: var(--accent); transform-origin: top; }
  .commit { position: relative; margin-bottom: 14px; }
  .commit::before { content: ""; position: absolute; left: -34px; top: 26px; width: 16px; height: 16px; border-radius: 50%; background: var(--paper); border: 2px solid var(--accent); }
  .commit.head::before { background: var(--accent); box-shadow: 0 0 0 5px color-mix(in srgb, var(--accent) 20%, transparent); }
`;

export const CommitCard = styled.div`
  border: 1px solid var(--line); border-radius: 14px; background: var(--card); padding: 20px 22px;
  transition: border-color 0.25s ease;
  &:hover { border-color: color-mix(in srgb, var(--accent) 40%, var(--line)); }
  .meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 12px; font-family: var(--font-mono); font-size: 0.72rem; color: var(--muted); margin-bottom: 10px; }
  .hash { color: var(--accent-ink); }
  .ref { padding: 2px 8px; border-radius: 6px; border: 1px solid var(--line); }
  .ref.head { color: var(--on-accent); background: var(--accent); border-color: var(--accent); font-weight: 600; }
  .when { margin-left: auto; }
  h3 { font-size: 1.05rem; font-weight: 600; letter-spacing: -0.015em; }
  .company { font-size: 0.86rem; color: var(--muted); margin-top: 2px; }
  p { margin-top: 12px; font-size: 0.92rem; line-height: 1.65; color: var(--muted); }
`;

/* ----- package.json (stack) ----- */
export const CodeCard = styled.pre`
  margin: 0; padding: 22px 24px; white-space: pre-wrap; overflow-wrap: anywhere;
  font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.85; color: var(--muted);
  .k { color: #7dd3fc; } .s { color: var(--accent-ink); } .p { color: var(--muted); } .c { color: color-mix(in srgb, var(--muted) 70%, transparent); }
`;

/* ----- sobre ----- */
export const AboutGrid = styled.div`
  display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 20px; align-items: start;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
  .text { color: var(--muted); font-size: 1.02rem; line-height: 1.8; }
  .text p + p { margin-top: 1em; }
  .text b { color: var(--ink); font-weight: 500; }
  .now { margin-top: 26px; padding: 18px 20px; border: 1px dashed var(--line); border-radius: 14px; }
  .now small { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent-ink); }
  .now ul { list-style: none; display: grid; gap: 8px; margin-top: 10px; }
  .now li { font-size: 0.92rem; color: var(--muted); padding-left: 18px; position: relative; }
  .now li::before { content: "›"; position: absolute; left: 0; color: var(--accent-ink); }
  .now li b { color: var(--ink); font-weight: 500; }
`;

/* ----- blog e contato ----- */
export const BlogPanel = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--line); border-radius: 20px; overflow: hidden; background: var(--card);
  @media (max-width: 860px) { grid-template-columns: 1fr; }
  .left { padding: 36px; @media (max-width: 600px) { padding: 24px; } }
  .right { padding: 36px; display: grid; align-content: center; gap: 12px; border-left: 1px solid var(--line); @media (max-width: 860px) { border-left: 0; border-top: 1px solid var(--line); padding: 24px; } }
  h2 { font-size: clamp(1.6rem, 3.4vw, 2.2rem); font-weight: 700; letter-spacing: -0.035em; line-height: 1.1; }
  p { color: var(--muted); margin-top: 12px; line-height: 1.7; }
  .post { display: block; padding: 14px 16px; border: 1px solid var(--line); border-radius: 12px; transition: border-color 0.2s ease, transform 0.2s ease; }
  .post:hover { border-color: var(--accent-ink); transform: translateX(4px); }
  .post small { display: block; font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent-ink); margin-bottom: 4px; }
  .post strong { font-weight: 600; font-size: 0.95rem; line-height: 1.4; }
`;

export const ContactBox = styled.div`
  border: 1px solid color-mix(in srgb, var(--accent) 28%, var(--line)); border-radius: 20px; padding: 40px;
  background: radial-gradient(ellipse 60% 100% at 0% 0%, var(--glow), transparent 70%), var(--card);
  @media (max-width: 600px) { padding: 24px 20px; }
  .prompt { font-family: var(--font-mono); font-size: 0.85rem; color: var(--muted); }
  .prompt b { color: var(--accent-ink); font-weight: 500; }
  .mail { display: inline-block; margin-top: 14px; font-size: clamp(1.3rem, 4vw, 2.2rem); font-weight: 650; letter-spacing: -0.035em; word-break: break-word; background: var(--brand-gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
`;
