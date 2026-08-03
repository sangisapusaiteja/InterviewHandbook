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
          {lines.map((line, i) => (
            <p key={`${line}-${i}`} className="text-emerald-400">
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
          <p className="text-xs text-muted-foreground italic">Click Run to see output</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── types & data ─────────────────────────────────────────────────────────────
type Tab = "break" | "continue" | "labelled" | "comparison";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

const tabColor: Record<Tab, string> = {
  break:      "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300",
  continue:   "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  labelled:   "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  comparison: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
};

const tabBadgeColor: Record<Tab, string> = {
  break:      "bg-red-500/20 text-red-700 dark:text-red-300",
  continue:   "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  labelled:   "bg-violet-500/20 text-violet-700 dark:text-violet-300",
  comparison: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
};

const tabs: { key: Tab; label: string }[] = [
  { key: "break",      label: "break" },
  { key: "continue",   label: "continue" },
  { key: "labelled",   label: "Labelled break" },
  { key: "comparison", label: "Comparison" },
];

const tabData: Record<Tab, TabInfo> = {
  break: {
    label: "break",
    color: tabColor.break,
    badgeColor: tabBadgeColor.break,
    description:
      "The break statement immediately terminates the current loop. No further iterations are executed after the break is hit. Commonly used to exit early when a target condition is met.",
    codeSnippet:
`for (let i = 0; i < 6; i++) {
  if (i === 3) break;
  console.log("i =", i);
}
// Loop stops entirely at i === 3`,
    codeOutput: ['"i = 0"', '"i = 1"', '"i = 2"'],
  },
  continue: {
    label: "continue",
    color: tabColor.continue,
    badgeColor: tabBadgeColor.continue,
    description:
      "The continue statement skips the rest of the current iteration and jumps to the next one. The loop itself keeps running. Useful for filtering out unwanted values without stopping the loop.",
    codeSnippet:
`for (let i = 0; i < 6; i++) {
  if (i === 3) continue;
  console.log("i =", i);
}
// Skips only i === 3, then continues`,
    codeOutput: ['"i = 0"', '"i = 1"', '"i = 2"', '"i = 4"', '"i = 5"'],
  },
  labelled: {
    label: "Labelled break",
    color: tabColor.labelled,
    badgeColor: tabBadgeColor.labelled,
    description:
      "A labelled break exits an outer loop from within a nested inner loop. You place a label (e.g. outer:) before the loop and use break outer; to jump out of both loops at once.",
    codeSnippet:
`outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break outer;
    console.log("i=" + i, "j=" + j);
  }
}
// Exits BOTH loops when i=1, j=1`,
    codeOutput: ['"i=0 j=0"', '"i=0 j=1"', '"i=0 j=2"', '"i=1 j=0"'],
  },
  comparison: {
    label: "Comparison",
    color: tabColor.comparison,
    badgeColor: tabBadgeColor.comparison,
    description:
      "break and continue both alter loop flow but in opposite ways. break exits the loop entirely, while continue skips only the current iteration.",
    codeSnippet: "",
    codeOutput: [],
  },
};

// ─── Iteration block visualisation ───────────────────────────────────────────
interface IterBlock {
  index: number;
  status: "ran" | "skipped" | "stopped";
  label: string;
}

function getBreakBlocks(): IterBlock[] {
  return [
    { index: 0, status: "ran",     label: "i = 0" },
    { index: 1, status: "ran",     label: "i = 1" },
    { index: 2, status: "ran",     label: "i = 2" },
    { index: 3, status: "stopped", label: "i = 3  BREAK" },
    { index: 4, status: "skipped", label: "i = 4" },
    { index: 5, status: "skipped", label: "i = 5" },
  ];
}

function getContinueBlocks(): IterBlock[] {
  return [
    { index: 0, status: "ran",     label: "i = 0" },
    { index: 1, status: "ran",     label: "i = 1" },
    { index: 2, status: "ran",     label: "i = 2" },
    { index: 3, status: "skipped", label: "i = 3  SKIP" },
    { index: 4, status: "ran",     label: "i = 4" },
    { index: 5, status: "ran",     label: "i = 5" },
  ];
}

interface LabelledBlock {
  i: number;
  j: number;
  status: "ran" | "stopped" | "skipped";
  label: string;
}

function getLabelledBlocks(): LabelledBlock[] {
  const blocks: LabelledBlock[] = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i < 1 || (i === 1 && j < 1)) {
        blocks.push({ i, j, status: "ran", label: `i=${i} j=${j}` });
      } else if (i === 1 && j === 1) {
        blocks.push({ i, j, status: "stopped", label: `i=${i} j=${j}  BREAK outer` });
      } else {
        blocks.push({ i, j, status: "skipped", label: `i=${i} j=${j}` });
      }
    }
  }
  return blocks;
}

const statusStyles: Record<string, string> = {
  ran:     "bg-emerald-500/20 border-emerald-500/50 text-emerald-700 dark:text-emerald-300",
  skipped: "bg-zinc-500/10 border-zinc-400/30 text-zinc-400 dark:text-zinc-500 line-through",
  stopped: "bg-red-500/20 border-red-500/50 text-red-700 dark:text-red-300 font-bold",
};

