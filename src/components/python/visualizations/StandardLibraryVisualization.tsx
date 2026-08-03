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
type TopicKey = "collections" | "itertools" | "functools" | "data-formats";

interface TopicInfo {
  label: string;
  subtitle: string;
  color: string;
  badgeColor: string;
  badgeLabel: string;
  description: string;
  keyPoints: string[];
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  collections: {
    label: "collections",
    subtitle: "Counter, defaultdict, deque, namedtuple",
    color: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    badgeColor: "bg-blue-500/10 text-blue-400",
    badgeLabel: "collections",
    description:
      "The collections module provides specialised container datatypes beyond the built-in dict, list, set, and tuple. Counter counts hashable objects, defaultdict supplies missing keys with a factory function, deque is a double-ended queue optimised for appends/pops from both ends, and namedtuple creates lightweight immutable objects with named fields.",
    keyPoints: [
      "Counter counts element frequencies from any iterable",
      "defaultdict never raises KeyError — uses a factory for missing keys",
      "deque supports O(1) append/pop from both ends",
      "namedtuple creates immutable, self-documenting records",
    ],
    codeSnippet: `from collections import Counter, defaultdict, deque, namedtuple

# Counter — count element frequencies
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counter = Counter(words)
print("Counter:", counter)
print("Most common:", counter.most_common(2))

# defaultdict — auto-initialise missing keys
dd = defaultdict(list)
dd["fruits"].append("apple")
dd["fruits"].append("banana")
dd["vegs"].append("carrot")
print("defaultdict:", dict(dd))

# deque — double-ended queue
dq = deque([1, 2, 3])
dq.appendleft(0)
dq.append(4)
print("deque:", dq)

# namedtuple — lightweight record
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(f"Point: x=\{p.x}, y=\{p.y}")`,
    codeOutput: [
      "Counter: Counter({'apple': 3, 'banana': 2, 'cherry': 1})",
      "Most common: [('apple', 3), ('banana', 2)]",
      "defaultdict: {'fruits': ['apple', 'banana'], 'vegs': ['carrot']}",
      "deque: deque([0, 1, 2, 3, 4])",
      "Point: x=3, y=4",
    ],
  },
  itertools: {
    label: "itertools",
    subtitle: "permutations, combinations, chain, product",
    color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    badgeColor: "bg-emerald-500/10 text-emerald-400",
    badgeLabel: "itertools",
    description:
      "The itertools module provides memory-efficient iterator building blocks for looping. permutations yields all ordered arrangements, combinations yields unordered selections, chain concatenates multiple iterables into one, and product computes the Cartesian product of input iterables.",
    keyPoints: [
      "permutations(iterable, r) yields all r-length ordered arrangements",
      "combinations(iterable, r) yields r-length unordered selections",
      "chain(*iterables) concatenates iterables lazily",
      "product(*iterables) computes the Cartesian product",
    ],
    codeSnippet: `from itertools import permutations, combinations, chain, product

# permutations — all ordered arrangements
perms = list(permutations([1, 2, 3], 2))
print("Permutations(3,2):", perms)

# combinations — unordered selections
combs = list(combinations("ABCD", 2))
print("Combinations(ABCD,2):", combs)

# chain — concatenate iterables
merged = list(chain([1, 2], [3, 4], [5]))
print("Chain:", merged)

# product — Cartesian product
pairs = list(product("AB", [1, 2]))
print("Product:", pairs)

# Practical: all dice rolls summing to 7
rolls = [r for r in product(range(1,7), repeat=2) if sum(r)==7]
print("Dice rolls summing to 7:", rolls)`,
    codeOutput: [
      "Permutations(3,2): [(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]",
      "Combinations(ABCD,2): [('A', 'B'), ('A', 'C'), ('A', 'D'), ('B', 'C'), ('B', 'D'), ('C', 'D')]",
      "Chain: [1, 2, 3, 4, 5]",
      "Product: [('A', 1), ('A', 2), ('B', 1), ('B', 2)]",
      "Dice rolls summing to 7: [(1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1)]",
    ],
  },
  functools: {
    label: "functools",
    subtitle: "lru_cache, reduce, partial, wraps",
    color: "bg-violet-500/15 border-violet-500/30 text-violet-400",
    badgeColor: "bg-violet-500/10 text-violet-400",
    badgeLabel: "functools",
    description:
      "The functools module provides higher-order functions that act on or return other functions. lru_cache memoises expensive function calls, reduce applies a rolling computation, partial freezes some arguments of a function, and wraps preserves metadata when writing decorators.",
    keyPoints: [
      "lru_cache memoises results for repeated calls with same args",
      "reduce(func, iterable) applies a rolling binary operation",
      "partial(func, *args) creates a new function with frozen arguments",
      "wraps(func) preserves __name__ and __doc__ in decorators",
    ],
    codeSnippet: `from functools import lru_cache, reduce, partial, wraps

# lru_cache — memoisation
@lru_cache(maxsize=128)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print("fib(10):", fib(10))
print("Cache info:", fib.cache_info())

# reduce — rolling computation
total = reduce(lambda a, b: a + b, [1, 2, 3, 4, 5])
print("reduce sum:", total)

# partial — freeze arguments
def power(base, exp):
    return base ** exp

square = partial(power, exp=2)
cube = partial(power, exp=3)
print("square(5):", square(5))
print("cube(3):", cube(3))

# wraps — preserve function metadata
def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet():
    """Say hello."""
    return "Hello!"

print("Name:", greet.__name__)
print("Doc:", greet.__doc__)`,
    codeOutput: [
      "fib(10): 55",
      "Cache info: CacheInfo(hits=8, misses=11, maxsize=128, currsize=11)",
      "reduce sum: 15",
      "square(5): 25",
      "cube(3): 27",
      "Name: greet",
      "Doc: Say hello.",
    ],
  },
  "data-formats": {
    label: "Data Formats",
    subtitle: "json, csv, configparser, xml overview",
    color: "bg-orange-500/15 border-orange-500/30 text-orange-400",
    badgeColor: "bg-orange-500/10 text-orange-400",
    badgeLabel: "data-formats",
    description:
      "Python's standard library includes modules for common data-interchange formats. json handles JSON encoding/decoding, csv reads and writes tabular data, configparser manages INI-style config files, and xml.etree.ElementTree provides a lightweight XML parser and builder.",
    keyPoints: [
      "json.dumps/loads for string serialisation, dump/load for files",
      "csv.DictReader/DictWriter map rows to dicts by header",
      "configparser reads/writes INI-style configuration files",
      "xml.etree.ElementTree parses and builds XML documents",
    ],
    codeSnippet: `import json, csv, configparser
from io import StringIO
import xml.etree.ElementTree as ET

# json — serialise and parse
data = {"name": "Alice", "scores": [95, 87, 92]}
j = json.dumps(data, indent=2)
print("JSON:", j)

# csv — read tabular data
csv_text = "lang,year\\nPython,1991\\nRust,2010"
reader = csv.DictReader(StringIO(csv_text))
for row in reader:
    print(f"\{row['lang']} (\{row['year']})")

# configparser — INI files
cfg = configparser.ConfigParser()
cfg.read_string(\"\"\"
[database]
host = localhost
port = 5432
\"\"\")
print("DB host:", cfg["database"]["host"])
print("DB port:", cfg["database"]["port"])

# xml — parse XML
xml_str = "<root><item id='1'>Apple</item><item id='2'>Banana</item></root>"
root = ET.fromstring(xml_str)
for item in root.findall("item"):
    print(f"Item \{item.get('id')}: \{item.text}")`,
    codeOutput: [
      "JSON: {",
      '  "name": "Alice",',
      '  "scores": [',
      "    95,",
      "    87,",
      "    92",
      "  ]",
      "}",
      "Python (1991)",
      "Rust (2010)",
      "DB host: localhost",
      "DB port: 5432",
      "Item 1: Apple",
      "Item 2: Banana",
    ],
  },
};

