"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCw, ArrowDown, CheckCircle } from "lucide-react";
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
type WhileVariant = "countdown" | "sum-threshold" | "while-true-break" | "while-else";

interface VariantInfo {
  label: string;
  color: string;
  badgeColor: string;
  badgeText: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
  diagramSteps: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const variants: Record<WhileVariant, VariantInfo> = {
  countdown: {
    label: "Countdown",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    badgeText: "basic",
    description:
      "A classic countdown loop. The condition is checked before each iteration — when it becomes False, the loop stops.",
    codeSnippet: `n = 5
while n > 0:
    print(n)
    n -= 1
print("Go!")`,
    codeOutput: ["5", "4", "3", "2", "1", "Go!"],
    diagramSteps: [
      "n = 5 → condition n > 0 is True",
      "print 5, n becomes 4",
      "print 4, n becomes 3",
      "print 3, n becomes 2",
      "print 2, n becomes 1",
      "print 1, n becomes 0",
      "condition n > 0 is False → exit loop",
      'print "Go!"',
    ],
  },
  "sum-threshold": {
    label: "Sum Until Threshold",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    badgeText: "accumulator",
    description:
      "Keep adding numbers until a running total reaches or exceeds a threshold. A common pattern for accumulating values.",
    codeSnippet: `total = 0
i = 1
while total < 100:
    total += i
    i += 1
print(f"Sum = {total}")
print(f"Added numbers 1 to {i - 1}")`,
    codeOutput: ["Sum = 105", "Added numbers 1 to 14"],
    diagramSteps: [
      "total = 0, i = 1",
      "total < 100? True → total += 1 → total = 1",
      "total < 100? True → total += 2 → total = 3",
      "... keeps adding i, incrementing i",
      "total += 13 → total = 91",
      "total < 100? True → total += 14 → total = 105",
      "total < 100? False → exit loop",
      "Print: Sum = 105, added 1 to 14",
    ],
  },
  "while-true-break": {
    label: "while True + break",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    badgeText: "infinite loop",
    description:
      'The "while True" pattern creates an intentional infinite loop. Use "break" inside to exit when a condition is met. Commonly used for input validation and menus.',
    codeSnippet: `import random
secret = random.randint(1, 10)
# Simulating: secret = 7

attempts = 0
while True:
    guess = int(input("Guess: "))
    attempts += 1
    if guess == secret:
        break
print(f"Got it in {attempts} tries!")`,
    codeOutput: [
      "Guess: 3",
      "Guess: 8",
      "Guess: 7",
      "Got it in 3 tries!",
    ],
    diagramSteps: [
      "while True → always enters loop body",
      "guess = 3, attempts = 1 → guess != 7, continue",
      "guess = 8, attempts = 2 → guess != 7, continue",
      "guess = 7, attempts = 3 → guess == 7, break!",
      "Loop exits via break",
      "Print: Got it in 3 tries!",
    ],
  },
  "while-else": {
    label: "while-else",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    badgeText: "else clause",
    description:
      'The else block runs only when the while condition becomes False naturally — it does NOT run if the loop exits via "break". Useful for search patterns.',
    codeSnippet: `# Search for an even number > 10
numbers = [1, 3, 5, 7, 9, 12, 15]
i = 0
while i < len(numbers):
    if numbers[i] > 10 and numbers[i] % 2 == 0:
        print(f"Found: {numbers[i]}")
        break
    i += 1
else:
    print("No match found")

# Compare: list with no match
numbers2 = [1, 3, 5, 7]
i = 0
while i < len(numbers2):
    if numbers2[i] > 10 and numbers2[i] % 2 == 0:
        print(f"Found: {numbers2[i]}")
        break
    i += 1
else:
    print("No match found")`,
    codeOutput: [
      "Found: 12",
      "No match found",
    ],
    diagramSteps: [
      "List 1: [1, 3, 5, 7, 9, 12, 15]",
      "Check 1, 3, 5, 7, 9 → no match",
      "Check 12 → even and > 10 → Found! → break",
      "else block skipped (exited via break)",
      "List 2: [1, 3, 5, 7]",
      "Check 1, 3, 5, 7 → no match",
      "i = 4, condition False → else runs",
      'Print: "No match found"',
    ],
  },
};

const order: WhileVariant[] = ["countdown", "sum-threshold", "while-true-break", "while-else"];

const chipColors: Record<WhileVariant, string> = {
  countdown: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  "sum-threshold": "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  "while-true-break": "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  "while-else": "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Loop Diagram ─────────────────────────────────────────────────────────────
function LoopDiagram({ steps, color }: Readonly<{ steps: string[]; color: string }>) {
  const borderColor = color.split(" ")[1] ?? "border-border";

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground mb-2">Loop Flow</p>
      <div className="relative flex flex-col items-center gap-1">
        {/* Condition check */}
        <div className={`rounded-lg border-2 ${borderColor} px-4 py-2 text-xs font-mono font-semibold flex items-center gap-2`}>
          <CheckCircle className="h-3.5 w-3.5" />
          Condition Check
        </div>
        <ArrowDown className="h-4 w-4 text-muted-foreground" />

        {/* Loop body */}
        <div className={`rounded-lg border-2 border-dashed ${borderColor} px-4 py-2 text-xs font-mono font-semibold flex items-center gap-2`}>
          <Play className="h-3.5 w-3.5" />
          Loop Body
        </div>
        <ArrowDown className="h-4 w-4 text-muted-foreground" />

        {/* Repeat arrow */}
        <div className={`rounded-lg border ${borderColor} bg-muted/30 px-4 py-2 text-xs font-mono flex items-center gap-2`}>
          <RotateCw className="h-3.5 w-3.5" />
          Repeat (back to condition)
        </div>
      </div>

      {/* Step-by-step trace */}
      <div className="mt-3 space-y-1">
        <p className="text-xs font-semibold text-muted-foreground">Step-by-step trace</p>
        {steps.map((step, idx) => (
          <motion.div
            key={`step-${idx}-${step.slice(0, 12)}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.06 }}
            className="flex items-start gap-2 text-[11px]"
          >
            <span className="font-mono text-muted-foreground w-4 text-right shrink-0">{idx + 1}.</span>
            <span className="text-foreground/80">{step}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function WhileLoopVisualization() {
  const [selected, setSelected] = useState<WhileVariant>("countdown");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const variant = variants[selected];

  const handleSelect = (key: WhileVariant) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python while Loop</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Variant selector chips */}
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
                {variants[key].label}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${variant.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{variant.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${variant.badgeColor}`}>
                  {variant.badgeText}
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{variant.description}</p>
            </div>

            {/* Two-column: loop diagram | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Loop flow diagram */}
              <LoopDiagram steps={variant.diagramSteps} color={variant.color} />

              {/* Right: Code + Output */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {variant.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={() => setOutputLines(variant.codeOutput)}>
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
