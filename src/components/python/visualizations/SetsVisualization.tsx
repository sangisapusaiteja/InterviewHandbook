"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Layers, Zap, GitMerge, Lightbulb } from "lucide-react";
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
type SetTopicKey =
  | "create"
  | "membership"
  | "operations"
  | "when";

interface SetDemo {
  label: string;
  icon: React.ReactNode;
  color: string;
  badgeColor: string;
  description: string;
  note: string;
  example: string;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<SetTopicKey, SetDemo> = {
  create: {
    label: "Create & Deduplicate",
    icon: <Layers className="h-3.5 w-3.5" />,
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Sets are unordered collections of unique elements. Creating a set from a list automatically removes duplicates. Use curly braces or the set() constructor.",
    note: "Use set() to create an empty set -- {} creates an empty dict, not a set!",
    example: `# Creating sets
colors = {"red", "green", "blue"}
print(type(colors))          # <class 'set'>
print(colors)                # {'red', 'green', 'blue'}

# Duplicate removal
nums = [1, 2, 2, 3, 3, 3, 4]
unique = set(nums)
print(unique)                # {1, 2, 3, 4}
print(len(unique))           # 4

# From a string (unique characters)
chars = set("hello")
print(chars)                 # {'h', 'e', 'l', 'o'}

# Empty set (NOT {})
empty = set()
print(type(empty))           # <class 'set'>
print(len(empty))            # 0`,
    output: [
      "<class 'set'>",
      "{'red', 'green', 'blue'}",
      "{1, 2, 3, 4}",
      "4",
      "{'h', 'e', 'l', 'o'}",
      "<class 'set'>",
      "0",
    ],
  },
  membership: {
    label: "Membership Test",
    icon: <Zap className="h-3.5 w-3.5" />,
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "The 'in' operator on sets runs in O(1) average time thanks to hash tables, compared to O(n) for lists. This makes sets ideal for fast lookups.",
    note: "For large collections, 'in' on a set can be thousands of times faster than on a list.",
    example: `# O(1) membership test with sets
valid_users = {"alice", "bob", "charlie"}
print("alice" in valid_users)    # True
print("dave" in valid_users)     # False
print("dave" not in valid_users) # True

# Compare with list (conceptually)
user_list = ["alice", "bob", "charlie"]
# list uses O(n) scan:
print("alice" in user_list)      # True (but slower)

# Practical: fast lookup for large data
big_set = set(range(1_000_000))
print(999_999 in big_set)        # True  (instant)
print(2_000_000 in big_set)      # False (instant)

# Sets vs Lists lookup complexity
# set:  O(1) average -- hash table
# list: O(n) -- linear scan`,
    output: [
      "True",
      "False",
      "True",
      "True",
      "True",
      "False",
      "# set:  O(1) -- hash-based",
      "# list: O(n) -- linear scan",
    ],
  },
  operations: {
    label: "Set Operations",
    icon: <GitMerge className="h-3.5 w-3.5" />,
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Python sets support mathematical set operations: union (|), intersection (&), difference (-), and symmetric difference (^). Each has both operator and method forms.",
    note: "Methods like .union() accept any iterable, while operators (|, &) require both operands to be sets.",
    example: `a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}

# Union: all elements from both
print(a | b)         # {1, 2, 3, 4, 5, 6, 7, 8}

# Intersection: common elements
print(a & b)         # {4, 5}

# Difference: in a but not b
print(a - b)         # {1, 2, 3}

# Symmetric difference: in either, not both
print(a ^ b)         # {1, 2, 3, 6, 7, 8}

# Subset and superset checks
small = {1, 2}
print(small <= a)    # True (subset)
print(a >= small)    # True (superset)

# Disjoint check (no common elements)
c = {10, 11}
print(a.isdisjoint(c))  # True`,
    output: [
      "{1, 2, 3, 4, 5, 6, 7, 8}",
      "{4, 5}",
      "{1, 2, 3}",
      "{1, 2, 3, 6, 7, 8}",
      "True",
      "True",
      "True",
    ],
  },
  when: {
    label: "When to Use Sets",
    icon: <Lightbulb className="h-3.5 w-3.5" />,
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Sets shine when you need unique values, fast membership checks, or need to compare collections. They are essential for deduplication, filtering, and mathematical set logic.",
    note: "Set elements must be hashable -- no lists or dicts inside sets. Use frozenset for immutable sets.",
    example: `# 1. Get unique values from data
orders = ["pizza", "burger", "pizza", "sushi", "burger"]
unique_orders = set(orders)
print(unique_orders)          # {'pizza', 'burger', 'sushi'}

# 2. Fast lookup / filtering
banned = {"spam", "scam", "fraud"}
messages = ["hello", "spam", "how are you", "scam"]
clean = [m for m in messages if m not in banned]
print(clean)                  # ['hello', 'how are you']

# 3. Compare collections
team_a = {"alice", "bob", "charlie"}
team_b = {"bob", "charlie", "dave"}
# Who is on both teams?
print(team_a & team_b)       # {'bob', 'charlie'}
# Who is only on team A?
print(team_a - team_b)       # {'alice'}
# All unique members?
print(team_a | team_b)       # {'alice', 'bob', 'charlie', 'dave'}

# 4. Remove duplicates preserving order (trick)
items = [3, 1, 2, 1, 3, 2, 4]
seen = set()
unique = []
for x in items:
    if x not in seen:
        seen.add(x)
        unique.append(x)
print(unique)                 # [3, 1, 2, 4]`,
    output: [
      "{'pizza', 'burger', 'sushi'}",
      "['hello', 'how are you']",
      "{'bob', 'charlie'}",
      "{'alice'}",
      "{'alice', 'bob', 'charlie', 'dave'}",
      "[3, 1, 2, 4]",
    ],
  },
};

const order: SetTopicKey[] = ["create", "membership", "operations", "when"];

// ─── Venn Diagram Visual ──────────────────────────────────────────────────────
function VennDiagram() {
  return (
    <div className="flex flex-col items-center gap-2 py-3">
      <div className="relative w-64 h-36">
        {/* Set A circle */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute left-4 top-2 w-36 h-32 rounded-full border-2 border-violet-400 bg-violet-500/10 flex items-center justify-start pl-5"
        >
          <span className="text-xs font-mono text-violet-600 dark:text-violet-300 font-bold">A</span>
        </motion.div>
        {/* Set B circle */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-4 top-2 w-36 h-32 rounded-full border-2 border-blue-400 bg-blue-500/10 flex items-center justify-end pr-5"
        >
          <span className="text-xs font-mono text-blue-600 dark:text-blue-300 font-bold">B</span>
        </motion.div>
        {/* Labels */}
        <div className="absolute left-8 bottom-0 text-[10px] text-violet-500 font-semibold">1, 2, 3</div>
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/15 rounded px-1.5 py-0.5">
          4, 5
        </div>
        <div className="absolute right-8 bottom-0 text-[10px] text-blue-500 font-semibold">6, 7, 8</div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 text-[10px]">
        <Badge variant="outline" className="bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/40 text-[10px]">
          A | B = Union
        </Badge>
        <Badge variant="outline" className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 text-[10px]">
          A & B = Intersection
        </Badge>
        <Badge variant="outline" className="bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/40 text-[10px]">
          A - B = Difference
        </Badge>
        <Badge variant="outline" className="bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/40 text-[10px]">
          A ^ B = Symmetric Diff
        </Badge>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function SetsVisualization() {
  const [selected, setSelected] = useState<SetTopicKey>("create");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: SetTopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Sets</CardTitle>
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
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all inline-flex items-center gap-1.5 ${
                  selected === key
                    ? d.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {d.icon}
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
                set
              </Badge>
            </div>
            <p className="text-sm leading-relaxed">{demo.description}</p>
            <p className="text-xs opacity-80 italic">{demo.note}</p>
          </motion.div>
        </AnimatePresence>

        {/* Venn diagram for set operations */}
        {selected === "operations" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <VennDiagram />
          </motion.div>
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
      </CardContent>
    </Card>
  );
}
