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
type ConversionGroup = "toNumber" | "toString" | "toBoolean" | "implicit";

interface ConversionRow {
  input: string;
  result: string;
  highlight?: "truthy" | "falsy";
  note?: string;
}

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  rows: ConversionRow[];
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<ConversionGroup, GroupInfo> = {
  toNumber: {
    label: "To Number",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Number() converts a value to a number. Empty strings and null become 0, true becomes 1, and non-numeric strings become NaN.",
    rows: [
      { input: '"42"',       result: "42",  note: "numeric string" },
      { input: '""',         result: "0",   note: "empty string" },
      { input: '"hello"',    result: "NaN", note: "non-numeric string" },
      { input: "true",       result: "1" },
      { input: "false",      result: "0" },
      { input: "null",       result: "0" },
      { input: "undefined",  result: "NaN" },
      { input: '"  3.14  "', result: "3.14", note: "trims whitespace" },
    ],
    codeSnippet:
`console.log(Number("42"));
console.log(Number(""));
console.log(Number("hello"));
console.log(Number(true));
console.log(Number(false));
console.log(Number(null));
console.log(Number(undefined));
console.log(Number("  3.14  "));`,
    codeOutput: ["42", "0", "NaN", "1", "0", "0", "NaN", "3.14"],
  },
  toString: {
    label: "To String",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "String() converts any value to its string representation. Most conversions are straightforward and predictable.",
    rows: [
      { input: "42",        result: '"42"' },
      { input: "3.14",      result: '"3.14"' },
      { input: "true",      result: '"true"' },
      { input: "false",     result: '"false"' },
      { input: "null",      result: '"null"' },
      { input: "undefined", result: '"undefined"' },
      { input: "NaN",       result: '"NaN"' },
      { input: "[]",        result: '""',           note: "empty array" },
      { input: "[1, 2]",    result: '"1,2"',         note: "joins elements" },
    ],
    codeSnippet:
`console.log(String(42));
console.log(String(3.14));
console.log(String(true));
console.log(String(false));
console.log(String(null));
console.log(String(undefined));
console.log(String(NaN));
console.log(String([]));
console.log(String([1, 2]));`,
    codeOutput: ['"42"', '"3.14"', '"true"', '"false"', '"null"', '"undefined"', '"NaN"', '""', '"1,2"'],
  },
  toBoolean: {
    label: "To Boolean",
    color: "bg-pink-500/15 border-pink-500/40 text-pink-700 dark:text-pink-300",
    badgeColor: "bg-pink-500/20 text-pink-700 dark:text-pink-300",
    description:
      'Boolean() returns false for "falsy" values (0, "", null, undefined, NaN, false, 0n) and true for everything else.',
    rows: [
      { input: "0",         result: "false", highlight: "falsy" },
      { input: '""',        result: "false", highlight: "falsy",  note: "empty string" },
      { input: "null",      result: "false", highlight: "falsy" },
      { input: "undefined", result: "false", highlight: "falsy" },
      { input: "NaN",       result: "false", highlight: "falsy" },
      { input: "false",     result: "false", highlight: "falsy" },
      { input: "0n",        result: "false", highlight: "falsy",  note: "BigInt zero" },
      { input: "1",         result: "true",  highlight: "truthy" },
      { input: '"hello"',   result: "true",  highlight: "truthy" },
      { input: "[]",        result: "true",  highlight: "truthy", note: "empty array!" },
      { input: "{}",        result: "true",  highlight: "truthy", note: "empty object!" },
      { input: '"0"',       result: "true",  highlight: "truthy", note: 'string "0"!' },
    ],
    codeSnippet:
`console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));
console.log(Boolean(1));
console.log(Boolean("hello"));
console.log(Boolean([]));
console.log(Boolean({}));
console.log(Boolean("0"));`,
    codeOutput: ["false", "false", "false", "false", "false", "true", "true", "true", "true", "true"],
  },
  implicit: {
    label: "Implicit Coercion",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "JavaScript automatically converts types during operations. The + operator concatenates if either operand is a string; other math operators convert to numbers.",
    rows: [
      { input: '"5" + 3',       result: '"53"',   note: "string concat" },
      { input: '"5" - 3',       result: "2",      note: "numeric subtraction" },
      { input: '"5" * 2',       result: "10",     note: "numeric multiplication" },
      { input: '"5" / 2',       result: "2.5",    note: "numeric division" },
      { input: "true + 1",      result: "2",      note: "true -> 1" },
      { input: "false + 1",     result: "1",      note: "false -> 0" },
      { input: "null + 5",      result: "5",      note: "null -> 0" },
      { input: '"" + 0',        result: '"0"',    note: "string concat" },
      { input: '"5" == 5',      result: "true",   note: "loose equality coerces" },
      { input: '"5" === 5',     result: "false",  note: "strict: no coercion" },
    ],
    codeSnippet:
`console.log("5" + 3);
console.log("5" - 3);
console.log("5" * 2);
console.log("5" / 2);
console.log(true + 1);
console.log(false + 1);
console.log(null + 5);
console.log("" + 0);
console.log("5" == 5);
console.log("5" === 5);`,
    codeOutput: ['"53"', "2", "10", "2.5", "2", "1", "5", '"0"', "true", "false"],
  },
};

