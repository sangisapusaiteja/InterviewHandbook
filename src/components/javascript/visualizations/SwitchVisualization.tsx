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
          {lines.map((line) => (
            <p key={line} className="text-emerald-400">
              <span className="text-zinc-500 select-none mr-2">&gt;</span>
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
type SwitchGroup = "basic" | "fallthrough" | "grouped" | "comparison";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── Fall-through case data ──────────────────────────────────────────────────
interface FallThroughCase {
  label: string;
  hasBreak: boolean;
  executes: boolean;
}

const fallThroughCases: FallThroughCase[] = [
  { label: 'case "A":', hasBreak: false, executes: true },
  { label: 'case "B":', hasBreak: false, executes: true },
  { label: 'case "C":', hasBreak: true, executes: true },
  { label: 'case "D":', hasBreak: true, executes: false },
  { label: "default:", hasBreak: false, executes: false },
];

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<SwitchGroup, GroupInfo> = {
  basic: {
    label: "Basic Switch",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The switch statement evaluates an expression and matches it against case clauses. When a match is found, the code block runs until a break statement is hit.",
    codeSnippet: `let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the week");
    break;
  case "Friday":
    console.log("Almost weekend!");
    break;
  case "Sunday":
    console.log("Rest day");
    break;
  default:
    console.log("Regular day");
}`,
    codeOutput: ['"Start of the week"'],
  },
  fallthrough: {
    label: "Fall-Through",
    color: "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300",
    badgeColor: "bg-red-500/20 text-red-700 dark:text-red-300",
    description:
      "Without break, execution falls through to the next case regardless of whether it matches. This is a common source of bugs but can also be used intentionally.",
    codeSnippet: `let grade = "A";

switch (grade) {
  case "A":
    console.log("Excellent");
    // no break -- falls through!
  case "B":
    console.log("Good");
    // no break -- falls through!
  case "C":
    console.log("Passing");
    break;
  case "D":
    console.log("Below average");
    break;
  default:
    console.log("Invalid grade");
}`,
    codeOutput: [
      '"Excellent"   // case "A" matched',
      '"Good"        // fell through to "B"',
      '"Passing"     // fell through to "C", then break',
    ],
  },
  grouped: {
    label: "Grouped Cases",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Multiple cases can share the same code block by stacking them together. This is a clean way to handle several values with the same logic.",
    codeSnippet: `let fruit = "apple";

switch (fruit) {
  case "apple":
  case "pear":
  case "cherry":
    console.log("This is a common fruit");
    break;
  case "dragonfruit":
  case "durian":
    console.log("This is an exotic fruit");
    break;
  default:
    console.log("Unknown fruit");
}`,
    codeOutput: ['"This is a common fruit"'],
  },
  comparison: {
    label: "Switch vs if/else",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Switch uses strict equality (===) to compare. It is best for matching a single variable against many discrete values. Use if/else for ranges, complex conditions, or different variables.",
    codeSnippet: `// Switch -- best for discrete values
let status = "active";
switch (status) {
  case "active":
    console.log("User is active");
    break;
  case "inactive":
    console.log("User is inactive");
    break;
}

// if/else -- best for ranges / complex logic
let score = 85;
if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else {
  console.log("Grade: C or below");
}`,
    codeOutput: ['"User is active"', '"Grade: B"'],
  },
};

const order: SwitchGroup[] = ["basic", "fallthrough", "grouped", "comparison"];

// ─── Main export ──────────────────────────────────────────────────────────────
export function SwitchVisualization() {
  const [selected, setSelected] = useState<SwitchGroup>("basic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [showFallThrough, setShowFallThrough] = useState(false);

  const group = groups[selected];

  const handleSelect = (key: SwitchGroup) => {
    setSelected(key);
    setOutputLines(null);
    setShowFallThrough(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Switch Statements</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Group selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const g = groups[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? g.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {g.label}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${group.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{group.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${group.badgeColor}`}>
                  switch
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{group.description}</p>
            </div>

            {/* Fall-Through visual flow */}
            {selected === "fallthrough" && (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground">
                  Execution flow when grade = &quot;A&quot; (no break until case &quot;C&quot;)
                </p>
                <div className="flex flex-col gap-1">
                  {fallThroughCases.map((c, i) => (
                    <motion.div
                      key={c.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{
                        opacity: showFallThrough ? 1 : 0.5,
                        x: 0,
                      }}
                      transition={{ delay: showFallThrough ? i * 0.15 : 0 }}
                      className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-xs font-mono transition-all ${
                        showFallThrough && c.executes
                          ? "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300"
                          : "bg-muted/30 border-border text-muted-foreground"
                      }`}
                    >
                      <span className="flex-1">{c.label}</span>
                      {showFallThrough && c.executes && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.15 + 0.1 }}
                          className="text-[10px] font-semibold text-red-600 dark:text-red-400"
                        >
                          EXECUTES
                        </motion.span>
                      )}
                      {showFallThrough && !c.executes && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.15 + 0.1 }}
                          className="text-[10px] text-muted-foreground"
                        >
                          skipped
                        </motion.span>
                      )}
                      {c.hasBreak && (
                        <Badge variant="outline" className="text-[9px] py-0">
                          break
                        </Badge>
                      )}
                      {!c.hasBreak && c.label !== "default:" && (
                        <Badge variant="outline" className="text-[9px] py-0 border-red-400/50 text-red-500">
                          no break
                        </Badge>
                      )}
                    </motion.div>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowFallThrough(true)}
                  className="text-xs"
                >
                  <Play className="h-3.5 w-3.5 mr-1" /> Visualize Fall-Through
                </Button>
              </div>
            )}

            {/* Switch vs if/else side-by-side comparison */}
            {selected === "comparison" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-xl border p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-violet-600 dark:text-violet-400">switch</span>
                    <Badge variant="secondary" className="text-[9px] bg-violet-500/20 text-violet-700 dark:text-violet-300">
                      best for
                    </Badge>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                    <li>Matching one variable against many exact values</li>
                    <li>Cleaner syntax for 3+ discrete options</li>
                    <li>Uses strict equality (===) internally</li>
                    <li>Supports fall-through and grouped cases</li>
                  </ul>
                </div>
                <div className="rounded-xl border p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-violet-600 dark:text-violet-400">if/else</span>
                    <Badge variant="secondary" className="text-[9px] bg-violet-500/20 text-violet-700 dark:text-violet-300">
                      best for
                    </Badge>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                    <li>Ranges and complex boolean conditions</li>
                    <li>Comparing different variables</li>
                    <li>Conditions with &amp;&amp;, ||, or function calls</li>
                    <li>Fewer than 3 branches</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Code + Output */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                  {group.codeSnippet}
                </pre>
              </div>
              <Button
                size="sm"
                onClick={() => setOutputLines(group.codeOutput)}
              >
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
