"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  created_at: string;
}

type QueryKey = "min_price" | "max_price" | "min_date" | "max_rating";

interface QueryInfo {
  label: string;
  sql: string;
  column: keyof Product;
  mode: "min" | "max";
  color: string;
  badgeColor: string;
  icon: "down" | "up";
  resultLabel: string;
}

const sampleData: Product[] = [
  { id: 1, name: "Wireless Mouse", price: 29.99, rating: 4.2, created_at: "2024-01-15" },
  { id: 2, name: "Mechanical Keyboard", price: 89.99, rating: 4.8, created_at: "2023-11-03" },
  { id: 3, name: "USB-C Hub", price: 45.50, rating: 3.9, created_at: "2024-03-22" },
  { id: 4, name: "Webcam HD", price: 59.99, rating: 4.5, created_at: "2023-08-10" },
  { id: 5, name: "Monitor Stand", price: 34.99, rating: 4.1, created_at: "2024-06-01" },
  { id: 6, name: "Laptop Sleeve", price: 19.99, rating: 4.6, created_at: "2023-05-18" },
];

const queries: Record<QueryKey, QueryInfo> = {
  min_price: {
    label: "MIN(price)",
    sql: "SELECT MIN(price) FROM products;",
    column: "price",
    mode: "min",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    icon: "down",
    resultLabel: "MIN(price)",
  },
  max_price: {
    label: "MAX(price)",
    sql: "SELECT MAX(price) FROM products;",
    column: "price",
    mode: "max",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    icon: "up",
    resultLabel: "MAX(price)",
  },
  min_date: {
    label: "MIN(created_at)",
    sql: "SELECT MIN(created_at) FROM products;",
    column: "created_at",
    mode: "min",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    icon: "down",
    resultLabel: "MIN(created_at)",
  },
  max_rating: {
    label: "MAX(rating)",
    sql: "SELECT MAX(rating) FROM products;",
    column: "rating",
    mode: "max",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    icon: "up",
    resultLabel: "MAX(rating)",
  },
};

const queryOrder: QueryKey[] = ["min_price", "max_price", "min_date", "max_rating"];

const columns: { key: keyof Product; label: string }[] = [
  { key: "id", label: "id" },
  { key: "name", label: "name" },
  { key: "price", label: "price" },
  { key: "rating", label: "rating" },
  { key: "created_at", label: "created_at" },
];

function findTargetIndex(query: QueryInfo): number {
  const values = sampleData.map((row) => row[query.column]);
  if (query.mode === "min") {
    let minIdx = 0;
    for (let i = 1; i < values.length; i++) {
      if (values[i] < values[minIdx]) minIdx = i;
    }
    return minIdx;
  } else {
    let maxIdx = 0;
    for (let i = 1; i < values.length; i++) {
      if (values[i] > values[maxIdx]) maxIdx = i;
    }
    return maxIdx;
  }
}

