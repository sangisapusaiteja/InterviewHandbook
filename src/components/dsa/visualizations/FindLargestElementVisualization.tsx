"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Cell state ────────────────────────────────────────────────────────────
type CellState = "idle" | "checking" | "max" | "skipped";

// ─── Array Diagram ─────────────────────────────────────────────────────────
function ArrayDiagram({
  arr,
  states,
  currentIndex,
  currentMax,
}: {
  arr: number[];
  states: CellState[];
  currentIndex: number;
  currentMax: number | null;
}) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    checking: "#eab308",
    max: "#22c55e",
    skipped: "#374151",
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
                  {state === "max" ? "MAX" : "?"}
                </motion.span>
              )}
            </div>
          );
        })}
      </div>
      {currentMax !== null && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold font-mono"
        >
          Current Max = {currentMax}
        </motion.div>
      )}
    </div>
  );
}

// ─── Step interface ────────────────────────────────────────────────────────
interface SearchStep {
  states: CellState[];
  currentIndex: number;
  currentMax: number;
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(input: string): {
  arr: number[];
  steps: SearchStep[];
  result: number;
} {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const arr = nums.length ? nums : [3, 7, 1, 9, 4, 6, 2];

  const steps: SearchStep[] = [];
  const stateSnapshot: CellState[] = Array(arr.length).fill("idle");

  let max = arr[0];
  // First element is initial max
  const firstSnap = [...stateSnapshot] as CellState[];
  firstSnap[0] = "max";
  steps.push({
    states: firstSnap,
    currentIndex: 0,
    currentMax: max,
    output: `Start: max = arr[0] = ${arr[0]}`,
  });
  stateSnapshot[0] = "max";

  for (let i = 1; i < arr.length; i++) {
    const snap = [...stateSnapshot] as CellState[];
    if (arr[i] > max) {
      // Mark old max as skipped
      for (let j = 0; j < i; j++) {
        if (snap[j] === "max") snap[j] = "skipped";
      }
      snap[i] = "max";
      max = arr[i];
      steps.push({
        states: snap,
        currentIndex: i,
        currentMax: max,
        output: `arr[${i}] = ${arr[i]} > ${max === arr[i] ? steps[steps.length - 1].currentMax : max} → new max = ${arr[i]}`,
      });
      // Update the stateSnapshot
      for (let j = 0; j < i; j++) {
        if (stateSnapshot[j] === "max") stateSnapshot[j] = "skipped";
      }
      stateSnapshot[i] = "max";
    } else {
      snap[i] = "checking";
      steps.push({
        states: snap,
        currentIndex: i,
        currentMax: max,
        output: `arr[${i}] = ${arr[i]} ≤ ${max} → no change`,
      });
      stateSnapshot[i] = "skipped";
    }
  }

  return { arr, steps, result: max };
}

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
            Click ▶ Run to see the visualization
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export function FindLargestElementVisualization() {
  const [input, setInput] = useState("3,7,1,9,4,6,2");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<SearchStep[]>([]);
  const [arr, setArr] = useState<number[]>([3, 7, 1, 9, 4, 6, 2]);
  const [output, setOutput] = useState<string[] | null>(null);
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const clear = () => {
    setStepIndex(-1);
    setSteps([]);
    setOutput(null);
    setRunning(false);
    setHasRun(false);
  };

  const handleRun = async () => {
    if (running) return;
    const result = buildSteps(input);
    setArr(result.arr);
    setSteps(result.steps);
    setOutput([
      `Largest element: ${result.result}`,
      `Comparisons: ${result.steps.length - 1}  (array length: ${result.arr.length})`,
    ]);
    setHasRun(true);
    setRunning(true);
    for (let i = 0; i < result.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 600));
      setStepIndex(i);
    }
    setRunning(false);
  };

  const curStates = stepIndex >= 0 ? steps[stepIndex]?.states ?? [] : [];
  const curIdx = stepIndex >= 0 ? steps[stepIndex]?.currentIndex ?? -1 : -1;
  const curMax = stepIndex >= 0 ? steps[stepIndex]?.currentMax ?? null : null;
  const curStepOut = stepIndex >= 0 ? steps[stepIndex]?.output ?? "" : "";

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Find Largest Element</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Visualization
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left: inputs + legend */}
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

            <Button
              size="sm"
              onClick={handleRun}
              disabled={running}
              className="w-full"
            >
              <Play className="h-3.5 w-3.5 mr-1" />
              {running ? "Scanning..." : "Run"}
            </Button>

            <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
              <p>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Checking
                </span>
                {" — "}current element being compared
              </p>
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Max
                </span>
                {" — "}current largest element found
              </p>
              <p>
                <span className="font-semibold text-zinc-400">Skipped</span>
                {" — "}already checked, not the max
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
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">
                Code
              </p>
              <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
{`function findLargest(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
console.log(findLargest([${arr.join(", ")}]));`}
              </pre>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">
                Output
              </p>
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
            <ArrayDiagram
              arr={arr}
              states={curStates}
              currentIndex={curIdx}
              currentMax={curMax}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Imagine you&apos;re a teacher collecting exam papers. You pick up the first
            paper and note the score — say <strong>72</strong>. As you flip through
            the stack, whenever you see a score <em>higher</em> than your current
            best, you mentally update it. By the time you reach the last paper, you
            know the top score — without ever sorting the pile. You only needed to
            remember <strong>one number</strong> the whole time.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
