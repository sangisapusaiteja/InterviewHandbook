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
            <p key={`${i}-${line}`} className="text-emerald-400">
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
type CallbackTab = "whatIsCallback" | "arrayMethods" | "asyncCallbacks" | "errorFirstPattern";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<CallbackTab, TabInfo> = {
  whatIsCallback: {
    label: "What is a Callback?",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "A callback is a function passed as an argument to another function. The receiving function can then \"call back\" (invoke) the passed function at the appropriate time. This is fundamental to JavaScript's functional programming style.",
    codeSnippet: `function greet(name, formatter) {
  const formatted = formatter(name);
  console.log("Hello, " + formatted + "!");
}

function toUpperCase(str) {
  return str.toUpperCase();
}

function addEmoji(str) {
  return str + " :)";
}

greet("Alice", toUpperCase);
greet("Bob", addEmoji);`,
    codeOutput: [
      'Hello, ALICE!',
      'Hello, Bob :)!',
    ],
  },
  arrayMethods: {
    label: "Array Methods",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Array methods like forEach, map, and filter accept callback functions that are invoked for each element. The callback receives the current element, index, and the array itself.",
    codeSnippet: `const nums = [1, 2, 3, 4, 5];

// forEach - execute for each element
nums.forEach((n) => console.log(n * 2));

// map - transform each element
const doubled = nums.map((n) => n * 2);
console.log(doubled);

// filter - keep elements that pass test
const evens = nums.filter((n) => n % 2 === 0);
console.log(evens);`,
    codeOutput: [
      "2, 4, 6, 8, 10",
      "[2, 4, 6, 8, 10]",
      "[2, 4]",
    ],
  },
  asyncCallbacks: {
    label: "Async Callbacks",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Asynchronous callbacks are invoked after an operation completes, rather than immediately. setTimeout is a classic example -- the callback runs after the specified delay, while other code continues executing.",
    codeSnippet: `console.log("Start");

setTimeout(function() {
  console.log("Inside timeout (after 2s)");
}, 2000);

console.log("End");

// Output order matters!
// "Start" and "End" print first,
// then the timeout callback fires.`,
    codeOutput: [
      "Start",
      "End",
      "...waiting 2 seconds...",
      "Inside timeout (after 2s)",
    ],
  },
  errorFirstPattern: {
    label: "Error-First Pattern",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "The error-first callback pattern (popularized by Node.js) passes an error as the first argument to the callback. If the operation succeeds, error is null; otherwise it contains the error details.",
    codeSnippet: `function readFile(path, callback) {
  if (path === "") {
    callback(new Error("Path is empty"), null);
    return;
  }
  // simulate success
  callback(null, "file contents here");
}

readFile("data.txt", (err, data) => {
  if (err) {
    console.log("Error:", err.message);
    return;
  }
  console.log("Data:", data);
});

readFile("", (err, data) => {
  if (err) {
    console.log("Error:", err.message);
    return;
  }
  console.log("Data:", data);
});`,
    codeOutput: [
      "Data: file contents here",
      "Error: Path is empty",
    ],
  },
};

const order: CallbackTab[] = ["whatIsCallback", "arrayMethods", "asyncCallbacks", "errorFirstPattern"];

// ─── Flow Diagram ─────────────────────────────────────────────────────────────
const flowSteps = [
  { label: "Call function", sublabel: "greet(name, cb)" },
  { label: "Pass callback", sublabel: "cb = formatter" },
  { label: "Function executes", sublabel: "runs its logic" },
  { label: "Callback invoked", sublabel: "cb(name) called" },
];

