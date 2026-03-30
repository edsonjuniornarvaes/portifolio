"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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

function ResetForm() {
  const params = useSearchParams();
  const token = params.get("token") || "";
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setErr(false);
    if (password !== password2) {
      setErr(true);
      setMsg("As senhas não coincidem");
      return;
    }
    setLoading(true);
    try {
      const r = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const d = await r.json();
      if (!r.ok) {
        setErr(true);
        setMsg(d.error || "Erro");
        return;
      }
      setMsg("Senha alterada. Redirecionando…");
      setTimeout(() => router.push("/adminaccess/login"), 1200);
    } catch {
      setErr(true);
      setMsg("Falha na requisição");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Wrap>
        <Card>
          <Title>Link inválido</Title>
          <p style={{ color: "var(--text-secondary)" }}>Falta o token na URL.</p>
          <Link href="/adminaccess/forgot-password" style={{ color: "var(--accent-primary)" }}>
            Solicitar novo link
          </Link>
        </Card>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Card>
        <Title>Nova senha</Title>
        <form onSubmit={submit}>
          <Input
            type="password"
            required
            minLength={8}
            placeholder="Nova senha (mín. 8)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            required
            placeholder="Confirmar senha"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <Btn type="submit" disabled={loading}>
            {loading ? "Salvando…" : "Salvar"}
          </Btn>
        </form>
        {msg && (
          <p style={{ marginTop: "1rem", color: err ? "#ef4444" : "var(--accent-primary)", fontSize: "0.9rem" }}>
            {msg}
          </p>
        )}
      </Card>
    </Wrap>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Wrap><Card><p style={{ color: "var(--text-muted)" }}>Carregando…</p></Card></Wrap>}>
      <ResetForm />
    </Suspense>
  );
}
