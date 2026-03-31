"use client";

import { useState, useEffect, useCallback } from "react";
import { ProgressState } from "@/types/topic";

const STORAGE_KEY = "interview-handbook-progress";

const defaultProgress: ProgressState = {
  completedTopics: [],
  lastVisited: undefined,
};

function persistToStorage(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage not available
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch {
      // localStorage not available
    }
    setIsLoaded(true);
  }, []);

  const toggleTopicComplete = useCallback((topicId: string) => {
    setProgress((prev) => {
      const isCompleted = prev.completedTopics.includes(topicId);
      const newCompleted = isCompleted
        ? prev.completedTopics.filter((id) => id !== topicId)
        : [...prev.completedTopics, topicId];
      const next = { ...prev, completedTopics: newCompleted };
      persistToStorage(next);
      return next;
    });
  }, []);

  const markTopicComplete = useCallback((topicId: string) => {
    setProgress((prev) => {
      if (prev.completedTopics.includes(topicId)) return prev;
      const next = {
        ...prev,
        completedTopics: [...prev.completedTopics, topicId],
      };
      persistToStorage(next);
      return next;
    });
  }, []);

  const setLastVisited = useCallback((topicId: string) => {
    setProgress((prev) => {
      if (prev.lastVisited === topicId) return prev;
      const next = { ...prev, lastVisited: topicId };
      persistToStorage(next);
      return next;
    });
  }, []);

  const isTopicComplete = useCallback(
    (topicId: string) => {
      return progress.completedTopics.includes(topicId);
    },
    [progress.completedTopics]
  );

  const completedCount = progress.completedTopics.length;

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    persistToStorage(defaultProgress);
  }, []);

  return {
    progress,
    isLoaded,
    completedCount,
    toggleTopicComplete,
    markTopicComplete,
    setLastVisited,
    isTopicComplete,
    resetProgress,
  };
}
