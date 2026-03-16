"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function NegativeNumbersVisualization() {
  const [start, setStart] = useState(-2);
  const [stop, setStop] = useState(-20);
  const [revealed, setRevealed] = useState<number>(-1);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [sequence, setSequence] = useState<number[]>([]);

  const buildSequence = (s: number, e: number) => {
    const seq: number[] = [];
    for (let i = s; i >= e; i -= 2) seq.push(i);
    return seq;
  };

  const handleRun = () => {
    const seq = buildSequence(start, stop);
    if (seq.length === 0) return;
    setSequence(seq);
    setRevealed(-1);
    setDone(false);
    setRunning(true);

    seq.forEach((_, idx) => {
      setTimeout(() => {
        setRevealed(idx);
        if (idx === seq.length - 1) {
          setRunning(false);
          setDone(true);
        }
      }, idx * 120 + 100);
    });
  };

  const handleReset = () => {
    setRevealed(-1);
    setRunning(false);
    setDone(false);
    setSequence([]);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Negative Numbers — Interval of 2</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Code snippet */}
        <pre className="rounded-xl border bg-muted/40 px-4 py-3 text-xs font-mono whitespace-pre overflow-x-auto">
{`for i in range(-2, -21, -2):
    print(i)`}
        </pre>

        {/* Custom range controls */}
        <div className="flex flex-wrap items-end gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">Start (negative)</p>
            <input
              type="number"
              value={start}
              max={0}
              onChange={(e) => { setStart(Number(e.target.value)); handleReset(); }}
              className="w-24 rounded-lg border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-1.5 text-sm font-mono outline-none"
            />
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">End (inclusive)</p>
            <input
              type="number"
              value={stop}
              max={0}
              onChange={(e) => { setStop(Number(e.target.value)); handleReset(); }}
              className="w-24 rounded-lg border-2 border-red-400 bg-red-50 dark:bg-red-950/30 px-2 py-1.5 text-sm font-mono outline-none"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button size="sm" onClick={handleRun} disabled={running || start >= 0 || stop >= start}>
            <Play className="h-3.5 w-3.5 mr-1" /> Run
          </Button>
          {(done || revealed >= 0) && (
            <Button size="sm" variant="outline" onClick={handleReset}>
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
            </Button>
          )}
        </div>

        {/* Number line */}
        {revealed >= 0 && (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground font-medium">
              Printing: {revealed + 1} of {sequence.length} numbers
            </p>
            <div className="flex flex-wrap gap-1.5">
              {sequence.map((num, idx) => (
                <AnimatePresence key={num}>
                  {idx <= revealed && (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0, y: -8 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 280, damping: 20 }}
                      className={`min-w-[2.75rem] h-10 px-2 rounded-lg flex items-center justify-center text-xs font-mono font-bold border-2 ${
                        idx === revealed
                          ? "border-red-400 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 shadow-sm"
                          : "border-muted bg-muted/30 text-muted-foreground"
                      }`}
                    >
                      {num}
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>

            {/* Arrow showing step direction */}
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span>step = </span>
              <span className="text-red-500 font-bold">-2</span>
              <span className="text-red-400">→ counting downward</span>
            </div>

            {done && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-medium"
              >
                ✓ Loop complete — printed {sequence.length} negative numbers
              </motion.p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
