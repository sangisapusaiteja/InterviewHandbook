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
type WorkerTab = "basicWorker" | "postMessage" | "heavyComputation" | "workerTypes";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<WorkerTab, GroupInfo> = {
  basicWorker: {
    label: "Basic Worker",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "A Web Worker runs JavaScript in a background thread, separate from the main thread. Create one by passing a script URL to the Worker constructor, then communicate via messages.",
    codeSnippet: `// main.js
const worker = new Worker("worker.js");

worker.onmessage = (event) => {
  console.log("Main received:", event.data);
};

worker.postMessage("Hello Worker!");
console.log("Main thread continues...");

// worker.js
self.onmessage = (event) => {
  console.log("Worker received:", event.data);
  self.postMessage("Hello Main!");
};`,
    codeOutput: [
      "Main thread continues...",
      "Worker received: Hello Worker!",
      "Main received: Hello Main!",
    ],
  },
  postMessage: {
    label: "postMessage",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "postMessage() sends data between the main thread and a worker. Data is cloned (structured clone algorithm), not shared. You can transfer ArrayBuffers for zero-copy performance.",
    codeSnippet: `// main.js — sending structured data
const worker = new Worker("worker.js");

worker.postMessage({ type: "calculate", values: [10, 20, 30] });

worker.onmessage = (event) => {
  console.log("Result:", event.data.sum);
  console.log("Average:", event.data.avg);
};

// worker.js — processing and responding
self.onmessage = (event) => {
  const { values } = event.data;
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = sum / values.length;
  self.postMessage({ sum, avg });
};`,
    codeOutput: [
      "Result: 60",
      "Average: 20",
    ],
  },
  heavyComputation: {
    label: "Heavy Computation",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Workers shine for CPU-intensive tasks. Offloading heavy computation keeps the main thread responsive, so the UI never freezes during long calculations.",
    codeSnippet: `// main.js — offload heavy work
const worker = new Worker("prime-worker.js");

console.log("UI remains responsive!");

worker.postMessage({ findPrimesUpTo: 1000000 });

worker.onmessage = (event) => {
  console.log("Primes found:", event.data.count);
  console.log("Time:", event.data.duration + "ms");
  worker.terminate(); // clean up
  console.log("Worker terminated");
};

// prime-worker.js
self.onmessage = (event) => {
  const start = performance.now();
  const { findPrimesUpTo } = event.data;
  let count = 0;
  for (let i = 2; i <= findPrimesUpTo; i++) {
    let isPrime = true;
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) { isPrime = false; break; }
    }
    if (isPrime) count++;
  }
  const duration = Math.round(performance.now() - start);
  self.postMessage({ count, duration });
};`,
    codeOutput: [
      "UI remains responsive!",
      "Primes found: 78498",
      "Time: 320ms",
      "Worker terminated",
    ],
  },
  workerTypes: {
    label: "Worker Types",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "JavaScript offers three worker types: Dedicated Workers (one-to-one), Shared Workers (shared across tabs), and Service Workers (network proxy for offline/caching).",
    codeSnippet: `// Dedicated Worker — one page, one worker
const dedicated = new Worker("worker.js");
dedicated.postMessage("Only this page can talk to me");

// Shared Worker — shared across tabs/windows
const shared = new SharedWorker("shared.js");
shared.port.start();
shared.port.postMessage("Any tab can reach me");
shared.port.onmessage = (e) => {
  console.log("Shared:", e.data);
};

// Service Worker — network proxy, offline-first
navigator.serviceWorker.register("/sw.js")
  .then((reg) => {
    console.log("SW registered, scope:", reg.scope);
  });
console.log("Type:", typeof dedicated);
console.log("Type:", typeof shared);`,
    codeOutput: [
      "Type: object",
      "Type: object",
      "Shared: Connected! 3 tabs active",
      "SW registered, scope: https://example.com/",
    ],
  },
};

const order: WorkerTab[] = ["basicWorker", "postMessage", "heavyComputation", "workerTypes"];

