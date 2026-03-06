"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Layers, Filter, FoldVertical, Wand2 } from "lucide-react";
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
type TopicKey = "map" | "filter" | "reduce" | "decorators";

interface TopicInfo {
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  map: {
    label: "map()",
    subtitle: "Transform Each Item",
    icon: <Layers className="h-3.5 w-3.5" />,
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "map() applies a function to every item in an iterable and returns a map object (lazy iterator). It is a higher-order function because it takes another function as its first argument. You can pass a built-in, a lambda, or a custom function.",
    codeSnippet: `nums = [1, 2, 3, 4, 5]

# Using a named function
def square(x):
    return x ** 2

squared = list(map(square, nums))
print("squared:", squared)

# Using a lambda
doubled = list(map(lambda x: x * 2, nums))
print("doubled:", doubled)

# Equivalent list comprehension
comp = [x ** 2 for x in nums]
print("comprehension:", comp)`,
    codeOutput: [
      "squared: [1, 4, 9, 16, 25]",
      "doubled: [2, 4, 6, 8, 10]",
      "comprehension: [1, 4, 9, 16, 25]",
    ],
  },
  filter: {
    label: "filter()",
    subtitle: "Keep Matching Items",
    icon: <Filter className="h-3.5 w-3.5" />,
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "filter() takes a function that returns True or False and an iterable. It keeps only the items for which the function returns True. Like map(), it returns a lazy iterator. You can replicate filter() with a list comprehension using an if clause.",
    codeSnippet: `nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Keep only even numbers
def is_even(x):
    return x % 2 == 0

evens = list(filter(is_even, nums))
print("evens:", evens)

# Lambda version
odds = list(filter(lambda x: x % 2 != 0, nums))
print("odds:", odds)

# Equivalent list comprehension
comp = [x for x in nums if x % 2 == 0]
print("comprehension:", comp)`,
    codeOutput: [
      "evens: [2, 4, 6, 8, 10]",
      "odds: [1, 3, 5, 7, 9]",
      "comprehension: [2, 4, 6, 8, 10]",
    ],
  },
  reduce: {
    label: "reduce()",
    subtitle: "Accumulate a Result",
    icon: <FoldVertical className="h-3.5 w-3.5" />,
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "reduce() from the functools module applies a two-argument function cumulatively to the items of an iterable, reducing it to a single value. The first call uses items 0 and 1, then the result is combined with item 2, and so on. An optional initializer can be provided as a third argument.",
    codeSnippet: `from functools import reduce

nums = [1, 2, 3, 4, 5]

# Sum all numbers
total = reduce(lambda acc, x: acc + x, nums)
print("sum:", total)

# Product of all numbers
product = reduce(lambda acc, x: acc * x, nums)
print("product:", product)

# Find maximum value
maximum = reduce(lambda a, b: a if a > b else b, nums)
print("max:", maximum)

# With an initializer (starting value)
total_100 = reduce(lambda acc, x: acc + x, nums, 100)
print("sum starting at 100:", total_100)`,
    codeOutput: [
      "sum: 15",
      "product: 120",
      "max: 5",
      "sum starting at 100: 115",
    ],
  },
  decorators: {
    label: "Decorators",
    subtitle: "Wrap a Function",
    icon: <Wand2 className="h-3.5 w-3.5" />,
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "A decorator is a higher-order function that takes a function as input and returns a new function that usually extends the original behavior. The @decorator syntax is syntactic sugar for wrapping. Decorators are widely used for logging, access control, caching, and more.",
    codeSnippet: `def log_call(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}({args})")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

@log_call
def add(a, b):
    return a + b

@log_call
def greet(name):
    return f"Hello, {name}!"

add(3, 5)
greet("Alice")`,
    codeOutput: [
      "Calling add((3, 5))",
      "add returned 8",
      "Calling greet(('Alice',))",
      "greet returned Hello, Alice!",
    ],
  },
};

const order: TopicKey[] = ["map", "filter", "reduce", "decorators"];

const chipColors: Record<TopicKey, string> = {
  map: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  filter: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  reduce: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  decorators: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Comparison Table ─────────────────────────────────────────────────────────
function ComparisonTable() {
  const rows = [
    {
      hof: "map(func, lst)",
      comp: "[func(x) for x in lst]",
      note: "Transform each item",
    },
    {
      hof: "filter(func, lst)",
      comp: "[x for x in lst if func(x)]",
      note: "Keep items matching condition",
    },
    {
      hof: "map + filter",
      comp: "[func(x) for x in lst if cond(x)]",
      note: "Transform + filter in one pass",
    },
  ];

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground">
        map/filter vs List Comprehensions
      </p>
      <div className="rounded-xl border bg-muted/20 overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="px-3 py-2 text-left font-semibold text-muted-foreground">
                Higher-Order Function
              </th>
              <th className="px-3 py-2 text-left font-semibold text-muted-foreground">
                List Comprehension
              </th>
              <th className="px-3 py-2 text-left font-semibold text-muted-foreground">
                Purpose
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.hof} className="border-b last:border-b-0">
                <td className="px-3 py-2 font-mono text-violet-600 dark:text-violet-400">
                  {row.hof}
                </td>
                <td className="px-3 py-2 font-mono text-blue-600 dark:text-blue-400">
                  {row.comp}
                </td>
                <td className="px-3 py-2 text-muted-foreground">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-muted-foreground opacity-70">
        List comprehensions are generally preferred in Python for readability, but map/filter are
        useful when passing existing functions without lambdas.
      </p>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function HigherOrderFunctionsVisualization() {
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
        <CardTitle className="text-lg">Python Higher-Order Functions</CardTitle>
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
                {t.icon}
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
                  higher-order
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

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

            {/* Comparison table (shown for map, filter, reduce) */}
            {(selected === "map" || selected === "filter" || selected === "reduce") && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <ComparisonTable />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
