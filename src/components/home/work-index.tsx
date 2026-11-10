"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useLang } from "@/i18n/provider";
import { localizeProject } from "@/i18n/content";
import { getProjectById } from "@/app/projects/helper";
import { WORK_META, isWebId } from "@/data/work";

const List = styled.ul`
  list-style: none; border-top: 1px solid var(--line);
  li { border-bottom: 1px solid var(--line); transition: opacity 0.25s ease; }
  &[data-hover="true"] li { opacity: 0.38; }
  &[data-hover="true"] li[data-on="true"] { opacity: 1; }

  a { display: grid; grid-template-columns: 56px minmax(0, 1.5fr) minmax(0, 1.1fr) 120px; align-items: baseline; gap: 0 24px; padding: 26px 0; transition: padding 0.3s cubic-bezier(.2,.7,.2,1); }
  a:hover, a:focus-visible { padding-left: 14px; }
  .n { font-family: var(--font-mono); font-size: 0.74rem; color: var(--muted); }
  .t { font-family: var(--font-serif); font-size: clamp(1.7rem, 3.4vw, 2.7rem); line-height: 1.08; letter-spacing: -0.01em; transition: color 0.2s ease; }
  a:hover .t { color: var(--accent-ink); }
  .d { font-size: 0.92rem; color: var(--muted); line-height: 1.45; }
  .d b { display: inline-block; margin-right: 8px; font-family: var(--font-mono); font-size: 0.66rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent-ink); }
  .y { justify-self: end; display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 0.74rem; color: var(--muted); white-space: nowrap; }
  .y i { font-style: normal; display: inline-block; transform: translateX(-6px); opacity: 0; transition: transform 0.3s ease, opacity 0.3s ease; color: var(--accent-ink); }
  a:hover .y i { transform: none; opacity: 1; }

  @media (max-width: 760px) {
    a { grid-template-columns: 30px minmax(0, 1fr) auto; row-gap: 6px; padding: 20px 0; }
    a:hover { padding-left: 0; }
    .d { grid-column: 2 / 4; grid-row: 2; }
    .y { grid-column: 3; grid-row: 1; }
    .y i { display: none; }
  }
`;

const Preview = styled.div`
  position: fixed; left: 0; top: 0; z-index: 40; width: 184px; aspect-ratio: 560 / 1213; border-radius: 24px; overflow: hidden; pointer-events: none;
  background: var(--card); border: 1px solid var(--line); box-shadow: 0 40px 80px -30px rgba(0,0,0,0.45);
  opacity: 0; will-change: transform, opacity; transition: opacity 0.25s ease;
  &[data-on="true"] { opacity: 1; }
  img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top; opacity: 0; transition: opacity 0.2s ease; }
  img[data-on="true"] { opacity: 1; }
  @media (hover: none), (max-width: 760px) { display: none; }
`;

/**
 * Lista editorial de trabalhos. Ao passar o mouse, a tela do app aparece junto do cursor
 * (único efeito da página); no celular é só a lista.
 */
export default function WorkIndex({ ids }: { ids: readonly string[] }) {
  const { lang, t } = useLang();
  const [active, setActive] = useState<string | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (box.current) box.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) rotate(${((target.current.x - pos.current.x) * 0.04).toFixed(2)}deg)`;
      raf.current = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      target.current = { x: e.clientX + 70, y: e.clientY - 200 };
      if (!raf.current) {
        pos.current = { ...target.current };
        raf.current = requestAnimationFrame(tick);
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, []);

  const rows = ids
    .map((id) => {
      const base = getProjectById(id);
      return base ? { id, p: localizeProject(base, lang), meta: WORK_META[id] ?? {} } : null;
    })
    .filter(Boolean) as { id: string; p: ReturnType<typeof localizeProject>; meta: { year?: string; preview?: string } }[];
  const previews = rows.filter((r) => r.meta.preview);

  return (
    <>
      <List data-hover={active ? "true" : "false"} onPointerLeave={() => setActive(null)}>
        {rows.map((r, i) => (
          <li key={r.id} data-on={active === r.id} onPointerEnter={() => setActive(r.id)} onFocus={() => setActive(r.id)} onBlur={() => setActive(null)}>
            <Link href={`/projects/${r.id}`}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <span className="t">{r.p.title}</span>
              <span className="d">
                <b>{isWebId(r.id) ? t.work.web : t.work.mobile}</b>
                {r.p.tagline}
              </span>
              <span className="y">
                {r.meta.year ?? t.status[r.p.status]}
                <i aria-hidden>↗</i>
              </span>
            </Link>
          </li>
        ))}
      </List>
      <Preview ref={box} data-on={Boolean(active && rows.find((r) => r.id === active)?.meta.preview)} aria-hidden>
        {previews.map((r) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={r.id} src={r.meta.preview} alt="" data-on={active === r.id} />
        ))}
      </Preview>
    </>
  );
}
