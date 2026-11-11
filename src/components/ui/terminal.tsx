"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

type Line = { cmd: string; out: string };

const Box = styled.div`
  font-family: var(--font-mono); font-size: 0.86rem; line-height: 1.7; color: var(--muted); min-height: 3.4em;
  .p { color: var(--accent); margin-right: 10px; user-select: none; }
  .o { color: var(--ink); padding-left: 1.4em; }
  .caret { display: inline-block; width: 0.55em; height: 1.05em; margin-left: 2px; vertical-align: -0.15em; background: var(--accent); animation: blink 1.05s steps(2) infinite; }
  @keyframes blink { 50% { opacity: 0; } }
`;

/** Terminal que digita os comandos e mostra as respostas, uma linha por vez. */
export default function Terminal({ lines, start = 400 }: { lines: Line[]; start?: number }) {
  const [shown, setShown] = useState<{ cmd: string; out: string }[]>(() => lines.map((l) => ({ cmd: l.cmd, out: l.out })));
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShown(lines.map(() => ({ cmd: "", out: "" })));
    setTyping(true);
    const timers: ReturnType<typeof setTimeout>[] = [];
    let at = start;
    lines.forEach((l, i) => {
      for (let c = 1; c <= l.cmd.length; c++) {
        at += 34;
        const n = c;
        timers.push(setTimeout(() => setShown((s) => s.map((x, k) => (k === i ? { ...x, cmd: l.cmd.slice(0, n) } : x))), at));
      }
      at += 220;
      timers.push(setTimeout(() => setShown((s) => s.map((x, k) => (k === i ? { ...x, out: l.out } : x))), at));
      at += 260;
    });
    timers.push(setTimeout(() => setTyping(false), at));
    return () => timers.forEach(clearTimeout);
  }, [lines, start]);

  const last = shown.findIndex((s) => s.out === "");
  return (
    <Box aria-label={lines.map((l) => `${l.cmd}: ${l.out}`).join(". ")}>
      {shown.map((s, i) => (
        <div key={i} aria-hidden>
          {(s.cmd || i === 0 || shown[i - 1]?.out) && (
            <div>
              <span className="p">$</span>
              {s.cmd}
              {typing && i === (last === -1 ? shown.length - 1 : last) && s.out === "" && <span className="caret" />}
            </div>
          )}
          {s.out && <div className="o">{s.out}</div>}
        </div>
      ))}
      {!typing && <div aria-hidden><span className="p">$</span><span className="caret" /></div>}
    </Box>
  );
}
