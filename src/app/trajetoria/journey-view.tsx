"use client";

import { useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Page, PageTitle, Wrap, Section, SectionHead } from "@/components/ui/layout";
import Tilt from "@/components/ui/tilt";
import { useLang } from "@/i18n/provider";
import { SKILL_GROUP_EN, localizeEducation, localizeExperience, localizeJourney } from "@/i18n/content";
import { ExperienceData, EducationData } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import { CAREER_SINCE, MOBILE_SINCE, STUDY_SINCE, contact, journey } from "@/data/profile";

const Intro = styled.div`
  display: grid; grid-template-columns: minmax(0, 1fr) 270px; gap: 64px; align-items: end;
  @media (max-width: 860px) { grid-template-columns: 1fr; gap: 32px; }
  p { max-width: 38rem; margin-top: 24px; font-size: 1.2rem; line-height: 1.65; color: var(--muted); }
  p + p { margin-top: 14px; font-size: 1.05rem; }
  figure { margin: 0; }
  figure img { display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: center 18%; border-radius: 20px; border: 1px solid var(--line); box-shadow: 0 40px 80px -36px rgba(0,0,0,0.7); }
  @media (max-width: 860px) { figure { max-width: 230px; } }
`;

const Line = styled.div`
  position: relative; padding-left: 42px;
  .rail { position: absolute; left: 7px; top: 10px; bottom: 10px; width: 2px; background: var(--line); border-radius: 2px; }
  .rail i { position: absolute; inset: 0; transform-origin: top; background: var(--accent); border-radius: 2px; }
  .c { position: relative; padding: 0 0 42px; }
  .c::before { content: ""; position: absolute; left: -42px; top: 8px; width: 16px; height: 16px; border-radius: 50%; background: var(--paper); border: 2px solid var(--accent); box-shadow: 0 0 0 6px var(--paper); transition: background 0.25s ease, transform 0.25s ease; }
  .c:hover::before { background: var(--accent); transform: scale(1.25); }
  .y { font-size: 0.95rem; font-weight: 600; color: var(--accent); }
  h3 { margin-top: 6px; font-size: clamp(1.45rem, 2.8vw, 2rem); font-weight: 600; letter-spacing: -0.03em; line-height: 1.15; }
  p { margin-top: 8px; max-width: 42rem; color: var(--muted); line-height: 1.65; }
`;

const Rows = styled.ol`
  list-style: none; border-top: 1px solid var(--line);
  li { display: grid; grid-template-columns: 200px minmax(0, 1fr); gap: 6px 32px; padding: 22px 0; border-bottom: 1px solid var(--line); transition: padding 0.3s cubic-bezier(.2,.7,.2,1); }
  li:hover { padding-left: 12px; }
  @media (max-width: 700px) { li { grid-template-columns: 1fr; } li:hover { padding-left: 0; } }
  .m { font-size: 0.95rem; color: var(--accent); padding-top: 3px; }
  h4 { font-size: 1.2rem; font-weight: 600; letter-spacing: -0.02em; }
  .s { margin-top: 2px; color: var(--muted); }
`;

const Tools = styled.dl`
  border-top: 1px solid var(--line);
  > div { display: grid; grid-template-columns: 240px minmax(0, 1fr); gap: 6px 32px; padding: 18px 0; border-bottom: 1px solid var(--line); }
  @media (max-width: 700px) { > div { grid-template-columns: 1fr; } }
  dt { font-weight: 600; }
  dd { color: var(--muted); line-height: 1.7; }
`;

const Links = styled.div`
  display: flex; flex-wrap: wrap; gap: 10px;
  a { padding: 11px 22px; border: 1px solid var(--line); border-radius: 99px; font-size: 0.95rem; color: var(--muted); transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease; }
  a:hover { color: var(--accent); border-color: var(--accent); transform: translateY(-2px); }
`;

export default function JourneyView() {
  const { lang, t } = useLang();
  const j = t.journey;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });
  const line = j.intro.replace("{study}", String(STUDY_SINCE)).replace("{career}", String(CAREER_SINCE)).replace("{mobile}", String(MOBILE_SINCE));
  const timeline = localizeJourney(journey, lang);
  const jobs = localizeExperience(ExperienceData, lang);
  const edu = localizeEducation(EducationData, lang);

  return (
    <Wrap>
      <Page>
        <Intro>
          <div>
            <PageTitle>{j.title}</PageTitle>
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
          <Line ref={ref}>
            <div className="rail" aria-hidden><motion.i style={{ scaleY: reduce ? 1 : fill }} /></div>
            {timeline.map((i) => (
              <motion.div
                className="c"
                key={i.year + i.title}
                initial={reduce ? false : { opacity: 0, x: -22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <div className="y">{i.year}</div>
                <h3>{i.title}</h3>
                <p>{i.text}</p>
              </motion.div>
            ))}
          </Line>
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
          <Tools>
            {skillGroups.map((g) => (
              <div key={g.title}>
                <dt>{lang === "en" ? SKILL_GROUP_EN[g.title] ?? g.title : g.title}</dt>
                <dd>{g.items.join(", ")}</dd>
              </div>
            ))}
          </Tools>
        </Section>

        <Section>
          <SectionHead n="05" label={j.elsewhere} />
          <Links>
            <Link href="/home#contato">{j.contactCta} →</Link>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={contact.devto} target="_blank" rel="noopener noreferrer">Dev.to</a>
          </Links>
        </Section>
      </Page>
    </Wrap>
  );
}
