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
          <p className="text-xs text-muted-foreground italic">
            Click &#9654; Run to see output
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── types & data ─────────────────────────────────────────────────────────────
type Tab = "basic" | "expression" | "earlier" | "oldvsnew";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

const tabColor: Record<Tab, string> = {
  basic:      "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  expression: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  earlier:    "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  oldvsnew:   "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

const tabBadgeColor: Record<Tab, string> = {
  basic:      "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  expression: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  earlier:    "bg-violet-500/20 text-violet-700 dark:text-violet-300",
  oldvsnew:   "bg-orange-500/20 text-orange-700 dark:text-orange-300",
};

const tabs: { key: Tab; label: string }[] = [
  { key: "basic",      label: "Basic Defaults" },
  { key: "expression", label: "Expression Defaults" },
  { key: "earlier",    label: "Using Earlier Params" },
  { key: "oldvsnew",   label: "Old vs New" },
];

const tabData: Record<Tab, TabInfo> = {
  basic: {
    label: "Basic Defaults",
    color: tabColor.basic,
    badgeColor: tabBadgeColor.basic,
    description:
      "Default parameter values are used when an argument is not provided or is explicitly undefined. They let you write cleaner function signatures without manual checks inside the body.",
    codeSnippet:
`function greet(name = "World") {
  return "Hello, " + name + "!";
}

console.log(greet());          // no arg
console.log(greet("Alice"));   // with arg
console.log(greet(undefined)); // explicit undefined`,
    codeOutput: [
      '"Hello, World!"',
      '"Hello, Alice!"',
      '"Hello, World!"',
    ],
  },
  expression: {
    label: "Expression Defaults",
    color: tabColor.expression,
    badgeColor: tabBadgeColor.expression,
    description:
      "Default values are not limited to simple literals — they can be any valid expression, including function calls, ternary operators, and computed values. The expression is evaluated at call time, not at definition time.",
    codeSnippet:
`function tax(price, rate = price > 100 ? 0.2 : 0.1) {
  return price * rate;
}

console.log(tax(200));   // price > 100 -> rate = 0.2
console.log(tax(50));    // price <= 100 -> rate = 0.1
console.log(tax(200, 0.05)); // explicit rate`,
    codeOutput: [
      "40",
      "5",
      "10",
    ],
  },
  earlier: {
    label: "Using Earlier Params",
    color: tabColor.earlier,
    badgeColor: tabBadgeColor.earlier,
    description:
      "Later parameters can reference earlier ones in their default expressions. This creates a left-to-right dependency chain. However, earlier parameters cannot reference later ones — that would be a ReferenceError.",
    codeSnippet:
`function rect(w, h = w) {
  return { width: w, height: h, area: w * h };
}

console.log(rect(5));       // h defaults to w
console.log(rect(5, 10));   // h explicitly set

function createUser(name, greeting = "Hi, " + name) {
  return greeting;
}
console.log(createUser("Bob"));`,
    codeOutput: [
      '{ width: 5, height: 5, area: 25 }',
      '{ width: 5, height: 10, area: 50 }',
      '"Hi, Bob"',
    ],
  },
  oldvsnew: {
    label: "Old vs New",
    color: tabColor.oldvsnew,
    badgeColor: tabBadgeColor.oldvsnew,
    description:
      'The old pattern (param || default) is unreliable because it treats all falsy values (0, "", false, null) as missing. ES6 default parameters only trigger on undefined, which is the correct behavior in most cases.',
    codeSnippet:
`// OLD pattern — breaks on falsy values
function oldWay(count) {
  count = count || 10;
  return count;
}
console.log(oldWay(0));     // BUG: 0 is falsy -> 10
console.log(oldWay(""));    // BUG: "" is falsy -> 10
console.log(oldWay(null));  // BUG: null is falsy -> 10

// NEW ES6 — only triggers on undefined
function newWay(count = 10) {
  return count;
}
console.log(newWay(0));     // 0 (correct!)
console.log(newWay(""));    // "" (correct!)
console.log(newWay(null));  // null (correct!)`,
    codeOutput: [
      "// OLD pattern (param || default):",
      "10   // oldWay(0)   — BUG: wanted 0",
      '10   // oldWay("")  — BUG: wanted ""',
      "10   // oldWay(null) — BUG: wanted null",
      "",
      "// NEW ES6 default params:",
      "0    // newWay(0)   — correct",
      '"" // newWay("")  — correct',
      "null // newWay(null) — correct",
    ],
  },
};

// ─── Reference table: when defaults apply ─────────────────────────────────────
const referenceRows = [
  { value: "undefined",   applies: true,  note: "Uses default value" },
  { value: "null",        applies: false, note: "Stays null" },
  { value: "0",           applies: false, note: "Stays 0" },
  { value: '""',          applies: false, note: 'Stays ""' },
  { value: "false",       applies: false, note: "Stays false" },
  { value: "no argument", applies: true,  note: "Uses default value" },
];

function ReferenceTable() {
  return (
    <div className="rounded-xl border overflow-hidden text-xs">
      <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
        <span>Passed Value</span>
        <span>Default Applies?</span>
        <span>Result</span>
      </div>
      {referenceRows.map((row) => (
        <div
          key={row.value}
          className="grid grid-cols-3 px-3 py-2 border-t items-center gap-2"
        >
          <span className="font-mono font-semibold">{row.value}</span>
          <span>
            {row.applies ? (
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold">
                Yes
              </span>
            ) : (
              <span className="inline-block px-2 py-0.5 rounded bg-red-500/20 text-red-700 dark:text-red-300 font-semibold">
                No
              </span>
            )}
          </span>
          <span className="text-[11px] text-muted-foreground">{row.note}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function DefaultParametersVisualization() {
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
        <CardTitle className="text-lg">Default Parameters Visualizer</CardTitle>
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
                  {selected === "oldvsnew" ? "comparison" : "default params"}
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

            {/* Reference table */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">
                When Do Defaults Apply?
              </p>
              <ReferenceTable />
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
