import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { getResolvedProject } from "@/lib/resolve-project";
import { getLang } from "@/i18n/server";
import { localizeProject } from "@/i18n/content";

const ProjectDetailClient = dynamic(() => import("./project-detail-client"), {
  loading: () => (
    <div
      style={{
        minHeight: "40vh",
        padding: "100px 24px",
        maxWidth: 960,
        margin: "0 auto",
        color: "var(--text-secondary)",
      }}
    >
      …
    </div>
  ),
});

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const base = await getResolvedProject(id);
  if (!base) return {};
  const p = localizeProject(base, await getLang());
  const description = (p.tagline || p.description || "").replace(/\s+/g, " ").trim().slice(0, 160);
  const shot = [...(p.screens ?? [])].find((u) => u && !/cover|board/.test(u)) || p.screens?.[0];
  return {
    title: { absolute: `${p.title} | Edson Junior` },
    description,
    alternates: { canonical: `/projects/${p.id}` },
    openGraph: { title: p.title, description, type: "article", images: shot ? [{ url: shot }] : undefined },
    twitter: { card: shot ? "summary_large_image" : "summary", title: p.title, description },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getResolvedProject(id);
  if (!project) notFound();
  return <ProjectDetailClient project={project} />;
}
