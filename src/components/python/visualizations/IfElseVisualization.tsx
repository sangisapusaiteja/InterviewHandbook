"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowDown } from "lucide-react";
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

// ─── Two-path diagram ─────────────────────────────────────────────────────────
function TwoPathDiagram({
  condition,
  truePath,
  falsePath,
}: Readonly<{
  condition: string;
  truePath: string;
  falsePath: string;
}>) {
  return (
    <div className="flex flex-col items-center gap-1 py-2">
      {/* Condition */}
      <div className="rounded-lg border-2 border-amber-500/50 bg-amber-500/10 px-4 py-2 text-xs font-mono font-semibold text-amber-700 dark:text-amber-300">
        {condition}
      </div>
      <ArrowDown className="h-4 w-4 text-muted-foreground" />
      {/* Branches */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <div className="flex flex-col items-center gap-1">
          <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px]">
            True
          </Badge>
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-mono text-emerald-700 dark:text-emerald-300 text-center w-full">
            {truePath}
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Badge variant="secondary" className="bg-red-500/20 text-red-700 dark:text-red-300 text-[10px]">
            False
          </Badge>
          <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-mono text-red-700 dark:text-red-300 text-center w-full">
            {falsePath}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── types ────────────────────────────────────────────────────────────────────
type TopicKey = "basic" | "evenodd" | "ternary" | "practical";

interface TopicInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  diagram: { condition: string; truePath: string; falsePath: string };
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  basic: {
    label: "Basic if-else",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The if-else statement checks a condition: if it evaluates to True the if-block runs, otherwise the else-block runs. Indentation defines the block scope.",
    diagram: {
      condition: "age >= 18",
      truePath: 'print("You can vote!")',
      falsePath: 'print("Too young to vote.")',
    },
    codeSnippet: `age = 20

if age >= 18:
    print("You can vote!")
else:
    print("Too young to vote.")

# Flip the value
age = 15

if age >= 18:
    print("You can vote!")
else:
    print("Too young to vote.")`,
    codeOutput: ["You can vote!", "Too young to vote."],
  },
  evenodd: {
    label: "Even/Odd Check",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "The modulus operator (%) returns the remainder of division. If number % 2 equals 0 the number is even, otherwise it is odd.",
    diagram: {
      condition: "number % 2 == 0",
      truePath: 'print(f"{number} is even")',
      falsePath: 'print(f"{number} is odd")',
    },
    codeSnippet: `number = 42

if number % 2 == 0:
    print(f"{number} is even")
else:
    print(f"{number} is odd")

number = 17

if number % 2 == 0:
    print(f"{number} is even")
else:
    print(f"{number} is odd")`,
    codeOutput: ["42 is even", "17 is odd"],
  },
  ternary: {
    label: "Ternary Expression",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Python's ternary expression uses the syntax: value = x if condition else y. It is a concise one-liner that replaces simple if-else blocks.",
    diagram: {
      condition: "condition",
      truePath: "value = x",
      falsePath: "value = y",
    },
    codeSnippet: `# Basic ternary
age = 20
status = "adult" if age >= 18 else "minor"
print(status)

# Numeric ternary
x = -5
abs_val = x if x >= 0 else -x
print(abs_val)

# Nested ternary (use sparingly)
score = 85
grade = "A" if score >= 90 else "B" if score >= 80 else "C"
print(grade)

# Ternary in f-string
n = 7
print(f"{n} is {'even' if n % 2 == 0 else 'odd'}")`,
    codeOutput: ["adult", "5", "B", "7 is odd"],
  },
  practical: {
    label: "Practical Examples",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Real-world if-else patterns: validating password length, classifying positive/negative numbers, and combining multiple conditions.",
    diagram: {
      condition: "len(password) >= 8",
      truePath: 'print("Password accepted")',
      falsePath: 'print("Too short!")',
    },
    codeSnippet: `# Password length check
password = "hello"

if len(password) >= 8:
    print("Password accepted")
else:
    print("Too short! Need 8+ chars")

# Positive / Negative / Zero
num = -3

if num > 0:
    print(f"{num} is positive")
elif num < 0:
    print(f"{num} is negative")
else:
    print(f"{num} is zero")

# Combined conditions
temp = 25

if temp > 30:
    print("It's hot outside!")
else:
    print("Temperature is pleasant")`,
    codeOutput: [
      "Too short! Need 8+ chars",
      "-3 is negative",
      "Temperature is pleasant",
    ],
  },
};

const order: TopicKey[] = ["basic", "evenodd", "ternary", "practical"];

const chipColors: Record<TopicKey, string> = {
  basic: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  evenodd: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  ternary: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  practical: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function IfElseVisualization() {
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
        <CardTitle className="text-lg">Python if-else Statements</CardTitle>
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
                  control flow
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Two-column: diagram + code | output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Visual two-path diagram */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Flow Diagram</p>
                <div className="rounded-xl border bg-muted/20 px-4 py-3">
                  <TwoPathDiagram
                    condition={topic.diagram.condition}
                    truePath={topic.diagram.truePath}
                    falsePath={topic.diagram.falsePath}
                  />
                </div>
              </div>

              {/* Right: Code + Output */}
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
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
