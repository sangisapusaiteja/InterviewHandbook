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
          {lines.map((line, idx) => (
            <p key={`${idx}-${line}`} className="text-emerald-400">
              <span className="text-zinc-500 select-none mr-2">&gt;&gt;&gt;</span>
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
type TupleKey = "create-access" | "unpacking" | "immutability" | "tuple-vs-list";

interface TupleDemo {
  label: string;
  color: string;
  badgeColor: string;
  badgeLabel: string;
  description: string;
  code: string;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<TupleKey, TupleDemo> = {
  "create-access": {
    label: "Create & Access",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    badgeLabel: "Basics",
    description:
      "Tuples are created with parentheses (). A single-element tuple requires a trailing comma. They support indexing and slicing just like lists.",
    code: `# Creating tuples
colors = ("red", "green", "blue")
print(type(colors))        # <class 'tuple'>
print(len(colors))         # 3

# Single element tuple (trailing comma required!)
single = (42,)
not_a_tuple = (42)
print(type(single))        # <class 'tuple'>
print(type(not_a_tuple))   # <class 'int'>

# Indexing
print(colors[0])           # red
print(colors[-1])          # blue

# Slicing
print(colors[0:2])         # ('red', 'green')
print(colors[::-1])        # ('blue', 'green', 'red')`,
    output: [
      "<class 'tuple'>",
      "3",
      "<class 'tuple'>",
      "<class 'int'>",
      "red",
      "blue",
      "('red', 'green')",
      "('blue', 'green', 'red')",
    ],
  },
  unpacking: {
    label: "Unpacking",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    badgeLabel: "Destructuring",
    description:
      "Tuple unpacking lets you assign each element to a variable in one line. Extended unpacking with * captures remaining elements into a list.",
    code: `# Basic unpacking
point = (10, 20)
x, y = point
print(f"x={x}, y={y}")         # x=10, y=20

# Swap variables (tuple trick!)
a, b = 1, 2
a, b = b, a
print(f"a={a}, b={b}")         # a=2, b=1

# Extended unpacking with *
numbers = (1, 2, 3, 4, 5)
first, *rest = numbers
print(f"first={first}")        # first=1
print(f"rest={rest}")          # rest=[2, 3, 4, 5]

head, *middle, tail = numbers
print(f"head={head}")          # head=1
print(f"middle={middle}")      # middle=[2, 3, 4]
print(f"tail={tail}")          # tail=5`,
    output: [
      "x=10, y=20",
      "a=2, b=1",
      "first=1",
      "rest=[2, 3, 4, 5]",
      "head=1",
      "middle=[2, 3, 4]",
      "tail=5",
    ],
  },
  immutability: {
    label: "Immutability",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    badgeLabel: "Immutable",
    description:
      "Tuples cannot be modified after creation -- no append, remove, or item assignment. However, if a tuple contains a mutable object (like a list), that inner object can still be changed.",
    code: `# Tuples are immutable
t = (1, 2, 3)
try:
    t[0] = 99
except TypeError as e:
    print(e)
# 'tuple' object does not support item assignment

# Cannot append or remove
try:
    t.append(4)
except AttributeError as e:
    print(e)
# 'tuple' object has no attribute 'append'

# But mutable elements INSIDE can change!
mixed = ([1, 2], "hello")
mixed[0].append(3)
print(mixed)               # ([1, 2, 3], 'hello')

# Concatenation creates a NEW tuple
t2 = t + (4, 5)
print(t2)                  # (1, 2, 3, 4, 5)
print(t)                   # (1, 2, 3)  -- original unchanged`,
    output: [
      "'tuple' object does not support item assignment",
      "'tuple' object has no attribute 'append'",
      "([1, 2, 3], 'hello')",
      "(1, 2, 3, 4, 5)",
      "(1, 2, 3)",
    ],
  },
  "tuple-vs-list": {
    label: "Tuple vs List",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    badgeLabel: "Comparison",
    description:
      "Tuples and lists are both sequences, but they differ in mutability, memory usage, hashability, and typical use cases. Tuples are lighter and safer for fixed data.",
    code: `import sys

# Memory comparison
lst = [1, 2, 3, 4, 5]
tpl = (1, 2, 3, 4, 5)
print(f"List size: {sys.getsizeof(lst)} bytes")
print(f"Tuple size: {sys.getsizeof(tpl)} bytes")

# Hashability
print(hash(tpl))           # Works! (hashable)
try:
    hash(lst)
except TypeError as e:
    print(e)               # unhashable type: 'list'

# Tuples as dictionary keys
locations = {(0, 0): "origin", (1, 2): "point A"}
print(locations[(0, 0)])   # origin

# Use cases summary
print("Tuple: fixed data, dict keys, function returns")
print("List: dynamic collections, sorting, filtering")`,
    output: [
      "List size: 120 bytes",
      "Tuple size: 80 bytes",
      "8315274433719620810",
      "unhashable type: 'list'",
      "origin",
      "Tuple: fixed data, dict keys, function returns",
      "List: dynamic collections, sorting, filtering",
    ],
  },
};

const order: TupleKey[] = ["create-access", "unpacking", "immutability", "tuple-vs-list"];

// ─── Comparison table data ────────────────────────────────────────────────────
interface ComparisonRow {
  feature: string;
  tuple: string;
  list: string;
  tupleHighlight: boolean;
}

const comparisonTable: ComparisonRow[] = [
  { feature: "Mutability", tuple: "Immutable", list: "Mutable", tupleHighlight: true },
  { feature: "Memory", tuple: "Less (lighter)", list: "More (overhead)", tupleHighlight: true },
  { feature: "Hashable", tuple: "Yes (if contents are)", list: "No", tupleHighlight: true },
  { feature: "Dict Key", tuple: "Yes", list: "No", tupleHighlight: true },
  { feature: "Speed", tuple: "Slightly faster", list: "Slightly slower", tupleHighlight: true },
  { feature: "Use Case", tuple: "Fixed records, returns", list: "Dynamic collections", tupleHighlight: false },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function TuplesVisualization() {
  const [selected, setSelected] = useState<TupleKey>("create-access");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: TupleKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Tuples</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Topic selector chips */}
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
              <span className="text-lg font-bold">{demo.label}</span>
              <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                {demo.badgeLabel}
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

        {/* Comparison table (shown for tuple-vs-list) */}
        <AnimatePresence>
          {selected === "tuple-vs-list" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Tuple vs List Comparison
              </p>
              <div className="rounded-xl border overflow-hidden text-xs">
                <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                  <span>Feature</span>
                  <span className="text-center">Tuple</span>
                  <span className="text-center">List</span>
                </div>
                {comparisonTable.map((row) => (
                  <div
                    key={row.feature}
                    className="grid grid-cols-3 px-3 py-2.5 border-t hover:bg-muted/40 transition-colors"
                  >
                    <span className="font-medium">{row.feature}</span>
                    <span className="text-center">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          row.tupleHighlight
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                            : "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                        }`}
                      >
                        {row.tuple}
                      </span>
                    </span>
                    <span className="text-center">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          row.tupleHighlight
                            ? "bg-orange-500/15 text-orange-600 dark:text-orange-400"
                            : "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                        }`}
                      >
                        {row.list}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground mt-2 italic">
                Tuples use ~40% less memory than lists for the same data. Use tuples for fixed, read-only data.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
