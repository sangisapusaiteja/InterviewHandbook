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

// ─── EnumerateDiagram ─────────────────────────────────────────────────────────
function EnumerateDiagram({ items, startIndex }: Readonly<{ items: string[]; startIndex: number }>) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground">
        How enumerate() wraps an iterable with index numbers
      </p>
      <div className="flex flex-wrap items-start gap-3">
        {/* Original iterable */}
        <div className="rounded-lg border bg-muted/40 px-3 py-2 text-center">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            Iterable
          </p>
          <div className="flex gap-1">
            {items.map((item, idx) => (
              <span
                key={`iter-${idx}-${item}`}
                className="rounded border bg-background px-2 py-0.5 text-xs font-mono"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center self-center text-muted-foreground font-bold text-lg">
          →
        </div>

        {/* enumerate wraps */}
        <div className="rounded-lg border bg-violet-500/10 px-3 py-2 text-center">
          <p className="text-[10px] font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wide mb-1">
            enumerate()
          </p>
          <div className="flex gap-1">
            {items.map((item, idx) => (
              <span
                key={`enum-${idx}-${item}`}
                className="rounded border border-violet-500/30 bg-background px-2 py-0.5 text-xs font-mono"
              >
                <span className="text-blue-600 dark:text-blue-400 font-bold">{startIndex + idx}</span>
                <span className="text-muted-foreground">,</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── types ────────────────────────────────────────────────────────────────────
type TopicKey = "basic" | "custom_start" | "patterns" | "vs_range";

interface TopicInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
  keyPoints: string[];
  diagramItems: string[];
  diagramStart: number;
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  basic: {
    label: "Basic Usage",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "enumerate() wraps any iterable and yields (index, item) tuples. Instead of tracking a counter manually or using range(len()), you get both the index and value directly in the for loop. The default starting index is 0.",
    codeSnippet: `# Basic enumerate usage
fruits = ["apple", "banana", "cherry"]
for i, item in enumerate(fruits):
    print(f"{i}: {item}")

# Without enumerate (old way)
# for i in range(len(fruits)):
#     print(f"{i}: {fruits[i]}")

# enumerate returns tuples
print(list(enumerate(fruits)))`,
    codeOutput: [
      "0: apple",
      "1: banana",
      "2: cherry",
      "[(0, 'apple'), (1, 'banana'), (2, 'cherry')]",
    ],
    keyPoints: [
      "Returns (index, value) tuples from any iterable",
      "Replaces manual counter variables and range(len())",
      "Default start index is 0",
      "Use tuple unpacking: for i, item in enumerate()",
    ],
    diagramItems: ['"apple"', '"banana"', '"cherry"'],
    diagramStart: 0,
  },
  custom_start: {
    label: "Custom Start",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Pass a second argument to enumerate() to set the starting index. This is especially useful for 1-based numbering in menus, reports, or any user-facing output where counting from 1 is more natural than counting from 0.",
    codeSnippet: `# 1-based numbering for a menu
menu = ["Pizza", "Burger", "Salad", "Pasta"]
print("--- Menu ---")
for num, dish in enumerate(menu, start=1):
    print(f"  {num}. {dish}")

# Numbering lines in a file (1-based)
lines = ["import os", "import sys", "print('hi')"]
for line_no, text in enumerate(lines, start=1):
    print(f"Line {line_no}: {text}")`,
    codeOutput: [
      "--- Menu ---",
      "  1. Pizza",
      "  2. Burger",
      "  3. Salad",
      "  4. Pasta",
      "Line 1: import os",
      "Line 2: import sys",
      "Line 3: print('hi')",
    ],
    keyPoints: [
      "enumerate(iterable, start=1) begins counting at 1",
      "Perfect for numbered menus and user-facing lists",
      "Line numbering in files typically starts at 1",
      "The start value can be any integer, not just 0 or 1",
    ],
    diagramItems: ['"Pizza"', '"Burger"', '"Salad"', '"Pasta"'],
    diagramStart: 1,
  },
  patterns: {
    label: "Practical Patterns",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "enumerate() shines in real-world patterns like finding indices of matching items, building index-to-value dictionaries, and tracking positions during iteration. These patterns are cleaner and more Pythonic than manual index management.",
    codeSnippet: `# Find indices of matching items
scores = [85, 42, 91, 67, 55, 78]
high = [i for i, s in enumerate(scores) if s >= 80]
print(f"High score indices: {high}")

# Create index -> value dictionary
colors = ["red", "green", "blue"]
color_map = {i: c for i, c in enumerate(colors)}
print(f"Color map: {color_map}")

# Track position of first match
names = ["Alice", "Bob", "Charlie", "Bob"]
for idx, name in enumerate(names):
    if name == "Bob":
        print(f"First 'Bob' at index {idx}")
        break`,
    codeOutput: [
      "High score indices: [0, 2]",
      "Color map: {0: 'red', 1: 'green', 2: 'blue'}",
      "First 'Bob' at index 1",
    ],
    keyPoints: [
      "List comprehension with enumerate to find matching indices",
      "Dict comprehension with enumerate for index-based mapping",
      "Combine with break to find first occurrence position",
      "Works with any iterable: lists, strings, tuples, generators",
    ],
    diagramItems: ["85", "42", "91", "67", "55", "78"],
    diagramStart: 0,
  },
  vs_range: {
    label: "vs range(len())",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "enumerate() is almost always preferred over range(len()) when you need both index and value. It is more readable, less error-prone, and works with any iterable — not just sequences. Use range(len()) only when you need the index alone or must modify the list in-place.",
    codeSnippet: `# ─── Side-by-side comparison ───
items = ["x", "y", "z"]

# Pythonic: enumerate
print("enumerate:")
for i, val in enumerate(items):
    print(f"  {i} -> {val}")

# Less ideal: range(len())
print("range(len()):")
for i in range(len(items)):
    print(f"  {i} -> {items[i]}")

# When range(len()) IS appropriate:
# Modifying list in-place
nums = [1, 2, 3, 4, 5]
for i in range(len(nums)):
    nums[i] *= 2
print(f"Doubled in-place: {nums}")`,
    codeOutput: [
      "enumerate:",
      "  0 -> x",
      "  1 -> y",
      "  2 -> z",
      "range(len()):",
      "  0 -> x",
      "  1 -> y",
      "  2 -> z",
      "Doubled in-place: [2, 4, 6, 8, 10]",
    ],
    keyPoints: [
      "enumerate() is cleaner when you need index + value",
      "range(len()) requires indexing: items[i] — more verbose",
      "enumerate() works on any iterable, range(len()) needs len()",
      "Use range(len()) when modifying the list in-place by index",
    ],
    diagramItems: ['"x"', '"y"', '"z"'],
    diagramStart: 0,
  },
};

const order: TopicKey[] = ["basic", "custom_start", "patterns", "vs_range"];

const chipColors: Record<TopicKey, string> = {
  basic: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  custom_start: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  patterns: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  vs_range: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function EnumerateVisualization() {
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
        <CardTitle className="text-lg">enumerate()</CardTitle>
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
                  enumerate
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Visual diagram */}
            <EnumerateDiagram items={topic.diagramItems} startIndex={topic.diagramStart} />

            {/* Key Points */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">Key Points</p>
              <ul className="space-y-1">
                {topic.keyPoints.map((point, idx) => (
                  <li key={`kp-${selected}-${idx}`} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-emerald-500 mt-0.5 shrink-0">*</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
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
