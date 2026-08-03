"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Cell state ────────────────────────────────────────────────────────────
type CellState = "idle" | "left" | "pivot-checking" | "right" | "found" | "skipped";

// ─── Array Diagram ─────────────────────────────────────────────────────────
function ArrayDiagram({
  arr,
  states,
  currentIndex,
  leftSum,
  rightSum,
}: {
  arr: number[];
  states: CellState[];
  currentIndex: number;
  leftSum: number | null;
  rightSum: number | null;
}) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    left: "#3b82f6",
    "pivot-checking": "#eab308",
    right: "#a855f7",
    found: "#22c55e",
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
              {isActive && state === "pivot-checking" && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-bold text-yellow-500"
                >
                  PIVOT?
                </motion.span>
              )}
              {isActive && state === "found" && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-bold text-emerald-500"
                >
                  PIVOT!
                </motion.span>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-3">
        {leftSum !== null && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-700 dark:text-blue-300 text-xs font-semibold font-mono"
          >
            leftSum = {leftSum}
          </motion.div>
        )}
        {rightSum !== null && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-700 dark:text-purple-300 text-xs font-semibold font-mono"
          >
            rightSum = {rightSum}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Step interface ────────────────────────────────────────────────────────
interface PivotStep {
  states: CellState[];
  currentIndex: number;
  leftSum: number;
  rightSum: number;
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(input: string): {
  arr: number[];
  steps: PivotStep[];
  pivotIndex: number;
} {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const arr = nums.length ? nums : [1, 7, 3, 6, 5, 6];

  const steps: PivotStep[] = [];
  const totalSum = arr.reduce((a, b) => a + b, 0);
  let leftSum = 0;
  let pivotIndex = -1;

  for (let i = 0; i < arr.length; i++) {
    const rightSum = totalSum - leftSum - arr[i];
    const snap: CellState[] = arr.map((_, idx) => {
      if (idx < i) return "left" as CellState;
      if (idx === i) return "pivot-checking" as CellState;
      if (idx > i) return "right" as CellState;
      return "idle" as CellState;
    });

    if (leftSum === rightSum) {
      snap[i] = "found";
      pivotIndex = i;
      steps.push({
        states: [...snap],
        currentIndex: i,
        leftSum,
        rightSum,
        output: `i=${i}: leftSum=${leftSum}, rightSum=${rightSum} \u2705 PIVOT!`,
      });
      break;
    } else {
      steps.push({
        states: [...snap],
        currentIndex: i,
        leftSum,
        rightSum,
        output: `i=${i}: leftSum=${leftSum}, rightSum=${rightSum} \u2716 not equal`,
      });
    }

    leftSum += arr[i];
  }

  // If no pivot found, add a final step
  if (pivotIndex === -1) {
    const finalSnap: CellState[] = Array(arr.length).fill("skipped");
    steps.push({
      states: finalSnap,
      currentIndex: -1,
      leftSum: -1,
      rightSum: -1,
      output: `No pivot index found \u2192 return -1`,
    });
  }

  return { arr, steps, pivotIndex };
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
export function FindPivotIndexVisualization() {
  const [input, setInput] = useState("1,7,3,6,5,6");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<PivotStep[]>([]);
  const [arr, setArr] = useState<number[]>([1, 7, 3, 6, 5, 6]);
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
    setOutput(
      result.pivotIndex >= 0
        ? [
            `Pivot Index: ${result.pivotIndex}`,
            `Value at pivot: ${result.arr[result.pivotIndex]}`,
            `Total sum: ${result.arr.reduce((a, b) => a + b, 0)}`,
          ]
        : [`Pivot Index: -1 (no pivot exists)`]
    );
    setHasRun(true);
    setRunning(true);
    for (let i = 0; i < result.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 700));
      setStepIndex(i);
    }
    setRunning(false);
  };

  const curStep = stepIndex >= 0 ? steps[stepIndex] : null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Find Pivot Index</CardTitle>
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
                placeholder="e.g. 1,7,3,6,5,6"
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
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Blue
                </span>
                {" — "}left side (contributes to leftSum)
              </p>
              <p>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Yellow
                </span>
                {" — "}current pivot candidate
              </p>
              <p>
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  Purple
                </span>
                {" — "}right side (contributes to rightSum)
              </p>
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Green
                </span>
                {" — "}pivot found!
              </p>
            </div>

            {curStep && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={curStep.output}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-lg border bg-muted/50 px-3 py-2 font-mono text-xs"
                >
                  {curStep.output}
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
{`function pivotIndex(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  let leftSum = 0;
  for (let i = 0; i < nums.length; i++) {
    const rightSum = total - leftSum - nums[i];
    if (leftSum === rightSum) return i;
    leftSum += nums[i];
  }
  return -1;
}
console.log(pivotIndex([${arr.join(", ")}]));`}
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
        {hasRun && curStep && (
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
              states={curStep.states}
              currentIndex={curStep.currentIndex}
              leftSum={curStep.leftSum >= 0 ? curStep.leftSum : null}
              rightSum={curStep.rightSum >= 0 ? curStep.rightSum : null}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Imagine a seesaw at a playground with numbered blocks placed along
            it. You&apos;re trying to find the <strong>balance point</strong> —
            the one block you can place the fulcrum under so the total weight on
            the left equals the total weight on the right. You slide the fulcrum
            from left to right, adding each block&apos;s weight to the left side
            and subtracting it from the right side. When both sides read the
            same, you&apos;ve found the pivot — the perfect balancing point.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
