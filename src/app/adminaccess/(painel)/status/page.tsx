"use client";

import { useEffect, useState } from "react";
import { Page, Head, Card, Grid, Badge, Btn, api } from "../../_components/ui";

type St = { env: { key: string; label: string; ok: boolean }[]; tables: { table: string; ok: boolean }[]; ms: number; node: string; vercel: boolean; region: string | null; commit: string | null };

export default function Status() {
  const [s, setS] = useState<St | null>(null);
  const load = () => { setS(null); api<St>("/api/admin/status").then((r) => setS(r.data as St)); };
  useEffect(load, []);
  return (
    <Page>
      <Head><div><h1>Status</h1><p>O que está configurado e funcionando (só “sim/não”, nunca os valores).</p></div><Btn $v="ghost" onClick={load}>Verificar de novo</Btn></Head>
      <Grid $min={340}>
        <Card>
          <h2>Variáveis de ambiente</h2>
          {s ? s.env.map((e) => (
            <div key={e.key} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "9px 0", borderTop: "1px solid var(--border-color)" }}>
              <span>{e.label}<br /><small style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{e.key}</small></span>
              <Badge $c={e.ok ? "ok" : "warn"}>{e.ok ? "configurada" : "faltando"}</Badge>
            </div>
          )) : "Verificando…"}
        </Card>
        <Card>
          <h2>Banco de dados (Supabase)</h2>
          {s ? <>
            {s.tables.map((t) => (
              <div key={t.table} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderTop: "1px solid var(--border-color)" }}>
                <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.88rem" }}>{t.table}</code>
                <Badge $c={t.ok ? "ok" : "off"}>{t.ok ? "ok" : "não encontrada"}</Badge>
              </div>
            ))}
            <p style={{ marginTop: 14, color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.6 }}>
              Resposta em {s.ms} ms · Node {s.node}{s.vercel ? " · rodando na Vercel" : " · ambiente local"}{s.region ? ` (${s.region})` : ""}{s.commit ? ` · versão ${s.commit}` : ""}
            </p>
          </> : "Verificando…"}
        </Card>
      </Grid>
    </Page>
  );
}
