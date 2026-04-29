"use client";

import styled from "styled-components";
import Link from "next/link";
import GitHubIcon from "@/assets/icons/social/github";
import LinkedInIcon from "@/assets/icons/social/linkedin";

const Foot = styled.footer`
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--border-color);
  padding: 40px 24px 28px;
  color: var(--text-muted);
  font-size: 0.85rem;
`;

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Top = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`;

const Brand = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-decoration: none;
`;

const BrandName = styled.span`
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1rem;
  color: var(--text-primary);
`;

const BrandRole = styled.span`
  font-size: 0.8rem;
  color: var(--text-muted);
`;

const Socials = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  transition: color 0.2s, border-color 0.2s;

  &:hover {
    color: var(--accent-primary);
    border-color: var(--accent-primary);
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--border-color);
`;

const Bottom = styled.div`
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.02em;
`;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Foot>
      <Inner>
        <Top>
          <Brand href="/home">
            <BrandName>edsonjunior</BrandName>
            <BrandRole>Mobile Developer · React Native</BrandRole>
          </Brand>
          <Socials>
            <SocialLink
              href="https://github.com/edsonjuniornarvaes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon width={18} height={18} color="currentColor" />
            </SocialLink>
            <SocialLink
              href="https://linkedin.com/in/edsonjuniornarvaes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon width={18} height={18} color="currentColor" />
            </SocialLink>
          </Socials>
        </Top>
        <Divider />
        <Bottom>&copy; {year} Edson Junior. Todos os direitos reservados.</Bottom>
      </Inner>
    </Foot>
  );
}
