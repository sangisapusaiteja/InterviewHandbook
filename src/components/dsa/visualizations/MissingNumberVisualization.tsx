"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Cell state ────────────────────────────────────────────────────────────
type CellState = "idle" | "checking" | "present" | "missing";

// ─── Array Diagram ─────────────────────────────────────────────────────────
function ArrayDiagram({
  arr,
  states,
  currentIndex,
  expectedRange,
  missingNumber,
  expectedSum,
  actualSum,
  showResult,
}: {
  arr: number[];
  states: CellState[];
  currentIndex: number;
  expectedRange: number[];
  missingNumber: number | null;
  expectedSum: number | null;
  actualSum: number | null;
  showResult: boolean;
}) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    checking: "#eab308",
    present: "#22c55e",
    missing: "#ef4444",
  };

  return (
    <div className="flex flex-col items-center py-2 gap-4">
      {/* Expected range 0..n */}
      <div>
        <p className="text-[10px] text-muted-foreground mb-1 text-center font-semibold">
          Expected Range [0..{arr.length}]
        </p>
        <div className="flex gap-1.5 flex-wrap justify-center">
          {expectedRange.map((val) => {
            const isMissing = showResult && val === missingNumber;
            return (
              <motion.div
                key={val}
                animate={{
                  backgroundColor: isMissing ? "#ef4444" : arr.includes(val) ? "#22c55e20" : "transparent",
                  scale: isMissing ? 1.2 : 1,
                  borderColor: isMissing ? "#ef4444" : arr.includes(val) ? "#22c55e80" : undefined,
                }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 flex items-center justify-center rounded-md border border-border font-mono text-xs font-bold"
              >
                {val}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Input array */}
      <div>
        <p className="text-[10px] text-muted-foreground mb-1 text-center font-semibold">
          Input Array
        </p>
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

      {/* Sum display */}
      <div className="flex gap-6 items-center flex-wrap justify-center">
        {expectedSum !== null && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-700 dark:text-blue-300 text-xs font-semibold font-mono"
          >
            Expected Sum = {expectedSum}
          </motion.div>
        )}
        {actualSum !== null && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs font-semibold font-mono"
          >
            Actual Sum = {actualSum}
          </motion.div>
        )}
        {showResult && missingNumber !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-4 py-1.5 rounded-full bg-red-500/15 border border-red-500/40 text-red-700 dark:text-red-300 text-xs font-semibold font-mono"
          >
            Missing = {expectedSum! - actualSum!} = {missingNumber}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Step interface ────────────────────────────────────────────────────────
interface Step {
  states: CellState[];
  currentIndex: number;
  expectedSum: number | null;
  actualSum: number | null;
  showResult: boolean;
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(input: string): {
  arr: number[];
  steps: Step[];
  missingNumber: number;
  expectedRange: number[];
} {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const arr = nums.length ? nums : [3, 0, 1];

  const n = arr.length;
  const expectedSum = (n * (n + 1)) / 2;
  const expectedRange = Array.from({ length: n + 1 }, (_, i) => i);

  const steps: Step[] = [];
  const stateSnapshot: CellState[] = Array(arr.length).fill("idle");

  // Step 1: Show Gauss formula
  steps.push({
    states: [...stateSnapshot],
    currentIndex: -1,
    expectedSum: expectedSum,
    actualSum: null,
    showResult: false,
    output: `Gauss formula: n*(n+1)/2 = ${n}*${n + 1}/2 = ${expectedSum}`,
  });

  // Steps: accumulate actual sum
  let runningSum = 0;
  for (let i = 0; i < arr.length; i++) {
    const snap = [...stateSnapshot] as CellState[];
    snap[i] = "checking";
    runningSum += arr[i];

    steps.push({
      states: [...snap],
      currentIndex: i,
      expectedSum: expectedSum,
      actualSum: runningSum,
      showResult: false,
      output: `i=${i}: actualSum += ${arr[i]} → actualSum = ${runningSum}`,
    });
    stateSnapshot[i] = "present";
  }

  // Final step
  const missingNumber = expectedSum - runningSum;
  const finalSnap = [...stateSnapshot] as CellState[];
  steps.push({
    states: finalSnap,
    currentIndex: -1,
    expectedSum: expectedSum,
    actualSum: runningSum,
    showResult: true,
    output: `Missing = ${expectedSum} - ${runningSum} = ${missingNumber}`,
  });

  return { arr, steps, missingNumber, expectedRange };
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
export function MissingNumberVisualization() {
  const [input, setInput] = useState("3,0,1");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [arr, setArr] = useState<number[]>([3, 0, 1]);
  const [missingNumber, setMissingNumber] = useState<number | null>(null);
  const [expectedRange, setExpectedRange] = useState<number[]>([0, 1, 2, 3]);
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
    setMissingNumber(result.missingNumber);
    setExpectedRange(result.expectedRange);
    setOutput([
      `Missing number: ${result.missingNumber}`,
      `Array length: ${result.arr.length}  |  Range: [0..${result.arr.length}]`,
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
        <CardTitle className="text-lg">Missing Number</CardTitle>
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
                Array (comma-separated, range 0..n with one missing)
              </p>
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  clear();
                }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                placeholder="e.g. 3,0,1"
              />
            </div>

            <Button
              size="sm"
              onClick={handleRun}
              disabled={running}
              className="w-full"
            >
              <Play className="h-3.5 w-3.5 mr-1" />
              {running ? "Calculating..." : "Run"}
            </Button>

            <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
              <p>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Checking
                </span>
                {" — "}adding element to actual sum
              </p>
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Present
                </span>
                {" — "}element counted in sum
              </p>
              <p>
                <span className="font-semibold text-red-500 dark:text-red-400">
                  Missing
                </span>
                {" — "}the number not in the array
              </p>
              <p>
                <span className="font-semibold text-blue-500 dark:text-blue-400">
                  Expected Sum
                </span>
                {" — "}Gauss formula n*(n+1)/2
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
{`function missingNumber(nums) {
  const n = nums.length;
  // Gauss formula: expected sum of 0..n
  const expectedSum = (n * (n + 1)) / 2;
  let actualSum = 0;
  for (let i = 0; i < nums.length; i++) {
    actualSum += nums[i];
  }
  return expectedSum - actualSum;
}
console.log(missingNumber([${arr.join(", ")}]));`}
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
              expectedRange={expectedRange}
              missingNumber={missingNumber}
              expectedSum={curStep.expectedSum}
              actualSum={curStep.actualSum}
              showResult={curStep.showResult}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Imagine you have a jar of numbered raffle tickets from <strong>0</strong> to{" "}
            <strong>n</strong>. You know the total value of all tickets should be
            (using young Gauss&apos;s trick). You pour them out and add up every ticket
            you find. Whatever&apos;s left over — the difference between what you{" "}
            <em>expected</em> and what you <em>counted</em> — is the missing ticket
            number. No sorting, no searching, just simple arithmetic.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
