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
type DataTypeKey =
  | "let" | "const"
  | "number-int" | "number-float"
  | "string" | "boolean"
  | "null" | "undefined";

interface TypeDemo {
  label: string;
  category: string;
  color: string;
  badgeColor: string;
  typeLabel: string;
  example: string;
  description: string;
  note?: string;
  exampleValue: string;
  truthy: boolean | null;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<DataTypeKey, TypeDemo> = {
  "let": {
    label: "let",
    category: "Declaration",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    typeLabel: "Re-assignable",
    example: `let score = 0;\nscore = 100;\nconsole.log("score:", score);\n\nconst MAX_SCORE = 999;\nconsole.log("MAX_SCORE:", MAX_SCORE);\n// MAX_SCORE = 1;  ← ❌ TypeError`,
    exampleValue: "let x = 42",
    truthy: null,
    description: "Declares a block-scoped variable whose value can be reassigned.",
    note: "Prefer let when the value will change over time.",
    output: ["score: 100", "MAX_SCORE: 999"],
  },
  "const": {
    label: "const",
    category: "Declaration",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    typeLabel: "Immutable binding",
    example: `const PI = 3.14159;\nconsole.log("PI:", PI);\n\nconst user = { name: "Alice" };\nuser.name = "Bob"; // ✅ mutation OK\nconsole.log("user.name:", user.name);\n// PI = 3; ← ❌ TypeError`,
    exampleValue: "const PI = 3.14",
    truthy: null,
    description: "Declares a block-scoped binding that cannot be reassigned after initialisation.",
    note: "Use const by default — it makes intent clear.",
    output: ["PI: 3.14159", "user.name: Bob"],
  },
  "number-int": {
    label: "Number (int)",
    category: "Data Type",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    typeLabel: "number",
    example: `let age = 25;\nconsole.log("age:", age);\nconsole.log("typeof age:", typeof age);\nconsole.log("isInteger:", Number.isInteger(age));`,
    exampleValue: "25",
    truthy: true,
    description: "JavaScript has a single number type for both integers and floats (IEEE 754 double-precision).",
    note: "Safe integer range: -(2⁵³-1) to 2⁵³-1.",
    output: ["age: 25", 'typeof age: "number"', "isInteger: true"],
  },
  "number-float": {
    label: "Number (float)",
    category: "Data Type",
    color: "bg-cyan-500/15 border-cyan-500/40 text-cyan-700 dark:text-cyan-300",
    badgeColor: "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300",
    typeLabel: "number",
    example: `let price = 9.99;\nconsole.log("price:", price);\nconsole.log("typeof price:", typeof price);\nconsole.log("isInteger:", Number.isInteger(price));\nconsole.log("0.1 + 0.2:", 0.1 + 0.2);`,
    exampleValue: "9.99",
    truthy: true,
    description: "Floating-point numbers share the same `number` type as integers — just with a decimal portion.",
    note: "Floating-point arithmetic can have tiny precision errors.",
    output: ["price: 9.99", 'typeof price: "number"', "isInteger: false", "0.1 + 0.2: 0.30000000000000004"],
  },
  "string": {
    label: "String",
    category: "Data Type",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    typeLabel: "string",
    example: `let firstName = "Alice";\nlet greeting = \`Hi, \${firstName}!\`;\nconsole.log("greeting:", greeting);\nconsole.log("length:", firstName.length);\nconsole.log("typeof:", typeof firstName);`,
    exampleValue: '"Alice"',
    truthy: true,
    description: "An immutable sequence of UTF-16 characters. Use single quotes, double quotes, or backticks (template literals).",
    note: "Strings are immutable — operations return new strings.",
    output: ["greeting: Hi, Alice!", "length: 5", 'typeof: "string"'],
  },
  "boolean": {
    label: "Boolean",
    category: "Data Type",
    color: "bg-pink-500/15 border-pink-500/40 text-pink-700 dark:text-pink-300",
    badgeColor: "bg-pink-500/20 text-pink-700 dark:text-pink-300",
    typeLabel: "boolean",
    example: `let isLoggedIn = true;\nconsole.log("isLoggedIn:", isLoggedIn);\nconsole.log("typeof:", typeof isLoggedIn);\nconsole.log("!isLoggedIn:", !isLoggedIn);\nif (isLoggedIn) console.log("Welcome!");`,
    exampleValue: "true",
    truthy: true,
    description: "Represents a logical value: either true or false. Used extensively in conditionals and comparisons.",
    note: "Falsy values: false, 0, \"\", null, undefined, NaN.",
    output: ["isLoggedIn: true", 'typeof: "boolean"', "!isLoggedIn: false", "Welcome!"],
  },
  "null": {
    label: "null",
    category: "Special Value",
    color: "bg-slate-500/15 border-slate-500/40 text-slate-700 dark:text-slate-300",
    badgeColor: "bg-slate-500/20 text-slate-700 dark:text-slate-300",
    typeLabel: "object (quirk)",
    example: `let user = null;\nconsole.log("user:", user);\nconsole.log("typeof null:", typeof user);\nconsole.log("user === null:", user === null);`,
    exampleValue: "null",
    truthy: false,
    description: "Represents the intentional absence of any object value. Assigned explicitly by the developer.",
    note: "typeof null === \"object\" is a historical JS bug.",
    output: ["user: null", 'typeof null: "object"  // ⚠️ JS quirk', "user === null: true"],
  },
  "undefined": {
    label: "undefined",
    category: "Special Value",
    color: "bg-yellow-500/15 border-yellow-500/40 text-yellow-700 dark:text-yellow-300",
    badgeColor: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300",
    typeLabel: "undefined",
    example: `let x;\nconsole.log("x:", x);\nconsole.log("typeof x:", typeof x);\nconsole.log("x === undefined:", x === undefined);`,
    exampleValue: "undefined",
    truthy: false,
    description: "A variable that has been declared but not yet assigned a value. Also returned by functions with no return statement.",
    note: "undefined means 'not yet set'; null means 'intentionally empty'.",
    output: ["x: undefined", 'typeof x: "undefined"', "x === undefined: true"],
  },
};

const order: DataTypeKey[] = [
  "let", "const", "number-int", "number-float",
  "string", "boolean", "null", "undefined",
];

const tableRows: DataTypeKey[] = [
  "number-int", "number-float", "string", "boolean", "null", "undefined",
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function VariablesVisualization() {
  const [selected, setSelected]       = useState<DataTypeKey>("let");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: DataTypeKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Variables &amp; Data Types</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Type selector chips */}
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

        {/* Detail card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl border p-4 space-y-2 ${demo.color}`}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-mono">{demo.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                  {demo.category}
                </Badge>
              </div>
              <code className="text-xs bg-black/10 dark:bg-white/10 rounded px-2 py-0.5 font-mono">
                typeof → &quot;{demo.typeLabel}&quot;
              </code>
            </div>
            <p className="text-sm leading-relaxed">{demo.description}</p>
            {demo.note && <p className="text-xs opacity-80 italic">{demo.note}</p>}
          </motion.div>
        </AnimatePresence>

        {/* Code + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Code</p>
            <AnimatePresence mode="wait">
              <motion.pre
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]"
              >
                {demo.example}
              </motion.pre>
            </AnimatePresence>
            <Button size="sm" onClick={() => setOutputLines(demo.output)}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <ConsoleOutput lines={outputLines} />
          </div>
        </div>

        {/* typeof Quick Reference Table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            typeof Quick Reference
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Type</span>
              <span>Example value</span>
              <span>typeof result</span>
              <span className="text-center">Truthy?</span>
            </div>
            {tableRows.map((key) => {
              const d = demos[key];
              const isSelected = selected === key;
              return (
                <motion.div
                  key={key}
                  onClick={() => handleSelect(key)}
                  animate={{ backgroundColor: isSelected ? "hsl(var(--primary) / 0.08)" : "transparent" }}
                  transition={{ duration: 0.15 }}
                  className={`grid grid-cols-4 px-3 py-2.5 border-t cursor-pointer hover:bg-muted/40 transition-colors ${isSelected ? "font-semibold" : ""}`}
                >
                  <span className={`font-mono ${isSelected ? "text-primary" : ""}`}>
                    {d.label}
                    {isSelected && <span className="ml-1 text-[9px] text-primary">◀</span>}
                  </span>
                  <code className="font-mono text-[11px] text-muted-foreground">{d.exampleValue}</code>
                  <code className={`font-mono text-[11px] ${key === "null" ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                    &quot;{d.typeLabel}&quot;
                  </code>
                  <span className="text-center">
                    {d.truthy === true && (
                      <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">truthy</span>
                    )}
                    {d.truthy === false && (
                      <span className="inline-block px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 text-[10px] font-bold">falsy</span>
                    )}
                  </span>
                </motion.div>
              );
            })}
          </div>
          <p className="text-[11px] text-muted-foreground">
            ⚠️ <code className="font-mono">typeof null</code> returns{" "}
            <code className="font-mono">&quot;object&quot;</code> — a known historical bug in JavaScript.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
