"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function buildRows(h: number): string[] {
  const rows: string[] = [];
  for (let i = 0; i < h; i++) {
    rows.push(" ".repeat(i) + "#" + " ".repeat(2 * (h - i - 1)) + "#");
  }
  return rows;
}

export function ConvergingTriangleVisualization() {
  const [height, setHeight] = useState(5);
  const [visibleRows, setVisibleRows] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const rows = buildRows(height);

  const handleRun = () => {
    setVisibleRows([]);
    setDone(false);
    setRunning(true);
    rows.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleRows((prev) => [...prev, rows[idx]]);
        if (idx === rows.length - 1) { setRunning(false); setDone(true); }
      }, idx * 180 + 100);
    });
  };

  const handleReset = () => { setVisibleRows([]); setRunning(false); setDone(false); };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Converging Triangle (#…#)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <pre className="rounded-xl border bg-muted/40 px-4 py-3 text-xs font-mono whitespace-pre overflow-x-auto">
{`h = int(input("Enter height: "))
for i in range(h):
    print(" " * i + "#" + " " * (2 * (h - i - 1)) + "#")`}
        </pre>

        <div className="flex items-end gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">Height (1–10)</p>
            <input type="number" min={1} max={10} value={height}
              onChange={(e) => { setHeight(Math.min(10, Math.max(1, Number(e.target.value)))); handleReset(); }}
              className="w-20 rounded-lg border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-1.5 text-sm font-mono outline-none" />
          </div>
          <Button size="sm" onClick={handleRun} disabled={running}><Play className="h-3.5 w-3.5 mr-1" />Run</Button>
          {(done || visibleRows.length > 0) && <Button size="sm" variant="outline" onClick={handleReset}><RotateCcw className="h-3.5 w-3.5 mr-1" />Reset</Button>}
        </div>

        {visibleRows.length > 0 && (
          <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-sm min-h-[60px]">
            <AnimatePresence>
              {visibleRows.map((row, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }}
                  className="text-emerald-400 whitespace-pre leading-6">
                  <span className="text-zinc-600 mr-2 select-none text-xs">{idx + 1}</span>{row}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {done && (
          <div className="space-y-1 text-xs text-muted-foreground font-mono">
            <p>Row 0: <span className="text-blue-400">0 spaces</span> left, <span className="text-orange-400">{2*(height-1)} spaces</span> gap</p>
            <p>Row {height-1}: <span className="text-blue-400">{height-1} spaces</span> left, <span className="text-orange-400">0 spaces</span> gap → ## adjacent</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
