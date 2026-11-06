"use client";

import styled from "styled-components";
import { usePathname } from "next/navigation";
import LocalTime from "@/components/ui/local-time";
import { location } from "@/data/profile";

const Foot = styled.footer`
  margin-top: 88px;
  border-top: 1px solid var(--line);
  .body { max-width: 1160px; margin: 0 auto; padding: 28px 24px 40px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px 24px; }
  .copy { font-family: var(--font-mono); font-size: 0.78rem; color: var(--muted); }
  .stamp {
    display: inline-block; padding: 3px; text-align: center; transform: rotate(-2deg); transition: transform 0.3s ease;
    background: linear-gradient(120deg, #c4a1ff 0%, #2eebaa 35%, #eafff8 55%, #06b6d4 78%, #c4a1ff 100%);
    background-size: 200% 200%; animation: holo 6s ease-in-out infinite;
  }
  .stamp:hover { transform: rotate(0deg) scale(1.04); }
  .stamp .top, .stamp .bot { display: block; background: #0a0b0d; color: #fff; font-family: var(--font-condensed); text-transform: uppercase; letter-spacing: 0.32em; font-size: 0.66rem; padding: 3px 10px; }
  .stamp .bot { letter-spacing: 0.16em; font-size: 0.62rem; }
  .stamp b { display: block; font-family: var(--font-condensed); font-weight: 400; font-size: 1.8rem; line-height: 1.1; letter-spacing: 0.42em; padding: 3px 0 3px 0.42em; color: #0a0b0d; }
  @keyframes holo { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  @media (prefers-reduced-motion: reduce) { .stamp { animation: none; } }
`;

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/adminaccess")) return null;

  return (
    <Foot>
      <div className="body">
        <p className="copy">
          © {new Date().getFullYear()} Edson Junior · {location} · <LocalTime />
        </p>
        <div className="stamp" role="img" aria-label="Feito à base de café">
          <span className="top">FEITO À BASE DE</span>
          <b>CAFÉ</b>
          <span className="bot">EDSON JUNIOR · 2026</span>
        </div>
      </div>
    </Foot>
  );
}
