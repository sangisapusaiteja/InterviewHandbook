"use client";

import { BookOpen, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const MODES = ["read", "light", "dark"] as const;
type Mode = (typeof MODES)[number];

const MODE_ICONS: Record<Mode, React.ComponentType<{ className?: string }>> = {
  read: BookOpen,
  light: Sun,
  dark: Moon,
};

const MODE_LABELS: Record<Mode, string> = {
  read: "Read mode",
  light: "Light mode",
  dark: "Dark mode",
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

  const currentMode: Mode = MODES.includes(theme as Mode)
    ? (theme as Mode)
    : "read";
  const nextMode: Mode =
    MODES[(MODES.indexOf(currentMode) + 1) % MODES.length];
  const CurrentIcon = MODE_ICONS[currentMode];

  const handleToggle = () => {
    setTheme(nextMode);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-9 w-9 shrink-0 rounded-xl transition-colors duration-300 hover:bg-accent/80"
      onClick={handleToggle}
      title={`${MODE_LABELS[currentMode]} — click for ${MODE_LABELS[nextMode]}`}
      aria-label={`${MODE_LABELS[currentMode]} — click for ${MODE_LABELS[nextMode]}`}
    >
      <CurrentIcon className="h-4 w-4" />
      <span className="sr-only">{MODE_LABELS[currentMode]}</span>
    </Button>
  );
}
