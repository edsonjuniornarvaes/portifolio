"use client";

import styled from "styled-components";

const Foot = styled.footer`
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--border-color);
  padding: 32px 24px;
`;

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LogoMark = styled.span`
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent-primary);
  letter-spacing: -0.02em;

  &::before {
    content: '<';
    color: var(--text-muted);
  }
  &::after {
    content: ' />';
    color: var(--text-muted);
  }
`;

const Copy = styled.span`
  font-size: 0.75rem;
  color: var(--text-muted);
`;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Foot>
      <Inner>
        <LogoMark>ej</LogoMark>
        <Copy>&copy; {year} Todos os direitos reservados.</Copy>
      </Inner>
    </Foot>
  );
}
