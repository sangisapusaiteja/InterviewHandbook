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
type TopicKey = "open" | "modes" | "with" | "encoding";

interface TopicInfo {
  label: string;
  subtitle: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
  keyPoints: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  open: {
    label: "open() Basics",
    subtitle: "File Object",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The built-in open() function creates a file object. It takes a file path and a mode string. Always close the file when done to free system resources. The file object supports iteration, reading, and writing depending on the mode.",
    codeSnippet: `# Open a file for writing, then read it back
f = open("demo.txt", "w")
f.write("Hello, Python!\\n")
f.write("File handling is easy.\\n")
f.close()

# Open for reading (default mode)
f = open("demo.txt", "r")
content = f.read()
print(content)
f.close()

# Check if file is closed
print(f"Closed: {f.closed}")

# Read lines into a list
f = open("demo.txt", "r")
lines = f.readlines()
print(f"Lines: {lines}")
f.close()`,
    codeOutput: [
      "Hello, Python!",
      "File handling is easy.",
      "",
      "Closed: True",
      "Lines: ['Hello, Python!\\n', 'File handling is easy.\\n']",
    ],
    keyPoints: [
      "open(path, mode) returns a file object",
      "Always call .close() when finished to release resources",
      ".read() returns entire content as a string",
      ".readlines() returns a list of lines",
    ],
  },
  modes: {
    label: "File Modes",
    subtitle: "r/w/a/x/b",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "The mode parameter controls how a file is opened. Text modes (r, w, a, x) work with strings. Binary modes (rb, wb) work with bytes. Choosing the correct mode prevents data loss — 'w' truncates existing files, while 'a' appends to them.",
    codeSnippet: `# 'w' mode — write (truncates if exists)
f = open("modes.txt", "w")
f.write("First write\\n")
f.close()

# 'a' mode — append to existing content
f = open("modes.txt", "a")
f.write("Appended line\\n")
f.close()

# 'r' mode — read (default)
f = open("modes.txt", "r")
print(f.read())
f.close()

# 'x' mode — exclusive create (fails if exists)
import os
if os.path.exists("exclusive.txt"):
    os.remove("exclusive.txt")
f = open("exclusive.txt", "x")
f.write("Created exclusively\\n")
f.close()

# 'rb' mode — read binary
f = open("modes.txt", "rb")
raw = f.read()
print(f"Bytes: {raw[:20]}")
f.close()`,
    codeOutput: [
      "First write",
      "Appended line",
      "",
      "Bytes: b'First write\\nAppen'",
    ],
    keyPoints: [
      "'r' — read only (default), file must exist",
      "'w' — write only, creates or truncates the file",
      "'a' — append only, creates if missing, preserves content",
      "'x' — exclusive create, fails with FileExistsError if file exists",
      "'rb'/'wb' — binary read/write for non-text files (images, etc.)",
    ],
  },
  with: {
    label: "with Statement",
    subtitle: "Context Manager",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "The with statement uses a context manager to automatically close the file when the block exits — even if an exception occurs. This is the preferred way to handle files in Python because it prevents resource leaks and makes code cleaner.",
    codeSnippet: `# Preferred: with statement auto-closes
with open("context.txt", "w") as f:
    f.write("Line 1\\n")
    f.write("Line 2\\n")
# f is automatically closed here
print(f"Closed after with: {f.closed}")

# Reading with context manager
with open("context.txt", "r") as f:
    for line in f:
        print(line.strip())

# Multiple files at once
with open("context.txt", "r") as src, \\
     open("copy.txt", "w") as dst:
    dst.write(src.read())

with open("copy.txt", "r") as f:
    print(f"Copy: {f.read().strip()}")

# Exception safety demo
try:
    with open("context.txt", "r") as f:
        content = f.read()
        raise ValueError("Something went wrong")
except ValueError:
    print(f"File still closed: {f.closed}")`,
    codeOutput: [
      "Closed after with: True",
      "Line 1",
      "Line 2",
      "Copy: Line 1",
      "Line 2",
      "File still closed: True",
    ],
    keyPoints: [
      "with open(...) as f: guarantees file is closed on exit",
      "Works even if an exception is raised inside the block",
      "Can open multiple files in a single with statement",
      "Preferred over manual open()/close() in all cases",
    ],
  },
  encoding: {
    label: "Encoding",
    subtitle: "utf-8 / binary",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Text files are decoded using an encoding (default varies by OS). Always specify encoding='utf-8' for portability. Binary mode ('rb'/'wb') skips encoding entirely and works with raw bytes — essential for images, PDFs, and other non-text formats.",
    codeSnippet: `# Explicit UTF-8 encoding (recommended)
with open("utf8.txt", "w", encoding="utf-8") as f:
    f.write("Hello World\\n")
    f.write("Unicode: cafe\\u0301\\n")

with open("utf8.txt", "r", encoding="utf-8") as f:
    print(f.read())

# Check default encoding
import locale
print(f"Default: {locale.getpreferredencoding()}")

# Binary mode — no encoding applied
with open("utf8.txt", "rb") as f:
    raw = f.read()
    print(f"Type: {type(raw)}")
    print(f"Bytes: {raw[:25]}")

# Encoding errors
try:
    with open("utf8.txt", "r", encoding="ascii") as f:
        f.read()
except UnicodeDecodeError as e:
    print(f"Error: {e.reason}")

# Handle with errors='replace'
with open("utf8.txt", "r", encoding="ascii",
          errors="replace") as f:
    print(f"Replaced: {f.read().strip()[:30]}")`,
    codeOutput: [
      "Hello World",
      "Unicode: cafe\u0301",
      "",
      "Default: UTF-8",
      "Type: <class 'bytes'>",
      "Bytes: b'Hello World\\nUnicode'",
      "Error: 'ascii' codec can't decode byte",
      "Replaced: Hello World\\nUnicode: caf???",
    ],
    keyPoints: [
      "Always pass encoding='utf-8' for cross-platform safety",
      "Default encoding varies by OS (UTF-8 on Linux/macOS, cp1252 on Windows)",
      "Binary mode ('rb'/'wb') returns bytes, not str",
      "errors='replace' or 'ignore' handles decoding failures gracefully",
    ],
  },
};

