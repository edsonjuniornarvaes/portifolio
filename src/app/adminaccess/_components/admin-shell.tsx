"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";

const NAV: { href: string; label: string; icon: string; badge?: "unread" }[] = [
  { href: "/adminaccess/dashboard", label: "Início", icon: "◧" },
  { href: "/adminaccess/mensagens", label: "Mensagens", icon: "✉", badge: "unread" },
  { href: "/adminaccess/projects", label: "Projetos", icon: "▣" },
  { href: "/adminaccess/posts", label: "Artigos", icon: "✎" },
  { href: "/adminaccess/acessos", label: "Acessos", icon: "◔" },
  { href: "/adminaccess/agenda", label: "Agenda e notas", icon: "☰" },
  { href: "/adminaccess/textos", label: "Textos e links", icon: "❝" },
  { href: "/adminaccess/status", label: "Status", icon: "●" },
  { href: "/adminaccess/conta", label: "Conta", icon: "◉" },
  { href: "/adminaccess/ajuda", label: "Ajuda", icon: "?" },
];

const Shell = styled.div`
  min-height: 100vh; background: var(--bg-primary); display: grid; grid-template-columns: 236px minmax(0, 1fr);
  @media (max-width: 860px) { grid-template-columns: 1fr; }
`;
const Side = styled.aside`
  position: sticky; top: 0; height: 100vh; display: flex; flex-direction: column; gap: 6px; padding: 20px 14px; border-right: 1px solid var(--border-color); background: var(--bg-card);
  .brand { display: block; padding: 4px 10px 18px; font-weight: 800; letter-spacing: -0.02em; font-size: 1.05rem; }
  .brand small { display: block; margin-top: 2px; font-size: 0.72rem; font-weight: 500; color: var(--text-muted); letter-spacing: 0; }
  nav { display: flex; flex-direction: column; gap: 2px; }
  .sp { flex: 1; }
  @media (max-width: 860px) {
    position: static; height: auto; flex-direction: row; align-items: center; gap: 10px; padding: 10px 12px; border-right: 0; border-bottom: 1px solid var(--border-color); overflow-x: auto; scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
    .brand { padding: 0 6px 0 2px; white-space: nowrap; } .brand small { display: none; }
    nav { flex-direction: row; } .sp { display: none; }
  }
`;
const Item = styled(Link)<{ $on: boolean }>`
  display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 10px; font-size: 0.92rem; font-weight: 500; white-space: nowrap;
  color: ${(p) => (p.$on ? "var(--accent)" : "var(--text-secondary)")}; background: ${(p) => (p.$on ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "transparent")};
  transition: background 0.15s ease, color 0.15s ease;
  &:hover { color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, transparent); }
  .ic { width: 18px; text-align: center; font-size: 0.95rem; opacity: 0.9; }
  .bd { margin-left: auto; min-width: 20px; height: 20px; padding: 0 6px; border-radius: 99px; background: var(--accent); color: var(--bg-primary); font-size: 0.72rem; font-weight: 700; display: grid; place-items: center; }
`;
const Out = styled.button`
  display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 10px; border: 0; background: transparent; color: var(--text-secondary); font-size: 0.92rem; cursor: pointer; text-align: left; white-space: nowrap;
  &:hover { color: #ef4444; background: rgba(239, 68, 68, 0.08); }
`;
const Main = styled.main`
  min-width: 0;
`;

function active(pathname: string | null, href: string) {
  if (!pathname) return false;
  return href === "/adminaccess/dashboard" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    let off = false;
    fetch("/api/admin/summary")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (!off && d?.unread) setUnread(d.unread); })
      .catch(() => {});
    return () => { off = true; };
  }, [pathname]);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    router.replace("/adminaccess/login");
    router.refresh();
  };

  return (
    <Shell>
      <Side>
        <Link href="/adminaccess/dashboard" className="brand">
          Painel
          <small>Edson Junior · portfólio</small>
        </Link>
        <nav aria-label="Painel">
          {NAV.map((n) => (
            <Item key={n.href} href={n.href} $on={active(pathname, n.href)}>
              <span className="ic" aria-hidden>{n.icon}</span>
              {n.label}
              {n.badge === "unread" && unread > 0 && <span className="bd">{unread > 99 ? "99+" : unread}</span>}
            </Item>
          ))}
        </nav>
        <div className="sp" />
        <Item href="/home" target="_blank" rel="noreferrer" $on={false}><span className="ic" aria-hidden>↗</span>Ver o site</Item>
        <Out type="button" onClick={logout}><span className="ic" aria-hidden>⏻</span>Sair</Out>
      </Side>
      <Main>{children}</Main>
    </Shell>
  );
}
