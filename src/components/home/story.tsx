"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import TechIcon from "@/components/ui/tech-icon";
import { useLang } from "@/i18n/provider";
import { localizeExperience, localizeProject } from "@/i18n/content";
import { getProjectById } from "@/app/projects/helper";
import { ExperienceData } from "@/app/about/helper";
import { JOB_STORY, OWN_STORY, type StoryItem } from "@/data/story";

const Wrap = styled.div`
  display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr); gap: 56px; align-items: start;
  @media (max-width: 960px) { grid-template-columns: 1fr; gap: 0; }

  .steps { position: relative; padding-left: 30px; }
  .steps::before { content: ""; position: absolute; left: 5px; top: 10px; bottom: 10px; width: 2px; background: var(--line); border-radius: 2px; }
  .steps .fill { position: absolute; left: 5px; top: 10px; width: 2px; border-radius: 2px; background: linear-gradient(180deg, var(--accent-2), var(--accent)); transition: height 0.5s cubic-bezier(.2,.7,.2,1); }

  .step { position: relative; display: flex; align-items: center; min-height: 52vh; padding: 14px 0; }
  .step:first-child { min-height: 0; padding-top: 0; }
  @media (max-width: 960px) { .step { min-height: 0; padding: 0 0 26px; display: block; } }
  .step::before {
    content: ""; position: absolute; left: -30px; top: 50%; width: 12px; height: 12px; margin-top: -6px; border-radius: 50%;
    background: var(--paper); border: 3px solid var(--line); transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
  }
  @media (max-width: 960px) { .step::before { top: 22px; margin-top: 0; } }
  .step[data-on="true"]::before { border-color: var(--accent); background: var(--accent); transform: scale(1.25); }

  .card { width: 100%; padding: 20px 22px; border-radius: 16px; border: 1px solid var(--line); background: var(--card); opacity: 0.55; transform: scale(0.985); transition: opacity 0.4s ease, transform 0.4s ease, border-color 0.3s ease; }
  .step[data-on="true"] .card { opacity: 1; transform: none; border-color: color-mix(in srgb, var(--accent) 45%, var(--line)); }
  @media (max-width: 960px) { .card { opacity: 1; transform: none; } }
  .when { font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-ink); }
  h3 { margin-top: 6px; font-size: 1.08rem; font-weight: 650; letter-spacing: -0.015em; }
  .company { margin-top: 2px; font-size: 0.84rem; color: var(--muted); }
  p { margin-top: 12px; font-size: 0.92rem; line-height: 1.65; color: var(--muted); }
  .chips { margin-top: 14px; display: flex; flex-wrap: wrap; gap: 6px 14px; font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted); }
  .chips span { display: inline-flex; align-items: center; gap: 5px; }

  .stage { position: sticky; top: 96px; height: min(560px, calc(100vh - 130px)); display: grid; place-items: center; }
  .inline { display: none; margin-top: 18px; }
  @media (max-width: 960px) { .stage { display: none; } .inline { display: block; } }
  .glow { position: absolute; width: 78%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--accent) 20%, transparent), transparent 68%); filter: blur(30px); pointer-events: none; }
  .names { position: absolute; left: 0; right: 0; bottom: 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 6px 8px; }
  .names a { padding: 5px 12px; border-radius: 999px; border: 1px solid var(--line); background: color-mix(in srgb, var(--paper) 80%, transparent); backdrop-filter: blur(8px); font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted); transition: color 0.2s ease, border-color 0.2s ease; }
  .names a:hover { color: var(--accent-ink); border-color: var(--accent-ink); }
`;

