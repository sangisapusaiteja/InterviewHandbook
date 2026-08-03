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
type OperatorGroup = "arithmetic" | "comparison" | "logical" | "assignment" | "identity";

interface OperatorRow {
  op: string;
  name: string;
  example: string;
  result: string;
  note?: string;
}

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  rows: OperatorRow[];
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<OperatorGroup, GroupInfo> = {
  arithmetic: {
    label: "Arithmetic (+, -, *, /, //, %, **)",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Perform mathematical calculations. Python supports floor division (//) and exponentiation (**) as built-in operators.",
    rows: [
      { op: "+", name: "Addition", example: "10 + 3", result: "13" },
      { op: "-", name: "Subtraction", example: "10 - 3", result: "7" },
      { op: "*", name: "Multiplication", example: "10 * 3", result: "30" },
      { op: "/", name: "Division", example: "10 / 3", result: "3.3333..." },
      { op: "//", name: "Floor Division", example: "10 // 3", result: "3", note: "Rounds down" },
      { op: "%", name: "Modulus", example: "10 % 3", result: "1", note: "Remainder" },
      { op: "**", name: "Exponentiation", example: "2 ** 10", result: "1024", note: "Power" },
    ],
    codeSnippet: `a, b = 10, 3
print(a + b)
print(a - b)
print(a * b)
print(a / b)
print(a // b)
print(a % b)
print(2 ** 10)`,
    codeOutput: ["13", "7", "30", "3.3333333333333335", "3", "1", "1024"],
  },
  comparison: {
    label: "Comparison (==, !=, <, >, <=, >=)",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Compare two values and return a boolean. Python uses == for equality (no === needed since Python is strongly typed).",
    rows: [
      { op: "==", name: "Equal", example: '5 == 5.0', result: "True", note: "Value equality" },
      { op: "!=", name: "Not equal", example: "5 != 3", result: "True" },
      { op: "<", name: "Less than", example: "3 < 7", result: "True" },
      { op: ">", name: "Greater than", example: "7 > 3", result: "True" },
      { op: "<=", name: "Less or equal", example: "5 <= 5", result: "True" },
      { op: ">=", name: "Greater or equal", example: "4 >= 9", result: "False" },
    ],
    codeSnippet: `print(5 == 5.0)
print(5 != 3)
print(3 < 7)
print(7 > 3)
print(5 <= 5)
print(4 >= 9)`,
    codeOutput: ["True", "True", "True", "True", "True", "False"],
  },
  logical: {
    label: "Logical (and, or, not)",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Combine or invert boolean expressions using English keywords. Python uses short-circuit evaluation — it stops as soon as the result is determined.",
    rows: [
      { op: "and", name: "Logical AND", example: "True and False", result: "False", note: "Both must be true" },
      { op: "or", name: "Logical OR", example: "True or False", result: "True", note: "At least one true" },
      { op: "not", name: "Logical NOT", example: "not True", result: "False", note: "Inverts" },
      { op: "and", name: "Short-circuit AND", example: '0 and "hi"', result: "0", note: "Stops at falsy" },
      { op: "or", name: "Short-circuit OR", example: '0 or "hi"', result: "hi", note: "Stops at truthy" },
      { op: "or", name: "Default value", example: 'None or "default"', result: "default", note: "Common pattern" },
    ],
    codeSnippet: `print(True and False)
print(True or False)
print(not True)
print(0 and "hi")
print(0 or "hi")
print(None or "default")`,
    codeOutput: ["False", "True", "False", "0", "hi", "default"],
  },
  assignment: {
    label: "Assignment (=, +=, -=, *=)",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Assign and update variable values. Python supports augmented assignment operators that combine an operation with assignment.",
    rows: [
      { op: "=", name: "Assign", example: "x = 10", result: "x is 10" },
      { op: "+=", name: "Add & assign", example: "x += 5", result: "x is 15", note: "x = x + 5" },
      { op: "-=", name: "Sub & assign", example: "x -= 3", result: "x is 12", note: "x = x - 3" },
      { op: "*=", name: "Mul & assign", example: "x *= 2", result: "x is 24", note: "x = x * 2" },
      { op: "//=", name: "Floor div & assign", example: "x //= 5", result: "x is 4", note: "x = x // 5" },
      { op: "**=", name: "Power & assign", example: "x **= 3", result: "x is 64", note: "x = x ** 3" },
    ],
    codeSnippet: `x = 10
print(x)
x += 5
print(x)
x -= 3
print(x)
x *= 2
print(x)
x //= 5
print(x)
x **= 3
print(x)`,
    codeOutput: ["10", "15", "12", "24", "4", "64"],
  },
  identity: {
    label: "Identity & Membership (is, in)",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      'The "is" operator checks identity (same object in memory), while "in" checks membership in a sequence. Use == for value equality instead of "is".',
    rows: [
      { op: "is", name: "Identity", example: "x is None", result: "True", note: "Same object" },
      { op: "is not", name: "Not identity", example: "x is not None", result: "False", note: "Different object" },
      { op: "in", name: "Membership", example: '"a" in "abc"', result: "True", note: "Found in sequence" },
      { op: "not in", name: "Not in", example: '"z" not in "abc"', result: "True", note: "Not found" },
      { op: "in", name: "List membership", example: "3 in [1, 2, 3]", result: "True" },
      { op: "in", name: "Dict key check", example: '"k" in {"k": 1}', result: "True", note: "Checks keys" },
    ],
    codeSnippet: `x = None
print(x is None)
print(x is not None)
print("a" in "abc")
print("z" not in "abc")
print(3 in [1, 2, 3])
print("k" in {"k": 1})`,
    codeOutput: ["True", "False", "True", "True", "True", "True"],
  },
};

const order: OperatorGroup[] = ["arithmetic", "comparison", "logical", "assignment", "identity"];

const chipColors: Record<OperatorGroup, string> = {
  arithmetic: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  comparison: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  logical: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  assignment: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
  identity: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function OperatorsVisualization() {
  const [selected, setSelected] = useState<OperatorGroup>("arithmetic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const group = groups[selected];

  const handleSelect = (key: OperatorGroup) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Operators</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Group selector chips */}
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
                {groups[key].label}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${group.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{group.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${group.badgeColor}`}>
                  operators
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{group.description}</p>
            </div>

            {/* Two-column: reference table | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Operator reference table */}
              <div className="rounded-xl border overflow-hidden text-xs">
                <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                  <span>Op</span>
                  <span>Example</span>
                  <span>Result</span>
                </div>
                {group.rows.map((row) => (
                  <div
                    key={`${row.op}-${row.name}`}
                    className="grid grid-cols-3 px-3 py-2 border-t items-center gap-1"
                  >
                    <code className={`font-mono font-bold ${group.color.split(" ")[3] ?? ""}`}>
                      {row.op}
                    </code>
                    <code className="font-mono text-[11px] text-muted-foreground">{row.example}</code>
                    <div>
                      <code className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                        {row.result}
                      </code>
                      {row.note && (
                        <p className="text-[9px] text-muted-foreground mt-0.5">{row.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Code + Output */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {group.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={() => setOutputLines(group.codeOutput)}>
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
