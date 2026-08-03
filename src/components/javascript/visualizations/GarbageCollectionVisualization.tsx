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
type GCTab = "markSweep" | "refCounting" | "memoryLeaks" | "bestPractices";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<GCTab, GroupInfo> = {
  markSweep: {
    label: "Mark & Sweep",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Mark &amp; Sweep is the primary garbage collection algorithm in modern JavaScript engines. The GC starts from root objects (global scope, active call stack) and marks every object reachable from them. Any unmarked objects are then swept (freed) from memory.",
    codeSnippet: `// Objects reachable from root are kept
let user = { name: "Alice" };
let admin = user; // two references

user = null; // still reachable via admin
// { name: "Alice" } is NOT collected

admin = null; // no more references
// { name: "Alice" } is now unreachable
// GC will collect it in the next cycle

console.log("user:", user);
console.log("admin:", admin);
console.log("Object collected by GC");`,
    codeOutput: [
      "user: null",
      "admin: null",
      "Object collected by GC",
    ],
  },
  refCounting: {
    label: "Reference Counting",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Reference counting tracks how many references point to each object. When the count drops to zero, the object is freed. However, this approach fails with circular references where two objects reference each other but are unreachable from the root.",
    codeSnippet: `// Circular reference problem
function createCycle() {
  const objA = {};
  const objB = {};
  objA.ref = objB; // A -> B
  objB.ref = objA; // B -> A
  // Both have refCount = 1 after
  // function returns, but are
  // unreachable from root
}
createCycle();
// With ref counting alone, these
// would NEVER be collected!
// Mark & Sweep handles this correctly

console.log("Cycle created and exited");
console.log("Ref counting: leak!");
console.log("Mark & Sweep: collected!");`,
    codeOutput: [
      "Cycle created and exited",
      "Ref counting: leak!",
      "Mark & Sweep: collected!",
    ],
  },
  memoryLeaks: {
    label: "Memory Leaks",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Memory leaks happen when objects that are no longer needed remain reachable, preventing the garbage collector from reclaiming them. Common causes include accidental globals, forgotten timers, closures retaining large scopes, and detached DOM nodes.",
    codeSnippet: `// 1. Accidental global variable
function leak() {
  leaked = "I am global now!";
}
leak();
console.log("Global leak:", leaked);

// 2. Forgotten timer
const data = loadHugeData();
const id = setInterval(() => {
  // data is retained forever
  process(data);
}, 1000);
// Fix: clearInterval(id);

// 3. Closure retaining scope
function outer() {
  const big = new Array(1e6);
  return function inner() {
    return big.length;
  };
}
const fn = outer();
console.log("Closure holds:", fn());
console.log("Clear refs to fix leaks");`,
    codeOutput: [
      "Global leak: I am global now!",
      "Closure holds: 1000000",
      "Clear refs to fix leaks",
    ],
  },
  bestPractices: {
    label: "Best Practices",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Use WeakMap and WeakSet for caches or metadata that should not prevent garbage collection. Nullify references when done, clear timers and event listeners, and avoid storing large objects in long-lived scopes.",
    codeSnippet: `// WeakMap: keys are weakly held
const cache = new WeakMap();

let element = { id: "btn-1" };
cache.set(element, { clicks: 10 });

console.log("Cached:", cache.has(element));

element = null;
// The entry in WeakMap is now
// eligible for garbage collection!
// No manual cleanup needed

// WeakSet example
const visited = new WeakSet();
let node = { page: "home" };
visited.add(node);
console.log("Visited:", visited.has(node));

node = null;
// node is GC-eligible, WeakSet
// won't prevent collection
console.log("Refs cleared, GC can run");`,
    codeOutput: [
      "Cached: true",
      "Visited: true",
      "Refs cleared, GC can run",
    ],
  },
};

const order: GCTab[] = ["markSweep", "refCounting", "memoryLeaks", "bestPractices"];

// ─── memory block data for interactive visualization ─────────────────────────
interface MemoryBlock {
  id: string;
  label: string;
  color: string;
  reachable: boolean;
  x: number;
  y: number;
}

const initialBlocks: MemoryBlock[] = [
  { id: "root", label: "Root", color: "bg-blue-600", reachable: true, x: 50, y: 20 },
  { id: "obj-a", label: "Object A", color: "bg-emerald-500", reachable: true, x: 20, y: 55 },
  { id: "obj-b", label: "Object B", color: "bg-emerald-500", reachable: true, x: 80, y: 55 },
  { id: "obj-c", label: "Object C", color: "bg-violet-500", reachable: false, x: 15, y: 85 },
  { id: "obj-d", label: "Object D", color: "bg-violet-500", reachable: false, x: 50, y: 85 },
  { id: "obj-e", label: "Object E", color: "bg-orange-500", reachable: false, x: 85, y: 85 },
];

const connections: [string, string][] = [
  ["root", "obj-a"],
  ["root", "obj-b"],
];

