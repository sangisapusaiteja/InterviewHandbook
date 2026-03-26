"use client";

import { FormEvent, useState } from "react";
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
  Github,
  Linkedin,
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
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formError, setFormError] = useState("");

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = contactForm.name.trim();
    const trimmedEmail = contactForm.email.trim();
    const trimmedMessage = contactForm.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFormError("Fill out name, email, and message.");
      return;
    }

    setFormError("");

    const subject = `Interview Handbook contact from ${trimmedName}`;
    const body = [
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      "",
      "Message:",
      trimmedMessage,
    ].join("\n");

    window.location.href = `mailto:tejasai38409@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

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
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground"
                        >
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

        <DialogContent className="max-h-[calc(100vh-2rem)] w-[calc(100vw-1rem)] max-w-[420px] overflow-y-auto overflow-x-hidden rounded-[24px] border border-primary/20 bg-card p-0 text-card-foreground shadow-[0_0_0_1px_rgba(99,102,241,0.08),0_35px_120px_rgba(15,23,42,0.28)] lg:max-h-[92vh] lg:max-w-4xl lg:rounded-[28px]">
          <div className="grid gap-0 lg:grid-cols-[320px,1fr]">
            <div className="relative hidden min-h-[176px] overflow-hidden bg-muted lg:block lg:min-h-full">
              <Image
                src={developerProfileImage}
                alt="Saiteja Sangisapu"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,20,0.04)_0%,rgba(7,10,20,0.18)_35%,rgba(7,10,20,0.88)_100%)] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.08)_0%,rgba(2,6,23,0.24)_35%,rgba(2,6,23,0.92)_100%)]" />
              <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/20 bg-black/20 px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] text-white/90 backdrop-blur-md sm:left-5 sm:top-5 sm:px-3 sm:text-[11px] sm:tracking-[0.2em]">
                OPEN SOURCE
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6">
                <div className="max-w-[18rem]">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/65 sm:text-sm sm:tracking-[0.28em]">
                    Software Developer
                  </p>
                  <h2 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-white sm:mt-3 sm:text-3xl">
                    Saiteja Sangisapu
                  </h2>
                  <p className="mt-2 hidden text-xs leading-5 text-white/72 sm:block sm:text-sm sm:leading-6">
                    Building practical learning tools for interview prep, visual
                    explanations, and developer education.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-2.5 sm:mt-5 sm:gap-3">
                  <a
                    href="https://github.com/sangisapusaiteja"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open GitHub profile"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20 hover:text-white sm:h-10 sm:w-10"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/saitejasangisapu/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open LinkedIn profile"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20 hover:text-white sm:h-10 sm:w-10"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.16),transparent_34%),linear-gradient(180deg,hsl(var(--card))_0%,hsl(var(--background))_100%)] p-3 sm:p-5 lg:p-8">
              <div className="mb-3 overflow-hidden rounded-[22px] border border-primary/15 shadow-[0_12px_32px_rgba(15,23,42,0.24)] lg:hidden">
                <div className="relative min-h-[188px] overflow-hidden">
                  <Image
                    src={developerProfileImage}
                    alt="Saiteja Sangisapu"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08)_0%,rgba(2,6,23,0.2)_35%,rgba(2,6,23,0.88)_100%)]" />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-center pt-2.5">
                    <div className="inline-flex items-center rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[11px] font-semibold text-white/85 backdrop-blur-md">
                      Free &amp; Open Source
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-3.5">
                    <p className="text-sm text-white/85">Software Developer</p>
                    <div className="mt-2 flex items-center gap-3">
                      <a
                        href="https://github.com/sangisapusaiteja"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Open GitHub profile"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 backdrop-blur-sm transition hover:bg-white/20"
                      >
                        <Code2 className="h-4 w-4" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/saitejasangisapu/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Open LinkedIn profile"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 backdrop-blur-sm transition hover:bg-white/20"
                      >
                        <User className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <DialogHeader className="mb-2 pr-12 text-left lg:mb-6">
                <div className="hidden w-fit items-center rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-[11px] sm:tracking-[0.22em] lg:inline-flex">
                  About The Developer
                </div>
                <DialogTitle className="text-[1.75rem] font-semibold tracking-tight text-foreground lg:mt-2 lg:text-[1.5rem]">
                  About the Developer
                </DialogTitle>

                <p className="hidden max-w-xl text-sm leading-6 text-muted-foreground lg:block">
                  A compact profile card with direct access to contact details,
                  portfolio, and social links.
                </p>
              </DialogHeader>

              <div className="space-y-3 lg:hidden">
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      Name
                    </p>
                    <p className="mt-1.5 font-semibold text-foreground">
                      Saiteja Sangisapu
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      Email
                    </p>
                    <a
                      href="mailto:tejasai38409@gmail.com"
                      className="mt-1.5 inline-block break-all font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      tejasai38409@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      Portfolio
                    </p>
                    <a
                      href="https://saitejasangisapu.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1.5 inline-block break-all font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      saitejasangisapu.vercel.app
                    </a>
                  </div>
                </div>

                <div className="rounded-[22px] border border-primary/15 bg-[linear-gradient(180deg,rgba(99,102,241,0.08),rgba(99,102,241,0.03))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="mb-2">
                    <p className="text-base font-semibold text-foreground">
                      Send a direct message
                    </p>
                    <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                      Opens an email draft with the form details.
                    </p>
                  </div>

                  <form className="space-y-2.5" onSubmit={handleContactSubmit}>
                    <div className="grid gap-2">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={contactForm.name}
                        onChange={(event) =>
                          setContactForm((current) => ({
                            ...current,
                            name: event.target.value,
                          }))
                        }
                        className="h-9 rounded-2xl border border-border/70 bg-background/90 px-3.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/45"
                      />
                      <input
                        type="email"
                        placeholder="Your email"
                        value={contactForm.email}
                        onChange={(event) =>
                          setContactForm((current) => ({
                            ...current,
                            email: event.target.value,
                          }))
                        }
                        className="h-9 rounded-2xl border border-border/70 bg-background/90 px-3.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/45"
                      />
                    </div>

                    <textarea
                      placeholder="Write your message"
                      value={contactForm.message}
                      onChange={(event) =>
                        setContactForm((current) => ({
                          ...current,
                          message: event.target.value,
                        }))
                      }
                      rows={2}
                      className="min-h-[72px] w-full resize-none rounded-2xl border border-border/70 bg-background/90 px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/45"
                    />

                    {formError ? (
                      <p className="text-xs font-medium text-destructive">
                        {formError}
                      </p>
                    ) : (
                      <p className="hidden text-[11px] leading-5 text-muted-foreground">
                        Clicking send opens the user&apos;s email app with these
                        details prefilled.
                      </p>
                    )}

                    <div className="flex flex-col gap-2">
                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                      >
                        Send Message
                      </button>
                      <a
                        href="https://saitejasangisapu.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden w-full items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
                      >
                        Visit Portfolio
                      </a>
                    </div>
                  </form>
                </div>
              </div>

              <div className="hidden gap-3 lg:grid lg:grid-cols-2 lg:gap-4">
                <div className="rounded-[20px] border border-border/70 bg-background/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur dark:bg-white/[0.04] lg:rounded-[24px] lg:p-5">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      Name
                    </p>
                    <p className="mt-3 text-[15px] font-semibold text-foreground">
                      Saiteja Sangisapu
                    </p>
                  </div>
                </div>

                <div className="rounded-[20px] border border-border/70 bg-background/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur dark:bg-white/[0.04] lg:rounded-[24px] lg:p-5">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      Email
                    </p>
                    <a
                      href="mailto:tejasai38409@gmail.com"
                      className="mt-3 inline-block break-all text-[15px] font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      tejasai38409@gmail.com
                    </a>
                  </div>
                </div>

                <div className="rounded-[20px] border border-border/70 bg-background/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur dark:bg-white/[0.04] lg:col-span-2 lg:rounded-[24px] lg:p-5">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      Portfolio
                    </p>
                    <a
                      href="https://saitejasangisapu.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block break-all text-[15px] font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      saitejasangisapu.vercel.app
                    </a>
                  </div>
                </div>

                <div className="rounded-[22px] border border-primary/15 bg-[linear-gradient(180deg,rgba(99,102,241,0.08),rgba(99,102,241,0.03))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] lg:col-span-2 lg:rounded-[24px] lg:p-5">
                  <div className="mb-3">
                    <p className="text-[1.05rem] font-semibold text-foreground lg:text-base">
                      Send a direct message
                    </p>
                    <p className="mt-1 text-[12px] leading-5 text-muted-foreground lg:text-sm">
                      The send button opens an email draft to your inbox with
                      the form details.
                    </p>
                  </div>

                  <form
                    className="space-y-3"
                    onSubmit={handleContactSubmit}
                  >
                    <div className="grid gap-2 lg:grid-cols-2 lg:gap-3">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={contactForm.name}
                        onChange={(event) =>
                          setContactForm((current) => ({
                            ...current,
                            name: event.target.value,
                          }))
                        }
                        className="h-11 rounded-2xl border border-border/70 bg-background/90 px-3.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/45"
                      />
                      <input
                        type="email"
                        placeholder="Your email"
                        value={contactForm.email}
                        onChange={(event) =>
                          setContactForm((current) => ({
                            ...current,
                            email: event.target.value,
                          }))
                        }
                        className="h-11 rounded-2xl border border-border/70 bg-background/90 px-3.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/45"
                      />
                    </div>

                    <textarea
                      placeholder="Write your message"
                      value={contactForm.message}
                      onChange={(event) =>
                        setContactForm((current) => ({
                          ...current,
                          message: event.target.value,
                        }))
                      }
                      rows={3}
                      className="min-h-[104px] w-full resize-none rounded-2xl border border-border/70 bg-background/90 px-3.5 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/45 lg:min-h-[110px]"
                    />

                    {formError ? (
                      <p className="text-xs font-medium text-destructive">
                        {formError}
                      </p>
                    ) : (
                      <p className="text-[11px] leading-5 text-muted-foreground lg:text-xs">
                        Clicking send opens the user&apos;s email app with these
                        details prefilled.
                      </p>
                    )}

                    <div className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:gap-3">
                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 lg:w-auto"
                      >
                        Send Message
                      </button>
                      <a
                        href="https://saitejasangisapu.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary lg:w-auto"
                      >
                        Visit Portfolio
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
