"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function indianFormat(n: number): string {
  const s = String(Math.abs(n));
  if (s.length <= 3) return (n < 0 ? "-" : "") + s;
  let result = s.slice(-3);
  let rem = s.slice(0, -3);
  while (rem.length > 0) {
    result = rem.slice(-2) + "," + result;
    rem = rem.slice(0, -2);
  }
  return (n < 0 ? "-" : "") + result;
}

function americanFormat(n: number): string {
  return Math.abs(n).toLocaleString("en-US");
}

const SAMPLES = [1000, 100000, 1000000, 10000000, 100000000, 9876543210];

export function IndianCommaVisualization() {
  const [input, setInput] = useState("1000000");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    const n = parseInt(input.replace(/,/g, ""), 10);
    if (isNaN(n)) { setError("Invalid number."); setResult(null); return; }
    setError(null);
    setResult(indianFormat(n));
  };

  const num = parseInt(input.replace(/,/g, ""), 10);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Indian Comma Formatting</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <pre className="rounded-xl border bg-muted/40 px-4 py-3 text-xs font-mono whitespace-pre overflow-x-auto">
{`# Last 3 digits, then groups of 2
result = s[-3:]
s = s[:-3]
while s:
    result = s[-2:] + "," + result
    s = s[:-2]`}
        </pre>

        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Enter a number</p>
            <input value={input} onChange={(e) => { setInput(e.target.value); setResult(null); setError(null); }}
              className="rounded-lg border-2 border-orange-400 bg-orange-50 dark:bg-orange-950/30 px-3 py-1.5 text-sm font-mono outline-none w-44" />
          </div>
          <button onClick={handleFormat}
            className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
            Format
          </button>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <AnimatePresence>
          {result && !isNaN(num) && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 text-center font-mono">
                  <p className="text-zinc-500 text-[10px] mb-1">🇮🇳 Indian</p>
                  <p className="text-orange-400 text-xl font-bold">{result}</p>
                  <p className="text-zinc-600 text-[10px] mt-1">Last 3, then pairs of 2</p>
                </div>
                <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 text-center font-mono">
                  <p className="text-zinc-500 text-[10px] mb-1">🇺🇸 American</p>
                  <p className="text-blue-400 text-xl font-bold">{americanFormat(num)}</p>
                  <p className="text-zinc-600 text-[10px] mt-1">Groups of 3</p>
                </div>
              </div>
              <div className="rounded-lg border px-4 py-2 text-xs font-mono text-muted-foreground flex items-center gap-2">
                <span>Place value: </span>
                {num >= 10000000 && <span className="text-orange-400 font-bold">{Math.floor(num / 10000000)} Cr</span>}
                {num >= 100000 && <span className="text-yellow-400 font-bold">{Math.floor((num % 10000000) / 100000)} L</span>}
                {num >= 1000 && <span className="text-emerald-400 font-bold">{Math.floor((num % 100000) / 1000)} K</span>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Quick examples</p>
          <div className="grid grid-cols-2 gap-2">
            {SAMPLES.map((n) => (
              <button key={n} onClick={() => { setInput(String(n)); setResult(indianFormat(n)); setError(null); }}
                className="flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-mono hover:bg-muted/50 transition-colors">
                <span className="text-muted-foreground">{n.toLocaleString()}</span>
                <span className="text-orange-400 font-bold">→ {indianFormat(n)}</span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
