import { createClient } from "@supabase/supabase-js";
import {
  getProjectById,
  mergeProjectPatch,
  type Project,
  type ProjectCmsPatch,
} from "@/app/projects/helper";

function anonSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes("placeholder")) return null;
  return createClient(url, key);
}

export async function fetchProjectCmsPatch(projectId: string): Promise<ProjectCmsPatch | null> {
  const supabase = anonSupabase();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("payload")
      .eq("id", projectId)
      .maybeSingle();
    if (error || !data?.payload) return null;
    return data.payload as ProjectCmsPatch;
  } catch {
    return null;
  }
}

export async function getResolvedProject(id: string): Promise<Project | undefined> {
  const base = getProjectById(id);
  if (!base) return undefined;
  const patch = await fetchProjectCmsPatch(id);
  return mergeProjectPatch(base, patch);
}
