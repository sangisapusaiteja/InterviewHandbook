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
type CellState = "left" | "right" | "left-active" | "right-active" | "placing" | "sorted" | "idle";

function ArrayDiagram({
  arr,
  states,
}: {
  arr: number[];
  states: CellState[];
}) {
  const bgMap: Record<CellState, string> = {
    "left":         "#3b82f640",
    "right":        "#f9731640",
    "left-active":  "#3b82f6",
    "right-active": "#f97316",
    "placing":      "#a855f7",
    "sorted":       "#22c55e",
    "idle":         "transparent",
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
                scale: state === "left-active" || state === "right-active" || state === "placing" ? 1.15 : 1,
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

type PracticeTab = "mergeTwoSorted" | "countInversions" | "kthSmallest";

// ─── Build sort steps (bottom-up, iterative) ───────────────────────────────
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

  steps.push({
    arr: [...a],
    states: Array(n).fill("idle"),
    output: `Input: [${a.join(", ")}]. Each element is a sorted sub-array of size 1. Start merging pairs…`,
  });

  for (let width = 1; width < n; width *= 2) {
    for (let lo = 0; lo < n; lo += 2 * width) {
      const mid = Math.min(lo + width, n);
      const hi  = Math.min(lo + 2 * width, n);
      if (mid >= hi) continue;

      const left  = a.slice(lo, mid);
      const right = a.slice(mid, hi);

      // highlight the two halves
      steps.push({
        arr: [...a],
        states: a.map((_, idx) => {
          if (idx >= lo && idx < mid) return "left";
          if (idx >= mid && idx < hi) return "right";
          return "idle";
        }),
        output: `Merging left [${left.join(", ")}] (blue) and right [${right.join(", ")}] (orange)`,
      });

      // merge element by element
      let i = 0, j = 0, k = lo;
      const temp = [...a];

      while (i < left.length && j < right.length) {
        const pickLeft = left[i] <= right[j];

        steps.push({
          arr: [...a],
          states: a.map((_, idx) => {
            if (idx === lo + i)  return "left-active";
            if (idx === mid + j) return "right-active";
            if (idx >= lo && idx < mid) return "left";
            if (idx >= mid && idx < hi) return "right";
            return "idle";
          }),
          output: `  Compare ${left[i]} vs ${right[j]} → pick ${pickLeft ? left[i] : right[j]}`,
        });

        temp[k] = pickLeft ? left[i++] : right[j++];
        a[k] = temp[k];

        steps.push({
          arr: [...a],
          states: a.map((_, idx) => {
            if (idx === k) return "placing";
            if (idx >= lo && idx < k)   return "sorted";
            if (idx >= lo + i && idx < mid) return "left";
            if (idx >= mid + j && idx < hi) return "right";
            return "idle";
          }),
          output: `  Placed ${a[k]} at index ${k}`,
        });
        k++;
      }

      // copy remaining
      while (i < left.length) {
        a[k] = left[i++];
        steps.push({
          arr: [...a],
          states: a.map((_, idx) => {
            if (idx === k) return "placing";
            if (idx >= lo && idx < k) return "sorted";
            if (idx >= lo + i && idx < mid) return "left";
            return "idle";
          }),
          output: `  Copy remaining left: ${a[k]} → index ${k}`,
        });
        k++;
      }
      while (j < right.length) {
        a[k] = right[j++];
        steps.push({
          arr: [...a],
          states: a.map((_, idx) => {
            if (idx === k) return "placing";
            if (idx >= lo && idx < k) return "sorted";
            if (idx >= mid + j && idx < hi) return "right";
            return "idle";
          }),
          output: `  Copy remaining right: ${a[k]} → index ${k}`,
        });
        k++;
      }

      steps.push({
        arr: [...a],
        states: a.map((_, idx) => (idx >= lo && idx < hi ? "sorted" : "idle")),
        output: `  Merged → [${a.slice(lo, hi).join(", ")}]`,
      });
    }

    steps.push({
      arr: [...a],
      states: Array(n).fill("idle"),
      output: `Width-${width} pass complete: [${a.join(", ")}]`,
    });
  }

  steps.push({
    arr: [...a],
    states: Array(n).fill("sorted"),
    output: `Sorted! [${a.join(", ")}]`,
  });

  return {
    initial,
    steps,
    code: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid   = Math.floor(arr.length / 2);\n  const left  = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\n\nfunction merge(left, right) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length)\n    result.push(left[i] <= right[j] ? left[i++] : right[j++]);\n  return result.concat(left.slice(i), right.slice(j));\n}\n\nconsole.log(mergeSort([${initial.join(", ")}]));`,
    output: [
      `[${a.join(", ")}]`,
      `O(n log n) always  |  n=${n}, log₂n≈${Math.ceil(Math.log2(n))} levels`,
    ],
  };
}

// ─── Build practice ────────────────────────────────────────────────────────
function buildPractice(
  tab: PracticeTab,
  inputA: string,
  inputB: string,
): { code: string; output: string; steps: PracticeStep[] } {
  const parseArr = (s: string) =>
    s.split(",").map((x) => Number(x.trim())).filter((n) => !isNaN(n));

  switch (tab) {
    case "mergeTwoSorted": {
      const left  = [...parseArr(inputA)].sort((a, b) => a - b);
      const right = [...parseArr(inputB)].sort((a, b) => a - b);
      const result: number[] = [];
      let i = 0, j = 0;
      const steps: PracticeStep[] = [
        { label: "Left",  value: `[${left.join(", ")}]` },
        { label: "Right", value: `[${right.join(", ")}]` },
      ];
      while (i < left.length && j < right.length) {
        const pickL = left[i] <= right[j];
        steps.push({
          label: `L[${i}]=${left[i]} vs R[${j}]=${right[j]}`,
          value: `pick ${pickL ? left[i] : right[j]} (${pickL ? "left" : "right"})`,
        });
        result.push(pickL ? left[i++] : right[j++]);
      }
      while (i < left.length)  { steps.push({ label: `Remaining L[${i}]`, value: String(left[i]) }); result.push(left[i++]); }
      while (j < right.length) { steps.push({ label: `Remaining R[${j}]`, value: String(right[j]) }); result.push(right[j++]); }
      steps.push({ label: "Result", value: `[${result.join(", ")}]`, highlight: true });
      return {
        code: `function merge(left, right) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    if (left[i] <= right[j]) result.push(left[i++]);\n    else                     result.push(right[j++]);\n  }\n  return result.concat(left.slice(i), right.slice(j));\n}\nconsole.log(merge([${left.join(", ")}], [${right.join(", ")}]));`,
        output: `[${result.join(", ")}]`,
        steps,
      };
    }

    case "countInversions": {
      const arr = parseArr(inputA).slice(0, 8);
      if (!arr.length) {
        return { code: "", output: "0", steps: [{ label: "Result", value: "0", highlight: true }] };
      }
      const steps: PracticeStep[] = [
        { label: "Input",    value: `[${arr.join(", ")}]` },
        { label: "Def",      value: "pair (i<j) where arr[i] > arr[j]" },
      ];
      let total = 0;
      const naive = [...arr];
      for (let i = 0; i < naive.length; i++) {
        for (let j = i + 1; j < naive.length; j++) {
          if (naive[i] > naive[j]) {
            total++;
            steps.push({ label: `(${i},${j})`, value: `${naive[i]} > ${naive[j]}  → inversion #${total}` });
          }
        }
      }
      steps.push({ label: "Total", value: `${total} inversion${total !== 1 ? "s" : ""}`, highlight: true });
      steps.push({ label: "Note", value: "Merge sort counts this in O(n log n) — not O(n²)" });
      return {
        code: `// Merge sort counts inversions in O(n log n).\n// During merge: if right[j] < left[i],\n// ALL remaining left elements form inversions.\nfunction countInversions(arr) {\n  if (arr.length <= 1) return { sorted: arr, count: 0 };\n  const mid = Math.floor(arr.length / 2);\n  const { sorted: L, count: lc } = countInversions(arr.slice(0, mid));\n  const { sorted: R, count: rc } = countInversions(arr.slice(mid));\n  let count = lc + rc, i = 0, j = 0;\n  const merged = [];\n  while (i < L.length && j < R.length) {\n    if (L[i] <= R[j]) merged.push(L[i++]);\n    else { count += L.length - i; merged.push(R[j++]); }\n  }\n  return { sorted: merged.concat(L.slice(i), R.slice(j)), count };\n}\nconsole.log(countInversions([${arr.join(", ")}]).count);`,
        output: String(total),
        steps,
      };
    }

    case "kthSmallest": {
      const arr  = parseArr(inputA).slice(0, 8);
      const k    = Math.max(1, Math.min(Math.abs(Number(inputB.trim())) || 1, arr.length));
      const sorted = [...arr].sort((a, b) => a - b);
      const result = sorted[k - 1];
      const steps: PracticeStep[] = [
        { label: "Input", value: `[${arr.join(", ")}]` },
        { label: "k",     value: String(k) },
        { label: "Step 1", value: "Merge sort the array → O(n log n)" },
        { label: "Sorted", value: `[${sorted.join(", ")}]` },
        { label: "Step 2", value: `Return sorted[${k - 1}] → O(1)` },
        { label: "Result", value: `${k}${k === 1 ? "st" : k === 2 ? "nd" : k === 3 ? "rd" : "th"} smallest = ${result}`, highlight: true },
      ];
      return {
        code: `function kthSmallest(arr, k) {\n  // sort using merge sort, then index\n  const sorted = mergeSort([...arr]);\n  return sorted[k - 1];\n}\n\nfunction mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));\n}\nfunction merge(L, R) {\n  const res = [];\n  let i = 0, j = 0;\n  while (i < L.length && j < R.length)\n    res.push(L[i] <= R[j] ? L[i++] : R[j++]);\n  return res.concat(L.slice(i), R.slice(j));\n}\nconsole.log(kthSmallest([${arr.join(", ")}], ${k}));`,
        output: String(result),
        steps,
      };
    }
  }
}

