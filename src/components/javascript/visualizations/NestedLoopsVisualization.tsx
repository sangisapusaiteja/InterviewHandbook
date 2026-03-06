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
            <p key={`${i}-${line}`} className="text-emerald-400">
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
type NestedLoopTab = "howItWorks" | "multiplicationTable" | "patternPrinting" | "combinations";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<NestedLoopTab, TabInfo> = {
  howItWorks: {
    label: "How It Works",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "A nested loop places one loop inside another. The inner loop completes all its iterations for each single iteration of the outer loop. Think of it as scanning a grid row by row, column by column.",
    codeSnippet: `for (let i = 0; i < 3; i++) {       // outer loop (rows)
  for (let j = 0; j < 4; j++) {     // inner loop (columns)
    console.log(\`(\${i}, \${j})\`);
  }
}`,
    codeOutput: [
      "(0,0) (0,1) (0,2) (0,3)",
      "(1,0) (1,1) (1,2) (1,3)",
      "(2,0) (2,1) (2,2) (2,3)",
    ],
  },
  multiplicationTable: {
    label: "Multiplication Table",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Nested loops are perfect for generating multiplication tables. The outer loop controls the multiplicand, the inner loop controls the multiplier.",
    codeSnippet: `for (let i = 1; i <= 5; i++) {
  let row = "";
  for (let j = 1; j <= 5; j++) {
    row += String(i * j).padStart(4);
  }
  console.log(row);
}`,
    codeOutput: [
      "   1   2   3   4   5",
      "   2   4   6   8  10",
      "   3   6   9  12  15",
      "   4   8  12  16  20",
      "   5  10  15  20  25",
    ],
  },
  patternPrinting: {
    label: "Pattern Printing",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Star patterns are a classic nested loop exercise. The outer loop controls the row, and the inner loop controls how many stars to print per row.",
    codeSnippet: `for (let i = 1; i <= 5; i++) {
  let stars = "";
  for (let j = 1; j <= i; j++) {
    stars += "* ";
  }
  console.log(stars);
}`,
    codeOutput: ["*", "* *", "* * *", "* * * *", "* * * * *"],
  },
  combinations: {
    label: "Combinations",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Nested loops can generate all pairs/combinations from two arrays. Each element of the first array is paired with every element of the second.",
    codeSnippet: `const colors = ["Red", "Blue"];
const sizes  = ["S", "M", "L"];

for (const color of colors) {
  for (const size of sizes) {
    console.log(\`\${color}-\${size}\`);
  }
}`,
    codeOutput: [
      "Red-S, Red-M, Red-L",
      "Blue-S, Blue-M, Blue-L",
      "Total combinations: 2 x 3 = 6",
    ],
  },
};

const order: NestedLoopTab[] = ["howItWorks", "multiplicationTable", "patternPrinting", "combinations"];