const order: ConversionGroup[] = ["toNumber", "toString", "toBoolean", "implicit"];

const falsyValues = [
  { value: "false",     description: "The boolean false" },
  { value: "0",         description: "The number zero" },
  { value: '""',        description: "Empty string" },
  { value: "null",      description: "Absence of any value" },
  { value: "undefined", description: "Declared but not assigned" },
  { value: "NaN",       description: "Not a Number" },
  { value: "0n",        description: "BigInt zero" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function TypeConversionVisualization() {
  const [selected, setSelected]       = useState<ConversionGroup>("toNumber");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const group = groups[selected];

  const handleSelect = (key: ConversionGroup) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Type Conversion</CardTitle>
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
                  conversion
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{group.description}</p>
            </div>

            {/* Two-column: reference table | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Conversion reference table */}
              <div className="rounded-xl border overflow-hidden text-xs">
                <div className="grid grid-cols-2 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                  <span>Input</span>
                  <span>Result</span>
                </div>
                {group.rows.map((row) => (
                  <div
                    key={`${row.input}-${row.result}`}
                    className="grid grid-cols-2 px-3 py-2 border-t items-center gap-1"
                  >
                    <code className="font-mono font-bold text-muted-foreground">{row.input}</code>
                    <div>
                      <code
                        className={`font-mono text-[11px] ${
                          row.highlight === "falsy"
                            ? "text-red-500 dark:text-red-400"
                            : row.highlight === "truthy"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        {row.result}
                      </code>
                      {row.highlight && (
                        <Badge
                          variant="secondary"
                          className={`ml-2 text-[9px] px-1.5 py-0 ${
                            row.highlight === "falsy"
                              ? "bg-red-500/15 text-red-600 dark:text-red-400"
                              : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          {row.highlight}
                        </Badge>
                      )}
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

        {/* Falsy Values Reference Section */}
        <div className="rounded-xl border bg-muted/30 px-4 py-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">Falsy Values</span>
            <Badge variant="secondary" className="text-[10px] bg-red-500/15 text-red-600 dark:text-red-400">
              7 values
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            These are the only values that evaluate to <code className="font-mono text-red-500">false</code> when converted to a boolean. Everything else is truthy.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {falsyValues.map((item) => (
              <div
                key={item.value}
                className="flex items-center gap-3 rounded-lg border bg-background/60 px-3 py-2"
              >
                <code className="font-mono text-xs font-bold text-red-500 dark:text-red-400 min-w-[80px]">
                  {item.value}
                </code>
                <span className="text-[11px] text-muted-foreground">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
