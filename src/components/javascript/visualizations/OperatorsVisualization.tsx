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
type OperatorGroup = "arithmetic" | "comparison" | "logical" | "ternary";

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
      { op: "/",  name: "Division",       example: "10 / 3",       result: "3.333..." },
      { op: "%",  name: "Modulus",        example: "10 % 3",       result: "1",        note: "Remainder" },
      { op: "**", name: "Exponentiation", example: "2 ** 3",       result: "8",        note: "Power" },
      { op: "+",  name: "Concatenation",  example: '"Hi" + " JS"', result: '"Hi JS"',  note: "String +" },
    ],
    codeSnippet:
`let a = 10, b = 3;
console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
console.log(2 ** 3);
console.log("Hi" + " JS");`,
    codeOutput: ["13", "7", "30", "3.3333333333333335", "1", "8", '"Hi JS"'],
  },
  comparison: {
    label: "Comparison",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description: "Compare two values and return a boolean. Prefer === over == to avoid type coercion surprises.",
    rows: [
      { op: "==",  name: "Loose equal",      example: '5 == "5"',   result: "true",  note: "coerces type" },
      { op: "===", name: "Strict equal",     example: '5 === "5"',  result: "false", note: "no coercion" },
      { op: "!=",  name: "Loose not-equal",  example: '5 != "5"',   result: "false", note: "coerces type" },
      { op: "!==", name: "Strict not-equal", example: '5 !== "5"',  result: "true",  note: "no coercion" },
      { op: ">",   name: "Greater than",     example: "7 > 3",      result: "true" },
      { op: "<",   name: "Less than",        example: "2 < 9",      result: "true" },
      { op: ">=",  name: "Greater or equal", example: "5 >= 5",     result: "true" },
      { op: "<=",  name: "Less or equal",    example: "4 <= 3",     result: "false" },
    ],
    codeSnippet:
`// == vs === difference
let num = 5, str = "5";
console.log(num == str);     // loose: coerces type
console.log(num === str);    // strict: no coercion
console.log(null == undefined);
console.log(null === undefined);
console.log(0 == false);
console.log(0 === false);`,
    codeOutput: [
      "true   // == coerces \"5\" to 5",
      "false  // === checks type too",
      "true   // null == undefined is true",
      "false  // null !== undefined strictly",
      "true   // 0 is falsy like false",
      "false  // different types",
    ],
  },
  logical: {
    label: "Logical",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description: "Combine or invert boolean expressions. && and || short-circuit -- they stop evaluating as soon as the result is determined.",
    rows: [
      { op: "&&", name: "AND",               example: "true && false",      result: "false", note: "both must be true" },
      { op: "||", name: "OR",                example: "true || false",      result: "true",  note: "at least one true" },
      { op: "!",  name: "NOT",               example: "!true",              result: "false", note: "inverts" },
      { op: "&&", name: "Short-circuit AND", example: '0 && "hello"',       result: "0",     note: "stops at falsy" },
      { op: "||", name: "Short-circuit OR",  example: '0 || "hello"',       result: '"hello"', note: "stops at truthy" },
      { op: "??", name: "Nullish coalescing",example: 'null ?? "default"',  result: '"default"', note: "null/undef only" },
    ],
    codeSnippet:
`// Short-circuit behavior
let user = null;
console.log(user && user.name);  // stops at null
console.log(user || "Guest");    // skips null, returns "Guest"
console.log(user ?? "Anonymous");
console.log(0 || "fallback");    // 0 is falsy
console.log(0 ?? "fallback");    // 0 is NOT null/undef`,
    codeOutput: [
      "null       // && stops at first falsy",
      '"Guest"    // || skips falsy values',
      '"Anonymous" // ?? only checks null/undefined',
      '"fallback" // || treats 0 as falsy',
      "0          // ?? keeps 0 (not null)",
    ],
  },
  ternary: {
    label: "Ternary",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description: "A shorthand for if...else that returns a value. Syntax: condition ? valueIfTrue : valueIfFalse",
    rows: [
      { op: "? :", name: "Ternary",         example: "true ? 1 : 2",                result: "1" },
      { op: "? :", name: "Ternary",         example: "false ? 1 : 2",               result: "2" },
      { op: "? :", name: "With expression", example: '5 > 3 ? "yes" : "no"',        result: '"yes"' },
      { op: "? :", name: "Assignment",      example: 'let r = age >= 18 ? "ok" : "no"', result: '"ok" if age>=18' },
      { op: "? :", name: "Nested",          example: 'x > 0 ? "+" : x < 0 ? "-" : "0"', result: 'sign of x' },
    ],
    codeSnippet:
`let age = 20;
console.log(age >= 18 ? "Adult" : "Minor");

let score = 85;
let grade = score >= 90 ? "A"
          : score >= 80 ? "B"
          : score >= 70 ? "C" : "F";
console.log(grade);

let x = -5;
console.log(x > 0 ? "positive" : x < 0 ? "negative" : "zero");`,
    codeOutput: ['"Adult"', '"B"', '"negative"'],
  },
};

const order: OperatorGroup[] = ["arithmetic", "comparison", "logical", "ternary"];

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
                <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                  <span>Operator</span>
                  <span>Name</span>
                  <span>Example</span>
                  <span>Result</span>
                </div>
                {group.rows.map((row) => (
                  <div
                    key={`${row.op}-${row.name}`}
                    className="grid grid-cols-4 px-3 py-2 border-t items-center gap-1"
                  >
                    <code className={`font-mono font-bold ${group.color.split(" ")[3] ?? ""}`}>
                      {row.op}
                    </code>
                    <span className="text-[11px] text-muted-foreground">{row.name}</span>
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
