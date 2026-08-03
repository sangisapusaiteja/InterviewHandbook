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
type CellState = "sorted" | "key" | "shifting" | "placed" | "idle";

function ArrayDiagram({
  arr,
  states,
  keyVal,
}: {
  arr: (number | null)[];
  states: CellState[];
  keyVal?: number | null;
}) {
  const bgMap: Record<CellState, string> = {
    sorted:   "#22c55e",
    key:      "#a855f7",
    shifting: "#eab308",
    placed:   "#22c55e",
    idle:     "transparent",
  };

  return (
    <div className="flex justify-center flex-wrap gap-2 py-2">
      {arr.map((val, i) => {
        const state = states[i] ?? "idle";
        const isEmpty = val === null;
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <motion.div
              animate={{
                backgroundColor: isEmpty ? "transparent" : bgMap[state],
                scale: state === "key" || state === "placed" ? 1.15 : 1,
                opacity: isEmpty ? 0.25 : 1,
              }}
              transition={{ duration: 0.25 }}
              className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-border font-mono text-sm font-bold"
            >
              {isEmpty ? "·" : val}
            </motion.div>
            <span className="text-[10px] text-muted-foreground">{i}</span>
          </div>
        );
      })}
      {keyVal != null && (
        <div className="flex flex-col items-center gap-1 ml-4 opacity-80">
          <motion.div
            animate={{ backgroundColor: "#a855f7", scale: 1.15 }}
            className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-purple-400 font-mono text-sm font-bold text-white"
          >
            {keyVal}
          </motion.div>
          <span className="text-[10px] text-purple-400 font-bold">key</span>
        </div>
      )}
    </div>
  );
}

// ─── Types ─────────────────────────────────────────────────────────────────
interface SortStep {
  arr: (number | null)[];
  states: CellState[];
  keyVal: number | null;
  output: string;
}

interface PracticeStep {
  label: string;
  value: string;
  highlight?: boolean;
}

