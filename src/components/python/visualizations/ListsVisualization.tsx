"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, List } from "lucide-react";
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
type TopicKey = "create-access" | "slicing" | "modify-add" | "nested";

interface TopicDemo {
  label: string;
  color: string;
  badgeColor: string;
  badgeText: string;
  description: string;
  code: string;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<TopicKey, TopicDemo> = {
  "create-access": {
    label: "Create & Access",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    badgeText: "Basics",
    description:
      "Lists are created with square brackets. They can hold mixed types and support positive and negative indexing.",
    code: `# Creating lists
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [42, "hello", 3.14, True]

# Accessing elements
print(fruits[0])         # First element
print(fruits[-1])        # Last element
print(mixed[1])          # Second element

# Type and length
print(type(fruits))
print(len(numbers))`,
    output: [
      "apple",
      "cherry",
      "hello",
      "<class 'list'>",
      "5",
    ],
  },
  slicing: {
    label: "Slicing",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    badgeText: "Slicing",
    description:
      "Slicing extracts a portion of a list using list[start:stop:step]. Omitted values default to start=0, stop=len, step=1.",
    code: `nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Basic slicing  [start:stop]
print(nums[2:5])         # Index 2 to 4

# With step  [start:stop:step]
print(nums[0:8:2])       # Every 2nd element

# Omitting values
print(nums[:3])          # First 3 elements
print(nums[7:])          # From index 7 to end

# Reverse with [::-1]
print(nums[::-1])

# Negative indices in slicing
print(nums[-3:])         # Last 3 elements`,
    output: [
      "[2, 3, 4]",
      "[0, 2, 4, 6]",
      "[0, 1, 2]",
      "[7, 8, 9]",
      "[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]",
      "[7, 8, 9]",
    ],
  },
  "modify-add": {
    label: "Modify & Add",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    badgeText: "Mutating",
    description:
      "Lists are mutable -- you can change, add, and remove elements in place using methods like append, insert, remove, and pop.",
    code: `colors = ["red", "green", "blue"]

# Modify an element
colors[1] = "yellow"
print(colors)

# append -- add to end
colors.append("purple")
print(colors)

# insert -- add at index
colors.insert(1, "orange")
print(colors)

# remove -- by value
colors.remove("blue")
print(colors)

# pop -- remove by index (returns it)
popped = colors.pop(0)
print(f"Popped: {popped}")
print(colors)`,
    output: [
      "['red', 'yellow', 'blue']",
      "['red', 'yellow', 'blue', 'purple']",
      "['red', 'orange', 'yellow', 'blue', 'purple']",
      "['red', 'orange', 'yellow', 'purple']",
      "Popped: red",
      "['orange', 'yellow', 'purple']",
    ],
  },
  nested: {
    label: "Nested Lists",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    badgeText: "2D Lists",
    description:
      "Lists can contain other lists, creating 2D (or higher) structures. Access elements with chained indexing: matrix[row][col].",
    code: `# 2D list (matrix)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Access elements with matrix[i][j]
print(matrix[0])         # First row
print(matrix[1][2])      # Row 1, Col 2
print(matrix[2][0])      # Row 2, Col 0

# Iterate over rows
for row in matrix:
    print(row)

# Flatten with list comprehension
flat = [x for row in matrix for x in row]
print(flat)`,
    output: [
      "[1, 2, 3]",
      "6",
      "7",
      "[1, 2, 3]",
      "[4, 5, 6]",
      "[7, 8, 9]",
      "[1, 2, 3, 4, 5, 6, 7, 8, 9]",
    ],
  },
};

const order: TopicKey[] = ["create-access", "slicing", "modify-add", "nested"];

// ─── Main export ──────────────────────────────────────────────────────────────
export function ListsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("create-access");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <List className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Python Lists</CardTitle>
        </div>
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
                {demo.badgeText}
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
      </CardContent>
    </Card>
  );
}
