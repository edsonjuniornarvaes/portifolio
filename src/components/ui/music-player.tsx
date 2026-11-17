"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/provider";

/** Rádio de música tranquila (SomaFM, "Groove Salad"): os endereços são tentados em ordem se um falhar. */
const STREAMS = ["https://ice1.somafm.com/groovesalad-128-mp3", "https://ice2.somafm.com/groovesalad-128-mp3", "https://ice4.somafm.com/groovesalad-128-mp3"];

/**
 * Botão de música: só play/pausa, sem player na tela. Fica no cabeçalho, que não some ao navegar,
 * então a música continua tocando entre as páginas. O áudio só é carregado no primeiro clique.
 */
export default function MusicButton() {
  const { t } = useLang();
  const audio = useRef<HTMLAudioElement | null>(null);
  const idx = useRef(0);
  const [on, setOn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => () => { audio.current?.pause(); audio.current = null; }, []);

  const start = async () => {
    if (!audio.current) {
      const a = new Audio();
      a.preload = "none";
      a.volume = 0.5;
      a.addEventListener("error", () => {
        if (idx.current < STREAMS.length - 1) {
          idx.current += 1;
          a.src = STREAMS[idx.current];
          void a.play().catch(() => undefined);
        } else {
          setFailed(true); setOn(false); setBusy(false);
        }
      });
      a.addEventListener("playing", () => { setBusy(false); setOn(true); setFailed(false); });
      a.addEventListener("pause", () => setOn(false));
      audio.current = a;
      a.src = STREAMS[0];
    }
    setBusy(true);
    try { await audio.current.play(); } catch { /* o evento "error" cuida dos próximos endereços */ }
  };

  const toggle = () => {
    if (busy) return;
    if (on) { audio.current?.pause(); setOn(false); return; }
    setFailed(false);
    void start();
  };

  const label = failed ? t.music.error : on ? t.music.pause : t.music.play;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={label}
      title={label}
      style={{ display: "grid", placeItems: "center", width: 30, height: 30, flexShrink: 0, cursor: "pointer", border: `1px solid ${on ? "var(--accent)" : "var(--line)"}`, borderRadius: 999, background: "none", color: on ? "var(--accent)" : failed ? "#ff8a65" : "var(--muted)" }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        {on ? (
          <>
            <rect x="4" y="8" width="3.4" height="12" rx="1.2"><animate attributeName="height" values="6;14;6" dur="0.9s" repeatCount="indefinite" /><animate attributeName="y" values="14;6;14" dur="0.9s" repeatCount="indefinite" /></rect>
            <rect x="10.3" y="5" width="3.4" height="15" rx="1.2"><animate attributeName="height" values="14;5;14" dur="0.9s" begin="-0.3s" repeatCount="indefinite" /><animate attributeName="y" values="6;15;6" dur="0.9s" begin="-0.3s" repeatCount="indefinite" /></rect>
            <rect x="16.6" y="9" width="3.4" height="11" rx="1.2"><animate attributeName="height" values="8;15;8" dur="0.9s" begin="-0.6s" repeatCount="indefinite" /><animate attributeName="y" values="12;5;12" dur="0.9s" begin="-0.6s" repeatCount="indefinite" /></rect>
          </>
        ) : (
          <path d="M9 4v11.2A3.5 3.5 0 1 0 11 18V8.4l8-1.8V13a3.5 3.5 0 1 0 2 3.2V3Z" />
        )}
      </svg>
    </button>
  );
}
