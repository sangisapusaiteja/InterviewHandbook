"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/dsa";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const navCategories = categories.filter((category) => category.available);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex min-w-0 items-center gap-2">
          <BookOpen className="h-5 w-5 shrink-0 text-primary" />
          <span className="truncate text-lg font-bold">My Interview Handbook</span>
        </Link>

        <nav
          aria-label="Desktop category navigation"
          className="hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto text-sm lg:flex"
        >
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-1.5">
              <Home className="h-3.5 w-3.5" />
              Dashboard
            </Link>
          </Button>
          {navCategories.map((category) => {
            const href = `/${category.id}`;
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={category.id}
                href={href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {category.title}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 pl-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
