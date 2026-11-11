"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/i18n/provider";
import { contact } from "@/data/profile";
import { personalProjects, professionalProjects, webProjects } from "@/app/projects/helper";

type Item = { id: string; group: string; label: string; hint?: string; run: () => void };

const Backdrop = styled(motion.div)`
  position: fixed; inset: 0; z-index: 100; display: grid; place-items: start center; padding: 14vh 16px 16px;
  background: rgba(3, 5, 8, 0.62); backdrop-filter: blur(6px);
`;

const Panel = styled(motion.div)`
  width: min(640px, 100%); max-height: 70vh; display: flex; flex-direction: column; border-radius: 16px; overflow: hidden;
  background: var(--paper-2); border: 1px solid var(--line); box-shadow: 0 50px 120px -30px rgba(0,0,0,0.8);
  .in { display: flex; align-items: center; gap: 12px; padding: 16px 18px; border-bottom: 1px solid var(--line); font-family: var(--font-mono); }
  .in b { color: var(--accent); font-weight: 500; }
  input { flex: 1; min-width: 0; background: none; border: 0; outline: none; color: var(--ink); font: inherit; font-size: 1rem; }
  ul { list-style: none; overflow-y: auto; padding: 8px; }
  .g { padding: 12px 12px 6px; font-family: var(--font-mono); font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--syn-c); }
  li button { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 11px 12px; border: 0; border-radius: 10px; background: none; cursor: pointer; text-align: left; font-size: 0.95rem; color: var(--ink); }
  li button[data-on="true"] { background: color-mix(in srgb, var(--accent) 14%, transparent); color: var(--accent); }
  li button small { font-family: var(--font-mono); font-size: 0.7rem; color: var(--muted); }
  .empty { padding: 28px; text-align: center; color: var(--muted); }
  .foot { padding: 10px 16px; border-top: 1px solid var(--line); font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted); }
`;

export default function CommandPalette() {
  const { lang, setLang, t } = useLang();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement | null)?.closest?.("input, textarea, [contenteditable]");
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") setOpen(false);
    };
    const openIt = () => setOpen(true);
    window.addEventListener("keydown", key);
    window.addEventListener("open-palette", openIt);
    return () => {
      window.removeEventListener("keydown", key);
      window.removeEventListener("open-palette", openIt);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  const items = useMemo<Item[]>(() => {
    const p = t.palette;
    const go = (href: string) => () => router.push(href);
    const toggleTheme = () => {
      const cur = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch { /* ignore */ }
      window.dispatchEvent(new Event("themechange"));
    };
    const all = [...personalProjects, ...professionalProjects, ...webProjects];
    return [
      { id: "home", group: p.go, label: p.home, hint: "/home", run: go("/home") },
      { id: "work", group: p.go, label: t.nav.work, hint: "/projects", run: go("/projects") },
      { id: "journey", group: p.go, label: t.nav.journey, hint: "/trajetoria", run: go("/trajetoria") },
      { id: "writing", group: p.go, label: t.nav.writing, hint: "/blog", run: go("/blog") },
      { id: "contact", group: p.go, label: t.nav.contact, hint: "/home#contato", run: go("/home#contato") },
      { id: "mail", group: p.actions, label: p.mail, hint: contact.email, run: () => { window.location.href = `mailto:${contact.email}`; } },
      { id: "copy", group: p.actions, label: p.copy, run: () => { void navigator.clipboard?.writeText(contact.email); } },
      { id: "theme", group: p.actions, label: p.theme, run: toggleTheme },
      { id: "lang", group: p.actions, label: p.lang, run: () => setLang(lang === "pt" ? "en" : "pt") },
      ...all.map((pr) => ({ id: `p-${pr.id}`, group: p.projects, label: pr.title, hint: `/projects/${pr.id}`, run: go(`/projects/${pr.id}`) })),
    ];
  }, [t, router, lang, setLang]);

  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const list = items.filter((i) => !q || norm(`${i.label} ${i.hint ?? ""} ${i.group}`).includes(norm(q)));

  const choose = (i: Item | undefined) => {
    if (!i) return;
    setOpen(false);
    i.run();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((v) => Math.min(list.length - 1, v + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((v) => Math.max(0, v - 1)); }
    else if (e.key === "Enter") { e.preventDefault(); choose(list[idx]); }
  };

  let last = "";
  return (
    <AnimatePresence>
      {open && (
        <Backdrop initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }} onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
          <Panel role="dialog" aria-label="Command palette" initial={{ opacity: 0, y: -14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.18 }}>
            <div className="in">
              <b>{">"}</b>
              <input ref={inputRef} value={q} onChange={(e) => { setQ(e.target.value); setIdx(0); }} onKeyDown={onKey} placeholder={t.palette.placeholder} aria-label={t.palette.placeholder} />
            </div>
            {list.length === 0 ? (
              <p className="empty">{t.palette.empty}</p>
            ) : (
              <ul role="listbox">
                {list.map((i, n) => {
                  const head = i.group !== last;
                  last = i.group;
                  return (
                    <li key={i.id}>
                      {head && <div className="g">{i.group}</div>}
                      <button data-on={n === idx} onMouseEnter={() => setIdx(n)} onClick={() => choose(i)} role="option" aria-selected={n === idx}>
                        {i.label}
                        {i.hint && <small>{i.hint}</small>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="foot">{t.palette.hintKeys}</div>
          </Panel>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}
