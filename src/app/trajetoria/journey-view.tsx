"use client";

import { useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Page, PageTitle, Wrap, Section, SectionHead } from "@/components/ui/layout";
import Scramble from "@/components/ui/scramble";
import Tilt from "@/components/ui/tilt";
import CodeBlock, { type CodeLine } from "@/components/ui/code-block";
import { useLang } from "@/i18n/provider";
import { SKILL_GROUP_EN, localizeEducation, localizeExperience, localizeJourney } from "@/i18n/content";
import { ExperienceData, EducationData } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import { CAREER_SINCE, MOBILE_SINCE, STUDY_SINCE, contact, journey } from "@/data/profile";

const hash = (s: string) => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h.toString(16).padStart(8, "0").slice(0, 7);
};

type Branch = "study" | "web" | "mobile" | "main";
const branchOf = (year: string, kind: string): Branch => {
  const y = Number(year);
  if (!y) return "main";
  if (kind === "study") return "study";
  if (y < MOBILE_SINCE) return "web";
  if (y >= 2026) return "main";
  return "mobile";
};
const BRANCH_COLOR: Record<Branch, string> = { study: "var(--syn-n)", web: "var(--syn-f)", mobile: "var(--accent)", main: "var(--syn-k)" };

const Intro = styled.div`
  display: grid; grid-template-columns: minmax(0, 1fr) 260px; gap: 60px; align-items: end;
  @media (max-width: 860px) { grid-template-columns: 1fr; gap: 32px; }
  .cmd { margin-top: 22px; font-family: var(--font-mono); font-size: 0.9rem; color: var(--muted); }
  .cmd b { color: var(--accent); font-weight: 500; margin-right: 10px; }
  p { max-width: 38rem; margin-top: 22px; font-size: 1.15rem; line-height: 1.7; color: var(--muted); }
  p + p { margin-top: 14px; font-size: 1rem; }
  figure { margin: 0; }
  figure img { display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: center 18%; border-radius: 12px; border: 1px solid var(--line); box-shadow: 0 40px 80px -36px rgba(0,0,0,0.7); }
  @media (max-width: 860px) { figure { max-width: 230px; } }
`;

const Log = styled.div`
  position: relative; padding-left: 38px;
  .rail { position: absolute; left: 7px; top: 8px; bottom: 8px; width: 2px; background: var(--line); border-radius: 2px; }
  .rail i { position: absolute; inset: 0; transform-origin: top; background: var(--accent); border-radius: 2px; }
  .c { position: relative; padding: 0 0 38px; }
  .c::before { content: ""; position: absolute; left: -38px; top: 6px; width: 16px; height: 16px; border-radius: 50%; background: var(--paper); border: 2px solid var(--bc); box-shadow: 0 0 0 5px var(--paper); transition: background 0.25s ease, transform 0.25s ease; }
  .c:hover::before { background: var(--bc); transform: scale(1.2); }
  .h { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 12px; font-family: var(--font-mono); font-size: 0.78rem; }
  .h .hash { color: var(--syn-n); }
  .h .y { color: var(--muted); }
  .h .br { padding: 1px 9px; border: 1px solid var(--bc); border-radius: 99px; color: var(--bc); font-size: 0.7rem; }
  h3 { margin-top: 8px; font-size: clamp(1.4rem, 2.8vw, 2rem); font-weight: 600; letter-spacing: -0.03em; line-height: 1.15; }
  p { margin-top: 8px; max-width: 42rem; color: var(--muted); line-height: 1.65; }
`;

const Rows = styled.ol`
  list-style: none; border-top: 1px solid var(--line);
  li { display: grid; grid-template-columns: 190px minmax(0, 1fr); gap: 6px 32px; padding: 20px 0; border-bottom: 1px solid var(--line); transition: padding 0.3s cubic-bezier(.2,.7,.2,1); }
  li:hover { padding-left: 12px; }
  @media (max-width: 700px) { li { grid-template-columns: 1fr; } li:hover { padding-left: 0; } }
  .m { font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent); padding-top: 4px; }
  h4 { font-size: 1.15rem; font-weight: 600; letter-spacing: -0.02em; }
  .s { margin-top: 2px; color: var(--muted); }
`;

