"use client";

import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import type { InstagramPost } from "@/lib/instagram";
import { useLang } from "@/i18n/provider";
import { contact } from "@/data/profile";

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 12px;
  @media (max-width: 1000px) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  @media (max-width: 520px) { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  a.post { position: relative; display: block; aspect-ratio: 1; border-radius: 12px; overflow: hidden; background: var(--paper-2); border: 1px solid var(--line); transition: transform 0.35s cubic-bezier(.2,.7,.2,1), border-color 0.25s ease; }
  a.post img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s cubic-bezier(.2,.7,.2,1); }
  a.post:hover, a.post:focus-visible { transform: translateY(-4px); border-color: var(--accent); }
  a.post:hover img { transform: scale(1.06); }
  .cap { position: absolute; inset: auto 0 0 0; padding: 34px 10px 10px; color: #fff; background: linear-gradient(transparent, rgba(0,0,0,0.82) 55%); opacity: 0; transform: translateY(6px); transition: opacity 0.25s ease, transform 0.25s ease; }
  .cap span { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; font-size: 0.74rem; line-height: 1.35; }
  a.post:hover .cap, a.post:focus-visible .cap { opacity: 1; transform: none; }
  .vid { position: absolute; top: 8px; right: 8px; width: 24px; height: 24px; display: grid; place-items: center; border-radius: 50%; background: rgba(0,0,0,0.55); color: #fff; font-size: 0.6rem; }
`;

const Foot = styled.div`
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px 24px; margin-top: 22px;
  p { color: var(--muted); font-size: 0.95rem; }
  a.follow { display: inline-flex; align-items: center; gap: 8px; height: 42px; padding: 0 18px; border: 1px solid var(--line); border-radius: 8px; font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.06em; text-transform: uppercase; transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease; }
  a.follow:hover { color: var(--accent); border-color: var(--accent); transform: translateY(-2px); }
`;

/** Últimos posts do Instagram (vindos do Behold) e um convite para seguir. */
export default function InstagramGrid({ posts }: { posts: InstagramPost[] }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ig = t.instagram;
  return (
    <>
      {posts.length > 0 && (
        <Grid>
          {posts.map((p, i) => (
            <motion.div key={p.id} initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}>
              <a className="post" href={p.permalink} target="_blank" rel="noopener noreferrer" aria-label={p.caption || ig.openPost}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.imageUrl} alt="" loading="lazy" />
                {p.isVideo && <span className="vid" aria-hidden>▶</span>}
                {p.caption && <span className="cap"><span>{p.caption}</span></span>}
              </a>
            </motion.div>
          ))}
        </Grid>
      )}
      <Foot>
        <p>{ig.text}</p>
        <a className="follow" href={contact.instagram} target="_blank" rel="noopener noreferrer">{ig.follow} ↗</a>
      </Foot>
    </>
  );
}
