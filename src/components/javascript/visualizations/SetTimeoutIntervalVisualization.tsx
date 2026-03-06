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
type TimerTab = "setTimeout" | "setInterval" | "clearing" | "debounceThrottle";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<TimerTab, GroupInfo> = {
  setTimeout: {
    label: "setTimeout",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Schedules a function to run once after a specified delay (in milliseconds). The rest of the code continues executing immediately -- the callback fires asynchronously.",
    codeSnippet: `console.log("Start");

setTimeout(() => {
  console.log("Delayed by 2000ms");
}, 2000);

console.log("End (runs first!)");`,
    codeOutput: [
      "Start",
      "End (runs first!)",
      "Delayed by 2000ms   // after 2s",
    ],
  },
  setInterval: {
    label: "setInterval",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Repeatedly executes a function at a fixed time interval until cleared with clearInterval. Useful for polling, clocks, and periodic updates.",
    codeSnippet: `let count = 0;

const id = setInterval(() => {
  count++;
  console.log("Tick:", count);

  if (count === 4) {
    clearInterval(id);
    console.log("Stopped after 4 ticks");
  }
}, 1000);`,
    codeOutput: [
      "Tick: 1   // after 1s",
      "Tick: 2   // after 2s",
      "Tick: 3   // after 3s",
      "Tick: 4   // after 4s",
      "Stopped after 4 ticks",
    ],
  },
  clearing: {
    label: "Clearing Timers",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Both setTimeout and setInterval return a numeric ID. Pass that ID to clearTimeout or clearInterval to cancel the pending callback before it fires.",
    codeSnippet: `// Cancel a timeout before it fires
const timeoutId = setTimeout(() => {
  console.log("This never runs");
}, 5000);
clearTimeout(timeoutId);
console.log("Timeout cancelled!");

// Cancel an interval after 2 ticks
let n = 0;
const intervalId = setInterval(() => {
  n++;
  console.log("Interval tick:", n);
  if (n === 2) {
    clearInterval(intervalId);
    console.log("Interval cleared!");
  }
}, 1000);`,
    codeOutput: [
      "Timeout cancelled!",
      "Interval tick: 1   // after 1s",
      "Interval tick: 2   // after 2s",
      "Interval cleared!",
    ],
  },
  debounceThrottle: {
    label: "Debounce & Throttle",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Debounce delays execution until input stops. Throttle limits execution to at most once per interval. Both use setTimeout under the hood.",
    codeSnippet: `// Debounce -- waits until user stops typing
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Throttle -- runs at most once per interval
function throttle(fn, interval) {
  let lastTime = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn(...args);
    }
  };
}

const log = debounce(() => console.log("Saved!"), 500);
log(); log(); log(); // only last call fires
// After 500ms: "Saved!"`,
    codeOutput: [
      'log() called 3 times rapidly',
      'Saved!   // fires once after 500ms',
    ],
  },
};

const order: TimerTab[] = ["setTimeout", "setInterval", "clearing", "debounceThrottle"];

// ─── timeline steps for setTimeout delay visualization ────────────────────────
const timelineSteps = [
  { id: "call", label: "setTimeout()", description: "Registered", color: "bg-blue-500 text-white" },
  { id: "waiting", label: "...delay...", description: "Waiting", color: "bg-amber-500 text-white" },
  { id: "queued", label: "Callback queued", description: "Event loop", color: "bg-violet-500 text-white" },
  { id: "execute", label: "fn() runs", description: "Executed", color: "bg-emerald-500 text-white" },
];

// ─── comparison table data ───────────────────────────────────────────────────
const comparisonRows = [
  {
    method: "setTimeout",
    runs: "Once",
    cancelWith: "clearTimeout(id)",
    useCase: "Delayed actions, debounce",
  },
  {
    method: "setInterval",
    runs: "Repeatedly",
    cancelWith: "clearInterval(id)",
    useCase: "Polling, clocks, animations",
  },
  {
    method: "clearTimeout",
    runs: "—",
    cancelWith: "—",
    useCase: "Cancel a pending setTimeout",
  },
  {
    method: "clearInterval",
    runs: "—",
    cancelWith: "—",
    useCase: "Stop a running setInterval",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function SetTimeoutIntervalVisualization() {
  const [selected, setSelected] = useState<TimerTab>("setTimeout");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  const group = groups[selected];

  const handleSelect = (key: TimerTab) => {
    setSelected(key);
    setOutputLines(null);
    setActiveStep(null);
    setAnimating(false);
    setProgress(0);
  };

  const runTimelineAnimation = async () => {
    setAnimating(true);
    setProgress(0);

    // Step 0: setTimeout() called
    setActiveStep(0);
    await new Promise((r) => setTimeout(r, 600));

    // Step 1: waiting / delay -- animate progress bar
    setActiveStep(1);
    for (let p = 0; p <= 100; p += 5) {
      setProgress(p);
      await new Promise((r) => setTimeout(r, 40));
    }
    await new Promise((r) => setTimeout(r, 200));

    // Step 2: callback queued in event loop
    setActiveStep(2);
    await new Promise((r) => setTimeout(r, 700));

    // Step 3: callback executes
    setActiveStep(3);
    await new Promise((r) => setTimeout(r, 700));

    setActiveStep(null);
    setProgress(0);
    setAnimating(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">setTimeout and setInterval</CardTitle>
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
                  timer
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

            {/* Interactive timeline visual for setTimeout */}
            {selected === "setTimeout" && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Delay Timeline
                </p>
                <div className="rounded-xl border bg-muted/20 px-4 py-5">
                  {/* Progress bar */}
                  <div className="mb-5">
                    <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                      <span>0ms</span>
                      <span className="font-semibold">
                        {activeStep === 1 ? `${progress}%` : "delay"}
                      </span>
                      <span>2000ms</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-muted border overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-blue-500"
                        animate={{ width: `${activeStep !== null && activeStep >= 1 ? progress : 0}%` }}
                        transition={{ duration: 0.05, ease: "linear" }}
                      />
                    </div>
                  </div>

                  {/* Step indicators */}
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {timelineSteps.map((step, idx) => (
                      <div key={step.id} className="flex items-center gap-3">
                        <motion.div
                          animate={{
                            scale: activeStep === idx ? 1.15 : 1,
                            boxShadow:
                              activeStep === idx
                                ? "0 0 16px rgba(59,130,246,0.5)"
                                : "0 0 0px transparent",
                          }}
                          transition={{ duration: 0.25 }}
                          className={`flex flex-col items-center px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
                            activeStep === idx
                              ? step.color + " ring-2 ring-offset-2 ring-offset-background ring-blue-400"
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
                        {idx < timelineSteps.length - 1 && (
                          <motion.span
                            animate={{
                              color:
                                activeStep === idx
                                  ? "rgb(59,130,246)"
                                  : "rgb(161,161,170)",
                            }}
                            className="text-lg font-bold select-none"
                          >
                            →
                          </motion.span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={animating}
                      onClick={runTimelineAnimation}
                    >
                      <Play className="h-3.5 w-3.5 mr-1" />
                      {animating ? "Animating..." : "Animate Timeline"}
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
            Timer Methods
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Method</span>
              <span>Runs</span>
              <span>Cancel With</span>
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
                <span className="text-[11px] text-muted-foreground">{row.runs}</span>
                <code className="font-mono text-[10px] text-violet-600 dark:text-violet-400">
                  {row.cancelWith}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