const Links = styled.div`
  display: flex; flex-wrap: wrap; gap: 10px;
  a { padding: 10px 18px; border: 1px solid var(--line); border-radius: 99px; font-family: var(--font-mono); font-size: 0.84rem; color: var(--muted); transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease; }
  a:hover { color: var(--accent); border-color: var(--accent); transform: translateY(-2px); }
`;

export default function JourneyView() {
  const { lang, t } = useLang();
  const j = t.journey;
  const reduce = useReducedMotion();
  const logRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: logRef, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });
  const line = j.intro.replace("{study}", String(STUDY_SINCE)).replace("{career}", String(CAREER_SINCE)).replace("{mobile}", String(MOBILE_SINCE));
  const timeline = localizeJourney(journey, lang);
  const jobs = localizeExperience(ExperienceData, lang);
  const edu = localizeEducation(EducationData, lang);

  const slug = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z]+/g, "_").replace(/^_|_$/g, "");
  const stackLines: CodeLine[] = [
    [["p", "{"]],
    ...skillGroups.map((g, gi): CodeLine => {
      const out: CodeLine = [["f", `  "${slug(lang === "en" ? SKILL_GROUP_EN[g.title] ?? g.title : g.title)}"`], ["p", ": ["]];
      g.items.forEach((it, i) => {
        out.push(["s", `"${it}"`]);
        if (i < g.items.length - 1) out.push(["p", ", "]);
      });
      out.push(["p", gi < skillGroups.length - 1 ? "]," : "]"]);
      return out;
    }),
    [["p", "}"]],
  ];

  return (
    <Wrap>
      <Page>
        <Intro>
          <div>
            <PageTitle>{j.title}</PageTitle>
            <div className="cmd"><b>$</b><Scramble text={j.cmd} /></div>
            <p>{line}</p>
            <p>{j.intro2}</p>
          </div>
          <Tilt max={8}>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/edson.webp" alt={j.portraitAlt} />
            </figure>
          </Tilt>
        </Intro>

        <Section>
          <SectionHead n="01" label={j.timeline} />
          <Log ref={logRef}>
            <div className="rail" aria-hidden><motion.i style={{ scaleY: reduce ? 1 : fill }} /></div>
            {timeline.map((i) => {
              const br = branchOf(i.year, i.kind);
              return (
                <motion.div
                  className="c"
                  key={i.year + i.title}
                  style={{ ["--bc" as string]: BRANCH_COLOR[br] }}
                  initial={reduce ? false : { opacity: 0, x: -22 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <div className="h">
                    <span className="hash">{hash(i.year + i.title)}</span>
                    <span className="y">{i.year}</span>
                    <span className="br">{j.branch[br]}</span>
                  </div>
                  <h3>{i.title}</h3>
                  <p>{i.text}</p>
                </motion.div>
              );
            })}
          </Log>
        </Section>

        <Section>
          <SectionHead n="02" label={j.jobs} />
          <Rows>
            {jobs.map((job) => (
              <li key={`${job.company}-${job.period}`}>
                <span className="m">{job.period}</span>
                <div>
                  <h4>{job.role}</h4>
                  <p className="s">{job.company}</p>
                </div>
              </li>
            ))}
          </Rows>
        </Section>

        <Section>
          <SectionHead n="03" label={j.education} />
          <Rows>
            {edu.map((e) => (
              <li key={e.course}>
                <span className="m">{e.period}</span>
                <div>
                  <h4>{e.course}</h4>
                  <p className="s">{e.institution}</p>
                </div>
              </li>
            ))}
          </Rows>
        </Section>

        <Section>
          <SectionHead n="04" label={j.stack} />
          <CodeBlock file="stack.json" lines={stackLines} />
        </Section>

        <Section>
          <SectionHead n="05" label={j.elsewhere} />
          <Links>
            <Link href="/home#contato">{j.contactCta} →</Link>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">linkedin</a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">github</a>
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer">instagram</a>
            <a href={contact.devto} target="_blank" rel="noopener noreferrer">dev.to</a>
          </Links>
        </Section>
      </Page>
    </Wrap>
  );
}
