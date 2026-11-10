"use client";

import styled from "styled-components";
import { useLang } from "@/i18n/provider";
import type { Lang } from "@/i18n/config";

const Group = styled.div`
  display: inline-flex; align-items: center; gap: 4px; padding: 3px; border: 1px solid var(--line); border-radius: 999px;
  button {
    display: grid; place-items: center; width: 30px; height: 24px; padding: 0; border: 0; border-radius: 999px;
    background: transparent; cursor: pointer; opacity: 0.45; filter: grayscale(0.5); transition: opacity 0.2s ease, filter 0.2s ease, background 0.2s ease;
  }
  button:hover { opacity: 0.85; }
  button[aria-pressed="true"] { opacity: 1; filter: none; background: color-mix(in srgb, var(--accent) 16%, transparent); }
  svg { width: 20px; height: 14px; border-radius: 2px; display: block; box-shadow: 0 0 0 1px var(--line); }
`;

function FlagBR() {
  return (
    <svg viewBox="0 0 20 14" aria-hidden>
      <rect width="20" height="14" fill="#229e45" />
      <path d="M10 1.6 18 7l-8 5.4L2 7z" fill="#f8e509" />
      <circle cx="10" cy="7" r="2.9" fill="#2b3a8f" />
      <path d="M7.3 6.4c1.9-.5 3.7-.1 5.4 1" stroke="#fff" strokeWidth=".5" fill="none" />
    </svg>
  );
}

function FlagUS() {
  return (
    <svg viewBox="0 0 20 14" aria-hidden>
      <rect width="20" height="14" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((y) => (
        <rect key={y} y={y} width="20" height="1.077" fill="#b22234" transform={`translate(0 ${y * 0.077})`} />
      ))}
      <rect width="8.4" height="7.5" fill="#3c3b6e" />
      {[1.3, 3.2, 5.1, 7].map((x) =>
        [1.2, 3, 4.8, 6.4].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r=".38" fill="#fff" />),
      )}
    </svg>
  );
}

/** Troca de idioma com bandeiras (PT / EN). */
export default function LangSwitch() {
  const { lang, setLang, t } = useLang();
  const opt: { id: Lang; label: string; Flag: () => JSX.Element }[] = [
    { id: "pt", label: t.langSwitch.pt, Flag: FlagBR },
    { id: "en", label: t.langSwitch.en, Flag: FlagUS },
  ];
  return (
    <Group role="group" aria-label={t.langSwitch.label}>
      {opt.map(({ id, label, Flag }) => (
        <button key={id} type="button" aria-pressed={lang === id} aria-label={label} title={label} onClick={() => lang !== id && setLang(id)}>
          <Flag />
        </button>
      ))}
    </Group>
  );
}
