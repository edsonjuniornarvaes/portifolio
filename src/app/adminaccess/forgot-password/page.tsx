"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--bg-primary);
`;

const Card = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Input = styled.input`
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-primary);
`;

const Btn = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem;
  border: none;
  border-radius: var(--radius-sm);
  background: var(--accent-gradient);
  color: var(--text-primary);
  font-weight: 600;
  cursor: pointer;
`;

const Msg = styled.p<{ $err?: boolean }>`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: ${(p) => (p.$err ? "#ef4444" : "var(--text-secondary)")};
  white-space: pre-wrap;
`;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setErr(false);
    setLoading(true);
    try {
      const r = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const d = await r.json();
      if (!r.ok) {
        setErr(true);
        setMsg(d.error || "Erro");
        return;
      }
      setMsg(
        d.message +
          (d.devResetUrl ? `\n\n(Dev) Link: ${d.devResetUrl}` : "")
      );
    } catch {
      setErr(true);
      setMsg("Falha na requisição");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrap>
      <Card>
        <Title>Recuperar senha</Title>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Informe o e-mail do administrador. Se houver integração com Resend, você receberá o link.
        </p>
        <form onSubmit={submit}>
          <Input
            type="email"
            required
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Btn type="submit" disabled={loading}>
            {loading ? "Enviando…" : "Enviar link"}
          </Btn>
        </form>
        {msg && <Msg $err={err}>{msg}</Msg>}
        <p style={{ marginTop: "1.25rem", textAlign: "center" }}>
          <Link href="/adminaccess/login" style={{ color: "var(--accent-primary)" }}>
            Voltar ao login
          </Link>
        </p>
      </Card>
    </Wrap>
  );
}
