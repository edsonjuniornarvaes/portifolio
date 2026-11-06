"use client";

import styled from "styled-components";
import { skillGroups } from "@/app/home/skills";
import { STUDY_SINCE } from "@/data/profile";
import { useLang } from "@/i18n/provider";
import { SKILL_GROUP_EN } from "@/i18n/content";

const Code = styled.pre`
  margin: 0; padding: 22px 24px; white-space: pre-wrap; overflow-wrap: anywhere;
  font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.85; color: var(--muted);
  .k { color: #7dd3fc; } .s { color: var(--accent-ink); } .p { color: var(--muted); }
`;

const slug = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");

/** Resumo de tecnologias em formato package.json. */
export default function PackageJson() {
  const { lang, t } = useLang();
  return (
    <Code aria-label={t.about.packageAria}>
      <span className="p">{"{"}</span>
      {"\n  "}
      <span className="k">&quot;name&quot;</span>: <span className="s">&quot;edson-junior&quot;</span>,
      {"\n  "}
      <span className="k">&quot;role&quot;</span>: <span className="s">&quot;mobile-engineer&quot;</span>,
      {"\n  "}
      <span className="k">&quot;studying-since&quot;</span>: <span className="s">{STUDY_SINCE}</span>,
      {"\n  "}
      <span className="k">&quot;stack&quot;</span>: <span className="p">{"{"}</span>
      {skillGroups.map((g, gi) => (
        <span key={g.title}>
          {"\n    "}
          <span className="k">&quot;{slug(lang === "en" ? SKILL_GROUP_EN[g.title] ?? g.title : g.title)}&quot;</span>: <span className="p">[</span>
          {g.items.map((it, i) => (
            <span key={it}>
              <span className="s">&quot;{it}&quot;</span>
              {i < g.items.length - 1 ? ", " : ""}
            </span>
          ))}
          <span className="p">]</span>
          {gi < skillGroups.length - 1 ? "," : ""}
        </span>
      ))}
      {"\n  "}
      <span className="p">{"}"}</span>
      {"\n"}
      <span className="p">{"}"}</span>
    </Code>
  );
}
