"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CellState = "idle" | "left" | "right" | "placed" | "done";

function ArrayDiagram({
  arr,
  states,
  result,
  resultPos,
  label,
}: {
  arr: number[];
  states: CellState[];
  result: (number | null)[];
  resultPos: number;
  label: string;
}) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    left: "#3b82f6",
    right: "#eab308",
    placed: "#22c55e",
    done: "#374151",
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground mb-1">{label}</p>
        <div className="flex gap-2 flex-wrap justify-center">
          {arr.map((val, i) => {
            const state = states[i] ?? "idle";
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <motion.div
                  animate={{
                    backgroundColor: colorMap[state],
                    scale: state === "left" || state === "right" ? 1.15 : 1,
                    opacity: state === "done" ? 0.35 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-border font-mono text-sm font-bold"
                >
                  {val}
                </motion.div>
                <span className="text-[10px] text-muted-foreground">{i}</span>
                {state === "left" && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] font-bold text-blue-500">L</motion.span>
                )}
                {state === "right" && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] font-bold text-yellow-500">R</motion.span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground mb-1">Result (filling right → left)</p>
        <div className="flex gap-2 flex-wrap justify-center">
          {result.map((val, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  backgroundColor: val !== null ? "#22c55e" : "transparent",
                  scale: i === resultPos ? 1.15 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-border font-mono text-sm font-bold"
              >
                {val !== null ? val : "·"}
              </motion.div>
              <span className="text-[10px] text-muted-foreground">{i}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface Step {
  states: CellState[];
  result: (number | null)[];
  resultPos: number;
  output: string;
}

function buildSteps(input: string): { arr: number[]; steps: Step[] } {
  const nums = input.split(",").map((s) => Number(s.trim())).filter((n) => !isNaN(n));
  const arr = nums.length ? nums : [-4, -1, 0, 3, 10];
  const n = arr.length;
  const result: (number | null)[] = new Array(n).fill(null);
  const steps: Step[] = [];

  let left = 0, right = n - 1, pos = n - 1;

  while (left <= right) {
    const lSq = arr[left] * arr[left];
    const rSq = arr[right] * arr[right];
    const states: CellState[] = arr.map((_, idx) => {
      if (idx === left) return "left" as CellState;
      if (idx === right) return "right" as CellState;
      if (idx < left || idx > right) return "done" as CellState;
      return "idle" as CellState;
    });

    if (lSq > rSq) {
      result[pos] = lSq;
      steps.push({
        states: [...states],
        result: [...result],
        resultPos: pos,
        output: `|${arr[left]}|² = ${lSq} > |${arr[right]}|² = ${rSq} → result[${pos}] = ${lSq}, move L right`,
      });
      left++;
    } else {
      result[pos] = rSq;
      steps.push({
        states: [...states],
        result: [...result],
        resultPos: pos,
        output: `|${arr[right]}|² = ${rSq} >= |${arr[left]}|² = ${lSq} → result[${pos}] = ${rSq}, move R left`,
      });
      right--;
    }
    pos--;
  }

  return { arr, steps };
}

function ConsoleOutput({ lines }: Readonly<{ lines: string[] | null }>) {
  return (
    <AnimatePresence mode="wait">
      {lines ? (
        <motion.div key="out" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[52px] overflow-auto">
          {lines.map((line, i) => (
            <p key={i} className="text-emerald-400"><span className="text-zinc-500 select-none mr-2">&gt;</span>{line}</p>
          ))}
        </motion.div>
      ) : (
        <motion.div key="ph" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[52px] flex items-center justify-center">
          <p className="text-xs text-muted-foreground italic">Click ▶ Run to see the visualization</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SquaresOfSortedArrayVisualization() {
  const [input, setInput] = useState("-4,-1,0,3,10");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [arr, setArr] = useState<number[]>([-4, -1, 0, 3, 10]);
  const [output, setOutput] = useState<string[] | null>(null);
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const clear = () => { setStepIndex(-1); setSteps([]); setOutput(null); setRunning(false); setHasRun(false); };

  const handleRun = async () => {
    if (running) return;
    const result = buildSteps(input);
    setArr(result.arr);
    setSteps(result.steps);
    const finalResult = result.steps[result.steps.length - 1]?.result ?? [];
    setOutput([`Result: [${finalResult.join(", ")}]`, `Steps: ${result.steps.length}`]);
    setHasRun(true); setRunning(true);
    for (let i = 0; i < result.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 700));
      setStepIndex(i);
    }
    setRunning(false);
  };

  const curStep = stepIndex >= 0 ? steps[stepIndex] : null;

  return (
    <Card>
      <CardHeader className="pb-3"><CardTitle className="text-lg">Squares of a Sorted Array</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Visualization</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground">Sorted Array (comma-separated, can include negatives)</p>
              <input value={input} onChange={(e) => { setInput(e.target.value); clear(); }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none" placeholder="e.g. -4,-1,0,3,10" />
            </div>
            <Button size="sm" onClick={handleRun} disabled={running} className="w-full">
              <Play className="h-3.5 w-3.5 mr-1" />{running ? "Running..." : "Run"}
            </Button>
            <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
              <p><span className="font-semibold text-blue-600 dark:text-blue-400">L (Blue)</span>{" — "}left pointer</p>
              <p><span className="font-semibold text-yellow-600 dark:text-yellow-400">R (Yellow)</span>{" — "}right pointer</p>
              <p><span className="font-semibold text-emerald-600 dark:text-emerald-400">Green</span>{" — "}placed in result</p>
            </div>
            {curStep && (
              <AnimatePresence mode="wait">
                <motion.div key={curStep.output} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  className="rounded-lg border bg-muted/50 px-3 py-2 font-mono text-xs">{curStep.output}</motion.div>
              </AnimatePresence>
            )}
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
              <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
{`function sortedSquares(nums) {
  const n = nums.length;
  const result = new Array(n);
  let left = 0, right = n - 1;
  let pos = n - 1;
  while (left <= right) {
    const lSq = nums[left] ** 2;
    const rSq = nums[right] ** 2;
    if (lSq > rSq) {
      result[pos] = lSq; left++;
    } else {
      result[pos] = rSq; right--;
    }
    pos--;
  }
  return result;
}`}
              </pre>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
              <ConsoleOutput lines={output} />
            </div>
          </div>
        </div>
        {hasRun && curStep && (
          <div className="rounded-xl border bg-muted/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-muted-foreground">
                Diagram{stepIndex >= 0 && <span className="ml-2 font-normal">— Step {stepIndex + 1} / {steps.length}</span>}
              </p>
              <Button size="sm" variant="ghost" className="h-6 px-2 text-xs" onClick={clear}><RotateCcw className="h-3 w-3 mr-1" /> Reset</Button>
            </div>
            <ArrayDiagram arr={arr} states={curStep.states} result={curStep.result} resultPos={curStep.resultPos} label="Input Array" />
          </div>
        )}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">Real-Life Analogy</p>
          <p className="text-sm leading-relaxed">
            Two runners on a number line — one from the far left (negative side), one from the far right.
            Both shout their <strong>distance from zero</strong>. A judge writes down the larger distance first,
            filling a scoreboard from right to left. Since both runners move inward, the judge always picks
            the bigger remaining distance without re-sorting.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
