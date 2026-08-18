import Link from "next/link";
import { BookOpen, Sparkles, Target } from "lucide-react";
import { AJetLauncherIcon } from "../assistant/TopicAssistant";

type AuthShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const highlights = [
  "Track progress topic by topic",
  "Use AJet after sign-in",
  "Pick up where you left off",
];

export function AuthShell({
  title,
  description,
  children,
}: Readonly<AuthShellProps>) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_30%)]" />
      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-6 sm:gap-10 px-4 py-6 sm:py-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-10">
        <section className="hidden lg:block">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-foreground"
          >
            <BookOpen className="h-4 w-4 text-primary" />
            Interview Handbook
          </Link>
          <div className="mt-10 max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Focused learning for interviews
            </p>
            <h1 className="mt-6 text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-foreground">
              {title}
            </h1>
            <p className="mt-5 max-w-lg text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-border bg-card/60 p-5 text-primary/80">
              <AJetLauncherIcon />

              <p className="mt-4 text-sm font-medium text-foreground">AJet Access</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Get guided explanations and interview help after signing in.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card/60 p-5">
              <Target className="h-6 w-6 text-primary" />
              <p className="mt-4 text-sm font-medium text-foreground">Steady Prep</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Keep your study journey organized around real interview topics.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card/60 p-5">
              <Sparkles className="h-6 w-6 text-primary" />
              <p className="mt-4 text-sm font-medium text-foreground">Clean Flow</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in first, then land directly inside your handbook.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {highlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-muted-foreground"
              >
                {highlight}
              </span>
            ))}
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-xl items-center justify-center self-center">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-6 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-foreground"
              >
                <BookOpen className="h-4 w-4 text-primary" />
                Interview Handbook
              </Link>
            </div>
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
