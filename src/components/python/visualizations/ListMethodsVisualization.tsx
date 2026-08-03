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
type TopicKey = "append_extend" | "insert_remove" | "sort_reverse" | "sort_vs_sorted";

interface TopicInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  append_extend: {
    label: "append & extend",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "append() adds a single item to the end of the list. extend() iterates over its argument and adds each element individually. If you pass a list to append(), the entire list becomes one nested element.",
    codeSnippet: `fruits = ["apple", "banana"]

# append adds ONE item
fruits.append("cherry")
print(f"After append: {fruits}")

# append with a list → nested!
fruits.append(["date", "elderberry"])
print(f"After append list: {fruits}")

# Start fresh for extend
colors = ["red", "green"]

# extend adds EACH item from the iterable
colors.extend(["blue", "yellow"])
print(f"After extend: {colors}")

# extend works with any iterable
colors.extend("AB")
print(f"After extend string: {colors}")`,
    codeOutput: [
      'After append: ["apple", "banana", "cherry"]',
      'After append list: ["apple", "banana", "cherry", ["date", "elderberry"]]',
      'After extend: ["red", "green", "blue", "yellow"]',
      'After extend string: ["red", "green", "blue", "yellow", "A", "B"]',
    ],
  },
  insert_remove: {
    label: "insert & remove",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "insert(i, x) places item x at index i, shifting existing elements right. remove(x) deletes the first occurrence of value x. pop(i) removes and returns the item at index i (defaults to last item).",
    codeSnippet: `nums = [10, 20, 30, 40]

# insert at index 1
nums.insert(1, 15)
print(f"After insert(1, 15): {nums}")

# insert at the beginning
nums.insert(0, 5)
print(f"After insert(0, 5): {nums}")

# remove by value (first occurrence)
nums.remove(30)
print(f"After remove(30): {nums}")

# pop by index (returns the removed item)
popped = nums.pop(2)
print(f"Popped index 2: {popped}")
print(f"After pop(2): {nums}")

# pop last item (default)
last = nums.pop()
print(f"Popped last: {last}")
print(f"Final list: {nums}")`,
    codeOutput: [
      "After insert(1, 15): [10, 15, 20, 30, 40]",
      "After insert(0, 5): [5, 10, 15, 20, 30, 40]",
      "After remove(30): [5, 10, 15, 20, 40]",
      "Popped index 2: 15",
      "After pop(2): [5, 10, 20, 40]",
      "Popped last: 40",
      "Final list: [5, 10, 20]",
    ],
  },
  sort_reverse: {
    label: "sort & reverse",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "sort() sorts the list in-place (modifies the original). You can pass key= for custom sorting and reverse=True for descending order. reverse() reverses the list in-place.",
    codeSnippet: `numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# sort ascending (in-place)
numbers.sort()
print(f"Sorted asc: {numbers}")

# sort descending (in-place)
numbers.sort(reverse=True)
print(f"Sorted desc: {numbers}")

# sort with key function
words = ["banana", "pie", "Washington", "a"]
words.sort(key=len)
print(f"Sorted by length: {words}")

# reverse the list in-place
items = [1, 2, 3, 4, 5]
items.reverse()
print(f"Reversed: {items}")

# both return None (in-place)
result = items.sort()
print(f"sort() returns: {result}")`,
    codeOutput: [
      "Sorted asc: [1, 1, 2, 3, 4, 5, 6, 9]",
      "Sorted desc: [9, 6, 5, 4, 3, 2, 1, 1]",
      'Sorted by length: ["a", "pie", "banana", "Washington"]',
      "Reversed: [5, 4, 3, 2, 1]",
      "sort() returns: None",
    ],
  },
  sort_vs_sorted: {
    label: "sort() vs sorted()",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "The key difference: list.sort() mutates the original list and returns None. sorted() creates and returns a new sorted list, leaving the original unchanged. sorted() also works on any iterable, not just lists.",
    codeSnippet: `original = [5, 2, 8, 1, 9]

# sorted() returns a NEW list
new_list = sorted(original)
print(f"sorted() result: {new_list}")
print(f"Original after sorted(): {original}")

# .sort() mutates IN-PLACE, returns None
result = original.sort()
print(f".sort() returns: {result}")
print(f"Original after .sort(): {original}")

# sorted() works on any iterable
text = "python"
print(f"sorted(string): {sorted(text)}")
print(f"sorted(tuple):  {sorted((3,1,2))}")

# sorted() with key and reverse
names = ["Charlie", "alice", "Bob"]
print(f"Case-insensitive: {sorted(names, key=str.lower)}")`,
    codeOutput: [
      "sorted() result: [1, 2, 5, 8, 9]",
      "Original after sorted(): [5, 2, 8, 1, 9]",
      ".sort() returns: None",
      "Original after .sort(): [1, 2, 5, 8, 9]",
      'sorted(string): ["h", "n", "o", "p", "t", "y"]',
      "sorted(tuple):  [1, 2, 3]",
      'Case-insensitive: ["alice", "Bob", "Charlie"]',
    ],
  },
};

const order: TopicKey[] = ["append_extend", "insert_remove", "sort_reverse", "sort_vs_sorted"];

const chipColors: Record<TopicKey, string> = {
  append_extend: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  insert_remove: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  sort_reverse: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  sort_vs_sorted: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Methods Reference Table ──────────────────────────────────────────────────
const methodsRef = [
  { method: "append(x)", description: "Add item x to the end", returns: "None" },
  { method: "extend(iter)", description: "Add all items from iterable", returns: "None" },
  { method: "insert(i, x)", description: "Insert x at index i", returns: "None" },
  { method: "remove(x)", description: "Remove first occurrence of x", returns: "None" },
  { method: "pop([i])", description: "Remove & return item at index i", returns: "item" },
  { method: "sort()", description: "Sort list in-place", returns: "None" },
  { method: "reverse()", description: "Reverse list in-place", returns: "None" },
  { method: "index(x)", description: "Index of first occurrence of x", returns: "int" },
  { method: "count(x)", description: "Count occurrences of x", returns: "int" },
  { method: "copy()", description: "Shallow copy of the list", returns: "list" },
  { method: "clear()", description: "Remove all items", returns: "None" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function ListMethodsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("append_extend");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  const handleRun = () => {
    setOutputLines(topic.codeOutput);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <List className="h-5 w-5 text-blue-500" />
          List Methods
        </CardTitle>
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
                  list method
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Code + Output */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                  {topic.codeSnippet}
                </pre>
              </div>
              <Button size="sm" onClick={handleRun}>
                <Play className="h-3.5 w-3.5 mr-1" /> Run
              </Button>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Methods Reference Table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Methods Reference</p>
          <div className="rounded-xl border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/40 border-b">
                  <th className="text-left px-3 py-2 font-semibold">Method</th>
                  <th className="text-left px-3 py-2 font-semibold">Description</th>
                  <th className="text-left px-3 py-2 font-semibold">Returns</th>
                </tr>
              </thead>
              <tbody>
                {methodsRef.map((row) => (
                  <tr key={row.method} className="border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="px-3 py-1.5 font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      {row.method}
                    </td>
                    <td className="px-3 py-1.5 text-muted-foreground">{row.description}</td>
                    <td className="px-3 py-1.5">
                      <Badge variant="secondary" className="text-[10px]">
                        {row.returns}
                      </Badge>
                    </td>
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
