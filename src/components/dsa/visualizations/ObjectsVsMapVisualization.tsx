"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ─── Console Output ─────────────────────────────────────────────────────────
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
            Click ▶ Run to see output
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface DiffRow {
  feature: string;
  obj: string;
  map: string;
  winner: "map" | "obj" | "tie";
}

interface PracticeStep {
  label: string;
  value: string;
  highlight?: boolean;
}

type PracticeTab = "wordFrequency" | "twoSum" | "orderPreservation";

// ─── Build comparison demo ────────────────────────────────────────────────────
function buildOpsDemo(input: string): {
  objCode: string;
  mapCode: string;
  objOutput: string[];
  mapOutput: string[];
  diffRows: DiffRow[];
} {
  const words = input.split(",").map((w) => w.trim()).filter(Boolean).slice(0, 10);
  const safeWords = words.length >= 1 ? words : ["apple", "banana", "apple", "cherry"];
  const firstWord = safeWords[0];

  const objFreq: Record<string, number> = {};
  safeWords.forEach((w) => { objFreq[w] = (objFreq[w] || 0) + 1; });
  const mapFreq = new Map<string, number>();
  safeWords.forEach((w) => { mapFreq.set(w, (mapFreq.get(w) || 0) + 1); });
  const mapFreqEntries: [string, number][] = [];
  mapFreq.forEach((v, k) => mapFreqEntries.push([k, v]));

  const wordListStr = JSON.stringify(safeWords);

  const objCode =
    `const freq = {};\n${wordListStr}.forEach(w => {\n  freq[w] = (freq[w] || 0) + 1;\n});\n\n// Size requires Object.keys — O(n)\nconsole.log("size:", Object.keys(freq).length);\n\n// Existence check — hits prototype too\nconsole.log("has '${firstWord}':", "${firstWord}" in freq);\n\nconsole.log("freq:", JSON.stringify(freq));`;

  const mapCode =
    `const freq = new Map();\n${wordListStr}.forEach(w => {\n  freq.set(w, (freq.get(w) || 0) + 1);\n});\n\n// Built-in .size — O(1)\nconsole.log("size:", freq.size);\n\n// .has() — prototype-safe\nconsole.log("has '${firstWord}':", freq.has("${firstWord}"));\n\nconsole.log("freq:", JSON.stringify([...freq]));`;

  const objOutput = [
    `size: ${Object.keys(objFreq).length}`,
    `has '${firstWord}': ${firstWord in objFreq}`,
    `freq: ${JSON.stringify(objFreq)}`,
  ];
  const mapOutput = [
    `size: ${mapFreq.size}`,
    `has '${firstWord}': ${mapFreq.has(firstWord)}`,
    `freq: ${JSON.stringify(mapFreqEntries)}`,
  ];

  const diffRows: DiffRow[] = [
    {
      feature: "Key types",
      obj: "string / Symbol only",
      map: "any value (objects, numbers, functions…)",
      winner: "map",
    },
    {
      feature: "Size",
      obj: "Object.keys(obj).length  O(n)",
      map: "map.size  O(1)",
      winner: "map",
    },
    {
      feature: "Check existence",
      obj: '"key" in obj  (checks prototype)',
      map: "map.has(key)  (no prototype leak)",
      winner: "map",
    },
    {
      feature: "Iteration",
      obj: "for…in (includes prototype keys)",
      map: "for…of / .forEach (own entries only)",
      winner: "map",
    },
    {
      feature: "Key order",
      obj: "integer keys sorted first ⚠️",
      map: "insertion order guaranteed ✅",
      winner: "map",
    },
    {
      feature: "Prototype safety",
      obj: '"constructor" in obj → true ⚠️',
      map: "no prototype chain ✅",
      winner: "map",
    },
    {
      feature: "JSON support",
      obj: "JSON.stringify works natively ✅",
      map: "needs [...map] conversion ⚠️",
      winner: "obj",
    },
    {
      feature: "Best for",
      obj: "config, JSON data, known string keys",
      map: "dynamic keys, non-string keys, freq map",
      winner: "tie",
    },
  ];

  return { objCode, mapCode, objOutput, mapOutput, diffRows };
}

