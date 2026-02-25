"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ─── Console Output ─────────────────────────────────────────────────────────
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

// ─── Array Diagram ───────────────────────────────────────────────────────────
type CellState =
  | "idle"
  | "pivot"
  | "less"
  | "greater"
  | "comparing"
  | "swapping"
  | "sorted";

function ArrayDiagram({
  arr,
  states,
}: {
  arr: number[];
  states: CellState[];
}) {
  const bgMap: Record<CellState, string> = {
    idle:      "transparent",
    pivot:     "#f59e0b",   // amber — pivot
    less:      "#3b82f640", // blue tint — confirmed left region
    greater:   "#f9731640", // orange tint — confirmed right region
    comparing: "#a855f7",   // purple — element being compared
    swapping:  "#ef4444",   // red — being swapped
    sorted:    "#22c55e",   // green — in final position
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
                scale:
                  state === "pivot" || state === "swapping" || state === "comparing"
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
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────
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

type PracticeTab = "partition" | "kthLargest" | "dutchFlag";

// ─── Build sort steps (Lomuto partition, iterative via explicit stack) ────────
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
  const initial = nums.length >= 2 ? nums.slice(0, 8) : [5, 3, 8, 4, 2, 7, 1];
  const a = [...initial];
  const n = a.length;
  const steps: SortStep[] = [];
  const sortedSet = new Set<number>(); // indices in final position

  function makeStates(extra: Partial<Record<number, CellState>> = {}): CellState[] {
    return a.map((_, idx) => {
      if (sortedSet.has(idx)) return "sorted";
      return extra[idx] ?? "idle";
    });
  }

  steps.push({
    arr: [...a],
    states: makeStates(),
    output: `Input: [${a.join(", ")}]. Pick pivot = arr[last] each pass, partition in-place.`,
  });

  // Iterative quick sort using an explicit stack of [lo, hi] ranges
  const stack: [number, number][] = [[0, n - 1]];

  while (stack.length) {
    const [lo, hi] = stack.pop()!;
    if (lo >= hi) {
      if (lo === hi) sortedSet.add(lo);
      continue;
    }

    const pivot = a[hi];

    // Highlight the pivot
    steps.push({
      arr: [...a],
      states: makeStates({ [hi]: "pivot" }),
      output: `Partition [${lo}..${hi}]: pivot = ${pivot} (index ${hi})`,
    });

    let i = lo - 1;

    for (let j = lo; j < hi; j++) {
      // Show comparison
      const extraCompare: Partial<Record<number, CellState>> = { [hi]: "pivot", [j]: "comparing" };
      for (let k = lo; k <= i; k++) extraCompare[k] = "less";
      steps.push({
        arr: [...a],
        states: makeStates(extraCompare),
        output: `  arr[${j}]=${a[j]} ${a[j] <= pivot ? "<=" : ">"} pivot ${pivot}${a[j] <= pivot ? " → swap into left region" : " → skip"}`,
      });

      if (a[j] <= pivot) {
        i++;
        if (i !== j) {
          // Show swap
          const extraSwap: Partial<Record<number, CellState>> = { [hi]: "pivot", [i]: "swapping", [j]: "swapping" };
          for (let k = lo; k < i; k++) extraSwap[k] = "less";
          steps.push({
            arr: [...a],
            states: makeStates(extraSwap),
            output: `  Swap arr[${i}]=${a[i]} ↔ arr[${j}]=${a[j]}`,
          });
          [a[i], a[j]] = [a[j], a[i]];
        }
        // Mark as less region
        const extraLess: Partial<Record<number, CellState>> = { [hi]: "pivot" };
        for (let k = lo; k <= i; k++) extraLess[k] = "less";
        steps.push({
          arr: [...a],
          states: makeStates(extraLess),
          output: `  Left region [${lo}..${i}] = [${a.slice(lo, i + 1).join(", ")}]`,
        });
      }
    }

    // Place pivot
    const pivotIdx = i + 1;
    if (pivotIdx !== hi) {
      const extraPlace: Partial<Record<number, CellState>> = { [pivotIdx]: "swapping", [hi]: "swapping" };
      steps.push({
        arr: [...a],
        states: makeStates(extraPlace),
        output: `  Place pivot: swap arr[${pivotIdx}]=${a[pivotIdx]} ↔ arr[${hi}]=${a[hi]}`,
      });
      [a[pivotIdx], a[hi]] = [a[hi], a[pivotIdx]];
    }

    sortedSet.add(pivotIdx);
    steps.push({
      arr: [...a],
      states: makeStates(),
      output: `  Pivot ${pivot} placed at index ${pivotIdx} (final). Left: [${a.slice(lo, pivotIdx).join(", ")}] | Right: [${a.slice(pivotIdx + 1, hi + 1).join(", ")}]`,
    });

    // Push sub-ranges (push right first so left is processed first)
    if (pivotIdx + 1 <= hi) stack.push([pivotIdx + 1, hi]);
    if (lo <= pivotIdx - 1) stack.push([lo, pivotIdx - 1]);
  }

  // Mark any remaining single-element ranges as sorted
  for (let i = 0; i < n; i++) sortedSet.add(i);

  steps.push({
    arr: [...a],
    states: Array(n).fill("sorted"),
    output: `Sorted! [${a.join(", ")}]`,
  });

  return {
    initial,
    steps,
    code: `function quickSort(arr, lo = 0, hi = arr.length - 1) {\n  if (lo < hi) {\n    const p = partition(arr, lo, hi);\n    quickSort(arr, lo, p - 1);\n    quickSort(arr, p + 1, hi);\n  }\n  return arr;\n}\n\nfunction partition(arr, lo, hi) {\n  const pivot = arr[hi];\n  let i = lo - 1;\n  for (let j = lo; j < hi; j++) {\n    if (arr[j] <= pivot) {\n      i++;\n      [arr[i], arr[j]] = [arr[j], arr[i]];\n    }\n  }\n  [arr[i+1], arr[hi]] = [arr[hi], arr[i+1]];\n  return i + 1;\n}\n\nconsole.log(quickSort([${initial.join(", ")}]));`,
    output: [
      `[${a.join(", ")}]`,
      `O(n log n) avg  |  n=${n}, ~${Math.ceil(Math.log2(n))} partition levels`,
    ],
  };
}

// ─── Build practice ──────────────────────────────────────────────────────────
function buildPractice(
  tab: PracticeTab,
  inputA: string,
  inputB: string,
): { code: string; output: string; steps: PracticeStep[] } {
  const parseArr = (s: string) =>
    s.split(",").map((x) => Number(x.trim())).filter((n) => !isNaN(n));

  switch (tab) {
    case "partition": {
      const arr = parseArr(inputA).slice(0, 8);
      if (arr.length < 2) {
        return { code: "", output: "need ≥ 2 elements", steps: [{ label: "Error", value: "need ≥ 2 elements", highlight: true }] };
      }
      const a = [...arr];
      const pivot = a[a.length - 1];
      let i = 0 - 1;
      const steps: PracticeStep[] = [
        { label: "Input", value: `[${a.join(", ")}]` },
        { label: "Pivot", value: `${pivot} (index ${a.length - 1})` },
      ];
      for (let j = 0; j < a.length - 1; j++) {
        const cmp = a[j] <= pivot;
        if (cmp) {
          i++;
          steps.push({ label: `j=${j}: ${a[j]} ≤ ${pivot}`, value: `swap arr[${i}]=${a[i]} ↔ arr[${j}]=${a[j]}` });
          [a[i], a[j]] = [a[j], a[i]];
        } else {
          steps.push({ label: `j=${j}: ${a[j]} > ${pivot}`, value: "skip" });
        }
      }
      [a[i + 1], a[a.length - 1]] = [a[a.length - 1], a[i + 1]];
      steps.push({ label: "Place pivot", value: `pivot ${pivot} → index ${i + 1}` });
      steps.push({ label: "Result", value: `[${a.join(", ")}]  pivotIdx=${i + 1}`, highlight: true });
      return {
        code: `function partition(arr, lo, hi) {\n  const pivot = arr[hi];\n  let i = lo - 1;\n  for (let j = lo; j < hi; j++) {\n    if (arr[j] <= pivot) {\n      i++;\n      [arr[i], arr[j]] = [arr[j], arr[i]];\n    }\n  }\n  [arr[i+1], arr[hi]] = [arr[hi], arr[i+1]];\n  return i + 1;\n}\nconsole.log(partition([${arr.join(", ")}], 0, ${arr.length - 1}));`,
        output: String(i + 1),
        steps,
      };
    }

    case "kthLargest": {
      const arr = parseArr(inputA).slice(0, 8);
      const k = Math.max(1, Math.min(Math.abs(Number(inputB.trim())) || 1, arr.length));
      const sorted = [...arr].sort((a, b) => b - a);
      const result = sorted[k - 1];
      const steps: PracticeStep[] = [
        { label: "Input", value: `[${arr.join(", ")}]` },
        { label: "k", value: String(k) },
        { label: "Approach", value: "QuickSelect — partition until pivot lands at index k-1" },
        { label: "Sorted desc", value: `[${sorted.join(", ")}]` },
        { label: "Result", value: `${k}${k === 1 ? "st" : k === 2 ? "nd" : k === 3 ? "rd" : "th"} largest = ${result}`, highlight: true },
        { label: "Time", value: "O(n) average via QuickSelect" },
      ];
      return {
        code: `// QuickSelect: average O(n), worst O(n²)\nfunction kthLargest(nums, k) {\n  const a = [...nums];\n  function select(lo, hi, target) {\n    if (lo === hi) return a[lo];\n    // partition around last element\n    const pivot = a[hi];\n    let i = lo - 1;\n    for (let j = lo; j < hi; j++)\n      if (a[j] >= pivot) { i++; [a[i],a[j]]=[a[j],a[i]]; }\n    [a[i+1],a[hi]]=[a[hi],a[i+1]];\n    const p = i + 1;\n    if (p === target) return a[p];\n    return p < target ? select(p+1, hi, target) : select(lo, p-1, target);\n  }\n  return select(0, a.length-1, k-1);\n}\nconsole.log(kthLargest([${arr.join(", ")}], ${k}));`,
        output: String(result),
        steps,
      };
    }

    case "dutchFlag": {
      const arr = parseArr(inputA).slice(0, 9);
      // Only keep 0, 1, 2
      const filtered = arr.map(v => (v === 0 || v === 1 || v === 2 ? v : (v % 3) as 0 | 1 | 2)).slice(0, 9);
      const a = [...filtered];
      const steps: PracticeStep[] = [
        { label: "Input", value: `[${a.join(", ")}]` },
        { label: "Goal", value: "All 0s → all 1s → all 2s in one pass" },
      ];
      let lo = 0, mid = 0, hi = a.length - 1;
      while (mid <= hi) {
        if (a[mid] === 0) {
          steps.push({ label: `mid=${mid}: val=0`, value: `swap arr[${lo}] ↔ arr[${mid}], lo++ mid++` });
          [a[lo], a[mid]] = [a[mid], a[lo]]; lo++; mid++;
        } else if (a[mid] === 1) {
          steps.push({ label: `mid=${mid}: val=1`, value: "mid++ (1s stay in middle)" });
          mid++;
        } else {
          steps.push({ label: `mid=${mid}: val=2`, value: `swap arr[${mid}] ↔ arr[${hi}], hi--` });
          [a[mid], a[hi]] = [a[hi], a[mid]]; hi--;
        }
      }
      steps.push({ label: "Result", value: `[${a.join(", ")}]`, highlight: true });
      return {
        code: `// Dutch National Flag — O(n), one pass\nfunction sortColors(nums) {\n  let lo = 0, mid = 0, hi = nums.length - 1;\n  while (mid <= hi) {\n    if      (nums[mid] === 0) { [nums[lo],nums[mid]]=[nums[mid],nums[lo]]; lo++; mid++; }\n    else if (nums[mid] === 1) { mid++; }\n    else                      { [nums[mid],nums[hi]]=[nums[hi],nums[mid]]; hi--; }\n  }\n  return nums;\n}\nconsole.log(sortColors([${filtered.join(", ")}]));`,
        output: `[${a.join(", ")}]`,
        steps,
      };
    }
  }
}

// ─── Constants ───────────────────────────────────────────────────────────────
const practiceLabel: Record<PracticeTab, string> = {
  partition:   "Partition Step",
  kthLargest:  "Kth Largest Element",
  dutchFlag:   "Dutch National Flag",
};

const practiceColor: Record<PracticeTab, string> = {
  partition:  "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
  kthLargest: "bg-purple-500/15 border-purple-500/40 text-purple-700 dark:text-purple-300",
  dutchFlag:  "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
};

// ─── Sort Section ────────────────────────────────────────────────────────────
function SortSection() {
  const [input, setInput]         = useState("5,3,8,4,2,7,1");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps]         = useState<SortStep[]>([]);
  const [arr, setArr]             = useState<number[]>([5, 3, 8, 4, 2, 7, 1]);
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
      await new Promise<void>((res) => setTimeout(res, 320));
      setStepIndex(i);
      setArr(result.steps[i].arr);
    }
    setRunning(false);
  };

  const curStates  = stepIndex >= 0 ? steps[stepIndex]?.states ?? [] : [];
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
            <p><span className="font-semibold text-amber-500">Amber</span> — pivot element</p>
            <p><span className="font-semibold text-blue-500">Blue tint</span> — left (≤ pivot) region</p>
            <p><span className="font-semibold text-purple-500">Purple</span> — element being compared</p>
            <p><span className="font-semibold text-red-500">Red</span> — elements being swapped</p>
            <p><span className="font-semibold text-green-500">Green</span> — pivot placed in final position</p>
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

