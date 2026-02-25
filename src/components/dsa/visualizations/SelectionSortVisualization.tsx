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
type CellState = "sorted" | "pivot" | "minimum" | "comparing" | "swapping" | "idle";

function ArrayDiagram({
  arr,
  states,
}: {
  arr: number[];
  states: CellState[];
}) {
  const bgMap: Record<CellState, string> = {
    sorted:    "#22c55e",
    pivot:     "#a855f7",
    minimum:   "#3b82f6",
    comparing: "#eab308",
    swapping:  "#ef4444",
    idle:      "transparent",
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-center flex-wrap gap-2 py-2">
        {arr.map((val, i) => {
          const state = states[i] ?? "idle";
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  backgroundColor: bgMap[state],
                  scale:
                    state === "comparing" || state === "swapping" || state === "minimum"
                      ? 1.15
                      : 1,
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

type PracticeTab = "findMinIdx" | "countComparisons" | "stableCheck";

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

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // show pivot position
    steps.push({
      arr: [...a],
      states: a.map((_, idx) => {
        if (idx < i)      return "sorted";
        if (idx === i)    return "pivot";
        return "idle";
      }),
      output: `Pass ${i + 1}: start at index ${i} (value ${a[i]}), searching for minimum…`,
    });

    // scan unsorted portion
    for (let j = i + 1; j < n; j++) {
      const isNewMin = a[j] < a[minIdx];
      if (isNewMin) minIdx = j;

      steps.push({
        arr: [...a],
        states: a.map((_, idx) => {
          if (idx < i)       return "sorted";
          if (idx === minIdx) return "minimum";
          if (idx === j)     return "comparing";
          if (idx === i && minIdx !== i) return "pivot";
          return "idle";
        }),
        output: isNewMin
          ? `  [${j}]=${a[j]} < current min ${a[minIdx === j ? i : minIdx]}  →  new min at [${j}]`
          : `  [${j}]=${a[j]} ≥ min ${a[minIdx]}  →  keep min at [${minIdx}]`,
      });
    }

    // swap if needed
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      totalSwaps++;
      steps.push({
        arr: [...a],
        states: a.map((_, idx) => {
          if (idx < i)       return "sorted";
          if (idx === i || idx === minIdx) return "swapping";
          return "idle";
        }),
        output: `  Swap [${i}] ↔ [${minIdx}]  →  ${a[i]} placed in final position`,
      });
    }

    // mark placed element as sorted
    steps.push({
      arr: [...a],
      states: a.map((_, idx) => (idx <= i ? "sorted" : "idle")),
      output: `  Pass ${i + 1} done — arr[${i}]=${a[i]} is in final position`,
    });
  }

  // final state
  steps.push({
    arr: [...a],
    states: Array(n).fill("sorted"),
    output: `Sorted! [${a.join(", ")}]  (${totalSwaps} swap${totalSwaps !== 1 ? "s" : ""}, always ${n * (n - 1) / 2} comparisons)`,
  });

  return {
    initial,
    steps,
    code: `function selectionSort(arr) {\n  const a = [...arr];\n  const n = a.length;\n  for (let i = 0; i < n - 1; i++) {\n    let minIdx = i;\n    for (let j = i + 1; j < n; j++) {\n      if (a[j] < a[minIdx]) minIdx = j;\n    }\n    if (minIdx !== i) {\n      [a[i], a[minIdx]] = [a[minIdx], a[i]];\n    }\n  }\n  return a;\n}\nconsole.log(selectionSort([${initial.join(", ")}]));`,
    output: [
      `[${a.join(", ")}]`,
      `Swaps: ${totalSwaps}  |  Comparisons: ${n * (n - 1) / 2} (always n²/2)`,
    ],
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
    case "findMinIdx": {
      const steps: PracticeStep[] = [
        { label: "Input", value: `[${arr.join(", ")}]` },
        { label: "minIdx", value: "0" },
      ];
      let minIdx = 0;
      for (let j = 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) {
          steps.push({ label: `[${j}] ${arr[j]}`, value: `${arr[j]} < ${arr[minIdx]} → minIdx = ${j}` });
          minIdx = j;
        } else {
          steps.push({ label: `[${j}] ${arr[j]}`, value: `${arr[j]} ≥ ${arr[minIdx]}, skip` });
        }
      }
      steps.push({ label: "Result", value: `min at index ${minIdx} (value ${arr[minIdx]})`, highlight: true });
      return {
        code: `function findMinIndex(arr, start = 0) {\n  let minIdx = start;\n  for (let j = start + 1; j < arr.length; j++) {\n    if (arr[j] < arr[minIdx]) minIdx = j;\n  }\n  return minIdx;\n}\nconsole.log(findMinIndex([${arr.join(", ")}]));`,
        output: String(minIdx),
        steps,
      };
    }

    case "countComparisons": {
      const n = arr.length;
      const total = (n * (n - 1)) / 2;
      const steps: PracticeStep[] = [
        { label: "Input", value: `n = ${n} elements` },
        { label: "Formula", value: "n*(n-1)/2 (always constant)" },
      ];
      for (let i = 0; i < n - 1; i++) {
        steps.push({ label: `Pass ${i + 1}`, value: `${n - 1 - i} comparisons` });
      }
      steps.push({ label: "Total", value: `${total} comparisons`, highlight: true });
      return {
        code: `function countComparisons(n) {\n  // always n*(n-1)/2 — not adaptive\n  return (n * (n - 1)) / 2;\n}\nconsole.log(countComparisons(${n})); // ${total}`,
        output: String(total),
        steps,
      };
    }

    case "stableCheck": {
      // demonstrate instability with a concrete example using objects
      const pairs: { val: number; id: string }[] = arr.map((v, i) => ({
        val: v,
        id: String.fromCharCode(65 + i),
      }));
      const a = [...pairs];
      const n = a.length;
      const steps: PracticeStep[] = [
        { label: "Input", value: pairs.map((p) => `${p.val}(${p.id})`).join(", ") },
        { label: "Note", value: "Track relative order of equal values" },
      ];
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
          if (a[j].val < a[minIdx].val) minIdx = j;
        }
        if (minIdx !== i) {
          steps.push({
            label: `Pass ${i + 1}`,
            value: `Swap ${a[i].val}(${a[i].id}) ↔ ${a[minIdx].val}(${a[minIdx].id})`,
          });
          [a[i], a[minIdx]] = [a[minIdx], a[i]];
        } else {
          steps.push({ label: `Pass ${i + 1}`, value: `${a[i].val}(${a[i].id}) already min, no swap` });
        }
      }
      const result = a.map((p) => `${p.val}(${p.id})`).join(", ");
      steps.push({ label: "Result", value: result, highlight: true });
      steps.push({
        label: "Stable?",
        value: "No — a swap can jump equal elements past each other",
        highlight: false,
      });
      return {
        code: `// Standard selection sort is NOT stable.\n// A swap can move an element past equals.\n// Example: [3A, 3B, 1] → swap 3A with 1 → [1, 3B, 3A]\n// 3A and 3B reversed — stability broken.\n\nfunction selectionSort(arr) {\n  const a = [...arr];\n  const n = a.length;\n  for (let i = 0; i < n - 1; i++) {\n    let minIdx = i;\n    for (let j = i + 1; j < n; j++)\n      if (a[j] < a[minIdx]) minIdx = j;\n    if (minIdx !== i)\n      [a[i], a[minIdx]] = [a[minIdx], a[i]];\n  }\n  return a;\n}`,
        output: result,
        steps,
      };
    }
  }
}