const order: TopicKey[] = ["open", "modes", "with", "encoding"];

const chipColors: Record<TopicKey, string> = {
  open: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  modes: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  with: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  encoding: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── File Modes Reference ─────────────────────────────────────────────────────
const fileModes = [
  { mode: "r", type: "Text", description: "Read only (default). File must exist." },
  { mode: "w", type: "Text", description: "Write only. Creates or truncates." },
  { mode: "a", type: "Text", description: "Append only. Creates if missing." },
  { mode: "x", type: "Text", description: "Exclusive create. Fails if exists." },
  { mode: "r+", type: "Text", description: "Read and write. File must exist." },
  { mode: "w+", type: "Text", description: "Read and write. Creates or truncates." },
  { mode: "rb", type: "Binary", description: "Read bytes. For images, PDFs, etc." },
  { mode: "wb", type: "Binary", description: "Write bytes. Creates or truncates." },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function FileHandlingVisualization() {
  const [selected, setSelected] = useState<TopicKey>("open");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">File Handling Basics</CardTitle>
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
                {t.label}
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
                  {topic.subtitle}
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Key Points */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Key Points</p>
              <div className="rounded-xl border bg-muted/20 px-4 py-3">
                <ul className="space-y-1.5">
                  {topic.keyPoints.map((point, idx) => (
                    <motion.li
                      key={`kp-${selected}-${idx}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                      className="flex items-start gap-2 text-xs"
                    >
                      <span className="text-muted-foreground select-none mt-0.5">&#x2022;</span>
                      <span className="text-foreground/80">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
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

        {/* File Modes Reference Table */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-semibold text-muted-foreground">File Modes Reference</p>
          <div className="rounded-xl border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/40">
                  <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Mode</th>
                  <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Type</th>
                  <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Description</th>
                </tr>
              </thead>
              <tbody>
                {fileModes.map((fm) => (
                  <tr key={`mode-${fm.mode}`} className="border-t border-border/50">
                    <td className="px-3 py-2">
                      <code className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {`"${fm.mode}"`}
                      </code>
                    </td>
                    <td className="px-3 py-2">
                      <Badge
                        variant="secondary"
                        className={`text-[10px] ${
                          fm.type === "Binary"
                            ? "bg-violet-500/20 text-violet-700 dark:text-violet-300"
                            : "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                        }`}
                      >
                        {fm.type}
                      </Badge>
                    </td>
                    <td className="px-3 py-2 text-foreground/80">{fm.description}</td>
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
