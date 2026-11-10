"use client";

import { useState } from "react";
import styled from "styled-components";
import WorkIndex from "@/components/home/work-index";
import { Lead, Page, PageTitle, Wrap } from "@/components/ui/layout";
import { useLang } from "@/i18n/provider";
import { SELECTED_IDS, isWebId } from "@/data/work";
import { personalProjects, professionalProjects, webProjects } from "./helper";

type Tab = "all" | "mobile" | "web" | "own";

const everything = [...personalProjects, ...professionalProjects, ...webProjects];
const ORDER = [...SELECTED_IDS, ...everything.map((p) => p.id).filter((id) => !(SELECTED_IDS as readonly string[]).includes(id))];
const OWN = new Set(personalProjects.map((p) => p.id));
const match = (id: string, tab: Tab) => (tab === "all" ? true : tab === "own" ? OWN.has(id) : tab === "web" ? isWebId(id) : !isWebId(id));

const Tabs = styled.div`
  display: flex; flex-wrap: wrap; gap: 6px 26px; margin: 44px 0 26px;
  button { background: none; border: 0; cursor: pointer; padding: 4px 0; color: var(--muted); font-size: 1rem; border-bottom: 2px solid transparent; transition: color 0.2s ease, border-color 0.2s ease; }
  button:hover { color: var(--ink); }
  button[aria-pressed="true"] { color: var(--ink); border-color: var(--accent); }
  sup { margin-left: 4px; font-family: var(--font-mono); font-size: 0.62rem; color: var(--accent-ink); }
`;

export default function Projects() {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>("all");
  const ids = ORDER.filter((id) => match(id, tab));
  const tabs: [Tab, string][] = [["all", t.work.tabAll], ["mobile", t.work.tabMobile], ["web", t.work.tabWeb], ["own", t.work.tabOwn]];

  return (
    <Wrap>
      <Page>
        <PageTitle>{t.work.pageTitle}</PageTitle>
        <Lead>{t.work.pageLead}</Lead>
        <Tabs role="group" aria-label={t.work.filterAria}>
          {tabs.map(([id, label]) => (
            <button key={id} aria-pressed={tab === id} onClick={() => setTab(id)}>
              {label}
              <sup>{ORDER.filter((x) => match(x, id)).length}</sup>
            </button>
          ))}
        </Tabs>
        <WorkIndex ids={ids} />
      </Page>
    </Wrap>
  );
}
