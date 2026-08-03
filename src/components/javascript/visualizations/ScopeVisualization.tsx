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
type ScopeKey = "global" | "function" | "block" | "lexical";

interface ScopeDemo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  example: string;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<ScopeKey, ScopeDemo> = {
  global: {
    label: "Global Scope",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Variables declared outside any function or block live in the global scope. They are accessible from anywhere in the program. In browsers, global variables become properties of the window object.",
    example: `var globalVar = "I am global";
let globalLet = "Also global";

function greet() {
  // Can access global variables here
  console.log(globalVar);  // "I am global"
  console.log(globalLet);  // "Also global"
}

greet();
console.log(globalVar);    // "I am global"`,
    output: [
      '"I am global"',
      '"Also global"',
      '"I am global"',
    ],
  },
  function: {
    label: "Function Scope",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Variables declared inside a function are only accessible within that function. Each function invocation creates its own scope. The var keyword is function-scoped, meaning it is confined to the nearest enclosing function.",
    example: `function calculateArea() {
  var width = 10;
  var height = 5;
  var area = width * height;
  console.log(area);       // 50
}

calculateArea();
// console.log(width);     // ReferenceError
// console.log(area);      // ReferenceError

function outer() {
  var x = "outer";
  function inner() {
    console.log(x);        // "outer" (accessible)
  }
  inner();
}
outer();`,
    output: ["50", '"outer"'],
  },
  block: {
    label: "Block Scope",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Variables declared with let or const inside a block (curly braces) are confined to that block. This includes if statements, for loops, and any {} block. Note that var ignores block scope and leaks out.",
    example: `if (true) {
  let blockLet = "block let";
  const blockConst = "block const";
  var blockVar = "block var";
  console.log(blockLet);   // "block let"
}

// console.log(blockLet);  // ReferenceError
// console.log(blockConst);// ReferenceError
console.log(blockVar);     // "block var" (leaked!)

for (let i = 0; i < 3; i++) {
  // i is scoped to this loop
}
// console.log(i);         // ReferenceError`,
    output: ['"block let"', '"block var" (leaked!)'],
  },
  lexical: {
    label: "Lexical Scope",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Lexical scope means a function&apos;s scope is determined by where it is written in the source code, not where it is called. Inner functions can access variables from their outer (enclosing) functions. This is the foundation of closures.",
    example: `function createMultiplier(factor) {
  // factor is in the lexical scope
  return function(number) {
    return factor * number;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));    // 10
console.log(triple(5));    // 15

// The inner function "remembers"
// its lexical scope (closure)
console.log(double(10));   // 20`,
    output: ["10", "15", "20"],
  },
};

const order: ScopeKey[] = ["global", "function", "block", "lexical"];

// ─── scope chain visualization data ──────────────────────────────────────────
interface ScopeLayer {
  name: string;
  color: string;
  borderColor: string;
  variables: string[];
}

const scopeLayers: ScopeLayer[] = [
  {
    name: "Global Scope",
    color: "bg-blue-500/10",
    borderColor: "border-blue-500/50",
    variables: ["var appName = \"MyApp\"", "const VERSION = 1"],
  },
  {
    name: "Function Scope (outer)",
    color: "bg-emerald-500/10",
    borderColor: "border-emerald-500/50",
    variables: ["let userName = \"Alice\"", "var count = 0"],
  },
  {
    name: "Block Scope (if)",
    color: "bg-violet-500/10",
    borderColor: "border-violet-500/50",
    variables: ["let message = \"Hello\"", "const temp = 42"],
  },
];

// ─── comparison table data ───────────────────────────────────────────────────
interface ComparisonRow {
  scopeType: string;
  createdBy: string;
  accessRules: string;
  varBehavior: string;
  letConstBehavior: string;
  color: string;
}

