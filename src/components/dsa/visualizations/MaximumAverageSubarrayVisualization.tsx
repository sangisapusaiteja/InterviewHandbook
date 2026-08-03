"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Cell state ────────────────────────────────────────────────────────────
type CellState = "idle" | "current-window" | "best-window";

// ─── Array Diagram ─────────────────────────────────────────────────────────
function ArrayDiagram({
  arr,
  states,
  currentSum,
  maxAvg,
  k,
}: {
  arr: number[];
  states: CellState[];
  currentSum: number | null;
  maxAvg: number | null;
  k: number;
}) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    "current-window": "#3b82f6",
    "best-window": "#22c55e",
  };

  return (
    <div className="flex flex-col items-center py-2 gap-4">
      <div>
        <p className="text-[10px] text-muted-foreground mb-1 text-center font-semibold">Array (k={k})</p>
        <div className="flex gap-2 flex-wrap justify-center">
          {arr.map((val, i) => {
            const state = states[i] ?? "idle";
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <motion.div
                  animate={{
                    backgroundColor: colorMap[state],
                    scale: state !== "idle" ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
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
      <div className="flex gap-4">
        {currentSum !== null && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-700 dark:text-blue-300 text-xs font-semibold font-mono"
          >
            Window Sum = {currentSum}
          </motion.div>
        )}
        {maxAvg !== null && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold font-mono"
          >
            Max Avg = {maxAvg.toFixed(4)}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Step interface ────────────────────────────────────────────────────────
interface Step {
  states: CellState[];
  currentSum: number | null;
  maxAvg: number | null;
  bestStart: number;
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(input: string): {
  arr: number[];
  k: number;
  steps: Step[];
  finalMaxAvg: number;
} {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const raw = nums.length >= 2 ? nums : [1, 12, -5, -6, 50, 3, 4];
  const k = raw[raw.length - 1];
  const arr = raw.slice(0, raw.length - 1);

  const steps: Step[] = [];
  const safeK = Math.min(Math.max(k, 1), arr.length);

  // Step 1: compute first window sum
  let windowSum = 0;
  for (let i = 0; i < safeK; i++) windowSum += arr[i];

  const firstStates: CellState[] = Array(arr.length).fill("idle");
  for (let i = 0; i < safeK; i++) firstStates[i] = "current-window";

  let maxSum = windowSum;
  let bestStart = 0;

  steps.push({
    states: [...firstStates],
    currentSum: windowSum,
    maxAvg: windowSum / safeK,
    bestStart: 0,
    output: `Initial window [0..${safeK - 1}]: sum=${windowSum}, avg=${(windowSum / safeK).toFixed(4)}`,
  });

  // Slide the window
  for (let i = safeK; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - safeK];
    const snap: CellState[] = Array(arr.length).fill("idle");

    // Mark best window
    if (windowSum > maxSum) {
      maxSum = windowSum;
      bestStart = i - safeK + 1;
    }

    // Mark current window
    for (let j = i - safeK + 1; j <= i; j++) snap[j] = "current-window";

    // Overlay best window if different
    if (bestStart !== i - safeK + 1) {
      for (let j = bestStart; j < bestStart + safeK; j++) {
        if (snap[j] !== "current-window") snap[j] = "best-window";
      }
    }

    steps.push({
      states: [...snap],
      currentSum: windowSum,
      maxAvg: maxSum / safeK,
      bestStart,
      output: `Slide to [${i - safeK + 1}..${i}]: +${arr[i]} -${arr[i - safeK]} → sum=${windowSum}, avg=${(windowSum / safeK).toFixed(4)}${windowSum === maxSum && bestStart === i - safeK + 1 ? " (new best!)" : ""}`,
    });
  }

  // Final step: highlight best window
  const finalStates: CellState[] = Array(arr.length).fill("idle");
  for (let j = bestStart; j < bestStart + safeK; j++) finalStates[j] = "best-window";
  steps.push({
    states: [...finalStates],
    currentSum: maxSum,
    maxAvg: maxSum / safeK,
    bestStart,
    output: `Done! Best window [${bestStart}..${bestStart + safeK - 1}], max avg = ${(maxSum / safeK).toFixed(4)}`,
  });

  return { arr, k: safeK, steps, finalMaxAvg: maxSum / safeK };
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
export function MaximumAverageSubarrayVisualization() {
  const [input, setInput] = useState("1,12,-5,-6,50,3,4");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [arr, setArr] = useState<number[]>([1, 12, -5, -6, 50, 3]);
  const [k, setK] = useState(4);
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
    setK(result.k);
    setSteps(result.steps);
    setOutput([
      `Maximum Average: ${result.finalMaxAvg.toFixed(5)}`,
      `Array: [${result.arr.join(", ")}], k=${result.k}`,
    ]);
    setHasRun(true);
    setRunning(true);
    for (let i = 0; i < result.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 600));
      setStepIndex(i);
    }
    setRunning(false);
  };

  const curStep = stepIndex >= 0 ? steps[stepIndex] : null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Maximum Average Subarray I</CardTitle>
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
                Array + k (comma-separated, last value is k)
              </p>
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  clear();
                }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                placeholder="e.g. 1,12,-5,-6,50,3,4"
              />
            </div>

            <Button
              size="sm"
              onClick={handleRun}
              disabled={running}
              className="w-full"
            >
              <Play className="h-3.5 w-3.5 mr-1" />
              {running ? "Sliding..." : "Run"}
            </Button>

            <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Blue
                </span>
                {" — "}current sliding window
              </p>
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Green
                </span>
                {" — "}best window found so far
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
{`function findMaxAverage(nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  let maxSum = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum / k;
}
console.log(findMaxAverage([${arr.join(", ")}], ${k}));`}
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
              currentSum={curStep.currentSum}
              maxAvg={curStep.maxAvg}
              k={k}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Imagine you run a restaurant and want to find the best consecutive
            {" "}<strong>k-day</strong> stretch for average daily revenue. Instead of
            re-adding all k days every time you shift by one day, you simply drop
            yesterday&apos;s number from the left and add tomorrow&apos;s number on
            the right — like sliding a window frame across a calendar. This trick
            turns an O(n*k) brute force into a smooth O(n) single pass.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