const order: TopicKey[] = ["collections", "itertools", "functools", "data-formats"];

const chipColors: Record<TopicKey, string> = {
  collections: "bg-blue-500/15 border-blue-500/30 text-blue-400",
  itertools: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  functools: "bg-violet-500/15 border-violet-500/30 text-violet-400",
  "data-formats": "bg-orange-500/15 border-orange-500/30 text-orange-400",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function StandardLibraryVisualization() {
  const [selected, setSelected] = useState<TopicKey>("collections");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Standard Library Overview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Topic selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const t = topics[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  selected === key
                    ? chipColors[key] + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.label} — {t.subtitle}
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
                  {topic.badgeLabel}
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Key points */}
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground">Key Points</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {topic.keyPoints.map((point) => (
                  <li
                    key={`kp-${selected}-${point}`}
                    className="text-xs text-muted-foreground flex items-start gap-1.5"
                  >
                    <span className="text-emerald-500 mt-0.5 select-none">*</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Two-column: Code | Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Code snippet */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {topic.codeSnippet}
                  </pre>
                </div>
              </div>

              {/* Right: Run + Output */}
              <div className="space-y-3">
                <Button size="sm" onClick={() => setOutputLines(topic.codeOutput)}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                  <ConsoleOutput lines={outputLines} />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
