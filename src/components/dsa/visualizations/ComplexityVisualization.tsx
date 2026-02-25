"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ─── Console Output ───────────────────────────────────────────────────────────
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
          <p className="text-xs text-muted-foreground italic">Click ▶ Run to see output</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Array Diagram ────────────────────────────────────────────────────────────
interface CellHighlight {
  index: number;
  color: string;
  dimmed?: boolean;
}

function ArrayDiagram({
  arr,
  highlights = [],
  pointers = [],
}: {
  arr: (number | string)[];
  highlights?: CellHighlight[];
  pointers?: { index: number; label: string; color: string }[];
}) {
  return (
    <div className="flex flex-col items-center py-2">
      <div className="flex gap-2 flex-wrap justify-center">
        {arr.map((val, i) => {
          const hl = highlights.find((h) => h.index === i);
          const cellPointers = pointers.filter((p) => p.index === i);
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  backgroundColor: hl?.color ?? "transparent",
                  scale: hl && !hl.dimmed ? 1.1 : 1,
                  opacity: hl?.dimmed ? 0.2 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-border font-mono text-sm font-bold"
              >
                {val}
              </motion.div>
              <span className="text-[10px] text-muted-foreground">{i}</span>
              {cellPointers.map((p) => (
                <span
                  key={p.label}
                  className="text-[10px] font-bold leading-none"
                  style={{ color: p.color }}
                >
                  {p.label}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
type ComplexityTab = "O(1)" | "O(n)" | "O(log n)" | "O(n²)";
type PracticeTab   = "findMax" | "binarySearch" | "containsDup";

interface Step {
  highlights: CellHighlight[];
  pointers?: { index: number; label: string; color: string }[];
  output: string;
}

interface PracticeStep { label: string; value: string; highlight?: boolean }

// ─── Colors & Labels ──────────────────────────────────────────────────────────
const tabColor: Record<ComplexityTab, string> = {
  "O(1)":     "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  "O(n)":     "bg-yellow-500/15 border-yellow-500/40 text-yellow-700 dark:text-yellow-300",
  "O(log n)": "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  "O(n²)":    "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300",
};

const tabDesc: Record<ComplexityTab, string> = {
  "O(1)":
    "Constant time — always the same number of operations regardless of input size. Array index access jumps directly to the memory address. Hash map get/set and stack push/pop are also O(1).",
  "O(n)":
    "Linear time — operations grow proportionally to n. A single loop that visits every element is O(n). Doubling the input doubles the work. Examples: linear search, array sum, map/filter.",
  "O(log n)":
    "Logarithmic time — the problem is halved each step. Binary search on a sorted array discards half the remaining elements per iteration. 1 million elements → at most 20 comparisons.",
  "O(n²)":
    "Quadratic time — a nested loop creates n×n pairs. Doubling input quadruples the work. Common in naive sorting (bubble sort) and brute-force duplicate checks. Avoid for large n.",
};

const practiceColor: Record<PracticeTab, string> = {
  findMax:      "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  binarySearch: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  containsDup:  "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
};

const practiceLabel: Record<PracticeTab, string> = {
  findMax:      "Find Maximum — O(n)",
  binarySearch: "Binary Search — O(log n)",
  containsDup:  "Contains Duplicate — O(n²) vs O(n)",
};

const practiceInputLabel: Record<PracticeTab, string> = {
  findMax:      "comma-separated numbers",
  binarySearch: "arr | target  (e.g. 1,3,5,7,9|7)",
  containsDup:  "comma-separated numbers",
};

// ─── Build complexity steps ───────────────────────────────────────────────────
function buildSteps(
  tab: ComplexityTab,
  input: string,
  target: string,
): { steps: Step[]; arr: (number | string)[]; code: string; output: string[] } {
  switch (tab) {
    case "O(1)": {
      const nums = input.split(",").map((s) => Number(s.trim())).filter((n) => !isNaN(n));
      const arr  = nums.length ? nums : [10, 20, 30, 40, 50];
      const idx  = Math.max(0, Math.min(Number(target) || 0, arr.length - 1));
      return {
        arr,
        steps: [{ highlights: [{ index: idx, color: "#22c55e" }], output: `arr[${idx}] = ${arr[idx]}  ✅  (1 operation — direct access)` }],
        code:  `const arr = [${arr.join(", ")}];\nconsole.log(arr[${idx}]); // O(1) — always 1 step`,
        output: [`arr[${idx}] = ${arr[idx]}`, `Operations: 1  (size doesn\u2019t matter)`],
      };
    }

    case "O(n)": {
      const nums   = input.split(",").map((s) => Number(s.trim())).filter((n) => !isNaN(n));
      const arr    = nums.length ? nums : [3, 7, 1, 9, 4];
      const t      = Number(target);
      const target2 = !isNaN(t) && target.trim() !== "" ? t : arr[Math.floor(arr.length / 2)];
      const steps: Step[] = [];
      let foundIdx = -1;

      for (let i = 0; i < arr.length; i++) {
        const found = arr[i] === target2;
        if (found) foundIdx = i;
        steps.push({
          highlights: [
            ...Array.from({ length: i }, (_, j) => ({ index: j, color: "#374151", dimmed: true })),
            { index: i, color: found ? "#22c55e" : "#eab308" },
          ],
          output: found
            ? `arr[${i}] = ${arr[i]} === ${target2}  \u2705  Found at index ${i}`
            : `arr[${i}] = ${arr[i]} \u2260 ${target2}, continue\u2026`,
        });
        if (found) break;
      }

      if (foundIdx < 0) {
        steps.push({ highlights: arr.map((_, j) => ({ index: j, color: "#374151", dimmed: true })), output: `${target2} not found in array \u274c` });
      }

      return {
        arr,
        steps,
        code:  `function linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}\nconsole.log(linearSearch([${arr.join(", ")}], ${target2}));`,
        output: [
          foundIdx >= 0 ? `Found ${target2} at index ${foundIdx}` : `${target2} not found`,
          `Operations: ${foundIdx >= 0 ? foundIdx + 1 : arr.length}  (worst case: n = ${arr.length})`,
        ],
      };
    }

    case "O(log n)": {
      const nums  = input.split(",").map((s) => Number(s.trim())).filter((n) => !isNaN(n));
      const arr   = (nums.length >= 2 ? [...nums] : [1, 3, 5, 7, 9, 11, 13]).sort((a, b) => a - b);
      const t     = Number(target);
      const target2 = !isNaN(t) && target.trim() !== "" ? t : arr[Math.floor(arr.length / 2)];
      const steps: Step[] = [];
      let lo = 0, hi = arr.length - 1, ops = 0, foundIdx = -1;

      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        ops++;
        const highlights: CellHighlight[] = arr.map((_, idx) => {
          if (idx < lo || idx > hi) return { index: idx, color: "#374151", dimmed: true };
          if (idx === mid)          return { index: idx, color: arr[mid] === target2 ? "#22c55e" : "#eab308" };
          return { index: idx, color: "#1e40af40" };
        });
        steps.push({
          highlights,
          pointers: [
            { index: lo,  label: "lo",  color: "#60a5fa" },
            { index: mid, label: "mid", color: "#fbbf24" },
            { index: hi,  label: "hi",  color: "#60a5fa" },
          ],
          output: arr[mid] === target2
            ? `mid=${mid}: arr[${mid}]=${arr[mid]} = ${target2}  \u2705  Found!`
            : arr[mid] < target2
            ? `mid=${mid}: arr[${mid}]=${arr[mid]} < ${target2} \u2192 lo = ${mid + 1}`
            : `mid=${mid}: arr[${mid}]=${arr[mid]} > ${target2} \u2192 hi = ${mid - 1}`,
        });
        if (arr[mid] === target2) { foundIdx = mid; break; }
        if (arr[mid] < target2) lo = mid + 1;
        else                     hi = mid - 1;
      }

      return {
        arr,
        steps,
        code:  `function binarySearch(arr, target) {\n  let lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    const mid = Math.floor((lo + hi) / 2);\n    if (arr[mid] === target) return mid;\n    else if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}\nconsole.log(binarySearch([${arr.join(", ")}], ${target2}));`,
        output: [
          foundIdx >= 0 ? `Found ${target2} at index ${foundIdx}` : `${target2} not found`,
          `Operations: ${ops}  (log\u2082${arr.length} \u2248 ${Math.ceil(Math.log2(arr.length))} max)`,
        ],
      };
    }

    case "O(n²)": {
      const nums = input.split(",").map((s) => Number(s.trim())).filter((n) => !isNaN(n));
      const arr  = nums.length ? nums.slice(0, 7) : [1, 2, 3, 2];
      const steps: Step[] = [];
      let ops = 0, foundI = -1, foundJ = -1;

      outer: for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          ops++;
          const isDup = arr[i] === arr[j];
          steps.push({
            highlights: [
              { index: i, color: "#3b82f6" },
              { index: j, color: isDup ? "#22c55e" : "#eab308" },
            ],
            output: isDup
              ? `arr[${i}]=${arr[i]} === arr[${j}]=${arr[j]}  \u2705  Duplicate found!`
              : `arr[${i}]=${arr[i]} \u2260 arr[${j}]=${arr[j]}`,
          });
          if (isDup) { foundI = i; foundJ = j; break outer; }
        }
      }

      const maxPairs = (arr.length * (arr.length - 1)) / 2;
      return {
        arr,
        steps,
        code:  `function hasDuplicate(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[i] === arr[j]) return true;\n    }\n  }\n  return false;\n}\nconsole.log(hasDuplicate([${arr.join(", ")}]));`,
        output: [
          foundI >= 0
            ? `true — arr[${foundI}] = arr[${foundJ}] = ${arr[foundI]}`
            : `false — no duplicates found`,
          `Operations used: ${ops}  (max pairs: ${maxPairs} = n\u00b2/2)`,
        ],
      };
    }
  }
}

// ─── Build practice result ────────────────────────────────────────────────────
function buildPractice(
  tab: PracticeTab,
  input: string,
): { code: string; output: string; steps: PracticeStep[] } {
  switch (tab) {
    case "findMax": {
      const nums = input.split(",").map((s) => Number(s.trim())).filter((n) => !isNaN(n));
      const arr  = nums.length ? nums : [3, 7, 1, 9, 4, 6];
      let max    = arr[0];
      const steps: PracticeStep[] = [{ label: "Start", value: `max = ${max}` }];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
          max = arr[i];
          steps.push({ label: `[${i}] ${arr[i]}`, value: `${arr[i]} > prev max \u2192 max = ${max}` });
        } else {
          steps.push({ label: `[${i}] ${arr[i]}`, value: `${arr[i]} \u2264 max, skip` });
        }
      }
      steps.push({ label: "Result", value: `max = ${max}`, highlight: true });
      return {
        code:   `function findMax(arr) {\n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) max = arr[i];\n  }\n  return max;\n}\nconsole.log(findMax([${arr.join(", ")}]));`,
        output: String(max),
        steps,
      };
    }

    case "binarySearch": {
      const parts = input.split("|");
      const nums  = (parts[0] ?? "").split(",").map((s) => Number(s.trim())).filter((n) => !isNaN(n));
      const arr   = (nums.length ? [...nums] : [1, 3, 5, 7, 9, 11, 13]).sort((a, b) => a - b);
      const t     = Number(parts[1]) || arr[Math.floor(arr.length / 2)];
      let lo = 0, hi = arr.length - 1, result = -1;
      const steps: PracticeStep[] = [{ label: "Input", value: `arr=[${arr.join(",")}]  target=${t}` }];

      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        steps.push({
          label: `lo=${lo} hi=${hi} mid=${mid}`,
          value: arr[mid] === t
            ? `arr[${mid}]=${arr[mid]} = target \u2705`
            : arr[mid] < t
            ? `arr[${mid}]=${arr[mid]} < target \u2192 lo = ${mid + 1}`
            : `arr[${mid}]=${arr[mid]} > target \u2192 hi = ${mid - 1}`,
        });
        if (arr[mid] === t) { result = mid; break; }
        if (arr[mid] < t) lo = mid + 1;
        else              hi = mid - 1;
      }

      steps.push({ label: "Result", value: result >= 0 ? `Found at index ${result}` : "Not found (-1)", highlight: true });
      return {
        code:   `function binarySearch(arr, target) {\n  let lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    const mid = Math.floor((lo + hi) / 2);\n    if (arr[mid] === target) return mid;\n    else if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}\nconsole.log(binarySearch([${arr.join(", ")}], ${t}));`,
        output: result >= 0 ? String(result) : "-1",
        steps,
      };
    }

    case "containsDup": {
      const nums = input.split(",").map((s) => Number(s.trim())).filter((n) => !isNaN(n));
      const arr  = nums.length ? nums : [1, 2, 3, 2, 1];
      const seen = new Set<number>();
      const steps: PracticeStep[] = [
        { label: "Input", value: JSON.stringify(arr) },
        { label: "Strategy", value: "O(n) — Set for O(1) lookups instead of O(n²) nested loops" },
      ];
      let found = false;

      for (let i = 0; i < arr.length; i++) {
        const v = arr[i];
        if (seen.has(v)) {
          steps.push({ label: `[${i}] ${v}`, value: `already in Set \u2192 duplicate! \u2705` });
          found = true;
          break;
        }
        seen.add(v);
        steps.push({ label: `[${i}] ${v}`, value: `not in Set \u2192 add  (size=${seen.size})` });
      }

      steps.push({ label: "Result", value: String(found), highlight: true });
      return {
        code:   `// O(n\u00b2) naive — avoid:\nfunction hasDupNaive(arr) {\n  for (let i = 0; i < arr.length; i++)\n    for (let j = i+1; j < arr.length; j++)\n      if (arr[i] === arr[j]) return true;\n  return false;\n}\n\n// O(n) with Set \u2714:\nfunction hasDupFast(arr) {\n  const seen = new Set();\n  for (const x of arr) {\n    if (seen.has(x)) return true;\n    seen.add(x);\n  }\n  return false;\n}\nconsole.log(hasDupFast([${arr.join(", ")}]));`,
        output: String(found),
        steps,
      };
    }
  }
}

// ─── Section 1: Complexity Classes ───────────────────────────────────────────
const defaultInputs: Record<ComplexityTab, string> = {
  "O(1)":     "10,20,30,40,50",
  "O(n)":     "3,7,1,9,4",
  "O(log n)": "1,3,5,7,9,11,13",
  "O(n²)":    "1,2,3,2",
};

const defaultTargets: Record<ComplexityTab, string> = {
  "O(1)":     "0",
  "O(n)":     "9",
  "O(log n)": "7",
  "O(n²)":    "",
};

const targetLabel: Record<ComplexityTab, string | null> = {
  "O(1)":     "Index to access",
  "O(n)":     "Target to search",
  "O(log n)": "Target to search",
  "O(n²)":    null,
};

function ComplexitySection() {
  const [tab, setTab]       = useState<ComplexityTab>("O(1)");
  const [inputs, setInputs] = useState<Record<ComplexityTab, string>>(defaultInputs);
  const [targets, setTargets] = useState<Record<ComplexityTab, string>>(defaultTargets);
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps]   = useState<Step[]>([]);
  const [arr, setArr]       = useState<(number | string)[]>([10, 20, 30, 40, 50]);
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

  const changeTab = (t: ComplexityTab) => {
    setTab(t);
    clear();
    setArr(buildSteps(t, defaultInputs[t], defaultTargets[t]).arr);
  };

  const handleRun = async () => {
    if (running) return;
    const result = buildSteps(tab, inputs[tab], targets[tab]);
    setArr(result.arr);
    setOutput(result.output);
    setSteps(result.steps);
    setHasRun(true);
    setRunning(true);
    for (let i = 0; i < result.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 420));
      setStepIndex(i);
    }
    setRunning(false);
  };

  const { code } = buildSteps(tab, inputs[tab], targets[tab]);

  const curHighlights = stepIndex >= 0 ? steps[stepIndex]?.highlights ?? [] : [];
  const curPointers   = stepIndex >= 0 ? steps[stepIndex]?.pointers   ?? [] : [];
  const curStepOut    = stepIndex >= 0 ? steps[stepIndex]?.output ?? ""      : "";

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Complexity Classes
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {(["O(1)", "O(n)", "O(log n)", "O(n²)"] as ComplexityTab[]).map((t) => (
          <button
            key={t}
            onClick={() => changeTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              tab === t
                ? tabColor[t] + " scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: inputs + description */}
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">Array (comma-separated)</p>
            <input
              value={inputs[tab]}
              onChange={(e) => { setInputs((p) => ({ ...p, [tab]: e.target.value })); clear(); }}
              className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
              placeholder="e.g. 1,2,3,4,5"
            />
          </div>

          {targetLabel[tab] && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground">{targetLabel[tab]}</p>
              <input
                value={targets[tab]}
                onChange={(e) => { setTargets((p) => ({ ...p, [tab]: e.target.value })); clear(); }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                placeholder="e.g. 9"
              />
            </div>
          )}

          <Button size="sm" onClick={handleRun} disabled={running} className="w-full">
            <Play className="h-3.5 w-3.5 mr-1" />
            {running ? "Running…" : "Run"}
          </Button>

          <div className={`rounded-lg border px-3 py-2 text-xs leading-relaxed ${tabColor[tab]}`}>
            {tabDesc[tab]}
          </div>

          {curStepOut && (
            <AnimatePresence mode="wait">
              <motion.div
                key={curStepOut}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-lg border bg-muted/50 px-3 py-2 font-mono text-xs"
              >
                {curStepOut}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Right: code + output */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
            <AnimatePresence mode="wait">
              <motion.pre
                key={code}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[80px]"
              >
                {code}
              </motion.pre>
            </AnimatePresence>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
            <ConsoleOutput lines={output} />
          </div>
        </div>
      </div>

      {/* Diagram */}
      {hasRun && (
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
            <Button size="sm" variant="ghost" className="h-6 px-2 text-xs" onClick={clear}>
              <RotateCcw className="h-3 w-3 mr-1" /> Reset
            </Button>
          </div>
          <ArrayDiagram arr={arr} highlights={curHighlights} pointers={curPointers} />
        </div>
      )}
    </div>
  );
}

// ─── Section 2: Practice Problems ────────────────────────────────────────────
function PracticeSection() {
  const [tab, setTab]       = useState<PracticeTab>("findMax");
  const [inputs, setInputs] = useState<Record<PracticeTab, string>>({
    findMax:      "3,7,1,9,4,6",
    binarySearch: "1,3,5,7,9,11,13|7",
    containsDup:  "1,2,3,2,1",
  });
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [steps, setSteps]             = useState<PracticeStep[]>([]);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [running, setRunning]         = useState(false);

  const clearOutput = () => {
    setOutputLines(null);
    setSteps([]);
    setVisibleSteps(0);
    setRunning(false);
  };

  const handleRun = async () => {
    if (running) return;
    const result = buildPractice(tab, inputs[tab]);
    setOutputLines([result.output]);
    setSteps(result.steps);
    setVisibleSteps(0);
    setRunning(true);
    for (let i = 1; i <= result.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 260));
      setVisibleSteps(i);
    }
    setRunning(false);
  };

  const { code } = buildPractice(tab, inputs[tab]);

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Practice Problems
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(practiceLabel) as PracticeTab[]).map((key) => (
          <button
            key={key}
            onClick={() => { setTab(key); clearOutput(); }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              tab === key
                ? practiceColor[key] + " scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {practiceLabel[key]}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="space-y-1">
        <p className="text-xs font-semibold text-muted-foreground">{practiceInputLabel[tab]}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <input
            value={inputs[tab]}
            onChange={(e) => { setInputs((p) => ({ ...p, [tab]: e.target.value })); clearOutput(); }}
            className={`rounded-lg border px-3 py-2 text-xs font-mono flex-1 min-w-[160px] focus:outline-none ${practiceColor[tab]}`}
            placeholder="Enter input"
            disabled={running}
          />
          <Button size="sm" onClick={handleRun} disabled={running || !inputs[tab]}>
            <Play className="h-3.5 w-3.5 mr-1" />{running ? "Running…" : "Run"}
          </Button>
          <Button size="sm" variant="outline" onClick={clearOutput} disabled={running}>
            <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
          </Button>
        </div>
      </div>

      {/* Code + Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
          <AnimatePresence mode="wait">
            <motion.pre
              key={code}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[160px]"
            >
              {code}
            </motion.pre>
          </AnimatePresence>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
          <ConsoleOutput lines={outputLines} />
        </div>
      </div>

      {/* Step-by-step table */}
      {steps.length > 0 && (
        <div className="rounded-xl border overflow-hidden text-xs">
          <div className="grid grid-cols-2 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
            <span>Step</span>
            <span>Value</span>
          </div>
          {steps.slice(0, visibleSteps).map((step) => (
            <motion.div
              key={`${step.label}-${step.value}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`grid grid-cols-2 border-t px-3 py-2 ${
                step.highlight ? `font-semibold ${practiceColor[tab]}` : ""
              }`}
            >
              <span className="font-mono">{step.label}</span>
              <span className="font-mono break-all">{step.value}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function ComplexityVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Time Complexity (Big-O)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ComplexitySection />
        <Separator />
        <PracticeSection />
      </CardContent>
    </Card>
  );
}
