"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ShieldCheck, Trash2, Layers, ArrowRightLeft } from "lucide-react";
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
type TopicKey = "always-runs" | "cleanup" | "full-syntax" | "finally-vs-with";

interface TopicInfo {
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
  keyPoints: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  "always-runs": {
    label: "Always Runs",
    subtitle: "Guaranteed Execution",
    icon: <ShieldCheck className="h-3.5 w-3.5" />,
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The finally block executes no matter what — whether the try block succeeds, raises an exception, or even if a return statement is encountered. It is the last thing that runs before leaving the try/except structure.",
    codeSnippet: `# finally runs after success
try:
    result = 10 / 2
    print(f"Result: \${result}")
finally:
    print("Finally block ran (success)")

print("---")

# finally runs after exception too
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Caught division by zero!")
finally:
    print("Finally block ran (exception)")`,
    codeOutput: [
      "Result: 5.0",
      "Finally block ran (success)",
      "---",
      "Caught division by zero!",
      "Finally block ran (exception)",
    ],
    keyPoints: [
      "finally always executes, regardless of exceptions",
      "Runs after try block on success",
      "Runs after except block on failure",
      "Even runs if try/except contains a return",
    ],
  },
  cleanup: {
    label: "Cleanup Pattern",
    subtitle: "Resource Management",
    icon: <Trash2 className="h-3.5 w-3.5" />,
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "The most common use of finally is to guarantee cleanup — closing files, releasing database connections, or freeing resources. Even if an error occurs mid-operation, the finally block ensures resources are properly released.",
    codeSnippet: `# Simulating file cleanup with finally
file = None
try:
    file = open("data.txt", "w")
    file.write("Hello, world!")
    print("Data written successfully")
finally:
    if file is not None:
        file.close()
        print("File closed in finally")

# Network-style cleanup
connection = "open"
try:
    print(f"Connection: \${connection}")
    # simulate work...
    data = [1, 2, 3]
    print(f"Processed \${len(data)} items")
finally:
    connection = "closed"
    print(f"Connection: \${connection}")`,
    codeOutput: [
      "Data written successfully",
      "File closed in finally",
      "Connection: open",
      "Processed 3 items",
      "Connection: closed",
    ],
    keyPoints: [
      "Close files, sockets, DB connections in finally",
      "Guarantees cleanup even on unexpected errors",
      "try/finally without except is valid Python",
      "Check if resource exists before closing (guard with if)",
    ],
  },
  "full-syntax": {
    label: "Full Syntax",
    subtitle: "try/except/else/finally",
    icon: <Layers className="h-3.5 w-3.5" />,
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Python supports try/except/else/finally together. The else block runs only when no exception occurred, and finally always runs last. The execution order is: try -> except OR else -> finally.",
    codeSnippet: `def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Error: division by zero")
    else:
        print(f"\${a} / \${b} = \${result}")
    finally:
        print("Operation complete\\n")

divide(10, 3)   # success path
divide(10, 0)   # error path`,
    codeOutput: [
      "10 / 3 = 3.3333333333333335",
      "Operation complete",
      "",
      "Error: division by zero",
      "Operation complete",
    ],
    keyPoints: [
      "try -> except (on error) OR else (on success) -> finally (always)",
      "else runs only when try succeeds with no exception",
      "finally runs after both except and else paths",
      "All four clauses together give full control flow",
    ],
  },
  "finally-vs-with": {
    label: "finally vs with",
    subtitle: "Context Managers",
    icon: <ArrowRightLeft className="h-3.5 w-3.5" />,
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Context managers (the with statement) are the modern Pythonic alternative to try/finally for resource management. They automatically handle cleanup. Use finally for custom logic; use with for standard resources like files and locks.",
    codeSnippet: `# Old way: try/finally
file = open("example.txt", "w")
try:
    file.write("try/finally style")
    print("Written with try/finally")
finally:
    file.close()
    print("Closed with finally")

print("---")

# Modern way: with statement
with open("example.txt", "w") as f:
    f.write("context manager style")
    print("Written with 'with'")
print("Auto-closed by context manager")

# finally still needed for custom cleanup
print("---")
acquired = True
try:
    print(f"Lock acquired: \${acquired}")
    # do critical work...
finally:
    acquired = False
    print(f"Lock released: \${not acquired}")`,
    codeOutput: [
      "Written with try/finally",
      "Closed with finally",
      "---",
      "Written with 'with'",
      "Auto-closed by context manager",
      "---",
      "Lock acquired: True",
      "Lock released: True",
    ],
    keyPoints: [
      "with statement replaces try/finally for files, locks, etc.",
      "Context managers call __enter__ and __exit__ automatically",
      "Use finally when no built-in context manager exists",
      "You can write custom context managers with __enter__/__exit__",
    ],
  },
};

const order: TopicKey[] = ["always-runs", "cleanup", "full-syntax", "finally-vs-with"];

const chipColors: Record<TopicKey, string> = {
  "always-runs": "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  cleanup: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  "full-syntax": "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  "finally-vs-with": "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function FinallyVisualization() {
  const [selected, setSelected] = useState<TopicKey>("always-runs");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python finally Block</CardTitle>
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
                {t.icon}
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
                  exception handling
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
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

            {/* Key points */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Key Points</p>
              <ul className="space-y-1">
                {topic.keyPoints.map((point) => (
                  <li key={point} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">&#x2713;</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
