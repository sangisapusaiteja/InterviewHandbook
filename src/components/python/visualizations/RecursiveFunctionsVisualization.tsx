"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Layers } from "lucide-react";
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
type TopicKey = "factorial" | "fibonacci" | "sumlist" | "callstack";

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
  factorial: {
    label: "Factorial",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The factorial function is a classic recursion example. It has a base case (n <= 1 returns 1) and a recursive case (n * factorial(n - 1)). Each call reduces the problem size by one until the base case is reached.",
    codeSnippet: `def factorial(n):
    """Return n! using recursion."""
    # Base case
    if n <= 1:
        return 1
    # Recursive case
    return n * factorial(n - 1)

# Calculate factorial(5)
result = factorial(5)
print(f"factorial(5) = {result}")

# Step-by-step breakdown
print("\\nHow it works:")
print("factorial(5) = 5 * factorial(4)")
print("             = 5 * 4 * factorial(3)")
print("             = 5 * 4 * 3 * factorial(2)")
print("             = 5 * 4 * 3 * 2 * factorial(1)")
print("             = 5 * 4 * 3 * 2 * 1")
print("             = 120")`,
    codeOutput: [
      "factorial(5) = 120",
      "",
      "How it works:",
      "factorial(5) = 5 * factorial(4)",
      "             = 5 * 4 * factorial(3)",
      "             = 5 * 4 * 3 * factorial(2)",
      "             = 5 * 4 * 3 * 2 * factorial(1)",
      "             = 5 * 4 * 3 * 2 * 1",
      "             = 120",
    ],
  },
  fibonacci: {
    label: "Fibonacci",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "The Fibonacci sequence is defined recursively: fib(0) = 0, fib(1) = 1, and fib(n) = fib(n-1) + fib(n-2). Each call branches into two recursive calls, creating a tree of computations.",
    codeSnippet: `def fib(n):
    """Return the nth Fibonacci number."""
    if n <= 0:
        return 0
    if n == 1:
        return 1
    return fib(n - 1) + fib(n - 2)

# Generate the first 10 Fibonacci numbers
sequence = [fib(i) for i in range(10)]
print(f"First 10: {sequence}")

# Show individual values
for i in range(7):
    print(f"fib({i}) = {fib(i)}")

# Note: naive recursion is O(2^n)
print("\\nWarning: naive fib is O(2^n)")
print("Use memoization for efficiency!")`,
    codeOutput: [
      "First 10: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]",
      "fib(0) = 0",
      "fib(1) = 1",
      "fib(2) = 1",
      "fib(3) = 2",
      "fib(4) = 3",
      "fib(5) = 5",
      "fib(6) = 8",
      "",
      "Warning: naive fib is O(2^n)",
      "Use memoization for efficiency!",
    ],
  },
  sumlist: {
    label: "Sum List",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Recursive list summing demonstrates how to process a collection by handling the first element and recursing on the rest. The base case is an empty list (sum is 0), and each call peels off one element.",
    codeSnippet: `def sum_list(lst):
    """Recursively sum all elements in a list."""
    # Base case: empty list
    if not lst:
        return 0
    # Recursive case: first + sum of rest
    return lst[0] + sum_list(lst[1:])

numbers = [3, 7, 1, 9, 2]
result = sum_list(numbers)
print(f"sum_list({numbers}) = {result}")

# Trace the recursion
print("\\nTrace:")
print("sum_list([3, 7, 1, 9, 2])")
print("= 3 + sum_list([7, 1, 9, 2])")
print("= 3 + 7 + sum_list([1, 9, 2])")
print("= 3 + 7 + 1 + sum_list([9, 2])")
print("= 3 + 7 + 1 + 9 + sum_list([2])")
print("= 3 + 7 + 1 + 9 + 2 + sum_list([])")
print("= 3 + 7 + 1 + 9 + 2 + 0")
print("= 22")`,
    codeOutput: [
      "sum_list([3, 7, 1, 9, 2]) = 22",
      "",
      "Trace:",
      "sum_list([3, 7, 1, 9, 2])",
      "= 3 + sum_list([7, 1, 9, 2])",
      "= 3 + 7 + sum_list([1, 9, 2])",
      "= 3 + 7 + 1 + sum_list([9, 2])",
      "= 3 + 7 + 1 + 9 + sum_list([2])",
      "= 3 + 7 + 1 + 9 + 2 + sum_list([])",
      "= 3 + 7 + 1 + 9 + 2 + 0",
      "= 22",
    ],
  },
  callstack: {
    label: "Call Stack",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "When a recursive function is called, each invocation is pushed onto the call stack. The stack grows until the base case is reached, then unwinds as each frame returns its result to the caller.",
    codeSnippet: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Call factorial(4)
# The call stack grows like this:
#
#   factorial(1) -> returns 1      (base case)
#   factorial(2) -> returns 2 * 1 = 2
#   factorial(3) -> returns 3 * 2 = 6
#   factorial(4) -> returns 4 * 6 = 24
#
# Stack unwinds bottom-up, each frame
# multiplies its n by the returned value.

print(f"factorial(4) = {factorial(4)}")`,
    codeOutput: [
      "factorial(4) = 24",
    ],
  },
};

const order: TopicKey[] = ["factorial", "fibonacci", "sumlist", "callstack"];

const chipColors: Record<TopicKey, string> = {
  factorial: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  fibonacci: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  sumlist: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  callstack: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Call Stack Visualization ─────────────────────────────────────────────────
const callStackFrames = [
  { fn: "factorial(4)", detail: "returns 4 * factorial(3)", result: "4 * 6 = 24", color: "border-orange-400 bg-orange-500/10" },
  { fn: "factorial(3)", detail: "returns 3 * factorial(2)", result: "3 * 2 = 6", color: "border-amber-400 bg-amber-500/10" },
  { fn: "factorial(2)", detail: "returns 2 * factorial(1)", result: "2 * 1 = 2", color: "border-yellow-400 bg-yellow-500/10" },
  { fn: "factorial(1)", detail: "base case: returns 1", result: "1", color: "border-emerald-400 bg-emerald-500/10" },
];

function CallStackVisual({ running }: Readonly<{ running: boolean }>) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <Layers className="h-4 w-4 text-orange-500" />
        <p className="text-xs font-semibold text-muted-foreground">Call Stack for factorial(4)</p>
      </div>

      <div className="flex flex-col-reverse gap-1.5">
        {callStackFrames.map((frame, idx) => (
          <AnimatePresence key={`frame-${frame.fn}`}>
            {running && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0.5, y: 10 }}
                animate={{ opacity: 1, scaleY: 1, y: 0 }}
                transition={{ delay: idx * 0.3, duration: 0.35 }}
                className={`rounded-lg border-2 ${frame.color} px-4 py-2.5 font-mono text-xs`}
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="font-bold">{frame.fn}</span>
                    <span className="text-muted-foreground ml-2">{frame.detail}</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.3 + (callStackFrames.length * 0.3) + 0.2 }}
                  >
                    <Badge variant="secondary" className="text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                      {frame.result}
                    </Badge>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      {!running && (
        <div className="rounded-xl border bg-muted/20 px-4 py-6 flex items-center justify-center">
          <p className="text-xs text-muted-foreground italic">Click ▶ Run to visualize the call stack</p>
        </div>
      )}

      {running && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: callStackFrames.length * 0.6 + 0.4 }}
          className="rounded-lg border bg-zinc-900 dark:bg-zinc-950 px-4 py-2 font-mono text-xs"
        >
          <p className="text-emerald-400">
            <span className="text-zinc-500 select-none mr-2">&gt;&gt;&gt;</span>
            Stack unwinds: 1 → 2 → 6 → 24
          </p>
          <p className="text-emerald-400 mt-1">
            <span className="text-zinc-500 select-none mr-2">&gt;&gt;&gt;</span>
            factorial(4) = 24
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function RecursiveFunctionsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("factorial");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [stackRunning, setStackRunning] = useState(false);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
    setStackRunning(false);
  };

  const handleRun = () => {
    if (selected === "callstack") {
      setStackRunning(true);
    }
    setOutputLines(topic.codeOutput);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recursive Functions</CardTitle>
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
                  recursion
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
              <Button size="sm" onClick={handleRun}>
                <Play className="h-3.5 w-3.5 mr-1" /> Run
              </Button>

              {/* Call Stack visual (only for callstack topic) */}
              {selected === "callstack" && (
                <CallStackVisual running={stackRunning} />
              )}

              {/* Console output (shown for all topics) */}
              {selected !== "callstack" && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                  <ConsoleOutput lines={outputLines} />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
