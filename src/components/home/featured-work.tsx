"use client";

import Link from "next/link";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import ProjectCard from "@/components/project-card";
import { getAllProjectsBrief } from "@/app/projects/helper";
import { useLang } from "@/i18n/provider";

/** Os projetos que melhor mostram o que eu faço. O resto fica em /projects. */
const FEATURED = ["pjbank", "gruvi", "clube-da-joia-marketplace", "consorcio-gazin"];

const Box = styled.div`
  .lead { max-width: 38rem; margin: -10px 0 30px; color: var(--muted); line-height: 1.65; }
  .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; list-style: none; }
  @media (max-width: 820px) { .grid { grid-template-columns: 1fr; } }
  .more { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px 24px; margin-top: 30px; padding: 22px 26px; border: 1px dashed color-mix(in srgb, var(--accent) 40%, var(--line)); border-radius: 14px; }
  .more span { color: var(--muted); }
  .more a { display: inline-flex; align-items: center; gap: 10px; height: 46px; padding: 0 22px; border-radius: 99px; background: var(--accent); color: var(--on-accent); font-weight: 600; transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .more a:hover { transform: translateY(-2px); box-shadow: 0 10px 24px -10px var(--accent); }
`;

export default function FeaturedWork() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const total = getAllProjectsBrief().length;
  return (
    <Box>
      <p className="lead">{t.work.featuredLead}</p>
      <ul className="grid">
        {FEATURED.map((id, i) => (
          <motion.li
            key={id}
            initial={reduce ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: (i % 2) * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <ProjectCard id={id} level="h3" />
          </motion.li>
        ))}
      </ul>
      <div className="more">
        <span>{t.work.allCount.replace("{n}", String(total))}</span>
        <Link href="/projects">{t.work.all} <span aria-hidden>→</span></Link>
      </div>
    </Box>
  );
}
