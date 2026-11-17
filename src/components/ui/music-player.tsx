"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { useLang } from "@/i18n/provider";

/** Transmissão ao vivo de lofi (YouTube). Para usar outra, troque o código do vídeo. */
const VIDEO_ID = "jfKfPfyJRdk";

type YTPlayer = { playVideo(): void; pauseVideo(): void; setVolume(v: number): void; destroy(): void };
type YTApi = { Player: new (el: HTMLElement, o: object) => YTPlayer };
declare global {
  interface Window { YT?: YTApi; onYouTubeIframeAPIReady?: () => void }
}

const Wrap = styled.div`
  position: fixed; right: 16px; bottom: 16px; z-index: 55;
  .pill { display: inline-flex; align-items: center; gap: 10px; height: 42px; padding: 0 16px 0 12px; border: 1px solid var(--line); border-radius: 99px; background: color-mix(in srgb, var(--card) 88%, transparent); backdrop-filter: blur(10px); color: var(--ink); font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; box-shadow: 0 14px 30px -16px rgba(0,0,0,0.7); transition: border-color 0.2s ease, color 0.2s ease; }
  .pill:hover, .pill[aria-pressed="true"] { border-color: var(--accent); color: var(--accent); }
  .eq { display: inline-flex; align-items: flex-end; gap: 2px; height: 14px; }
  .eq i { width: 3px; background: currentColor; border-radius: 1px; height: 4px; }
  .pill[aria-pressed="true"] .eq i { animation: eq 0.9s ease-in-out infinite; }
  .eq i:nth-child(2) { animation-delay: -0.3s; } .eq i:nth-child(3) { animation-delay: -0.6s; }
  @keyframes eq { 0%, 100% { height: 4px; } 50% { height: 14px; } }
  .host { position: fixed; left: -9999px; top: 0; width: 1px; height: 1px; overflow: hidden; opacity: 0; pointer-events: none; }
  @media (prefers-reduced-motion: reduce) { .eq i { animation: none !important; } }
`;

function loadApi(): Promise<YTApi> {
  return new Promise((resolve, reject) => {
    if (window.YT?.Player) return resolve(window.YT);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { prev?.(); if (window.YT) resolve(window.YT); };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.async = true;
    s.onerror = () => reject(new Error("youtube"));
    document.head.appendChild(s);
  });
}

/**
 * Botão de música no canto: só o play/pausa, sem mostrar player. O som continua ao navegar entre as páginas
 * (o componente fica no layout). O player do YouTube fica escondido e só é carregado no primeiro clique.
 */
export default function MusicPlayer() {
  const pathname = usePathname();
  const { t } = useLang();
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const [on, setOn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => () => { try { player.current?.destroy(); } catch { /* ignore */ } }, []);

  if (pathname.startsWith("/adminaccess")) return null;

  const toggle = async () => {
    if (busy) return;
    if (player.current) {
      if (on) player.current.pauseVideo(); else player.current.playVideo();
      setOn(!on);
      return;
    }
    setBusy(true); setFailed(false);
    try {
      const YT = await loadApi();
      const el = document.createElement("div");
      host.current?.appendChild(el);
      player.current = new YT.Player(el, {
        width: "1", height: "1", videoId: VIDEO_ID,
        playerVars: { autoplay: 1, controls: 0, playsinline: 1, rel: 0, modestbranding: 1 },
        events: {
          onReady: (e: { target: YTPlayer }) => { e.target.setVolume(55); e.target.playVideo(); setOn(true); setBusy(false); },
          onError: () => { setFailed(true); setBusy(false); setOn(false); },
        },
      });
    } catch {
      setFailed(true); setBusy(false);
    }
  };

  return (
    <Wrap>
      <div className="host" ref={host} aria-hidden />
      <button type="button" className="pill" aria-pressed={on} onClick={toggle} aria-label={on ? t.music.pause : t.music.play}>
        <span className="eq" aria-hidden><i /><i /><i /></span>
        {failed ? t.music.error : on ? t.music.pause : busy ? "…" : t.music.play}
      </button>
    </Wrap>
  );
}
