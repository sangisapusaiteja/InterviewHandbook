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
type TernaryGroup = "basic" | "vsIfElse" | "inTemplates" | "whenToAvoid";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<TernaryGroup, GroupInfo> = {
  basic: {
    label: "Basic Ternary",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The ternary operator is a concise alternative to if/else. It takes three operands: a condition, a value if true, and a value if false. Syntax: condition ? trueValue : falseValue",
    codeSnippet:
`let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status);

let score = 75;
let grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";
console.log(grade);

let isLoggedIn = true;
let message = isLoggedIn ? "Welcome back!" : "Please log in";
console.log(message);`,
    codeOutput: ['"Adult"', '"C"', '"Welcome back!"'],
  },
  vsIfElse: {
    label: "vs if/else",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "The ternary operator and if/else produce the same result, but ternary is an expression (returns a value) while if/else is a statement. Ternary shines when assigning a value based on a condition.",
    codeSnippet:
`// --- if/else version ---
let temp = 30;
let weather;
if (temp > 25) {
  weather = "Hot";
} else {
  weather = "Cool";
}
console.log("if/else: " + weather);

// --- ternary version ---
let weather2 = temp > 25 ? "Hot" : "Cool";
console.log("ternary: " + weather2);

// Both produce the same result!
console.log(weather === weather2);`,
    codeOutput: ['"if/else: Hot"', '"ternary: Hot"', "true"],
  },
  inTemplates: {
    label: "In Templates",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Ternary operators are widely used inside template literals and JSX because they are expressions. This makes them perfect for inline conditional rendering and dynamic string building.",
    codeSnippet:
`// In template literals
let user = "Alice";
let role = "admin";
console.log(\`Hello, \${user} (\${role === "admin" ? "Administrator" : "User"})\`);

// Conditional display
let items = 5;
console.log(\`You have \${items} item\${items !== 1 ? "s" : ""}\`);

// Nested in function calls
let darkMode = true;
let theme = darkMode ? "dark" : "light";
console.log(\`Applying \${theme} theme\`);

// JSX-style conditional (concept)
let isOnline = true;
let badge = isOnline ? "green-dot" : "gray-dot";
console.log("Status badge: " + badge);`,
    codeOutput: [
      '"Hello, Alice (Administrator)"',
      '"You have 5 items"',
      '"Applying dark theme"',
      '"Status badge: green-dot"',
    ],
  },
  whenToAvoid: {
    label: "When to Avoid",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Avoid ternary when the logic is complex, deeply nested, or when you need side effects. Deeply nested ternaries hurt readability. If the expression spans multiple lines, prefer if/else.",
    codeSnippet:
`// BAD: deeply nested ternary (hard to read)
let x = 85;
let result = x > 90 ? "A" : x > 80 ? "B" : x > 70 ? "C" : x > 60 ? "D" : "F";
console.log("Nested: " + result);

// GOOD: use if/else for complex logic
let grade;
if (x > 90) grade = "A";
else if (x > 80) grade = "B";
else if (x > 70) grade = "C";
else if (x > 60) grade = "D";
else grade = "F";
console.log("if/else: " + grade);

// BAD: ternary with side effects
// condition ? doSomething() : doOther();
// GOOD: use if/else for side effects
console.log("Use if/else for side effects");`,
    codeOutput: ['"Nested: B"', '"if/else: B"', '"Use if/else for side effects"'],
  },
};

const order: TernaryGroup[] = ["basic", "vsIfElse", "inTemplates", "whenToAvoid"];

// ─── Main export ──────────────────────────────────────────────────────────────
export function TernaryVisualization() {
  const [selected, setSelected]       = useState<TernaryGroup>("basic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const group = groups[selected];

  const handleSelect = (key: TernaryGroup) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Ternary Operator</CardTitle>
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
                  ternary
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{group.description}</p>
            </div>

            {/* Visual breakdown for Basic Ternary */}
            {selected === "basic" && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Visual Breakdown</p>
                <div className="rounded-xl border bg-muted/30 px-4 py-4">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-sm justify-center">
                    <span className="px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-700 dark:text-blue-300 font-semibold">
                      condition
                    </span>
                    <span className="text-muted-foreground font-bold text-lg">?</span>
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-semibold">
                      trueValue
                    </span>
                    <span className="text-muted-foreground font-bold text-lg">:</span>
                    <span className="px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-700 dark:text-red-300 font-semibold">
                      falseValue
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs justify-center mt-3 text-muted-foreground">
                    <span className="px-3 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      age &gt;= 18
                    </span>
                    <span className="font-bold">?</span>
                    <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      &quot;Adult&quot;
                    </span>
                    <span className="font-bold">:</span>
                    <span className="px-3 py-1 rounded bg-red-500/10 text-red-600 dark:text-red-400">
                      &quot;Minor&quot;
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Side-by-side comparison for vs if/else */}
            {selected === "vsIfElse" && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Side-by-Side Comparison</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-xl border overflow-hidden">
                    <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-3 py-2">
                      <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Ternary (Expression)</span>
                    </div>
                    <pre className="text-xs font-mono px-3 py-3 whitespace-pre overflow-x-auto bg-muted/20">
{`let weather = temp > 25
  ? "Hot"
  : "Cool";`}
                    </pre>
                  </div>
                  <div className="rounded-xl border overflow-hidden">
                    <div className="bg-orange-500/10 border-b border-orange-500/30 px-3 py-2">
                      <span className="text-xs font-semibold text-orange-700 dark:text-orange-300">if/else (Statement)</span>
                    </div>
                    <pre className="text-xs font-mono px-3 py-3 whitespace-pre overflow-x-auto bg-muted/20">
{`let weather;
if (temp > 25) {
  weather = "Hot";
} else {
  weather = "Cool";
}`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

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
      </CardContent>
    </Card>
  );
}
