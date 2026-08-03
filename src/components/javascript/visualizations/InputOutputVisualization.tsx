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
          {lines.map((line) => (
            <p key={line} className="text-emerald-400">
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
type ConsoleMethod = "log" | "warn-error" | "table" | "time" | "alert-prompt";

interface MethodInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  useCase: string;
  codeSnippet: string;
  codeOutput: string[];
  hasTable?: boolean;
  hasDialogMockup?: boolean;
}

// ─── data ─────────────────────────────────────────────────────────────────────
const methods: Record<ConsoleMethod, MethodInfo> = {
  log: {
    label: "console.log",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The most common debugging tool. Prints any value to the browser console.",
    useCase:
      "Use it to inspect variables, trace execution flow, and verify data at any point in your code.",
    codeSnippet: `let name = "Alice";
let age = 25;
console.log("Hello", name);
console.log("Age:", age);
console.log("Type:", typeof age);
console.log({ name, age });`,
    codeOutput: [
      'Hello Alice',
      'Age: 25',
      'Type: number',
      '{ name: "Alice", age: 25 }',
    ],
  },
  "warn-error": {
    label: "console.warn/error",
    color: "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
    badgeColor: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
    description:
      "console.warn() displays a warning with a yellow icon. console.error() displays an error with a red icon and stack trace.",
    useCase:
      "Use warn for deprecation notices or non-critical issues. Use error for caught exceptions or failed operations.",
    codeSnippet: `console.warn("Deprecated: use newFunc()");
console.error("Failed to fetch user data");

try {
  JSON.parse("invalid json");
} catch (e) {
  console.error("Parse error:", e.message);
}`,
    codeOutput: [
      "\u26A0 Deprecated: use newFunc()",
      "\u274C Failed to fetch user data",
      "\u274C Parse error: Unexpected token 'i', \"invalid json\" is not valid JSON",
    ],
  },
  table: {
    label: "console.table",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Displays arrays or objects as a formatted, sortable table in the console.",
    useCase:
      "Perfect for visualizing arrays of objects, API responses, or any structured data you need to compare row by row.",
    codeSnippet: `const users = [
  { name: "Alice", age: 25, role: "Dev" },
  { name: "Bob",   age: 30, role: "PM" },
  { name: "Carol", age: 28, role: "QA" },
];
console.table(users);`,
    codeOutput: ["(table output below)"],
    hasTable: true,
  },
  time: {
    label: "console.time",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "console.time(label) starts a timer. console.timeEnd(label) stops it and prints the elapsed time in milliseconds.",
    useCase:
      "Use it to measure how long a function, loop, or async operation takes to execute.",
    codeSnippet: `console.time("loop");
let sum = 0;
for (let i = 0; i < 1000000; i++) {
  sum += i;
}
console.timeEnd("loop");

console.time("fetch");
// await fetch("/api/data");
console.timeEnd("fetch");`,
    codeOutput: [
      "loop: 4.231ms",
      "fetch: 0.012ms",
    ],
  },
  "alert-prompt": {
    label: "alert/prompt/confirm",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Browser dialog boxes that block execution. alert() shows a message, prompt() asks for input, confirm() asks yes/no.",
    useCase:
      "Rarely used in production. Useful for quick prototypes or debugging. They block the main thread until dismissed.",
    codeSnippet: `// Shows a message box
alert("Welcome to the app!");

// Asks for text input (returns string or null)
let name = prompt("What is your name?");
console.log("Hello,", name);

// Asks yes/no (returns true or false)
let sure = confirm("Delete this item?");
console.log("Confirmed:", sure);`,
    codeOutput: [
      "Hello, Alice",
      "Confirmed: true",
    ],
    hasDialogMockup: true,
  },
};

const order: ConsoleMethod[] = ["log", "warn-error", "table", "time", "alert-prompt"];

// ─── Table visualization for console.table ────────────────────────────────────
function TableVisualization() {
  const rows = [
    { index: 0, name: "Alice", age: 25, role: "Dev" },
    { index: 1, name: "Bob",   age: 30, role: "PM" },
    { index: 2, name: "Carol", age: 28, role: "QA" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border overflow-hidden text-xs mt-2"
    >
      <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
        <span>(index)</span>
        <span>name</span>
        <span>age</span>
        <span>role</span>
      </div>
      {rows.map((row) => (
        <div
          key={row.index}
          className="grid grid-cols-4 px-3 py-2 border-t items-center"
        >
          <code className="font-mono text-muted-foreground">{row.index}</code>
          <code className="font-mono text-emerald-600 dark:text-emerald-400">
            &quot;{row.name}&quot;
          </code>
          <code className="font-mono text-blue-600 dark:text-blue-400">{row.age}</code>
          <code className="font-mono text-emerald-600 dark:text-emerald-400">
            &quot;{row.role}&quot;
          </code>
        </div>
      ))}
    </motion.div>
  );
}

// ─── Dialog mockups for alert/prompt/confirm ──────────────────────────────────
function DialogMockups() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3 mt-2"
    >
      {/* alert() mockup */}
      <div className="rounded-xl border bg-white dark:bg-zinc-900 p-4 shadow-sm">
        <p className="text-[10px] font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
          alert()
        </p>
        <div className="rounded-lg border bg-muted/30 p-3 text-center space-y-3">
          <p className="text-sm">Welcome to the app!</p>
          <div className="flex justify-center">
            <span className="px-4 py-1 rounded-md bg-blue-500 text-white text-xs font-semibold">
              OK
            </span>
          </div>
        </div>
      </div>

      {/* prompt() mockup */}
      <div className="rounded-xl border bg-white dark:bg-zinc-900 p-4 shadow-sm">
        <p className="text-[10px] font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
          prompt()
        </p>
        <div className="rounded-lg border bg-muted/30 p-3 space-y-3">
          <p className="text-sm text-center">What is your name?</p>
          <div className="rounded-md border bg-white dark:bg-zinc-800 px-3 py-1.5 text-sm text-muted-foreground">
            Alice
          </div>
          <div className="flex justify-center gap-2">
            <span className="px-4 py-1 rounded-md bg-muted text-xs font-semibold">
              Cancel
            </span>
            <span className="px-4 py-1 rounded-md bg-blue-500 text-white text-xs font-semibold">
              OK
            </span>
          </div>
        </div>
      </div>

      {/* confirm() mockup */}
      <div className="rounded-xl border bg-white dark:bg-zinc-900 p-4 shadow-sm">
        <p className="text-[10px] font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
          confirm()
        </p>
        <div className="rounded-lg border bg-muted/30 p-3 text-center space-y-3">
          <p className="text-sm">Delete this item?</p>
          <div className="flex justify-center gap-2">
            <span className="px-4 py-1 rounded-md bg-muted text-xs font-semibold">
              Cancel
            </span>
            <span className="px-4 py-1 rounded-md bg-blue-500 text-white text-xs font-semibold">
              OK
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function InputOutputVisualization() {
  const [selected, setSelected]       = useState<ConsoleMethod>("log");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [showExtra, setShowExtra]     = useState(false);

  const method = methods[selected];

  const handleSelect = (key: ConsoleMethod) => {
    setSelected(key);
    setOutputLines(null);
    setShowExtra(false);
  };

  const handleRun = () => {
    setOutputLines(method.codeOutput);
    if (method.hasTable || method.hasDialogMockup) {
      setShowExtra(true);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">JavaScript Input & Output</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Method selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const m = methods[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? m.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {m.label}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${method.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{method.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${method.badgeColor}`}>
                  {method.hasDialogMockup ? "browser dialog" : "console"}
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{method.description}</p>
              <p className="leading-relaxed opacity-75 mt-1 text-xs">{method.useCase}</p>
            </div>

            {/* Two-column: code + output | extra visualization */}
            <div className={`grid grid-cols-1 ${method.hasTable || method.hasDialogMockup ? "md:grid-cols-2" : ""} gap-4`}>
              {/* Left: Code + Output */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {method.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={handleRun}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                  <ConsoleOutput lines={outputLines} />
                </div>
              </div>

              {/* Right: Extra visualization (table or dialog mockups) */}
              {showExtra && method.hasTable && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">
                    Table Output
                  </p>
                  <TableVisualization />
                </div>
              )}
              {showExtra && method.hasDialogMockup && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">
                    Dialog Mockups
                  </p>
                  <DialogMockups />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
