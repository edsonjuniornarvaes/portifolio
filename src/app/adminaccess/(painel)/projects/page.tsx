"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Wrap = styled.div`
  padding: 2rem;
  max-width: 720px;
  margin: 0 auto;
`;

const Row = styled.div`
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 16px 18px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  background: var(--bg-card);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

const Sub = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const EditLink = styled(Link)`
  font-size: 0.9rem;
  color: var(--accent-primary);
  font-weight: 600;
`;

type Brief = { id: string; title: string; type: string };

export default function AdminProjectsListPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Brief[]>([]);

  const authHeaders = (): HeadersInit => ({
    Authorization: `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("admin_token") || "" : ""}`,
  });

  useEffect(() => {
    const t = sessionStorage.getItem("admin_token");
    if (!t) {
      router.push("/adminaccess/login");
      return;
    }
    (async () => {
      const res = await fetch("/api/admin/projects", { headers: authHeaders() });
      if (res.status === 401) {
        sessionStorage.removeItem("admin_token");
        router.push("/adminaccess/login");
        return;
      }
      if (res.ok) {
        const j = await res.json();
        setProjects(j.projects || []);
      }
    })();
  }, [router]);

  return (
    <Wrap>
      <Title>Projetos do portfólio</Title>
      <Sub>
        Ajuste mockups, destaques, galeria e textos por projeto. Os dados base (título, links fixos) continuam no
        código; o que você salvar aqui sobrescreve ou complementa via Supabase.
      </Sub>
      {projects.map((p) => (
        <Row key={p.id}>
          <div>
            <strong style={{ color: "var(--text-primary)" }}>{p.title}</strong>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>
              {p.id} · {p.type}
            </div>
          </div>
          <EditLink href={`/adminaccess/projects/${encodeURIComponent(p.id)}`}>Editar</EditLink>
        </Row>
      ))}
    </Wrap>
  );
}
