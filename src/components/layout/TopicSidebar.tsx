"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Boxes,
  Calculator,
  Repeat,
  FunctionSquare,
  LayoutGrid,
  Type,
  Box,
  Hash,
  CircleDot,
  TrendingUp,
  Search,
  Divide,
  ArrowUpDown,
  Target,
  ListPlus,
  GitMerge,
  Zap,
  Scale,
  Ghost,
  Link2,
  Milestone,
  RefreshCw,
  Layers,
  Network,
  Braces,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  X,
  Lock,
  GitFork,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { DSATopic } from "@/types/dsa";
import { useState, useEffect } from "react";
import { useMobileSidebar } from "@/contexts/MobileSidebarContext";
import { dsaModules } from "@/data/dsa";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Boxes,
  Calculator,
  Repeat,
  FunctionSquare,
  LayoutGrid,
  Type,
  Box,
  Hash,
  CircleDot,
  TrendingUp,
  Search,
  Divide,
  ArrowUpDown,
  Target,
  ListPlus,
  GitMerge,
  Zap,
  Scale,
  Ghost,
  Link2,
  Milestone,
  RefreshCw,
  Layers,
  Network,
  Braces,
  GitFork,
};

const DIFFICULTY_COLOR: Record<string, string> = {
  Beginner: "text-emerald-500",
  Intermediate: "text-amber-500",
  Advanced: "text-red-500",
};

const DIFFICULTY_DOT: Record<string, string> = {
  Beginner: "bg-emerald-500",
  Intermediate: "bg-amber-500",
  Advanced: "bg-red-500",
};

interface TopicSidebarProps {
  topics: DSATopic[];
  completedTopics: string[];
}

