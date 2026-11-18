import type { Metadata } from "next";
import { getLang } from "@/i18n/server";
import { ui } from "@/i18n/dict";
import LabView from "./lab-view";

export async function generateMetadata(): Promise<Metadata> {
  const t = ui[await getLang()].lab;
  return { title: t.title, description: t.lead, alternates: { canonical: "/lab" } };
}

export default function LabPage() {
  return <LabView />;
}