const Devices = styled.div<{ $compact?: boolean }>`
  position: relative; width: 100%; ${(p) => (p.$compact ? "" : "height: 100%;")}
  display: flex; align-items: ${(p) => (p.$compact ? "flex-start" : "center")}; justify-content: center; gap: ${(p) => (p.$compact ? "10px" : "16px")};
  ${(p) => (p.$compact ? "overflow-x: auto; padding: 4px 2px 10px; scrollbar-width: none; &::-webkit-scrollbar { display: none; }" : "padding-bottom: 38px;")}

  .ph { flex: 0 1 ${(p) => (p.$compact ? "120px" : "200px")}; min-width: ${(p) => (p.$compact ? "100px" : "0")}; display: block; }
  .ph .phone { border-radius: 26px; padding: 5px; background: #0b0c0e; border: 1px solid color-mix(in srgb, var(--ink) 20%, transparent); box-shadow: 0 26px 50px -22px rgba(0,0,0,0.6); transition: transform 0.35s cubic-bezier(.2,.7,.2,1), border-color 0.3s ease; }
  .ph:hover .phone { transform: translateY(-8px); border-color: color-mix(in srgb, var(--accent) 60%, transparent); }
  .ph .screen { border-radius: 21px; overflow: hidden; background: #fff; aspect-ratio: 560 / 1213; }
  .ph img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; }

  .webs { position: relative; width: 100%; max-width: 480px; height: ${(p) => (p.$compact ? "250px" : "400px")}; }
  .web { position: absolute; left: 0; right: 0; display: block; border-radius: 12px; overflow: hidden; background: var(--card); border: 1px solid color-mix(in srgb, var(--ink) 16%, transparent); box-shadow: 0 30px 60px -28px rgba(0,0,0,0.7); transition: transform 0.35s cubic-bezier(.2,.7,.2,1); }
  .web:hover { transform: translateY(-6px) !important; }
  .web .bar { display: flex; align-items: center; gap: 6px; padding: 8px 10px; background: color-mix(in srgb, var(--ink) 6%, var(--card)); border-bottom: 1px solid var(--line); }
  .web .bar i { width: 8px; height: 8px; border-radius: 50%; background: var(--line); }
  .web .bar i:nth-child(1) { background: #ff5f57; opacity: .85; }
  .web .bar i:nth-child(2) { background: #febc2e; opacity: .85; }
  .web .bar i:nth-child(3) { background: #28c840; opacity: .85; }
  .web .bar span { margin-left: 8px; flex: 1; padding: 3px 10px; border-radius: 6px; background: color-mix(in srgb, var(--ink) 7%, transparent); font-family: var(--font-mono); font-size: 0.62rem; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .web .body { height: ${(p) => (p.$compact ? "120px" : "190px")}; position: relative; overflow: hidden; }
  .web .body img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
  .web .art { position: absolute; inset: 0; display: grid; place-items: center; font-family: var(--font-condensed); font-size: 2.8rem; color: #fff; letter-spacing: 0.03em;
    background: radial-gradient(circle at 25% 20%, var(--c) 0%, transparent 62%), linear-gradient(140deg, color-mix(in srgb, var(--c) 28%, #0b0f12), #0b0f12 78%); }
  .mixed { position: relative; width: 100%; max-width: 470px; height: ${(p) => (p.$compact ? "250px" : "400px")}; }
  .mixed .web { left: 0; right: auto; width: 82%; top: 8%; }
  .mixed .ph { position: absolute; right: 0; bottom: 0; width: ${(p) => (p.$compact ? "92px" : "150px")}; }
`;

function Phone({ item }: { item: Extract<StoryItem, { kind: "phone" }> }) {
  return (
    <Link href={`/projects/${item.id}`} className="ph" aria-label={item.title}>
      <div className="phone">
        <div className="screen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.src} alt={item.title} loading="lazy" />
        </div>
      </div>
    </Link>
  );
}

function Web({ item, style }: { item: Extract<StoryItem, { kind: "web" }>; style?: React.CSSProperties }) {
  return (
    <Link href={`/projects/${item.id}`} className="web" aria-label={item.title} style={{ ["--c" as string]: item.color, ...style }}>
      <div className="bar">
        <i /><i /><i />
        <span>{item.title}</span>
      </div>
      <div className="body">
        {item.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.src} alt={item.title} loading="lazy" />
        ) : (
          <div className="art" aria-hidden>{item.letter}</div>
        )}
      </div>
    </Link>
  );
}

