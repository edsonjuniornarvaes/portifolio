"use client";

import { useEffect, useState } from "react";
import { Page, Head, Card, Grid, Btn, Field, Notice, api } from "../../_components/ui";

type Links = { email: string; linkedin: string; github: string; instagram: string; twitter: string };

export default function Textos() {
  const [links, setLinks] = useState<Links>({ email: "", linkedin: "", github: "", instagram: "", twitter: "" });
  const [status, setStatus] = useState({ available: true, message: "" });
  const [msg, setMsg] = useState<{ t: "ok" | "err"; s: string } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<{ settings: { links?: Partial<Links>; status?: { available?: boolean; message?: string } } }>("/api/admin/settings").then((r) => {
      if (!r.ok) { setMsg({ t: "err", s: r.data.error || "Não foi possível carregar." }); return; }
      const s = r.data.settings;
      setLinks((l) => ({ ...l, ...(s.links || {}) }));
      setStatus((x) => ({ available: s.status?.available !== false, message: s.status?.message || x.message }));
    });
  }, []);

  const save = async (key: "links" | "status", value: object) => {
    setBusy(true);
    const r = await api("/api/admin/settings", { method: "PUT", body: JSON.stringify({ key, value }) });
    setBusy(false);
    setMsg(r.ok ? { t: "ok", s: "Salvo. O site atualiza em até 1 minuto." } : { t: "err", s: r.data.error || "Não foi possível salvar." });
  };
  const set = (k: keyof Links) => (e: React.ChangeEvent<HTMLInputElement>) => setLinks({ ...links, [k]: e.target.value });

  return (
    <Page>
      <Head><div><h1>Textos e links</h1><p>Mude o que aparece na seção de contato sem mexer no código. Campo vazio = usa o padrão do site.</p></div></Head>
      {msg && <Notice $c={msg.t === "ok" ? "ok" : "err"}>{msg.s}</Notice>}
      <Grid $min={360}>
        <Card>
          <h2>Contato e redes</h2>
          <form onSubmit={(e) => { e.preventDefault(); save("links", links); }} style={{ display: "grid", gap: 12 }}>
            <Field>E-mail<input type="email" value={links.email} onChange={set("email")} placeholder="voce@exemplo.com" /></Field>
            <Field>LinkedIn<input value={links.linkedin} onChange={set("linkedin")} placeholder="https://linkedin.com/in/…" /></Field>
            <Field>GitHub<input value={links.github} onChange={set("github")} placeholder="https://github.com/…" /></Field>
            <Field>Instagram<input value={links.instagram} onChange={set("instagram")} placeholder="https://instagram.com/…" /></Field>
            <Field>X (Twitter)<input value={links.twitter} onChange={set("twitter")} placeholder="https://x.com/…" /></Field>
            <Btn type="submit" disabled={busy}>Salvar links</Btn>
          </form>
        </Card>
        <Card>
          <h2>Disponibilidade</h2>
          <form onSubmit={(e) => { e.preventDefault(); save("status", status); }} style={{ display: "grid", gap: 12 }}>
            <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="checkbox" checked={status.available} onChange={(e) => setStatus({ ...status, available: e.target.checked })} />
              Aberto a novas conversas e projetos
            </label>
            <Field>Frase curta (opcional)<input value={status.message} onChange={(e) => setStatus({ ...status, message: e.target.value })} maxLength={160} placeholder="Ex.: respondo em até 24 h" /></Field>
            <Btn type="submit" disabled={busy}>Salvar</Btn>
          </form>
        </Card>
      </Grid>
    </Page>
  );
}
