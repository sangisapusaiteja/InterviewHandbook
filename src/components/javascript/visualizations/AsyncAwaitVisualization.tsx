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
type AsyncTab = "asyncFunction" | "awaitKeyword" | "seqVsParallel" | "errorHandling";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<AsyncTab, GroupInfo> = {
  asyncFunction: {
    label: "async Function",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "An async function always returns a Promise. If you return a plain value, it is automatically wrapped in a resolved Promise.",
    codeSnippet: `async function greet(name) {
  return "Hello, " + name + "!";
}

// Calling an async function returns a Promise
greet("Alice").then((msg) => {
  console.log(msg);
});

console.log(typeof greet("Bob"));
console.log("Sync code runs first");`,
    codeOutput: [
      "object",
      "Sync code runs first",
      "Hello, Alice!",
    ],
  },
  awaitKeyword: {
    label: "await Keyword",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "The await keyword pauses the async function execution until the Promise settles. It can only be used inside an async function.",
    codeSnippet: `function delay(ms) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}

async function main() {
  console.log("Start");
  await delay(1000);
  console.log("After 1 second");
  await delay(500);
  console.log("After 1.5 seconds");
  console.log("Done!");
}

main();`,
    codeOutput: [
      "Start",
      "After 1 second",
      "After 1.5 seconds",
      "Done!",
    ],
  },
  seqVsParallel: {
    label: "Sequential vs Parallel",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Awaiting one-by-one runs tasks sequentially (slow). Using Promise.all runs them in parallel (fast). Choose based on whether tasks depend on each other.",
    codeSnippet: `// Sequential -- total ~3s
async function sequential() {
  const a = await fetchUser();   // 1s
  const b = await fetchPosts();  // 1s
  const c = await fetchComments(); // 1s
  console.log("Sequential done: 3s");
}

// Parallel -- total ~1s
async function parallel() {
  const [a, b, c] = await Promise.all([
    fetchUser(),    // 1s
    fetchPosts(),   // 1s
    fetchComments() // 1s
  ]);
  console.log("Parallel done: 1s");
}`,
    codeOutput: [
      "Sequential: fetchUser... (1s)",
      "Sequential: fetchPosts... (1s)",
      "Sequential: fetchComments... (1s)",
      "Sequential done: 3s total",
      "---",
      "Parallel: all 3 start together",
      "Parallel done: 1s total",
    ],
  },
  errorHandling: {
    label: "Error Handling",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Use try/catch blocks with async/await for clean, synchronous-looking error handling. The catch block receives the rejected value.",
    codeSnippet: `async function fetchData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }
    const data = await res.json();
    console.log("Data:", data.title);
  } catch (err) {
    console.log("Error:", err.message);
  } finally {
    console.log("Cleanup complete");
  }
}

fetchData("/api/missing");`,
    codeOutput: [
      "Error: HTTP 404",
      "Cleanup complete",
    ],
  },
};

const order: AsyncTab[] = ["asyncFunction", "awaitKeyword", "seqVsParallel", "errorHandling"];

// ─── timing bar data for Sequential vs Parallel visual ────────────────────────
const sequentialTasks = [
  { label: "fetchUser()", duration: 1, start: 0, color: "bg-blue-500" },
  { label: "fetchPosts()", duration: 1, start: 1, color: "bg-emerald-500" },
  { label: "fetchComments()", duration: 1, start: 2, color: "bg-violet-500" },
];

const parallelTasks = [
  { label: "fetchUser()", duration: 1, start: 0, color: "bg-blue-500" },
  { label: "fetchPosts()", duration: 1, start: 0, color: "bg-emerald-500" },
  { label: "fetchComments()", duration: 1, start: 0, color: "bg-violet-500" },
];

