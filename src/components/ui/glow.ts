import type { PointerEvent } from "react";

/** Faz o brilho de um cartão seguir o mouse (usa --gx e --gy no CSS). Só reage a mouse. */
export const glow = {
  onPointerMove(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${e.clientX - r.left}px`);
    el.style.setProperty("--gy", `${e.clientY - r.top}px`);
  },
};
