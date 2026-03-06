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
type TopicKey = "basic" | "with-args" | "stacking" | "practical";

interface TopicInfo {
  label: string;
  subtitle: string;
  color: string;
  badgeColor: string;
  badgeLabel: string;
  description: string;
  keyPoints: string[];
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  basic: {
    label: "Basic Decorator",
    subtitle: "@syntax & wrapping functions",
    color: "bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    badgeLabel: "@decorator",
    description:
      "A decorator is a function that takes another function as input and returns a modified version of it. The @decorator syntax is syntactic sugar for func = decorator(func). Use functools.wraps to preserve the original function's name, docstring, and metadata.",
    keyPoints: [
      "@decorator syntax is shorthand for func = decorator(func)",
      "Decorators take a function and return a new function",
      "functools.wraps preserves the wrapped function's metadata",
      "The wrapper function typically uses *args, **kwargs",
    ],
    codeSnippet: `import functools

def my_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print("Before call")
        result = func(*args, **kwargs)
        print("After call")
        return result
    return wrapper

@my_decorator
def greet(name):
    """Greet someone."""
    print(f"Hello, \${name}!")

greet("Alice")
print(f"Function name: \${greet.__name__}")
print(f"Docstring: \${greet.__doc__}")`,
    codeOutput: [
      "Before call",
      "Hello, Alice!",
      "After call",
      "Function name: greet",
      "Docstring: Greet someone.",
    ],
  },
  "with-args": {
    label: "With Arguments",
    subtitle: "Decorator factories & nesting",
    color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    badgeLabel: "factory",
    description:
      "When a decorator needs its own arguments, you create a decorator factory — a function that returns a decorator. This introduces three levels of nesting: the outer factory accepts config arguments, the middle decorator accepts the function, and the inner wrapper executes logic around the call.",
    keyPoints: [
      "Decorator factory is a function that returns a decorator",
      "Three-level nesting: factory -> decorator -> wrapper",
      "@repeat(3) calls repeat(3) first, then applies the returned decorator",
      "Factory arguments are captured via closure in the wrapper",
    ],
    codeSnippet: `import functools

def repeat(n):
    """Decorator factory: repeat a function n times."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            results = []
            for i in range(n):
                results.append(func(*args, **kwargs))
            return results
        return wrapper
    return decorator

@repeat(3)
def say_hello(name):
    print(f"Hello, \${name}!")
    return f"greeted \${name}"

results = say_hello("Bob")
print(f"Results: \${results}")`,
    codeOutput: [
      "Hello, Bob!",
      "Hello, Bob!",
      "Hello, Bob!",
      "Results: ['greeted Bob', 'greeted Bob', 'greeted Bob']",
    ],
  },
  stacking: {
    label: "Stacking",
    subtitle: "Multiple decorators & execution order",
    color: "bg-violet-500/15 border-violet-500/30 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    badgeLabel: "stacking",
    description:
      "Multiple decorators can be stacked on a single function using multiple @ lines. They are applied bottom-up (closest to the function first), but execute top-down at call time. @a @b def f is equivalent to f = a(b(f)). Understanding this order is crucial for composing behaviours correctly.",
    keyPoints: [
      "Decorators apply bottom-up: @a then @b means f = a(b(f))",
      "At call time, the outermost wrapper runs first (top-down)",
      "Each decorator wraps the result of the one below it",
      "Order matters — changing it changes behaviour",
    ],
    codeSnippet: `import functools

def bold(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return f"<b>\${func(*args, **kwargs)}</b>"
    return wrapper

def italic(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return f"<i>\${func(*args, **kwargs)}</i>"
    return wrapper

@bold
@italic
def greet(name):
    return f"Hello, \${name}"

# Equivalent to: greet = bold(italic(greet))
print(greet("Alice"))
print("Apply order: italic first, then bold wraps it")
print("Result: bold wrapper runs first at call time")`,
    codeOutput: [
      "<b><i>Hello, Alice</i></b>",
      "Apply order: italic first, then bold wraps it",
      "Result: bold wrapper runs first at call time",
    ],
  },
  practical: {
    label: "Practical Patterns",
    subtitle: "timer, retry, validate, lru_cache",
    color: "bg-orange-500/15 border-orange-500/30 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    badgeLabel: "patterns",
    description:
      "Decorators power many real-world patterns. A timer decorator measures execution time. A retry decorator re-attempts failed calls. A validate decorator checks arguments before execution. Python's built-in functools.lru_cache is a decorator that memoises function results for performance.",
    keyPoints: [
      "Timer: measure and log function execution time",
      "Retry: automatically re-attempt on exception",
      "Validate: check argument types/values before calling",
      "lru_cache: built-in memoisation decorator from functools",
    ],
    codeSnippet: `import functools, time

# Timer decorator
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"\${func.__name__} took \${elapsed:.4f}s")
        return result
    return wrapper

# Built-in lru_cache decorator
@functools.lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

@timer
def compute():
    return fibonacci(30)

result = compute()
print(f"fibonacci(30) = \${result}")
info = fibonacci.cache_info()
print(f"Cache: \${info}")`,
    codeOutput: [
      "compute took 0.0001s",
      "fibonacci(30) = 832040",
      "Cache: CacheInfo(hits=28, misses=31, maxsize=128, currsize=31)",
    ],
  },
};

const order: TopicKey[] = ["basic", "with-args", "stacking", "practical"];

const chipColors: Record<TopicKey, string> = {
  basic: "bg-blue-500/15 border-blue-500/30 text-blue-400",
  "with-args": "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  stacking: "bg-violet-500/15 border-violet-500/30 text-violet-400",
  practical: "bg-orange-500/15 border-orange-500/30 text-orange-400",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function DecoratorsVisualization() {
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
        <CardTitle className="text-lg">Python Decorators</CardTitle>
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
                {t.label} — {t.subtitle}
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
                  {topic.badgeLabel}
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Key points */}
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground">Key Points</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {topic.keyPoints.map((point) => (
                  <li
                    key={`kp-${selected}-${point}`}
                    className="text-xs text-muted-foreground flex items-start gap-1.5"
                  >
                    <span className="text-emerald-500 mt-0.5 select-none">*</span>
                    {point}
                  </li>
                ))}
              </ul>
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
