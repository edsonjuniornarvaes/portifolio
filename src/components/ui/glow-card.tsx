"use client";

import styled from "styled-components";
import type { HTMLAttributes, MouseEvent } from "react";

const Card = styled.div`
  position: relative;
  border-radius: 20px;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  overflow: hidden;
  transition: border-color 0.3s ease, transform 0.3s ease;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(380px circle at var(--mx, 50%) var(--my, 0%), rgba(139, 92, 246, 0.16), transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  &:hover { border-color: var(--border-hover); }
  &:hover::before { opacity: 1; }
  > * { position: relative; }
`;

/** Card com brilho que segue o cursor. */
export default function GlowCard(props: HTMLAttributes<HTMLDivElement>) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return <Card {...props} onMouseMove={onMove} />;
}
