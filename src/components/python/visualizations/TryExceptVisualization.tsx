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
type TopicKey = "basic" | "multiple" | "else" | "eafp";

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
  basic: {
    label: "Basic try/except",
    subtitle: "Catching Errors",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The try block wraps code that might raise an exception. The except block catches and handles the error gracefully. You can catch specific exception types or use a bare except to catch all. Using 'except ExceptionType as e' gives you access to the error message.",
    codeSnippet: `# Catching a specific exception
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Caught: {e}")

# Specific vs general exceptions
try:
    numbers = [1, 2, 3]
    print(numbers[10])
except IndexError as e:
    print(f"Index error: {e}")

# General exception as fallback
try:
    value = int("hello")
except Exception as e:
    print(f"General catch: {type(e).__name__}: {e}")

# Without 'as e' — just handle it
try:
    x = 1 + "2"
except TypeError:
    print("Type mismatch — handled without 'as e'")`,
    codeOutput: [
      "Caught: division by zero",
      "Index error: list index out of range",
      "General catch: ValueError: invalid literal for int() with base 10: 'hello'",
      "Type mismatch — handled without 'as e'",
    ],
    keyPoints: [
      "try block contains code that might raise an exception",
      "except catches the error — program continues normally",
      "'as e' binds the exception object for inspection",
      "Always prefer specific exceptions over bare except",
    ],
  },
  multiple: {
    label: "Multiple except",
    subtitle: "Multi-Catch",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "You can chain multiple except blocks to handle different exception types differently. Python checks them top-to-bottom and runs the first matching handler. You can also catch a tuple of exceptions in a single except block to handle them the same way.",
    codeSnippet: `# Multiple except blocks
def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("Cannot divide by zero")
    except TypeError:
        print("Invalid types for division")
    return None

safe_divide(10, 0)
safe_divide("10", 2)

# Catching a tuple of exceptions
def parse_item(data, key):
    try:
        return data[key]
    except (KeyError, IndexError, TypeError) as e:
        print(f"Access failed: {type(e).__name__}")
        return None

parse_item({"a": 1}, "z")
parse_item([1, 2], 10)
parse_item(None, 0)`,
    codeOutput: [
      "Cannot divide by zero",
      "Invalid types for division",
      "Access failed: KeyError",
      "Access failed: IndexError",
      "Access failed: TypeError",
    ],
    keyPoints: [
      "Multiple except blocks handle different errors differently",
      "Python matches the first matching handler top-to-bottom",
      "Tuple syntax (ExcA, ExcB) catches several types in one block",
      "Put more specific exceptions before general ones",
    ],
  },
  else: {
    label: "else Clause",
    subtitle: "No-Error Path",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "The else clause runs only if the try block completes without raising an exception. It cleanly separates 'risky' code (in try) from 'success' code (in else). The finally block always runs — for cleanup like closing files or connections.",
    codeSnippet: `# else runs only when NO exception occurs
def convert(value):
    try:
        num = int(value)
    except ValueError:
        print(f"'{value}' is not a valid integer")
    else:
        print(f"Converted successfully: {num}")
    finally:
        print(f"Finished processing '{value}'")

convert("42")
print("---")
convert("abc")

# Practical example: file-like pattern
print("---")
data = {"users": ["Alice", "Bob"]}
try:
    users = data["users"]
except KeyError:
    print("No users key found")
else:
    print(f"Found {len(users)} users: {', '.join(users)}")
finally:
    print("Lookup complete")`,
    codeOutput: [
      "Converted successfully: 42",
      "Finished processing '42'",
      "---",
      "'abc' is not a valid integer",
      "Finished processing 'abc'",
      "---",
      "Found 2 users: Alice, Bob",
      "Lookup complete",
    ],
    keyPoints: [
      "else runs only if try succeeds — keeps success logic separate",
      "finally always runs — ideal for cleanup (close files, connections)",
      "Full order: try -> except (on error) OR else (on success) -> finally",
      "Don't put non-risky code in try — use else instead",
    ],
  },
  eafp: {
    label: "EAFP vs LBYL",
    subtitle: "Philosophy",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "EAFP (Easier to Ask Forgiveness than Permission) is the Pythonic approach — just try it and handle exceptions. LBYL (Look Before You Leap) checks conditions before acting. Python strongly favors EAFP because it's cleaner, avoids race conditions, and leverages duck typing.",
    codeSnippet: `# LBYL style — check before acting
user = {"name": "Alice", "age": 30}

if "email" in user:
    print(f"Email: {user['email']}")
else:
    print("LBYL: No email found")

# EAFP style — try and handle failure
try:
    print(f"Email: {user['email']}")
except KeyError:
    print("EAFP: No email found")

# Practical: EAFP with type conversion
values = ["42", "hello", "100"]
for v in values:
    try:
        n = int(v)
    except ValueError:
        print(f"'{v}' -> skipped (not a number)")
    else:
        print(f"'{v}' -> {n * 2}")

# EAFP with attribute access (duck typing)
class Duck:
    def quack(self):
        return "Quack!"

obj = Duck()
try:
    print(obj.quack())
except AttributeError:
    print("Object can't quack")`,
    codeOutput: [
      "LBYL: No email found",
      "EAFP: No email found",
      "'42' -> 84",
      "'hello' -> skipped (not a number)",
      "'100' -> 200",
      "Quack!",
    ],
    keyPoints: [
      "EAFP: try first, handle exceptions — Pythonic approach",
      "LBYL: check conditions before acting — common in other languages",
      "EAFP avoids race conditions (e.g., file existence checks)",
      "EAFP works naturally with duck typing — just try the operation",
    ],
  },
};

const order: TopicKey[] = ["basic", "multiple", "else", "eafp"];

const chipColors: Record<TopicKey, string> = {
  basic: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  multiple: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  else: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  eafp: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function TryExceptVisualization() {
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
        <CardTitle className="text-lg">Python Try / Except</CardTitle>
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
