"use client";

import { useCallback, useEffect, useState } from "react";
import { Page, Head, Card, Grid, Btn, Field, Notice, Empty, api, fmtDay } from "../../_components/ui";

type Item = { id: string; kind: "event" | "note"; title: string; body: string; due_date: string | null; done: boolean };

export default function Agenda() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [err, setErr] = useState("");
  const [ev, setEv] = useState({ title: "", due_date: "" });
  const [note, setNote] = useState({ title: "", body: "" });

  const load = useCallback(async () => {
    const r = await api<{ items: Item[] }>("/api/admin/team");
    if (!r.ok) { setErr(r.data.error || "Não foi possível carregar."); setItems([]); return; }
    setErr(""); setItems(r.data.items);
  }, []);
  useEffect(() => { load(); }, [load]);

  const add = async (body: object, reset: () => void) => {
    const r = await api("/api/admin/team", { method: "POST", body: JSON.stringify(body) });
    if (!r.ok) { setErr(r.data.error || "Não foi possível salvar."); return; }
    setErr(""); reset(); load();
  };
  const toggle = async (it: Item) => {
    setItems((l) => l?.map((x) => (x.id === it.id ? { ...x, done: !x.done } : x)) ?? l);
    await api("/api/admin/team", { method: "PATCH", body: JSON.stringify({ id: it.id, done: !it.done }) });
  };
  const del = async (id: string) => {
    setItems((l) => l?.filter((x) => x.id !== id) ?? l);
    await api(`/api/admin/team?id=${id}`, { method: "DELETE" });
  };

  const today = new Date().toISOString().slice(0, 10);
  const events = (items || []).filter((i) => i.kind === "event");
  const notes = (items || []).filter((i) => i.kind === "note");

  return (
    <Page>
      <Head><div><h1>Agenda e notas</h1><p>Seus compromissos e anotações rápidas.</p></div></Head>
      {err && <Notice>{err}</Notice>}
      <Grid $min={340}>
        <Card>
          <h2>Compromissos</h2>
          <form onSubmit={(e) => { e.preventDefault(); add({ kind: "event", ...ev }, () => setEv({ title: "", due_date: "" })); }} style={{ display: "grid", gap: 10, marginBottom: 14 }}>
            <Field>O que<input value={ev.title} onChange={(e) => setEv({ ...ev, title: e.target.value })} placeholder="Ex.: entrevista, entrega do projeto" required maxLength={200} /></Field>
            <Field>Dia<input type="date" value={ev.due_date} onChange={(e) => setEv({ ...ev, due_date: e.target.value })} required /></Field>
            <Btn type="submit">Adicionar</Btn>
          </form>
          {items === null ? <Empty>Carregando…</Empty> : events.length === 0 ? <Empty>Nenhum compromisso.</Empty> : events.map((e) => (
            <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderTop: "1px solid var(--border-color)", opacity: e.done ? 0.5 : 1 }}>
              <input type="checkbox" checked={e.done} onChange={() => toggle(e)} aria-label="Concluído" />
              <span style={{ flex: 1, textDecoration: e.done ? "line-through" : "none" }}>{e.title}</span>
              {e.due_date && <small style={{ color: !e.done && e.due_date < today ? "#ef4444" : "var(--accent)" }}>{fmtDay(e.due_date)}</small>}
              <button type="button" onClick={() => del(e.id)} aria-label="Apagar" style={{ all: "unset", cursor: "pointer", color: "var(--text-muted)", padding: 4 }}>✕</button>
            </div>
          ))}
        </Card>
        <Card>
          <h2>Notas</h2>
          <form onSubmit={(e) => { e.preventDefault(); add({ kind: "note", ...note }, () => setNote({ title: "", body: "" })); }} style={{ display: "grid", gap: 10, marginBottom: 14 }}>
            <Field>Título<input value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} required maxLength={200} /></Field>
            <Field>Texto<textarea value={note.body} onChange={(e) => setNote({ ...note, body: e.target.value })} maxLength={4000} /></Field>
            <Btn type="submit">Salvar nota</Btn>
          </form>
          {items === null ? <Empty>Carregando…</Empty> : notes.length === 0 ? <Empty>Nenhuma nota.</Empty> : notes.map((n) => (
            <div key={n.id} style={{ padding: "12px 0", borderTop: "1px solid var(--border-color)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><b>{n.title}</b>
                <button type="button" onClick={() => del(n.id)} aria-label="Apagar" style={{ all: "unset", cursor: "pointer", color: "var(--text-muted)", padding: 4 }}>✕</button></div>
              {n.body && <p style={{ marginTop: 4, whiteSpace: "pre-wrap", color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.55 }}>{n.body}</p>}
            </div>
          ))}
        </Card>
      </Grid>
    </Page>
  );
}
