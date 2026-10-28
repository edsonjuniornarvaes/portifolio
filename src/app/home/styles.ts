import styled from "styled-components";
import Link from "next/link";

/* Primitivas da coluna de conteúdo (lado direito do shell). */

export const Page = styled.div`
  width: 100%;
`;

export const Section = styled.section`
  margin-bottom: 96px;
  scroll-margin-top: 72px;
  @media (max-width: 1023px) { margin-bottom: 64px; scroll-margin-top: 56px; }
`;

export const Label = styled.h2`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink);
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
  &::after { content: ""; flex: 1; height: 1px; background: var(--line); }
`;

export const Prose = styled.div`
  color: var(--muted);
  font-size: 1.02rem;
  line-height: 1.75;
  p + p { margin-top: 1em; }
  a, b, strong { color: var(--ink); font-weight: 500; }
  a { border-bottom: 1px solid var(--line); transition: color 0.2s ease, border-color 0.2s ease; }
  a:hover { color: var(--accent-ink); border-color: var(--accent-ink); }
  h1, h2, h3 { color: var(--ink); font-size: 1.05rem; margin: 1.4em 0 0.5em; font-weight: 600; }
  ul, ol { padding-left: 1.2em; margin-top: 0.8em; }
`;

export const Mono = styled.p`
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--muted);
  margin-top: 22px;
  em { font-style: normal; color: var(--accent-ink); }
`;

/* Lista com efeito de foco: ao passar o mouse, os outros itens apagam. */
export const Items = styled.ol`
  list-style: none;
  display: grid;
  gap: 12px;
  li { transition: opacity 0.25s ease; }
  &:hover li:not(:hover) { opacity: 0.5; }
  @media (hover: none) { &:hover li:not(:hover) { opacity: 1; } }
`;

export const Item = styled.li`
  position: relative;
  border-radius: 14px;
  &::before {
    content: "";
    position: absolute;
    inset: -12px -16px;
    border-radius: 16px;
    background: var(--card);
    border: 1px solid transparent;
    opacity: 0;
    transition: opacity 0.25s ease, border-color 0.25s ease;
    z-index: -1;
  }
  &:hover::before { opacity: 1; border-color: var(--line); }
  @media (max-width: 600px) { &::before { inset: -10px -10px; } }
`;

export const ExpGrid = styled.div`
  display: grid;
  grid-template-columns: 124px minmax(0, 1fr);
  gap: 6px 20px;
  padding: 12px 0;
  @media (max-width: 600px) { grid-template-columns: 1fr; padding: 10px 0; }
  .when { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); padding-top: 4px; }
  h3 { font-size: 1.02rem; font-weight: 550; letter-spacing: -0.01em; line-height: 1.4; }
  h3 span { color: var(--accent-ink); }
  .where { font-size: 0.84rem; color: var(--muted); margin-top: 2px; }
  p { margin-top: 10px; font-size: 0.92rem; line-height: 1.7; color: var(--muted); }
`;

export const ProjGrid = styled(Link)`
  display: grid;
  grid-template-columns: 128px minmax(0, 1fr);
  gap: 6px 20px;
  padding: 12px 0;
  @media (max-width: 600px) { grid-template-columns: 1fr; gap: 12px; }
  .thumb {
    height: 80px; border-radius: 8px; overflow: hidden; display: grid; place-items: center;
    border: 1px solid var(--line); font-weight: 650; font-size: 1.2rem; color: #fff; letter-spacing: -0.02em;
    background: radial-gradient(ellipse at 25% 0%, var(--c, #3f3f46), transparent 75%), var(--paper-2);
    transition: border-color 0.25s ease;
  }
  .thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  @media (max-width: 600px) { .thumb { height: 140px; } }
  h3 { font-size: 1.02rem; font-weight: 550; letter-spacing: -0.01em; line-height: 1.4; display: inline-flex; align-items: center; gap: 6px; }
  h3 .arrow { display: inline-block; transition: transform 0.25s ease; color: var(--muted); }
  &:hover h3 { color: var(--accent-ink); }
  &:hover h3 .arrow { transform: translate(3px, -3px); color: var(--accent-ink); }
  &:hover .thumb { border-color: color-mix(in srgb, var(--accent) 45%, var(--line)); }
  p { margin-top: 6px; font-size: 0.92rem; line-height: 1.7; color: var(--muted); }
  .status { font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted); letter-spacing: 0.04em; margin-left: 4px; }
`;

export const Tags = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
  li {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    padding: 4px 10px;
    border-radius: 999px;
    color: var(--accent-ink);
    background: color-mix(in srgb, var(--accent) 10%, transparent);
  }
`;

export const TextLink = styled(Link)`
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.92rem; font-weight: 500; color: var(--ink);
  border-bottom: 1px solid var(--line);
  padding-bottom: 2px;
  transition: color 0.2s ease, border-color 0.2s ease, gap 0.2s ease;
  &:hover { color: var(--accent-ink); border-color: var(--accent-ink); gap: 10px; }
`;

export const Big = styled.a`
  display: inline-block;
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  word-break: break-word;
  background: linear-gradient(var(--accent), var(--accent)) 0 100% / 100% 2px no-repeat;
  padding-bottom: 4px;
  transition: color 0.2s ease;
  &:hover { color: var(--accent-ink); }
`;

export const Row = styled.div`
  display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 22px;
`;

export const Pill = styled.a`
  display: inline-flex; align-items: center; gap: 8px;
  height: 36px; padding: 0 16px; border-radius: 999px;
  font-size: 0.84rem; font-weight: 500;
  border: 1px solid var(--line); color: var(--ink);
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  &:hover { border-color: var(--accent-ink); color: var(--accent-ink); transform: translateY(-2px); }
`;

/* Detalhe / arquivo */
export const Title = styled.h1`
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 650;
  letter-spacing: -0.04em;
  line-height: 1.08;
`;

export const Lead = styled.p`
  margin-top: 12px;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--muted);
  max-width: 36rem;
`;

export const Back = styled(Link)`
  display: inline-flex; align-items: center; gap: 8px; margin-bottom: 32px;
  font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted);
  transition: color 0.2s ease, gap 0.2s ease;
  &:hover { color: var(--accent-ink); gap: 12px; }
`;

export const Facts = styled.dl`
  display: grid;
  grid-template-columns: 124px minmax(0, 1fr);
  gap: 14px 20px;
  dt { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); padding-top: 4px; }
  dd { line-height: 1.65; color: var(--muted); }
  dd ul { list-style: none; display: grid; gap: 8px; }
  dd li { position: relative; padding-left: 18px; }
  dd li::before { content: "→"; position: absolute; left: 0; color: var(--accent-ink); }
  @media (max-width: 600px) { grid-template-columns: 1fr; gap: 4px; dd { margin-bottom: 16px; } }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th { text-align: left; font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); font-weight: 500; padding: 0 12px 12px 0; border-bottom: 1px solid var(--line); }
  td { padding: 14px 12px 14px 0; border-bottom: 1px solid var(--line); vertical-align: top; font-size: 0.92rem; color: var(--muted); }
  td.name { color: var(--ink); font-weight: 550; }
  td.name a:hover { color: var(--accent-ink); }
  td.tech { font-family: var(--font-mono); font-size: 0.72rem; }
  tr:last-child td { border-bottom: 0; }
  @media (max-width: 700px) { .hide-sm { display: none; } }
`;

export const Shots = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  img { width: 100%; border: 1px solid var(--line); border-radius: 10px; display: block; }
`;
