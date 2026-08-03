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
type ArrayTab = "map" | "filter" | "reduce" | "chaining";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<ArrayTab, TabInfo> = {
  map: {
    label: "map()",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "map() creates a new array by calling a function on every element of the original array. It always returns an array of the same length -- each element is transformed one-to-one.",
    codeSnippet: `const prices = [10, 20, 30, 40, 50];

// Add 18% tax to each price
const withTax = prices.map(p => +(p * 1.18).toFixed(2));

console.log("Original:", prices);
console.log("With tax:", withTax);
console.log("Length same?", prices.length === withTax.length);`,
    codeOutput: [
      "Original: [10, 20, 30, 40, 50]",
      "With tax: [11.8, 23.6, 35.4, 47.2, 59]",
      "Length same? true",
    ],
  },
  filter: {
    label: "filter()",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "filter() creates a new array with only the elements that pass a test (return true from the callback). The original array is unchanged, and the result may be shorter.",
    codeSnippet: `const scores = [45, 82, 91, 33, 76, 58, 97];

const passed = scores.filter(s => s >= 60);
const failed = scores.filter(s => s < 60);

console.log("All:   ", scores);
console.log("Passed:", passed);
console.log("Failed:", failed);`,
    codeOutput: [
      "All:    [45, 82, 91, 33, 76, 58, 97]",
      "Passed: [82, 91, 76, 97]",
      "Failed: [45, 33, 58]",
    ],
  },
  reduce: {
    label: "reduce()",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "reduce() iterates over an array and accumulates elements into a single value. The accumulator carries the running result, and the callback defines how each element is folded in.",
    codeSnippet: `const nums = [5, 10, 15, 20];

const sum = nums.reduce((acc, n) => acc + n, 0);
const max = nums.reduce((acc, n) => Math.max(acc, n), -Infinity);
const product = nums.reduce((acc, n) => acc * n, 1);

console.log("Sum:    ", sum);
console.log("Max:    ", max);
console.log("Product:", product);`,
    codeOutput: [
      "Sum:     50",
      "Max:     20",
      "Product: 15000",
    ],
  },
  chaining: {
    label: "Chaining",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Chain .filter().map().reduce() to build a data pipeline. A classic interview pattern: given a shopping cart, compute the total of discounted items only.",
    codeSnippet: `const cart = [
  { name: "Shirt",  price: 30, onSale: true  },
  { name: "Pants",  price: 50, onSale: false },
  { name: "Hat",    price: 15, onSale: true  },
  { name: "Jacket", price: 90, onSale: true  },
];

const saleTotal = cart
  .filter(item => item.onSale)          // keep sale items
  .map(item => item.price * 0.8)        // apply 20% discount
  .reduce((sum, price) => sum + price, 0); // total

console.log("Sale total: $" + saleTotal);`,
    codeOutput: [
      "Sale total: $108",
    ],
  },
};

const order: ArrayTab[] = ["map", "filter", "reduce", "chaining"];

