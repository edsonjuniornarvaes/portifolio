"use client";

import styled from "styled-components";
import { usePathname } from "next/navigation";
import LocalTime from "@/components/ui/local-time";
import { contact } from "@/data/profile";

const Foot = styled.footer`
  border-top: 1px solid var(--line);
  margin-top: 80px;
`;

const Inner = styled.div`
  max-width: 880px;
  margin: 0 auto;
  padding: 22px 24px 36px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px 32px;
  font-size: 0.8rem;
  color: var(--muted);
  a:hover { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
  .links { display: flex; gap: 20px; }
`;

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/adminaccess")) return null;

  return (
    <Foot>
      <Inner>
        <span>
          © {new Date().getFullYear()} Edson Junior · Brasil · <LocalTime />
        </span>
        <span className="links">
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={contact.devto} target="_blank" rel="noopener noreferrer">Dev.to</a>
        </span>
      </Inner>
    </Foot>
  );
}
