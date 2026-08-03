"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Table } from "lucide-react";
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
type DataTypeKey =
  | "numeric"
  | "string"
  | "boolean"
  | "list"
  | "tuple"
  | "dictionary"
  | "set";

interface TypeDemo {
  label: string;
  category: string;
  color: string;
  badgeColor: string;
  typeLabel: string;
  mutable: boolean;
  ordered: boolean;
  example: string;
  description: string;
  note: string;
  exampleValue: string;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<DataTypeKey, TypeDemo> = {
  numeric: {
    label: "Numeric (int, float, complex)",
    category: "Numeric",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    typeLabel: "int / float / complex",
    mutable: false,
    ordered: false,
    example: `x = 42
y = 3.14
z = 2 + 3j

print(type(x))       # <class 'int'>
print(type(y))       # <class 'float'>
print(type(z))       # <class 'complex'>

print(x + y)         # 45.14
print(z.real)        # 2.0
print(z.imag)        # 3.0
print(isinstance(x, int))  # True`,
    exampleValue: "42, 3.14, 2+3j",
    description:
      "Python has three numeric types: int (unlimited precision integers), float (double-precision floating point), and complex (real + imaginary parts).",
    note: "Integers in Python have arbitrary precision -- no overflow!",
    output: [
      "<class 'int'>",
      "<class 'float'>",
      "<class 'complex'>",
      "45.14",
      "2.0",
      "3.0",
      "True",
    ],
  },
  string: {
    label: "String",
    category: "Sequence",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    typeLabel: "str",
    mutable: false,
    ordered: true,
    example: `name = "Python"
greeting = f"Hello, {name}!"

print(type(name))        # <class 'str'>
print(greeting)          # Hello, Python!
print(len(name))         # 6
print(name[0])           # P
print(name.upper())      # PYTHON
print(name[::-1])        # nohtyP
print("th" in name)      # True`,
    exampleValue: '"Python"',
    description:
      "Strings are immutable sequences of Unicode characters. They support slicing, formatting (f-strings), and a rich set of built-in methods.",
    note: "Strings are immutable -- operations like upper() return a new string.",
    output: [
      "<class 'str'>",
      "Hello, Python!",
      "6",
      "P",
      "PYTHON",
      "nohtyP",
      "True",
    ],
  },
  boolean: {
    label: "Boolean",
    category: "Numeric",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    typeLabel: "bool",
    mutable: false,
    ordered: false,
    example: `is_active = True
is_empty = False

print(type(is_active))       # <class 'bool'>
print(isinstance(True, int)) # True (bool is subclass of int)
print(True + True)           # 2
print(True * 10)             # 10

# Falsy values in Python:
print(bool(0))     # False
print(bool(""))    # False
print(bool([]))    # False
print(bool(None))  # False`,
    exampleValue: "True / False",
    description:
      "Boolean represents True or False. In Python, bool is a subclass of int, so True == 1 and False == 0. Many values have a truthy/falsy interpretation.",
    note: "Falsy values: 0, 0.0, '', [], {}, set(), None, False.",
    output: [
      "<class 'bool'>",
      "True",
      "2",
      "10",
      "False",
      "False",
      "False",
      "False",
    ],
  },
  list: {
    label: "List",
    category: "Sequence",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    typeLabel: "list",
    mutable: true,
    ordered: true,
    example: `fruits = ["apple", "banana", "cherry"]

print(type(fruits))      # <class 'list'>
print(len(fruits))       # 3
print(fruits[0])         # apple
print(fruits[-1])        # cherry

fruits.append("date")
print(fruits)            # ['apple', 'banana', 'cherry', 'date']

fruits.remove("banana")
print(fruits)            # ['apple', 'cherry', 'date']

# List comprehension
squares = [x**2 for x in range(5)]
print(squares)           # [0, 1, 4, 9, 16]`,
    exampleValue: '["apple", "banana"]',
    description:
      "Lists are ordered, mutable sequences that can hold mixed types. They support indexing, slicing, and powerful list comprehensions.",
    note: "Lists are mutable -- append, remove, sort all modify in-place.",
    output: [
      "<class 'list'>",
      "3",
      "apple",
      "cherry",
      "['apple', 'banana', 'cherry', 'date']",
      "['apple', 'cherry', 'date']",
      "[0, 1, 4, 9, 16]",
    ],
  },
  tuple: {
    label: "Tuple",
    category: "Sequence",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    typeLabel: "tuple",
    mutable: false,
    ordered: true,
    example: `point = (3, 4, 5)

print(type(point))       # <class 'tuple'>
print(len(point))        # 3
print(point[0])          # 3
print(point[-1])         # 5

# Tuple unpacking
x, y, z = point
print(f"x={x}, y={y}, z={z}")  # x=3, y=4, z=5

# Single element tuple needs trailing comma
single = (42,)
print(type(single))      # <class 'tuple'>

# Tuples as dict keys (hashable)
locations = {(0, 0): "origin"}
print(locations[(0, 0)]) # origin`,
    exampleValue: "(3, 4, 5)",
    description:
      "Tuples are ordered, immutable sequences. They are hashable (when contents are hashable) and can be used as dictionary keys or set elements.",
    note: "Use tuples for fixed collections -- they are faster and safer than lists.",
    output: [
      "<class 'tuple'>",
      "3",
      "3",
      "5",
      "x=3, y=4, z=5",
      "<class 'tuple'>",
      "origin",
    ],
  },
  dictionary: {
    label: "Dictionary",
    category: "Mapping",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    typeLabel: "dict",
    mutable: true,
    ordered: true,
    example: `user = {"name": "Alice", "age": 30, "active": True}

print(type(user))          # <class 'dict'>
print(user["name"])        # Alice
print(user.get("email", "N/A"))  # N/A

user["email"] = "alice@example.com"
print(len(user))           # 4

print(list(user.keys()))   # ['name', 'age', 'active', 'email']
print(list(user.values())) # ['Alice', 30, True, 'alice@example.com']

# Dict comprehension
sq = {x: x**2 for x in range(4)}
print(sq)                  # {0: 0, 1: 1, 2: 4, 3: 9}`,
    exampleValue: '{"name": "Alice"}',
    description:
      "Dictionaries are mutable key-value mappings. Since Python 3.7+, they preserve insertion order. Keys must be hashable.",
    note: "Dicts are O(1) average for get/set/delete -- backed by hash tables.",
    output: [
      "<class 'dict'>",
      "Alice",
      "N/A",
      "4",
      "['name', 'age', 'active', 'email']",
      "['Alice', 30, True, 'alice@example.com']",
      "{0: 0, 1: 1, 2: 4, 3: 9}",
    ],
  },
  set: {
    label: "Set",
    category: "Set",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    typeLabel: "set",
    mutable: true,
    ordered: false,
    example: `colors = {"red", "green", "blue"}

print(type(colors))        # <class 'set'>
print(len(colors))         # 3
print("red" in colors)     # True

colors.add("yellow")
colors.discard("green")
print(colors)              # {'red', 'blue', 'yellow'}

a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a | b)   # Union: {1, 2, 3, 4, 5, 6}
print(a & b)   # Intersection: {3, 4}
print(a - b)   # Difference: {1, 2}`,
    exampleValue: '{"red", "green", "blue"}',
    description:
      "Sets are unordered collections of unique, hashable elements. They support powerful mathematical set operations like union, intersection, and difference.",
    note: "Sets are great for membership testing -- O(1) average lookup.",
    output: [
      "<class 'set'>",
      "3",
      "True",
      "{'red', 'blue', 'yellow'}",
      "{1, 2, 3, 4, 5, 6}",
      "{3, 4}",
      "{1, 2}",
    ],
  },
};

const order: DataTypeKey[] = [
  "numeric",
  "string",
  "boolean",
  "list",
  "tuple",
  "dictionary",
  "set",
];

// ─── Table data ───────────────────────────────────────────────────────────────
interface TableRow {
  key: DataTypeKey;
  type: string;
  example: string;
  mutable: boolean;
  ordered: boolean | string;
  duplicates: boolean | string;
}

const tableData: TableRow[] = [
  { key: "numeric", type: "int / float / complex", example: "42, 3.14, 2+3j", mutable: false, ordered: false, duplicates: false },
  { key: "string", type: "str", example: '"hello"', mutable: false, ordered: true, duplicates: true },
  { key: "boolean", type: "bool", example: "True / False", mutable: false, ordered: false, duplicates: false },
  { key: "list", type: "list", example: "[1, 2, 3]", mutable: true, ordered: true, duplicates: true },
  { key: "tuple", type: "tuple", example: "(1, 2, 3)", mutable: false, ordered: true, duplicates: true },
  { key: "dictionary", type: "dict", example: '{"a": 1}', mutable: true, ordered: true, duplicates: false },
  { key: "set", type: "set", example: "{1, 2, 3}", mutable: true, ordered: false, duplicates: false },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function DataTypesVisualization() {
  const [selected, setSelected] = useState<DataTypeKey>("numeric");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [showTable, setShowTable] = useState(false);

  const demo = demos[selected];

  const handleSelect = (key: DataTypeKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Data Types</CardTitle>
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
                type() &rarr; {demo.typeLabel}
              </code>
            </div>
            <p className="text-sm leading-relaxed">{demo.description}</p>
            <p className="text-xs opacity-80 italic">{demo.note}</p>
            <div className="flex gap-2 pt-1">
              <Badge
                variant="outline"
                className={
                  demo.mutable
                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40 text-[10px]"
                    : "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/40 text-[10px]"
                }
              >
                {demo.mutable ? "Mutable" : "Immutable"}
              </Badge>
              {demo.ordered && (
                <Badge
                  variant="outline"
                  className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 text-[10px]"
                >
                  Ordered
                </Badge>
              )}
            </div>
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

        {/* Comparison Table Toggle */}
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTable((prev) => !prev)}
          >
            <Table className="h-3.5 w-3.5 mr-1" />
            {showTable ? "Hide" : "Show"} Comparison Table
          </Button>

          <AnimatePresence>
            {showTable && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="rounded-xl border overflow-hidden text-xs">
                  <div className="grid grid-cols-6 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                    <span>Type</span>
                    <span>Example</span>
                    <span className="text-center">Mutable</span>
                    <span className="text-center">Ordered</span>
                    <span className="text-center">Duplicates</span>
                    <span className="text-center">Category</span>
                  </div>
                  {tableData.map((row) => {
                    const isSelected = selected === row.key;
                    return (
                      <motion.div
                        key={row.key}
                        onClick={() => handleSelect(row.key)}
                        animate={{
                          backgroundColor: isSelected
                            ? "hsl(var(--primary) / 0.08)"
                            : "transparent",
                        }}
                        transition={{ duration: 0.15 }}
                        className={`grid grid-cols-6 px-3 py-2.5 border-t cursor-pointer hover:bg-muted/40 transition-colors ${
                          isSelected ? "font-semibold" : ""
                        }`}
                      >
                        <span
                          className={`font-mono ${
                            isSelected ? "text-primary" : ""
                          }`}
                        >
                          {row.type}
                          {isSelected && (
                            <span className="ml-1 text-[9px] text-primary">
                              ◀
                            </span>
                          )}
                        </span>
                        <code className="font-mono text-[11px] text-muted-foreground">
                          {row.example}
                        </code>
                        <span className="text-center">
                          {row.mutable ? (
                            <span className="inline-block px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                              Yes
                            </span>
                          ) : (
                            <span className="inline-block px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-600 dark:text-sky-400 text-[10px] font-bold">
                              No
                            </span>
                          )}
                        </span>
                        <span className="text-center">
                          {row.ordered === true ? (
                            <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                              Yes
                            </span>
                          ) : (
                            <span className="inline-block px-1.5 py-0.5 rounded bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 text-[10px] font-bold">
                              No
                            </span>
                          )}
                        </span>
                        <span className="text-center">
                          {row.duplicates === true ? (
                            <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                              Yes
                            </span>
                          ) : (
                            <span className="inline-block px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 text-[10px] font-bold">
                              No
                            </span>
                          )}
                        </span>
                        <span className="text-center text-muted-foreground">
                          {demos[row.key].category}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
                <p className="text-[11px] text-muted-foreground mt-2">
                  Dicts preserve insertion order since Python 3.7+. Sets and numeric/bool types have no meaningful order.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
