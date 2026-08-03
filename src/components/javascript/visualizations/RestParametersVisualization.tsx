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
          <p className="text-xs text-muted-foreground italic">Click &#9654; Run to see output</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── types & data ─────────────────────────────────────────────────────────────
type Tab = "basic" | "regular" | "spread" | "realExample";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

const tabColor: Record<Tab, string> = {
  basic:       "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  regular:     "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  spread:      "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  realExample: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

const tabBadgeColor: Record<Tab, string> = {
  basic:       "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  regular:     "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  spread:      "bg-violet-500/20 text-violet-700 dark:text-violet-300",
  realExample: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
};

const tabs: { key: Tab; label: string }[] = [
  { key: "basic",       label: "Basic Rest" },
  { key: "regular",     label: "Rest + Regular" },
  { key: "spread",      label: "Spread vs Rest" },
  { key: "realExample", label: "Real Example" },
];

const tabData: Record<Tab, TabInfo> = {
  basic: {
    label: "Basic Rest",
    color: tabColor.basic,
    badgeColor: tabBadgeColor.basic,
    description:
      "The rest parameter syntax (...) collects all remaining arguments passed to a function into a real JavaScript array. Unlike the legacy arguments object, rest parameters give you a genuine Array with full access to map, filter, reduce, and every other array method.",
    codeSnippet:
`function sum(...numbers) {
  console.log(Array.isArray(numbers)); // true
  console.log(numbers);                // [1, 2, 3, 4, 5]
  return numbers.reduce((acc, n) => acc + n, 0);
}

console.log(sum(1, 2, 3, 4, 5));`,
    codeOutput: [
      "true",
      "[1, 2, 3, 4, 5]",
      "15",
    ],
  },
  regular: {
    label: "Rest + Regular",
    color: tabColor.regular,
    badgeColor: tabBadgeColor.regular,
    description:
      "Rest parameters must always be the last parameter in the function signature. You can combine them with regular positional parameters \u2014 the named parameters capture specific arguments and the rest parameter sweeps up everything that remains.",
    codeSnippet:
`function tag(first, ...rest) {
  console.log("first:", first);
  console.log("rest:", rest);
}

tag("hello", "world", "foo", "bar");
// first captures "hello", rest gets the remaining args`,
    codeOutput: [
      'first: "hello"',
      'rest: ["world", "foo", "bar"]',
    ],
  },
  spread: {
    label: "Spread vs Rest",
    color: tabColor.spread,
    badgeColor: tabBadgeColor.spread,
    description:
      "Rest and spread use the same three-dot syntax (...) but do opposite things. Rest collects multiple elements into one array (used in function parameters & destructuring). Spread expands an array or object into individual elements (used in function calls, array/object literals).",
    codeSnippet:
`// REST  \u2014 collects into an array
function greet(...names) {
  console.log(names);
}
greet("Alice", "Bob", "Carol");

// SPREAD \u2014 expands an array into arguments
const nums = [3, 7, 1, 9];
console.log(Math.max(...nums));

// SPREAD \u2014 copies / merges arrays
const a = [1, 2];
const b = [3, 4];
console.log([...a, ...b]);`,
    codeOutput: [
      '["Alice", "Bob", "Carol"]',
      "9",
      "[1, 2, 3, 4]",
    ],
  },
  realExample: {
    label: "Real Example",
    color: tabColor.realExample,
    badgeColor: tabBadgeColor.realExample,
    description:
      "Rest parameters shine in utility functions where the number of inputs varies. A logging helper can capture a severity level as the first argument and sweep all remaining messages into an array. A variadic math function can accept any count of numbers.",
    codeSnippet:
`// Logging utility
function log(level, ...messages) {
  const ts = new Date().toISOString();
  console.log(\`[\${level.toUpperCase()}] \${ts}\`);
  messages.forEach(msg => console.log("  ", msg));
}

log("warn", "Disk usage high", "CPU spike detected");

// Variadic math max
function max(...nums) {
  return nums.reduce((a, b) => (a > b ? a : b));
}

console.log(max(4, 18, 7, 2, 15));`,
    codeOutput: [
      '[WARN] 2026-03-06T12:00:00.000Z',
      '   Disk usage high',
      '   CPU spike detected',
      "18",
    ],
  },
};

// ─── Comparison table: Rest vs arguments ──────────────────────────────────────
const comparisonRows = [
  { feature: "Type",                 rest: "Real Array",              args: "Array-like object" },
  { feature: "Array methods",       rest: "Yes (map, filter, etc.)", args: "No (must convert first)" },
  { feature: "Arrow function support", rest: "Yes",                  args: "No (not available)" },
  { feature: "Named params before", rest: "Yes (rest must be last)", args: "N/A (all args indexed)" },
  { feature: "Selective capture",   rest: "Collects only remaining", args: "Contains all arguments" },
  { feature: "Destructuring",       rest: "Supported",              args: "Not supported" },
];

function ComparisonTable() {
  return (
    <div className="rounded-xl border overflow-hidden text-xs">
      <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
        <span>Feature</span>
        <span className="text-blue-600 dark:text-blue-400">Rest (...args)</span>
        <span className="text-orange-600 dark:text-orange-400">arguments</span>
      </div>
      {comparisonRows.map((row) => (
        <div
          key={row.feature}
          className="grid grid-cols-3 px-3 py-2 border-t items-start gap-2"
        >
          <span className="font-semibold">{row.feature}</span>
          <span className="text-[11px] text-muted-foreground">{row.rest}</span>
          <span className="text-[11px] text-muted-foreground">{row.args}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function RestParametersVisualization() {
  const [selected, setSelected]       = useState<Tab>("basic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const info = tabData[selected];

  const handleSelect = (key: Tab) => {
    setSelected(key);
    setOutputLines(null);
  };

  const handleRun = () => {
    setOutputLines(info.codeOutput);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Rest Parameters Visualizer</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Selector chips */}
        <div className="flex flex-wrap gap-2">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                selected === key
                  ? tabColor[key] + " scale-105 shadow-sm"
                  : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {label}
            </button>
          ))}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${info.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{info.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${info.badgeColor}`}>
                  rest parameter
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{info.description}</p>
            </div>

            {/* Code + Output */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                  {info.codeSnippet}
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

            {/* Comparison table — always visible below */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Rest vs arguments object</p>
              <ComparisonTable />
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
