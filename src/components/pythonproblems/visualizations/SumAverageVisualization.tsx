"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SumAverageVisualization() {
  const [inputs, setInputs] = useState(["", "", ""]);
  const [result, setResult] = useState<{ total: number; average: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<number>(-1);

  const labels = ["First Number", "Second Number", "Third Number"];
  const colors = [
    "border-blue-400 bg-blue-50 dark:bg-blue-950/30",
    "border-violet-400 bg-violet-50 dark:bg-violet-950/30",
    "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
  ];
  const textColors = [
    "text-blue-600 dark:text-blue-300",
    "text-violet-600 dark:text-violet-300",
    "text-emerald-600 dark:text-emerald-300",
  ];

  const handleRun = () => {
    setError(null);
    setResult(null);
    setStep(-1);

    const nums = inputs.map((v) => parseFloat(v));
    if (nums.some(isNaN)) {
      setError("Please enter valid numbers in all three fields.");
      return;
    }

    // Animate step by step
    setTimeout(() => setStep(0), 300);
    setTimeout(() => setStep(1), 700);
    setTimeout(() => setStep(2), 1100);
    setTimeout(() => {
      const total = nums[0] + nums[1] + nums[2];
      const average = total / 3;
      setResult({ total, average });
      setStep(3);
    }, 1500);
  };

  const handleReset = () => {
    setInputs(["", "", ""]);
    setResult(null);
    setError(null);
    setStep(-1);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Sum &amp; Average — Step-by-Step</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Input fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {labels.map((label, i) => (
            <div key={label} className="space-y-1">
              <p className={`text-xs font-semibold ${textColors[i]}`}>{label}</p>
              <input
                type="number"
                value={inputs[i]}
                onChange={(e) => {
                  const next = [...inputs];
                  next[i] = e.target.value;
                  setInputs(next);
                  setResult(null);
                  setError(null);
                  setStep(-1);
                }}
                placeholder="e.g. 10"
                className={`w-full rounded-lg border-2 px-3 py-2 text-sm font-mono outline-none transition-colors focus:ring-2 focus:ring-offset-1 ${colors[i]}`}
              />
            </div>
          ))}
        </div>

        {error && (
          <p className="text-xs text-red-500 font-medium">{error}</p>
        )}

        {/* Controls */}
        <div className="flex gap-2">
          <Button size="sm" onClick={handleRun} disabled={step >= 0 && !result}>
            <Play className="h-3.5 w-3.5 mr-1" /> Run
          </Button>
          {(result || error) && (
            <Button size="sm" variant="outline" onClick={handleReset}>
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
            </Button>
          )}
        </div>

        {/* Step-by-step animation */}
        <AnimatePresence>
          {step >= 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {/* Input assignment steps */}
              {[0, 1, 2].map((i) => (
                step >= i && (
                  <motion.div
                    key={`step-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`rounded-lg border-2 px-4 py-2 font-mono text-sm ${colors[i]}`}
                  >
                    <span className="font-bold">{`num${i + 1}`}</span>
                    <span className="text-muted-foreground"> = </span>
                    <span className={`font-bold ${textColors[i]}`}>{inputs[i]}</span>
                  </motion.div>
                )
              ))}

              {/* Total and average */}
              {result && (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-lg border-2 border-orange-400 bg-orange-50 dark:bg-orange-950/30 px-4 py-2 font-mono text-sm"
                  >
                    <span className="font-bold text-orange-600 dark:text-orange-300">total</span>
                    <span className="text-muted-foreground"> = {inputs[0]} + {inputs[1]} + {inputs[2]} = </span>
                    <span className="font-bold text-orange-600 dark:text-orange-300">{result.total}</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-lg border-2 border-pink-400 bg-pink-50 dark:bg-pink-950/30 px-4 py-2 font-mono text-sm"
                  >
                    <span className="font-bold text-pink-600 dark:text-pink-300">average</span>
                    <span className="text-muted-foreground"> = {result.total} / 3 = </span>
                    <span className="font-bold text-pink-600 dark:text-pink-300">
                      {parseFloat(result.average.toFixed(4))}
                    </span>
                  </motion.div>

                  {/* Output */}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1"
                  >
                    <p className="text-emerald-400">
                      <span className="text-zinc-500 select-none mr-2">&gt;&gt;&gt;</span>
                      Total: {result.total}
                    </p>
                    <p className="text-emerald-400">
                      <span className="text-zinc-500 select-none mr-2">&gt;&gt;&gt;</span>
                      Average: {parseFloat(result.average.toFixed(4))}
                    </p>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
