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
type TopicKey = "type-conversion" | "math-functions" | "any-all" | "type-checking";

interface TopicInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  keyPoints: string[];
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  "type-conversion": {
    label: "Type Conversion",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Python provides built-in functions to convert values between types. These include int(), float(), str(), bool(), list(), tuple(), and set(). Each accepts compatible values and returns a new object of the target type.",
    keyPoints: [
      "int() truncates floats toward zero, does not round",
      "float() accepts ints, numeric strings, and special values like 'inf'",
      "str() works on any object via __str__ method",
      "bool() returns False for 0, empty containers, None, and empty strings",
      "list(), tuple(), set() accept any iterable as input",
    ],
    codeSnippet: `# int() — truncates floats, parses strings
print(int(3.99))        # 3
print(int("42"))        # 42

# float() — widens ints, parses strings
print(float(10))        # 10.0
print(float("3.14"))    # 3.14

# str() — converts anything to string
print(str(True))        # 'True'
print(str([1, 2, 3]))   # '[1, 2, 3]'

# bool() — falsy vs truthy
print(bool(0))          # False
print(bool("hello"))    # True

# list(), tuple(), set()
print(list("abc"))      # ['a', 'b', 'c']
print(tuple([1, 2]))    # (1, 2)
print(set([1, 2, 2]))   # {1, 2}`,
    codeOutput: [
      "3",
      "42",
      "10.0",
      "3.14",
      "True",
      "[1, 2, 3]",
      "False",
      "True",
      "['a', 'b', 'c']",
      "(1, 2)",
      "{1, 2}",
    ],
  },
  "math-functions": {
    label: "Math Functions",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Python includes several built-in math functions that work without importing any module. abs(), round(), min(), max(), sum(), pow(), and divmod() cover the most common numeric operations.",
    keyPoints: [
      "abs() returns the absolute (positive) value of a number",
      "round(n, digits) uses banker's rounding (round half to even)",
      "min() and max() accept iterables or multiple arguments",
      "sum() takes an iterable and an optional start value",
      "pow(base, exp, mod) supports modular exponentiation",
      "divmod(a, b) returns (quotient, remainder) as a tuple",
    ],
    codeSnippet: `# abs() — absolute value
print(abs(-42))           # 42
print(abs(3.14))          # 3.14

# round() — banker's rounding
print(round(3.14159, 2))  # 3.14
print(round(2.5))         # 2 (rounds to even)

# min() and max()
print(min(5, 2, 8, 1))   # 1
print(max(5, 2, 8, 1))   # 8

# sum() with optional start
print(sum([1, 2, 3]))       # 6
print(sum([1, 2, 3], 100))  # 106

# pow() and divmod()
print(pow(2, 10))         # 1024
print(pow(2, 10, 1000))   # 24 (modular)
print(divmod(17, 5))      # (3, 2)`,
    codeOutput: [
      "42",
      "3.14",
      "3.14",
      "2",
      "1",
      "8",
      "6",
      "106",
      "1024",
      "24",
      "(3, 2)",
    ],
  },
  "any-all": {
    label: "any() & all()",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "any() returns True if at least one element in an iterable is truthy. all() returns True only if every element is truthy. Both use short-circuit evaluation for efficiency and are commonly combined with generator expressions.",
    keyPoints: [
      "any() stops as soon as it finds the first truthy value",
      "all() stops as soon as it finds the first falsy value",
      "Both return True for empty iterables in all(), False for any()",
      "Generator expressions avoid creating intermediate lists",
      "Common pattern: any(cond(x) for x in items) for searching",
      "Common pattern: all(cond(x) for x in items) for validation",
    ],
    codeSnippet: `# any() — at least one truthy?
print(any([False, 0, "", 42]))   # True
print(any([False, 0, "", None])) # False

# all() — every element truthy?
print(all([True, 1, "hi", [1]])) # True
print(all([True, 1, "", [1]]))   # False

# Practical: check if any number is negative
nums = [3, 7, -2, 5, 10]
has_negative = any(n < 0 for n in nums)
print(f"has negative: {has_negative}")

# Practical: check if all scores pass
scores = [85, 92, 78, 90]
all_pass = all(s >= 70 for s in scores)
print(f"all pass: {all_pass}")

# Edge cases with empty iterables
print(any([]))  # False
print(all([]))  # True`,
    codeOutput: [
      "True",
      "False",
      "True",
      "False",
      "has negative: True",
      "all pass: True",
      "False",
      "True",
    ],
  },
  "type-checking": {
    label: "Type Checking",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Python provides several introspection functions to examine objects at runtime. type() returns the exact type, isinstance() checks against a type or tuple of types, dir() lists attributes, id() gives the memory identity, and help() shows documentation.",
    keyPoints: [
      "type(obj) returns the exact class of an object",
      "isinstance(obj, cls) is preferred over type() for checking — supports inheritance",
      "isinstance() accepts a tuple of types for OR-style checking",
      "dir(obj) lists all attributes and methods of an object",
      "id(obj) returns a unique integer identifier (memory address in CPython)",
      "help(obj) prints interactive documentation in the REPL",
    ],
    codeSnippet: `# type() — exact type
print(type(42))          # <class 'int'>
print(type("hello"))     # <class 'str'>
print(type([1, 2]))      # <class 'list'>

# isinstance() — preferred for type checking
print(isinstance(42, int))           # True
print(isinstance("hi", (int, str)))  # True
print(isinstance(True, int))         # True (bool is subclass of int)

# dir() — list attributes (showing a subset)
methods = [m for m in dir([]) if not m.startswith("_")]
print(f"list methods: {methods[:5]}")

# id() — unique identity
a = [1, 2, 3]
b = a
c = [1, 2, 3]
print(f"a is b: {id(a) == id(b)}")   # True (same object)
print(f"a is c: {id(a) == id(c)}")   # False (different objects)`,
    codeOutput: [
      "<class 'int'>",
      "<class 'str'>",
      "<class 'list'>",
      "True",
      "True",
      "True",
      "list methods: ['append', 'clear', 'copy', 'count', 'extend']",
      "a is b: True",
      "a is c: False",
    ],
  },
};

const order: TopicKey[] = ["type-conversion", "math-functions", "any-all", "type-checking"];

// ─── Main export ──────────────────────────────────────────────────────────────
export function BuiltinFunctionsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("type-conversion");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Built-in Functions</CardTitle>
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${topic.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{topic.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${topic.badgeColor}`}>
                  built-in
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Key Points */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Key Points
              </p>
              <ul className="space-y-1.5">
                {topic.keyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-xs">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-current shrink-0 opacity-50" />
                    <span className="leading-relaxed">{point}</span>
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
