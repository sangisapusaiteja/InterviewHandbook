"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ─── ConsoleOutput ────────────────────────────────────────────────────────────
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
          {lines.map((line) => (
            <p key={line} className="text-emerald-400">
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

// ─── Types ────────────────────────────────────────────────────────────────────
type MethodTab   = "create" | "iterate" | "operations";
type PracticeTab = "removeDupes" | "containsDup" | "intersection";

interface PracticeStep { label: string; value: string; highlight?: boolean }

// ─── Colors ───────────────────────────────────────────────────────────────────
const methodColor: Record<MethodTab, string> = {
  create:     "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  iterate:    "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  operations: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
};

const methodLabel: Record<MethodTab, string> = {
  create:     "Create & Mutate",
  iterate:    "Iteration",
  operations: "Set Operations",
};

const methodDesc: Record<MethodTab, string> = {
  create:
    "add() inserts a value and returns the Set (chainable) — duplicate values are silently ignored. has() is O(1). delete() returns true if the value existed. size is a property, not a function. clear() empties the Set.",
  iterate:
    "Iterate with for...of. forEach receives (value, value, set) — value appears twice by design. Spread [...set] or Array.from(set) to get an array. keys() and values() are identical; entries() yields [value, value] pairs.",
  operations:
    "Union (A∪B): new Set([...a, ...b]). Intersection (A∩B): [...a].filter(x => b.has(x)). Difference (A−B): [...a].filter(x => !b.has(x)). All run in O(n+m) thanks to O(1) Set.has().",
};

const practiceColor: Record<PracticeTab, string> = {
  removeDupes:  "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  containsDup:  "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
  intersection: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
};

const practiceLabel: Record<PracticeTab, string> = {
  removeDupes:  "Remove Duplicates",
  containsDup:  "Contains Duplicate",
  intersection: "Array Intersection",
};

// ─── Build learn code + output ────────────────────────────────────────────────
function buildMethodResult(
  method: MethodTab,
  extra: string,
): { code: string; output: string[] } {
  switch (method) {
    case "create": {
      const val = extra.trim() || "6";
      const base = new Set([1, 2, 3, 4, 5]);
      base.add(Number(val) || 6);
      const sizeAfterAdd = base.size;
      base.delete(3);
      const sizeAfterDel = base.size;

      return {
        code: `const set = new Set([1, 2, 3, 4, 5]);\nconsole.log("size:", set.size);    // 5\n\n// .add(value) — duplicate ignored\nset.add(${JSON.stringify(extra.trim() || "6")});\nset.add(3);   // already exists → ignored\nconsole.log("size:", set.size);    // ${sizeAfterAdd}\n\n// .has(value) — O(1)\nconsole.log(set.has(${JSON.stringify(extra.trim() || "6")})); // true\nconsole.log(set.has(99));   // false\n\n// .delete(value)\nset.delete(3);\nconsole.log("size:", set.size);    // ${sizeAfterDel}\n\n// .clear() — removes all\n// set.clear(); → set.size === 0`,
        output: [
          `size after add: ${sizeAfterAdd}`,
          `has(${JSON.stringify(extra.trim() || "6")}) = true`,
          `has(99) = false`,
          `size after delete(3): ${sizeAfterDel}`,
        ],
      };
    }

    case "iterate": {
      const vals = ["apple", "banana", "cherry"];
      return {
        code: `const fruits = new Set(["apple", "banana", "cherry"]);\n\n// for...of\nfor (const val of fruits) console.log(val);\n\n// forEach — (value, value, set)\nfruits.forEach((val) => console.log(val));\n\n// Spread to array\nconsole.log([...fruits]);\nconsole.log(Array.from(fruits));\n\n// keys === values in a Set\nconsole.log([...fruits.values()]);\n\n// entries yields [value, value] pairs\nconsole.log([...fruits.entries()]);`,
        output: [
          `[...fruits] = ${JSON.stringify(vals)}`,
          `values: ${JSON.stringify(vals)}`,
          `entries: ${JSON.stringify(vals.map((v) => [v, v]))}`,
        ],
      };
    }

    case "operations": {
      const a = new Set([1, 2, 3, 4]);
      const b = new Set([3, 4, 5, 6]);
      const union        = Array.from(new Set([...Array.from(a), ...Array.from(b)]));
      const intersection = Array.from(a).filter((x) => b.has(x));
      const difference   = Array.from(a).filter((x) => !b.has(x));

      return {
        code: `const a = new Set([1, 2, 3, 4]);\nconst b = new Set([3, 4, 5, 6]);\n\n// Union (A ∪ B)\nconst union = new Set([...a, ...b]);\nconsole.log([...union]);\n\n// Intersection (A ∩ B)\nconst inter = new Set([...a].filter(x => b.has(x)));\nconsole.log([...inter]);\n\n// Difference (A − B)\nconst diff = new Set([...a].filter(x => !b.has(x)));\nconsole.log([...diff]);\n\n// Symmetric Difference (A △ B)\nconst symDiff = new Set(\n  [...a].filter(x => !b.has(x)).concat([...b].filter(x => !a.has(x)))\n);\nconsole.log([...symDiff]);`,
        output: [
          `Union        (A ∪ B): ${JSON.stringify(union)}`,
          `Intersection (A ∩ B): ${JSON.stringify(intersection)}`,
          `Difference   (A − B): ${JSON.stringify(difference)}`,
          `Sym. Diff    (A △ B): ${JSON.stringify([...difference, 5, 6])}`,
        ],
      };
    }
  }
}

// ─── Build practice code + steps ─────────────────────────────────────────────
function buildPracticeResult(
  tab: PracticeTab,
  input: string,
): { code: string; output: string; steps: PracticeStep[] } {
  switch (tab) {
    case "removeDupes": {
      const raw  = input.split(",").map((s) => s.trim()).filter(Boolean);
      const seen = new Set<string>();
      const steps: PracticeStep[] = [{ label: "Input", value: JSON.stringify(raw) }];

      for (let i = 0; i < raw.length; i++) {
        const v = raw[i];
        if (seen.has(v)) {
          steps.push({ label: `[${i}] ${JSON.stringify(v)}`, value: `already in Set → ❌ skip` });
        } else {
          seen.add(v);
          steps.push({ label: `[${i}] ${JSON.stringify(v)}`, value: `new → ✅ add  (size=${seen.size})` });
        }
      }

      const result = JSON.stringify(Array.from(seen));
      steps.push({ label: "Result", value: result, highlight: true });

      return {
        code: `function removeDuplicates(arr) {\n  return [...new Set(arr)];\n}\nconsole.log(removeDuplicates(${JSON.stringify(raw)}));`,
        output: result,
        steps,
      };
    }

    case "containsDup": {
      const raw  = input.split(",").map((s) => s.trim()).filter(Boolean);
      const seen = new Set<string>();
      const steps: PracticeStep[] = [{ label: "Input", value: JSON.stringify(raw) }];
      let found = false;

      for (let i = 0; i < raw.length; i++) {
        const v = raw[i];
        if (seen.has(v)) {
          steps.push({ label: `[${i}] ${JSON.stringify(v)}`, value: `✅ already seen → duplicate found!` });
          found = true;
          break;
        }
        seen.add(v);
        steps.push({ label: `[${i}] ${JSON.stringify(v)}`, value: `not in Set → add` });
      }

      const resultStr = String(found);
      steps.push({ label: "Result", value: resultStr, highlight: true });

      return {
        code: `function containsDuplicate(arr) {\n  const seen = new Set();\n  for (const val of arr) {\n    if (seen.has(val)) return true;\n    seen.add(val);\n  }\n  return false;\n}\nconsole.log(containsDuplicate(${JSON.stringify(raw)}));`,
        output: resultStr,
        steps,
      };
    }

    case "intersection": {
      const pipeIdx = input.indexOf("|");
      const rawA = pipeIdx < 0 ? input : input.slice(0, pipeIdx);
      const rawB = pipeIdx < 0 ? "" : input.slice(pipeIdx + 1);

      const arrA = rawA.split(",").map((s) => s.trim()).filter(Boolean);
      const arrB = rawB.split(",").map((s) => s.trim()).filter(Boolean);
      const setA = new Set(arrA);
      const result: string[] = [];

      const steps: PracticeStep[] = [
        { label: "Set A", value: `{${Array.from(setA).join(", ")}}` },
        { label: "Checking B", value: JSON.stringify(arrB) },
      ];

      for (let i = 0; i < arrB.length; i++) {
        const v = arrB[i];
        if (setA.has(v)) {
          if (!result.includes(v)) {
            result.push(v);
            steps.push({ label: `B[${i}] ${JSON.stringify(v)}`, value: `✅ in Set A → add to result` });
          } else {
            steps.push({ label: `B[${i}] ${JSON.stringify(v)}`, value: `✅ in Set A → already in result, skip` });
          }
        } else {
          steps.push({ label: `B[${i}] ${JSON.stringify(v)}`, value: `❌ not in Set A → skip` });
        }
      }

      const resultStr = JSON.stringify(result);
      steps.push({ label: "Result", value: resultStr, highlight: true });

      return {
        code: `function intersection(arr1, arr2) {\n  const setA = new Set(arr1);\n  return [...new Set(arr2.filter(x => setA.has(x)))];\n}\nconsole.log(intersection(${JSON.stringify(arrA)}, ${JSON.stringify(arrB)}));`,
        output: resultStr,
        steps,
      };
    }
  }
}

// ─── Section 1: Set Methods ───────────────────────────────────────────────────
function MethodsSection() {
  const [tab, setTab]   = useState<MethodTab>("create");
  const [extra, setExtra] = useState<Record<MethodTab, string>>({
    create:     "6",
    iterate:    "",
    operations: "",
  });
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const clearOutput = () => setOutputLines(null);
  const currentExtra = extra[tab];
  const { code } = buildMethodResult(tab, currentExtra);

  const handleRun = () => {
    const { output } = buildMethodResult(tab, currentExtra);
    setOutputLines(output);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Set Methods
      </p>

      {/* Method tabs */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(methodLabel) as MethodTab[]).map((key) => (
          <button
            key={key}
            onClick={() => { setTab(key); clearOutput(); }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              tab === key
                ? methodColor[key] + " scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {methodLabel[key]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: inputs + description */}
        <div className="space-y-3">
          {tab === "create" && (
            <>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground">Base Set</p>
                <div className={`w-full rounded-lg border px-3 py-2 text-xs font-mono ${methodColor[tab]}`}>
                  new Set([1, 2, 3, 4, 5])
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground">value to add</p>
                <input
                  value={currentExtra}
                  onChange={(e) => { setExtra((p) => ({ ...p, [tab]: e.target.value })); clearOutput(); }}
                  className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                  placeholder="e.g. 6  or  99  or  'hello'"
                />
              </div>
            </>
          )}

          <Button size="sm" onClick={handleRun} className="w-full">
            <Play className="h-3.5 w-3.5 mr-1" /> Run
          </Button>

          <div className={`rounded-lg border px-3 py-2 text-xs leading-relaxed ${methodColor[tab]}`}>
            {methodDesc[tab]}
          </div>
        </div>

        {/* Right: Code + Output */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
            <AnimatePresence mode="wait">
              <motion.pre
                key={code}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[72px]"
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
      </div>
    </div>
  );
}

// ─── Section 2: Practice Problems ────────────────────────────────────────────
function PracticeSection() {
  const [tab, setTab]   = useState<PracticeTab>("removeDupes");
  const [inputs, setInputs] = useState<Record<PracticeTab, string>>({
    removeDupes:  "1,2,3,2,1,4,3,5",
    containsDup:  "1,2,3,4,2",
    intersection: "1,2,3,4|3,4,5,6",
  });
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [steps, setSteps]             = useState<PracticeStep[]>([]);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [running, setRunning]         = useState(false);

  const currentInput = inputs[tab];

  const clearOutput = () => {
    setOutputLines(null);
    setSteps([]);
    setVisibleSteps(0);
    setRunning(false);
  };

  const handleRun = async () => {
    if (running) return;
    const { output, steps: newSteps } = buildPracticeResult(tab, currentInput);
    setOutputLines([output]);
    setSteps(newSteps);
    setVisibleSteps(0);
    setRunning(true);
    for (let i = 1; i <= newSteps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 260));
      setVisibleSteps(i);
    }
    setRunning(false);
  };

  const { code } = buildPracticeResult(tab, currentInput);

  const inputLabel: Record<PracticeTab, string> = {
    removeDupes:  "comma-separated values",
    containsDup:  "comma-separated values",
    intersection: "arr1|arr2  (e.g. 1,2,3,4|3,4,5,6)",
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Practice Problems
      </p>

      {/* Practice tabs */}
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

      {/* Input + controls */}
      <div className="space-y-1">
        <p className="text-xs font-semibold text-muted-foreground">{inputLabel[tab]}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <input
            value={currentInput}
            onChange={(e) => { setInputs((p) => ({ ...p, [tab]: e.target.value })); clearOutput(); }}
            className={`rounded-lg border px-3 py-2 text-xs font-mono flex-1 min-w-[160px] focus:outline-none ${practiceColor[tab]}`}
            placeholder="Enter input"
            disabled={running}
          />
          <Button size="sm" onClick={handleRun} disabled={running || !currentInput}>
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
export function SetVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Set</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <MethodsSection />
        <Separator />
        <PracticeSection />
      </CardContent>
    </Card>
  );
}
