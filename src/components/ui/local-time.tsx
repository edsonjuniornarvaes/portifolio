"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/i18n/provider";
import { LOCALE } from "@/i18n/config";

/** Hora atual em Brasília, atualizada a cada minuto. */
export default function LocalTime() {
  const { lang } = useLang();
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat(LOCALE[lang], {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Sao_Paulo",
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [lang]);

  return <span suppressHydrationWarning>{time || "--:--"}</span>;
}
