"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const SNIPPETS = [
  "const app = createApp({",
  "  platforms: ['ios', 'android', 'web'],",
  "});",
  "export default function Home() {",
  "  return <Hero offer=\"seu negócio no celular\" />;",
  "}",
  "await supabase.from('orders')",
  "  .insert({ total, status: 'paid' });",
  "git commit -m \"feat: ship it\"",
  "npm run build && npm run deploy",
  "if (user.isLoggedIn) navigate('/home');",
  "type Project = { id: string; live: boolean };",
  "useEffect(() => { track('view'); }, []);",
  "<Stack.Screen name=\"Checkout\" />",
  "// TODO: make it faster",
  "const [cart, setCart] = useState([]);",
  "return res.status(200).json({ ok: true });",
  "SELECT * FROM products WHERE stock > 0;",
  "while (learning) { build(); ship(); }",
  "expo prebuild && eas build --platform all",
];

const col = (offset: number) => Array.from({ length: SNIPPETS.length * 2 }, (_, i) => SNIPPETS[(i + offset) % SNIPPETS.length]).join("\n");

/**
 * Trechos de código que passam pela lateral da tela enquanto você rola (parallax em duas velocidades).
 * Decorativo: fica atrás do conteúdo, some no celular pequeno e não aparece com "reduzir movimento".
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
      if (a.current) a.current.style.transform = `translate3d(0, ${-(y * 0.22) % 900}px, 0)`;
      if (b.current) b.current.style.transform = `translate3d(0, ${-(y * 0.38) % 900}px, 0)`;
      if (root.current) root.current.style.setProperty("--g", String(0.18 + glow * 0.25));
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
      <pre ref={a} className="l">{col(0)}</pre>
      <pre ref={b} className="r">{col(9)}</pre>
    </div>
  );
}