// ─── Grid Visualization for "How It Works" ───────────────────────────────────
function HowItWorksGrid() {
  const rows = 3;
  const cols = 4;
  const [activeCell, setActiveCell] = useState<{ r: number; c: number } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visitedCells, setVisitedCells] = useState<Set<string>>(new Set());

  const animate = async () => {
    setIsAnimating(true);
    setVisitedCells(new Set());
    setActiveCell(null);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        setActiveCell({ r: i, c: j });
        setVisitedCells((prev) => new Set(prev).add(`${i}-${j}`));
        await new Promise<void>((r) => setTimeout(r, 350));
      }
    }
    setActiveCell(null);
    setIsAnimating(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={animate} disabled={isAnimating}>
          <Play className="h-3.5 w-3.5 mr-1" /> Animate Grid
        </Button>
        {isAnimating && (
          <Badge variant="secondary" className="animate-pulse text-[10px]">
            {activeCell ? `i=${activeCell.r}, j=${activeCell.c}` : "starting..."}
          </Badge>
        )}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4">
        {/* Column headers */}
        <div className="flex gap-1.5 ml-12 mb-1.5">
          {Array.from({ length: cols }, (_, j) => (
            <div
              key={j}
              className={`w-12 h-6 flex items-center justify-center text-[10px] font-mono font-semibold rounded ${
                activeCell?.c === j
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-muted-foreground"
              }`}
            >
              j={j}
            </div>
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="flex items-center gap-1.5 mb-1.5">
            {/* Row label */}
            <div
              className={`w-10 text-right text-[10px] font-mono font-semibold pr-1 ${
                activeCell?.r === i
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-muted-foreground"
              }`}
            >
              i={i}
            </div>

            {/* Cells */}
            {Array.from({ length: cols }, (_, j) => {
              const key = `${i}-${j}`;
              const isActive = activeCell?.r === i && activeCell?.c === j;
              const isVisited = visitedCells.has(key);

              return (
                <motion.div
                  key={key}
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    backgroundColor: isActive
                      ? "rgb(59 130 246)"
                      : isVisited
                        ? "rgb(59 130 246 / 0.25)"
                        : "rgb(128 128 128 / 0.1)",
                  }}
                  transition={{ duration: 0.15 }}
                  className={`w-12 h-10 rounded-lg border flex items-center justify-center text-xs font-mono font-semibold ${
                    isActive
                      ? "border-blue-500 text-white shadow-md"
                      : isVisited
                        ? "border-blue-400/40 text-blue-700 dark:text-blue-300"
                        : "border-border text-muted-foreground"
                  }`}
                >
                  ({i},{j})
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      <p className="text-[11px] text-muted-foreground">
        Outer loop (i) moves down rows. For each row, inner loop (j) moves across all columns before i increments.
      </p>
    </div>
  );
}

// ─── Multiplication Table Visual ──────────────────────────────────────────────
function MultiplicationGrid() {
  const size = 5;
  const [highlightRow, setHighlightRow] = useState<number | null>(null);
  const [highlightCol, setHighlightCol] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      <div className="rounded-xl border bg-muted/20 p-4 overflow-x-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="w-10 h-8 text-[10px] font-mono text-muted-foreground">x</th>
              {Array.from({ length: size }, (_, j) => (
                <th
                  key={j}
                  className={`w-12 h-8 text-center text-xs font-mono font-bold rounded-t ${
                    highlightCol === j + 1
                      ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                      : "text-muted-foreground"
                  }`}
                >
                  {j + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: size }, (_, i) => (
              <tr key={i}>
                <td
                  className={`w-10 h-10 text-center text-xs font-mono font-bold rounded-l ${
                    highlightRow === i + 1
                      ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                      : "text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </td>
                {Array.from({ length: size }, (_, j) => {
                  const product = (i + 1) * (j + 1);
                  const isHighlighted =
                    highlightRow === i + 1 || highlightCol === j + 1;
                  const isCross =
                    highlightRow === i + 1 && highlightCol === j + 1;

                  return (
                    <td
                      key={j}
                      onMouseEnter={() => {
                        setHighlightRow(i + 1);
                        setHighlightCol(j + 1);
                      }}
                      onMouseLeave={() => {
                        setHighlightRow(null);
                        setHighlightCol(null);
                      }}
                      className={`w-12 h-10 text-center text-xs font-mono border rounded cursor-default transition-colors ${
                        isCross
                          ? "bg-emerald-500 text-white font-bold shadow-md"
                          : isHighlighted
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-400/40"
                            : "bg-muted/30 border-border text-foreground"
                      }`}
                    >
                      {product}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-muted-foreground">
        Hover over any cell to highlight its row (i) and column (j). The product is i * j.
      </p>
    </div>
  );
}

// ─── Star Pattern Visual ──────────────────────────────────────────────────────
function StarPatternVisual() {
  const maxRows = 5;
  const [builtRows, setBuiltRows] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = async () => {
    setIsAnimating(true);
    setBuiltRows(0);

    for (let i = 1; i <= maxRows; i++) {
      setBuiltRows(i);
      await new Promise<void>((r) => setTimeout(r, 500));
    }
    setIsAnimating(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={animate} disabled={isAnimating}>
          <Play className="h-3.5 w-3.5 mr-1" /> Build Pattern
        </Button>
        {isAnimating && (
          <Badge variant="secondary" className="animate-pulse text-[10px]">
            row {builtRows} of {maxRows}
          </Badge>
        )}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[160px]">
        <AnimatePresence>
          {Array.from({ length: builtRows }, (_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-1 mb-1.5"
            >
              <span className="w-10 text-right text-[10px] font-mono text-muted-foreground pr-1">
                i={i + 1}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: i + 1 }, (_, j) => (
                  <motion.div
                    key={j}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: j * 0.08, duration: 0.15 }}
                    className="w-8 h-8 rounded-md bg-violet-500/20 border border-violet-400/40 flex items-center justify-center text-sm text-violet-700 dark:text-violet-300"
                  >
                    *
                  </motion.div>
                ))}
              </div>
              <span className="text-[10px] font-mono text-muted-foreground ml-2">
                j: 1..{i + 1}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {builtRows === 0 && !isAnimating && (
          <p className="text-xs text-muted-foreground text-center py-12">
            Click <strong>Build Pattern</strong> to watch the triangle grow row by row
          </p>
        )}
      </div>

      <p className="text-[11px] text-muted-foreground">
        Row i has exactly i stars. The inner loop (j) runs from 1 to i for each row.
      </p>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function NestedLoopsVisualization() {
  const [selected, setSelected] = useState<NestedLoopTab>("howItWorks");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: NestedLoopTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Nested Loops</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Group selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const t = tabs[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? t.color + " scale-105 shadow-sm"
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${tab.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{tab.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${tab.badgeColor}`}>
                  nested loop
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{tab.description}</p>
            </div>

            {/* Two-column: visual | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Visual */}
              <div>
                {selected === "howItWorks" && <HowItWorksGrid />}
                {selected === "multiplicationTable" && <MultiplicationGrid />}
                {selected === "patternPrinting" && <StarPatternVisual />}
                {selected === "combinations" && (
                  <div className="space-y-3">
                    <div className="rounded-xl border bg-muted/20 p-4">
                      <div className="flex flex-wrap gap-2">
                        {["Red", "Blue"].map((color) =>
                          ["S", "M", "L"].map((size) => (
                            <motion.div
                              key={`${color}-${size}`}
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: (color === "Blue" ? 3 : 0) * 0.1 + (size === "M" ? 1 : size === "L" ? 2 : 0) * 0.1, duration: 0.2 }}
                              className={`px-3 py-2 rounded-lg border text-xs font-mono font-semibold ${
                                color === "Red"
                                  ? "bg-red-500/15 border-red-400/40 text-red-700 dark:text-red-300"
                                  : "bg-blue-500/15 border-blue-400/40 text-blue-700 dark:text-blue-300"
                              }`}
                            >
                              {color}-{size}
                            </motion.div>
                          ))
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      2 colors x 3 sizes = 6 combinations. The outer loop iterates colors, the inner loop iterates sizes.
                    </p>
                  </div>
                )}
              </div>

              {/* Right: Code + Output */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {tab.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={() => setOutputLines(tab.codeOutput)}>
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
