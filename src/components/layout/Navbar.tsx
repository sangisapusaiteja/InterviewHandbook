"use client";

import {
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Home,
  Braces,
  Code2,
  Cpu,
  Database,
  FileCode,
  Globe,
  Palette,
  Server,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { GlobalTopicSearch } from "./GlobalTopicSearch";
import { CustomUserMenu } from "./CustomUserMenu";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import type { TopicSearchItem } from "@/lib/topic-search-index";

interface NavbarProps {
  searchIndex: TopicSearchItem[];
}

const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileCode,
  Palette,
  Braces,
  Code: Code2,
  Server,
  Cpu,
  Globe,
  Database,
};

function NavbarAuthControls() {
  if (!clerkEnabled) {
    return null;
  }

  return (
    <>
      <SignedOut>
        <Link
          href="/sign-in"
          className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          Sign in
        </Link>
      </SignedOut>
      <SignedIn>
        <CustomUserMenu />
      </SignedIn>
    </>
  );
}

export function Navbar({ searchIndex }: Readonly<NavbarProps>) {
  const pathname = usePathname();
  const navCategories = categories.filter((category) => category.available);
  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  const showNavbarSearch = pathname !== "/" && !isAuthPage;

  const groups = Array.from(new Set(navCategories.map((c) => c.group)));

  function isGroupActive(group: string) {
    return navCategories.some(
      (c) =>
        c.group === group &&
        (pathname === `/${c.id}` || pathname.startsWith(`/${c.id}/`)),
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex min-w-0 items-center gap-2">
          <BookOpen className="h-5 w-5 shrink-0 text-primary" />
          <span className="truncate text-lg font-bold">Interview Handbook</span>
        </Link>

        {isAuthPage ? (
          <div className="hidden flex-1 lg:block" />
        ) : (
          <nav
            aria-label="Desktop category navigation"
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 pl-16 text-sm lg:flex xl:pl-20"
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
            <div className="flex min-w-0 items-center justify-center gap-1">
              {groups.map((group) => {
                const groupActive = isGroupActive(group);
                return (
                  <div key={group} className="relative group">
                    <button
                      className={cn(
                        "relative rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 after:absolute after:left-3 after:right-3 after:bottom-1 after:h-0.5 after:origin-center after:rounded-full after:transition-transform after:duration-200",
                        groupActive
                          ? "text-primary after:scale-x-100 after:bg-primary/70"
                          : "text-muted-foreground hover:text-foreground after:scale-x-0 after:bg-primary/70 group-hover:after:scale-x-100"
                      )}
                    >
                      {group}
                    </button>
                    <div className="absolute left-0 top-full mt-1.5 w-56 rounded-xl border bg-popover/95 backdrop-blur-sm p-1 shadow-xl z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150 translate-y-1 group-hover:translate-y-0">
                      <div className="px-3 pb-1 pt-2">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                          {group}
                        </p>
                      </div>
                      {navCategories
                        .filter((c) => c.group === group)
                        .map((category) => {
                          const href = `/${category.id}`;
                          const isActive =
                            pathname === href ||
                            pathname.startsWith(`${href}/`);
                          const Icon =
                            iconMap[category.icon] || BookOpen;
                          return (
                            <Link
                              key={category.id}
                              href={href}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                                isActive
                                  ? "bg-primary/10 text-primary"
                                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
                              )}
                            >
                              <span className={cn(
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors duration-150",
                                isActive
                                  ? "bg-primary/15 text-primary"
                                  : "bg-muted/60 text-muted-foreground"
                              )}>
                                <Icon className="h-3.5 w-3.5" />
                              </span>
                              <span className="truncate">{category.title}</span>
                            </Link>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>
          </nav>
        )}

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
          {!isAuthPage ? <NavbarAuthControls /> : null}
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
