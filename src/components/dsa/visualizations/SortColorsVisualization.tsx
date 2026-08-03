"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const valueColor: Record<number, string> = {
  0: "#ef4444", // red
  1: "#f5f5f5", // white
  2: "#3b82f6", // blue
};

const valueBorder: Record<number, string> = {
  0: "#dc2626",
  1: "#a3a3a3",
  2: "#2563eb",
};

function ArrayDiagram({
  arr,
  low,
  mid,
  high,
  activeIndex,
}: {
  arr: number[];
  low: number;
  mid: number;
  high: number;
  activeIndex: number;
}) {
  return (
    <div className="flex flex-col items-center py-2">
      <div className="flex gap-2 flex-wrap justify-center">
        {arr.map((val, i) => {
          const isActive = i === activeIndex;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  backgroundColor: valueColor[val] ?? "transparent",
                  borderColor: valueBorder[val] ?? "#374151",
                  scale: isActive ? 1.15 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 flex items-center justify-center rounded-lg border-2 font-mono text-sm font-bold"
                style={{ color: val === 1 ? "#374151" : "#fff" }}
              >
                {val}
              </motion.div>
              <span className="text-[10px] text-muted-foreground">{i}</span>
              <div className="flex gap-0.5">
                {i === low && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] font-bold text-red-500">lo</motion.span>}
                {i === mid && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] font-bold text-yellow-500">mid</motion.span>}
                {i === high && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] font-bold text-blue-500">hi</motion.span>}
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
  low: number;
  mid: number;
  high: number;
  activeIndex: number;
  output: string;
}

function buildSteps(input: string): { steps: Step[] } {
  const nums = input.split(",").map((s) => Number(s.trim())).filter((n) => n === 0 || n === 1 || n === 2);
  const arr = nums.length ? [...nums] : [2, 0, 2, 1, 1, 0];
  const steps: Step[] = [];

  let low = 0, mid = 0, high = arr.length - 1;

  steps.push({
    arr: [...arr],
    low, mid, high,
    activeIndex: mid,
    output: `Start: low=0, mid=0, high=${high} | array=[${arr.join(",")}]`,
  });

  while (mid <= high) {
    if (arr[mid] === 0) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      steps.push({
        arr: [...arr],
        low: low + 1, mid: mid + 1, high,
        activeIndex: mid,
        output: `nums[mid=${mid}]=0 → swap(${low},${mid}) → [${arr.join(",")}] low=${low + 1} mid=${mid + 1}`,
      });
      low++; mid++;
    } else if (arr[mid] === 1) {
      steps.push({
        arr: [...arr],
        low, mid: mid + 1, high,
        activeIndex: mid,
        output: `nums[mid=${mid}]=1 → already in place → mid=${mid + 1}`,
      });
      mid++;
    } else {
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      steps.push({
        arr: [...arr],
        low, mid, high: high - 1,
        activeIndex: mid,
        output: `nums[mid=${mid}]=2 → swap(${mid},${high}) → [${arr.join(",")}] high=${high - 1}`,
      });
      high--;
    }
  }

  return { steps };
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

export function SortColorsVisualization() {
  const [input, setInput] = useState("2,0,2,1,1,0");
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
    const finalArr = result.steps[result.steps.length - 1]?.arr ?? [];
    setOutput([`Sorted: [${finalArr.join(", ")}]`, `Steps: ${result.steps.length}`]);
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
      <CardHeader className="pb-3"><CardTitle className="text-lg">Sort Colors (Dutch National Flag)</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Visualization</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground">Array of 0s, 1s, 2s (comma-separated)</p>
              <input value={input} onChange={(e) => { setInput(e.target.value); clear(); }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none" placeholder="e.g. 2,0,2,1,1,0" />
            </div>
            <Button size="sm" onClick={handleRun} disabled={running} className="w-full">
              <Play className="h-3.5 w-3.5 mr-1" />{running ? "Sorting..." : "Run"}
            </Button>
            <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
              <p><span className="font-semibold text-red-500">0 (Red)</span>{" — "}swapped to front via <strong>lo</strong></p>
              <p><span className="font-semibold text-zinc-400">1 (White)</span>{" — "}stays in middle</p>
              <p><span className="font-semibold text-blue-500">2 (Blue)</span>{" — "}swapped to back via <strong>hi</strong></p>
              <p><span className="font-semibold text-yellow-500">mid</span>{" — "}current scanner</p>
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
{`function sortColors(nums) {
  let low = 0, mid = 0;
  let high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] =
        [nums[mid], nums[low]];
      low++; mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] =
        [nums[high], nums[mid]];
      high--;
    }
  }
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
            <ArrayDiagram arr={curStep.arr} low={curStep.low} mid={curStep.mid} high={curStep.high} activeIndex={curStep.activeIndex} />
          </div>
        )}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">Real-Life Analogy</p>
          <p className="text-sm leading-relaxed">
            Sorting cards into three piles: <strong className="text-red-500">red</strong>,{" "}
            <strong>white</strong>, and <strong className="text-blue-500">blue</strong>.
            Flip cards at the middle marker. Red? Swap to the left pile. White? Leave it. Blue? Swap
            to the right pile — but <em>don&apos;t advance</em> the middle marker yet, because the
            swapped card hasn&apos;t been checked.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
