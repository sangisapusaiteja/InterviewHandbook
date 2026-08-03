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
type ClosureTab = "basicClosure" | "counterExample" | "loopClosure" | "practicalUses";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<ClosureTab, TabInfo> = {
  basicClosure: {
    label: "Basic Closure",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "A closure is created when an inner function accesses variables from its outer (enclosing) function scope, even after the outer function has returned. The inner function &ldquo;closes over&rdquo; the variables it needs.",
    codeSnippet: `function outer() {
  const message = "Hello from outer!";

  function inner() {
    console.log(message); // accesses outer variable
  }

  return inner;
}

const fn = outer();
fn(); // "Hello from outer!"`,
    codeOutput: [
      "Hello from outer!",
      "// inner() still has access to message",
      "// even after outer() has returned",
    ],
  },
  counterExample: {
    label: "Counter Example",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "The classic closure counter pattern demonstrates private state. The count variable is enclosed in the outer function scope and can only be modified through the returned functions, achieving data privacy.",
    codeSnippet: `function createCounter() {
  let count = 0; // private variable

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount());  // 1`,
    codeOutput: [
      "counter.increment() => 1",
      "counter.increment() => 2",
      "counter.decrement() => 1",
      "counter.getCount()  => 1",
    ],
  },
  loopClosure: {
    label: "Loop Closure",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "The classic for-loop closure pitfall. Using var shares the same variable across all iterations, so all callbacks see the final value. Using let creates a new binding per iteration, fixing the issue.",
    codeSnippet: `// Problem with var
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i:", i), 100);
}
// All print 3!

// Fixed with let
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let j:", j), 100);
}
// Prints 0, 1, 2`,
    codeOutput: [
      "var i: 3",
      "var i: 3",
      "var i: 3",
      "let j: 0",
      "let j: 1",
      "let j: 2",
    ],
  },
  practicalUses: {
    label: "Practical Uses",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Closures power many real-world patterns: data privacy (module pattern), memoization (caching results), currying (partial application), and event handlers that remember their context.",
    codeSnippet: `// Memoization with closures
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      console.log("Cache hit:", key);
      return cache[key];
    }
    cache[key] = fn(...args);
    return cache[key];
  };
}

const square = memoize((n) => n * n);
console.log(square(4)); // 16 (computed)
console.log(square(4)); // 16 (cached)`,
    codeOutput: [
      "square(4) => 16  (computed)",
      "Cache hit: [4]",
      "square(4) => 16  (from cache)",
    ],
  },
};

const order: ClosureTab[] = ["basicClosure", "counterExample", "loopClosure", "practicalUses"];

