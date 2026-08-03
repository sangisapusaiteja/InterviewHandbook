"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemePreferenceSync } from "@/providers/ThemePreferenceSync";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;
const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {clerkEnabled ? <ThemePreferenceSync /> : null}
      {children}
    </NextThemesProvider>
  );
}
