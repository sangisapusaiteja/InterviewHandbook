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

// ─── ZipDiagram ──────────────────────────────────────────────────────────────
function ZipDiagram({
  listA,
  listB,
  labelA,
  labelB,
  result,
}: Readonly<{
  listA: string[];
  listB: string[];
  labelA: string;
  labelB: string;
  result: string[];
}>) {
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      {/* Source lists */}
      <div className="flex gap-8 items-start">
        <div className="text-center">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            {labelA}
          </p>
          <div className="flex gap-1.5">
            {listA.map((item, idx) => (
              <div
                key={`a-${idx}-${item}`}
                className="rounded-lg border bg-blue-500/15 text-blue-700 dark:text-blue-300 px-2.5 py-1.5 text-xs font-mono font-bold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            {labelB}
          </p>
          <div className="flex gap-1.5">
            {listB.map((item, idx) => (
              <div
                key={`b-${idx}-${item}`}
                className="rounded-lg border bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-2.5 py-1.5 text-xs font-mono font-bold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Arrow down */}
      <div className="text-muted-foreground text-lg">↓ zip()</div>

      {/* Paired result */}
      <div className="text-center">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
          Paired Tuples
        </p>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {result.map((pair, idx) => (
            <div
              key={`r-${idx}-${pair}`}
              className="rounded-lg border bg-violet-500/15 text-violet-700 dark:text-violet-300 px-2.5 py-1.5 text-xs font-mono font-bold"
            >
              {pair}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── types ────────────────────────────────────────────────────────────────────
type TopicKey = "basic" | "dicts" | "unequal" | "transpose";

interface TopicInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
  keyPoints: string[];
  diagram: {
    listA: string[];
    listB: string[];
    labelA: string;
    labelB: string;
    result: string[];
  };
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  basic: {
    label: "Basic Pairing",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "zip() takes two or more iterables and pairs their elements positionally into tuples. It returns a zip object (iterator), which you can convert to a list. This is the foundation for parallel iteration over multiple sequences.",
    codeSnippet: `# Basic zip — pair names with ages
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
paired = list(zip(names, ages))
print(f"Paired: {paired}")

# Iterate in parallel
for name, age in zip(names, ages):
    print(f"{name} is {age} years old")

# Zip three lists together
cities = ["NYC", "LA", "CHI"]
result = list(zip(names, ages, cities))
print(f"Triple: {result}")`,
    codeOutput: [
      "Paired: [('Alice', 25), ('Bob', 30), ('Charlie', 35)]",
      "Alice is 25 years old",
      "Bob is 30 years old",
      "Charlie is 35 years old",
      "Triple: [('Alice', 25, 'NYC'), ('Bob', 30, 'LA'), ('Charlie', 35, 'CHI')]",
    ],
    keyPoints: [
      "zip() returns an iterator of tuples",
      "Elements are paired by position (index 0 with 0, 1 with 1, etc.)",
      "Works with any number of iterables",
      "Use list() to materialize the result",
    ],
    diagram: {
      listA: ['"Alice"', '"Bob"', '"Charlie"'],
      listB: ["25", "30", "35"],
      labelA: "names",
      labelB: "ages",
      result: ['("Alice", 25)', '("Bob", 30)', '("Charlie", 35)'],
    },
  },
  dicts: {
    label: "Create Dicts",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "dict(zip(keys, values)) is a clean Python idiom for building dictionaries from two parallel lists. The first list provides the keys and the second provides the values. This is one of the most practical uses of zip().",
    codeSnippet: `# Create a dictionary from two lists
keys = ["name", "age", "city"]
values = ["Alice", 25, "NYC"]
person = dict(zip(keys, values))
print(f"Person: {person}")

# Scores lookup
students = ["Alice", "Bob", "Charlie"]
scores = [92, 85, 78]
gradebook = dict(zip(students, scores))
print(f"Gradebook: {gradebook}")

# Swap keys and values
flipped = dict(zip(gradebook.values(), gradebook.keys()))
print(f"Flipped: {flipped}")

# Combine with enumerate
indexed = dict(zip(range(len(students)), students))
print(f"Indexed: {indexed}")`,
    codeOutput: [
      "Person: {'name': 'Alice', 'age': 25, 'city': 'NYC'}",
      "Gradebook: {'Alice': 92, 'Bob': 85, 'Charlie': 78}",
      "Flipped: {92: 'Alice', 85: 'Bob', 78: 'Charlie'}",
      "Indexed: {0: 'Alice', 1: 'Bob', 2: 'Charlie'}",
    ],
    keyPoints: [
      "dict(zip(keys, values)) is the standard idiom",
      "First iterable becomes keys, second becomes values",
      "Swap keys/values by zipping values with keys",
      "Duplicate keys will keep the last value",
    ],
    diagram: {
      listA: ['"name"', '"age"', '"city"'],
      listB: ['"Alice"', "25", '"NYC"'],
      labelA: "keys",
      labelB: "values",
      result: ['name: "Alice"', "age: 25", 'city: "NYC"'],
    },
  },
  unequal: {
    label: "Unequal & Unzip",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "By default zip() stops at the shortest iterable — extra elements are silently dropped. Use itertools.zip_longest to include all elements with a fill value. You can also unzip paired data back into separate tuples using zip(*pairs).",
    codeSnippet: `# Unequal lengths — stops at shortest
a = [1, 2, 3, 4, 5]
b = ["x", "y", "z"]
print(f"Zip: {list(zip(a, b))}")

# zip_longest fills missing values
from itertools import zip_longest
full = list(zip_longest(a, b, fillvalue="-"))
print(f"Longest: {full}")

# Unzip — separate paired data back out
pairs = [("Alice", 25), ("Bob", 30), ("Charlie", 35)]
names, ages = zip(*pairs)
print(f"Names: {names}")
print(f"Ages:  {ages}")

# zip(*iterable) trick explained
# zip(*pairs) == zip(("Alice",25), ("Bob",30), ("Charlie",35))`,
    codeOutput: [
      "Zip: [(1, 'x'), (2, 'y'), (3, 'z')]",
      "Longest: [(1, 'x'), (2, 'y'), (3, 'z'), (4, '-'), (5, '-')]",
      "Names: ('Alice', 'Bob', 'Charlie')",
      "Ages:  (25, 30, 35)",
    ],
    keyPoints: [
      "zip() silently truncates to the shortest input",
      "zip_longest() pads shorter iterables with a fillvalue",
      "zip(*pairs) unzips — the inverse of zip",
      "Unpacked results are tuples, not lists",
    ],
    diagram: {
      listA: ["1", "2", "3", "4", "5"],
      listB: ['"x"', '"y"', '"z"'],
      labelA: "a (longer)",
      labelB: "b (shorter)",
      result: ['(1, "x")', '(2, "y")', '(3, "z")', "4 dropped", "5 dropped"],
    },
  },
  transpose: {
    label: "Transpose",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "zip(*matrix) transposes a 2D matrix — rows become columns and columns become rows. The * unpacks the outer list so each row is passed as a separate argument to zip. This is a concise alternative to nested loops.",
    codeSnippet: `# Transpose a matrix with zip(*matrix)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
transposed = [list(row) for row in zip(*matrix)]
print(f"Original:   {matrix}")
print(f"Transposed: {transposed}")

# Practical: column-wise operations
data = [[10, 20], [30, 40], [50, 60]]
col1, col2 = [list(c) for c in zip(*data)]
print(f"Column 1: {col1}")
print(f"Column 2: {col2}")

# Sum each column
col_sums = [sum(col) for col in zip(*data)]
print(f"Col sums: {col_sums}")

# Rotate: transpose + reverse rows
rotated = [list(row)[::-1] for row in zip(*matrix)]
print(f"Rotated: {rotated}")`,
    codeOutput: [
      "Original:   [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
      "Transposed: [[1, 4, 7], [2, 5, 8], [3, 6, 9]]",
      "Column 1: [10, 30, 50]",
      "Column 2: [20, 40, 60]",
      "Col sums: [90, 120]",
      "Rotated: [[7, 4, 1], [8, 5, 2], [9, 6, 3]]",
    ],
    keyPoints: [
      "zip(*matrix) unpacks rows as separate zip arguments",
      "Result turns rows into columns (transpose)",
      "Useful for column-wise aggregation (sum, avg, etc.)",
      "Combine with [::-1] for matrix rotation",
    ],
    diagram: {
      listA: ["[1,2,3]", "[4,5,6]", "[7,8,9]"],
      listB: ["[1,4,7]", "[2,5,8]", "[3,6,9]"],
      labelA: "Rows (original)",
      labelB: "Columns (transposed)",
      result: ["[1,4,7]", "[2,5,8]", "[3,6,9]"],
    },
  },
};

const order: TopicKey[] = ["basic", "dicts", "unequal", "transpose"];

const chipColors: Record<TopicKey, string> = {
  basic: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  dicts: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  unequal: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  transpose: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function ZipVisualization() {
  const [selected, setSelected] = useState<TopicKey>("basic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">zip() Function</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Topic selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const chipColor = chipColors[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? chipColor + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {topics[key].label}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${topic.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{topic.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${topic.badgeColor}`}>
                  zip
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Visual diagram */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">How zip() Pairs Elements</p>
              <ZipDiagram
                listA={topic.diagram.listA}
                listB={topic.diagram.listB}
                labelA={topic.diagram.labelA}
                labelB={topic.diagram.labelB}
                result={topic.diagram.result}
              />
            </div>

            {/* Key points */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">Key Points</p>
              <ul className="space-y-1">
                {topic.keyPoints.map((point, idx) => (
                  <li key={`kp-${selected}-${idx}`} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-emerald-500 mt-0.5">&#x2022;</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Code + Output */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                  {topic.codeSnippet}
                </pre>
              </div>
              <Button size="sm" onClick={() => setOutputLines(topic.codeOutput)}>
                <Play className="h-3.5 w-3.5 mr-1" /> Run
              </Button>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
