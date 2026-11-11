"use client";

import styled from "styled-components";
import { usePathname } from "next/navigation";
import { useLang } from "@/i18n/provider";
import { contact } from "@/data/profile";

const Foot = styled.footer`
  margin-top: 150px; border-top: 1px solid var(--line); background: var(--paper-2);
  .in { max-width: var(--wrap); margin: 0 auto; padding: 14px var(--gutter); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 24px; font-family: var(--font-mono); font-size: 0.74rem; color: var(--muted); }
  .l, .r { display: flex; flex-wrap: wrap; gap: 6px 20px; align-items: center; }
  .b { color: var(--accent); }
  a:hover { color: var(--accent); }
`;

/** Rodapé em forma de barra de status de editor. */
export default function SiteFooter() {
  const pathname = usePathname();
  const { t } = useLang();
  if (pathname.startsWith("/adminaccess")) return null;
  return (
    <Foot>
      <div className="in">
        <div className="l">
          <span className="b">⎇ main</span>
          <span>© {new Date().getFullYear()} edson.dev</span>
          <span>{t.footer.coffee} ☕</span>
        </div>
        <div className="r">
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">linkedin</a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer">github</a>
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer">instagram</a>
          <a href={contact.devto} target="_blank" rel="noopener noreferrer">dev.to</a>
        </div>
      </div>
    </Foot>
  );
}
