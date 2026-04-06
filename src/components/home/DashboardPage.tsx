"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Code2,
  Braces,
  Clock3,
  Database,
  Layout,
  Server,
  FileCode,
  FileCode2,
  House,
  Lock,
  ArrowRight,
  Sparkles,
  Star,
  Github,
  Linkedin,
  Mail,
  Globe,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GlobalTopicSearch } from "@/components/layout/GlobalTopicSearch";
import { categories } from "@/data/categories";
import { useProgress } from "@/hooks/useProgress";
import { topicSearchIndex } from "@/lib/topic-search-index";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layout,
  FileCode,
  FileCode2,
  Braces,
  Code2,
  Server,
  Database,
  BookOpen,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

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

export function DashboardPage() {
  const { isLoaded, lastVisitedTopic, sectionProgress } = useProgress();
  const totalTrackedTopics = sectionProgress.reduce(
    (count, section) => count + section.totalCount,
    0,
  );
  const availableCategories = categories.filter(
    (category) => category.available,
  );
  const totalCategoryTopics = availableCategories.reduce(
    (count, category) => count + category.topicCount,
    0,
  );
  const sectionProgressMap = new Map(
    sectionProgress.map(
      (section) => [section.sectionSlug, section.completedCount] as const,
    ),
  );
  const categoryProgress = availableCategories.map((category) => ({
    sectionSlug: category.id,
    title: category.title,
    href: `/${category.id}`,
    completedCount: sectionProgressMap.get(category.id) ?? 0,
    totalCount: category.topicCount,
  }));
  const categoryCompletedCount = categoryProgress.reduce(
    (count, category) => count + category.completedCount,
    0,
  );
  const overallProgressLabel = formatProgressPercent(
    categoryCompletedCount,
    totalCategoryTopics || totalTrackedTopics,
  );
  const learningPathHref = lastVisitedTopic?.href ?? "/#categories";
  const learningPathLabel = lastVisitedTopic
    ? `Resume ${lastVisitedTopic.title}`
    : "Start Learning";
  const learningPathSummary = lastVisitedTopic
    ? `Pick up where you left off in ${lastVisitedTopic.sectionSlug.replace(/-/g, " ")}.`
    : "Choose a category and begin building momentum topic by topic.";
  const lightweightSections = categoryProgress;

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              Free &amp; Open Source
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Interview <span className="text-primary">Handbook</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your complete guide to cracking technical interviews. Learn
              concepts, visualize algorithms, and practice coding — all in one
              place.
            </p>
            <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center">
              <GlobalTopicSearch
                className="mx-auto h-16 w-full min-w-[min(720px,92vw)] max-w-4xl rounded-2xl border border-primary/15 bg-background/80 px-5 text-base shadow-[0_24px_80px_-30px_rgba(59,130,246,0.32)] backdrop-blur-md hover:border-primary/30"
                searchIndex={topicSearchIndex}
                shortcutEnabled
              />
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
                <span className="rounded-full border border-border/70 bg-background/40 px-3 py-1.5">
                  Search all modules
                </span>
                <span className="rounded-full border border-border/70 bg-background/40 px-3 py-1.5">
                  Jump to exact topics fast
                </span>
                <span className="rounded-full border border-border/70 bg-background/40 px-3 py-1.5">
                  Use `/` or `Alt+K`
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]"
        >
          <Card className="overflow-hidden border-border/70 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.12),transparent_30%),linear-gradient(180deg,hsl(var(--card))_0%,hsl(var(--background))_100%)] shadow-sm">
            <CardContent className="p-6 md:p-7">
              <Badge variant="secondary" className="mb-4">
                <House className="mr-1 h-3 w-3" />
                Home
              </Badge>
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                    Learn one strong concept at a time.
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
                    This is your calm starting point. Resume your last topic or
                    jump into a category when you&apos;re ready.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <div className="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-sm text-muted-foreground">
                      Progress{" "}
                      <span className="ml-1 font-semibold text-foreground">
                        {overallProgressLabel}
                      </span>
                    </div>
                    <div className="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-sm text-muted-foreground">
                      {categoryCompletedCount} topics completed
                    </div>
                    <div className="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-sm text-muted-foreground">
                      {isLoaded
                        ? learningPathSummary
                        : "Loading your saved learning path."}
                    </div>
                  </div>
                </div>

                <Link
                  href={learningPathHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  {learningPathLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/85 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Star className="h-4 w-4 text-primary" />
                Resume Learning
              </div>
              <p className="mt-4 text-xl font-semibold tracking-tight">
                {lastVisitedTopic?.title ?? "Pick your first topic"}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {lastVisitedTopic
                  ? "Your most recent topic is ready to continue right where you left off."
                  : "No topic opened yet. Start with a category below and your progress will begin here."}
              </p>

              <div className="mt-6 grid gap-3">
                {lightweightSections.slice(0, 3).map((section) => {
                  const sectionProgressLabel =
                    section.totalCount > 0
                      ? Math.round(
                          (section.completedCount / section.totalCount) * 100,
                        )
                      : 0;

                  return (
                    <Link
                      key={section.sectionSlug}
                      href={section.href}
                      className="rounded-2xl border border-border/70 bg-background/70 p-3 transition hover:border-primary/25"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold">
                            {section.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {section.completedCount}/{section.totalCount} topics
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock3 className="h-3.5 w-3.5" />
                          {sectionProgressLabel}%
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <Link
                href="/progress"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
              >
                View Progress Page
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-2 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          id="categories"
          className="mb-8 scroll-mt-20"
        >
          <h2 className="text-2xl font-bold mb-2">Choose a Category</h2>
          <p className="text-muted-foreground">
            Select a topic to begin your preparation journey
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || BookOpen;

            return (
              <motion.div key={category.id} variants={item}>
                {category.available ? (
                  <Link href={`/${category.id}`}>
                    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-transparent dark:text-foreground`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <Badge variant="success" className="text-[10px]">
                            Available
                          </Badge>
                        </div>
                        <CardTitle className="text-lg mt-2">
                          {category.title}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {category.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {category.topicCount} topics
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Card className="relative overflow-hidden opacity-60">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                          <Icon className="h-5 w-5" />
                        </div>
                        <Badge variant="secondary" className="text-[10px]">
                          <Lock className="h-2.5 w-2.5 mr-1" />
                          Coming Soon
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mt-2">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="text-xs text-muted-foreground">
                        {category.topicCount} topics planned
                      </span>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Interview Handbook — Built for developers, by developers.
          </p>
        </div>
      </footer>

      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label="Open creator details"
            className="fixed bottom-24 right-4 z-40 flex items-center gap-0 rounded-full border border-primary/15 bg-background/90 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all hover:scale-[1.02] hover:border-primary/40 hover:shadow-[0_12px_40px_rgba(59,130,246,0.16)] sm:bottom-5 sm:right-5 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary sm:h-11 sm:w-11">
              <Code2 className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Built By
              </p>
              <p className="text-sm font-medium leading-none text-foreground">
                Creator Details
              </p>
            </div>
          </button>
        </DialogTrigger>

        <DialogContent
          onOpenAutoFocus={(event) => event.preventDefault()}
          className="w-[min(96vw,660px)] max-w-[660px] overflow-hidden rounded-[24px] border border-primary/20 bg-card p-0 text-card-foreground shadow-[0_0_0_1px_rgba(59,130,246,0.07),0_35px_120px_rgba(15,23,42,0.28)] sm:rounded-[28px]"
        >
          <div className="max-h-[calc(100vh-2rem)] overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_34%),linear-gradient(180deg,hsl(var(--card))_0%,hsl(var(--background))_100%)] p-4 sm:p-5 lg:p-7">
            <DialogHeader className="mb-4 pr-12 text-left sm:mb-5">
              <div className="inline-flex w-fit items-center rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-[11px] sm:tracking-[0.22em]">
                About
              </div>
            </DialogHeader>

            <div className="flex flex-col gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Built By
                </p>
                <h3 className="mt-3 text-[1.35rem] font-semibold tracking-tight text-foreground sm:text-[1.5rem]">
                  Saiteja Sangisapu
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Creator of Interview Handbook
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                  Purpose
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                  Interview Handbook was built to make interview prep more
                  structured, more visual, and less overwhelming for developers
                  who learn best by actually understanding what they practice.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-[20px] border border-border/70 bg-background/50 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur">
              <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
                <a
                  href="https://saitejasangisapu.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/20 bg-primary/8 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary sm:justify-start sm:rounded-full sm:bg-background/85"
                >
                  <Globe className="h-4 w-4" />
                  Portfolio
                </a>
                <a
                  href="https://github.com/sangisapusaiteja"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/70 bg-background/85 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary sm:justify-start sm:rounded-full"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/saitejasangisapu/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/70 bg-background/85 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary sm:justify-start sm:rounded-full"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href="mailto:saitejasangisapu@gmail.com"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/70 bg-background/85 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary sm:justify-start sm:rounded-full"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
