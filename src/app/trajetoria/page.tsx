import type { Metadata } from "next";
import { getLang } from "@/i18n/server";
import { ui } from "@/i18n/dict";
import JourneyView from "./journey-view";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: ui[lang].journey.title, alternates: { canonical: "/trajetoria" } };
}

export default function JourneyPage() {
  return <JourneyView />;
}
