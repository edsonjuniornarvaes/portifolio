"use client";

import Link from "next/link";
import styled from "styled-components";
import { Wrap } from "@/components/ui/layout";
import { useLang } from "@/i18n/provider";

const Box = styled.section`
  padding: 56px 0 0;
  @media (max-width: 700px) { padding-top: 34px; }

  .top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 20px; font-family: var(--font-mono); font-size: 0.76rem; letter-spacing: 0.04em; color: var(--muted); }
  .pill { display: inline-flex; align-items: center; gap: 9px; color: var(--ink); }
  .pill i { width: 8px; height: 8px; border-radius: 50%; background: #2fb36a; box-shadow: 0 0 0 0 rgba(47,179,106,0.6); animation: ping 2.4s ease-out infinite; }
  @keyframes ping { 0% { box-shadow: 0 0 0 0 rgba(47,179,106,0.55); } 80%, 100% { box-shadow: 0 0 0 9px rgba(47,179,106,0); } }

  .grid { display: grid; grid-template-columns: minmax(0, 1fr) 270px; gap: 56px; align-items: end; margin-top: 46px; }
  @media (max-width: 940px) { .grid { grid-template-columns: 1fr; gap: 36px; margin-top: 32px; } }

  h1 { font-family: var(--font-serif); font-weight: 400; font-size: clamp(3.3rem, 9vw, 8rem); line-height: 0.96; letter-spacing: -0.025em; }
  h1 span { display: block; }
  h1 em { font-style: italic; color: var(--accent-ink); }
  .lead { max-width: 33rem; margin-top: 30px; font-size: 1.15rem; line-height: 1.65; color: var(--muted); }
  .cta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 26px; margin-top: 34px; }
  .btn { display: inline-flex; align-items: center; gap: 10px; height: 50px; padding: 0 26px; border-radius: 999px; background: var(--ink); color: var(--paper); font-weight: 500; transition: background 0.25s ease, transform 0.25s ease; }
  .btn:hover { background: var(--accent); color: var(--on-accent); transform: translateY(-2px); }
  .link { font-weight: 500; border-bottom: 1px solid var(--ink); padding-bottom: 2px; transition: color 0.2s ease, border-color 0.2s ease; }
  .link:hover { color: var(--accent-ink); border-color: var(--accent-ink); }

  figure { margin: 0; }
  figure img { display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: center 18%; border-radius: 6px; filter: saturate(0.92); }
  figcaption { margin-top: 10px; font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.04em; color: var(--muted); }
  @media (max-width: 940px) { figure { max-width: 240px; } }

  .rise { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(.2,.7,.2,1) forwards; }
`;

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;
  return (
    <Wrap>
      <Box>
        <div className="top rise">
          <span className="pill"><i /> {h.available}</span>
          <span>{h.based}</span>
        </div>
        <div className="grid">
          <div>
            <h1>
              <span className="rise" style={{ animationDelay: "0.08s" }}>{h.headA}</span>
              <span className="rise" style={{ animationDelay: "0.2s" }}><em>{h.headB}</em></span>
            </h1>
            <p className="lead rise" style={{ animationDelay: "0.34s" }}>{h.lead}</p>
            <div className="cta rise" style={{ animationDelay: "0.46s" }}>
              <Link className="btn" href="/projects">{h.ctaWork} <span aria-hidden>→</span></Link>
              <Link className="link" href="/home#contato">{h.ctaTalk}</Link>
            </div>
          </div>
          <figure className="rise" style={{ animationDelay: "0.4s" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/edson.webp" alt={h.portraitAlt} />
            <figcaption>Edson Junior · Umuarama, PR</figcaption>
          </figure>
        </div>
      </Box>
    </Wrap>
  );
}
