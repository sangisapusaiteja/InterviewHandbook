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
            <p key={`${line}-${i}`} className="text-emerald-400">
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
type ModuleTab = "namedExports" | "defaultExport" | "dynamicImport" | "cjsVsEsm";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<ModuleTab, GroupInfo> = {
  namedExports: {
    label: "Named Exports",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Named exports let you export multiple values from a module. Each export must be imported by its exact name, wrapped in curly braces.",
    codeSnippet: `// math.js
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export function multiply(a, b) {
  return a * b;
}

// app.js
import { PI, add, multiply } from "./math.js";

console.log("PI:", PI);
console.log("add(2, 3):", add(2, 3));
console.log("multiply(4, 5):", multiply(4, 5));`,
    codeOutput: [
      "PI: 3.14159",
      "add(2, 3): 5",
      "multiply(4, 5): 20",
    ],
  },
  defaultExport: {
    label: "Default Export",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Each module can have one default export. When importing, you can use any name you like -- no curly braces needed.",
    codeSnippet: `// logger.js
export default function logger(msg) {
  return "[LOG] " + msg;
}

// app.js -- import with any name
import log from "./logger.js";

console.log(log("Server started"));
console.log(log("Listening on port 3000"));

// You can also combine default + named
// import log, { version } from "./logger.js";`,
    codeOutput: [
      "[LOG] Server started",
      "[LOG] Listening on port 3000",
    ],
  },
  dynamicImport: {
    label: "Dynamic Import",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Dynamic import() returns a Promise, enabling code splitting and lazy loading. Modules are loaded only when needed at runtime.",
    codeSnippet: `// Load a module on demand
async function loadChart() {
  const { renderChart } = await import("./chart.js");
  renderChart("#app");
}

console.log("App loaded");
console.log("User clicks 'Show Chart'...");

// Simulating dynamic import
loadChart().then(() => {
  console.log("Chart module loaded!");
  console.log("Chart rendered successfully");
});`,
    codeOutput: [
      "App loaded",
      "User clicks 'Show Chart'...",
      "Chart module loaded!",
      "Chart rendered successfully",
    ],
  },
  cjsVsEsm: {
    label: "CommonJS vs ESM",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "CommonJS (require/module.exports) is Node.js's original module system. ES Modules (import/export) is the modern standard supported by browsers and Node.js.",
    codeSnippet: `// ── CommonJS ──
// math.cjs
const add = (a, b) => a + b;
module.exports = { add };

// app.cjs
const { add } = require("./math.cjs");
console.log("CJS add(1, 2):", add(1, 2));

// ── ES Modules ──
// math.mjs
export const multiply = (a, b) => a * b;

// app.mjs
import { multiply } from "./math.mjs";
console.log("ESM multiply(3, 4):", multiply(3, 4));`,
    codeOutput: [
      "CJS add(1, 2): 3",
      "ESM multiply(3, 4): 12",
    ],
  },
};

const order: ModuleTab[] = ["namedExports", "defaultExport", "dynamicImport", "cjsVsEsm"];

// ─── file diagram items for Named Exports visual ─────────────────────────────
const moduleExports = [
  { name: "PI", type: "const" },
  { name: "add", type: "function" },
  { name: "multiply", type: "function" },
];

const appImports = [
  { name: "PI", type: "const" },
  { name: "add", type: "function" },
  { name: "multiply", type: "function" },
];

