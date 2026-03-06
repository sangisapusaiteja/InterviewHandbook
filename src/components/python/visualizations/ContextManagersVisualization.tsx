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
type TopicKey = "with-statement" | "contextmanager" | "exception-handling" | "contextlib-tools";

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
  "with-statement": {
    label: "with Statement",
    subtitle: "__enter__ / __exit__",
    color: "bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    badgeLabel: "with",
    description:
      "The with statement ensures resources are properly acquired and released by calling __enter__() on entry and __exit__() on exit. This guarantees cleanup even if an exception occurs, eliminating the need for manual try/finally blocks. Files, locks, and database connections are common use cases.",
    keyPoints: [
      "__enter__() is called when entering the with block",
      "__exit__() is called when leaving, even on exceptions",
      "Guarantees cleanup without manual try/finally",
      "File objects are the most common built-in context manager",
    ],
    codeSnippet: `class ManagedFile:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        print(f"Opening \${self.name}")
        self.file = open(self.name, "w")
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"Closing \${self.name}")
        self.file.close()
        return False

# Usage
with ManagedFile("test.txt") as f:
    f.write("Hello, context managers!")
    print("Writing to file...")

print("File is now closed")`,
    codeOutput: [
      "Opening test.txt",
      "Writing to file...",
      "Closing test.txt",
      "File is now closed",
    ],
  },
  contextmanager: {
    label: "@contextmanager",
    subtitle: "Generator-Based Context Managers",
    color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    badgeLabel: "generator",
    description:
      "The @contextmanager decorator from contextlib turns a generator function into a context manager. Code before yield runs on __enter__, the yielded value is bound to the as variable, and code after yield runs on __exit__. This is more concise than writing a full class with __enter__/__exit__.",
    keyPoints: [
      "Decorator from contextlib simplifies context manager creation",
      "Code before yield = setup (__enter__)",
      "Code after yield = teardown (__exit__)",
      "Wrap yield in try/finally for guaranteed cleanup",
    ],
    codeSnippet: `from contextlib import contextmanager

@contextmanager
def timer(label):
    import time
    start = time.time()
    print(f"[START] \${label}")
    try:
        yield start
    finally:
        elapsed = time.time() - start
        print(f"[END] \${label}: \${elapsed:.4f}s")

# Usage
with timer("processing") as t:
    total = sum(range(1_000_000))
    print(f"Sum = \${total}")`,
    codeOutput: [
      "[START] processing",
      "Sum = 499999500000",
      "[END] processing: 0.0312s",
    ],
  },
  "exception-handling": {
    label: "Exception Handling",
    subtitle: "__exit__ Parameters & Suppression",
    color: "bg-violet-500/15 border-violet-500/30 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    badgeLabel: "exceptions",
    description:
      "The __exit__ method receives three arguments: exc_type, exc_val, and exc_tb. If no exception occurred, all three are None. Returning True from __exit__ suppresses the exception, preventing it from propagating. This allows context managers to handle or silence specific errors gracefully.",
    keyPoints: [
      "__exit__(exc_type, exc_val, exc_tb) receives exception info",
      "All three params are None when no exception occurs",
      "Return True to suppress (swallow) the exception",
      "Return False (or None) to let the exception propagate",
    ],
    codeSnippet: `class SuppressErrors:
    def __init__(self, *exceptions):
        self.exceptions = exceptions

    def __enter__(self):
        print("Entering protected block")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is None:
            print("No exception occurred")
            return False
        if issubclass(exc_type, self.exceptions):
            print(f"Suppressed: \${exc_type.__name__}: \${exc_val}")
            return True  # suppress
        print(f"Not suppressed: \${exc_type.__name__}")
        return False  # propagate

# Suppressed exception
with SuppressErrors(ValueError, ZeroDivisionError):
    result = 1 / 0

print("Execution continues normally!")`,
    codeOutput: [
      "Entering protected block",
      "Suppressed: ZeroDivisionError: division by zero",
      "Execution continues normally!",
    ],
  },
  "contextlib-tools": {
    label: "contextlib Tools",
    subtitle: "suppress, redirect_stdout, closing, ExitStack",
    color: "bg-orange-500/15 border-orange-500/30 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    badgeLabel: "contextlib",
    description:
      "The contextlib module provides several utility context managers: suppress() silences specified exceptions, redirect_stdout() captures print output, closing() calls .close() on exit for objects that lack __enter__/__exit__, and ExitStack manages a dynamic collection of context managers.",
    keyPoints: [
      "suppress(*exceptions) silences specific exception types",
      "redirect_stdout(buffer) captures printed output",
      "closing(obj) ensures obj.close() is called on exit",
      "ExitStack manages variable number of context managers",
    ],
    codeSnippet: `from contextlib import suppress, redirect_stdout, ExitStack
from io import StringIO

# suppress — ignore specific exceptions
with suppress(FileNotFoundError):
    open("nonexistent.txt")
print("suppress: FileNotFoundError silenced")

# redirect_stdout — capture print output
buffer = StringIO()
with redirect_stdout(buffer):
    print("captured line 1")
    print("captured line 2")
print(f"Buffer has: \${buffer.getvalue().count(chr(10))} lines")

# ExitStack — dynamic context managers
files = ["a.txt", "b.txt", "c.txt"]
with ExitStack() as stack:
    managers = [stack.enter_context(suppress(Exception)) for f in files]
    print(f"ExitStack managing \${len(managers)} contexts")

print("All contexts cleaned up!")`,
    codeOutput: [
      "suppress: FileNotFoundError silenced",
      "Buffer has: 2 lines",
      "ExitStack managing 3 contexts",
      "All contexts cleaned up!",
    ],
  },
};

const order: TopicKey[] = ["with-statement", "contextmanager", "exception-handling", "contextlib-tools"];

const chipColors: Record<TopicKey, string> = {
  "with-statement": "bg-blue-500/15 border-blue-500/30 text-blue-400",
  contextmanager: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  "exception-handling": "bg-violet-500/15 border-violet-500/30 text-violet-400",
  "contextlib-tools": "bg-orange-500/15 border-orange-500/30 text-orange-400",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function ContextManagersVisualization() {
  const [selected, setSelected] = useState<TopicKey>("with-statement");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Context Managers</CardTitle>
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
