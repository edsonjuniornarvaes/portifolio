"use client";

import Link from "next/link";
import styled from "styled-components";
import WebWire from "@/components/ui/web-wire";
import Phone from "@/components/ui/phone";
import TechIcons from "@/components/ui/tech-icons";
import { useLang } from "@/i18n/provider";
import { localizeProject } from "@/i18n/content";
import { getProjectById } from "@/app/projects/helper";
import { YEARS, appScreen, isWebId, projectColor } from "@/data/work";

const Card = styled(Link)`
  position: relative; display: flex; flex-direction: column; height: 100%; border: 1px solid var(--line); border-radius: 18px; overflow: hidden; background: var(--card);
  transition: transform 0.35s cubic-bezier(.2,.7,.2,1), border-color 0.3s ease, box-shadow 0.35s ease;
  &:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--pc) 70%, var(--line)); box-shadow: 0 30px 60px -30px color-mix(in srgb, var(--pc) 45%, #000); }
  &:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

  .vis { position: relative; height: 290px; overflow: hidden; display: flex; align-items: flex-end; justify-content: center; gap: 14px; padding: 0 20px;
    background: radial-gradient(70% 80% at 50% 105%, color-mix(in srgb, var(--pc) 38%, transparent), transparent 70%), color-mix(in srgb, var(--paper-2) 92%, var(--pc)); }
  .vis::before { content: ""; position: absolute; inset: 0; background-image: radial-gradient(color-mix(in srgb, var(--ink) 16%, transparent) 1px, transparent 1.2px); background-size: 18px 18px; -webkit-mask-image: linear-gradient(#000, transparent 80%); mask-image: linear-gradient(#000, transparent 80%); pointer-events: none; }
  .brand { position: absolute; left: 16px; top: 16px; z-index: 3; display: grid; place-items: center; width: 40px; height: 40px; border-radius: 11px; background: var(--pc); color: #fff; font-size: 0.86rem; font-weight: 700; box-shadow: 0 8px 20px -8px color-mix(in srgb, var(--pc) 70%, #000); }
  .ph { position: relative; z-index: 1; flex: none; transition: transform 0.45s cubic-bezier(.2,.7,.2,1); }
  .ph.a { margin-bottom: -70px; }
  .ph.b { margin-bottom: -120px; opacity: 0.96; }
  &:hover .ph.a { transform: translateY(-14px); }
  &:hover .ph.b { transform: translateY(-8px); }
  .lap { position: relative; z-index: 1; width: 82%; margin-bottom: -36px; transition: transform 0.45s cubic-bezier(.2,.7,.2,1); }
  &:hover .lap { transform: translateY(-12px); }
  .lid { padding: 2.4% 2.4% 0; border-radius: 12px 12px 4px 4px; background: linear-gradient(#3a3f48, #23262c); box-shadow: 0 0 0 1px rgba(255,255,255,0.1) inset, 0 24px 40px -18px rgba(0,0,0,0.6); }
  .scr { aspect-ratio: 16 / 10; border-radius: 4px 4px 0 0; overflow: hidden; background: #101214; }
  .scr img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
  .scr .w > div { border-radius: 0; border: 0; box-shadow: none; }
  .base { height: 11px; margin: 0 -4%; border-radius: 0 0 14px 14px; background: linear-gradient(#e0e3e8, #a3a9b2); }
  .letter { position: relative; z-index: 1; align-self: center; font-size: 4rem; font-weight: 700; letter-spacing: -0.05em; color: color-mix(in srgb, var(--pc) 80%, var(--ink)); }

  .body { display: flex; flex-direction: column; gap: 8px; padding: 20px 22px 22px; flex: 1; }
  .meta { display: flex; flex-wrap: wrap; gap: 4px 14px; font-size: 0.82rem; color: var(--muted); }
  .meta .k { color: var(--pc); font-weight: 600; }
  .meta .st::before { content: "●"; margin-right: 5px; color: var(--sc); }
  h3 { font-size: 1.45rem; font-weight: 600; letter-spacing: -0.03em; line-height: 1.12; }
  p { color: var(--muted); font-size: 0.92rem; line-height: 1.5; }
  .tags { margin-top: auto; padding-top: 10px; }
`;

// eslint-disable-next-line @next/next/no-img-element
const ShotImg = ({ src }: { src: string }) => <img src={src} alt="" loading="lazy" />;

const STATUS_COLOR = { production: "#2eebaa", development: "#ffcb6b", paused: "#8c95a3" } as const;

export default function ProjectCard({ id }: { id: string }) {
  const { lang, t } = useLang();
  const base = getProjectById(id);
  if (!base) return null;
  const p = localizeProject(base, lang);
  const web = isWebId(id);
  const color = projectColor(id);
  const shots = (base.screens ?? []).filter((u) => !/cover|board/.test(u));
  const first = shots[0] ?? appScreen(id);
  const second = web ? undefined : shots[1];
  const letter = p.iconLetter ?? p.title.slice(0, 2).toUpperCase();

  return (
    <Card href={`/projects/${id}`} style={{ ["--pc" as string]: color, ["--sc" as string]: STATUS_COLOR[p.status] }}>
      <div className="vis" aria-hidden>
        <span className="brand">{letter}</span>
        {web ? (
          <div className="lap">
            <div className="lid">
              <div className="scr">
                {first ? <ShotImg src={first} /> : <div className="w"><WebWire color={color} url={p.title} /></div>}
              </div>
            </div>
            <div className="base" />
          </div>
        ) : first ? (
          <>
            {second && <div className="ph b"><Phone screens={[second]} alt="" width={128} /></div>}
            <div className="ph a"><Phone screens={[first]} alt="" width={156} /></div>
          </>
        ) : (
          <span className="letter">{letter}</span>
        )}
      </div>
      <div className="body">
        <div className="meta">
          <span className="k">{web ? t.work.web : t.work.app}</span>
          {YEARS[id] && <span>{YEARS[id]}</span>}
          <span className="st">{t.status[p.status]}</span>
        </div>
        <h3>{p.title}</h3>
        <p>{p.tagline}</p>
        <div className="tags"><TechIcons tags={p.tags} max={5} /></div>
      </div>
    </Card>
  );
}
