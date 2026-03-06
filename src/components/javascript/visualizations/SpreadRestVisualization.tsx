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
type SpreadRestTab = "spreadArrays" | "spreadObjects" | "restOperator" | "reactPatterns";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<SpreadRestTab, GroupInfo> = {
  spreadArrays: {
    label: "Spread Arrays",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The spread operator (...) expands an array into individual elements. Use it to copy arrays, merge arrays, or pass array elements as function arguments.",
    codeSnippet: `const nums = [1, 2, 3];
const copy = [...nums];
console.log("Copy:", copy);

const a = [1, 2];
const b = [3, 4];
const merged = [...a, ...b];
console.log("Merged:", merged);

const withExtra = [0, ...nums, 4];
console.log("With extra:", withExtra);`,
    codeOutput: [
      "Copy: [1, 2, 3]",
      "Merged: [1, 2, 3, 4]",
      "With extra: [0, 1, 2, 3, 4]",
    ],
  },
  spreadObjects: {
    label: "Spread Objects",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Spread on objects copies enumerable own properties into a new object. Later properties override earlier ones, making it perfect for merging and partial updates.",
    codeSnippet: `const defaults = { theme: "light", lang: "en" };
const user = { lang: "fr", name: "Alice" };

const config = { ...defaults, ...user };
console.log("Config:", JSON.stringify(config));

// Override specific property
const updated = { ...config, theme: "dark" };
console.log("Updated:", JSON.stringify(updated));

// Shallow copy
const clone = { ...defaults };
console.log("Clone:", JSON.stringify(clone));`,
    codeOutput: [
      'Config: {"theme":"light","lang":"fr","name":"Alice"}',
      'Updated: {"theme":"dark","lang":"fr","name":"Alice"}',
      'Clone: {"theme":"light","lang":"en"}',
    ],
  },
  restOperator: {
    label: "Rest Operator",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "The rest operator (...) collects multiple elements into a single array or object. Used in function parameters and destructuring to gather remaining items.",
    codeSnippet: `// Rest in function params
function sum(...args) {
  return args.reduce((a, b) => a + b, 0);
}
console.log("Sum:", sum(1, 2, 3, 4));

// Rest in array destructuring
const [first, second, ...rest] = [10, 20, 30, 40, 50];
console.log("First:", first);
console.log("Rest:", rest);

// Rest in object destructuring
const { name, ...others } = { name: "Bob", age: 30, role: "Dev" };
console.log("Name:", name);
console.log("Others:", JSON.stringify(others));`,
    codeOutput: [
      "Sum: 10",
      "First: 10",
      "Rest: [30, 40, 50]",
      "Name: Bob",
      'Others: {"age":30,"role":"Dev"}',
    ],
  },
  reactPatterns: {
    label: "React Patterns",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Spread and rest are essential in React for immutable state updates, props forwarding, and component composition without mutating data.",
    codeSnippet: `// Immutable state update
const state = { count: 1, name: "App" };
const newState = { ...state, count: state.count + 1 };
console.log("New state:", JSON.stringify(newState));

// Props spreading
const props = { id: "btn", className: "primary", disabled: false };
console.log("Spread props:", JSON.stringify(props));
// <Button {...props} /> spreads all props

// Immutable array update (add item)
const items = ["a", "b", "c"];
const added = [...items, "d"];
console.log("Added:", added);

// Immutable array update (remove item at index 1)
const removed = [...items.slice(0, 1), ...items.slice(2)];
console.log("Removed:", removed);`,
    codeOutput: [
      'New state: {"count":2,"name":"App"}',
      'Spread props: {"id":"btn","className":"primary","disabled":false}',
      "Added: [a, b, c, d]",
      "Removed: [a, c]",
    ],
  },
};

const order: SpreadRestTab[] = ["spreadArrays", "spreadObjects", "restOperator", "reactPatterns"];

// ─── spread animation data ──────────────────────────────────────────────────
const sourceArray = ["A", "B", "C", "D"];

