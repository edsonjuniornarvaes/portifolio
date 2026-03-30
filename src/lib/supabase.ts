import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client (for API routes)
export const createServerClient = () => {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "placeholder-key";

  // Validar se a key não é placeholder
  if (key === "placeholder-key" || key === "sua_service_role_key_aqui") {
    const isProduction =
      process.env.VERCEL || process.env.NODE_ENV === "production";
    const configLocation = isProduction
      ? "Configure no painel do Vercel (Settings → Environment Variables)"
      : "Configure no arquivo .env";
    throw new Error(
      `SUPABASE_SERVICE_ROLE_KEY não configurada. ${configLocation}`,
    );
  }

  return createClient(url, key);
};
