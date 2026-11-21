"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const SOURCE = `import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

// feito para vender, rápido e simples
export default async function Home() {
  const { data } = await supabase.from('projects').select('*');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    track('view', { page: 'home' });
  }, []);

  if (!data) return <Loading />;

  return (
    <main className="home">
      <Hero offer="seu negócio no celular e na web" />
      {data.map((p) => <Card key={p.id} {...p} />)}
    </main>
  );
}

const app = createApp({
  platforms: ['ios', 'android', 'web'],
  deploy: () => ship({ fast: true }),
});

async function checkout(cart) {
  const total = cart.reduce((n, i) => n + i.price, 0);
  const res = await fetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify({ total }),
  });
  return res.ok ? 'pronto' : 'tente de novo';
}

while (learning) { build(); test(); ship(); }`;

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Realce simples (palavras-chave, textos e comentários) para o código decorativo. */
function highlight(line: string) {
  const c = line.indexOf("//");
  const code = c >= 0 ? line.slice(0, c) : line;
  const comment = c >= 0 ? line.slice(c) : "";
  let html = esc(code)
    .replace(/(&#39;|'[^']*'|"[^"]*")/g, (m) => `<i class="s">${m}</i>`)
    .replace(/\b(import|from|export|default|async|await|const|return|function|if|while|new)\b/g, '<i class="k">$1</i>');
  if (comment) html += `<i class="c">${esc(comment)}</i>`;
  return html;
}

const HTML = SOURCE.split("\n").map(highlight).join("\n");
const BLOCK = `${HTML}\n\n${HTML}`;
// coluna da direita: cada linha alinhada à direita, para o código nascer na borda da tela
const LINES = SOURCE.split("\n").map((l) => `<span class="ln">${highlight(l) || " "}</span>`).join("");
const BLOCK_R = `${LINES}<span class="ln"> </span>${LINES}`;

/**
 * Código JavaScript que passa pelas laterais enquanto você rola (parallax em duas velocidades) e some
 * suavemente em direção ao conteúdo. Decorativo: fica atrás da página e não aparece com "reduzir movimento".
 */
export default function ScrollCode() {
  const pathname = usePathname();
  const a = useRef<HTMLPreElement>(null);
  const b = useRef<HTMLPreElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, last = window.scrollY, glow = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      const v = Math.abs(y - last);
      last = y;
      glow = Math.min(1, glow * 0.9 + v / 140);
      const hA = a.current ? a.current.scrollHeight / 2 : 900;
      const hB = b.current ? b.current.scrollHeight / 2 : 900;
      if (a.current) a.current.style.transform = `translate3d(0, ${-((y * 0.22) % hA)}px, 0)`;
      if (b.current) b.current.style.transform = `translate3d(0, ${-((y * 0.38 + hB / 3) % hB)}px, 0)`;
      if (root.current) root.current.style.setProperty("--g", String(0.17 + glow * 0.25));
      if (glow > 0.02) raf = requestAnimationFrame(tick);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener("scroll", on, { passive: true });
    tick();
    return () => { window.removeEventListener("scroll", on); if (raf) cancelAnimationFrame(raf); };
  }, []);

  if (pathname.startsWith("/adminaccess")) return null;
  return (
    <div ref={root} className="scroll-code" aria-hidden>
      <pre ref={a} className="l" dangerouslySetInnerHTML={{ __html: BLOCK }} />
      <pre ref={b} className="r" dangerouslySetInnerHTML={{ __html: BLOCK_R }} />
    </div>
  );
}
