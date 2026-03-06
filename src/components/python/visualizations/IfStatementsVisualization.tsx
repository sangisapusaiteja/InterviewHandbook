"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowDown, CheckCircle2, XCircle } from "lucide-react";
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

// ─── Flowchart ────────────────────────────────────────────────────────────────
function FlowChart({
  condition,
  truePath,
  falsePath,
}: Readonly<{
  condition: string;
  truePath: string;
  falsePath?: string;
}>) {
  return (
    <div className="flex flex-col items-center gap-1 py-3">
      {/* Condition diamond */}
      <div className="relative px-4 py-2 rounded-lg border-2 border-amber-500/50 bg-amber-500/10 text-xs font-mono font-semibold text-amber-700 dark:text-amber-300">
        {condition}
      </div>
      <ArrowDown className="h-4 w-4 text-muted-foreground" />

      {/* True / False branches */}
      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" /> True
          </div>
          <div className="px-3 py-1.5 rounded-md border border-emerald-500/40 bg-emerald-500/10 text-[11px] font-mono text-emerald-700 dark:text-emerald-300">
            {truePath}
          </div>
        </div>

        {falsePath && (
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 text-[10px] font-bold text-red-500 dark:text-red-400">
              <XCircle className="h-3 w-3" /> False
            </div>
            <div className="px-3 py-1.5 rounded-md border border-red-500/40 bg-red-500/10 text-[11px] font-mono text-red-400 dark:text-red-300">
              {falsePath}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── types ────────────────────────────────────────────────────────────────────
type TopicKey = "basic" | "comparison" | "truthy" | "combined";

interface TopicInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
  flowchart: { condition: string; truePath: string; falsePath?: string };
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  basic: {
    label: "Basic if",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The if statement evaluates a condition and executes the indented block only when the condition is True. Python uses indentation (not braces) to define blocks.",
    codeSnippet: `age = 18
if age >= 18:
    print("You are an adult")

temperature = 35
if temperature > 30:
    print("It's hot outside!")
else:
    print("The weather is fine")

score = 75
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: D")`,
    codeOutput: [
      "You are an adult",
      "It's hot outside!",
      "Grade: C",
    ],
    flowchart: { condition: "age >= 18", truePath: 'print("You are an adult")', falsePath: "skip" },
  },
  comparison: {
    label: "Comparison Operators",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Comparison operators return True or False and are commonly used inside if conditions. Python supports ==, !=, <, >, <=, and >=.",
    codeSnippet: `x = 10

if x == 10:
    print("x equals 10")

if x != 5:
    print("x is not 5")

if x < 20:
    print("x is less than 20")

if x > 3:
    print("x is greater than 3")

if x <= 10:
    print("x is at most 10")

if x >= 10:
    print("x is at least 10")`,
    codeOutput: [
      "x equals 10",
      "x is not 5",
      "x is less than 20",
      "x is greater than 3",
      "x is at most 10",
      "x is at least 10",
    ],
    flowchart: { condition: "x == 10", truePath: 'print("x equals 10")', falsePath: "skip" },
  },
  truthy: {
    label: "Truthy/Falsy",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Python treats certain values as False in a boolean context: None, 0, 0.0, empty string \"\", empty list [], empty dict {}, and False itself. Everything else is truthy.",
    codeSnippet: `# Falsy values
for val in [0, None, "", [], False]:
    if not val:
        print(f"{str(val):>5} is falsy")

# Truthy values
for val in [1, "hello", [1, 2], True, -1]:
    if val:
        print(f"{str(val):>8} is truthy")

# Practical usage
name = ""
if name:
    print(f"Hello, {name}")
else:
    print("Name is empty!")`,
    codeOutput: [
      "    0 is falsy",
      " None is falsy",
      "      is falsy",
      "   [] is falsy",
      "False is falsy",
      "       1 is truthy",
      "   hello is truthy",
      "  [1, 2] is truthy",
      "    True is truthy",
      "      -1 is truthy",
      "Name is empty!",
    ],
    flowchart: { condition: 'bool("")', truePath: "unreachable", falsePath: 'print("Name is empty!")' },
  },
  combined: {
    label: "Combined Conditions",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Use 'and', 'or', and 'not' to combine multiple conditions. 'and' requires both to be True, 'or' requires at least one, and 'not' inverts the result.",
    codeSnippet: `age = 25
has_license = True

# and - both must be True
if age >= 18 and has_license:
    print("You can drive")

# or - at least one True
temperature = 5
if temperature > 35 or temperature < 10:
    print("Extreme weather!")

# not - invert condition
is_raining = False
if not is_raining:
    print("No umbrella needed")

# combined
score = 85
is_bonus = True
if (score >= 80 and score < 90) or is_bonus:
    print("Good performance!")`,
    codeOutput: [
      "You can drive",
      "Extreme weather!",
      "No umbrella needed",
      "Good performance!",
    ],
    flowchart: { condition: "age >= 18 and has_license", truePath: 'print("You can drive")', falsePath: "skip" },
  },
};

const order: TopicKey[] = ["basic", "comparison", "truthy", "combined"];

const chipColors: Record<TopicKey, string> = {
  basic: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  comparison: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  truthy: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  combined: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function IfStatementsVisualization() {
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
        <CardTitle className="text-lg">Python if Statements</CardTitle>
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
                  control flow
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Two-column: flowchart + code | output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Flowchart + Code */}
              <div className="space-y-3">
                {/* Visual flowchart */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Flow</p>
                  <div className="rounded-xl border bg-muted/20 px-4 py-2">
                    <FlowChart
                      condition={topic.flowchart.condition}
                      truePath={topic.flowchart.truePath}
                      falsePath={topic.flowchart.falsePath}
                    />
                  </div>
                </div>

                {/* Code snippet */}
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
