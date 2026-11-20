"use client";

import Link from "next/link";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { EcodeLogo, SuperlogicaLogo } from "@/components/ui/company-logos";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { useLang } from "@/i18n/provider";

const COMPANIES = [
  { key: "ecode", href: "https://www.agenciaecode.com.br/", years: "2019 a 2024", roles: ["Desenvolvedor Web", "Desenvolvedor Mobile", "Scrum Master"], rolesEn: ["Web Developer", "Mobile Developer", "Scrum Master"], Logo: EcodeLogo, logoH: 38 },
  { key: "superlogica", href: "https://superlogica.com/", years: "2024 até hoje", yearsEn: "2024 to today", roles: ["Desenvolvedor Mobile", "Desenvolvedor Mobile Sênior"], rolesEn: ["Mobile Developer", "Senior Mobile Developer"], Logo: SuperlogicaLogo, logoH: 30 },
] as const;

const Box = styled.div`
  .lead { max-width: 38rem; margin: -10px 0 26px; color: var(--muted); line-height: 1.65; }
  .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
  @media (max-width: 760px) { .grid { grid-template-columns: 1fr; } }
  .card { position: relative; display: flex; flex-direction: column; gap: 18px; padding: 30px 30px 26px; border: 1px solid var(--line); border-radius: 16px; background: color-mix(in srgb, var(--card) 80%, transparent); overflow: hidden; transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.2s ease; }
  .card::before { content: ""; position: absolute; inset: -40% -20% auto auto; width: 70%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--accent) 20%, transparent), transparent 66%); opacity: 0; transition: opacity 0.4s ease; pointer-events: none; }
  .card:hover { transform: translateY(-4px); border-color: color-mix(in srgb, var(--accent) 55%, var(--line)); }
  .card:hover::before { opacity: 1; }
  .logo { display: flex; align-items: center; min-height: 44px; color: var(--ink); }
  .logo svg { width: auto; transition: transform 0.3s cubic-bezier(.2,.7,.2,1); }
  a.logo { width: fit-content; }
  a.logo:hover svg, a.logo:focus-visible svg { transform: translateX(4px); }
  a.logo:focus-visible { outline: 2px solid var(--accent); outline-offset: 6px; border-radius: 6px; }
  .yrs { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent-ink); }
  .card p { color: var(--muted); line-height: 1.6; }
  .roles { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; }
  .roles li { padding: 5px 12px; border: 1px solid var(--line); border-radius: 99px; font-size: 0.84rem; }
  .visit { margin-top: auto; display: inline-flex; align-items: center; gap: 8px; width: fit-content; font-weight: 600; transition: gap 0.25s ease, color 0.2s ease; }
  .visit:hover { gap: 12px; color: var(--accent-ink); }
  .more { margin-top: 22px; display: inline-flex; align-items: center; gap: 8px; color: var(--muted); transition: color 0.2s ease, gap 0.25s ease; }
  .more:hover { color: var(--accent-ink); gap: 14px; }
`;

/** "Onde trabalhei": as duas empresas, com a logo, o período, as funções e o link do site. */
export default function WhereWorked() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();
  const w = t.worked;
  return (
    <Box>
      <p className="lead">{w.lead}</p>
      <div className="grid">
        {COMPANIES.map(({ key, href, years, roles, rolesEn, Logo, logoH, ...rest }, i) => (
          <motion.article
            key={key}
            className="card"
            initial={reduce ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <a className="logo" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${w.visit}: ${key === "ecode" ? "e/code" : "Superlógica"}`}><Logo height={logoH} /></a>
            <div className="yrs">{lang === "en" && "yearsEn" in rest ? rest.yearsEn : years}</div>
            <p>{key === "ecode" ? w.ecode : w.superlogica}</p>
            <ul className="roles">{(lang === "en" ? rolesEn : roles).map((r) => <li key={r}>{r}</li>)}</ul>
            <a className="visit" href={href} target="_blank" rel="noopener noreferrer">{w.visit} <ArrowUpRight /></a>
          </motion.article>
        ))}
      </div>
      <Link className="more" href="/trajetoria">{w.more} <ArrowRight /></Link>
    </Box>
  );
}
