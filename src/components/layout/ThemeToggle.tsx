"use client";

import type { MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => {
    finished: Promise<void>;
  };
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 shrink-0 rounded-xl"
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isDark ? "light" : "dark";
    const root = document.documentElement;
    const triggerRect = event.currentTarget.getBoundingClientRect();
    const transitionX = triggerRect.left + triggerRect.width / 2;
    const transitionY = triggerRect.top + triggerRect.height / 2;

    root.style.setProperty("--theme-transition-x", `${transitionX}px`);
    root.style.setProperty("--theme-transition-y", `${transitionY}px`);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const themedDocument = document as ViewTransitionDocument;

    if (!themedDocument.startViewTransition || prefersReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    root.classList.add("theme-circle-transition");

    const transition = themedDocument.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.finished.finally(() => {
      root.classList.remove("theme-circle-transition");
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-9 w-9 shrink-0 rounded-xl transition-colors duration-300 hover:bg-accent/80"
      onClick={handleToggle}
    >
      <Sun
        className={`absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        }`}
      />
      <Moon
        className={`absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isDark
            ? "-rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
