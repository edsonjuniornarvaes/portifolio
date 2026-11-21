"use client";

import styled from "styled-components";

const LINES = [
  "const app = createApp({ platforms: ['ios', 'android', 'web'] });",
  "export default async function Home() {",
  "  const { data } = await supabase.from('projects').select('*');",
  "  return <Hero offer=\"seu negócio no celular e na web\" />;",
  "}",
  "useEffect(() => { track('view', { page: 'home' }); }, []);",
  "const total = cart.reduce((n, i) => n + i.price, 0);",
  "if (!user) return navigate('/login');",
  "await fetch('/api/orders', { method: 'POST', body });",
  "<Stack.Screen name=\"Checkout\" component={Checkout} />",
  "type Project = { id: string; live: boolean; stack: string[] };",
  "while (learning) { build(); test(); ship(); }",
];
const TOKENS = ["{ }", "=>", "</>", "( )", "[ ]", "&&", ";", "//", "0x", "fn", "&lt;/&gt;", "++", "!=", "::"];
const LOG = [
  "$ git commit -m \"feat: ship it\"",
  "$ npm run build",
  "✓ compiled successfully",
  "✓ 42 tests passed",
  "$ eas build --platform all",
  "✓ build finished",
  "$ vercel deploy --prod",
  "✓ deployed to production",
];

const Box = styled.div`
  position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none;
  -webkit-mask-image: radial-gradient(ellipse 90% 85% at 55% 45%, #000 30%, transparent 100%);
  mask-image: radial-gradient(ellipse 90% 85% at 55% 45%, #000 30%, transparent 100%);
  font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-ink);
  .layer { position: absolute; inset: 0; opacity: 0; animation: cycle 36s ease-in-out infinite; }
  .a { animation-delay: 0s; } .b { animation-delay: 12s; } .c { animation-delay: 24s; }
  @keyframes cycle { 0% { opacity: 0; } 8% { opacity: 1; } 29% { opacity: 1; } 37% { opacity: 0; } 100% { opacity: 0; } }
  /* A: linhas de código subindo bem devagar */
  .a pre { position: absolute; left: 6%; top: 0; margin: 0; line-height: 2.1; white-space: pre; opacity: 0.055; animation: drift 90s linear infinite; }
  .a pre + pre { left: auto; right: 4%; animation-duration: 120s; }
  @keyframes drift { from { transform: translateY(0); } to { transform: translateY(-50%); } }
  /* B: símbolos de código flutuando */
  .b span { position: absolute; opacity: 0.075; font-weight: 700; font-size: 1.4rem; animation: float 9s ease-in-out infinite; }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
  /* C: terminal passando para o lado */
  .c div { position: absolute; left: 0; white-space: nowrap; opacity: 0.075; animation: slide 70s linear infinite; }
  @keyframes slide { from { transform: translateX(-30%); } to { transform: translateX(110%); } }
  @media (prefers-reduced-motion: reduce) {
    .layer { animation: none; opacity: 0; } .a { opacity: 1; }
    .a pre { animation: none; }
  }
`;

const block = [...LINES, "", ...LINES].join("\n");

/**
 * Fundo da capa feito de código, bem suave: três efeitos (linhas subindo, símbolos flutuando e um terminal
 * passando) se revezam a cada ~12 s com transição de opacidade. Decorativo; só o primeiro aparece com "reduzir movimento".
 */
export default function CodeBackdrop() {
  return (
    <Box aria-hidden>
      <div className="layer a">
        <pre>{block}</pre>
        <pre>{block}</pre>
      </div>
      <div className="layer b">
        {Array.from({ length: 34 }, (_, i) => (
          <span
            key={i}
            style={{ left: `${(i * 37) % 96}%`, top: `${(i * 53) % 90}%`, animationDelay: `${(i % 9) * -1.1}s`, animationDuration: `${8 + (i % 5)}s` }}
            dangerouslySetInnerHTML={{ __html: TOKENS[i % TOKENS.length] }}
          />
        ))}
      </div>
      <div className="layer c">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} style={{ top: `${6 + i * 8}%`, animationDelay: `${-(i * 9)}s`, animationDuration: `${60 + (i % 4) * 14}s` }}>
            {LOG[i % LOG.length]}
          </div>
        ))}
      </div>
    </Box>
  );
}
