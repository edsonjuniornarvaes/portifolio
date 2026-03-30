import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/verify-admin";
import {
  getProjectById,
  mergeProjectPatch,
  type ProjectCmsPatch,
} from "@/app/projects/helper";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await context.params;
  const base = getProjectById(id);
  if (!base) {
    return NextResponse.json({ error: "Projeto não encontrado no código" }, { status: 404 });
  }

  let patch: ProjectCmsPatch = {};
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("portfolio_projects")
      .select("payload")
      .eq("id", id)
      .maybeSingle();
    if (data?.payload && typeof data.payload === "object") {
      patch = data.payload as ProjectCmsPatch;
    }
  } catch {
    /* service role / tabela indisponível: segue só com base */
  }

  const merged = mergeProjectPatch(base, patch);
  return NextResponse.json({ base, patch, merged });
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await context.params;
  if (!getProjectById(id)) {
    return NextResponse.json({ error: "Projeto não encontrado no código" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const patch = (body.patch || body) as ProjectCmsPatch;
    if (!patch || typeof patch !== "object") {
      return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
    }

    const supabase = createServerClient();
    const { error } = await supabase.from("portfolio_projects").upsert(
      {
        id,
        payload: patch,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );

    if (error) throw error;
    const base = getProjectById(id)!;
    return NextResponse.json({ ok: true, merged: mergeProjectPatch(base, patch) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erro ao salvar no Supabase" }, { status: 500 });
  }
}
