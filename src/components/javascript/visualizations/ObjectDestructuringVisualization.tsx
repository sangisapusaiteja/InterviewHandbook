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
type Tab = "basicRename" | "defaultsRest" | "arrayDestructuring" | "nestedParams";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

const tabColor: Record<Tab, string> = {
  basicRename:         "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  defaultsRest:        "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  arrayDestructuring:  "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  nestedParams:        "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

const tabBadgeColor: Record<Tab, string> = {
  basicRename:         "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  defaultsRest:        "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  arrayDestructuring:  "bg-violet-500/20 text-violet-700 dark:text-violet-300",
  nestedParams:        "bg-orange-500/20 text-orange-700 dark:text-orange-300",
};

const tabs: { key: Tab; label: string }[] = [
  { key: "basicRename",        label: "Basic & Rename" },
  { key: "defaultsRest",       label: "Defaults & Rest" },
  { key: "arrayDestructuring", label: "Array Destructuring" },
  { key: "nestedParams",       label: "Nested & Params" },
];

const tabData: Record<Tab, TabInfo> = {
  basicRename: {
    label: "Basic & Rename",
    color: tabColor.basicRename,
    badgeColor: tabBadgeColor.basicRename,
    description:
      "Object destructuring lets you unpack properties from an object into distinct variables using a concise syntax. You can also rename variables during extraction using the colon (:) alias syntax, which is especially useful when property names conflict with existing variables or are not descriptive enough.",
    codeSnippet:
`const user = { name: "Alice", age: 30, role: "admin" };

// Basic destructuring
const { name, age, role } = user;
console.log(name);  // "Alice"
console.log(age);   // 30

// Renaming with : syntax
const { name: userName, role: userRole } = user;
console.log(userName);  // "Alice"
console.log(userRole);  // "admin"`,
    codeOutput: [
      '"Alice"',
      "30",
      '"Alice"',
      '"admin"',
    ],
  },
  defaultsRest: {
    label: "Defaults & Rest",
    color: tabColor.defaultsRest,
    badgeColor: tabBadgeColor.defaultsRest,
    description:
      "Default values kick in when a destructured property is undefined, preventing errors and providing sensible fallbacks. The rest pattern (...rest) collects all remaining properties that were not explicitly destructured into a new object, making it easy to separate known fields from everything else.",
    codeSnippet:
`const config = { theme: "dark", lang: "en", debug: true };

// Default values
const { theme, lang, verbose = false } = config;
console.log(verbose);  // false (default applied)

// Rest pattern
const { theme: t, ...rest } = config;
console.log(t);     // "dark"
console.log(rest);  // { lang: "en", debug: true }`,
    codeOutput: [
      "false",
      '"dark"',
      '{ lang: "en", debug: true }',
    ],
  },
  arrayDestructuring: {
    label: "Array Destructuring",
    color: tabColor.arrayDestructuring,
    badgeColor: tabBadgeColor.arrayDestructuring,
    description:
      "Array destructuring extracts values by position rather than by name. You can skip elements with empty comma slots and even swap two variables without a temporary variable. This positional approach pairs perfectly with functions that return tuples like React's useState.",
    codeSnippet:
`const colors = ["red", "green", "blue", "yellow"];

// Positional destructuring
const [first, second] = colors;
console.log(first);   // "red"
console.log(second);  // "green"

// Skip elements
const [, , third] = colors;
console.log(third);   // "blue"

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b);    // 2 1`,
    codeOutput: [
      '"red"',
      '"green"',
      '"blue"',
      "2 1",
    ],
  },
  nestedParams: {
    label: "Nested & Params",
    color: tabColor.nestedParams,
    badgeColor: tabBadgeColor.nestedParams,
    description:
      "Nested destructuring reaches into deeply structured objects to extract values at any depth. Function parameter destructuring lets you pull specific properties directly from an object argument in the function signature, making APIs cleaner and call sites more readable.",
    codeSnippet:
`// Nested destructuring
const company = {
  name: "Acme",
  address: { city: "NYC", zip: "10001" }
};
const { address: { city, zip } } = company;
console.log(city);  // "NYC"
console.log(zip);   // "10001"

// Function parameter destructuring
function greet({ name, age = 25 }) {
  console.log(\`Hi \${name}, age \${age}\`);
}
greet({ name: "Bob" });
greet({ name: "Carol", age: 32 });`,
    codeOutput: [
      '"NYC"',
      '"10001"',
      '"Hi Bob, age 25"',
      '"Hi Carol, age 32"',
    ],
  },
};

// ─── Comparison table: Destructuring Patterns ─────────────────────────────────
const comparisonRows = [
  { pattern: "Basic extract",       syntax: "const { a } = obj",            example: '{ a: 1 } => a = 1' },
  { pattern: "Rename / alias",      syntax: "const { a: x } = obj",        example: '{ a: 1 } => x = 1' },
  { pattern: "Default value",       syntax: "const { a = 10 } = obj",      example: '{} => a = 10' },
  { pattern: "Rest pattern",        syntax: "const { a, ...r } = obj",     example: '{ a:1, b:2 } => r = { b:2 }' },
  { pattern: "Array positional",    syntax: "const [a, b] = arr",          example: '[1, 2] => a=1, b=2' },
  { pattern: "Skip elements",       syntax: "const [, , c] = arr",         example: '[1, 2, 3] => c = 3' },
  { pattern: "Nested object",       syntax: "const { a: { b } } = obj",   example: '{ a: { b: 1 } } => b = 1' },
  { pattern: "Param destructuring", syntax: "function f({ a }) {}",        example: 'f({ a: 1 }) => a = 1' },
];

function ComparisonTable() {
  return (
    <div className="rounded-xl border overflow-hidden text-xs">
      <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
        <span>Pattern</span>
        <span className="text-blue-600 dark:text-blue-400">Syntax</span>
        <span className="text-orange-600 dark:text-orange-400">Example</span>
      </div>
      {comparisonRows.map((row) => (
        <div
          key={row.pattern}
          className="grid grid-cols-3 px-3 py-2 border-t items-start gap-2"
        >
          <span className="font-semibold">{row.pattern}</span>
          <span className="text-[11px] text-muted-foreground font-mono">{row.syntax}</span>
          <span className="text-[11px] text-muted-foreground">{row.example}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function ObjectDestructuringVisualization() {
  const [selected, setSelected]       = useState<Tab>("basicRename");
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
        <CardTitle className="text-lg">Object Destructuring Visualizer</CardTitle>
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
                  destructuring
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
              <p className="text-xs font-semibold text-muted-foreground">Destructuring Patterns</p>
              <ComparisonTable />
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
