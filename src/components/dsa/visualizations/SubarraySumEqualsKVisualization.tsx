"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Cell state ────────────────────────────────────────────────────────────
type CellState = "idle" | "current" | "hit" | "processed";

// ─── Array Diagram ─────────────────────────────────────────────────────────
function ArrayDiagram({
  arr,
  states,
  currentIndex,
  prefixSum,
  count,
}: {
  arr: number[];
  states: CellState[];
  currentIndex: number;
  prefixSum: number | null;
  count: number;
}) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    current: "#eab308",
    hit: "#22c55e",
    processed: "#374151",
  };

  return (
    <div className="flex flex-col items-center py-2">
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
                  opacity: state === "processed" ? 0.35 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-border font-mono text-sm font-bold"
              >
                {val}
              </motion.div>
              <span className="text-[10px] text-muted-foreground">{i}</span>
              {isActive && state === "hit" && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-bold text-emerald-500"
                >
                  HIT!
                </motion.span>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-3">
        {prefixSum !== null && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-700 dark:text-blue-300 text-xs font-semibold font-mono"
          >
            prefix = {prefixSum}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold font-mono"
        >
          count = {count}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Hash Map Display ──────────────────────────────────────────────────────
function HashMapDisplay({
  map,
  highlightKey,
}: {
  map: Map<number, number>;
  highlightKey: number | null;
}) {
  const entries = Array.from(map.entries());
  return (
    <div className="rounded-lg border bg-muted/30 px-3 py-2">
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
        HashMap (prefix &rarr; count)
      </p>
      <div className="flex flex-wrap gap-1.5">
        {entries.length === 0 && (
          <span className="text-[10px] text-muted-foreground italic">empty</span>
        )}
        {entries.map(([key, val]) => {
          const isHighlighted = key === highlightKey;
          return (
            <motion.span
              key={key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                backgroundColor: isHighlighted ? "#22c55e" : "#374151",
              }}
              transition={{ duration: 0.3 }}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold text-white"
            >
              {key}:{val}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step interface ────────────────────────────────────────────────────────
interface SubarrayStep {
  states: CellState[];
  currentIndex: number;
  prefixSum: number;
  need: number;
  foundCount: number;
  count: number;
  map: Map<number, number>;
  highlightKey: number | null;
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(
  input: string,
  k: number
): {
  arr: number[];
  steps: SubarrayStep[];
  finalCount: number;
} {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const arr = nums.length ? nums : [1, 1, 1, 2, 3];

  const steps: SubarrayStep[] = [];
  const map = new Map<number, number>();
  map.set(0, 1); // base case
  let prefix = 0;
  let count = 0;

  // Initial step
  steps.push({
    states: Array(arr.length).fill("idle") as CellState[],
    currentIndex: -1,
    prefixSum: 0,
    need: 0,
    foundCount: 0,
    count: 0,
    map: new Map(map),
    highlightKey: null,
    output: `Init: map = {0: 1}, prefix = 0, count = 0`,
  });

  for (let i = 0; i < arr.length; i++) {
    prefix += arr[i];
    const need = prefix - k;
    const foundCount = map.get(need) ?? 0;
    const isHit = foundCount > 0;

    if (isHit) {
      count += foundCount;
    }

    // Update map
    map.set(prefix, (map.get(prefix) ?? 0) + 1);

    const snap: CellState[] = arr.map((_, idx) => {
      if (idx < i) return "processed" as CellState;
      if (idx === i) return isHit ? ("hit" as CellState) : ("current" as CellState);
      return "idle" as CellState;
    });

    const hitLabel = isHit
      ? ` found ${foundCount}x \u2192 count=${count}`
      : " not in map";

    steps.push({
      states: [...snap],
      currentIndex: i,
      prefixSum: prefix,
      need,
      foundCount,
      count,
      map: new Map(map),
      highlightKey: isHit ? need : null,
      output: `i=${i}: prefix=${prefix}, need=${need}${hitLabel}`,
    });
  }

  return { arr, steps, finalCount: count };
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
export function SubarraySumEqualsKVisualization() {
  const [input, setInput] = useState("1,1,1,2,3");
  const [kInput, setKInput] = useState("2");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<SubarrayStep[]>([]);
  const [arr, setArr] = useState<number[]>([1, 1, 1, 2, 3]);
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
    const k = Number(kInput) || 0;
    const result = buildSteps(input, k);
    setArr(result.arr);
    setSteps(result.steps);
    setOutput([
      `Subarray count with sum=${k}: ${result.finalCount}`,
      `Array: [${result.arr.join(", ")}], k=${k}`,
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
        <CardTitle className="text-lg">Subarray Sum Equals K</CardTitle>
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
                placeholder="e.g. 1,1,1,2,3"
              />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground">
                Target k
              </p>
              <input
                value={kInput}
                onChange={(e) => {
                  setKInput(e.target.value);
                  clear();
                }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                placeholder="e.g. 2"
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
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Yellow
                </span>
                {" — "}current element (prefix building)
              </p>
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Green
                </span>
                {" — "}hit! prefix-k found in map
              </p>
              <p>
                <span className="font-semibold text-zinc-400">
                  Gray
                </span>
                {" — "}already processed
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
{`function subarraySum(nums, k) {
  const map = new Map([[0, 1]]);
  let prefix = 0, count = 0;
  for (let i = 0; i < nums.length; i++) {
    prefix += nums[i];
    const need = prefix - k;
    if (map.has(need))
      count += map.get(need);
    map.set(prefix,
      (map.get(prefix) ?? 0) + 1);
  }
  return count;
}
console.log(subarraySum(
  [${arr.join(", ")}], ${kInput || 0}));`}
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

        {/* Diagram + HashMap */}
        {hasRun && curStep && (
          <div className="rounded-xl border bg-muted/20 p-4 space-y-3">
            <div className="flex items-center justify-between mb-1">
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
              prefixSum={curStep.prefixSum}
              count={curStep.count}
            />
            <HashMapDisplay
              map={curStep.map}
              highlightKey={curStep.highlightKey}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Imagine you&apos;re tracking your daily expenses. Each day, you note
            your <strong>cumulative spending</strong> in a ledger. Your friend
            asks: &quot;How many stretches of consecutive days did you spend
            exactly $k?&quot; Instead of checking every possible range, you use a
            clever trick: for each new cumulative total, you ask &quot;Have I
            seen a past total that is exactly $k less than now?&quot; If yes,
            the days in between sum to exactly $k. The ledger (hash map) lets
            you answer instantly — no need to re-add past days.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
