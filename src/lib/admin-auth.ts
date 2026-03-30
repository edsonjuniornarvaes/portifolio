import { createServerClient } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export const ADMIN_EMAIL = 'edsonjunior.narvaes@gmail.com';

/** Hash bcrypt de !Edsandrade@030adm — usado se a tabela ainda não existir */
export const FALLBACK_PASSWORD_HASH =
  '$2b$10$v72K7Iq8d1kquoEK.orSXuk/kdGZ1cvMzLmwC1obUSRr3WIcJuJ/u';

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
  return process.env.ADMIN_PASSWORD_HASH || FALLBACK_PASSWORD_HASH;
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
