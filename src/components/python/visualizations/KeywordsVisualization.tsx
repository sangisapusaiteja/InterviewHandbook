"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Code2, Grid3X3 } from "lucide-react";
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
type KeywordCategory = "control_flow" | "logical" | "functions" | "error_handling";

interface KeywordRow {
  keyword: string;
  description: string;
  example: string;
}

interface CategoryInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  rows: KeywordRow[];
  codeSnippet: string;
  codeOutput: string[];
}

// ─── All 35 Python keywords ──────────────────────────────────────────────────
const allKeywords: { word: string; category: string }[] = [
  { word: "False", category: "Value" },
  { word: "True", category: "Value" },
  { word: "None", category: "Value" },
  { word: "and", category: "Logical" },
  { word: "or", category: "Logical" },
  { word: "not", category: "Logical" },
  { word: "is", category: "Logical" },
  { word: "in", category: "Logical" },
  { word: "if", category: "Control Flow" },
  { word: "elif", category: "Control Flow" },
  { word: "else", category: "Control Flow" },
  { word: "for", category: "Control Flow" },
  { word: "while", category: "Control Flow" },
  { word: "break", category: "Control Flow" },
  { word: "continue", category: "Control Flow" },
  { word: "pass", category: "Control Flow" },
  { word: "def", category: "Functions" },
  { word: "return", category: "Functions" },
  { word: "lambda", category: "Functions" },
  { word: "yield", category: "Functions" },
  { word: "class", category: "OOP" },
  { word: "try", category: "Error Handling" },
  { word: "except", category: "Error Handling" },
  { word: "finally", category: "Error Handling" },
  { word: "raise", category: "Error Handling" },
  { word: "assert", category: "Error Handling" },
  { word: "import", category: "Module" },
  { word: "from", category: "Module" },
  { word: "as", category: "Module" },
  { word: "with", category: "Context" },
  { word: "global", category: "Scope" },
  { word: "nonlocal", category: "Scope" },
  { word: "del", category: "Memory" },
  { word: "async", category: "Async" },
  { word: "await", category: "Async" },
];

const categoryColorMap: Record<string, string> = {
  "Value": "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40",
  "Logical": "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40",
  "Control Flow": "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/40",
  "Functions": "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/40",
  "OOP": "bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-500/40",
  "Error Handling": "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/40",
  "Module": "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/40",
  "Context": "bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/40",
  "Scope": "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/40",
  "Memory": "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/40",
  "Async": "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/40",
};

