/** Marca do site: o nome em minúsculas, com ponto e cursor na cor de destaque. */
export default function Wordmark({ size = "1.5rem" }: { size?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", fontWeight: 700, fontSize: size, letterSpacing: "-0.04em", lineHeight: 1, whiteSpace: "nowrap" }}>
      edson<span style={{ color: "var(--accent-ink)" }}>.</span>junior
      <span aria-hidden style={{ display: "inline-block", width: "0.55em", height: "0.12em", marginLeft: "0.2em", background: "var(--accent-ink)", borderRadius: 1 }} />
    </span>
  );
}