// ─── reference table data ────────────────────────────────────────────────────
const leakRows = [
  {
    cause: "Accidental Globals",
    example: "Assigning to an undeclared variable creates a global",
    fix: "Use strict mode or always declare with let/const",
  },
  {
    cause: "Forgotten Timers",
    example: "setInterval callback holds references to outer scope",
    fix: "Call clearInterval/clearTimeout when no longer needed",
  },
  {
    cause: "Closures",
    example: "Inner function retains reference to large outer scope data",
    fix: "Nullify large variables or limit closure scope",
  },
  {
    cause: "Detached DOM Nodes",
    example: "Removed elements still referenced in JavaScript variables",
    fix: "Set references to null after removing DOM elements",
  },
  {
    cause: "Event Listeners",
    example: "Listeners on removed elements keep them in memory",
    fix: "Use removeEventListener or AbortController",
  },
  {
    cause: "Large Caches",
    example: "Unbounded Map/Object used as cache grows forever",
    fix: "Use WeakMap or implement a size limit / eviction policy",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function GarbageCollectionVisualization() {
  const [selected, setSelected] = useState<GCTab>("markSweep");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [gcCollected, setGcCollected] = useState(false);
  const [gcRunning, setGcRunning] = useState(false);
  const [markedPhase, setMarkedPhase] = useState(false);

  const group = groups[selected];

  const handleSelect = (key: GCTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  const runGC = async () => {
    setGcRunning(true);
    setGcCollected(false);
    setMarkedPhase(false);

    // Phase 1: Mark reachable objects
    await new Promise((r) => setTimeout(r, 400));
    setMarkedPhase(true);

    // Phase 2: Sweep unreachable
    await new Promise((r) => setTimeout(r, 1200));
    setGcCollected(true);
    setMarkedPhase(false);

    await new Promise((r) => setTimeout(r, 400));
    setGcRunning(false);
  };

  const resetGC = () => {
    setGcCollected(false);
    setMarkedPhase(false);
    setGcRunning(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Garbage Collection in JavaScript</CardTitle>
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
                  garbage collection
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
          </motion.div>
        </AnimatePresence>

        {/* Interactive memory visualization */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Memory Visualization &mdash; Mark &amp; Sweep
          </p>
          <div className="rounded-xl border bg-muted/20 px-4 py-5">
            <div className="flex flex-col gap-4">
              {/* SVG memory graph */}
              <div className="relative w-full" style={{ height: 260 }}>
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Connection lines from root to reachable nodes */}
                  {connections.map(([from, to]) => {
                    const fromBlock = initialBlocks.find((b) => b.id === from);
                    const toBlock = initialBlocks.find((b) => b.id === to);
                    if (!fromBlock || !toBlock) return null;
                    return (
                      <motion.line
                        key={`${from}-${to}`}
                        x1={fromBlock.x}
                        y1={fromBlock.y + 5}
                        x2={toBlock.x}
                        y2={toBlock.y - 3}
                        stroke={markedPhase ? "#22c55e" : "#6b7280"}
                        strokeWidth={markedPhase ? 0.8 : 0.5}
                        strokeDasharray={markedPhase ? "0" : "2 1"}
                        initial={false}
                        animate={{
                          stroke: markedPhase ? "#22c55e" : "#6b7280",
                          strokeWidth: markedPhase ? 0.8 : 0.5,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    );
                  })}
                </svg>

                {/* Memory blocks */}
                <AnimatePresence>
                  {initialBlocks.map((block) => {
                    const isUnreachable = !block.reachable;
                    const shouldHide = isUnreachable && gcCollected;

                    if (shouldHide) return null;

                    const isMarked = markedPhase && block.reachable;
                    const isSwept = markedPhase && isUnreachable;

                    return (
                      <motion.div
                        key={block.id}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{
                          opacity: isSwept ? 0.4 : 1,
                          scale: isSwept ? 0.9 : isMarked ? 1.08 : 1,
                        }}
                        exit={{ opacity: 0, scale: 0, y: 10 }}
                        transition={{ duration: 0.5 }}
                        className="absolute flex flex-col items-center"
                        style={{
                          left: `${block.x}%`,
                          top: `${block.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div
                          className={`${block.color} text-white px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold shadow-md whitespace-nowrap ${
                            isMarked
                              ? "ring-2 ring-emerald-400 ring-offset-1 ring-offset-background"
                              : isSwept
                              ? "ring-2 ring-red-400 ring-offset-1 ring-offset-background opacity-50"
                              : ""
                          }`}
                        >
                          {block.label}
                        </div>
                        <span className="text-[9px] mt-0.5 text-muted-foreground">
                          {block.reachable ? (
                            <span className="text-emerald-600 dark:text-emerald-400">
                              {markedPhase ? "&#10003; marked" : "reachable"}
                            </span>
                          ) : (
                            <span className="text-red-500 dark:text-red-400">
                              {markedPhase
                                ? "&#10007; unmarked"
                                : gcCollected
                                ? ""
                                : "unreachable"}
                            </span>
                          )}
                        </span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Controls and status */}
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={gcRunning}
                  onClick={runGC}
                >
                  <Play className="h-3.5 w-3.5 mr-1" />
                  {gcRunning ? "Running GC..." : "Run GC"}
                </Button>
                {gcCollected && !gcRunning && (
                  <Button size="sm" variant="ghost" onClick={resetGC}>
                    Reset
                  </Button>
                )}
                <span className="text-xs text-muted-foreground">
                  {markedPhase && !gcCollected
                    ? "Phase 1: Marking reachable objects..."
                    : gcCollected
                    ? "Phase 2: Unreachable objects have been swept!"
                    : "Click Run GC to see mark &amp; sweep in action"}
                </span>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-emerald-500" />
                  <span>Reachable (kept)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-violet-500" />
                  <span>Unreachable (collected)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-blue-600" />
                  <span>Root object</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-1 bg-gray-500 rounded" />
                  <span>Reference link</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reference table */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Memory Leak Causes &amp; Fixes
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Cause</span>
              <span>Example</span>
              <span>Fix</span>
            </div>
            {leakRows.map((row) => (
              <div
                key={row.cause}
                className="grid grid-cols-3 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.cause}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.example}</span>
                <code className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                  {row.fix}
                </code>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
