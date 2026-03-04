"use client";

import Link from "next/link";
import { BookOpen, Home } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        {/* Logo — always visible, links home */}
        <Link href="/" className="flex items-center gap-2 mr-6">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="font-bold text-lg">My Interview Handbook</span>
        </Link>

        {/* Desktop nav only — mobile uses bottom nav */}
        <nav className="hidden lg:flex items-center gap-1 text-sm">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-1.5">
              <Home className="h-3.5 w-3.5" />
              Dashboard
            </Link>
          </Button>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
