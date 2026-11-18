"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Phone from "@/components/ui/phone";
import { getProjectById } from "@/app/projects/helper";
import AdminShot from "@/components/ui/admin-shot";
import { ADMIN_BRAND } from "@/data/brands";
import { play } from "@/lib/sound";

const P = "/images/projects/";
// w: largura em px (celular); cq: largura em % da faixa (para caber inteira em qualquer tela larga)
const PHONES = [
  { id: "minha-navex", src: `${P}navex-home-new.webp`, w: 160, cq: 11.9, mt: 90, k: 24 },
  { id: "consorcio-gazin", src: `${P}consorcio-gazin-simulador.webp`, w: 186, cq: 13.8, mt: 48, k: 44 },
  { id: "pjbank", src: `${P}pjbank-home.webp`, w: 228, cq: 17, mt: 0, k: 100 },
  { id: "gruvi", src: `${P}gruvi-home.webp`, w: 192, cq: 14.3, mt: 24, k: 60 },
  { id: "clube-da-joia-app", src: `${P}clube-app-home.webp`, w: 206, cq: 15.3, mt: 52, k: 40 },
  { id: "mont-b2b", src: `${P}mont-home-alt.webp`, w: 160, cq: 11.9, mt: 90, k: 24 },
];
const LAPTOPS: { id: string; admin?: boolean; img?: string; k: number }[] = [
  { id: "clube-da-joia-marketplace", img: `${P}clube-admin.webp`, k: 24 },
  { id: "clube-da-joia-marketplace", img: `${P}clube-site-hero.webp`, k: 56 },
  { id: "venda-direta-gazin", img: `${P}venda-direta-site.webp`, k: 40 },
];

const Box = styled.div`
  position: relative;
  .phones { position: relative; container-type: inline-size; margin-inline: -56px; padding: 32px 56px 0; }
  .row { display: flex; justify-content: center; align-items: flex-start; gap: 1.9cqw; }
  .go { position: relative; display: block; cursor: pointer; }
  .go:focus-visible { outline: 2px solid var(--accent); outline-offset: 6px; border-radius: 16px; }
  .tip { position: absolute; left: 50%; top: -14px; transform: translate(-50%, 6px); padding: 5px 12px; border-radius: 99px; background: var(--accent); color: var(--on-accent); font-size: 0.78rem; font-weight: 600; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.2s ease, transform 0.25s cubic-bezier(.2,.7,.2,1); z-index: 5; }
  .go:hover .tip, .go:focus-visible .tip { opacity: 1; transform: translate(-50%, 0); }
  .laptops { display: flex; justify-content: center; gap: clamp(14px, 3vw, 36px); margin-top: 56px; }
  .lp { flex: 0 1 300px; min-width: 0; }
  .lap { position: relative; }
  .lid { position: relative; padding: 2.6% 2.6% 0; border-radius: 12px 12px 4px 4px; background: linear-gradient(#3a3f48, #23262c); box-shadow: 0 0 0 1px rgba(255,255,255,0.1) inset; }
  .scr { position: relative; aspect-ratio: 16 / 10; border-radius: 4px 4px 0 0; overflow: hidden; background: #101214; }
  .scr img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
  .scr .w { transform: scale(1.04); transform-origin: top; }
  .scr .w > div { border-radius: 0; border: 0; box-shadow: none; aspect-ratio: 16 / 10; }
  .base { height: 12px; margin: 0 -4%; border-radius: 0 0 14px 14px; background: linear-gradient(#e0e3e8, #a3a9b2); position: relative; }
  .base::after { content: ""; position: absolute; left: 50%; top: 0; width: 18%; height: 4px; transform: translateX(-50%); border-radius: 0 0 6px 6px; background: #868c95; }
  .glow { position: absolute; left: 10%; right: 10%; bottom: -10px; height: 24px; background: radial-gradient(closest-side, rgba(0,0,0,0.5), transparent); filter: blur(6px); }
  @media (max-width: 700px) {
    .phones { height: auto; padding: 28px 0 0; margin: 0 calc(var(--gutter) * -1); overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
    .phones::-webkit-scrollbar { display: none; }
    .phones { container-type: normal; }
    .ph { --pw: var(--pwm) !important; }
    .row { display: flex; justify-content: flex-start; gap: 16px; padding: 0 calc(50vw - 95px); width: max-content; }
    .ph { scroll-snap-align: center; margin-top: 0 !important; transform: none !important; zoom: 0.82; }
    .tip { display: none; }
    .laptops { flex-direction: column; align-items: center; gap: 28px; margin-top: 8px; }
    .lp { flex-basis: auto; width: min(100%, 360px); margin-top: 0 !important; transform: none !important; }
  }
`;

// eslint-disable-next-line @next/next/no-img-element
const LapImg = ({ src }: { src: string }) => <img src={src} alt="" />;

function Rise({ i, k, mt, p, children, cls, id, vars }: { i: number; k: number; mt: number; p: ReturnType<typeof useScroll>["scrollYProgress"]; children: React.ReactNode; cls: string; id: string; vars?: Record<string, string> }) {
  const name = getProjectById(id)?.title ?? id;
  const reduce = useReducedMotion();
  const y = useTransform(p, [0, 1], [reduce ? 0 : k, reduce ? 0 : -k]);
  return (
    <motion.div className={cls} style={{ y, marginTop: mt, ...(vars as object) }}>
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
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sc = scroller.current;
    if (!sc || window.innerWidth > 700) return;
    const mid = sc.querySelectorAll<HTMLElement>(".ph")[2];
    if (!mid) return;
    const center = () => {
      const m = mid.getBoundingClientRect(), c = sc.getBoundingClientRect();
      sc.scrollLeft += m.left + m.width / 2 - (c.left + c.width / 2);
    };
    center();
    const t = setTimeout(center, 400);
    return () => clearTimeout(t);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <Box ref={ref}>
      <div className="phones" ref={scroller}>
        <div className="row">
          {PHONES.map((ph, i) => (
            <Rise key={ph.src} id={ph.id} i={i} k={ph.k} mt={ph.mt} p={scrollYProgress} cls="ph" vars={{ "--pw": `${ph.cq}cqw`, "--pwm": `${ph.w}px` }}><Phone screens={[ph.src]} alt="" width="var(--pw)" /></Rise>
          ))}
        </div>
      </div>
      <div className="laptops">
        {LAPTOPS.map((lp, i) => (
          <Rise key={`${lp.id}-${i}`} id={lp.id} i={i} k={lp.k / 2} mt={i === 1 ? 0 : 18} p={scrollYProgress} cls="lp">
            <div className="lap">
              <div className="lid"><div className="scr">{lp.admin && ADMIN_BRAND[lp.id] ? <AdminShot brand={ADMIN_BRAND[lp.id]} /> : <LapImg src={lp.img ?? ""} />}</div></div>
              <div className="base" /><div className="glow" />
            </div>
          </Rise>
        ))}
      </div>
    </Box>
  );
}
