"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Bar state ─────────────────────────────────────────────────────────────
type BarState = "idle" | "left-ptr" | "right-ptr" | "best-left" | "best-right" | "water";

// ─── Container Diagram ────────────────────────────────────────────────────
function ContainerDiagram({
  heights,
  states,
  left,
  right,
  currentArea,
  maxArea,
}: {
  heights: number[];
  states: BarState[];
  left: number;
  right: number;
  currentArea: number;
  maxArea: number;
}) {
  const maxVal = Math.max(...heights, 1);

  const waterLevel = left >= 0 && right >= 0 ? Math.min(heights[left], heights[right]) : 0;

  return (
    <div className="flex flex-col items-center py-2">
      <div className="flex gap-1 items-end flex-wrap justify-center" style={{ minHeight: 130 }}>
        {heights.map((h, i) => {
          const state = states[i] ?? "idle";
          const barHeight = Math.max((h / maxVal) * 110, 6);
          const isInWaterZone = i > left && i < right;
          const waterHeight = isInWaterZone ? Math.max((waterLevel / maxVal) * 110, 0) : 0;

          return (
            <div key={i} className="flex flex-col items-center gap-0.5 relative">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[9px] font-mono font-bold"
                style={{
                  color:
                    state === "left-ptr" || state === "best-left"
                      ? "#3b82f6"
                      : state === "right-ptr" || state === "best-right"
                      ? "#eab308"
                      : "#6b7280",
                }}
              >
                {h}
              </motion.span>
              <div className="relative">
                {isInWaterZone && waterHeight > 0 && (
                  <motion.div
                    animate={{ height: waterHeight, opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 bg-blue-400 rounded-t-sm"
                    style={{ width: 22 }}
                  />
                )}
                <motion.div
                  animate={{
                    backgroundColor:
                      state === "left-ptr"
                        ? "#3b82f6"
                        : state === "right-ptr"
                        ? "#eab308"
                        : state === "best-left" || state === "best-right"
                        ? "#22c55e"
                        : "#6b7280",
                    scale:
                      state === "left-ptr" || state === "right-ptr" ? 1.1 : 1,
                    opacity: state === "idle" ? 0.5 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="rounded-t-md relative z-10"
                  style={{ width: 22, height: barHeight }}
                />
              </div>
              <span className="text-[9px] text-muted-foreground">{i}</span>
              {state === "left-ptr" && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[9px] font-bold text-blue-500"
                >
                  L
                </motion.span>
              )}
              {state === "right-ptr" && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[9px] font-bold text-yellow-500"
                >
                  R
                </motion.span>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-3">
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-700 dark:text-blue-300 text-xs font-semibold font-mono"
        >
          Current Area = {currentArea}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold font-mono"
        >
          Max Area = {maxArea}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Step interface ────────────────────────────────────────────────────────
interface Step {
  states: BarState[];
  left: number;
  right: number;
  currentArea: number;
  maxArea: number;
  bestLeft: number;
  bestRight: number;
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(input: string): {
  heights: number[];
  steps: Step[];
  finalMaxArea: number;
} {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const heights = nums.length >= 2 ? nums : [1, 8, 6, 2, 5, 4, 8, 3, 7];

  const steps: Step[] = [];
  let left = 0;
  let right = heights.length - 1;
  let maxArea = 0;
  let bestLeft = 0;
  let bestRight = 0;

  // Initial state
  const initStates: BarState[] = Array(heights.length).fill("idle");
  initStates[left] = "left-ptr";
  initStates[right] = "right-ptr";

  const initArea = Math.min(heights[left], heights[right]) * (right - left);
  if (initArea > maxArea) {
    maxArea = initArea;
    bestLeft = left;
    bestRight = right;
  }

  steps.push({
    states: [...initStates],
    left,
    right,
    currentArea: initArea,
    maxArea,
    bestLeft,
    bestRight,
    output: `L=${left}(h=${heights[left]}), R=${right}(h=${heights[right]}): area = min(${heights[left]},${heights[right]}) * ${right - left} = ${initArea}`,
  });

  while (left < right) {
    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }

    if (left >= right) break;

    const area = Math.min(heights[left], heights[right]) * (right - left);
    const isNewBest = area > maxArea;
    if (isNewBest) {
      maxArea = area;
      bestLeft = left;
      bestRight = right;
    }

    const snap: BarState[] = Array(heights.length).fill("idle");
    snap[left] = "left-ptr";
    snap[right] = "right-ptr";

    steps.push({
      states: [...snap],
      left,
      right,
      currentArea: area,
      maxArea,
      bestLeft,
      bestRight,
      output: `L=${left}(h=${heights[left]}), R=${right}(h=${heights[right]}): area = min(${heights[left]},${heights[right]}) * ${right - left} = ${area}${isNewBest ? " (new max!)" : ""}`,
    });
  }

  // Final: highlight best pair
  const finalStates: BarState[] = Array(heights.length).fill("idle");
  finalStates[bestLeft] = "best-left";
  finalStates[bestRight] = "best-right";

  steps.push({
    states: [...finalStates],
    left: bestLeft,
    right: bestRight,
    currentArea: maxArea,
    maxArea,
    bestLeft,
    bestRight,
    output: `Done! Max area = ${maxArea} between indices ${bestLeft} and ${bestRight}`,
  });

  return { heights, steps, finalMaxArea: maxArea };
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
export function ContainerWithMostWaterVisualization() {
  const [input, setInput] = useState("1,8,6,2,5,4,8,3,7");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [heights, setHeights] = useState<number[]>([1, 8, 6, 2, 5, 4, 8, 3, 7]);
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
    setHeights(result.heights);
    setSteps(result.steps);
    setOutput([
      `Max Area: ${result.finalMaxArea}`,
      `Heights: [${result.heights.join(", ")}]`,
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
        <CardTitle className="text-lg">Container With Most Water</CardTitle>
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
                Heights (comma-separated)
              </p>
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  clear();
                }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                placeholder="e.g. 1,8,6,2,5,4,8,3,7"
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
                {" — "}left pointer
              </p>
              <p>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Yellow
                </span>
                {" — "}right pointer
              </p>
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Green
                </span>
                {" — "}best area found
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
{`function maxArea(height) {
  let left = 0, right = height.length - 1;
  let max = 0;
  while (left < right) {
    const area = Math.min(
      height[left], height[right]
    ) * (right - left);
    max = Math.max(max, area);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return max;
}
console.log(maxArea([${heights.join(", ")}]));`}
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
                Container Diagram
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
            <ContainerDiagram
              heights={heights}
              states={curStep.states}
              left={curStep.left}
              right={curStep.right}
              currentArea={curStep.currentArea}
              maxArea={curStep.maxArea}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Imagine two people holding a rope between fence posts of different
            heights, trying to trap the most rainwater. They start at opposite
            ends of the fence. The water level is limited by the{" "}
            <strong>shorter</strong> post, so the person standing at the shorter
            post steps inward — hoping to find a taller post that holds more
            water. Moving the taller post inward would only shrink the width
            without helping the height, so it never makes sense. They keep
            stepping inward until they meet, and the largest puddle they measured
            along the way is the answer.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
