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
          {lines.map((line, i) => (
            <p key={`${line}-${i}`} className="text-emerald-400">
              <span className="text-zinc-500 select-none mr-2">&gt;</span>
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
type CategoryKey = "basic" | "params" | "return" | "hoisting";

interface CategoryDemo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<CategoryKey, CategoryDemo> = {
  basic: {
    label: "Basic Declaration",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "A function declaration defines a named function using the function keyword. It creates a reusable block of code that can be called by name anywhere in its scope.",
    codeSnippet: `function greet() {
  console.log("Hello, welcome!");
  console.log("Functions are reusable blocks of code.");
}

// Call the function
greet();
greet(); // Can be called multiple times`,
    codeOutput: [
      "Hello, welcome!",
      "Functions are reusable blocks of code.",
      "Hello, welcome!",
      "Functions are reusable blocks of code.",
    ],
  },
  params: {
    label: "With Parameters",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Parameters allow functions to accept input values. Arguments are the actual values passed when calling the function. You can define default parameter values as a fallback.",
    codeSnippet: `function greetUser(name, greeting = "Hello") {
  console.log(greeting + ", " + name + "!");
}

greetUser("Alice");
greetUser("Bob", "Hey");
greetUser("Charlie", "Welcome");`,
    codeOutput: ["Hello, Alice!", "Hey, Bob!", "Welcome, Charlie!"],
  },
  return: {
    label: "Return Values",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Functions can return values using the return keyword. The returned value can be stored in a variable, passed to another function, or used in an expression. Execution stops at the return statement.",
    codeSnippet: `function calculateTax(income, rate) {
  const tax = income * (rate / 100);
  return tax;
}

// Real-world payroll app usage
const salary = 75000;
const taxAmount = calculateTax(salary, 22);
console.log("Income: $" + salary);
console.log("Tax (22%): $" + taxAmount);
console.log("Net Pay: $" + (salary - taxAmount));`,
    codeOutput: ["Income: $75000", "Tax (22%): $16500", "Net Pay: $58500"],
  },
  hoisting: {
    label: "Hoisting",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Function declarations are hoisted to the top of their scope. This means you can call a function before it appears in the code. This is a unique feature of function declarations (not expressions or arrows).",
    codeSnippet: `// Calling BEFORE the declaration works!
const result = add(5, 3);
console.log("5 + 3 = " + result);

const area = circleArea(7);
console.log("Circle area (r=7): " + area.toFixed(2));

// Declarations below the calls
function add(a, b) {
  return a + b;
}

function circleArea(radius) {
  return Math.PI * radius * radius;
}`,
    codeOutput: ["5 + 3 = 8", "Circle area (r=7): 153.94"],
  },
};

const order: CategoryKey[] = ["basic", "params", "return", "hoisting"];

// ─── anatomy table data ──────────────────────────────────────────────────────
interface AnatomyRow {
  part: string;
  syntax: string;
  purpose: string;
}

const anatomyRows: AnatomyRow[] = [
  {
    part: "function keyword",
    syntax: "function",
    purpose: "Declares that a function is being defined",
  },
  {
    part: "Name",
    syntax: "calculateTax",
    purpose: "Identifier used to call the function later",
  },
  {
    part: "Parameters",
    syntax: "(income, rate)",
    purpose: "Placeholders for input values the function accepts",
  },
  {
    part: "Body",
    syntax: "{ ... }",
    purpose: "Block of code that executes when the function is called",
  },
  {
    part: "Return",
    syntax: "return tax;",
    purpose: "Sends a value back to the caller and exits the function",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function FunctionDeclarationVisualization() {
  const [selected, setSelected] = useState<CategoryKey>("basic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: CategoryKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Function Declaration</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Category selector chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {order.map((key) => {
            const d = demos[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`rounded-xl border p-3 text-left transition-all ${
                  isActive
                    ? d.color + " shadow-sm ring-1 ring-current/20"
                    : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold">{d.label}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Detail card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl border p-4 space-y-3 ${demo.color}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{demo.label}</span>
              <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                function
              </Badge>
            </div>
            <p className="text-sm leading-relaxed">{demo.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Code + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Code</p>
            <AnimatePresence mode="wait">
              <motion.pre
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]"
              >
                {demo.codeSnippet}
              </motion.pre>
            </AnimatePresence>
            <Button size="sm" onClick={() => setOutputLines(demo.codeOutput)}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <ConsoleOutput lines={outputLines} />
          </div>
        </div>

        {/* Real-world example callout */}
        <div className="rounded-xl border bg-violet-500/10 border-violet-500/30 p-4 space-y-2">
          <p className="text-xs font-semibold text-violet-700 dark:text-violet-300 uppercase tracking-wide">
            Real-World Example: Payroll App
          </p>
          <pre className="text-xs font-mono rounded-lg bg-black/5 dark:bg-white/5 px-3 py-2 whitespace-pre overflow-x-auto">
{`function calculateTax(income, rate) {
  return income * (rate / 100);
}

// Used across the payroll system
const federalTax = calculateTax(75000, 22);  // $16500
const stateTax   = calculateTax(75000, 5);   // $3750
const totalTax   = federalTax + stateTax;    // $20250`}
          </pre>
          <p className="text-[11px] text-muted-foreground">
            A single <code className="font-mono font-semibold">calculateTax</code> function can be reused
            with different rates throughout the application, keeping the code DRY and maintainable.
          </p>
        </div>

        {/* Anatomy of a Function table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Anatomy of a Function
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Part</span>
              <span className="text-center font-mono">Syntax</span>
              <span>Purpose</span>
            </div>
            {anatomyRows.map((row) => (
              <div
                key={row.part}
                className="grid grid-cols-3 px-3 py-2.5 border-t hover:bg-muted/40 transition-colors"
              >
                <span className="font-semibold">{row.part}</span>
                <span className="text-center text-blue-600 dark:text-blue-400 font-mono text-[11px]">
                  {row.syntax}
                </span>
                <span className="text-muted-foreground">{row.purpose}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Function declarations are hoisted, meaning they can be called before they appear in the source code.
            This distinguishes them from function expressions and arrow functions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
