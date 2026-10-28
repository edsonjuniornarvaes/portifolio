"use client";

import styled from "styled-components";
import Link from "next/link";
import GitHubIcon from "@/assets/icons/social/github";
import LinkedInIcon from "@/assets/icons/social/linkedin";
import DevtoIcon from "@/assets/icons/social/devto";

const Foot = styled.footer`
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--border-color);
  padding: 40px 24px;
`;

const Inner = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  strong {
    font-family: var(--font-mono);
    font-size: 0.95rem;
    color: var(--accent-primary);
  }
  strong::before { content: "<"; color: var(--text-muted); }
  strong::after { content: " />"; color: var(--text-muted); }
  span { font-size: 0.78rem; color: var(--text-muted); }
`;

const Links = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  a { transition: color 0.2s ease; }
  a:hover { color: var(--accent-primary); }
`;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Foot>
      <Inner>
        <Brand>
          <strong>edson junior</strong>
          <span>&copy; {year} · Feito com Next.js, TypeScript e muito café</span>
        </Brand>
        <Links aria-label="Rodapé">
          <Link href="/about">Sobre</Link>
          <Link href="/projects">Projetos</Link>
          <Link href="/blog">Artigos</Link>
          <a href="https://github.com/edsonjuniornarvaes" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GitHubIcon width={20} height={20} color="currentColor" />
          </a>
          <a href="https://linkedin.com/in/edsonjuniornarvaes" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedInIcon width={20} height={20} color="currentColor" />
          </a>
          <a href="https://dev.to/edsonjuniornarvaes" target="_blank" rel="noopener noreferrer" aria-label="Dev.to">
            <DevtoIcon width={20} height={20} color="currentColor" />
          </a>
        </Links>
      </Inner>
    </Foot>
  );
}
