"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Cell state ────────────────────────────────────────────────────────────
type CellState = "idle" | "checking" | "added-to-set" | "duplicate-found";

// ─── Array Diagram ─────────────────────────────────────────────────────────
function ArrayDiagram({
  arr,
  states,
  currentIndex,
  setContents,
}: {
  arr: number[];
  states: CellState[];
  currentIndex: number;
  setContents: number[];
}) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    checking: "#eab308",
    "added-to-set": "#22c55e",
    "duplicate-found": "#ef4444",
  };

  return (
    <div className="flex flex-col items-center py-2 gap-4">
      {/* Array cells */}
      <div>
        <p className="text-[10px] text-muted-foreground mb-1 text-center font-semibold">Array</p>
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
                    opacity: state === "added-to-set" ? 0.5 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-border font-mono text-sm font-bold"
                >
                  {val}
                </motion.div>
                <span className="text-[10px] text-muted-foreground">{i}</span>
                {isActive && state !== "idle" && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] font-bold"
                    style={{ color: colorMap[state] }}
                  >
                    {state === "duplicate-found" ? "DUP!" : state === "checking" ? "?" : "ok"}
                  </motion.span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Set display */}
      <div>
        <p className="text-[10px] text-muted-foreground mb-1 text-center font-semibold">Set</p>
        <div className="flex gap-1.5 flex-wrap justify-center min-h-[36px]">
          <AnimatePresence>
            {setContents.map((val, i) => (
              <motion.div
                key={`${val}-${i}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-emerald-500/50 bg-emerald-500/15 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300"
              >
                {val}
              </motion.div>
            ))}
          </AnimatePresence>
          {setContents.length === 0 && (
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
  currentIndex: number;
  setContents: number[];
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(input: string): {
  arr: number[];
  steps: Step[];
  hasDuplicate: boolean;
} {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const arr = nums.length ? nums : [1, 2, 3, 1];

  const steps: Step[] = [];
  const stateSnapshot: CellState[] = Array(arr.length).fill("idle");
  const seen = new Set<number>();
  let hasDuplicate = false;

  for (let i = 0; i < arr.length; i++) {
    const snap = [...stateSnapshot] as CellState[];
    snap[i] = "checking";

    if (seen.has(arr[i])) {
      snap[i] = "duplicate-found";
      hasDuplicate = true;
      steps.push({
        states: [...snap],
        currentIndex: i,
        setContents: Array.from(seen),
        output: `i=${i}: ${arr[i]} already in Set → DUPLICATE!`,
      });
      stateSnapshot[i] = "duplicate-found";
      break;
    } else {
      steps.push({
        states: [...snap],
        currentIndex: i,
        setContents: Array.from(seen),
        output: `i=${i}: ${arr[i]} not in Set → checking...`,
      });

      seen.add(arr[i]);
      const addedSnap = [...stateSnapshot] as CellState[];
      addedSnap[i] = "added-to-set";
      steps.push({
        states: [...addedSnap],
        currentIndex: i,
        setContents: Array.from(seen),
        output: `i=${i}: Add ${arr[i]} to Set → Set = {${Array.from(seen).join(", ")}}`,
      });
      stateSnapshot[i] = "added-to-set";
    }
  }

  if (!hasDuplicate) {
    steps.push({
      states: [...stateSnapshot],
      currentIndex: -1,
      setContents: Array.from(seen),
      output: `Scanned all elements → no duplicates found`,
    });
  }

  return { arr, steps, hasDuplicate };
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
export function ContainsDuplicateVisualization() {
  const [input, setInput] = useState("1,2,3,1");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [arr, setArr] = useState<number[]>([1, 2, 3, 1]);
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
    setSteps(result.steps);
    setOutput([
      `Contains duplicate: ${result.hasDuplicate}`,
      `Array length: ${result.arr.length}`,
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
        <CardTitle className="text-lg">Contains Duplicate</CardTitle>
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
                placeholder="e.g. 1,2,3,1"
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
                  Checking
                </span>
                {" — "}looking up element in Set
              </p>
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Added to Set
                </span>
                {" — "}element was unique, added
              </p>
              <p>
                <span className="font-semibold text-red-500 dark:text-red-400">
                  Duplicate Found
                </span>
                {" — "}element already in Set
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
{`function containsDuplicate(nums) {
  const seen = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (seen.has(nums[i])) return true;
    seen.add(nums[i]);
  }
  return false;
}
console.log(containsDuplicate([${arr.join(", ")}]));`}
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
              currentIndex={curStep.currentIndex}
              setContents={curStep.setContents}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Imagine you&apos;re a bouncer at a party with a guest list clipboard.
            As each person arrives, you check their name against your list. If
            the name is already there, you&apos;ve found a <strong>duplicate</strong> — someone
            tried to sneak in twice! If not, you write their name down and let
            them in. The Set is your clipboard: lookups are instant, so you never
            slow down the line.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
