"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useLang } from "@/i18n/provider";

/** Playlist de lofi no Spotify (para usar outra, troque o código depois de "playlist:"). */
const URI = "spotify:playlist:37i9dQZF1DWWQRwui0ExPn";

type Controller = {
  play(): void; pause(): void; togglePlay(): void; destroy(): void;
  addListener(ev: string, cb: (e: { data: { isPaused: boolean } }) => void): void;
};
type Api = { createController(el: HTMLElement, opts: object, cb: (c: Controller) => void): void };
declare global { interface Window { onSpotifyIframeApiReady?: (api: Api) => void } }

const Bar = styled.div`
  display: flex; align-items: center; gap: 14px; margin-bottom: 26px; padding: 12px 14px; max-width: 460px; border: 1px solid var(--line); border-radius: 14px; background: color-mix(in srgb, var(--paper) 55%, transparent); backdrop-filter: blur(8px);
  .play { flex: none; display: grid; place-items: center; width: 44px; height: 44px; border: 0; border-radius: 50%; background: var(--accent); color: var(--on-accent); cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .play:hover { transform: scale(1.06); box-shadow: 0 8px 22px -8px color-mix(in srgb, var(--accent) 70%, transparent); }
  .play svg { width: 18px; height: 18px; }
  .txt { min-width: 0; flex: 1; }
  .txt b { display: block; font-size: 0.95rem; font-weight: 600; line-height: 1.2; }
  .txt small { display: block; font-size: 0.74rem; color: var(--muted); }
  .eq { display: inline-flex; align-items: flex-end; gap: 2px; height: 14px; margin-right: 4px; }
  .eq i { width: 3px; height: 4px; border-radius: 1px; background: var(--accent); }
  .on .eq i { animation: eq 0.9s ease-in-out infinite; } .eq i:nth-child(2) { animation-delay: -0.3s; } .eq i:nth-child(3) { animation-delay: -0.6s; }
  @keyframes eq { 0%, 100% { height: 4px; } 50% { height: 14px; } }
  .open { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border: 1px solid var(--line); border-radius: 10px; background: none; color: var(--muted); cursor: pointer; transition: color 0.2s ease, border-color 0.2s ease; }
  .open:hover, .open[aria-expanded="true"] { color: var(--accent-ink); border-color: var(--accent); }
  .open svg { width: 16px; height: 16px; }
  @media (prefers-reduced-motion: reduce) { .eq i { animation: none !important; } }
`;

const Frame = styled.div`
  position: fixed; right: 16px; bottom: 16px; z-index: 70; width: min(380px, calc(100vw - 32px)); height: 392px; border-radius: 16px; overflow: hidden; background: #121212; box-shadow: 0 30px 70px -20px rgba(0,0,0,0.85);
  transition: transform 0.3s cubic-bezier(.2,.7,.2,1), opacity 0.2s ease;
  &[data-open="false"] { opacity: 0; pointer-events: none; transform: translateY(140vh); }
  iframe { display: block; width: 100%; height: 100%; border: 0; }
  .x { position: absolute; top: 8px; right: 8px; z-index: 2; width: 30px; height: 30px; border: 0; border-radius: 50%; background: rgba(0,0,0,0.6); color: #fff; cursor: pointer; font-size: 1rem; line-height: 1; }
  &[data-open="false"] .x { display: none; }
`;

/**
 * Player de lofi do Spotify no rodapé: botão de play/pausa direto (o player fica escondido) e, se quiser trocar
 * de música, abre o player completo numa janelinha. Como o rodapé fica no layout, a música continua ao navegar.
 */
export default function SpotifyDock() {
  const { t } = useLang();
  const s = t.spotify;
  const mount = useRef<HTMLDivElement>(null);
  const ctrl = useRef<Controller | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [asked, setAsked] = useState(false);

  useEffect(() => () => { try { ctrl.current?.destroy(); } catch { /* ignore */ } }, []);

  const init = () => {
    if (asked) return;
    setAsked(true);
    const make = (api: Api) => {
      if (!mount.current) return;
      const el = document.createElement("div");
      mount.current.appendChild(el);
      api.createController(el, { uri: URI, width: "100%", height: "100%", theme: "dark" }, (c) => {
        ctrl.current = c;
        c.addListener("playback_update", (e) => setPlaying(!e.data.isPaused));
        setReady(true);
        c.play();
      });
    };
    const w = window;
    const prev = w.onSpotifyIframeApiReady;
    w.onSpotifyIframeApiReady = (api) => { prev?.(api); make(api); };
    if (!document.querySelector('script[src*="open.spotify.com/embed/iframe-api"]')) {
      const sc = document.createElement("script");
      sc.src = "https://open.spotify.com/embed/iframe-api/v1";
      sc.async = true;
      document.body.appendChild(sc);
    }
  };

  const toggle = () => {
    if (!asked) { init(); return; }
    ctrl.current?.togglePlay();
  };
  const expand = () => {
    if (!asked) init();
    setOpen((v) => !v);
  };

  return (
    <>
      <Bar className={playing ? "on" : ""}>
        <button type="button" className="play" onClick={toggle} aria-label={playing ? s.pause : s.play} title={playing ? s.pause : s.play}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>{playing ? <path d="M7 5h3.6v14H7zM13.4 5H17v14h-3.6z" /> : <path d="M8 5.2v13.6a1 1 0 0 0 1.5.86l11-6.8a1 1 0 0 0 0-1.72l-11-6.8A1 1 0 0 0 8 5.2Z" />}</svg>
        </button>
        <span className="txt"><b><span className="eq" aria-hidden><i /><i /><i /></span>{s.title}</b><small>{asked && !ready ? s.loading : s.hint}</small></span>
        <button type="button" className="open" onClick={expand} aria-expanded={open} aria-label={open ? s.close : s.open} title={open ? s.close : s.open}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
        </button>
      </Bar>
      <Frame data-open={open} aria-hidden={!open}>
        <button type="button" className="x" onClick={() => setOpen(false)} aria-label={s.close}>×</button>
        <div ref={mount} style={{ width: "100%", height: "100%" }} />
      </Frame>
    </>
  );
}
