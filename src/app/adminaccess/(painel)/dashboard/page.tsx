"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Page, Head, Grid, Stat, Card, Notice, Empty, api, fmtDate, fmtDay } from "../../_components/ui";

type Summary = {
  configured: boolean; unread: number | null; messages: number | null; posts: number | null; published: number | null; upcoming: number | null;
  next: { id: string; title: string; due_date: string }[]; latest: { id: string; name: string; message: string; read: boolean; created_at: string }[];
};

const greet = () => { const h = new Date().getHours(); return h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite"; };

export default function Inicio() {
  const [s, setS] = useState<Summary | null>(null);
  useEffect(() => { api<Summary>("/api/admin/summary").then((r) => setS(r.data as Summary)); }, []);
  const n = (v: number | null | undefined) => (v === null || v === undefined ? "—" : v);
  const missing = s && s.configured && [s.unread, s.posts].some((v) => v === null);
  return (
    <Page>
      <Head><div><h1>{greet()}, Edson</h1><p>Resumo do seu portfólio.</p></div></Head>
      {s && !s.configured && <Notice>O Supabase não está configurado neste ambiente. Veja a aba <Link href="/adminaccess/status"><b>Status</b></Link>.</Notice>}
      {missing && <Notice>Algumas tabelas ainda não existem. Rode o arquivo <code>supabase-admin.sql</code> no SQL Editor do Supabase (aba <Link href="/adminaccess/ajuda"><b>Ajuda</b></Link> explica).</Notice>}
      <Grid $min={190}>
        <Stat><div className="n">{n(s?.unread)}</div><div className="l">Mensagens novas</div></Stat>
        <Stat><div className="n">{n(s?.published)}<span style={{ fontSize: "1rem", color: "var(--text-muted)" }}> / {n(s?.posts)}</span></div><div className="l">Artigos publicados / total</div></Stat>
        <Stat><div className="n">{n(s?.upcoming)}</div><div className="l">Compromissos à frente</div></Stat>
        <Stat><div className="n">{n(s?.messages)}</div><div className="l">Mensagens recebidas</div></Stat>
      </Grid>
      <Grid $min={320} style={{ marginTop: 16 }}>
        <Card>
          <h2>Últimas mensagens</h2>
          {s?.latest?.length ? s.latest.map((m) => (
            <Link key={m.id} href="/adminaccess/mensagens" style={{ display: "block", padding: "10px 0", borderTop: "1px solid var(--border-color)" }}>
              <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
                <b style={{ fontWeight: m.read ? 500 : 700 }}>{!m.read && <span style={{ color: "var(--accent)" }}>● </span>}{m.name}</b>
                <small style={{ color: "var(--text-muted)" }}>{fmtDate(m.created_at)}</small>
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.88rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.message}</div>
            </Link>
          )) : <Empty>Nenhuma mensagem ainda.</Empty>}
        </Card>
        <Card>
          <h2>Próximos compromissos</h2>
          {s?.next?.length ? s.next.map((e) => (
            <div key={e.id} style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "10px 0", borderTop: "1px solid var(--border-color)" }}>
              <span>{e.title}</span><small style={{ color: "var(--accent)" }}>{fmtDay(e.due_date)}</small>
            </div>
          )) : <Empty>Nada agendado. <Link href="/adminaccess/agenda" style={{ color: "var(--accent)" }}>Adicionar</Link></Empty>}
        </Card>
      </Grid>
      <Grid $min={200} style={{ marginTop: 16 }}>
        {[["/adminaccess/posts", "Escrever artigo"], ["/adminaccess/projects", "Editar projetos"], ["/adminaccess/acessos", "Ver acessos"], ["/adminaccess/textos", "Textos e links"]].map(([h, l]) => (
          <Link key={h} href={h}><Card style={{ textAlign: "center", fontWeight: 600 }}>{l} →</Card></Link>
        ))}
      </Grid>
    </Page>
  );
}
