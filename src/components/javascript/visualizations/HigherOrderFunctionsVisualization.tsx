"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[52px]"
        >
          {lines.map((line, i) => (
            <p key={`${i}-${line}`} className="text-emerald-400">
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

// ─── types ────────────────────────────────────────────────────────────────────
type HOFTab = "takesFunction" | "returnsFunction" | "mapFilterReduce" | "composition";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<HOFTab, TabInfo> = {
  takesFunction: {
    label: "Takes a Function",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "A higher-order function that accepts another function as an argument. The passed function (callback) is invoked inside the higher-order function to customize its behavior.",
    codeSnippet: `function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

repeat(3, (i) => console.log("Hello #" + i));`,
    codeOutput: [
      "Hello #0",
      "Hello #1",
      "Hello #2",
    ],
  },
  returnsFunction: {
    label: "Returns a Function",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "A function that returns another function, creating a closure. The returned function remembers the variables from its parent scope, enabling powerful patterns like factories and partial application.",
    codeSnippet: `function multiplier(factor) {
  return (n) => n * factor;
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5));   // 10
console.log(triple(5));   // 15
console.log(double(10));  // 20`,
    codeOutput: [
      "double(5)  => 10",
      "triple(5)  => 15",
      "double(10) => 20",
    ],
  },
  mapFilterReduce: {
    label: "map / filter / reduce",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "The big three higher-order functions on arrays. map transforms each element, filter selects elements matching a condition, and reduce accumulates elements into a single value.",
    codeSnippet: `const nums = [1, 2, 3, 4, 5, 6];

const doubled  = nums.map(n => n * 2);
const evens    = nums.filter(n => n % 2 === 0);
const sum      = nums.reduce((acc, n) => acc + n, 0);

console.log("doubled:", doubled);
console.log("evens:",   evens);
console.log("sum:",     sum);`,
    codeOutput: [
      "doubled: [2, 4, 6, 8, 10, 12]",
      "evens:   [2, 4, 6]",
      "sum:     21",
    ],
  },
  composition: {
    label: "Function Composition",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Composing functions means combining two or more functions so the output of one becomes the input of the next. This creates a pipeline of transformations, keeping code declarative and reusable.",
    codeSnippet: `const compose = (f, g) => (x) => f(g(x));

const add1    = (x) => x + 1;
const double  = (x) => x * 2;

const doubleThenAdd1 = compose(add1, double);
const add1ThenDouble = compose(double, add1);

console.log(doubleThenAdd1(5)); // add1(double(5)) = 11
console.log(add1ThenDouble(5)); // double(add1(5)) = 12`,
    codeOutput: [
      "doubleThenAdd1(5) => 11  // add1(double(5))",
      "add1ThenDouble(5) => 12  // double(add1(5))",
    ],
  },
};

const order: HOFTab[] = ["takesFunction", "returnsFunction", "mapFilterReduce", "composition"];

// ─── Visual: Takes a Function ────────────────────────────────────────────────
function TakesFunctionVisual() {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    { label: "repeat(3, action) called", detail: "n = 3, action = (i) => log(...)" },
    { label: "i = 0 → action(0)", detail: 'logs "Hello #0"' },
    { label: "i = 1 → action(1)", detail: 'logs "Hello #1"' },
    { label: "i = 2 → action(2)", detail: 'logs "Hello #2"' },
    { label: "Loop complete", detail: "action was called 3 times" },
  ];

  const animate = async () => {
    setIsAnimating(true);
    setStep(0);
    for (let i = 0; i < steps.length; i++) {
      setStep(i);
      await new Promise<void>((r) => setTimeout(r, 700));
    }
    setIsAnimating(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={animate} disabled={isAnimating}>
          <Play className="h-3.5 w-3.5 mr-1" /> Trace Execution
        </Button>
        {isAnimating && (
          <Badge variant="secondary" className="animate-pulse text-[10px]">
            step {step + 1} / {steps.length}
          </Badge>
        )}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 space-y-2 min-h-[160px]">
        <AnimatePresence>
          {steps.slice(0, step + 1).map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-xs font-mono ${
                i === step
                  ? "bg-blue-500/15 border-blue-400/40 text-blue-700 dark:text-blue-300"
                  : "bg-muted/30 border-border text-muted-foreground"
              }`}
            >
              <span className="font-bold shrink-0">{i + 1}.</span>
              <div>
                <p className="font-semibold">{s.label}</p>
                <p className="opacity-75">{s.detail}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {step === 0 && !isAnimating && (
          <p className="text-xs text-muted-foreground text-center py-8">
            Click <strong>Trace Execution</strong> to step through the function call
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: Returns a Function ──────────────────────────────────────────────
function ReturnsFunctionVisual() {
  const [selectedFactor, setSelectedFactor] = useState<number | null>(null);
  const inputs = [1, 2, 3, 4, 5];
  const factors = [2, 3, 5];

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground">
        Pick a multiplier factor to see the returned function in action:
      </p>
      <div className="flex gap-2">
        {factors.map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFactor(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              selectedFactor === f
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            x{f}
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[120px]">
        {selectedFactor ? (
          <div className="space-y-2">
            <p className="text-xs font-mono text-muted-foreground mb-2">
              multiplier({selectedFactor}) returns (n) =&gt; n * {selectedFactor}
            </p>
            <div className="flex flex-wrap gap-2">
              {inputs.map((n) => (
                <motion.div
                  key={n}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: n * 0.08, duration: 0.2 }}
                  className="px-3 py-2 rounded-lg border bg-emerald-500/15 border-emerald-400/40 text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-300"
                >
                  {n} → {n * selectedFactor}
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-8">
            Select a factor above to see the returned function transform inputs
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: map / filter / reduce ───────────────────────────────────────────
function MapFilterReduceVisual() {
  const nums = [1, 2, 3, 4, 5, 6];
  const [activeOp, setActiveOp] = useState<"map" | "filter" | "reduce" | null>(null);

  const ops = [
    { key: "map" as const, label: "map(n => n * 2)", color: "violet" },
    { key: "filter" as const, label: "filter(n => n % 2 === 0)", color: "violet" },
    { key: "reduce" as const, label: "reduce((acc, n) => acc + n, 0)", color: "violet" },
  ];

  const getResult = () => {
    if (activeOp === "map") return nums.map((n) => n * 2);
    if (activeOp === "filter") return nums.filter((n) => n % 2 === 0);
    if (activeOp === "reduce") return [nums.reduce((acc, n) => acc + n, 0)];
    return [];
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {ops.map((op) => (
          <button
            key={op.key}
            onClick={() => setActiveOp(op.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all font-mono ${
              activeOp === op.key
                ? "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300 scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            .{op.key}()
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[140px] space-y-3">
        {/* Input array */}
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">Input Array</p>
          <div className="flex gap-1.5">
            {nums.map((n) => {
              const highlighted =
                activeOp === "filter" ? n % 2 === 0 : activeOp !== null;
              return (
                <motion.div
                  key={n}
                  animate={{
                    opacity: highlighted ? 1 : 0.4,
                    scale: highlighted ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`w-10 h-10 rounded-lg border flex items-center justify-center text-xs font-mono font-bold ${
                    highlighted
                      ? "bg-violet-500/15 border-violet-400/40 text-violet-700 dark:text-violet-300"
                      : "bg-muted/30 border-border text-muted-foreground"
                  }`}
                >
                  {n}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Arrow */}
        {activeOp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground text-lg"
          >
            ↓ <span className="text-xs font-mono">.{activeOp}()</span>
          </motion.div>
        )}

        {/* Result */}
        {activeOp && (
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">Result</p>
            <div className="flex gap-1.5">
              {getResult().map((n, i) => (
                <motion.div
                  key={`${activeOp}-${i}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.2 }}
                  className="w-10 h-10 rounded-lg border bg-violet-500 text-white flex items-center justify-center text-xs font-mono font-bold shadow-md"
                >
                  {n}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {!activeOp && (
          <p className="text-xs text-muted-foreground text-center py-6">
            Select an operation above to see how it transforms the array
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: Function Composition ────────────────────────────────────────────
function CompositionVisual() {
  const [inputVal, setInputVal] = useState<number | null>(null);
  const inputs = [3, 5, 7, 10];

  const add1 = (x: number) => x + 1;
  const double = (x: number) => x * 2;

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground">
        Pick an input to trace through compose(add1, double):
      </p>
      <div className="flex gap-2">
        {inputs.map((n) => (
          <button
            key={n}
            onClick={() => setInputVal(n)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              inputVal === n
                ? "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300 scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            x = {n}
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[120px]">
        {inputVal !== null ? (
          <div className="flex items-center gap-3 flex-wrap">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-3 py-2 rounded-lg border bg-orange-500/15 border-orange-400/40 text-xs font-mono font-bold text-orange-700 dark:text-orange-300"
            >
              x = {inputVal}
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              →
            </motion.span>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="px-3 py-2 rounded-lg border bg-orange-500/20 border-orange-400/40 text-xs font-mono text-orange-700 dark:text-orange-300"
            >
              double({inputVal}) = {double(inputVal)}
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-lg"
            >
              →
            </motion.span>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="px-3 py-2 rounded-lg border bg-orange-500 text-white text-xs font-mono font-bold shadow-md"
            >
              add1({double(inputVal)}) = {add1(double(inputVal))}
            </motion.div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-8">
            Select an input value above to trace the composition pipeline
          </p>
        )}
      </div>

      {inputVal !== null && (
        <p className="text-[11px] text-muted-foreground">
          compose(add1, double)({inputVal}) → add1(double({inputVal})) → add1({double(inputVal)}) → {add1(double(inputVal))}
        </p>
      )}
    </div>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────
const comparisonData = [
  { method: "map",     takes: "callback(el, i, arr)",      returns: "New array (same length)",   example: "[1,2,3].map(n => n * 2) → [2,4,6]" },
  { method: "filter",  takes: "callback(el, i, arr)",      returns: "New array (subset)",        example: "[1,2,3].filter(n => n > 1) → [2,3]" },
  { method: "reduce",  takes: "callback(acc, el, i), init", returns: "Single accumulated value", example: "[1,2,3].reduce((a,n) => a+n, 0) → 6" },
  { method: "forEach", takes: "callback(el, i, arr)",      returns: "undefined",                 example: "[1,2].forEach(n => console.log(n))" },
  { method: "find",    takes: "callback(el, i, arr)",      returns: "First matching element",    example: "[1,2,3].find(n => n > 1) → 2" },
  { method: "some",    takes: "callback(el, i, arr)",      returns: "boolean (any match?)",      example: "[1,2,3].some(n => n > 2) → true" },
  { method: "every",   takes: "callback(el, i, arr)",      returns: "boolean (all match?)",      example: "[1,2,3].every(n => n > 0) → true" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function HigherOrderFunctionsVisualization() {
  const [selected, setSelected] = useState<HOFTab>("takesFunction");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: HOFTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Higher-Order Functions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Group selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const t = tabs[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? t.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Animated detail area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Description banner */}
            <div className={`rounded-xl border px-4 py-3 text-sm ${tab.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{tab.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${tab.badgeColor}`}>
                  higher-order
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{tab.description}</p>
            </div>

            {/* Two-column: visual | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Visual */}
              <div>
                {selected === "takesFunction" && <TakesFunctionVisual />}
                {selected === "returnsFunction" && <ReturnsFunctionVisual />}
                {selected === "mapFilterReduce" && <MapFilterReduceVisual />}
                {selected === "composition" && <CompositionVisual />}
              </div>

              {/* Right: Code + Output */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {tab.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={() => setOutputLines(tab.codeOutput)}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                  <ConsoleOutput lines={outputLines} />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Comparison Table */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold">Common Higher-Order Functions</h3>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Method</th>
                  <th className="px-3 py-2 text-left font-semibold">Takes</th>
                  <th className="px-3 py-2 text-left font-semibold">Returns</th>
                  <th className="px-3 py-2 text-left font-semibold">Example</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr key={row.method} className="border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="px-3 py-2 font-mono font-bold text-violet-700 dark:text-violet-300">
                      .{row.method}()
                    </td>
                    <td className="px-3 py-2 font-mono text-muted-foreground">{row.takes}</td>
                    <td className="px-3 py-2">{row.returns}</td>
                    <td className="px-3 py-2 font-mono text-muted-foreground">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
