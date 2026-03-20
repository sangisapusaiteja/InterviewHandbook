"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Code2,
  Braces,
  Database,
  Layout,
  Server,
  FileCode,
  FileCode2,
  Lock,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  User,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { categories } from "@/data/dsa";
import developerProfileImage from "@/data/saitejasangisapu.jpg";

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

export default function DashboardPage() {
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
              My Interview <span className="text-primary">Handbook</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your complete guide to cracking technical interviews. Learn
              concepts, visualize algorithms, and practice coding — all in one
              place.
            </p>
            <div className="flex items-center justify-center">
              <Button
                size="lg"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  document
                    .getElementById("categories")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <Card className="border-0 shadow-none bg-primary/5">
            <CardContent className="pt-6">
              <Target className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Simple Explanations</h3>
              <p className="text-sm text-muted-foreground">
                Every concept explained with real-life analogies and
                beginner-friendly language.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-none bg-primary/5">
            <CardContent className="pt-6">
              <Zap className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Interactive Visualizations</h3>
              <p className="text-sm text-muted-foreground">
                Watch algorithms come alive with animated visualizations you can
                interact with.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-none bg-primary/5">
            <CardContent className="pt-6">
              <Code2 className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Built-in Code Editor</h3>
              <p className="text-sm text-muted-foreground">
                Write, edit, and run JavaScript code directly in the browser
                with instant output.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="mb-12" />

        {/* Categories */}
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
                      <div
                        className={`h-2 bg-gradient-to-r ${category.color}`}
                      />
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}
                          >
                            <Icon className="h-5 w-5 text-white" />
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
                    <div
                      className={`h-2 bg-gradient-to-r ${category.color} opacity-50`}
                    />
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center opacity-50`}
                        >
                          <Icon className="h-5 w-5 text-white" />
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
            My Interview Handbook — Built for developers, by developers.
          </p>
        </div>
      </footer>

      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="fixed bottom-6 right-4 z-40 flex items-center gap-3 rounded-full border border-primary/15 bg-background/90 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all hover:scale-[1.02] hover:border-primary/40 hover:shadow-[0_12px_40px_rgba(99,102,241,0.22)] sm:bottom-5 sm:right-5 sm:pr-4"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-primary/20 sm:h-11 sm:w-11">
              <Image
                src={developerProfileImage}
                alt="Saiteja Sangisapu"
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-xs text-muted-foreground">Developer</p>
              <p className="text-sm font-medium leading-none">Saiteja</p>
            </div>
          </button>
        </DialogTrigger>

        <DialogContent className="max-h-[92vh] w-[calc(100vw-1.5rem)] max-w-3xl overflow-y-auto overflow-x-hidden rounded-2xl border border-primary/20 bg-[#11131c] p-0 shadow-[0_0_0_1px_rgba(99,102,241,0.08),0_0_40px_rgba(99,102,241,0.22)] sm:w-full">
          <div className="grid gap-0 md:grid-cols-[260px,1fr]">
            <div className="relative min-h-[220px] overflow-hidden bg-black md:min-h-full">
              <Image
                src={developerProfileImage}
                alt="Saiteja Sangisapu"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 260px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d14] via-[#0b0d14]/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <p className="mt-1 text-xs text-white/75">Software Developer</p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href="https://github.com/sangisapusaiteja"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open GitHub profile"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/85 transition hover:bg-white/20 hover:text-white"
                  >
                    <Code2 className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/saitejasangisapu/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open LinkedIn profile"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/85 transition hover:bg-white/20 hover:text-white"
                  >
                    <User className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_30%),linear-gradient(180deg,#171923_0%,#12141d_100%)] p-4 sm:p-6 md:p-7">
              <DialogHeader className="mb-4 text-left sm:mb-5">
                <DialogTitle className="text-xl font-semibold text-white sm:text-2xl">
                  About the Developer
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    Name
                  </p>
                  <p className="mt-3 text-sm font-semibold text-white">
                    Saiteja Sangisapu
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    Email
                  </p>
                  <a
                    href="mailto:tejasai38409@gmail.com"
                    className="mt-3 inline-block break-all text-sm font-semibold text-indigo-400 underline-offset-4 hover:underline"
                  >
                    tejasai38409@gmail.com
                  </a>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:col-span-2">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    Portfolio
                  </p>
                  <a
                    href="https://saitejasangisapu.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block break-all text-sm font-medium text-indigo-400 underline-offset-4 hover:underline"
                  >
                    saitejasangisapu.vercel.app
                  </a>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
