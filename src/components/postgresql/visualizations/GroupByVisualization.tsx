"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SalesRow {
  id: number;
  product: string;
  category: string;
  amount: number;
  date: string;
}

interface QueryOption {
  label: string;
  sql: string;
  groupByCol: string;
  aggregateLabel: string;
  computeGroups: (rows: SalesRow[]) => { key: string; color: string; rows: SalesRow[]; result: Record<string, string | number> }[];
}

const categoryColors: Record<string, string> = {
  Electronics: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  Clothing: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  Books: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  Food: "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
};

const categoryBgColors: Record<string, string> = {
  Electronics: "bg-blue-500/10",
  Clothing: "bg-emerald-500/10",
  Books: "bg-violet-500/10",
  Food: "bg-amber-500/10",
};

const categoryBadgeColors: Record<string, string> = {
  Electronics: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  Clothing: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  Books: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
  Food: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
};

const salesData: SalesRow[] = [
  { id: 1, product: "Laptop", category: "Electronics", amount: 1200, date: "2024-01-05" },
  { id: 2, product: "T-Shirt", category: "Clothing", amount: 25, date: "2024-01-06" },
  { id: 3, product: "Novel", category: "Books", amount: 15, date: "2024-01-07" },
  { id: 4, product: "Headphones", category: "Electronics", amount: 80, date: "2024-01-08" },
  { id: 5, product: "Jeans", category: "Clothing", amount: 60, date: "2024-01-09" },
  { id: 6, product: "Cookbook", category: "Books", amount: 30, date: "2024-01-10" },
  { id: 7, product: "Phone", category: "Electronics", amount: 900, date: "2024-01-11" },
  { id: 8, product: "Pizza", category: "Food", amount: 18, date: "2024-01-12" },
  { id: 9, product: "Jacket", category: "Clothing", amount: 110, date: "2024-01-13" },
  { id: 10, product: "Bread", category: "Food", amount: 5, date: "2024-01-14" },
];

function groupBy(rows: SalesRow[], key: keyof SalesRow): Record<string, SalesRow[]> {
  const groups: Record<string, SalesRow[]> = {};
  for (const row of rows) {
    const k = String(row[key]);
    if (!groups[k]) groups[k] = [];
    groups[k].push(row);
  }
  return groups;
}

const queries: QueryOption[] = [
  {
    label: "SUM by Category",
    sql: `SELECT category,\n       COUNT(*) AS total_items,\n       SUM(amount) AS total_sales\nFROM sales\nGROUP BY category;`,
    groupByCol: "category",
    aggregateLabel: "SUM(amount)",
    computeGroups: (rows) => {
      const groups = groupBy(rows, "category");
      return Object.entries(groups).map(([key, gRows]) => ({
        key,
        color: key,
        rows: gRows,
        result: {
          category: key,
          total_items: gRows.length,
          total_sales: gRows.reduce((s, r) => s + r.amount, 0),
        },
      }));
    },
  },
  {
    label: "AVG by Category",
    sql: `SELECT category,\n       COUNT(*) AS num_products,\n       ROUND(AVG(amount), 2) AS avg_price\nFROM sales\nGROUP BY category;`,
    groupByCol: "category",
    aggregateLabel: "AVG(amount)",
    computeGroups: (rows) => {
      const groups = groupBy(rows, "category");
      return Object.entries(groups).map(([key, gRows]) => ({
        key,
        color: key,
        rows: gRows,
        result: {
          category: key,
          num_products: gRows.length,
          avg_price: Math.round((gRows.reduce((s, r) => s + r.amount, 0) / gRows.length) * 100) / 100,
        },
      }));
    },
  },
  {
    label: "MAX/MIN by Category",
    sql: `SELECT category,\n       MIN(amount) AS cheapest,\n       MAX(amount) AS most_expensive\nFROM sales\nGROUP BY category;`,
    groupByCol: "category",
    aggregateLabel: "MIN / MAX",
    computeGroups: (rows) => {
      const groups = groupBy(rows, "category");
      return Object.entries(groups).map(([key, gRows]) => ({
        key,
        color: key,
        rows: gRows,
        result: {
          category: key,
          cheapest: Math.min(...gRows.map((r) => r.amount)),
          most_expensive: Math.max(...gRows.map((r) => r.amount)),
        },
      }));
    },
  },
];

