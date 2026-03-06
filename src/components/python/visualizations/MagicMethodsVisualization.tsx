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
type TopicKey = "str_repr" | "comparison" | "container" | "context";

interface TopicInfo {
  label: string;
  subtitle: string;
  color: string;
  badgeColor: string;
  description: string;
  keyPoints: string[];
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  str_repr: {
    label: "__str__ & __repr__",
    subtitle: "String Representation",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "__str__ returns a human-readable string used by print() and str(). __repr__ returns an unambiguous developer-friendly representation used by repr() and the interactive console. If __str__ is not defined, Python falls back to __repr__.",
    keyPoints: [
      "print() and str() call __str__",
      "repr() and the REPL call __repr__",
      "__repr__ should ideally be a valid Python expression",
      "If __str__ is missing, __repr__ is used as fallback",
    ],
    codeSnippet: `class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

    def __str__(self):
        return f"\${self.title} by \${self.author}"

    def __repr__(self):
        return f"Book('\${self.title}', '\${self.author}')"

b = Book("1984", "George Orwell")
print(str(b))
print(repr(b))`,
    codeOutput: [
      "1984 by George Orwell",
      "Book('1984', 'George Orwell')",
    ],
  },
  comparison: {
    label: "Comparison",
    subtitle: "__eq__, __lt__, __le__",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Comparison magic methods let you define how instances are compared using ==, <, <=, etc. The @total_ordering decorator from functools lets you define just __eq__ and one of __lt__, __le__, __gt__, or __ge__, and it fills in the rest automatically.",
    keyPoints: [
      "__eq__ is called by ==",
      "__lt__ is called by <, __le__ by <=",
      "@total_ordering auto-generates missing comparisons",
      "__hash__ should also be defined if __eq__ is overridden",
    ],
    codeSnippet: `from functools import total_ordering

@total_ordering
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    def __eq__(self, other):
        return self.celsius == other.celsius

    def __lt__(self, other):
        return self.celsius < other.celsius

    def __repr__(self):
        return f"Temp(\${self.celsius}°C)"

t1 = Temperature(20)
t2 = Temperature(30)
print(t1 == t2)
print(t1 < t2)
print(t1 >= t2)
print(sorted([Temperature(30), Temperature(10), Temperature(20)]))`,
    codeOutput: [
      "False",
      "True",
      "False",
      "[Temp(10°C), Temp(20°C), Temp(30°C)]",
    ],
  },
  container: {
    label: "Container Protocol",
    subtitle: "__len__, __getitem__, __iter__",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "The container protocol lets your objects behave like built-in collections. __len__ enables len(), __getitem__ enables indexing with [], __contains__ enables the 'in' operator, and __iter__ enables iteration with for loops. Implementing these makes your class feel Pythonic.",
    keyPoints: [
      "__len__ is called by len()",
      "__getitem__ enables obj[key] indexing",
      "__contains__ enables 'in' operator",
      "__iter__ enables for-loop iteration",
    ],
    codeSnippet: `class Playlist:
    def __init__(self, name, songs):
        self.name = name
        self._songs = list(songs)

    def __len__(self):
        return len(self._songs)

    def __getitem__(self, index):
        return self._songs[index]

    def __contains__(self, song):
        return song in self._songs

    def __iter__(self):
        return iter(self._songs)

p = Playlist("Road Trip", ["Bohemian Rhapsody", "Hotel California", "Stairway to Heaven"])
print(len(p))
print(p[0])
print("Hotel California" in p)
print([s for s in p])`,
    codeOutput: [
      "3",
      "Bohemian Rhapsody",
      "True",
      "['Bohemian Rhapsody', 'Hotel California', 'Stairway to Heaven']",
    ],
  },
  context: {
    label: "Context Manager",
    subtitle: "__enter__ & __exit__",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Context managers implement __enter__ and __exit__ to enable the 'with' statement. __enter__ runs at the start and its return value is bound by 'as'. __exit__ runs when the block ends — even if an exception occurs — making it ideal for resource management like file handles, database connections, and locks.",
    keyPoints: [
      "__enter__ sets up the resource, returns self or a value",
      "__exit__ handles cleanup, receives exception info",
      "'with' guarantees __exit__ runs even on errors",
      "Return True from __exit__ to suppress exceptions",
    ],
    codeSnippet: `class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        print("Timer started")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        elapsed = time.time() - self.start
        print(f"Elapsed: \${elapsed:.4f}s")
        if exc_type:
            print(f"Exception caught: \${exc_val}")
        return False  # Don't suppress exceptions

with Timer() as t:
    total = sum(range(1_000_000))
    print(f"Sum: \${total}")`,
    codeOutput: [
      "Timer started",
      "Sum: 499999500000",
      "Elapsed: 0.0312s",
    ],
  },
};

const order: TopicKey[] = ["str_repr", "comparison", "container", "context"];

const chipColors: Record<TopicKey, string> = {
  str_repr: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  comparison: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  container: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  context: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Reference Table ──────────────────────────────────────────────────────────
function ReferenceTable() {
  const rows = [
    { method: "__init__", trigger: "MyClass()", desc: "Initialize a new instance" },
    { method: "__str__", trigger: "str(obj), print(obj)", desc: "Human-readable string" },
    { method: "__repr__", trigger: "repr(obj), REPL", desc: "Developer-friendly string" },
    { method: "__eq__", trigger: "obj == other", desc: "Equality comparison" },
    { method: "__lt__", trigger: "obj < other", desc: "Less-than comparison" },
    { method: "__len__", trigger: "len(obj)", desc: "Return length / size" },
    { method: "__getitem__", trigger: "obj[key]", desc: "Indexing / subscript access" },
    { method: "__setitem__", trigger: "obj[key] = val", desc: "Assign by index / key" },
    { method: "__contains__", trigger: "x in obj", desc: "Membership test" },
    { method: "__iter__", trigger: "for x in obj", desc: "Return an iterator" },
    { method: "__enter__", trigger: "with obj as x", desc: "Enter context manager" },
    { method: "__exit__", trigger: "end of with block", desc: "Exit context manager" },
    { method: "__add__", trigger: "obj + other", desc: "Addition operator" },
    { method: "__call__", trigger: "obj()", desc: "Make instance callable" },
    { method: "__hash__", trigger: "hash(obj)", desc: "Hash for sets / dict keys" },
  ];

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground">
        Common Magic Methods Reference
      </p>
      <div className="rounded-xl border bg-muted/20 overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="px-3 py-2 text-left font-semibold text-muted-foreground">
                Method
              </th>
              <th className="px-3 py-2 text-left font-semibold text-muted-foreground">
                Trigger
              </th>
              <th className="px-3 py-2 text-left font-semibold text-muted-foreground">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.method} className="border-b last:border-b-0">
                <td className="px-3 py-2 font-mono text-violet-600 dark:text-violet-400">
                  {row.method}
                </td>
                <td className="px-3 py-2 font-mono text-blue-600 dark:text-blue-400">
                  {row.trigger}
                </td>
                <td className="px-3 py-2 text-muted-foreground">{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-muted-foreground opacity-70">
        Magic methods (dunder methods) let you define how your objects interact with Python&apos;s
        built-in operations and syntax.
      </p>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function MagicMethodsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("str_repr");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Magic Methods (Dunder Methods)</CardTitle>
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
                  magic method
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
                    key={point}
                    className="text-xs text-muted-foreground flex items-start gap-1.5"
                  >
                    <span className="text-emerald-500 mt-0.5">&#x2022;</span>
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

            {/* Reference table */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <ReferenceTable />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
