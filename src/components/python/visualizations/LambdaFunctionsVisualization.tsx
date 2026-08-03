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
type TopicKey = "syntax" | "sorted" | "mapfilter" | "vsdef";

interface TopicInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  syntax: {
    label: "Lambda Syntax",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "A lambda function is a small anonymous function defined with the lambda keyword. It can take any number of arguments but has only one expression. The expression is evaluated and returned automatically.",
    codeSnippet: `# Basic lambda — square a number
square = lambda x: x ** 2
print(f"square(5) = {square(5)}")
print(f"square(9) = {square(9)}")

# Lambda with multiple arguments
add = lambda a, b: a + b
print(f"add(3, 7) = {add(3, 7)}")

# Lambda with a default argument
power = lambda base, exp=2: base ** exp
print(f"power(3)    = {power(3)}")
print(f"power(2, 8) = {power(2, 8)}")

# Immediately invoked lambda
result = (lambda x, y: x * y)(4, 5)
print(f"(lambda 4*5) = {result}")`,
    codeOutput: [
      "square(5) = 25",
      "square(9) = 81",
      "add(3, 7) = 10",
      "power(3)    = 9",
      "power(2, 8) = 256",
      "(lambda 4*5) = 20",
    ],
  },
  sorted: {
    label: "sorted() with key",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Lambda functions shine as the key argument in sorted(). The key function is applied to each element to produce a comparison value, letting you sort by any custom criteria without writing a separate named function.",
    codeSnippet: `# Sort students by score (descending)
students = [
    ("Alice", 88),
    ("Bob", 95),
    ("Charlie", 72),
    ("Diana", 91),
]

by_score = sorted(students, key=lambda s: s[1], reverse=True)
for name, score in by_score:
    print(f"  {name}: {score}")

# Sort words by length
words = ["python", "is", "absolutely", "awesome"]
by_len = sorted(words, key=lambda w: len(w))
print(f"By length: {by_len}")

# Sort dicts by a field
items = [{"name": "Banana", "price": 1.2},
         {"name": "Apple",  "price": 0.8},
         {"name": "Cherry", "price": 2.5}]
by_price = sorted(items, key=lambda d: d["price"])
print(f"Cheapest first: {[i['name'] for i in by_price]}")`,
    codeOutput: [
      "  Bob: 95",
      "  Diana: 91",
      "  Alice: 88",
      "  Charlie: 72",
      "By length: ['is', 'python', 'awesome', 'absolutely']",
      "Cheapest first: ['Apple', 'Banana', 'Cherry']",
    ],
  },
  mapfilter: {
    label: "map() & filter()",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "map() applies a lambda to every element in an iterable and returns a new iterator. filter() keeps only the elements for which the lambda returns True. Both avoid the need for explicit loops.",
    codeSnippet: `# map() — double every number
nums = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, nums))
print(f"Doubled: {doubled}")

# map() — convert to uppercase
names = ["alice", "bob", "charlie"]
upper = list(map(lambda s: s.upper(), names))
print(f"Upper: {upper}")

# filter() — keep even numbers
evens = list(filter(lambda x: x % 2 == 0, range(1, 11)))
print(f"Evens: {evens}")

# filter() — words longer than 3 chars
words = ["hi", "hello", "hey", "howdy", "yo"]
long = list(filter(lambda w: len(w) > 3, words))
print(f"Long words: {long}")

# Chaining map + filter
result = list(map(lambda x: x ** 2,
    filter(lambda x: x % 2 != 0, range(1, 8))))
print(f"Odd squares: {result}")`,
    codeOutput: [
      "Doubled: [2, 4, 6, 8, 10]",
      "Upper: ['ALICE', 'BOB', 'CHARLIE']",
      "Evens: [2, 4, 6, 8, 10]",
      "Long words: ['hello', 'howdy']",
      "Odd squares: [1, 9, 25, 49]",
    ],
  },
  vsdef: {
    label: "Lambda vs def",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Lambda functions are best for short, throwaway expressions. Use def when you need multiple statements, docstrings, or readability. PEP 8 discourages assigning lambdas to variables — use def instead for named functions.",
    codeSnippet: `# ┌────────────┬──────────────────────────────┐
# │  Feature   │  lambda        │  def        │
# ├────────────┼──────────────────────────────┤
# │ Statements │  Single expr   │  Multiple   │
# │ Name       │  Anonymous     │  Named      │
# │ Docstring  │  No            │  Yes        │
# │ Return     │  Implicit      │  Explicit   │
# │ Readability│  Brief only    │  Any length │
# └────────────┴──────────────────────────────┘

# Lambda — quick inline usage
points = [(1, 2), (3, 1), (5, 4), (2, 3)]
print(f"By y: {sorted(points, key=lambda p: p[1])}")

# def — when logic is complex
def classify(n):
    """Classify a number."""
    if n > 0:
        return "positive"
    elif n < 0:
        return "negative"
    return "zero"

for val in [10, -3, 0]:
    print(f"  {val} -> {classify(val)}")

# PEP 8: prefer def for named functions
# Bad:  square = lambda x: x ** 2
# Good:
def square(x):
    return x ** 2

print(f"square(6) = {square(6)}")`,
    codeOutput: [
      "By y: [(3, 1), (1, 2), (2, 3), (5, 4)]",
      "  10 -> positive",
      "  -3 -> negative",
      "  0 -> zero",
      "square(6) = 36",
    ],
  },
};

const order: TopicKey[] = ["syntax", "sorted", "mapfilter", "vsdef"];

const chipColors: Record<TopicKey, string> = {
  syntax: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  sorted: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  mapfilter: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  vsdef: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function LambdaFunctionsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("syntax");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Lambda Functions</CardTitle>
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
                  lambda
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
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
