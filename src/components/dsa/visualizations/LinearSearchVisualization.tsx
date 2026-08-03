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
type CellState = "idle" | "checking" | "found" | "skipped";

function ArrayDiagram({
  arr,
  states,
  currentIndex,
}: {
  arr: number[];
  states: CellState[];
  currentIndex: number;
}) {
  const colorMap: Record<CellState, string> = {
    idle:     "transparent",
    checking: "#eab308",
    found:    "#22c55e",
    skipped:  "#374151",
  };

  return (
    <div className="flex flex-col items-center py-2">
      <div className="flex gap-2 flex-wrap justify-center">
        {arr.map((val, i) => {
          const state = states[i] ?? "idle";
          const isActive = i === currentIndex;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  backgroundColor: colorMap[state],
                  scale: isActive ? 1.15 : 1,
                  opacity: state === "skipped" ? 0.35 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-border font-mono text-sm font-bold"
              >
                {val}
              </motion.div>
              <span className="text-[10px] text-muted-foreground">{i}</span>
              {isActive && state !== "idle" && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-bold"
                  style={{ color: colorMap[state] }}
                >
                  {state === "found" ? "✓" : "→"}
                </motion.span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step interface ────────────────────────────────────────────────────────
interface SearchStep {
  states: CellState[];
  currentIndex: number;
  output: string;
}

// ─── Build search steps ────────────────────────────────────────────────────
function buildSearch(
  input: string,
  targetStr: string,
): { arr: number[]; steps: SearchStep[]; code: string; output: string[] } {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const arr = nums.length ? nums : [3, 7, 1, 9, 4, 6, 2];
  const target = Number(targetStr);
  const t = !isNaN(target) && targetStr.trim() !== "" ? target : arr[Math.floor(arr.length / 2)];

  const steps: SearchStep[] = [];
  const stateSnapshot: CellState[] = Array(arr.length).fill("idle");
  let foundIdx = -1;

  for (let i = 0; i < arr.length; i++) {
    const snap = [...stateSnapshot] as CellState[];
    snap[i] = arr[i] === t ? "found" : "checking";
    steps.push({
      states: snap,
      currentIndex: i,
      output:
        arr[i] === t
          ? `arr[${i}] = ${arr[i]} === ${t}  ✅  Found at index ${i}!`
          : `arr[${i}] = ${arr[i]} ≠ ${t}, continue…`,
    });

    if (arr[i] === t) {
      foundIdx = i;
      break;
    }

    stateSnapshot[i] = "skipped";
  }

  if (foundIdx < 0) {
    const allSkipped = Array(arr.length).fill("skipped") as CellState[];
    steps.push({
      states: allSkipped,
      currentIndex: -1,
      output: `${t} not found in array ❌  (scanned all ${arr.length} elements)`,
    });
  }

  const ops = foundIdx >= 0 ? foundIdx + 1 : arr.length;

  return {
    arr,
    steps,
    code: `function linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}\nconsole.log(linearSearch([${arr.join(", ")}], ${t}));`,
    output: [
      foundIdx >= 0
        ? `Found ${t} at index ${foundIdx}`
        : `${t} not found  →  returns -1`,
      `Operations: ${ops}  (worst case: n = ${arr.length})`,
    ],
  };
}

// ─── Build practice ────────────────────────────────────────────────────────
type PracticeTab = "findAll" | "countOccurrences" | "findLast";

interface PracticeStep {
  label: string;
  value: string;
  highlight?: boolean;
}

function buildPractice(
  tab: PracticeTab,
  input: string,
  targetStr: string,
): { code: string; output: string; steps: PracticeStep[] } {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const arr = nums.length ? nums : [1, 2, 3, 2, 4, 2];
  const t = Number(targetStr);
  const target = !isNaN(t) && targetStr.trim() !== "" ? t : 2;

  switch (tab) {
    case "findAll": {
      const indices: number[] = [];
      const steps: PracticeStep[] = [
        { label: "Input", value: `arr=[${arr.join(",")}]  target=${target}` },
      ];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
          indices.push(i);
          steps.push({ label: `[${i}] ${arr[i]}`, value: `match → push ${i}` });
        } else {
          steps.push({ label: `[${i}] ${arr[i]}`, value: `skip` });
        }
      }
      steps.push({
        label: "Result",
        value: indices.length ? `[${indices.join(", ")}]` : "[] (none found)",
        highlight: true,
      });
      return {
        code: `function findAllIndices(arr, target) {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) result.push(i);\n  }\n  return result;\n}\nconsole.log(findAllIndices([${arr.join(", ")}], ${target}));`,
        output: indices.length ? `[${indices.join(", ")}]` : "[]",
        steps,
      };
    }

    case "countOccurrences": {
      let count = 0;
      const steps: PracticeStep[] = [
        { label: "Input", value: `arr=[${arr.join(",")}]  target=${target}` },
        { label: "count", value: "0" },
      ];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
          count++;
          steps.push({ label: `[${i}] ${arr[i]}`, value: `match → count = ${count}` });
        } else {
          steps.push({ label: `[${i}] ${arr[i]}`, value: `skip` });
        }
      }
      steps.push({ label: "Result", value: String(count), highlight: true });
      return {
        code: `function countOccurrences(arr, target) {\n  let count = 0;\n  for (const val of arr) {\n    if (val === target) count++;\n  }\n  return count;\n}\nconsole.log(countOccurrences([${arr.join(", ")}], ${target}));`,
        output: String(count),
        steps,
      };
    }

    case "findLast": {
      let lastIdx = -1;
      const steps: PracticeStep[] = [
        { label: "Input", value: `arr=[${arr.join(",")}]  target=${target}` },
        { label: "Scan", value: "right → left" },
      ];
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === target) {
          lastIdx = i;
          steps.push({
            label: `[${i}] ${arr[i]}`,
            value: `match → return ${i} ✅`,
          });
          break;
        }
        steps.push({ label: `[${i}] ${arr[i]}`, value: `skip` });
      }
      steps.push({
        label: "Result",
        value: lastIdx >= 0 ? `index ${lastIdx}` : "-1 (not found)",
        highlight: true,
      });
      return {
        code: `function findLast(arr, target) {\n  for (let i = arr.length - 1; i >= 0; i--) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}\nconsole.log(findLast([${arr.join(", ")}], ${target}));`,
        output: lastIdx >= 0 ? String(lastIdx) : "-1",
        steps,
      };
    }
  }
}

