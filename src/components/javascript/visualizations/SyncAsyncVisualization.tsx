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
type SyncAsyncTab = "syncCode" | "asyncCode" | "eventLoop" | "micromacro";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<SyncAsyncTab, GroupInfo> = {
  syncCode: {
    label: "Sync Code",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Synchronous code executes line by line, top to bottom. Each line must finish before the next one starts. The output order always matches the code order.",
    codeSnippet: `console.log("First");
console.log("Second");
console.log("Third");
console.log("Done!");`,
    codeOutput: ["First", "Second", "Third", "Done!"],
  },
  asyncCode: {
    label: "Async Code",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Asynchronous code allows tasks to run in the background. setTimeout schedules a callback for later, so the output order differs from the code order.",
    codeSnippet: `console.log("Start");

setTimeout(() => {
  console.log("Timeout callback");
}, 0);

console.log("End");`,
    codeOutput: ["Start", "End", "Timeout callback"],
  },
  eventLoop: {
    label: "Event Loop",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "The Event Loop coordinates execution between the Call Stack, Web APIs, and Task Queue. It checks if the Call Stack is empty, then pushes queued callbacks onto it.",
    codeSnippet: `console.log("Hi");

setTimeout(() => {
  console.log("Timer done");
}, 1000);

console.log("Bye");`,
    codeOutput: ["Hi", "Bye", "Timer done"],
  },
  micromacro: {
    label: "Microtasks vs Macrotasks",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Microtasks (Promise.then, queueMicrotask) run before Macrotasks (setTimeout, setInterval). After each macrotask, ALL microtasks are drained before the next macrotask runs.",
    codeSnippet: `console.log("Script start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve()
  .then(() => console.log("Promise 1"))
  .then(() => console.log("Promise 2"));

console.log("Script end");`,
    codeOutput: [
      "Script start",
      "Script end",
      "Promise 1",
      "Promise 2",
      "setTimeout",
    ],
  },
};

const order: SyncAsyncTab[] = ["syncCode", "asyncCode", "eventLoop", "micromacro"];

// ─── event loop step labels ──────────────────────────────────────────────────
const eventLoopSteps = [
  { id: "callstack", label: "Call Stack", description: "Execute sync code", color: "bg-blue-500 text-white" },
  { id: "webapi", label: "Web API", description: "Timer / fetch / DOM", color: "bg-amber-500 text-white" },
  { id: "taskqueue", label: "Task Queue", description: "Queued callbacks", color: "bg-emerald-500 text-white" },
  { id: "eventloop", label: "Event Loop", description: "Push to Call Stack", color: "bg-violet-500 text-white" },
];

// ─── comparison table data ───────────────────────────────────────────────────
const comparisonRows = [
  {
    feature: "Execution",
    synchronous: "Line by line, sequential",
    asynchronous: "Non-blocking, concurrent",
  },
  {
    feature: "Blocking",
    synchronous: "Blocks until complete",
    asynchronous: "Does not block main thread",
  },
  {
    feature: "Use Cases",
    synchronous: "Simple calculations, loops",
    asynchronous: "API calls, timers, I/O",
  },
  {
    feature: "Examples",
    synchronous: "console.log, Math.random",
    asynchronous: "fetch, setTimeout, Promises",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function SyncAsyncVisualization() {
  const [selected, setSelected] = useState<SyncAsyncTab>("syncCode");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const group = groups[selected];

  const handleSelect = (key: SyncAsyncTab) => {
    setSelected(key);
    setOutputLines(null);
    setActiveStep(null);
    setAnimating(false);
  };

  const runEventLoopAnimation = async () => {
    setAnimating(true);
    // Step 1: Call Stack -- execute sync code
    setActiveStep(0);
    await new Promise((r) => setTimeout(r, 900));
    // Step 2: Web API -- timer registers
    setActiveStep(1);
    await new Promise((r) => setTimeout(r, 900));
    // Step 3: Task Queue -- callback queued
    setActiveStep(2);
    await new Promise((r) => setTimeout(r, 900));
    // Step 4: Event Loop -- pushes callback to Call Stack
    setActiveStep(3);
    await new Promise((r) => setTimeout(r, 900));
    // Back to Call Stack -- execute callback
    setActiveStep(0);
    await new Promise((r) => setTimeout(r, 700));
    setActiveStep(null);
    setAnimating(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Synchronous vs Asynchronous JavaScript</CardTitle>
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
                  async
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

            {/* Interactive Event Loop visual for Event Loop tab */}
            {selected === "eventLoop" && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Event Loop Flow
                </p>
                <div className="rounded-xl border bg-muted/20 px-4 py-5">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {eventLoopSteps.map((step, idx) => (
                      <div key={step.id} className="flex items-center gap-3">
                        <motion.div
                          animate={{
                            scale: activeStep === idx ? 1.15 : 1,
                            boxShadow:
                              activeStep === idx
                                ? "0 0 16px rgba(139,92,246,0.5)"
                                : "0 0 0px transparent",
                          }}
                          transition={{ duration: 0.25 }}
                          className={`flex flex-col items-center px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
                            activeStep === idx
                              ? step.color + " ring-2 ring-offset-2 ring-offset-background ring-violet-400"
                              : "bg-muted border border-border text-muted-foreground"
                          }`}
                        >
                          <span className="font-bold text-sm">{step.label}</span>
                          <span
                            className={`text-[10px] mt-0.5 ${
                              activeStep === idx ? "opacity-90" : "opacity-60"
                            }`}
                          >
                            {step.description}
                          </span>
                        </motion.div>
                        {idx < eventLoopSteps.length - 1 && (
                          <motion.span
                            animate={{
                              color:
                                activeStep === idx
                                  ? "rgb(139,92,246)"
                                  : "rgb(161,161,170)",
                            }}
                            className="text-lg font-bold select-none"
                          >
                            →
                          </motion.span>
                        )}
                      </div>
                    ))}
                    {/* Arrow from Event Loop back to Call Stack */}
                    <motion.span
                      animate={{
                        color:
                          activeStep === 3
                            ? "rgb(139,92,246)"
                            : "rgb(161,161,170)",
                      }}
                      className="text-lg font-bold select-none"
                    >
                      ↩
                    </motion.span>
                    <span className="text-[10px] text-muted-foreground italic">
                      back to Call Stack
                    </span>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={animating}
                      onClick={runEventLoopAnimation}
                    >
                      <Play className="h-3.5 w-3.5 mr-1" />
                      {animating ? "Animating..." : "Animate Event Loop"}
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
            Sync vs Async
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Feature</span>
              <span>Synchronous</span>
              <span>Asynchronous</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-3 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.feature}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.synchronous}</span>
                <span className="text-[11px] text-muted-foreground">{row.asynchronous}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
