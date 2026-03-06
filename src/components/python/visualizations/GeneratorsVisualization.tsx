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
type TopicKey = "yield-basics" | "gen-expressions" | "yield-from" | "pipelines";

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
  "yield-basics": {
    label: "yield Basics",
    subtitle: "Generator Functions & Lazy Evaluation",
    color: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    badgeColor: "bg-blue-500/20 text-blue-400",
    badgeLabel: "yield",
    description:
      "A generator function uses yield instead of return. Each call to next() resumes the function from where it last yielded, preserving local state. Generators are lazy — they produce values one at a time on demand, which saves memory for large sequences.",
    keyPoints: [
      "yield pauses the function and sends a value to the caller",
      "Calling a generator function returns a generator object (not a value)",
      "next() resumes execution until the next yield",
      "StopIteration is raised when the function body completes",
    ],
    codeSnippet: `def countdown(n):
    print(f"Starting from \${n}")
    while n > 0:
        yield n
        n -= 1
    print("Done!")

# Create generator object
gen = countdown(3)
print(type(gen))

# Consume values one at a time
print(next(gen))
print(next(gen))
print(next(gen))

# Iterate remaining with for loop
for val in countdown(2):
    print(f"Got: \${val}")`,
    codeOutput: [
      "<class 'generator'>",
      "Starting from 3",
      "3",
      "2",
      "1",
      "Done!",
      "Starting from 2",
      "Got: 2",
      "Got: 1",
      "Done!",
    ],
  },
  "gen-expressions": {
    label: "Generator Expressions",
    subtitle: "Memory-Efficient Comprehensions",
    color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    badgeColor: "bg-emerald-500/20 text-emerald-400",
    badgeLabel: "genexpr",
    description:
      "Generator expressions use parentheses instead of brackets: (x for x in iterable). Unlike list comprehensions that build the entire list in memory, generator expressions yield items lazily. This makes them ideal for processing large datasets where you only need one element at a time.",
    keyPoints: [
      "Syntax: (expr for item in iterable if condition)",
      "Uses parentheses () instead of brackets []",
      "Produces values lazily — much lower memory footprint",
      "Can be passed directly to functions like sum(), min(), max()",
    ],
    codeSnippet: `import sys

# List comprehension vs generator expression
list_comp = [x * x for x in range(1000)]
gen_expr  = (x * x for x in range(1000))

print("List size:", sys.getsizeof(list_comp), "bytes")
print("Gen  size:", sys.getsizeof(gen_expr), "bytes")

# Using generator expression directly
total = sum(x * x for x in range(5))
print("Sum of squares:", total)

# Lazy evaluation demo
evens = (x for x in range(10) if x % 2 == 0)
print("First even:", next(evens))
print("Second even:", next(evens))
print("Remaining:", list(evens))`,
    codeOutput: [
      "List size: 8856 bytes",
      "Gen  size: 112 bytes",
      "Sum of squares: 30",
      "First even: 0",
      "Second even: 2",
      "Remaining: [4, 6, 8]",
    ],
  },
  "yield-from": {
    label: "yield from",
    subtitle: "Sub-generator Delegation",
    color: "bg-violet-500/15 border-violet-500/30 text-violet-400",
    badgeColor: "bg-violet-500/20 text-violet-400",
    badgeLabel: "delegation",
    description:
      "The yield from expression delegates to a sub-generator or any iterable, forwarding each of its values transparently. This simplifies generator composition and is especially useful for flattening nested iterables or splitting complex generators into smaller pieces.",
    keyPoints: [
      "yield from iterable yields each item from the sub-iterable",
      "Simplifies code that would otherwise need a for loop with yield",
      "Works with any iterable: lists, generators, ranges, etc.",
      "Propagates send() and throw() to the sub-generator",
    ],
    codeSnippet: `# Without yield from (manual delegation)
def manual_chain(*iterables):
    for it in iterables:
        for item in it:
            yield item

# With yield from (cleaner)
def chain(*iterables):
    for it in iterables:
        yield from it

result = list(chain([1, 2], [3, 4], [5]))
print("Chained:", result)

# Flattening nested lists
def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

data = [1, [2, 3], [4, [5, 6]], 7]
print("Flat:", list(flatten(data)))

# Splitting generators
def evens(n):
    yield from (x for x in range(n) if x % 2 == 0)

def odds(n):
    yield from (x for x in range(n) if x % 2 != 0)

print("Evens:", list(evens(8)))
print("Odds:", list(odds(8)))`,
    codeOutput: [
      "Chained: [1, 2, 3, 4, 5]",
      "Flat: [1, 2, 3, 4, 5, 6, 7]",
      "Evens: [0, 2, 4, 6]",
      "Odds: [1, 3, 5, 7]",
    ],
  },
  pipelines: {
    label: "Pipelines",
    subtitle: "Chaining Generators for Data Processing",
    color: "bg-orange-500/15 border-orange-500/30 text-orange-400",
    badgeColor: "bg-orange-500/20 text-orange-400",
    badgeLabel: "pipeline",
    description:
      "Generator pipelines chain multiple generators together, where each stage pulls data from the previous one. This pattern processes data element-by-element without loading everything into memory, making it ideal for ETL workflows, log processing, and streaming data transformations.",
    keyPoints: [
      "Each stage is a generator that consumes the previous one",
      "Data flows lazily through the entire pipeline",
      "Memory usage stays constant regardless of data size",
      "Easy to add, remove, or reorder processing stages",
    ],
    codeSnippet: `# Pipeline stages as generators
def read_lines(lines):
    for line in lines:
        yield line.strip()

def filter_nonempty(lines):
    for line in lines:
        if line:
            yield line

def to_upper(lines):
    for line in lines:
        yield line.upper()

def add_prefix(lines, prefix=">> "):
    for line in lines:
        yield f"\${prefix}\${line}"

# Raw data
raw = ["  hello  ", "", " world ", "  ", " python "]

# Build pipeline by chaining generators
pipeline = add_prefix(to_upper(filter_nonempty(read_lines(raw))))

print("Pipeline output:")
for item in pipeline:
    print(item)

# Pipeline with numbers
def numbers(n):
    yield from range(1, n + 1)

def doubled(gen):
    for x in gen:
        yield x * 2

def only_gt_5(gen):
    for x in gen:
        if x > 5:
            yield x

result = list(only_gt_5(doubled(numbers(6))))
print("\\nFiltered doubles:", result)`,
    codeOutput: [
      "Pipeline output:",
      ">> HELLO",
      ">> WORLD",
      ">> PYTHON",
      "",
      "Filtered doubles: [6, 8, 10, 12]",
    ],
  },
};

const order: TopicKey[] = ["yield-basics", "gen-expressions", "yield-from", "pipelines"];

const chipColors: Record<TopicKey, string> = {
  "yield-basics": "bg-blue-500/15 border-blue-500/30 text-blue-400",
  "gen-expressions": "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  "yield-from": "bg-violet-500/15 border-violet-500/30 text-violet-400",
  pipelines: "bg-orange-500/15 border-orange-500/30 text-orange-400",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function GeneratorsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("yield-basics");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Generators</CardTitle>
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
