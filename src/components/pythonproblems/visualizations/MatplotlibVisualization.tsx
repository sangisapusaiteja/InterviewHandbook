"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const months = ["Jan", "Feb", "Mar", "Apr", "May"];
const sales  = [120, 145, 132, 168, 155];
const costs  = [80,  95,  88, 102,  98];

type Chart = "bar" | "line" | "scatter";

export function MatplotlibVisualization() {
  const [chart, setChart] = useState<Chart>("bar");

  const maxVal = Math.max(...sales, ...costs);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          Matplotlib Charts
          <Badge variant="secondary" className="text-[10px]">Simulated</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          {(["bar", "line", "scatter"] as Chart[]).map((c) => (
            <button key={c} onClick={() => setChart(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 capitalize transition-all ${
                chart === c ? "border-violet-400 bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300" : "border-border text-muted-foreground hover:bg-muted"
              }`}>{c} Chart</button>
          ))}
        </div>

        <motion.div key={chart} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          {/* Bar Chart */}
          {chart === "bar" && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Monthly Sales (Bar)</p>
              <div className="flex items-end gap-3 h-40 px-2">
                {months.map((m, i) => (
                  <div key={m} className="flex flex-col items-center gap-1 flex-1">
                    <span className="text-xs text-muted-foreground">{sales[i]}</span>
                    <motion.div initial={{ height: 0 }} animate={{ height: `${(sales[i] / maxVal) * 120}px` }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="w-full rounded-t-md bg-blue-500" />
                    <span className="text-xs text-muted-foreground">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Line Chart */}
          {chart === "line" && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Sales vs Costs (Line)</p>
              <div className="relative h-40 border rounded-xl bg-muted/20 px-4 py-3">
                <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                  {/* Sales line */}
                  <motion.polyline
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }}
                    fill="none" stroke="#3b82f6" strokeWidth="2.5"
                    points={months.map((_, i) => `${i * 70 + 10},${120 - (sales[i] / maxVal) * 100}`).join(" ")} />
                  {/* Costs line */}
                  <motion.polyline
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
                    fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5,3"
                    points={months.map((_, i) => `${i * 70 + 10},${120 - (costs[i] / maxVal) * 100}`).join(" ")} />
                  {months.map((m, i) => (
                    <g key={m}>
                      <circle cx={i * 70 + 10} cy={120 - (sales[i] / maxVal) * 100} r="4" fill="#3b82f6" />
                      <circle cx={i * 70 + 10} cy={120 - (costs[i] / maxVal) * 100} r="4" fill="#ef4444" />
                    </g>
                  ))}
                </svg>
                <div className="absolute top-2 right-3 flex gap-3 text-xs">
                  <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-blue-500 inline-block" /> Sales</span>
                  <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-red-500 inline-block border-dashed" /> Costs</span>
                </div>
              </div>
              <div className="flex justify-around text-xs text-muted-foreground">{months.map((m) => <span key={m}>{m}</span>)}</div>
            </div>
          )}

          {/* Scatter Plot */}
          {chart === "scatter" && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Costs vs Sales (Scatter)</p>
              <div className="relative h-48 border rounded-xl bg-muted/20 px-6 py-4">
                <svg className="w-full h-full" viewBox="0 0 260 140">
                  {months.map((m, i) => (
                    <motion.g key={m} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.12 }}
                      style={{ transformOrigin: `${((costs[i] - 70) / 40) * 220 + 20}px ${130 - ((sales[i] - 110) / 60) * 110}px` }}>
                      <circle cx={((costs[i] - 70) / 40) * 220 + 20} cy={130 - ((sales[i] - 110) / 60) * 110}
                        r="8" fill="#22c55e" opacity="0.8" />
                      <text x={((costs[i] - 70) / 40) * 220 + 24} y={130 - ((sales[i] - 110) / 60) * 110 - 10}
                        fontSize="9" fill="currentColor" className="fill-muted-foreground">{m}</text>
                    </motion.g>
                  ))}
                </svg>
                <div className="absolute bottom-1 left-0 right-0 text-center text-xs text-muted-foreground">Costs →</div>
                <div className="absolute left-0 top-0 bottom-0 flex items-center">
                  <span className="text-xs text-muted-foreground -rotate-90 whitespace-nowrap">Sales</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        <div className="rounded-lg border bg-amber-50 dark:bg-amber-950/20 border-amber-300 px-4 py-2 text-xs text-amber-700 dark:text-amber-400">
          💡 Simulated preview. Run locally with <span className="font-mono">pip install matplotlib</span> to see real charts.
        </div>
      </CardContent>
    </Card>
  );
}
