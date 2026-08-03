"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Settings, Layers, AlertTriangle, Shield } from "lucide-react";
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
type TopicKey = "basic" | "multiple" | "mutable-bug" | "none-pattern";

interface TopicInfo {
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  badgeColor: string;
  badgeLabel: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  basic: {
    label: "Basic Defaults",
    subtitle: "Simple Default Values",
    icon: <Settings className="h-3.5 w-3.5" />,
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    badgeLabel: "fundamentals",
    description:
      "Default arguments let you specify fallback values for parameters. If the caller omits the argument, the default is used. If supplied, it overrides the default.",
    codeSnippet: `def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

# Using the default greeting
greet("Alice")

# Overriding the default
greet("Bob", "Hey")`,
    codeOutput: [
      "Hello, Alice!",
      "Hey, Bob!",
    ],
  },
  multiple: {
    label: "Multiple Defaults",
    subtitle: "Partial Overrides",
    icon: <Layers className="h-3.5 w-3.5" />,
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    badgeLabel: "intermediate",
    description:
      "Functions can have multiple default arguments. You can override some while keeping others at their defaults by using keyword arguments.",
    codeSnippet: `def create_profile(name, age=25, city="NYC", role="dev"):
    print(f"{name}, {age}, {city}, {role}")

# All defaults
create_profile("Alice")

# Override just age
create_profile("Bob", 30)

# Override city via keyword, keep age default
create_profile("Carol", city="London")

# Override role only
create_profile("Dave", role="designer")`,
    codeOutput: [
      "Alice, 25, NYC, dev",
      "Bob, 30, NYC, dev",
      "Carol, 25, London, dev",
      "Dave, 25, NYC, designer",
    ],
  },
  "mutable-bug": {
    label: "Mutable Default Bug",
    subtitle: "Common Pitfall",
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-red-500/20 text-red-700 dark:text-red-300",
    badgeLabel: "warning: bug!",
    description:
      "Default values are evaluated ONCE when the function is defined, not each time it is called. If the default is a mutable object like a list, it is shared across all calls. This causes items to accumulate unexpectedly.",
    codeSnippet: `def bad_append(item, lst=[]):
    lst.append(item)
    return lst

# Each call mutates the SAME list!
print(bad_append("a"))
print(bad_append("b"))
print(bad_append("c"))`,
    codeOutput: [
      "['a']",
      "['a', 'b']",
      "['a', 'b', 'c']",
    ],
  },
  "none-pattern": {
    label: "None Pattern",
    subtitle: "The Fix",
    icon: <Shield className="h-3.5 w-3.5" />,
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    badgeLabel: "best practice",
    description:
      "Use None as the default and create a new mutable object inside the function body. This ensures each call gets its own fresh list (or dict, set, etc.).",
    codeSnippet: `def good_append(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst

# Each call gets a fresh list
print(good_append("a"))
print(good_append("b"))
print(good_append("c"))`,
    codeOutput: [
      "['a']",
      "['b']",
      "['c']",
    ],
  },
};

const order: TopicKey[] = ["basic", "multiple", "mutable-bug", "none-pattern"];

const chipColors: Record<TopicKey, string> = {
  basic: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  multiple: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  "mutable-bug": "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  "none-pattern": "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function DefaultArgumentsVisualization() {
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
        <CardTitle className="text-lg">Python Default Arguments</CardTitle>
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
                <Badge
                  variant="secondary"
                  className={`text-[10px] ${topic.badgeColor}`}
                >
                  {topic.badgeLabel}
                </Badge>
                {selected === "mutable-bug" && (
                  <Badge
                    variant="destructive"
                    className="text-[10px] animate-pulse"
                  >
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Common Interview Question
                  </Badge>
                )}
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
