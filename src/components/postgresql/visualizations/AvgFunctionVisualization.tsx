"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Calculator, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type QueryKey = "basic" | "where" | "nulls" | "manual" | "precision";

interface StudentRow {
  id: number;
  name: string;
  subject: string;
  score: number | null;
}

interface QueryInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  sql: string;
  highlightRows: number[];
  highlightColumn: "score";
  calculation: {
    values: (number | null)[];
    includedValues: number[];
    sum: number;
    count: number;
    result: string;
    explanation: string;
  };
}

const students: StudentRow[] = [
  { id: 1, name: "Alice", subject: "Math", score: 92 },
  { id: 2, name: "Bob", subject: "Math", score: 78 },
  { id: 3, name: "Carol", subject: "Science", score: 88 },
  { id: 4, name: "David", subject: "Math", score: 95 },
  { id: 5, name: "Eve", subject: "Science", score: null },
  { id: 6, name: "Frank", subject: "Science", score: 72 },
  { id: 7, name: "Grace", subject: "Math", score: 85 },
  { id: 8, name: "Hank", subject: "Science", score: 91 },
];

const queries: Record<QueryKey, QueryInfo> = {
  basic: {
    label: "AVG(score)",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "AVG computes the arithmetic mean of all non-NULL values. NULL values are automatically excluded from both the sum and the count.",
    sql: "SELECT AVG(score) AS avg_score\nFROM students;",
    highlightRows: [0, 1, 2, 3, 5, 6, 7],
    highlightColumn: "score",
    calculation: {
      values: [92, 78, 88, 95, null, 72, 85, 91],
      includedValues: [92, 78, 88, 95, 72, 85, 91],
      sum: 601,
      count: 7,
      result: "85.8571428571428571",
      explanation:
        "NULLs excluded: Eve's NULL score is skipped. AVG = 601 / 7 = 85.857...",
    },
  },
  where: {
    label: "AVG + WHERE",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Combine AVG with WHERE to compute the average of a filtered subset of rows. The WHERE clause filters rows before AVG is applied.",
    sql: "SELECT AVG(score) AS avg_math_score\nFROM students\nWHERE subject = 'Math';",
    highlightRows: [0, 1, 3, 6],
    highlightColumn: "score",
    calculation: {
      values: [92, 78, 95, 85],
      includedValues: [92, 78, 95, 85],
      sum: 350,
      count: 4,
      result: "87.5000000000000000",
      explanation:
        "Only Math students: Alice(92) + Bob(78) + David(95) + Grace(85) = 350 / 4 = 87.5",
    },
  },
  nulls: {
    label: "NULL Handling",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "AVG silently ignores NULLs. This differs from treating NULL as 0. If ALL values are NULL, AVG returns NULL (not 0 or an error).",
    sql: "-- AVG skips NULLs:\nSELECT AVG(score) FROM students;\n-- = 601/7 = 85.86 (not 601/8!)\n\n-- Compare with treating NULL as 0:\nSELECT AVG(COALESCE(score, 0))\nFROM students;\n-- = 601/8 = 75.125",
    highlightRows: [4],
    highlightColumn: "score",
    calculation: {
      values: [92, 78, 88, 95, null, 72, 85, 91],
      includedValues: [92, 78, 88, 95, 72, 85, 91],
      sum: 601,
      count: 7,
      result: "AVG(score) = 85.857  vs  AVG(COALESCE(score,0)) = 75.125",
      explanation:
        "With NULLs excluded: 601/7 = 85.857. With NULLs as 0: 601/8 = 75.125. Big difference!",
    },
  },
  manual: {
    label: "AVG = SUM/COUNT",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "AVG(column) is equivalent to SUM(column) / COUNT(column). Both SUM and COUNT ignore NULLs, so the result is identical.",
    sql: "-- These are equivalent:\nSELECT AVG(score) FROM students;\nSELECT SUM(score)::NUMERIC\n       / COUNT(score) FROM students;\n\n-- Verify:\nSELECT\n  SUM(score) AS total,    -- 601\n  COUNT(score) AS cnt,     -- 7\n  AVG(score) AS average;   -- 85.857...",
    highlightRows: [0, 1, 2, 3, 5, 6, 7],
    highlightColumn: "score",
    calculation: {
      values: [92, 78, 88, 95, null, 72, 85, 91],
      includedValues: [92, 78, 88, 95, 72, 85, 91],
      sum: 601,
      count: 7,
      result: "SUM=601, COUNT=7, AVG=85.8571428571428571",
      explanation:
        "AVG(score) = SUM(score) / COUNT(score) = 601 / 7. COUNT(score) excludes NULLs, just like COUNT(*) counts all rows.",
    },
  },
  precision: {
    label: "Precision",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "PostgreSQL returns AVG with high precision for integer/numeric inputs. Use ROUND() or ::NUMERIC(p,s) to control decimal places in output.",
    sql: "-- Raw AVG (many decimal places):\nSELECT AVG(score) FROM students;\n-- 85.8571428571428571\n\n-- Rounded to 2 decimal places:\nSELECT ROUND(AVG(score), 2)\nFROM students;\n-- 85.86\n\n-- Cast to specific precision:\nSELECT AVG(score)::NUMERIC(5,1)\nFROM students;\n-- 85.9",
    highlightRows: [0, 1, 2, 3, 5, 6, 7],
    highlightColumn: "score",
    calculation: {
      values: [92, 78, 88, 95, null, 72, 85, 91],
      includedValues: [92, 78, 88, 95, 72, 85, 91],
      sum: 601,
      count: 7,
      result: "Raw: 85.8571428571  |  ROUND: 85.86  |  NUMERIC(5,1): 85.9",
      explanation:
        "Use ROUND(AVG(col), n) for n decimal places, or cast with ::NUMERIC(precision, scale).",
    },
  },
};