export function MinMaxVisualization() {
  const [selected, setSelected] = useState<QueryKey | null>(null);
  const [phase, setPhase] = useState<"idle" | "scanning" | "found">("idle");
  const [result, setResult] = useState<string | null>(null);

  const handleSelect = (key: QueryKey) => {
    setSelected(key);
    setPhase("idle");
    setResult(null);
  };

  const handleRun = () => {
    if (!selected) return;
    const query = queries[selected];

    // Phase 1: scanning — highlight column
    setPhase("scanning");
    setResult(null);

    // Phase 2: found — highlight the min/max value
    setTimeout(() => {
      const targetIdx = findTargetIndex(query);
      const targetValue = sampleData[targetIdx][query.column];
      setResult(String(targetValue));
      setPhase("found");
    }, 1200);
  };

  const activeQuery = selected ? queries[selected] : null;
  const targetIdx = selected ? findTargetIndex(queries[selected]) : -1;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">SQL MIN &amp; MAX Functions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Description */}
        <p className="text-xs text-muted-foreground">
          <code className="font-mono text-primary">MIN()</code> returns the smallest value and{" "}
          <code className="font-mono text-primary">MAX()</code> returns the largest value in a column.
          They work on numbers, dates, and strings (alphabetical order).
        </p>

        {/* Query buttons */}
        <div className="flex flex-wrap gap-2">
          {queryOrder.map((key) => {
            const q = queries[key];
            const isActive = selected === key;
            const IconComp = q.icon === "down" ? ArrowDown : ArrowUp;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive ? q.color + " shadow-sm" : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <IconComp className="h-3 w-3" />
                {q.label}
              </motion.button>
            );
          })}
        </div>

        {/* SQL preview */}
        <AnimatePresence mode="wait">
          {activeQuery && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="space-y-2"
            >
              <p className="text-xs font-semibold text-muted-foreground">Query</p>
              <div className="flex items-center gap-3">
                <pre className="flex-1 text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
                  {activeQuery.sql}
                </pre>
                <Button size="sm" onClick={handleRun} disabled={phase === "scanning"}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Data table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">products table</p>
          <div className="rounded-xl border overflow-hidden text-xs">
            {/* Header */}
            <div className="grid grid-cols-5 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              {columns.map((col) => (
                <span
                  key={col.key}
                  className={
                    activeQuery && col.key === activeQuery.column && phase !== "idle"
                      ? "text-primary font-bold"
                      : ""
                  }
                >
                  {col.label}
                  {activeQuery && col.key === activeQuery.column && phase !== "idle" && (
                    <span className="ml-1">
                      {activeQuery.mode === "min" ? "\u2193" : "\u2191"}
                    </span>
                  )}
                </span>
              ))}
            </div>

            {/* Rows */}
            {sampleData.map((row, rowIdx) => {
              const isTarget = phase === "found" && rowIdx === targetIdx;
              const isScannedCol =
                activeQuery && phase !== "idle" ? activeQuery.column : null;

              return (
                <motion.div
                  key={row.id}
                  className={`grid grid-cols-5 px-3 py-2 border-t transition-colors ${
                    isTarget
                      ? "bg-emerald-500/10 dark:bg-emerald-500/15"
                      : "hover:bg-muted/30"
                  }`}
                  animate={
                    phase === "scanning" && isScannedCol
                      ? {
                          backgroundColor: [
                            "rgba(0,0,0,0)",
                            "rgba(99,102,241,0.08)",
                            "rgba(0,0,0,0)",
                          ],
                        }
                      : {}
                  }
                  transition={
                    phase === "scanning"
                      ? { duration: 0.8, delay: rowIdx * 0.12, ease: "easeInOut" }
                      : {}
                  }
                >
                  {columns.map((col) => {
                    const isActiveCol = isScannedCol === col.key;
                    const isTargetCell = isTarget && isActiveCol;

                    return (
                      <span
                        key={col.key}
                        className={`font-mono transition-all ${
                          isTargetCell
                            ? "text-emerald-600 dark:text-emerald-400 font-bold"
                            : isActiveCol && phase === "scanning"
                            ? "text-blue-600 dark:text-blue-400 font-medium"
                            : isActiveCol && phase === "found"
                            ? "text-muted-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {col.key === "price"
                          ? `$${row[col.key]}`
                          : String(row[col.key])}
                      </span>
                    );
                  })}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Result output */}
        <AnimatePresence mode="wait">
          {phase === "found" && result && activeQuery ? (
            <motion.div
              key={`result-${selected}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1"
            >
              <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">Result</p>
              <p className="text-emerald-400">
                <span className="text-zinc-500 select-none mr-2">#</span>
                {activeQuery.resultLabel} = {activeQuery.column === "price" ? `$${result}` : result}
              </p>
              <p className="text-zinc-500 mt-2 text-[10px]">
                {activeQuery.mode === "min" ? "Smallest" : "Largest"} value found by scanning all{" "}
                {sampleData.length} rows in the &quot;{activeQuery.column}&quot; column.
              </p>
            </motion.div>
          ) : phase === "scanning" ? (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border bg-muted/20 px-4 py-3 flex items-center justify-center"
            >
              <p className="text-xs text-muted-foreground italic">
                Scanning column &quot;{activeQuery?.column}&quot; for{" "}
                {activeQuery?.mode === "min" ? "minimum" : "maximum"} value...
              </p>
            </motion.div>
          ) : selected ? (
            <motion.div
              key="ph"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border bg-muted/20 px-4 py-3 flex items-center justify-center"
            >
              <p className="text-xs text-muted-foreground italic">Click Run to execute the query</p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border bg-muted/20 px-4 py-3 flex items-center justify-center"
            >
              <p className="text-xs text-muted-foreground italic">
                Select a MIN/MAX query above to get started
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Educational note */}
        <div className="rounded-xl border bg-violet-500/10 border-violet-500/30 px-4 py-3 text-xs text-violet-700 dark:text-violet-300 space-y-1">
          <p className="font-semibold">Key Points</p>
          <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
            <li>
              <code className="font-mono text-violet-600 dark:text-violet-400">MIN()</code> and{" "}
              <code className="font-mono text-violet-600 dark:text-violet-400">MAX()</code> ignore NULL values
            </li>
            <li>For dates, MIN returns the earliest and MAX returns the latest</li>
            <li>For strings, comparison is alphabetical (lexicographic)</li>
            <li>They are aggregate functions &mdash; they collapse many rows into one result</li>
            <li>Can be combined with GROUP BY to find min/max per group</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
