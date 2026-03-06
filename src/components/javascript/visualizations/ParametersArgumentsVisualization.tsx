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
type DemoKey = "params-vs-args" | "missing-args" | "extra-args" | "destructuring";

interface Demo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<DemoKey, Demo> = {
  "params-vs-args": {
    label: "Params vs Args",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Parameters are the names listed in a function's definition. Arguments are the actual values passed to the function when it is called. Think of parameters as placeholders and arguments as the real data.",
    codeSnippet: `// 'name' and 'age' are PARAMETERS
function greet(name, age) {
  console.log("Hello " + name + ", age " + age);
}

// "Alice" and 25 are ARGUMENTS
greet("Alice", 25);`,
    codeOutput: ['Hello Alice, age 25'],
  },
  "missing-args": {
    label: "Missing Args",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "When you call a function with fewer arguments than parameters, the missing parameters receive the value undefined. JavaScript does not throw an error for this.",
    codeSnippet: `function add(a, b) {
  console.log("a:", a);
  console.log("b:", b);
  console.log("sum:", a + b);
}

// Only one argument provided
add(5);`,
    codeOutput: ["a: 5", "b: undefined", "sum: NaN"],
  },
  "extra-args": {
    label: "Extra Args",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Extra arguments are silently ignored by named parameters but can be accessed via the special arguments object (an array-like object available inside regular functions).",
    codeSnippet: `function sum(a, b) {
  console.log("a:", a, "b:", b);
  console.log("arguments.length:", arguments.length);

  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  console.log("total:", total);
}

sum(1, 2, 3, 4);`,
    codeOutput: ["a: 1 b: 2", "arguments.length: 4", "total: 10"],
  },
  destructuring: {
    label: "Destructuring",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Destructured parameters let you extract properties from an object argument directly in the function signature. This makes function calls self-documenting and order-independent.",
    codeSnippet: `function createUser({ name, age, role = "user" }) {
  console.log("Name:", name);
  console.log("Age:", age);
  console.log("Role:", role);
}

createUser({ name: "Bob", age: 30 });
createUser({ name: "Eve", age: 22, role: "admin" });`,
    codeOutput: ["Name: Bob", "Age: 30", "Role: user", "Name: Eve", "Age: 22", "Role: admin"],
  },
};

const order: DemoKey[] = ["params-vs-args", "missing-args", "extra-args", "destructuring"];

// ─── comparison table data ───────────────────────────────────────────────────
interface ComparisonRow {
  concept: string;
  location: string;
  example: string;
}

const comparisonRows: ComparisonRow[] = [
  {
    concept: "Parameter",
    location: "Function definition",
    example: "function greet(name) {}",
  },
  {
    concept: "Argument",
    location: "Function call",
    example: 'greet("Alice")',
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function ParametersArgumentsVisualization() {
  const [selected, setSelected] = useState<DemoKey>("params-vs-args");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: DemoKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Parameters &amp; Arguments</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Selectable chips */}
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
                  <span className="text-sm font-bold font-mono">{d.label}</span>
                  <Badge
                    variant="secondary"
                    className={`text-[10px] ${isActive ? d.badgeColor : ""}`}
                  >
                    {key === "params-vs-args"
                      ? "Core"
                      : key === "missing-args"
                      ? "Gotcha"
                      : key === "extra-args"
                      ? "Advanced"
                      : "ES6+"}
                  </Badge>
                </div>
                <p className="text-[11px] opacity-80 line-clamp-1">{d.description}</p>
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
              <span className="text-lg font-bold font-mono">{demo.label}</span>
              <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                {selected === "params-vs-args"
                  ? "Core"
                  : selected === "missing-args"
                  ? "Gotcha"
                  : selected === "extra-args"
                  ? "Advanced"
                  : "ES6+"}
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

        {/* Comparison Table: Parameters vs Arguments */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Parameters vs Arguments
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Concept</span>
              <span>Location</span>
              <span>Example</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.concept}
                className="grid grid-cols-3 px-3 py-2.5 border-t hover:bg-muted/40 transition-colors"
              >
                <span className="font-semibold">{row.concept}</span>
                <span className="text-muted-foreground">{row.location}</span>
                <code className="font-mono text-[11px] text-blue-600 dark:text-blue-400">
                  {row.example}
                </code>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Remember: <span className="font-semibold">parameters</span> are variables in the
            declaration, <span className="font-semibold">arguments</span> are the values you pass in.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
