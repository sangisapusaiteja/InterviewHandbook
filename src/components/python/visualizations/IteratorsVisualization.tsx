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
type TopicKey = "iterator-protocol" | "custom-iterator" | "itertools" | "lazy-eval";

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
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  "iterator-protocol": {
    label: "Iterator Protocol",
    subtitle: "__iter__, __next__ & StopIteration",
    color: "bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    badgeLabel: "protocol",
    description:
      "Python's iterator protocol requires two methods: __iter__() returns the iterator object itself, and __next__() returns the next value or raises StopIteration when exhausted. The built-in iter() and next() functions call these methods under the hood, and for-loops use the protocol automatically.",
    keyPoints: [
      "__iter__() returns the iterator object itself",
      "__next__() returns the next item in the sequence",
      "StopIteration signals the end of iteration",
      "iter() and next() are built-in wrappers for the protocol",
    ],
    codeSnippet: `# Using iter() and next() on a list
nums = [10, 20, 30]
it = iter(nums)

print(next(it))   # 10
print(next(it))   # 20
print(next(it))   # 30

# StopIteration when exhausted
try:
    next(it)
except StopIteration:
    print("Iterator exhausted!")

# Strings are iterable too
s = "Hi"
char_it = iter(s)
print(next(char_it))  # H
print(next(char_it))  # i`,
    codeOutput: [
      "10",
      "20",
      "30",
      "Iterator exhausted!",
      "H",
      "i",
    ],
  },
  "custom-iterator": {
    label: "Custom Iterator",
    subtitle: "Class-based Iterator Pattern",
    color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    badgeLabel: "class",
    description:
      "You can build custom iterators by defining a class with __iter__() and __next__() methods. The class maintains internal state to track the current position. A countdown example shows how the iterator yields values in reverse order and raises StopIteration when the count reaches zero.",
    keyPoints: [
      "Define __iter__() to return self",
      "Define __next__() with state logic and StopIteration",
      "Internal state tracks current position between calls",
      "Works seamlessly with for-loops and other iteration tools",
    ],
    codeSnippet: `class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        val = self.current
        self.current -= 1
        return val

# Use in a for-loop
for num in Countdown(5):
    print(num, end=" ")
print()

# Manual iteration
cd = Countdown(3)
print(next(cd))  # 3
print(next(cd))  # 2
print(next(cd))  # 1`,
    codeOutput: [
      "5 4 3 2 1",
      "3",
      "2",
      "1",
    ],
  },
  itertools: {
    label: "Itertools",
    subtitle: "chain, cycle, islice & more",
    color: "bg-violet-500/15 border-violet-500/30 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    badgeLabel: "itertools",
    description:
      "The itertools module provides powerful, memory-efficient tools for working with iterators. chain() concatenates multiple iterables, cycle() repeats endlessly, islice() slices iterators without converting to a list, and takewhile()/dropwhile() filter based on a predicate.",
    keyPoints: [
      "chain() concatenates multiple iterables into one",
      "cycle() repeats an iterable endlessly",
      "islice() slices an iterator lazily (start, stop, step)",
      "takewhile() / dropwhile() filter with a predicate",
    ],
    codeSnippet: `from itertools import chain, cycle, islice
from itertools import takewhile, dropwhile

# chain: merge multiple iterables
merged = list(chain([1, 2], [3, 4], [5]))
print("chain:", merged)

# cycle + islice: take first 7 from cycle
sevens = list(islice(cycle(["A", "B", "C"]), 7))
print("cycle+islice:", sevens)

# islice on range
sliced = list(islice(range(100), 5, 15, 3))
print("islice(range):", sliced)

# takewhile / dropwhile
nums = [2, 4, 6, 7, 8, 10]
tw = list(takewhile(lambda x: x % 2 == 0, nums))
dw = list(dropwhile(lambda x: x % 2 == 0, nums))
print("takewhile even:", tw)
print("dropwhile even:", dw)`,
    codeOutput: [
      "chain: [1, 2, 3, 4, 5]",
      "cycle+islice: ['A', 'B', 'C', 'A', 'B', 'C', 'A']",
      "islice(range): [5, 8, 11, 14]",
      "takewhile even: [2, 4, 6]",
      "dropwhile even: [7, 8, 10]",
    ],
  },
  "lazy-eval": {
    label: "Lazy Evaluation",
    subtitle: "Memory Efficiency & One-Pass",
    color: "bg-orange-500/15 border-orange-500/30 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    badgeLabel: "lazy",
    description:
      "Iterators use lazy evaluation: values are computed one at a time on demand rather than stored in memory all at once. This makes them ideal for large datasets. Unlike lists, iterators are single-pass — once consumed, they cannot be restarted. Comparing iter vs list shows the memory trade-off.",
    keyPoints: [
      "Values computed on demand, not stored in memory",
      "Single-pass: once exhausted, must create a new iterator",
      "Generators are the most common lazy iterator in Python",
      "sys.getsizeof shows memory difference vs lists",
    ],
    codeSnippet: `import sys

# List vs iterator memory comparison
big_list = list(range(1_000_000))
big_iter = iter(range(1_000_000))

list_size = sys.getsizeof(big_list)
iter_size = sys.getsizeof(big_iter)
print(f"List size: \${list_size:,} bytes")
print(f"Iter size: \${iter_size:,} bytes")
print(f"Ratio: \${list_size // iter_size}x smaller")

# One-pass demonstration
nums = iter([1, 2, 3])
print("Sum:", sum(nums))  # consumes all
print("Sum again:", sum(nums))  # empty!

# Generator expression (lazy)
squares = (x**2 for x in range(5))
print("Type:", type(squares).__name__)
for val in squares:
    print(val, end=" ")
print()`,
    codeOutput: [
      "List size: 8,448,728 bytes",
      "Iter size: 48 bytes",
      "Ratio: 176000x smaller",
      "Sum: 6",
      "Sum again: 0",
      "Type: generator",
      "0 1 4 9 16",
    ],
  },
};

const order: TopicKey[] = ["iterator-protocol", "custom-iterator", "itertools", "lazy-eval"];

const chipColors: Record<TopicKey, string> = {
  "iterator-protocol": "bg-blue-500/15 border-blue-500/30 text-blue-400",
  "custom-iterator": "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  itertools: "bg-violet-500/15 border-violet-500/30 text-violet-400",
  "lazy-eval": "bg-orange-500/15 border-orange-500/30 text-orange-400",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function IteratorsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("iterator-protocol");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Iterators</CardTitle>
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
