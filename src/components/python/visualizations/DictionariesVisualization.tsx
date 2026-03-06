"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
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
type DictTopicKey = "create-access" | "add-update" | "iteration" | "nested";

interface DictDemo {
  label: string;
  color: string;
  badgeColor: string;
  badgeLabel: string;
  description: string;
  code: string;
  output: string[];
  mappingKeys: string[];
  mappingValues: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<DictTopicKey, DictDemo> = {
  "create-access": {
    label: "Create & Access",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    badgeLabel: "Basics",
    description:
      "Dictionaries are created with {key: value} pairs. Access values with d[key] for strict lookup or d.get(key, default) for safe access with a fallback.",
    code: `# Creating a dictionary
user = {"name": "Alice", "age": 30, "role": "dev"}

print(type(user))              # <class 'dict'>
print(user["name"])            # Alice
print(user["age"])             # 30

# Safe access with .get()
print(user.get("role"))        # dev
print(user.get("email", "N/A"))  # N/A

# Check if key exists
print("name" in user)          # True
print("email" in user)         # False
print(len(user))               # 3`,
    output: [
      "<class 'dict'>",
      "Alice",
      "30",
      "dev",
      "N/A",
      "True",
      "False",
      "3",
    ],
    mappingKeys: ["name", "age", "role"],
    mappingValues: ['"Alice"', "30", '"dev"'],
  },
  "add-update": {
    label: "Add & Update",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    badgeLabel: "Mutate",
    description:
      "Dictionaries are mutable. Add new keys by assignment, update existing ones, or remove entries with del and pop().",
    code: `d = {"x": 1, "y": 2}

# Add a new key
d["z"] = 3
print(d)                # {'x': 1, 'y': 2, 'z': 3}

# Update an existing key
d["x"] = 10
print(d)                # {'x': 10, 'y': 2, 'z': 3}

# Bulk update with .update()
d.update({"y": 20, "w": 4})
print(d)                # {'x': 10, 'y': 20, 'z': 3, 'w': 4}

# Remove with del
del d["w"]
print(d)                # {'x': 10, 'y': 20, 'z': 3}

# Remove with pop (returns value)
val = d.pop("z")
print(val)              # 3
print(d)                # {'x': 10, 'y': 20}`,
    output: [
      "{'x': 1, 'y': 2, 'z': 3}",
      "{'x': 10, 'y': 2, 'z': 3}",
      "{'x': 10, 'y': 20, 'z': 3, 'w': 4}",
      "{'x': 10, 'y': 20, 'z': 3}",
      "3",
      "{'x': 10, 'y': 20}",
    ],
    mappingKeys: ["x", "y", "z", "w"],
    mappingValues: ["10", "20", "3", "4"],
  },
  iteration: {
    label: "Iteration",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    badgeLabel: "Loops",
    description:
      "Iterate over keys, values, or key-value pairs using for loops. Use .keys(), .values(), and .items() for explicit views.",
    code: `scores = {"math": 95, "science": 88, "english": 92}

# Iterate over keys (default)
for key in scores:
    print(key, end=" ")
print()                 # math science english

# Iterate over key-value pairs
for k, v in scores.items():
    print(f"{k}={v}", end=" ")
print()                 # math=95 science=88 english=92

# Get keys and values as lists
print(list(scores.keys()))    # ['math', 'science', 'english']
print(list(scores.values()))  # [95, 88, 92]

# Dict comprehension
doubled = {k: v * 2 for k, v in scores.items()}
print(doubled)  # {'math': 190, 'science': 176, 'english': 184}`,
    output: [
      "math science english",
      "math=95 science=88 english=92",
      "['math', 'science', 'english']",
      "[95, 88, 92]",
      "{'math': 190, 'science': 176, 'english': 184}",
    ],
    mappingKeys: ["math", "science", "english"],
    mappingValues: ["95", "88", "92"],
  },
  nested: {
    label: "Nested Dicts",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    badgeLabel: "Advanced",
    description:
      "Dictionaries can contain other dictionaries. Access nested values by chaining keys. Merge dictionaries with the {**d1, **d2} unpacking syntax.",
    code: `# Nested dictionary
company = {
    "alice": {"role": "dev", "level": 3},
    "bob":   {"role": "design", "level": 2},
}

# Access nested values
print(company["alice"]["role"])    # dev
print(company["bob"]["level"])     # 2

# Add nested entry
company["carol"] = {"role": "pm", "level": 4}
print(len(company))                # 3

# Merge two dicts with unpacking
defaults = {"theme": "dark", "lang": "en"}
overrides = {"lang": "fr", "fontsize": 14}
config = {**defaults, **overrides}
print(config)
# {'theme': 'dark', 'lang': 'fr', 'fontsize': 14}

# Merge with | operator (Python 3.9+)
merged = defaults | overrides
print(merged)
# {'theme': 'dark', 'lang': 'fr', 'fontsize': 14}`,
    output: [
      "dev",
      "2",
      "3",
      "{'theme': 'dark', 'lang': 'fr', 'fontsize': 14}",
      "{'theme': 'dark', 'lang': 'fr', 'fontsize': 14}",
    ],
    mappingKeys: ["alice", "bob", "carol"],
    mappingValues: ['{role:"dev"}', '{role:"design"}', '{role:"pm"}'],
  },
};

const order: DictTopicKey[] = ["create-access", "add-update", "iteration", "nested"];

// ─── Key-Value Mapping Diagram ────────────────────────────────────────────────
function KeyValueDiagram({
  keys,
  values,
  color,
}: Readonly<{ keys: string[]; values: string[]; color: string }>) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground">Key → Value Mapping</p>
      <div className={`rounded-xl border p-3 ${color} space-y-1.5`}>
        {keys.map((k, idx) => (
          <motion.div
            key={`mapping-${k}-${idx}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="flex items-center gap-2 font-mono text-xs"
          >
            <span className="inline-flex items-center justify-center min-w-[70px] px-2 py-1 rounded-md bg-black/10 dark:bg-white/10 font-bold">
              {k}
            </span>
            <ArrowRight className="h-3 w-3 opacity-60 shrink-0" />
            <span className="inline-flex items-center px-2 py-1 rounded-md bg-black/10 dark:bg-white/10">
              {values[idx]}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function DictionariesVisualization() {
  const [selected, setSelected] = useState<DictTopicKey>("create-access");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: DictTopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Dictionaries</CardTitle>
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
              <span className="text-lg font-bold font-mono">{demo.label}</span>
              <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                {demo.badgeLabel}
              </Badge>
            </div>
            <p className="text-sm leading-relaxed">{demo.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Key-Value Mapping Diagram */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`diagram-${selected}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <KeyValueDiagram
              keys={demo.mappingKeys}
              values={demo.mappingValues}
              color={demo.color}
            />
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
