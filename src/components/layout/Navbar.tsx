"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { GlobalTopicSearch } from "./GlobalTopicSearch";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import type { TopicSearchItem } from "@/lib/topic-search-index";

interface NavbarProps {
  searchIndex: TopicSearchItem[];
}

export function Navbar({ searchIndex }: Readonly<NavbarProps>) {
  const pathname = usePathname();
  const navCategories = categories.filter((category) => category.available);
  const showNavbarSearch = pathname !== "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex min-w-0 items-center gap-2">
          <BookOpen className="h-5 w-5 shrink-0 text-primary" />
          <span className="truncate text-lg font-bold">Interview Handbook</span>
        </Link>

        <nav
          aria-label="Desktop category navigation"
          className="hidden min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto pl-16 text-sm lg:flex xl:pl-20"
        >
          <Link
            href="/"
            className={cn(
              "relative rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 after:absolute after:left-3 after:right-3 after:bottom-1 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-primary/70 after:transition-transform after:duration-200",
              pathname === "/"
                ? "text-primary after:scale-x-100"
                : "text-muted-foreground hover:text-foreground hover:after:scale-x-100"
            )}
          >
            <span className="flex items-center gap-1.5">
              <Home className="h-3.5 w-3.5" />
              Dashboard
            </span>
          </Link>
          <div className="flex min-w-0 items-center justify-center gap-1 overflow-x-auto">
            {navCategories.map((category) => {
              const href = `/${category.id}`;
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={category.id}
                  href={href}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 after:absolute after:left-3 after:right-3 after:bottom-1 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-primary/70 after:transition-transform after:duration-200",
                    isActive
                      ? "text-primary after:scale-x-100"
                      : "text-muted-foreground hover:text-foreground hover:after:scale-x-100"
                  )}
                >
                  {category.title}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2 pl-3">
          {showNavbarSearch ? (
            <div className="hidden lg:block">
              <GlobalTopicSearch searchIndex={searchIndex} shortcutEnabled />
            </div>
          ) : (
            <div
              aria-hidden="true"
              className="hidden h-9 w-[240px] shrink-0 lg:block lg:w-[220px] xl:w-[280px]"
            />
          )}
          <ThemeToggle />
        </div>
      </div>

      {showNavbarSearch ? (
        <div className="px-4 pb-3 md:px-6 lg:hidden">
          <GlobalTopicSearch mobile searchIndex={searchIndex} />
        </div>
      ) : null}
    </header>
  );
}
