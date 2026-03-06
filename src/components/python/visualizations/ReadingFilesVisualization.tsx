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
type TopicKey = "read" | "iteration" | "tellseek" | "pathlib";

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
  read: {
    label: "read() Methods",
    subtitle: "Full & Partial",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Python provides several methods for reading file contents. read() returns the entire file as a single string, read(n) reads exactly n characters, readline() reads one line at a time, and readlines() returns a list of all lines. Choose based on file size and processing needs.",
    codeSnippet: `# Assume 'data.txt' contains:
# Hello World
# Python is great
# File I/O rocks

# read() — entire file as one string
with open("data.txt") as f:
    content = f.read()
    print(f"read(): {repr(content[:30])}...")

# read(n) — first n characters
with open("data.txt") as f:
    chunk = f.read(11)
    print(f"read(11): {repr(chunk)}")

# readline() — one line at a time
with open("data.txt") as f:
    first = f.readline().strip()
    second = f.readline().strip()
    print(f"readline(): '{first}', '{second}'")

# readlines() — list of all lines
with open("data.txt") as f:
    lines = f.readlines()
    print(f"readlines(): {len(lines)} lines")
    print(f"  lines[0]: {repr(lines[0])}")`,
    codeOutput: [
      "read(): 'Hello World\\nPython is gre'...",
      "read(11): 'Hello World'",
      "readline(): 'Hello World', 'Python is great'",
      "readlines(): 3 lines",
      "  lines[0]: 'Hello World\\n'",
    ],
    keyPoints: [
      "read() — loads entire file into memory as a string",
      "read(n) — reads exactly n characters from current position",
      "readline() — reads one line including the trailing newline",
      "readlines() — returns a list of all lines (each includes \\n)",
    ],
  },
  iteration: {
    label: "Iteration",
    subtitle: "Line-by-Line",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Iterating over a file object with a for loop is the most memory-efficient way to read a file line by line. Python streams one line at a time from disk, making it ideal for large files that don't fit in memory. You can also combine it with enumerate() for line numbers.",
    codeSnippet: `# for line in file — most memory efficient
with open("data.txt") as f:
    for line in f:
        print(f"| {line.strip()}")

print("---")

# With enumerate for line numbers
with open("data.txt") as f:
    for num, line in enumerate(f, start=1):
        print(f"L{num}: {line.strip()}")

print("---")

# Process and collect — filter lines
with open("data.txt") as f:
    long_lines = [
        line.strip() for line in f
        if len(line.strip()) > 12
    ]
    print(f"Long lines: {long_lines}")`,
    codeOutput: [
      "| Hello World",
      "| Python is great",
      "| File I/O rocks",
      "---",
      "L1: Hello World",
      "L2: Python is great",
      "L3: File I/O rocks",
      "---",
      "Long lines: ['Python is great', 'File I/O rocks']",
    ],
    keyPoints: [
      "for line in file — streams one line at a time, O(1) memory",
      "Most memory-efficient approach for large files",
      "Combine with enumerate() for line numbering",
      "Use list comprehensions for filtering while iterating",
    ],
  },
  tellseek: {
    label: "tell() & seek()",
    subtitle: "Cursor Control",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "tell() returns the current position of the file cursor (in bytes), and seek(offset, whence) moves it. whence=0 means from the start, 1 from current position, and 2 from the end. This allows random access and re-reading portions of a file.",
    codeSnippet: `with open("data.txt") as f:
    # Initial position
    print(f"Start position: {f.tell()}")

    # Read first 5 characters
    chunk = f.read(5)
    print(f"Read: {repr(chunk)}")
    print(f"After read(5): {f.tell()}")

    # Seek back to the beginning
    f.seek(0)
    print(f"After seek(0): {f.tell()}")

    # Re-read from start
    again = f.read(5)
    print(f"Re-read: {repr(again)}")

    # Seek to a specific position
    f.seek(12)
    rest = f.readline().strip()
    print(f"From pos 12: '{rest}'")

    # Seek from end (binary mode needed)
with open("data.txt", "rb") as f:
    f.seek(-6, 2)  # 6 bytes before end
    tail = f.read().decode().strip()
    print(f"Last 6 bytes: '{tail}'")`,
    codeOutput: [
      "Start position: 0",
      "Read: 'Hello'",
      "After read(5): 5",
      "After seek(0): 0",
      "Re-read: 'Hello'",
      "From pos 12: 'Python is great'",
      "Last 6 bytes: 'rocks'",
    ],
    keyPoints: [
      "tell() — returns current cursor position in bytes",
      "seek(0) — jump back to the start of the file",
      "seek(offset, 2) — seek from end (requires binary mode)",
      "Enables random access and re-reading portions of files",
    ],
  },
  pathlib: {
    label: "pathlib",
    subtitle: "Modern Approach",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "The pathlib module (Python 3.4+) provides an object-oriented interface for filesystem paths. Path.read_text() and Path.read_bytes() are convenient one-liners that handle opening and closing the file automatically. This is the modern, recommended approach for simple file reads.",
    codeSnippet: `from pathlib import Path

# Read entire file as text
path = Path("data.txt")
content = path.read_text()
print(f"read_text(): {repr(content[:30])}...")

# Read as bytes
raw = path.read_bytes()
print(f"read_bytes(): {raw[:20]}")
print(f"Type: {type(raw).__name__}")

# Check file properties
print(f"Exists: {path.exists()}")
print(f"Size: {path.stat().st_size} bytes")
print(f"Suffix: {path.suffix}")
print(f"Name: {path.name}")

# Read with encoding
text = path.read_text(encoding="utf-8")
lines = text.splitlines()
print(f"Lines: {len(lines)}")
print(f"First: '{lines[0]}'")

# Combine with parent / child paths
config = Path.home() / ".config" / "app.conf"
print(f"Config path: {config}")`,
    codeOutput: [
      "read_text(): 'Hello World\\nPython is gre'...",
      "read_bytes(): b'Hello World\\nPytho'",
      "Type: bytes",
      "Exists: True",
      "Size: 45 bytes",
      "Suffix: .txt",
      "Name: data.txt",
      "Lines: 3",
      "First: 'Hello World'",
      "Config path: /home/user/.config/app.conf",
    ],
    keyPoints: [
      "Path.read_text() — reads entire file as string, auto-closes",
      "Path.read_bytes() — reads as bytes for binary files",
      "Supports encoding parameter: read_text(encoding='utf-8')",
      "Modern, Pythonic approach — recommended over open() for simple reads",
    ],
  },
};

const order: TopicKey[] = ["read", "iteration", "tellseek", "pathlib"];

const chipColors: Record<TopicKey, string> = {
  read: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  iteration: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  tellseek: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  pathlib: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function ReadingFilesVisualization() {
  const [selected, setSelected] = useState<TopicKey>("read");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Reading Files in Python</CardTitle>
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
      </CardContent>
    </Card>
  );
}
