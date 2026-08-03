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
  | "Number" | "String" | "Boolean"
  | "null" | "undefined"
  | "Symbol" | "BigInt" | "Object";

interface TypeDemo {
  label: string;
  category: string;
  color: string;
  badgeColor: string;
  typeofResult: string;
  example: string;
  description: string;
  code: string;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<DataTypeKey, TypeDemo> = {
  Number: {
    label: "Number",
    category: "Primitive",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    typeofResult: "number",
    example: "42, 3.14, NaN, Infinity",
    description:
      "IEEE 754 double-precision 64-bit format. Covers integers, floats, NaN, and Infinity. Safe integer range is -(2^53-1) to 2^53-1.",
    code: `let age = 25;\nlet price = 9.99;\nconsole.log(typeof age);        // "number"\nconsole.log(typeof price);      // "number"\nconsole.log(typeof NaN);        // "number"\nconsole.log(Number.isFinite(42)); // true`,
    output: [
      'typeof age: "number"',
      'typeof price: "number"',
      'typeof NaN: "number"',
      "Number.isFinite(42): true",
    ],
  },
  String: {
    label: "String",
    category: "Primitive",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    typeofResult: "string",
    example: '"hello", \'world\', `template`',
    description:
      "An immutable sequence of UTF-16 code units. Can be created with single quotes, double quotes, or backtick template literals.",
    code: `let greeting = "Hello";\nlet name = 'World';\nlet msg = \`\${greeting}, \${name}!\`;\nconsole.log(typeof greeting); // "string"\nconsole.log(msg);             // "Hello, World!"\nconsole.log(msg.length);      // 13`,
    output: [
      'typeof greeting: "string"',
      "msg: Hello, World!",
      "msg.length: 13",
    ],
  },
  Boolean: {
    label: "Boolean",
    category: "Primitive",
    color: "bg-pink-500/15 border-pink-500/40 text-pink-700 dark:text-pink-300",
    badgeColor: "bg-pink-500/20 text-pink-700 dark:text-pink-300",
    typeofResult: "boolean",
    example: "true, false",
    description:
      'Represents a logical value: true or false. Six values are falsy: false, 0, "", null, undefined, NaN. Everything else is truthy.',
    code: `let isActive = true;\nconsole.log(typeof isActive);  // "boolean"\nconsole.log(Boolean(0));       // false\nconsole.log(Boolean("hi"));    // true\nconsole.log(Boolean(null));    // false`,
    output: [
      'typeof isActive: "boolean"',
      "Boolean(0): false",
      'Boolean("hi"): true',
      "Boolean(null): false",
    ],
  },
  null: {
    label: "null",
    category: "Primitive",
    color: "bg-slate-500/15 border-slate-500/40 text-slate-700 dark:text-slate-300",
    badgeColor: "bg-slate-500/20 text-slate-700 dark:text-slate-300",
    typeofResult: 'object (bug)',
    example: "null",
    description:
      'Represents the intentional absence of any value. typeof null returns "object" due to a historical bug in JavaScript that was never fixed.',
    code: `let user = null;\nconsole.log(typeof user);       // "object" (JS bug!)\nconsole.log(user === null);     // true\nconsole.log(user === undefined);// false\nconsole.log(user == undefined); // true (loose)`,
    output: [
      'typeof user: "object"  // JS bug!',
      "user === null: true",
      "user === undefined: false",
      "user == undefined: true  (loose equality)",
    ],
  },
  undefined: {
    label: "undefined",
    category: "Primitive",
    color: "bg-yellow-500/15 border-yellow-500/40 text-yellow-700 dark:text-yellow-300",
    badgeColor: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300",
    typeofResult: "undefined",
    example: "undefined",
    description:
      "Default value for declared-but-unassigned variables. Also returned when accessing missing object properties or when functions have no return statement.",
    code: `let x;\nconsole.log(typeof x);           // "undefined"\nconsole.log(x === undefined);    // true\n\nfunction greet() {}\nconsole.log(typeof greet());     // "undefined"`,
    output: [
      'typeof x: "undefined"',
      "x === undefined: true",
      'typeof greet(): "undefined"',
    ],
  },
  Symbol: {
    label: "Symbol",
    category: "Primitive",
    color: "bg-purple-500/15 border-purple-500/40 text-purple-700 dark:text-purple-300",
    badgeColor: "bg-purple-500/20 text-purple-700 dark:text-purple-300",
    typeofResult: "symbol",
    example: "Symbol('id')",
    description:
      "A guaranteed-unique, immutable primitive used as object property keys. Every Symbol() call produces a distinct value, even with the same description.",
    code: `let id = Symbol("id");\nlet id2 = Symbol("id");\nconsole.log(typeof id);    // "symbol"\nconsole.log(id === id2);   // false (always unique)\nconsole.log(id.toString());// "Symbol(id)"`,
    output: [
      'typeof id: "symbol"',
      "id === id2: false  (always unique)",
      'id.toString(): "Symbol(id)"',
    ],
  },
  BigInt: {
    label: "BigInt",
    category: "Primitive",
    color: "bg-cyan-500/15 border-cyan-500/40 text-cyan-700 dark:text-cyan-300",
    badgeColor: "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300",
    typeofResult: "bigint",
    example: "123n, BigInt(456)",
    description:
      "Represents integers of arbitrary precision. Created by appending n to an integer literal or calling BigInt(). Cannot be mixed with Number in arithmetic without explicit conversion.",
    code: `let big = 9007199254740993n;\nconsole.log(typeof big);       // "bigint"\nconsole.log(big + 1n);         // 9007199254740994n\nconsole.log(big === BigInt("9007199254740993")); // true`,
    output: [
      'typeof big: "bigint"',
      "big + 1n: 9007199254740994n",
      "big === BigInt(...): true",
    ],
  },
  Object: {
    label: "Object",
    category: "Reference",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    typeofResult: "object",
    example: "{ key: value }, [], function(){}",
    description:
      'The only non-primitive type. Objects, arrays, functions, dates, and regex are all objects stored by reference. typeof returns "object" for most, "function" for functions.',
    code: `let obj = { name: "Alice" };\nlet arr = [1, 2, 3];\nlet fn  = function() {};\nconsole.log(typeof obj);  // "object"\nconsole.log(typeof arr);  // "object"\nconsole.log(typeof fn);   // "function"\nconsole.log(Array.isArray(arr)); // true`,
    output: [
      'typeof obj: "object"',
      'typeof arr: "object"',
      'typeof fn: "function"',
      "Array.isArray(arr): true",
    ],
  },
};

const order: DataTypeKey[] = [
  "Number", "String", "Boolean", "null",
  "undefined", "Symbol", "BigInt", "Object",
];

// ─── Value vs Reference demo ──────────────────────────────────────────────────
interface RefDemo {
  label: string;
  color: string;
  code: string;
  output: string[];
  description: string;
}

const refDemos: Record<"value" | "reference", RefDemo> = {
  value: {
    label: "Copy by Value (Primitives)",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    code: `let a = 10;\nlet b = a;   // copy the value\nb = 99;\nconsole.log("a:", a);  // 10 (unchanged)\nconsole.log("b:", b);  // 99`,
    output: ["a: 10  (unchanged)", "b: 99"],
    description:
      "Primitives are copied by value. Changing the copy does not affect the original.",
  },
  reference: {
    label: "Copy by Reference (Objects)",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    code: `let obj1 = { name: "Alice" };\nlet obj2 = obj1;  // copy the reference\nobj2.name = "Bob";\nconsole.log("obj1.name:", obj1.name); // "Bob" (shared!)\nconsole.log("obj2.name:", obj2.name); // "Bob"\nconsole.log(obj1 === obj2);           // true`,
    output: [
      'obj1.name: "Bob"  (changed!)',
      'obj2.name: "Bob"',
      "obj1 === obj2: true  (same reference)",
    ],
    description:
      "Objects are copied by reference. Both variables point to the same object in memory, so mutations are shared.",
  },
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function DataTypesVisualization() {
  const [selected, setSelected]       = useState<DataTypeKey>("Number");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const [refTab, setRefTab]           = useState<"value" | "reference">("value");
  const [refOutput, setRefOutput]     = useState<string[] | null>(null);

  const demo = demos[selected];
  const ref  = refDemos[refTab];

  const handleSelect = (key: DataTypeKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  const handleRefTab = (tab: "value" | "reference") => {
    setRefTab(tab);
    setRefOutput(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">JavaScript Data Types</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ── Section 1: Type selector chips ──────────────────────────────── */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            7 Primitives + Object
          </p>

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
                  typeof &rarr; &quot;{demo.typeofResult}&quot;
                </code>
              </div>
              <p className="text-sm leading-relaxed">{demo.description}</p>
              <p className="text-xs opacity-80 italic font-mono">
                Examples: {demo.example}
              </p>
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
                  {demo.code}
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
        </div>

        {/* ── Section 2: Value vs Reference ───────────────────────────────── */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Value vs Reference
          </p>

          <div className="flex flex-wrap gap-2">
            {(["value", "reference"] as const).map((tab) => {
              const r = refDemos[tab];
              return (
                <button
                  key={tab}
                  onClick={() => handleRefTab(tab)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    refTab === tab
                      ? r.color + " scale-105 shadow-sm"
                      : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          {/* Detail card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={refTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={`rounded-xl border p-4 space-y-3 ${ref.color}`}
            >
              <span className="text-lg font-bold">{ref.label}</span>
              <p className="text-sm leading-relaxed">{ref.description}</p>

              {/* Visual boxes */}
              {refTab === "value" ? (
                <div className="flex items-center gap-4 flex-wrap">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="w-16 h-16 rounded-lg border-2 border-blue-400 bg-blue-500/10 flex items-center justify-center font-mono font-bold text-blue-700 dark:text-blue-300">
                      10
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">a</span>
                  </motion.div>
                  <span className="text-muted-foreground text-lg">&rarr;</span>
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="w-16 h-16 rounded-lg border-2 border-blue-400 bg-blue-500/10 flex items-center justify-center font-mono font-bold text-blue-700 dark:text-blue-300">
                      99
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">b (independent copy)</span>
                  </motion.div>
                </div>
              ) : (
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex flex-col items-center gap-1">
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-8 rounded-lg border-2 border-orange-400 bg-orange-500/10 flex items-center justify-center font-mono text-xs font-bold text-orange-700 dark:text-orange-300"
                    >
                      obj1
                    </motion.div>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-muted-foreground text-xs">&darr;</span>
                    <span className="text-muted-foreground text-xs">&darr;</span>
                  </div>
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="px-4 py-3 rounded-lg border-2 border-orange-400 bg-orange-500/10 font-mono text-xs font-bold text-orange-700 dark:text-orange-300"
                  >
                    {`{ name: "Bob" }`}
                  </motion.div>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-muted-foreground text-xs">&uarr;</span>
                    <span className="text-muted-foreground text-xs">&uarr;</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15 }}
                      className="w-16 h-8 rounded-lg border-2 border-orange-400 bg-orange-500/10 flex items-center justify-center font-mono text-xs font-bold text-orange-700 dark:text-orange-300"
                    >
                      obj2
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Code + Output */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Code</p>
              <AnimatePresence mode="wait">
                <motion.pre
                  key={refTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]"
                >
                  {ref.code}
                </motion.pre>
              </AnimatePresence>
              <Button size="sm" onClick={() => setRefOutput(ref.output)}>
                <Play className="h-3.5 w-3.5 mr-1" /> Run
              </Button>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Output</p>
              <ConsoleOutput lines={refOutput} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
