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
type DeclKey = "var" | "let" | "const";

interface DeclDemo {
  label: string;
  recommendation: string;
  color: string;
  badgeColor: string;
  scope: string;
  hoisting: string;
  reassign: string;
  tdz: string;
  example: string;
  description: string;
  note: string;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<DeclKey, DeclDemo> = {
  var: {
    label: "var",
    recommendation: "Avoid",
    color: "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300",
    badgeColor: "bg-red-500/20 text-red-700 dark:text-red-300",
    scope: "Function-scoped",
    hoisting: "Hoisted & initialized to undefined",
    reassign: "Yes",
    tdz: "No TDZ - accessible before declaration (as undefined)",
    example: `console.log(x); // undefined (hoisted)
var x = 10;
console.log(x); // 10

if (true) {
  var y = 20; // NOT block-scoped
}
console.log(y); // 20 (leaks out)`,
    description:
      "Function-scoped declaration that is hoisted to the top of its function. The binding is initialized to undefined before code runs.",
    note: "Avoid var in modern code - it causes bugs due to hoisting and lack of block scope.",
    output: ["undefined", "10", "20"],
  },
  let: {
    label: "let",
    recommendation: "Good",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    scope: "Block-scoped",
    hoisting: "Hoisted but NOT initialized (TDZ)",
    reassign: "Yes",
    tdz: "Yes - ReferenceError if accessed before declaration",
    example: `// console.log(a); // ReferenceError (TDZ)
let a = 5;
a = 10; // reassignment OK
console.log(a); // 10

if (true) {
  let b = 20; // block-scoped
  console.log(b); // 20
}
// console.log(b); // ReferenceError`,
    description:
      "Block-scoped declaration that can be reassigned. Hoisted but not initialized, so accessing it before the declaration causes a ReferenceError (Temporal Dead Zone).",
    note: "Use let when the variable needs to be reassigned (e.g., counters, accumulators).",
    output: ["10", "20"],
  },
  const: {
    label: "const",
    recommendation: "Best",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    scope: "Block-scoped",
    hoisting: "Hoisted but NOT initialized (TDZ)",
    reassign: "No - TypeError on reassignment",
    tdz: "Yes - ReferenceError if accessed before declaration",
    example: `const PI = 3.14159;
console.log(PI); // 3.14159
// PI = 3; // TypeError: Assignment to constant

const user = { name: "Alice" };
user.name = "Bob"; // mutation OK
console.log(user.name); // Bob
// user = {};  // TypeError: Assignment to constant`,
    description:
      "Block-scoped binding that cannot be reassigned after initialization. Must be initialized at declaration. Note: the value itself can still be mutated if it is an object or array.",
    note: "Use const by default - it signals intent and prevents accidental reassignment.",
    output: ["3.14159", "Bob"],
  },
};

const order: DeclKey[] = ["var", "let", "const"];

// ─── comparison table data ───────────────────────────────────────────────────
interface ComparisonRow {
  feature: string;
  var: string;
  let: string;
  const: string;
}

const comparisonRows: ComparisonRow[] = [
  { feature: "Scope", var: "Function", let: "Block", const: "Block" },
  { feature: "Hoisting", var: "Yes (undefined)", let: "Yes (TDZ)", const: "Yes (TDZ)" },
  { feature: "Reassign", var: "Yes", let: "Yes", const: "No" },
  { feature: "TDZ", var: "No", let: "Yes", const: "Yes" },
  { feature: "Must Initialize", var: "No", let: "No", const: "Yes" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function VariablesVisualization() {
  const [selected, setSelected] = useState<DeclKey>("const");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: DeclKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Variables (var, let, const)</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Declaration selector cards */}
        <div className="grid grid-cols-3 gap-3">
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
                    {d.recommendation}
                  </Badge>
                </div>
                <p className="text-[11px] opacity-80">{d.scope}</p>
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
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-mono">{demo.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                  {demo.recommendation}
                </Badge>
              </div>
            </div>
            <p className="text-sm leading-relaxed">{demo.description}</p>

            {/* Properties grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-black/5 dark:bg-white/5 px-3 py-2">
                <span className="font-semibold">Scope: </span>
                <span className="opacity-80">{demo.scope}</span>
              </div>
              <div className="rounded-lg bg-black/5 dark:bg-white/5 px-3 py-2">
                <span className="font-semibold">Hoisting: </span>
                <span className="opacity-80">{demo.hoisting}</span>
              </div>
              <div className="rounded-lg bg-black/5 dark:bg-white/5 px-3 py-2">
                <span className="font-semibold">Reassign: </span>
                <span className="opacity-80">{demo.reassign}</span>
              </div>
              <div className="rounded-lg bg-black/5 dark:bg-white/5 px-3 py-2">
                <span className="font-semibold">TDZ: </span>
                <span className="opacity-80">{demo.tdz}</span>
              </div>
            </div>

            <p className="text-xs opacity-80 italic">{demo.note}</p>
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

        {/* Comparison Table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Comparison Table
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Feature</span>
              <span className="text-center font-mono">var</span>
              <span className="text-center font-mono">let</span>
              <span className="text-center font-mono">const</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-4 px-3 py-2.5 border-t hover:bg-muted/40 transition-colors"
              >
                <span className="font-semibold">{row.feature}</span>
                <span className="text-center text-red-600 dark:text-red-400 font-mono text-[11px]">
                  {row.var}
                </span>
                <span className="text-center text-blue-600 dark:text-blue-400 font-mono text-[11px]">
                  {row.let}
                </span>
                <span className="text-center text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                  {row.const}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Prefer <code className="font-mono font-semibold">const</code> by default, use{" "}
            <code className="font-mono font-semibold">let</code> when reassignment is needed, avoid{" "}
            <code className="font-mono font-semibold">var</code> in modern JavaScript.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
