"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── ConsoleOutput ────────────────────────────────────────────────────────────
function ConsoleOutput({ lines }: Readonly<{ lines: string[] | null }>) {
  return (
    <AnimatePresence mode="wait">
      {lines ? (
        <motion.div
          key="out"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[52px]"
        >
          {lines.map((line, i) => (
            <p key={`${line}-${i}`} className="text-emerald-400">
              <span className="text-zinc-500 select-none mr-2">&gt;</span>
              {line}
            </p>
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="ph"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[52px] flex items-center justify-center"
        >
          <p className="text-xs text-muted-foreground italic">Click ▶ Run to see output</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── types ────────────────────────────────────────────────────────────────────
type PromiseTab = "creating" | "thenCatchFinally" | "allAndRace" | "states";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<PromiseTab, GroupInfo> = {
  creating: {
    label: "Creating Promises",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "A Promise is created with new Promise(executor). The executor receives resolve and reject callbacks. Call resolve(value) to fulfill or reject(reason) to reject the promise.",
    codeSnippet: `const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Operation completed!");
  } else {
    reject("Something went wrong");
  }
});

myPromise.then((value) => {
  console.log("Resolved:", value);
});

console.log("Promise created");`,
    codeOutput: [
      "Promise created",
      'Resolved: Operation completed!',
    ],
  },
  thenCatchFinally: {
    label: "then/catch/finally",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Use .then() to handle fulfilled values, .catch() to handle rejections, and .finally() to run cleanup regardless of outcome. Handlers can be chained since each returns a new Promise.",
    codeSnippet: `fetch("/api/user")
  .then((res) => {
    console.log("Status:", res.status);
    return res.json();
  })
  .then((data) => {
    console.log("User:", data.name);
  })
  .catch((err) => {
    console.log("Error:", err.message);
  })
  .finally(() => {
    console.log("Request finished");
  });`,
    codeOutput: [
      "Status: 200",
      "User: Alice",
      "Request finished",
    ],
  },
  allAndRace: {
    label: "Promise.all & race",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Promise.all waits for all promises to fulfill (or any to reject). Promise.race settles as soon as the first promise settles. Great for parallel execution patterns.",
    codeSnippet: `const p1 = Promise.resolve("A");
const p2 = Promise.resolve("B");
const p3 = Promise.resolve("C");

Promise.all([p1, p2, p3]).then((values) => {
  console.log("all:", values.join(", "));
});

const fast = new Promise((r) => setTimeout(() => r("fast"), 100));
const slow = new Promise((r) => setTimeout(() => r("slow"), 500));

Promise.race([fast, slow]).then((winner) => {
  console.log("race winner:", winner);
});`,
    codeOutput: [
      "all: A, B, C",
      "race winner: fast",
    ],
  },
  states: {
    label: "Promise States",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "A Promise has three states: pending (initial), fulfilled (resolved successfully), or rejected (failed). Once settled (fulfilled or rejected), it cannot change state again.",
    codeSnippet: `// Pending -> Fulfilled
const resolved = new Promise((resolve) => {
  console.log("State: pending...");
  setTimeout(() => {
    resolve("done");
    console.log("State: fulfilled!");
  }, 1000);
});

// Pending -> Rejected
const rejected = new Promise((_, reject) => {
  console.log("State: pending...");
  setTimeout(() => {
    reject(new Error("fail"));
    console.log("State: rejected!");
  }, 1000);
});`,
    codeOutput: [
      "State: pending...",
      "State: pending...",
      "State: fulfilled!",
      "State: rejected!",
    ],
  },
};

const order: PromiseTab[] = ["creating", "thenCatchFinally", "allAndRace", "states"];

// ─── promise state diagram steps ──────────────────────────────────────────────
const stateNodes = [
  { id: "pending", label: "Pending", color: "bg-yellow-500 text-white", glowColor: "rgba(234,179,8,0.5)" },
  { id: "fulfilled", label: "Fulfilled", color: "bg-green-500 text-white", glowColor: "rgba(34,197,94,0.5)" },
  { id: "rejected", label: "Rejected", color: "bg-red-500 text-white", glowColor: "rgba(239,68,68,0.5)" },
];

// ─── comparison table data ──────────────────────────────────────────────────
const comparisonRows = [
  {
    method: "Promise.all",
    resolves: "All promises fulfill",
    rejects: "Any promise rejects",
    useCase: "Parallel tasks, all must succeed",
  },
  {
    method: "Promise.race",
    resolves: "First promise settles (fulfills)",
    rejects: "First promise settles (rejects)",
    useCase: "Timeout patterns, fastest response",
  },
  {
    method: "Promise.allSettled",
    resolves: "All promises settle",
    rejects: "Never rejects",
    useCase: "Inspect all results regardless of outcome",
  },
  {
    method: "Promise.any",
    resolves: "Any promise fulfills",
    rejects: "All promises reject (AggregateError)",
    useCase: "First successful result from multiple sources",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function PromisesVisualization() {
  const [selected, setSelected] = useState<PromiseTab>("creating");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [activeState, setActiveState] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  const group = groups[selected];

  const handleSelect = (key: PromiseTab) => {
    setSelected(key);
    setOutputLines(null);
    setActiveState(null);
    setAnimating(false);
  };

  const runStateAnimation = async (path: "resolve" | "reject") => {
    setAnimating(true);
    // Start at pending
    setActiveState("pending");
    await new Promise((r) => setTimeout(r, 1200));
    // Transition to fulfilled or rejected
    if (path === "resolve") {
      setActiveState("fulfilled");
    } else {
      setActiveState("rejected");
    }
    await new Promise((r) => setTimeout(r, 1500));
    setActiveState(null);
    setAnimating(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">JavaScript Promises</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Group selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const g = groups[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? g.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>

        {/* Animated detail area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Description banner */}
            <div className={`rounded-xl border px-4 py-3 text-sm ${group.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{group.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${group.badgeColor}`}>
                  promise
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{group.description}</p>
            </div>

            {/* Code + Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Code */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {group.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={() => setOutputLines(group.codeOutput)}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
              </div>

              {/* Right: Output */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>

            {/* Interactive Promise State Diagram for "states" tab */}
            {selected === "states" && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Promise Lifecycle
                </p>
                <div className="rounded-xl border bg-muted/20 px-4 py-5">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {/* Pending node */}
                    <motion.div
                      animate={{
                        scale: activeState === "pending" ? 1.15 : 1,
                        boxShadow:
                          activeState === "pending"
                            ? `0 0 16px ${stateNodes[0].glowColor}`
                            : "0 0 0px transparent",
                      }}
                      transition={{ duration: 0.3 }}
                      className={`flex flex-col items-center px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
                        activeState === "pending"
                          ? stateNodes[0].color + " ring-2 ring-offset-2 ring-offset-background ring-yellow-400"
                          : "bg-muted border border-border text-muted-foreground"
                      }`}
                    >
                      <span className="font-bold text-sm">Pending</span>
                      <span className={`text-[10px] mt-0.5 ${activeState === "pending" ? "opacity-90" : "opacity-60"}`}>
                        Initial state
                      </span>
                    </motion.div>

                    {/* Branching arrows */}
                    <div className="flex flex-col items-center gap-2">
                      {/* resolve arrow */}
                      <div className="flex items-center gap-2">
                        <motion.span
                          animate={{
                            color:
                              activeState === "pending"
                                ? "rgb(34,197,94)"
                                : "rgb(161,161,170)",
                          }}
                          className="text-lg font-bold select-none"
                        >
                          →
                        </motion.span>
                        <span className="text-[10px] text-green-600 dark:text-green-400 font-semibold">
                          resolve()
                        </span>
                        <motion.span
                          animate={{
                            color:
                              activeState === "fulfilled"
                                ? "rgb(34,197,94)"
                                : "rgb(161,161,170)",
                          }}
                          className="text-lg font-bold select-none"
                        >
                          →
                        </motion.span>
                        {/* Fulfilled node */}
                        <motion.div
                          animate={{
                            scale: activeState === "fulfilled" ? 1.15 : 1,
                            boxShadow:
                              activeState === "fulfilled"
                                ? `0 0 16px ${stateNodes[1].glowColor}`
                                : "0 0 0px transparent",
                          }}
                          transition={{ duration: 0.3 }}
                          className={`flex flex-col items-center px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
                            activeState === "fulfilled"
                              ? stateNodes[1].color + " ring-2 ring-offset-2 ring-offset-background ring-green-400"
                              : "bg-muted border border-border text-muted-foreground"
                          }`}
                        >
                          <span className="font-bold text-sm">Fulfilled</span>
                          <span className={`text-[10px] mt-0.5 ${activeState === "fulfilled" ? "opacity-90" : "opacity-60"}`}>
                            Success
                          </span>
                        </motion.div>
                      </div>

                      {/* reject arrow */}
                      <div className="flex items-center gap-2">
                        <motion.span
                          animate={{
                            color:
                              activeState === "pending"
                                ? "rgb(239,68,68)"
                                : "rgb(161,161,170)",
                          }}
                          className="text-lg font-bold select-none"
                        >
                          →
                        </motion.span>
                        <span className="text-[10px] text-red-600 dark:text-red-400 font-semibold">
                          reject()
                        </span>
                        <motion.span
                          animate={{
                            color:
                              activeState === "rejected"
                                ? "rgb(239,68,68)"
                                : "rgb(161,161,170)",
                          }}
                          className="text-lg font-bold select-none"
                        >
                          →
                        </motion.span>
                        {/* Rejected node */}
                        <motion.div
                          animate={{
                            scale: activeState === "rejected" ? 1.15 : 1,
                            boxShadow:
                              activeState === "rejected"
                                ? `0 0 16px ${stateNodes[2].glowColor}`
                                : "0 0 0px transparent",
                          }}
                          transition={{ duration: 0.3 }}
                          className={`flex flex-col items-center px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
                            activeState === "rejected"
                              ? stateNodes[2].color + " ring-2 ring-offset-2 ring-offset-background ring-red-400"
                              : "bg-muted border border-border text-muted-foreground"
                          }`}
                        >
                          <span className="font-bold text-sm">Rejected</span>
                          <span className={`text-[10px] mt-0.5 ${activeState === "rejected" ? "opacity-90" : "opacity-60"}`}>
                            Failure
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={animating}
                      onClick={() => runStateAnimation("resolve")}
                    >
                      <Play className="h-3.5 w-3.5 mr-1" />
                      {animating ? "Animating..." : "Animate Resolve"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={animating}
                      onClick={() => runStateAnimation("reject")}
                    >
                      <Play className="h-3.5 w-3.5 mr-1" />
                      {animating ? "Animating..." : "Animate Reject"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Comparison table */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Promise Methods
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Method</span>
              <span>Resolves When</span>
              <span>Rejects When</span>
              <span>Use Case</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.method}
                className="grid grid-cols-4 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.method}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.resolves}</span>
                <span className="text-[11px] text-muted-foreground">{row.rejects}</span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400">
                  {row.useCase}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
