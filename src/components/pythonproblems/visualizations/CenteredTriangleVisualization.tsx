"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function buildRows(h: number): { spaces: number; stars: number }[] {
  return Array.from({ length: h }, (_, i) => ({
    spaces: h - 1 - i,
    stars: 2 * i + 1,
  }));
}

export function CenteredTriangleVisualization() {
  const [height, setHeight] = useState(5);
  const [visibleCount, setVisibleCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const rows = buildRows(height);

  const handleRun = () => {
    setVisibleCount(0);
    setDone(false);
    setRunning(true);
    rows.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleCount(idx + 1);
        if (idx === rows.length - 1) { setRunning(false); setDone(true); }
      }, idx * 200 + 100);
    });
  };

  const handleReset = () => { setVisibleCount(0); setRunning(false); setDone(false); };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Centered Pyramid (*)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <pre className="rounded-xl border bg-muted/40 px-4 py-3 text-xs font-mono whitespace-pre overflow-x-auto">
{`h = int(input("Enter height: "))
for i in range(h):
    print(" " * (h - 1 - i) + "*" * (2 * i + 1))`}
        </pre>

        <div className="flex items-end gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">Height (1–8)</p>
            <input type="number" min={1} max={8} value={height}
              onChange={(e) => { setHeight(Math.min(8, Math.max(1, Number(e.target.value)))); handleReset(); }}
              className="w-20 rounded-lg border-2 border-violet-400 bg-violet-50 dark:bg-violet-950/30 px-2 py-1.5 text-sm font-mono outline-none" />
          </div>
          <Button size="sm" onClick={handleRun} disabled={running}><Play className="h-3.5 w-3.5 mr-1" />Run</Button>
          {(done || visibleCount > 0) && <Button size="sm" variant="outline" onClick={handleReset}><RotateCcw className="h-3.5 w-3.5 mr-1" />Reset</Button>}
        </div>

        {visibleCount > 0 && (
          <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-sm min-h-[60px]">
            <AnimatePresence>
              {rows.slice(0, visibleCount).map((row, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }}
                  className="flex items-center leading-6">
                  <span className="text-zinc-600 mr-2 select-none text-xs w-4">{idx + 1}</span>
                  <span className="text-zinc-600 whitespace-pre">{" ".repeat(row.spaces)}</span>
                  <span className="text-yellow-400 font-bold">{"*".repeat(row.stars)}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {done && (
          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
            <div className="rounded-lg border bg-muted/30 px-3 py-2 text-center">
              <p className="text-muted-foreground">Row 0</p>
              <p className="text-violet-400 font-bold">{height-1} spaces + 1 star</p>
            </div>
            <div className="rounded-lg border bg-muted/30 px-3 py-2 text-center">
              <p className="text-muted-foreground">Row {Math.floor((height-1)/2)}</p>
              <p className="text-violet-400 font-bold">{height-1-Math.floor((height-1)/2)} sp + {2*Math.floor((height-1)/2)+1} stars</p>
            </div>
            <div className="rounded-lg border bg-muted/30 px-3 py-2 text-center">
              <p className="text-muted-foreground">Row {height-1}</p>
              <p className="text-violet-400 font-bold">0 spaces + {2*(height-1)+1} stars</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
