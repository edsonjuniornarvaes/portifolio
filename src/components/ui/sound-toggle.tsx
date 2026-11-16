"use client";

import { useEffect, useSyncExternalStore } from "react";
import { loadSoundPreference, play, setSound, soundOn, subscribeSound } from "@/lib/sound";
import { useLang } from "@/i18n/provider";

/** Liga e desliga os sons do site (começa desligado). */
export default function SoundToggle() {
  const { t } = useLang();
  const on = useSyncExternalStore(subscribeSound, soundOn, () => true);
  useEffect(() => { loadSoundPreference(); }, []);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? t.sound.off : t.sound.on}
      title={on ? t.sound.off : t.sound.on}
      onClick={() => { if (on) { play("tick"); setSound(false); } else setSound(true); }}
      style={{ display: "grid", placeItems: "center", width: 30, height: 30, flexShrink: 0, cursor: "pointer", border: "1px solid var(--line)", borderRadius: 999, background: "none", color: on ? "var(--accent)" : "var(--muted)" }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M11 5 6 9H3v6h3l5 4V5Z" />
        {on ? <><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18.5 5.5a9 9 0 0 1 0 13" /></> : <path d="m16 9 5 6m0-6-5 6" />}
      </svg>
    </button>
  );
}
