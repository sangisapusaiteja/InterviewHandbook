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
type StringKey = "create-index" | "slicing" | "operations" | "escape-raw";

interface StringDemo {
  label: string;
  description: string;
  color: string;
  badgeColor: string;
  code: string;
  keyPoints: string[];
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<StringKey, StringDemo> = {
  "create-index": {
    label: "Create & Index",
    description:
      "Strings can be created with single quotes, double quotes, or triple quotes for multiline. Each character is accessible by its index position, including negative indices that count from the end.",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    code: `s1 = 'hello'
s2 = "world"
s3 = """triple
quoted"""

print(s1)            # hello
print(s2)            # world
print(s3)            # triple\\nquoted

print(s1[0])         # h
print(s1[-1])        # o
print(len(s1))       # 5
print(type(s1))      # <class 'str'>`,
    keyPoints: [
      "Single quotes and double quotes are interchangeable",
      "Triple quotes allow multiline strings",
      "s[0] returns the first character",
      "s[-1] returns the last character",
      "len() returns the number of characters",
    ],
    output: [
      "hello",
      "world",
      "triple\nquoted",
      "h",
      "o",
      "5",
      "<class 'str'>",
    ],
  },
  slicing: {
    label: "Slicing",
    description:
      "Slicing extracts a substring using s[start:stop:step]. The start index is inclusive and stop is exclusive. Negative indices and steps enable powerful substring extraction and reversal.",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    code: `s = "Python"

print(s[1:4])        # yth
print(s[:3])         # Pyt
print(s[3:])         # hon
print(s[::2])        # Pto
print(s[::-1])       # nohtyP

print(s[-3:])        # hon
print(s[:-2])        # Pyth
print(s[-4:-1])      # tho`,
    keyPoints: [
      "s[start:stop] -- stop is exclusive",
      "s[::2] takes every 2nd character",
      "s[::-1] reverses the string",
      "Omitting start defaults to 0, omitting stop defaults to len(s)",
      "Negative indices count from the end",
    ],
    output: [
      "yth",
      "Pyt",
      "hon",
      "Pto",
      "nohtyP",
      "hon",
      "Pyth",
      "tho",
    ],
  },
  operations: {
    label: "Operations",
    description:
      "Strings support concatenation with +, repetition with *, membership testing with in, and lexicographic comparison with standard comparison operators.",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    code: `a = "Hello"
b = "World"

# Concatenation
print(a + " " + b)       # Hello World

# Repetition
print("ha" * 3)           # hahaha

# Membership
print("ell" in a)         # True
print("xyz" not in a)     # True

# Comparison (lexicographic)
print("apple" < "banana") # True
print("abc" == "abc")     # True
print("Zen" > "Art")      # True`,
    keyPoints: [
      "+ concatenates two strings into a new one",
      "* repeats a string n times",
      "in checks if a substring exists",
      "Comparison is lexicographic (dictionary order)",
      "All operations return new strings (strings are immutable)",
    ],
    output: [
      "Hello World",
      "hahaha",
      "True",
      "True",
      "True",
      "True",
      "True",
    ],
  },
  "escape-raw": {
    label: "Escape & Raw",
    description:
      "Escape characters use a backslash to represent special characters like newlines and tabs. Raw strings (prefixed with r) treat backslashes as literal characters, useful for regex and file paths.",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    code: `# Escape characters
print("Line1\\nLine2")     # Line1 (newline) Line2
print("Col1\\tCol2")       # Col1 (tab) Col2
print("She said \\"hi\\"")  # She said "hi"
print("Back\\\\slash")      # Back\\slash

# Raw strings
print(r"no\\nnewline")    # no\\nnewline
print(r"C:\\Users\\path")  # C:\\Users\\path

# Multiline string
msg = """Hello
World
!"""
print(msg)`,
    keyPoints: [
      "\\n is newline, \\t is tab, \\\\ is literal backslash",
      "\\\" and \\' escape quote characters inside strings",
      "r'...' raw strings ignore escape sequences",
      "Raw strings are ideal for regex and Windows file paths",
      "Triple quotes preserve line breaks naturally",
    ],
    output: [
      "Line1",
      "Line2",
      "Col1\tCol2",
      'She said "hi"',
      "Back\\slash",
      "no\\nnewline",
      "C:\\Users\\path",
      "Hello",
      "World",
      "!",
    ],
  },
};

const order: StringKey[] = ["create-index", "slicing", "operations", "escape-raw"];

// ─── Main export ──────────────────────────────────────────────────────────────
export function StringsVisualization() {
  const [selected, setSelected] = useState<StringKey>("create-index");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: StringKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Strings</CardTitle>
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
                Strings
              </Badge>
            </div>
            <p className="text-sm leading-relaxed">{demo.description}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {demo.keyPoints.map((point) => (
                <Badge
                  key={point}
                  variant="outline"
                  className="text-[10px] font-normal"
                >
                  {point}
                </Badge>
              ))}
            </div>
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
