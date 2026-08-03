"use client";

import { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { categories } from "@/data/categories";
import { countCompletedTopicsForSection, recordProgressActivity } from "@/lib/progress";
import type {
  ProgressSectionSummary,
  ProgressState,
  ProgressTopicSummary,
} from "@/types/topic";

const STORAGE_KEY = "interview-handbook-progress";
const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
const remoteProgressEnabled = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
export const databaseProgressConfigured =
  clerkEnabled && remoteProgressEnabled;

const defaultProgress: ProgressState = {
  completedTopics: [],
  lastVisited: undefined,
  activityLog: [],
};

const defaultSectionProgress: ProgressSectionSummary[] = [];

type ProgressApiResponse = {
  progress: ProgressState;
  sectionProgress: ProgressSectionSummary[];
  lastVisitedTopic: ProgressTopicSummary | null;
};

type RemoteProgressCache = {
  userId: string | null;
  progress: ProgressState;
  sectionProgress: ProgressSectionSummary[];
  lastVisitedTopic: ProgressTopicSummary | null;
  activityLog: string[];
  isLoaded: boolean;
};

const remoteProgressCache: RemoteProgressCache = {
  userId: null,
  progress: defaultProgress,
  sectionProgress: defaultSectionProgress,
  lastVisitedTopic: null,
  activityLog: [],
  isLoaded: false,
};

function persistToStorageWithKey(storageKey: string, state: ProgressState) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // localStorage not available
  }
}

function readStorageState(storageKey: string) {
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      return defaultProgress;
    }

    const parsed = JSON.parse(stored) as ProgressState;

    return {
      completedTopics: parsed.completedTopics ?? [],
      lastVisited: parsed.lastVisited,
      activityLog: parsed.activityLog ?? [],
    };
  } catch {
    return defaultProgress;
  }
}

function buildLocalSectionProgress(
  completedTopics: string[]
): ProgressSectionSummary[] {
  return categories
    .filter((category) => category.available)
    .map((category) => ({
      sectionSlug: category.id,
      title: category.title,
      href: `/${category.id}`,
      completedCount: countCompletedTopicsForSection(
        completedTopics,
        category.id
      ),
      totalCount: category.topicCount,
    }));
}

function useScopedLocalProgress(storageKey: string) {
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setProgress(readStorageState(storageKey));
    setIsLoaded(true);
  }, [storageKey]);

  const toggleTopicComplete = useCallback(
    (topicKey: string) => {
      setProgress((prev) => {
        const isCompleted = prev.completedTopics.includes(topicKey);
        const completedTopics = isCompleted
          ? prev.completedTopics.filter((id) => id !== topicKey)
          : [...prev.completedTopics, topicKey];
        const next = {
          ...prev,
          completedTopics,
          activityLog: recordProgressActivity(prev.activityLog),
        };
        persistToStorageWithKey(storageKey, next);
        return next;
      });
    },
    [storageKey]
  );

  const markTopicComplete = useCallback(
    (topicKey: string) => {
      setProgress((prev) => {
        if (prev.completedTopics.includes(topicKey)) {
          return prev;
        }

        const next = {
          ...prev,
          completedTopics: [...prev.completedTopics, topicKey],
          activityLog: recordProgressActivity(prev.activityLog),
        };
        persistToStorageWithKey(storageKey, next);
        return next;
      });
    },
    [storageKey]
  );

  const setLastVisited = useCallback(
    (topicKey: string) => {
      setProgress((prev) => {
        if (prev.lastVisited === topicKey) {
          return prev;
        }

        const next = {
          ...prev,
          lastVisited: topicKey,
          activityLog: recordProgressActivity(prev.activityLog),
        };
        persistToStorageWithKey(storageKey, next);
        return next;
      });
    },
    [storageKey]
  );

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    persistToStorageWithKey(storageKey, defaultProgress);
  }, [storageKey]);

  const isTopicComplete = useCallback(
    (topicKey: string) => progress.completedTopics.includes(topicKey),
    [progress.completedTopics]
  );

  return {
    progress,
    isLoaded,
    completedCount: progress.completedTopics.length,
    sectionProgress: buildLocalSectionProgress(progress.completedTopics),
    lastVisitedTopic: null as ProgressTopicSummary | null,
    activityLog: progress.activityLog ?? [],
    toggleTopicComplete,
    markTopicComplete,
    setLastVisited,
    isTopicComplete,
    resetProgress,
    refreshProgress: async () => {},
  };
}

