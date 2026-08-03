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
type SyntaxKey = "statements" | "expressions" | "identifiers" | "code-blocks";

interface SyntaxDemo {
  label: string;
  category: string;
  color: string;
  badgeColor: string;
  description: string;
  note?: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<SyntaxKey, SyntaxDemo> = {
  statements: {
    label: "Statements",
    category: "Instruction",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "A statement is an instruction that performs an action. Statements are executed one by one, top to bottom. They usually end with a semicolon (;).",
    note: "Semicolons are technically optional due to ASI (Automatic Semicolon Insertion), but using them explicitly is recommended.",
    codeSnippet: `let name = "Alice";          // declaration statement
console.log("Hello, " + name); // expression statement
let x = 10;                  // declaration statement
if (x > 5) {                 // if statement
  console.log("x is big");
}
console.log("Done!");`,
    codeOutput: ["Hello, Alice", "x is big", "Done!"],
  },
  expressions: {
    label: "Expressions",
    category: "Value",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "An expression is any valid unit of code that resolves to a value. Expressions can be used anywhere a value is expected -- inside assignments, function arguments, or even other expressions.",
    note: "Every expression produces a value. Statements perform actions but do not necessarily produce values.",
    codeSnippet: `// Arithmetic expression
console.log(2 + 3 * 4);

// String expression
console.log("Hello" + " " + "World");

// Conditional (ternary) expression
let age = 20;
let status = age >= 18 ? "adult" : "minor";
console.log("Status:", status);

// Function call expression
console.log(Math.max(10, 25, 7));`,
    codeOutput: ["14", "Hello World", "Status: adult", "25"],
  },
  identifiers: {
    label: "Identifiers",
    category: "Naming",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Identifiers are names given to variables, functions, classes, and other entities. They must start with a letter, underscore (_), or dollar sign ($), followed by letters, digits, underscores, or dollar signs.",
    note: "Identifiers are case-sensitive: myVar and myvar are different. Reserved words (let, const, class, etc.) cannot be used as identifiers.",
    codeSnippet: `// Valid identifiers
let userName = "Alice";
let _privateVar = 42;
let $element = "div";
let camelCaseName = "yes";

console.log("userName:", userName);
console.log("_privateVar:", _privateVar);
console.log("$element:", $element);
console.log("camelCaseName:", camelCaseName);`,
    codeOutput: [
      "userName: Alice",
      "_privateVar: 42",
      "$element: div",
      "camelCaseName: yes",
    ],
  },
  "code-blocks": {
    label: "Code Blocks",
    category: "Grouping",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Code blocks group multiple statements together using curly braces { }. They are used with control structures (if, for, while) and function definitions. Variables declared with let and const inside a block are scoped to that block.",
    note: "Block scoping (let/const) prevents variables from leaking out. var ignores block scope -- another reason to avoid it.",
    codeSnippet: `// Block scoping with let
{
  let blockVar = "inside";
  console.log("In block:", blockVar);
}
// console.log(blockVar); // ReferenceError!

// if block
let score = 85;
if (score >= 80) {
  let grade = "A";
  console.log("Grade:", grade);
}

// function block
function greet(name) {
  let msg = "Hi, " + name + "!";
  console.log(msg);
}
greet("Bob");`,
    codeOutput: ["In block: inside", "Grade: A", "Hi, Bob!"],
  },
};

const order: SyntaxKey[] = ["statements", "expressions", "identifiers", "code-blocks"];

// ─── Identifier reference table data ─────────────────────────────────────────
interface IdentifierRow {
  identifier: string;
  valid: boolean;
  reason: string;
}

const identifierRows: IdentifierRow[] = [
  { identifier: "myVariable",  valid: true,  reason: "Starts with letter, camelCase" },
  { identifier: "_count",      valid: true,  reason: "Starts with underscore" },
  { identifier: "$price",      valid: true,  reason: "Starts with dollar sign" },
  { identifier: "firstName",   valid: true,  reason: "camelCase convention" },
  { identifier: "MAX_SIZE",    valid: true,  reason: "UPPER_SNAKE for constants" },
  { identifier: "2ndPlace",    valid: false, reason: "Cannot start with a digit" },
  { identifier: "my-var",      valid: false, reason: "Hyphens are not allowed" },
  { identifier: "class",       valid: false, reason: "Reserved keyword" },
  { identifier: "my var",      valid: false, reason: "Spaces are not allowed" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function SyntaxVisualization() {
  const [selected, setSelected]       = useState<SyntaxKey>("statements");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: SyntaxKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">JavaScript Syntax</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Concept selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const d = demos[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? d.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {d.label}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${demo.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{demo.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                  {demo.category}
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{demo.description}</p>
              {demo.note && <p className="text-xs opacity-80 italic mt-1">{demo.note}</p>}
            </div>

            {/* Code + Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Code</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                  {demo.codeSnippet}
                </pre>
                <Button size="sm" onClick={() => setOutputLines(demo.codeOutput)}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Identifier Quick Reference Table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Identifier Quick Reference
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Identifier</span>
              <span>Valid?</span>
              <span>Reason</span>
            </div>
            {identifierRows.map((row) => (
              <motion.div
                key={row.identifier}
                className="grid grid-cols-3 px-3 py-2.5 border-t items-center gap-1 hover:bg-muted/40 transition-colors"
              >
                <code className="font-mono font-bold">{row.identifier}</code>
                <span>
                  {row.valid ? (
                    <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                      Valid
                    </span>
                  ) : (
                    <span className="inline-block px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 text-[10px] font-bold">
                      Invalid
                    </span>
                  )}
                </span>
                <span className="text-muted-foreground">{row.reason}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Tip: Use <code className="font-mono">camelCase</code> for variables and functions,{" "}
            <code className="font-mono">PascalCase</code> for classes, and{" "}
            <code className="font-mono">UPPER_SNAKE_CASE</code> for constants.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
