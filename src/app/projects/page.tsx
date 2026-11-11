"use client";

import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "@/components/project-card";
import { Lead, Page, PageTitle, Wrap } from "@/components/ui/layout";
import { useLang } from "@/i18n/provider";
import { SHOWCASE, isWebId } from "@/data/work";
import { personalProjects, professionalProjects, webProjects } from "./helper";

type Tab = "all" | "apps" | "web" | "own";

const everything = [...personalProjects, ...professionalProjects, ...webProjects];
const FIRST = SHOWCASE.map((s) => s.id);
const ORDER = [...FIRST, ...everything.map((p) => p.id).filter((id) => !FIRST.includes(id))];
const OWN = new Set(personalProjects.map((p) => p.id));
const match = (id: string, tab: Tab) => (tab === "all" ? true : tab === "own" ? OWN.has(id) : tab === "web" ? isWebId(id) : !isWebId(id));

const Tabs = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px; margin: 40px 0 30px;
  button { position: relative; padding: 9px 16px; border: 1px solid var(--line); border-radius: 8px; background: transparent; cursor: pointer; font-family: var(--font-mono); font-size: 0.82rem; color: var(--muted); transition: color 0.2s ease, border-color 0.2s ease; }
  button:hover { color: var(--ink); border-color: var(--muted); }
  button[aria-pressed="true"] { color: var(--on-accent); border-color: var(--accent); }
  button .bg { position: absolute; inset: 0; border-radius: 7px; background: var(--accent); }
  button span { position: relative; }
  button sup { position: relative; margin-left: 5px; font-size: 0.62rem; opacity: 0.7; }
`;

const Grid = styled(motion.ul)`
  list-style: none; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px;
  @media (max-width: 1000px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 620px) { grid-template-columns: 1fr; }
`;

export default function Projects() {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>("all");
  const ids = ORDER.filter((id) => match(id, tab));
  const tabs: [Tab, string][] = [["all", t.work.tabAll], ["apps", t.work.tabApps], ["web", t.work.tabWeb], ["own", t.work.tabOwn]];

  return (
    <Wrap>
      <Page>
        <PageTitle>{t.work.pageTitle}</PageTitle>
        <Lead>{t.work.pageLead}</Lead>
        <Tabs role="group" aria-label={t.work.filterAria}>
          {tabs.map(([id, label]) => (
            <button key={id} aria-pressed={tab === id} onClick={() => setTab(id)}>
              {tab === id && <motion.i className="bg" layoutId="tabbg" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span>{label}</span>
              <sup>{ORDER.filter((x) => match(x, id)).length}</sup>
            </button>
          ))}
        </Tabs>
        <Grid layout>
          <AnimatePresence mode="popLayout">
            {ids.map((id) => (
              <motion.li key={id} layout initial={{ opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}>
                <ProjectCard id={id} />
              </motion.li>
            ))}
          </AnimatePresence>
        </Grid>
      </Page>
    </Wrap>
  );
}