// ─── Visual: map() ───────────────────────────────────────────────────────────
function MapVisual() {
  const input = [10, 20, 30, 40, 50];
  const [animated, setAnimated] = useState(false);
  const [step, setStep] = useState(-1);

  const animate = async () => {
    setAnimated(false);
    setStep(-1);
    await new Promise<void>((r) => setTimeout(r, 100));
    setAnimated(true);
    for (let i = 0; i < input.length; i++) {
      setStep(i);
      await new Promise<void>((r) => setTimeout(r, 500));
    }
  };

  return (
    <div className="space-y-3">
      <Button size="sm" onClick={animate}>
        <Play className="h-3.5 w-3.5 mr-1" /> Transform
      </Button>

      <div className="rounded-xl border bg-muted/20 p-4 space-y-3 min-h-[160px]">
        {/* Input row */}
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">Input Array</p>
          <div className="flex gap-1.5">
            {input.map((n, i) => (
              <motion.div
                key={n}
                animate={{
                  scale: animated && step === i ? 1.15 : 1,
                  borderColor: animated && step === i ? "rgb(59,130,246)" : undefined,
                }}
                className="w-12 h-10 rounded-lg border bg-blue-500/15 border-blue-400/40 flex items-center justify-center text-xs font-mono font-bold text-blue-700 dark:text-blue-300"
              >
                {n}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        {animated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground text-lg"
          >
            ↓ <span className="text-xs font-mono">p =&gt; +(p * 1.18).toFixed(2)</span>
          </motion.div>
        )}

        {/* Output row */}
        {animated && (
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">Output Array (same length)</p>
            <div className="flex gap-1.5">
              {input.map((n, i) => {
                const result = +(n * 1.18).toFixed(2);
                return i <= step ? (
                  <motion.div
                    key={`out-${n}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-12 h-10 rounded-lg border bg-blue-500 text-white flex items-center justify-center text-xs font-mono font-bold shadow-md"
                  >
                    {result}
                  </motion.div>
                ) : (
                  <div
                    key={`ph-${n}`}
                    className="w-12 h-10 rounded-lg border border-dashed border-blue-300/30 flex items-center justify-center text-xs text-muted-foreground"
                  >
                    ?
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!animated && (
          <p className="text-xs text-muted-foreground text-center py-6">
            Click <strong>Transform</strong> to see map() in action
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: filter() ────────────────────────────────────────────────────────
function FilterVisual() {
  const scores = [45, 82, 91, 33, 76, 58, 97];
  const [animated, setAnimated] = useState(false);
  const [checkedIndex, setCheckedIndex] = useState(-1);

  const animate = async () => {
    setAnimated(false);
    setCheckedIndex(-1);
    await new Promise<void>((r) => setTimeout(r, 100));
    setAnimated(true);
    for (let i = 0; i < scores.length; i++) {
      setCheckedIndex(i);
      await new Promise<void>((r) => setTimeout(r, 500));
    }
  };

  return (
    <div className="space-y-3">
      <Button size="sm" onClick={animate}>
        <Play className="h-3.5 w-3.5 mr-1" /> Filter Scores
      </Button>

      <div className="rounded-xl border bg-muted/20 p-4 space-y-3 min-h-[160px]">
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">
            Test: score &gt;= 60
          </p>
          <div className="flex flex-wrap gap-1.5">
            {scores.map((s, i) => {
              const pass = s >= 60;
              const checked = animated && i <= checkedIndex;
              return (
                <motion.div
                  key={s}
                  animate={{
                    opacity: checked ? 1 : animated ? 0.5 : 1,
                    scale: animated && checkedIndex === i ? 1.15 : 1,
                  }}
                  className={`w-12 h-10 rounded-lg border flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                    checked
                      ? pass
                        ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-700 dark:text-emerald-300"
                        : "bg-red-500/15 border-red-400/40 text-red-700 dark:text-red-300 line-through"
                      : "bg-muted/30 border-border text-muted-foreground"
                  }`}
                >
                  {s}
                </motion.div>
              );
            })}
          </div>
        </div>

        {animated && checkedIndex >= scores.length - 1 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <div className="text-center text-muted-foreground text-lg">
              ↓ <span className="text-xs font-mono">keeps only passing elements</span>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">Result (shorter array)</p>
              <div className="flex gap-1.5">
                {scores
                  .filter((s) => s >= 60)
                  .map((s, i) => (
                    <motion.div
                      key={`pass-${s}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.08, duration: 0.2 }}
                      className="w-12 h-10 rounded-lg border bg-emerald-500 text-white flex items-center justify-center text-xs font-mono font-bold shadow-md"
                    >
                      {s}
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}

        {!animated && (
          <p className="text-xs text-muted-foreground text-center py-6">
            Click <strong>Filter Scores</strong> to see which elements pass the test
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: reduce() ────────────────────────────────────────────────────────
function ReduceVisual() {
  const nums = [5, 10, 15, 20];
  const [step, setStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const accValues: number[] = [];
  let running = 0;
  for (const n of nums) {
    running += n;
    accValues.push(running);
  }

  const animate = async () => {
    setIsAnimating(true);
    setStep(-1);
    await new Promise<void>((r) => setTimeout(r, 100));
    for (let i = 0; i < nums.length; i++) {
      setStep(i);
      await new Promise<void>((r) => setTimeout(r, 700));
    }
    setIsAnimating(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={animate} disabled={isAnimating}>
          <Play className="h-3.5 w-3.5 mr-1" /> Reduce Step-by-Step
        </Button>
        {isAnimating && (
          <Badge variant="secondary" className="animate-pulse text-[10px]">
            step {step + 1} / {nums.length}
          </Badge>
        )}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 space-y-2 min-h-[180px]">
        {/* Initial accumulator */}
        {step >= 0 && (
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs font-mono text-muted-foreground mb-2"
          >
            acc starts at <span className="font-bold text-violet-600 dark:text-violet-400">0</span>
          </motion.div>
        )}

        {/* Steps */}
        <AnimatePresence>
          {nums.slice(0, step + 1).map((n, i) => {
            const prevAcc = i === 0 ? 0 : accValues[i - 1];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-mono ${
                  i === step
                    ? "bg-violet-500/15 border-violet-400/40 text-violet-700 dark:text-violet-300"
                    : "bg-muted/30 border-border text-muted-foreground"
                }`}
              >
                <span className="font-bold shrink-0">Step {i + 1}:</span>
                <span>
                  acc({prevAcc}) + {n} = <span className="font-bold">{accValues[i]}</span>
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Final result */}
        {step >= nums.length - 1 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mt-2"
          >
            <span className="text-xs text-muted-foreground">Result:</span>
            <span className="px-4 py-2 rounded-lg bg-violet-500 text-white text-sm font-mono font-bold shadow-md">
              {accValues[accValues.length - 1]}
            </span>
          </motion.div>
        )}

        {step < 0 && !isAnimating && (
          <p className="text-xs text-muted-foreground text-center py-8">
            Click <strong>Reduce Step-by-Step</strong> to trace the accumulator
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: Chaining ────────────────────────────────────────────────────────
function ChainingVisual() {
  const cart = [
    { name: "Shirt", price: 30, onSale: true },
    { name: "Pants", price: 50, onSale: false },
    { name: "Hat", price: 15, onSale: true },
    { name: "Jacket", price: 90, onSale: true },
  ];

  const [stage, setStage] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const filtered = cart.filter((i) => i.onSale);
  const mapped = filtered.map((i) => ({ ...i, discounted: i.price * 0.8 }));
  const total = mapped.reduce((sum, i) => sum + i.discounted, 0);

  const animate = async () => {
    setIsAnimating(true);
    setStage(-1);
    await new Promise<void>((r) => setTimeout(r, 200));
    for (let i = 0; i <= 3; i++) {
      setStage(i);
      await new Promise<void>((r) => setTimeout(r, 900));
    }
    setIsAnimating(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={animate} disabled={isAnimating}>
          <Play className="h-3.5 w-3.5 mr-1" /> Run Pipeline
        </Button>
        {isAnimating && (
          <Badge variant="secondary" className="animate-pulse text-[10px]">
            stage {Math.max(1, stage + 1)} / 4
          </Badge>
        )}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 space-y-3 min-h-[220px]">
        {/* Stage 0: All items */}
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">Cart Items</p>
          <div className="flex flex-wrap gap-1.5">
            {cart.map((item) => {
              const kept = stage >= 1 ? item.onSale : true;
              return (
                <motion.div
                  key={item.name}
                  animate={{
                    opacity: stage >= 1 && !kept ? 0.3 : 1,
                    scale: stage >= 1 && !kept ? 0.9 : 1,
                  }}
                  className={`px-3 py-2 rounded-lg border text-xs font-mono ${
                    stage >= 1 && !kept
                      ? "bg-red-500/10 border-red-400/30 text-red-600 dark:text-red-400 line-through"
                      : stage >= 0
                        ? "bg-orange-500/15 border-orange-400/40 text-orange-700 dark:text-orange-300"
                        : "bg-muted/30 border-border text-muted-foreground"
                  }`}
                >
                  {item.name} ${item.price}
                  {item.onSale && <span className="ml-1 text-[9px] opacity-60">SALE</span>}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stage 1: After filter */}
        {stage >= 1 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-1.5">
            <div className="text-center text-muted-foreground">
              ↓ <span className="text-xs font-mono">.filter(item =&gt; item.onSale)</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {filtered.map((item, i) => (
                <motion.div
                  key={`f-${item.name}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="px-3 py-2 rounded-lg border bg-emerald-500/15 border-emerald-400/40 text-xs font-mono text-emerald-700 dark:text-emerald-300"
                >
                  {item.name} ${item.price}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stage 2: After map */}
        {stage >= 2 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-1.5">
            <div className="text-center text-muted-foreground">
              ↓ <span className="text-xs font-mono">.map(item =&gt; item.price * 0.8)</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {mapped.map((item, i) => (
                <motion.div
                  key={`m-${item.name}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="px-3 py-2 rounded-lg border bg-blue-500/15 border-blue-400/40 text-xs font-mono text-blue-700 dark:text-blue-300"
                >
                  ${item.discounted}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stage 3: After reduce */}
        {stage >= 3 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-1.5">
            <div className="text-center text-muted-foreground">
              ↓ <span className="text-xs font-mono">.reduce((sum, p) =&gt; sum + p, 0)</span>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-block px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-mono font-bold shadow-md"
            >
              Total: ${total}
            </motion.div>
          </motion.div>
        )}

        {stage < 0 && !isAnimating && (
          <p className="text-xs text-muted-foreground text-center py-8">
            Click <strong>Run Pipeline</strong> to trace the chained operations
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────
const comparisonData = [
  {
    method: "map()",
    input: "Array",
    output: "New array (same length)",
    mutates: "No",
    commonUse: "Transform each element",
  },
  {
    method: "filter()",
    input: "Array",
    output: "New array (subset)",
    mutates: "No",
    commonUse: "Select matching elements",
  },
  {
    method: "reduce()",
    input: "Array + initial value",
    output: "Single value (any type)",
    mutates: "No",
    commonUse: "Sum, count, group, flatten",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function ArrayMethodsVisualization() {
  const [selected, setSelected] = useState<ArrayTab>("map");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: ArrayTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Array Methods (map, filter, reduce)</CardTitle>
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
                  array method
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{tab.description}</p>
            </div>

            {/* Two-column: visual | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Visual */}
              <div>
                {selected === "map" && <MapVisual />}
                {selected === "filter" && <FilterVisual />}
                {selected === "reduce" && <ReduceVisual />}
                {selected === "chaining" && <ChainingVisual />}
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
          <h3 className="text-sm font-bold">map vs filter vs reduce</h3>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Method</th>
                  <th className="px-3 py-2 text-left font-semibold">Input</th>
                  <th className="px-3 py-2 text-left font-semibold">Output</th>
                  <th className="px-3 py-2 text-left font-semibold">Mutates?</th>
                  <th className="px-3 py-2 text-left font-semibold">Common Use</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr key={row.method} className="border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="px-3 py-2 font-mono font-bold text-violet-700 dark:text-violet-300">
                      .{row.method}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">{row.input}</td>
                    <td className="px-3 py-2">{row.output}</td>
                    <td className="px-3 py-2 font-semibold">{row.mutates}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.commonUse}</td>
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
