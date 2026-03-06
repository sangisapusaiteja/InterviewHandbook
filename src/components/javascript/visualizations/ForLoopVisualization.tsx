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
type LoopTab = "basicFor" | "forOf" | "forIn" | "patterns";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<LoopTab, GroupInfo> = {
  basicFor: {
    label: "Basic for",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The classic for loop with three parts: initialization, condition, and update. Runs a block of code a known number of times.",
    codeSnippet: `for (let i = 0; i < 5; i++) {
  console.log("Iteration:", i);
}
console.log("Loop finished!");`,
    codeOutput: [
      "Iteration: 0",
      "Iteration: 1",
      "Iteration: 2",
      "Iteration: 3",
      "Iteration: 4",
      "Loop finished!",
    ],
  },
  forOf: {
    label: "for...of",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Iterates over iterable objects (Arrays, Strings, Maps, Sets). Gives you the value directly -- no index needed.",
    codeSnippet: `const fruits = ["Apple", "Banana", "Cherry"];

for (const fruit of fruits) {
  console.log(fruit);
}

// Works with strings too
for (const char of "Hi") {
  console.log(char);
}`,
    codeOutput: ["Apple", "Banana", "Cherry", "H", "i"],
  },
  forIn: {
    label: "for...in",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Iterates over the enumerable property keys of an object. Returns keys (strings), not values. Avoid using on arrays -- use for...of instead.",
    codeSnippet: `const user = { name: "Alice", age: 25, role: "Dev" };

for (const key in user) {
  console.log(key + ": " + user[key]);
}`,
    codeOutput: ['name: Alice', 'age: 25', 'role: Dev'],
  },
  patterns: {
    label: "Loop Patterns",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Common loop patterns: break to exit early, continue to skip an iteration, and nested loops for multi-dimensional data.",
    codeSnippet: `// break -- exit early
for (let i = 0; i < 10; i++) {
  if (i === 3) break;
  console.log("break:", i);
}

// continue -- skip iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log("continue:", i);
}

// nested loop
for (let r = 1; r <= 2; r++) {
  for (let c = 1; c <= 3; c++) {
    console.log("r" + r + "c" + c);
  }
}`,
    codeOutput: [
      "break: 0",
      "break: 1",
      "break: 2",
      "continue: 0",
      "continue: 1",
      "continue: 3",
      "continue: 4",
      "r1c1",
      "r1c2",
      "r1c3",
      "r2c1",
      "r2c2",
      "r2c3",
    ],
  },
};

const order: LoopTab[] = ["basicFor", "forOf", "forIn", "patterns"];

// ─── cycle step labels for Basic for breakdown ───────────────────────────────
const cycleSteps = [
  { id: "init", label: "let i = 0", description: "Initialization", color: "bg-blue-500 text-white" },
  { id: "condition", label: "i < 5", description: "Condition check", color: "bg-amber-500 text-white" },
  { id: "body", label: "{ ... }", description: "Execute body", color: "bg-emerald-500 text-white" },
  { id: "update", label: "i++", description: "Update", color: "bg-violet-500 text-white" },
];

// ─── comparison table data ───────────────────────────────────────────────────
const comparisonRows = [
  {
    type: "for",
    iterates: "Counter-based",
    bestFor: "Known iteration count",
    example: "for (let i = 0; i < n; i++)",
  },
  {
    type: "for...of",
    iterates: "Values of iterable",
    bestFor: "Arrays, Strings, Maps, Sets",
    example: "for (const val of arr)",
  },
  {
    type: "for...in",
    iterates: "Enumerable keys",
    bestFor: "Object properties",
    example: "for (const key in obj)",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function ForLoopVisualization() {
  const [selected, setSelected] = useState<LoopTab>("basicFor");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const group = groups[selected];

  const handleSelect = (key: LoopTab) => {
    setSelected(key);
    setOutputLines(null);
    setActiveStep(null);
    setAnimating(false);
  };

  const runCycleAnimation = async () => {
    setAnimating(true);
    // init runs once
    setActiveStep(0);
    await new Promise((r) => setTimeout(r, 700));
    // then condition -> body -> update for a few iterations
    for (let iter = 0; iter < 3; iter++) {
      for (let s = 1; s <= 3; s++) {
        setActiveStep(s);
        await new Promise((r) => setTimeout(r, 700));
      }
    }
    // final condition check (fails)
    setActiveStep(1);
    await new Promise((r) => setTimeout(r, 700));
    setActiveStep(null);
    setAnimating(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">for Loop</CardTitle>
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
                  loop
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

            {/* Visual breakdown for Basic for */}
            {selected === "basicFor" && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Execution Cycle
                </p>
                <div className="rounded-xl border bg-muted/20 px-4 py-5">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {cycleSteps.map((step, idx) => (
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
                        {idx < cycleSteps.length - 1 && (
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
                    {/* Arrow from update back to condition */}
                    <motion.span
                      animate={{
                        color:
                          activeStep === 3
                            ? "rgb(59,130,246)"
                            : "rgb(161,161,170)",
                      }}
                      className="text-lg font-bold select-none"
                    >
                      ↩
                    </motion.span>
                    <span className="text-[10px] text-muted-foreground italic">
                      repeat from condition
                    </span>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={animating}
                      onClick={runCycleAnimation}
                    >
                      <Play className="h-3.5 w-3.5 mr-1" />
                      {animating ? "Animating..." : "Animate Cycle"}
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
            Comparison
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Type</span>
              <span>Iterates</span>
              <span>Best For</span>
              <span>Example</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.type}
                className="grid grid-cols-4 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.type}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.iterates}</span>
                <span className="text-[11px] text-muted-foreground">{row.bestFor}</span>
                <code className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                  {row.example}
                </code>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
