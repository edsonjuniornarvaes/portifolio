import styled, { keyframes } from "styled-components";
import Link from "next/link";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

export const Page = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 56px 24px 96px;
  @media (max-width: 768px) { padding: 28px 16px 64px; }
`;

export const Section = styled.section`
  margin-top: 112px;
  @media (max-width: 768px) { margin-top: 80px; }
`;

export const Eyebrow = styled.span`
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-secondary);
  margin-bottom: 12px;
  &::before { content: "// "; color: var(--text-muted); }
`;

export const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 12px;
`;

export const SectionLead = styled.p`
  color: var(--text-secondary);
  max-width: 40rem;
  line-height: 1.65;
  margin-bottom: 40px;
`;

/* ---------- Hero ---------- */
export const Hero = styled.section`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 56px;
  align-items: center;
  min-height: 72vh;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; min-height: auto; }
`;

export const Status = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
  &::before {
    content: "";
    width: 8px; height: 8px; border-radius: 50%;
    background: #34d399;
    box-shadow: 0 0 10px #34d399;
    animation: pulse 2s ease infinite;
  }
`;

export const Title = styled.h1`
  font-size: clamp(2.6rem, 7vw, 4.8rem);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.02;
  margin-bottom: 20px;
`;

export const TypeLine = styled.p`
  font-family: var(--font-mono);
  font-size: clamp(0.95rem, 2vw, 1.15rem);
  color: var(--text-secondary);
  min-height: 3.2em;
  margin-bottom: 20px;
  &::before { content: "> "; color: var(--accent-primary); }
`;

export const Lead = styled.p`
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 34rem;
  margin-bottom: 32px;
`;

export const Actions = styled.div`
  display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 28px;
`;

const buttonBase = `
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 24px; border-radius: 12px;
  font-weight: 600; font-size: 0.95rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  &:hover { transform: translateY(-2px); }
`;

export const Primary = styled(Link)`
  ${buttonBase}
  color: #fff;
  background: var(--accent-gradient);
  box-shadow: 0 8px 30px rgba(139, 92, 246, 0.35);
  &:hover { box-shadow: 0 12px 40px rgba(139, 92, 246, 0.5); }
`;

export const Ghost = styled.a`
  ${buttonBase}
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  &:hover { border-color: var(--border-hover); }
`;

export const Socials = styled.div`
  display: flex; gap: 12px;
  a {
    width: 44px; height: 44px; border-radius: 12px;
    display: grid; place-items: center;
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
    background: var(--bg-card);
    transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
    &:hover { color: var(--accent-primary); border-color: var(--border-hover); transform: translateY(-2px); }
  }
`;

export const Terminal = styled.div`
  border-radius: 18px;
  border: 1px solid var(--border-color);
  background: rgba(14, 14, 22, 0.8);
  backdrop-filter: blur(12px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5), var(--glow-primary);
  overflow: hidden;
  animation: ${float} 7s ease-in-out infinite;
