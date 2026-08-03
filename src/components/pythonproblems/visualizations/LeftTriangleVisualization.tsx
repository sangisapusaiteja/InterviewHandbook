"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LeftTriangleVisualization() {
  const [height, setHeight] = useState(5);
  const [visibleCount, setVisibleCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const starCounts = Array.from({ length: height }, (_, i) => 2 * i + 1);

  const handleRun = () => {
    setVisibleCount(0);
    setDone(false);
    setRunning(true);
    starCounts.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleCount(idx + 1);
        if (idx === starCounts.length - 1) { setRunning(false); setDone(true); }
      }, idx * 200 + 100);
    });
  };

  const handleReset = () => { setVisibleCount(0); setRunning(false); setDone(false); };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Left-Aligned Triangle (*)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <pre className="rounded-xl border bg-muted/40 px-4 py-3 text-xs font-mono whitespace-pre overflow-x-auto">
{`h = int(input("Enter height: "))
for i in range(h):
    print("*" * (2 * i + 1))`}
        </pre>

        <div className="flex items-end gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">Height (1–8)</p>
            <input type="number" min={1} max={8} value={height}
              onChange={(e) => { setHeight(Math.min(8, Math.max(1, Number(e.target.value)))); handleReset(); }}
              className="w-20 rounded-lg border-2 border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1.5 text-sm font-mono outline-none" />
          </div>
          <Button size="sm" onClick={handleRun} disabled={running}><Play className="h-3.5 w-3.5 mr-1" />Run</Button>
          {(done || visibleCount > 0) && <Button size="sm" variant="outline" onClick={handleReset}><RotateCcw className="h-3.5 w-3.5 mr-1" />Reset</Button>}
        </div>

        {visibleCount > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pattern */}
            <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-sm min-h-[60px]">
              <AnimatePresence>
                {starCounts.slice(0, visibleCount).map((stars, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }}
                    className="text-emerald-400 leading-6">
                    <span className="text-zinc-600 mr-2 select-none text-xs">{idx + 1}</span>
                    {"*".repeat(stars)}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {/* Formula breakdown */}
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground">Stars per row: 2×i+1</p>
              {starCounts.slice(0, visibleCount).map((stars, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }}
                  className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-muted-foreground w-8">i={idx}</span>
                  <span className="text-muted-foreground">2×{idx}+1 =</span>
                  <span className="text-emerald-400 font-bold">{stars}</span>
                  <span className="text-emerald-600">{"★".repeat(Math.min(stars, 9))}{stars > 9 ? "…" : ""}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