// ─── Practice Section ────────────────────────────────────────────────────────
function PracticeSection() {
  const [tab, setTab]                   = useState<PracticeTab>("partition");
  const [inputA, setInputA]             = useState("5,3,8,4,2,7");
  const [inputB, setInputB]             = useState("");
  const [outputLines, setOutputLines]   = useState<string[] | null>(null);
  const [steps, setSteps]               = useState<PracticeStep[]>([]);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [running, setRunning]           = useState(false);

  const { code } = buildPractice(tab, inputA, inputB);

  const labelA: Record<PracticeTab, string> = {
    partition:  "Array",
    kthLargest: "Array",
    dutchFlag:  "Array of 0s, 1s, 2s",
  };
  const labelB: Record<PracticeTab, string | null> = {
    partition:  null,
    kthLargest: "k (1-indexed)",
    dutchFlag:  null,
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
    if (key === "partition")  { setInputA("5,3,8,4,2,7"); setInputB(""); }
    if (key === "kthLargest") { setInputA("5,3,8,4,2,7"); setInputB("2"); }
    if (key === "dutchFlag")  { setInputA("2,0,1,2,1,0"); setInputB(""); }
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
            placeholder="e.g. 5,3,8,4,2"
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
              placeholder="e.g. 2"
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

// ─── Main export ─────────────────────────────────────────────────────────────
export function QuickSortVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Sort</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SortSection />
        <Separator />
        <PracticeSection />
      </CardContent>
    </Card>
  );
}
