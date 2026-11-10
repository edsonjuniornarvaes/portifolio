"use client";

import styled from "styled-components";
import { usePathname } from "next/navigation";
import { useLang } from "@/i18n/provider";
import { contact } from "@/data/profile";

const Foot = styled.footer`
  margin-top: 120px; border-top: 1px solid var(--line);
  .in { max-width: var(--wrap); margin: 0 auto; padding: 26px var(--gutter) 40px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px 28px; font-size: 0.85rem; color: var(--muted); }
  .links { display: flex; flex-wrap: wrap; gap: 6px 20px; }
  .links a:hover { color: var(--ink); }
`;

export default function SiteFooter() {
  const pathname = usePathname();
  const { t } = useLang();
  if (pathname.startsWith("/adminaccess")) return null;
  return (
    <Foot>
      <div className="in">
        <span>© {new Date().getFullYear()} Edson Junior · {t.footer.coffee}</span>
        <div className="links">
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={contact.devto} target="_blank" rel="noopener noreferrer">Dev.to</a>
        </div>
      </div>
    </Foot>
  );
}
