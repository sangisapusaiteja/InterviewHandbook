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
type OperatorGroup = "arithmetic" | "comparison" | "logical" | "increment";

interface OperatorRow {
  op: string;
  name: string;
  example: string;
  result: string;
  note?: string;
}

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  rows: OperatorRow[];
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<OperatorGroup, GroupInfo> = {
  arithmetic: {
    label: "Arithmetic",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description: "Perform mathematical calculations on numbers.",
    rows: [
      { op: "+",  name: "Addition",       example: "10 + 3",       result: "13" },
      { op: "-",  name: "Subtraction",    example: "10 - 3",       result: "7" },
      { op: "*",  name: "Multiplication", example: "10 * 3",       result: "30" },
      { op: "/",  name: "Division",       example: "10 / 3",       result: "3.333…" },
      { op: "%",  name: "Modulus",        example: "10 % 3",       result: "1",      note: "Remainder" },
      { op: "+",  name: "Concatenation",  example: '"Hi" + " JS"', result: '"Hi JS"', note: "String +" },
    ],
    codeSnippet:
`let a = 10, b = 3;
console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
console.log("Hi" + " JS");`,
    codeOutput: ["13", "7", "30", "3.3333333333333335", "1", '"Hi JS"'],
  },
  comparison: {
    label: "Comparison",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description: "Compare two values and return a boolean. Prefer === over == to avoid type coercion surprises.",
    rows: [
      { op: "==",  name: "Loose equal",      example: '5 == "5"',   result: "true",  note: "coerces type" },
      { op: "===", name: "Strict equal",     example: '5 === "5"',  result: "false", note: "no coercion ✅" },
      { op: "!=",  name: "Loose not-equal",  example: '5 != "5"',   result: "false" },
      { op: "!==", name: "Strict not-equal", example: '5 !== "5"',  result: "true" },
      { op: ">",   name: "Greater than",     example: "7 > 3",      result: "true" },
      { op: "<",   name: "Less than",        example: "2 < 9",      result: "true" },
      { op: ">=",  name: "Greater or eq",    example: "5 >= 5",     result: "true" },
      { op: "<=",  name: "Less or eq",       example: "4 <= 3",     result: "false" },
    ],
    codeSnippet:
`let num = 5, str = "5";
console.log(num == str);
console.log(num === str);
console.log(null == undefined);
console.log(null === undefined);
console.log(0 == false);
console.log(0 === false);`,
    codeOutput: ["true", "false", "true", "false", "true", "false"],
  },
  logical: {
    label: "Logical",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description: "Combine or invert boolean expressions. && and || short-circuit — they stop as soon as the result is determined.",
    rows: [
      { op: "&&", name: "AND",              example: "true && false",      result: "false", note: "both must be true" },
      { op: "||", name: "OR",               example: "true || false",      result: "true",  note: "at least one true" },
      { op: "!",  name: "NOT",              example: "!true",              result: "false", note: "inverts" },
      { op: "&&", name: "Short-circuit AND",example: 'null && "hi"',       result: "null",  note: "stops at falsy" },
      { op: "||", name: "Short-circuit OR", example: 'null || "hi"',       result: '"hi"',  note: "stops at truthy" },
      { op: "??", name: "Nullish coalescing",example: 'null ?? "default"', result: '"default"', note: "null/undef only" },
    ],
    codeSnippet:
`let user = null;
console.log(user && user.name);
console.log(user || "Guest");
console.log(user ?? "Anonymous");
console.log(!null);`,
    codeOutput: ["null", '"Guest"', '"Anonymous"', "true"],
  },
  increment: {
    label: "Increment / Decrement",
    color: "bg-pink-500/15 border-pink-500/40 text-pink-700 dark:text-pink-300",
    badgeColor: "bg-pink-500/20 text-pink-700 dark:text-pink-300",
    description: "Shorthand operators to increase or decrease a number by 1. Prefix returns the new value; postfix returns the old value.",
    rows: [
      { op: "++x", name: "Pre-increment",  example: "let x=5; ++x", result: "6  (x is now 6)" },
      { op: "x++", name: "Post-increment", example: "let x=5; x++", result: "5  (x becomes 6 after)", note: "returns old" },
      { op: "--x", name: "Pre-decrement",  example: "let x=5; --x", result: "4  (x is now 4)" },
      { op: "x--", name: "Post-decrement", example: "let x=5; x--", result: "5  (x becomes 4 after)", note: "returns old" },
      { op: "+=",  name: "Add-assign",     example: "x += 3",       result: "x = x + 3" },
      { op: "-=",  name: "Sub-assign",     example: "x -= 2",       result: "x = x - 2" },
    ],
    codeSnippet:
`let x = 5;
console.log(x++);   // post: prints old
console.log(x);     // x is now 6
console.log(++x);   // pre: prints new
x += 10;
x -= 7;
console.log(x);`,
    codeOutput: ["5  // postfix: returns old value", "6", "7  // prefix: returns new value", "10"],
  },
};

const order: OperatorGroup[] = ["arithmetic", "comparison", "logical", "increment"];

// ─── Main export ──────────────────────────────────────────────────────────────
export function OperatorsVisualization() {
  const [selected, setSelected]       = useState<OperatorGroup>("arithmetic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const group = groups[selected];

  const handleSelect = (key: OperatorGroup) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Operators</CardTitle>
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
                  operators
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{group.description}</p>
            </div>

            {/* Two-column: reference table | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Operator reference table */}
              <div className="rounded-xl border overflow-hidden text-xs">
                <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                  <span>Op</span>
                  <span>Example</span>
                  <span>Result</span>
                </div>
                {group.rows.map((row) => (
                  <div
                    key={`${row.op}-${row.name}`}
                    className="grid grid-cols-3 px-3 py-2 border-t items-center gap-1"
                  >
                    <code className={`font-mono font-bold ${group.color.split(" ")[3] ?? ""}`}>
                      {row.op}
                    </code>
                    <code className="font-mono text-[11px] text-muted-foreground">{row.example}</code>
                    <div>
                      <code className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                        {row.result}
                      </code>
                      {row.note && (
                        <p className="text-[9px] text-muted-foreground mt-0.5">{row.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Code + Output */}
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
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                  <ConsoleOutput lines={outputLines} />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
