/** Marca do site: monograma "ej" numa caixa de contorno verde, com o nome e a especialidade ao lado. */
export default function Wordmark({ sub, size = 36 }: { sub?: string; size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 11, whiteSpace: "nowrap" }}>
      <span
        aria-hidden
        style={{ display: "grid", placeItems: "center", width: size, height: size, border: "1.5px solid var(--accent)", borderRadius: Math.round(size * 0.28), fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: size * 0.44, letterSpacing: "-0.06em", color: "var(--accent-ink)", flex: "none" }}
      >
        ej
      </span>
      <span style={{ display: "grid", lineHeight: 1.1 }}>
        <b style={{ fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-0.02em" }}>Edson Junior</b>
        {sub ? <small style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>{sub}</small> : null}
      </span>
    </span>
  );
}
