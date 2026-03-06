"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Code2 } from "lucide-react";
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
type SyntaxKey = "indentation" | "statements" | "line-continuation" | "multiple-statements";

interface SyntaxDemo {
  label: string;
  category: string;
  color: string;
  badgeColor: string;
  description: string;
  note: string;
  example: string;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<SyntaxKey, SyntaxDemo> = {
  indentation: {
    label: "Indentation",
    category: "Block Structure",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Python uses indentation (whitespace) to define code blocks instead of curly braces. Consistent indentation is mandatory — mixing tabs and spaces causes errors.",
    note: "PEP 8 recommends 4 spaces per indentation level.",
    example: `x = 10

if x > 5:
    print("x is greater than 5")
    if x > 8:
        print("x is also greater than 8")

for i in range(3):
    print(f"  loop index: {i}")

print("done")`,
    output: [
      "x is greater than 5",
      "x is also greater than 8",
      "  loop index: 0",
      "  loop index: 1",
      "  loop index: 2",
      "done",
    ],
  },
  statements: {
    label: "Statements",
    category: "Basics",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "In Python, each statement typically occupies its own line. There is no semicolon required at the end. Statements include assignments, function calls, control flow, and more.",
    note: "One statement per line keeps code readable and Pythonic.",
    example: `# assignment statements
name = "Alice"
age = 30

# expression statement
print(f"Hello, {name}!")
print(f"Age: {age}")

# conditional statement
if age >= 18:
    print("Adult")

# del statement
temp = 99
del temp
print("temp deleted")`,
    output: [
      "Hello, Alice!",
      "Age: 30",
      "Adult",
      "temp deleted",
    ],
  },
  "line-continuation": {
    label: "Line Continuation",
    category: "Multi-line",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Long lines can be split using a backslash (\\) for explicit continuation, or implicitly inside parentheses, brackets, and braces.",
    note: "Implicit continuation inside (), [], {} is preferred over backslash.",
    example: `# explicit continuation with backslash
total = 1 + 2 + 3 + \\
        4 + 5 + 6
print(f"total: {total}")

# implicit continuation in parentheses
result = (
    "Hello"
    " "
    "World"
)
print(f"result: {result}")

# implicit continuation in list
colors = [
    "red", "green",
    "blue", "yellow"
]
print(f"colors: {colors}")`,
    output: [
      "total: 21",
      "result: Hello World",
      'colors: [\'red\', \'green\', \'blue\', \'yellow\']',
    ],
  },
  "multiple-statements": {
    label: "Multiple Statements",
    category: "One-liners",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Multiple statements can be placed on a single line separated by semicolons. This is valid Python but generally discouraged for readability.",
    note: "PEP 8 discourages multiple statements on one line — use sparingly.",
    example: `# semicolons allow multiple statements per line
a = 1; b = 2; c = 3
print(f"a={a}, b={b}, c={c}")

# common in quick assignments
x = 10; y = 20
print(f"sum: {x + y}")

# comparison: preferred style
name = "Bob"
greeting = f"Hi, {name}"
print(greeting)`,
    output: [
      "a=1, b=2, c=3",
      "sum: 30",
      "Hi, Bob",
    ],
  },
};

const order: SyntaxKey[] = [
  "indentation",
  "statements",
  "line-continuation",
  "multiple-statements",
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function SyntaxVisualization() {
  const [selected, setSelected] = useState<SyntaxKey>("indentation");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: SyntaxKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Code2 className="h-5 w-5" />
          Python Syntax
        </CardTitle>
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
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-mono">{demo.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                  {demo.category}
                </Badge>
              </div>
            </div>
            <p className="text-sm leading-relaxed">{demo.description}</p>
            <p className="text-xs opacity-80 italic">{demo.note}</p>
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
      </CardContent>
    </Card>
  );
}
