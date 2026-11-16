"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/i18n/provider";

/** Playlist de lofi do Spotify (troque o código para usar outra). */
const PLAYLIST = "37i9dQZF1DWWQRwui0ExPn";

const Wrap = styled.div`
  position: fixed; right: 16px; bottom: 16px; z-index: 55; display: flex; flex-direction: column; align-items: flex-end; gap: 10px;
  .pill { display: inline-flex; align-items: center; gap: 10px; height: 42px; padding: 0 16px 0 12px; border: 1px solid var(--line); border-radius: 99px; background: color-mix(in srgb, var(--card) 88%, transparent); backdrop-filter: blur(10px); color: var(--ink); font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; box-shadow: 0 14px 30px -16px rgba(0,0,0,0.7); transition: border-color 0.2s ease, color 0.2s ease; }
  .pill:hover, .pill[aria-expanded="true"] { border-color: var(--accent); color: var(--accent); }
  .eq { display: inline-flex; align-items: flex-end; gap: 2px; height: 14px; }
  .eq i { width: 3px; background: currentColor; border-radius: 1px; height: 4px; }
  .pill[aria-expanded="true"] .eq i { animation: eq 0.9s ease-in-out infinite; }
  .eq i:nth-child(2) { animation-delay: -0.3s; } .eq i:nth-child(3) { animation-delay: -0.6s; }
  @keyframes eq { 0%, 100% { height: 4px; } 50% { height: 14px; } }
  .frame { width: min(340px, calc(100vw - 32px)); border-radius: 14px; overflow: hidden; box-shadow: 0 24px 50px -20px rgba(0,0,0,0.8); background: #121212; }
  .frame iframe { display: block; width: 100%; height: 152px; border: 0; }
  @media (prefers-reduced-motion: reduce) { .eq i { animation: none !important; } }
`;

/** Botãozinho no canto: abre o player do Spotify com uma playlist lofi (só carrega ao clicar). */
export default function MusicPlayer() {
  const pathname = usePathname();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  if (pathname.startsWith("/adminaccess")) return null;
  return (
    <Wrap>
      <AnimatePresence>
        {open && (
          <motion.div className="frame" initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }} transition={{ duration: 0.2 }}>
            <iframe
              title="Lofi no Spotify"
              src={`https://open.spotify.com/embed/playlist/${PLAYLIST}?utm_source=generator&theme=0`}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <button type="button" className="pill" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span className="eq" aria-hidden><i /><i /><i /></span>
        {open ? t.music.close : t.music.play}
      </button>
    </Wrap>
  );
}
