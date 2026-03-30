import { NextRequest, NextResponse } from "next/server";
import { getResolvedProject } from "@/lib/resolve-project";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const project = await getResolvedProject(id);
  if (!project) {
    return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  }
  return NextResponse.json({ project });
}
