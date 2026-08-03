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

// ─── types & data ─────────────────────────────────────────────────────────────
type TopicTab = "basic" | "atleastonce" | "vswhile" | "usecases";

interface TopicInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

const topics: Record<TopicTab, TopicInfo> = {
  basic: {
    label: "Basic do...while",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The do...while loop executes its body first, then checks the condition. If the condition is true, the loop runs again. This guarantees the body runs at least once regardless of the condition.",
    codeSnippet:
`let count = 0;
do {
  console.log("count is: " + count);
  count++;
} while (count < 3);

console.log("Final count: " + count);`,
    codeOutput: [
      '"count is: 0"',
      '"count is: 1"',
      '"count is: 2"',
      '"Final count: 3"',
    ],
  },
  atleastonce: {
    label: "At Least Once",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "The key difference: when the condition is false from the start, a while loop skips the body entirely, but a do...while loop still executes it once. This makes do...while ideal when you need at least one execution.",
    codeSnippet:
`// ── while loop (condition false from start) ──
let x = 10;
while (x < 5) {
  console.log("while body: " + x);  // never runs!
  x++;
}
console.log("while done, x = " + x);

// ── do...while loop (same false condition) ──
let y = 10;
do {
  console.log("do body: " + y);     // runs once!
  y++;
} while (y < 5);
console.log("do...while done, y = " + y);`,
    codeOutput: [
      '"while done, x = 10"',
      '"do body: 10"',
      '"do...while done, y = 11"',
    ],
  },
  vswhile: {
    label: "vs while",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "A while loop is a pre-test loop — it checks the condition before each iteration. A do...while loop is a post-test loop — it checks the condition after each iteration. When the condition is initially true, both behave identically.",
    codeSnippet:
`// while — pre-test loop
let i = 1;
while (i <= 3) {
  console.log("while: i = " + i);
  i++;
}

// do...while — post-test loop
let j = 1;
do {
  console.log("do: j = " + j);
  j++;
} while (j <= 3);

// Both produce the same output when
// the condition is initially true!`,
    codeOutput: [
      '"while: i = 1"',
      '"while: i = 2"',
      '"while: i = 3"',
      '"do: j = 1"',
      '"do: j = 2"',
      '"do: j = 3"',
    ],
  },
  usecases: {
    label: "Use Cases",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "do...while is commonly used for input validation (prompt at least once), menu-driven programs, retry logic, and any scenario where you need the action to happen before deciding whether to repeat.",
    codeSnippet:
`// Use Case 1: Input validation (retry until valid)
let attempts = 0;
let password;
do {
  password = "wrong"; // simulated input
  attempts++;
  console.log("Attempt " + attempts);
} while (password !== "wrong" && attempts < 3);

// Use Case 2: Generate unique ID
let id;
do {
  id = Math.floor(Math.random() * 100);
  console.log("Generated ID: " + id);
} while (id < 10); // retry if too small

// Use Case 3: Process at least one item
let items = ["task1"];
let idx = 0;
do {
  console.log("Processing: " + items[idx]);
  idx++;
} while (idx < items.length);`,
    codeOutput: [
      '"Attempt 1"',
      '"Generated ID: <random>"',
      '"Processing: task1"',
    ],
  },
};

const order: TopicTab[] = ["basic", "atleastonce", "vswhile", "usecases"];

// ─── "At Least Once" side-by-side comparison data ─────────────────────────────
const comparisonWhile = {
  title: "while loop",
  code: `let x = 10;\nwhile (x < 5) {\n  console.log(x); // skipped!\n  x++;\n}`,
  result: "Body never runs",
  color: "border-red-500/40 bg-red-500/10",
  badge: "Skipped",
  badgeColor: "bg-red-500/20 text-red-700 dark:text-red-300",
};

const comparisonDoWhile = {
  title: "do...while loop",
  code: `let y = 10;\ndo {\n  console.log(y); // runs once!\n  y++;\n} while (y < 5);`,
  result: "Body runs once (prints 10)",
  color: "border-emerald-500/40 bg-emerald-500/10",
  badge: "Runs once",
  badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
};

// ─── Comparison table data ────────────────────────────────────────────────────
const comparisonRows = [
  { feature: "Condition check", whileLoop: "Before body (pre-test)", doWhileLoop: "After body (post-test)" },
  { feature: "Minimum executions", whileLoop: "0 times", doWhileLoop: "1 time" },
  { feature: "Syntax", whileLoop: "while (cond) { ... }", doWhileLoop: "do { ... } while (cond);" },
  { feature: "Semicolon", whileLoop: "Not required after }", doWhileLoop: "Required after while (cond);" },
  { feature: "Use when", whileLoop: "Condition may be false initially", doWhileLoop: "Need at least one execution" },
  { feature: "Common use", whileLoop: "Sentinel loops, streams", doWhileLoop: "Input validation, retries" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function DoWhileVisualization() {
  const [selected, setSelected] = useState<TopicTab>("basic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">do...while Loop</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Topic selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const t = topics[key];
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${topic.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{topic.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${topic.badgeColor}`}>
                  do...while
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* "At Least Once" side-by-side comparison */}
            {selected === "atleastonce" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[comparisonWhile, comparisonDoWhile].map((item) => (
                  <div
                    key={item.title}
                    className={`rounded-xl border p-3 space-y-2 ${item.color}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">{item.title}</span>
                      <Badge variant="secondary" className={`text-[10px] ${item.badgeColor}`}>
                        {item.badge}
                      </Badge>
                    </div>
                    <pre className="text-xs font-mono rounded-lg border bg-muted/40 px-3 py-2 whitespace-pre overflow-x-auto">
                      {item.code}
                    </pre>
                    <p className="text-xs font-semibold">{item.result}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Code + Output */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                  {topic.codeSnippet}
                </pre>
              </div>
              <Button size="sm" onClick={() => setOutputLines(topic.codeOutput)}>
                <Play className="h-3.5 w-3.5 mr-1" /> Run
              </Button>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Comparison table: while vs do...while */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-semibold text-muted-foreground">Comparison: while vs do...while</p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Feature</span>
              <span>while</span>
              <span>do...while</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-3 px-3 py-2 border-t items-center gap-1"
              >
                <span className="font-semibold">{row.feature}</span>
                <code className="font-mono text-[11px] text-muted-foreground">{row.whileLoop}</code>
                <code className="font-mono text-[11px] text-muted-foreground">{row.doWhileLoop}</code>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