// ─── Visual: Basic Closure ────────────────────────────────────────────────────
function BasicClosureVisual() {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    { label: "outer() is called", detail: "A new scope is created" },
    { label: "message is declared", detail: "const message = &quot;Hello from outer!&quot;" },
    { label: "inner() is defined", detail: "inner closes over message" },
    { label: "inner is returned", detail: "outer() finishes, but scope is preserved" },
    { label: "fn() is called", detail: "inner executes, accesses message from closed scope" },
  ];

  const animate = async () => {
    setIsAnimating(true);
    setStep(0);
    for (let i = 0; i < steps.length; i++) {
      setStep(i);
      await new Promise<void>((r) => setTimeout(r, 800));
    }
    setIsAnimating(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={animate} disabled={isAnimating}>
          <Play className="h-3.5 w-3.5 mr-1" /> Trace Execution
        </Button>
        {isAnimating && (
          <Badge variant="secondary" className="animate-pulse text-[10px]">
            step {step + 1} / {steps.length}
          </Badge>
        )}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 space-y-2 min-h-[180px]">
        <AnimatePresence>
          {steps.slice(0, step + 1).map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-xs font-mono ${
                i === step
                  ? "bg-blue-500/15 border-blue-400/40 text-blue-700 dark:text-blue-300"
                  : "bg-muted/30 border-border text-muted-foreground"
              }`}
            >
              <span className="font-bold shrink-0">{i + 1}.</span>
              <div>
                <p className="font-semibold">{s.label}</p>
                <p className="opacity-75">{s.detail}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {step === 0 && !isAnimating && (
          <p className="text-xs text-muted-foreground text-center py-8">
            Click <strong>Trace Execution</strong> to step through the closure
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: Counter (Interactive Closure Demo) ──────────────────────────────
function CounterClosureVisual() {
  const [created, setCreated] = useState(false);
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<string[]>([]);

  const handleCreate = () => {
    setCreated(true);
    setCount(0);
    setHistory(["createCounter() called - count initialized to 0"]);
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    setHistory((prev) => [...prev, `increment() => count is now ${newCount}`]);
  };

  const handleDecrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    setHistory((prev) => [...prev, `decrement() => count is now ${newCount}`]);
  };

  const handleReset = () => {
    setCreated(false);
    setCount(0);
    setHistory([]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        {!created ? (
          <Button size="sm" onClick={handleCreate}>
            <Play className="h-3.5 w-3.5 mr-1" /> Create Counter
          </Button>
        ) : (
          <>
            <Button size="sm" variant="outline" onClick={handleIncrement}>
              + Increment
            </Button>
            <Button size="sm" variant="outline" onClick={handleDecrement}>
              - Decrement
            </Button>
            <Button size="sm" variant="ghost" onClick={handleReset}>
              Reset
            </Button>
          </>
        )}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[200px]">
        {created ? (
          <div className="space-y-4">
            {/* Scope visualization */}
            <div className="rounded-lg border-2 border-dashed border-emerald-400/50 p-3 space-y-3">
              <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                createCounter() Scope
              </p>

              {/* Count variable */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground">let count =</span>
                <motion.div
                  key={count}
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-12 h-12 rounded-xl border-2 bg-emerald-500/20 border-emerald-400/60 flex items-center justify-center text-lg font-mono font-bold text-emerald-700 dark:text-emerald-300"
                >
                  {count}
                </motion.div>
                <span className="text-[10px] text-muted-foreground italic">(private variable)</span>
              </div>

              {/* Inner functions connected to count */}
              <div className="flex gap-2 flex-wrap">
                {["increment()", "decrement()", "getCount()"].map((fn) => (
                  <div
                    key={fn}
                    className="relative px-3 py-1.5 rounded-lg border bg-emerald-500/10 border-emerald-400/30 text-xs font-mono text-emerald-700 dark:text-emerald-300"
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-px h-2 bg-emerald-400/50" />
                    {fn}
                  </div>
                ))}
              </div>
            </div>

            {/* History log */}
            <div className="space-y-1 max-h-[100px] overflow-y-auto">
              {history.map((entry, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[11px] font-mono text-muted-foreground"
                >
                  <span className="text-emerald-500 mr-1">&gt;</span> {entry}
                </motion.p>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-16">
            Click <strong>Create Counter</strong> to instantiate a closure with private state
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: Loop Closure ─────────────────────────────────────────────────────
function LoopClosureVisual() {
  const [mode, setMode] = useState<"var" | "let" | null>(null);

  const varResults = [3, 3, 3];
  const letResults = [0, 1, 2];

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground">
        Compare var vs let in a loop with closures:
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => setMode("var")}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all font-mono ${
            mode === "var"
              ? "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300 scale-105 shadow-sm"
              : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
          }`}
        >
          var
        </button>
        <button
          onClick={() => setMode("let")}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all font-mono ${
            mode === "let"
              ? "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300 scale-105 shadow-sm"
              : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
          }`}
        >
          let
        </button>
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[160px]">
        {mode ? (
          <div className="space-y-3">
            {/* Scope diagram */}
            {mode === "var" ? (
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-red-700 dark:text-red-300 uppercase tracking-wider">
                  Single shared scope (var)
                </p>
                <div className="rounded-lg border-2 border-dashed border-red-400/50 p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono text-muted-foreground">var i =</span>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-8 h-8 rounded-lg border bg-red-500/20 border-red-400/60 flex items-center justify-center text-sm font-mono font-bold text-red-700 dark:text-red-300"
                    >
                      3
                    </motion.div>
                    <span className="text-[10px] text-muted-foreground">(final value after loop)</span>
                  </div>
                  <div className="flex gap-2">
                    {varResults.map((val, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.15 }}
                        className="px-3 py-2 rounded-lg border bg-red-500/15 border-red-400/40 text-xs font-mono text-red-700 dark:text-red-300"
                      >
                        callback {idx} &rarr; i = {val}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-violet-700 dark:text-violet-300 uppercase tracking-wider">
                  Separate scope per iteration (let)
                </p>
                <div className="flex gap-2 flex-wrap">
                  {letResults.map((val, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.15 }}
                      className="rounded-lg border-2 border-dashed border-violet-400/50 p-3 space-y-1"
                    >
                      <p className="text-[10px] text-violet-500 font-semibold">Iteration {idx}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">let j =</span>
                        <div className="w-7 h-7 rounded-md border bg-violet-500/20 border-violet-400/60 flex items-center justify-center text-xs font-mono font-bold text-violet-700 dark:text-violet-300">
                          {val}
                        </div>
                      </div>
                      <p className="text-[10px] font-mono text-violet-700 dark:text-violet-300">
                        callback &rarr; {val}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Result summary */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs font-semibold text-muted-foreground">Output:</span>
              <div className="flex gap-1.5">
                {(mode === "var" ? varResults : letResults).map((val, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-mono font-bold shadow-md ${
                      mode === "var"
                        ? "bg-red-500 text-white"
                        : "bg-violet-500 text-white"
                    }`}
                  >
                    {val}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-12">
            Select <strong>var</strong> or <strong>let</strong> to see how closures behave differently in loops
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: Practical Uses ───────────────────────────────────────────────────
function PracticalUsesVisual() {
  const [cachedInputs, setCachedInputs] = useState<number[]>([]);
  const [lastResult, setLastResult] = useState<{ value: number; cached: boolean } | null>(null);
  const inputs = [2, 3, 4, 5, 7];

  const handleCompute = (n: number) => {
    const isCached = cachedInputs.includes(n);
    if (!isCached) {
      setCachedInputs((prev) => [...prev, n]);
    }
    setLastResult({ value: n * n, cached: isCached });
  };

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground">
        Try the memoized square function &mdash; click a number twice to see caching:
      </p>
      <div className="flex gap-2 flex-wrap">
        {inputs.map((n) => (
          <button
            key={n}
            onClick={() => handleCompute(n)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              cachedInputs.includes(n)
                ? "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            square({n})
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[120px]">
        {lastResult ? (
          <div className="space-y-3">
            <motion.div
              key={`${lastResult.value}-${lastResult.cached}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="px-4 py-3 rounded-lg border bg-orange-500/15 border-orange-400/40 text-sm font-mono font-bold text-orange-700 dark:text-orange-300">
                Result: {lastResult.value}
              </div>
              <Badge
                variant="secondary"
                className={`text-[10px] ${
                  lastResult.cached
                    ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                    : "bg-orange-500/20 text-orange-700 dark:text-orange-300"
                }`}
              >
                {lastResult.cached ? "from cache" : "computed"}
              </Badge>
            </motion.div>

            {/* Cache visualization */}
            <div className="rounded-lg border-2 border-dashed border-orange-400/50 p-3">
              <p className="text-[10px] font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wider mb-2">
                Closed-over cache object
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {cachedInputs.map((n) => (
                  <motion.div
                    key={n}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-2 py-1 rounded-md border bg-orange-500/10 border-orange-400/30 text-[10px] font-mono text-orange-700 dark:text-orange-300"
                  >
                    [{n}]: {n * n}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-8">
            Click a number above to compute its square using the memoized closure
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────
const comparisonData = [
  {
    pattern: "Data Privacy",
    description: "Variables hidden inside a closure, exposed via returned functions",
    useCase: "Module pattern, encapsulation",
  },
  {
    pattern: "Memoization",
    description: "Cache stored in a closed-over object, persisted between calls",
    useCase: "Expensive computations, API caching",
  },
  {
    pattern: "Currying",
    description: "Function returns another function with partially applied arguments",
    useCase: "Reusable utilities, configuration",
  },
  {
    pattern: "Factory Functions",
    description: "Outer function creates customized inner functions with preset values",
    useCase: "Creating multiple similar objects",
  },
  {
    pattern: "Event Handlers",
    description: "Callbacks that remember variables from their creation context",
    useCase: "DOM events, React handlers",
  },
  {
    pattern: "Iterators",
    description: "next() function closes over current index and collection",
    useCase: "Custom iterators, generators",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function ClosuresVisualization() {
  const [selected, setSelected] = useState<ClosureTab>("basicClosure");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: ClosureTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Closures</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Group selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const t = tabs[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? t.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.label}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${tab.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{tab.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${tab.badgeColor}`}>
                  closure
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{tab.description}</p>
            </div>

            {/* Two-column: visual | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Visual */}
              <div>
                {selected === "basicClosure" && <BasicClosureVisual />}
                {selected === "counterExample" && <CounterClosureVisual />}
                {selected === "loopClosure" && <LoopClosureVisual />}
                {selected === "practicalUses" && <PracticalUsesVisual />}
              </div>

              {/* Right: Code + Output */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {tab.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={() => setOutputLines(tab.codeOutput)}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                  <ConsoleOutput lines={outputLines} />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Comparison Table */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold">Common Closure Patterns</h3>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Pattern</th>
                  <th className="px-3 py-2 text-left font-semibold">Description</th>
                  <th className="px-3 py-2 text-left font-semibold">Use Case</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr key={row.pattern} className="border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="px-3 py-2 font-mono font-bold text-blue-700 dark:text-blue-300">
                      {row.pattern}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">{row.description}</td>
                    <td className="px-3 py-2">{row.useCase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
