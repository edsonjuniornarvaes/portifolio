import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

/**
 * Client público (anon) — usado no front-end e no analytics tracker.
 * Se as variáveis não existirem, o client é criado mas as chamadas falharão
 * silenciosamente (a UI trata o fallback).
 */
export const supabase: SupabaseClient = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key",
);

/**
 * Client servidor com service_role — usado APENAS em API routes.
 * Requer SUPABASE_SERVICE_ROLE_KEY (nunca usar anon aqui).
 */
export const createServerClient = (): SupabaseClient => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    const where =
      process.env.VERCEL || process.env.NODE_ENV === "production"
        ? "Vercel → Settings → Environment Variables"
        : "arquivo .env / .env.local";
    throw new Error(
      `NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórias. Configure em ${where}.`,
    );
  }

  return createClient(url, key);
};
