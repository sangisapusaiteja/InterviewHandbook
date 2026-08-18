"use client";

import { useEffect, useState } from "react";
import type { TopicSearchItem } from "@/lib/api/topics";

let cachedIndex: TopicSearchItem[] | null = null;

export function useSearchIndex() {
  const [searchIndex, setSearchIndex] = useState<TopicSearchItem[]>(
    cachedIndex ?? []
  );
  const [isLoading, setIsLoading] = useState(cachedIndex === null);

  useEffect(() => {
    if (cachedIndex) {
      setSearchIndex(cachedIndex);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch("/api/search-index", {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to load search index.");
        }
        const payload = (await response.json()) as {
          searchIndex: TopicSearchItem[];
        };
        cachedIndex = payload.searchIndex;
        if (!cancelled) {
          setSearchIndex(payload.searchIndex);
          setIsLoading(false);
        }
      } catch {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { searchIndex, isLoading };
}
