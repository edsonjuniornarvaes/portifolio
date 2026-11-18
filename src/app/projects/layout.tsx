import type { Metadata } from "next";
import { getLang } from "@/i18n/server";
import { ui } from "@/i18n/dict";

export async function generateMetadata(): Promise<Metadata> {
  const t = ui[await getLang()].work;
  return { title: t.pageTitle, description: t.pageLead, alternates: { canonical: "/projects" } };
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
