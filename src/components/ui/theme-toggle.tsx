"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/** Alterna claro/escuro; segue o sistema até a primeira escolha. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") return setTheme(attr);
    setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      style={{
        font: "inherit",
        color: "var(--muted)",
        background: "none",
        border: "1px solid var(--line)",
        borderRadius: 999,
        width: 28,
        height: 28,
        cursor: "pointer",
        alignSelf: "center",
        lineHeight: 1,
      }}
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