`;

export const TerminalBar = styled.div`
  display: flex; align-items: center; gap: 7px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
  span { width: 11px; height: 11px; border-radius: 50%; }
  span:nth-child(1) { background: #ff5f57; }
  span:nth-child(2) { background: #febc2e; }
  span:nth-child(3) { background: #28c840; }
  em { margin-left: 10px; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); font-style: normal; }
`;

export const Code = styled.pre`
  padding: 20px 22px 24px;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  line-height: 1.75;
  color: var(--text-secondary);
  overflow-x: auto;
  .k { color: #c4b5fd; }
  .s { color: #67e8f9; }
  .p { color: #f9a8d4; }
  .c { color: var(--text-muted); }
`;

/* ---------- Stats ---------- */
export const Stats = styled.div`
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
  margin-top: 72px;
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
`;

export const Stat = styled.div`
  padding: 24px; border-radius: 16px;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  strong {
    display: block; font-size: 2.2rem; font-weight: 800; letter-spacing: -0.03em;
    background: var(--accent-gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }
  span { font-size: 0.85rem; color: var(--text-secondary); }
`;

/* ---------- Skills ---------- */
export const SkillGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
  @media (max-width: 960px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

export const SkillCard = styled.div`
  padding: 24px; border-radius: 16px;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  transition: border-color 0.25s ease, transform 0.25s ease, background 0.25s ease;
  &:hover { border-color: var(--border-hover); transform: translateY(-4px); background: var(--bg-card-hover); }
  h3 { font-size: 1rem; margin-bottom: 14px; }
`;

export const Chips = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px;
  span {
    font-family: var(--font-mono); font-size: 0.74rem;
    padding: 5px 10px; border-radius: 8px;
    color: var(--text-secondary);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border-color);
  }
`;

/* ---------- Timeline ---------- */
export const Timeline = styled.ol`
  list-style: none;
  position: relative;
  padding-left: 32px;
  &::before {
    content: ""; position: absolute; left: 7px; top: 8px; bottom: 8px; width: 2px;
    background: linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary), transparent);
  }
`;

export const TimelineItem = styled.li`
  position: relative;
  margin-bottom: 20px;
  padding: 24px; border-radius: 16px;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  &::before {
    content: ""; position: absolute; left: -32px; top: 28px;
    width: 16px; height: 16px; border-radius: 50%;
    background: var(--bg-primary); border: 3px solid var(--accent-primary);
    box-shadow: 0 0 14px rgba(139, 92, 246, 0.6);
  }
  header { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px 16px; margin-bottom: 4px; }
  h3 { font-size: 1.1rem; }
  .period { font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-secondary); }
  .company { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 12px; }
  p { color: var(--text-secondary); line-height: 1.65; font-size: 0.92rem; margin-bottom: 14px; }
  ul { list-style: none; display: grid; gap: 6px; margin-bottom: 16px; }
  li { color: var(--text-secondary); font-size: 0.88rem; padding-left: 18px; position: relative; }
  li::before { content: "→"; position: absolute; left: 0; color: var(--accent-primary); }
`;

/* ---------- Projects ---------- */
export const ProjectGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
  @media (max-width: 960px) { grid-template-columns: 1fr; }
`;

export const ProjectCard = styled(Link)`
  display: flex; flex-direction: column; gap: 14px;
  padding: 28px; border-radius: 20px;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  &:hover { transform: translateY(-6px); border-color: var(--border-hover); box-shadow: var(--glow-primary); }
  .badge {
    width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center;
    font-weight: 800; font-size: 1.3rem; color: #fff; background: var(--accent-gradient);
    overflow: hidden;
  }
  .badge img { width: 100%; height: 100%; object-fit: cover; }
  h3 { font-size: 1.2rem; }
  p { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; flex: 1; }
  .more { color: var(--accent-secondary); font-size: 0.85rem; font-weight: 600; }
`;

/* ---------- Contact ---------- */
export const Cta = styled.section`
  margin-top: 120px; text-align: center;
  padding: 64px 24px; border-radius: 28px;
  border: 1px solid var(--border-hover);
  background:
    radial-gradient(ellipse 70% 100% at 50% 0%, rgba(139, 92, 246, 0.22), transparent),
    var(--bg-card);
  h2 { font-size: clamp(1.8rem, 4.5vw, 3rem); font-weight: 800; letter-spacing: -0.03em; margin-bottom: 14px; }
  p { color: var(--text-secondary); max-width: 32rem; margin: 0 auto 28px; line-height: 1.65; }
  ${Actions} { justify-content: center; margin-bottom: 0; }
`;

/* ---------- Blog (mantido) ---------- */
export const BlogRow = styled.div`
  display: flex; gap: 20px; overflow-x: auto; padding-bottom: 12px; scroll-snap-type: x mandatory;
`;

export const BlogCard = styled(Link)`
  flex: 0 0 min(300px, 82vw); scroll-snap-align: start;
  border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden;
  background: var(--bg-card);
  transition: transform 0.25s ease, border-color 0.25s ease;
  &:hover { transform: translateY(-4px); border-color: var(--border-hover); }
  .cover { aspect-ratio: 16 / 9; background: var(--accent-gradient); opacity: 0.9; }
  .cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .body { padding: 16px 18px 20px; }
  time { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; }
  h3 { font-size: 1rem; margin: 6px 0; }
  p { font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
`;

export const TextLink = styled(Link)`
  color: var(--accent-secondary); font-weight: 600; font-size: 0.9rem;
  &:hover { text-decoration: underline; }
`;

export const Marquee = styled.div`
  margin-top: 72px; overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  div { display: flex; gap: 40px; width: max-content; animation: marquee 32s linear infinite; }
  span { font-family: var(--font-mono); font-size: 0.95rem; color: var(--text-muted); white-space: nowrap; }
  @keyframes marquee { to { transform: translateX(-50%); } }
`;

/* ---------- Bento ---------- */
export const Bento = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

export const BentoCell = styled.div<{ $span?: number }>`
  grid-column: span ${(p) => p.$span ?? 2};
  > div { height: 100%; padding: 28px; }
  h3 { font-size: 0.8rem; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-secondary); margin-bottom: 14px; font-weight: 500; }
  p { color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem; }
  p + p { margin-top: 12px; }
  .big { font-size: 2.6rem; font-weight: 800; letter-spacing: -0.04em; line-height: 1; color: var(--text-primary); margin-bottom: 8px; }
  ul { list-style: none; display: grid; gap: 10px; }
  li { color: var(--text-secondary); font-size: 0.9rem; padding-left: 18px; position: relative; line-height: 1.5; }
  li::before { content: "→"; position: absolute; left: 0; color: var(--accent-primary); }
  @media (max-width: 900px) { grid-column: span ${(p) => (p.$span && p.$span >= 4 ? 2 : 1)}; }
  @media (max-width: 560px) { grid-column: span 1; }
`;

/* ---------- Estudos de caso ---------- */
export const CaseList = styled.div`
  display: grid; gap: 20px;
`;

export const CaseCard = styled.div<{ $color: string }>`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 36px;
  padding: 36px;
  border-left: 4px solid ${(p) => p.$color};
  @media (max-width: 860px) { grid-template-columns: 1fr; gap: 24px; padding: 24px; }
  .tag { font-family: var(--font-mono); font-size: 0.74rem; color: ${(p) => p.$color}; text-transform: uppercase; letter-spacing: 0.06em; }
  h3 { font-size: clamp(1.5rem, 3vw, 2rem); letter-spacing: -0.03em; margin: 8px 0 6px; }
  .period { font-size: 0.82rem; color: var(--text-muted); font-family: var(--font-mono); margin-bottom: 16px; }
  .summary { color: var(--text-primary); line-height: 1.65; margin-bottom: 12px; }
  .role { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 20px; }
  .side h4 { font-size: 0.78rem; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 14px; font-weight: 500; }
  .side ul { list-style: none; display: grid; gap: 12px; margin-bottom: 20px; }
  .side li { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.55; padding-left: 20px; position: relative; }
  .side li::before { content: ""; position: absolute; left: 0; top: 0.5em; width: 8px; height: 8px; border-radius: 2px; background: ${(p) => p.$color}; }
  .link { display: inline-block; margin-top: 18px; color: var(--text-primary); font-weight: 600; font-size: 0.9rem; border-bottom: 1px solid ${(p) => p.$color}; padding-bottom: 2px; }
  .link:hover { color: ${(p) => p.$color}; }
`;

/* ---------- Jornada ---------- */
export const Journey = styled.ol`
  list-style: none;
  display: grid; gap: 0;
  position: relative;
  &::before { content: ""; position: absolute; left: 87px; top: 8px; bottom: 8px; width: 2px; background: var(--border-color); }
  @media (max-width: 600px) { &::before { left: 65px; } }
`;

export const JourneyItem = styled.li<{ $kind: "study" | "work" | "build" }>`
  display: grid; grid-template-columns: 72px 1fr; gap: 0 32px;
  padding-bottom: 28px; position: relative;
  @media (max-width: 600px) { grid-template-columns: 52px 1fr; gap: 0 28px; }
  .year { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); text-align: right; font-size: 0.95rem; padding-top: 2px; }
  &::before {
    content: ""; position: absolute; left: 78px; top: 6px; width: 14px; height: 14px; border-radius: 50%;
    background: var(--bg-primary);
    border: 3px solid ${(p) => (p.$kind === "study" ? "var(--accent-warm)" : p.$kind === "build" ? "var(--accent-secondary)" : "var(--accent-primary)")};
    @media (max-width: 600px) { left: 56px; }
  }
  h3 { font-size: 1.05rem; margin-bottom: 4px; }
  p { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; max-width: 40rem; }
`;

export const Legend = styled.div`
  display: flex; flex-wrap: wrap; gap: 18px; margin-bottom: 28px;
  font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-mono);
  span::before { content: ""; display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 8px; background: var(--c); }
`;

export const Pill = styled.span`
  display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 0.78rem; font-family: var(--font-mono);
  color: var(--accent-secondary); border: 1px solid var(--border-hover); background: rgba(139, 92, 246, 0.08);
`;