// ─── Constants ─────────────────────────────────────────────────────────────
const practiceLabel: Record<PracticeTab, string> = {
  findMinIdx:       "Find Minimum Index",
  countComparisons: "Count Comparisons",
  stableCheck:      "Stability Demo",
};

const practiceColor: Record<PracticeTab, string> = {
  findMinIdx:
    "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  countComparisons:
    "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
  stableCheck:
    "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300",
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
      await new Promise<void>((res) => setTimeout(res, 350));
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
              <span className="font-semibold text-green-500">Sorted</span>
              {" — "}final position, grows from left
            </p>
            <p>
              <span className="font-semibold text-purple-500">Pivot</span>
              {" — "}slot being filled this pass
            </p>
            <p>
              <span className="font-semibold text-blue-500">Minimum</span>
              {" — "}smallest found so far in unsorted portion
            </p>
            <p>
              <span className="font-semibold text-yellow-500">Comparing</span>
              {" — "}current element being checked
            </p>
            <p>
              <span className="font-semibold text-red-500">Swapping</span>
              {" — "}minimum moved into sorted position
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
  const [tab, setTab]                   = useState<PracticeTab>("findMinIdx");
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
export function SelectionSortVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Selection Sort</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SortSection />
        <Separator />
        <PracticeSection />
      </CardContent>
    </Card>
  );
}
