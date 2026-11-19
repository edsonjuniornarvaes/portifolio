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
import { BRAND_ICON, ADMIN_BRAND } from "@/data/brands";
import AdminShot from "@/components/ui/admin-shot";

const Card = styled(Link)`
  position: relative; display: flex; flex-direction: column; height: 100%; border: 1px solid var(--line); border-radius: 18px; overflow: hidden; background: var(--card);
  transition: transform 0.35s cubic-bezier(.2,.7,.2,1), border-color 0.3s ease, box-shadow 0.35s ease;
  &:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--pc) 70%, var(--line)); box-shadow: 0 30px 60px -30px color-mix(in srgb, var(--pc) 45%, #000); }
  &:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

  .vis { position: relative; height: 290px; overflow: hidden; display: flex; align-items: flex-end; justify-content: center; gap: 14px; padding: 0 20px;
    background: radial-gradient(70% 80% at 50% 105%, color-mix(in srgb, var(--pc) 38%, transparent), transparent 70%), color-mix(in srgb, var(--paper-2) 92%, var(--pc)); }
  .vis::before { content: ""; position: absolute; inset: 0; background-image: radial-gradient(color-mix(in srgb, var(--ink) 16%, transparent) 1px, transparent 1.2px); background-size: 18px 18px; -webkit-mask-image: linear-gradient(#000, transparent 80%); mask-image: linear-gradient(#000, transparent 80%); pointer-events: none; }
  .brand { position: absolute; left: 16px; top: 16px; z-index: 3; display: grid; place-items: center; width: 40px; height: 40px; border-radius: 11px; background: var(--pc); color: var(--on-accent); font-size: 0.86rem; font-weight: 700; box-shadow: 0 8px 20px -8px color-mix(in srgb, var(--pc) 70%, #000); }
  .brand[data-img="true"] { background: none; overflow: hidden; }
  .brand img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .ph { position: relative; z-index: 1; flex: none; transform-style: preserve-3d; transform: perspective(800px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); transition: transform 0.45s cubic-bezier(.2,.7,.2,1); }
  .ph.a { margin-bottom: -70px; }
  .ph.b { margin-bottom: -120px; opacity: 0.96; }
  &:hover .ph.a { transform: perspective(800px) translateY(-14px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); }
  &:hover .ph.b { transform: perspective(800px) translateY(-8px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); }
  .lap { position: relative; z-index: 1; width: 82%; margin-bottom: -36px; transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); transition: transform 0.45s cubic-bezier(.2,.7,.2,1); }
  &:hover .lap { transform: perspective(1000px) translateY(-12px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); }
  /* a tela rola sozinha enquanto o mouse está em cima, como se alguém estivesse usando */
  .ph .screen img { object-position: 50% 0%; transition: object-position 0.6s ease; }
  .scr img { object-position: 50% 0%; transition: object-position 0.6s ease; }
  &:hover .ph .screen img { object-position: 50% 100%; transition: object-position 4.5s cubic-bezier(.45,.05,.3,1); }
  &:hover .scr img { object-position: 50% 100%; transition: object-position 4.5s cubic-bezier(.45,.05,.3,1); }
  .sheen { position: absolute; inset: 0; z-index: 2; pointer-events: none; background: radial-gradient(260px circle at var(--mx, 50%) var(--my, 40%), color-mix(in srgb, var(--pc) 28%, transparent), transparent 70%); opacity: 0; transition: opacity 0.3s ease; }
  &:hover .sheen { opacity: 1; }
  .lid { padding: 2.4% 2.4% 0; border-radius: 12px 12px 4px 4px; background: linear-gradient(#3a3f48, #23262c); box-shadow: 0 0 0 1px rgba(255,255,255,0.1) inset, 0 24px 40px -18px rgba(0,0,0,0.6); }
  .scr { aspect-ratio: 16 / 10; border-radius: 4px 4px 0 0; overflow: hidden; background: #101214; }
  .scr img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .scr .w > div { border-radius: 0; border: 0; box-shadow: none; }
  .base { height: 11px; margin: 0 -4%; border-radius: 0 0 14px 14px; background: linear-gradient(#e0e3e8, #a3a9b2); }
  .letter { position: relative; z-index: 1; align-self: center; font-size: 4rem; font-weight: 700; letter-spacing: -0.05em; color: color-mix(in srgb, var(--pc) 80%, var(--ink)); }

  .body { display: flex; flex-direction: column; gap: 8px; padding: 20px 22px 22px; flex: 1; }
  &[data-compact] { border-radius: 14px; }
  &[data-compact] .vis { height: 196px; }
  &[data-compact] .ph.a { margin-bottom: -56px; }
  &[data-compact] .ph.b { margin-bottom: -96px; }
  &[data-compact] .lap { width: 74%; }
  &[data-compact] .body { gap: 6px; padding: 14px 16px 16px; }
  &[data-compact] .t { font-size: 1.15rem; }
  &[data-compact] p { font-size: 0.86rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .meta { display: flex; flex-wrap: wrap; gap: 4px 14px; font-size: 0.82rem; color: var(--muted); }
  .meta .k { color: var(--pc); font-weight: 600; }
  :root[data-theme="light"] & .meta .k { color: color-mix(in srgb, var(--pc) 55%, var(--ink)); }
  .meta .st::before { content: "●"; margin-right: 5px; color: var(--sc); }
  .t { font-size: 1.45rem; font-weight: 600; letter-spacing: -0.03em; line-height: 1.12; }
  p { color: var(--muted); font-size: 0.92rem; line-height: 1.5; }
  .tags { margin-top: auto; padding-top: 10px; }
`;

