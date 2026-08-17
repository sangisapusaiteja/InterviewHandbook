import { Navbar } from "@/components/layout/Navbar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { buildSearchIndex } from "@/lib/api/topics";

export default async function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let searchIndex: Awaited<ReturnType<typeof buildSearchIndex>> = [];
  try {
    searchIndex = await buildSearchIndex();
  } catch {
    searchIndex = [];
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar searchIndex={searchIndex} />
      {/* pb-16 prevents content being hidden behind the fixed mobile bottom nav */}
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <MobileBottomNav />
    </div>
  );
}
