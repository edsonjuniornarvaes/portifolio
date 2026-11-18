"use client";

import { useState } from "react";
import { Page, Head, Card, Btn, Field, Notice, api } from "../../_components/ui";

export default function Conta() {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [hash, setHash] = useState("");
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  const gen = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(""); setHash("");
    if (pw !== pw2) { setErr("As senhas não conferem."); return; }
    setBusy(true);
    const r = await api<{ hash: string }>("/api/admin/hash", { method: "POST", body: JSON.stringify({ password: pw }) });
    setBusy(false);
    if (!r.ok) { setErr(r.data.error || "Não foi possível gerar."); return; }
    setHash(r.data.hash); setPw(""); setPw2("");
  };
  const copy = async () => { try { await navigator.clipboard.writeText(hash); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { /* ignore */ } };

  return (
    <Page>
      <Head><div><h1>Conta</h1><p>Trocar a senha do painel.</p></div></Head>
      <Card style={{ maxWidth: 620 }}>
        <h2>Gerar uma senha nova</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: 16 }}>
          Por segurança a senha fica numa variável de ambiente, não no banco. Aqui você gera o código (hash) da senha nova; depois cola na Vercel e faz um novo deploy. A senha digitada não é guardada em lugar nenhum.
        </p>
        {err && <Notice>{err}</Notice>}
        <form onSubmit={gen} style={{ display: "grid", gap: 12 }}>
          <Field>Senha nova (mín. 10 caracteres)<input type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" required minLength={10} /></Field>
          <Field>Repita a senha<input type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} autoComplete="new-password" required minLength={10} /></Field>
          <Btn type="submit" disabled={busy}>{busy ? "Gerando…" : "Gerar código"}</Btn>
        </form>
        {hash && (
          <div style={{ marginTop: 20 }}>
            <Notice $c="ok">Código gerado. Passos:<br />1. Vercel → Settings → Environment Variables → <code>ADMIN_PASSWORD_HASH</code> → cole o código abaixo.<br />2. Faça um novo deploy (Deployments → Redeploy).<br />3. Pronto: entre com a senha nova.<br />No arquivo <code>.env.local</code>, escreva cada <code>$</code> como <code>\$</code>.</Notice>
            <textarea readOnly value={hash} style={{ width: "100%", height: 70, padding: 10, border: "1px solid var(--border-color)", borderRadius: 10, background: "var(--bg-primary)", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontSize: "0.82rem" }} />
            <Btn $v="ghost" onClick={copy} style={{ marginTop: 8 }}>{copied ? "Copiado ✓" : "Copiar código"}</Btn>
          </div>
        )}
      </Card>
    </Page>
  );
}
