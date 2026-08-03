"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// ─── helpers ──────────────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function parseArr(s: string): number[] {
  return s.split(",").map((x) => Number(x.trim())).filter((n) => !Number.isNaN(n));
}

// ─── ArrayBar ─────────────────────────────────────────────────────────────────
function ArrayBar({
  items, highlight = [], dimmed = [], label,
}: Readonly<{
  items: (number | string)[];
  highlight?: number[];
  dimmed?: number[];
  label?: string;
}>) {
  return (
    <div className="space-y-1">
      {label && (
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
      )}
      <div className="flex flex-wrap gap-1.5 min-h-[52px] items-center">
        <AnimatePresence mode="popLayout">
          {items.map((val, i) => (
            <motion.div
              key={`${i}-${val}`}
              layout
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: dimmed.includes(i) ? 0.3 : 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.35 }}
              className="flex flex-col items-center gap-0.5"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-xs border-2 transition-colors ${
                  highlight.includes(i)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary text-secondary-foreground border-secondary"
                }`}
              >
                {String(val)}
              </div>
              <span className="text-[9px] text-muted-foreground font-mono">[{i}]</span>
            </motion.div>
          ))}
          {items.length === 0 && (
            <span className="text-xs text-muted-foreground italic">[ ]  empty array</span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
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
          key="placeholder"
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

// ─── method meta ──────────────────────────────────────────────────────────────
type MethodKey =
  | "push" | "pop" | "shift" | "unshift" | "splice"
  | "slice" | "map" | "filter" | "reduce";

const methodMeta: Record<MethodKey, { color: string; mutates: boolean }> = {
  push:    { color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",           mutates: true  },
  pop:     { color: "bg-rose-500/15 border-rose-500/40 text-rose-700 dark:text-rose-300",           mutates: true  },
  shift:   { color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",   mutates: true  },
  unshift: { color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",   mutates: true  },
  splice:  { color: "bg-pink-500/15 border-pink-500/40 text-pink-700 dark:text-pink-300",           mutates: true  },
  slice:   { color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300", mutates: false },
  map:     { color: "bg-cyan-500/15 border-cyan-500/40 text-cyan-700 dark:text-cyan-300",           mutates: false },
  filter:  { color: "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",       mutates: false },
  reduce:  { color: "bg-teal-500/15 border-teal-500/40 text-teal-700 dark:text-teal-300",           mutates: false },
};

// ─── live code + output builder (methods) ─────────────────────────────────────
interface MethodInputs {
  pushVal: number; unshiftVal: number;
  sliceStart: number; sliceEnd: number;
  spliceIdx: number; spliceCount: number; spliceInsert: string;
  mapFn: "×2" | "×3" | "+10" | "square";
  filterFn: "even" | "odd" | ">5" | "<5";
  reduceFn: "sum" | "product" | "max";
}

function buildMethodCode(
  method: MethodKey,
  arr: number[],
  inp: MethodInputs,
): { code: string; output: string[] } {
  const A = `[${arr.join(", ")}]`;

  switch (method) {
    case "push": {
      const res = [...arr, inp.pushVal];
      return {
        code: `const arr = ${A};\narr.push(${inp.pushVal});\nconsole.log(arr);`,
        output: [`[${res.join(", ")}]`],
      };
    }
    case "pop": {
      const removed = arr.length ? arr.at(-1) : "undefined";
      const res = arr.slice(0, -1);
      return {
        code: `const arr = ${A};\nconst removed = arr.pop();\nconsole.log("removed:", removed);\nconsole.log("arr:", arr);`,
        output: [`removed: ${removed}`, `arr: [${res.join(", ")}]`],
      };
    }
    case "shift": {
      const removed = arr.length ? arr[0] : "undefined";
      const res = arr.slice(1);
      return {
        code: `const arr = ${A};\nconst removed = arr.shift();\nconsole.log("removed:", removed);\nconsole.log("arr:", arr);`,
        output: [`removed: ${removed}`, `arr: [${res.join(", ")}]`],
      };
    }
    case "unshift": {
      const res = [inp.unshiftVal, ...arr];
      return {
        code: `const arr = ${A};\narr.unshift(${inp.unshiftVal});\nconsole.log(arr);`,
        output: [`[${res.join(", ")}]`],
      };
    }
    case "splice": {
      const ins = inp.spliceInsert.trim()
        ? inp.spliceInsert.split(",").map(Number).filter((n) => !Number.isNaN(n))
        : [];
      const copied = [...arr];
      const removed = copied.splice(inp.spliceIdx, inp.spliceCount, ...ins);
      const insStr = ins.length ? `, ${ins.join(", ")}` : "";
      return {
        code: `const arr = ${A};\nconst removed = arr.splice(${inp.spliceIdx}, ${inp.spliceCount}${insStr});\nconsole.log("removed:", removed);\nconsole.log("arr:", arr);`,
        output: [`removed: [${removed.join(", ")}]`, `arr: [${copied.join(", ")}]`],
      };
    }
    case "slice": {
      const sliced = arr.slice(inp.sliceStart, inp.sliceEnd);
      return {
        code: `const arr = ${A};\nconst result = arr.slice(${inp.sliceStart}, ${inp.sliceEnd});\nconsole.log("result:", result);\nconsole.log("original:", arr);`,
        output: [`result: [${sliced.join(", ")}]`, `original: [${arr.join(", ")}]  // unchanged`],
      };
    }
    case "map": {
      const fnDef: Record<string, { expr: string; fn: (x: number) => number }> = {
        "×2":    { expr: "x * 2",  fn: (x) => x * 2  },
        "×3":    { expr: "x * 3",  fn: (x) => x * 3  },
        "+10":   { expr: "x + 10", fn: (x) => x + 10 },
        "square":{ expr: "x * x",  fn: (x) => x * x  },
      };
      const { expr, fn } = fnDef[inp.mapFn];
      const mapped = arr.map(fn);
      return {
        code: `const arr = ${A};\nconst result = arr.map(x => ${expr});\nconsole.log("result:", result);\nconsole.log("original:", arr);`,
        output: [`result: [${mapped.join(", ")}]`, `original: [${arr.join(", ")}]  // unchanged`],
      };
    }
    case "filter": {
      const predDef: Record<string, { expr: string; fn: (x: number) => boolean }> = {
        "even": { expr: "x % 2 === 0", fn: (x) => x % 2 === 0 },
        "odd":  { expr: "x % 2 !== 0", fn: (x) => x % 2 !== 0 },
        ">5":   { expr: "x > 5",       fn: (x) => x > 5        },
        "<5":   { expr: "x < 5",       fn: (x) => x < 5        },
      };
      const { expr, fn } = predDef[inp.filterFn];
      const filtered = arr.filter((x) => fn(x));
      return {
        code: `const arr = ${A};\nconst result = arr.filter(x => ${expr});\nconsole.log("result:", result);\nconsole.log("original:", arr);`,
        output: [`result: [${filtered.join(", ")}]`, `original: [${arr.join(", ")}]  // unchanged`],
      };
    }
    case "reduce": {
      const redDef: Record<string, { expr: string; initStr: string; init: number; fn: (a: number, x: number) => number }> = {
        "sum":     { expr: "acc + x",          initStr: "0",         init: 0,         fn: (a, x) => a + x            },
        "product": { expr: "acc * x",          initStr: "1",         init: 1,         fn: (a, x) => a * x            },
        "max":     { expr: "Math.max(acc, x)", initStr: "-Infinity", init: -Infinity, fn: (a, x) => Math.max(a, x)   },
      };
      const { expr, initStr, init, fn } = redDef[inp.reduceFn];
      const val = arr.reduce((a, x) => fn(a, x), init);
      return {
        code: `const arr = ${A};\nconst result = arr.reduce(\n  (acc, x) => ${expr},\n  ${initStr}\n);\nconsole.log("result:", result);`,
        output: [`result: ${val === -Infinity ? "-Infinity" : val}`],
      };
    }
    default:
      return { code: "", output: [] };
  }
}

