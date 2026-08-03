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
type TopicKey = "stub" | "emptyclass" | "placeholder" | "comparison";

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
  stub: {
    label: "Empty Function Stub",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Use pass as a placeholder inside a function body when you haven't implemented the logic yet. Without pass, Python raises an IndentationError because a function body cannot be empty.",
    codeSnippet: `# TODO: implement later
def connect_to_database():
    pass

def process_data(data):
    pass

# Functions exist but do nothing yet
connect_to_database()
print("connect_to_database() ran — no error!")

process_data([1, 2, 3])
print("process_data() ran — no error!")

# Useful during top-down design
def validate_input():
    pass  # TODO: add validation

def transform():
    pass  # TODO: add transformation

print("All stubs defined successfully")`,
    codeOutput: [
      "connect_to_database() ran — no error!",
      "process_data() ran — no error!",
      "All stubs defined successfully",
    ],
  },
  emptyclass: {
    label: "Empty Class",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "pass lets you define a class with no methods or attributes. This is useful for creating stub classes, custom exception types, or placeholder data models.",
    codeSnippet: `# Stub class — fill in later
class Animal:
    pass

# Custom exception (very common pattern)
class ValidationError(Exception):
    pass

# You can still instantiate them
a = Animal()
print(type(a))

# Raise and catch custom exception
try:
    raise ValidationError("bad input")
except ValidationError as e:
    print(f"Caught: {e}")

# Placeholder data model
class UserProfile:
    pass

u = UserProfile()
u.name = "Alice"
print(f"User: {u.name}")`,
    codeOutput: [
      "<class '__main__.Animal'>",
      "Caught: bad input",
      "User: Alice",
    ],
  },
  placeholder: {
    label: "Placeholder in Conditions",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "When you need an empty block inside if/else or a loop, pass acts as a syntactic placeholder. Python requires at least one statement in every block — pass satisfies that requirement.",
    codeSnippet: `# Empty if branch — handle only else
x = 10

if x > 100:
    pass  # TODO: handle large values
else:
    print(f"{x} is not large")

# Skip certain items in a loop
for i in range(5):
    if i == 2:
        pass  # intentionally do nothing for 2
    else:
        print(f"Processing {i}")

# Empty while body (wait pattern)
attempts = 0
while attempts < 3:
    attempts += 1
    if attempts < 3:
        pass  # not ready yet
    else:
        print(f"Ready after {attempts} attempts")`,
    codeOutput: [
      "10 is not large",
      "Processing 0",
      "Processing 1",
      "Processing 3",
      "Processing 4",
      "Ready after 3 attempts",
    ],
  },
  comparison: {
    label: "pass vs continue",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "pass does absolutely nothing — execution continues to the next line. continue skips the rest of the current loop iteration and jumps to the next one. This distinction matters inside loops.",
    codeSnippet: `# pass — next line STILL runs
print("=== pass example ===")
for i in range(4):
    if i == 2:
        pass  # does nothing
    print(f"  i={i}")  # always runs

# continue — skips to next iteration
print("=== continue example ===")
for i in range(4):
    if i == 2:
        continue  # skip rest of body
    print(f"  i={i}")  # skipped when i==2

# break — exits loop entirely
print("=== break example ===")
for i in range(4):
    if i == 2:
        break  # exit loop
    print(f"  i={i}")
print("  loop ended")`,
    codeOutput: [
      "=== pass example ===",
      "  i=0",
      "  i=1",
      "  i=2",
      "  i=3",
      "=== continue example ===",
      "  i=0",
      "  i=1",
      "  i=3",
      "=== break example ===",
      "  i=0",
      "  i=1",
      "  loop ended",
    ],
  },
};

const order: TopicKey[] = ["stub", "emptyclass", "placeholder", "comparison"];

const chipColors: Record<TopicKey, string> = {
  stub: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  emptyclass: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  placeholder: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  comparison: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Comparison table rows ────────────────────────────────────────────────────
const comparisonRows = [
  {
    keyword: "pass",
    effect: "Does nothing at all",
    nextLine: "Yes — runs normally",
    loop: "Loop continues to next line in body",
    useCase: "Placeholder for empty blocks",
  },
  {
    keyword: "continue",
    effect: "Skips rest of loop body",
    nextLine: "No — jumps to next iteration",
    loop: "Skips to next iteration",
    useCase: "Skip specific iterations",
  },
  {
    keyword: "break",
    effect: "Exits loop entirely",
    nextLine: "No — exits the loop",
    loop: "Terminates the loop",
    useCase: "Stop looping early",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function PassStatementVisualization() {
  const [selected, setSelected] = useState<TopicKey>("stub");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python pass Statement</CardTitle>
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
                  pass
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

        {/* Comparison table: pass vs continue vs break */}
        <div className="space-y-2 pt-2">
          <p className="text-sm font-semibold text-muted-foreground">
            Comparison: pass vs continue vs break
          </p>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="px-3 py-2 text-left font-semibold">Keyword</th>
                  <th className="px-3 py-2 text-left font-semibold">Effect</th>
                  <th className="px-3 py-2 text-left font-semibold">Next Line Runs?</th>
                  <th className="px-3 py-2 text-left font-semibold">In a Loop</th>
                  <th className="px-3 py-2 text-left font-semibold">Use Case</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.keyword} className="border-b last:border-b-0">
                    <td className="px-3 py-2 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {row.keyword}
                    </td>
                    <td className="px-3 py-2">{row.effect}</td>
                    <td className="px-3 py-2">{row.nextLine}</td>
                    <td className="px-3 py-2">{row.loop}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.useCase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