type PracticeTab = "countShifts" | "insertSorted" | "nearSorted";

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
  let totalShifts = 0;

  // initial state — element 0 is trivially sorted
  steps.push({
    arr: [...a],
    states: a.map((_, idx) => (idx === 0 ? "sorted" : "idle")),
    keyVal: null,
    output: "arr[0] is trivially sorted. Start inserting from index 1…",
  });

  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;

    // pick up the key
    steps.push({
      arr: a.map((v, idx) => (idx === i ? null : v)),
      states: a.map((_, idx) => {
        if (idx < i)  return "sorted";
        if (idx === i) return "key";
        return "idle";
      }),
      keyVal: key,
      output: `Pick up key = ${key} from index ${i}`,
    });

    // shift phase
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      totalShifts++;

      const snap = [...a] as (number | null)[];
      snap[j + 1] = a[j]; // shifted value shown
      // the slot at j is conceptually empty (key is "held")
      const snapNull = snap.map((v, idx) => (idx === j ? null : v));

      steps.push({
        arr: snapNull,
        states: snapNull.map((_, idx) => {
          if (idx < j)       return "sorted";
          if (idx === j)     return "idle";
          if (idx === j + 1) return "shifting";
          return "idle";
        }),
        keyVal: key,
        output: `  arr[${j}]=${a[j]} > ${key} → shift arr[${j}] → arr[${j + 1}]`,
      });

      j--;
    }

    // insert key
    a[j + 1] = key;
    steps.push({
      arr: [...a],
      states: a.map((_, idx) => {
        if (idx <= i) return idx === j + 1 ? "placed" : "sorted";
        return "idle";
      }),
      keyVal: null,
      output: `  Insert ${key} at index ${j + 1}  ✅  sorted portion: [${a.slice(0, i + 1).join(", ")}]`,
    });
  }

  // final
  steps.push({
    arr: [...a],
    states: Array(n).fill("sorted"),
    keyVal: null,
    output: `Sorted! [${a.join(", ")}]  (total shifts: ${totalShifts})`,
  });

  return {
    initial,
    steps,
    code: `function insertionSort(arr) {\n  const a = [...arr];\n  for (let i = 1; i < a.length; i++) {\n    const key = a[i];\n    let j = i - 1;\n    while (j >= 0 && a[j] > key) {\n      a[j + 1] = a[j];\n      j--;\n    }\n    a[j + 1] = key;\n  }\n  return a;\n}\nconsole.log(insertionSort([${initial.join(", ")}]));`,
    output: [
      `[${a.join(", ")}]`,
      `Shifts: ${totalShifts}  (${totalShifts === 0 ? "already sorted!" : `worst case: n²/2 = ${Math.floor(n * (n - 1) / 2)}`})`,
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
    case "countShifts": {
      const a = [...arr];
      let shifts = 0;
      const steps: PracticeStep[] = [
        { label: "Input", value: `[${arr.join(", ")}]` },
        { label: "shifts", value: "0" },
      ];
      for (let i = 1; i < a.length; i++) {
        const key = a[i];
        let j = i - 1;
        let passShifts = 0;
        while (j >= 0 && a[j] > key) {
          a[j + 1] = a[j];
          j--;
          shifts++;
          passShifts++;
        }
        a[j + 1] = key;
        steps.push({
          label: `i=${i} key=${key}`,
          value: passShifts > 0 ? `${passShifts} shift${passShifts > 1 ? "s" : ""} → total ${shifts}` : "0 shifts (already in place)",
        });
      }
      steps.push({ label: "Total shifts", value: String(shifts), highlight: true });
      return {
        code: `function countShifts(arr) {\n  const a = [...arr];\n  let shifts = 0;\n  for (let i = 1; i < a.length; i++) {\n    const key = a[i];\n    let j = i - 1;\n    while (j >= 0 && a[j] > key) {\n      a[j + 1] = a[j];\n      j--;\n      shifts++;\n    }\n    a[j + 1] = key;\n  }\n  return shifts;\n}\nconsole.log(countShifts([${arr.join(", ")}]));`,
        output: String(shifts),
        steps,
      };
    }

    case "insertSorted": {
      const sortedArr = [...arr].sort((a, b) => a - b);
      const val = Math.floor((sortedArr[0] + sortedArr[sortedArr.length - 1]) / 2);
      const a = [...sortedArr, val];
      const steps: PracticeStep[] = [
        { label: "Sorted arr", value: `[${sortedArr.join(", ")}]` },
        { label: "Insert val", value: String(val) },
      ];
      let j = a.length - 2;
      while (j >= 0 && a[j] > val) {
        steps.push({ label: `a[${j}]=${a[j]} > ${val}`, value: `shift right → a[${j + 1}] = ${a[j]}` });
        a[j + 1] = a[j];
        j--;
      }
      a[j + 1] = val;
      steps.push({ label: `Insert at [${j + 1}]`, value: String(val), highlight: true });
      steps.push({ label: "Result", value: `[${a.join(", ")}]`, highlight: true });
      return {
        code: `function insertSorted(sortedArr, val) {\n  const a = [...sortedArr, val];\n  let j = a.length - 2;\n  while (j >= 0 && a[j] > val) {\n    a[j + 1] = a[j];\n    j--;\n  }\n  a[j + 1] = val;\n  return a;\n}\nconsole.log(insertSorted([${sortedArr.join(", ")}], ${val}));`,
        output: `[${a.join(", ")}]`,
        steps,
      };
    }

    case "nearSorted": {
      // compare shift counts for sorted vs reverse sorted
      const sorted   = [...arr].sort((a, b) => a - b);
      const reversed = [...arr].sort((a, b) => b - a);

      const countS = (a: number[]) => {
        const arr2 = [...a];
        let s = 0;
        for (let i = 1; i < arr2.length; i++) {
          const key = arr2[i]; let j = i - 1;
          while (j >= 0 && arr2[j] > key) { arr2[j + 1] = arr2[j]; j--; s++; }
          arr2[j + 1] = key;
        }
        return s;
      };

      const sortedShifts   = countS(sorted);
      const inputShifts    = countS([...arr]);
      const reversedShifts = countS(reversed);

      const steps: PracticeStep[] = [
        { label: "Input", value: `[${arr.join(", ")}]` },
        { label: "Best case", value: `Already sorted → ${sortedShifts} shift${sortedShifts !== 1 ? "s" : ""} (O(n))` },
        { label: "Your input", value: `${inputShifts} shift${inputShifts !== 1 ? "s" : ""}` },
        { label: "Worst case", value: `Reverse sorted → ${reversedShifts} shift${reversedShifts !== 1 ? "s" : ""} (O(n²))` },
        {
          label: "Verdict",
          value:
            inputShifts === 0
              ? "Already sorted — O(n) ✅"
              : inputShifts <= reversedShifts / 2
              ? "Nearly sorted — close to O(n)"
              : "Far from sorted — O(n²)",
          highlight: true,
        },
      ];

      return {
        code: `// Insertion sort is adaptive:\n// O(n) shifts on already-sorted input\n// O(n²) shifts on reverse-sorted input\n\nfunction shiftCount(arr) {\n  const a = [...arr];\n  let shifts = 0;\n  for (let i = 1; i < a.length; i++) {\n    const key = a[i];\n    let j = i - 1;\n    while (j >= 0 && a[j] > key) {\n      a[j + 1] = a[j]; j--; shifts++;\n    }\n    a[j + 1] = key;\n  }\n  return shifts;\n}\nconsole.log("sorted:  ", shiftCount([${sorted.join(", ")}]));\nconsole.log("input:   ", shiftCount([${arr.join(", ")}]));\nconsole.log("reversed:", shiftCount([${reversed.join(", ")}]));`,
        output: `${inputShifts} shifts`,
        steps,
      };
    }
  }
}