function IterBlockRow({ blocks, delay = 0.06 }: { blocks: (IterBlock | LabelledBlock)[]; delay?: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {blocks.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * delay, duration: 0.2 }}
          className={`px-3 py-1.5 rounded-lg border text-xs font-mono ${statusStyles[b.status]}`}
        >
          {b.label}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Comparison table ─────────────────────────────────────────────────────────
const comparisonRows = [
  { aspect: "Effect",        breakVal: "Exits the loop entirely",            continueVal: "Skips current iteration only" },
  { aspect: "Loop continues?", breakVal: "No - loop terminates",             continueVal: "Yes - next iteration runs" },
  { aspect: "Use case",      breakVal: "Found what you need, stop searching", continueVal: "Filter out values, keep looping" },
  { aspect: "Works in",      breakVal: "for, while, do...while, switch",     continueVal: "for, while, do...while" },
  { aspect: "With labels",   breakVal: "break label; exits outer loop",      continueVal: "continue label; skips in outer loop" },
];

function ComparisonTable() {
  return (
    <div className="rounded-xl border overflow-hidden text-xs">
      <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
        <span>Aspect</span>
        <span className="text-red-600 dark:text-red-400">break</span>
        <span className="text-blue-600 dark:text-blue-400">continue</span>
      </div>
      {comparisonRows.map((row) => (
        <div
          key={row.aspect}
          className="grid grid-cols-3 px-3 py-2 border-t items-start gap-2"
        >
          <span className="font-semibold">{row.aspect}</span>
          <span className="text-[11px] text-muted-foreground">{row.breakVal}</span>
          <span className="text-[11px] text-muted-foreground">{row.continueVal}</span>
        </div>
      ))}
    </div>
  );
}

function ComparisonVisual() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* break side */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-red-600 dark:text-red-400">break — loop over [0..5], break at 3</p>
        <div className="flex flex-wrap gap-1.5">
          {getBreakBlocks().map((b) => (
            <div
              key={b.label}
              className={`px-2 py-1 rounded-md border text-[10px] font-mono ${statusStyles[b.status]}`}
            >
              {b.index}
              {b.status === "stopped" && " STOP"}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground">Output: 0, 1, 2</p>
      </div>
      {/* continue side */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">continue — loop over [0..5], skip 3</p>
        <div className="flex flex-wrap gap-1.5">
          {getContinueBlocks().map((b) => (
            <div
              key={b.label}
              className={`px-2 py-1 rounded-md border text-[10px] font-mono ${statusStyles[b.status]}`}
            >
              {b.index}
              {b.status === "skipped" && " SKIP"}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground">Output: 0, 1, 2, 4, 5</p>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function BreakContinueVisualization() {
  const [selected, setSelected]       = useState<Tab>("break");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [showBlocks, setShowBlocks]   = useState(false);

  const info = tabData[selected];

  const handleSelect = (key: Tab) => {
    setSelected(key);
    setOutputLines(null);
    setShowBlocks(false);
  };

  const handleRun = () => {
    setOutputLines(info.codeOutput);
    setShowBlocks(true);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Break &amp; Continue Visualizer</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Selector chips */}
        <div className="flex flex-wrap gap-2">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                selected === key
                  ? tabColor[key] + " scale-105 shadow-sm"
                  : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {label}
            </button>
          ))}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${info.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{info.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${info.badgeColor}`}>
                  {selected === "comparison" ? "side-by-side" : "jump statement"}
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{info.description}</p>
            </div>

            {selected !== "comparison" ? (
              <>
                {/* Code + Output */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                    <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                      {info.codeSnippet}
                    </pre>
                  </div>
                  <Button size="sm" onClick={handleRun}>
                    <Play className="h-3.5 w-3.5 mr-1" /> Run
                  </Button>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                    <ConsoleOutput lines={outputLines} />
                  </div>
                </div>

                {/* Iteration visualisation */}
                {showBlocks && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">Iteration Flow</p>
                    <div className="rounded-xl border px-4 py-3 bg-muted/20">
                      <div className="flex items-center gap-4 mb-3 text-[10px]">
                        <span className="flex items-center gap-1">
                          <span className="inline-block w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/50" /> Executed
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="inline-block w-3 h-3 rounded bg-red-500/30 border border-red-500/50" /> Break point
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="inline-block w-3 h-3 rounded bg-zinc-500/10 border border-zinc-400/30" /> Skipped
                        </span>
                      </div>
                      {selected === "break" && <IterBlockRow blocks={getBreakBlocks()} />}
                      {selected === "continue" && <IterBlockRow blocks={getContinueBlocks()} />}
                      {selected === "labelled" && <IterBlockRow blocks={getLabelledBlocks()} />}
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Comparison tab */
              <div className="space-y-4">
                <ComparisonVisual />
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">Detailed Comparison</p>
                  <ComparisonTable />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
