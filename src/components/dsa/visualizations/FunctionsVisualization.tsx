"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ─── types ────────────────────────────────────────────────────────────────────
type FnTab = "normal" | "arrow";
type ParamType = "string" | "number" | "boolean";

interface Param {
  name: string;
  type: ParamType;
  value: string;
}

// ─── helpers ──────────────────────────────────────────────────────────────────
const typeColor: Record<ParamType, string> = {
  string:  "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  number:  "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  boolean: "bg-pink-500/15 border-pink-500/40 text-pink-700 dark:text-pink-300",
};

const fnColor: Record<FnTab, string> = {
  normal: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  arrow:  "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
};

function coerce(value: string, type: ParamType): string | number | boolean {
  if (type === "number")  return Number.isNaN(Number(value)) ? 0 : Number(value);
  if (type === "boolean") return value === "true";
  return value;
}

function jsLiteral(value: string, type: ParamType): string {
  if (type === "string")  return `"${value}"`;
  return value;
}

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

// ─── Section 1: Normal vs Arrow ───────────────────────────────────────────────
function FunctionTypeSection() {
  const [tab, setTab]                 = useState<FnTab>("normal");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const normalSyntax =
`// Normal function — has its own 'this', hoisted
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Alice"));`;

  const arrowSyntax =
`// Arrow function — no own 'this', NOT hoisted
const greet = (name) => "Hello, " + name + "!";

const add = (a, b) => {
  const result = a + b;
  return result;
};

console.log(greet("Bob"));
console.log(add(3, 4));`;

  const outputMap: Record<FnTab, string[]> = {
    normal: ['"Hello, Alice!"'],
    arrow:  ['"Hello, Bob!"', "7"],
  };

  const differences = [
    { aspect: "Syntax",     normal: "function name() {}",   arrow: "const name = () => {}" },
    { aspect: "Hoisting",   normal: "✅ hoisted",           arrow: "❌ not hoisted" },
    { aspect: "this",       normal: "own this binding",     arrow: "inherits outer this" },
    { aspect: "arguments",  normal: "has arguments object", arrow: "no arguments object" },
    { aspect: "new",        normal: "✅ can use new",       arrow: "❌ cannot use new" },
    { aspect: "Implicit ↩", normal: "needs return",        arrow: "1-liner omits return" },
  ];

  return (
    <div className="space-y-3">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Function Types
      </p>

      {/* tabs */}
      <div className="flex gap-2">
        {(["normal", "arrow"] as FnTab[]).map((key) => (
          <button
            key={key}
            onClick={() => { setTab(key); setOutputLines(null); }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              tab === key
                ? fnColor[key] + " scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {key === "normal" ? "Normal function" : "Arrow function"}
          </button>
        ))}
      </div>

      {/* Code + Output */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Code</p>
            <pre className={`text-xs font-mono rounded-xl border px-4 py-3 whitespace-pre overflow-x-auto min-h-[130px] ${fnColor[tab]}`}>
              {tab === "normal" ? normalSyntax : arrowSyntax}
            </pre>
            <Button size="sm" onClick={() => setOutputLines(outputMap[tab])}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <ConsoleOutput lines={outputLines} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* comparison table */}
      <div className="rounded-xl border overflow-hidden text-xs">
        <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
          <span>Aspect</span>
          <span className="text-violet-600 dark:text-violet-400">Normal</span>
          <span className="text-amber-600 dark:text-amber-400">Arrow</span>
        </div>
        {differences.map((row) => (
          <div key={row.aspect} className="grid grid-cols-3 border-t px-3 py-2 items-start">
            <span className="font-semibold text-foreground">{row.aspect}</span>
            <code className="font-mono text-[11px] text-muted-foreground">{row.normal}</code>
            <code className="font-mono text-[11px] text-muted-foreground">{row.arrow}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section 2: Parameters & Return values ────────────────────────────────────
const DEFAULT_PARAMS: Param[] = [
  { name: "name", type: "string",  value: "Alice" },
  { name: "age",  type: "number",  value: "25" },
];

function ParametersSection() {
  const [params, setParams]     = useState<Param[]>(DEFAULT_PARAMS);
  const [returnExpr, setReturnExpr] = useState(`name + " is " + age + " years old"`);
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const computeReturn = (): { ok: true; value: string } | { ok: false; error: string } => {
    try {
      const args = params.map((p) => coerce(p.value, p.type));
      const paramNames = params.map((p) => p.name);
      // eslint-disable-next-line no-new-func
      const fn = new Function(...paramNames, `return (${returnExpr});`);
      const result = fn(...args);
      return { ok: true, value: String(result) };
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  };

  const updateParam = (i: number, field: keyof Param, val: string) => {
    setOutputLines(null);
    setParams((prev) => prev.map((p, idx) => idx === i ? { ...p, [field]: val } : p));
  };

  const addParam = () => {
    if (params.length >= 4) return;
    setOutputLines(null);
    setParams((prev) => [...prev, { name: `param${prev.length + 1}`, type: "string", value: "value" }]);
  };

  const removeParam = (i: number) => {
    setOutputLines(null);
    setParams((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleCall = () => {
    const res = computeReturn();
    setOutputLines(res.ok ? [res.value] : [`Error: ${res.error}`]);
  };

  // live code preview
  const paramList = params.map((p) => p.name).join(", ");
  const callArgs  = params.map((p) => jsLiteral(p.value, p.type)).join(", ");
  const liveCode  = [
    `function myFunc(${paramList}) {`,
    `  return ${returnExpr};`,
    `}`,
    ``,
    `console.log(myFunc(${callArgs}));`,
  ].join("\n");

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Parameters &amp; Return Values
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: parameter builder */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground">Parameters</p>
          <div className="space-y-2">
            {params.map((p, i) => (
              <motion.div
                key={`param-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${typeColor[p.type]}`}
              >
                <input
                  value={p.name}
                  onChange={(e) => updateParam(i, "name", e.target.value)}
                  className="bg-transparent border-b border-current/30 text-xs font-mono w-20 focus:outline-none"
                  placeholder="name"
                />
                <span className="text-xs opacity-50">:</span>
                <select
                  value={p.type}
                  onChange={(e) => updateParam(i, "type", e.target.value as ParamType)}
                  className="bg-transparent text-xs font-mono focus:outline-none cursor-pointer"
                >
                  <option value="string">string</option>
                  <option value="number">number</option>
                  <option value="boolean">boolean</option>
                </select>
                <span className="text-xs opacity-50">=</span>
                {p.type === "boolean" ? (
                  <select
                    value={p.value}
                    onChange={(e) => updateParam(i, "value", e.target.value)}
                    className="bg-transparent text-xs font-mono focus:outline-none cursor-pointer flex-1"
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                ) : (
                  <input
                    value={p.value}
                    onChange={(e) => updateParam(i, "value", e.target.value)}
                    className="bg-transparent border-b border-current/30 text-xs font-mono flex-1 focus:outline-none"
                    placeholder="value"
                  />
                )}
                <button
                  onClick={() => removeParam(i)}
                  className="text-current/40 hover:text-current text-sm leading-none"
                >
                  ✕
                </button>
              </motion.div>
            ))}
            {params.length < 4 && (
              <button
                onClick={addParam}
                className="w-full rounded-lg border border-dashed border-border text-xs text-muted-foreground py-2 hover:bg-muted/40 transition-colors"
              >
                + Add parameter
              </button>
            )}
          </div>

          {/* return expression */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">Return expression</p>
            <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2">
              <span className="text-xs font-mono text-muted-foreground shrink-0">return</span>
              <input
                value={returnExpr}
                onChange={(e) => { setOutputLines(null); setReturnExpr(e.target.value); }}
                className="bg-transparent text-xs font-mono flex-1 focus:outline-none"
                placeholder={`${params[0]?.name ?? "x"} + ...`}
              />
            </div>
          </div>

          <Button onClick={handleCall} size="sm" className="w-full">
            <Play className="h-3.5 w-3.5 mr-1" /> Run function
          </Button>

          {/* param badges */}
          <div className="flex flex-wrap gap-1.5">
            {params.map((p, i) => (
              <Badge
                key={`badge-${i}`}
                variant="secondary"
                className={`text-[10px] font-mono ${typeColor[p.type]}`}
              >
                {p.name}: {p.type} = {jsLiteral(p.value, p.type)}
              </Badge>
            ))}
          </div>
        </div>

        {/* Right: live code + output */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
            <AnimatePresence mode="wait">
              <motion.pre
                key={liveCode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[140px]"
              >
                {liveCode}
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

// ─── Main export ──────────────────────────────────────────────────────────────
export function FunctionsVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Functions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FunctionTypeSection />
        <Separator />
        <ParametersSection />
      </CardContent>
    </Card>
  );
}
