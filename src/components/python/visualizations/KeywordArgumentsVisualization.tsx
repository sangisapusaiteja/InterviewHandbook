"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Tag, Shuffle, Asterisk, SlashIcon } from "lucide-react";
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
type TopicKey = "named" | "mixed" | "keyword-only" | "positional-only";

interface TopicInfo {
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  named: {
    label: "Named Arguments",
    subtitle: "Any Order",
    icon: <Tag className="h-3.5 w-3.5" />,
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "When you pass arguments by name, order does not matter. This makes function calls self-documenting and less error-prone, especially with many parameters.",
    codeSnippet: `def greet(name, age):
    print(f"Hello {name}, you are {age}!")

# Both calls produce the same result
greet(name="Alice", age=30)
greet(age=30, name="Alice")

# Compare with positional (order matters)
greet("Bob", 25)`,
    codeOutput: [
      "Hello Alice, you are 30!",
      "Hello Alice, you are 30!",
      "Hello Bob, you are 25!",
    ],
  },
  mixed: {
    label: "Mixed Calling",
    subtitle: "Positional + Keyword",
    icon: <Shuffle className="h-3.5 w-3.5" />,
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "You can mix positional and keyword arguments in a single call. The rule: positional arguments must come first, then keyword arguments. You cannot place a positional argument after a keyword one.",
    codeSnippet: `def create_user(name, age, city="Unknown"):
    print(f"{name}, {age}, from {city}")

# Positional + keyword mix
create_user("Alice", age=30, city="Paris")

# First arg positional, rest keyword
create_user("Bob", city="London", age=25)

# All positional works too
create_user("Carol", 28, "Tokyo")`,
    codeOutput: [
      "Alice, 30, from Paris",
      "Bob, 25, from London",
      "Carol, 28, from Tokyo",
    ],
  },
  "keyword-only": {
    label: "Keyword-Only (*)",
    subtitle: "Must Name It",
    icon: <Asterisk className="h-3.5 w-3.5" />,
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Parameters after * in the function signature are keyword-only. They MUST be passed by name — passing them positionally raises a TypeError. This enforces clarity at the call site.",
    codeSnippet: `def connect(host, port, *, timeout=30, retries=3):
    print(f"host={host} port={port}")
    print(f"timeout={timeout} retries={retries}")

# 'timeout' and 'retries' must be named
connect("localhost", 8080, timeout=10, retries=5)

# Using defaults for keyword-only params
connect("db.server", 5432)

# This would raise TypeError:
# connect("localhost", 8080, 10, 5)`,
    codeOutput: [
      "host=localhost port=8080",
      "timeout=10 retries=5",
      "host=db.server port=5432",
      "timeout=30 retries=3",
    ],
  },
  "positional-only": {
    label: "Positional-Only (/)",
    subtitle: "No Name Allowed",
    icon: <SlashIcon className="h-3.5 w-3.5" />,
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Parameters before / in the signature are positional-only (Python 3.8+). They cannot be passed by name. This lets library authors change parameter names without breaking callers.",
    codeSnippet: `def divide(a, b, /, *, rounding=False):
    result = a / b
    if rounding:
        result = round(result, 2)
    print(f"{a} / {b} = {result}")

# 'a' and 'b' must be positional
divide(10, 3)
divide(10, 3, rounding=True)

# This would raise TypeError:
# divide(a=10, b=3)  # cannot use names!`,
    codeOutput: [
      "10 / 3 = 3.3333333333333335",
      "10 / 3 = 3.33",
    ],
  },
};

const order: TopicKey[] = ["named", "mixed", "keyword-only", "positional-only"];

const chipColors: Record<TopicKey, string> = {
  named: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  mixed: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  "keyword-only": "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  "positional-only": "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function KeywordArgumentsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("named");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Keyword Arguments</CardTitle>
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
                {t.icon}
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
                  keyword args
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
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
