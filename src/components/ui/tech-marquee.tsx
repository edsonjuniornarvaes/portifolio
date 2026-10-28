"use client";

import styled from "styled-components";
import {
  SiReact, SiTypescript, SiRedux, SiExpo, SiJest, SiNextdotjs, SiSupabase, SiSentry,
  SiDatadog, SiFigma, SiGit, SiMongodb, SiFirebase, SiAuth0, SiLaravel, SiJavascript,
} from "react-icons/si";

export const techItems = [
  [SiReact, "React Native"], [SiTypescript, "TypeScript"], [SiRedux, "Redux"], [SiExpo, "Expo"],
  [SiJest, "Jest"], [SiNextdotjs, "Next.js"], [SiSupabase, "Supabase"], [SiSentry, "Sentry"],
  [SiDatadog, "Datadog"], [SiAuth0, "Auth0"], [SiMongodb, "MongoDB"], [SiFirebase, "Firebase"],
  [SiFigma, "Figma"], [SiGit, "Git"], [SiLaravel, "Laravel"], [SiJavascript, "JavaScript"],
] as const;

const Wrap = styled.div`
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  .track { display: flex; gap: 44px; width: max-content; animation: marquee 45s linear infinite; }
  &:hover .track { animation-play-state: paused; }
  .item { display: flex; align-items: center; gap: 9px; color: var(--muted); font-size: 0.88rem; white-space: nowrap; transition: color 0.2s ease; }
  .item:hover { color: var(--ink); }
  .item svg { font-size: 1.25rem; }
  @keyframes marquee { to { transform: translateX(-50%); } }
`;

export default function TechMarquee() {
  return (
    <Wrap aria-label="Tecnologias">
      <div className="track">
        {[...techItems, ...techItems].map(([Icon, label], i) => (
          <span className="item" key={i} aria-hidden={i >= techItems.length}>
            <Icon /> {label}
          </span>
        ))}
      </div>
    </Wrap>
  );
}
