import Link from "next/link";
import { getLang } from "@/i18n/server";
import { ui } from "@/i18n/dict";

export default async function NotFound() {
  const t = ui[await getLang()].notFound;
  return (
    <div style={{ maxWidth: 1240, margin: "0 auto", padding: "110px 24px 40px", minHeight: "62vh" }}>
      <p style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
        <span style={{ color: "var(--accent)" }}>$</span> cd /pagina-que-nao-existe
      </p>
      <p style={{ fontFamily: "var(--font-mono)", color: "var(--syn-n)", marginTop: 6 }}>bash: {t.text}</p>
      <h1 style={{ marginTop: 28, fontSize: "clamp(5rem, 22vw, 16rem)", fontWeight: 700, lineHeight: 0.85, letterSpacing: "-0.06em", color: "var(--accent)" }}>{t.title}</h1>
      <Link
        href="/home"
        style={{ display: "inline-flex", alignItems: "center", marginTop: 36, height: 48, padding: "0 22px", borderRadius: 10, background: "var(--accent)", color: "var(--on-accent)", fontFamily: "var(--font-mono)", fontSize: "0.9rem", fontWeight: 600 }}
      >
        $ {t.back}
      </Link>
    </div>
  );
}
