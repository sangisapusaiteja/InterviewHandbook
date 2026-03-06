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
            <p key={`${line}-${i}`} className="text-emerald-400">
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
type ArrayDemoKey =
  | "creating"
  | "pushpop"
  | "spliceSlice"
  | "twoSum";

interface ArrayDemo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<ArrayDemoKey, ArrayDemo> = {
  creating: {
    label: "Creating Arrays",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Arrays can be created using literal syntax, Array.from(), or Array.of(). Elements are accessed by zero-based index.",
    codeSnippet: `// Literal syntax
const fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]);        // "apple"
console.log(fruits.length);    // 3

// Array.from() - create from iterable
const chars = Array.from("hello");
console.log(chars);            // ["h","e","l","l","o"]

// Array.of() - create from arguments
const nums = Array.of(1, 2, 3);
console.log(nums);             // [1, 2, 3]

// Accessing by index
console.log(fruits[2]);        // "cherry"
console.log(fruits.at(-1));    // "cherry" (last element)`,
    codeOutput: [
      'fruits[0]: "apple"',
      "fruits.length: 3",
      'Array.from("hello"): ["h","e","l","l","o"]',
      "Array.of(1, 2, 3): [1, 2, 3]",
      'fruits[2]: "cherry"',
      'fruits.at(-1): "cherry"',
    ],
  },
  pushpop: {
    label: "push/pop/shift/unshift",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "push/pop work on the end; shift/unshift work on the beginning. All four mutate the original array and return either the new length or the removed element.",
    codeSnippet: `const arr = [2, 3, 4];

// push - add to end (returns new length)
arr.push(5);
console.log(arr);          // [2, 3, 4, 5]

// pop - remove from end (returns removed)
const last = arr.pop();
console.log(last, arr);    // 5, [2, 3, 4]

// unshift - add to beginning
arr.unshift(1);
console.log(arr);          // [1, 2, 3, 4]

// shift - remove from beginning
const first = arr.shift();
console.log(first, arr);   // 1, [2, 3, 4]`,
    codeOutput: [
      "After push(5): [2, 3, 4, 5]",
      "pop() returned: 5 -> arr: [2, 3, 4]",
      "After unshift(1): [1, 2, 3, 4]",
      "shift() returned: 1 -> arr: [2, 3, 4]",
    ],
  },
  spliceSlice: {
    label: "splice & slice",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "splice() MUTATES the array (insert, remove, or replace elements). slice() does NOT mutate -- it returns a shallow copy of a portion.",
    codeSnippet: `const colors = ["red", "green", "blue", "yellow"];

// slice(start, end) - non-mutating
const sliced = colors.slice(1, 3);
console.log(sliced);       // ["green", "blue"]
console.log(colors);       // unchanged!

// splice(start, deleteCount, ...items) - mutating
const removed = colors.splice(1, 2, "pink", "purple");
console.log(removed);      // ["green", "blue"]
console.log(colors);       // ["red", "pink", "purple", "yellow"]

// splice to insert without removing
colors.splice(2, 0, "cyan");
console.log(colors);       // ["red","pink","cyan","purple","yellow"]`,
    codeOutput: [
      'slice(1,3): ["green", "blue"]',
      'colors after slice: ["red","green","blue","yellow"] (unchanged)',
      'splice(1,2,...) removed: ["green", "blue"]',
      'colors after splice: ["red","pink","purple","yellow"]',
      'After insert splice: ["red","pink","cyan","purple","yellow"]',
    ],
  },
  twoSum: {
    label: "Interview: Two Sum",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Classic interview problem: given an array of numbers and a target, return the indices of two numbers that add up to the target. Solved in O(n) using a hash map (object) lookup.",
    codeSnippet: `function twoSum(nums, target) {
  const seen = {}; // value -> index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (complement in seen) {
      return [seen[complement], i];
    }
    seen[nums[i]] = i;
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));  // [0, 1]
console.log(twoSum([3, 2, 4], 6));       // [1, 2]
console.log(twoSum([1, 5, 3, 7], 8));    // [1, 2]`,
    codeOutput: [
      "twoSum([2, 7, 11, 15], 9) -> [0, 1]  // 2 + 7 = 9",
      "twoSum([3, 2, 4], 6) -> [1, 2]  // 2 + 4 = 6",
      "twoSum([1, 5, 3, 7], 8) -> [1, 2]  // 5 + 3 = 8",
      "Time: O(n) | Space: O(n)",
    ],
  },
};

const order: ArrayDemoKey[] = ["creating", "pushpop", "spliceSlice", "twoSum"];

// ─── Cheat-sheet data ─────────────────────────────────────────────────────────
interface CheatRow {
  method: string;
  mutates: boolean;
  returns: string;
  example: string;
}

