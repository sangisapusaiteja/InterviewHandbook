"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuth } from "@/contexts/AuthContext";
import type { AppThemePreference } from "@/types/topic";

export type UserPreferences = {
  user_id: string;
  app_theme: AppThemePreference;
  pinned_topic_hrefs: string[];
  recent_queries: string[];
  recent_topic_hrefs: string[];
  assistant_state: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

type PreferencesUpdate = {
  appTheme?: string;
  pinnedTopicHrefs?: string[];
  recentQueries?: string[];
  recentTopicHrefs?: string[];
  assistantState?: Record<string, unknown>;
};

type PreferencesContextValue = {
  preferences: UserPreferences | null;
  isLoaded: boolean;
  isLoading: boolean;
  updatePreferences: (update: PreferencesUpdate) => void;
  refresh: () => Promise<void>;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

const remotePreferencesEnabled = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL
);

const defaultPreferences: Omit<UserPreferences, "user_id"> = {
  app_theme: "read",
  pinned_topic_hrefs: [],
  recent_queries: [],
  recent_topic_hrefs: [],
  assistant_state: {},
  created_at: "",
  updated_at: "",
};

export function PreferencesProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user, isLoaded: isAuthLoaded } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const loadedUserIdRef = useRef<string | null>(null);
  const inFlightUserIdRef = useRef<string | null>(null);

  const loadPreferences = useCallback(async () => {
    if (!remotePreferencesEnabled || !user?.id) {
      setIsLoaded(true);
      return;
    }

    if (
      loadedUserIdRef.current === user.id ||
      inFlightUserIdRef.current === user.id
    ) {
      setIsLoaded(true);
      return;
    }

    inFlightUserIdRef.current = user.id;
    setIsLoading(true);

    try {
      const response = await fetch("/api/user-preferences", {
        cache: "no-store",
      });

      if (!response.ok) {
        setIsLoaded(true);
        return;
      }

      const payload = (await response.json()) as {
        preferences: UserPreferences | null;
      };

      if (payload.preferences) {
        setPreferences(payload.preferences);
      } else {
        setPreferences({
          user_id: user.id,
          ...defaultPreferences,
        });
      }

      loadedUserIdRef.current = user.id;
      setIsLoaded(true);
    } catch {
      setIsLoaded(true);
    } finally {
      inFlightUserIdRef.current = null;
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!isAuthLoaded) {
      return;
    }

    if (!user?.id) {
      loadedUserIdRef.current = null;
      inFlightUserIdRef.current = null;
      setPreferences(null);
      setIsLoaded(true);
      setIsLoading(false);
      return;
    }

    void loadPreferences();
  }, [isAuthLoaded, user?.id, loadPreferences]);

  const updatePreferences = useCallback((update: PreferencesUpdate) => {
    if (!remotePreferencesEnabled) {
      return;
    }

    void fetch("/api/user-preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then(async (response) => {
        if (!response.ok) {
          return;
        }
        const payload = (await response.json()) as {
          preferences: UserPreferences;
        };
        if (payload.preferences) {
          setPreferences(payload.preferences);
        }
      })
      .catch(() => {});
  }, []);

  const refresh = useCallback(async () => {
    loadedUserIdRef.current = null;
    await loadPreferences();
  }, [loadPreferences]);

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        isLoaded,
        isLoading,
        updatePreferences,
        refresh,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider.");
  }

  return context;
}
