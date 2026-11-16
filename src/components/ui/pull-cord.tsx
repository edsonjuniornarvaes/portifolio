"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { play } from "@/lib/sound";
import { useLang } from "@/i18n/provider";

const N = 9; // pontos da corda
const SEG = 20; // tamanho de cada pedaço
const W = 70, H = N * SEG + 60;

/**
 * Corda pendurada no topo: puxe a argola para baixo e solte para trocar a cor de destaque do site (menta, roxo, azul, coral, âmbar).
 * Física simples (Verlet): a corda balança e para sozinha. Só aparece em telas largas.
 */
export default function PullCord() {
  const pathname = usePathname();
  const { t } = useLang();
  const path = useRef<SVGPathElement>(null);
  const ring = useRef<SVGGElement>(null);
  const hidden = pathname.startsWith("/adminaccess");

  useEffect(() => {
    if (hidden) return;
    const pts = Array.from({ length: N }, (_, i) => ({ x: W / 2, y: i * SEG, px: W / 2, py: i * SEG }));
    let drag = false, raf = 0, running = false, still = 0, pulled = 0, svgEl: SVGSVGElement | null = null;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const render = () => {
      if (!path.current || !ring.current) return;
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < N; i++) d += ` L ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)}`;
      path.current.setAttribute("d", d);
      const e = pts[N - 1];
      ring.current.setAttribute("transform", `translate(${e.x.toFixed(1)} ${e.y.toFixed(1)})`);
    };

    const tick = () => {
      let energy = 0;
      for (let i = 1; i < N; i++) {
        const p = pts[i];
        if (drag && i === N - 1) continue;
        const vx = (p.x - p.px) * 0.985, vy = (p.y - p.py) * 0.985;
        p.px = p.x; p.py = p.y;
        p.x += vx; p.y += vy + 0.55;
        energy += Math.abs(vx) + Math.abs(vy);
      }
      for (let it = 0; it < 8; it++) {
        pts[0].x = W / 2; pts[0].y = 0;
        for (let i = 0; i < N - 1; i++) {
          const a = pts[i], b = pts[i + 1];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 1;
          const diff = (dist - SEG) / dist;
          const lockB = drag && i + 1 === N - 1;
          if (i === 0) { b.x -= dx * diff; b.y -= dy * diff; }
          else if (lockB) { a.x += dx * diff; a.y += dy * diff; }
          else { a.x += dx * diff * 0.5; a.y += dy * diff * 0.5; b.x -= dx * diff * 0.5; b.y -= dy * diff * 0.5; }
        }
      }
      render();
      still = energy < 0.25 && !drag ? still + 1 : 0;
      if (still > 40) { running = false; return; }
      raf = requestAnimationFrame(tick);
    };
    const wake = () => { if (!running && !reduce) { running = true; still = 0; raf = requestAnimationFrame(tick); } };

    const toggle = () => {
      const order = ["mint", "violet", "blue", "coral", "amber"];
      const cur = document.documentElement.getAttribute("data-accent") || "mint";
      const next = order[(order.indexOf(cur) + 1) % order.length];
      if (next === "mint") document.documentElement.removeAttribute("data-accent");
      else document.documentElement.setAttribute("data-accent", next);
      try { localStorage.setItem("accent", next); } catch { /* ignore */ }
      play("click");
    };

    const g = ring.current;
    const local = (e: PointerEvent) => {
      svgEl = svgEl || (g?.ownerSVGElement ?? null);
      const r = svgEl!.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const down = (e: PointerEvent) => {
      drag = true; pulled = 0; g?.setPointerCapture(e.pointerId); play("tick"); wake(); e.preventDefault();
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const { x, y } = local(e);
      const end = pts[N - 1];
      end.x = Math.max(8, Math.min(W - 8, x));
      end.y = Math.max((N - 1) * SEG, Math.min((N - 1) * SEG + 70, y));
      pulled = end.y - (N - 1) * SEG;
    };
    const up = () => {
      if (!drag) return;
      drag = false;
      if (pulled > 28) toggle();
      wake();
    };
    const key = (e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pts[N - 1].y += 30; toggle(); wake(); } };

    g?.addEventListener("pointerdown", down);
    g?.addEventListener("pointermove", move);
    g?.addEventListener("pointerup", up);
    g?.addEventListener("pointercancel", up);
    g?.addEventListener("keydown", key);
    // um empurrãozinho no começo para mostrar que balança
    pts[N - 1].x += 14; render(); wake();
    return () => {
      cancelAnimationFrame(raf);
      g?.removeEventListener("pointerdown", down);
      g?.removeEventListener("pointermove", move);
      g?.removeEventListener("pointerup", up);
      g?.removeEventListener("pointercancel", up);
      g?.removeEventListener("keydown", key);
    };
  }, [hidden]);

  if (hidden) return null;
  return (
    <svg className="pull-cord" width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "fixed", top: 0, right: 18, zIndex: 70, overflow: "visible", pointerEvents: "none" }}>
      <path ref={path} d={`M ${W / 2} 0 L ${W / 2} ${(N - 1) * SEG}`} stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <g ref={ring} transform={`translate(${W / 2} ${(N - 1) * SEG})`} role="button" tabIndex={0} aria-label={t.cord} style={{ pointerEvents: "auto", cursor: "grab", touchAction: "none" }}>
        <circle r="17" fill="transparent" />
        <circle cy="9" r="8" fill="none" stroke="var(--accent)" strokeWidth="3.2" />
        <rect x="-3" y="-5" width="6" height="10" rx="2" fill="var(--muted)" />
      </g>
    </svg>
  );
}
