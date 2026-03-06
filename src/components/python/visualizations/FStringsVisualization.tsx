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
type TopicKey = "basic" | "format-spec" | "debug" | "practical";

interface TopicInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  keyPoints: string[];
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  basic: {
    label: "Basic Usage",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "f-strings (formatted string literals) let you embed Python expressions directly inside string literals using curly braces. Prefix the string with f or F.",
    keyPoints: [
      "Prefix with f or F before the opening quote",
      "Embed any valid expression inside { }",
      "Function calls and method calls work inside braces",
      "Available since Python 3.6",
    ],
    codeSnippet: `# Basic variable interpolation
name = "Alice"
age = 30
print(f"Hello {name}, you are {age} years old!")

# Expressions inside braces
x = 10
y = 5
print(f"{x} + {y} = {x + y}")
print(f"{x} * {y} = {x * y}")

# Function calls inside f-strings
message = "hello world"
print(f"Upper: {message.upper()}")
print(f"Length: {len(message)}")
print(f"Title: {message.title()}")`,
    codeOutput: [
      "Hello Alice, you are 30 years old!",
      "10 + 5 = 15",
      "10 * 5 = 50",
      "Upper: HELLO WORLD",
      "Length: 11",
      "Title: Hello World",
    ],
  },
  "format-spec": {
    label: "Format Spec",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "After the expression you can add a colon : followed by a format specifier to control width, alignment, padding, decimal places, and number formatting.",
    keyPoints: [
      "Use :.2f for 2 decimal places on floats",
      "Use :>10 for right-align, :<10 for left-align, :^10 for center",
      "Use :, for thousands separator",
      "Use :0Nd to zero-pad integers (e.g. :04d)",
    ],
    codeSnippet: `# Float precision
pi = 3.141592653589793
print(f"Default:  {pi}")
print(f"2 decimals: {pi:.2f}")
print(f"6 decimals: {pi:.6f}")

# Alignment and padding
name = "Bob"
print(f"|{name:<10}| left-aligned")
print(f"|{name:>10}| right-aligned")
print(f"|{name:^10}| centered")
print(f"|{name:*^10}| fill with *")

# Number formatting
big = 1234567890
print(f"Thousands: {big:,}")
print(f"Zero-pad:  {42:06d}")
print(f"Percent:   {0.856:.1%}")`,
    codeOutput: [
      "Default:  3.141592653589793",
      "2 decimals: 3.14",
      "6 decimals: 3.141593",
      "|Bob       | left-aligned",
      "|       Bob| right-aligned",
      "|   Bob    | centered",
      "|***Bob****| fill with *",
      "Thousands: 1,234,567,890",
      "Zero-pad:  000042",
      "Percent:   85.6%",
    ],
  },
  debug: {
    label: "Debug (=)",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Python 3.8+ added the = specifier for quick debugging. Writing f'{expr=}' prints both the expression text and its value. Combine with !r for the repr() form.",
    keyPoints: [
      "f'{x=}' outputs x=<value> automatically",
      "Great for quick debugging without typing variable names twice",
      "Combine with format specs: f'{x=:.2f}'",
      "Use !r for repr output: f'{name!r}' adds quotes around strings",
    ],
    codeSnippet: `# Debug specifier (Python 3.8+)
x = 42
y = 3.14
name = "Alice"

print(f"{x=}")
print(f"{y=}")
print(f"{name=}")

# Expressions with =
nums = [1, 2, 3, 4, 5]
print(f"{len(nums)=}")
print(f"{sum(nums)=}")
print(f"{x * 2 + 1=}")

# Combining = with format spec
price = 19.99
print(f"{price=:.1f}")

# repr with !r
greeting = "hello"
print(f"{greeting!r}")
print(f"{greeting=!r}")`,
    codeOutput: [
      "x=42",
      "y=3.14",
      "name='Alice'",
      "len(nums)=5",
      "sum(nums)=15",
      "x * 2 + 1=85",
      "price=20.0",
      "'hello'",
      "greeting='hello'",
    ],
  },
  practical: {
    label: "Practical Examples",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "f-strings are versatile in real-world code: build formatted tables, use multiline f-strings, and embed conditional (ternary) expressions for dynamic output.",
    keyPoints: [
      "Build aligned tables with consistent column widths",
      "Multiline f-strings work with triple quotes",
      "Ternary expressions: f'{\"yes\" if condition else \"no\"}'",
      "Nest f-strings for advanced formatting (Python 3.12+)",
    ],
    codeSnippet: `# Table formatting
header = f"{'Name':<10} {'Score':>6} {'Grade':>6}"
print(header)
print("-" * 24)
students = [("Alice", 95, "A"), ("Bob", 82, "B"), ("Charlie", 71, "C")]
for name, score, grade in students:
    print(f"{name:<10} {score:>6} {grade:>6}")

# Multiline f-string
item = "Widget"
qty = 150
price = 9.99
receipt = f"""
--- Receipt ---
Item:  {item}
Qty:   {qty}
Price: \${price:.2f}
Total: \${qty * price:,.2f}
"""
print(receipt.strip())

# Conditional expression
age = 20
print(f"Status: {'adult' if age >= 18 else 'minor'}")`,
    codeOutput: [
      "Name           Score  Grade",
      "------------------------",
      "Alice             95      A",
      "Bob               82      B",
      "Charlie           71      C",
      "--- Receipt ---",
      "Item:  Widget",
      "Qty:   150",
      "Price: $9.99",
      "Total: $1,498.50",
      "Status: adult",
    ],
  },
};

const order: TopicKey[] = ["basic", "format-spec", "debug", "practical"];

const chipColors: Record<TopicKey, string> = {
  basic: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  "format-spec": "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  debug: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  practical: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function FStringsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("basic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python f-Strings</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Topic selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const chipColor = chipColors[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? chipColor + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {topics[key].label}
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
                  f-string
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Key Points */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Key Points
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {topic.keyPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-current shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Code + Output */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                  {topic.codeSnippet}
                </pre>
              </div>
              <Button size="sm" onClick={() => setOutputLines(topic.codeOutput)}>
                <Play className="h-3.5 w-3.5 mr-1" /> Run
              </Button>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
