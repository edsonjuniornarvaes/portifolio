import styled from "styled-components";
import Link from "next/link";

export const Hero = styled.section`
  position: relative;
  padding: 28px 0 32px;
  @media (max-width: 900px) { padding: 24px 0 28px; }
`;

export const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 48px;
  align-items: center;
  @media (max-width: 960px) { grid-template-columns: 1fr; gap: 32px; }
`;

export const Kick = styled.p`
  display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 0.74rem;
  letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent-ink);
  &::before { content: "01"; color: var(--accent-2); }
`;

export const BigName = styled.h1`
  font-family: var(--font-condensed);
  font-weight: 400;
  text-transform: uppercase;
  line-height: 0.92;
  letter-spacing: 0.01em;
  font-size: clamp(3rem, 8vw, 5.6rem);
  margin: 12px 0 6px;
  .l1 { display: block; color: var(--ink); }
  .l2 {
    display: block;
    background: var(--brand-gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 6px 24px var(--glow));
  }
`;

export const Script = styled.p`
  font-family: var(--font-script);
  font-weight: 700;
  font-size: clamp(1.7rem, 4vw, 2.6rem);
  line-height: 1.1;
  color: #f4e9c8;
  transform: rotate(-2deg);
  transform-origin: left;
  margin: 4px 0 16px;
  :root[data-theme="light"] & { color: #8a5a00; }
  span { color: var(--accent-2); }
`;

export const Intro = styled.p`
  max-width: 34rem; font-size: 1.04rem; line-height: 1.7; color: var(--muted);
  b { color: var(--ink); font-weight: 500; }
`;

export const Stats = styled.dl`
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px 24px; margin-top: 24px; padding-top: 16px; border-top: 1px dashed var(--line);
  dt { font-family: var(--font-condensed); font-size: 2.2rem; line-height: 1; letter-spacing: 0.01em; color: var(--ink); }
  dt span { color: var(--accent-ink); }
  dd { font-size: 0.74rem; color: var(--muted); margin-top: 4px; }
`;

export const ScrollCue = styled.div`
  display: grid; justify-items: center; margin-top: 40px; position: relative; z-index: 1;
  span { width: 0; height: 64px; border-left: 3px dashed var(--accent-2); opacity: 0.7; }
  svg { width: 34px; height: 34px; fill: var(--accent-ink); animation: bob 1.8s ease-in-out infinite; }
  @keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
  @media (prefers-reduced-motion: reduce) { svg { animation: none; } }
  @media (max-width: 900px) { display: none; }
`;

export const Band = styled.section`
  position: relative;
  margin: 0 -24px;
  padding: 80px 24px 96px;
  background:
    radial-gradient(circle at 1px 1px, rgba(0,0,0,0.28) 1.2px, transparent 1.6px) 0 0 / 6px 6px,
    linear-gradient(160deg, #0b3b3b 0%, #0e7490 38%, #2eebaa 100%);
  color: #fff;
  :root[data-theme="light"] & { background: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.12) 1.2px, transparent 1.6px) 0 0 / 6px 6px, linear-gradient(160deg, #bff5e3, #7dd3fc 60%, #34d399); color: #06231c; }
  @media (max-width: 700px) { margin: 0 -16px; padding: 64px 16px 72px; }
  .edge-top, .edge-bot { position: absolute; left: 0; right: 0; z-index: 2; }
  .edge-top { top: -34px; } .edge-bot { bottom: -34px; }
  .grid { position: relative; z-index: 3; max-width: 1160px; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 40px; align-items: center; }
  @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
  h2 { font-family: var(--font-script); font-weight: 700; font-size: clamp(3rem, 8vw, 5.4rem); line-height: 0.95; margin-bottom: 18px; color: #fff; text-shadow: 0 4px 30px rgba(0,0,0,0.25); :root[data-theme="light"] & { color: #06231c; text-shadow: none; } }
  p { font-size: 1.04rem; line-height: 1.8; max-width: 36rem; }
  p + p { margin-top: 1em; }
  p b { font-weight: 600; }
`;

export const Section = styled.section`
  position: relative;
  margin-top: 88px;
  scroll-margin-top: 90px;
  @media (max-width: 700px) { margin-top: 64px; }
`;

export const Heading = styled.div`
  margin-bottom: 26px;
  .tag { font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-ink); display: block; margin-bottom: 8px; }
  .tag::before { content: "// "; color: var(--muted); }
  h2 { font-family: var(--font-condensed); font-weight: 400; text-transform: uppercase; letter-spacing: 0.01em; line-height: 0.98; font-size: clamp(2rem, 4.4vw, 3.1rem); }
  p { color: var(--muted); max-width: 36rem; margin-top: 10px; }
`;

/* ---- Expertise (cartões com código) ---- */
export const Cards3 = styled.div`
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border: 2px solid var(--line);
  @media (max-width: 900px) { grid-template-columns: 1fr; }
  > div + div { border-left: 2px solid var(--line); @media (max-width: 900px) { border-left: 0; border-top: 2px solid var(--line); } }
  .card { padding: 30px 28px 34px; height: 100%; transition: background 0.25s ease; }
  .card:hover { background: color-mix(in srgb, var(--accent) 5%, transparent); }
  .top { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
  .top svg { font-size: 2.6rem; color: var(--ink); flex-shrink: 0; }
  h3 { font-size: 1.35rem; font-weight: 650; line-height: 1.2; letter-spacing: -0.02em; }
  h3 u { text-decoration: none; background: linear-gradient(var(--c, var(--accent)), var(--c, var(--accent))) 0 100% / 100% 4px no-repeat; padding-bottom: 2px; }
  .code { font-family: var(--font-mono); font-size: 0.86rem; line-height: 1.75; color: var(--muted); }
  .code .tg { opacity: 0.55; }
  .code .in { display: block; margin: 6px 0; padding-left: 18px; border-left: 2px solid var(--line); color: var(--ink); }
`;

/* ---- Projetos ---- */
export const Work = styled.div`
  display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 40px; align-items: center; margin-bottom: 56px;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 28px; }
  .txt p { color: var(--muted); line-height: 1.75; max-width: 30rem; }
  .feat small { display: block; font-family: var(--font-mono); font-size: 0.74rem; color: var(--accent-ink); margin-top: 22px; }
  .feat h3 { font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 700; letter-spacing: -0.03em; margin: 4px 0 14px; }
  .shot { aspect-ratio: 16 / 10; overflow: hidden; display: block; }
  .shot img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
  .shot .mock {
    width: 100%; height: 100%; display: grid; place-content: center; justify-items: center; gap: 10px; text-align: center;
    background:
      radial-gradient(circle at 1px 1px, rgba(0,0,0,0.25) 1px, transparent 1.4px) 0 0 / 5px 5px,
      radial-gradient(ellipse 90% 90% at 25% 0%, color-mix(in srgb, var(--c, #2eebaa) 80%, transparent), transparent 75%),
      var(--paper-2);
  }
  .shot .mock b { font-family: var(--font-condensed); font-weight: 400; font-size: 4.5rem; line-height: 1; color: #fff; text-shadow: 0 6px 26px rgba(0,0,0,0.4); }
  .shot .mock i { font-style: normal; font-family: var(--font-mono); font-size: 0.78rem; color: #fff; opacity: 0.85; }
`;

export const Cta = styled(Link)`
  display: inline-flex; align-items: center; gap: 8px; height: 46px; padding: 0 22px; font-family: var(--font-mono); font-size: 0.86rem;
  color: var(--on-accent); background: var(--accent); border: 2px solid var(--accent); transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover { transform: translate(-3px, -3px); box-shadow: 6px 6px 0 color-mix(in srgb, var(--accent-2) 70%, transparent); }
`;

export const Filters = styled.div`
  display: flex; flex-wrap: wrap; gap: 10px 22px; margin-bottom: 26px; font-family: var(--font-mono); font-size: 0.82rem; color: var(--muted);
  button { font: inherit; background: none; border: 0; color: inherit; cursor: pointer; padding: 2px 0; }
  button sup { font-size: 0.6rem; color: var(--accent-ink); margin-left: 2px; }
  button:hover { color: var(--ink); }
  button[aria-pressed="true"] { color: var(--accent-ink); border-bottom: 2px solid var(--accent-ink); }
  .lead { color: var(--ink); }
`;

export const WinGrid = styled.div`
  display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 30px 22px;
  @media (max-width: 1000px) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  @media (max-width: 720px) { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 14px; }
`;

export const WinCard = styled(Link)<{ $color?: string }>`
  position: relative;
  display: block;
  .cover {
    position: relative; aspect-ratio: 16 / 11; display: grid; place-items: center; overflow: hidden;
    background:
      radial-gradient(circle at 1px 1px, rgba(0,0,0,0.25) 1px, transparent 1.4px) 0 0 / 5px 5px,
      radial-gradient(ellipse 90% 90% at 25% 0%, color-mix(in srgb, ${(p) => p.$color ?? "#2eebaa"} 80%, transparent), transparent 75%),
      var(--paper-2);
  }
  .cover img { width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform 0.5s ease; }
  &:hover .cover img { transform: scale(1.05); }
  .letter { font-family: var(--font-condensed); font-size: 2.3rem; color: #fff; text-shadow: 0 6px 26px rgba(0,0,0,0.4); }

  /* efeito: no hover o quadro inclina e ganha a borda em degradê */
  &:hover .rv { transform: rotate(-3deg) translateY(-6px); box-shadow: 0 20px 44px var(--glow); }
  &:hover .rv::before { opacity: 1; }


  .cap { padding: 12px 2px 0; position: relative; }
  .cap strong { display: block; font-size: 0.94rem; font-weight: 650; letter-spacing: -0.015em; line-height: 1.25; }
  .cap span { display: block; margin-top: 3px; font-size: 0.76rem; line-height: 1.4; color: var(--muted); }
  .cap em { font-style: normal; font-family: var(--font-mono); font-size: 0.64rem; color: var(--st, var(--muted)); display: inline-block; margin-top: 4px; }
`;

/* ---- Escrita (lista no estilo Tania) ---- */
export const Writing = styled.div`
  .all { font-family: var(--font-mono); font-size: 0.8rem; border: 1px solid var(--line); border-radius: 6px; padding: 6px 12px; color: var(--ink); &:hover { border-color: var(--accent-ink); color: var(--accent-ink); } }
  ul { list-style: none; }
  li { border-top: 1px solid var(--line); }
  li:last-child { border-bottom: 1px solid var(--line); }
  a.post { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 4px 24px; padding: 18px 0; align-items: baseline; transition: padding 0.2s ease; }
  a.post:hover { padding-left: 10px; }
  a.post:hover h3 { color: var(--accent-ink); }
  h3 { font-size: 1.15rem; font-weight: 600; letter-spacing: -0.02em; transition: color 0.2s ease; }
  time { font-family: var(--font-mono); font-size: 0.74rem; color: var(--muted); white-space: nowrap; }
  p { grid-column: 1 / -1; color: var(--muted); font-size: 0.92rem; line-height: 1.55; max-width: 44rem; }
  .empty { color: var(--muted); padding: 18px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
`;

export const ContactWin = styled.div`
  padding: 44px 40px 48px; text-align: center;
  @media (max-width: 600px) { padding: 28px 18px 32px; }
  .prompt { font-family: var(--font-script); font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; color: #f4e9c8; transform: rotate(-2deg); :root[data-theme="light"] & { color: #8a5a00; } }
  .mail { display: inline-block; margin-top: 10px; font-family: var(--font-condensed); text-transform: uppercase; font-size: clamp(1.7rem, 6vw, 3.6rem); letter-spacing: 0.01em; word-break: break-word; background: var(--brand-gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .row { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 22px; }
  .row a { height: 40px; padding: 0 18px; display: inline-flex; align-items: center; font-family: var(--font-mono); font-size: 0.82rem; border: 2px solid var(--line); color: var(--ink); transition: all 0.2s ease; }
  .row a:hover { border-color: var(--accent-ink); color: var(--accent-ink); transform: translate(-2px, -2px); box-shadow: 4px 4px 0 color-mix(in srgb, var(--accent-2) 60%, transparent); }
`;

export const ContactRow = styled.div`
  display: flex; flex-wrap: wrap; gap: 10px;
  a.chip {
    display: inline-flex; align-items: center; gap: 9px; height: 44px; padding: 0 16px;
    border: 2px solid var(--line); font-family: var(--font-mono); font-size: 0.82rem; color: var(--ink);
    transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  }
  a.chip:hover { border-color: var(--accent-ink); color: var(--accent-ink); transform: translateY(-2px); }
`;

export const HeroDuo = styled.div`
  position: relative;
  min-height: 560px;
  .tv { position: absolute; left: 0; top: 4px; width: min(300px, 58%); }
  .phone { position: absolute; right: 0; bottom: 0; width: 300px; }
  @media (max-width: 960px) { min-height: 540px; max-width: 460px; margin: 0 auto; width: 100%; }
  @media (max-width: 520px) { min-height: 470px; .tv { width: 58%; } .phone { transform: scale(0.7); transform-origin: bottom right; } }
`;

export const ProjList = styled.ul`
  list-style: none; margin: 0; padding: 0;
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 40px;
  @media (max-width: 860px) { grid-template-columns: 1fr; }
`;

export const ProjRow = styled(Link)<{ $color?: string }>`
  display: grid; grid-template-columns: 44px minmax(0, 1fr); gap: 14px; align-items: start;
  padding: 18px 0; border-bottom: 1px solid var(--line); color: inherit;
  .mark {
    width: 44px; height: 44px; border-radius: 11px; display: grid; place-items: center;
    background: ${(p) => p.$color || "var(--accent)"}; color: #fff; font-family: var(--font-condensed); font-size: 1.05rem; letter-spacing: 0.02em;
  }
  .top { display: flex; align-items: baseline; flex-wrap: wrap; gap: 4px 10px; }
  h3 { font-size: 1rem; font-weight: 650; letter-spacing: -0.015em; transition: color 0.2s ease; }
  .st { font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted); }
  .st::before { content: "● "; color: var(--st, var(--muted)); }
  .sub { margin-top: 2px; font-size: 0.84rem; color: var(--ink); opacity: 0.85; }
  .desc { margin-top: 4px; font-size: 0.82rem; color: var(--muted); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .tags { margin-top: 8px; display: flex; flex-wrap: wrap; gap: 6px 14px; font-family: var(--font-mono); font-size: 0.7rem; color: var(--muted); }
  .tags span { display: inline-flex; align-items: center; gap: 5px; }
  &:hover h3 { color: var(--accent-ink); }
  &:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 4px; }
`;

export const HeroStage = styled.div`
  position: relative;
  z-index: 1;
  .inner { display: grid; grid-template-columns: minmax(0, 1fr) 360px; gap: 28px; align-items: center; padding: 40px 44px 44px; }
  .tv { display: grid; justify-items: center; padding-right: 6px; }
  @media (max-width: 1000px) { .inner { grid-template-columns: 1fr; padding: 28px 22px 36px; gap: 36px; } .tv { order: -1; } }
  @media (max-width: 600px) { .inner { padding: 22px 16px 28px; } }
`;
