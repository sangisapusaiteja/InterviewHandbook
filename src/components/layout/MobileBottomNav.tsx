"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, LayoutList, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMobileSidebar } from "@/contexts/MobileSidebarContext";
import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";
import { useEffect, useState } from "react";

export function MobileBottomNav() {
  const pathname = usePathname();
  const isTopicPage = pathname.startsWith("/dsa") || pathname.startsWith("/html") || pathname.startsWith("/css") || pathname.startsWith("/javascript") || pathname.startsWith("/python") || pathname.startsWith("/postgresql") || pathname.startsWith("/system-design");
  const isHome = pathname === "/";
  const { open, setOpen, toggle } = useMobileSidebar();
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const navCategories = categories.filter((category) => category.available);

  useEffect(() => {
    setCategoriesOpen(false);
  }, [pathname]);

  const handleCategoriesToggle = () => {
    if (!categoriesOpen) {
      setOpen(false);
    }
    setCategoriesOpen((prev) => !prev);
  };

  const handleTopicsToggle = () => {
    setCategoriesOpen(false);
    toggle();
  };

  return (
    <>
      <AnimatePresence>
        {categoriesOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close categories"
              className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCategoriesOpen(false)}
            />
            <motion.div
              className="fixed inset-x-3 bottom-20 z-50 rounded-2xl border bg-background/95 p-4 shadow-2xl lg:hidden"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Categories</p>
                  <p className="text-xs text-muted-foreground">
                    Jump to any handbook section
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCategoriesOpen(false)}
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Close categories"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {navCategories.map((category) => {
                  const href = `/${category.id}`;
                  const isActive =
                    pathname === href || pathname.startsWith(`${href}/`);

                  return (
                    <Link
                      key={category.id}
                      href={href}
                      className={cn(
                        "rounded-xl border px-3 py-3 text-sm font-medium transition-colors",
                        isActive
                          ? "border-primary/40 text-primary"
                          : "border-border/80 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      )}
                    >
                      {category.title}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <nav
        className="fixed bottom-0 inset-x-0 z-40 lg:hidden"
        aria-label="Mobile navigation"
      >
        <div className="border-t bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center h-16 px-4">
            {!isHome ? (
              <>
                <Link
                  href="/"
                  className={cn(
                    "relative flex flex-col items-center justify-center gap-1 flex-1 h-full",
                    "text-[11px] font-medium transition-colors duration-150",
                    "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Home className="h-5 w-5 relative" />
                  <span className="relative">Home</span>
                </Link>

                <div className="w-px h-6 bg-border/60 shrink-0" />
              </>
            ) : null}

            <button
              type="button"
              onClick={handleCategoriesToggle}
              aria-label={categoriesOpen ? "Close categories menu" : "Open categories menu"}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 flex-1 h-full",
                "text-[11px] font-medium transition-colors duration-150",
                categoriesOpen
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {categoriesOpen && (
                <motion.div
                  layoutId="bottomNavPill"
                  className="absolute inset-x-3 top-2 bottom-2 rounded-xl bg-primary/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <LayoutGrid
                className={cn("h-5 w-5 relative", categoriesOpen && "text-primary")}
              />
              <span className="relative">Categories</span>
            </button>

            {!isHome && isTopicPage && (
              <>
                <div className="w-px h-6 bg-border/60 shrink-0" />
                <button
                  type="button"
                  onClick={handleTopicsToggle}
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
    </>
  );
}