const comparisonRows: ComparisonRow[] = [
  {
    scopeType: "Global",
    createdBy: "Top-level code",
    accessRules: "Accessible everywhere",
    varBehavior: "Attached to window (browser)",
    letConstBehavior: "Not on window, but globally accessible",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    scopeType: "Function",
    createdBy: "Function declarations / expressions",
    accessRules: "Only inside the function",
    varBehavior: "Confined to function",
    letConstBehavior: "Confined to function",
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    scopeType: "Block",
    createdBy: "if, for, while, {} blocks",
    accessRules: "Only inside the block",
    varBehavior: "Ignores block, leaks out",
    letConstBehavior: "Confined to block",
    color: "text-violet-600 dark:text-violet-400",
  },
  {
    scopeType: "Lexical",
    createdBy: "Nesting functions in source code",
    accessRules: "Inner accesses outer, not vice versa",
    varBehavior: "Follows scope chain outward",
    letConstBehavior: "Follows scope chain outward",
    color: "text-orange-600 dark:text-orange-400",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function ScopeVisualization() {
  const [selected, setSelected] = useState<ScopeKey>("global");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [highlightedLayer, setHighlightedLayer] = useState<number | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: ScopeKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Scope &amp; Lexical Scope</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Scope type selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const d = demos[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? d.color + " shadow-sm ring-1 ring-current/20"
                    : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {d.label}
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
                Scope Type
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
                {demo.example}
              </motion.pre>
            </AnimatePresence>
            <Button size="sm" onClick={() => setOutputLines(demo.output)}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <ConsoleOutput lines={outputLines} />
          </div>
        </div>

        {/* Interactive Scope Chain Visualization */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Interactive Scope Chain
          </p>
          <p className="text-xs text-muted-foreground">
            Hover over a scope layer to see how variable lookup traverses outward through the chain.
          </p>
          <div className="rounded-xl border bg-muted/20 p-4">
            <div className="space-y-0">
              {scopeLayers.map((layer, index) => (
                <motion.div
                  key={layer.name}
                  onMouseEnter={() => setHighlightedLayer(index)}
                  onMouseLeave={() => setHighlightedLayer(null)}
                  className={`rounded-xl border-2 p-4 transition-all cursor-pointer ${
                    layer.borderColor
                  } ${layer.color} ${
                    highlightedLayer !== null && highlightedLayer >= index
                      ? "ring-2 ring-current/20 shadow-md"
                      : ""
                  }`}
                  style={{ marginLeft: `${index * 20}px`, marginTop: index > 0 ? "8px" : "0" }}
                  animate={{
                    scale: highlightedLayer !== null && highlightedLayer >= index ? 1.01 : 1,
                  }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold">{layer.name}</span>
                    {highlightedLayer !== null && highlightedLayer > index && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[10px] font-mono text-amber-600 dark:text-amber-400"
                      >
                        &#x2191; lookup reaches here
                      </motion.span>
                    )}
                    {highlightedLayer === index && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400"
                      >
                        &#x2190; lookup starts here
                      </motion.span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {layer.variables.map((v) => (
                      <span
                        key={v}
                        className="text-[11px] font-mono bg-black/5 dark:bg-white/10 rounded-md px-2 py-1"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="font-semibold">Scope Chain Direction:</span>
              <span>Inner scope &#x2192; Outer scope &#x2192; Global scope</span>
              <span className="italic ml-1">(variables are looked up outward, never inward)</span>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Scope Reference Table
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-5 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Scope Type</span>
              <span>Created By</span>
              <span>Access Rules</span>
              <span className="font-mono">var</span>
              <span className="font-mono">let / const</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.scopeType}
                className="grid grid-cols-5 px-3 py-2.5 border-t hover:bg-muted/40 transition-colors"
              >
                <span className={`font-semibold ${row.color}`}>{row.scopeType}</span>
                <span className="text-[11px]">{row.createdBy}</span>
                <span className="text-[11px]">{row.accessRules}</span>
                <span className="text-[11px] font-mono">{row.varBehavior}</span>
                <span className="text-[11px] font-mono">{row.letConstBehavior}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground">
            JavaScript uses lexical (static) scoping &mdash; the scope chain is determined by where
            code is written, not where functions are called.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
