"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { isSupportedThemePreference } from "@/lib/progress";

const remotePreferencesEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL
);

type PreferenceResponse = {
  preferences: {
    app_theme: string;
  } | null;
};

export function ThemePreferenceSync() {
  const { user, isLoaded } = useUser();
  const { theme, setTheme } = useTheme();
  const [isReadyToSync, setIsReadyToSync] = useState(false);
  const lastSyncedTheme = useRef<string | null>(null);
  const hydratedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!remotePreferencesEnabled || !isLoaded) {
      setIsReadyToSync(true);
      return;
    }

    if (!user) {
      hydratedUserId.current = null;
      setIsReadyToSync(true);
      return;
    }

    if (hydratedUserId.current === user.id) {
      setIsReadyToSync(true);
      return;
    }

    let cancelled = false;
    setIsReadyToSync(false);

    const loadThemePreference = async () => {
      try {
        const response = await fetch("/api/user-preferences", {
          cache: "no-store",
        });

        if (!response.ok) {
          setIsReadyToSync(true);
          return;
        }

        const payload = (await response.json()) as PreferenceResponse;
        const savedTheme = payload.preferences?.app_theme;

        if (!cancelled && savedTheme && isSupportedThemePreference(savedTheme)) {
          hydratedUserId.current = user.id;
          lastSyncedTheme.current = savedTheme;

          if (savedTheme !== theme) {
            setTheme(savedTheme);
          }
        } else if (!cancelled) {
          hydratedUserId.current = user.id;
        }
      } finally {
        if (!cancelled) {
          setIsReadyToSync(true);
        }
      }
    };

    void loadThemePreference();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, setTheme, user]);

  useEffect(() => {
    if (
      !remotePreferencesEnabled ||
      !isLoaded ||
      !user ||
      !isReadyToSync ||
      !theme ||
      !isSupportedThemePreference(theme)
    ) {
      return;
    }

    if (lastSyncedTheme.current === theme) {
      return;
    }

    lastSyncedTheme.current = theme;

    void fetch("/api/user-preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appTheme: theme,
      }),
    }).catch(() => {});
  }, [isLoaded, isReadyToSync, theme, user]);

  return null;
}