function CallbackFlowDiagram() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = async () => {
    setIsAnimating(true);
    setActiveStep(null);

    for (let i = 0; i < flowSteps.length; i++) {
      setActiveStep(i);
      await new Promise<void>((r) => setTimeout(r, 800));
    }

    await new Promise<void>((r) => setTimeout(r, 600));
    setActiveStep(null);
    setIsAnimating(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={animate} disabled={isAnimating}>
          <Play className="h-3.5 w-3.5 mr-1" /> Animate Flow
        </Button>
        {isAnimating && activeStep !== null && (
          <Badge variant="secondary" className="animate-pulse text-[10px]">
            Step {activeStep + 1}: {flowSteps[activeStep].label}
          </Badge>
        )}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {flowSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: activeStep === i ? 1.1 : 1,
                  backgroundColor:
                    activeStep === i
                      ? "rgb(59 130 246)"
                      : activeStep !== null && i < activeStep
                        ? "rgb(59 130 246 / 0.2)"
                        : "rgb(128 128 128 / 0.08)",
                }}
                transition={{ duration: 0.25 }}
                className={`px-4 py-3 rounded-xl border min-w-[120px] text-center ${
                  activeStep === i
                    ? "border-blue-500 text-white shadow-lg"
                    : activeStep !== null && i < activeStep
                      ? "border-blue-400/40 text-blue-700 dark:text-blue-300"
                      : "border-border text-foreground"
                }`}
              >
                <p className="text-xs font-semibold">{step.label}</p>
                <p
                  className={`text-[10px] font-mono mt-0.5 ${
                    activeStep === i
                      ? "text-blue-100"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.sublabel}
                </p>
              </motion.div>

              {i < flowSteps.length - 1 && (
                <motion.span
                  animate={{
                    opacity: activeStep !== null && i < activeStep ? 1 : 0.3,
                    color:
                      activeStep !== null && i < activeStep
                        ? "rgb(59 130 246)"
                        : "rgb(128 128 128)",
                  }}
                  className="text-lg font-bold select-none"
                >
                  &rarr;
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground">
        A callback is passed into a function and invoked when the function is ready. This enables flexible, reusable code.
      </p>
    </div>
  );
}

// ─── Array Methods Visual ─────────────────────────────────────────────────────
function ArrayMethodsVisual() {
  const nums = [1, 2, 3, 4, 5];
  const [method, setMethod] = useState<"forEach" | "map" | "filter">("forEach");

  const results: Record<string, { output: (number | string)[]; label: string }> = {
    forEach: { output: nums.map((n) => n * 2), label: "Logs each n * 2" },
    map: { output: nums.map((n) => n * 2), label: "Returns new array" },
    filter: { output: nums.filter((n) => n % 2 === 0), label: "Keeps even numbers" },
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {(["forEach", "map", "filter"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMethod(m)}
            className={`px-3 py-1 rounded-full text-[11px] font-mono font-semibold border transition-all ${
              method === m
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 scale-105"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            .{m}()
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-mono text-muted-foreground">input:</span>
          <div className="flex gap-1">
            {nums.map((n) => (
              <div
                key={n}
                className="w-8 h-8 rounded-md bg-zinc-500/10 border border-border flex items-center justify-center text-xs font-mono font-semibold"
              >
                {n}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <span className="text-lg select-none text-muted-foreground">&darr;</span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
            .{method}(callback)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground">output:</span>
          <div className="flex gap-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={method}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex gap-1"
              >
                {results[method].output.map((val, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="w-8 h-8 rounded-md bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-300"
                  >
                    {val}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground">{results[method].label}</p>
    </div>
  );
}

// ─── Async Timeline Visual ────────────────────────────────────────────────────
function AsyncTimelineVisual() {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const timeline = [
    { time: "0ms", label: 'console.log("Start")', color: "bg-violet-500/20 border-violet-400/40 text-violet-700 dark:text-violet-300" },
    { time: "0ms", label: "setTimeout(cb, 2000)", color: "bg-zinc-500/10 border-border text-muted-foreground" },
    { time: "0ms", label: 'console.log("End")', color: "bg-violet-500/20 border-violet-400/40 text-violet-700 dark:text-violet-300" },
    { time: "2000ms", label: 'cb: "Inside timeout"', color: "bg-amber-500/20 border-amber-400/40 text-amber-700 dark:text-amber-300" },
  ];

  const animate = async () => {
    setIsAnimating(true);
    setStep(0);
    for (let i = 1; i <= timeline.length; i++) {
      await new Promise<void>((r) => setTimeout(r, i === 4 ? 1200 : 500));
      setStep(i);
    }
    setIsAnimating(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={animate} disabled={isAnimating}>
          <Play className="h-3.5 w-3.5 mr-1" /> Run Timeline
        </Button>
        {isAnimating && (
          <Badge variant="secondary" className="animate-pulse text-[10px]">
            executing...
          </Badge>
        )}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 space-y-2 min-h-[160px]">
        <AnimatePresence>
          {timeline.slice(0, step).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${item.color}`}
            >
              <span className="text-[10px] font-mono font-bold min-w-[50px]">{item.time}</span>
              <span className="text-xs font-mono">{item.label}</span>
              {i === 3 && (
                <Badge variant="secondary" className="text-[9px] bg-amber-500/20 text-amber-700 dark:text-amber-300 ml-auto">
                  async callback
                </Badge>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {step === 0 && !isAnimating && (
          <p className="text-xs text-muted-foreground text-center py-12">
            Click <strong>Run Timeline</strong> to see async execution order
          </p>
        )}
      </div>

      <p className="text-[11px] text-muted-foreground">
        Synchronous code runs first. The async callback fires later, after the delay completes.
      </p>
    </div>
  );
}

// ─── Error-First Pattern Visual ───────────────────────────────────────────────
function ErrorFirstVisual() {
  const [scenario, setScenario] = useState<"success" | "error">("success");

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {(["success", "error"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setScenario(s)}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all ${
              scenario === s
                ? s === "success"
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 scale-105"
                  : "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300 scale-105"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {s === "success" ? "Success path" : "Error path"}
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-muted-foreground">callback(</span>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className={`px-2 py-1 rounded-md border ${
                  scenario === "error"
                    ? "bg-red-500/15 border-red-400/40 text-red-700 dark:text-red-300"
                    : "bg-zinc-500/10 border-border text-muted-foreground"
                }`}
              >
                {scenario === "error" ? 'Error("Path is empty")' : "null"}
              </motion.div>
              <span className="text-muted-foreground">,</span>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className={`px-2 py-1 rounded-md border ${
                  scenario === "success"
                    ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-700 dark:text-emerald-300"
                    : "bg-zinc-500/10 border-border text-muted-foreground"
                }`}
              >
                {scenario === "success" ? '"file contents here"' : "null"}
              </motion.div>
              <span className="text-muted-foreground">)</span>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="text-lg select-none text-muted-foreground">&darr;</span>
              <span className="text-[10px] font-mono text-muted-foreground">
                {scenario === "error" ? "err is truthy, handle error" : "err is null, use data"}
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className={`px-3 py-2 rounded-lg border text-xs font-mono ${
                scenario === "error"
                  ? "bg-red-500/10 border-red-400/30 text-red-700 dark:text-red-300"
                  : "bg-emerald-500/10 border-emerald-400/30 text-emerald-700 dark:text-emerald-300"
              }`}
            >
              {scenario === "error" ? 'console.log("Error:", err.message)' : 'console.log("Data:", data)'}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="text-[11px] text-muted-foreground">
        Always check the error argument first. If it is non-null, handle the error; otherwise use the data.
      </p>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function CallbackFunctionsVisualization() {
  const [selected, setSelected] = useState<CallbackTab>("whatIsCallback");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: CallbackTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Callback Functions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* ── Flow diagram ── */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Callback Flow</p>
          <div className="rounded-xl border bg-muted/20 p-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {flowSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.3 }}
                    className="px-3 py-2 rounded-xl border bg-blue-500/10 border-blue-400/30 text-center min-w-[110px]"
                  >
                    <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">{step.label}</p>
                    <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{step.sublabel}</p>
                  </motion.div>
                  {i < flowSteps.length - 1 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      transition={{ delay: i * 0.12 + 0.1 }}
                      className="text-lg font-bold text-muted-foreground select-none"
                    >
                      &rarr;
                    </motion.span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Selector chips ── */}
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

        {/* ── Animated detail area ── */}
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
                  callback
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{tab.description}</p>
            </div>

            {/* Two-column: visual | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Visual */}
              <div>
                {selected === "whatIsCallback" && <CallbackFlowDiagram />}
                {selected === "arrayMethods" && <ArrayMethodsVisual />}
                {selected === "asyncCallbacks" && <AsyncTimelineVisual />}
                {selected === "errorFirstPattern" && <ErrorFirstVisual />}
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
      </CardContent>
    </Card>
  );
}
