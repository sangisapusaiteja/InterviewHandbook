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
type TopicKey = "basic" | "multiple" | "early" | "returnfunc";

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
  basic: {
    label: "Basic Return",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "A function uses the return statement to send a value back to the caller. The returned value can be assigned to a variable and used in expressions. If no return statement is present, the function returns None by default.",
    codeSnippet: `# Function with a return value
def square(n):
    return n * n

# Assign return value to a variable
result = square(6)
print(f"square(6) = {result}")

# Use return value directly in expressions
total = square(3) + square(4)
print(f"square(3) + square(4) = {total}")

# Function without return gives None
def say_hello():
    print("Hello!")

value = say_hello()
print(f"Returned: {value}")`,
    codeOutput: [
      "square(6) = 36",
      "square(3) + square(4) = 25",
      "Hello!",
      "Returned: None",
    ],
  },
  multiple: {
    label: "Multiple Returns",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Python can return multiple values from a function using comma-separated values, which are packed into a tuple. The caller can unpack them into separate variables using tuple unpacking syntax.",
    codeSnippet: `# Return multiple values (tuple packing)
def min_max(numbers):
    return min(numbers), max(numbers)

# Unpack into separate variables
low, high = min_max([4, 1, 7, 2, 9])
print(f"Min: {low}, Max: {high}")

# Return as a single tuple
result = min_max([10, 20, 30])
print(f"As tuple: {result}")
print(f"Type: {type(result).__name__}")

# Return three values
def get_stats(nums):
    return sum(nums), len(nums), sum(nums) / len(nums)

total, count, avg = get_stats([10, 20, 30, 40])
print(f"Sum={total}, Count={count}, Avg={avg}")`,
    codeOutput: [
      "Min: 1, Max: 9",
      "As tuple: (10, 30)",
      "Type: tuple",
      "Sum=100, Count=4, Avg=25.0",
    ],
  },
  early: {
    label: "Early Return",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Early return is a pattern where a function exits as soon as a condition is met, often used as guard clauses for input validation. This keeps code flat and readable by avoiding deeply nested if-else blocks.",
    codeSnippet: `# Guard clause for validation
def divide(a, b):
    if b == 0:
        return "Error: division by zero"
    return a / b

print(divide(10, 3))
print(divide(5, 0))

# Early returns for grading
def get_grade(score):
    if score >= 90:
        return "A"
    if score >= 80:
        return "B"
    if score >= 70:
        return "C"
    if score >= 60:
        return "D"
    return "F"

for s in [95, 82, 74, 61, 45]:
    print(f"Score {s} -> Grade {get_grade(s)}")`,
    codeOutput: [
      "3.3333333333333335",
      "Error: division by zero",
      "Score 95 -> Grade A",
      "Score 82 -> Grade B",
      "Score 74 -> Grade C",
      "Score 61 -> Grade D",
      "Score 45 -> Grade F",
    ],
  },
  returnfunc: {
    label: "Return Functions",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Functions are first-class objects in Python, so a function can return another function. This pattern is called a function factory or closure. The inner function captures variables from the enclosing scope.",
    codeSnippet: `# Function factory: make_multiplier
def make_multiplier(n):
    def multiplier(x):
        return x * n
    return multiplier

# Create specialized functions
double = make_multiplier(2)
triple = make_multiplier(3)

print(f"double(5) = {double(5)}")
print(f"triple(5) = {triple(5)}")
print(f"double(10) = {double(10)}")

# Another factory: power function
def make_power(exp):
    def power(base):
        return base ** exp
    return power

square = make_power(2)
cube = make_power(3)
print(f"square(4) = {square(4)}")
print(f"cube(4) = {cube(4)}")`,
    codeOutput: [
      "double(5) = 10",
      "triple(5) = 15",
      "double(10) = 20",
      "square(4) = 16",
      "cube(4) = 64",
    ],
  },
};

const order: TopicKey[] = ["basic", "multiple", "early", "returnfunc"];

const chipColors: Record<TopicKey, string> = {
  basic: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  multiple: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  early: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  returnfunc: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function ReturnValuesVisualization() {
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
        <CardTitle className="text-lg">Python Return Values</CardTitle>
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
                  return
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
