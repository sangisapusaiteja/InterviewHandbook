"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CellState = "idle" | "unique" | "checking" | "duplicate" | "write-pos";

function ArrayDiagram({
  arr,
  states,
  writePointer,
  scanPointer,
}: {
  arr: number[];
  states: CellState[];
  writePointer: number;
  scanPointer: number;
}) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    unique: "#22c55e",
    checking: "#eab308",
    duplicate: "#ef4444",
    "write-pos": "#3b82f6",
  };

  return (
    <div className="flex flex-col items-center py-2">
      <div className="flex gap-2 flex-wrap justify-center">
        {arr.map((val, i) => {
          const state = states[i] ?? "idle";
          const isScan = i === scanPointer;
          const isWrite = i === writePointer;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  backgroundColor: colorMap[state],
                  scale: isScan ? 1.15 : 1,
                  opacity: state === "duplicate" ? 0.4 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-border font-mono text-sm font-bold"
              >
                {val}
              </motion.div>
              <span className="text-[10px] text-muted-foreground">{i}</span>
              <div className="flex gap-0.5">
                {isWrite && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] font-bold text-emerald-500">k</motion.span>}
                {isScan && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] font-bold text-yellow-500">i</motion.span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface Step {
  arr: number[];
  states: CellState[];
  writePointer: number;
  scanPointer: number;
  output: string;
}

function buildSteps(input: string): { originalArr: number[]; steps: Step[]; uniqueCount: number } {
  const nums = input.split(",").map((s) => Number(s.trim())).filter((n) => !isNaN(n));
  const arr = nums.length ? [...nums] : [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
  const working = [...arr];
  const steps: Step[] = [];

  if (working.length === 0) return { originalArr: arr, steps: [], uniqueCount: 0 };

  // First element is always unique
  const firstStates: CellState[] = working.map((_, i) => i === 0 ? "unique" as CellState : "idle" as CellState);
  steps.push({
    arr: [...working],
    states: firstStates,
    writePointer: 0,
    scanPointer: 0,
    output: `Start: nums[0]=${working[0]} is the first unique element, k=0`,
  });

  let k = 0;
  for (let i = 1; i < working.length; i++) {
    const states: CellState[] = working.map((_, idx) => {
      if (idx <= k) return "unique" as CellState;
      return "idle" as CellState;
    });
    states[i] = "checking";

    if (working[i] !== working[k]) {
      k++;
      working[k] = working[i];
      const newStates = [...states];
      newStates[k] = "unique";
      steps.push({
        arr: [...working],
        states: newStates,
        writePointer: k,
        scanPointer: i,
        output: `nums[${i}]=${working[i]} ≠ nums[${k - 1}] → new unique! k=${k}`,
      });
    } else {
      states[i] = "duplicate";
      steps.push({
        arr: [...working],
        states,
        writePointer: k,
        scanPointer: i,
        output: `nums[${i}]=${working[i]} === nums[${k}] → duplicate, skip`,
      });
    }
  }

  // Final
  const finalStates: CellState[] = working.map((_, idx) => idx <= k ? "unique" as CellState : "duplicate" as CellState);
  steps.push({
    arr: [...working],
    states: finalStates,
    writePointer: k,
    scanPointer: -1,
    output: `Done! ${k + 1} unique elements: [${working.slice(0, k + 1).join(", ")}]`,
  });

  return { originalArr: arr, steps, uniqueCount: k + 1 };
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

export function RemoveDuplicatesSortedArrayVisualization() {
  const [input, setInput] = useState("0,0,1,1,1,2,2,3,3,4");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [output, setOutput] = useState<string[] | null>(null);
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const clear = () => { setStepIndex(-1); setSteps([]); setOutput(null); setRunning(false); setHasRun(false); };

  const handleRun = async () => {
    if (running) return;
    const result = buildSteps(input);
    setSteps(result.steps);
    setOutput([`Unique count: ${result.uniqueCount}`, `Original length: ${result.originalArr.length}`]);
    setHasRun(true); setRunning(true);
    for (let i = 0; i < result.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 500));
      setStepIndex(i);
    }
    setRunning(false);
  };

  const curStep = stepIndex >= 0 ? steps[stepIndex] : null;

  return (
    <Card>
      <CardHeader className="pb-3"><CardTitle className="text-lg">Remove Duplicates from Sorted Array</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Visualization</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground">Sorted Array (comma-separated)</p>
              <input value={input} onChange={(e) => { setInput(e.target.value); clear(); }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none" placeholder="e.g. 0,0,1,1,1,2,2,3,3,4" />
            </div>
            <Button size="sm" onClick={handleRun} disabled={running} className="w-full">
              <Play className="h-3.5 w-3.5 mr-1" />{running ? "Running..." : "Run"}
            </Button>
            <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
              <p><span className="font-semibold text-emerald-600 dark:text-emerald-400">Green (k)</span>{" — "}unique elements kept</p>
              <p><span className="font-semibold text-yellow-600 dark:text-yellow-400">Yellow (i)</span>{" — "}currently scanning</p>
              <p><span className="font-semibold text-red-500 dark:text-red-400">Red</span>{" — "}duplicate, skipped</p>
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
{`function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let k = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[k]) {
      k++;
      nums[k] = nums[i];
    }
  }
  return k + 1;
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
            <ArrayDiagram arr={curStep.arr} states={curStep.states} writePointer={curStep.writePointer} scanPointer={curStep.scanPointer} />
          </div>
        )}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">Real-Life Analogy</p>
          <p className="text-sm leading-relaxed">
            Students sorted by height, some with identical heights standing next to each other.
            Walk down the line with a clipboard. Each time you spot someone <strong>taller</strong> than
            the last person on your list, wave them forward to the &quot;unique&quot; line. Same-height
            students behind them get sent home.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
