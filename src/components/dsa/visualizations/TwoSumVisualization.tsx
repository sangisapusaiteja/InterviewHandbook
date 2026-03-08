"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Cell state ────────────────────────────────────────────────────────────
type CellState = "idle" | "current" | "found-pair" | "in-map" | "complement";

// ─── Array Diagram ─────────────────────────────────────────────────────────
function ArrayDiagram({
  arr,
  states,
  target,
  mapEntries,
  complementVal,
}: {
  arr: number[];
  states: CellState[];
  target: number;
  mapEntries: [number, number][];
  complementVal: number | null;
}) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    current: "#eab308",
    "found-pair": "#22c55e",
    "in-map": "#6b7280",
    complement: "#3b82f6",
  };

  return (
    <div className="flex flex-col items-center py-2 gap-4">
      {/* Array cells */}
      <div>
        <p className="text-[10px] text-muted-foreground mb-1 text-center font-semibold">Array (target={target})</p>
        <div className="flex gap-2 flex-wrap justify-center">
          {arr.map((val, i) => {
            const state = states[i] ?? "idle";
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <motion.div
                  animate={{
                    backgroundColor: colorMap[state],
                    scale: state === "current" || state === "found-pair" || state === "complement" ? 1.15 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-border font-mono text-sm font-bold"
                >
                  {val}
                </motion.div>
                <span className="text-[10px] text-muted-foreground">{i}</span>
                {state === "found-pair" && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[9px] font-bold text-emerald-500"
                  >
                    MATCH
                  </motion.span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Map display */}
      <div>
        <p className="text-[10px] text-muted-foreground mb-1 text-center font-semibold">
          HashMap {complementVal !== null && <span className="text-yellow-500">(looking for {complementVal})</span>}
        </p>
        <div className="flex gap-1.5 flex-wrap justify-center min-h-[36px]">
          <AnimatePresence>
            {mapEntries.map(([val, idx], i) => (
              <motion.div
                key={`${val}-${idx}-${i}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-2 h-8 flex items-center justify-center rounded-lg border-2 border-zinc-500/50 bg-zinc-500/15 font-mono text-[10px] font-bold text-zinc-300"
              >
                {val}:{idx}
              </motion.div>
            ))}
          </AnimatePresence>
          {mapEntries.length === 0 && (
            <span className="text-[10px] text-muted-foreground italic self-center">empty</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Step interface ────────────────────────────────────────────────────────
interface Step {
  states: CellState[];
  mapEntries: [number, number][];
  complementVal: number | null;
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(input: string): {
  arr: number[];
  target: number;
  steps: Step[];
  resultIndices: [number, number] | null;
} {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const raw = nums.length >= 3 ? nums : [2, 7, 11, 15, 9];
  const target = raw[raw.length - 1];
  const arr = raw.slice(0, raw.length - 1);

  const steps: Step[] = [];
  const map = new Map<number, number>();
  let resultIndices: [number, number] | null = null;

  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    const snap: CellState[] = arr.map((_, idx) => {
      if (map.has(arr[idx]) && idx < i) return "in-map";
      return "idle";
    });
    snap[i] = "current";

    // Check if complement exists
    if (map.has(complement)) {
      const j = map.get(complement)!;
      snap[j] = "found-pair";
      snap[i] = "found-pair";
      resultIndices = [j, i];

      steps.push({
        states: [...snap],
        mapEntries: Array.from(map.entries()),
        complementVal: complement,
        output: `i=${i}: num=${arr[i]}, complement=${complement} FOUND at index ${j} → [${j}, ${i}]`,
      });
      break;
    }

    steps.push({
      states: [...snap],
      mapEntries: Array.from(map.entries()),
      complementVal: complement,
      output: `i=${i}: num=${arr[i]}, need complement=${complement} → not in map`,
    });

    // Add to map
    map.set(arr[i], i);

    const addSnap: CellState[] = arr.map((_, idx) => {
      if (idx <= i) return "in-map";
      return "idle";
    });

    steps.push({
      states: [...addSnap],
      mapEntries: Array.from(map.entries()),
      complementVal: null,
      output: `Add map[${arr[i]}] = ${i} → map = {${Array.from(map.entries()).map(([k, v]) => `${k}:${v}`).join(", ")}}`,
    });
  }

  if (!resultIndices) {
    steps.push({
      states: Array(arr.length).fill("in-map"),
      mapEntries: Array.from(map.entries()),
      complementVal: null,
      output: `No two-sum pair found for target ${target}`,
    });
  }

  return { arr, target, steps, resultIndices };
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
export function TwoSumVisualization() {
  const [input, setInput] = useState("2,7,11,15,9");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [arr, setArr] = useState<number[]>([2, 7, 11, 15]);
  const [target, setTarget] = useState(9);
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
    setTarget(result.target);
    setSteps(result.steps);
    setOutput(
      result.resultIndices
        ? [
            `Indices: [${result.resultIndices[0]}, ${result.resultIndices[1]}]`,
            `${result.arr[result.resultIndices[0]]} + ${result.arr[result.resultIndices[1]]} = ${result.target}`,
          ]
        : [`No solution found for target ${result.target}`]
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
        <CardTitle className="text-lg">Two Sum</CardTitle>
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
                Array + target (comma-separated, last value is target)
              </p>
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  clear();
                }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                placeholder="e.g. 2,7,11,15,9"
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
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Yellow
                </span>
                {" — "}current element being checked
              </p>
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Green
                </span>
                {" — "}found pair that sums to target
              </p>
              <p>
                <span className="font-semibold text-zinc-400">
                  Gray
                </span>
                {" — "}stored in HashMap
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
{`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
console.log(twoSum([${arr.join(", ")}], ${target}));`}
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
              target={target}
              mapEntries={curStep.mapEntries}
              complementVal={curStep.complementVal}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Imagine you&apos;re at a potluck and the host says &quot;I need two
            dishes that together cost exactly $9.&quot; As each guest arrives with
            their dish, you write down the price on a sticky note and pin it to a
            board. Before pinning, you quickly check: &quot;Is there already a note
            for the <strong>complement</strong> amount (target minus my price)?&quot;
            If yes, you found the pair instantly! The sticky board is your HashMap —
            it makes lookups instantaneous instead of scanning every previous guest.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
