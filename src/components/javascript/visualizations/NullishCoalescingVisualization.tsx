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
type NullishTab = "basicNullish" | "nullishVsOr" | "nullishAssign" | "realWorld";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<NullishTab, GroupInfo> = {
  basicNullish: {
    label: "Basic ??",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The nullish coalescing operator (??) returns the right-hand operand when the left-hand operand is null or undefined -- and only those two values. Unlike ||, it does not treat 0, '', or false as fallback triggers.",
    codeSnippet: `const name = null ?? "Default Name";
console.log(name);

const count = undefined ?? 42;
console.log(count);

const value = "Hello" ?? "Fallback";
console.log(value);

const zero = 0 ?? 100;
console.log(zero);`,
    codeOutput: [
      '"Default Name"',
      "42",
      '"Hello"',
      "0",
    ],
  },
  nullishVsOr: {
    label: "?? vs ||",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "The key difference: || falls back on any falsy value (0, '', false, null, undefined, NaN), while ?? only falls back on null and undefined. This makes ?? safer for preserving intentional falsy values.",
    codeSnippet: `// With 0
console.log(0 || "fallback");   // "fallback"
console.log(0 ?? "fallback");   // 0

// With ''
console.log('' || "fallback");  // "fallback"
console.log('' ?? "fallback");  // ''

// With false
console.log(false || "fallback"); // "fallback"
console.log(false ?? "fallback"); // false

// With null
console.log(null || "fallback");  // "fallback"
console.log(null ?? "fallback");  // "fallback"

// With undefined
console.log(undefined || "fallback"); // "fallback"
console.log(undefined ?? "fallback"); // "fallback"`,
    codeOutput: [
      '0 || "fallback"  → "fallback"',
      '0 ?? "fallback"  → 0',
      "---",
      '\'\' || "fallback" → "fallback"',
      '\'\' ?? "fallback" → \'\'',
      "---",
      'false || "fallback" → "fallback"',
      'false ?? "fallback" → false',
      "---",
      'null || "fallback"  → "fallback"',
      'null ?? "fallback"  → "fallback"',
      "---",
      'undefined || "fallback" → "fallback"',
      'undefined ?? "fallback" → "fallback"',
    ],
  },
  nullishAssign: {
    label: "??= Assignment",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "The nullish assignment operator (??=) assigns the right-hand value only when the left-hand variable is null or undefined. It is shorthand for: if (x === null || x === undefined) x = value.",
    codeSnippet: `let a = null;
a ??= "assigned";
console.log(a);

let b = 0;
b ??= 99;
console.log(b);

let c = undefined;
c ??= "filled";
console.log(c);

let d = "";
d ??= "replaced?";
console.log(d);

let e = false;
e ??= true;
console.log(e);`,
    codeOutput: [
      '"assigned"   // null was replaced',
      "0            // 0 kept (not nullish)",
      '"filled"     // undefined was replaced',
      '""           // empty string kept (not nullish)',
      "false        // false kept (not nullish)",
    ],
  },
  realWorld: {
    label: "Real-world Config",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "In practice, ?? shines for configuration defaults and API response handling where 0, '', or false are valid values that should not be overridden by defaults.",
    codeSnippet: `// Config defaults -- 0 is a valid timeout
function createClient(options) {
  const timeout = options.timeout ?? 3000;
  const retries = options.retries ?? 3;
  const verbose = options.verbose ?? false;
  console.log({ timeout, retries, verbose });
}
createClient({ timeout: 0, retries: undefined });

// API response handling
function displayUser(data) {
  const name = data.name ?? "Anonymous";
  const score = data.score ?? "N/A";
  const bio = data.bio ?? "No bio provided";
  console.log(name, "| Score:", score, "| Bio:", bio);
}
displayUser({ name: "Ada", score: 0, bio: "" });`,
    codeOutput: [
      "{ timeout: 0, retries: 3, verbose: false }",
      'Ada | Score: 0 | Bio: ""',
    ],
  },
};

const order: NullishTab[] = ["basicNullish", "nullishVsOr", "nullishAssign", "realWorld"];

