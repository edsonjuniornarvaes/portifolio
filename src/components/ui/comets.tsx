"use client";

import { useEffect, useRef } from "react";

type Comet = { x: number; y: number; vx: number; vy: number; len: number; life: number; age: number; width: number; peak: number };

/**
 * Cometas bem discretos no fundo: vários, de tamanhos e velocidades diferentes, bem transparentes,
 * surgindo e sumindo com transição suave em momentos aleatórios. Desligado com "reduzir movimento".
 */
export default function Comets() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const comets: Comet[] = [];
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let last = 0;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const color = () => (getComputedStyle(document.documentElement).getPropertyValue("--accent") || "#2eebaa").trim();

    const spawn = () => {
      const angle = rand(18, 48) * (Math.PI / 180);
      const speed = rand(110, 280);
      const dir = Math.random() < 0.8 ? -1 : 1; // quase sempre para a esquerda
      comets.push({
        x: dir === -1 ? rand(w * 0.2, w * 1.05) : rand(-20, w * 0.7),
        y: rand(-20, h * 0.7),
        vx: Math.cos(angle) * speed * dir,
        vy: Math.sin(angle) * speed,
        len: rand(70, 190),
        life: rand(3.2, 6.5),
        age: 0,
        width: rand(0.8, 1.6),
        peak: rand(0.1, 0.26),
      });
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const schedule = (first = false) => {
      timer = setTimeout(
        () => {
          if (!document.hidden && comets.length < 4) {
            spawn();
            if (Math.random() < 0.3) setTimeout(spawn, rand(300, 1400));
          }
          schedule();
        },
        first ? rand(1200, 2600) : rand(2200, 6500),
      );
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      const c0 = color();
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.age += dt;
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        const t = c.age / c.life;
        if (t >= 1 || c.x < -c.len * 2 || c.x > w + c.len * 2 || c.y > h + c.len * 2) {
          comets.splice(i, 1);
          continue;
        }
        // sobe e desce suavemente (seno), sem corte brusco
        const fade = Math.sin(Math.PI * t) ** 1.4 * c.peak;
        const m = Math.hypot(c.vx, c.vy);
        const tx = c.x - (c.vx / m) * c.len;
        const ty = c.y - (c.vy / m) * c.len;
        const g = ctx.createLinearGradient(c.x, c.y, tx, ty);
        g.addColorStop(0, c0);
        g.addColorStop(1, "transparent");
        ctx.globalAlpha = fade;
        ctx.strokeStyle = g;
        ctx.lineWidth = c.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (comets.length) raf = requestAnimationFrame(tick);
      else {
        raf = 0;
        ctx.clearRect(0, 0, w, h);
      }
    };

    schedule(true);
    window.addEventListener("resize", resize);
    return () => {
      if (timer) clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}
