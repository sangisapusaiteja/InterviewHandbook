"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PrintNameVisualization() {
  const [name, setName] = useState("Alice");
  const [times, setTimes] = useState(5);
  const [printed, setPrinted] = useState<number>(-1);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const handleRun = () => {
    if (!name.trim() || times < 1 || times > 20) return;
    setPrinted(-1);
    setDone(false);
    setRunning(true);

    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        setPrinted(i);
        if (i === times - 1) {
          setRunning(false);
          setDone(true);
        }
      }, i * 200 + 100);
    }
  };

  const handleReset = () => {
    setPrinted(-1);
    setRunning(false);
    setDone(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Print Name N Times</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Code snippet */}
        <pre className="rounded-xl border bg-muted/40 px-4 py-3 text-xs font-mono whitespace-pre overflow-x-auto">
{`name = input("Enter your name: ")
times = int(input("How many times? "))

for _ in range(times):
    print(name)`}
        </pre>

        {/* Inputs */}
        <div className="flex flex-wrap gap-4 items-end">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Name</p>
            <input
              value={name}
              onChange={(e) => { setName(e.target.value); handleReset(); }}
              placeholder="Enter name"
              className="rounded-lg border-2 border-violet-400 bg-violet-50 dark:bg-violet-950/30 px-3 py-1.5 text-sm font-mono outline-none w-40"
            />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Times (1–20)</p>
            <input
              type="number"
              min={1}
              max={20}
              value={times}
              onChange={(e) => { setTimes(Math.min(20, Math.max(1, Number(e.target.value)))); handleReset(); }}
              className="rounded-lg border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/30 px-3 py-1.5 text-sm font-mono outline-none w-24"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button size="sm" onClick={handleRun} disabled={running || !name.trim()}>
            <Play className="h-3.5 w-3.5 mr-1" /> Run
          </Button>
          {(done || printed >= 0) && (
            <Button size="sm" variant="outline" onClick={handleReset}>
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
            </Button>
          )}
        </div>

        {/* Output console */}
        {printed >= 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[60px] max-h-64 overflow-y-auto"
          >
            <AnimatePresence>
              {Array.from({ length: printed + 1 }).map((_, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-emerald-400"
                >
                  <span className="text-zinc-500 select-none mr-2">&gt;&gt;&gt;</span>
                  {name}
                </motion.p>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-xs"
          >
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              ✓ Printed &quot;{name}&quot; {times} time{times !== 1 ? "s" : ""}
            </span>
            <span className="text-muted-foreground">— loop ran {times} iteration{times !== 1 ? "s" : ""}</span>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
