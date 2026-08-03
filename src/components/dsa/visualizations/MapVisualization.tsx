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
type MethodTab   = "create" | "iterate" | "vsObject";
type PracticeTab = "charFreq" | "twoSum" | "firstNonRepeat";

interface PracticeStep { label: string; value: string; highlight?: boolean }

// ─── Colors ───────────────────────────────────────────────────────────────────
const methodColor: Record<MethodTab, string> = {
  create:   "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  iterate:  "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  vsObject: "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
};

const methodLabel: Record<MethodTab, string> = {
  create:   "Create & Mutate",
  iterate:  "Iteration",
  vsObject: "Map vs Object",
};

const methodDesc: Record<MethodTab, string> = {
  create:
    "set() adds/updates an entry and returns the Map (chainable). get() returns the value or undefined. has() is a fast O(1) boolean check. delete() removes one entry. clear() removes all. size is a property, not a function.",
  iterate:
    "Iterate with for...of + destructuring. forEach(val, key) — note value comes FIRST. keys(), values(), entries() return iterators; spread with [...] to get arrays. Convert: new Map(Object.entries(obj)) ↔ Object.fromEntries(map).",
  vsObject:
    "Plain objects coerce all keys to strings — obj[1] and obj['1'] are the same slot. Map preserves key type: map.get(1) and map.get('1') are distinct. Map also has O(1) .size and no prototype chain pollution.",
};

const practiceColor: Record<PracticeTab, string> = {
  charFreq:      "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  twoSum:        "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  firstNonRepeat: "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
};

const practiceLabel: Record<PracticeTab, string> = {
  charFreq:      "Char Frequency",
  twoSum:        "Two Sum",
  firstNonRepeat: "First Non-Repeating",
};

