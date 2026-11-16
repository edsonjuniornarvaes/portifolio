import Link from "next/link";
import { getLang } from "@/i18n/server";
import { ui } from "@/i18n/dict";

export default async function NotFound() {
  const t = ui[await getLang()].notFound;
  return (
    <section style={{ position: "relative", minHeight: "calc(100svh - var(--header))", display: "flex", alignItems: "center" }}>
      <div style={{ position: "relative", maxWidth: 1240, width: "100%", margin: "0 auto", padding: "60px 24px" }}>
        <h1 style={{ fontSize: "clamp(6rem, 26vw, 19rem)", fontWeight: 700, lineHeight: 0.8, letterSpacing: "-0.07em", color: "var(--accent)" }}>{t.title}</h1>
        <p style={{ marginTop: 30, maxWidth: "26rem", fontSize: "1.35rem", lineHeight: 1.4, textWrap: "balance" }}>{t.text}</p>
        <p style={{ marginTop: 14, fontFamily: "var(--font-hand)", fontSize: "1.6rem", color: "var(--accent)", transform: "rotate(-1.5deg)", transformOrigin: "left" }}>{t.hint}</p>
        <Link href="/home" style={{ display: "inline-flex", alignItems: "center", marginTop: 32, height: 52, padding: "0 28px", borderRadius: 99, background: "var(--accent)", color: "var(--on-accent)", fontWeight: 600 }}>
          {t.back}
        </Link>
      </div>
    </section>
  );
}