// ─── comparison table data ───────────────────────────────────────────────────
const comparisonRows = [
  {
    type: "Dedicated Worker",
    scope: "Single page",
    shared: "No",
    useCase: "CPU-heavy tasks, background processing",
  },
  {
    type: "Shared Worker",
    scope: "Multiple tabs/windows (same origin)",
    shared: "Yes",
    useCase: "Shared state, WebSocket connections across tabs",
  },
  {
    type: "Service Worker",
    scope: "Origin-wide (network proxy)",
    shared: "Yes",
    useCase: "Offline caching, push notifications, background sync",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function WebWorkersVisualization() {
  const [selected, setSelected] = useState<WorkerTab>("basicWorker");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  // Interactive visual state
  const [taskPhase, setTaskPhase] = useState<
    "idle" | "sending" | "processing" | "returning" | "done"
  >("idle");
  const [animating, setAnimating] = useState(false);

  const group = groups[selected];

  const handleSelect = (key: WorkerTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  const runThreadAnimation = async () => {
    setAnimating(true);
    setTaskPhase("sending");
    await new Promise((r) => setTimeout(r, 900));
    setTaskPhase("processing");
    await new Promise((r) => setTimeout(r, 1800));
    setTaskPhase("returning");
    await new Promise((r) => setTimeout(r, 900));
    setTaskPhase("done");
    await new Promise((r) => setTimeout(r, 1200));
    setTaskPhase("idle");
    setAnimating(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Web Workers</CardTitle>
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
                  worker
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
          </motion.div>
        </AnimatePresence>

        {/* Interactive visual: Main Thread ↔ Worker Thread */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Thread Communication Visual
          </p>
          <div className="rounded-xl border bg-muted/20 px-4 py-5">
            <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-4 min-h-[180px]">
              {/* Main Thread Column */}
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-xl bg-blue-500 text-white px-4 py-2 text-xs font-bold text-center">
                  Main Thread
                </div>
                <div className="rounded-lg border bg-muted/40 px-3 py-2 text-[11px] text-muted-foreground text-center w-full">
                  UI rendering, event handling
                </div>
                {/* Responsive indicator */}
                <div className="flex items-center gap-2 mt-2">
                  <motion.div
                    animate={
                      taskPhase === "processing" || taskPhase === "sending" || taskPhase === "returning"
                        ? { y: [0, -6, 0] }
                        : { y: 0 }
                    }
                    transition={
                      taskPhase === "processing" || taskPhase === "sending" || taskPhase === "returning"
                        ? { repeat: Infinity, duration: 0.6, ease: "easeInOut" }
                        : {}
                    }
                    className="h-2.5 w-2.5 rounded-full bg-emerald-500"
                  />
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    {taskPhase !== "idle" && taskPhase !== "done"
                      ? "Still responsive!"
                      : taskPhase === "done"
                      ? "Result received!"
                      : "Idle"}
                  </span>
                </div>
              </div>

              {/* Center: Message arrows */}
              <div className="flex flex-col items-center justify-center gap-3 pt-2 min-w-[100px]">
                {/* Sending message bubble */}
                <AnimatePresence>
                  {taskPhase === "sending" && (
                    <motion.div
                      key="send-msg"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 30 }}
                      exit={{ opacity: 0, x: 60 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="rounded-full bg-blue-500 text-white px-3 py-1 text-[10px] font-mono font-bold shadow-lg"
                    >
                      postMessage →
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Processing indicator */}
                <AnimatePresence>
                  {taskPhase === "processing" && (
                    <motion.div
                      key="proc-msg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-[10px] text-violet-600 dark:text-violet-400 font-semibold"
                    >
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                      >
                        ⏳ Computing...
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Returning result bubble */}
                <AnimatePresence>
                  {taskPhase === "returning" && (
                    <motion.div
                      key="return-msg"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: -30 }}
                      exit={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="rounded-full bg-emerald-500 text-white px-3 py-1 text-[10px] font-mono font-bold shadow-lg"
                    >
                      ← result
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Idle state arrows */}
                {taskPhase === "idle" && (
                  <div className="flex flex-col items-center gap-1 text-muted-foreground">
                    <span className="text-xs font-mono">→ postMessage →</span>
                    <span className="text-xs font-mono">← onmessage ←</span>
                  </div>
                )}

                {/* Done state */}
                {taskPhase === "done" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold"
                  >
                    ✓ Complete
                  </motion.div>
                )}
              </div>

              {/* Worker Thread Column */}
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-xl bg-violet-500 text-white px-4 py-2 text-xs font-bold text-center">
                  Worker Thread
                </div>
                <div className="rounded-lg border bg-muted/40 px-3 py-2 text-[11px] text-muted-foreground text-center w-full">
                  Background computation
                </div>
                {/* Worker status */}
                <div className="flex items-center gap-2 mt-2">
                  <motion.div
                    animate={
                      taskPhase === "processing"
                        ? { rotate: [0, 360] }
                        : { rotate: 0 }
                    }
                    transition={
                      taskPhase === "processing"
                        ? { repeat: Infinity, duration: 0.8, ease: "linear" }
                        : {}
                    }
                    className={`h-2.5 w-2.5 rounded-sm ${
                      taskPhase === "processing"
                        ? "bg-violet-500"
                        : taskPhase === "done"
                        ? "bg-emerald-500"
                        : "bg-zinc-400"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-semibold ${
                      taskPhase === "processing"
                        ? "text-violet-600 dark:text-violet-400"
                        : taskPhase === "done"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-muted-foreground"
                    }`}
                  >
                    {taskPhase === "processing"
                      ? "Crunching numbers..."
                      : taskPhase === "done"
                      ? "Done!"
                      : taskPhase === "sending"
                      ? "Receiving task..."
                      : taskPhase === "returning"
                      ? "Sending result..."
                      : "Waiting"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <Button
                size="sm"
                variant="outline"
                disabled={animating}
                onClick={runThreadAnimation}
              >
                <Play className="h-3.5 w-3.5 mr-1" />
                {animating ? "Running..." : "Send Task"}
              </Button>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Worker Types Comparison
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Type</span>
              <span>Scope</span>
              <span>Shared?</span>
              <span>Use Case</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.type}
                className="grid grid-cols-4 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.type}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.scope}</span>
                <span className="text-[11px] text-muted-foreground">{row.shared}</span>
                <span className="text-[11px] text-muted-foreground">{row.useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
