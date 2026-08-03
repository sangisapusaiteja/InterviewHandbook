"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Cell state ────────────────────────────────────────────────────────────
type CellState = "idle" | "current" | "marked" | "unmarked-missing" | "checking-collect";

// ─── Array Diagram ─────────────────────────────────────────────────────────
function ArrayDiagram({
  arr,
  states,
  currentIndex,
  phase,
  missing,
}: {
  arr: number[];
  states: CellState[];
  currentIndex: number;
  phase: string;
  missing: number[];
}) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    current: "#eab308",
    marked: "#22c55e",
    "unmarked-missing": "#ef4444",
    "checking-collect": "#3b82f6",
  };

  return (
    <div className="flex flex-col items-center py-2 gap-4">
      <div>
        <p className="text-[10px] text-muted-foreground mb-1 text-center font-semibold">
          Array (phase: {phase})
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
                  className="w-12 h-10 flex items-center justify-center rounded-lg border-2 border-border font-mono text-xs font-bold"
                >
                  {val}
                </motion.div>
                <span className="text-[10px] text-muted-foreground">i={i}</span>
                {state === "marked" && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[9px] font-bold text-emerald-500"
                  >
                    neg
                  </motion.span>
                )}
                {state === "unmarked-missing" && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[9px] font-bold text-red-500"
                  >
                    miss!
                  </motion.span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {missing.length > 0 && (
        <div>
          <p className="text-[10px] text-muted-foreground mb-1 text-center font-semibold">Missing Numbers</p>
          <div className="flex gap-1.5 flex-wrap justify-center">
            <AnimatePresence>
              {missing.map((val, i) => (
                <motion.div
                  key={`${val}-${i}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-red-500/50 bg-red-500/15 font-mono text-xs font-bold text-red-700 dark:text-red-300"
                >
                  {val}
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
  arr: number[];
  states: CellState[];
  currentIndex: number;
  phase: string;
  missing: number[];
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(input: string): {
  originalArr: number[];
  steps: Step[];
  missingNums: number[];
} {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const originalArr = nums.length ? [...nums] : [4, 3, 2, 7, 8, 2, 3, 1];
  const arr = [...originalArr];
  const n = arr.length;

  const steps: Step[] = [];

  // Initial
  steps.push({
    arr: [...arr],
    states: Array(n).fill("idle"),
    currentIndex: -1,
    phase: "marking",
    missing: [],
    output: `Array of length ${n}. Numbers should be [1..${n}]. Mark indices as negative.`,
  });

  // Marking phase
  for (let i = 0; i < n; i++) {
    const targetIdx = Math.abs(arr[i]) - 1;

    const snap: CellState[] = arr.map((v, idx) => {
      if (v < 0 || (idx < i && arr[idx] < 0)) return "marked";
      return "idle";
    });
    snap[i] = "current";

    steps.push({
      arr: [...arr],
      states: [...snap],
      currentIndex: i,
      phase: "marking",
      missing: [],
      output: `i=${i}: |arr[${i}]|=${Math.abs(arr[i])} → mark index ${targetIdx} as negative`,
    });

    if (arr[targetIdx] > 0) {
      arr[targetIdx] = -arr[targetIdx];
    }

    const afterSnap: CellState[] = arr.map((v) => (v < 0 ? "marked" : "idle"));
    afterSnap[i] = arr[i] < 0 ? "marked" : "current";

    steps.push({
      arr: [...arr],
      states: [...afterSnap],
      currentIndex: i,
      phase: "marking",
      missing: [],
      output: `Marked! arr[${targetIdx}] → ${arr[targetIdx]}. Array: [${arr.join(", ")}]`,
    });
  }

  // Collection phase
  const missing: number[] = [];
  steps.push({
    arr: [...arr],
    states: arr.map((v) => (v < 0 ? "marked" : "idle")),
    currentIndex: -1,
    phase: "collecting",
    missing: [],
    output: `Marking done. Now collect indices where arr[i] > 0 (those numbers are missing).`,
  });

  for (let i = 0; i < n; i++) {
    const snap: CellState[] = arr.map((v, idx) => {
      if (idx < i && v > 0) return "unmarked-missing";
      if (v < 0) return "marked";
      return "idle";
    });
    snap[i] = "checking-collect";

    if (arr[i] > 0) {
      missing.push(i + 1);
      snap[i] = "unmarked-missing";
      steps.push({
        arr: [...arr],
        states: [...snap],
        currentIndex: i,
        phase: "collecting",
        missing: [...missing],
        output: `i=${i}: arr[${i}]=${arr[i]} > 0 → number ${i + 1} is MISSING!`,
      });
    } else {
      steps.push({
        arr: [...arr],
        states: [...snap],
        currentIndex: i,
        phase: "collecting",
        missing: [...missing],
        output: `i=${i}: arr[${i}]=${arr[i]} < 0 → number ${i + 1} was present`,
      });
    }
  }

  // Final
  const finalSnap: CellState[] = arr.map((v) => (v > 0 ? "unmarked-missing" : "marked"));
  steps.push({
    arr: [...arr],
    states: finalSnap,
    currentIndex: -1,
    phase: "done",
    missing: [...missing],
    output: `Done! Missing numbers: [${missing.join(", ")}]`,
  });

  return { originalArr, steps, missingNums: missing };
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
export function FindDisappearedNumbersVisualization() {
  const [input, setInput] = useState("4,3,2,7,8,2,3,1");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [originalArr, setOriginalArr] = useState<number[]>([4, 3, 2, 7, 8, 2, 3, 1]);
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
    setOriginalArr(result.originalArr);
    setSteps(result.steps);
    setOutput([
      `Missing numbers: [${result.missingNums.join(", ")}]`,
      `Input: [${result.originalArr.join(", ")}]`,
    ]);
    setHasRun(true);
    setRunning(true);
    for (let i = 0; i < result.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 500));
      setStepIndex(i);
    }
    setRunning(false);
  };

  const curStep = stepIndex >= 0 ? steps[stepIndex] : null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Find All Numbers Disappeared in an Array</CardTitle>
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
                Array (comma-separated, values 1 to n)
              </p>
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  clear();
                }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                placeholder="e.g. 4,3,2,7,8,2,3,1"
              />
            </div>

            <Button
              size="sm"
              onClick={handleRun}
              disabled={running}
              className="w-full"
            >
              <Play className="h-3.5 w-3.5 mr-1" />
              {running ? "Processing..." : "Run"}
            </Button>

            <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Green
                </span>
                {" — "}marked (negated) — number is present
              </p>
              <p>
                <span className="font-semibold text-red-500 dark:text-red-400">
                  Red
                </span>
                {" — "}unmarked (positive) — number is missing
              </p>
              <p>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Yellow
                </span>
                {" — "}currently processing
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
{`function findDisappearedNumbers(nums) {
  for (let i = 0; i < nums.length; i++) {
    const idx = Math.abs(nums[i]) - 1;
    if (nums[idx] > 0) nums[idx] = -nums[idx];
  }
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) result.push(i + 1);
  }
  return result;
}
console.log(findDisappearedNumbers(
  [${originalArr.join(", ")}]));`}
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
              arr={curStep.arr}
              states={curStep.states}
              currentIndex={curStep.currentIndex}
              phase={curStep.phase}
              missing={curStep.missing}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Imagine a classroom with seats numbered 1 to n. Students walk in and
            each one sits down — but some seats get double-booked while others
            stay empty. To find the empty seats without a roster, you give each
            arriving student a <strong>sticky note</strong> to flip over the sign
            on their seat number (mark it negative). After everyone is seated,
            walk down the row: any seat whose sign is still right-side-up (positive)
            means nobody claimed it — that number is <strong>missing</strong>.
            No extra space needed, just clever sign flipping.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