function DeviceSet({ items, compact = false }: { items: StoryItem[]; compact?: boolean }) {
  const reduce = useReducedMotion();
  const webs = items.filter((i): i is Extract<StoryItem, { kind: "web" }> => i.kind === "web");
  const phones = items.filter((i): i is Extract<StoryItem, { kind: "phone" }> => i.kind === "phone");
  const rise = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 36, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: reduce ? undefined : { opacity: 0, y: -18, scale: 0.97 },
    transition: { duration: 0.5, delay: i * 0.09, ease: [0.2, 0.7, 0.2, 1] as const },
  });

  if (webs.length && phones.length) {
    return (
      <Devices $compact={compact}>
        <div className="mixed">
          <motion.div {...rise(0)} style={{ position: "absolute", inset: 0 }}>
            <Web item={webs[0]} />
          </motion.div>
          <motion.div {...rise(1)} style={{ position: "absolute", right: 0, bottom: 0, width: compact ? 92 : 150 }}>
            <Phone item={phones[0]} />
          </motion.div>
        </div>
      </Devices>
    );
  }
  if (webs.length) {
    const step = compact ? 44 : 78;
    return (
      <Devices $compact={compact}>
        <div className="webs">
          {webs.map((w, i) => (
            <motion.div key={w.id} {...rise(i)} style={{ position: "absolute", inset: 0 }}>
              <Web item={w} style={{ top: i * step, left: `${i * 5}%`, right: `${(webs.length - 1 - i) * 5}%`, zIndex: i }} />
            </motion.div>
          ))}
        </div>
      </Devices>
    );
  }
  return (
    <Devices $compact={compact}>
      {phones.map((p, i) => (
        <motion.div key={`${p.src}`} {...rise(i)} style={{ flex: "0 1 auto", display: "contents" }}>
          <Phone item={p} />
        </motion.div>
      ))}
    </Devices>
  );
}

/** Experiência contada rolando: cada fase acende à esquerda e, à direita, aparecem os apps e sites dela. */
export default function Story() {
  const { lang, t } = useLang();
  const s = t.site;
  const jobs = localizeExperience(ExperienceData, lang);
  /** Projetos de uma fase, sem repetir: nomes (título do cartão) e uma linha de cada um. */
  const describe = (items: StoryItem[]) => {
    const seen = new Set<string>();
    const projects = items
      .filter((i) => !seen.has(i.id) && seen.add(i.id))
      .map((i) => getProjectById(i.id))
      .filter(Boolean)
      .map((p) => localizeProject(p!, lang));
    return { names: projects.map((p) => p.title).join(" · "), lines: projects.map((p) => p.tagline).join(" · ") };
  };
  const own = describe(OWN_STORY);
  const steps = [
    { when: s.ownPeriod, head: own.names, company: s.ownRole, text: s.ownText, skills: ["Next.js", "React Native", "Supabase"], items: OWN_STORY },
    ...jobs.map((j, i) => {
      const d = describe(JOB_STORY[i] ?? []);
      return { when: j.period, head: d.names || j.role, company: j.company, text: d.lines || j.description, skills: j.skills.slice(0, 5), items: JOB_STORY[i] ?? [] };
    }),
  ];
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const cur = steps[active] ?? steps[0];
  const seen = new Set<string>();
  const names = cur.items.filter((i) => !seen.has(i.id) && seen.add(i.id));

  return (
    <Wrap>
      <div className="steps">
        <div className="fill" style={{ height: `${(active / Math.max(1, steps.length - 1)) * 100}%` }} aria-hidden />
        {steps.map((st, i) => (
          <div key={`${st.company}-${st.when}`} className="step" data-i={i} data-on={i === active} ref={(el) => { refs.current[i] = el; }}>
            <div className="card" data-spot>
              <div className="when">{st.when}</div>
              <h3>{st.head}</h3>
              <div className="company">{st.company}</div>
              <p>{st.text}</p>
              <div className="chips">
                {st.skills.map((k) => (
                  <span key={k}>
                    <TechIcon name={k} size={11} />
                    {k}
                  </span>
                ))}
              </div>
              {st.items.length > 0 && (
                <div className="inline">
                  <DeviceSet items={st.items} compact />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="stage" aria-label={s.stageAria}>
        <div className="glow" aria-hidden />
        <AnimatePresence mode="wait">
          <motion.div key={active} style={{ position: "absolute", inset: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <DeviceSet items={cur.items} />
            <div className="names">
              {names.map((n) => (
                <Link key={n.id} href={`/projects/${n.id}`}>{n.title}</Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Wrap>
  );
}
