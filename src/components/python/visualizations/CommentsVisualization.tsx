"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Hash, FileText, BookOpen, CheckCircle } from "lucide-react";
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
type CommentKey = "single-line" | "multi-line" | "docstrings" | "best-practices";

interface CommentDemo {
  label: string;
  icon: React.ReactNode;
  color: string;
  badgeColor: string;
  category: string;
  description: string;
  note?: string;
  example: string;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<CommentKey, CommentDemo> = {
  "single-line": {
    label: "Single-line (#)",
    icon: <Hash className="h-3.5 w-3.5" />,
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    category: "Basic",
    description:
      "Single-line comments start with the # symbol. Everything after # on that line is ignored by the Python interpreter.",
    note: "Use single-line comments for brief explanations of code logic.",
    example: `# This is a single-line comment
name = "Alice"  # Inline comment after code

# Calculate the total price
price = 29.99
tax_rate = 0.08  # 8% sales tax
total = price * (1 + tax_rate)

# Print the result
print("Name:", name)
print("Total: $" + str(round(total, 2)))`,
    output: ["Name: Alice", "Total: $32.39"],
  },
  "multi-line": {
    label: 'Multi-line (""")',
    icon: <FileText className="h-3.5 w-3.5" />,
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    category: "Multi-line",
    description:
      "Python has no dedicated multi-line comment syntax. You can use consecutive # lines or triple-quoted strings as a workaround.",
    note: "Triple-quoted strings not assigned to a variable are ignored at runtime, but they are not true comments.",
    example: `# Method 1: Multiple single-line comments
# This function calculates
# the area of a rectangle
# given width and height

# Method 2: Triple-quoted string (not a true comment)
"""
This block of text is a string literal
that is not assigned to any variable,
so Python will ignore it at runtime.
"""

width = 5
height = 10
area = width * height
print("Area:", area)
print("Comments don't produce output!")`,
    output: ["Area: 50", "Comments don't produce output!"],
  },
  "docstrings": {
    label: "Docstrings",
    icon: <BookOpen className="h-3.5 w-3.5" />,
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    category: "Documentation",
    description:
      "Docstrings are triple-quoted strings placed as the first statement in a module, class, or function. They are accessible at runtime via __doc__.",
    note: "Docstrings are the Pythonic way to document your code. Tools like Sphinx use them to generate documentation.",
    example: `def calculate_bmi(weight, height):
    """
    Calculate Body Mass Index (BMI).

    Args:
        weight: Weight in kilograms.
        height: Height in meters.

    Returns:
        BMI value as a float.
    """
    return weight / (height ** 2)

class Circle:
    """Represents a circle with a given radius."""

    def __init__(self, radius):
        """Initialize the circle with a radius."""
        self.radius = radius

bmi = calculate_bmi(70, 1.75)
print("BMI:", round(bmi, 1))
print("Docstring:", calculate_bmi.__doc__.strip().split("\\n")[0])
print("Class doc:", Circle.__doc__)`,
    output: [
      "BMI: 22.9",
      "Docstring: Calculate Body Mass Index (BMI).",
      "Class doc: Represents a circle with a given radius.",
    ],
  },
  "best-practices": {
    label: "Best Practices",
    icon: <CheckCircle className="h-3.5 w-3.5" />,
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    category: "Guidelines",
    description:
      "Good comments explain WHY, not WHAT. The code itself should be readable enough to show what it does. Avoid redundant or misleading comments.",
    note: "Follow PEP 8: comments should be complete sentences and start with a capital letter.",
    example: `# --- BAD commenting (redundant) ---
# Set x to 5
x = 5
# Increment x by 1
x = x + 1

# --- GOOD commenting (explains why) ---
# Use retry limit of 5 to avoid infinite loops
# in case the API is temporarily unavailable
max_retries = 5

# Convert to cents to avoid floating-point
# precision issues in financial calculations
price_cents = int(19.99 * 100)

print("max_retries:", max_retries)
print("price_cents:", price_cents)
print("price_dollars: $" + str(price_cents / 100))`,
    output: [
      "max_retries: 5",
      "price_cents: 1999",
      "price_dollars: $19.99",
    ],
  },
};

const order: CommentKey[] = ["single-line", "multi-line", "docstrings", "best-practices"];

// ─── Main export ──────────────────────────────────────────────────────────────
export function CommentsVisualization() {
  const [selected, setSelected] = useState<CommentKey>("single-line");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: CommentKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Comments</CardTitle>
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

        {/* Quick Reference */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Comment Syntax Quick Reference
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Syntax</span>
              <span>Purpose</span>
              <span>Scope</span>
            </div>
            {([
              { syntax: "# comment", purpose: "Single-line comment", scope: "Rest of the line", key: "single-line" as CommentKey },
              { syntax: '"""..."""', purpose: "Multi-line string (workaround)", scope: "Between triple quotes", key: "multi-line" as CommentKey },
              { syntax: 'def fn():\n  """..."""', purpose: "Docstring", scope: "First statement in body", key: "docstrings" as CommentKey },
              { syntax: "# inline", purpose: "Inline comment", scope: "After code on same line", key: "single-line" as CommentKey },
            ]).map((row, idx) => {
              const isSelected = selected === row.key;
              return (
                <motion.div
                  key={`ref-${idx}`}
                  onClick={() => handleSelect(row.key)}
                  animate={{ backgroundColor: isSelected ? "hsl(var(--primary) / 0.08)" : "transparent" }}
                  transition={{ duration: 0.15 }}
                  className={`grid grid-cols-3 px-3 py-2.5 border-t cursor-pointer hover:bg-muted/40 transition-colors ${isSelected ? "font-semibold" : ""}`}
                >
                  <code className={`font-mono text-[11px] whitespace-pre ${isSelected ? "text-primary" : ""}`}>
                    {row.syntax}
                  </code>
                  <span className="text-muted-foreground">{row.purpose}</span>
                  <span className="text-muted-foreground">{row.scope}</span>
                </motion.div>
              );
            })}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Python only has one true comment syntax: <code className="font-mono">#</code>. Triple-quoted strings are string literals, not comments, but are commonly used as multi-line comment workarounds.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
