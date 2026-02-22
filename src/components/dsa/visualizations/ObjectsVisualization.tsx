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
type MethodTab   = "keyValue" | "access" | "loop";
type PracticeTab = "wordFreq" | "invertObj" | "findKey";

interface PracticeStep { label: string; value: string; highlight?: boolean }

// ─── Base Object ──────────────────────────────────────────────────────────────
const BASE: Record<string, string | number> = { name: "Alice", age: 28, city: "NYC" };
const BASE_CODE = `{ name: "Alice", age: 28, city: "NYC" }`;

// ─── Colors ───────────────────────────────────────────────────────────────────
const methodColor: Record<MethodTab, string> = {
  keyValue: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  access:   "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  loop:     "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
};

const methodLabel: Record<MethodTab, string> = {
  keyValue: "Key-Value Pairs",
  access:   "Accessing Properties",
  loop:     "Looping Objects",
};

const methodDesc: Record<MethodTab, string> = {
  keyValue: "Objects store data as key-value pairs. Add properties with obj.key = value and remove them with delete obj.key.",
  access:   "Use dot notation (obj.name) for known keys. Use bracket notation (obj['key'] or obj[var]) for dynamic or computed keys.",
  loop:     "for...in iterates all enumerable keys. Object.keys/values/entries return arrays — entries() gives [key, value] pairs, perfect for mapping and filtering.",
};

const practiceColor: Record<PracticeTab, string> = {
  wordFreq:  "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  invertObj: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  findKey:   "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
};

const practiceLabel: Record<PracticeTab, string> = {
  wordFreq:  "Word Frequency",
  invertObj: "Invert Object",
  findKey:   "Find Key by Value",
};

