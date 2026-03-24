"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CellState = "idle" | "current" | "counted" | "majority" | "done";

interface Step {
  states: CellState[];
  currentIndex: number;
  output: string;
}

function ArrayDiagram({
  arr,
  states,
  currentIndex,
}: Readonly<{
  arr: number[];
  states: CellState[];
  currentIndex: number;
}>) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    current: "#eab308",
    counted: "#3b82f6",
    majority: "#22c55e",
    done: "#14b8a6",
  };

  const labelMap: Partial<Record<CellState, string>> = {
    current: "SCAN",
    counted: "COUNT",
    majority: "WIN",
  };

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div className="flex gap-2 flex-wrap justify-center">
        {arr.map((value, index) => {
          const state = states[index] ?? "idle";
          const isActive = index === currentIndex;
          return (
            <div key={`${value}-${index}`} className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  backgroundColor: colorMap[state],
                  scale: isActive ? 1.12 : 1,
                }}
                transition={{ duration: 0.25 }}
                className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-border font-mono text-sm font-bold"
              >
                {value}
              </motion.div>
              <span className="text-[10px] text-muted-foreground">{index}</span>
              <span className="h-3 text-[10px] font-semibold" style={{ color: colorMap[state] }}>
                {labelMap[state] ?? ""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ConsoleOutput({ lines }: Readonly<{ lines: string[] | null }>) {
  return (
    <AnimatePresence mode="wait">
      {lines ? (
        <motion.div
          key="out"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="min-h-[52px] space-y-1 overflow-auto rounded-xl border bg-zinc-900 px-4 py-3 font-mono text-xs dark:bg-zinc-950"
        >
          {lines.map((line, index) => (
            <p key={index} className="text-emerald-400">
              <span className="mr-2 select-none text-zinc-500">&gt;</span>
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
          className="flex min-h-[52px] items-center justify-center rounded-xl border bg-muted/20 px-4 py-3"
        >
          <p className="text-xs italic text-muted-foreground">
            Click ▶ Run to see the visualization
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function buildSteps(input: string): {
  arr: number[];
  steps: Step[];
  result: number;
} {
  const parsed = input
    .split(",")
    .map((chunk) => Number(chunk.trim()))
    .filter((value) => !Number.isNaN(value));
  const arr = parsed.length > 0 ? parsed : [2, 2, 1, 1, 1, 2, 2];

  const threshold = Math.floor(arr.length / 2);
  const map = new Map<number, number>();
  const steps: Step[] = [
    {
      states: Array(arr.length).fill("idle"),
      currentIndex: -1,
      output: `Start: need a frequency greater than ${threshold}`,
    },
  ];

  for (let index = 0; index < arr.length; index++) {
    const value = arr[index];
    const states: CellState[] = Array(arr.length).fill("idle");

    for (let doneIndex = 0; doneIndex < index; doneIndex++) {
      states[doneIndex] = "done";
    }

    states[index] = "current";
    steps.push({
      states: [...states],
      currentIndex: index,
      output: `i=${index}: read nums[${index}] = ${value}`,
    });

    const frequency = (map.get(value) ?? 0) + 1;
    map.set(value, frequency);
    states[index] = frequency > threshold ? "majority" : "counted";

    steps.push({
      states: [...states],
      currentIndex: index,
      output: `Set map[${value}] = ${frequency}. ${frequency > threshold ? `${value} is now the majority element.` : "Threshold not reached yet."}`,
    });

    if (frequency > threshold) {
      const finalStates = arr.map((_, itemIndex) => (itemIndex === index ? "majority" : "done"));
      steps.push({
        states: finalStates,
        currentIndex: index,
        output: `Return ${value} because ${frequency} > ${threshold}`,
      });

      return { arr, steps, result: value };
    }
  }

  return { arr, steps, result: arr[0] };
}

export function FindLargestElementVisualization() {
  const [input, setInput] = useState("2,2,1,1,1,2,2");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [arr, setArr] = useState<number[]>([2, 2, 1, 1, 1, 2, 2]);
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
      `Majority element: ${result.result}`,
      `Threshold: > ${Math.floor(result.arr.length / 2)}`,
      `Approach: frequency map`,
    ]);
    setHasRun(true);
    setRunning(true);

    for (let index = 0; index < result.steps.length; index++) {
      await new Promise<void>((resolve) => setTimeout(resolve, 650));
      setStepIndex(index);
    }

    setRunning(false);
  };

  const currentStep = stepIndex >= 0 ? steps[stepIndex] : null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Majority Element (Frequency Map)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Visualization
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground">
                Array (comma-separated)
              </p>
              <input
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  clear();
                }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 font-mono text-xs focus:outline-none"
                placeholder="e.g. 2,2,1,1,1,2,2"
              />
            </div>

            <Button size="sm" onClick={handleRun} disabled={running} className="w-full">
              <Play className="mr-1 h-3.5 w-3.5" />
              {running ? "Counting..." : "Run"}
            </Button>

            <div className="space-y-1 rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed">
              <p>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Yellow
                </span>
                {" — "}current element being processed
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Blue
                </span>
                {" — "}frequency updated in the map
              </p>
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Green
                </span>
                {" — "}count crossed the majority threshold
              </p>
            </div>

            {currentStep && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.output}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-lg border bg-muted/50 px-3 py-2 font-mono text-xs"
                >
                  {currentStep.output}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <p className="mb-1.5 text-xs font-semibold text-muted-foreground">Code</p>
              <pre className="min-h-[160px] overflow-x-auto whitespace-pre rounded-xl border bg-muted/40 px-4 py-3 font-mono text-xs">
{`function majorityElement(nums) {
  const length = nums.length;
  const map = new Map();

  for (let i = 0; i < length; i++) {
    const frequency = (map.get(nums[i]) ?? 0) + 1;
    map.set(nums[i], frequency);

    if (frequency > length / 2) {
      return nums[i];
    }
  }

  return nums[0];
}

console.log(majorityElement([${arr.join(", ")}]));`}
              </pre>
            </div>

            <div>
              <p className="mb-1.5 text-xs font-semibold text-muted-foreground">Output</p>
              <ConsoleOutput lines={output} />
            </div>
          </div>
        </div>

        {hasRun && currentStep && (
          <div className="space-y-4 rounded-xl border bg-muted/20 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground">
                Diagram
                <span className="ml-2 font-normal">
                  - Step {stepIndex + 1} / {steps.length}
                </span>
              </p>
              <Button size="sm" variant="ghost" className="h-6 px-2 text-xs" onClick={clear}>
                <RotateCcw className="mr-1 h-3 w-3" /> Reset
              </Button>
            </div>

            <ArrayDiagram
              arr={arr}
              states={currentStep.states}
              currentIndex={currentStep.currentIndex}
            />
          </div>
        )}

        <div className="space-y-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Think of a vote counter writing tallies on a whiteboard. Each time a number appears,
            its tally increases by one. The first tally that goes past half of the total votes is
            the guaranteed winner, so you can stop counting immediately.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
