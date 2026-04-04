import { Navbar } from "@/components/layout/Navbar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { topicSearchIndex } from "@/lib/topic-search-index";

export default function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar searchIndex={topicSearchIndex} />
      {/* pb-16 prevents content being hidden behind the fixed mobile bottom nav */}
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <MobileBottomNav />
    </div>
  );
}
