"use client";

import type { IconType } from "react-icons";
import styled from "styled-components";
import { FaBell, FaCogs } from "react-icons/fa";
import {
  SiReact, SiExpo, SiApple, SiAndroid, SiTypescript, SiJavascript, SiNextdotjs, SiNodedotjs,
  SiPhp, SiLaravel, SiRedux, SiMongodb, SiSupabase, SiJest, SiSentry, SiDatadog, SiMixpanel,
  SiKibana, SiBitrise, SiGithubactions, SiDocker, SiGit, SiAuth0, SiFigma,
} from "react-icons/si";

const GROUPS: { title: string; items: [IconType, string][] }[] = [
  { title: "Mobile", items: [[SiReact, "React Native"], [SiExpo, "Expo"], [SiApple, "iOS"], [SiAndroid, "Android"], [FaBell, "OneSignal"]] },
  { title: "Web", items: [[SiTypescript, "TypeScript"], [SiJavascript, "JavaScript"], [SiReact, "React.js"], [SiNextdotjs, "Next.js"], [SiNodedotjs, "Node.js"], [SiPhp, "PHP"], [SiLaravel, "Laravel"]] },
  { title: "Dados", items: [[SiRedux, "Redux"], [SiMongodb, "MongoDB"], [SiSupabase, "Supabase"]] },
  { title: "Qualidade", items: [[SiJest, "Jest"], [SiSentry, "Sentry"], [SiDatadog, "Datadog"], [SiMixpanel, "Mixpanel"], [SiKibana, "Kibana"]] },
  { title: "DevOps", items: [[SiBitrise, "Bitrise"], [FaCogs, "Harness"], [SiGithubactions, "GitHub Actions"], [SiDocker, "Docker"], [SiGit, "Git"]] },
  { title: "Produto", items: [[SiAuth0, "Auth0"], [SiFigma, "Figma"]] },
];

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  @media (max-width: 720px) { grid-template-columns: 1fr; gap: 10px; }
  .group { border: 1px solid var(--line); border-radius: 14px; padding: 14px 16px 16px; background: var(--card); }
  h3 {
    font-family: var(--font-mono); font-weight: 500; font-size: 0.7rem; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--muted); margin-bottom: 10px;
  }
  .items { display: flex; flex-wrap: wrap; gap: 6px; }
  .item {
    display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 999px;
    font-size: 0.8rem; color: var(--ink); border: 1px solid var(--line);
    background: color-mix(in srgb, var(--ink) 3%, transparent);
    transition: border-color 0.2s ease, color 0.2s ease;
  }
  .item svg { font-size: 0.9rem; color: var(--accent-ink); flex-shrink: 0; }
  .item:hover { border-color: var(--accent-ink); }
`;

/** Tecnologias agrupadas por categoria, com ícones. */
export default function StackGroups() {
  return (
    <Wrap>
      {GROUPS.map((g) => (
        <div className="group" key={g.title}>
          <h3>{g.title}</h3>
          <div className="items">
            {g.items.map(([Icon, label]) => (
              <span className="item" key={label}>
                <Icon /> {label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </Wrap>
  );
}