// ─── Build learn code + output ────────────────────────────────────────────────
function buildMethodResult(
  method: MethodTab,
  extra: string,
): { code: string; output: string[] } {
  switch (method) {
    case "create": {
      const pipeIdx = extra.indexOf("|");
      const key = pipeIdx < 0 ? (extra.trim() || "score") : (extra.slice(0, pipeIdx).trim() || "score");
      const val = pipeIdx < 0 ? "100" : (extra.slice(pipeIdx + 1).trim() || "100");

      const baseMap = new Map<string, string | number>([["name", "Alice"], ["age", 28], ["city", "NYC"]]);
      baseMap.set(key, val);
      const sizeAfterSet = baseMap.size;
      baseMap.delete("city");
      const sizeAfterDel = baseMap.size;

      return {
        code: `const map = new Map([["name","Alice"],["age",28],["city","NYC"]]);\n\n// .set(key, value) — returns the Map\nmap.set(${JSON.stringify(key)}, ${JSON.stringify(val)});\nconsole.log("size:", map.size);       // ${sizeAfterSet}\n\n// .get(key)\nconsole.log(map.get(${JSON.stringify(key)}));  // ${JSON.stringify(val)}\nconsole.log(map.get("x"));    // undefined\n\n// .has(key)\nconsole.log(map.has("age"));  // true\nconsole.log(map.has("x"));    // false\n\n// .delete(key)\nmap.delete("city");\nconsole.log("size:", map.size);       // ${sizeAfterDel}\n\n// .clear() — removes all\n// map.clear(); → map.size === 0`,
        output: [
          `size after set: ${sizeAfterSet}`,
          `get(${JSON.stringify(key)}) = ${JSON.stringify(val)}`,
          `get("x") = undefined`,
          `has("age") = true`,
          `has("x") = false`,
          `size after delete("city"): ${sizeAfterDel}`,
        ],
      };
    }

    case "iterate": {
      const entries: [string, number][] = [["math", 95], ["science", 88], ["english", 92]];
      const keys   = entries.map(([k]) => k);
      const vals   = entries.map(([, v]) => v);
      const ent    = entries.map(([k, v]) => `["${k}",${v}]`);

      return {
        code: `const scores = new Map([["math",95],["science",88],["english",92]]);\n\n// for...of with destructuring\nfor (const [key, val] of scores) {\n  console.log(key, val);\n}\n\n// forEach — (value, key) — value is FIRST!\nscores.forEach((val, key) => console.log(key, "→", val));\n\n// Iterators → arrays with spread\nconsole.log([...scores.keys()]);\nconsole.log([...scores.values()]);\nconsole.log([...scores.entries()]);\n\n// Convert Object ↔ Map\nconst obj = { x: 1, y: 2 };\nconst m = new Map(Object.entries(obj));\nconst back = Object.fromEntries(scores);`,
        output: [
          `keys:    ${JSON.stringify(keys)}`,
          `values:  ${JSON.stringify(vals)}`,
          `entries: [${ent.join(", ")}]`,
        ],
      };
    }

    case "vsObject": {
      return {
        code: `// Object coerces ALL keys to strings\nconst obj = {};\nobj[1]   = "number key";\nobj["1"] = "string key";\nconsole.log(obj[1]);    // "string key" — coerced!\n\n// Map preserves key type\nconst map = new Map();\nmap.set(1, "number key");\nmap.set("1", "string key");\nconsole.log(map.get(1));    // "number key" ✅\nconsole.log(map.get("1")); // "string key" ✅\n\n// size: O(1) vs Object.keys().length: O(n)\nconsole.log(map.size);              // 2 — instant!\nconsole.log(Object.keys(obj).length); // 1 — scans all keys\n\n// Map has no prototype pollution\nconsole.log("toString" in obj); // true  ← dangerous\nconsole.log(map.has("toString")); // false ✅`,
        output: [
          `obj[1] = "string key"  ← number 1 coerced to "1"`,
          `map.get(1) = "number key"  ← number key preserved ✅`,
          `map.get("1") = "string key"  ← distinct from 1 ✅`,
          `map.size = 2  ← O(1), always current`,
          `"toString" in obj → true  ← prototype pollution risk`,
          `map.has("toString") → false  ← no prototype chain ✅`,
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
    case "charFreq": {
      const freq = new Map<string, number>();
      const steps: PracticeStep[] = [{ label: "Input", value: JSON.stringify(input) }];
      for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        freq.set(ch, (freq.get(ch) || 0) + 1);
        steps.push({ label: `[${i}] '${ch}'`, value: `count → ${freq.get(ch)}` });
      }
      const sorted = Array.from(freq.entries()).sort((a, b) => b[1] - a[1]);
      steps.push({ label: "Result (sorted)", value: sorted.map(([c, n]) => `'${c}':${n}`).join("  "), highlight: true });
      return {
        code: `function charFrequency(str) {\n  const freq = new Map();\n  for (const ch of str) {\n    freq.set(ch, (freq.get(ch) || 0) + 1);\n  }\n  return [...freq.entries()].sort((a, b) => b[1] - a[1]);\n}\nconsole.log(charFrequency(${JSON.stringify(input)}));`,
        output: JSON.stringify(sorted),
        steps,
      };
    }

    case "twoSum": {
      const pipeIdx = input.indexOf("|");
      const numsRaw  = pipeIdx < 0 ? input : input.slice(0, pipeIdx);
      const targetRaw = pipeIdx < 0 ? "9" : input.slice(pipeIdx + 1).trim();
      const nums   = numsRaw.split(",").map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n));
      const target = parseInt(targetRaw, 10) || 9;

      const seen = new Map<number, number>();
      const steps: PracticeStep[] = [
        { label: "Input", value: `nums=${JSON.stringify(nums)}, target=${target}` },
      ];
      let result: [number, number] | null = null;

      for (let i = 0; i < nums.length; i++) {
        const need = target - nums[i];
        if (seen.has(need)) {
          const foundIdx = seen.get(need)!;
          steps.push({
            label: `i=${i}  num=${nums[i]}  need=${need}`,
            value: `✅ found at index ${foundIdx} → return [${foundIdx}, ${i}]`,
          });
          result = [foundIdx, i];
          break;
        }
        steps.push({
          label: `i=${i}  num=${nums[i]}  need=${need}`,
          value: `❌ not in map → store { ${nums[i]}: ${i} }`,
        });
        seen.set(nums[i], i);
      }

      const resultStr = result ? JSON.stringify(result) : "null (no solution)";
      steps.push({ label: "Result", value: resultStr, highlight: true });

      return {
        code: `function twoSum(nums, target) {\n  const seen = new Map(); // { value → index }\n  for (let i = 0; i < nums.length; i++) {\n    const need = target - nums[i];\n    if (seen.has(need)) return [seen.get(need), i];\n    seen.set(nums[i], i);\n  }\n  return null;\n}\nconsole.log(twoSum(${JSON.stringify(nums)}, ${target}));`,
        output: resultStr,
        steps,
      };
    }

    case "firstNonRepeat": {
      const freq = new Map<string, number>();
      for (const ch of input) freq.set(ch, (freq.get(ch) || 0) + 1);

      const freqDisplay = Array.from(freq.entries()).map(([c, n]) => `'${c}':${n}`).join("  ");
      const steps: PracticeStep[] = [
        { label: "Input", value: JSON.stringify(input) },
        { label: "Frequency map", value: freqDisplay },
      ];

      let found: string | null = null;
      for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        const count = freq.get(ch)!;
        if (count === 1) {
          steps.push({ label: `[${i}] '${ch}'`, value: `count=1 ✅ first non-repeating!` });
          found = ch;
          break;
        }
        steps.push({ label: `[${i}] '${ch}'`, value: `count=${count} ❌ skip` });
      }

      const resultStr = found ? JSON.stringify(found) : "null";
      steps.push({ label: "Result", value: resultStr, highlight: true });

      return {
        code: `function firstNonRepeating(str) {\n  const freq = new Map();\n  // Pass 1: count\n  for (const ch of str) freq.set(ch, (freq.get(ch) || 0) + 1);\n  // Pass 2: find first with count 1\n  for (const ch of str) {\n    if (freq.get(ch) === 1) return ch;\n  }\n  return null;\n}\nconsole.log(firstNonRepeating(${JSON.stringify(input)}));`,
        output: resultStr,
        steps,
      };
    }
  }
}

