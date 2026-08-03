"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Op = "add" | "sub" | "mul" | "div" | "pow" | "stats" | "matrix";

const a = [1, 2, 3, 4, 5];
const b = [10, 20, 30, 40, 50];

const ops: { key: Op; label: string; color: string }[] = [
  { key: "add",    label: "a + b",    color: "text-blue-500" },
  { key: "sub",    label: "b - a",    color: "text-orange-500" },
  { key: "mul",    label: "a * b",    color: "text-emerald-500" },
  { key: "div",    label: "b / a",    color: "text-violet-500" },
  { key: "pow",    label: "a ** 2",   color: "text-pink-500" },
  { key: "stats",  label: "Statistics", color: "text-amber-500" },
  { key: "matrix", label: "Matrix",   color: "text-cyan-500" },
];

const results: Record<Op, { label: string; value: (number | string)[] | string }[]> = {
  add:    [{ label: "a + b",  value: a.map((v, i) => v + b[i]) }],
  sub:    [{ label: "b - a",  value: a.map((v, i) => b[i] - v) }],
  mul:    [{ label: "a * b",  value: a.map((v, i) => v * b[i]) }],
  div:    [{ label: "b / a",  value: a.map((v, i) => b[i] / v) }],
  pow:    [{ label: "a ** 2", value: a.map((v) => v ** 2) }],
  stats:  [
    { label: "np.sum(a)",  value: String(a.reduce((x, y) => x + y, 0)) },
    { label: "np.mean(a)", value: String(a.reduce((x, y) => x + y, 0) / a.length) },
    { label: "np.max(a)",  value: String(Math.max(...a)) },
    { label: "np.min(a)",  value: String(Math.min(...a)) },
    { label: "np.std(a)",  value: String(Math.sqrt(a.reduce((s, v) => s + (v - 3) ** 2, 0) / a.length).toFixed(4)) },
  ],
  matrix: [
    { label: "matrix",     value: ["[1, 2, 3]", "[4, 5, 6]", "[7, 8, 9]"] },
    { label: "Transpose",  value: ["[1, 4, 7]", "[2, 5, 8]", "[3, 6, 9]"] },
    { label: "Row sums",   value: ["[6, 15, 24]"] },
    { label: "Col sums",   value: ["[12, 15, 18]"] },
  ],
};

export function NumpyVisualization() {
  const [op, setOp] = useState<Op>("add");
  const colorClass = ops.find((o) => o.key === op)?.color ?? "text-primary";

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">NumPy Array Operations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Arrays */}
        <div className="grid grid-cols-2 gap-3">
          {[{ label: "a", vals: a, color: "border-blue-400 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300" },
            { label: "b", vals: b, color: "border-orange-400 bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300" }].map(({ label, vals, color }) => (
            <div key={label} className={`rounded-xl border-2 px-3 py-2 ${color}`}>
              <p className="text-xs font-bold font-mono mb-1">np.array {label}</p>
              <div className="flex gap-1 flex-wrap">
                {vals.map((v, i) => <span key={i} className="w-7 h-7 rounded-md border flex items-center justify-center text-xs font-mono font-bold border-current/30 bg-white/30 dark:bg-black/10">{v}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* Op selector */}
        <div className="flex flex-wrap gap-2">
          {ops.map((o) => (
            <button key={o.key} onClick={() => setOp(o.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 font-mono transition-all ${
                op === o.key ? `border-current ${o.color} bg-muted/40` : "border-border text-muted-foreground hover:bg-muted"
              }`}>{o.label}</button>
          ))}
        </div>

        {/* Result */}
        <motion.div key={op} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
          className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-sm space-y-2">
          {results[op].map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              className="flex flex-wrap items-center gap-3">
              <span className="text-zinc-400 min-w-[120px]">{r.label}</span>
              <span className="text-zinc-500">→</span>
              <span className={`font-bold ${colorClass}`}>
                {Array.isArray(r.value) ? `[${(r.value as (number|string)[]).join(", ")}]` : String(r.value)}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}
