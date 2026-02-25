"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
  Menu,
  X,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DSATopic } from "@/types/dsa";
import { useState, useEffect } from "react";

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
};

interface TopicSidebarProps {
  topics: DSATopic[];
  completedTopics: string[];
}

export function TopicSidebar({ topics, completedTopics }: TopicSidebarProps) {
  const pathname = usePathname();
  // Start hidden on mobile; open on desktop after mount
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (window.innerWidth >= 1024) setCollapsed(false);
  }, []);

  // Auto-close when navigating on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) setCollapsed(true);
  }, [pathname]);

  const completedCount = completedTopics.length;
  const progressPercent = Math.round((completedCount / topics.length) * 100);

  return (
    <>
      {/* Mobile toggle — pill button anchored to left edge, only when closed */}
      {collapsed && (
        <button
          className="fixed top-[3.75rem] left-0 z-40 lg:hidden flex items-center gap-1.5 bg-background border border-l-0 rounded-r-lg px-2.5 py-1.5 text-xs font-medium shadow-sm text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setCollapsed(false)}
          aria-label="Open topics menu"
        >
          <Menu className="h-3.5 w-3.5" />
          Topics
        </button>
      )}

      <aside
        className={cn(
          "fixed top-14 left-0 z-30 h-[calc(100vh-3.5rem)] border-r bg-background transition-all duration-300 lg:sticky",
          collapsed
            ? "-translate-x-full lg:translate-x-0 lg:w-16"
            : "translate-x-0 w-72"
        )}
      >
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <div>
              <h2 className="font-semibold text-sm">DSA Topics</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {completedCount}/{topics.length} completed
              </p>
            </div>
          )}
          <div className="flex items-center gap-1 ml-auto">
            {/* Desktop collapse toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 hidden lg:flex"
              onClick={() => setCollapsed(!collapsed)}
            >
              <ChevronLeft
                className={cn(
                  "h-4 w-4 transition-transform",
                  collapsed && "rotate-180"
                )}
              />
            </Button>
            {/* Mobile close button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 lg:hidden"
              onClick={() => setCollapsed(true)}
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        {!collapsed && (
          <div className="px-4 pb-3">
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        <Separator />

        <ScrollArea className="h-[calc(100%-6rem)]">
          <nav className="p-2 space-y-1">
            {topics.map((topic) => {
              const Icon = iconMap[topic.icon] || Circle;
              const isActive = pathname === `/dsa/${topic.slug}`;
              const isCompleted = completedTopics.includes(topic.id);

              return (
                <div key={topic.id}>
                  <Link
                    href={`/dsa/${topic.slug}`}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-accent group relative",
                      isActive && "bg-primary/10 text-primary font-medium",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-r"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    <div className="relative">
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          isActive ? "text-primary" : "text-muted-foreground",
                          isCompleted && !isActive && "text-emerald-500"
                        )}
                      />
                      {isCompleted && (
                        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500 absolute -top-1 -right-1" />
                      )}
                    </div>

                    {!collapsed && (
                      <>
                        <span className="truncate flex-1">{topic.title}</span>
                        <Badge
                          variant={
                            topic.difficulty === "Beginner"
                              ? "success"
                              : topic.difficulty === "Intermediate"
                              ? "warning"
                              : "destructive"
                          }
                          className="text-[10px] px-1.5 py-0 h-4 shrink-0"
                        >
                          {topic.difficulty}
                        </Badge>
                      </>
                    )}
                  </Link>

                </div>
              );
            })}
          </nav>
        </ScrollArea>
      </aside>

      {/* Mobile overlay — tap to close */}
      {!collapsed && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
}
