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
          <p className="text-xs text-muted-foreground italic">Click Run to see output</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── types ────────────────────────────────────────────────────────────────────
type WhileTab = "basic" | "whileTrue" | "queue" | "comparison";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── colors ───────────────────────────────────────────────────────────────────
const tabColors: Record<WhileTab, { chip: string; badge: string }> = {
  basic:      { chip: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",       badge: "bg-blue-500/20 text-blue-700 dark:text-blue-300" },
  whileTrue:  { chip: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300", badge: "bg-orange-500/20 text-orange-700 dark:text-orange-300" },
  queue:      { chip: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300", badge: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300" },
  comparison: { chip: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300", badge: "bg-violet-500/20 text-violet-700 dark:text-violet-300" },
};

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<WhileTab, TabInfo> = {
  basic: {
    label: "Basic while",
    color: tabColors.basic.chip,
    badgeColor: tabColors.basic.badge,
    description:
      "The while loop checks a condition before each iteration. If the condition is true, the body executes. After the body runs, control returns to the condition check. The loop ends when the condition becomes false.",
    codeSnippet:
`let count = 0;

while (count < 5) {
  console.log("count is " + count);
  count++;
}

console.log("Loop ended, count = " + count);`,
    codeOutput: [
      '"count is 0"',
      '"count is 1"',
      '"count is 2"',
      '"count is 3"',
      '"count is 4"',
      '"Loop ended, count = 5"',
    ],
  },
  whileTrue: {
    label: "while(true) + break",
    color: tabColors.whileTrue.chip,
    badgeColor: tabColors.whileTrue.badge,
    description:
      "A while(true) loop runs indefinitely until a break statement is hit. This pattern is useful when the exit condition is complex or occurs in the middle of the loop body rather than at the top.",
    codeSnippet:
`let input = 10;

while (true) {
  if (input <= 0) {
    console.log("Stopping: input exhausted");
    break;
  }
  console.log("Processing: " + input);
  input -= 3;
}

console.log("Final input = " + input);`,
    codeOutput: [
      '"Processing: 10"',
      '"Processing: 7"',
      '"Processing: 4"',
      '"Processing: 1"',
      '"Stopping: input exhausted"',
      '"Final input = -2"',
    ],
  },
  queue: {
    label: "Processing Queue",
    color: tabColors.queue.chip,
    badgeColor: tabColors.queue.badge,
    description:
      "A common real-world use of while loops is processing items from a queue or stack. The loop continues as long as there are items left to process, making while ideal since we don't know the iteration count in advance.",
    codeSnippet:
`const queue = ["email", "sms", "push", "webhook"];

while (queue.length > 0) {
  const task = queue.shift();
  console.log("Sending: " + task);
}

console.log("All notifications sent!");
console.log("Queue empty: " + (queue.length === 0));`,
    codeOutput: [
      '"Sending: email"',
      '"Sending: sms"',
      '"Sending: push"',
      '"Sending: webhook"',
      '"All notifications sent!"',
      '"Queue empty: true"',
    ],
  },
  comparison: {
    label: "while vs for",
    color: tabColors.comparison.chip,
    badgeColor: tabColors.comparison.badge,
    description:
      "Use a for loop when you know the number of iterations ahead of time. Use a while loop when the termination depends on a dynamic condition that may change unpredictably during execution.",
    codeSnippet:
`// FOR — known iteration count
for (let i = 0; i < 3; i++) {
  console.log("for: " + i);
}

// WHILE — unknown iteration count
let n = 27;
let steps = 0;
while (n !== 1) {
  n = n % 2 === 0 ? n / 2 : 3 * n + 1;
  steps++;
}
console.log("Collatz steps: " + steps);`,
    codeOutput: [
      '"for: 0"',
      '"for: 1"',
      '"for: 2"',
      '"Collatz steps: 111"',
    ],
  },
};

const order: WhileTab[] = ["basic", "whileTrue", "queue", "comparison"];

// ─── cycle diagram for Basic while ──────────────────────────────────────────
function WhileCycleDiagram() {
  const nodes = [
    { label: "Check\ncondition", x: 150, y: 20, color: "bg-blue-500" },
    { label: "true", x: 280, y: 75, color: "bg-emerald-500", small: true },
    { label: "Execute\nbody", x: 150, y: 130, color: "bg-blue-500" },
    { label: "false", x: 20, y: 75, color: "bg-red-500", small: true },
  ];

  return (
    <div className="relative w-full max-w-[340px] h-[200px] mx-auto">
      {/* arrows using SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 200">
        <defs>
          <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#3b82f6" />
          </marker>
          <marker id="arrowRed" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
          </marker>
        </defs>
        {/* condition -> true */}
        <line x1="220" y1="45" x2="270" y2="70" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowBlue)" />
        {/* true -> body */}
        <line x1="280" y1="100" x2="220" y2="130" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowBlue)" />
        {/* body -> condition (loop back) */}
        <path d="M 150 130 Q 320 80 195 35" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrowBlue)" />
        {/* condition -> false (exit) */}
        <line x1="130" y1="45" x2="60" y2="70" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" />
        {/* false -> exit */}
        <line x1="30" y1="100" x2="30" y2="170" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" />
      </svg>

      {/* node labels */}
      {nodes.map((node) => (
        <motion.div
          key={node.label}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`absolute ${node.color} text-white text-[10px] font-bold rounded-lg px-2 py-1 text-center whitespace-pre-line leading-tight shadow-md ${node.small ? "px-1.5 py-0.5" : ""}`}
          style={{ left: node.x, top: node.y, transform: "translate(-50%, 0)" }}
        >
          {node.label}
        </motion.div>
      ))}

      {/* exit label */}
      <div
        className="absolute text-[10px] font-semibold text-red-500 dark:text-red-400"
        style={{ left: 15, top: 175 }}
      >
        Exit loop
      </div>
    </div>
  );
}

