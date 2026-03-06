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
type StatementGroup = "declaration" | "conditional" | "loops" | "jump";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<StatementGroup, GroupInfo> = {
  declaration: {
    label: "Declaration",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Declaration statements introduce new variables, constants, or functions into the current scope. Use let for variables that change, const for values that stay the same, and var (legacy) for function-scoped variables.",
    codeSnippet:
`let name = "Alice";
const age = 25;
var city = "NYC";

console.log(name);
console.log(age);
console.log(city);

// Reassigning let
name = "Bob";
console.log(name);

// const cannot be reassigned
// age = 30; // TypeError!`,
    codeOutput: ['"Alice"', "25", '"NYC"', '"Bob"'],
  },
  conditional: {
    label: "Conditional",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Conditional statements execute different code blocks based on whether a condition is true or false. JavaScript provides if/else for boolean branching and switch for multi-way matching.",
    codeSnippet:
`// if / else
let score = 85;
if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else {
  console.log("Grade: C");
}

// switch
let day = "Mon";
switch (day) {
  case "Mon":
    console.log("Start of week");
    break;
  case "Fri":
    console.log("Almost weekend!");
    break;
  default:
    console.log("Regular day");
}`,
    codeOutput: ['"Grade: B"', '"Start of week"'],
  },
  loops: {
    label: "Loops",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Loop statements repeatedly execute a block of code. Use for when you know the count, while when you have a condition, for...of to iterate values of iterables, and for...in to iterate object keys.",
    codeSnippet:
`// for loop
for (let i = 0; i < 3; i++) {
  console.log("for: " + i);
}

// while loop
let n = 3;
while (n > 0) {
  console.log("while: " + n);
  n--;
}

// for...of (values)
let colors = ["red", "green", "blue"];
for (let c of colors) {
  console.log("of: " + c);
}

// for...in (keys)
let user = { name: "Ali", age: 30 };
for (let key in user) {
  console.log("in: " + key);
}`,
    codeOutput: [
      '"for: 0"', '"for: 1"', '"for: 2"',
      '"while: 3"', '"while: 2"', '"while: 1"',
      '"of: red"', '"of: green"', '"of: blue"',
      '"in: name"', '"in: age"',
    ],
  },
  jump: {
    label: "Jump",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Jump statements alter the normal flow of execution. break exits a loop or switch, continue skips to the next iteration, and return exits a function (optionally with a value).",
    codeSnippet:
`// break
for (let i = 0; i < 5; i++) {
  if (i === 3) break;
  console.log("break: " + i);
}

// continue
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log("cont: " + i);
}

// return
function add(a, b) {
  return a + b;
}
console.log("return: " + add(3, 4));`,
    codeOutput: [
      '"break: 0"', '"break: 1"', '"break: 2"',
      '"cont: 0"', '"cont: 1"', '"cont: 3"', '"cont: 4"',
      '"return: 7"',
    ],
  },
};

const order: StatementGroup[] = ["declaration", "conditional", "loops", "jump"];

// ─── Reference table data ─────────────────────────────────────────────────────
const referenceRows = [
  { type: "Declaration", examples: "let, const, var, function", purpose: "Introduce variables, constants, or functions into scope" },
  { type: "Conditional", examples: "if, else if, else, switch", purpose: "Execute code based on boolean conditions or value matching" },
  { type: "Loops",       examples: "for, while, for...of, for...in", purpose: "Repeat a block of code multiple times" },
  { type: "Jump",        examples: "break, continue, return, throw", purpose: "Alter the normal sequential flow of execution" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function StatementsVisualization() {
  const [selected, setSelected]       = useState<StatementGroup>("declaration");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const group = groups[selected];

  const handleSelect = (key: StatementGroup) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">JavaScript Statements</CardTitle>
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
                  statement
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{group.description}</p>
            </div>

            {/* Code + Output */}
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
          </motion.div>
        </AnimatePresence>

        {/* Reference table */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-semibold text-muted-foreground">Quick Reference</p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Statement Type</span>
              <span>Examples</span>
              <span>Purpose</span>
            </div>
            {referenceRows.map((row) => (
              <div
                key={row.type}
                className="grid grid-cols-3 px-3 py-2 border-t items-center gap-1"
              >
                <span className="font-semibold">{row.type}</span>
                <code className="font-mono text-[11px] text-muted-foreground">{row.examples}</code>
                <span className="text-[11px] text-muted-foreground">{row.purpose}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
