"use client";

import styled from "styled-components";
import type { IconType } from "react-icons";
import { SiAuth0, SiExpo, SiJavascript, SiJest, SiLaravel, SiMercadopago, SiMongodb, SiNextdotjs, SiPhp, SiReact, SiRedux, SiStyledcomponents, SiSupabase, SiTailwindcss, SiTypescript, SiVercel } from "react-icons/si";

const ICONS: Record<string, IconType> = {
  "React Native": SiReact,
  "React.js": SiReact,
  React: SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Redux: SiRedux,
  "Redux Saga": SiRedux,
  "Styled-components": SiStyledcomponents,
  PHP: SiPhp,
  Laravel: SiLaravel,
  Supabase: SiSupabase,
  "Next.js": SiNextdotjs,
  Vercel: SiVercel,
  Tailwind: SiTailwindcss,
  MongoDB: SiMongodb,
  "Mercado Pago": SiMercadopago,
  Jest: SiJest,
  Expo: SiExpo,
  Auth0: SiAuth0,
};

const Row = styled.ul<{ $labels?: boolean }>`
  && { display: flex; }
  display: flex; flex-wrap: wrap; gap: ${(p) => (p.$labels ? "8px" : "6px")}; margin: 0; padding: 0; list-style: none;
  li { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-width: 32px; height: 32px; padding: ${(p) => (p.$labels ? "0 12px 0 10px" : "0 8px")}; border: 1px solid var(--line); border-radius: 99px; color: var(--muted); font-size: 0.78rem; transition: color 0.2s ease, border-color 0.2s ease; }
  && li { width: auto; justify-content: center; }
  && li::before, && li::after { content: none; }
  li:hover { color: var(--accent); border-color: var(--accent); }
  li svg { width: 15px; height: 15px; flex: none; }
`;

/** Tecnologias como ícones (com o nome ao passar o mouse). Sem ícone conhecido, mostra o nome. */
export default function TechIcons({ tags, max = 5, labels = false }: { tags: string[]; max?: number; labels?: boolean }) {
  return (
    <Row $labels={labels} aria-label="Tecnologias">
      {tags.slice(0, max).map((tag) => {
        const Icon = ICONS[tag];
        return (
          <li key={tag} title={tag}>
            {Icon ? <Icon aria-hidden /> : null}
            {labels || !Icon ? <span>{tag}</span> : <span className="sr" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{tag}</span>}
          </li>
        );
      })}
    </Row>
  );
}
