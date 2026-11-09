"use client";

import { useEffect, useRef } from "react";

type Comet = { x: number; y: number; vx: number; vy: number; len: number; life: number; age: number; width: number };

/** Cometas raros cruzando o fundo, de vez em quando. Desligado com "reduzir movimento". */
export default function Comets() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    const color = () => (getComputedStyle(document.documentElement).getPropertyValue("--accent") || "#2eebaa").trim();

    const spawn = () => {
      const angle = (24 + Math.random() * 16) * (Math.PI / 180);
      const speed = 520 + Math.random() * 380;
      const fromTop = Math.random() < 0.7;
      comets.push({
        x: fromTop ? w * (0.35 + Math.random() * 0.65) : w + 40,
        y: fromTop ? -30 : h * Math.random() * 0.45,
        vx: -Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 120 + Math.random() * 120,
        life: 1.6 + Math.random() * 0.8,
        age: 0,
        width: 1.2 + Math.random() * 0.8,
      });
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const schedule = (first = false) => {
      timer = setTimeout(
        () => {
          if (!document.hidden) spawn();
          schedule();
        },
        first ? 2500 + Math.random() * 2500 : 6500 + Math.random() * 7500,
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
        const fade = Math.min(1, c.age / 0.25) * Math.max(0, 1 - Math.max(0, c.age - (c.life - 0.6)) / 0.6);
        if (c.age > c.life || c.x < -c.len || c.y > h + c.len) {
          comets.splice(i, 1);
          continue;
        }
        const m = Math.hypot(c.vx, c.vy);
        const tx = c.x - (c.vx / m) * c.len;
        const ty = c.y - (c.vy / m) * c.len;
        const g = ctx.createLinearGradient(c.x, c.y, tx, ty);
        g.addColorStop(0, c0);
        g.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.85 * fade;
        ctx.strokeStyle = g;
        ctx.lineWidth = c.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.globalAlpha = fade;
        ctx.fillStyle = "#fff";
        ctx.shadowColor = c0;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.width + 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
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
