"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CallFrame {
  id: number;
  n: number;
  result?: number;
  status: "calling" | "returning";
}

let frameId = 0;

export function RecursionVisualization() {
  const [frames, setFrames] = useState<CallFrame[]>([]);
  const [running, setRunning] = useState(false);
  const [inputN, setInputN] = useState(5);
  const [finalResult, setFinalResult] = useState<number | null>(null);
  const stopRef = useRef(false);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const visualizeFactorial = useCallback(async () => {
    stopRef.current = false;
    setRunning(true);
    setFinalResult(null);
    setFrames([]);

    const callStack: CallFrame[] = [];

    // Build up the call stack
    for (let i = inputN; i >= 0; i--) {
      if (stopRef.current) return;
      frameId++;
      const frame: CallFrame = { id: frameId, n: i, status: "calling" };
      callStack.push(frame);
      setFrames([...callStack]);
      await sleep(600);
    }

    // Now return from each call
    let result = 1;
    while (callStack.length > 0) {
      if (stopRef.current) return;
      const frame = callStack[callStack.length - 1];

      if (frame.n === 0) {
        frame.result = 1;
        frame.status = "returning";
        result = 1;
      } else {
        result = frame.n * result;
        frame.result = result;
        frame.status = "returning";
      }

      setFrames([...callStack]);
      await sleep(600);

      callStack.pop();
      setFrames([...callStack]);
      await sleep(300);
    }

    setFinalResult(result);
    setRunning(false);
  }, [inputN]);

  const reset = () => {
    stopRef.current = true;
    setRunning(false);
    setFrames([]);
    setFinalResult(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">
          Recursion Visualization - Factorial
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          {/* Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">n =</span>
              <select
                value={inputN}
                onChange={(e) => {
                  reset();
                  setInputN(Number(e.target.value));
                }}
                className="rounded-md border bg-background px-2 py-1 text-sm"
                disabled={running}
              >
                {[3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <Button onClick={visualizeFactorial} size="sm" disabled={running}>
              <Play className="h-4 w-4 mr-1" />
              Run factorial({inputN})
            </Button>
            <Button onClick={reset} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>

          {/* Call Stack */}
          <div className="w-full max-w-xs">
            <p className="text-xs text-muted-foreground text-center mb-2">
              Call Stack
            </p>
            <div className="border-l-2 border-r-2 border-b-2 border-muted-foreground/30 rounded-b-lg min-h-[200px] flex flex-col-reverse items-center p-2 gap-1.5">
              <AnimatePresence mode="popLayout">
                {frames.map((frame) => (
                  <motion.div
                    key={frame.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ type: "spring", bounce: 0.2 }}
                    className={`w-full rounded-md px-3 py-2 font-mono text-sm flex items-center justify-between ${
                      frame.status === "returning"
                        ? "bg-emerald-500/20 border border-emerald-500/50"
                        : "bg-primary/10 border border-primary/30"
                    }`}
                  >
                    <span>factorial({frame.n})</span>
                    {frame.result !== undefined && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-emerald-500 font-bold"
                      >
                        → {frame.result}
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {frames.length === 0 && !finalResult && (
                <p className="text-sm text-muted-foreground">
                  Click Run to start
                </p>
              )}
            </div>
          </div>

          {finalResult !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <p className="text-lg font-bold text-primary">
                factorial({inputN}) = {finalResult}
              </p>
            </motion.div>
          )}

          <p className="text-xs text-muted-foreground text-center max-w-xs">
            Watch how each recursive call is added to the stack, and results are
            returned from the base case upward.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