export function TopicSidebar({
  topics,
  completedTopics,
}: Readonly<TopicSidebarProps>) {
  const pathname = usePathname();
  const { open: mobileOpen, setOpen: setMobileOpen } = useMobileSidebar();
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  // Fast lookup: id → topic
  const topicMap = new Map(topics.map((t) => [t.id, t]));

  // Find which module the active topic belongs to
  const activeTopic = topics.find((t) => pathname === `/dsa/${t.slug}`);
  const activeModuleId = dsaModules.find(
    (m) => activeTopic && m.topicIds.includes(activeTopic.id)
  )?.id;

  // Collapsible state — auto-open the active module on first render
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    () => new Set(activeModuleId ? [activeModuleId] : [dsaModules[0]?.id ?? ""])
  );

  // Close mobile sidebar on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  // Auto-expand the module that contains the newly active topic
  useEffect(() => {
    if (activeModuleId) {
      setExpandedModules((prev) => new Set(Array.from(prev).concat(activeModuleId)));
    }
  }, [activeModuleId]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) { next.delete(moduleId); } else { next.add(moduleId); }
      return next;
    });
  };

  const completedCount = completedTopics.length;
  const progressPercent = Math.round((completedCount / topics.length) * 100);
  const iconOnly = !mobileOpen && desktopCollapsed;

  return (
    <>
      <aside
        className={cn(
          "fixed top-14 left-0 z-[60] h-[calc(100vh-3.5rem)]",
          "flex flex-col bg-background transition-all duration-300 ease-out",
          "w-[85vw] rounded-r-2xl border-r shadow-2xl",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:sticky lg:top-14 lg:translate-x-0",
          "lg:rounded-none lg:shadow-none",
          desktopCollapsed ? "lg:w-16" : "lg:w-96"
        )}
      >
        {/* ── Header ── */}
        {iconOnly ? (
          <div className="shrink-0 flex items-center justify-center py-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setDesktopCollapsed(false)}
              aria-label="Expand sidebar"
            >
              <ChevronLeft className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        ) : (
          <div className="shrink-0 px-4 pt-5 pb-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="font-bold text-base tracking-tight">
                  DSA Topics
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Master data structures & algorithms
                </p>
              </div>

              {/* Desktop collapse */}
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0 hidden lg:flex"
                onClick={() => setDesktopCollapsed(true)}
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Mobile close */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 lg:hidden"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-[18px] w-[18px]" />
              </Button>
            </div>

            {/* Overall progress card */}
            <div className="mt-4 rounded-xl bg-muted/60 px-3 py-2.5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">
                  {completedCount}{" "}
                  <span className="text-muted-foreground font-normal">
                    / {topics.length} done
                  </span>
                </span>
                <span className="font-semibold tabular-nums text-primary">
                  {progressPercent}%
                </span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-primary/90 to-primary/70"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        )}

        <Separator className="shrink-0" />

        {/* ── Topic list ── */}
        <div className="relative flex-1 min-h-0">
          <ScrollArea type="always" className="h-full">
            <nav className={cn("py-2", iconOnly ? "px-2" : "px-3 pb-6")}>

              {/* ── COLLAPSED: flat icon strip ── */}
              {iconOnly ? (
                <div className="space-y-0.5">
                  {topics.map((topic) => {
                    const Icon = iconMap[topic.icon] || Circle;
                    const isActive = pathname === `/dsa/${topic.slug}`;
                    const isCompleted = completedTopics.includes(topic.id);
                    const difficultyColor =
                      DIFFICULTY_COLOR[topic.difficulty] ??
                      "text-muted-foreground";

                    return (
                      <Tooltip key={topic.id} delayDuration={200}>
                        <TooltipTrigger asChild>
                          <Link
                            href={`/dsa/${topic.slug}`}
                            className={cn(
                              "flex items-center justify-center py-2 rounded-lg relative",
                              "transition-colors duration-150 w-full",
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-accent/70"
                            )}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="activeTab"
                                className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-primary rounded-r-full"
                                transition={{
                                  type: "spring",
                                  bounce: 0.15,
                                  duration: 0.45,
                                }}
                              />
                            )}
                            <div className="relative">
                              <Icon
                                className={cn(
                                  "h-[18px] w-[18px]",
                                  isActive
                                    ? "text-primary"
                                    : isCompleted
                                    ? "text-emerald-500"
                                    : "text-muted-foreground"
                                )}
                              />
                              {isCompleted && (
                                <span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-emerald-500 ring-1 ring-background" />
                              )}
                            </div>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={8}>
                          <p className="font-medium">{topic.title}</p>
                          <p className={cn("text-xs mt-0.5", difficultyColor)}>
                            {topic.difficulty}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              ) : (
                /* ── EXPANDED: grouped by module ── */
                <div className="space-y-1">
                  {dsaModules.map((module) => {
                    const moduleTopics = module.topicIds
                      .map((id) => topicMap.get(id))
                      .filter(Boolean) as DSATopic[];

                    const isExpanded = expandedModules.has(module.id);
                    const isEmpty = module.topicIds.length === 0;
                    const moduleCompleted = moduleTopics.filter((t) =>
                      completedTopics.includes(t.id)
                    ).length;
                    const isActiveModule = module.id === activeModuleId;
                    const dotColor =
                      DIFFICULTY_DOT[module.difficulty] ?? "bg-muted-foreground";

                    return (
                      <div key={module.id}>
                        {/* Module header button */}
                        <button
                          onClick={() => !isEmpty && toggleModule(module.id)}
                          disabled={isEmpty}
                          aria-expanded={isExpanded}
                          className={cn(
                            "w-full flex items-center gap-2 px-2 py-2 rounded-lg",
                            "text-left transition-colors duration-150",
                            isEmpty
                              ? "opacity-40 cursor-not-allowed"
                              : isActiveModule
                              ? "bg-primary/5 hover:bg-primary/10"
                              : "hover:bg-accent/60 active:bg-accent"
                          )}
                        >
                          {/* Level badge */}
                          <span className="shrink-0 text-[9px] font-bold w-6 h-6 rounded-md bg-muted border flex items-center justify-center tabular-nums text-muted-foreground">
                            L{module.level}
                          </span>

                          {/* Difficulty dot + title */}
                          <div className="flex items-center gap-1.5 flex-1 min-w-0">
                            <span
                              className={cn(
                                "shrink-0 h-1.5 w-1.5 rounded-full",
                                dotColor
                              )}
                            />
                            <span
                              className={cn(
                                "text-[12px] font-semibold leading-tight truncate",
                                isActiveModule
                                  ? "text-primary"
                                  : "text-foreground"
                              )}
                            >
                              {module.title}
                            </span>
                          </div>

                          {/* Progress count + chevron (or lock for empty modules) */}
                          <div className="shrink-0 flex items-center gap-1">
                            {isEmpty ? (
                              <Lock className="h-3 w-3 text-muted-foreground" />
                            ) : (
                              <>
                                <span className="text-[10px] tabular-nums text-muted-foreground">
                                  {moduleCompleted}/{moduleTopics.length}
                                </span>
                                <ChevronRight
                                  className={cn(
                                    "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
                                    isExpanded && "rotate-90"
                                  )}
                                />
                              </>
                            )}
                          </div>
                        </button>

                        {/* Animated topic list */}
                        <AnimatePresence initial={false}>
                          {isExpanded && !isEmpty && (
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="ml-4 pl-3 border-l border-border/50 mt-0.5 mb-1 space-y-0.5">
                                {moduleTopics.map((topic) => {
                                  const Icon = iconMap[topic.icon] || Circle;
                                  const isActive =
                                    pathname === `/dsa/${topic.slug}`;
                                  const isCompleted =
                                    completedTopics.includes(topic.id);

                                  return (
                                    <Link
                                      key={topic.id}
                                      href={`/dsa/${topic.slug}`}
                                      className={cn(
                                        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 relative",
                                        "transition-colors duration-150",
                                        isActive
                                          ? "bg-primary/10"
                                          : "hover:bg-accent/70 active:bg-accent"
                                      )}
                                    >
                                      {isActive && (
                                        <motion.div
                                          layoutId="activeTab"
                                          className="absolute left-0 top-2 bottom-2 w-[3px] bg-primary rounded-r-full"
                                          transition={{
                                            type: "spring",
                                            bounce: 0.15,
                                            duration: 0.45,
                                          }}
                                        />
                                      )}

                                      {/* Topic icon */}
                                      <div
                                        className={cn(
                                          "shrink-0 w-7 h-7 rounded-lg flex items-center justify-center",
                                          "transition-colors duration-150",
                                          isActive
                                            ? "bg-primary/15"
                                            : isCompleted
                                            ? "bg-emerald-500/10"
                                            : "bg-muted"
                                        )}
                                      >
                                        <Icon
                                          className={cn(
                                            "h-[14px] w-[14px]",
                                            isActive
                                              ? "text-primary"
                                              : isCompleted
                                              ? "text-emerald-500"
                                              : "text-muted-foreground"
                                          )}
                                        />
                                      </div>

                                      {/* Topic title */}
                                      <p
                                        className={cn(
                                          "flex-1 min-w-0 text-[12px] font-medium leading-tight truncate",
                                          isActive
                                            ? "text-primary"
                                            : "text-foreground"
                                        )}
                                      >
                                        {topic.title}
                                      </p>

                                      {/* Completion tick */}
                                      {isCompleted && (
                                        <CheckCircle2 className="shrink-0 h-3.5 w-3.5 text-emerald-500" />
                                      )}
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}
            </nav>
          </ScrollArea>

          {/* Bottom fade */}
          <div className="pointer-events-none absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-background to-transparent z-10" />
        </div>
      </aside>

      {/* Mobile scrim */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close topics menu"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] lg:hidden cursor-default"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