// ─── comparison table for while vs for ───────────────────────────────────────
function ComparisonTable() {
  const rows = [
    { aspect: "Iteration count", forLoop: "Known in advance", whileLoop: "Unknown / dynamic" },
    { aspect: "Counter variable", forLoop: "Built into syntax", whileLoop: "Declared outside" },
    { aspect: "Best for", forLoop: "Arrays, ranges, fixed counts", whileLoop: "Events, streams, user input" },
    { aspect: "Risk of infinite", forLoop: "Low (bounded)", whileLoop: "Higher (condition may never be false)" },
    { aspect: "Readability", forLoop: "Init, check, update in one line", whileLoop: "Condition only; update in body" },
  ];

  return (
    <div className="rounded-xl border overflow-hidden text-xs">
      <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
        <span>Aspect</span>
        <span className="text-blue-600 dark:text-blue-400">for loop</span>
        <span className="text-violet-600 dark:text-violet-400">while loop</span>
      </div>
      {rows.map((row) => (
        <div
          key={row.aspect}
          className="grid grid-cols-3 px-3 py-2 border-t items-center gap-1"
        >
          <span className="font-semibold">{row.aspect}</span>
          <span className="text-[11px] text-muted-foreground">{row.forLoop}</span>
          <span className="text-[11px] text-muted-foreground">{row.whileLoop}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function WhileLoopVisualization() {
  const [selected, setSelected]       = useState<WhileTab>("basic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: WhileTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">while Loop Visualizer</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Group selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const t = tabs[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? t.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.label}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${tab.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{tab.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${tabColors[selected].badge}`}>
                  while loop
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{tab.description}</p>
            </div>

            {/* Cycle diagram for Basic while */}
            {selected === "basic" && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Execution Cycle</p>
                <div className="rounded-xl border bg-muted/20 px-4 py-4">
                  <WhileCycleDiagram />
                </div>
              </div>
            )}

            {/* Comparison table for while vs for */}
            {selected === "comparison" && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">When to Use Each</p>
                <ComparisonTable />
              </div>
            )}

            {/* Code + Output */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                  {tab.codeSnippet}
                </pre>
              </div>
              <Button size="sm" onClick={() => setOutputLines(tab.codeOutput)}>
                <Play className="h-3.5 w-3.5 mr-1" /> Run
              </Button>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
