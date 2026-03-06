"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronRight } from "lucide-react";
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
type ExampleKey = "driving" | "login" | "flattened" | "classifier";

interface NestingLevel {
  depth: number;
  condition: string;
  body?: string;
}

interface ExampleInfo {
  label: string;
  color: string;
  badgeColor: string;
  badgeText: string;
  description: string;
  nestingLevels: NestingLevel[];
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const examples: Record<ExampleKey, ExampleInfo> = {
  driving: {
    label: "Driving Check",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    badgeText: "2 levels",
    description:
      "A classic nested condition: first check if the person is old enough (age >= 18), then check if they have a valid license. The inner check only runs when the outer condition is True.",
    nestingLevels: [
      { depth: 0, condition: "if age >= 18", body: "Check age first" },
      { depth: 1, condition: "if has_license", body: "Then check license" },
    ],
    codeSnippet: `age = 20
has_license = True

if age >= 18:
    print("Age check passed")
    if has_license:
        print("You can drive!")
    else:
        print("Get a license first")
else:
    print("Too young to drive")`,
    codeOutput: ["Age check passed", "You can drive!"],
  },
  login: {
    label: "Login System",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    badgeText: "3 levels",
    description:
      "A real-world 3-level nesting example: validate username, then password, then check if the account is active. Each level adds a gate that must pass before proceeding deeper.",
    nestingLevels: [
      { depth: 0, condition: 'if username == "admin"', body: "Level 1: username" },
      { depth: 1, condition: 'if password == "secret"', body: "Level 2: password" },
      { depth: 2, condition: "if is_active", body: "Level 3: account status" },
    ],
    codeSnippet: `username = "admin"
password = "secret"
is_active = True

if username == "admin":
    print("Username OK")
    if password == "secret":
        print("Password OK")
        if is_active:
            print("Login successful!")
        else:
            print("Account deactivated")
    else:
        print("Wrong password")
else:
    print("Unknown user")`,
    codeOutput: ["Username OK", "Password OK", "Login successful!"],
  },
  flattened: {
    label: "Flattened Version",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    badgeText: "best practice",
    description:
      'Deeply nested conditions hurt readability. Use "and" to combine checks or "elif" chains to flatten the structure. This produces the same result with cleaner, more maintainable code.',
    nestingLevels: [
      { depth: 0, condition: "if age >= 18 and has_license", body: "Combined with 'and'" },
      { depth: 0, condition: 'elif username == "admin" and password == "secret" and is_active', body: "Flat chain" },
    ],
    codeSnippet: `# Nested version (avoid):
# if age >= 18:
#     if has_license:
#         print("Can drive")

# Flattened with 'and' (preferred):
age = 20
has_license = True

if age >= 18 and has_license:
    print("Can drive!")
elif age >= 18 and not has_license:
    print("Get a license first")
else:
    print("Too young to drive")

# Login flattened:
username, password, is_active = "admin", "secret", True

if username == "admin" and password == "secret" and is_active:
    print("Login successful!")
elif username != "admin":
    print("Unknown user")
elif password != "secret":
    print("Wrong password")
else:
    print("Account deactivated")`,
    codeOutput: ["Can drive!", "Login successful!"],
  },
  classifier: {
    label: "Number Classifier",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    badgeText: "2 levels",
    description:
      "Classify a number as positive/negative/zero, then further check if it is even or odd. The even/odd check is nested inside the positive and negative branches.",
    nestingLevels: [
      { depth: 0, condition: "if num > 0 / elif num < 0 / else", body: "Sign check" },
      { depth: 1, condition: "if num % 2 == 0 / else", body: "Even/Odd check" },
    ],
    codeSnippet: `num = -7

if num > 0:
    print("Positive", end=" ")
    if num % 2 == 0:
        print("and Even")
    else:
        print("and Odd")
elif num < 0:
    print("Negative", end=" ")
    if num % 2 == 0:
        print("and Even")
    else:
        print("and Odd")
else:
    print("Zero")`,
    codeOutput: ["Negative and Odd"],
  },
};

const order: ExampleKey[] = ["driving", "login", "flattened", "classifier"];

const chipColors: Record<ExampleKey, string> = {
  driving: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  login: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  flattened: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  classifier: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Nesting indicator ────────────────────────────────────────────────────────
const depthColors = [
  "border-blue-400 bg-blue-400/10 text-blue-700 dark:text-blue-300",
  "border-emerald-400 bg-emerald-400/10 text-emerald-700 dark:text-emerald-300",
  "border-violet-400 bg-violet-400/10 text-violet-700 dark:text-violet-300",
];

function NestingIndicator({ levels }: Readonly<{ levels: NestingLevel[] }>) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground mb-2">Nesting Structure</p>
      {levels.map((level) => (
        <div
          key={`${level.depth}-${level.condition}`}
          className="flex items-center gap-2"
          style={{ paddingLeft: `${level.depth * 24}px` }}
        >
          {level.depth > 0 && (
            <div className="flex items-center gap-0.5 text-muted-foreground">
              {Array.from({ length: level.depth }).map((_, i) => (
                <ChevronRight key={`chevron-${level.depth}-${i}`} className="h-3 w-3" />
              ))}
            </div>
          )}
          <div
            className={`rounded-lg border px-3 py-1.5 text-xs font-mono ${
              depthColors[level.depth] ?? depthColors[0]
            }`}
          >
            <span className="font-bold">{level.condition}</span>
            {level.body && (
              <span className="ml-2 text-[10px] opacity-70 font-sans">{level.body}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function NestedConditionsVisualization() {
  const [selected, setSelected] = useState<ExampleKey>("driving");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const example = examples[selected];

  const handleSelect = (key: ExampleKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Nested Conditions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Example selector chips */}
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
                {examples[key].label}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${example.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{example.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${example.badgeColor}`}>
                  {example.badgeText}
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{example.description}</p>
            </div>

            {/* Two-column: nesting indicator + code/output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Nesting structure */}
              <div className="rounded-xl border px-4 py-3">
                <NestingIndicator levels={example.nestingLevels} />
              </div>

              {/* Right: Code + Output */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {example.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={() => setOutputLines(example.codeOutput)}>
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
