"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemePreferenceSync } from "@/providers/ThemePreferenceSync";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      themes={["light", "dark", "read"]}
      {...props}
    >
      <ThemePreferenceSync />
      {children}
    </NextThemesProvider>
  );
}