// ─── Build practice ──────────────────────────────────────────────────────────
function buildPractice(
  tab: PracticeTab,
  inputA: string,
  inputB: string,
): { code: string; output: string; steps: PracticeStep[] } {
  switch (tab) {
    case "wordFrequency": {
      const words = inputA.split(/[\s,]+/).map((w) => w.toLowerCase().trim()).filter(Boolean);
      const freq = new Map<string, number>();
      words.forEach((w) => freq.set(w, (freq.get(w) || 0) + 1));
      const freqEntries: [string, number][] = [];
      freq.forEach((v, k) => freqEntries.push([k, v]));
      const sorted = freqEntries.sort((a, b) => b[1] - a[1]);
      const steps: PracticeStep[] = [
        { label: "Input", value: `"${inputA.slice(0, 50)}"` },
        { label: "Words", value: `[${words.slice(0, 6).join(", ")}${words.length > 6 ? "…" : ""}]` },
        { label: "Method", value: "map.set(w, (map.get(w) ?? 0) + 1)" },
      ];
      sorted.slice(0, 5).forEach(([w, c]) => {
        steps.push({ label: `"${w}"`, value: `count = ${c}` });
      });
      if (sorted.length > 0) {
        steps.push({ label: "Top word", value: `"${sorted[0][0]}" (×${sorted[0][1]})`, highlight: true });
      }
      return {
        code: `function wordFrequency(text) {\n  const freq = new Map();\n  text.toLowerCase().split(/[\\s,]+/).forEach(w => {\n    freq.set(w, (freq.get(w) ?? 0) + 1);\n  });\n  return [...freq.entries()]\n    .sort((a, b) => b[1] - a[1]);\n}\nconsole.log(wordFrequency("${inputA.slice(0, 30)}"));`,
        output: sorted.slice(0, 3).map(([w, c]) => `"${w}":${c}`).join(", "),
        steps,
      };
    }

    case "twoSum": {
      const nums = inputA.split(",").map((s) => Number(s.trim())).filter((n) => !isNaN(n));
      const target = Number(inputB.trim()) || 9;
      const seen = new Map<number, number>();
      let result: [number, number] | null = null;
      const steps: PracticeStep[] = [
        { label: "Input", value: `[${nums.join(", ")}]` },
        { label: "Target", value: String(target) },
        { label: "Idea", value: "Store each num→index in Map; check if complement exists" },
      ];
      for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
          result = [seen.get(complement)!, i];
          steps.push({
            label: `i=${i}: ${nums[i]}`,
            value: `complement ${complement} found at idx ${seen.get(complement)} → [${result[0]}, ${result[1]}]`,
            highlight: true,
          });
          break;
        }
        steps.push({ label: `i=${i}: ${nums[i]}`, value: `complement=${complement} not found → store ${nums[i]}→${i}` });
        seen.set(nums[i], i);
      }
      if (!result) steps.push({ label: "Result", value: "No pair found", highlight: true });
      return {
        code: `function twoSum(nums, target) {\n  const seen = new Map(); // value → index\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (seen.has(complement))\n      return [seen.get(complement), i];\n    seen.set(nums[i], i);\n  }\n  return null; // no pair\n}\nconsole.log(twoSum([${nums.join(", ")}], ${target}));`,
        output: result ? `[${result[0]}, ${result[1]}]` : "null",
        steps,
      };
    }

    case "orderPreservation": {
      const steps: PracticeStep[] = [
        { label: "Keys inserted", value: '"10", "1", "2", "name"' },
        { label: "Object.keys()", value: '["1","2","10","name"]  ← integers sorted! ⚠️' },
        { label: "[...map.keys()]", value: '["10","1","2","name"]  ← insertion order ✅' },
        { label: "Why Object?", value: "JS engines sort integer-indexed keys ascending" },
        { label: "Impact", value: "for…in, Object.keys(), Object.entries() all follow this order" },
        { label: "Use Map when", value: "key order matters and keys may look like integers", highlight: true },
      ];
      return {
        code: `// Object sorts integer-like keys first\nconst obj = {};\nobj["10"] = "ten"; obj["1"] = "one";\nobj["2"]  = "two"; obj["name"] = "Alice";\nconsole.log("Object:", Object.keys(obj));\n// → ["1","2","10","name"]  ⚠️ reordered!\n\n// Map preserves insertion order always\nconst map = new Map();\nmap.set("10","ten"); map.set("1","one");\nmap.set("2","two");  map.set("name","Alice");\nconsole.log("Map:", [...map.keys()]);\n// → ["10","1","2","name"]  ✅`,
        output: 'Object: ["1","2","10","name"] | Map: ["10","1","2","name"]',
        steps,
      };
    }
  }
}

