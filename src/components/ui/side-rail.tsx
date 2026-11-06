"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";

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

/** Barra de progresso da rolagem (lado direito). */
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
      <Track aria-hidden>
        <div className="fill" ref={fill} />
      </Track>
    </>
  );
}
