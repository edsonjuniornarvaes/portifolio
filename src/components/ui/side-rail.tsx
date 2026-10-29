"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { contact } from "@/data/profile";

const Mail = styled.a`
  position: fixed;
  left: 18px;
  bottom: 40px;
  z-index: 5;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: var(--font-mono);
  font-size: 0.74rem;
  letter-spacing: 0.1em;
  color: var(--muted);
  transition: color 0.2s ease;
  &:hover { color: var(--accent-ink); }
  @media (max-width: 1320px) { display: none; }
`;

const Track = styled.div`
  position: fixed;
  right: 18px;
  top: 50%;
  height: 120px;
  width: 3px;
  margin-top: -60px;
  border-radius: 3px;
  background: var(--line);
  z-index: 5;
  overflow: hidden;
  @media (max-width: 900px) { display: none; }
  .fill { position: absolute; inset: 0; background: var(--accent); transform-origin: top; transform: scaleY(0); }
`;

/** E-mail na vertical (lado esquerdo) e barra de progresso da rolagem (lado direito). */
export default function SideRail() {
  const fill = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const hidden = pathname.startsWith("/adminaccess");

  useEffect(() => {
    if (hidden) return;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (fill.current) fill.current.style.transform = `scaleY(${p})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [hidden, pathname]);

  if (hidden) return null;
  return (
    <>
      <Mail href={`mailto:${contact.email}`}>{contact.email}</Mail>
      <Track aria-hidden>
        <div className="fill" ref={fill} />
      </Track>
    </>
  );
}
