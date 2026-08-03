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
type DefaultTab = "basicDefaults" | "onlyUndefined" | "expressions" | "oldVsNew";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<DefaultTab, GroupInfo> = {
  basicDefaults: {
    label: "Basic Defaults",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "ES6 lets you assign default values to function parameters. If a parameter is not passed (or is undefined), the default kicks in.",
    codeSnippet: `function greet(name = "World") {
  console.log("Hello, " + name + "!");
}

greet("Alice");
greet();
greet(undefined);

function multiply(a, b = 1) {
  console.log(a * b);
}

multiply(5, 3);
multiply(5);`,
    codeOutput: [
      'Hello, Alice!',
      'Hello, World!',
      'Hello, World!',
      '15',
      '5',
    ],
  },
  onlyUndefined: {
    label: "Only undefined",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Defaults are triggered ONLY when the argument is undefined (or omitted). Passing null, 0, '', or false does NOT trigger the default -- those are valid values.",
    codeSnippet: `function show(val = "DEFAULT") {
  console.log(typeof val, String(val));
}

show(undefined);  // triggers default
show(null);       // null is NOT undefined
show(0);          // 0 is NOT undefined
show('');         // '' is NOT undefined
show(false);      // false is NOT undefined`,
    codeOutput: [
      'string DEFAULT',
      'object null',
      'number 0',
      'string ',
      'boolean false',
    ],
  },
  expressions: {
    label: "Expressions",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Default values can be any expression: earlier parameters, function calls, or computed values. They are evaluated at call time, not at definition time.",
    codeSnippet: `function getId() {
  return Math.floor(Math.random() * 1000);
}

function createUser(name, id = getId()) {
  console.log(name + " #" + id);
}

createUser("Alice", 42);
createUser("Bob");

// Earlier param as default
function rect(w, h = w) {
  console.log(w + "x" + h);
}

rect(10, 20);
rect(10);      // h defaults to w`,
    codeOutput: [
      'Alice #42',
      'Bob #<random>',
      '10x20',
      '10x10',
    ],
  },
  oldVsNew: {
    label: "Old vs New",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Before ES6, developers used || for defaults. This is buggy because || treats 0, '', null, and false as falsy, overriding them with the default. ES6 defaults only trigger on undefined.",
    codeSnippet: `// Old pattern (buggy with falsy values)
function oldWay(x) {
  x = x || 10;
  console.log("||  pattern:", x);
}

// ES6 pattern (correct)
function newWay(x = 10) {
  console.log("ES6 default:", x);
}

oldWay(0);       // Bug! 0 is falsy
newWay(0);       // Correct! 0 is kept
oldWay('');      // Bug! '' is falsy
newWay('');      // Correct! '' is kept
oldWay(null);    // null is falsy
newWay(null);    // null is NOT undefined`,
    codeOutput: [
      '||  pattern: 10',
      'ES6 default: 0',
      '||  pattern: 10',
      'ES6 default: ',
      '||  pattern: 10',
      'ES6 default: null',
    ],
  },
};

const order: DefaultTab[] = ["basicDefaults", "onlyUndefined", "expressions", "oldVsNew"];

// ─── interactive grid data for "Only undefined" ──────────────────────────────
const triggerGrid = [
  { value: "undefined", display: "undefined", triggers: true, color: "text-red-500" },
  { value: "null", display: "null", triggers: false, color: "text-amber-500" },
  { value: "0", display: "0", triggers: false, color: "text-blue-500" },
  { value: "''", display: "'' (empty string)", triggers: false, color: "text-violet-500" },
  { value: "false", display: "false", triggers: false, color: "text-orange-500" },
];

// ─── comparison table data ───────────────────────────────────────────────────
const comparisonRows = [
  { valuePassed: "undefined", orPattern: "Uses default", es6Default: "Uses default", correct: true },
  { valuePassed: "null", orPattern: "Uses default", es6Default: "Keeps null", correct: false },
  { valuePassed: "0", orPattern: "Uses default", es6Default: "Keeps 0", correct: false },
  { valuePassed: "'' (empty)", orPattern: "Uses default", es6Default: "Keeps ''", correct: false },
  { valuePassed: "false", orPattern: "Uses default", es6Default: "Keeps false", correct: false },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function ES6DefaultParamsVisualization() {
  const [selected, setSelected] = useState<DefaultTab>("basicDefaults");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const group = groups[selected];

  const handleSelect = (key: DefaultTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">ES6 Default Parameters</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Group selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const g = groups[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? g.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {g.label}
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
                  default params
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{group.description}</p>
            </div>

            {/* Code + Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Code */}
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
              </div>

              {/* Right: Output */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>

            {/* Interactive visual for "Only undefined" */}
            {selected === "onlyUndefined" && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Does It Trigger the Default?
                </p>
                <div className="rounded-xl border bg-muted/20 px-4 py-5">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {triggerGrid.map((item) => (
                      <motion.div
                        key={item.value}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-4 ${
                          item.triggers
                            ? "bg-emerald-500/10 border-emerald-500/40"
                            : "bg-red-500/10 border-red-500/40"
                        }`}
                      >
                        <code className={`font-mono font-bold text-sm ${item.color}`}>
                          {item.display}
                        </code>
                        <span
                          className={`text-lg font-bold ${
                            item.triggers ? "text-emerald-500" : "text-red-500"
                          }`}
                        >
                          {item.triggers ? "\u2713 Default" : "\u2717 Kept"}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {item.triggers ? "triggers default" : "does NOT trigger"}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Comparison table */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Default Triggers
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Value Passed</span>
              <span>|| Pattern</span>
              <span>ES6 Default</span>
              <span>Correct?</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.valuePassed}
                className="grid grid-cols-4 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.valuePassed}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.orPattern}</span>
                <span className="text-[11px] text-muted-foreground">{row.es6Default}</span>
                <span
                  className={`font-bold ${
                    row.correct
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {row.correct ? "\u2713 Both agree" : "\u2717 || is wrong"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