// ─── Build learn code + output ────────────────────────────────────────────────
function buildMethodResult(
  method: MethodTab,
  extra: string,
): { code: string; output: string[] } {
  switch (method) {
    case "keyValue": {
      const pipeIdx = extra.indexOf("|");
      const key = pipeIdx < 0 ? (extra.trim() || "email") : (extra.slice(0, pipeIdx).trim() || "email");
      const val = pipeIdx < 0 ? '"hello"' : (extra.slice(pipeIdx + 1).trim() || '"hello"');
      const updated = { ...BASE, [key]: val };
      return {
        code: `const person = ${BASE_CODE};\n\n// Add a property\nperson.${key} = ${val};\nconsole.log(person);\n\n// Delete a property\ndelete person.city;\nconsole.log(Object.keys(person));`,
        output: [
          JSON.stringify(updated),
          JSON.stringify(Object.keys(updated).filter((k) => k !== "city")),
        ],
      };
    }
    case "access": {
      const key = extra.trim() || "name";
      const hasKey = Object.prototype.hasOwnProperty.call(BASE, key);
      const val = hasKey ? JSON.stringify(BASE[key]) : "undefined";
      return {
        code: `const person = ${BASE_CODE};\n\n// Dot notation\nconsole.log(person.${key});\n\n// Bracket notation\nconsole.log(person[${JSON.stringify(key)}]);\n\n// Dynamic key\nconst field = ${JSON.stringify(key)};\nconsole.log(person[field]);`,
        output: [val, val, val],
      };
    }
    case "loop": {
      const keys   = Object.keys(BASE);
      const vals   = Object.values(BASE);
      const entries = Object.entries(BASE).map(([k, v]) => `["${k}",${JSON.stringify(v)}]`);
      return {
        code: `const person = ${BASE_CODE};\n\nconsole.log(Object.keys(person));\nconsole.log(Object.values(person));\nconsole.log(Object.entries(person));`,
        output: [
          JSON.stringify(keys),
          JSON.stringify(vals),
          `[${entries.join(", ")}]`,
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
    case "wordFreq": {
      const words = input.trim().split(/\s+/).filter(Boolean);
      const freq: Record<string, number> = {};
      const steps: PracticeStep[] = [{ label: "Input", value: JSON.stringify(input) }];
      for (const word of words) {
        freq[word] = (freq[word] || 0) + 1;
        steps.push({ label: `"${word}"`, value: `count → ${freq[word]}` });
      }
      steps.push({ label: "Result", value: JSON.stringify(freq), highlight: true });
      return {
        code: `function wordFrequency(sentence) {\n  const freq = {};\n  for (const word of sentence.split(" ")) {\n    freq[word] = (freq[word] || 0) + 1;\n  }\n  return freq;\n}\nconsole.log(wordFrequency(${JSON.stringify(input)}));`,
        output: JSON.stringify(freq),
        steps,
      };
    }
    case "invertObj": {
      const obj: Record<string, string> = {};
      for (const pair of input.split(",").map((s) => s.trim()).filter((s) => s.includes(":"))) {
        const colonIdx = pair.indexOf(":");
        const k = pair.slice(0, colonIdx).trim();
        const v = pair.slice(colonIdx + 1).trim();
        if (k) obj[k] = v;
      }
      const inverted: Record<string, string> = {};
      const steps: PracticeStep[] = [{ label: "Input", value: input }];
      for (const [k, v] of Object.entries(obj)) {
        inverted[v] = k;
        steps.push({ label: `"${k}": "${v}"`, value: `→ "${v}": "${k}"` });
      }
      steps.push({ label: "Result", value: JSON.stringify(inverted), highlight: true });
      const inputCode = `{ ${Object.entries(obj).map(([k, v]) => `${k}: "${v}"`).join(", ")} }`;
      return {
        code: `function invertObject(obj) {\n  const inv = {};\n  for (const [k, v] of Object.entries(obj)) {\n    inv[v] = k;\n  }\n  return inv;\n}\nconsole.log(invertObject(${inputCode}));`,
        output: JSON.stringify(inverted),
        steps,
      };
    }
    case "findKey": {
      const CAPITALS: Record<string, string> = { France: "Paris", Japan: "Tokyo", India: "Delhi", Egypt: "Cairo" };
      const target = input.trim();
      const steps: PracticeStep[] = [{ label: "Looking for", value: JSON.stringify(target) }];
      let found: string | null = null;
      for (const [k, v] of Object.entries(CAPITALS)) {
        if (v === target) {
          steps.push({ label: `"${k}": "${v}"`, value: "✅ Match!" });
          found = k;
          break;
        }
        steps.push({ label: `"${k}": "${v}"`, value: "❌ Skip" });
      }
      steps.push({
        label: "Result",
        value: found ? JSON.stringify(found) : "null",
        highlight: true,
      });
      const objCode = `{ France: "Paris", Japan: "Tokyo", India: "Delhi", Egypt: "Cairo" }`;
      return {
        code: `function findKeyByValue(obj, target) {\n  for (const [k, v] of Object.entries(obj)) {\n    if (v === target) return k;\n  }\n  return null;\n}\n\nconst capitals = ${objCode};\nconsole.log(findKeyByValue(capitals, ${JSON.stringify(target)}));`,
        output: found ? JSON.stringify(found) : "null",
        steps,
      };
    }
  }
}

// ─── Section 1: Object Methods ────────────────────────────────────────────────
function MethodsSection() {
  const [tab, setTab]   = useState<MethodTab>("keyValue");
  const [extra, setExtra] = useState<Record<MethodTab, string>>({
    keyValue: "email|alice@example.com",
    access:   "name",
    loop:     "",
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
    keyValue: { label: "new key|value", placeholder: "e.g. email|alice@example.com" },
    access:   { label: "key to look up",  placeholder: "e.g. name, age, city" },
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Object Concepts
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
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">Object</p>
            <div className={`w-full rounded-lg border px-3 py-2 text-xs font-mono ${methodColor[tab]}`}>
              {BASE_CODE}
            </div>
          </div>

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

          <div className={`rounded-lg border px-3 py-2 text-xs ${methodColor[tab]}`}>
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
  const [tab, setTab]   = useState<PracticeTab>("wordFreq");
  const [inputs, setInputs] = useState<Record<PracticeTab, string>>({
    wordFreq:  "the cat sat on the mat",
    invertObj: "a:1,b:2,c:3",
    findKey:   "Tokyo",
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
    wordFreq:  "sentence",
    invertObj: "key:value pairs (comma-separated)",
    findKey:   "value to search (try: Paris, Tokyo, Delhi, Cairo)",
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
export function ObjectsVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Objects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <MethodsSection />
        <Separator />
        <PracticeSection />
      </CardContent>
    </Card>
  );
}
