"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function formatAmerican(n: number): string {
  return n.toLocaleString("en-US");
}

const SAMPLES = [1000, 10000, 100000, 1000000, 9876543, 1234567890];

export function AmericanCommaVisualization() {
  const [input, setInput] = useState("1000000");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    const n = parseInt(input.replace(/,/g, ""), 10);
    if (isNaN(n)) { setError("Invalid number."); setResult(null); return; }
    setError(null);
    setResult(formatAmerican(n));
  };

  // Annotate where commas go
  const annotated = result
    ? result.split("").map((c) => ({ char: c, isComma: c === "," }))
    : [];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">American Comma Formatting</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <pre className="rounded-xl border bg-muted/40 px-4 py-3 text-xs font-mono whitespace-pre overflow-x-auto">
{`number = int(input("Enter a large integer: "))
formatted = f"{number:,}"
print("American format:", formatted)`}
        </pre>

        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Enter a number</p>
            <input value={input} onChange={(e) => { setInput(e.target.value); setResult(null); setError(null); }}
              className="rounded-lg border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/30 px-3 py-1.5 text-sm font-mono outline-none w-44" />
          </div>
          <button onClick={handleFormat}
            className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
            Format
          </button>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-6 py-4 font-mono text-center">
                <p className="text-zinc-500 text-xs mb-2">f&quot;{"{"}number:,{"}"}&quot;</p>
                <div className="flex items-center justify-center flex-wrap gap-0.5">
                  {annotated.map((item, i) => (
                    <motion.span key={i} initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ delay: i * 0.04 }}
                      className={`text-2xl font-bold ${item.isComma ? "text-yellow-400 mx-0.5" : "text-emerald-400"}`}>
                      {item.char}
                    </motion.span>
                  ))}
                </div>
                <p className="text-zinc-500 text-xs mt-2">Groups of 3 digits from the right</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Quick examples</p>
          <div className="grid grid-cols-2 gap-2">
            {SAMPLES.map((n) => (
              <button key={n} onClick={() => { setInput(String(n)); setResult(formatAmerican(n)); setError(null); }}
                className="flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-mono hover:bg-muted/50 transition-colors">
                <span className="text-muted-foreground">{n}</span>
                <span className="text-emerald-500 font-bold">→ {formatAmerican(n)}</span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
