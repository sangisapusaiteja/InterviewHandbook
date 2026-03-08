"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Cell state ────────────────────────────────────────────────────────────
type CellState = "idle" | "current" | "candidate-match" | "candidate-diff" | "done";

// ─── Array Diagram ─────────────────────────────────────────────────────────
function ArrayDiagram({
  arr,
  states,
  currentIndex,
  candidate,
  count,
}: {
  arr: number[];
  states: CellState[];
  currentIndex: number;
  candidate: number | null;
  count: number;
}) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    current: "#eab308",
    "candidate-match": "#3b82f6",
    "candidate-diff": "#f97316",
    done: "#22c55e",
  };

  return (
    <div className="flex flex-col items-center py-2 gap-4">
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

      {/* Candidate & Count display */}
      <div className="flex gap-4 items-center flex-wrap justify-center">
        <motion.div
          animate={{ scale: candidate !== null ? 1 : 0.9 }}
          className="px-4 py-2 rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-700 dark:text-blue-300 text-xs font-semibold font-mono"
        >
          Candidate: {candidate !== null ? candidate : "—"}
        </motion.div>
        <motion.div
          key={count}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          className="px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs font-semibold font-mono"
        >
          Count: {count}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Step interface ────────────────────────────────────────────────────────
interface Step {
  states: CellState[];
  currentIndex: number;
  candidate: number | null;
  count: number;
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(input: string): {
  arr: number[];
  steps: Step[];
  majority: number;
} {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const arr = nums.length ? nums : [2, 2, 1, 1, 1, 2, 2];

  const steps: Step[] = [];
  const stateArr: CellState[] = Array(arr.length).fill("idle");

  let candidate: number | null = null;
  let count = 0;

  // Initial
  steps.push({
    states: [...stateArr],
    currentIndex: -1,
    candidate: null,
    count: 0,
    output: "Boyer-Moore Voting: start with candidate=null, count=0",
  });

  for (let i = 0; i < arr.length; i++) {
    const snap = [...stateArr] as CellState[];
    snap[i] = "current";

    if (count === 0) {
      candidate = arr[i];
      count = 1;
      snap[i] = "candidate-match";
      steps.push({
        states: [...snap],
        currentIndex: i,
        candidate,
        count,
        output: `i=${i}: count was 0 → new candidate = ${arr[i]}, count = 1`,
      });
    } else if (arr[i] === candidate) {
      count++;
      snap[i] = "candidate-match";
      steps.push({
        states: [...snap],
        currentIndex: i,
        candidate,
        count,
        output: `i=${i}: ${arr[i]} == candidate ${candidate} → count++ = ${count}`,
      });
    } else {
      count--;
      snap[i] = "candidate-diff";
      steps.push({
        states: [...snap],
        currentIndex: i,
        candidate,
        count,
        output: `i=${i}: ${arr[i]} != candidate ${candidate} → count-- = ${count}`,
      });
    }
    stateArr[i] = snap[i];
  }

  // Final
  const finalSnap = stateArr.map(() => "done" as CellState);
  steps.push({
    states: finalSnap,
    currentIndex: -1,
    candidate,
    count,
    output: `Majority element = ${candidate}`,
  });

  return { arr, steps, majority: candidate! };
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
export function MajorityElementVisualization() {
  const [input, setInput] = useState("2,2,1,1,1,2,2");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [arr, setArr] = useState<number[]>([2, 2, 1, 1, 1, 2, 2]);
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
      `Majority element: ${result.majority}`,
      `Array length: ${result.arr.length}`,
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
        <CardTitle className="text-lg">Majority Element (Boyer-Moore Voting)</CardTitle>
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
                placeholder="e.g. 2,2,1,1,1,2,2"
              />
            </div>

            <Button
              size="sm"
              onClick={handleRun}
              disabled={running}
              className="w-full"
            >
              <Play className="h-3.5 w-3.5 mr-1" />
              {running ? "Voting..." : "Run"}
            </Button>

            <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
              <p>
                <span className="font-semibold text-blue-500 dark:text-blue-400">
                  Blue
                </span>
                {" — "}matches current candidate (count++)
              </p>
              <p>
                <span className="font-semibold text-orange-500 dark:text-orange-400">
                  Orange
                </span>
                {" — "}differs from candidate (count--)
              </p>
              <p>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Yellow
                </span>
                {" — "}currently scanning
              </p>
              <p className="text-muted-foreground">
                Candidate and count badges show current state
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
{`function majorityElement(nums) {
  let candidate = null, count = 0;
  for (const num of nums) {
    if (count === 0) {
      candidate = num;
      count = 1;
    } else if (num === candidate) {
      count++;
    } else {
      count--;
    }
  }
  return candidate;
}
console.log(majorityElement([${arr.join(", ")}]));`}
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
              candidate={curStep.candidate}
              count={curStep.count}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Imagine a crowd voting for a leader by standing in a line. You
            pick the first person as the <strong>candidate</strong>. Each
            time someone in the line supports the same candidate, the
            candidate&apos;s strength grows. Each time someone supports a
            <em> different</em> candidate, one supporter from each side
            cancels out (like a one-on-one duel). Because the majority
            element appears more than half the time, it is guaranteed to be
            the last one standing after all the cancellations.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
