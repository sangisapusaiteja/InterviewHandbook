"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Cell state ────────────────────────────────────────────────────────────
type CellState = "idle" | "in-set" | "checking" | "current-seq" | "best-seq" | "skipped";

// ─── Array Diagram ─────────────────────────────────────────────────────────
function ArrayDiagram({
  arr,
  states,
  sortedUnique,
  sortedStates,
  longestLen,
  currentLen,
}: {
  arr: number[];
  states: CellState[];
  sortedUnique: number[];
  sortedStates: CellState[];
  longestLen: number;
  currentLen: number;
}) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    "in-set": "#6b7280",
    checking: "#eab308",
    "current-seq": "#3b82f6",
    "best-seq": "#22c55e",
    skipped: "#374151",
  };

  return (
    <div className="flex flex-col items-center py-2 gap-4">
      {/* Original array */}
      <div>
        <p className="text-[10px] text-muted-foreground mb-1 text-center font-semibold">Original Array</p>
        <div className="flex gap-2 flex-wrap justify-center">
          {arr.map((val, i) => {
            const state = states[i] ?? "idle";
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <motion.div
                  animate={{
                    backgroundColor: colorMap[state],
                    scale: state === "checking" || state === "current-seq" ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-border font-mono text-sm font-bold"
                >
                  {val}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Number line showing sequences */}
      {sortedUnique.length > 0 && (
        <div>
          <p className="text-[10px] text-muted-foreground mb-1 text-center font-semibold">Set (sorted for display)</p>
          <div className="flex gap-1.5 flex-wrap justify-center">
            {sortedUnique.map((val, i) => {
              const state = sortedStates[i] ?? "in-set";
              return (
                <motion.div
                  key={`${val}-${i}`}
                  animate={{
                    backgroundColor: colorMap[state],
                    scale: state === "current-seq" || state === "best-seq" ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-border font-mono text-xs font-bold"
                >
                  {val}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-700 dark:text-blue-300 text-xs font-semibold font-mono"
        >
          Current Streak = {currentLen}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold font-mono"
        >
          Longest = {longestLen}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Step interface ────────────────────────────────────────────────────────
interface Step {
  states: CellState[];
  sortedStates: CellState[];
  currentLen: number;
  longestLen: number;
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(input: string): {
  arr: number[];
  sortedUnique: number[];
  steps: Step[];
  longest: number;
} {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const arr = nums.length ? nums : [100, 4, 200, 1, 3, 2];

  const numSet = new Set(arr);
  const sortedUnique = Array.from(numSet).sort((a, b) => a - b);

  const steps: Step[] = [];
  let longest = 0;
  let bestSeqNums = new Set<number>();

  // Step: build set
  const initStates: CellState[] = Array(arr.length).fill("in-set");
  const initSorted: CellState[] = Array(sortedUnique.length).fill("in-set");
  steps.push({
    states: [...initStates],
    sortedStates: [...initSorted],
    currentLen: 0,
    longestLen: 0,
    output: `Built Set: {${sortedUnique.join(", ")}} (${sortedUnique.length} unique values)`,
  });

  // For each number, check if it's a sequence start
  for (const num of arr) {
    const sortedSnap: CellState[] = sortedUnique.map((v) =>
      bestSeqNums.has(v) ? "best-seq" : "in-set"
    );
    const arrSnap: CellState[] = arr.map((v) =>
      bestSeqNums.has(v) ? "best-seq" : "in-set"
    );

    // Highlight current number being checked
    const numSortedIdx = sortedUnique.indexOf(num);
    if (numSortedIdx >= 0) sortedSnap[numSortedIdx] = "checking";
    const numArrIdx = arr.indexOf(num);
    if (numArrIdx >= 0) arrSnap[numArrIdx] = "checking";

    if (numSet.has(num - 1)) {
      // Not a sequence start, skip
      steps.push({
        states: [...arrSnap],
        sortedStates: [...sortedSnap],
        currentLen: 0,
        longestLen: longest,
        output: `num=${num}: ${num - 1} exists in Set → not a sequence start, skip`,
      });
      continue;
    }

    // It's a sequence start - count consecutive
    steps.push({
      states: [...arrSnap],
      sortedStates: [...sortedSnap],
      currentLen: 0,
      longestLen: longest,
      output: `num=${num}: ${num - 1} NOT in Set → sequence start! Counting...`,
    });

    let currentNum = num;
    let currentLen = 0;
    const currentSeqNums = new Set<number>();

    while (numSet.has(currentNum)) {
      currentSeqNums.add(currentNum);
      currentLen++;
      currentNum++;

      // Show counting step
      const countSorted: CellState[] = sortedUnique.map((v) => {
        if (currentSeqNums.has(v)) return "current-seq";
        if (bestSeqNums.has(v)) return "best-seq";
        return "in-set";
      });
      const countArr: CellState[] = arr.map((v) => {
        if (currentSeqNums.has(v)) return "current-seq";
        if (bestSeqNums.has(v)) return "best-seq";
        return "in-set";
      });

      steps.push({
        states: [...countArr],
        sortedStates: [...countSorted],
        currentLen,
        longestLen: longest,
        output: `Found ${currentNum - 1} in Set → streak = ${currentLen}${!numSet.has(currentNum) ? ` (${currentNum} not in Set → end)` : ""}`,
      });
    }

    if (currentLen > longest) {
      longest = currentLen;
      bestSeqNums = new Set(currentSeqNums);

      const bestSorted: CellState[] = sortedUnique.map((v) =>
        bestSeqNums.has(v) ? "best-seq" : "in-set"
      );
      const bestArr: CellState[] = arr.map((v) =>
        bestSeqNums.has(v) ? "best-seq" : "in-set"
      );

      steps.push({
        states: [...bestArr],
        sortedStates: [...bestSorted],
        currentLen,
        longestLen: longest,
        output: `New longest sequence! Length ${longest}: [${Array.from(currentSeqNums).sort((a, b) => a - b).join(", ")}]`,
      });
    }
  }

  // Final
  const finalSorted: CellState[] = sortedUnique.map((v) =>
    bestSeqNums.has(v) ? "best-seq" : "in-set"
  );
  const finalArr: CellState[] = arr.map((v) =>
    bestSeqNums.has(v) ? "best-seq" : "in-set"
  );
  steps.push({
    states: [...finalArr],
    sortedStates: [...finalSorted],
    currentLen: longest,
    longestLen: longest,
    output: `Done! Longest consecutive sequence length = ${longest}`,
  });

  return { arr, sortedUnique, steps, longest };
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
export function LongestConsecutiveSequenceVisualization() {
  const [input, setInput] = useState("100,4,200,1,3,2");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [arr, setArr] = useState<number[]>([100, 4, 200, 1, 3, 2]);
  const [sortedUnique, setSortedUnique] = useState<number[]>([]);
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
    setSortedUnique(result.sortedUnique);
    setSteps(result.steps);
    setOutput([
      `Longest Consecutive Sequence: ${result.longest}`,
      `Array: [${result.arr.join(", ")}]`,
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
        <CardTitle className="text-lg">Longest Consecutive Sequence</CardTitle>
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
                placeholder="e.g. 100,4,200,1,3,2"
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
                {" — "}current sequence being counted
              </p>
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Green
                </span>
                {" — "}longest sequence found
              </p>
              <p>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Yellow
                </span>
                {" — "}checking if sequence start
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
{`function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let longest = 0;
  for (const num of numSet) {
    if (!numSet.has(num - 1)) {
      let current = num, len = 1;
      while (numSet.has(current + 1)) {
        current++;
        len++;
      }
      longest = Math.max(longest, len);
    }
  }
  return longest;
}
console.log(longestConsecutive([${arr.join(", ")}]));`}
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
              sortedUnique={sortedUnique}
              sortedStates={curStep.sortedStates}
              longestLen={curStep.longestLen}
              currentLen={curStep.currentLen}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Imagine you have a jar of randomly numbered lottery balls. You dump
            them into a bucket where you can instantly check if any number exists
            (that&apos;s your Set). Now, for each ball, you ask: &quot;Is the ball
            one less than me in the bucket?&quot; If yes, this ball is part of
            an existing chain, so skip it. If no, this ball <strong>starts</strong>{" "}
            a new chain — count upward (ball+1, ball+2, ...) as long as each
            exists. The longest chain you find is your answer. No sorting needed,
            just smart lookups.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
