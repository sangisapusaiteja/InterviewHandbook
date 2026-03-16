"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SEQUENCE = Array.from({ length: Math.ceil((90 - 8) / 3) }, (_, i) => 8 + i * 3);

export function ForLoopSequenceVisualization() {
  const [revealed, setRevealed] = useState<number>(-1);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const handleRun = () => {
    setRevealed(-1);
    setDone(false);
    setRunning(true);

    SEQUENCE.forEach((_, idx) => {
      setTimeout(() => {
        setRevealed(idx);
        if (idx === SEQUENCE.length - 1) {
          setRunning(false);
          setDone(true);
        }
      }, idx * 80 + 100);
    });
  };

  const handleReset = () => {
    setRevealed(-1);
    setRunning(false);
    setDone(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">for i in range(8, 90, 3)</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Code snippet */}
        <pre className="rounded-xl border bg-muted/40 px-4 py-3 text-xs font-mono whitespace-pre overflow-x-auto">
{`for i in range(8, 90, 3):
    print(i)`}
        </pre>

        {/* range breakdown */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-300">start = 8</span>
          <span className="px-2 py-1 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-300">stop = 90 (exclusive)</span>
          <span className="px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-300">step = 3</span>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button size="sm" onClick={handleRun} disabled={running}>
            <Play className="h-3.5 w-3.5 mr-1" /> Run
          </Button>
          {(done || revealed >= 0) && (
            <Button size="sm" variant="outline" onClick={handleReset}>
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
            </Button>
          )}
        </div>

        {/* Number grid */}
        {revealed >= 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">Output — {revealed + 1} of {SEQUENCE.length} numbers printed</p>
            <div className="flex flex-wrap gap-1.5">
              {SEQUENCE.map((num, idx) => (
                <AnimatePresence key={num}>
                  {idx <= revealed && (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono font-bold border-2 ${
                        idx === revealed
                          ? "border-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 shadow-sm"
                          : "border-muted bg-muted/30 text-muted-foreground"
                      }`}
                    >
                      {num}
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>
            {done && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-medium"
              >
                ✓ Loop complete — {SEQUENCE.length} numbers printed (8 to 89, step 3)
              </motion.p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
