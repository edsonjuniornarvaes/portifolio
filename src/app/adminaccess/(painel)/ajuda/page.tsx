"use client";

import Link from "next/link";
import { Page, Head, Card, Notice } from "../../_components/ui";

const items: [string, React.ReactNode][] = [
  ["Rodar o SQL do painel (uma vez)", <>Supabase → SQL Editor → New query → cole o conteúdo de <code>supabase-admin.sql</code> (na raiz do repositório) → Run. Isso cria as tabelas de mensagens, agenda/notas e textos. Depois confira em <Link href="/adminaccess/status" style={{ color: "var(--accent)" }}>Status</Link>.</>],
  ["Como chegam as mensagens", <>O formulário de contato do site grava no banco e aparece em <Link href="/adminaccess/mensagens" style={{ color: "var(--accent)" }}>Mensagens</Link>, com contador de não lidas no menu. Limite de 5 envios por hora por pessoa e campo-isca contra robôs.</>],
  ["Mudar e-mail e redes do site", <>Em <Link href="/adminaccess/textos" style={{ color: "var(--accent)" }}>Textos e links</Link>. Campo vazio usa o valor padrão do código. A mudança aparece no site em até 1 minuto.</>],
  ["Escrever um artigo", <>Em <Link href="/adminaccess/posts" style={{ color: "var(--accent)" }}>Artigos</Link>: título, capa e texto em Markdown. “Publicar” coloca no ar; sem publicar fica como rascunho.</>],
  ["Trocar a senha", <>Em <Link href="/adminaccess/conta" style={{ color: "var(--accent)" }}>Conta</Link>. A senha vive numa variável de ambiente da Vercel (<code>ADMIN_PASSWORD_HASH</code>).</>],
  ["Segurança do painel", <>Sessão em cookie protegido (HttpOnly), expira em 12 h, limite de tentativas no login e checagem de origem nas ações. Se suspeitar de vazamento: gere uma senha nova e troque também <code>ADMIN_SESSION_SECRET</code> (isso derruba todas as sessões).</>],
  ["Esqueci a senha", <>Na tela de login, “esqueci a senha” (precisa de <code>RESEND_API_KEY</code>). Sem isso, gere um hash novo (em Conta, quando logado, ou com <code>bcryptjs</code> localmente) e atualize na Vercel.</>],
];

export default function Ajuda() {
  return (
    <Page>
      <Head><div><h1>Ajuda</h1><p>Como usar e manter o painel.</p></div></Head>
      <Notice>Dica: o ponto de partida é a aba <Link href="/adminaccess/status" style={{ color: "var(--accent)" }}><b>Status</b></Link> — ela mostra o que ainda falta configurar.</Notice>
      <div style={{ display: "grid", gap: 14 }}>
        {items.map(([t, b]) => (
          <Card key={t}><h2>{t}</h2><p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.93rem" }}>{b}</p></Card>
        ))}
      </div>
    </Page>
  );
}
