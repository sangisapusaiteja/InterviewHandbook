"use client";

import { useEffect, useState } from "react";
import type { CategoryInfo } from "@/types/topic";

let cached: CategoryInfo[] | null = null;

export function useCategories() {
  const [categories, setCategories] = useState<CategoryInfo[]>(cached ?? []);
  const [isLoading, setIsLoading] = useState(cached === null);

  useEffect(() => {
    if (cached) {
      setCategories(cached);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch("/api/topics/categories", {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to load categories.");
        }
        const payload = (await response.json()) as { categories: CategoryInfo[] };
        cached = payload.categories;
        if (!cancelled) {
          setCategories(payload.categories);
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

  return { categories, isLoading };
}
