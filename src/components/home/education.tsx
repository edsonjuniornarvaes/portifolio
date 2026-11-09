"use client";

import styled from "styled-components";
import { FaGraduationCap } from "react-icons/fa";
import Reveal from "@/components/ui/reveal";
import { useLang } from "@/i18n/provider";
import { localizeEducation } from "@/i18n/content";
import { EducationData } from "@/app/about/helper";

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px;
  @media (max-width: 860px) { grid-template-columns: 1fr; }
  .card { height: 100%; padding: 20px; border-radius: 16px; border: 1px solid var(--line); background: var(--card); transition: border-color 0.25s ease, transform 0.25s ease; }
  .card:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--accent) 45%, var(--line)); }
  .ic { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; background: color-mix(in srgb, var(--accent) 12%, transparent); color: var(--accent-ink); }
  .period { margin-top: 14px; font-family: var(--font-mono); font-size: 0.74rem; color: var(--accent-ink); }
  h3 { margin-top: 6px; font-size: 1rem; font-weight: 650; letter-spacing: -0.015em; line-height: 1.35; }
  p { margin-top: 6px; font-size: 0.86rem; color: var(--muted); }
`;

export default function Education() {
  const { lang } = useLang();
  const list = localizeEducation(EducationData, lang);
  return (
    <Grid>
      {list.map((e, i) => (
        <Reveal key={e.course} delay={i * 70}>
          <div className="card" data-spot>
            <span className="ic"><FaGraduationCap size={18} /></span>
            <div className="period">{e.period}</div>
            <h3>{e.course}</h3>
            <p>{e.institution}</p>
          </div>
        </Reveal>
      ))}
    </Grid>
  );
}
