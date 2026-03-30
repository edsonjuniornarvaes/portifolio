import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { getResolvedProject } from "@/lib/resolve-project";

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
      Carregando…
    </div>
  ),
});

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getResolvedProject(id);
  if (!project) notFound();
  return <ProjectDetailClient project={project} />;
}
