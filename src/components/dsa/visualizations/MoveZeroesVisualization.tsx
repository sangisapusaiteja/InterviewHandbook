"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Cell state ────────────────────────────────────────────────────────────
type CellState = "idle" | "write-pos" | "scanning" | "zero-moved" | "placed";

// ─── Array Diagram ─────────────────────────────────────────────────────────
function ArrayDiagram({
  arr,
  states,
  writePos,
  scanPos,
}: {
  arr: number[];
  states: CellState[];
  writePos: number;
  scanPos: number;
}) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    "write-pos": "#22c55e",
    scanning: "#eab308",
    "zero-moved": "#6b7280",
    placed: "#22c55e",
  };

  return (
    <div className="flex flex-col items-center py-2 gap-4">
      <div>
        <p className="text-[10px] text-muted-foreground mb-1 text-center font-semibold">Array</p>
        <div className="flex gap-2 flex-wrap justify-center">
          {arr.map((val, i) => {
            const state = states[i] ?? "idle";
            const isWrite = i === writePos;
            const isScan = i === scanPos;
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <motion.div
                  animate={{
                    backgroundColor: colorMap[state],
                    scale: isWrite || isScan ? 1.15 : 1,
                    opacity: state === "zero-moved" ? 0.4 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-border font-mono text-sm font-bold"
                >
                  {val}
                </motion.div>
                <span className="text-[10px] text-muted-foreground">{i}</span>
                <div className="flex gap-0.5">
                  {isWrite && (
                    <motion.span
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[9px] font-bold text-emerald-500"
                    >
                      W
                    </motion.span>
                  )}
                  {isScan && (
                    <motion.span
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[9px] font-bold text-yellow-500"
                    >
                      S
                    </motion.span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-4">
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold font-mono"
        >
          writePos = {writePos}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-3 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/40 text-yellow-700 dark:text-yellow-300 text-xs font-semibold font-mono"
        >
          scanner = {scanPos}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Step interface ────────────────────────────────────────────────────────
interface Step {
  arr: number[];
  states: CellState[];
  writePos: number;
  scanPos: number;
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(input: string): {
  originalArr: number[];
  steps: Step[];
  finalArr: number[];
} {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const originalArr = nums.length ? [...nums] : [0, 1, 0, 3, 12];
  const arr = [...originalArr];

  const steps: Step[] = [];
  let writePos = 0;

  for (let i = 0; i < arr.length; i++) {
    const snap: CellState[] = Array(arr.length).fill("idle");

    // Mark already placed positions
    for (let j = 0; j < writePos; j++) snap[j] = "placed";

    snap[i] = "scanning";
    if (i !== writePos) snap[writePos] = "write-pos";

    if (arr[i] !== 0) {
      steps.push({
        arr: [...arr],
        states: [...snap],
        writePos,
        scanPos: i,
        output: `i=${i}: arr[${i}]=${arr[i]} is non-zero → swap arr[${writePos}] and arr[${i}]`,
      });

      // Perform swap
      const temp = arr[writePos];
      arr[writePos] = arr[i];
      arr[i] = temp;

      const afterSnap: CellState[] = Array(arr.length).fill("idle");
      for (let j = 0; j <= writePos; j++) afterSnap[j] = "placed";
      if (arr[i] === 0) afterSnap[i] = "zero-moved";

      writePos++;
      steps.push({
        arr: [...arr],
        states: [...afterSnap],
        writePos,
        scanPos: i,
        output: `Swapped! Array: [${arr.join(", ")}], writePos → ${writePos}`,
      });
    } else {
      snap[i] = "zero-moved";
      steps.push({
        arr: [...arr],
        states: [...snap],
        writePos,
        scanPos: i,
        output: `i=${i}: arr[${i}]=0 → skip, writePos stays at ${writePos}`,
      });
    }
  }

  // Final step
  const finalSnap: CellState[] = arr.map((v) => (v === 0 ? "zero-moved" : "placed"));
  steps.push({
    arr: [...arr],
    states: finalSnap,
    writePos,
    scanPos: arr.length - 1,
    output: `Done! All zeroes moved to end: [${arr.join(", ")}]`,
  });

  return { originalArr, steps, finalArr: [...arr] };
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
export function MoveZeroesVisualization() {
  const [input, setInput] = useState("0,1,0,3,12");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [originalArr, setOriginalArr] = useState<number[]>([0, 1, 0, 3, 12]);
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
      `Input:  [${result.originalArr.join(", ")}]`,
      `Output: [${result.finalArr.join(", ")}]`,
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
        <CardTitle className="text-lg">Move Zeroes</CardTitle>
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
                placeholder="e.g. 0,1,0,3,12"
              />
            </div>

            <Button
              size="sm"
              onClick={handleRun}
              disabled={running}
              className="w-full"
            >
              <Play className="h-3.5 w-3.5 mr-1" />
              {running ? "Moving..." : "Run"}
            </Button>

            <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Green
                </span>
                {" — "}write position (non-zero placed here)
              </p>
              <p>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Yellow
                </span>
                {" — "}scanning current element
              </p>
              <p>
                <span className="font-semibold text-zinc-400">
                  Gray
                </span>
                {" — "}zero moved to end
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
{`function moveZeroes(nums) {
  let writePos = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[writePos], nums[i]] =
        [nums[i], nums[writePos]];
      writePos++;
    }
  }
  return nums;
}
console.log(moveZeroes([${originalArr.join(", ")}]));`}
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
              writePos={curStep.writePos}
              scanPos={curStep.scanPos}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Picture a row of chairs at a concert, some occupied and some empty.
            You want all the people (non-zeroes) to sit together at the front
            with all empty chairs (zeroes) at the back. You use two helpers: a
            {" "}<strong>seat assigner</strong> who tracks the next open front seat
            (writePos), and a <strong>scanner</strong> who walks down the row.
            Every time the scanner finds a person, they move to the next front
            seat. One pass and everyone is packed to the front — no extra chairs
            needed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
