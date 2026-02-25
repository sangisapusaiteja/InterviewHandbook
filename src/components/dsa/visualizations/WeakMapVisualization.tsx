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
  map: string;
  weakmap: string;
  winner: "map" | "weakmap" | "tie";
}

interface PracticeStep {
  label: string;
  value: string;
  highlight?: boolean;
}

type PracticeTab = "privateClass" | "memoize" | "invalidKey";

// ─── Build comparison demo ────────────────────────────────────────────────────
function buildDemo(instanceName: string, secretValue: string): {
  exposedCode: string;
  privateCode: string;
  exposedOutput: string[];
  privateOutput: string[];
  diffRows: DiffRow[];
} {
  const name   = instanceName.trim() || "Alice";
  const secret = secretValue.trim()  || "secret123";

  const exposedCode =
    `// Without WeakMap — data is exposed\nclass User {\n  constructor(name, token) {\n    this.name   = name;\n    this._token = token; // ⚠️ readable by anyone\n  }\n  verify(t) { return this._token === t; }\n}\nconst user = new User("${name}", "${secret}");\nconsole.log(user.name);             // "${name}"\nconsole.log(user._token);           // "${secret}" ⚠️\nconsole.log(user.verify("${secret}")); // true`;

  const privateCode =
    `// With WeakMap — data is truly private\nconst _priv = new WeakMap();\nclass User {\n  constructor(name, token) {\n    this.name = name;\n    _priv.set(this, { token }); // hidden!\n  }\n  verify(t) { return _priv.get(this).token === t; }\n}\nconst user = new User("${name}", "${secret}");\nconsole.log(user.name);             // "${name}"\nconsole.log(user._token);           // undefined ✅\nconsole.log(user.verify("${secret}")); // true`;

  const exposedOutput = [
    `name: "${name}"`,
    `_token: "${secret}"  ⚠️ exposed!`,
    `verify("${secret}"): true`,
  ];

  const privateOutput = [
    `name: "${name}"`,
    `_token: undefined  ✅ private!`,
    `verify("${secret}"): true`,
  ];

  const diffRows: DiffRow[] = [
    {
      feature: "Key types",
      map:     "any value",
      weakmap: "objects (or non-reg. Symbol) only",
      winner:  "tie",
    },
    {
      feature: ".size",
      map:     "✅ map.size  O(1)",
      weakmap: "❌ not available",
      winner:  "map",
    },
    {
      feature: "Iterable",
      map:     "✅ for…of / .forEach / .keys()",
      weakmap: "❌ not iterable (by design)",
      winner:  "map",
    },
    {
      feature: "GC of keys",
      map:     "prevents GC (strong ref) ⚠️",
      weakmap: "allows GC (weak ref) ✅",
      winner:  "weakmap",
    },
    {
      feature: "Memory leaks",
      map:     "possible with object keys ⚠️",
      weakmap: "impossible — auto-cleans ✅",
      winner:  "weakmap",
    },
    {
      feature: "Private data",
      map:     "❌ keys are inspectable",
      weakmap: "✅ non-enumerable, hidden",
      winner:  "weakmap",
    },
    {
      feature: "Best for",
      map:     "general KV, need .size / iteration",
      weakmap: "private props, DOM cache, memoize",
      winner:  "tie",
    },
  ];

  return { exposedCode, privateCode, exposedOutput, privateOutput, diffRows };
}

