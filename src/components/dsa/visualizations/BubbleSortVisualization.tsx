"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ─── Console Output ────────────────────────────────────────────────────────
function ConsoleOutput({ lines }: Readonly<{ lines: string[] | null }>) {
  return (
    <AnimatePresence mode="wait">
      {lines ? (
        <motion.div
          key="out"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[52px] overflow-auto"
        >
          {lines.map((line, i) => (
            <p key={i} className="text-emerald-400">
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
          <p className="text-xs text-muted-foreground italic">
            Click ▶ Run to see output
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Array Diagram ─────────────────────────────────────────────────────────
type CellState = "idle" | "comparing" | "swapping" | "sorted";

function ArrayDiagram({
  arr,
  states,
}: {
  arr: number[];
  states: CellState[];
}) {
  const bgMap: Record<CellState, string> = {
    idle:      "transparent",
    comparing: "#eab308",
    swapping:  "#ef4444",
    sorted:    "#22c55e",
  };

  return (
    <div className="flex justify-center flex-wrap gap-2 py-2">
      {arr.map((val, i) => {
        const state = states[i] ?? "idle";
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <motion.div
              animate={{
                backgroundColor: bgMap[state],
                scale: state === "comparing" || state === "swapping" ? 1.15 : 1,
              }}
              transition={{ duration: 0.25 }}
              className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-border font-mono text-sm font-bold"
            >
              {val}
            </motion.div>
            <span className="text-[10px] text-muted-foreground">{i}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Types ─────────────────────────────────────────────────────────────────
interface SortStep {
  arr: number[];
  states: CellState[];
  output: string;
}

interface PracticeStep {
  label: string;
  value: string;
  highlight?: boolean;
}

type PracticeTab = "countSwaps" | "isSorted" | "optimized";

// ─── Build sort steps ──────────────────────────────────────────────────────
function buildSort(input: string): {
  initial: number[];
  steps: SortStep[];
  code: string;
  output: string[];
} {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const initial = nums.length >= 2 ? nums.slice(0, 8) : [5, 3, 8, 4, 2];
  const a = [...initial];
  const n = a.length;
  const steps: SortStep[] = [];
  let totalSwaps = 0;

  for (let pass = 0; pass < n - 1; pass++) {
    let swapped = false;

    for (let i = 0; i < n - 1 - pass; i++) {
      const sortedFrom = n - pass;

      // comparing
      const cmpStates: CellState[] = a.map((_, idx) => {
        if (idx >= sortedFrom) return "sorted";
        if (idx === i || idx === i + 1) return "comparing";
        return "idle";
      });
      steps.push({
        arr: [...a],
        states: cmpStates,
        output: `Pass ${pass + 1}, i=${i}: Compare arr[${i}]=${a[i]} and arr[${i + 1}]=${a[i + 1]}${a[i] > a[i + 1] ? " → swap" : " → ok"}`,
      });

      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        totalSwaps++;
        swapped = true;

        // swapping
        const swapStates: CellState[] = a.map((_, idx) => {
          if (idx >= sortedFrom) return "sorted";
          if (idx === i || idx === i + 1) return "swapping";
          return "idle";
        });
        steps.push({
          arr: [...a],
          states: swapStates,
          output: `  Swapped → arr[${i}]=${a[i]}, arr[${i + 1}]=${a[i + 1]}`,
        });
      }
    }

    // mark newly sorted element
    const newSortedFrom = n - pass - 1;
    const doneStates: CellState[] = a.map((_, idx) =>
      idx >= newSortedFrom ? "sorted" : "idle",
    );
    steps.push({
      arr: [...a],
      states: doneStates,
      output: `  Pass ${pass + 1} done — arr[${newSortedFrom}]=${a[newSortedFrom]} is in final position`,
    });

    if (!swapped) break;
  }

  // final state — all sorted
  steps.push({
    arr: [...a],
    states: Array(n).fill("sorted"),
    output: `Sorted! [${a.join(", ")}]  (total swaps: ${totalSwaps})`,
  });

  return {
    initial,
    steps,
    code: `function bubbleSort(arr) {\n  const a = [...arr];\n  const n = a.length;\n  for (let pass = 0; pass < n - 1; pass++) {\n    let swapped = false;\n    for (let i = 0; i < n - 1 - pass; i++) {\n      if (a[i] > a[i + 1]) {\n        [a[i], a[i + 1]] = [a[i + 1], a[i]];\n        swapped = true;\n      }\n    }\n    if (!swapped) break;\n  }\n  return a;\n}\nconsole.log(bubbleSort([${initial.join(", ")}]));`,
    output: [`[${a.join(", ")}]`, `Swaps: ${totalSwaps}  |  Passes: ${n - 1} max`],
  };
}

// ─── Build practice ────────────────────────────────────────────────────────
function buildPractice(
  tab: PracticeTab,
  input: string,
): { code: string; output: string; steps: PracticeStep[] } {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const arr = nums.length >= 2 ? nums.slice(0, 8) : [5, 3, 8, 4, 2];

  switch (tab) {
    case "countSwaps": {
      const a = [...arr];
      let swaps = 0;
      const steps: PracticeStep[] = [
        { label: "Input", value: `[${arr.join(", ")}]` },
        { label: "swaps", value: "0" },
      ];
      for (let pass = 0; pass < a.length - 1; pass++) {
        for (let i = 0; i < a.length - 1 - pass; i++) {
          if (a[i] > a[i + 1]) {
            steps.push({
              label: `Pass ${pass + 1}, i=${i}`,
              value: `${a[i]} > ${a[i + 1]} → swap #${swaps + 1}`,
            });
            [a[i], a[i + 1]] = [a[i + 1], a[i]];
            swaps++;
          }
        }
      }
      steps.push({ label: "Result", value: `${swaps} swaps`, highlight: true });
      return {
        code: `function countSwaps(arr) {\n  const a = [...arr];\n  let swaps = 0;\n  for (let pass = 0; pass < a.length - 1; pass++) {\n    for (let i = 0; i < a.length - 1 - pass; i++) {\n      if (a[i] > a[i + 1]) {\n        [a[i], a[i + 1]] = [a[i + 1], a[i]];\n        swaps++;\n      }\n    }\n  }\n  return swaps;\n}\nconsole.log(countSwaps([${arr.join(", ")}]));`,
        output: String(swaps),
        steps,
      };
    }

    case "isSorted": {
      const steps: PracticeStep[] = [
        { label: "Input", value: `[${arr.join(", ")}]` },
      ];
      let sorted = true;
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          steps.push({
            label: `[${i}] vs [${i + 1}]`,
            value: `${arr[i]} > ${arr[i + 1]} → not sorted ✗`,
          });
          sorted = false;
          break;
        }
        steps.push({
          label: `[${i}] vs [${i + 1}]`,
          value: `${arr[i]} ≤ ${arr[i + 1]} → ok`,
        });
      }
      steps.push({ label: "Result", value: String(sorted), highlight: true });
      return {
        code: `function isSorted(arr) {\n  for (let i = 0; i < arr.length - 1; i++) {\n    if (arr[i] > arr[i + 1]) return false;\n  }\n  return true;\n}\nconsole.log(isSorted([${arr.join(", ")}]));`,
        output: String(sorted),
        steps,
      };
    }

    case "optimized": {
      const a = [...arr];
      const n = a.length;
      let passes = 0;
      const steps: PracticeStep[] = [
        { label: "Input", value: `[${arr.join(", ")}]` },
      ];
      for (let pass = 0; pass < n - 1; pass++) {
        let swapped = false;
        for (let i = 0; i < n - 1 - pass; i++) {
          if (a[i] > a[i + 1]) {
            [a[i], a[i + 1]] = [a[i + 1], a[i]];
            swapped = true;
          }
        }
        passes++;
        steps.push({
          label: `Pass ${pass + 1}`,
          value: swapped ? `swaps happened → continue` : `no swaps → stop early ✅`,
        });
        if (!swapped) break;
      }
      steps.push({
        label: "Result",
        value: `[${a.join(", ")}]  in ${passes} pass${passes !== 1 ? "es" : ""}`,
        highlight: true,
      });
      return {
        code: `function bubbleSortOpt(arr) {\n  const a = [...arr];\n  const n = a.length;\n  for (let pass = 0; pass < n - 1; pass++) {\n    let swapped = false;\n    for (let i = 0; i < n - 1 - pass; i++) {\n      if (a[i] > a[i + 1]) {\n        [a[i], a[i + 1]] = [a[i + 1], a[i]];\n        swapped = true;\n      }\n    }\n    if (!swapped) break;\n  }\n  return a;\n}\nconsole.log(bubbleSortOpt([${arr.join(", ")}]));`,
        output: `[${a.join(", ")}]`,
        steps,
      };
    }
  }
}

// ─── Constants ─────────────────────────────────────────────────────────────
const practiceLabel: Record<PracticeTab, string> = {
  countSwaps: "Count Swaps",
  isSorted:   "Is Sorted? — O(n)",
  optimized:  "Optimized (Early Stop)",
};

const practiceColor: Record<PracticeTab, string> = {
  countSwaps:
    "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  isSorted:
    "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  optimized:
    "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
};

// ─── Sort Section ──────────────────────────────────────────────────────────
function SortSection() {
  const [input, setInput]         = useState("5,3,8,4,2");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps]         = useState<SortStep[]>([]);
  const [arr, setArr]             = useState<number[]>([5, 3, 8, 4, 2]);
  const [output, setOutput]       = useState<string[] | null>(null);
  const [running, setRunning]     = useState(false);
  const [hasRun, setHasRun]       = useState(false);

  const { code } = buildSort(input);

  const clear = () => {
    setStepIndex(-1);
    setSteps([]);
    setOutput(null);
    setRunning(false);
    setHasRun(false);
  };

  const handleRun = async () => {
    if (running) return;
    const result = buildSort(input);
    setArr(result.initial);
    setOutput(result.output);
    setSteps(result.steps);
    setHasRun(true);
    setRunning(true);
    for (let i = 0; i < result.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 380));
      setStepIndex(i);
      setArr(result.steps[i].arr);
    }
    setRunning(false);
  };

  const curStates  = stepIndex >= 0 ? steps[stepIndex]?.states ?? [] : [];
  const curStepOut = stepIndex >= 0 ? steps[stepIndex]?.output ?? "" : "";

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Visualization
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left */}
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">
              Array (comma-separated, max 8 elements)
            </p>
            <input
              value={input}
              onChange={(e) => { setInput(e.target.value); clear(); }}
              className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
              placeholder="e.g. 5,3,8,4,2"
            />
          </div>

          <Button size="sm" onClick={handleRun} disabled={running} className="w-full">
            <Play className="h-3.5 w-3.5 mr-1" />
            {running ? "Sorting…" : "Run"}
          </Button>

          <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
            <p>
              <span className="font-semibold text-yellow-500">Comparing</span>
              {" — "}adjacent pair being evaluated
            </p>
            <p>
              <span className="font-semibold text-red-500">Swapping</span>
              {" — "}pair out of order, being swapped
            </p>
            <p>
              <span className="font-semibold text-emerald-500">Sorted</span>
              {" — "}element in its final position
            </p>
          </div>

          {curStepOut && (
            <AnimatePresence mode="wait">
              <motion.div
                key={curStepOut}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-lg border bg-muted/50 px-3 py-2 font-mono text-xs"
              >
                {curStepOut}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Right */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
            <AnimatePresence mode="wait">
              <motion.pre
                key={code}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]"
              >
                {code}
              </motion.pre>
            </AnimatePresence>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
            <ConsoleOutput lines={output} />
          </div>
        </div>
      </div>

      {/* Diagram */}
      {hasRun && (
        <div className="rounded-xl border bg-muted/20 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-muted-foreground">
              Diagram
              {stepIndex >= 0 && (
                <span className="ml-2 font-normal">
                  — Step {stepIndex + 1} / {steps.length}
                </span>
              )}
            </p>
            <Button size="sm" variant="ghost" className="h-6 px-2 text-xs" onClick={clear}>
              <RotateCcw className="h-3 w-3 mr-1" /> Reset
            </Button>
          </div>
          <ArrayDiagram arr={arr} states={curStates} />
        </div>
      )}
    </div>
  );
}

// ─── Practice Section ──────────────────────────────────────────────────────
function PracticeSection() {
  const [tab, setTab]                   = useState<PracticeTab>("countSwaps");
  const [input, setInput]               = useState("5,3,8,4,2");
  const [outputLines, setOutputLines]   = useState<string[] | null>(null);
  const [steps, setSteps]               = useState<PracticeStep[]>([]);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [running, setRunning]           = useState(false);

  const { code } = buildPractice(tab, input);

  const clearOutput = () => {
    setOutputLines(null);
    setSteps([]);
    setVisibleSteps(0);
    setRunning(false);
  };

  const handleRun = async () => {
    if (running) return;
    const result = buildPractice(tab, input);
    setOutputLines([result.output]);
    setSteps(result.steps);
    setVisibleSteps(0);
    setRunning(true);
    for (let i = 1; i <= result.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 280));
      setVisibleSteps(i);
    }
    setRunning(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Practice Problems
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(practiceLabel) as PracticeTab[]).map((key) => (
          <button
            key={key}
            onClick={() => { setTab(key); clearOutput(); }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              tab === key
                ? practiceColor[key] + " scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {practiceLabel[key]}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex flex-wrap gap-2 items-end">
        <div className="space-y-1 flex-1 min-w-[160px]">
          <p className="text-xs font-semibold text-muted-foreground">
            Array (comma-separated)
          </p>
          <input
            value={input}
            onChange={(e) => { setInput(e.target.value); clearOutput(); }}
            className={`w-full rounded-lg border px-3 py-2 text-xs font-mono focus:outline-none ${practiceColor[tab]}`}
            placeholder="e.g. 5,3,8,4,2"
            disabled={running}
          />
        </div>
        <Button size="sm" onClick={handleRun} disabled={running || !input}>
          <Play className="h-3.5 w-3.5 mr-1" />
          {running ? "Running…" : "Run"}
        </Button>
        <Button size="sm" variant="outline" onClick={clearOutput} disabled={running}>
          <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
        </Button>
      </div>

      {/* Code + Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
          <AnimatePresence mode="wait">
            <motion.pre
              key={code}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[160px]"
            >
              {code}
            </motion.pre>
          </AnimatePresence>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
          <ConsoleOutput lines={outputLines} />
        </div>
      </div>

      {/* Step table */}
      {steps.length > 0 && (
        <div className="rounded-xl border overflow-hidden text-xs">
          <div className="grid grid-cols-2 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
            <span>Step</span>
            <span>Value</span>
          </div>
          {steps.slice(0, visibleSteps).map((step, i) => (
            <motion.div
              key={`${i}-${step.label}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`grid grid-cols-2 border-t px-3 py-2 ${
                step.highlight ? `font-semibold ${practiceColor[tab]}` : ""
              }`}
            >
              <span className="font-mono">{step.label}</span>
              <span className="font-mono break-all">{step.value}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────
export function BubbleSortVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Bubble Sort</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SortSection />
        <Separator />
        <PracticeSection />
      </CardContent>
    </Card>
  );
}
