"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bookmark, BookmarkCheck, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { TopicSearchItem } from "@/lib/topic-search-index";

type SearchResultItem = TopicSearchItem & {
  score: number;
  matchedTokens: number;
};

type SearchGroup = {
  id: string;
  moduleTitle: string;
  sectionTitle: string;
  items: SearchResultItem[];
  topScore: number;
};

type SuggestionSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const RECENT_QUERIES_KEY = "global-topic-search:recent-queries";
const RECENT_TOPICS_KEY = "global-topic-search:recent-topics";
const PINNED_TOPICS_KEY = "global-topic-search:pinned-topics";

const POPULAR_SEARCHES = [
  "CAP theorem",
  "Binary Trees",
  "Loops in JavaScript",
  "PostgreSQL joins",
  "Python classes",
  "Flexbox",
];

const MODULE_QUICK_FILTERS = [
  "JavaScript",
  "DSA",
  "Python",
  "PostgreSQL",
  "System Design",
  "Python Practice Problems",
];

const STUDY_INTENT_QUERIES = [
  "Beginner",
  "Practice Problems",
  "System Design",
  "Loops in JavaScript",
  "SQL joins",
  "Binary tree",
];

const BLOCKED_RECENT_QUERIES = new Set(["js loops"]);

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function compact(text: string) {
  return normalize(text).replace(/\s+/g, "");
}

function splitWords(text: string) {
  const normalized = normalize(text);
  return normalized ? normalized.split(/\s+/) : [];
}

function containsWholePhrase(text: string, phrase: string) {
  if (!text || !phrase) {
    return false;
  }

  return ` ${text} `.includes(` ${phrase} `);
}

function hasExactWord(words: string[], token: string) {
  return words.includes(token);
}

function hasPrefixWord(words: string[], token: string) {
  if (token.length < 2) {
    return false;
  }

  return words.some((word) => word.startsWith(token));
}

function SuggestionSection({
  title,
  description,
  children,
}: Readonly<SuggestionSectionProps>) {
  return (
    <section className="rounded-2xl border border-border/80 bg-card/60 p-4">
      <div className="mb-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        {description ? (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function buildSearchGroups(
  index: TopicSearchItem[],
  query: string,
): SearchGroup[] {
  const normalizedQuery = normalize(query);
  const compactQuery = compact(query);
  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

  if (!normalizedQuery || tokens.length === 0) {
    return [];
  }

  const scoredItems = index
    .map((item) => {
      const titleText = normalize(item.title);
      const slugText = normalize(item.slug);
      const searchText = normalize(item.searchText);

      const titleWords = splitWords(item.title);
      const slugWords = splitWords(item.slug);
      const moduleWords = splitWords(item.moduleTitle);
      const sectionWords = splitWords(item.sectionTitle);
      const searchWords = splitWords(item.searchText);

      const compactTitle = compact(item.title);
      const compactSlug = compact(item.slug);

      let score = 0;
      let matchedTokens = 0;

      if (titleText === normalizedQuery || slugText === normalizedQuery) {
        score += 360;
      } else if (
        compactTitle === compactQuery ||
        compactSlug === compactQuery
      ) {
        score += 340;
      } else if (
        containsWholePhrase(titleText, normalizedQuery) ||
        containsWholePhrase(slugText, normalizedQuery)
      ) {
        score += 280;
      } else if (
        compactTitle.startsWith(compactQuery) ||
        compactSlug.startsWith(compactQuery)
      ) {
        score += 220;
      } else if (containsWholePhrase(searchText, normalizedQuery)) {
        score += 140;
      } else if (
        compactQuery.length >= 4 &&
        (compactTitle.includes(compactQuery) ||
          compactSlug.includes(compactQuery))
      ) {
        score += 190;
      }

      for (const token of tokens) {
        if (hasExactWord(titleWords, token)) {
          score += 44;
          matchedTokens += 1;
          continue;
        }

        if (hasPrefixWord(titleWords, token)) {
          score += 28;
          matchedTokens += 1;
          continue;
        }

        if (hasExactWord(slugWords, token)) {
          score += 38;
          matchedTokens += 1;
          continue;
        }

        if (hasPrefixWord(slugWords, token)) {
          score += 24;
          matchedTokens += 1;
          continue;
        }

        if (
          hasExactWord(moduleWords, token) ||
          hasExactWord(sectionWords, token)
        ) {
          score += 16;
          matchedTokens += 1;
          continue;
        }

        if (
          hasPrefixWord(moduleWords, token) ||
          hasPrefixWord(sectionWords, token)
        ) {
          score += 10;
          matchedTokens += 1;
          continue;
        }

        if (hasExactWord(searchWords, token)) {
          score += 10;
          matchedTokens += 1;
          continue;
        }

        if (hasPrefixWord(searchWords, token)) {
          score += 6;
          matchedTokens += 1;
        }
      }

      const minimumMatches = tokens.length === 1 ? 1 : tokens.length;

      if (matchedTokens < minimumMatches || score === 0) {
        return null;
      }

      return {
        ...item,
        score,
        matchedTokens,
      };
    })
    .filter((item): item is SearchResultItem => item !== null)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.matchedTokens !== a.matchedTokens) {
        return b.matchedTokens - a.matchedTokens;
      }
      return a.title.localeCompare(b.title);
    });

  const grouped = new Map<string, SearchGroup>();

  for (const item of scoredItems) {
    const groupId = `${item.sectionId}:${item.moduleId}`;
    const existing = grouped.get(groupId);

    if (!existing) {
      grouped.set(groupId, {
        id: groupId,
        moduleTitle: item.moduleTitle,
        sectionTitle: item.sectionTitle,
        items: [item],
        topScore: item.score,
      });
      continue;
    }

    if (existing.items.length < 4) {
      existing.items.push(item);
    }
    existing.topScore = Math.max(existing.topScore, item.score);
  }

  return Array.from(grouped.values())
    .sort((a, b) => {
      if (b.topScore !== a.topScore) return b.topScore - a.topScore;
      return a.moduleTitle.localeCompare(b.moduleTitle);
    })
    .slice(0, 8);
}

