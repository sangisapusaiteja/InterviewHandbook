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
type Tab = "arraySpread" | "objectSpread" | "functionArgs" | "shallowWarning";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

const tabColor: Record<Tab, string> = {
  arraySpread:    "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  objectSpread:   "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  functionArgs:   "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  shallowWarning: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

const tabBadgeColor: Record<Tab, string> = {
  arraySpread:    "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  objectSpread:   "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  functionArgs:   "bg-violet-500/20 text-violet-700 dark:text-violet-300",
  shallowWarning: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
};

const tabs: { key: Tab; label: string }[] = [
  { key: "arraySpread",    label: "Array Spread" },
  { key: "objectSpread",   label: "Object Spread" },
  { key: "functionArgs",   label: "Function Args" },
  { key: "shallowWarning", label: "Shallow Warning" },
];

const tabData: Record<Tab, TabInfo> = {
  arraySpread: {
    label: "Array Spread",
    color: tabColor.arraySpread,
    badgeColor: tabBadgeColor.arraySpread,
    description:
      "The spread operator (...) expands an iterable (like an array) into individual elements. Use it to copy arrays, merge multiple arrays together, or insert elements at any position within a new array literal.",
    codeSnippet:
`// Copy an array
const original = [1, 2, 3];
const copy = [...original];
console.log(copy);

// Merge arrays
const a = [1, 2];
const b = [3, 4];
const merged = [...a, ...b];
console.log(merged);

// Insert elements in the middle
const start = [1, 2];
const end = [5, 6];
const inserted = [...start, 3, 4, ...end];
console.log(inserted);`,
    codeOutput: [
      "[1, 2, 3]",
      "[1, 2, 3, 4]",
      "[1, 2, 3, 4, 5, 6]",
    ],
  },
  objectSpread: {
    label: "Object Spread",
    color: tabColor.objectSpread,
    badgeColor: tabBadgeColor.objectSpread,
    description:
      "Spread also works with objects. You can shallow-copy an object, merge multiple objects together, or override specific properties. Later properties win when keys collide, making it perfect for applying default options or partial updates.",
    codeSnippet:
`// Copy an object
const user = { name: "Alice", age: 30 };
const clone = { ...user };
console.log(clone);

// Merge objects
const defaults = { theme: "light", lang: "en" };
const prefs    = { theme: "dark" };
const config   = { ...defaults, ...prefs };
console.log(config);

// Override a property
const updated = { ...user, age: 31 };
console.log(updated);`,
    codeOutput: [
      '{ name: "Alice", age: 30 }',
      '{ theme: "dark", lang: "en" }',
      '{ name: "Alice", age: 31 }',
    ],
  },
  functionArgs: {
    label: "Function Args",
    color: tabColor.functionArgs,
    badgeColor: tabBadgeColor.functionArgs,
    description:
      "When you spread an array into a function call, each element becomes a separate argument. This is especially handy with functions like Math.max or Math.min that expect individual numbers, not an array.",
    codeSnippet:
`// Math.max with spread
const nums = [3, 7, 1, 9, 4];
console.log(Math.max(...nums));
console.log(Math.min(...nums));

// Passing array as separate arguments
function greet(first, second, third) {
  console.log(\`Hello \${first}, \${second}, and \${third}!\`);
}

const names = ["Alice", "Bob", "Carol"];
greet(...names);`,
    codeOutput: [
      "9",
      "1",
      '"Hello Alice, Bob, and Carol!"',
    ],
  },
  shallowWarning: {
    label: "Shallow Warning",
    color: tabColor.shallowWarning,
    badgeColor: tabBadgeColor.shallowWarning,
    description:
      "Spread performs a shallow copy only. Top-level primitives are duplicated, but nested objects and arrays are copied by reference. Mutating a nested value in the copy will also affect the original, which is a common source of bugs.",
    codeSnippet:
`const original = {
  name: "Alice",
  scores: [90, 85, 92]   // nested array (reference)
};

const copy = { ...original };

// Mutate the nested array via the copy
copy.scores.push(100);

console.log("copy.scores:",     copy.scores);
console.log("original.scores:", original.scores);
console.log("Same ref?", copy.scores === original.scores);

// Top-level primitives ARE independent
copy.name = "Bob";
console.log("copy.name:",     copy.name);
console.log("original.name:", original.name);`,
    codeOutput: [
      "copy.scores: [90, 85, 92, 100]",
      "original.scores: [90, 85, 92, 100]",
      "Same ref? true",
      'copy.name: "Bob"',
      'original.name: "Alice"',
    ],
  },
};

// ─── Comparison table: Spread vs Rest ─────────────────────────────────────────
const comparisonRows = [
  { feature: "Context",  spread: "Function calls, array/object literals", rest: "Function parameters, destructuring" },
  { feature: "Syntax",   spread: "fn(...arr) / [...arr] / {...obj}",      rest: "function fn(...args) / const [a, ...rest] = arr" },
  { feature: "Purpose",  spread: "Expands elements out",                  rest: "Collects elements in" },
  { feature: "Example",  spread: "Math.max(...[1,2,3])",                  rest: "function sum(...nums) {}" },
];

function ComparisonTable() {
  return (
    <div className="rounded-xl border overflow-hidden text-xs">
      <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
        <span>Feature</span>
        <span className="text-blue-600 dark:text-blue-400">Spread (...)</span>
        <span className="text-orange-600 dark:text-orange-400">Rest (...)</span>
      </div>
      {comparisonRows.map((row) => (
        <div
          key={row.feature}
          className="grid grid-cols-3 px-3 py-2 border-t items-start gap-2"
        >
          <span className="font-semibold">{row.feature}</span>
          <span className="text-[11px] text-muted-foreground">{row.spread}</span>
          <span className="text-[11px] text-muted-foreground">{row.rest}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function SpreadOperatorVisualization() {
  const [selected, setSelected]       = useState<Tab>("arraySpread");
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
        <CardTitle className="text-lg">Spread Operator Visualizer</CardTitle>
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
                  spread operator
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

            {/* Comparison table */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Spread vs Rest</p>
              <ComparisonTable />
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
