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
  .row {
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr);
    gap: 14px 24px;
    align-items: center;
    padding: 22px 0;
    border-top: 1px solid var(--line);
  }
  .row:last-child { border-bottom: 1px solid var(--line); }
  @media (max-width: 720px) { .row { grid-template-columns: 1fr; padding: 18px 0; } }
  h3 {
    font-family: var(--font-condensed);
    font-weight: 400;
    font-size: clamp(1.7rem, 3.4vw, 2.4rem);
    letter-spacing: 0.02em;
    text-transform: uppercase;
    line-height: 1;
    color: var(--muted);
    transition: color 0.25s ease;
  }
  .row:hover h3 { color: var(--ink); }
  .items { display: flex; flex-wrap: wrap; gap: 12px 26px; }
  .item { display: inline-flex; align-items: center; gap: 10px; font-size: 1.02rem; color: var(--ink); transition: transform 0.2s ease, color 0.2s ease; }
  .item svg { font-size: 1.35rem; color: var(--accent-ink); }
  .item:hover { transform: translateY(-2px); color: var(--accent-ink); }
`;

/** Tecnologias agrupadas por categoria, com ícones. */
export default function StackGroups() {
  return (
    <Wrap>
      {GROUPS.map((g) => (
        <div className="row" key={g.title}>
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
