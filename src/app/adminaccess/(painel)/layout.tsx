import { AdminShell } from "../_components/admin-shell";

export default function PainelAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AdminShell>{children}</AdminShell>;
}
