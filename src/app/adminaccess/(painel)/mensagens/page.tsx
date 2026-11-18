"use client";

import { useCallback, useEffect, useState } from "react";
import { Page, Head, Card, Btn, Notice, Empty, Badge, api, fmtDate } from "../../_components/ui";

type Msg = { id: string; name: string; email: string; message: string; read: boolean; archived: boolean; created_at: string };

export default function Mensagens() {
  const [list, setList] = useState<Msg[] | null>(null);
  const [err, setErr] = useState("");
  const [tab, setTab] = useState<"inbox" | "archived">("inbox");
  const [open, setOpen] = useState<string | null>(null);

  const load = useCallback(async () => {
    const r = await api<{ messages: Msg[] }>("/api/admin/messages");
    if (!r.ok) { setErr(r.data.error || "Não foi possível carregar."); setList([]); return; }
    setErr(""); setList(r.data.messages);
  }, []);
  useEffect(() => { load(); }, [load]);

  const patch = async (id: string, p: Partial<Msg>) => {
    setList((l) => l?.map((m) => (m.id === id ? { ...m, ...p } : m)) ?? l);
    await api("/api/admin/messages", { method: "PATCH", body: JSON.stringify({ id, ...p }) });
  };
  const del = async (id: string) => {
    if (!confirm("Apagar esta mensagem para sempre?")) return;
    setList((l) => l?.filter((m) => m.id !== id) ?? l);
    await api(`/api/admin/messages?id=${id}`, { method: "DELETE" });
  };
  const toggle = (m: Msg) => {
    setOpen(open === m.id ? null : m.id);
    if (!m.read) patch(m.id, { read: true });
  };

  const shown = (list || []).filter((m) => (tab === "inbox" ? !m.archived : m.archived));
  const unread = (list || []).filter((m) => !m.read && !m.archived).length;

  return (
    <Page>
      <Head>
        <div><h1>Mensagens</h1><p>Quem escreveu pelo formulário de contato do site.</p></div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn $v={tab === "inbox" ? undefined : "ghost"} onClick={() => setTab("inbox")}>Caixa de entrada{unread ? ` (${unread})` : ""}</Btn>
          <Btn $v={tab === "archived" ? undefined : "ghost"} onClick={() => setTab("archived")}>Arquivadas</Btn>
        </div>
      </Head>
      {err && <Notice>{err}</Notice>}
      <Card style={{ padding: 0 }}>
        {list === null ? <Empty>Carregando…</Empty> : shown.length === 0 ? <Empty>{tab === "inbox" ? "Nenhuma mensagem por aqui." : "Nada arquivado."}</Empty> : shown.map((m, i) => (
          <div key={m.id} style={{ borderTop: i ? "1px solid var(--border-color)" : 0 }}>
            <button type="button" onClick={() => toggle(m)} style={{ all: "unset", boxSizing: "border-box", display: "block", width: "100%", padding: "14px 18px", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                <b style={{ fontWeight: m.read ? 500 : 700 }}>{!m.read && <span style={{ color: "var(--accent)" }}>● </span>}{m.name} <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>· {m.email}</span></b>
                <small style={{ color: "var(--text-muted)", whiteSpace: "nowrap" }}>{fmtDate(m.created_at)}</small>
              </div>
              {open !== m.id && <div style={{ marginTop: 4, color: "var(--text-secondary)", fontSize: "0.9rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.message}</div>}
            </button>
            {open === m.id && (
              <div style={{ padding: "0 18px 18px" }}>
                <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.65, marginBottom: 14 }}>{m.message}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <a href={`mailto:${m.email}?subject=${encodeURIComponent("Re: seu contato no portfólio")}`}><Btn as="span">Responder por e-mail</Btn></a>
                  <Btn $v="ghost" onClick={() => patch(m.id, { read: false })}>Marcar como não lida</Btn>
                  <Btn $v="ghost" onClick={() => patch(m.id, { archived: !m.archived })}>{m.archived ? "Desarquivar" : "Arquivar"}</Btn>
                  <Btn $v="danger" onClick={() => del(m.id)}>Apagar</Btn>
                  {m.archived && <Badge $c="warn">arquivada</Badge>}
                </div>
              </div>
            )}
          </div>
        ))}
      </Card>
    </Page>
  );
}
