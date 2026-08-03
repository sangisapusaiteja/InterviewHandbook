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
type CellState = "active" | "found" | "dimmed" | "idle";

function ArrayDiagram({
  arr,
  states,
  pointers,
}: {
  arr: number[];
  states: CellState[];
  pointers: { index: number; label: string; color: string }[];
}) {
  const bgMap: Record<CellState, string> = {
    idle:   "transparent",
    active: "#1e40af30",
    found:  "#22c55e",
    dimmed: "#374151",
  };

  return (
    <div className="flex flex-col items-center py-2">
      <div className="flex gap-2 flex-wrap justify-center">
        {arr.map((val, i) => {
          const state = states[i] ?? "idle";
          const cellPointers = pointers.filter((p) => p.index === i);
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  backgroundColor: bgMap[state],
                  scale: state === "found" ? 1.15 : state === "active" ? 1.05 : 1,
                  opacity: state === "dimmed" ? 0.2 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-border font-mono text-sm font-bold"
              >
                {val}
              </motion.div>
              <span className="text-[10px] text-muted-foreground">{i}</span>
              {cellPointers.map((p) => (
                <motion.span
                  key={p.label}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-bold leading-none"
                  style={{ color: p.color }}
                >
                  {p.label}
                </motion.span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Types ─────────────────────────────────────────────────────────────────
interface SearchStep {
  states: CellState[];
  pointers: { index: number; label: string; color: string }[];
  output: string;
}

interface PracticeStep {
  label: string;
  value: string;
  highlight?: boolean;
}

type PracticeTab = "insertPosition" | "findFirst" | "findLast";

// ─── Build search steps ────────────────────────────────────────────────────
function buildSearch(
  input: string,
  targetStr: string,
): { arr: number[]; steps: SearchStep[]; code: string; output: string[] } {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const arr = (nums.length >= 2 ? [...nums] : [1, 3, 5, 7, 9, 11, 13]).sort(
    (a, b) => a - b,
  );

  const t = Number(targetStr);
  const target =
    !isNaN(t) && targetStr.trim() !== ""
      ? t
      : arr[Math.floor(arr.length / 2)];

  const steps: SearchStep[] = [];
  let lo = 0,
    hi = arr.length - 1,
    ops = 0,
    foundIdx = -1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    ops++;

    const states: CellState[] = arr.map((_, idx) => {
      if (idx < lo || idx > hi) return "dimmed";
      if (idx === mid) return arr[mid] === target ? "found" : "active";
      return "idle";
    });

    steps.push({
      states,
      pointers: [
        { index: lo,  label: "lo",  color: "#60a5fa" },
        { index: mid, label: "mid", color: "#fbbf24" },
        { index: hi,  label: "hi",  color: "#60a5fa" },
      ],
      output:
        arr[mid] === target
          ? `mid=${mid}: arr[${mid}]=${arr[mid]} = ${target}  ✅  Found!`
          : arr[mid] < target
          ? `mid=${mid}: arr[${mid}]=${arr[mid]} < ${target}  →  lo = ${mid + 1}`
          : `mid=${mid}: arr[${mid}]=${arr[mid]} > ${target}  →  hi = ${mid - 1}`,
    });

    if (arr[mid] === target) {
      foundIdx = mid;
      break;
    }
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }

  if (foundIdx < 0) {
    steps.push({
      states: Array(arr.length).fill("dimmed"),
      pointers: [],
      output: `${target} not found  ❌  (lo > hi, search exhausted)`,
    });
  }

  return {
    arr,
    steps,
    code: `function binarySearch(arr, target) {\n  let lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    const mid = Math.floor((lo + hi) / 2);\n    if (arr[mid] === target) return mid;\n    else if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}\nconsole.log(binarySearch([${arr.join(", ")}], ${target}));`,
    output: [
      foundIdx >= 0
        ? `Found ${target} at index ${foundIdx}`
        : `${target} not found  →  returns -1`,
      `Operations: ${ops}  (log₂${arr.length} ≈ ${Math.ceil(Math.log2(arr.length))} max)`,
    ],
  };
}

// ─── Build practice ────────────────────────────────────────────────────────
function buildPractice(
  tab: PracticeTab,
  input: string,
  targetStr: string,
): { code: string; output: string; steps: PracticeStep[] } {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const arr = (nums.length >= 2 ? [...nums] : [1, 2, 2, 2, 3, 4, 5]).sort(
    (a, b) => a - b,
  );
  const t = Number(targetStr);
  const target = !isNaN(t) && targetStr.trim() !== "" ? t : arr[Math.floor(arr.length / 2)];

  switch (tab) {
    case "insertPosition": {
      let lo = 0, hi = arr.length - 1;
      const steps: PracticeStep[] = [
        { label: "Input", value: `arr=[${arr.join(",")}]  target=${target}` },
      ];
      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        steps.push({
          label: `lo=${lo} hi=${hi} mid=${mid}`,
          value:
            arr[mid] === target
              ? `arr[${mid}]=${arr[mid]} = target → return ${mid}`
              : arr[mid] < target
              ? `arr[${mid}]=${arr[mid]} < target → lo = ${mid + 1}`
              : `arr[${mid}]=${arr[mid]} > target → hi = ${mid - 1}`,
        });
        if (arr[mid] === target) { lo = mid; hi = -1; break; }
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
      }
      steps.push({ label: "Result", value: `Insert at index ${lo}`, highlight: true });
      return {
        code: `function searchInsertPos(arr, target) {\n  let lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    const mid = Math.floor((lo + hi) / 2);\n    if (arr[mid] === target) return mid;\n    else if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return lo;\n}\nconsole.log(searchInsertPos([${arr.join(", ")}], ${target}));`,
        output: String(lo),
        steps,
      };
    }

    case "findFirst": {
      let lo = 0, hi = arr.length - 1, result = -1;
      const steps: PracticeStep[] = [
        { label: "Input", value: `arr=[${arr.join(",")}]  target=${target}` },
        { label: "Strategy", value: "On match, record index and search LEFT" },
      ];
      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (arr[mid] === target) {
          result = mid;
          steps.push({ label: `lo=${lo} hi=${hi} mid=${mid}`, value: `match → result=${mid}, hi=${mid - 1} (search left)` });
          hi = mid - 1;
        } else if (arr[mid] < target) {
          steps.push({ label: `lo=${lo} hi=${hi} mid=${mid}`, value: `arr[${mid}]=${arr[mid]} < target → lo=${mid + 1}` });
          lo = mid + 1;
        } else {
          steps.push({ label: `lo=${lo} hi=${hi} mid=${mid}`, value: `arr[${mid}]=${arr[mid]} > target → hi=${mid - 1}` });
          hi = mid - 1;
        }
      }
      steps.push({ label: "Result", value: result >= 0 ? `First at index ${result}` : "Not found (-1)", highlight: true });
      return {
        code: `function findFirst(arr, target) {\n  let lo = 0, hi = arr.length - 1, result = -1;\n  while (lo <= hi) {\n    const mid = Math.floor((lo + hi) / 2);\n    if (arr[mid] === target) { result = mid; hi = mid - 1; }\n    else if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return result;\n}\nconsole.log(findFirst([${arr.join(", ")}], ${target}));`,
        output: String(result),
        steps,
      };
    }

    case "findLast": {
      let lo = 0, hi = arr.length - 1, result = -1;
      const steps: PracticeStep[] = [
        { label: "Input", value: `arr=[${arr.join(",")}]  target=${target}` },
        { label: "Strategy", value: "On match, record index and search RIGHT" },
      ];
      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (arr[mid] === target) {
          result = mid;
          steps.push({ label: `lo=${lo} hi=${hi} mid=${mid}`, value: `match → result=${mid}, lo=${mid + 1} (search right)` });
          lo = mid + 1;
        } else if (arr[mid] < target) {
          steps.push({ label: `lo=${lo} hi=${hi} mid=${mid}`, value: `arr[${mid}]=${arr[mid]} < target → lo=${mid + 1}` });
          lo = mid + 1;
        } else {
          steps.push({ label: `lo=${lo} hi=${hi} mid=${mid}`, value: `arr[${mid}]=${arr[mid]} > target → hi=${mid - 1}` });
          hi = mid - 1;
        }
      }
      steps.push({ label: "Result", value: result >= 0 ? `Last at index ${result}` : "Not found (-1)", highlight: true });
      return {
        code: `function findLast(arr, target) {\n  let lo = 0, hi = arr.length - 1, result = -1;\n  while (lo <= hi) {\n    const mid = Math.floor((lo + hi) / 2);\n    if (arr[mid] === target) { result = mid; lo = mid + 1; }\n    else if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return result;\n}\nconsole.log(findLast([${arr.join(", ")}], ${target}));`,
        output: String(result),
        steps,
      };
    }
  }
}

// ─── Constants ─────────────────────────────────────────────────────────────
const practiceLabel: Record<PracticeTab, string> = {
  insertPosition: "Search Insert Position",
  findFirst:      "Find First Occurrence",
  findLast:       "Find Last Occurrence",
};

const practiceColor: Record<PracticeTab, string> = {
  insertPosition:
    "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  findFirst:
    "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  findLast:
    "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
};

// ─── Search Section ────────────────────────────────────────────────────────
function SearchSection() {
  const [input, setInput]         = useState("1,3,5,7,9,11,13");
  const [targetStr, setTargetStr] = useState("7");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps]         = useState<SearchStep[]>([]);
  const [arr, setArr]             = useState<number[]>([1, 3, 5, 7, 9, 11, 13]);
  const [output, setOutput]       = useState<string[] | null>(null);
  const [running, setRunning]     = useState(false);
  const [hasRun, setHasRun]       = useState(false);

  const { code } = buildSearch(input, targetStr);

  const clear = () => {
    setStepIndex(-1);
    setSteps([]);
    setOutput(null);
    setRunning(false);
    setHasRun(false);
  };

  const handleRun = async () => {
    if (running) return;
    const result = buildSearch(input, targetStr);
    setArr(result.arr);
    setOutput(result.output);
    setSteps(result.steps);
    setHasRun(true);
    setRunning(true);
    for (let i = 0; i < result.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 600));
      setStepIndex(i);
    }
    setRunning(false);
  };

  const curStates   = stepIndex >= 0 ? steps[stepIndex]?.states   ?? [] : [];
  const curPointers = stepIndex >= 0 ? steps[stepIndex]?.pointers ?? [] : [];
  const curStepOut  = stepIndex >= 0 ? steps[stepIndex]?.output   ?? "" : "";

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
              Array (auto-sorted, comma-separated)
            </p>
            <input
              value={input}
              onChange={(e) => { setInput(e.target.value); clear(); }}
              className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
              placeholder="e.g. 1,3,5,7,9"
            />
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">
              Target to search
            </p>
            <input
              value={targetStr}
              onChange={(e) => { setTargetStr(e.target.value); clear(); }}
              className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
              placeholder="e.g. 7"
            />
          </div>

          <Button size="sm" onClick={handleRun} disabled={running} className="w-full">
            <Play className="h-3.5 w-3.5 mr-1" />
            {running ? "Searching…" : "Run"}
          </Button>

          <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
            <p>
              <span className="font-semibold text-yellow-500">mid</span>
              {" — "}pivot being compared this step
            </p>
            <p>
              <span className="font-semibold text-blue-400">lo / hi</span>
              {" — "}current search boundaries
            </p>
            <p>
              <span className="font-semibold text-emerald-500">Found</span>
              {" — "}target matched at mid
            </p>
            <p>
              <span className="font-semibold text-zinc-400">Dimmed</span>
              {" — "}eliminated half, out of range
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
          <ArrayDiagram arr={arr} states={curStates} pointers={curPointers} />
        </div>
      )}
    </div>
  );
}

