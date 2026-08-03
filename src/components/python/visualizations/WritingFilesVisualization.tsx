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
type TopicKey = "write-writelines" | "write-vs-append" | "print-to-file" | "safe-writing";

interface TopicDemo {
  label: string;
  description: string;
  color: string;
  badgeColor: string;
  category: string;
  keyPoints: string[];
  code: string;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<TopicKey, TopicDemo> = {
  "write-writelines": {
    label: "write() & writelines()",
    description:
      "The write() method writes a single string to a file, while writelines() writes a list of strings. Neither method adds newline characters automatically -- you must include them yourself.",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    category: "Core Methods",
    keyPoints: [
      "write(str) writes a single string and returns the number of characters written",
      "writelines(list) writes each string in the list sequentially",
      "Neither write() nor writelines() adds newline characters automatically",
      "You must include \\n explicitly in your strings for line breaks",
      "Both methods work with text mode ('w', 'a') and binary mode ('wb', 'ab')",
    ],
    code: `# write() -- single string at a time
with open("output.txt", "w") as f:
    f.write("Hello, World!\\n")
    chars = f.write("Python is great!\\n")
    print(f"Wrote \${chars} characters")

# writelines() -- list of strings
lines = ["Line 1\\n", "Line 2\\n", "Line 3\\n"]
with open("output.txt", "w") as f:
    f.writelines(lines)

# Read back to verify
with open("output.txt") as f:
    print(f.read())`,
    output: [
      "Wrote 17 characters",
      "Line 1",
      "Line 2",
      "Line 3",
    ],
  },
  "write-vs-append": {
    label: "Write vs Append",
    description:
      "Opening a file with 'w' mode truncates it (erases all content) before writing. The 'a' mode appends to the end without erasing. The 'x' mode creates a new file exclusively and raises an error if it already exists.",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    category: "File Modes",
    keyPoints: [
      "'w' mode truncates the file -- all existing content is erased",
      "'a' mode appends to the end, preserving existing content",
      "'x' mode creates exclusively -- raises FileExistsError if file exists",
      "'w+' and 'a+' enable both reading and writing",
      "Always use 'with' statement to ensure the file is properly closed",
    ],
    code: `# 'w' mode -- truncates and writes
with open("log.txt", "w") as f:
    f.write("First entry\\n")

# 'a' mode -- appends to existing
with open("log.txt", "a") as f:
    f.write("Second entry\\n")
    f.write("Third entry\\n")

# 'x' mode -- exclusive creation
try:
    with open("log.txt", "x") as f:
        f.write("This won't work")
except FileExistsError:
    print("File already exists!")

# Verify contents
with open("log.txt") as f:
    print(f.read())`,
    output: [
      "File already exists!",
      "First entry",
      "Second entry",
      "Third entry",
    ],
  },
  "print-to-file": {
    label: "print() to File",
    description:
      "Python's print() function accepts a file parameter that redirects output to any file object. This is convenient for formatted output since print() automatically adds newlines and handles string conversion.",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    category: "Formatted Output",
    keyPoints: [
      "print(text, file=f) writes to a file instead of stdout",
      "print() automatically adds a newline (configurable with end=)",
      "Multiple arguments are separated by spaces (configurable with sep=)",
      "Handles non-string types via automatic str() conversion",
      "Great for quick logging and formatted file output",
    ],
    code: `# Basic print to file
with open("report.txt", "w") as f:
    print("=== Sales Report ===", file=f)
    print("Item", "Qty", "Price", sep="\\t", file=f)
    print("Widget", 100, 9.99, sep="\\t", file=f)
    print("Gadget", 50, 24.99, sep="\\t", file=f)
    print("=" * 20, file=f, end="\\n\\n")
    print("Total items:", 150, file=f)

# Read back the report
with open("report.txt") as f:
    for line in f:
        print(line, end="")`,
    output: [
      "=== Sales Report ===",
      "Item\tQty\tPrice",
      "Widget\t100\t9.99",
      "Gadget\t50\t24.99",
      "====================",
      "",
      "Total items: 150",
    ],
  },
  "safe-writing": {
    label: "Safe Writing",
    description:
      "Safe writing patterns prevent data loss from crashes or concurrent access. The temp file + rename pattern ensures atomic writes -- either the entire write succeeds or the original file remains untouched.",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    category: "Best Practices",
    keyPoints: [
      "Write to a temp file then rename for atomic file updates",
      "flush() forces Python's buffer to the OS, fsync() forces OS to disk",
      "os.replace() is atomic on most filesystems (POSIX guarantee)",
      "Use tempfile module for secure temporary file creation",
      "This pattern prevents corrupted files from partial writes or crashes",
    ],
    code: `import os
import tempfile

data = "Important data\\nMust not be lost\\n"

# Atomic write: temp file + rename
def safe_write(path, content):
    dir_name = os.path.dirname(path) or "."
    fd, tmp = tempfile.mkstemp(dir=dir_name)
    try:
        with os.fdopen(fd, "w") as f:
            f.write(content)
            f.flush()
            os.fsync(f.fileno())
        os.replace(tmp, path)
        print(f"Safely wrote to {path}")
    except:
        os.unlink(tmp)
        raise

safe_write("config.txt", data)

# Verify
with open("config.txt") as f:
    print(f.read())`,
    output: [
      "Safely wrote to config.txt",
      "Important data",
      "Must not be lost",
    ],
  },
};

const order: TopicKey[] = ["write-writelines", "write-vs-append", "print-to-file", "safe-writing"];

// ─── Main export ──────────────────────────────────────────────────────────────
export function WritingFilesVisualization() {
  const [selected, setSelected] = useState<TopicKey>("write-writelines");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Writing Files in Python</CardTitle>
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
                {demo.category}
              </Badge>
            </div>
            <p className="text-sm leading-relaxed">{demo.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Key Points */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Key Points
          </p>
          <AnimatePresence mode="wait">
            <motion.ul
              key={selected}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-1.5"
            >
              {demo.keyPoints.map((point) => (
                <li key={`kp-${selected}-${point}`} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-current shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

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
