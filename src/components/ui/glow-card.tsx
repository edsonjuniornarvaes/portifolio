"use client";

import styled from "styled-components";
import type { HTMLAttributes, MouseEvent } from "react";

const Card = styled.div`
  position: relative;
  border-radius: 20px;
  border: 1px solid var(--line);
  background: var(--card);
  overflow: hidden;
  transition: border-color 0.3s ease, transform 0.3s ease;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(320px circle at var(--mx, 50%) var(--my, 0%), var(--glow), transparent 65%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 1;
  }
  &:hover { border-color: color-mix(in srgb, var(--accent) 45%, var(--line)); }
  &:hover::before { opacity: 1; }
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
