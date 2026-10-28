"use client";

import styled from "styled-components";
import {
  SiReact, SiTypescript, SiRedux, SiExpo, SiJest, SiNextdotjs, SiSupabase, SiSentry,
  SiDatadog, SiFigma, SiGit, SiMongodb, SiFirebase, SiAuth0, SiLaravel, SiJavascript,
} from "react-icons/si";

const items = [
  [SiReact, "React Native"], [SiTypescript, "TypeScript"], [SiRedux, "Redux"], [SiExpo, "Expo"],
  [SiJest, "Jest"], [SiNextdotjs, "Next.js"], [SiSupabase, "Supabase"], [SiSentry, "Sentry"],
  [SiDatadog, "Datadog"], [SiAuth0, "Auth0"], [SiMongodb, "MongoDB"], [SiFirebase, "Firebase"],
  [SiFigma, "Figma"], [SiGit, "Git"], [SiLaravel, "Laravel"], [SiJavascript, "JavaScript"],
] as const;

const Wrap = styled.div`
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  .track { display: flex; gap: 48px; width: max-content; animation: marquee 40s linear infinite; }
  &:hover .track { animation-play-state: paused; }
  .item { display: flex; align-items: center; gap: 10px; color: var(--text-muted); font-family: var(--font-mono); font-size: 0.9rem; white-space: nowrap; transition: color 0.2s ease; }
  .item:hover { color: var(--text-primary); }
  .item svg { font-size: 1.4rem; }
  @keyframes marquee { to { transform: translateX(-50%); } }
`;

export default function TechMarquee() {
  return (
    <Wrap aria-label="Tecnologias">
      <div className="track">
        {[...items, ...items].map(([Icon, label], i) => (
          <span className="item" key={i} aria-hidden={i >= items.length}>
            <Icon /> {label}
          </span>
        ))}
      </div>
    </Wrap>
  );
}