// ─── comparison table data ───────────────────────────────────────────────────
const comparisonRows = [
  {
    feature: "Syntax",
    promises: ".then().then().catch()",
    asyncAwait: "await each step linearly",
  },
  {
    feature: "Error Handling",
    promises: ".catch() or second .then() arg",
    asyncAwait: "try / catch / finally",
  },
  {
    feature: "Readability",
    promises: "Chaining can get nested",
    asyncAwait: "Reads like synchronous code",
  },
  {
    feature: "Debugging",
    promises: "Stack traces can be unclear",
    asyncAwait: "Stack traces are clearer",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function AsyncAwaitVisualization() {
  const [selected, setSelected] = useState<AsyncTab>("asyncFunction");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [animating, setAnimating] = useState(false);
  const [seqProgress, setSeqProgress] = useState<number>(0);
  const [parProgress, setParProgress] = useState<number>(0);

  const group = groups[selected];

  const handleSelect = (key: AsyncTab) => {
    setSelected(key);
    setOutputLines(null);
    setAnimating(false);
    setSeqProgress(0);
    setParProgress(0);
  };

  const runTimingAnimation = async () => {
    setAnimating(true);
    setSeqProgress(0);
    setParProgress(0);

    // Animate sequential: tasks one after another (3 steps)
    for (let i = 1; i <= 3; i++) {
      await new Promise((r) => setTimeout(r, 800));
      setSeqProgress(i);
    }

    // Small pause before parallel
    await new Promise((r) => setTimeout(r, 400));

    // Animate parallel: all at once (1 step)
    await new Promise((r) => setTimeout(r, 800));
    setParProgress(3);

    setAnimating(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Async/Await</CardTitle>
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

            {/* Interactive visual for Sequential vs Parallel */}
            {selected === "seqVsParallel" && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Timing Comparison
                </p>
                <div className="rounded-xl border bg-muted/20 px-4 py-5 space-y-5">
                  {/* Sequential side */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">
                      Sequential <span className="text-orange-500 font-mono">(~3s total)</span>
                    </p>
                    <div className="space-y-1.5">
                      {sequentialTasks.map((task, idx) => (
                        <div key={task.label + "-seq"} className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-muted-foreground w-28 text-right shrink-0">
                            {task.label}
                          </span>
                          <div className="flex-1 h-6 bg-muted/40 rounded-md relative overflow-hidden">
                            {/* offset spacer */}
                            <div
                              className="h-full inline-block"
                              style={{ width: `${(task.start / 3) * 100}%` }}
                            />
                            <motion.div
                              className={`h-full rounded-md ${task.color} absolute top-0`}
                              style={{ left: `${(task.start / 3) * 100}%` }}
                              initial={{ width: 0 }}
                              animate={{
                                width: seqProgress > idx ? `${(task.duration / 3) * 100}%` : "0%",
                              }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Time axis labels */}
                    <div className="flex items-center gap-2">
                      <span className="w-28 shrink-0" />
                      <div className="flex-1 flex justify-between text-[9px] text-muted-foreground font-mono px-0.5">
                        <span>0s</span>
                        <span>1s</span>
                        <span>2s</span>
                        <span>3s</span>
                      </div>
                    </div>
                  </div>

                  {/* Parallel side */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">
                      Parallel <span className="text-emerald-500 font-mono">(~1s total)</span>
                    </p>
                    <div className="space-y-1.5">
                      {parallelTasks.map((task) => (
                        <div key={task.label + "-par"} className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-muted-foreground w-28 text-right shrink-0">
                            {task.label}
                          </span>
                          <div className="flex-1 h-6 bg-muted/40 rounded-md relative overflow-hidden">
                            <motion.div
                              className={`h-full rounded-md ${task.color} absolute top-0 left-0`}
                              initial={{ width: 0 }}
                              animate={{
                                width: parProgress >= 3 ? `${(task.duration / 3) * 100}%` : "0%",
                              }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Time axis labels */}
                    <div className="flex items-center gap-2">
                      <span className="w-28 shrink-0" />
                      <div className="flex-1 flex justify-between text-[9px] text-muted-foreground font-mono px-0.5">
                        <span>0s</span>
                        <span>1s</span>
                        <span>2s</span>
                        <span>3s</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={animating}
                      onClick={runTimingAnimation}
                    >
                      <Play className="h-3.5 w-3.5 mr-1" />
                      {animating ? "Animating..." : "Animate Comparison"}
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
            async/await vs Promises
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Feature</span>
              <span>Promises (.then)</span>
              <span>async/await</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-3 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.feature}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.promises}</span>
                <code className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                  {row.asyncAwait}
                </code>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
