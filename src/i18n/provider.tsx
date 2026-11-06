"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LANG_COOKIE, type Lang } from "./config";
import { ui, type Dict } from "./dict";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const LangContext = createContext<Ctx>({ lang: "pt", setLang: () => {}, t: ui.pt });

export function LangProvider({ initial, children }: { initial: Lang; children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initial);
  const router = useRouter();

  const setLang = useCallback(
    (l: Lang) => {
      setLangState(l);
      try {
        document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
        document.documentElement.lang = l === "pt" ? "pt-BR" : "en";
      } catch {
        /* ignore */
      }
      // recarrega as partes renderizadas no servidor (artigos, metadados)
      router.refresh();
    },
    [router],
  );

  const value = useMemo(() => ({ lang, setLang, t: ui[lang] }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
