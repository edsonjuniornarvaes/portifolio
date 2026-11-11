"use client";

import Link from "next/link";
import styled from "styled-components";
import WebWire from "@/components/ui/web-wire";
import { useLang } from "@/i18n/provider";
import { localizeProject } from "@/i18n/content";
import { getProjectById } from "@/app/projects/helper";
import { YEARS, appScreen, isWebId, projectColor } from "@/data/work";

const Card = styled(Link)`
  position: relative; display: flex; flex-direction: column; height: 100%; border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: var(--card);
  transition: transform 0.35s cubic-bezier(.2,.7,.2,1), border-color 0.3s ease, box-shadow 0.35s ease;
  &:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--pc) 70%, var(--line)); box-shadow: 0 30px 60px -30px color-mix(in srgb, var(--pc) 45%, #000); }
  &:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

  .vis { position: relative; height: 250px; overflow: hidden; display: flex; align-items: flex-end; justify-content: center; background: radial-gradient(circle at 50% 110%, color-mix(in srgb, var(--pc) 34%, transparent), transparent 62%), color-mix(in srgb, var(--paper-2) 90%, var(--pc)); }
  .vis::after { content: ""; position: absolute; inset: 0; background-image: linear-gradient(var(--line-2) 1px, transparent 1px), linear-gradient(90deg, var(--line-2) 1px, transparent 1px); background-size: 28px 28px; opacity: 0.8; pointer-events: none; }
  .mini { position: relative; z-index: 1; width: 132px; aspect-ratio: 560 / 1213; border-radius: 22px 22px 0 0; border: 4px solid #0b0c0e; border-bottom: 0; overflow: hidden; background: #fff; box-shadow: 0 -10px 50px -10px rgba(0,0,0,0.6); transform: translateY(14px); transition: transform 0.4s cubic-bezier(.2,.7,.2,1); }
  .mini img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
  &:hover .mini { transform: translateY(0); }
  .wire { position: relative; z-index: 1; width: 84%; margin-bottom: -26px; transition: transform 0.4s cubic-bezier(.2,.7,.2,1); }
  &:hover .wire { transform: translateY(-10px); }
  .letter { position: relative; z-index: 1; align-self: center; font-size: 4rem; font-weight: 700; letter-spacing: -0.05em; color: color-mix(in srgb, var(--pc) 80%, var(--ink)); }

  .body { display: flex; flex-direction: column; gap: 8px; padding: 18px 20px 22px; flex: 1; }
  .meta { display: flex; flex-wrap: wrap; gap: 4px 14px; font-family: var(--font-mono); font-size: 0.7rem; color: var(--muted); }
  .meta .k { color: var(--pc); }
  .meta .st::before { content: "●"; margin-right: 5px; color: var(--sc); }
  h3 { font-size: 1.45rem; font-weight: 600; letter-spacing: -0.03em; line-height: 1.12; }
  p { color: var(--muted); font-size: 0.92rem; line-height: 1.5; }
  .tags { margin-top: auto; padding-top: 6px; display: flex; flex-wrap: wrap; gap: 6px; }
  .tags span { padding: 3px 9px; border: 1px solid var(--line); border-radius: 5px; font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted); }
`;

const STATUS_COLOR = { production: "#2eebaa", development: "#ffcb6b", paused: "#8c95a3" } as const;

export default function ProjectCard({ id }: { id: string }) {
  const { lang, t } = useLang();
  const base = getProjectById(id);
  if (!base) return null;
  const p = localizeProject(base, lang);
  const web = isWebId(id);
  const color = projectColor(id);
  const shot = web ? undefined : appScreen(id);

  return (
    <Card href={`/projects/${id}`} style={{ ["--pc" as string]: color, ["--sc" as string]: STATUS_COLOR[p.status] }}>
      <div className="vis" aria-hidden>
        {web ? (
          <div className="wire"><WebWire color={color} url={`${id.replace(/-.*/, "")}.com`} /></div>
        ) : shot ? (
          <div className="mini">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shot} alt="" loading="lazy" />
          </div>
        ) : (
          <span className="letter">{p.iconLetter ?? p.title[0]}</span>
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
        <div className="tags">{p.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </Card>
  );
}
