"use client";

import styled from "styled-components";

export const Page = styled.div`
  max-width: 1080px; margin: 0 auto; padding: 32px 28px 80px;
  @media (max-width: 600px) { padding: 22px 16px 64px; }
`;
export const Head = styled.header`
  display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 12px 20px; margin-bottom: 26px;
  h1 { font-size: 1.7rem; font-weight: 700; letter-spacing: -0.02em; }
  p { margin-top: 4px; color: var(--text-secondary); font-size: 0.95rem; }
`;
export const Card = styled.section`
  padding: 20px; border: 1px solid var(--border-color); border-radius: 14px; background: var(--bg-card);
  h2 { font-size: 0.95rem; font-weight: 600; margin-bottom: 12px; }
`;
export const Grid = styled.div<{ $min?: number }>`
  display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(${(p) => p.$min ?? 240}px, 1fr));
`;
export const Stat = styled(Card)`
  .n { font-size: 2rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; }
  .l { margin-top: 4px; color: var(--text-secondary); font-size: 0.85rem; }
`;
export const Btn = styled.button<{ $v?: "ghost" | "danger" }>`
  display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 38px; padding: 0 16px; border-radius: 10px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: opacity 0.15s ease, border-color 0.15s ease;
  border: 1px solid ${(p) => (p.$v === "danger" ? "rgba(239,68,68,0.5)" : p.$v === "ghost" ? "var(--border-color)" : "transparent")};
  background: ${(p) => (p.$v ? "transparent" : "var(--accent)")};
  color: ${(p) => (p.$v === "danger" ? "#ef4444" : p.$v === "ghost" ? "var(--text-primary)" : "var(--bg-primary)")};
  &:hover:not(:disabled) { opacity: 0.85; ${(p) => (p.$v === "ghost" ? "border-color: var(--accent);" : "")} }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;
export const Field = styled.label`
  display: grid; gap: 6px; font-size: 0.82rem; font-weight: 600; color: var(--text-secondary);
  input, textarea, select { width: 100%; padding: 10px 12px; border: 1px solid var(--border-color); border-radius: 10px; background: var(--bg-primary); color: var(--text-primary); font: inherit; font-weight: 400; font-size: 0.95rem; }
  textarea { min-height: 110px; resize: vertical; line-height: 1.5; }
  input:focus, textarea:focus, select:focus { outline: 2px solid color-mix(in srgb, var(--accent) 60%, transparent); outline-offset: 1px; border-color: var(--accent); }
`;
export const Badge = styled.span<{ $c?: "ok" | "warn" | "off" }>`
  display: inline-flex; align-items: center; height: 22px; padding: 0 9px; border-radius: 99px; font-size: 0.75rem; font-weight: 600;
  background: ${(p) => (p.$c === "ok" ? "rgba(46,235,170,0.14)" : p.$c === "warn" ? "rgba(245,158,11,0.16)" : "rgba(239,68,68,0.14)")};
  color: ${(p) => (p.$c === "ok" ? "#2eebaa" : p.$c === "warn" ? "#f59e0b" : "#ef4444")};
`;
export const Empty = styled.p`
  padding: 28px 8px; text-align: center; color: var(--text-muted); font-size: 0.92rem;
`;
export const Notice = styled.div<{ $c?: "err" | "ok" }>`
  padding: 12px 14px; border-radius: 10px; font-size: 0.9rem; line-height: 1.5; margin-bottom: 16px;
  border: 1px solid ${(p) => (p.$c === "ok" ? "rgba(46,235,170,0.4)" : "rgba(245,158,11,0.5)")};
  background: ${(p) => (p.$c === "ok" ? "rgba(46,235,170,0.08)" : "rgba(245,158,11,0.08)")};
  code { font-family: var(--font-mono); font-size: 0.85em; }
`;

/** fetch do painel: mesma origem (o cookie vai sozinho); 401 volta ao login. */
export async function api<T = unknown>(url: string, init?: RequestInit): Promise<{ ok: boolean; status: number; data: T & { error?: string; setup?: boolean } }> {
  const res = await fetch(url, { ...init, headers: { "Content-Type": "application/json", ...(init?.headers || {}) } });
  if (res.status === 401 && typeof window !== "undefined") window.location.href = "/adminaccess/login";
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export const fmtDate = (iso: string) => new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
export const fmtDay = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" });
