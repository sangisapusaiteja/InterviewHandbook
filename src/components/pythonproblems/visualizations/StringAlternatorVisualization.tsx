"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function StringAlternatorVisualization() {
  const [str1, setStr1] = useState("abcde");
  const [str2, setStr2] = useState("ABCDE");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<number>(-1);
  const [running, setRunning] = useState(false);

  const handleRun = () => {
    setResult(null);
    setError(null);
    setStep(-1);
    if (str1.length !== str2.length) {
      setError(`Strings have different lengths (${str1.length} vs ${str2.length}). Exiting.`);
      return;
    }
    setRunning(true);
    const pairs = str1.split("").map((c, i) => str2[i] + c);
    pairs.forEach((_, idx) => {
      setTimeout(() => {
        setStep(idx);
        if (idx === pairs.length - 1) {
          setResult(pairs.join(""));
          setRunning(false);
        }
      }, idx * 150 + 100);
    });
  };

  const handleReset = () => { setResult(null); setError(null); setStep(-1); setRunning(false); };

  const pairs = str1.length === str2.length
    ? str1.split("").map((c, i) => ({ a: c, b: str2[i], combined: str2[i] + c }))
    : [];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">String Alternator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <pre className="rounded-xl border bg-muted/40 px-4 py-3 text-xs font-mono whitespace-pre overflow-x-auto">
{`for i in range(len(str1)):
    result += str2[i] + str1[i]`}
        </pre>

        <div className="flex flex-wrap gap-3 items-end">
          <div className="space-y-1">
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400">String 1 (lowercase)</p>
            <input value={str1} onChange={(e) => { setStr1(e.target.value); handleReset(); }}
              className="rounded-lg border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/30 px-3 py-1.5 text-sm font-mono outline-none w-36" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-orange-600 dark:text-orange-400">String 2 (UPPERCASE)</p>
            <input value={str2} onChange={(e) => { setStr2(e.target.value); handleReset(); }}
              className="rounded-lg border-2 border-orange-400 bg-orange-50 dark:bg-orange-950/30 px-3 py-1.5 text-sm font-mono outline-none w-36" />
          </div>
          <Button size="sm" onClick={handleRun} disabled={running}><Play className="h-3.5 w-3.5 mr-1" />Run</Button>
          {(result || error || step >= 0) && <Button size="sm" variant="outline" onClick={handleReset}><RotateCcw className="h-3.5 w-3.5 mr-1" />Reset</Button>}
        </div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="rounded-lg border-2 border-red-400 bg-red-50 dark:bg-red-950/30 px-4 py-2 text-sm text-red-600 dark:text-red-400 font-mono">
            ✗ {error}
          </motion.div>
        )}

        {pairs.length > 0 && step >= 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground">Interleaving step by step (i = 0 to {str1.length - 1})</p>
            <div className="flex flex-wrap gap-1.5">
              {pairs.map((p, i) => (
                <AnimatePresence key={i}>
                  {i <= step && (
                    <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300 }}
                      className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-t-md flex items-center justify-center text-xs font-mono font-bold border ${
                        i === step ? "border-orange-400 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300" : "border-muted bg-muted/30 text-muted-foreground"
                      }`}>{p.b}</div>
                      <div className={`w-8 h-8 rounded-b-md flex items-center justify-center text-xs font-mono font-bold border-x border-b ${
                        i === step ? "border-blue-400 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" : "border-muted bg-muted/30 text-muted-foreground"
                      }`}>{p.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>
          </div>
        )}

        {result && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-sm">
            <p className="text-zinc-500 text-xs mb-1">Output</p>
            <p className="text-emerald-400 text-lg tracking-wider">{result}</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
