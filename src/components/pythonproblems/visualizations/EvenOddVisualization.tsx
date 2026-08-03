"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

type Result = { number: number; isEven: boolean; remainder: number } | null;

export function EvenOddVisualization() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [step, setStep] = useState<number>(-1);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = () => {
    setError(null);
    setResult(null);
    setStep(-1);

    const num = parseInt(input, 10);
    if (isNaN(num)) {
      setError("Please enter a valid integer.");
      return;
    }

    // Animate steps
    setTimeout(() => setStep(0), 300);   // show conversion
    setTimeout(() => setStep(1), 800);   // show modulo
    setTimeout(() => {
      setResult({ number: num, isEven: num % 2 === 0, remainder: num % 2 });
      setStep(2);
    }, 1400);
  };

  const handleReset = () => {
    setInput("");
    setResult(null);
    setStep(-1);
    setError(null);
  };

  // Build a small sample table
  const sampleNumbers = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Even &amp; Odd — if/else Checker</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Code snippet */}
        <pre className="rounded-xl border bg-muted/40 px-4 py-3 text-xs font-mono whitespace-pre overflow-x-auto">
{`number = int(input("Enter a number: "))

if number % 2 == 0:
    print(number, "is Even")
else:
    print(number, "is Odd")`}
        </pre>

        {/* Input + run */}
        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Enter a number</p>
            <input
              type="number"
              value={input}
              onChange={(e) => { setInput(e.target.value); setResult(null); setStep(-1); setError(null); }}
              placeholder="e.g. 7"
              className="rounded-lg border-2 border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1.5 text-sm font-mono outline-none w-32"
            />
          </div>
          <Button size="sm" onClick={handleCheck} disabled={step >= 0 && !result}>
            <Play className="h-3.5 w-3.5 mr-1" /> Check
          </Button>
          {(result || error) && (
            <Button size="sm" variant="outline" onClick={handleReset}>
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
            </Button>
          )}
        </div>

        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

        {/* Step-by-step breakdown */}
        <AnimatePresence>
          {step >= 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {step >= 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-lg border-2 border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-4 py-2 font-mono text-sm"
                >
                  <span className="font-bold text-indigo-600 dark:text-indigo-300">number</span>
                  <span className="text-muted-foreground"> = int(&quot;{input}&quot;) = </span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-300">{input}</span>
                </motion.div>
              )}

              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-lg border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/30 px-4 py-2 font-mono text-sm"
                >
                  <span className="font-bold text-amber-600 dark:text-amber-300">{input} % 2</span>
                  <span className="text-muted-foreground"> = </span>
                  <span className="font-bold text-amber-600 dark:text-amber-300">
                    {parseInt(input, 10) % 2 < 0 ? Math.abs(parseInt(input, 10) % 2) : parseInt(input, 10) % 2}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    ({parseInt(input, 10) % 2 === 0 ? "remainder is 0 → Even" : "remainder is 1 → Odd"})
                  </span>
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`rounded-xl border-2 px-4 py-4 text-center ${
                    result.isEven
                      ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
                      : "border-violet-400 bg-violet-50 dark:bg-violet-950/30"
                  }`}
                >
                  <p className={`text-2xl font-bold mb-1 ${
                    result.isEven
                      ? "text-emerald-600 dark:text-emerald-300"
                      : "text-violet-600 dark:text-violet-300"
                  }`}>
                    {result.number} is {result.isEven ? "Even" : "Odd"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {result.number} % 2 = {result.remainder === 0 ? 0 : 1} →{" "}
                    {result.isEven
                      ? "divisible by 2, no remainder"
                      : "not divisible by 2, remainder = 1"}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sample number grid */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Quick Reference</p>
          <div className="flex flex-wrap gap-1.5">
            {sampleNumbers.map((n) => (
              <button
                key={n}
                onClick={() => { setInput(String(n)); setResult(null); setStep(-1); setError(null); }}
                className={`w-9 h-9 rounded-lg text-xs font-mono font-bold border-2 transition-all hover:scale-105 ${
                  n % 2 === 0
                    ? "border-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                    : "border-violet-400 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-emerald-400 inline-block" /> Even
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-violet-400 inline-block" /> Odd
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