// ─── comparison table data ──────────────────────────────────────────────────
const comparisonRows = [
  {
    context: "Arrays",
    syntax: "...arr",
    purpose: "Expand elements",
    example: "[...arr1, ...arr2]",
  },
  {
    context: "Objects",
    syntax: "...obj",
    purpose: "Copy / merge properties",
    example: "{ ...obj1, ...obj2 }",
  },
  {
    context: "Function calls",
    syntax: "...args",
    purpose: "Spread as arguments",
    example: "Math.max(...nums)",
  },
  {
    context: "Function params",
    syntax: "...rest",
    purpose: "Collect arguments",
    example: "function f(...args) {}",
  },
  {
    context: "Destructuring",
    syntax: "...rest",
    purpose: "Gather remaining",
    example: "const [a, ...rest] = arr",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function SpreadRestVisualization() {
  const [selected, setSelected] = useState<SpreadRestTab>("spreadArrays");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [animating, setAnimating] = useState(false);
  const [spreadPhase, setSpreadPhase] = useState<"idle" | "spread" | "collect">("idle");

  const group = groups[selected];

  const handleSelect = (key: SpreadRestTab) => {
    setSelected(key);
    setOutputLines(null);
    setAnimating(false);
    setSpreadPhase("idle");
  };

  const runSpreadAnimation = async () => {
    setAnimating(true);
    setSpreadPhase("idle");
    await new Promise((r) => setTimeout(r, 300));

    // Phase 1: elements fly out (spread)
    setSpreadPhase("spread");
    await new Promise((r) => setTimeout(r, 1200));

    // Phase 2: elements collect into new array
    setSpreadPhase("collect");
    await new Promise((r) => setTimeout(r, 1200));

    setAnimating(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Spread and Rest Operators</CardTitle>
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
                  operator
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

            {/* Interactive visual for Spread Arrays */}
            {selected === "spreadArrays" && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Spread Animation
                </p>
                <div className="rounded-xl border bg-muted/20 px-4 py-5">
                  <div className="flex flex-col items-center gap-6">
                    {/* Source array */}
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-mono text-muted-foreground mr-2">source</span>
                      <span className="text-sm font-mono text-muted-foreground">[</span>
                      {sourceArray.map((el, idx) => (
                        <motion.div
                          key={`source-${idx}`}
                          animate={{
                            opacity: spreadPhase === "idle" ? 1 : 0.3,
                            scale: spreadPhase === "idle" ? 1 : 0.9,
                          }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          className="px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold"
                        >
                          {el}
                        </motion.div>
                      ))}
                      <span className="text-sm font-mono text-muted-foreground">]</span>
                    </div>

                    {/* Spread dots */}
                    <AnimatePresence>
                      {spreadPhase !== "idle" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-1"
                        >
                          <span className="text-lg font-mono font-bold text-violet-500">...</span>
                          <span className="text-xs text-muted-foreground italic ml-2">
                            {spreadPhase === "spread" ? "spreading elements" : "collecting into new array"}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Spread-out individual elements */}
                    <div className="flex items-center gap-3 min-h-[40px]">
                      {sourceArray.map((el, idx) => (
                        <motion.div
                          key={`spread-${idx}`}
                          initial={{ opacity: 0, y: -20, scale: 0.5 }}
                          animate={{
                            opacity: spreadPhase === "spread" ? 1 : spreadPhase === "collect" ? 1 : 0,
                            y: spreadPhase === "spread" ? 0 : spreadPhase === "collect" ? 0 : -20,
                            scale: spreadPhase === "spread" ? 1 : spreadPhase === "collect" ? 1 : 0.5,
                            x: spreadPhase === "spread" ? (idx - 1.5) * 12 : 0,
                          }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold"
                        >
                          {el}
                        </motion.div>
                      ))}
                    </div>

                    {/* New array */}
                    <motion.div
                      animate={{
                        opacity: spreadPhase === "collect" ? 1 : 0,
                        scale: spreadPhase === "collect" ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center gap-1"
                    >
                      <span className="text-xs font-mono text-muted-foreground mr-2">newArr</span>
                      <span className="text-sm font-mono text-muted-foreground">[</span>
                      {sourceArray.map((el, idx) => (
                        <motion.div
                          key={`new-${idx}`}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{
                            opacity: spreadPhase === "collect" ? 1 : 0,
                            scale: spreadPhase === "collect" ? 1 : 0.5,
                          }}
                          transition={{ duration: 0.4, delay: idx * 0.12 }}
                          className="px-3 py-1.5 rounded-lg bg-violet-500/20 border border-violet-500/40 text-violet-700 dark:text-violet-300 text-xs font-mono font-bold"
                        >
                          {el}
                        </motion.div>
                      ))}
                      <span className="text-sm font-mono text-muted-foreground">]</span>
                    </motion.div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={animating}
                      onClick={runSpreadAnimation}
                    >
                      <Play className="h-3.5 w-3.5 mr-1" />
                      {animating ? "Animating..." : "Animate"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Comparison table */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Spread vs Rest
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Context</span>
              <span>Syntax</span>
              <span>Purpose</span>
              <span>Example</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.context}
                className="grid grid-cols-4 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.context}
                </code>
                <code className="font-mono text-[11px] text-violet-600 dark:text-violet-400">
                  {row.syntax}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.purpose}</span>
                <code className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                  {row.example}
                </code>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