// eslint-disable-next-line @next/next/no-img-element
// eslint-disable-next-line @next/next/no-img-element
const BrandImg = ({ src }: { src: string }) => <img src={src} alt="" />;

// eslint-disable-next-line @next/next/no-img-element
const ShotImg = ({ src }: { src: string }) => <img src={src} alt="" loading="lazy" />;

const STATUS_COLOR = { production: "#2eebaa", development: "#ffcb6b", paused: "#8c95a3" } as const;

export default function ProjectCard({ id, level = "h3", compact = false }: { id: string; level?: "h2" | "h3"; compact?: boolean }) {
  const H = level;
  const { lang, t } = useLang();
  const base = getProjectById(id);
  if (!base) return null;
  const p = localizeProject(base, lang);
  const web = isWebId(id);
  const color = projectColor(id);
  const shots = (base.screens ?? []).filter((u) => !/cover|board/.test(u));
  const first = shots[0] ?? appScreen(id);
  const second = web ? undefined : shots[1];
  const tilt = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const vis = e.currentTarget.querySelector<HTMLElement>(".vis");
    if (!vis) return;
    const r = vis.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    vis.style.setProperty("--ry", `${((x - 0.5) * 16).toFixed(2)}deg`);
    vis.style.setProperty("--rx", `${((0.5 - y) * 10).toFixed(2)}deg`);
    vis.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    vis.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
  };
  const untilt = (e: React.PointerEvent<HTMLElement>) => {
    const vis = e.currentTarget.querySelector<HTMLElement>(".vis");
    vis?.style.setProperty("--ry", "0deg");
    vis?.style.setProperty("--rx", "0deg");
  };
  const letter = p.iconLetter ?? p.title.slice(0, 2).toUpperCase();

  return (
    <Card data-compact={compact || undefined} href={`/projects/${id}`} onPointerMove={tilt} onPointerLeave={untilt} style={{ ["--pc" as string]: color, ["--sc" as string]: STATUS_COLOR[p.status] }}>
      <div className="vis" aria-hidden>
        <span className="sheen" />
        <span className="brand" data-img={!!BRAND_ICON[id]}>{BRAND_ICON[id] ? <BrandImg src={BRAND_ICON[id]} /> : letter}</span>
        {web ? (
          <div className="lap">
            <div className="lid">
              <div className="scr">
                {ADMIN_BRAND[id] ? <AdminShot brand={ADMIN_BRAND[id]} /> : first ? <ShotImg src={first} /> : <div className="w"><WebWire color={color} url={p.title} /></div>}
              </div>
            </div>
            <div className="base" />
          </div>
        ) : first ? (
          <>
            {second && <div className="ph b"><Phone screens={[second]} alt="" width={compact ? 100 : 128} lazy /></div>}
            <div className="ph a"><Phone screens={[first]} alt="" width={compact ? 124 : 156} lazy /></div>
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
        <H className="t">{p.title}</H>
        <p>{p.tagline}</p>
        <div className="tags"><TechIcons tags={p.tags} max={5} /></div>
      </div>
    </Card>
  );
}