// ─── MethodsSection ───────────────────────────────────────────────────────────
const METHODS: MethodKey[] = ["push", "pop", "shift", "unshift", "splice", "slice", "map", "filter", "reduce"];
const DEFAULT_ARR = [3, 7, 1, 9, 4, 6];

function MethodsSection() {
  const [arrText, setArrText]           = useState("3, 7, 1, 9, 4, 6");
  const [arr, setArr]                   = useState<number[]>(DEFAULT_ARR);
  const [method, setMethod]             = useState<MethodKey>("push");
  const [highlight, setHighlight]       = useState<number[]>([]);
  const [resultArr, setResultArr]       = useState<number[] | null>(null);
  const [outputLines, setOutputLines]   = useState<string[] | null>(null);

  const [pushVal, setPushVal]           = useState(42);
  const [unshiftVal, setUnshiftVal]     = useState(0);
  const [sliceStart, setSliceStart]     = useState(1);
  const [sliceEnd, setSliceEnd]         = useState(4);
  const [spliceIdx, setSpliceIdx]       = useState(1);
  const [spliceCount, setSpliceCount]   = useState(2);
  const [spliceInsert, setSpliceInsert] = useState("");
  const [mapFn, setMapFn]               = useState<MethodInputs["mapFn"]>("×2");
  const [filterFn, setFilterFn]         = useState<MethodInputs["filterFn"]>("even");
  const [reduceFn, setReduceFn]         = useState<MethodInputs["reduceFn"]>("sum");

  const clearOutput = () => { setOutputLines(null); setResultArr(null); };

  const inputs: MethodInputs = {
    pushVal, unshiftVal, sliceStart, sliceEnd,
    spliceIdx, spliceCount, spliceInsert,
    mapFn, filterFn, reduceFn,
  };

  const { code, output } = buildMethodCode(method, arr, inputs);

  const flash = (idxs: number[]) => {
    setHighlight(idxs);
    setTimeout(() => setHighlight([]), 900);
  };

  const handleRun = () => {
    setOutputLines(output);
    setResultArr(null);
    const a = [...arr];

    switch (method) {
      case "push":    a.push(pushVal);        setArr(a); flash([a.length - 1]); break;
      case "pop":     if (a.length) { a.pop();   setArr(a); } break;
      case "shift":   if (a.length) { a.shift(); setArr(a); } break;
      case "unshift": a.unshift(unshiftVal); setArr(a); flash([0]); break;
      case "splice": {
        const ins = spliceInsert.trim() ? spliceInsert.split(",").map(Number).filter((n) => !Number.isNaN(n)) : [];
        a.splice(spliceIdx, spliceCount, ...ins);
        setArr(a);
        flash(Array.from({ length: ins.length }, (_, i) => spliceIdx + i));
        break;
      }
      case "slice":
        setResultArr(arr.slice(sliceStart, sliceEnd));
        flash(Array.from({ length: sliceEnd - sliceStart }, (_, i) => sliceStart + i));
        break;
      case "map": {
        const fns: Record<string, (x: number) => number> = {
          "×2": (x) => x * 2, "×3": (x) => x * 3, "+10": (x) => x + 10, "square": (x) => x * x,
        };
        setResultArr(arr.map(fns[mapFn]));
        break;
      }
      case "filter": {
        const preds: Record<string, (x: number) => boolean> = {
          "even": (x) => x % 2 === 0, "odd": (x) => x % 2 !== 0, ">5": (x) => x > 5, "<5": (x) => x < 5,
        };
        const filtered = arr.filter(preds[filterFn]);
        const kept = arr.reduce<number[]>((acc, _, i) => preds[filterFn](arr[i]) ? [...acc, i] : acc, []);
        setResultArr(filtered);
        flash(kept);
        break;
      }
      case "reduce": break;
    }
  };

  const resetAll = () => {
    setArrText("3, 7, 1, 9, 4, 6");
    setArr(DEFAULT_ARR);
    setHighlight([]);
    setResultArr(null);
    setOutputLines(null);
  };

  const meta = methodMeta[method];

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Array Methods</p>

      {/* working array */}
      <div className={`rounded-xl border p-3 space-y-2 ${meta.color}`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wide opacity-70">Working array</span>
          <button onClick={resetAll} className="text-[10px] opacity-60 hover:opacity-100 underline">reset</button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono opacity-70 shrink-0">arr =</span>
          <input
            type="text"
            value={arrText}
            onChange={(e) => {
              setArrText(e.target.value);
              const p = parseArr(e.target.value);
              if (p.length) { setArr(p); clearOutput(); }
            }}
            className="bg-transparent border-b border-current/30 text-xs font-mono flex-1 focus:outline-none px-1"
            placeholder="3, 7, 1, 9, 4, 6"
          />
        </div>
        <ArrayBar items={arr} highlight={highlight} />
        <p className="text-[10px] font-mono opacity-60">length = {arr.length}</p>
      </div>

      {/* method tabs */}
      <div className="flex flex-wrap gap-1.5">
        {METHODS.map((m) => (
          <button
            key={m}
            onClick={() => { setMethod(m); clearOutput(); }}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
              method === m
                ? methodMeta[m].color + " scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {m}()
          </button>
        ))}
      </div>

      <Badge variant="secondary" className={`text-[10px] ${meta.color}`}>
        {meta.mutates ? "mutates original" : "returns new value"}
      </Badge>

      {/* inputs + code + output */}
      <AnimatePresence mode="wait">
        <motion.div
          key={method}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Left: inputs + run */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground">Inputs</p>
            <div className="space-y-2 min-h-[64px]">
              {method === "push" && (
                <label className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground w-24">value</span>
                  <input type="number" value={pushVal}
                    onChange={(e) => { setPushVal(Number(e.target.value)); clearOutput(); }}
                    className="rounded-md border bg-background px-2 py-1 text-sm w-20" />
                </label>
              )}
              {method === "unshift" && (
                <label className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground w-24">value</span>
                  <input type="number" value={unshiftVal}
                    onChange={(e) => { setUnshiftVal(Number(e.target.value)); clearOutput(); }}
                    className="rounded-md border bg-background px-2 py-1 text-sm w-20" />
                </label>
              )}
              {method === "slice" && (
                <>
                  <label className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground w-24">start</span>
                    <input type="number" value={sliceStart} min={0} max={arr.length}
                      onChange={(e) => { setSliceStart(Number(e.target.value)); clearOutput(); }}
                      className="rounded-md border bg-background px-2 py-1 text-sm w-20" />
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground w-24">end</span>
                    <input type="number" value={sliceEnd} min={0} max={arr.length}
                      onChange={(e) => { setSliceEnd(Number(e.target.value)); clearOutput(); }}
                      className="rounded-md border bg-background px-2 py-1 text-sm w-20" />
                  </label>
                </>
              )}
              {method === "splice" && (
                <>
                  <label className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground w-24">start</span>
                    <input type="number" value={spliceIdx} min={0}
                      onChange={(e) => { setSpliceIdx(Number(e.target.value)); clearOutput(); }}
                      className="rounded-md border bg-background px-2 py-1 text-sm w-20" />
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground w-24">deleteCount</span>
                    <input type="number" value={spliceCount} min={0}
                      onChange={(e) => { setSpliceCount(Number(e.target.value)); clearOutput(); }}
                      className="rounded-md border bg-background px-2 py-1 text-sm w-20" />
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground w-24">insert</span>
                    <input type="text" value={spliceInsert} placeholder="e.g. 99,100"
                      onChange={(e) => { setSpliceInsert(e.target.value); clearOutput(); }}
                      className="rounded-md border bg-background px-2 py-1 text-xs w-28" />
                  </label>
                </>
              )}
              {method === "map" && (
                <label className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground w-24">transform</span>
                  <select value={mapFn}
                    onChange={(e) => { setMapFn(e.target.value as typeof mapFn); clearOutput(); }}
                    className="rounded-md border bg-background px-2 py-1 text-sm">
                    {["×2", "×3", "+10", "square"].map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </label>
              )}
              {method === "filter" && (
                <label className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground w-24">condition</span>
                  <select value={filterFn}
                    onChange={(e) => { setFilterFn(e.target.value as typeof filterFn); clearOutput(); }}
                    className="rounded-md border bg-background px-2 py-1 text-sm">
                    {["even", "odd", ">5", "<5"].map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </label>
              )}
              {method === "reduce" && (
                <label className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground w-24">operation</span>
                  <select value={reduceFn}
                    onChange={(e) => { setReduceFn(e.target.value as typeof reduceFn); clearOutput(); }}
                    className="rounded-md border bg-background px-2 py-1 text-sm">
                    {["sum", "product", "max"].map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </label>
              )}
              {(method === "pop" || method === "shift") && (
                <p className="text-xs text-muted-foreground italic">No inputs needed — operates on current array.</p>
              )}
            </div>

            <Button
              onClick={handleRun}
              size="sm"
              disabled={arr.length === 0 && method !== "push" && method !== "unshift"}
            >
              <Play className="h-3.5 w-3.5 mr-1" /> Run {method}()
            </Button>
          </div>

          {/* Right: code preview + output */}
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
              <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[90px]">
                {code}
              </pre>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
              <ConsoleOutput lines={outputLines} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* result array for non-mutating methods */}
      {resultArr && (
        <ArrayBar
          items={resultArr}
          highlight={resultArr.map((_, i) => i)}
          label="Result array (original unchanged)"
        />
      )}
    </div>
  );
}

// ─── useRunner ────────────────────────────────────────────────────────────────
interface PracticeRow { label: string; col1: string; col2: string; col3?: string }

function useRunner() {
  const [rows, setRows]       = useState<PracticeRow[]>([]);
  const [running, setRunning] = useState(false);
  const [result, setResult]   = useState<string | null>(null);
  const stopRef               = useRef(false);

  const reset = () => { stopRef.current = true; setRunning(false); setRows([]); setResult(null); };

  const start = async (gen: (push: (r: PracticeRow) => Promise<void>) => Promise<string>) => {
    stopRef.current = false;
    setRunning(true); setRows([]); setResult(null);
    const push = async (r: PracticeRow) => {
      if (stopRef.current) throw new Error("stopped");
      setRows((p) => [...p, r]);
      await sleep(450);
    };
    try { const res = await gen(push); setResult(res); }
    catch { /* stopped */ }
    setRunning(false);
  };

  return { rows, running, result, reset, start };
}

// ─── practice code builder ────────────────────────────────────────────────────
type PracticeKey = "reverse" | "max" | "dedupe";

function buildPracticeCode(tab: PracticeKey, arr: number[]): { code: string; output: string } {
  const A = `[${arr.join(", ")}]`;

  switch (tab) {
    case "reverse": {
      const a = [...arr]; let l = 0, r = a.length - 1;
      while (l < r) { [a[l], a[r]] = [a[r], a[l]]; l++; r--; }
      return {
        code:
`function reverseArray(arr) {
  let l = 0, r = arr.length - 1;
  while (l < r) {
    [arr[l], arr[r]] = [arr[r], arr[l]];
    l++; r--;
  }
  return arr;
}

console.log(reverseArray(${A}));`,
        output: `[${a.join(", ")}]`,
      };
    }
    case "max": {
      const maxVal = arr.length ? Math.max(...arr) : "N/A";
      const maxIdx = arr.length ? arr.indexOf(Number(maxVal)) : -1;
      return {
        code:
`function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

console.log(findMax(${A}));`,
        output: arr.length ? `${maxVal}  // at index [${maxIdx}]` : "N/A",
      };
    }
    case "dedupe": {
      const unique = Array.from(new Set(arr));
      return {
        code:
`function removeDuplicates(arr) {
  return [...new Set(arr)];
}

console.log(removeDuplicates(${A}));`,
        output: `[${unique.join(", ")}]`,
      };
    }
    default:
      return { code: "", output: "" };
  }
}

// ─── PracticeSection ──────────────────────────────────────────────────────────
function PracticeSection() {
  const [tab, setTab]                 = useState<PracticeKey>("reverse");
  const [arrInput, setArrInput]       = useState("5,3,8,1,9,2,7");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const runner                        = useRunner();

  const arr = parseArr(arrInput);
  const { code, output } = buildPracticeCode(tab, arr);

  const switchTab = (t: PracticeKey) => { runner.reset(); setTab(t); setOutputLines(null); };

  const handleRun = () => {
    setOutputLines([output]);

    if (tab === "reverse") {
      runner.start(async (push) => {
        const a = [...arr]; let l = 0, r = a.length - 1;
        while (l < r) {
          await push({ label: `swap [${l}]↔[${r}]`, col1: `a[${l}]=${a[l]}`, col2: `a[${r}]=${a[r]}`, col3: `[${[...a].join(",")}]` });
          [a[l], a[r]] = [a[r], a[l]]; l++; r--;
        }
        return `[${a.join(", ")}]`;
      });
    } else if (tab === "max") {
      runner.start(async (push) => {
        let maxVal = arr[0], maxIdx = 0;
        for (let i = 1; i < arr.length; i++) {
          const better = arr[i] > maxVal;
          await push({ label: `i = ${i}`, col1: `arr[${i}] = ${arr[i]}`, col2: `max = ${maxVal}`, col3: better ? "✅ new max!" : "no change" });
          if (better) { maxVal = arr[i]; maxIdx = i; }
        }
        return `${maxVal}  // at index [${maxIdx}]`;
      });
    } else {
      runner.start(async (push) => {
        const seen = new Set<number>(); const result: number[] = [];
        for (let i = 0; i < arr.length; i++) {
          const isDup = seen.has(arr[i]);
          await push({ label: `i = ${i}`, col1: `arr[${i}] = ${arr[i]}`, col2: isDup ? "❌ dup" : "✅ unique", col3: `[${result.join(",")}]` });
          if (!isDup) { seen.add(arr[i]); result.push(arr[i]); }
        }
        return `[${result.join(", ")}]`;
      });
    }
  };

  const practiceHeaders: Record<PracticeKey, [string, string, string]> = {
    reverse: ["left value",  "right value", "array state"  ],
    max:     ["current",     "max so far",  "verdict"      ],
    dedupe:  ["element",     "status",      "result so far"],
  };

  const { rows, running } = runner;
  const hdr = practiceHeaders[tab];

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Practice Problems</p>

      {/* tabs */}
      <div className="flex flex-wrap gap-2">
        {([
          { key: "reverse" as PracticeKey, label: "Reverse array",     hint: "two-pointer" },
          { key: "max"     as PracticeKey, label: "Find max element",  hint: "linear scan"  },
          { key: "dedupe"  as PracticeKey, label: "Remove duplicates", hint: "Set O(1)"     },
        ]).map(({ key, label, hint }) => (
          <button
            key={key}
            disabled={running}
            onClick={() => switchTab(key)}
            className={`flex flex-col items-start px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${
              tab === key
                ? "bg-primary/15 border-primary/40 text-primary scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            <span>{label}</span>
            <span className="text-[9px] font-normal opacity-60 mt-0.5">{hint}</span>
          </button>
        ))}
      </div>

      {/* array input + controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground shrink-0">arr =</span>
          <input
            type="text" value={arrInput} disabled={running}
            onChange={(e) => { runner.reset(); setArrInput(e.target.value); setOutputLines(null); }}
            placeholder="1,2,3,4"
            className="rounded-md border bg-background px-2 py-1 text-xs w-44"
          />
        </div>
        <Button onClick={handleRun} size="sm" disabled={running || arr.length === 0}>
          <Play className="h-3.5 w-3.5 mr-1" /> Run
        </Button>
        <Button onClick={() => { runner.reset(); setOutputLines(null); }} variant="outline" size="sm">
          <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
        </Button>
        {running && <Badge variant="secondary" className="animate-pulse text-[10px]">running…</Badge>}
      </div>

      <ArrayBar items={arr} />

      {/* code + output side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[160px]">
            {code}
          </pre>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
          <ConsoleOutput lines={outputLines} />
        </div>
      </div>

      {/* step table */}
      <div className="rounded-xl border overflow-hidden min-h-[130px]">
        <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 text-[10px] font-semibold text-muted-foreground">
          <span>step</span>
          <span>{hdr[0]}</span>
          <span>{hdr[1]}</span>
          <span>{hdr[2]}</span>
        </div>
        <AnimatePresence>
          {rows.map((r) => {
            const isLast = rows.at(-1) === r;
            return (
              <motion.div
                key={`${r.label}-${r.col1}`}
                initial={{ opacity: 0, x: -14, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                transition={{ duration: 0.17 }}
                className={`grid grid-cols-4 border-t px-3 py-2 text-xs font-mono items-center ${isLast ? "bg-primary/5" : ""}`}
              >
                <span className="text-muted-foreground">{r.label}</span>
                <span className="text-foreground">{r.col1}</span>
                <span className={isLast ? "text-primary font-bold" : "text-emerald-600 dark:text-emerald-400"}>{r.col2}</span>
                <span className="text-amber-600 dark:text-amber-400 text-[10px]">{r.col3}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {rows.length === 0 && !running && (
          <p className="text-xs text-muted-foreground text-center py-6">
            Click <strong>Run</strong> to watch step by step
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function ArrayVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Arrays</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <MethodsSection />
        <Separator />
        <PracticeSection />
      </CardContent>
    </Card>
  );
}
