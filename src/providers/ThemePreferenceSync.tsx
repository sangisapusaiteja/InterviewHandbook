"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePreferences } from "@/contexts/PreferencesContext";
import { useTheme } from "next-themes";
import { isSupportedThemePreference } from "@/lib/progress";

const remotePreferencesEnabled = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL
);

export function ThemePreferenceSync() {
  const { isLoaded: isAuthLoaded } = useAuth();
  const { preferences, isLoaded, updatePreferences } = usePreferences();
  const { theme, setTheme } = useTheme();
  const lastSyncedTheme = useRef<string | null>(null);

  // Apply the saved theme once prefs are loaded.
  useEffect(() => {
    if (!remotePreferencesEnabled || !isLoaded || !preferences) {
      return;
    }

    const savedTheme = preferences.app_theme;

    if (isSupportedThemePreference(savedTheme) && savedTheme !== theme) {
      lastSyncedTheme.current = savedTheme;
      setTheme(savedTheme);
    } else {
      lastSyncedTheme.current = theme ?? savedTheme;
    }
    // Only apply on initial load; rely on the write effect for subsequent changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isAuthLoaded]);

  // Persist theme changes back to the server.
  useEffect(() => {
    if (
      !remotePreferencesEnabled ||
      !isLoaded ||
      !preferences ||
      !theme ||
      !isSupportedThemePreference(theme)
    ) {
      return;
    }

    if (lastSyncedTheme.current === theme) {
      return;
    }

    lastSyncedTheme.current = theme;
    updatePreferences({ appTheme: theme });
  }, [isLoaded, preferences, theme, updatePreferences]);

  return null;
}