// ─── Constants ───────────────────────────────────────────────────────────────
const practiceLabel: Record<PracticeTab, string> = {
  wordFrequency:     "Word Frequency",
  twoSum:            "Two Sum",
  orderPreservation: "Order Preservation",
};

const practiceColor: Record<PracticeTab, string> = {
  wordFrequency:     "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  twoSum:            "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  orderPreservation: "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
};

// ─── Compare Section ─────────────────────────────────────────────────────────
function CompareSection() {
  const [input, setInput]               = useState("apple,banana,apple,cherry,banana,apple");
  const [objOutputLines, setObjOutput]  = useState<string[] | null>(null);
  const [mapOutputLines, setMapOutput]  = useState<string[] | null>(null);
  const [diffRows, setDiffRows]         = useState<DiffRow[]>([]);
  const [visibleRows, setVisibleRows]   = useState(0);
  const [running, setRunning]           = useState(false);
  const [hasRun, setHasRun]             = useState(false);

  const { objCode, mapCode } = buildOpsDemo(input);

  const clear = () => {
    setObjOutput(null);
    setMapOutput(null);
    setDiffRows([]);
    setVisibleRows(0);
    setRunning(false);
    setHasRun(false);
  };

  const handleRun = async () => {
    if (running) return;
    const result = buildOpsDemo(input);
    setObjOutput(result.objOutput);
    setMapOutput(result.mapOutput);
    setDiffRows(result.diffRows);
    setHasRun(true);
    setRunning(true);
    for (let i = 1; i <= result.diffRows.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 180));
      setVisibleRows(i);
    }
    setRunning(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Visualization
      </p>

      <div className="space-y-1">
        <p className="text-xs font-semibold text-muted-foreground">
          Words (comma-separated — run the same frequency counter with both)
        </p>
        <input
          value={input}
          onChange={(e) => { setInput(e.target.value); clear(); }}
          className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
          placeholder="e.g. apple,banana,apple,cherry"
        />
      </div>

      <Button size="sm" onClick={handleRun} disabled={running} className="w-full md:w-auto">
        <Play className="h-3.5 w-3.5 mr-1" />
        {running ? "Running…" : "Run"}
      </Button>

      {/* Side-by-side code + output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 mr-1.5 font-mono">
              Object
            </span>
            approach
          </p>
          <AnimatePresence mode="wait">
            <motion.pre
              key={objCode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[140px]"
            >
              {objCode}
            </motion.pre>
          </AnimatePresence>
          <p className="text-xs font-semibold text-muted-foreground">Output</p>
          <ConsoleOutput lines={objOutputLines} />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 mr-1.5 font-mono">
              Map
            </span>
            approach
          </p>
          <AnimatePresence mode="wait">
            <motion.pre
              key={mapCode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[140px]"
            >
              {mapCode}
            </motion.pre>
          </AnimatePresence>
          <p className="text-xs font-semibold text-muted-foreground">Output</p>
          <ConsoleOutput lines={mapOutputLines} />
        </div>
      </div>

      {/* Animated diff table */}
      {hasRun && diffRows.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground">Key Differences</p>
            <Button size="sm" variant="ghost" className="h-6 px-2 text-xs" onClick={clear}>
              <RotateCcw className="h-3 w-3 mr-1" /> Reset
            </Button>
          </div>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Feature</span>
              <span className="text-amber-600 dark:text-amber-400">Object</span>
              <span className="text-emerald-600 dark:text-emerald-400">Map</span>
            </div>
            {diffRows.slice(0, visibleRows).map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-3 border-t px-3 py-2"
              >
                <span className="font-semibold text-muted-foreground pr-2">{row.feature}</span>
                <span
                  className={`font-mono pr-2 ${
                    row.winner === "map"
                      ? "text-amber-600 dark:text-amber-400"
                      : row.winner === "obj"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : ""
                  }`}
                >
                  {row.obj}
                </span>
                <span
                  className={`font-mono ${
                    row.winner === "map"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : row.winner === "obj"
                      ? "text-amber-600 dark:text-amber-400"
                      : ""
                  }`}
                >
                  {row.map}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Practice Section ────────────────────────────────────────────────────────
function PracticeSection() {
  const [tab, setTab]                   = useState<PracticeTab>("wordFrequency");
  const [inputA, setInputA]             = useState("the cat sat on the mat the cat");
  const [inputB, setInputB]             = useState("");
  const [outputLines, setOutputLines]   = useState<string[] | null>(null);
  const [steps, setSteps]               = useState<PracticeStep[]>([]);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [running, setRunning]           = useState(false);

  const { code } = buildPractice(tab, inputA, inputB);

  const labelA: Record<PracticeTab, string> = {
    wordFrequency:     "Sentence or word list",
    twoSum:            "Array of numbers",
    orderPreservation: "(fixed demo)",
  };
  const labelB: Record<PracticeTab, string | null> = {
    wordFrequency:     null,
    twoSum:            "Target sum",
    orderPreservation: null,
  };

  const clearOutput = () => {
    setOutputLines(null);
    setSteps([]);
    setVisibleSteps(0);
    setRunning(false);
  };

  const handleTabChange = (key: PracticeTab) => {
    setTab(key);
    clearOutput();
    if (key === "wordFrequency")     { setInputA("the cat sat on the mat the cat"); setInputB(""); }
    if (key === "twoSum")            { setInputA("2,7,11,15"); setInputB("9"); }
    if (key === "orderPreservation") { setInputA(""); setInputB(""); }
  };

  const handleRun = async () => {
    if (running) return;
    const result = buildPractice(tab, inputA, inputB);
    setOutputLines([result.output]);
    setSteps(result.steps);
    setVisibleSteps(0);
    setRunning(true);
    for (let i = 1; i <= result.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 280));
      setVisibleSteps(i);
    }
    setRunning(false);
  };

  const isOrderTab = tab === "orderPreservation";

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Practice Problems
      </p>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(practiceLabel) as PracticeTab[]).map((key) => (
          <button
            key={key}
            onClick={() => handleTabChange(key)}
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

      <div className="flex flex-wrap gap-2 items-end">
        {!isOrderTab && (
          <div className="space-y-1 flex-1 min-w-[140px]">
            <p className="text-xs font-semibold text-muted-foreground">{labelA[tab]}</p>
            <input
              value={inputA}
              onChange={(e) => { setInputA(e.target.value); clearOutput(); }}
              className={`w-full rounded-lg border px-3 py-2 text-xs font-mono focus:outline-none ${practiceColor[tab]}`}
              placeholder="..."
              disabled={running}
            />
          </div>
        )}
        {labelB[tab] && (
          <div className="space-y-1 flex-1 min-w-[80px]">
            <p className="text-xs font-semibold text-muted-foreground">{labelB[tab]}</p>
            <input
              value={inputB}
              onChange={(e) => { setInputB(e.target.value); clearOutput(); }}
              className={`w-full rounded-lg border px-3 py-2 text-xs font-mono focus:outline-none ${practiceColor[tab]}`}
              placeholder="e.g. 9"
              disabled={running}
            />
          </div>
        )}
        <Button
          size="sm"
          onClick={handleRun}
          disabled={running || (!isOrderTab && !inputA)}
        >
          <Play className="h-3.5 w-3.5 mr-1" />
          {running ? "Running…" : "Run"}
        </Button>
        <Button size="sm" variant="outline" onClick={clearOutput} disabled={running}>
          <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
        </Button>
      </div>

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

      {steps.length > 0 && (
        <div className="rounded-xl border overflow-hidden text-xs">
          <div className="grid grid-cols-2 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
            <span>Step</span>
            <span>Value</span>
          </div>
          {steps.slice(0, visibleSteps).map((step, i) => (
            <motion.div
              key={`${i}-${step.label}`}
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

// ─── Main export ─────────────────────────────────────────────────────────────
export function ObjectsVsMapVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Objects vs Map</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <CompareSection />
        <Separator />
        <PracticeSection />
      </CardContent>
    </Card>
  );
}