interface GlobalTopicSearchProps {
  className?: string;
  mobile?: boolean;
  searchIndex: TopicSearchItem[];
  shortcutEnabled?: boolean;
}

export function GlobalTopicSearch({
  className,
  mobile = false,
  searchIndex,
  shortcutEnabled = false,
}: Readonly<GlobalTopicSearchProps>) {
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const prefetchedHrefsRef = useRef(new Set<string>());
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recentQueries, setRecentQueries] = useState<string[]>([]);
  const [recentTopicHrefs, setRecentTopicHrefs] = useState<string[]>([]);
  const [pinnedTopicHrefs, setPinnedTopicHrefs] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const readStoredList = (key: string) => {
      try {
        const value = window.localStorage.getItem(key);
        const parsed = value ? JSON.parse(value) : [];
        return Array.isArray(parsed)
          ? parsed.filter(
              (entry): entry is string =>
                typeof entry === "string" &&
                !BLOCKED_RECENT_QUERIES.has(entry.toLowerCase()),
            )
          : [];
      } catch {
        return [];
      }
    };

    setRecentQueries(readStoredList(RECENT_QUERIES_KEY));
    setRecentTopicHrefs(readStoredList(RECENT_TOPICS_KEY));
    setPinnedTopicHrefs(readStoredList(PINNED_TOPICS_KEY));
  }, []);

  const persistStringList = (
    key: string,
    values: string[],
    setter: (items: string[]) => void,
  ) => {
    setter(values);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(values));
    }
  };

  const trackRecentQuery = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return;
    }

    const nextQueries = [
      trimmedValue,
      ...recentQueries.filter(
        (entry) => entry.toLowerCase() !== trimmedValue.toLowerCase(),
      ),
    ]
      .filter((entry) => !BLOCKED_RECENT_QUERIES.has(entry.toLowerCase()))
      .slice(0, 6);

    persistStringList(RECENT_QUERIES_KEY, nextQueries, setRecentQueries);
  };

  const trackRecentTopic = (href: string) => {
    const nextTopics = [
      href,
      ...recentTopicHrefs.filter((entry) => entry !== href),
    ].slice(0, 6);

    persistStringList(RECENT_TOPICS_KEY, nextTopics, setRecentTopicHrefs);
  };

  const togglePinnedTopic = (href: string) => {
    const nextPinned = pinnedTopicHrefs.includes(href)
      ? pinnedTopicHrefs.filter((entry) => entry !== href)
      : [href, ...pinnedTopicHrefs].slice(0, 8);

    persistStringList(PINNED_TOPICS_KEY, nextPinned, setPinnedTopicHrefs);
  };

  useEffect(() => {
    if (!shortcutEnabled) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (isTypingTarget) {
        return;
      }

      const isSlashShortcut =
        event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey;
      const isAltKShortcut =
        event.key.toLowerCase() === "k" &&
        event.altKey &&
        !event.metaKey &&
        !event.ctrlKey;

      if (!isSlashShortcut && !isAltKShortcut) {
        return;
      }

      event.preventDefault();
      setOpen(true);
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [shortcutEnabled]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, [open]);

  const results = useMemo(() => {
    return buildSearchGroups(searchIndex, query);
  }, [searchIndex, query]);

  const topResult = results[0]?.items[0] ?? null;

  const topicByHref = useMemo(() => {
    return new Map(searchIndex.map((item) => [item.href, item]));
  }, [searchIndex]);

  const currentTopic = useMemo(() => {
    return searchIndex.find((item) => item.href === pathname) ?? null;
  }, [pathname, searchIndex]);

  const recentTopicItems = useMemo(() => {
    return recentTopicHrefs
      .map((href) => topicByHref.get(href))
      .filter((item): item is TopicSearchItem => Boolean(item));
  }, [recentTopicHrefs, topicByHref]);

  const pinnedTopicItems = useMemo(() => {
    return pinnedTopicHrefs
      .map((href) => topicByHref.get(href))
      .filter((item): item is TopicSearchItem => Boolean(item));
  }, [pinnedTopicHrefs, topicByHref]);

  const relatedTopicItems = useMemo(() => {
    if (!currentTopic) {
      return [];
    }

    const sameModule = searchIndex.filter(
      (item) =>
        item.moduleId === currentTopic.moduleId &&
        item.href !== currentTopic.href,
    );

    if (sameModule.length > 0) {
      return sameModule.slice(0, 4);
    }

    return searchIndex
      .filter(
        (item) =>
          item.sectionId === currentTopic.sectionId &&
          item.href !== currentTopic.href,
      )
      .slice(0, 4);
  }, [currentTopic, searchIndex]);

  useEffect(() => {
    for (const group of results) {
      for (const item of group.items) {
        if (prefetchedHrefsRef.current.has(item.href)) {
          continue;
        }

        prefetchedHrefsRef.current.add(item.href);
        router.prefetch(item.href);
      }
    }
  }, [results, router]);

  const handleSelect = (item: TopicSearchItem) => {
    if (query.trim()) {
      trackRecentQuery(query);
    }

    trackRecentTopic(item.href);
    setOpen(false);
    router.push(item.href);
  };

  const handlePrefetch = (href: string) => {
    if (prefetchedHrefsRef.current.has(href)) {
      return;
    }

    prefetchedHrefsRef.current.add(href);
    router.prefetch(href);
  };

  const applySuggestion = (value: string) => {
    setQuery(value);
    trackRecentQuery(value);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && topResult) {
      event.preventDefault();
      handleSelect(topResult);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  const renderQueryChip = (value: string) => (
    <button
      key={value}
      type="button"
      onClick={() => applySuggestion(value)}
      className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent/50"
    >
      {value}
    </button>
  );

  const renderTopicChip = (item: TopicSearchItem) => (
    <button
      key={item.href}
      type="button"
      onClick={() => handleSelect(item)}
      onMouseEnter={() => handlePrefetch(item.href)}
      className="rounded-full border border-border bg-background px-3 py-1.5 text-left text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent/50"
    >
      {item.title}
    </button>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center gap-2 rounded-xl border border-border/70 bg-background/80 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground",
          mobile
            ? "h-10 w-full px-3"
            : "h-9 w-[240px] shrink-0 px-3 lg:w-[220px] xl:w-[280px]",
          className,
        )}
        aria-label="Search topics"
        title={
          shortcutEnabled && !mobile
            ? "Search topics (/ or Alt+K)"
            : "Search topics"
        }
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="min-w-0 flex-1 truncate">
          {mobile ? "Search topics..." : "Search topics and modules..."}
        </span>
        {shortcutEnabled && !mobile ? (
          <span className="hidden shrink-0 items-center gap-1 text-[10px] font-mono font-semibold text-foreground/80 md:inline-flex">
            <kbd className="rounded-md border border-border bg-muted/60 px-1.5 py-0.5">
              /
            </kbd>
            <span className="text-muted-foreground">or</span>
            <kbd className="rounded-md border border-border bg-muted/60 px-1.5 py-0.5">
              Alt+K
            </kbd>
          </span>
        ) : null}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[720px] max-h-[85vh] w-[calc(100vw-1rem)] max-w-3xl flex-col overflow-hidden rounded-2xl border border-border/70 p-0 sm:w-full">
          <div className="border-b px-4 pb-4 pt-6 sm:px-6">
            <DialogTitle>Search Topics</DialogTitle>
            <DialogDescription className="mt-1">
              Search topics, modules, and concepts with natural language.
            </DialogDescription>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-background px-3">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder='Try "Loops in JavaScript", "CAP theorem", or "Python classes"...'
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>Try natural language:</span>
              <button
                type="button"
                onClick={() => applySuggestion("binary tree traversal")}
                className="rounded-full border border-border/80 bg-muted/30 px-2.5 py-1 transition-colors hover:border-primary/40 hover:text-foreground"
              >
                binary tree traversal
              </button>
              <button
                type="button"
                onClick={() => applySuggestion("CAP theorem")}
                className="rounded-full border border-border/80 bg-muted/30 px-2.5 py-1 transition-colors hover:border-primary/40 hover:text-foreground"
              >
                CAP theorem
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
            {!query.trim() ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 px-4 py-5">
                  <p className="text-sm font-semibold">
                    Search any topic, module, or concept
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Results are grouped by module, natural language works, and
                    Enter opens the top match.
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {pinnedTopicItems.length > 0 ? (
                    <SuggestionSection
                      title="Pinned"
                      description="Keep your go-to topics one tap away."
                    >
                      <div className="flex flex-wrap gap-2">
                        {pinnedTopicItems.map(renderTopicChip)}
                      </div>
                    </SuggestionSection>
                  ) : null}

                  {recentTopicItems.length > 0 ? (
                    <SuggestionSection
                      title="Continue Learning"
                      description="Jump back into the topics you opened recently."
                    >
                      <div className="flex flex-wrap gap-2">
                        {recentTopicItems.map(renderTopicChip)}
                      </div>
                    </SuggestionSection>
                  ) : null}

                  {currentTopic && relatedTopicItems.length > 0 ? (
                    <SuggestionSection
                      title={`Related Here: ${currentTopic.moduleTitle}`}
                      description={`More from ${currentTopic.sectionTitle} based on your current page.`}
                    >
                      <div className="flex flex-wrap gap-2">
                        {relatedTopicItems.map(renderTopicChip)}
                      </div>
                    </SuggestionSection>
                  ) : null}

                  {recentQueries.length > 0 ? (
                    <SuggestionSection
                      title="Recent Searches"
                      description="Reuse past searches instead of typing them again."
                    >
                      <div className="flex flex-wrap gap-2">
                        {recentQueries.map(renderQueryChip)}
                      </div>
                    </SuggestionSection>
                  ) : null}

                  <SuggestionSection
                    title="Popular Searches"
                    description="Good examples of exact topics and natural language queries."
                  >
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map(renderQueryChip)}
                    </div>
                  </SuggestionSection>

                  <SuggestionSection
                    title="Browse By Module"
                    description="Start broad, then narrow to the topic you want."
                  >
                    <div className="flex flex-wrap gap-2">
                      {MODULE_QUICK_FILTERS.map(renderQueryChip)}
                    </div>
                  </SuggestionSection>

                  <SuggestionSection
                    title="Study Intents"
                    description="Search by learning goal, not just exact page title."
                  >
                    <div className="flex flex-wrap gap-2">
                      {STUDY_INTENT_QUERIES.map(renderQueryChip)}
                    </div>
                  </SuggestionSection>

                  <SuggestionSection
                    title="Keyboard"
                    description="Use the modal without reaching for the mouse."
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full border border-border bg-background px-2.5 py-1">
                        Enter opens top result
                      </span>
                      <span className="rounded-full border border-border bg-background px-2.5 py-1">
                        Esc closes
                      </span>
                      {shortcutEnabled ? (
                        <span className="rounded-full border border-border bg-background px-2.5 py-1">
                          / or Alt+K opens search
                        </span>
                      ) : null}
                    </div>
                  </SuggestionSection>
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 px-4 py-8 text-center">
                  <p className="text-sm font-medium">
                    No direct matches for &quot;{query.trim()}&quot;.
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try exact topic words, a broader module, or one of these
                    suggestions.
                  </p>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <SuggestionSection
                    title="Try Popular Searches"
                    description="Use exact words for the strongest matches."
                  >
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map(renderQueryChip)}
                    </div>
                  </SuggestionSection>
                  <SuggestionSection
                    title="Broaden The Query"
                    description="Search the module first, then pick the topic."
                  >
                    <div className="flex flex-wrap gap-2">
                      {MODULE_QUICK_FILTERS.map(renderQueryChip)}
                    </div>
                  </SuggestionSection>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full border border-border bg-muted/20 px-2.5 py-1">
                    Exact words rank highest
                  </span>
                  <span className="rounded-full border border-border bg-muted/20 px-2.5 py-1">
                    Enter opens the top result
                  </span>
                  {topResult ? (
                    <span className="rounded-full border border-border bg-muted/20 px-2.5 py-1">
                      Top match: {topResult.title}
                    </span>
                  ) : null}
                </div>

                {results.map((group) => (
                  <section
                    key={group.id}
                    className="rounded-2xl border border-border/80 bg-card/80"
                  >
                    <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold">
                          {group.moduleTitle}
                        </h3>
                        <p className="truncate text-xs text-muted-foreground">
                          {group.sectionTitle}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                        {group.items.length} result
                        {group.items.length > 1 ? "s" : ""}
                      </span>
                    </div>

                    <div className="divide-y">
                      {group.items.map((item) => {
                        const isPinned = pinnedTopicHrefs.includes(item.href);

                        return (
                          <div
                            key={item.id}
                            className="flex items-start gap-2 px-4 py-3 transition-colors hover:bg-accent/40"
                          >
                            <button
                              type="button"
                              onClick={() => handleSelect(item)}
                              onMouseEnter={() => handlePrefetch(item.href)}
                              onFocus={() => handlePrefetch(item.href)}
                              onTouchStart={() => handlePrefetch(item.href)}
                              className="min-w-0 flex-1 text-left"
                            >
                              <p className="truncate text-sm font-medium">
                                {item.title}
                              </p>
                              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                {item.description}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
                                  Topic
                                </span>
                                <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
                                  {item.sectionTitle}
                                </span>
                                <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
                                  {item.difficulty}
                                </span>
                              </div>
                            </button>
                            <button
                              type="button"
                              onClick={() => togglePinnedTopic(item.href)}
                              aria-label={
                                isPinned
                                  ? `Unpin ${item.title}`
                                  : `Pin ${item.title}`
                              }
                              className="mt-1 rounded-lg border border-border bg-background p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                            >
                              {isPinned ? (
                                <BookmarkCheck className="h-4 w-4" />
                              ) : (
                                <Bookmark className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
