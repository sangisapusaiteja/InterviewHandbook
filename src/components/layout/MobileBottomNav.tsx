"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutList } from "lucide-react";
import { motion } from "framer-motion";
import { useMobileSidebar } from "@/contexts/MobileSidebarContext";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();
  const isDSAPage = pathname.startsWith("/dsa");
  const isHome = pathname === "/";
  const { open, toggle } = useMobileSidebar();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden"
      aria-label="Mobile navigation"
    >
      {/* Frosted-glass bar */}
      <div className="border-t bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center h-16 px-6">
          {/* Home tab */}
          <Link
            href="/"
            className={cn(
              "relative flex flex-col items-center justify-center gap-1 flex-1 h-full",
              "text-[11px] font-medium transition-colors duration-150",
              isHome
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isHome && (
              <motion.div
                layoutId="bottomNavPill"
                className="absolute inset-x-3 top-2 bottom-2 rounded-xl bg-primary/10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <Home className={cn("h-5 w-5 relative", isHome && "text-primary")} />
            <span className="relative">Home</span>
          </Link>

          {/* Topics tab — DSA pages only */}
          {isDSAPage && (
            <>
              <div className="w-px h-6 bg-border/60 shrink-0" />
              <button
                onClick={toggle}
                aria-label={open ? "Close topics menu" : "Open topics menu"}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1 flex-1 h-full",
                  "text-[11px] font-medium transition-colors duration-150",
                  open
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {open && (
                  <motion.div
                    layoutId="bottomNavPill"
                    className="absolute inset-x-3 top-2 bottom-2 rounded-xl bg-primary/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <LayoutList
                  className={cn("h-5 w-5 relative", open && "text-primary")}
                />
                <span className="relative">Topics</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