// ─── Build practice ──────────────────────────────────────────────────────────
function buildPractice(
  tab: PracticeTab,
  inputA: string,
): { code: string; output: string; steps: PracticeStep[] } {
  switch (tab) {
    case "privateClass": {
      const secretVal = inputA.trim() || "TopSecret42";
      const steps: PracticeStep[] = [
        { label: "Goal",              value: "Store a value that can't be reached via the instance" },
        { label: "Step 1",            value: "const _priv = new WeakMap() — module-level" },
        { label: "Step 2 (ctor)",     value: `_priv.set(this, "${secretVal}") — bound to this instance` },
        { label: "user._secret",      value: "undefined  ← not a property ✅" },
        { label: "user.getSecret()",  value: `_priv.get(this) → "${secretVal}"  ✅` },
        { label: "When user is GC'd", value: "WeakMap entry disappears automatically ✅", highlight: true },
      ];
      return {
        code: `const _priv = new WeakMap();\n\nclass User {\n  constructor(name, secret) {\n    this.name = name;\n    _priv.set(this, secret); // truly private\n  }\n  getSecret() {\n    return _priv.get(this);\n  }\n}\n\nconst user = new User("Alice", "${secretVal}");\nconsole.log(user.name);        // "Alice"\nconsole.log(user._secret);     // undefined ✅\nconsole.log(user.getSecret()); // "${secretVal}"`,
        output: `"Alice", undefined, "${secretVal}"`,
        steps,
      };
    }

    case "memoize": {
      const nums = inputA.split(",").map((s) => Number(s.trim())).filter((n) => !isNaN(n)).slice(0, 8);
      const safeNums = nums.length >= 1 ? nums : [2, 3, 4, 5];
      const result = safeNums.reduce((s, n) => s + n * n, 0);
      const steps: PracticeStep[] = [
        { label: "Input array", value: `[${safeNums.join(", ")}]` },
        { label: "Call 1",      value: "cache.has(arr) → false → compute" },
      ];
      safeNums.forEach((n) => steps.push({ label: `  ${n}²`, value: `${n * n}` }));
      steps.push({ label: "Sum of squares",      value: String(result) });
      steps.push({ label: "cache.set(arr, res)", value: `cached: ${result}` });
      steps.push({ label: "Call 2", value: "cache.has(arr) → true → skip compute", highlight: true });
      steps.push({ label: "Return",  value: `${result}  (no recomputation!)`, highlight: true });
      return {
        code: `const cache = new WeakMap();\n\nfunction sumSquares(arr) {\n  if (cache.has(arr)) return cache.get(arr); // O(1)\n  const result = arr.reduce((s, n) => s + n * n, 0);\n  cache.set(arr, result);\n  return result;\n}\n\nconst nums = [${safeNums.join(", ")}];\nconsole.log(sumSquares(nums)); // computed: ${result}\nconsole.log(sumSquares(nums)); // cache hit: ${result}`,
        output: `${result} (computed), ${result} (cached)`,
        steps,
      };
    }

    case "invalidKey": {
      const steps: PracticeStep[] = [
        { label: "Rule",              value: "WeakMap keys must be objects (or non-reg. Symbol)" },
        { label: "{ id: 1 } → .set", value: "✅ object — works" },
        { label: '"string" → .set',  value: "❌ TypeError: Invalid value used as weak map key" },
        { label: "null → .set",      value: "❌ TypeError: Invalid value used as weak map key" },
        { label: "42 → .set",        value: "❌ TypeError: Invalid value used as weak map key" },
        { label: "true → .set",      value: "❌ TypeError: Invalid value used as weak map key" },
        { label: "Why?",             value: "Primitives have no heap identity — GC can't track 'weakness'", highlight: true },
      ];
      return {
        code: `const wm = new WeakMap();\n\n// ✅ valid: object key\nconst obj = { id: 1 };\nwm.set(obj, "works");\nconsole.log(wm.get(obj)); // "works"\n\n// ❌ primitive keys all throw TypeError\ntry { wm.set("string", "x"); } catch(e) { console.log("string key:", e.message); }\ntry { wm.set(null,   "x"); }   catch(e) { console.log("null key:",   e.message); }\ntry { wm.set(42,     "x"); }   catch(e) { console.log("42 key:",     e.message); }\ntry { wm.set(true,   "x"); }   catch(e) { console.log("true key:",   e.message); }`,
        output: '"works", TypeError ×4',
        steps,
      };
    }
  }
}

// ─── Constants ───────────────────────────────────────────────────────────────
const practiceLabel: Record<PracticeTab, string> = {
  privateClass: "Private Class Data",
  memoize:      "Memoization",
  invalidKey:   "Invalid Keys",
};

const practiceColor: Record<PracticeTab, string> = {
  privateClass: "bg-purple-500/15 border-purple-500/40 text-purple-700 dark:text-purple-300",
  memoize:      "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  invalidKey:   "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300",
};

