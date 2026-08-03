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
          {lines.map((line, i) => (
            <p key={`${i}-${line}`} className="text-emerald-400">
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
type IterTab = "findFindIndex" | "someEvery" | "includesIndexOf" | "flatFlatMap";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<IterTab, TabInfo> = {
  findFindIndex: {
    label: "find / findIndex",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "find() returns the first element that satisfies a testing function, or undefined if none match. findIndex() returns the index of that element, or -1 if not found. Both stop iterating as soon as a match is found.",
    codeSnippet: `const users = [
  { name: "Alice", age: 25 },
  { name: "Bob",   age: 30 },
  { name: "Carol", age: 35 },
];

const user  = users.find(u => u.age > 28);
const index = users.findIndex(u => u.age > 28);

console.log(user);   // { name: "Bob", age: 30 }
console.log(index);  // 1`,
    codeOutput: [
      '{ name: "Bob", age: 30 }',
      "1",
    ],
  },
  someEvery: {
    label: "some / every",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "some() tests whether at least one element passes the condition and returns true/false. every() tests whether all elements pass. Both short-circuit: some() stops on the first true, every() stops on the first false.",
    codeSnippet: `const nums = [1, 2, 3, 4, 5];

const hasEven   = nums.some(n => n % 2 === 0);
const allPos    = nums.every(n => n > 0);
const allEven   = nums.every(n => n % 2 === 0);

console.log("hasEven:", hasEven);   // true
console.log("allPos:",  allPos);    // true
console.log("allEven:", allEven);   // false`,
    codeOutput: [
      "hasEven: true",
      "allPos:  true",
      "allEven: false",
    ],
  },
  includesIndexOf: {
    label: "includes / indexOf",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "includes() returns true if the array contains a given value (using SameValueZero comparison, so it finds NaN). indexOf() returns the first index of the value, or -1 if absent. Both accept an optional fromIndex.",
    codeSnippet: `const fruits = ["apple", "banana", "cherry"];

console.log(fruits.includes("banana"));  // true
console.log(fruits.includes("grape"));   // false
console.log(fruits.indexOf("cherry"));   // 2
console.log(fruits.indexOf("grape"));    // -1

// includes handles NaN correctly
console.log([1, NaN, 3].includes(NaN));  // true
console.log([1, NaN, 3].indexOf(NaN));   // -1`,
    codeOutput: [
      "true",
      "false",
      "2",
      "-1",
      "true   // includes finds NaN",
      "-1     // indexOf cannot find NaN",
    ],
  },
  flatFlatMap: {
    label: "flat / flatMap",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "flat(depth) creates a new array with all sub-array elements concatenated up to the specified depth (default 1). flatMap() first maps each element using a function, then flattens the result by one level -- equivalent to map().flat(1) but more efficient.",
    codeSnippet: `const nested = [1, [2, 3], [4, [5, 6]]];

console.log(nested.flat());    // [1,2,3,4,[5,6]]
console.log(nested.flat(2));   // [1,2,3,4,5,6]

const sentences = ["Hello world", "Goodbye moon"];
const words = sentences.flatMap(s => s.split(" "));
console.log(words);
// ["Hello","world","Goodbye","moon"]`,
    codeOutput: [
      "[1, 2, 3, 4, [5, 6]]",
      "[1, 2, 3, 4, 5, 6]",
      '["Hello", "world", "Goodbye", "moon"]',
    ],
  },
};

const order: IterTab[] = ["findFindIndex", "someEvery", "includesIndexOf", "flatFlatMap"];

// ─── Visual: find / findIndex ─────────────────────────────────────────────────
function FindVisual() {
  const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Carol", age: 35 },
  ];
  const [threshold, setThreshold] = useState<number | null>(null);
  const thresholds = [20, 28, 32, 40];

  const foundIdx = threshold !== null ? users.findIndex((u) => u.age > threshold) : -1;

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground">
        Pick a threshold -- find first user with age &gt; threshold:
      </p>
      <div className="flex gap-2">
        {thresholds.map((t) => (
          <button
            key={t}
            onClick={() => setThreshold(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              threshold === t
                ? "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300 scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            &gt; {t}
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[120px]">
        {threshold !== null ? (
          <div className="space-y-2">
            <div className="flex gap-2">
              {users.map((u, i) => (
                <motion.div
                  key={u.name}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: i === foundIdx ? 1 : 0.4,
                  }}
                  transition={{ delay: i * 0.1, duration: 0.2 }}
                  className={`px-3 py-2 rounded-lg border text-xs font-mono ${
                    i === foundIdx
                      ? "bg-blue-500/15 border-blue-400/40 text-blue-700 dark:text-blue-300 font-bold ring-2 ring-blue-400/50"
                      : "bg-muted/30 border-border text-muted-foreground"
                  }`}
                >
                  {u.name} ({u.age})
                </motion.div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs font-mono text-muted-foreground mt-2"
            >
              {foundIdx >= 0
                ? `find() => { name: "${users[foundIdx].name}", age: ${users[foundIdx].age} }  |  findIndex() => ${foundIdx}`
                : "find() => undefined  |  findIndex() => -1"}
            </motion.p>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-8">
            Select a threshold above to find the first matching user
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: some / every ─────────────────────────────────────────────────────
function SomeEveryVisual() {
  const nums = [1, 2, 3, 4, 5];
  const [activeCheck, setActiveCheck] = useState<"someEven" | "allPos" | "allEven" | null>(null);

  const checks = [
    { key: "someEven" as const, label: "some(n => n % 2 === 0)", method: "some" },
    { key: "allPos" as const, label: "every(n => n > 0)", method: "every" },
    { key: "allEven" as const, label: "every(n => n % 2 === 0)", method: "every" },
  ];

  const getHighlight = (n: number) => {
    if (activeCheck === "someEven") return n % 2 === 0;
    if (activeCheck === "allPos") return n > 0;
    if (activeCheck === "allEven") return n % 2 === 0;
    return false;
  };

  const getResult = () => {
    if (activeCheck === "someEven") return "true";
    if (activeCheck === "allPos") return "true";
    if (activeCheck === "allEven") return "false";
    return "";
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {checks.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveCheck(c.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all font-mono ${
              activeCheck === c.key
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            .{c.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[120px] space-y-3">
        <div className="flex gap-1.5">
          {nums.map((n) => {
            const highlighted = activeCheck !== null && getHighlight(n);
            return (
              <motion.div
                key={n}
                animate={{
                  opacity: activeCheck === null ? 0.7 : highlighted ? 1 : 0.35,
                  scale: highlighted ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center text-xs font-mono font-bold ${
                  highlighted
                    ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-700 dark:text-emerald-300"
                    : "bg-muted/30 border-border text-muted-foreground"
                }`}
              >
                {n}
              </motion.div>
            );
          })}
        </div>

        {activeCheck && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-xs font-mono text-muted-foreground">Result:</span>
            <Badge
              variant="secondary"
              className={`text-xs font-mono ${
                getResult() === "true"
                  ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                  : "bg-red-500/20 text-red-700 dark:text-red-300"
              }`}
            >
              {getResult()}
            </Badge>
          </motion.div>
        )}

        {!activeCheck && (
          <p className="text-xs text-muted-foreground text-center py-4">
            Select a condition above to test across the array
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: includes / indexOf ───────────────────────────────────────────────
function IncludesVisual() {
  const fruits = ["apple", "banana", "cherry"];
  const [searchVal, setSearchVal] = useState<string | null>(null);
  const searchOptions = ["banana", "cherry", "grape"];

  const foundIdx = searchVal !== null ? fruits.indexOf(searchVal) : -1;
  const found = searchVal !== null ? fruits.includes(searchVal) : null;

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground">
        Search for a value in the array:
      </p>
      <div className="flex gap-2">
        {searchOptions.map((s) => (
          <button
            key={s}
            onClick={() => setSearchVal(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              searchVal === s
                ? "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300 scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            &quot;{s}&quot;
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[120px]">
        {searchVal !== null ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              {fruits.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: f === searchVal ? 1 : 0.4,
                  }}
                  transition={{ delay: i * 0.08, duration: 0.2 }}
                  className={`px-3 py-2 rounded-lg border text-xs font-mono ${
                    f === searchVal
                      ? "bg-violet-500/15 border-violet-400/40 text-violet-700 dark:text-violet-300 font-bold ring-2 ring-violet-400/50"
                      : "bg-muted/30 border-border text-muted-foreground"
                  }`}
                >
                  [{i}] &quot;{f}&quot;
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-1"
            >
              <p className="text-xs font-mono text-muted-foreground">
                includes(&quot;{searchVal}&quot;) =&gt;{" "}
                <span className={found ? "text-emerald-500 font-bold" : "text-red-500 font-bold"}>
                  {String(found)}
                </span>
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                indexOf(&quot;{searchVal}&quot;) =&gt;{" "}
                <span className={foundIdx >= 0 ? "text-violet-500 font-bold" : "text-red-500 font-bold"}>
                  {foundIdx}
                </span>
              </p>
            </motion.div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-8">
            Select a search value above to check existence in the array
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: flat / flatMap ───────────────────────────────────────────────────
function FlatVisual() {
  const [depth, setDepth] = useState<number | null>(null);
  const depths = [1, 2, Infinity];

  const nested = "[1, [2, 3], [4, [5, 6]]]";
  const results: Record<string, string> = {
    "1": "[1, 2, 3, 4, [5, 6]]",
    "2": "[1, 2, 3, 4, 5, 6]",
    Infinity: "[1, 2, 3, 4, 5, 6]",
  };

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground">
        Choose a flattening depth:
      </p>
      <div className="flex gap-2">
        {depths.map((d) => (
          <button
            key={String(d)}
            onClick={() => setDepth(d)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              depth === d
                ? "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300 scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            depth: {String(d) === "Infinity" ? "\u221E" : d}
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[130px]">
        {depth !== null ? (
          <div className="space-y-3">
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">Nested Array</p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-3 py-2 rounded-lg border bg-orange-500/10 border-orange-400/30 text-xs font-mono text-orange-700 dark:text-orange-300"
              >
                {nested}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground text-lg"
            >
              ↓ <span className="text-xs font-mono">.flat({String(depth) === "Infinity" ? "\u221E" : depth})</span>
            </motion.div>

            <div>
              <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">Result</p>
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="px-3 py-2 rounded-lg border bg-orange-500 text-white text-xs font-mono font-bold shadow-md"
              >
                {results[String(depth)]}
              </motion.div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-8">
            Select a depth above to see how flat() unwraps nested arrays
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────
const comparisonData = [
  { method: "find",     returns: "First matching element or undefined", stopsEarly: "Yes", example: "[1,2,3].find(n => n > 1) => 2" },
  { method: "findIndex", returns: "Index of first match or -1",        stopsEarly: "Yes", example: "[1,2,3].findIndex(n => n > 1) => 1" },
  { method: "some",     returns: "boolean (any match?)",               stopsEarly: "Yes", example: "[1,2,3].some(n => n > 2) => true" },
  { method: "every",    returns: "boolean (all match?)",               stopsEarly: "Yes", example: "[1,2,3].every(n => n > 0) => true" },
  { method: "includes", returns: "boolean (value exists?)",            stopsEarly: "Yes", example: '[\"a\",\"b\"].includes(\"b\") => true' },
  { method: "indexOf",  returns: "First index of value or -1",        stopsEarly: "Yes", example: '[\"a\",\"b\"].indexOf(\"b\") => 1' },
  { method: "flat",     returns: "New flattened array",                stopsEarly: "No",  example: "[[1,2],[3]].flat() => [1,2,3]" },
  { method: "flatMap",  returns: "New mapped + flattened array",       stopsEarly: "No",  example: '[\"hi bye\"].flatMap(s => s.split(\" \")) => [\"hi\",\"bye\"]' },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function ArrayIterationVisualization() {
  const [selected, setSelected] = useState<IterTab>("findFindIndex");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: IterTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Array Iteration Methods</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Group selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const t = tabs[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? t.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.label}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${tab.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{tab.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${tab.badgeColor}`}>
                  iteration
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{tab.description}</p>
            </div>

            {/* Two-column: visual | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Visual */}
              <div>
                {selected === "findFindIndex" && <FindVisual />}
                {selected === "someEvery" && <SomeEveryVisual />}
                {selected === "includesIndexOf" && <IncludesVisual />}
                {selected === "flatFlatMap" && <FlatVisual />}
              </div>

              {/* Right: Code + Output */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {tab.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={() => setOutputLines(tab.codeOutput)}>
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

        {/* Comparison Table */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold">Iteration Methods Quick Reference</h3>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Method</th>
                  <th className="px-3 py-2 text-left font-semibold">Returns</th>
                  <th className="px-3 py-2 text-left font-semibold">Stops Early?</th>
                  <th className="px-3 py-2 text-left font-semibold">Example</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr key={row.method} className="border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="px-3 py-2 font-mono font-bold text-violet-700 dark:text-violet-300">
                      .{row.method}()
                    </td>
                    <td className="px-3 py-2">{row.returns}</td>
                    <td className="px-3 py-2">
                      <Badge
                        variant="secondary"
                        className={`text-[10px] ${
                          row.stopsEarly === "Yes"
                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                            : "bg-zinc-500/20 text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {row.stopsEarly}
                      </Badge>
                    </td>
                    <td className="px-3 py-2 font-mono text-muted-foreground">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
