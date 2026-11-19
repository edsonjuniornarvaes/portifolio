"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@/components/ui/icons";
import { useLang } from "@/i18n/provider";

const Back = styled(motion.div)`
  position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 18px; background: rgba(4, 8, 8, 0.62); backdrop-filter: blur(3px);
`;
const Box = styled(motion.div)`
  position: relative; width: min(440px, 100%); max-height: calc(100svh - 36px); overflow: auto; padding: 24px 24px 22px; border: 1px solid var(--line); border-radius: 18px; background: var(--paper); color: var(--ink); box-shadow: 0 40px 90px -30px rgba(0,0,0,0.8);
  h3 { font-size: 1.15rem; font-weight: 600; letter-spacing: -0.02em; padding-right: 36px; }
  .sub { margin: 4px 0 16px; color: var(--muted); font-size: 0.88rem; line-height: 1.5; }
  .x { position: absolute; top: 14px; right: 14px; display: grid; place-items: center; width: 32px; height: 32px; border: 0; border-radius: 50%; background: transparent; color: var(--muted); cursor: pointer; transition: color 0.2s ease, background 0.2s ease; }
  .x:hover { color: var(--ink); background: color-mix(in srgb, var(--ink) 8%, transparent); }
  .x svg { width: 16px; height: 16px; }
  form { display: grid; gap: 10px; }
  input, textarea { width: 100%; padding: 11px 13px; border: 1px solid var(--line); border-radius: 10px; background: transparent; color: var(--ink); font: inherit; font-size: 0.95rem; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
  textarea { min-height: 104px; resize: vertical; line-height: 1.5; }
  input::placeholder, textarea::placeholder { color: var(--muted); }
  input:focus, textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 20%, transparent); }
  .hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
  .send { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 44px; border: 0; border-radius: 10px; background: var(--accent); color: var(--on-accent); font-weight: 600; cursor: pointer; transition: filter 0.2s ease; }
  .send:hover:not(:disabled) { filter: brightness(1.08); }
  .send:disabled { opacity: 0.65; cursor: default; }
  .err { color: #f59e0b; font-size: 0.85rem; }
  .ok { display: grid; justify-items: center; gap: 10px; padding: 18px 0 8px; text-align: center; }
  .ok svg { width: 44px; height: 44px; color: var(--accent); }
  .ok p { font-weight: 600; }
  .ok button { background: none; border: 0; color: var(--muted); cursor: pointer; font: inherit; font-size: 0.86rem; text-decoration: underline; }
`;

/** Botão discreto que abre uma janelinha com o formulário de contato (a mensagem cai no painel). */
export default function ContactModal({ className, children }: { className?: string; children: React.ReactNode }) {
  const { t } = useLang();
  const c = t.contact;
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [f, setF] = useState({ name: "", email: "", message: "", website: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const first = useRef<HTMLInputElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", k);
    const id = setTimeout(() => first.current?.focus(), 60);
    const btn = opener.current;
    return () => { document.body.style.overflow = prevOverflow; window.removeEventListener("keydown", k); clearTimeout(id); btn?.focus(); };
  }, [open]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      if (r.ok) { setState("sent"); setF({ name: "", email: "", message: "", website: "" }); } else setState("error");
    } catch { setState("error"); }
  };

  const modal = (
    <AnimatePresence>
      {open && (
        <Back
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <Box
            role="dialog"
            aria-modal="true"
            aria-label={c.formTitle}
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          >
            <button type="button" className="x" onClick={() => setOpen(false)} aria-label={c.close}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
            {state === "sent" ? (
              <div className="ok" role="status">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="9.5" /><path d="m7.8 12.4 2.8 2.8 5.6-5.8" /></svg>
                <p>{c.sent}</p>
                <button type="button" onClick={() => setState("idle")}>{c.again}</button>
              </div>
            ) : (
              <>
                <h3>{c.formTitle}</h3>
                <p className="sub">{c.formHint}</p>
                <form onSubmit={send}>
                  <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} name="website" />
                  <input ref={first} required minLength={2} maxLength={120} autoComplete="name" placeholder={c.name} aria-label={c.name} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
                  <input required type="email" maxLength={200} autoComplete="email" placeholder={c.email} aria-label={c.email} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
                  <textarea required minLength={10} maxLength={4000} placeholder={c.message} aria-label={c.message} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
                  <button className="send" type="submit" disabled={state === "sending"}>{state === "sending" ? c.sending : c.send} {state !== "sending" && <ArrowRight />}</button>
                  {state === "error" && <span className="err" role="alert">{c.error}</span>}
                </form>
              </>
            )}
          </Box>
        </Back>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button ref={opener} type="button" className={className} onClick={() => { setState("idle"); setOpen(true); }} aria-haspopup="dialog">{children}</button>
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
