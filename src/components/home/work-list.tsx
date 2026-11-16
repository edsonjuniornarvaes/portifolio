"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Phone from "@/components/ui/phone";
import WebWire from "@/components/ui/web-wire";
import { play } from "@/lib/sound";
import { useLang } from "@/i18n/provider";
import { localizeProject } from "@/i18n/content";
import { getProjectById } from "@/app/projects/helper";
import { SHOWCASE, isWebId, projectColor } from "@/data/work";

const List = styled.ol`
  list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--line);
  li { border-bottom: 1px solid var(--line); }
  a { position: relative; display: grid; grid-template-columns: 56px minmax(0, 1fr) auto 28px; align-items: baseline; gap: 20px; padding: 26px 4px; transition: padding 0.35s cubic-bezier(.2,.7,.2,1), color 0.25s ease; }
  a:hover, a:focus-visible { padding-left: 18px; }
  .i { font-family: var(--font-mono); font-size: 0.78rem; color: var(--muted); }
  .n { font-size: clamp(1.8rem, 4.6vw, 3.6rem); font-weight: 600; letter-spacing: -0.04em; line-height: 1.05; transition: color 0.25s ease; }
  a:hover .n, a:focus-visible .n { color: var(--c); }
  .m { font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); text-align: right; }
  .ar { color: var(--muted); transition: transform 0.3s ease, color 0.3s ease; }
  a:hover .ar { transform: translate(3px, -3px); color: var(--c); }
  @media (max-width: 700px) {
    a { grid-template-columns: 36px minmax(0, 1fr) 20px; gap: 12px; padding: 20px 2px; }
    .m { grid-column: 2; grid-row: 2; text-align: left; margin-top: 6px; }
    .ar { grid-column: 3; grid-row: 1; }
  }
`;

const Group = styled.div`
  & + & { margin-top: 56px; }
  .gh { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px; margin-bottom: 14px; }
  .gh b { font-family: var(--font-mono); font-size: 0.78rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); }
  .gh span { font-size: 0.95rem; color: var(--muted); }
`;

const Float = styled(motion.div)`
  position: fixed; left: 0; top: 0; z-index: 40; pointer-events: none; will-change: transform;
  .card { position: absolute; left: 110px; top: -120px; width: var(--pw, 150px); filter: drop-shadow(0 30px 40px rgba(0,0,0,0.5)); }
  @media (hover: none) { display: none; }
`;

const OWN = new Set(['clube-da-joia-marketplace', 'clube-da-joia-app']);

export default function WorkList() {
  const { lang, t } = useLang();
  const [hot, setHot] = useState<string | null>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 26 });
  const y = useSpring(my, { stiffness: 260, damping: 26 });
  const tilt = useTransform(x, (v) => Math.max(-14, Math.min(14, (v - mx.get()) * -0.6)));

  const items = [...SHOWCASE].sort((a, b) => Number(OWN.has(b.id)) - Number(OWN.has(a.id))).map((s) => {
    const base = getProjectById(s.id);
    return base ? { s, p: localizeProject(base, lang), web: isWebId(s.id) || !s.screen, color: projectColor(s.id) } : null;
  }).filter((v): v is NonNullable<typeof v> => !!v);
  const cur = items.find((it) => it.s.id === hot);

  return (
    <div onPointerMove={(e) => { mx.set(e.clientX); my.set(e.clientY); }} onPointerLeave={() => setHot(null)}>
      {[
        { key: "own", title: t.work.own, note: t.work.ownNote, list: items.filter((it) => OWN.has(it.s.id)) },
        { key: "job", title: t.work.job, note: t.work.jobNote, list: items.filter((it) => !OWN.has(it.s.id)) },
      ].map((g) => (
        <Group key={g.key}>
          <div className="gh"><b>{"// "}{g.title}</b><span>{g.note}</span></div>
          <List>
            {g.list.map((it) => {
              const i = items.indexOf(it);
              return (
                <li key={it.s.id}>
                  <Link
                    href={`/projects/${it.s.id}`}
                    style={{ ["--c" as string]: it.color }}
                    onPointerEnter={() => { setHot(it.s.id); play("hover", i); }}
                    onFocus={() => setHot(it.s.id)}
                    onBlur={() => setHot(null)}
                  >
                    <span className="i">{String(i + 1).padStart(2, "0")}</span>
                    <span className="n">{it.p.title}</span>
                    <span className="m">{it.web ? t.work.web : t.work.app} · {it.s.year}</span>
                    <span className="ar" aria-hidden>↗</span>
                  </Link>
                </li>
              );
            })}
          </List>
        </Group>
      ))}

      <Float style={{ x, y }} aria-hidden>
        <AnimatePresence mode="wait">
          {cur && (
            <motion.div
              key={cur.s.id}
              className="card"
              style={{ ["--pw" as string]: cur.web ? "280px" : "150px", rotate: tilt }}
              initial={{ opacity: 0, scale: 0.8, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
            >
              {cur.web ? <WebWire color={cur.color} url={cur.p.title} /> : <Phone screens={[cur.s.screen!]} alt="" width={150} />}
            </motion.div>
          )}
        </AnimatePresence>
      </Float>
    </div>
  );
}
