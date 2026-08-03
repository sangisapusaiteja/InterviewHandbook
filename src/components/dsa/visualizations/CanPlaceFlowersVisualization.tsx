"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Cell state ────────────────────────────────────────────────────────────
type CellState = "idle" | "checking" | "occupied" | "planted" | "empty";

// ─── Array Diagram ─────────────────────────────────────────────────────────
function ArrayDiagram({
  arr,
  states,
  currentIndex,
  plantedCount,
  target,
}: {
  arr: number[];
  states: CellState[];
  currentIndex: number;
  plantedCount: number;
  target: number;
}) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    checking: "#eab308",
    occupied: "#ef4444",
    planted: "#22c55e",
    empty: "transparent",
  };

  return (
    <div className="flex flex-col items-center py-2 gap-4">
      <p className="text-[10px] text-muted-foreground mb-1 text-center font-semibold">
        Flowerbed — Planted: {plantedCount} / {target} needed
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
                className="w-12 h-12 flex items-center justify-center rounded-lg border-2 border-border font-mono text-lg font-bold"
              >
                {state === "planted" || (state !== "checking" && val === 1)
                  ? "🌸"
                  : val}
              </motion.div>
              <span className="text-[10px] text-muted-foreground">{i}</span>
              {isActive && state === "checking" && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-bold text-yellow-500"
                >
                  ?
                </motion.span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step interface ────────────────────────────────────────────────────────
interface Step {
  arr: number[];
  states: CellState[];
  currentIndex: number;
  plantedCount: number;
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(
  input: string,
  n: number
): { arr: number[]; steps: Step[]; canPlace: boolean } {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((v) => !isNaN(v));
  const arr = nums.length ? nums : [1, 0, 0, 0, 1];

  const steps: Step[] = [];
  const workArr = [...arr];
  const stateArr: CellState[] = arr.map((v) => (v === 1 ? "occupied" : "empty"));
  let planted = 0;

  for (let i = 0; i < workArr.length; i++) {
    const snap = [...stateArr] as CellState[];
    snap[i] = "checking";

    if (workArr[i] === 0) {
      const leftEmpty = i === 0 || workArr[i - 1] === 0;
      const rightEmpty = i === workArr.length - 1 || workArr[i + 1] === 0;

      if (leftEmpty && rightEmpty) {
        steps.push({
          arr: [...workArr],
          states: [...snap],
          currentIndex: i,
          plantedCount: planted,
          output: `i=${i}: empty, left=${i === 0 ? "edge" : workArr[i - 1]}, right=${i === workArr.length - 1 ? "edge" : workArr[i + 1]} → CAN plant!`,
        });

        workArr[i] = 1;
        planted++;
        stateArr[i] = "planted";

        steps.push({
          arr: [...workArr],
          states: [...stateArr],
          currentIndex: i,
          plantedCount: planted,
          output: `i=${i}: Planted! (${planted}/${n})`,
        });

        if (planted >= n) {
          steps.push({
            arr: [...workArr],
            states: [...stateArr],
            currentIndex: -1,
            plantedCount: planted,
            output: `Planted ${planted} flowers — target ${n} reached! Result: true`,
          });
          return { arr: nums.length ? nums : [1, 0, 0, 0, 1], steps, canPlace: true };
        }
      } else {
        steps.push({
          arr: [...workArr],
          states: [...snap],
          currentIndex: i,
          plantedCount: planted,
          output: `i=${i}: empty, but neighbor occupied → cannot plant`,
        });
        stateArr[i] = "empty";
      }
    } else {
      steps.push({
        arr: [...workArr],
        states: [...snap],
        currentIndex: i,
        plantedCount: planted,
        output: `i=${i}: already occupied → skip`,
      });
      stateArr[i] = "occupied";
    }
  }

  const canPlace = planted >= n;
  steps.push({
    arr: [...workArr],
    states: [...stateArr],
    currentIndex: -1,
    plantedCount: planted,
    output: `Scan complete. Planted ${planted} of ${n} needed → ${canPlace}`,
  });

  return { arr: nums.length ? nums : [1, 0, 0, 0, 1], steps, canPlace };
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
export function CanPlaceFlowersVisualization() {
  const [input, setInput] = useState("1,0,0,0,1");
  const [nInput, setNInput] = useState("1");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [arr, setArr] = useState<number[]>([1, 0, 0, 0, 1]);
  const [targetN, setTargetN] = useState(1);
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
    const n = Number(nInput) || 1;
    setTargetN(n);
    const result = buildSteps(input, n);
    setArr(result.arr);
    setSteps(result.steps);
    setOutput([
      `Can place ${n} flower(s): ${result.canPlace}`,
      `Flowerbed length: ${result.arr.length}`,
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
        <CardTitle className="text-lg">Can Place Flowers</CardTitle>
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
                Flowerbed (comma-separated 0s and 1s)
              </p>
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  clear();
                }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                placeholder="e.g. 1,0,0,0,1"
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground">
                n (flowers to place)
              </p>
              <input
                value={nInput}
                onChange={(e) => {
                  setNInput(e.target.value);
                  clear();
                }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                placeholder="e.g. 1"
              />
            </div>

            <Button
              size="sm"
              onClick={handleRun}
              disabled={running}
              className="w-full"
            >
              <Play className="h-3.5 w-3.5 mr-1" />
              {running ? "Planting..." : "Run"}
            </Button>

            <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
              <p>
                <span className="font-semibold text-red-500 dark:text-red-400">
                  Red
                </span>
                {" — "}occupied (existing flower)
              </p>
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Green
                </span>
                {" — "}newly planted
              </p>
              <p>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Yellow
                </span>
                {" — "}currently checking
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
{`function canPlaceFlowers(flowerbed, n) {
  let count = 0;
  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i] === 0) {
      const leftEmpty = i===0 || flowerbed[i-1]===0;
      const rightEmpty = i===flowerbed.length-1
                         || flowerbed[i+1]===0;
      if (leftEmpty && rightEmpty) {
        flowerbed[i] = 1;
        count++;
        if (count >= n) return true;
      }
    }
  }
  return count >= n;
}
// canPlaceFlowers([${arr.join(",")}], ${targetN})`}
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
              plantedCount={curStep.plantedCount}
              target={targetN}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Picture a row of plant pots on a windowsill. Some already have
            flowers, and the rule is <strong>no two flowers can be next to
            each other</strong> — they need space for sunlight. You walk
            along the row and, for each empty pot, check whether both its
            neighbors are also empty. If so, you plant a flower and move on.
            It is a simple greedy strategy: plant as early as possible and
            you will always maximize the number of flowers.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
