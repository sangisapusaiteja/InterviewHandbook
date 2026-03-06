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
type IfElseTab = "basic" | "ifelse" | "ifelseif" | "guard";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── colours ──────────────────────────────────────────────────────────────────
const tabColors: Record<IfElseTab, string> = {
  basic:    "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  ifelse:   "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  ifelseif: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  guard:    "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

const tabBadgeColors: Record<IfElseTab, string> = {
  basic:    "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  ifelse:   "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  ifelseif: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
  guard:    "bg-orange-500/20 text-orange-700 dark:text-orange-300",
};

const tabBorderAccent: Record<IfElseTab, string> = {
  basic:    "border-blue-500/60",
  ifelse:   "border-emerald-500/60",
  ifelseif: "border-violet-500/60",
  guard:    "border-orange-500/60",
};

const tabBgAccent: Record<IfElseTab, string> = {
  basic:    "bg-blue-500/10",
  ifelse:   "bg-emerald-500/10",
  ifelseif: "bg-violet-500/10",
  guard:    "bg-orange-500/10",
};

const tabBgActive: Record<IfElseTab, string> = {
  basic:    "bg-blue-500/25",
  ifelse:   "bg-emerald-500/25",
  ifelseif: "bg-violet-500/25",
  guard:    "bg-orange-500/25",
};

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<IfElseTab, TabInfo> = {
  basic: {
    label: "Basic if",
    color: tabColors.basic,
    badgeColor: tabBadgeColors.basic,
    description:
      "Executes a block only when the condition is true. If the condition is false, nothing happens — the code is simply skipped.",
    codeSnippet: `let age = 20;

if (age >= 18) {
  console.log("You are an adult");
}
// Nothing happens if age < 18`,
    codeOutput: ["You are an adult"],
  },
  ifelse: {
    label: "if/else",
    color: tabColors.ifelse,
    badgeColor: tabBadgeColors.ifelse,
    description:
      "Provides two branches: one for when the condition is true, and a fallback for when it is false. Exactly one branch always executes.",
    codeSnippet: `let temperature = 35;

if (temperature > 30) {
  console.log("It's hot outside!");
} else {
  console.log("The weather is pleasant");
}`,
    codeOutput: ["It's hot outside!"],
  },
  ifelseif: {
    label: "if/else if/else",
    color: tabColors.ifelseif,
    badgeColor: tabBadgeColors.ifelseif,
    description:
      "Chains multiple conditions together. JavaScript evaluates them top-to-bottom and enters the first branch whose condition is true. The final else is the catch-all fallback.",
    codeSnippet: `let score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}`,
    codeOutput: ["Grade: B"],
  },
  guard: {
    label: "Guard Clauses",
    color: tabColors.guard,
    badgeColor: tabBadgeColors.guard,
    description:
      "Early returns that handle edge cases first, keeping the main logic un-nested and readable. A common pattern in production code.",
    codeSnippet: `function processUser(user) {
  if (!user) {
    return "Error: no user";
  }
  if (!user.name) {
    return "Error: no name";
  }
  if (user.age < 0) {
    return "Error: invalid age";
  }
  // Main logic — no nesting!
  return \`Welcome, \${user.name}!\`;
}

console.log(processUser({ name: "Alice", age: 25 }));`,
    codeOutput: ["Welcome, Alice!"],
  },
};

const tabLabels: { key: IfElseTab; label: string }[] = [
  { key: "basic",    label: "Basic if" },
  { key: "ifelse",   label: "if/else" },
  { key: "ifelseif", label: "if/else if/else" },
  { key: "guard",    label: "Guard Clauses" },
];

// ─── Flow Diagram helpers ─────────────────────────────────────────────────────
function Arrow() {
  return (
    <div className="flex justify-center">
      <div className="w-0.5 h-6 bg-muted-foreground/40 relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-muted-foreground/40" />
      </div>
    </div>
  );
}

function FlowBox({
  text,
  variant,
  active,
  tab,
}: {
  text: string;
  variant: "condition" | "action" | "end";
  active?: boolean;
  tab: IfElseTab;
}) {
  const base = "px-3 py-2 text-xs font-semibold text-center rounded-lg border transition-all duration-300";
  const styles =
    variant === "condition"
      ? `${base} ${active ? tabBgActive[tab] + " " + tabBorderAccent[tab] + " scale-105 shadow-md" : tabBgAccent[tab] + " " + tabBorderAccent[tab]}`
      : variant === "action"
        ? `${base} ${active ? "bg-primary/20 border-primary/50 scale-105 shadow-md" : "bg-muted/40 border-border"}`
        : `${base} bg-muted/30 border-border text-muted-foreground`;

  return <div className={styles}>{text}</div>;
}

// ─── Flow Diagrams ────────────────────────────────────────────────────────────
function BasicIfFlow() {
  return (
    <div className="flex flex-col items-center gap-0">
      <FlowBox text="Start" variant="end" tab="basic" />
      <Arrow />
      <FlowBox text="condition === true?" variant="condition" tab="basic" />
      <div className="flex items-start gap-6 mt-0">
        <div className="flex flex-col items-center">
          <Arrow />
          <Badge variant="outline" className="text-[10px] mb-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">true</Badge>
          <FlowBox text="Execute block" variant="action" tab="basic" />
          <Arrow />
        </div>
        <div className="flex flex-col items-center">
          <Arrow />
          <Badge variant="outline" className="text-[10px] mb-1 bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30">false</Badge>
          <FlowBox text="Skip (do nothing)" variant="end" tab="basic" />
          <Arrow />
        </div>
      </div>
      <FlowBox text="Continue" variant="end" tab="basic" />
    </div>
  );
}

function IfElseFlow() {
  return (
    <div className="flex flex-col items-center gap-0">
      <FlowBox text="Start" variant="end" tab="ifelse" />
      <Arrow />
      <FlowBox text="condition === true?" variant="condition" tab="ifelse" />
      <div className="flex items-start gap-6 mt-0">
        <div className="flex flex-col items-center">
          <Arrow />
          <Badge variant="outline" className="text-[10px] mb-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">true</Badge>
          <FlowBox text="if block" variant="action" tab="ifelse" />
          <Arrow />
        </div>
        <div className="flex flex-col items-center">
          <Arrow />
          <Badge variant="outline" className="text-[10px] mb-1 bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30">false</Badge>
          <FlowBox text="else block" variant="action" tab="ifelse" />
          <Arrow />
        </div>
      </div>
      <FlowBox text="Continue" variant="end" tab="ifelse" />
    </div>
  );
}

function IfElseIfFlow({ activeIndex }: { activeIndex: number | null }) {
  const branches = [
    { condition: "score >= 90", action: 'Grade: A', range: "90-100" },
    { condition: "score >= 80", action: 'Grade: B', range: "80-89" },
    { condition: "score >= 70", action: 'Grade: C', range: "70-79" },
    { condition: "else",        action: 'Grade: F', range: "0-69" },
  ];

  return (
    <div className="flex flex-col items-center gap-0">
      <FlowBox text="Start" variant="end" tab="ifelseif" />
      <Arrow />
      <div className="space-y-0">
        {branches.map((b, i) => (
          <div key={b.range} className="flex flex-col items-center">
            {b.condition !== "else" ? (
              <FlowBox
                text={b.condition + "?"}
                variant="condition"
                active={activeIndex === i}
                tab="ifelseif"
              />
            ) : null}
            <div className="flex items-start gap-4 mt-0">
              <div className="flex flex-col items-center">
                <Arrow />
                <Badge
                  variant="outline"
                  className={`text-[10px] mb-1 ${
                    b.condition === "else"
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                      : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                  }`}
                >
                  {b.condition === "else" ? "else" : "true"}
                </Badge>
                <FlowBox
                  text={b.action}
                  variant="action"
                  active={activeIndex === i}
                  tab="ifelseif"
                />
              </div>
              {b.condition !== "else" && (
                <div className="flex flex-col items-center">
                  <Arrow />
                  <Badge variant="outline" className="text-[10px] mb-1 bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30">false</Badge>
                </div>
              )}
            </div>
            {i < branches.length - 1 && b.condition !== "else" && <Arrow />}
          </div>
        ))}
      </div>
      <Arrow />
      <FlowBox text="Continue" variant="end" tab="ifelseif" />
    </div>
  );
}

function GuardClauseFlow() {
  const guards = [
    { check: "!user",      exit: 'return "Error: no user"' },
    { check: "!user.name", exit: 'return "Error: no name"' },
    { check: "user.age < 0", exit: 'return "Error: invalid age"' },
  ];

  return (
    <div className="flex flex-col items-center gap-0">
      <FlowBox text="processUser(user)" variant="end" tab="guard" />
      {guards.map((g) => (
        <div key={g.check} className="flex flex-col items-center">
          <Arrow />
          <FlowBox text={g.check + "?"} variant="condition" tab="guard" />
          <div className="flex items-start gap-4 mt-0">
            <div className="flex flex-col items-center">
              <Arrow />
              <Badge variant="outline" className="text-[10px] mb-1 bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30">true</Badge>
              <FlowBox text={g.exit} variant="action" tab="guard" />
              <Badge variant="outline" className="text-[10px] mt-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30">early exit</Badge>
            </div>
            <div className="flex flex-col items-center">
              <Arrow />
              <Badge variant="outline" className="text-[10px] mb-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">false</Badge>
            </div>
          </div>
        </div>
      ))}
      <Arrow />
      <FlowBox text='return `Welcome, ${user.name}!`' variant="action" active tab="guard" />
      <Arrow />
      <FlowBox text="End" variant="end" tab="guard" />
    </div>
  );
}

// ─── Score picker for if/else if/else ─────────────────────────────────────────
function ScorePicker({
  score,
  onChange,
}: {
  score: number;
  onChange: (v: number) => void;
}) {
  const steps = [0, 10, 20, 30, 40, 50, 60, 65, 70, 75, 80, 85, 90, 95, 100];

  const getGradeColor = (v: number) => {
    if (v >= 90) return "bg-emerald-500 text-white";
    if (v >= 80) return "bg-blue-500 text-white";
    if (v >= 70) return "bg-amber-500 text-white";
    return "bg-red-500 text-white";
  };

  const getGrade = (v: number) => {
    if (v >= 90) return "A";
    if (v >= 80) return "B";
    if (v >= 70) return "C";
    return "F";
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-muted-foreground">Pick a score:</span>
        {steps.map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`px-2 py-1 rounded-md text-xs font-mono border transition-all ${
              score === v
                ? getGradeColor(v) + " scale-110 shadow-md border-transparent"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          score = <span className="font-mono font-bold text-foreground">{score}</span>
        </span>
        <Badge className={`text-xs ${getGradeColor(score)} border-0`}>
          Grade: {getGrade(score)}
        </Badge>
        <span className="text-xs text-muted-foreground italic">
          {score >= 90
            ? "Branch: score >= 90 (first condition matches)"
            : score >= 80
              ? "Branch: score >= 80 (second condition matches)"
              : score >= 70
                ? "Branch: score >= 70 (third condition matches)"
                : "Branch: else (no conditions matched)"}
        </span>
      </div>
    </div>
  );
}

// ─── helper: get active branch index for a score ──────────────────────────────
function getActiveBranch(score: number): number {
  if (score >= 90) return 0;
  if (score >= 80) return 1;
  if (score >= 70) return 2;
  return 3;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export function IfElseVisualization() {
  const [tab, setTab] = useState<IfElseTab>("basic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [score, setScore] = useState(85);

  const switchTab = (t: IfElseTab) => {
    setTab(t);
    setOutputLines(null);
  };

  const getGrade = (v: number) => {
    if (v >= 90) return "A";
    if (v >= 80) return "B";
    if (v >= 70) return "C";
    return "F";
  };

  const handleRun = () => {
    if (tab === "ifelseif") {
      setOutputLines([`Grade: ${getGrade(score)}`]);
    } else {
      setOutputLines(tabs[tab].codeOutput);
    }
  };

  const currentCodeSnippet =
    tab === "ifelseif"
      ? `let score = ${score};

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}`
      : tabs[tab].codeSnippet;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">if/else Statements Visualizer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ── Tab chips ────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2">
          {tabLabels.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => switchTab(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                tab === key
                  ? tabColors[key] + " scale-105 shadow-sm"
                  : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Description ──────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="space-y-4"
          >
            <div className={`rounded-xl border px-4 py-3 text-xs ${tabColors[tab]}`}>
              <span className="font-semibold">{tabs[tab].label}:</span>{" "}
              {tabs[tab].description}
            </div>

            {/* ── Flow diagram ───────────────────────────────────────── */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Flow Diagram</p>
              <div className="rounded-xl border bg-muted/10 px-6 py-6 overflow-x-auto">
                {tab === "basic" && <BasicIfFlow />}
                {tab === "ifelse" && <IfElseFlow />}
                {tab === "ifelseif" && <IfElseIfFlow activeIndex={getActiveBranch(score)} />}
                {tab === "guard" && <GuardClauseFlow />}
              </div>
            </div>

            {/* ── Score picker (only for if/else if/else) ────────────── */}
            {tab === "ifelseif" && (
              <ScorePicker
                score={score}
                onChange={(v) => {
                  setScore(v);
                  setOutputLines(null);
                }}
              />
            )}

            {/* ── Code + Output side by side ──────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Code</p>
                <pre
                  className={`text-xs font-mono rounded-xl border px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px] ${tabColors[tab]}`}
                >
                  {currentCodeSnippet}
                </pre>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>

            {/* ── Run button ──────────────────────────────────────────── */}
            <div className="flex items-center gap-2">
              <Button onClick={handleRun} size="sm">
                <Play className="h-3.5 w-3.5 mr-1" /> Run
              </Button>
              <Button
                onClick={() => setOutputLines(null)}
                variant="outline"
                size="sm"
              >
                Clear
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