// ─── Constants ─────────────────────────────────────────────────────────────
const practiceLabel: Record<PracticeTab, string> = {
  countShifts:  "Count Shifts",
  insertSorted: "Insert into Sorted Array",
  nearSorted:   "Adaptive Analysis",
};

const practiceColor: Record<PracticeTab, string> = {
  countShifts:
    "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  insertSorted:
    "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  nearSorted:
    "bg-purple-500/15 border-purple-500/40 text-purple-700 dark:text-purple-300",
};

// ─── Sort Section ──────────────────────────────────────────────────────────
function SortSection() {
  const [input, setInput]         = useState("5,3,8,4,2");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps]         = useState<SortStep[]>([]);
  const [arr, setArr]             = useState<(number | null)[]>([5, 3, 8, 4, 2]);
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
      await new Promise<void>((res) => setTimeout(res, 400));
      setStepIndex(i);
      setArr(result.steps[i].arr);
    }
    setRunning(false);
  };

  const curStates  = stepIndex >= 0 ? steps[stepIndex]?.states  ?? [] : [];
  const curKeyVal  = stepIndex >= 0 ? steps[stepIndex]?.keyVal  ?? null : null;
  const curStepOut = stepIndex >= 0 ? steps[stepIndex]?.output  ?? "" : "";

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
              {" — "}left portion, already in order
            </p>
            <p>
              <span className="font-semibold text-purple-500">Key</span>
              {" — "}element being picked up and inserted
            </p>
            <p>
              <span className="font-semibold text-yellow-500">Shifting</span>
              {" — "}element moved right to make room
            </p>
            <p>
              <span className="font-semibold text-green-400">Placed</span>
              {" — "}key dropped into its correct slot
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
          <ArrayDiagram arr={arr} states={curStates} keyVal={curKeyVal} />
        </div>
      )}
    </div>
  );
}

// ─── Practice Section ──────────────────────────────────────────────────────
function PracticeSection() {
  const [tab, setTab]                   = useState<PracticeTab>("countShifts");
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
export function InsertionSortVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Insertion Sort</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SortSection />
        <Separator />
        <PracticeSection />
      </CardContent>
    </Card>
  );
}