const cheatSheet: CheatRow[] = [
  { method: "push()", mutates: true, returns: "new length", example: "arr.push(4) // [1,2,3,4]" },
  { method: "pop()", mutates: true, returns: "removed element", example: "arr.pop() // 3" },
  { method: "shift()", mutates: true, returns: "removed element", example: "arr.shift() // 1" },
  { method: "unshift()", mutates: true, returns: "new length", example: "arr.unshift(0) // [0,1,2,3]" },
  { method: "splice()", mutates: true, returns: "removed elements[]", example: "arr.splice(1,1) // [2]" },
  { method: "slice()", mutates: false, returns: "new array", example: "arr.slice(0,2) // [1,2]" },
  { method: "concat()", mutates: false, returns: "new array", example: "[1].concat([2]) // [1,2]" },
  { method: "indexOf()", mutates: false, returns: "index or -1", example: "arr.indexOf(2) // 1" },
  { method: "includes()", mutates: false, returns: "boolean", example: "arr.includes(2) // true" },
  { method: "reverse()", mutates: true, returns: "reversed array", example: "arr.reverse() // [3,2,1]" },
  { method: "sort()", mutates: true, returns: "sorted array", example: "arr.sort((a,b)=>a-b)" },
  { method: "flat()", mutates: false, returns: "new array", example: "[1,[2]].flat() // [1,2]" },
  { method: "Array.from()", mutates: false, returns: "new array", example: "Array.from('hi') // ['h','i']" },
  { method: "Array.of()", mutates: false, returns: "new array", example: "Array.of(1,2) // [1,2]" },
  { method: "at()", mutates: false, returns: "element", example: "arr.at(-1) // last item" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function JavaScriptArraysVisualization() {
  const [selected, setSelected] = useState<ArrayDemoKey>("creating");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: ArrayDemoKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">JavaScript Arrays</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ── Section 1: Topic selector chips ──────────────────────────────── */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Select a Topic
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
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-lg font-bold">{demo.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                  {selected === "twoSum" ? "Interview" : "Core"}
                </Badge>
              </div>
              <p className="text-sm leading-relaxed">{demo.description}</p>
            </motion.div>
          </AnimatePresence>

          {/* Visual: push/pop/shift/unshift boxes */}
          {selected === "pushpop" && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-1 flex-wrap py-2"
              >
                <div className="flex flex-col items-center gap-1 mr-2">
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    unshift
                  </span>
                  <span className="text-emerald-500">&rarr;</span>
                </div>
                {[1, 2, 3, 4].map((n, i) => (
                  <motion.div
                    key={n}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-12 h-12 rounded-lg border-2 border-emerald-400 bg-emerald-500/10 flex items-center justify-center font-mono font-bold text-emerald-700 dark:text-emerald-300"
                  >
                    {n}
                  </motion.div>
                ))}
                <div className="flex flex-col items-center gap-1 ml-2">
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    push
                  </span>
                  <span className="text-emerald-500">&rarr;</span>
                </div>
                <div className="ml-6 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-mono text-red-500 font-bold">shift &larr;</span>
                  <span className="text-[10px] font-mono text-red-500 font-bold">pop &rarr;</span>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Visual: splice vs slice comparison */}
          {selected === "spliceSlice" && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                <div className="rounded-lg border-2 border-red-400/50 bg-red-500/5 p-3 space-y-1">
                  <p className="text-xs font-bold text-red-600 dark:text-red-400">
                    splice() - Mutates
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Changes the original array in place
                  </p>
                </div>
                <div className="rounded-lg border-2 border-green-400/50 bg-green-500/5 p-3 space-y-1">
                  <p className="text-xs font-bold text-green-600 dark:text-green-400">
                    slice() - Safe
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Returns a new array, original untouched
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

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

        {/* ── Section 2: Array Method Cheat Sheet ──────────────────────────── */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Array Method Cheat Sheet
          </p>

          <div className="rounded-xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="text-left px-4 py-2.5 font-semibold text-muted-foreground">Method</th>
                    <th className="text-center px-4 py-2.5 font-semibold text-muted-foreground">Mutates?</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-muted-foreground">Returns</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-muted-foreground">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {cheatSheet.map((row) => (
                    <tr key={row.method} className="border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2 font-mono font-semibold">{row.method}</td>
                      <td className="px-4 py-2 text-center">
                        <Badge
                          variant="secondary"
                          className={`text-[10px] ${
                            row.mutates
                              ? "bg-red-500/20 text-red-700 dark:text-red-300"
                              : "bg-green-500/20 text-green-700 dark:text-green-300"
                          }`}
                        >
                          {row.mutates ? "Yes" : "No"}
                        </Badge>
                      </td>
                      <td className="px-4 py-2 text-muted-foreground">{row.returns}</td>
                      <td className="px-4 py-2 font-mono text-muted-foreground">{row.example}</td>
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
