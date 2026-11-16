"use client";

import styled from "styled-components";
import { SiAuth0, SiBitrise, SiExpo, SiFigma, SiGit, SiJest, SiMongodb, SiNextdotjs, SiNodedotjs, SiReact, SiRedux, SiSentry, SiStyledcomponents, SiSupabase, SiTypescript, SiVercel } from "react-icons/si";
import type { IconType } from "react-icons";

const TOOLS: { name: string; Icon: IconType }[] = [
  { name: "React Native", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Expo", Icon: SiExpo },
  { name: "Supabase", Icon: SiSupabase },
  { name: "Auth0", Icon: SiAuth0 },
  { name: "Redux", Icon: SiRedux },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "styled-components", Icon: SiStyledcomponents },
  { name: "Jest", Icon: SiJest },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Bitrise", Icon: SiBitrise },
  { name: "Sentry", Icon: SiSentry },
  { name: "Figma", Icon: SiFigma },
  { name: "Git", Icon: SiGit },
  { name: "Vercel", Icon: SiVercel },
];

const Box = styled.div`
  margin-top: 56px; overflow: hidden; padding: 6px 0;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  .track { display: flex; width: max-content; gap: 14px; animation: tm 45s linear infinite; }
  &:hover .track { animation-play-state: paused; }
  .t { display: inline-flex; align-items: center; gap: 10px; padding: 9px 16px; border: 1px solid var(--line); border-radius: 99px; color: var(--muted); font-size: 0.88rem; white-space: nowrap; transition: color 0.2s ease, border-color 0.2s ease; }
  .t svg { width: 18px; height: 18px; flex: none; }
  .t:hover { color: var(--accent); border-color: var(--accent); }
  @keyframes tm { to { transform: translateX(-50%); } }
  @media (prefers-reduced-motion: reduce) { .track { animation: none; } overflow-x: auto; }
`;

/** Faixa pequena e contínua com os ícones das ferramentas. */
export default function ToolsMarquee() {
  const list = [...TOOLS, ...TOOLS];
  return (
    <Box aria-label="Ferramentas">
      <div className="track">
        {list.map(({ name, Icon }, i) => (
          <span className="t" key={`${name}-${i}`} aria-hidden={i >= TOOLS.length}><Icon aria-hidden /> {name}</span>
        ))}
      </div>
    </Box>
  );
}
