"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Cell state ────────────────────────────────────────────────────────────
type CellState = "idle" | "fixed" | "left-ptr" | "right-ptr" | "found" | "sorted";

// ─── Array Diagram ─────────────────────────────────────────────────────────
function ArrayDiagram({
  arr,
  states,
  fixedIdx,
  leftIdx,
  rightIdx,
  currentSum,
  triplets,
}: {
  arr: number[];
  states: CellState[];
  fixedIdx: number;
  leftIdx: number;
  rightIdx: number;
  currentSum: number | null;
  triplets: number[][];
}) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    fixed: "#ef4444",
    "left-ptr": "#3b82f6",
    "right-ptr": "#eab308",
    found: "#22c55e",
    sorted: "transparent",
  };

  return (
    <div className="flex flex-col items-center py-2 gap-4">
      <p className="text-[10px] text-muted-foreground mb-1 text-center font-semibold">
        Sorted Array
      </p>
      <div className="flex gap-2 flex-wrap justify-center">
        {arr.map((val, i) => {
          const state = states[i] ?? "idle";
          const isFixed = i === fixedIdx;
          const isLeft = i === leftIdx;
          const isRight = i === rightIdx;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  backgroundColor: colorMap[state],
                  scale: isFixed || isLeft || isRight ? 1.15 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-border font-mono text-sm font-bold"
              >
                {val}
              </motion.div>
              <span className="text-[10px] text-muted-foreground">{i}</span>
              {isFixed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] font-bold text-red-500"
                >
                  i
                </motion.span>
              )}
              {isLeft && !isFixed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] font-bold text-blue-500"
                >
                  L
                </motion.span>
              )}
              {isRight && !isFixed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] font-bold text-yellow-500"
                >
                  R
                </motion.span>
              )}
            </div>
          );
        })}
      </div>

      {/* Sum display */}
      {currentSum !== null && (
        <motion.div
          key={currentSum}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`px-4 py-1.5 rounded-full border text-xs font-semibold font-mono ${
            currentSum === 0
              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
              : currentSum < 0
                ? "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300"
                : "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300"
          }`}
        >
          Sum = {currentSum} {currentSum === 0 ? "= 0 (found!)" : currentSum < 0 ? "< 0 (move L right)" : "> 0 (move R left)"}
        </motion.div>
      )}

      {/* Found triplets */}
      {triplets.length > 0 && (
        <div>
          <p className="text-[10px] text-muted-foreground mb-1 text-center font-semibold">
            Found Triplets
          </p>
          <div className="flex gap-2 flex-wrap justify-center">
            <AnimatePresence>
              {triplets.map((t, i) => (
                <motion.div
                  key={`${t.join(",")}-${i}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-3 py-1 rounded-full border border-emerald-500/50 bg-emerald-500/15 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300"
                >
                  [{t.join(", ")}]
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Step interface ────────────────────────────────────────────────────────
interface Step {
  states: CellState[];
  fixedIdx: number;
  leftIdx: number;
  rightIdx: number;
  currentSum: number | null;
  triplets: number[][];
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(input: string): {
  arr: number[];
  steps: Step[];
  triplets: number[][];
} {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const arr = nums.length ? [...nums].sort((a, b) => a - b) : [-4, -1, -1, 0, 1, 2];

  const steps: Step[] = [];
  const triplets: number[][] = [];

  // Sort step
  const initStates: CellState[] = Array(arr.length).fill("sorted");
  steps.push({
    states: [...initStates],
    fixedIdx: -1,
    leftIdx: -1,
    rightIdx: -1,
    currentSum: null,
    triplets: [],
    output: `Sorted array: [${arr.join(", ")}]`,
  });

  for (let i = 0; i < arr.length - 2; i++) {
    // Skip duplicate fixed elements
    if (i > 0 && arr[i] === arr[i - 1]) continue;

    let left = i + 1;
    let right = arr.length - 1;

    // Show fixed element
    const fixSnap: CellState[] = Array(arr.length).fill("idle");
    fixSnap[i] = "fixed";
    fixSnap[left] = "left-ptr";
    fixSnap[right] = "right-ptr";

    steps.push({
      states: [...fixSnap],
      fixedIdx: i,
      leftIdx: left,
      rightIdx: right,
      currentSum: null,
      triplets: [...triplets],
      output: `Fix i=${i} (${arr[i]}), L=${left}, R=${right}`,
    });

    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right];

      const snap: CellState[] = Array(arr.length).fill("idle");
      snap[i] = "fixed";
      snap[left] = "left-ptr";
      snap[right] = "right-ptr";

      if (sum === 0) {
        snap[i] = "found";
        snap[left] = "found";
        snap[right] = "found";
        triplets.push([arr[i], arr[left], arr[right]]);
        steps.push({
          states: [...snap],
          fixedIdx: i,
          leftIdx: left,
          rightIdx: right,
          currentSum: sum,
          triplets: [...triplets],
          output: `Sum = ${arr[i]}+${arr[left]}+${arr[right]} = 0 → FOUND [${arr[i]},${arr[left]},${arr[right]}]`,
        });
        // Skip duplicates
        while (left < right && arr[left] === arr[left + 1]) left++;
        while (left < right && arr[right] === arr[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        steps.push({
          states: [...snap],
          fixedIdx: i,
          leftIdx: left,
          rightIdx: right,
          currentSum: sum,
          triplets: [...triplets],
          output: `Sum = ${arr[i]}+${arr[left]}+${arr[right]} = ${sum} < 0 → move L right`,
        });
        left++;
      } else {
        steps.push({
          states: [...snap],
          fixedIdx: i,
          leftIdx: left,
          rightIdx: right,
          currentSum: sum,
          triplets: [...triplets],
          output: `Sum = ${arr[i]}+${arr[left]}+${arr[right]} = ${sum} > 0 → move R left`,
        });
        right--;
      }
    }
  }

  // Final
  const finalSnap: CellState[] = Array(arr.length).fill("idle");
  steps.push({
    states: finalSnap,
    fixedIdx: -1,
    leftIdx: -1,
    rightIdx: -1,
    currentSum: null,
    triplets: [...triplets],
    output: `Done! Found ${triplets.length} triplet(s): ${triplets.map((t) => `[${t.join(",")}]`).join(", ") || "none"}`,
  });

  return { arr, steps, triplets };
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
export function ThreeSumVisualization() {
  const [input, setInput] = useState("-1,0,1,2,-1,-4");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [arr, setArr] = useState<number[]>([-4, -1, -1, 0, 1, 2]);
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
      `Triplets: ${result.triplets.map((t) => `[${t.join(",")}]`).join(", ") || "none"}`,
      `Array length: ${result.arr.length} (sorted)`,
    ]);
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
        <CardTitle className="text-lg">3Sum</CardTitle>
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
                placeholder="e.g. -1,0,1,2,-1,-4"
              />
            </div>

            <Button
              size="sm"
              onClick={handleRun}
              disabled={running}
              className="w-full"
            >
              <Play className="h-3.5 w-3.5 mr-1" />
              {running ? "Searching..." : "Run"}
            </Button>

            <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
              <p>
                <span className="font-semibold text-red-500 dark:text-red-400">
                  Red
                </span>
                {" — "}fixed element (i)
              </p>
              <p>
                <span className="font-semibold text-blue-500 dark:text-blue-400">
                  Blue
                </span>
                {" — "}left pointer (L)
              </p>
              <p>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Yellow
                </span>
                {" — "}right pointer (R)
              </p>
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Green
                </span>
                {" — "}found triplet summing to 0
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
{`function threeSum(nums) {
  nums.sort((a,b) => a-b);
  const result = [];
  for (let i = 0; i < nums.length-2; i++) {
    if (i>0 && nums[i]===nums[i-1]) continue;
    let L = i+1, R = nums.length-1;
    while (L < R) {
      const sum = nums[i]+nums[L]+nums[R];
      if (sum === 0) {
        result.push([nums[i],nums[L],nums[R]]);
        while (L<R && nums[L]===nums[L+1]) L++;
        while (L<R && nums[R]===nums[R-1]) R--;
        L++; R--;
      } else if (sum < 0) L++;
      else R--;
    }
  }
  return result;
}
// threeSum([${arr.join(", ")}])`}
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
              fixedIdx={curStep.fixedIdx}
              leftIdx={curStep.leftIdx}
              rightIdx={curStep.rightIdx}
              currentSum={curStep.currentSum}
              triplets={curStep.triplets}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Imagine you have a collection of weights — some positive, some
            negative — and you need to find groups of three that perfectly
            balance a scale (sum to zero). First, you <strong>sort</strong> them
            from lightest to heaviest. Then you pick one weight, and use two
            fingers on the remaining lineup — one starting from the lightest
            and one from the heaviest. If the total is too light, slide the
            left finger right; too heavy, slide the right finger left. When
            they balance, you have found a triplet. This two-pointer squeeze
            avoids checking every possible combination.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
