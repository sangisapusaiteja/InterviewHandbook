"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Terminal, Keyboard, Type, Settings } from "lucide-react";
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
              <span className="text-zinc-500 select-none mr-2">&gt;</span>
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
type TopicKey = "print" | "input" | "fstring" | "print-options";

interface TopicDemo {
  label: string;
  icon: React.ReactNode;
  category: string;
  color: string;
  badgeColor: string;
  description: string;
  note?: string;
  example: string;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<TopicKey, TopicDemo> = {
  print: {
    label: "print()",
    icon: <Terminal className="h-4 w-4" />,
    category: "Output",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The print() function outputs text to the console. It can accept multiple arguments, automatically separated by spaces, and adds a newline at the end by default.",
    note: "print() can accept any number of arguments of any type.",
    example: `# Basic print
print("Hello, World!")

# Multiple arguments
print("Name:", "Alice", "Age:", 25)

# Printing different types
print(42)
print(3.14)
print(True)
print([1, 2, 3])`,
    output: [
      "Hello, World!",
      "Name: Alice Age: 25",
      "42",
      "3.14",
      "True",
      "[1, 2, 3]",
    ],
  },
  input: {
    label: "input()",
    icon: <Keyboard className="h-4 w-4" />,
    category: "Input",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "The input() function reads a line of text from the user. It always returns a string, so you must convert it to other types (int, float) when needed.",
    note: "input() always returns a str -- use int() or float() to convert.",
    example: `# Basic input with prompt
name = input("Enter your name: ")
print("Hello,", name)

# Converting input to integer
age = int(input("Enter your age: "))
print("Next year you'll be", age + 1)

# Converting input to float
price = float(input("Enter price: "))
tax = price * 0.1
print("Tax:", tax)`,
    output: [
      "Enter your name: Alice",
      "Hello, Alice",
      "Enter your age: 25",
      "Next year you'll be 26",
      "Enter price: 49.99",
      "Tax: 4.999",
    ],
  },
  fstring: {
    label: "Formatted Strings (f-strings)",
    icon: <Type className="h-4 w-4" />,
    category: "Formatting",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "F-strings (formatted string literals) let you embed expressions inside string literals using curly braces {}. They support format specifiers for precision, alignment, and padding.",
    note: "F-strings were introduced in Python 3.6 and are the preferred formatting method.",
    example: `# Basic f-string
name = "Alice"
age = 25
print(f"Name: {name}, Age: {age}")

# Expressions inside f-strings
x, y = 10, 3
print(f"{x} + {y} = {x + y}")
print(f"{x} / {y} = {x / y:.2f}")

# Padding and alignment
print(f"{'left':<15}|")
print(f"{'center':^15}|")
print(f"{'right':>15}|")

# Using .format() method
msg = "Hello, {}! You are {} years old."
print(msg.format("Bob", 30))`,
    output: [
      "Name: Alice, Age: 25",
      "10 + 3 = 13",
      "10 / 3 = 3.33",
      "left           |",
      "    center     |",
      "          right|",
      "Hello, Bob! You are 30 years old.",
    ],
  },
  "print-options": {
    label: "print() Options",
    icon: <Settings className="h-4 w-4" />,
    category: "Advanced Output",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "The print() function has optional parameters: sep (separator between arguments) and end (string appended after the last argument, default is newline).",
    note: "Combine sep and end to control exactly how output appears.",
    example: `# Custom separator
print("2025", "03", "06", sep="-")
print("Alice", "Bob", "Charlie", sep=", ")

# Custom end character
print("Loading", end="")
print("...", end="")
print(" Done!")

# Combining sep and end
print("A", "B", "C", sep=" -> ", end=" [END]\\n")

# Printing to multiple lines elegantly
for i in range(1, 4):
    print(f"Item {i}", end=" | ")
print()`,
    output: [
      "2025-03-06",
      "Alice, Bob, Charlie",
      "Loading... Done!",
      "A -> B -> C [END]",
      "Item 1 | Item 2 | Item 3 | ",
    ],
  },
};

const order: TopicKey[] = ["print", "input", "fstring", "print-options"];

// ─── Main export ──────────────────────────────────────────────────────────────
export function InputOutputVisualization() {
  const [selected, setSelected] = useState<TopicKey>("print");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Input &amp; Output</CardTitle>
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
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  selected === key
                    ? d.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {d.icon}
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
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-mono">{demo.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                  {demo.category}
                </Badge>
              </div>
            </div>
            <p className="text-sm leading-relaxed">{demo.description}</p>
            {demo.note && <p className="text-xs opacity-80 italic">{demo.note}</p>}
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

        {/* Quick reference table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Quick Reference
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Function / Syntax</span>
              <span>Purpose</span>
              <span>Example</span>
            </div>
            {([
              { fn: "print()", purpose: "Display output to console", ex: 'print("Hello")' },
              { fn: "input()", purpose: "Read user input as string", ex: 'input("Name: ")' },
              { fn: 'f"...{expr}"', purpose: "Embed expressions in strings", ex: 'f"Hi {name}"' },
              { fn: ".format()", purpose: "Format string with placeholders", ex: '"{}".format(x)' },
              { fn: "sep=", purpose: "Custom separator in print()", ex: 'print(a, b, sep="-")' },
              { fn: "end=", purpose: "Custom ending in print()", ex: 'print(x, end="")' },
            ]).map((row) => (
              <div
                key={row.fn}
                className="grid grid-cols-3 px-3 py-2.5 border-t hover:bg-muted/40 transition-colors"
              >
                <code className="font-mono text-[11px] font-semibold text-primary">{row.fn}</code>
                <span className="text-muted-foreground">{row.purpose}</span>
                <code className="font-mono text-[11px] text-muted-foreground">{row.ex}</code>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