// ─── comparison table data ───────────────────────────────────────────────────
const comparisonRows = [
  {
    feature: "Syntax",
    commonjs: "require / module.exports",
    esm: "import / export",
  },
  {
    feature: "Loading",
    commonjs: "Synchronous",
    esm: "Asynchronous",
  },
  {
    feature: "Tree-shaking",
    commonjs: "Not supported",
    esm: "Supported",
  },
  {
    feature: "Browser Support",
    commonjs: "No (bundler needed)",
    esm: "Yes (native)",
  },
  {
    feature: "Default",
    commonjs: "module.exports = value",
    esm: "export default value",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function ModulesVisualization() {
  const [selected, setSelected] = useState<ModuleTab>("namedExports");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [animating, setAnimating] = useState(false);
  const [activeArrow, setActiveArrow] = useState<number | null>(null);

  const group = groups[selected];

  const handleSelect = (key: ModuleTab) => {
    setSelected(key);
    setOutputLines(null);
    setActiveArrow(null);
    setAnimating(false);
  };

  const runArrowAnimation = async () => {
    setAnimating(true);
    for (let i = 0; i < moduleExports.length; i++) {
      setActiveArrow(i);
      await new Promise((r) => setTimeout(r, 800));
    }
    setActiveArrow(null);
    setAnimating(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Modules (import/export)</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Group selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const g = groups[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? g.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {g.label}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${group.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{group.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${group.badgeColor}`}>
                  module
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{group.description}</p>
            </div>

            {/* Code + Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Code */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {group.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={() => setOutputLines(group.codeOutput)}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
              </div>

              {/* Right: Output */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>

            {/* Interactive visual for Named Exports */}
            {selected === "namedExports" && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Export / Import Flow
                </p>
                <div className="rounded-xl border bg-muted/20 px-4 py-5">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    {/* module.js file */}
                    <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 px-4 py-3 min-w-[160px]">
                      <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2 font-mono">
                        module.js
                      </p>
                      <div className="space-y-1.5">
                        {moduleExports.map((item, idx) => (
                          <motion.div
                            key={item.name}
                            animate={{
                              scale: activeArrow === idx ? 1.08 : 1,
                              boxShadow:
                                activeArrow === idx
                                  ? "0 0 12px rgba(59,130,246,0.5)"
                                  : "0 0 0px transparent",
                            }}
                            transition={{ duration: 0.25 }}
                            className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-all ${
                              activeArrow === idx
                                ? "bg-blue-500 text-white ring-2 ring-offset-1 ring-offset-background ring-blue-400"
                                : "bg-muted border border-border text-muted-foreground"
                            }`}
                          >
                            <span className="opacity-60">export </span>
                            <span className="font-bold">{item.name}</span>
                            <span className="text-[10px] ml-1 opacity-50">({item.type})</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Arrows */}
                    <div className="flex flex-col items-center gap-1.5">
                      {moduleExports.map((item, idx) => (
                        <motion.span
                          key={item.name}
                          animate={{
                            color:
                              activeArrow === idx
                                ? "rgb(59,130,246)"
                                : "rgb(161,161,170)",
                            scale: activeArrow === idx ? 1.3 : 1,
                          }}
                          transition={{ duration: 0.25 }}
                          className="text-lg font-bold select-none"
                        >
                          →
                        </motion.span>
                      ))}
                    </div>

                    {/* app.js file */}
                    <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 px-4 py-3 min-w-[160px]">
                      <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2 font-mono">
                        app.js
                      </p>
                      <div className="space-y-1.5">
                        {appImports.map((item, idx) => (
                          <motion.div
                            key={item.name}
                            animate={{
                              scale: activeArrow === idx ? 1.08 : 1,
                              boxShadow:
                                activeArrow === idx
                                  ? "0 0 12px rgba(16,185,129,0.5)"
                                  : "0 0 0px transparent",
                            }}
                            transition={{ duration: 0.25 }}
                            className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-all ${
                              activeArrow === idx
                                ? "bg-emerald-500 text-white ring-2 ring-offset-1 ring-offset-background ring-emerald-400"
                                : "bg-muted border border-border text-muted-foreground"
                            }`}
                          >
                            <span className="opacity-60">import </span>
                            <span className="font-bold">{`{ ${item.name} }`}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={animating}
                      onClick={runArrowAnimation}
                    >
                      <Play className="h-3.5 w-3.5 mr-1" />
                      {animating ? "Animating..." : "Animate Flow"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Comparison table */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Module Systems
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Feature</span>
              <span>CommonJS</span>
              <span>ES Modules</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-3 px-3 py-2 border-t items-center gap-1"
              >
                <span className="font-semibold text-muted-foreground">
                  {row.feature}
                </span>
                <code className="font-mono text-[11px] text-orange-600 dark:text-orange-400">
                  {row.commonjs}
                </code>
                <code className="font-mono text-[11px] text-blue-600 dark:text-blue-400">
                  {row.esm}
                </code>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