// ─── Practice Section ──────────────────────────────────────────────────────
function PracticeSection() {
  const [tab, setTab]             = useState<PracticeTab>("insertPosition");
  const [input, setInput]         = useState("1,2,2,2,3,4,5");
  const [targetStr, setTargetStr] = useState("2");
  const [outputLines, setOutputLines]   = useState<string[] | null>(null);
  const [steps, setSteps]               = useState<PracticeStep[]>([]);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [running, setRunning]           = useState(false);

  const { code } = buildPractice(tab, input, targetStr);

  const clearOutput = () => {
    setOutputLines(null);
    setSteps([]);
    setVisibleSteps(0);
    setRunning(false);
  };

  const handleRun = async () => {
    if (running) return;
    const result = buildPractice(tab, input, targetStr);
    setOutputLines([result.output]);
    setSteps(result.steps);
    setVisibleSteps(0);
    setRunning(true);
    for (let i = 1; i <= result.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 300));
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

      {/* Inputs */}
      <div className="flex flex-wrap gap-2 items-end">
        <div className="space-y-1 flex-1 min-w-[160px]">
          <p className="text-xs font-semibold text-muted-foreground">
            Array (auto-sorted)
          </p>
          <input
            value={input}
            onChange={(e) => { setInput(e.target.value); clearOutput(); }}
            className={`w-full rounded-lg border px-3 py-2 text-xs font-mono focus:outline-none ${practiceColor[tab]}`}
            placeholder="e.g. 1,2,2,3"
            disabled={running}
          />
        </div>
        <div className="space-y-1 w-28">
          <p className="text-xs font-semibold text-muted-foreground">Target</p>
          <input
            value={targetStr}
            onChange={(e) => { setTargetStr(e.target.value); clearOutput(); }}
            className={`w-full rounded-lg border px-3 py-2 text-xs font-mono focus:outline-none ${practiceColor[tab]}`}
            placeholder="e.g. 2"
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

      {/* Step-by-step table */}
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
export function BinarySearchVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Binary Search</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SearchSection />
        <Separator />
        <PracticeSection />
      </CardContent>
    </Card>
  );
}
