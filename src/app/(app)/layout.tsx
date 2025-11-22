import { Breadcrumbs } from "@/features/navigation/components/breadcrumbs";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto max-w-7xl px-1 py-3 md:px-6 md:py-10">
      <Breadcrumbs />
      {children}
    </div>
  );
}
