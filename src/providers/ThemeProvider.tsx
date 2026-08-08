"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemePreferenceSync } from "@/providers/ThemePreferenceSync";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;
const remotePreferencesEnabled = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {remotePreferencesEnabled ? <ThemePreferenceSync /> : null}
      {children}
    </NextThemesProvider>
  );
}
