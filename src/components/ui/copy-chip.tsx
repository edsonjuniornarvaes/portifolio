"use client";

import { useState } from "react";
import styled from "styled-components";
import { FaEnvelope, FaRegCopy, FaCheck } from "react-icons/fa";

const Chip = styled.span`
  display: inline-flex;
  align-items: stretch;
  border: 2px solid var(--line);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  transition: border-color 0.2s ease;
  &:hover { border-color: var(--accent-ink); }
  a { display: inline-flex; align-items: center; gap: 9px; height: 40px; padding: 0 14px; color: var(--ink); }
  a:hover { color: var(--accent-ink); }
  button { display: grid; place-items: center; width: 40px; border: 0; border-left: 2px solid var(--line); background: transparent; color: var(--muted); cursor: pointer; transition: color 0.2s ease, background 0.2s ease; }
  button:hover { color: var(--accent-ink); background: color-mix(in srgb, var(--accent) 8%, transparent); }
  button[data-done="true"] { color: #4ade80; }
`;

/** E-mail como as outras redes: mesmo formato, com um botão de copiar embutido. */
export default function CopyChip({ email }: { email: string }) {
  const [done, setDone] = useState(false);
  return (
    <Chip>
      <a href={`mailto:${email}`}>
        <FaEnvelope size={14} /> {email}
      </a>
      <button
        type="button"
        aria-label="Copiar e-mail"
        title="Copiar e-mail"
        data-done={done}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setDone(true);
            setTimeout(() => setDone(false), 1600);
          } catch {
            /* ignore */
          }
        }}
      >
        {done ? <FaCheck size={13} /> : <FaRegCopy size={14} />}
      </button>
    </Chip>
  );
}
