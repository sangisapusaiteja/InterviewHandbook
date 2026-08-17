"use client";

import { useEffect, useState } from "react";
import type { Topic, TopicModule } from "@/types/topic";

type TopicsResponse = {
  topics: Topic[];
  modules: TopicModule[];
};

const cache = new Map<string, TopicsResponse>();

export function useTopics(categoryId: string) {
  const [topics, setTopics] = useState<Topic[]>(() => cache.get(categoryId)?.topics ?? []);
  const [modules, setModules] = useState<TopicModule[]>(() => cache.get(categoryId)?.modules ?? []);
  const [isLoading, setIsLoading] = useState(!cache.has(categoryId));

  useEffect(() => {
    if (cache.has(categoryId)) {
      const cached = cache.get(categoryId)!;
      setTopics(cached.topics);
      setModules(cached.modules);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch(`/api/topics?categoryId=${encodeURIComponent(categoryId)}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to load topics.");
        }
        const payload = (await response.json()) as TopicsResponse;
        cache.set(categoryId, payload);
        if (!cancelled) {
          setTopics(payload.topics);
          setModules(payload.modules);
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
  }, [categoryId]);

  return { topics, modules, isLoading };
}
