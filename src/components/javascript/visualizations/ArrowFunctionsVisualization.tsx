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
type ArrowGroup = "basicSyntax" | "singleParam" | "blockBody" | "noThisBinding";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<ArrowGroup, GroupInfo> = {
  basicSyntax: {
    label: "Basic Syntax",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Arrow functions provide a concise syntax for writing functions. When the body is a single expression, you can omit the curly braces and the return keyword — the expression is implicitly returned.",
    codeSnippet:
`// Traditional function
function addTraditional(a, b) {
  return a + b;
}

// Arrow function (concise body)
const add = (a, b) => a + b;

console.log(addTraditional(2, 3));
console.log(add(2, 3));

// Implicit return of expressions
const multiply = (x, y) => x * y;
console.log(multiply(4, 5));

const isEven = (n) => n % 2 === 0;
console.log(isEven(6));`,
    codeOutput: ["5", "5", "20", "true"],
  },
  singleParam: {
    label: "Single Param",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "When an arrow function has exactly one parameter, the parentheses around it are optional. This makes callbacks and simple transformations even more concise.",
    codeSnippet:
`// No parentheses needed for single param
const double = x => x * 2;
console.log(double(7));

const greet = name => \`Hello, \${name}!\`;
console.log(greet("Alice"));

// Zero params still need parentheses
const getRandom = () => Math.floor(Math.random() * 100);
console.log(typeof getRandom());

// Multiple params still need parentheses
const sum = (a, b) => a + b;
console.log(sum(10, 20));`,
    codeOutput: ["14", '"Hello, Alice!"', '"number"', "30"],
  },
  blockBody: {
    label: "Block Body",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "When your arrow function needs multiple statements, use curly braces for a block body. With a block body you must use an explicit return statement — there is no implicit return.",
    codeSnippet:
`// Block body with explicit return
const greet = (name) => {
  const greeting = \`Hello, \${name}!\`;
  const time = "morning";
  return \`\${greeting} Good \${time}.\`;
};
console.log(greet("Bob"));

// Multi-step calculation
const calculateTax = (price) => {
  const taxRate = 0.08;
  const tax = price * taxRate;
  const total = price + tax;
  return total;
};
console.log(calculateTax(100));

// Without return, you get undefined
const oops = (x) => {
  x * 2;
};
console.log(oops(5));`,
    codeOutput: ['"Hello, Bob! Good morning."', "108", "undefined"],
  },
  noThisBinding: {
    label: "No this Binding",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Arrow functions do not have their own `this`. They inherit `this` from the enclosing lexical scope. This is one of the most important differences from regular functions and is especially useful in callbacks.",
    codeSnippet:
`// Regular function: 'this' depends on how it's called
const objRegular = {
  name: "Regular",
  greet: function () {
    return "Hi from " + this.name;
  },
};
console.log(objRegular.greet());

// Arrow function: 'this' comes from outer scope
const objArrow = {
  name: "Arrow",
  greet: () => {
    // 'this' is NOT objArrow here
    return "Hi from " + (typeof this === "undefined" ? "undefined" : this);
  },
};
console.log(objArrow.greet());

// Where arrows shine: callbacks
const timer = {
  name: "Timer",
  start: function () {
    // Arrow inherits 'this' from start()
    const callback = () => "Tick from " + this.name;
    return callback();
  },
};
console.log(timer.start());`,
    codeOutput: ['"Hi from Regular"', '"Hi from undefined"', '"Tick from Timer"'],
  },
};

const order: ArrowGroup[] = ["basicSyntax", "singleParam", "blockBody", "noThisBinding"];

// ─── Syntax comparison table data ────────────────────────────────────────────
const syntaxRows = [
  {
    shorthand: "Concise body",
    example: "(a, b) => a + b",
    whenToUse: "Single expression, implicit return",
  },
  {
    shorthand: "Single param",
    example: "x => x * 2",
    whenToUse: "Exactly one parameter",
  },
  {
    shorthand: "No params",
    example: "() => 42",
    whenToUse: "Zero parameters",
  },
  {
    shorthand: "Block body",
    example: "(x) => { return x * 2; }",
    whenToUse: "Multiple statements, explicit return",
  },
  {
    shorthand: "Return object",
    example: "(x) => ({ key: x })",
    whenToUse: "Return an object literal (wrap in parens)",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function ArrowFunctionsVisualization() {
  const [selected, setSelected]       = useState<ArrowGroup>("basicSyntax");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const group = groups[selected];

  const handleSelect = (key: ArrowGroup) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Arrow Functions</CardTitle>
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
                  arrow fn
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{group.description}</p>
            </div>

            {/* Visual breakdown for Basic Syntax */}
            {selected === "basicSyntax" && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Visual Breakdown</p>
                <div className="rounded-xl border bg-muted/30 px-4 py-4">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-sm justify-center">
                    <span className="px-2 py-1 rounded-lg bg-violet-500/20 border border-violet-500/40 text-violet-700 dark:text-violet-300 font-semibold text-xs">
                      const
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-700 dark:text-blue-300 font-semibold">
                      add
                    </span>
                    <span className="text-muted-foreground font-bold text-lg">=</span>
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-semibold">
                      (a, b)
                    </span>
                    <span className="text-orange-500 font-bold text-lg">=&gt;</span>
                    <span className="px-3 py-1.5 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-700 dark:text-orange-300 font-semibold">
                      a + b
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] justify-center mt-3 text-muted-foreground">
                    <span className="px-2 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400">
                      keyword
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      name
                    </span>
                    <span />
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      params
                    </span>
                    <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400">
                      arrow
                    </span>
                    <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400">
                      body (implicit return)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* this comparison for No this Binding */}
            {selected === "noThisBinding" && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">this Binding Comparison</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-xl border overflow-hidden">
                    <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-3 py-2">
                      <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Regular Function</span>
                    </div>
                    <pre className="text-xs font-mono px-3 py-3 whitespace-pre overflow-x-auto bg-muted/20">
{`greet: function() {
  // 'this' = the object
  return this.name;
}`}
                    </pre>
                  </div>
                  <div className="rounded-xl border overflow-hidden">
                    <div className="bg-orange-500/10 border-b border-orange-500/30 px-3 py-2">
                      <span className="text-xs font-semibold text-orange-700 dark:text-orange-300">Arrow Function</span>
                    </div>
                    <pre className="text-xs font-mono px-3 py-3 whitespace-pre overflow-x-auto bg-muted/20">
{`greet: () => {
  // 'this' = outer scope
  return this.name;
  // undefined!
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

        {/* Syntax Comparison Table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Syntax Comparison</p>
          <div className="rounded-xl border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/40 border-b">
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Syntax Shorthand</th>
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Example</th>
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground">When to Use</th>
                </tr>
              </thead>
              <tbody>
                {syntaxRows.map((row) => (
                  <tr key={row.shorthand} className="border-b last:border-b-0">
                    <td className="px-3 py-2 font-semibold">{row.shorthand}</td>
                    <td className="px-3 py-2 font-mono text-blue-600 dark:text-blue-400">{row.example}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.whenToUse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-world application */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Real Application</p>
          <div className="rounded-xl border bg-muted/30 px-4 py-3">
            <p className="text-xs text-muted-foreground mb-2">
              Arrow functions are used extensively with array methods for clean, readable data transformations:
            </p>
            <pre className="text-xs font-mono whitespace-pre overflow-x-auto text-emerald-700 dark:text-emerald-300">
{`const items = [
  { name: "Widget", price: 25 },
  { name: "Gadget", price: 50 },
];

const prices = items.map(item => item.price * 1.1);
// [27.5, 55]`}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