function useRemoteClerkProgress() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const hasWarmCache =
    remoteProgressCache.userId === user?.id && remoteProgressCache.isLoaded;
  const [progress, setProgress] = useState<ProgressState>(
    hasWarmCache ? remoteProgressCache.progress : defaultProgress
  );
  const [sectionProgress, setSectionProgress] = useState<ProgressSectionSummary[]>(
    hasWarmCache ? remoteProgressCache.sectionProgress : defaultSectionProgress
  );
  const [lastVisitedTopic, setLastVisitedTopic] = useState<ProgressTopicSummary | null>(
    hasWarmCache ? remoteProgressCache.lastVisitedTopic : null
  );
  const [activityLog, setActivityLog] = useState<string[]>(
    hasWarmCache ? remoteProgressCache.activityLog : []
  );
  const [isLoaded, setIsLoaded] = useState(hasWarmCache);

  const applyApiResponse = useCallback(
    (payload: ProgressApiResponse) => {
      setProgress(payload.progress);
      setSectionProgress(payload.sectionProgress);
      setLastVisitedTopic(payload.lastVisitedTopic);
      setActivityLog(payload.progress.activityLog ?? []);
      setIsLoaded(true);
      remoteProgressCache.userId = user?.id ?? null;
      remoteProgressCache.progress = payload.progress;
      remoteProgressCache.sectionProgress = payload.sectionProgress;
      remoteProgressCache.lastVisitedTopic = payload.lastVisitedTopic;
      remoteProgressCache.activityLog = payload.progress.activityLog ?? [];
      remoteProgressCache.isLoaded = true;
    },
    [user?.id]
  );

  const refreshProgress = useCallback(async () => {
    if (!user?.id) {
      setProgress(defaultProgress);
      setSectionProgress(defaultSectionProgress);
      setLastVisitedTopic(null);
      setActivityLog([]);
      setIsLoaded(true);
      remoteProgressCache.userId = null;
      remoteProgressCache.progress = defaultProgress;
      remoteProgressCache.sectionProgress = defaultSectionProgress;
      remoteProgressCache.lastVisitedTopic = null;
      remoteProgressCache.activityLog = [];
      remoteProgressCache.isLoaded = true;
      return;
    }

    const response = await fetch("/api/user-progress", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to load progress.");
    }

    const payload = (await response.json()) as ProgressApiResponse;
    applyApiResponse(payload);
    return payload;
  }, [applyApiResponse, user?.id]);

  useEffect(() => {
    if (!isUserLoaded) {
      setIsLoaded(false);
      return;
    }

    if (!user?.id) {
      return;
    }

    if (remoteProgressCache.userId === user.id && remoteProgressCache.isLoaded) {
      setProgress(remoteProgressCache.progress);
      setSectionProgress(remoteProgressCache.sectionProgress);
      setLastVisitedTopic(remoteProgressCache.lastVisitedTopic);
      setActivityLog(remoteProgressCache.activityLog);
      setIsLoaded(true);
      return;
    }

    setIsLoaded(false);
  }, [isUserLoaded, user?.id]);

  useEffect(() => {
    if (!isUserLoaded) {
      return;
    }

    if (!user?.id) {
      setProgress(defaultProgress);
      setSectionProgress(defaultSectionProgress);
      setLastVisitedTopic(null);
      setActivityLog([]);
      setIsLoaded(true);
      return;
    }

    let cancelled = false;

    const loadRemoteProgress = async () => {
      try {
        await refreshProgress();
      } catch {
        if (!cancelled) {
          if (!remoteProgressCache.isLoaded) {
            setProgress(defaultProgress);
            setSectionProgress(defaultSectionProgress);
            setLastVisitedTopic(null);
            setActivityLog([]);
            setIsLoaded(true);
          }
        }
      }
    };

    void loadRemoteProgress();

    return () => {
      cancelled = true;
    };
  }, [isUserLoaded, refreshProgress, user?.id]);

  const mutateRemoteProgress = useCallback(
    async (body: Record<string, unknown>) => {
      const response = await fetch("/api/user-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to save progress.");
      }

      const payload = (await response.json()) as ProgressApiResponse;
      applyApiResponse(payload);
    },
    [applyApiResponse]
  );

  const toggleTopicComplete = useCallback(
    (topicKey: string) => {
      setProgress((prev) => {
        const isCompleted = prev.completedTopics.includes(topicKey);
        const completedTopics = isCompleted
          ? prev.completedTopics.filter((id) => id !== topicKey)
          : [...prev.completedTopics, topicKey];
        const next = { ...prev, completedTopics };

        void mutateRemoteProgress({
          action: "setCompleted",
          topicKey,
          completed: !isCompleted,
        }).catch(() => {
          void refreshProgress().catch(() => {});
        });

        return next;
      });
    },
    [mutateRemoteProgress, refreshProgress]
  );

  const markTopicComplete = useCallback(
    (topicKey: string) => {
      setProgress((prev) => {
        if (prev.completedTopics.includes(topicKey)) {
          return prev;
        }

        const next = {
          ...prev,
          completedTopics: [...prev.completedTopics, topicKey],
        };

        void mutateRemoteProgress({
          action: "setCompleted",
          topicKey,
          completed: true,
        }).catch(() => {
          void refreshProgress().catch(() => {});
        });

        return next;
      });
    },
    [mutateRemoteProgress, refreshProgress]
  );

  const setLastVisited = useCallback(
    (topicKey: string) => {
      setProgress((prev) => {
        if (prev.lastVisited === topicKey) {
          return prev;
        }

        const next = { ...prev, lastVisited: topicKey };

        void mutateRemoteProgress({
          action: "setLastVisited",
          topicKey,
        }).catch(() => {
          void refreshProgress().catch(() => {});
        });

        return next;
      });
    },
    [mutateRemoteProgress, refreshProgress]
  );

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    setLastVisitedTopic(null);
    setSectionProgress(defaultSectionProgress);
    setActivityLog([]);
    remoteProgressCache.userId = user?.id ?? null;
    remoteProgressCache.progress = defaultProgress;
    remoteProgressCache.sectionProgress = defaultSectionProgress;
    remoteProgressCache.lastVisitedTopic = null;
    remoteProgressCache.activityLog = [];
    remoteProgressCache.isLoaded = true;

    void mutateRemoteProgress({
      action: "resetProgress",
    }).catch(() => {
      void refreshProgress().catch(() => {});
    });
  }, [mutateRemoteProgress, refreshProgress, user?.id]);

  const isTopicComplete = useCallback(
    (topicKey: string) => progress.completedTopics.includes(topicKey),
    [progress.completedTopics]
  );

  return {
    progress,
    isLoaded,
    completedCount: progress.completedTopics.length,
    sectionProgress,
    lastVisitedTopic,
    activityLog,
    toggleTopicComplete,
    markTopicComplete,
    setLastVisited,
    isTopicComplete,
    resetProgress,
    refreshProgress,
  };
}

function useLocalProgress() {
  return useScopedLocalProgress(STORAGE_KEY);
}

function useUnavailableDatabaseProgress() {
  const isTopicComplete = useCallback(() => false, []);

  return {
    progress: defaultProgress,
    isLoaded: true,
    completedCount: 0,
    sectionProgress: defaultSectionProgress,
    lastVisitedTopic: null as ProgressTopicSummary | null,
    activityLog: [] as string[],
    toggleTopicComplete: () => {},
    markTopicComplete: () => {},
    setLastVisited: () => {},
    isTopicComplete,
    resetProgress: () => {},
    refreshProgress: async () => {},
  };
}

export const useDatabaseProgress = databaseProgressConfigured
  ? useRemoteClerkProgress
  : useUnavailableDatabaseProgress;

export const useProgress =
  databaseProgressConfigured ? useRemoteClerkProgress : useLocalProgress;
