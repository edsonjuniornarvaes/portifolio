"use client";

import { useState } from "react";
import styled from "styled-components";
import { ArrowRight } from "@/components/ui/icons";
import { useLang } from "@/i18n/provider";

const Card = styled.div`
  position: relative; padding: 26px 26px 24px; border: 1px solid color-mix(in srgb, var(--accent) 30%, var(--line)); border-radius: 18px; background: color-mix(in srgb, var(--paper) 70%, transparent); box-shadow: 0 30px 60px -40px color-mix(in srgb, var(--accent) 50%, #000);
  h3 { font-size: 1.3rem; font-weight: 600; letter-spacing: -0.02em; }
  .sub { margin: 4px 0 18px; color: var(--muted); font-size: 0.9rem; }
  form { display: grid; gap: 14px; }
  label { display: grid; gap: 6px; font-family: var(--font-mono); font-size: 0.66rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
  input, textarea { width: 100%; padding: 12px 14px; border: 1px solid var(--line); border-radius: 10px; background: color-mix(in srgb, var(--paper) 60%, transparent); color: var(--ink); font: inherit; font-size: 0.97rem; letter-spacing: 0; text-transform: none; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
  textarea { min-height: 112px; resize: vertical; line-height: 1.5; }
  input:focus, textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent); }
  .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 520px) { .row2 { grid-template-columns: 1fr; } }
  .hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
  .send { display: inline-flex; align-items: center; justify-content: center; gap: 10px; height: 50px; border: 0; border-radius: 12px; background: var(--accent); color: var(--on-accent); font-weight: 700; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .send:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 26px -12px var(--accent); }
  .send:disabled { opacity: 0.65; cursor: default; }
  .err { color: #f59e0b; font-size: 0.88rem; }
  .ok { display: grid; place-items: center; gap: 12px; min-height: 280px; text-align: center; }
  .ok svg { width: 56px; height: 56px; color: var(--accent); }
  .ok p { font-size: 1.1rem; font-weight: 600; }
  .ok button { background: none; border: 0; color: var(--muted); cursor: pointer; text-decoration: underline; font: inherit; font-size: 0.9rem; }
`;

/** Formulário de contato: a mensagem cai no painel (aba Mensagens). */
export default function ContactForm() {
  const { t } = useLang();
  const c = t.contact;
  const [f, setF] = useState({ name: "", email: "", message: "", website: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      if (r.ok) { setState("sent"); setF({ name: "", email: "", message: "", website: "" }); } else setState("error");
    } catch { setState("error"); }
  };
  return (
    <Card>
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
            <div className="row2">
              <label>{c.name}<input required minLength={2} maxLength={120} autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
              <label>{c.email}<input required type="email" maxLength={200} autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></label>
            </div>
            <label>{c.message}<textarea required minLength={10} maxLength={4000} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} /></label>
            <button className="send" type="submit" disabled={state === "sending"}>{state === "sending" ? c.sending : c.send} {state !== "sending" && <ArrowRight />}</button>
            {state === "error" && <span className="err" role="alert">{c.error}</span>}
          </form>
        </>
      )}
    </Card>
  );
}
