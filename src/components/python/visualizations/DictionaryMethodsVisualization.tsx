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
type MethodKey = "get-setdefault" | "update-merge" | "defaultdict-counter" | "views";

interface MethodDemo {
  label: string;
  color: string;
  badgeColor: string;
  badgeLabel: string;
  description: string;
  note: string;
  example: string;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<MethodKey, MethodDemo> = {
  "get-setdefault": {
    label: "get & setdefault",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    badgeLabel: "Safe Access",
    description:
      "dict.get(key, default) returns the value for key if present, otherwise returns default (None if omitted). dict.setdefault(key, default) returns the value if key exists; if not, inserts key with default and returns it -- a get-or-insert pattern.",
    note: "Use get() to avoid KeyError. Use setdefault() to initialize missing keys in one step.",
    example: `user = {"name": "Alice", "age": 30}

# .get() -- safe access with fallback
print(user.get("name"))          # Alice
print(user.get("email"))         # None
print(user.get("email", "N/A")) # N/A

# .setdefault() -- get or insert
email = user.setdefault("email", "alice@dev.io")
print(email)                     # alice@dev.io
print(user["email"])             # alice@dev.io (now inserted)

# setdefault won't overwrite existing keys
user.setdefault("name", "Bob")
print(user["name"])              # Alice (unchanged)`,
    output: [
      "Alice",
      "None",
      "N/A",
      "alice@dev.io",
      "alice@dev.io",
      "Alice",
    ],
  },
  "update-merge": {
    label: "update & merge",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    badgeLabel: "Combining Dicts",
    description:
      "dict.update() merges another dict (or iterable of key-value pairs) in place. The {**d1, **d2} unpacking syntax creates a new merged dict. Python 3.9+ adds the | operator for merging and |= for in-place merge.",
    note: "update() and |= mutate in place. ** unpacking and | create new dicts.",
    example: `d1 = {"a": 1, "b": 2}
d2 = {"b": 99, "c": 3}

# .update() -- merges in place
d1.update(d2)
print(d1)  # {'a': 1, 'b': 99, 'c': 3}

# ** unpacking -- new dict (no mutation)
x = {"a": 1, "b": 2}
y = {"b": 99, "c": 3}
merged = {**x, **y}
print(merged)  # {'a': 1, 'b': 99, 'c': 3}
print(x)       # {'a': 1, 'b': 2} (unchanged)

# | merge operator (Python 3.9+)
m = x | y
print(m)  # {'a': 1, 'b': 99, 'c': 3}

# |= in-place merge (Python 3.9+)
x |= y
print(x)  # {'a': 1, 'b': 99, 'c': 3}`,
    output: [
      "{'a': 1, 'b': 99, 'c': 3}",
      "{'a': 1, 'b': 99, 'c': 3}",
      "{'a': 1, 'b': 2}",
      "{'a': 1, 'b': 99, 'c': 3}",
      "{'a': 1, 'b': 99, 'c': 3}",
    ],
  },
  "defaultdict-counter": {
    label: "defaultdict & Counter",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    badgeLabel: "collections",
    description:
      "collections.defaultdict(factory) auto-creates missing keys using the factory function (int gives 0, list gives []). collections.Counter is a dict subclass for counting hashable objects, with helpers like most_common().",
    note: "defaultdict avoids manual key-existence checks. Counter simplifies frequency counting.",
    example: `from collections import defaultdict, Counter

# defaultdict(int) -- auto-initializes to 0
word_count = defaultdict(int)
for w in ["apple", "banana", "apple", "cherry", "apple"]:
    word_count[w] += 1
print(dict(word_count))
# {'apple': 3, 'banana': 1, 'cherry': 1}

# defaultdict(list) -- auto-initializes to []
groups = defaultdict(list)
for name, dept in [("Alice","Eng"), ("Bob","Eng"), ("Carol","HR")]:
    groups[dept].append(name)
print(dict(groups))
# {'Eng': ['Alice', 'Bob'], 'HR': ['Carol']}

# Counter
c = Counter("abracadabra")
print(c.most_common(3))
# [('a', 5), ('b', 2), ('r', 2)]
print(c["a"])  # 5`,
    output: [
      "{'apple': 3, 'banana': 1, 'cherry': 1}",
      "{'Eng': ['Alice', 'Bob'], 'HR': ['Carol']}",
      "[('a', 5), ('b', 2), ('r', 2)]",
      "5",
    ],
  },
  views: {
    label: "Views (keys/values/items)",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    badgeLabel: "View Objects",
    description:
      "dict.keys(), dict.values(), and dict.items() return dynamic view objects that reflect changes to the dictionary in real time. Views support set-like operations (keys and items views) and iteration.",
    note: "Views are lazy -- they do not copy data. Changes to the dict are immediately visible through the view.",
    example: `d = {"x": 1, "y": 2, "z": 3}

keys = d.keys()
vals = d.values()
items = d.items()

print(list(keys))    # ['x', 'y', 'z']
print(list(vals))    # [1, 2, 3]
print(list(items))   # [('x', 1), ('y', 2), ('z', 3)]

# Views are dynamic -- reflect mutations
d["w"] = 4
print(list(keys))    # ['x', 'y', 'z', 'w']

# Set operations on keys view
other = {"y": 20, "z": 30, "a": 40}
print(d.keys() & other.keys())   # {'y', 'z'}
print(d.keys() - other.keys())   # {'x', 'w'}

# Membership test
print("x" in keys)  # True`,
    output: [
      "['x', 'y', 'z']",
      "[1, 2, 3]",
      "[('x', 1), ('y', 2), ('z', 3)]",
      "['x', 'y', 'z', 'w']",
      "{'y', 'z'}",
      "{'x', 'w'}",
      "True",
    ],
  },
};

const order: MethodKey[] = [
  "get-setdefault",
  "update-merge",
  "defaultdict-counter",
  "views",
];

// ─── Reference table data ────────────────────────────────────────────────────
interface TableRow {
  method: string;
  returns: string;
  mutates: boolean;
  description: string;
}

const tableData: TableRow[] = [
  { method: "d.get(k, default)", returns: "value | default", mutates: false, description: "Safe key lookup with fallback" },
  { method: "d.setdefault(k, v)", returns: "value", mutates: true, description: "Get or insert default value" },
  { method: "d.update(other)", returns: "None", mutates: true, description: "Merge other dict in place" },
  { method: "{**d1, **d2}", returns: "new dict", mutates: false, description: "Unpack-merge into new dict" },
  { method: "d1 | d2", returns: "new dict", mutates: false, description: "Merge operator (3.9+)" },
  { method: "d1 |= d2", returns: "None", mutates: true, description: "In-place merge operator (3.9+)" },
  { method: "defaultdict(factory)", returns: "defaultdict", mutates: false, description: "Auto-init missing keys" },
  { method: "Counter(iterable)", returns: "Counter", mutates: false, description: "Frequency counting dict" },
  { method: "c.most_common(n)", returns: "list", mutates: false, description: "Top n most frequent items" },
  { method: "d.keys()", returns: "dict_keys", mutates: false, description: "Dynamic view of keys" },
  { method: "d.values()", returns: "dict_values", mutates: false, description: "Dynamic view of values" },
  { method: "d.items()", returns: "dict_items", mutates: false, description: "Dynamic view of (k, v) pairs" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function DictionaryMethodsVisualization() {
  const [selected, setSelected] = useState<MethodKey>("get-setdefault");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [showTable, setShowTable] = useState(false);

  const demo = demos[selected];

  const handleSelect = (key: MethodKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Dictionary Methods</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Method selector chips */}
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
              <span className="text-lg font-bold font-mono">{demo.label}</span>
              <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                {demo.badgeLabel}
              </Badge>
            </div>
            <p className="text-sm leading-relaxed">{demo.description}</p>
            <p className="text-xs opacity-80 italic">{demo.note}</p>
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

        {/* Methods Reference Table Toggle */}
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTable((prev) => !prev)}
          >
            <Table className="h-3.5 w-3.5 mr-1" />
            {showTable ? "Hide" : "Show"} Methods Reference
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
                  <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                    <span>Method</span>
                    <span>Returns</span>
                    <span className="text-center">Mutates?</span>
                    <span>Description</span>
                  </div>
                  {tableData.map((row) => (
                    <div
                      key={row.method}
                      className="grid grid-cols-4 px-3 py-2.5 border-t hover:bg-muted/40 transition-colors"
                    >
                      <code className="font-mono text-[11px] text-primary">
                        {row.method}
                      </code>
                      <code className="font-mono text-[11px] text-muted-foreground">
                        {row.returns}
                      </code>
                      <span className="text-center">
                        {row.mutates ? (
                          <span className="inline-block px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                            Yes
                          </span>
                        ) : (
                          <span className="inline-block px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-600 dark:text-sky-400 text-[10px] font-bold">
                            No
                          </span>
                        )}
                      </span>
                      <span className="text-muted-foreground">{row.description}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground mt-2">
                  defaultdict and Counter live in the collections module. The | and |= operators require Python 3.9+.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
