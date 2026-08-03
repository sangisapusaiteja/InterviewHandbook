"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Scenario = "success" | "zero" | "type";

const scenarios: { key: Scenario; label: string; a: string; b: string; color: string }[] = [
  { key: "success", label: "10 ÷ 2 (success)", a: "10", b: "2", color: "text-emerald-500" },
  { key: "zero",    label: "10 ÷ 0 (ZeroDivision)", a: "10", b: "0", color: "text-red-500" },
  { key: "type",    label: "'abc' ÷ 2 (TypeError)", a: "'abc'", b: "2", color: "text-orange-500" },
];

const blocks = ["try", "except ZeroDivisionError", "except TypeError", "else", "finally"] as const;
type Block = typeof blocks[number];

const flowMap: Record<Scenario, Block[]> = {
  success: ["try", "else", "finally"],
  zero:    ["try", "except ZeroDivisionError", "finally"],
  type:    ["try", "except TypeError", "finally"],
};

const blockColors: Record<Block, string> = {
  "try":                     "border-blue-400 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300",
  "except ZeroDivisionError":"border-red-400 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300",
  "except TypeError":        "border-orange-400 bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300",
  "else":                    "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300",
  "finally":                 "border-violet-400 bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300",
};

const blockDesc: Record<Block, string> = {
  "try":                     "Risky code runs here",
  "except ZeroDivisionError":"Catches division by zero",
  "except TypeError":        "Catches wrong type error",
  "else":                    "Runs only if try succeeded",
  "finally":                 "Always runs — cleanup",
};

export function TryExceptVisualization() {
  const [active, setActive] = useState<Scenario>("success");
  const [step, setStep]     = useState(-1);
  const [running, setRunning] = useState(false);

  const flow = flowMap[active];

  const handleRun = () => {
    setStep(-1);
    setRunning(true);
    flow.forEach((_, idx) => {
      setTimeout(() => {
        setStep(idx);
        if (idx === flow.length - 1) setRunning(false);
      }, idx * 600 + 200);
    });
  };

  const sc = scenarios.find((s) => s.key === active)!;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Try / Except / Else / Finally Flow</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Scenario selector */}
        <div className="flex flex-wrap gap-2">
          {scenarios.map((s) => (
            <button key={s.key} onClick={() => { setActive(s.key); setStep(-1); setRunning(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${
                active === s.key ? `border-current ${s.color} bg-muted/40` : "border-border text-muted-foreground hover:bg-muted"
              }`}>
              {s.label}
            </button>
          ))}
        </div>

        {/* Call */}
        <div className="rounded-lg border bg-muted/30 px-4 py-2 font-mono text-sm">
          <span className="text-muted-foreground">divide(</span>
          <span className="text-blue-400">{sc.a}</span>
          <span className="text-muted-foreground">, </span>
          <span className="text-orange-400">{sc.b}</span>
          <span className="text-muted-foreground">)</span>
        </div>

        <button onClick={handleRun} disabled={running}
          className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50">
          {running ? "Animating…" : "▶ Run"}
        </button>

        {/* Flow blocks */}
        <div className="space-y-2">
          {blocks.map((block) => {
            const flowIdx = flow.indexOf(block);
            const isActive = flowIdx >= 0 && step >= flowIdx;
            const isCurrent = flowIdx >= 0 && step === flowIdx;
            const isInFlow = flowIdx >= 0;
            return (
              <AnimatePresence key={block}>
                <motion.div
                  animate={{ opacity: isActive ? 1 : isInFlow ? 0.4 : 0.2, scale: isCurrent ? 1.02 : 1 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-xl border-2 px-4 py-3 ${blockColors[block]} ${isCurrent ? "shadow-md" : ""}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm">{block}:</span>
                    {isCurrent && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-xs font-bold">← executing</motion.span>}
                    {isActive && !isCurrent && <span className="text-xs opacity-60">✓ done</span>}
                    {!isInFlow && <span className="text-xs opacity-40">skipped</span>}
                  </div>
                  <p className="text-xs mt-0.5 opacity-80">{blockDesc[block]}</p>
                </motion.div>
              </AnimatePresence>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
