import type { Metadata } from "next";
import { getLang } from "@/i18n/server";
import { ui } from "@/i18n/dict";

export async function generateMetadata(): Promise<Metadata> {
  const t = ui[await getLang()].blogPage;
  return { title: t.title, description: t.lead, alternates: { canonical: "/blog" } };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
