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
type TopicKey = "basic" | "twolists" | "filtering" | "inverting";

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
  basic: {
    label: "Basic Syntax",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "A dictionary comprehension creates a new dict in a single expression: {key_expr: value_expr for item in iterable}. It mirrors list comprehension syntax but produces key-value pairs wrapped in curly braces.",
    codeSnippet: `# Basic dict comprehension — squares
squares = {x: x**2 for x in range(5)}
print(f"squares = {squares}")

# ── Visual breakdown ──────────────────────
#   { x : x**2  for x in range(5) }
#     │    │         │
#     │    │         └─ iterable: 0, 1, 2, 3, 4
#     │    └─────────── value expression
#     └──────────────── key expression

# String lengths
words = ["hello", "world", "python"]
lengths = {w: len(w) for w in words}
print(f"lengths = {lengths}")

# Enumerate to dict
indexed = {i: ch for i, ch in enumerate("abc")}
print(f"indexed = {indexed}")`,
    codeOutput: [
      "squares = {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}",
      "lengths = {'hello': 5, 'world': 5, 'python': 6}",
      "indexed = {0: 'a', 1: 'b', 2: 'c'}",
    ],
  },
  twolists: {
    label: "From Two Lists",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Use zip() to pair two sequences together inside a dict comprehension. This is the idiomatic way to build a dictionary from separate lists of keys and values.",
    codeSnippet: `# Combine two lists into a dict with zip()
keys   = ["name", "age", "city"]
values = ["Alice", 30, "Paris"]

profile = {k: v for k, v in zip(keys, values)}
print(f"profile = {profile}")

# Scores mapping
students = ["Alice", "Bob", "Charlie"]
scores   = [88, 95, 72]

grades = {name: score for name, score in zip(students, scores)}
print(f"grades = {grades}")

# With index — enumerate + zip alternative
colors = ["red", "green", "blue"]
codes  = ["#FF0000", "#00FF00", "#0000FF"]

color_map = {c: code for c, code in zip(colors, codes)}
print(f"color_map = {color_map}")

# dict(zip()) shorthand — equivalent but less flexible
quick = dict(zip(keys, values))
print(f"quick = {quick}")`,
    codeOutput: [
      "profile = {'name': 'Alice', 'age': 30, 'city': 'Paris'}",
      "grades = {'Alice': 88, 'Bob': 95, 'Charlie': 72}",
      "color_map = {'red': '#FF0000', 'green': '#00FF00', 'blue': '#0000FF'}",
      "quick = {'name': 'Alice', 'age': 30, 'city': 'Paris'}",
    ],
  },
  filtering: {
    label: "Filtering & Transforming",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Add an if clause to filter entries, or apply expressions to transform keys and values on the fly. You can combine both filtering and transforming in a single comprehension.",
    codeSnippet: `# Filter — keep only even squares
even_sq = {x: x**2 for x in range(10) if x % 2 == 0}
print(f"even_sq = {even_sq}")

# Filter dict entries by value
prices = {"apple": 1.2, "banana": 0.5, "cherry": 3.0, "date": 8.0}
cheap = {k: v for k, v in prices.items() if v < 3}
print(f"cheap = {cheap}")

# Transform keys to uppercase
upper_prices = {k.upper(): v for k, v in prices.items()}
print(f"upper = {upper_prices}")

# Transform values — apply discount
discounted = {k: round(v * 0.9, 2) for k, v in prices.items()}
print(f"discounted = {discounted}")

# Filter + transform combined
deals = {k.title(): round(v * 0.8, 2)
         for k, v in prices.items() if v < 5}
print(f"deals = {deals}")`,
    codeOutput: [
      "even_sq = {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}",
      "cheap = {'apple': 1.2, 'banana': 0.5}",
      "upper = {'APPLE': 1.2, 'BANANA': 0.5, 'CHERRY': 3.0, 'DATE': 8.0}",
      "discounted = {'apple': 1.08, 'banana': 0.45, 'cherry': 2.7, 'date': 7.2}",
      "deals = {'Apple': 0.96, 'Banana': 0.4}",
    ],
  },
  inverting: {
    label: "Inverting & Set Comp",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Swap keys and values with {v: k for k, v in d.items()}. Set comprehensions use the same curly-brace syntax but produce a set of unique values: {expr for x in iterable}.",
    codeSnippet: `# Invert a dictionary — swap keys and values
capitals = {"France": "Paris", "Japan": "Tokyo", "India": "Delhi"}
inverted = {v: k for k, v in capitals.items()}
print(f"inverted = {inverted}")

# Set comprehension — unique values with {expr for x}
nums = [1, 2, 2, 3, 3, 3, 4]
unique_sq = {x**2 for x in nums}
print(f"unique_sq = {unique_sq}")

# Set comp with condition
words = ["hello", "world", "hero", "wolf", "help"]
h_words = {w for w in words if w.startswith("h")}
print(f"h_words = {h_words}")

# ── Comparison: dict vs list vs set ───────
# Dict:  {k: v   for x in iter}  -> dict
# List:  [expr   for x in iter]  -> list
# Set:   {expr   for x in iter}  -> set

data = [1, 2, 3, 4, 5]
as_dict = {x: x*10 for x in data}
as_list = [x*10 for x in data]
as_set  = {x*10 for x in data}
print(f"dict = {as_dict}")
print(f"list = {as_list}")
print(f"set  = {as_set}")`,
    codeOutput: [
      "inverted = {'Paris': 'France', 'Tokyo': 'Japan', 'Delhi': 'India'}",
      "unique_sq = {1, 4, 9, 16}",
      "h_words = {'hello', 'hero', 'help'}",
      "dict = {1: 10, 2: 20, 3: 30, 4: 40, 5: 50}",
      "list = [10, 20, 30, 40, 50]",
      "set  = {10, 20, 30, 40, 50}",
    ],
  },
};

const order: TopicKey[] = ["basic", "twolists", "filtering", "inverting"];

const chipColors: Record<TopicKey, string> = {
  basic: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  twolists: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  filtering: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  inverting: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function DictionaryComprehensionVisualization() {
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
        <CardTitle className="text-lg">Dictionary Comprehension</CardTitle>
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
                  comprehension
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
              <Button size="sm" onClick={() => setOutputLines(topic.codeOutput)}>
                <Play className="h-3.5 w-3.5 mr-1" /> Run
              </Button>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>

            {/* Syntax comparison table — shown on the last topic */}
            {selected === "inverting" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-xl border bg-muted/30 px-4 py-3"
              >
                <p className="text-xs font-semibold text-muted-foreground mb-2">
                  Comprehension Syntax Comparison
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <div className="rounded-lg border bg-blue-500/15 px-3 py-2">
                    <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Dict</p>
                    <p className="text-muted-foreground">&#123;k: v for x in iter&#125;</p>
                    <p className="text-blue-600 dark:text-blue-400 mt-1">&#8594; dict</p>
                  </div>
                  <div className="rounded-lg border bg-emerald-500/15 px-3 py-2">
                    <p className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">List</p>
                    <p className="text-muted-foreground">[expr for x in iter]</p>
                    <p className="text-emerald-600 dark:text-emerald-400 mt-1">&#8594; list</p>
                  </div>
                  <div className="rounded-lg border bg-violet-500/15 px-3 py-2">
                    <p className="font-semibold text-violet-700 dark:text-violet-300 mb-1">Set</p>
                    <p className="text-muted-foreground">&#123;expr for x in iter&#125;</p>
                    <p className="text-violet-600 dark:text-violet-400 mt-1">&#8594; set</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
