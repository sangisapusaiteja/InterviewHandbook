"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  Flame,
  LayoutGrid,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/data/categories";
import {
  databaseProgressConfigured,
  useDatabaseProgress,
} from "@/hooks/useProgress";
import { buildDailyActivity, getProgressStreaks } from "@/lib/progress";
import { cn } from "@/lib/utils";

function formatProgressPercent(value: number, total: number) {
  if (total <= 0) {
    return "0%";
  }

  const rawPercent = (value / total) * 100;

  if (rawPercent === 0) {
    return "0%";
  }

  if (rawPercent < 10) {
    return `${rawPercent.toFixed(1)}%`;
  }

  return `${Math.round(rawPercent)}%`;
}

function getHeatmapIntensity(count: number) {
  if (count <= 0) return "bg-muted/45";
  if (count === 1) return "bg-emerald-500/35";
  if (count === 2) return "bg-emerald-500/55";
  if (count === 3) return "bg-emerald-500/75";
  return "bg-emerald-500";
}

function formatActivityDate(dateKey: string) {
  return new Date(`${dateKey}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function buildHeatmapCells(activityByDate: Map<string, number>) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(today.getFullYear(), 0, 1);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - start.getDay());

  const end = new Date(today.getFullYear(), 11, 31);
  end.setHours(0, 0, 0, 0);
  end.setDate(end.getDate() + (6 - end.getDay()));

  const cells: Array<{
    key: string;
    count: number;
    month: string;
  }> = [];

  const cursor = new Date(start);

  while (cursor <= end) {
    const key = [
      cursor.getFullYear(),
      String(cursor.getMonth() + 1).padStart(2, "0"),
      String(cursor.getDate()).padStart(2, "0"),
    ].join("-");

    cells.push({
      key,
      count: activityByDate.get(key) ?? 0,
      month: cursor.toLocaleDateString(undefined, { month: "short" }),
    });

    cursor.setDate(cursor.getDate() + 1);
  }

  const weeks: typeof cells[] = [];

  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }

  return weeks;
}

function getMonthLabels(heatmapWeeks: ReturnType<typeof buildHeatmapCells>) {
  return heatmapWeeks.map((week, index) => {
    const firstCell = week[0];
    const previousMonth = index > 0 ? heatmapWeeks[index - 1]?.[0]?.month : null;

    if (!firstCell) {
      return "";
    }

    return index === 0 || firstCell.month !== previousMonth ? firstCell.month : "";
  });
}

function getCompactMonthLabels(heatmapWeeks: ReturnType<typeof buildHeatmapCells>) {
  return heatmapWeeks.map((week, index) => {
    const firstCell = week[0];
    const previousMonth = index > 0 ? heatmapWeeks[index - 1]?.[0]?.month : null;

    if (!firstCell) {
      return "";
    }

    return index === 0 || firstCell.month !== previousMonth
      ? firstCell.month.slice(0, 3)
      : "";
  });
}

const analyticsCardClassName =
  "border border-border/70 bg-card/80 shadow-[0_28px_80px_-34px_rgba(15,23,42,0.28)] backdrop-blur";

export function ProgressPage() {
  const { activityLog, completedCount, isLoaded, lastVisitedTopic, sectionProgress } =
    useDatabaseProgress();
  const availableCategories = categories.filter((category) => category.available);
  const sectionProgressMap = new Map(
    sectionProgress.map((section) => [section.sectionSlug, section.completedCount] as const)
  );
  const categoryProgress = availableCategories.map((category) => ({
    sectionSlug: category.id,
    title: category.title,
    href: `/${category.id}`,
    completedCount: sectionProgressMap.get(category.id) ?? 0,
    totalCount: category.topicCount,
  }));
  const totalTrackedTopics = availableCategories.reduce(
    (count, category) => count + category.topicCount,
    0
  );
  const overallProgressLabel = formatProgressPercent(
    completedCount,
    totalTrackedTopics
  );
  const dailyActivity = buildDailyActivity(activityLog);
  const activityByDate = new Map(
    dailyActivity.map((entry) => [entry.date, entry.count] as const)
  );
  const heatmapWeeks = buildHeatmapCells(activityByDate);
  const monthLabels = getMonthLabels(heatmapWeeks);
  const compactMonthLabels = getCompactMonthLabels(heatmapWeeks);
  const totalActiveDays = dailyActivity.length;
  const totalActivityEvents = dailyActivity.reduce(
    (count, entry) => count + entry.count,
    0
  );
  const { currentStreak, bestStreak } = getProgressStreaks(dailyActivity);
  const completedSections = categoryProgress.filter(
    (section) => section.completedCount === section.totalCount && section.totalCount > 0
  ).length;
  const startedSections = categoryProgress.filter(
    (section) => section.completedCount > 0
  ).length;
  const badgeItems = [
    {
      title: "First Step",
      description: "Complete your first topic.",
      earned: completedCount >= 1,
      icon: Sparkles,
    },
    {
      title: "On Fire",
      description: "Build a 3-day learning streak.",
      earned: currentStreak >= 3 || bestStreak >= 3,
      icon: Flame,
    },
    {
      title: "Category Climber",
      description: "Start 3 different categories.",
      earned: startedSections >= 3,
      icon: LayoutGrid,
    },
    {
      title: "Halfway There",
      description: "Reach 50% total completion.",
      earned:
        totalTrackedTopics > 0 && completedCount / totalTrackedTopics >= 0.5,
      icon: Trophy,
    },
  ];

  if (!databaseProgressConfigured) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_28%),linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--background))_100%)]">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <Card className={analyticsCardClassName}>
            <CardContent className="p-8">
              <Badge variant="secondary" className="mb-4">
                <CalendarDays className="mr-1 h-3 w-3" />
                Progress Analytics
              </Badge>
              <h1 className="text-2xl font-semibold tracking-tight">
                Database-backed analytics not available
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                This page only uses progress saved in the database. Configure
                Clerk and Supabase progress syncing to view analytics here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
 <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
      <div className="animate-pulse text-muted-foreground">
                Loading your database progress analytics...

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_28%),linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--background))_100%)]">
      <div className="container mx-auto max-w-fit px-3 py-5 sm:px-6 md:py-8 xl:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-[22px] p-4 sm:p-6 lg:p-7 ${analyticsCardClassName}`}
        >
          <Badge variant="secondary" className="mb-4">
            <CalendarDays className="mr-1 h-3 w-3" />
            Progress Analytics
          </Badge>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Your learning momentum, all in one place.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                Track your streak, review activity, and see how your interview
                prep is compounding over time.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href={lastVisitedTopic?.href ?? "/#categories"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:w-auto"
              >
                {lastVisitedTopic ? "Resume Learning" : "Start Learning"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#categories"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/35 hover:text-primary sm:w-auto"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Target className="h-4 w-4" />}
            label="Completion"
            value={overallProgressLabel}
            helper={`${completedCount} of ${totalTrackedTopics} topics`}
          />
          <StatCard
            icon={<Flame className="h-4 w-4" />}
            label="Current streak"
            value={`${currentStreak} day${currentStreak === 1 ? "" : "s"}`}
            helper={`Best streak: ${bestStreak}`}
          />
          <StatCard
            icon={<CalendarDays className="h-4 w-4" />}
            label="Active days"
            value={`${totalActiveDays}`}
            helper={`${totalActivityEvents} activity events logged`}
          />
          <StatCard
            icon={<Award className="h-4 w-4" />}
            label="Sections finished"
            value={`${completedSections}`}
            helper={`${startedSections} sections started`}
          />
        </div>

        <div className="mt-4 grid items-start gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.82fr)]">
          <div className="grid min-w-0 gap-4 ">
            <Card className={`self-start overflow-hidden rounded-[24px] ${analyticsCardClassName} h-[400px]`}>
              <CardHeader className="p-5 pb-4 sm:p-6 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  Heatmap
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Activity from January to December, inspired by GitHub and LeetCode.
                </p>
              </CardHeader>
              <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
                <div className="rounded-[20px] border border-border/70 bg-background/55 p-3 sm:p-3">
                  <div className="w-full overflow-x-auto pb-1">
                    <div className="hidden min-w-max sm:block">
                      <div className="mb-2 flex gap-0.5 pl-5 text-[10px] font-medium text-muted-foreground/80 xl:gap-1 xl:pl-6 xl:text-[11px]">
                        {monthLabels.map((label, index) => (
                          <div
                            key={`${label || "month"}-${index}`}
                            className="w-3.5 text-center xl:w-4"
                          >
                            {label}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="grid gap-1 pt-[1px] text-[10px] text-muted-foreground/70 xl:gap-1.5 xl:text-[11px]">
                          <span className="h-3.5 leading-[14px] xl:h-4 xl:leading-4">Mon</span>
                          <span className="h-3.5 leading-[14px] opacity-0 xl:h-4 xl:leading-4">Tue</span>
                          <span className="h-3.5 leading-[14px] xl:h-4 xl:leading-4">Wed</span>
                          <span className="h-3.5 leading-[14px] opacity-0 xl:h-4 xl:leading-4">Thu</span>
                          <span className="h-3.5 leading-[14px] xl:h-4 xl:leading-4">Fri</span>
                          <span className="h-3.5 leading-[14px] opacity-0 xl:h-4 xl:leading-4">Sat</span>
                          <span className="h-3.5 leading-[14px] opacity-0 xl:h-4 xl:leading-4">Sun</span>
                        </div>

                        <div className="flex gap-0.5 xl:gap-1">
                          {heatmapWeeks.map((week, index) => (
                            <div
                              key={`${week[0]?.key ?? index}`}
                              className="grid gap-1 xl:gap-1.5"
                            >
                              {week.map((cell) => (
                                <div
                                  key={cell.key}
                                  title={`${cell.count} activities on ${formatActivityDate(cell.key)}`}
                                  className={cn(
                                    "h-3.5 w-3.5 rounded-[5px] border border-border/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-transform hover:scale-110 xl:h-4 xl:w-4",
                                    getHeatmapIntensity(cell.count)
                                  )}
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="min-w-max sm:hidden">
                      <div className="mb-2 flex gap-1 pl-5 text-[10px] font-medium text-muted-foreground/80">
                        {compactMonthLabels.map((label, index) => (
                          <div
                            key={`${label || "compact-month"}-${index}`}
                            className="w-3 text-center"
                          >
                            {label}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="grid gap-1 pt-[1px] text-[10px] text-muted-foreground/70">
                          <span className="h-3 leading-3">M</span>
                          <span className="h-3 leading-3 opacity-0">T</span>
                          <span className="h-3 leading-3">W</span>
                          <span className="h-3 leading-3 opacity-0">T</span>
                          <span className="h-3 leading-3">F</span>
                          <span className="h-3 leading-3 opacity-0">S</span>
                          <span className="h-3 leading-3 opacity-0">S</span>
                        </div>

                        <div className="flex gap-1">
                          {heatmapWeeks.map((week, index) => (
                            <div
                              key={`${week[0]?.key ?? index}-mobile`}
                              className="grid gap-1"
                            >
                              {week.map((cell) => (
                                <div
                                  key={`${cell.key}-mobile`}
                                  title={`${cell.count} activities on ${formatActivityDate(cell.key)}`}
                                  className={cn(
                                    "h-3 w-3 rounded-[4px] border border-border/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
                                    getHeatmapIntensity(cell.count)
                                  )}
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                  <div className="rounded-full border border-border/70 bg-background/60 px-3 py-1.5">
                    {dailyActivity.length > 0
                      ? `Last active on ${formatActivityDate(dailyActivity[dailyActivity.length - 1].date)}`
                      : "Start learning to build your activity history."}
                  </div>
                  <div className="flex w-fit items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1.5">
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map((level) => (
                      <span
                        key={level}
                        className={cn(
                          "h-3 w-3 rounded-[4px] border border-border/60",
                          getHeatmapIntensity(level)
                        )}
                      />
                    ))}
                    <span>More</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`rounded-[24px] ${analyticsCardClassName}`}>
              <CardHeader className="p-5 pb-4 sm:p-6 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Detailed Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 p-4 pt-0 sm:grid-cols-2 sm:p-6 sm:pt-0">
                {categoryProgress.map((section) => {
                  const progressPercent =
                    section.totalCount > 0
                      ? Math.round((section.completedCount / section.totalCount) * 100)
                      : 0;

                  return (
                    <Link
                      key={section.sectionSlug}
                      href={section.href}
                      className="rounded-[20px] border border-border/70 bg-background/70 p-4 transition hover:-translate-y-0.5 hover:border-primary/25"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-semibold">{section.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {section.completedCount} / {section.totalCount} completed
                          </p>
                        </div>
                        <span className="rounded-full border border-border/70 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                          {progressPercent}%
                        </span>
                      </div>

                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-5">
            <Card className={`rounded-[24px] ${analyticsCardClassName} h-[400px] `}>
              <CardHeader className="p-5 pb-4 sm:p-6 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Flame className="h-5 w-5 text-primary" />
                  Streak
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4 pt-0 sm:p-6 sm:pt-0">
                <div className="rounded-[20px] border border-primary/15 bg-primary/[0.06] p-4 sm:p-5">
                  <p className="text-sm text-muted-foreground">Current run</p>
                  <p className="mt-2 text-4xl font-bold tracking-tight">
                    {currentStreak}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Keep the chain alive by visiting or completing at least one
                    topic each day.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <MiniMetric
                    label="Best streak"
                    value={`${bestStreak} days`}
                  />
                  <MiniMetric
                    label="Active days"
                    value={`${totalActiveDays} total`}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className={`rounded-[24px] ${analyticsCardClassName} h-[400px]`}>
              <CardHeader className="p-5 pb-4 sm:p-6 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Trophy className="h-5 w-5 text-primary" />
                  Badges
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 p-4 pt-0 sm:p-6 sm:pt-0">
                {badgeItems.map((badge) => {
                  const Icon = badge.icon;

                  return (
                    <div
                      key={badge.title}
                      className={cn(
                        "flex flex-col items-start gap-3 rounded-2xl border px-4 py-3 sm:flex-row sm:items-center",
                        badge.earned
                          ? "border-primary/25 bg-primary/[0.08]"
                          : "border-border/70 bg-muted/20"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl",
                          badge.earned
                            ? "bg-primary/15 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{badge.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {badge.description}
                        </p>
                      </div>
                      <Badge
                        className="self-start sm:ml-auto"
                        variant={badge.earned ? "success" : "secondary"}
                      >
                        {badge.earned ? "Earned" : "Locked"}
                      </Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  helper,
  icon,
  label,
  value,
}: Readonly<{
  helper: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}>) {
  return (
    <Card className={`rounded-[20px] ${analyticsCardClassName}`}>
      <CardContent className="flex min-h-[112px] flex-col justify-between p-4 sm:min-h-[124px] sm:p-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-primary">{icon}</span>
          <span>{label}</span>
        </div>
        <div className="mt-3">
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          <p className="mt-2 text-sm text-muted-foreground">{helper}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function MiniMetric({
  label,
  value,
}: Readonly<{
  label: string;
  value: string;
}>) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  );
}
