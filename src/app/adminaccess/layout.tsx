import StyledComponentsRegistry from '../registry';

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <StyledComponentsRegistry>
      {children}
    </StyledComponentsRegistry>
  );
}
