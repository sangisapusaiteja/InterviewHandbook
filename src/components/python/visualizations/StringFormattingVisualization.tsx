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
type FormatKey = "percent" | "str-format" | "format-spec" | "template";

interface FormatDemo {
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
const demos: Record<FormatKey, FormatDemo> = {
  percent: {
    label: "% Operator",
    description:
      "The oldest string formatting method in Python, inspired by C's printf. Uses format specifiers like %s (string), %d (integer), %f (float), and %x (hexadecimal).",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    category: "printf-style",
    keyPoints: [
      "%s inserts a string representation of any value",
      "%d formats as a signed decimal integer",
      "%f formats as a floating-point number (default 6 decimals)",
      "%x formats an integer as lowercase hexadecimal",
      "Use %% to insert a literal percent sign",
    ],
    code: `name = "Alice"
age = 30
price = 19.99
color_code = 255

# Basic %s and %d
print("Name: %s, Age: %d" % (name, age))

# Float with precision
print("Price: %.2f" % price)

# Hexadecimal formatting
print("Color: #%02x%02x%02x" % (255, 128, 0))

# Padding and width
print("%-10s | %5d" % ("Item", 42))
print("%-10s | %5d" % ("Total", 100))`,
    output: [
      "Name: Alice, Age: 30",
      "Price: 19.99",
      "Color: #ff8000",
      "Item       |    42",
      "Total      |   100",
    ],
  },
  "str-format": {
    label: "str.format()",
    description:
      "Introduced in Python 2.6, str.format() uses curly braces {} as placeholders. Supports positional arguments, named arguments, and rich format specifications.",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    category: "Modern",
    keyPoints: [
      "{} uses automatic positional numbering",
      "{0}, {1} use explicit positional indexes",
      "{name} uses keyword arguments for readability",
      "Can access object attributes and dictionary keys",
      "Supports format specs after a colon: {:.2f}",
    ],
    code: `# Positional arguments
print("{} is {} years old".format("Bob", 25))

# Explicit indexes (reusable)
print("{0} likes {1}. {0} is cool.".format("Alice", "Python"))

# Named arguments
print("{name} scored {score}%".format(name="Charlie", score=95))

# Accessing items and attributes
point = {"x": 10, "y": 20}
print("x={x}, y={y}".format(**point))

# Format spec with str.format()
print("Pi: {:.4f}".format(3.14159265))`,
    output: [
      "Bob is 25 years old",
      "Alice likes Python. Alice is cool.",
      "Charlie scored 95%",
      "x=10, y=20",
      "Pi: 3.1416",
    ],
  },
  "format-spec": {
    label: "Format Spec",
    description:
      "The format specification mini-language controls alignment, width, precision, sign, grouping, and type. Works with both str.format() and f-strings.",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    category: "Mini-language",
    keyPoints: [
      "< left-align, > right-align, ^ center within width",
      "Use a fill character before alignment: e.g. *^20",
      "Comma (,) adds thousands separator: {:,}",
      ".2f means 2 decimal places for floats",
      "Combine specs: {:>12,.2f} right-aligns with comma grouping",
    ],
    code: `# Alignment: < left, > right, ^ center
print(f"{'left':<15}|")
print(f"{'right':>15}|")
print(f"{'center':^15}|")

# Fill character + alignment
print(f"{'title':*^20}")

# Number formatting with comma separator
print(f"Population: {7_900_000_000:,}")

# Precision and combined spec
pi = 3.14159265
print(f"Pi: {pi:.2f}")
print(f"Amount: \${1234567.891:>15,.2f}")`,
    output: [
      "left           |",
      "          right|",
      "    center     |",
      "*******title********",
      "Population: 7,900,000,000",
      "Pi: 3.14",
      "Amount: $  1,234,567.89",
    ],
  },
  template: {
    label: "Template Strings",
    description:
      "The string.Template class provides a simpler substitution mechanism using $-based placeholders. Ideal for user-supplied format strings where security matters.",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    category: "Safe",
    keyPoints: [
      "$name or ${name} marks a substitution placeholder",
      "substitute() raises KeyError if a key is missing",
      "safe_substitute() leaves missing keys unreplaced",
      "Use $$ to insert a literal dollar sign",
      "Best for untrusted input -- no code execution risk",
    ],
    code: `from string import Template

# Basic substitution
t = Template("Hello, $name! You have $$$\${amount}.")
print(t.substitute(name="Alice", amount=50))

# safe_substitute with missing keys
t2 = Template("$greeting, $name!")
print(t2.safe_substitute(greeting="Hi"))

# Use with dictionaries
data = {"item": "Widget", "qty": 100, "price": 9.99}
t3 = Template("$qty x $item @ $$$price each")
print(t3.substitute(data))

# Literal dollar sign
t4 = Template("Price: $$$cost")
print(t4.substitute(cost="29.99"))`,
    output: [
      "Hello, Alice! You have $50.",
      "Hi, $name!",
      "100 x Widget @ $9.99 each",
      "Price: $29.99",
    ],
  },
};

const order: FormatKey[] = ["percent", "str-format", "format-spec", "template"];

// ─── Main export ──────────────────────────────────────────────────────────────
export function StringFormattingVisualization() {
  const [selected, setSelected] = useState<FormatKey>("percent");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: FormatKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python String Formatting</CardTitle>
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