// ─── comparison grid data for ?? vs || ────────────────────────────────────────
const comparisonGridRows = [
  { value: "0", orResult: '"fallback"', nullishResult: "0", correct: "??" },
  { value: "''", orResult: '"fallback"', nullishResult: "''", correct: "??" },
  { value: "false", orResult: '"fallback"', nullishResult: "false", correct: "??" },
  { value: "null", orResult: '"fallback"', nullishResult: '"fallback"', correct: "Both" },
  { value: "undefined", orResult: '"fallback"', nullishResult: '"fallback"', correct: "Both" },
  { value: "NaN", orResult: '"fallback"', nullishResult: "NaN", correct: "Depends" },
];

// ─── comparison table data ───────────────────────────────────────────────────
const comparisonRows = [
  {
    value: "0",
    orResult: '"fallback"',
    nullishResult: "0",
    whichCorrect: "?? (preserves 0)",
  },
  {
    value: "'' (empty string)",
    orResult: '"fallback"',
    nullishResult: "''",
    whichCorrect: "?? (preserves '')",
  },
  {
    value: "false",
    orResult: '"fallback"',
    nullishResult: "false",
    whichCorrect: "?? (preserves false)",
  },
  {
    value: "null",
    orResult: '"fallback"',
    nullishResult: '"fallback"',
    whichCorrect: "Both (same result)",
  },
  {
    value: "undefined",
    orResult: '"fallback"',
    nullishResult: '"fallback"',
    whichCorrect: "Both (same result)",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function NullishCoalescingVisualization() {
  const [selected, setSelected] = useState<NullishTab>("basicNullish");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const group = groups[selected];

  const handleSelect = (key: NullishTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Nullish Coalescing (??)</CardTitle>
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

            {/* Interactive visual for ?? vs || */}
            {selected === "nullishVsOr" && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Side-by-Side Comparison
                </p>
                <div className="rounded-xl border bg-muted/20 px-4 py-5">
                  <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-muted-foreground mb-3 px-1">
                    <span>Value</span>
                    <span>
                      <code className="font-mono">||</code> Returns
                    </span>
                    <span>
                      <code className="font-mono">??</code> Returns
                    </span>
                    <span>Preserves Value?</span>
                  </div>
                  {comparisonGridRows.map((row) => (
                    <motion.div
                      key={row.value}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-4 gap-2 px-1 py-2 border-t items-center text-xs"
                    >
                      <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                        {row.value}
                      </code>
                      <span
                        className={`font-mono rounded-md px-2 py-0.5 inline-block w-fit ${
                          row.orResult === '"fallback"' && row.correct !== "Both"
                            ? "bg-red-500/15 text-red-600 dark:text-red-400"
                            : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        {row.orResult}
                      </span>
                      <span
                        className={`font-mono rounded-md px-2 py-0.5 inline-block w-fit ${
                          row.correct === "Both" || row.correct === "??" || row.correct === "Depends"
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                            : "bg-red-500/15 text-red-600 dark:text-red-400"
                        }`}
                      >
                        {row.nullishResult}
                      </span>
                      <span
                        className={`text-[11px] font-semibold ${
                          row.correct === "??"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : row.correct === "Both"
                            ? "text-muted-foreground"
                            : "text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {row.correct === "??"
                          ? "?? preserves original"
                          : row.correct === "Both"
                          ? "Same behavior"
                          : "Context-dependent"}
                      </span>
                    </motion.div>
                  ))}
                  <div className="mt-3 text-[11px] text-muted-foreground italic text-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500/40 mr-1 align-middle" />
                    Red = value lost &nbsp;
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500/40 mr-1 ml-2 align-middle" />
                    Green = value preserved
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Operator Comparison table */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Operator Comparison
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Value</span>
              <span>|| Result</span>
              <span>?? Result</span>
              <span>Which is Correct?</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.value}
                className="grid grid-cols-4 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.value}
                </code>
                <code className="font-mono text-[11px] text-red-600 dark:text-red-400">
                  {row.orResult}
                </code>
                <code className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                  {row.nullishResult}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.whichCorrect}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
