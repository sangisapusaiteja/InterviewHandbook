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
          {lines.map((line, idx) => (
            <p key={`${idx}-${line}`} className="text-emerald-400">
              <span className="text-zinc-500 select-none mr-2">&gt;&gt;&gt;</span>
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
type TopicKey = "map" | "filter" | "reduce" | "comprehensions";

interface TopicInfo {
  label: string;
  subtitle: string;
  color: string;
  badgeColor: string;
  badgeLabel: string;
  description: string;
  keyPoints: string[];
  codeSnippet: string;
  codeOutput: string[];
  pipelineSteps: { label: string; data: string }[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  map: {
    label: "map()",
    subtitle: "Transform Every Element",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    badgeLabel: "transform",
    description:
      "map(func, iterable) applies a function to every element of an iterable and returns a lazy map object. You can pass a lambda, a built-in, or a named function. Wrap the result in list() to materialise it.",
    keyPoints: [
      "Returns a lazy iterator (map object)",
      "Works with lambda and named functions",
      "Can map over multiple iterables at once",
      "Equivalent to [func(x) for x in iterable]",
    ],
    codeSnippet: `nums = [1, 2, 3, 4, 5]

# Using a named function
def square(x):
    return x ** 2

squared = list(map(square, nums))
print("squared:", squared)

# Using a lambda
doubled = list(map(lambda x: x * 2, nums))
print("doubled:", doubled)

# map with built-in function
words = ["hello", "world"]
upper = list(map(str.upper, words))
print("upper:", upper)`,
    codeOutput: [
      "squared: [1, 4, 9, 16, 25]",
      "doubled: [2, 4, 6, 8, 10]",
      "upper: ['HELLO', 'WORLD']",
    ],
    pipelineSteps: [
      { label: "Input", data: "[1, 2, 3, 4, 5]" },
      { label: "map(square)", data: "square each x" },
      { label: "Output", data: "[1, 4, 9, 16, 25]" },
    ],
  },
  filter: {
    label: "filter()",
    subtitle: "Keep Matching Elements",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    badgeLabel: "select",
    description:
      "filter(func, iterable) keeps only elements for which func returns True. Pass None as the function to filter out falsy values (0, '', None, False, []).",
    keyPoints: [
      "Returns a lazy iterator (filter object)",
      "func must return True/False",
      "filter(None, iterable) removes falsy values",
      "Equivalent to [x for x in iterable if func(x)]",
    ],
    codeSnippet: `nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Keep only even numbers
evens = list(filter(lambda x: x % 2 == 0, nums))
print("evens:", evens)

# Named function
def is_positive(x):
    return x > 0

mixed = [-3, -1, 0, 2, 5]
positives = list(filter(is_positive, mixed))
print("positives:", positives)

# filter(None, ...) removes falsy values
data = [0, "", "hi", None, 42, [], "ok"]
truthy = list(filter(None, data))
print("truthy:", truthy)`,
    codeOutput: [
      "evens: [2, 4, 6, 8, 10]",
      "positives: [2, 5]",
      "truthy: ['hi', 42, 'ok']",
    ],
    pipelineSteps: [
      { label: "Input", data: "[1, 2, 3, ..., 10]" },
      { label: "filter(is_even)", data: "keep if x%2==0" },
      { label: "Output", data: "[2, 4, 6, 8, 10]" },
    ],
  },
  reduce: {
    label: "reduce()",
    subtitle: "Accumulate to Single Value",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    badgeLabel: "accumulate",
    description:
      "functools.reduce(func, iterable[, initializer]) applies a two-argument function cumulatively, reducing the iterable to a single value. Common uses include computing sums, products, and flattening nested lists.",
    keyPoints: [
      "Must import from functools",
      "func takes (accumulator, current_item)",
      "Optional third arg sets the initial value",
      "Use for sum, product, flatten, and more",
    ],
    codeSnippet: `from functools import reduce

nums = [1, 2, 3, 4, 5]

# Sum all numbers
total = reduce(lambda acc, x: acc + x, nums)
print("sum:", total)

# Product of all numbers
product = reduce(lambda acc, x: acc * x, nums)
print("product:", product)

# Flatten nested lists
nested = [[1, 2], [3, 4], [5]]
flat = reduce(lambda acc, x: acc + x, nested)
print("flattened:", flat)

# With initializer
total_100 = reduce(lambda acc, x: acc + x, nums, 100)
print("sum from 100:", total_100)`,
    codeOutput: [
      "sum: 15",
      "product: 120",
      "flattened: [1, 2, 3, 4, 5]",
      "sum from 100: 115",
    ],
    pipelineSteps: [
      { label: "Input", data: "[1, 2, 3, 4, 5]" },
      { label: "reduce(+)", data: "1+2=3, 3+3=6, 6+4=10" },
      { label: "Output", data: "15" },
    ],
  },
  comprehensions: {
    label: "vs Comprehensions",
    subtitle: "Side-by-Side Comparison",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    badgeLabel: "comparison",
    description:
      "List comprehensions can replace map() and filter() in most cases and are considered more Pythonic. However, map/filter shine when you already have a named function and want to avoid a lambda. reduce() has no direct comprehension equivalent.",
    keyPoints: [
      "Comprehensions are generally more readable",
      "map(func, lst) is cleaner than [func(x) for x in lst] when func exists",
      "filter + map in one comprehension: [f(x) for x in lst if cond(x)]",
      "reduce() has no comprehension equivalent — use a loop or built-in",
    ],
    codeSnippet: `nums = [1, 2, 3, 4, 5, 6, 7, 8]

# map vs comprehension
m = list(map(lambda x: x ** 2, nums))
c = [x ** 2 for x in nums]
print("map:", m)
print("comp:", c)

# filter vs comprehension
m2 = list(filter(lambda x: x > 4, nums))
c2 = [x for x in nums if x > 4]
print("filter:", m2)
print("comp:", c2)

# Combined filter + map
m3 = list(map(lambda x: x**2, filter(lambda x: x%2==0, nums)))
c3 = [x ** 2 for x in nums if x % 2 == 0]
print("chained:", m3)
print("comp:", c3)`,
    codeOutput: [
      "map: [1, 4, 9, 16, 25, 36, 49, 64]",
      "comp: [1, 4, 9, 16, 25, 36, 49, 64]",
      "filter: [5, 6, 7, 8]",
      "comp: [5, 6, 7, 8]",
      "chained: [4, 16, 36, 64]",
      "comp: [4, 16, 36, 64]",
    ],
    pipelineSteps: [
      { label: "Input", data: "[1, 2, ..., 8]" },
      { label: "filter(even)", data: "[2, 4, 6, 8]" },
      { label: "map(square)", data: "[4, 16, 36, 64]" },
    ],
  },
};

const order: TopicKey[] = ["map", "filter", "reduce", "comprehensions"];

const chipColors: Record<TopicKey, string> = {
  map: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  filter: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  reduce: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  comprehensions: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Pipeline Diagram ─────────────────────────────────────────────────────────
function PipelineDiagram({
  steps,
  color,
}: Readonly<{ steps: { label: string; data: string }[]; color: string }>) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground">Data Flow Pipeline</p>
      <div className="flex items-center gap-0 overflow-x-auto">
        {steps.map((step, idx) => (
          <div key={`pipeline-${step.label}-${idx}`} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.12 }}
              className={`rounded-xl border px-3 py-2 text-center min-w-[110px] ${
                idx === 0 || idx === steps.length - 1
                  ? "bg-muted/30 border-border"
                  : `${color}`
              }`}
            >
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                {step.label}
              </p>
              <p className="text-xs font-mono mt-0.5">{step.data}</p>
            </motion.div>
            {idx < steps.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.12 + 0.06 }}
                className="text-muted-foreground text-lg mx-1 select-none"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function MapFilterReduceVisualization() {
  const [selected, setSelected] = useState<TopicKey>("map");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python map() filter() reduce()</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Topic selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const t = topics[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  selected === key
                    ? chipColors[key] + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.label} — {t.subtitle}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${topic.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{topic.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${topic.badgeColor}`}>
                  {topic.badgeLabel}
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Key points */}
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground">Key Points</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {topic.keyPoints.map((point) => (
                  <li
                    key={`kp-${selected}-${point}`}
                    className="text-xs text-muted-foreground flex items-start gap-1.5"
                  >
                    <span className="text-emerald-500 mt-0.5 select-none">*</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pipeline diagram */}
            <PipelineDiagram steps={topic.pipelineSteps} color={topic.color} />

            {/* Two-column: Code | Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Code snippet */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {topic.codeSnippet}
                  </pre>
                </div>
              </div>

              {/* Right: Run + Output */}
              <div className="space-y-3">
                <Button size="sm" onClick={() => setOutputLines(topic.codeOutput)}>
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