export function GroupByVisualization() {
  const [queryIdx, setQueryIdx] = useState(0);
  const [step, setStep] = useState(1);

  const query = queries[queryIdx];
  const groups = query.computeGroups(salesData);

  const handleSelectQuery = (idx: number) => {
    setQueryIdx(idx);
    setStep(1);
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleReset = () => {
    setStep(1);
  };

  const resultColumns = groups.length > 0 ? Object.keys(groups[0].result) : [];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">GROUP BY Clause</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Query selector */}
        <div className="flex flex-wrap gap-2">
          {queries.map((q, i) => {
            const isActive = queryIdx === i;
            return (
              <motion.button
                key={q.label}
                onClick={() => handleSelectQuery(i)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300 shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {q.label}
              </motion.button>
            );
          })}
        </div>

        {/* SQL query */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">SQL Query</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {query.sql}
          </pre>
        </div>

        {/* Step controls */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3].map((s) => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  step === s
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                Step {s}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          {step < 3 && (
            <Button size="sm" onClick={handleNext}>
              <Play className="h-3.5 w-3.5 mr-1" />
              {step === 1 ? "Group Rows" : "Aggregate"}
              <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
            </Button>
          )}
          {step === 3 && (
            <Button size="sm" variant="outline" onClick={handleReset}>
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              Reset
            </Button>
          )}
        </div>

        {/* Step description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`rounded-xl border p-3 ${
              step === 1
                ? "bg-muted/40 border-border text-muted-foreground"
                : step === 2
                ? "bg-violet-500/10 border-violet-500/30 text-violet-700 dark:text-violet-300"
                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
            }`}
          >
            <p className="text-sm font-medium">
              {step === 1 && "Step 1: Original Table -- All rows before any grouping is applied."}
              {step === 2 &&
                `Step 2: Group By ${query.groupByCol} -- Rows are partitioned into groups based on matching values. Each color represents a group.`}
              {step === 3 &&
                "Step 3: Aggregated Result -- Each group is collapsed into a single row with computed aggregate values."}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Visualization area */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="rounded-xl border overflow-hidden text-xs">
                <div className="grid grid-cols-5 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                  <span>id</span>
                  <span>product</span>
                  <span>category</span>
                  <span>amount</span>
                  <span>date</span>
                </div>
                {salesData.map((row, i) => (
                  <motion.div
                    key={row.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="grid grid-cols-5 px-3 py-2 border-t hover:bg-muted/30"
                  >
                    <code className="font-mono text-muted-foreground">{row.id}</code>
                    <code className="font-mono font-medium text-primary">{row.product}</code>
                    <code className="font-mono text-muted-foreground">{row.category}</code>
                    <code className="font-mono text-muted-foreground">${row.amount}</code>
                    <code className="font-mono text-muted-foreground">{row.date}</code>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              {groups.map((group, gi) => (
                <motion.div
                  key={group.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: gi * 0.1 }}
                  className={`rounded-xl border overflow-hidden ${categoryColors[group.key] || "bg-muted/40 border-border"}`}
                >
                  <div className="px-3 py-2 flex items-center gap-2">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        categoryBadgeColors[group.key] || "bg-muted text-muted-foreground"
                      }`}
                    >
                      {group.key}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {group.rows.length} row{group.rows.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className={`${categoryBgColors[group.key] || "bg-muted/20"}`}>
                    <div className="grid grid-cols-5 bg-muted/40 px-3 py-1.5 text-[10px] font-semibold text-muted-foreground">
                      <span>id</span>
                      <span>product</span>
                      <span>category</span>
                      <span>amount</span>
                      <span>date</span>
                    </div>
                    {group.rows.map((row, ri) => (
                      <motion.div
                        key={row.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: gi * 0.1 + ri * 0.05 }}
                        className="grid grid-cols-5 px-3 py-1.5 border-t border-border/30 text-xs"
                      >
                        <code className="font-mono text-muted-foreground">{row.id}</code>
                        <code className="font-mono font-medium">{row.product}</code>
                        <code className="font-mono">{row.category}</code>
                        <code className="font-mono">${row.amount}</code>
                        <code className="font-mono text-muted-foreground">{row.date}</code>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {/* Result table */}
              <div className="rounded-xl border overflow-hidden text-xs">
                <div
                  className="bg-muted/60 px-3 py-2 font-semibold text-muted-foreground"
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${resultColumns.length}, 1fr)`,
                  }}
                >
                  {resultColumns.map((col) => (
                    <span key={col}>{col}</span>
                  ))}
                </div>
                {groups.map((group, gi) => (
                  <motion.div
                    key={group.key}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: gi * 0.12 }}
                    className={`px-3 py-2 border-t ${categoryBgColors[group.key] || ""}`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${resultColumns.length}, 1fr)`,
                    }}
                  >
                    {resultColumns.map((col) => (
                      <code key={col} className="font-mono font-medium text-xs">
                        {col === "category" ? (
                          <span
                            className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              categoryBadgeColors[String(group.result[col])] || ""
                            }`}
                          >
                            {String(group.result[col])}
                          </span>
                        ) : (
                          <span>
                            {typeof group.result[col] === "number" && col !== "total_items" && col !== "num_products"
                              ? `$${group.result[col]}`
                              : String(group.result[col])}
                          </span>
                        )}
                      </code>
                    ))}
                  </motion.div>
                ))}
              </div>

              {/* Output */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1"
              >
                <p className="text-emerald-400">({groups.length} rows returned)</p>
                <p className="text-muted-foreground">
                  -- Each group collapsed into one row using aggregate functions
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