// ─── Section 1: Map Methods ───────────────────────────────────────────────────
function MethodsSection() {
  const [tab, setTab]   = useState<MethodTab>("create");
  const [extra, setExtra] = useState<Record<MethodTab, string>>({
    create:   "score|99",
    iterate:  "",
    vsObject: "",
  });
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const clearOutput = () => setOutputLines(null);
  const currentExtra = extra[tab];
  const { code } = buildMethodResult(tab, currentExtra);

  const handleRun = () => {
    const { output } = buildMethodResult(tab, currentExtra);
    setOutputLines(output);
  };

  const extraConfig: Partial<Record<MethodTab, { label: string; placeholder: string }>> = {
    create: { label: "new key|value to set", placeholder: "e.g. score|99  or  role|admin" },
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Map Methods
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
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground">Base Map</p>
              <div className={`w-full rounded-lg border px-3 py-2 text-xs font-mono ${methodColor[tab]}`}>
                {`new Map([["name","Alice"],["age",28],["city","NYC"]])`}
              </div>
            </div>
          )}

          {extraConfig[tab] && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground">{extraConfig[tab]!.label}</p>
              <input
                value={currentExtra}
                onChange={(e) => { setExtra((p) => ({ ...p, [tab]: e.target.value })); clearOutput(); }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                placeholder={extraConfig[tab]!.placeholder}
              />
            </div>
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
  const [tab, setTab]   = useState<PracticeTab>("charFreq");
  const [inputs, setInputs] = useState<Record<PracticeTab, string>>({
    charFreq:      "hello",
    twoSum:        "2,7,11,15|9",
    firstNonRepeat: "leetcode",
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
    charFreq:      "string",
    twoSum:        "nums|target  (e.g. 2,7,11,15|9)",
    firstNonRepeat: "string",
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
export function MapVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Map</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <MethodsSection />
        <Separator />
        <PracticeSection />
      </CardContent>
    </Card>
  );
}
