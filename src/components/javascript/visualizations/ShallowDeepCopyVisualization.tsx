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
type CopyType = "reference" | "shallow" | "deep" | "json";

interface CopyInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const copies: Record<CopyType, CopyInfo> = {
  reference: {
    label: "Reference Copy",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Assignment with = just copies the reference (memory address), not the object itself. Both variables point to the exact same object in memory, so mutating one affects the other.",
    codeSnippet:
`const original = { name: "Alice", address: { city: "NYC" } };
const copy = original;

copy.name = "Bob";
copy.address.city = "LA";

console.log(original.name);
console.log(original.address.city);
console.log(original === copy);`,
    codeOutput: ['"Bob"', '"LA"', "true"],
  },
  shallow: {
    label: "Shallow Copy",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Spread operator { ...obj } or Object.assign() creates a new object with copies of the top-level properties. Primitive values are independent, but nested objects are still shared references.",
    codeSnippet:
`const original = { name: "Alice", address: { city: "NYC" } };
const copy = { ...original };

copy.name = "Bob";
copy.address.city = "LA";

console.log(original.name);
console.log(original.address.city);
console.log(original === copy);`,
    codeOutput: ['"Alice"', '"LA"', "false"],
  },
  deep: {
    label: "Deep Copy",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "structuredClone() recursively copies every level of the object, creating a fully independent clone. It handles circular references, Date, Map, Set, ArrayBuffer, and more.",
    codeSnippet:
`const original = { name: "Alice", address: { city: "NYC" } };
const copy = structuredClone(original);

copy.name = "Bob";
copy.address.city = "LA";

console.log(original.name);
console.log(original.address.city);
console.log(original === copy);`,
    codeOutput: ['"Alice"', '"NYC"', "false"],
  },
  json: {
    label: "JSON Trick",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "JSON.parse(JSON.stringify(obj)) serializes to a JSON string then parses back. It creates a deep copy but loses functions, undefined, Date objects (become strings), Map, Set, RegExp, and fails on circular references.",
    codeSnippet:
`const original = {
  name: "Alice",
  date: new Date("2024-01-01"),
  greet: () => "hi",
  value: undefined
};
const copy = JSON.parse(JSON.stringify(original));

console.log(typeof copy.date);
console.log(copy.greet);
console.log(copy.value);
console.log(copy.name);`,
    codeOutput: ['"string"', "undefined", "undefined", '"Alice"'],
  },
};

const order: CopyType[] = ["reference", "shallow", "deep", "json"];

// ─── comparison table data ────────────────────────────────────────────────────
const comparisonRows = [
  {
    method: "= (assignment)",
    depth: "None",
    circular: "N/A",
    dateMap: "N/A",
    mutatesOriginal: "Yes",
  },
  {
    method: "{ ...obj } / Object.assign()",
    depth: "Top-level only",
    circular: "No",
    dateMap: "Refs shared",
    mutatesOriginal: "Nested only",
  },
  {
    method: "structuredClone()",
    depth: "Full deep",
    circular: "Yes",
    dateMap: "Yes",
    mutatesOriginal: "No",
  },
  {
    method: "JSON.parse(JSON.stringify())",
    depth: "Full deep",
    circular: "No (throws)",
    dateMap: "No (lossy)",
    mutatesOriginal: "No",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function ShallowDeepCopyVisualization() {
  const [selected, setSelected]       = useState<CopyType>("reference");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const group = copies[selected];

  const handleSelect = (key: CopyType) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Shallow vs Deep Copy</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Copy type selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const g = copies[key];
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
                  copy method
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

        {/* Comparison Table */}
        <div className="rounded-xl border bg-muted/30 px-4 py-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">Copy Methods</span>
            <Badge variant="secondary" className="text-[10px] bg-violet-500/15 text-violet-600 dark:text-violet-400">
              comparison
            </Badge>
          </div>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-5 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Method</span>
              <span>Depth</span>
              <span>Handles Circular?</span>
              <span>Handles Date/Map?</span>
              <span>Mutates Original?</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.method}
                className="grid grid-cols-5 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-muted-foreground text-[11px]">{row.method}</code>
                <span className="text-[11px]">{row.depth}</span>
                <span
                  className={`text-[11px] ${
                    row.circular === "Yes"
                      ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                      : row.circular === "No" || row.circular === "No (throws)"
                      ? "text-red-500 dark:text-red-400"
                      : "text-muted-foreground"
                  }`}
                >
                  {row.circular}
                </span>
                <span
                  className={`text-[11px] ${
                    row.dateMap === "Yes"
                      ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                      : row.dateMap === "No (lossy)" || row.dateMap === "Refs shared"
                      ? "text-red-500 dark:text-red-400"
                      : "text-muted-foreground"
                  }`}
                >
                  {row.dateMap}
                </span>
                <span
                  className={`text-[11px] ${
                    row.mutatesOriginal === "No"
                      ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                      : row.mutatesOriginal === "Yes"
                      ? "text-red-500 dark:text-red-400"
                      : "text-orange-500 dark:text-orange-400"
                  }`}
                >
                  {row.mutatesOriginal}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
