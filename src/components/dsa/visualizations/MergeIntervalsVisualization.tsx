"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Bar state ─────────────────────────────────────────────────────────────
type BarState = "idle" | "checking" | "merged" | "separate";

// ─── Interval type ─────────────────────────────────────────────────────────
type Interval = [number, number];

// ─── Timeline Diagram ──────────────────────────────────────────────────────
function TimelineDiagram({
  intervals,
  barStates,
  mergedResult,
  currentIndex,
  showMerged,
}: {
  intervals: Interval[];
  barStates: BarState[];
  mergedResult: Interval[];
  currentIndex: number;
  showMerged: boolean;
}) {
  const colorMap: Record<BarState, string> = {
    idle: "#6b7280",
    checking: "#eab308",
    merged: "#22c55e",
    separate: "#3b82f6",
  };

  // Compute timeline range
  const allVals = intervals.flat();
  const min = Math.min(...allVals);
  const max = Math.max(...allVals);
  const range = max - min || 1;
  const timelineWidth = 100; // percentage

  const toPercent = (val: number) => ((val - min) / range) * timelineWidth;

  return (
    <div className="flex flex-col gap-4 py-2">
      {/* Original intervals */}
      <div>
        <p className="text-[10px] text-muted-foreground mb-2 font-semibold">
          {showMerged ? "Original Intervals (sorted)" : "Intervals (sorted)"}
        </p>
        <div className="relative space-y-2">
          {/* Timeline axis */}
          <div className="relative h-1 bg-border rounded-full mx-2 mb-1">
            {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((tick) => (
              <div
                key={tick}
                className="absolute top-full mt-1 text-[9px] text-muted-foreground font-mono"
                style={{ left: `${toPercent(tick)}%`, transform: "translateX(-50%)" }}
              >
                {tick}
              </div>
            ))}
          </div>

          {/* Interval bars */}
          <div className="space-y-1.5 pt-4">
            {intervals.map((interval, i) => {
              const state = barStates[i] ?? "idle";
              const isActive = i === currentIndex;
              const left = toPercent(interval[0]);
              const width = toPercent(interval[1]) - left;

              return (
                <div key={i} className="relative h-7 mx-2">
                  <motion.div
                    animate={{
                      backgroundColor: colorMap[state],
                      scale: isActive ? 1.05 : 1,
                      opacity: state === "merged" ? 0.5 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute h-full rounded-md flex items-center justify-center font-mono text-[10px] font-bold text-white"
                    style={{
                      left: `${left}%`,
                      width: `${Math.max(width, 3)}%`,
                      minWidth: "32px",
                    }}
                  >
                    [{interval[0]},{interval[1]}]
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Merged result */}
      {showMerged && mergedResult.length > 0 && (
        <div>
          <p className="text-[10px] text-muted-foreground mb-2 font-semibold">
            Merged Result
          </p>
          <div className="space-y-1.5 mx-2">
            {mergedResult.map((interval, i) => {
              const left = toPercent(interval[0]);
              const width = toPercent(interval[1]) - left;

              return (
                <div key={i} className="relative h-8">
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0.5 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.15 }}
                    className="absolute h-full rounded-md flex items-center justify-center font-mono text-xs font-bold text-white bg-emerald-500 border-2 border-emerald-400"
                    style={{
                      left: `${left}%`,
                      width: `${Math.max(width, 3)}%`,
                      minWidth: "40px",
                      transformOrigin: "left",
                    }}
                  >
                    [{interval[0]},{interval[1]}]
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Step interface ────────────────────────────────────────────────────────
interface Step {
  barStates: BarState[];
  currentIndex: number;
  mergedSoFar: Interval[];
  showMerged: boolean;
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(input: string): {
  intervals: Interval[];
  steps: Step[];
  result: Interval[];
} {
  let intervals: Interval[];
  try {
    intervals = input
      .split(";")
      .map((pair) => {
        const parts = pair.split(",").map((s) => Number(s.trim()));
        return [parts[0], parts[1]] as Interval;
      })
      .filter(([a, b]) => !isNaN(a) && !isNaN(b));
  } catch {
    intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
  }

  if (intervals.length === 0) {
    intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
  }

  // Sort by start
  intervals.sort((a, b) => a[0] - b[0]);

  const steps: Step[] = [];
  const barStates: BarState[] = Array(intervals.length).fill("idle");

  // Step 1: show sorted
  steps.push({
    barStates: [...barStates],
    currentIndex: -1,
    mergedSoFar: [],
    showMerged: false,
    output: `Sorted intervals: ${intervals.map((iv) => `[${iv[0]},${iv[1]}]`).join(", ")}`,
  });

  // Merge logic
  const merged: Interval[] = [[...intervals[0]]];
  barStates[0] = "separate";

  steps.push({
    barStates: [...barStates],
    currentIndex: 0,
    mergedSoFar: merged.map((iv) => [...iv] as Interval),
    showMerged: false,
    output: `Start with [${intervals[0][0]},${intervals[0][1]}] in result`,
  });

  for (let i = 1; i < intervals.length; i++) {
    const snap = [...barStates] as BarState[];
    snap[i] = "checking";

    const last = merged[merged.length - 1];
    const current = intervals[i];

    steps.push({
      barStates: [...snap],
      currentIndex: i,
      mergedSoFar: merged.map((iv) => [...iv] as Interval),
      showMerged: false,
      output: `Checking [${current[0]},${current[1]}] against last merged [${last[0]},${last[1]}]...`,
    });

    if (current[0] <= last[1]) {
      // Overlapping — merge
      last[1] = Math.max(last[1], current[1]);
      barStates[i] = "merged";

      steps.push({
        barStates: [...barStates],
        currentIndex: i,
        mergedSoFar: merged.map((iv) => [...iv] as Interval),
        showMerged: false,
        output: `[${current[0]},${current[1]}] overlaps [${last[0]},${intervals[i - 1 >= 0 ? i - 1 : 0][1] === last[1] ? intervals[i - 1][0] : last[0]},${intervals[i - 1 >= 0 ? i - 1 : 0][1]}] → merge to [${last[0]},${last[1]}]`,
      });
    } else {
      // No overlap — keep separate
      merged.push([...current]);
      barStates[i] = "separate";

      steps.push({
        barStates: [...barStates],
        currentIndex: i,
        mergedSoFar: merged.map((iv) => [...iv] as Interval),
        showMerged: false,
        output: `[${current[0]},${current[1]}] does not overlap → add as new interval`,
      });
    }
  }

  // Final step showing merged result
  steps.push({
    barStates: [...barStates],
    currentIndex: -1,
    mergedSoFar: merged.map((iv) => [...iv] as Interval),
    showMerged: true,
    output: `Result: ${merged.map((iv) => `[${iv[0]},${iv[1]}]`).join(", ")}`,
  });

  return { intervals, steps, result: merged };
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
export function MergeIntervalsVisualization() {
  const [input, setInput] = useState("1,3;2,6;8,10;15,18");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [intervals, setIntervals] = useState<Interval[]>([[1, 3], [2, 6], [8, 10], [15, 18]]);
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
    const built = buildSteps(input);
    setIntervals(built.intervals);
    setSteps(built.steps);
    setOutput([
      `Merged: ${built.result.map((iv) => `[${iv[0]},${iv[1]}]`).join(", ")}`,
      `${built.intervals.length} intervals → ${built.result.length} merged`,
    ]);
    setHasRun(true);
    setRunning(true);
    for (let i = 0; i < built.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 700));
      setStepIndex(i);
    }
    setRunning(false);
  };

  const curStep = stepIndex >= 0 ? steps[stepIndex] : null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Merge Intervals</CardTitle>
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
                Intervals (semicolon-separated pairs)
              </p>
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  clear();
                }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                placeholder="e.g. 1,3;2,6;8,10;15,18"
              />
            </div>

            <Button
              size="sm"
              onClick={handleRun}
              disabled={running}
              className="w-full"
            >
              <Play className="h-3.5 w-3.5 mr-1" />
              {running ? "Merging..." : "Run"}
            </Button>

            <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
              <p>
                <span className="font-semibold text-gray-400">
                  Idle
                </span>
                {" — "}not yet processed
              </p>
              <p>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Checking
                </span>
                {" — "}comparing for overlap
              </p>
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Merged
                </span>
                {" — "}absorbed into previous interval
              </p>
              <p>
                <span className="font-semibold text-blue-500 dark:text-blue-400">
                  Separate
                </span>
                {" — "}no overlap, kept as-is
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
{`function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1],
                         intervals[i][1]);
    } else {
      merged.push(intervals[i]);
    }
  }
  return merged;
}
console.log(merge(${JSON.stringify(intervals)}));`}
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
            <TimelineDiagram
              intervals={intervals}
              barStates={curStep.barStates}
              mergedResult={curStep.mergedSoFar}
              currentIndex={curStep.currentIndex}
              showMerged={curStep.showMerged}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Think of merging meetings on a calendar. You sort all meetings by
            start time, then walk through them one by one. If the next meeting
            starts <strong>before</strong> the current one ends, they overlap — so
            you extend the current block to cover both. If it starts{" "}
            <em>after</em>, it&apos;s a separate meeting. By the end, you have the
            fewest possible time blocks with no gaps in between overlapping ones.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
