import Link from "next/link";
import { getLang } from "@/i18n/server";
import { ui } from "@/i18n/dict";

export default async function NotFound() {
  const t = ui[await getLang()].notFound;
  return (
    <div style={{ maxWidth: 1160, margin: "0 auto", padding: "120px 24px 40px", minHeight: "60vh" }}>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--accent-ink)" }}>{"// 404"}</p>
      <h1
        style={{
          marginTop: 8,
          fontFamily: "var(--font-condensed)",
          fontWeight: 400,
          textTransform: "uppercase",
          fontSize: "clamp(3rem, 9vw, 6rem)",
          lineHeight: 0.95,
        }}
      >
        {t.title}
      </h1>
      <Link
        href="/home"
        style={{
          display: "inline-flex",
          alignItems: "center",
          marginTop: 28,
          height: 46,
          padding: "0 22px",
          borderRadius: 999,
          background: "var(--accent)",
          color: "var(--on-accent)",
          fontWeight: 600,
        }}
      >
        {t.back} →
      </Link>
    </div>
  );
}
