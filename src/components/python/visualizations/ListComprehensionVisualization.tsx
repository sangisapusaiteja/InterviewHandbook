"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
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

// ─── Pipeline ─────────────────────────────────────────────────────────────────
function Pipeline({ steps }: Readonly<{ steps: { label: string; value: string }[] }>) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 py-2">
      {steps.map((step, idx) => (
        <div key={`pipe-${idx}-${step.label}`} className="flex items-center gap-1.5">
          {idx > 0 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
          <div className="rounded-lg border bg-muted/40 px-2.5 py-1.5 text-center">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{step.label}</p>
            <p className="text-xs font-mono font-bold">{step.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── types ────────────────────────────────────────────────────────────────────
type TopicKey = "basic" | "filtering" | "ifelse" | "nested";

interface TopicInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
  pipeline: { label: string; value: string }[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  basic: {
    label: "Basic Syntax",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "A list comprehension creates a new list by applying an expression to each item in an iterable. The syntax is [expression for variable in iterable]. It replaces multi-line for-loop patterns with a single readable line.",
    codeSnippet: `# Basic list comprehension — square numbers
squares = [x**2 for x in range(6)]
print(f"Squares: {squares}")

# Breakdown:
#   expression : x**2        (what to produce)
#   for clause : for x in    (iteration variable)
#   iterable   : range(6)    (source of items)

# Equivalent for-loop
result = []
for x in range(6):
    result.append(x**2)
print(f"Loop:    {result}")

# More examples
lengths = [len(w) for w in ["hello", "world", "py"]]
print(f"Lengths: {lengths}")

uppers = [s.upper() for s in ["a", "b", "c"]]
print(f"Uppers:  {uppers}")`,
    codeOutput: [
      "Squares: [0, 1, 4, 9, 16, 25]",
      "Loop:    [0, 1, 4, 9, 16, 25]",
      "Lengths: [5, 5, 2]",
      "Uppers:  ['A', 'B', 'C']",
    ],
    pipeline: [
      { label: "Iterable", value: "range(6)" },
      { label: "Variable", value: "x" },
      { label: "Transform", value: "x**2" },
      { label: "Result", value: "[0,1,4,9,16,25]" },
    ],
  },
  filtering: {
    label: "With Filtering",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Add an if clause at the end to filter items. Only elements where the condition is True are included in the result. The syntax is [expression for variable in iterable if condition]. Items that fail the test are skipped entirely.",
    codeSnippet: `# Filter even numbers
evens = [x for x in range(10) if x % 2 == 0]
print(f"Evens: {evens}")

# Filter long words
words = ["hi", "hello", "hey", "howdy", "yo"]
long = [w for w in words if len(w) > 2]
print(f"Long:  {long}")

# Multiple conditions (and)
nums = [x for x in range(20) if x % 2 == 0 if x % 3 == 0]
print(f"Div 2&3: {nums}")

# Filter with transformation
scores = [85, 42, 91, 67, 55, 78]
passing = [s for s in scores if s >= 60]
print(f"Passing: {passing}")`,
    codeOutput: [
      "Evens: [0, 2, 4, 6, 8]",
      "Long:  ['hello', 'hey', 'howdy']",
      "Div 2&3: [0, 6, 12, 18]",
      "Passing: [85, 91, 67, 78]",
    ],
    pipeline: [
      { label: "Iterable", value: "range(10)" },
      { label: "Filter", value: "x % 2 == 0" },
      { label: "Transform", value: "x" },
      { label: "Result", value: "[0,2,4,6,8]" },
    ],
  },
  ifelse: {
    label: "if-else Transform",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "When if-else appears before the for keyword, it is a conditional expression (ternary), not a filter. Every item is included in the output, but the value is chosen based on the condition. Syntax: [A if cond else B for x in iterable].",
    codeSnippet: `# Label even/odd
labels = ["even" if x % 2 == 0 else "odd" for x in range(5)]
print(f"Labels: {labels}")

# Pass or fail
scores = [85, 42, 91, 55, 78]
grades = ["pass" if s >= 60 else "fail" for s in scores]
print(f"Grades: {grades}")

# Clamp values to a range
nums = [3, -1, 7, 15, -4, 10]
clamped = [min(max(n, 0), 10) for n in nums]
print(f"Clamped: {clamped}")

# Replace negatives with 0
data = [4, -2, 7, -5, 3]
clean = [x if x >= 0 else 0 for x in data]
print(f"Clean: {clean}")`,
    codeOutput: [
      "Labels: ['even', 'odd', 'even', 'odd', 'even']",
      "Grades: ['pass', 'fail', 'pass', 'fail', 'pass']",
      "Clamped: [3, 0, 7, 10, 0, 10]",
      "Clean: [4, 0, 7, 0, 3]",
    ],
    pipeline: [
      { label: "Iterable", value: "range(5)" },
      { label: "Condition", value: "x % 2 == 0" },
      { label: "True/False", value: '"even" / "odd"' },
      { label: "Result", value: '["even","odd",...]' },
    ],
  },
  nested: {
    label: "Nested & Flatten",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Nested list comprehensions use multiple for clauses. The outer loop comes first, then the inner loop. This is ideal for flattening 2D lists or creating grid structures like coordinate pairs.",
    codeSnippet: `# Flatten a 2D list
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [x for row in matrix for x in row]
print(f"Flat: {flat}")

# Create a grid of coordinates
grid = [(r, c) for r in range(3) for c in range(3)]
print(f"Grid: {grid}")

# Flatten and filter
nested = [[1, -2, 3], [-4, 5], [6, -7]]
pos = [x for row in nested for x in row if x > 0]
print(f"Positive: {pos}")

# Transpose a matrix
mat = [[1, 2, 3],
       [4, 5, 6]]
transposed = [[row[i] for row in mat] for i in range(3)]
print(f"Transposed: {transposed}")`,
    codeOutput: [
      "Flat: [1, 2, 3, 4, 5, 6]",
      "Grid: [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)]",
      "Positive: [1, 3, 5, 6]",
      "Transposed: [[1, 4], [2, 5], [3, 6]]",
    ],
    pipeline: [
      { label: "Outer", value: "for row in matrix" },
      { label: "Inner", value: "for x in row" },
      { label: "Transform", value: "x" },
      { label: "Result", value: "[1,2,3,4,5,6]" },
    ],
  },
};

const order: TopicKey[] = ["basic", "filtering", "ifelse", "nested"];

const chipColors: Record<TopicKey, string> = {
  basic: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  filtering: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  ifelse: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  nested: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function ListComprehensionVisualization() {
  const [selected, setSelected] = useState<TopicKey>("basic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">List Comprehension</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Topic selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const chipColor = chipColors[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? chipColor + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {topics[key].label}
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
                  comprehension
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Visual pipeline */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">Pipeline</p>
              <Pipeline steps={topic.pipeline} />
            </div>

            {/* Code + Output */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                  {topic.codeSnippet}
                </pre>
              </div>
              <Button size="sm" onClick={() => setOutputLines(topic.codeOutput)}>
                <Play className="h-3.5 w-3.5 mr-1" /> Run
              </Button>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
