"use client";

import Link from "next/link";
import styled from "styled-components";
import { useLang } from "@/i18n/provider";
import { JOB_STORY, OWN_STORY, type StoryItem } from "@/data/story";

type Item = Extract<StoryItem, { kind: "phone" }> | (Extract<StoryItem, { kind: "web" }> & { src: string });

/** Telas e sites com imagem real, sem repetir, na ordem da história. */
function collect(): Item[] {
  const seen = new Set<string>();
  const out: Item[] = [];
  for (const it of [...OWN_STORY, ...JOB_STORY.flat()]) {
    if (!it.src || seen.has(it.src)) continue;
    seen.add(it.src);
    out.push(it as Item);
  }
  return out;
}

const Wrap = styled.section`
  position: relative; margin-top: 28px; overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);

  .track { display: flex; align-items: center; gap: 22px; width: max-content; padding: 10px 0 18px; animation: slide 90s linear infinite; }
  &:hover .track, &:focus-within .track { animation-play-state: paused; }
  @keyframes slide { to { transform: translateX(-50%); } }
  @media (prefers-reduced-motion: reduce) { .track { animation: none; } overflow-x: auto; }

  a { display: block; flex: none; color: inherit; transition: transform 0.35s cubic-bezier(.2,.7,.2,1); }
  a:hover { transform: translateY(-8px); }
  a:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 6px; border-radius: 24px; }

  .phone { width: 150px; padding: 5px; border-radius: 26px; background: #0b0c0e; border: 1px solid color-mix(in srgb, var(--ink) 20%, transparent); box-shadow: 0 26px 50px -24px rgba(0,0,0,0.65); }
  .phone .screen { border-radius: 21px; overflow: hidden; background: #fff; aspect-ratio: 560 / 1213; }
  .phone img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; }

  .web { width: 300px; border-radius: 12px; overflow: hidden; background: var(--card); border: 1px solid color-mix(in srgb, var(--ink) 16%, transparent); box-shadow: 0 26px 50px -24px rgba(0,0,0,0.65); }
  .web .bar { display: flex; align-items: center; gap: 6px; padding: 8px 10px; background: color-mix(in srgb, var(--ink) 6%, var(--card)); border-bottom: 1px solid var(--line); }
  .web .bar i { width: 8px; height: 8px; border-radius: 50%; }
  .web .bar i:nth-child(1) { background: #ff5f57; } .web .bar i:nth-child(2) { background: #febc2e; } .web .bar i:nth-child(3) { background: #28c840; }
  .web .bar span { margin-left: 8px; font-family: var(--font-mono); font-size: 0.62rem; color: var(--muted); }
  .web img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; }
`;

/** Faixa de telas em movimento logo abaixo do início: o trabalho aparece antes de qualquer texto. */
export default function Showcase() {
  const { t } = useLang();
  const items = collect();
  const list = [...items, ...items];
  return (
    <Wrap aria-label={t.site.showcaseAria}>
      <div className="track">
        {list.map((it, i) => {
          const dup = i >= items.length;
          return (
            <Link key={`${it.src}-${i}`} href={`/projects/${it.id}`} aria-label={it.title} aria-hidden={dup || undefined} tabIndex={dup ? -1 : undefined}>
              {it.kind === "phone" ? (
                <div className="phone">
                  <div className="screen">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.src} alt={dup ? "" : it.title} loading="lazy" />
                  </div>
                </div>
              ) : (
                <div className="web">
                  <div className="bar"><i /><i /><i /><span>{it.title}</span></div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={it.src} alt={dup ? "" : it.title} loading="lazy" />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </Wrap>
  );
}
