import { createServerClient } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';

export async function getAdminPasswordHash(): Promise<string> {
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from('admin_credentials')
      .select('password_hash')
      .eq('id', 1)
      .maybeSingle();
    if (data?.password_hash) return data.password_hash;
  } catch {
    /* tabela pode não existir ainda */
  }
  const envHash = process.env.ADMIN_PASSWORD_HASH;
  if (!envHash) {
    throw new Error(
      'ADMIN_PASSWORD_HASH não configurado. Defina no .env ou no Vercel para login funcionar sem Supabase.',
    );
  }
  return envHash;
}

export async function setAdminPasswordHash(hash: string): Promise<void> {
  const supabase = createServerClient();
  const { error } = await supabase.from('admin_credentials').upsert({
    id: 1,
    email: ADMIN_EMAIL,
    password_hash: hash,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const hash = await getAdminPasswordHash();
  return bcrypt.compare(password, hash);
}
