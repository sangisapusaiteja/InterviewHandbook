"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bug, Send, CheckCircle2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const BUG_TYPES = [
  "Visual glitch",
  "Broken feature",
  "Typo / wrong content",
  "Performance issue",
  "Other",
];

export function BugReport({ triggerClassName }: { triggerClassName?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [bugType, setBugType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  function reset() {
    setBugType("");
    setTitle("");
    setDescription("");
    setEmail("");
    setStatus("idle");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!bugType || !title.trim()) return;
    setStatus("submitting");

    try {
      const res = await fetch("/api/report-bug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: bugType,
          title: title.trim(),
          description: description.trim(),
          email: email.trim(),
          page: pathname,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setTimeout(() => {
        setOpen(false);
        reset();
      }, 2000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                triggerClassName
              )}
            >
              <Bug className="h-4 w-4" />
            </button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Report a bug or issue</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5 text-primary" />
            Report a Bug
          </DialogTitle>
          <DialogDescription>
            Found something broken? Let us know and we&apos;ll fix it.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
            <p className="text-sm font-medium">Bug report submitted!</p>
            <p className="text-xs text-muted-foreground text-center">
              Thank you for helping improve Interview Handbook.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Bug Type */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Bug Type <span className="text-destructive">*</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {BUG_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setBugType(t)}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                      bugType === t
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-sm font-medium mb-1.5 block" htmlFor="bug-title">
                Title <span className="text-destructive">*</span>
              </label>
              <input
                id="bug-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Short summary of the bug"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium mb-1.5 block" htmlFor="bug-desc">
                Description
              </label>
              <textarea
                id="bug-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What happened? What did you expect?"
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary/60 focus:ring-1 focus:ring-primary/30 resize-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium mb-1.5 block" htmlFor="bug-email">
                Email <span className="text-muted-foreground text-xs">(optional)</span>
              </label>
              <input
                id="bug-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="If you want a follow-up"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
              />
            </div>

            <p className="text-[11px] text-muted-foreground">
              Page: <span className="font-mono">{pathname}</span>
            </p>

            {status === "error" && (
              <p className="text-xs text-destructive">
                Something went wrong. Please try again.
              </p>
            )}

            <Button
              type="submit"
              disabled={!bugType || !title.trim() || status === "submitting"}
              className="w-full"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-1.5" />
                  Submit Report
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
