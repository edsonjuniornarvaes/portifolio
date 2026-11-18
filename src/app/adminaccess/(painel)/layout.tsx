import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_EMAIL } from '@/lib/admin-auth';
import { readAdminToken } from '@/lib/admin-session';
import { ADMIN_COOKIE } from '@/lib/admin-cookie';
import { AdminShell } from '../_components/admin-shell';

export const dynamic = 'force-dynamic';

/** Guarda no servidor: sem sessão válida, nem o HTML do painel é entregue. */
export default function PainelLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!ADMIN_EMAIL || readAdminToken(token) !== ADMIN_EMAIL) redirect('/adminaccess/login');
  return <AdminShell>{children}</AdminShell>;
}