// ─── Constants ─────────────────────────────────────────────────────────────
const practiceLabel: Record<PracticeTab, string> = {
  mergeTwoSorted:  "Merge Two Sorted Arrays",
  countInversions: "Count Inversions",
  kthSmallest:     "Kth Smallest Element",
};

const practiceColor: Record<PracticeTab, string> = {
  mergeTwoSorted:
    "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  countInversions:
    "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
  kthSmallest:
    "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
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
      await new Promise<void>((res) => setTimeout(res, 360));
      setStepIndex(i);
      setArr(result.steps[i].arr);
    }
    setRunning(false);
  };

  const curStates  = stepIndex >= 0 ? steps[stepIndex]?.states  ?? [] : [];
  const curStepOut = stepIndex >= 0 ? steps[stepIndex]?.output  ?? "" : "";

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Visualization
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <p><span className="font-semibold text-blue-500">Blue</span> — left half being merged</p>
            <p><span className="font-semibold text-orange-500">Orange</span> — right half being merged</p>
            <p><span className="font-semibold text-purple-500">Purple</span> — element just placed</p>
            <p><span className="font-semibold text-green-500">Green</span> — element in sorted position</p>
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

      {hasRun && (
        <div className="rounded-xl border bg-muted/20 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-muted-foreground">
              Diagram
              {stepIndex >= 0 && (
                <span className="ml-2 font-normal">— Step {stepIndex + 1} / {steps.length}</span>
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
  const [tab, setTab]                   = useState<PracticeTab>("mergeTwoSorted");
  const [inputA, setInputA]             = useState("1,3,5,7");
  const [inputB, setInputB]             = useState("2,4,6,8");
  const [outputLines, setOutputLines]   = useState<string[] | null>(null);
  const [steps, setSteps]               = useState<PracticeStep[]>([]);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [running, setRunning]           = useState(false);

  const { code } = buildPractice(tab, inputA, inputB);

  const labelA: Record<PracticeTab, string> = {
    mergeTwoSorted:  "Left sorted array",
    countInversions: "Array",
    kthSmallest:     "Array",
  };
  const labelB: Record<PracticeTab, string | null> = {
    mergeTwoSorted:  "Right sorted array",
    countInversions: null,
    kthSmallest:     "k (1-indexed)",
  };

  const clearOutput = () => {
    setOutputLines(null);
    setSteps([]);
    setVisibleSteps(0);
    setRunning(false);
  };

  const handleTabChange = (key: PracticeTab) => {
    setTab(key);
    clearOutput();
    if (key === "mergeTwoSorted") { setInputA("1,3,5,7"); setInputB("2,4,6,8"); }
    else if (key === "countInversions") { setInputA("5,3,8,4,2"); setInputB(""); }
    else { setInputA("5,3,8,4,2"); setInputB("2"); }
  };

  const handleRun = async () => {
    if (running) return;
    const result = buildPractice(tab, inputA, inputB);
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

      <div className="flex flex-wrap gap-2">
        {(Object.keys(practiceLabel) as PracticeTab[]).map((key) => (
          <button
            key={key}
            onClick={() => handleTabChange(key)}
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

      <div className="flex flex-wrap gap-2 items-end">
        <div className="space-y-1 flex-1 min-w-[140px]">
          <p className="text-xs font-semibold text-muted-foreground">{labelA[tab]}</p>
          <input
            value={inputA}
            onChange={(e) => { setInputA(e.target.value); clearOutput(); }}
            className={`w-full rounded-lg border px-3 py-2 text-xs font-mono focus:outline-none ${practiceColor[tab]}`}
            placeholder="e.g. 1,3,5"
            disabled={running}
          />
        </div>
        {labelB[tab] && (
          <div className="space-y-1 flex-1 min-w-[100px]">
            <p className="text-xs font-semibold text-muted-foreground">{labelB[tab]}</p>
            <input
              value={inputB}
              onChange={(e) => { setInputB(e.target.value); clearOutput(); }}
              className={`w-full rounded-lg border px-3 py-2 text-xs font-mono focus:outline-none ${practiceColor[tab]}`}
              placeholder={tab === "kthSmallest" ? "e.g. 2" : "e.g. 2,4,6"}
              disabled={running}
            />
          </div>
        )}
        <Button size="sm" onClick={handleRun} disabled={running || !inputA}>
          <Play className="h-3.5 w-3.5 mr-1" />
          {running ? "Running…" : "Run"}
        </Button>
        <Button size="sm" variant="outline" onClick={clearOutput} disabled={running}>
          <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
        </Button>
      </div>

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
export function MergeSortVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Merge Sort</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SortSection />
        <Separator />
        <PracticeSection />
      </CardContent>
    </Card>
  );
}