// ─── Compare Section ─────────────────────────────────────────────────────────
function CompareSection() {
  const [instanceName, setInstanceName] = useState("Alice");
  const [secretValue,  setSecretValue]  = useState("secret123");
  const [exposedOut,   setExposedOut]   = useState<string[] | null>(null);
  const [privateOut,   setPrivateOut]   = useState<string[] | null>(null);
  const [diffRows,     setDiffRows]     = useState<DiffRow[]>([]);
  const [visibleRows,  setVisibleRows]  = useState(0);
  const [running,      setRunning]      = useState(false);
  const [hasRun,       setHasRun]       = useState(false);

  const { exposedCode, privateCode } = buildDemo(instanceName, secretValue);

  const clear = () => {
    setExposedOut(null);
    setPrivateOut(null);
    setDiffRows([]);
    setVisibleRows(0);
    setRunning(false);
    setHasRun(false);
  };

  const handleRun = async () => {
    if (running) return;
    const result = buildDemo(instanceName, secretValue);
    setExposedOut(result.exposedOutput);
    setPrivateOut(result.privateOutput);
    setDiffRows(result.diffRows);
    setHasRun(true);
    setRunning(true);
    for (let i = 1; i <= result.diffRows.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 200));
      setVisibleRows(i);
    }
    setRunning(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Visualization
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground">Instance name</p>
          <input
            value={instanceName}
            onChange={(e) => { setInstanceName(e.target.value); clear(); }}
            className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
            placeholder="e.g. Alice"
          />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground">Private value to hide</p>
          <input
            value={secretValue}
            onChange={(e) => { setSecretValue(e.target.value); clear(); }}
            className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
            placeholder="e.g. secret123"
          />
        </div>
      </div>

      <Button size="sm" onClick={handleRun} disabled={running} className="w-full md:w-auto">
        <Play className="h-3.5 w-3.5 mr-1" />
        {running ? "Running…" : "Run"}
      </Button>

      {/* Side-by-side code + output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">
            <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-700 dark:text-red-300 mr-1.5 font-mono">
              Without WeakMap
            </span>
            data exposed
          </p>
          <AnimatePresence mode="wait">
            <motion.pre
              key={exposedCode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[160px]"
            >
              {exposedCode}
            </motion.pre>
          </AnimatePresence>
          <p className="text-xs font-semibold text-muted-foreground">Output</p>
          <ConsoleOutput lines={exposedOut} />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">
            <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300 mr-1.5 font-mono">
              With WeakMap
            </span>
            truly private
          </p>
          <AnimatePresence mode="wait">
            <motion.pre
              key={privateCode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[160px]"
            >
              {privateCode}
            </motion.pre>
          </AnimatePresence>
          <p className="text-xs font-semibold text-muted-foreground">Output</p>
          <ConsoleOutput lines={privateOut} />
        </div>
      </div>

      {/* Animated diff table */}
      {hasRun && diffRows.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground">Map vs WeakMap</p>
            <Button size="sm" variant="ghost" className="h-6 px-2 text-xs" onClick={clear}>
              <RotateCcw className="h-3 w-3 mr-1" /> Reset
            </Button>
          </div>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Feature</span>
              <span className="text-amber-600 dark:text-amber-400">Map</span>
              <span className="text-purple-600 dark:text-purple-400">WeakMap</span>
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
                    row.winner === "weakmap"
                      ? "text-amber-600 dark:text-amber-400"
                      : row.winner === "map"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : ""
                  }`}
                >
                  {row.map}
                </span>
                <span
                  className={`font-mono ${
                    row.winner === "weakmap"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : row.winner === "map"
                      ? "text-amber-600 dark:text-amber-400"
                      : ""
                  }`}
                >
                  {row.weakmap}
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
  const [tab,          setTab]          = useState<PracticeTab>("privateClass");
  const [inputA,       setInputA]       = useState("TopSecret42");
  const [outputLines,  setOutputLines]  = useState<string[] | null>(null);
  const [steps,        setSteps]        = useState<PracticeStep[]>([]);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [running,      setRunning]      = useState(false);

  const { code } = buildPractice(tab, inputA);

  const labelA: Record<PracticeTab, string | null> = {
    privateClass: "Secret value to hide",
    memoize:      "Numbers (comma-separated)",
    invalidKey:   null,
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
    if (key === "privateClass") setInputA("TopSecret42");
    if (key === "memoize")      setInputA("2,3,4,5");
    if (key === "invalidKey")   setInputA("");
  };

  const handleRun = async () => {
    if (running) return;
    const result = buildPractice(tab, inputA);
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

  const isFixed = tab === "invalidKey";

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
        {!isFixed && labelA[tab] && (
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
        <Button
          size="sm"
          onClick={handleRun}
          disabled={running || (!isFixed && !inputA)}
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
export function WeakMapVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">WeakMap</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <CompareSection />
        <Separator />
        <PracticeSection />
      </CardContent>
    </Card>
  );
}