const queryOrder: QueryKey[] = ["basic", "where", "nulls", "manual", "precision"];

export function AvgFunctionVisualization() {
  const [selected, setSelected] = useState<QueryKey>("basic");
  const [running, setRunning] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const query = queries[selected];

  const handleSelect = (key: QueryKey) => {
    setSelected(key);
    setRunning(false);
    setShowResult(false);
  };

  const handleRun = () => {
    setRunning(true);
    setShowResult(false);
    setTimeout(() => {
      setShowResult(true);
    }, 600);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">SQL AVG() Function</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Query selector */}
        <div className="flex flex-wrap gap-2">
          {queryOrder.map((key) => {
            const q = queries[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? q.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <Calculator className="h-3 w-3" />
                {q.label}
              </motion.button>
            );
          })}
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`rounded-xl border p-3 ${query.color}`}
          >
            <p className="text-sm">{query.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Sample table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">
            students table
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>id</span>
              <span>name</span>
              <span>subject</span>
              <span>score</span>
            </div>
            {students.map((row, idx) => {
              const isHighlighted = running && query.highlightRows.includes(idx);
              const isNullRow = row.score === null;
              const isNullHighlight =
                running && selected === "nulls" && isNullRow;
              return (
                <motion.div
                  key={row.id}
                  className={`grid grid-cols-4 px-3 py-2 border-t transition-colors ${
                    isNullHighlight
                      ? "bg-violet-500/20 border-violet-500/30"
                      : isHighlighted
                      ? "bg-emerald-500/15 border-emerald-500/20"
                      : "hover:bg-muted/30"
                  }`}
                  animate={
                    isHighlighted || isNullHighlight
                      ? { scale: [1, 1.01, 1] }
                      : {}
                  }
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <span className="text-muted-foreground">{row.id}</span>
                  <span>{row.name}</span>
                  <span className="text-muted-foreground">{row.subject}</span>
                  <span
                    className={`font-mono font-medium ${
                      isNullHighlight
                        ? "text-violet-600 dark:text-violet-300 line-through"
                        : isHighlighted
                        ? "text-emerald-600 dark:text-emerald-300"
                        : isNullRow
                        ? "text-muted-foreground italic"
                        : "text-primary"
                    }`}
                  >
                    {row.score !== null ? row.score : "NULL"}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* SQL + Calculation + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              SQL Query
            </p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
              {query.sql}
            </pre>
            <Button size="sm" onClick={handleRun}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              Result
            </p>
            <AnimatePresence mode="wait">
              {showResult ? (
                <motion.div
                  key={`result-${selected}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-3 min-h-[120px]"
                >
                  {/* Step 1: Values included */}
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-zinc-500 mb-1">-- Values included:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {query.calculation.values.map((v, i) => (
                        <span
                          key={i}
                          className={`px-1.5 py-0.5 rounded text-xs ${
                            v === null
                              ? "bg-violet-500/20 text-violet-400 line-through"
                              : "bg-emerald-500/20 text-emerald-400"
                          }`}
                        >
                          {v !== null ? v : "NULL"}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Step 2: Sum and Count */}
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-zinc-500 mb-1">-- Calculation:</p>
                    <p className="text-blue-400">
                      SUM = {query.calculation.includedValues.join(" + ")} ={" "}
                      <span className="text-white font-bold">
                        {query.calculation.sum}
                      </span>
                    </p>
                    <p className="text-blue-400">
                      COUNT ={" "}
                      <span className="text-white font-bold">
                        {query.calculation.count}
                      </span>{" "}
                      (non-NULL values)
                    </p>
                  </motion.div>

                  {/* Step 3: Result */}
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="border-t border-zinc-700 pt-2"
                  >
                    <p className="text-emerald-400 font-bold">
                      {query.calculation.result}
                    </p>
                  </motion.div>

                  {/* Explanation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-start gap-2 pt-1"
                  >
                    <AlertTriangle className="h-3 w-3 text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-amber-400/80 text-[11px] leading-relaxed">
                      {query.calculation.explanation}
                    </p>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[120px] flex items-center justify-center"
                >
                  <p className="text-xs text-muted-foreground italic">
                    Click Run to see the AVG calculation
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