// ─── Constants ─────────────────────────────────────────────────────────────
const practiceLabel: Record<PracticeTab, string> = {
  findAll:          "Find All Indices",
  countOccurrences: "Count Occurrences",
  findLast:         "Find Last Occurrence",
};

const practiceColor: Record<PracticeTab, string> = {
  findAll:
    "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  countOccurrences:
    "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
  findLast:
    "bg-purple-500/15 border-purple-500/40 text-purple-700 dark:text-purple-300",
};

// ─── Main Search Section ───────────────────────────────────────────────────
function SearchSection() {
  const [input, setInput]     = useState("3,7,1,9,4,6,2");
  const [targetStr, setTargetStr] = useState("9");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps]     = useState<SearchStep[]>([]);
  const [arr, setArr]         = useState<number[]>([3, 7, 1, 9, 4, 6, 2]);
  const [output, setOutput]   = useState<string[] | null>(null);
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun]   = useState(false);

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
      await new Promise<void>((res) => setTimeout(res, 480));
      setStepIndex(i);
    }
    setRunning(false);
  };

  const curStates  = stepIndex >= 0 ? steps[stepIndex]?.states ?? [] : [];
  const curIdx     = stepIndex >= 0 ? steps[stepIndex]?.currentIndex ?? -1 : -1;
  const curStepOut = stepIndex >= 0 ? steps[stepIndex]?.output ?? "" : "";

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Visualization
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: inputs + description */}
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">
              Array (comma-separated)
            </p>
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                clear();
              }}
              className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
              placeholder="e.g. 3,7,1,9,4"
            />
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">
              Target to search
            </p>
            <input
              value={targetStr}
              onChange={(e) => {
                setTargetStr(e.target.value);
                clear();
              }}
              className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
              placeholder="e.g. 9"
            />
          </div>

          <Button size="sm" onClick={handleRun} disabled={running} className="w-full">
            <Play className="h-3.5 w-3.5 mr-1" />
            {running ? "Searching…" : "Run"}
          </Button>

          <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
            <p>
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">Checking</span>
              {" — "}current element being compared
            </p>
            <p>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Found</span>
              {" — "}target matched, search stops
            </p>
            <p>
              <span className="font-semibold text-zinc-400">Skipped</span>
              {" — "}element already checked, not a match
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

        {/* Right: code + output */}
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
            <Button
              size="sm"
              variant="ghost"
              className="h-6 px-2 text-xs"
              onClick={clear}
            >
              <RotateCcw className="h-3 w-3 mr-1" /> Reset
            </Button>
          </div>
          <ArrayDiagram arr={arr} states={curStates} currentIndex={curIdx} />
        </div>
      )}
    </div>
  );
}

// ─── Practice Section ──────────────────────────────────────────────────────
function PracticeSection() {
  const [tab, setTab]   = useState<PracticeTab>("findAll");
  const [input, setInput]   = useState("1,2,3,2,4,2");
  const [targetStr, setTargetStr] = useState("2");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [steps, setSteps]     = useState<PracticeStep[]>([]);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [running, setRunning] = useState(false);

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
      await new Promise<void>((res) => setTimeout(res, 260));
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
            onClick={() => {
              setTab(key);
              clearOutput();
            }}
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
            Array (comma-separated)
          </p>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              clearOutput();
            }}
            className={`w-full rounded-lg border px-3 py-2 text-xs font-mono focus:outline-none ${practiceColor[tab]}`}
            placeholder="e.g. 1,2,3,2"
            disabled={running}
          />
        </div>
        <div className="space-y-1 w-28">
          <p className="text-xs font-semibold text-muted-foreground">Target</p>
          <input
            value={targetStr}
            onChange={(e) => {
              setTargetStr(e.target.value);
              clearOutput();
            }}
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
export function LinearSearchVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Linear Search</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SearchSection />
        <Separator />
        <PracticeSection />
      </CardContent>
    </Card>
  );
}
