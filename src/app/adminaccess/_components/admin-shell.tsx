"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";

const Shell = styled.div`
  min-height: 100vh;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
`;

const Top = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 20px;
  padding: 14px 24px;
  border-bottom: 1px solid var(--border-color);
  background: rgba(10, 10, 14, 0.92);
  backdrop-filter: blur(12px);
`;

const Brand = styled(Link)`
  font-weight: 800;
  font-size: 1rem;
  text-decoration: none;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
`;

const BrandSub = styled.span`
  display: block;
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--text-muted);
  -webkit-text-fill-color: var(--text-muted);
  margin-top: 2px;
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all var(--transition-fast);
  border: 1px solid
    ${(p) => (p.$active ? "transparent" : "var(--border-color)")};
  color: ${(p) => (p.$active ? "var(--bg-primary)" : "var(--text-primary)")};
  background: ${(p) => (p.$active ? "var(--accent-gradient)" : "var(--bg-card)")};

  &:hover {
    border-color: var(--accent-primary);
    color: ${(p) => (p.$active ? "var(--bg-primary)" : "var(--accent-primary)")};
  }
`;

const LogoutButton = styled.button`
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.85rem;
  cursor: pointer;
  &:hover {
    border-color: rgba(239, 68, 68, 0.5);
    color: #ef4444;
  }
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
`;

function navActive(pathname: string | null, prefix: string) {
  if (!pathname) return false;
  if (prefix === "/adminaccess/dashboard") return pathname === prefix;
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    sessionStorage.removeItem("admin_token");
    router.push("/adminaccess/login");
  };

  return (
    <Shell>
      <Top>
        <div>
          <Brand href="/adminaccess/dashboard">Painel admin</Brand>
          <BrandSub>Apenas você — posts, projetos e métricas</BrandSub>
        </div>
        <Nav>
          <NavLink href="/adminaccess/dashboard" $active={navActive(pathname, "/adminaccess/dashboard")}>
            Métricas
          </NavLink>
          <NavLink href="/adminaccess/posts" $active={navActive(pathname, "/adminaccess/posts")}>
            Artigos
          </NavLink>
          <NavLink href="/adminaccess/projects" $active={navActive(pathname, "/adminaccess/projects")}>
            Projetos
          </NavLink>
          <LogoutButton type="button" onClick={logout}>
            Sair
          </LogoutButton>
        </Nav>
      </Top>
      <Main>{children}</Main>
    </Shell>
  );
}
