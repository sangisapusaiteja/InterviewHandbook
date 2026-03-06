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
type TopicKey = "common" | "hierarchy" | "raising" | "traceback";

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
  common: {
    label: "Common Exceptions",
    subtitle: "Built-in Errors",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Python has many built-in exceptions for common error scenarios. ValueError is raised when a function receives an argument of the right type but wrong value. TypeError occurs when an operation is applied to an inappropriate type. KeyError is raised when a dictionary key is not found, and IndexError when a sequence index is out of range.",
    codeSnippet: `# ValueError — wrong value for the type
try:
    num = int("hello")
except ValueError as e:
    print(f"ValueError: {e}")

# TypeError — wrong type for the operation
try:
    result = "age: " + 25
except TypeError as e:
    print(f"TypeError: {e}")

# KeyError — missing dictionary key
data = {"name": "Alice", "age": 30}
try:
    print(data["email"])
except KeyError as e:
    print(f"KeyError: {e}")

# IndexError — index out of range
items = [10, 20, 30]
try:
    print(items[5])
except IndexError as e:
    print(f"IndexError: {e}")`,
    codeOutput: [
      "ValueError: invalid literal for int() with base 10: 'hello'",
      "TypeError: can only concatenate str (not \"int\") to str",
      "KeyError: 'email'",
      "IndexError: list index out of range",
    ],
    keyPoints: [
      "ValueError — correct type, invalid value (e.g. int('hello'))",
      "TypeError — incompatible types in an operation",
      "KeyError — accessing a missing key in a dict",
      "IndexError — sequence index out of valid range",
    ],
  },
  hierarchy: {
    label: "Exception Hierarchy",
    subtitle: "Inheritance Tree",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "All Python exceptions inherit from BaseException. Most user-facing exceptions derive from Exception, which itself is a subclass of BaseException. Understanding this hierarchy helps you write precise except clauses and avoid accidentally catching system-exiting exceptions like SystemExit or KeyboardInterrupt.",
    codeSnippet: `# Exception hierarchy check
print(issubclass(ValueError, Exception))
print(issubclass(TypeError, Exception))
print(issubclass(KeyError, LookupError))
print(issubclass(IndexError, LookupError))

# BaseException is the root
print(issubclass(Exception, BaseException))
print(issubclass(KeyboardInterrupt, BaseException))
print(issubclass(KeyboardInterrupt, Exception))

# MRO (Method Resolution Order) of ValueError
print(ValueError.__mro__)

# Catching a parent catches all children
try:
    my_dict = {}
    _ = my_dict["key"]
except LookupError as e:
    print(f"Caught via LookupError: {type(e).__name__}")`,
    codeOutput: [
      "True",
      "True",
      "True",
      "True",
      "True",
      "True",
      "False",
      "(<class 'ValueError'>, <class 'Exception'>, <class 'BaseException'>, <class 'object'>)",
      "Caught via LookupError: KeyError",
    ],
    keyPoints: [
      "BaseException is the root of all exceptions",
      "Exception is the base for non-system-exiting errors",
      "KeyError and IndexError both inherit from LookupError",
      "KeyboardInterrupt inherits from BaseException, NOT Exception",
    ],
  },
  raising: {
    label: "Raising Exceptions",
    subtitle: "raise Keyword",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "The raise keyword lets you explicitly trigger exceptions. You can raise built-in exceptions with custom messages, re-raise caught exceptions, or chain exceptions with 'raise ... from ...'. Raising exceptions is essential for input validation, enforcing preconditions, and signaling error states in your code.",
    codeSnippet: `# Raise with a message
def set_age(age):
    if not isinstance(age, int):
        raise TypeError("Age must be an integer")
    if age < 0 or age > 150:
        raise ValueError(f"Invalid age: {age}")
    return age

# Valid input
print(f"Age set: {set_age(25)}")

# Invalid value
try:
    set_age(-5)
except ValueError as e:
    print(f"Caught: {e}")

# Invalid type
try:
    set_age("twenty")
except TypeError as e:
    print(f"Caught: {e}")

# Re-raise after logging
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Logging: division by zero occurred")
    # raise  # Would re-raise the exception`,
    codeOutput: [
      "Age set: 25",
      "Caught: Invalid age: -5",
      "Caught: Age must be an integer",
      "Logging: division by zero occurred",
    ],
    keyPoints: [
      "raise ExceptionType('message') to signal an error",
      "Use raise without arguments to re-raise the current exception",
      "Validate inputs early and raise specific exception types",
      "raise ... from ... chains exceptions to preserve context",
    ],
  },
  traceback: {
    label: "Traceback Reading",
    subtitle: "Error Messages",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Python tracebacks show the call stack from the most recent call last. Reading them bottom-up is the fastest way to find the error: the last line shows the exception type and message, and the lines above show the file, line number, and code that led to the error. The traceback module provides programmatic access.",
    codeSnippet: `import traceback

def divide(a, b):
    return a / b

def calculate(x, y):
    return divide(x, y)

# Capture and print traceback
try:
    result = calculate(10, 0)
except ZeroDivisionError:
    print("--- Traceback ---")
    traceback.print_exc()
    print("-----------------")

# Format traceback as string
try:
    result = calculate(10, 0)
except ZeroDivisionError:
    tb_str = traceback.format_exc()
    lines = tb_str.strip().split("\\n")
    print(f"Error type: {lines[-1]}")
    print(f"Call depth: {tb_str.count('File ')}")

# Reading error messages
try:
    data = [1, 2, 3]
    val = data[10]
except IndexError as e:
    print(f"Exception class: {type(e).__name__}")
    print(f"Message: {e}")
    print(f"Args: {e.args}")`,
    codeOutput: [
      "--- Traceback ---",
      "Traceback (most recent call last):",
      "  File \"main.py\", line 11, in <module>",
      "    result = calculate(10, 0)",
      "  File \"main.py\", line 7, in calculate",
      "    return divide(x, y)",
      "  File \"main.py\", line 4, in divide",
      "    return a / b",
      "ZeroDivisionError: division by zero",
      "-----------------",
      "Error type: ZeroDivisionError: division by zero",
      "Call depth: 3",
      "Exception class: IndexError",
      "Message: list index out of range",
      "Args: ('list index out of range',)",
    ],
    keyPoints: [
      "Read tracebacks bottom-up: last line has the exception type",
      "Each 'File' entry shows the file, line number, and code",
      "'Most recent call last' means the deepest call is at the bottom",
      "traceback module lets you capture and format tracebacks programmatically",
    ],
  },
};

const order: TopicKey[] = ["common", "hierarchy", "raising", "traceback"];

const chipColors: Record<TopicKey, string> = {
  common: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  hierarchy: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  raising: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  traceback: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function ExceptionsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("common");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Exceptions</CardTitle>
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
