"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/** Alterna escuro/claro; o padrão é sempre o escuro. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") return setTheme(attr);
    setTheme("dark");
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
        width: 30,
        height: 30,
        flexShrink: 0,
        cursor: "pointer",

        lineHeight: 1,
      }}
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
