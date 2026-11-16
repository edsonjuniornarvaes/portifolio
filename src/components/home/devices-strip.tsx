"use client";

import { useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Phone from "@/components/ui/phone";
import WebWire from "@/components/ui/web-wire";
import { getProjectById } from "@/app/projects/helper";
import { play } from "@/lib/sound";

const P = "/images/projects/";
const PHONES = [
  { id: "minha-navex", src: `${P}navex-home.webp`, w: 168, mt: 70, k: 26 },
  { id: "gruvi", src: `${P}gruvi-home.webp`, w: 200, mt: 32, k: 60 },
  { id: "pjbank", src: `${P}pjbank-home.webp`, w: 232, mt: 0, k: 100 },
  { id: "clube-da-joia-app", src: `${P}clube-app-home.webp`, w: 200, mt: 32, k: 60 },
  { id: "mont-b2b", src: `${P}mont-b2b-home.webp`, w: 168, mt: 70, k: 26 },
];
const LAPTOPS: { id: string; img?: string; color: string; url: string; k: number }[] = [
  { id: "gazin-b2b-b2c", color: "#4c8dff", url: "gazin.com.br", k: 24 },
  { id: "clube-da-joia-marketplace", img: `${P}marketplace-web.webp`, color: "#b08d57", url: "clubedajoia.com", k: 56 },
  { id: "lojas-manao", img: `${P}lojas-manao.webp`, color: "#f2c94c", url: "lojasdomanao.com.br", k: 24 },
];

const Box = styled.div`
  position: relative; overflow: hidden;
  .phones { position: relative; height: calc(clamp(300px, 36vw, 400px) + 32px); -webkit-mask-image: linear-gradient(#000 72%, transparent); mask-image: linear-gradient(#000 72%, transparent); }
  .row { position: absolute; left: 50%; top: 32px; display: flex; align-items: flex-start; gap: clamp(12px, 2vw, 26px); transform: translateX(-50%); }
  .go { position: relative; display: block; cursor: pointer; }
  .go:focus-visible { outline: 2px solid var(--accent); outline-offset: 6px; border-radius: 16px; }
  .tip { position: absolute; left: 50%; top: -14px; transform: translate(-50%, 6px); padding: 5px 12px; border-radius: 99px; background: var(--accent); color: var(--on-accent); font-size: 0.78rem; font-weight: 600; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.2s ease, transform 0.25s cubic-bezier(.2,.7,.2,1); z-index: 5; }
  .go:hover .tip, .go:focus-visible .tip { opacity: 1; transform: translate(-50%, 0); }
  .laptops { display: flex; justify-content: center; gap: clamp(14px, 3vw, 36px); margin-top: 28px; }
  .lp { flex: 0 1 340px; min-width: 0; }
  .lap { position: relative; }
  .lid { position: relative; padding: 2.6% 2.6% 0; border-radius: 12px 12px 4px 4px; background: linear-gradient(#3a3f48, #23262c); box-shadow: 0 0 0 1px rgba(255,255,255,0.1) inset; }
  .scr { position: relative; aspect-ratio: 16 / 10; border-radius: 4px 4px 0 0; overflow: hidden; background: #101214; }
  .scr img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
  .scr .w { transform: scale(1.04); transform-origin: top; }
  .scr .w > div { border-radius: 0; border: 0; box-shadow: none; aspect-ratio: 16 / 10; }
  .base { height: 12px; margin: 0 -4%; border-radius: 0 0 14px 14px; background: linear-gradient(#e0e3e8, #a3a9b2); position: relative; }
  .base::after { content: ""; position: absolute; left: 50%; top: 0; width: 18%; height: 4px; transform: translateX(-50%); border-radius: 0 0 6px 6px; background: #868c95; }
  .glow { position: absolute; left: 10%; right: 10%; bottom: -10px; height: 24px; background: radial-gradient(closest-side, rgba(0,0,0,0.5), transparent); filter: blur(6px); }
  @media (max-width: 700px) { .row { zoom: 0.7; } .ph:nth-child(1), .ph:nth-child(5) { display: none; } .laptops { flex-direction: column; align-items: center; } .lp { flex-basis: auto; width: min(100%, 340px); } .lp:nth-child(3) { display: none; } }
`;

// eslint-disable-next-line @next/next/no-img-element
const LapImg = ({ src }: { src: string }) => <img src={src} alt="" />;

function Rise({ i, k, mt, p, children, cls, id }: { i: number; k: number; mt: number; p: ReturnType<typeof useScroll>["scrollYProgress"]; children: React.ReactNode; cls: string; id: string }) {
  const name = getProjectById(id)?.title ?? id;
  const reduce = useReducedMotion();
  const y = useTransform(p, [0, 1], [reduce ? 0 : k, reduce ? 0 : -k]);
  return (
    <motion.div className={cls} style={{ y, marginTop: mt }}>
      <motion.div initial={reduce ? false : { opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.8, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}>
        <motion.div
          className="hop"
          whileHover={reduce ? undefined : { y: -22, scale: 1.035 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 520, damping: 11, mass: 0.7 }}
          onHoverStart={() => play("pop")}
        >
          <Link href={`/projects/${id}`} aria-label={name} className="go">
            {children}
            <span className="tip" aria-hidden>{name} <b>↗</b></span>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** Fileira de celulares (apps) e notebooks (sites), que sobem devagar enquanto você rola. */
export default function DevicesStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <Box ref={ref}>
      <div className="phones">
        <div className="row">
          {PHONES.map((ph, i) => (
            <Rise key={ph.src} id={ph.id} i={i} k={ph.k} mt={ph.mt} p={scrollYProgress} cls="ph"><Phone screens={[ph.src]} alt="" width={ph.w} /></Rise>
          ))}
        </div>
      </div>
      <div className="laptops">
        {LAPTOPS.map((lp, i) => (
          <Rise key={lp.url} id={lp.id} i={i} k={lp.k / 2} mt={i === 1 ? 0 : 18} p={scrollYProgress} cls="lp">
            <div className="lap">
              <div className="lid"><div className="scr">{lp.img ? <LapImg src={lp.img} /> : <div className="w"><WebWire color={lp.color} url={lp.url} /></div>}</div></div>
              <div className="base" /><div className="glow" />
            </div>
          </Rise>
        ))}
      </div>
    </Box>
  );
}