// ─── Category data ───────────────────────────────────────────────────────────
const categories: Record<KeywordCategory, CategoryInfo> = {
  control_flow: {
    label: "Control Flow",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Control flow keywords direct the execution path of your program. They let you make decisions, repeat actions, and skip or stop loops.",
    rows: [
      { keyword: "if", description: "Execute block when condition is True", example: "if x > 0:" },
      { keyword: "elif", description: "Additional condition after if", example: "elif x == 0:" },
      { keyword: "else", description: "Fallback when no condition matched", example: "else:" },
      { keyword: "for", description: "Iterate over a sequence", example: "for i in range(5):" },
      { keyword: "while", description: "Loop while condition is True", example: "while x > 0:" },
      { keyword: "break", description: "Exit the nearest loop immediately", example: "break" },
      { keyword: "continue", description: "Skip to the next iteration", example: "continue" },
      { keyword: "pass", description: "Do nothing (placeholder)", example: "pass" },
    ],
    codeSnippet: `score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "C"
print(f"Grade: {grade}")

for i in range(1, 4):
    if i == 2:
        continue
    print(f"i = {i}")`,
    codeOutput: [
      'Grade: B',
      'i = 1',
      'i = 3',
    ],
  },
  logical: {
    label: "Logical",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Logical keywords combine or test conditions and membership. They return boolean results and support short-circuit evaluation.",
    rows: [
      { keyword: "and", description: "True if both operands are True", example: "x > 0 and x < 10" },
      { keyword: "or", description: "True if at least one is True", example: "x < 0 or x > 100" },
      { keyword: "not", description: "Inverts a boolean value", example: "not is_empty" },
      { keyword: "is", description: "Identity check (same object)", example: "x is None" },
      { keyword: "in", description: "Membership test", example: '"a" in "apple"' },
    ],
    codeSnippet: `x = 5
print(x > 0 and x < 10)
print(x < 0 or x > 100)
print(not False)

name = None
print(name is None)

fruits = ["apple", "banana"]
print("apple" in fruits)
print("cherry" not in fruits)`,
    codeOutput: [
      "True",
      "False",
      "True",
      "True",
      "True",
      "True",
    ],
  },
  functions: {
    label: "Functions",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Function keywords let you define reusable blocks of code, return values, create anonymous functions, and build generators.",
    rows: [
      { keyword: "def", description: "Define a named function", example: "def greet(name):" },
      { keyword: "return", description: "Return a value from a function", example: "return x + y" },
      { keyword: "lambda", description: "Create an anonymous function", example: "lambda x: x * 2" },
      { keyword: "yield", description: "Produce a value in a generator", example: "yield item" },
    ],
    codeSnippet: `def add(a, b):
    return a + b

print(add(3, 7))

double = lambda x: x * 2
print(double(5))

def countdown(n):
    while n > 0:
        yield n
        n -= 1

for num in countdown(3):
    print(f"T-{num}")`,
    codeOutput: [
      "10",
      "10",
      "T-3",
      "T-2",
      "T-1",
    ],
  },
  error_handling: {
    label: "Error Handling",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Error handling keywords let you catch and respond to exceptions gracefully, ensure cleanup code always runs, and raise custom errors.",
    rows: [
      { keyword: "try", description: "Start a block that may raise errors", example: "try:" },
      { keyword: "except", description: "Catch and handle an exception", example: "except ValueError:" },
      { keyword: "finally", description: "Always execute (cleanup)", example: "finally:" },
      { keyword: "raise", description: "Throw an exception manually", example: 'raise ValueError("...")' },
      { keyword: "assert", description: "Debug check, raises AssertionError", example: "assert x > 0" },
    ],
    codeSnippet: `def divide(a, b):
    try:
        if b == 0:
            raise ValueError("Cannot divide by zero")
        result = a / b
    except ValueError as e:
        print(f"Error: {e}")
        result = None
    finally:
        print("Operation complete")
    return result

print(divide(10, 2))
print(divide(10, 0))

assert 5 > 0
print("Assertion passed")`,
    codeOutput: [
      "Operation complete",
      "5.0",
      "Error: Cannot divide by zero",
      "Operation complete",
      "None",
      "Assertion passed",
    ],
  },
};

const categoryOrder: KeywordCategory[] = ["control_flow", "logical", "functions", "error_handling"];

// ─── Main export ──────────────────────────────────────────────────────────────
export function KeywordsVisualization() {
  const [selected, setSelected] = useState<KeywordCategory>("control_flow");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const category = categories[selected];

  const handleSelect = (key: KeywordCategory) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Keywords</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Category selector chips */}
        <div className="flex flex-wrap gap-2">
          {categoryOrder.map((key) => {
            const cat = categories[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? cat.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {cat.label}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${category.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <Code2 className="h-4 w-4" />
                <span className="font-bold font-mono text-base">{category.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${category.badgeColor}`}>
                  keywords
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{category.description}</p>
            </div>

            {/* Two-column: keyword table | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Keyword reference table */}
              <div className="rounded-xl border overflow-hidden text-xs">
                <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                  <span>Keyword</span>
                  <span>Description</span>
                  <span>Usage</span>
                </div>
                {category.rows.map((row) => (
                  <div
                    key={row.keyword}
                    className="grid grid-cols-3 px-3 py-2 border-t items-center gap-1"
                  >
                    <code className={`font-mono font-bold ${category.color.split(" ")[3] ?? ""}`}>
                      {row.keyword}
                    </code>
                    <span className="text-[11px] text-muted-foreground">{row.description}</span>
                    <code className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                      {row.example}
                    </code>
                  </div>
                ))}
              </div>

              {/* Right: Code + Output */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {category.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={() => setOutputLines(category.codeOutput)}>
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

        {/* All 35 Python Keywords Grid */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-semibold">All 35 Python Keywords</p>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
            {allKeywords.map((kw) => {
              const colorClass = categoryColorMap[kw.category] ?? "bg-muted/50 text-muted-foreground border-border";
              return (
                <motion.div
                  key={kw.word}
                  whileHover={{ scale: 1.08 }}
                  className={`rounded-lg border px-2 py-1.5 text-center text-xs font-mono font-semibold cursor-default ${colorClass}`}
                  title={kw.category}
                >
                  {kw.word}
                </motion.div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {Object.entries(categoryColorMap).map(([cat, colorClass]) => (
              <span key={cat} className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${colorClass}`}>
                {cat}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
