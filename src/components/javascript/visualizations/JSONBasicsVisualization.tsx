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
type JSONKey = "stringify" | "parse" | "drops" | "replacerReviver";

interface JSONDemo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<JSONKey, JSONDemo> = {
  stringify: {
    label: "stringify",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "JSON.stringify() converts a JavaScript value to a JSON string. Pass a third argument (number of spaces) for pretty-printed output.",
    codeSnippet: `const user = { name: "Alice", age: 30, hobbies: ["reading", "coding"] };

// Compact
console.log(JSON.stringify(user));

// Pretty-printed (2-space indent)
console.log(JSON.stringify(user, null, 2));`,
    codeOutput: [
      '{"name":"Alice","age":30,"hobbies":["reading","coding"]}',
      "{",
      '  "name": "Alice",',
      '  "age": 30,',
      '  "hobbies": [',
      '    "reading",',
      '    "coding"',
      "  ]",
      "}",
    ],
  },
  parse: {
    label: "parse",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "JSON.parse() takes a valid JSON string and converts it back into a JavaScript object (or array, number, etc.).",
    codeSnippet: `const jsonStr = '{"name":"Alice","age":30}';
const obj = JSON.parse(jsonStr);

console.log(typeof obj);    // "object"
console.log(obj.name);      // "Alice"
console.log(obj.age);       // 30
console.log(obj === jsonStr); // false (different types)`,
    codeOutput: [
      'typeof obj: "object"',
      'obj.name: "Alice"',
      "obj.age: 30",
      "obj === jsonStr: false  (object vs string)",
    ],
  },
  drops: {
    label: "What JSON Drops",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "JSON.stringify() silently ignores properties whose values are undefined, functions, or Symbols. In arrays, they become null instead of being removed.",
    codeSnippet: `const data = {
  name: "Alice",
  greet: function() { return "hi"; },
  id: Symbol("id"),
  score: undefined,
  tags: [1, undefined, Symbol("x"), 3]
};

console.log(JSON.stringify(data, null, 2));`,
    codeOutput: [
      "{",
      '  "name": "Alice",',
      '  "tags": [',
      "    1,",
      "    null,",
      "    null,",
      "    3",
      "  ]",
      "}",
      "// greet (function), id (Symbol), score (undefined) are dropped",
      "// In arrays: undefined, Symbol, function become null",
    ],
  },
  replacerReviver: {
    label: "replacer & reviver",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "The replacer (2nd arg of stringify) filters or transforms values during serialization. The reviver (2nd arg of parse) transforms values during deserialization.",
    codeSnippet: `// Replacer: hide sensitive fields
const user = { name: "Alice", password: "s3cret", age: 30 };
const safe = JSON.stringify(user, (key, val) =>
  key === "password" ? undefined : val
, 2);
console.log(safe);

// Reviver: convert date strings back to Date objects
const json = '{"createdAt":"2025-01-15T10:30:00.000Z"}';
const parsed = JSON.parse(json, (key, val) =>
  key === "createdAt" ? new Date(val) : val
);
console.log(parsed.createdAt instanceof Date);`,
    codeOutput: [
      "{",
      '  "name": "Alice",',
      '  "age": 30',
      "}",
      "// password field removed by replacer",
      "",
      "parsed.createdAt instanceof Date: true",
      "// reviver converted the string back to a Date object",
    ],
  },
};

const order: JSONKey[] = ["stringify", "parse", "drops", "replacerReviver"];

// ─── Comparison table data ────────────────────────────────────────────────────
interface TypeRow {
  type: string;
  supported: boolean;
  example: string;
  notes: string;
}

const typeRows: TypeRow[] = [
  { type: "String",    supported: true,  example: '"hello"',       notes: "Must use double quotes in JSON" },
  { type: "Number",    supported: true,  example: "42, 3.14",      notes: "No NaN, Infinity, or leading zeros" },
  { type: "Boolean",   supported: true,  example: "true, false",   notes: "Lowercase only" },
  { type: "null",      supported: true,  example: "null",          notes: "Supported as a value" },
  { type: "Object",    supported: true,  example: '{"key":"val"}', notes: "Keys must be double-quoted strings" },
  { type: "Array",     supported: true,  example: "[1, 2, 3]",     notes: "Ordered list of values" },
  { type: "undefined", supported: false, example: "undefined",     notes: "Dropped from objects, null in arrays" },
  { type: "Function",  supported: false, example: "function(){}",  notes: "Dropped from objects, null in arrays" },
  { type: "Symbol",    supported: false, example: "Symbol('id')",  notes: "Dropped from objects, null in arrays" },
  { type: "Date",      supported: false, example: "new Date()",    notes: "Serialised as ISO string, not revived automatically" },
  { type: "BigInt",    supported: false, example: "123n",          notes: "Throws TypeError if stringified" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function JSONBasicsVisualization() {
  const [selected, setSelected] = useState<JSONKey>("stringify");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: JSONKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">JSON Basics</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ── Section 1: Concept selector chips ──────────────────────────── */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Core Concepts
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
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-mono">{demo.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                  JSON
                </Badge>
              </div>
              <p className="text-sm leading-relaxed">{demo.description}</p>
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
                  {demo.codeSnippet}
                </motion.pre>
              </AnimatePresence>
              <Button size="sm" onClick={() => setOutputLines(demo.codeOutput)}>
                <Play className="h-3.5 w-3.5 mr-1" /> Run
              </Button>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Output</p>
              <ConsoleOutput lines={outputLines} />
            </div>
          </div>
        </div>

        {/* ── Section 2: Comparison table ─────────────────────────────────── */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            JSON Supported Types
          </p>

          <div className="rounded-xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/40 border-b">
                    <th className="text-left px-4 py-2.5 font-semibold text-muted-foreground">Type</th>
                    <th className="text-center px-4 py-2.5 font-semibold text-muted-foreground">Supported?</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-muted-foreground">Example</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-muted-foreground">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {typeRows.map((row) => (
                    <tr key={row.type} className="border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2 font-mono font-semibold">{row.type}</td>
                      <td className="px-4 py-2 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            row.supported
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                              : "bg-red-500/15 text-red-700 dark:text-red-300"
                          }`}
                        >
                          {row.supported ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-4 py-2 font-mono text-muted-foreground">{row.example}</td>
                      <td className="px-4 py-2 text-muted-foreground">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
