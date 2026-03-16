"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Row = { Name: string; Math: number; Science: number; English: number; Total?: number; Average?: number };

const baseData: Row[] = [
  { Name: "Alice",   Math: 85, Science: 90, English: 78 },
  { Name: "Bob",     Math: 92, Science: 88, English: 85 },
  { Name: "Charlie", Math: 78, Science: 82, English: 91 },
  { Name: "Diana",   Math: 95, Science: 97, English: 88 },
];

type Step = "original" | "computed" | "filtered" | "stats";
const steps: { key: Step; label: string }[] = [
  { key: "original", label: "Original DataFrame" },
  { key: "computed", label: "Add Total & Average" },
  { key: "filtered", label: "Filter Avg > 88" },
  { key: "stats",    label: "describe()" },
];

export function PandasVisualization() {
  const [step, setStep] = useState<Step>("original");

  const withComputed: Row[] = baseData.map((r) => ({
    ...r,
    Total: r.Math + r.Science + r.English,
    Average: parseFloat(((r.Math + r.Science + r.English) / 3).toFixed(2)),
  }));

  const filtered = withComputed.filter((r) => (r.Average ?? 0) > 88);

  const numCols: (keyof Row)[] = ["Math", "Science", "English"];
  const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const std  = (arr: number[]) => Math.sqrt(arr.reduce((a, b) => a + (b - mean(arr)) ** 2, 0) / arr.length);

  const statsRows = [
    { stat: "count", ...Object.fromEntries(numCols.map((c) => [c, baseData.length])) },
    { stat: "mean",  ...Object.fromEntries(numCols.map((c) => [c, mean(baseData.map((r) => r[c] as number)).toFixed(2)])) },
    { stat: "std",   ...Object.fromEntries(numCols.map((c) => [c, std(baseData.map((r) => r[c] as number)).toFixed(2)])) },
    { stat: "min",   ...Object.fromEntries(numCols.map((c) => [c, Math.min(...baseData.map((r) => r[c] as number))])) },
    { stat: "max",   ...Object.fromEntries(numCols.map((c) => [c, Math.max(...baseData.map((r) => r[c] as number))])) },
  ];

  const renderTable = (rows: Record<string, unknown>[], cols: string[]) => (
    <div className="overflow-x-auto rounded-xl border">
      <table className="text-xs font-mono w-full">
        <thead>
          <tr className="bg-muted/50">
            {cols.map((c) => <th key={c} className="px-3 py-2 text-left font-semibold text-muted-foreground border-b">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              className="border-b last:border-0 hover:bg-muted/20">
              {cols.map((c) => (
                <td key={c} className={`px-3 py-2 ${c === "Name" || c === "stat" ? "font-semibold" : ""} ${
                  c === "Average" && Number(row[c]) > 88 ? "text-emerald-600 dark:text-emerald-400 font-bold" : ""
                }`}>{String(row[c] ?? "")}</td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          Pandas DataFrame Operations
          <Badge variant="secondary" className="text-[10px]">Simulated</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {steps.map((s) => (
            <button key={s.key} onClick={() => setStep(s.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${
                step === s.key ? "border-blue-400 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300" : "border-border text-muted-foreground hover:bg-muted"
              }`}>{s.label}</button>
          ))}
        </div>

        <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {step === "original" && renderTable(baseData as unknown as Record<string, unknown>[], ["Name", "Math", "Science", "English"])}
          {step === "computed" && renderTable(withComputed as unknown as Record<string, unknown>[], ["Name", "Math", "Science", "English", "Total", "Average"])}
          {step === "filtered" && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-mono">df[df[&quot;Average&quot;] &gt; 88]</p>
              {renderTable(filtered as unknown as Record<string, unknown>[], ["Name", "Average"])}
            </div>
          )}
          {step === "stats" && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-mono">df[[&quot;Math&quot;,&quot;Science&quot;,&quot;English&quot;]].describe()</p>
              {renderTable(statsRows as unknown as Record<string, unknown>[], ["stat", "Math", "Science", "English"])}
            </div>
          )}
        </motion.div>

        <div className="rounded-lg border bg-amber-50 dark:bg-amber-950/20 border-amber-300 px-4 py-2 text-xs text-amber-700 dark:text-amber-400">
          💡 This visualization simulates pandas output. Run the code locally with <span className="font-mono">pip install pandas</span>.
        </div>
      </CardContent>
    </Card>
  );
}
