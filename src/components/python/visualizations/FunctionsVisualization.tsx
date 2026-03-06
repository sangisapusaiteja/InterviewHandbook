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
type TopicKey = "definecall" | "parameters" | "docstrings" | "scope";

interface TopicInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  definecall: {
    label: "Define & Call",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Functions are defined with the def keyword followed by a name and parentheses. The function body is indented. Call a function by using its name followed by parentheses with any required arguments.",
    codeSnippet: `# Define a simple function
def greet(name):
    print(f"Hello, {name}!")

# Call the function
greet("Alice")
greet("Bob")

# Function with a return value
def add(a, b):
    return a + b

result = add(3, 5)
print(f"3 + 5 = {result}")

# Function with no parameters
def say_hi():
    print("Hi there!")

say_hi()`,
    codeOutput: [
      "Hello, Alice!",
      "Hello, Bob!",
      "3 + 5 = 8",
      "Hi there!",
    ],
  },
  parameters: {
    label: "Parameters",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Functions accept positional arguments, keyword arguments, and default parameter values. You can also use *args for variable positional arguments and **kwargs for variable keyword arguments.",
    codeSnippet: `# Default parameter values
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")
greet("Bob", "Hey")

# Keyword arguments
greet(greeting="Hi", name="Charlie")

# *args — variable positional args
def total(*numbers):
    return sum(numbers)

print(f"Sum: {total(1, 2, 3, 4)}")

# **kwargs — variable keyword args
def show_info(**kwargs):
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

print("User info:")
show_info(name="Alice", age=30, city="NYC")`,
    codeOutput: [
      "Hello, Alice!",
      "Hey, Bob!",
      "Hi, Charlie!",
      "Sum: 10",
      "User info:",
      "  name: Alice",
      "  age: 30",
      "  city: NYC",
    ],
  },
  docstrings: {
    label: "Docstrings",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "A docstring is a string literal placed as the first statement in a function body. It documents what the function does. Access it at runtime with the __doc__ attribute or the help() function.",
    codeSnippet: `def calculate_area(radius):
    """Calculate the area of a circle.

    Args:
        radius: The radius of the circle.

    Returns:
        The area as a float.
    """
    import math
    return math.pi * radius ** 2

# Call the function
area = calculate_area(5)
print(f"Area: {area:.2f}")

# Access the docstring
print(f"Docstring: {calculate_area.__doc__.strip().splitlines()[0]}")

# One-liner docstring
def square(n):
    """Return the square of n."""
    return n * n

print(f"square(7) = {square(7)}")
print(f"Doc: {square.__doc__}")`,
    codeOutput: [
      "Area: 78.54",
      "Docstring: Calculate the area of a circle.",
      "square(7) = 49",
      "Doc: Return the square of n.",
    ],
  },
  scope: {
    label: "Scope",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Python uses the LEGB rule to resolve variable names: Local (inside current function), Enclosing (outer function), Global (module level), Built-in (Python built-ins). Use the global keyword to modify a global variable inside a function.",
    codeSnippet: `# Global variable
x = "global"

def outer():
    x = "enclosing"

    def inner():
        x = "local"
        print(f"inner: x = {x}")

    inner()
    print(f"outer: x = {x}")

outer()
print(f"module: x = {x}")

# Using the global keyword
counter = 0

def increment():
    global counter
    counter += 1

increment()
increment()
increment()
print(f"counter = {counter}")

# LEGB order summary
print("LEGB: Local > Enclosing > Global > Built-in")`,
    codeOutput: [
      "inner: x = local",
      "outer: x = enclosing",
      "module: x = global",
      "counter = 3",
      "LEGB: Local > Enclosing > Global > Built-in",
    ],
  },
};

const order: TopicKey[] = ["definecall", "parameters", "docstrings", "scope"];

const chipColors: Record<TopicKey, string> = {
  definecall: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  parameters: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  docstrings: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  scope: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function FunctionsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("definecall");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Functions</CardTitle>
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
                  def
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
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
