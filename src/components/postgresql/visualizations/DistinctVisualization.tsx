"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DistinctKey = "basic" | "multi" | "distinct_on" | "count";

interface RowData {
  values: string[];
  isDuplicate: boolean;
}

interface DistinctCategory {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  columns: string[];
  inputRows: RowData[];
  outputRows: RowData[];
  example: string;
  output: string[];
}

const categories: Record<DistinctKey, DistinctCategory> = {
  basic: {
    label: "Basic DISTINCT",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "SELECT DISTINCT removes duplicate rows based on a single column. Only unique values are returned in the result set.",
    columns: ["city"],
    inputRows: [
      { values: ["New York"], isDuplicate: false },
      { values: ["Chicago"], isDuplicate: false },
      { values: ["New York"], isDuplicate: true },
      { values: ["Boston"], isDuplicate: false },
      { values: ["Chicago"], isDuplicate: true },
      { values: ["New York"], isDuplicate: true },
    ],
    outputRows: [
      { values: ["Boston"], isDuplicate: false },
      { values: ["Chicago"], isDuplicate: false },
      { values: ["New York"], isDuplicate: false },
    ],
    example: `SELECT DISTINCT city
FROM customers
ORDER BY city;`,
    output: ["city", "--------", "Boston", "Chicago", "New York", "(3 rows)"],
  },
  multi: {
    label: "Multi-Column",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "DISTINCT on multiple columns removes rows where the combination of all specified columns is duplicated. Each unique combination is kept.",
    columns: ["city", "state"],
    inputRows: [
      { values: ["Portland", "OR"], isDuplicate: false },
      { values: ["Portland", "ME"], isDuplicate: false },
      { values: ["Portland", "OR"], isDuplicate: true },
      { values: ["Springfield", "IL"], isDuplicate: false },
      { values: ["Springfield", "MO"], isDuplicate: false },
      { values: ["Springfield", "IL"], isDuplicate: true },
    ],
    outputRows: [
      { values: ["Portland", "ME"], isDuplicate: false },
      { values: ["Portland", "OR"], isDuplicate: false },
      { values: ["Springfield", "IL"], isDuplicate: false },
      { values: ["Springfield", "MO"], isDuplicate: false },
    ],
    example: `SELECT DISTINCT city, state
FROM locations
ORDER BY city, state;`,
    output: [
      "city         | state",
      "-------------+------",
      "Portland     | ME",
      "Portland     | OR",
      "Springfield  | IL",
      "Springfield  | MO",
      "(4 rows)",
    ],
  },
  distinct_on: {
    label: "DISTINCT ON",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "DISTINCT ON is PostgreSQL-specific. It keeps only the first row for each unique value of the specified expression, determined by the ORDER BY clause.",
    columns: ["department", "employee", "salary"],
    inputRows: [
      { values: ["Engineering", "Alice", "$130k"], isDuplicate: false },
      { values: ["Engineering", "Bob", "$120k"], isDuplicate: true },
      { values: ["Sales", "Carol", "$95k"], isDuplicate: false },
      { values: ["Sales", "Dan", "$88k"], isDuplicate: true },
      { values: ["Marketing", "Eve", "$105k"], isDuplicate: false },
      { values: ["Marketing", "Frank", "$98k"], isDuplicate: true },
    ],
    outputRows: [
      { values: ["Engineering", "Alice", "$130k"], isDuplicate: false },
      { values: ["Marketing", "Eve", "$105k"], isDuplicate: false },
      { values: ["Sales", "Carol", "$95k"], isDuplicate: false },
    ],
    example: `-- Top earner per department
SELECT DISTINCT ON (department)
    department, employee, salary
FROM employees
ORDER BY department, salary DESC;`,
    output: [
      "department  | employee | salary",
      "------------+----------+-------",
      "Engineering | Alice    | $130k",
      "Marketing   | Eve      | $105k",
      "Sales       | Carol    | $95k",
      "(3 rows)",
    ],
  },
  count: {
    label: "COUNT(DISTINCT)",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "COUNT(DISTINCT column) counts only the unique non-NULL values in a column. Useful for finding cardinality without returning all values.",
    columns: ["category"],
    inputRows: [
      { values: ["Electronics"], isDuplicate: false },
      { values: ["Books"], isDuplicate: false },
      { values: ["Electronics"], isDuplicate: true },
      { values: ["Clothing"], isDuplicate: false },
      { values: ["Books"], isDuplicate: true },
      { values: ["Electronics"], isDuplicate: true },
      { values: ["Clothing"], isDuplicate: true },
    ],
    outputRows: [{ values: ["4 (unique categories)"], isDuplicate: false }],
    example: `SELECT
  COUNT(*) AS total_products,
  COUNT(DISTINCT category) AS unique_categories
FROM products;`,
    output: [
      "total_products | unique_categories",
      "---------------+------------------",
      "            7  |                4",
      "(1 row)",
    ],
  },
};

const categoryOrder: DistinctKey[] = ["basic", "multi", "distinct_on", "count"];

export function DistinctVisualization() {
  const [selected, setSelected] = useState<DistinctKey>("basic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [showCollapse, setShowCollapse] = useState(false);

  const cat = categories[selected];

  const handleSelect = (key: DistinctKey) => {
    setSelected(key);
    setOutputLines(null);
    setShowCollapse(false);
  };

  const handleRun = () => {
    setShowCollapse(true);
    setTimeout(() => {
      setOutputLines(cat.output);
    }, 600);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">PostgreSQL DISTINCT</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {categoryOrder.map((key) => {
            const c = categories[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? c.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {c.label}
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
            className={`rounded-xl border p-3 ${cat.color}`}
          >
            <p className="text-sm">{cat.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Duplicate rows visual */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected + "-rows"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-start">
              {/* Input rows */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">
                  Input Rows ({cat.inputRows.length})
                </p>
                <div className="rounded-xl border overflow-hidden text-xs">
                  <div
                    className="grid bg-muted/60 px-3 py-2 font-semibold text-muted-foreground"
                    style={{
                      gridTemplateColumns: `repeat(${cat.columns.length}, 1fr)`,
                    }}
                  >
                    {cat.columns.map((col) => (
                      <span key={col}>{col}</span>
                    ))}
                  </div>
                  {cat.inputRows.map((row, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 1, height: "auto" }}
                      animate={
                        showCollapse && row.isDuplicate
                          ? {
                              opacity: 0,
                              height: 0,
                              paddingTop: 0,
                              paddingBottom: 0,
                            }
                          : { opacity: 1, height: "auto" }
                      }
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className={`grid px-3 py-2 border-t overflow-hidden ${
                        row.isDuplicate
                          ? "bg-red-500/10 text-red-600 dark:text-red-400"
                          : "hover:bg-muted/30"
                      }`}
                      style={{
                        gridTemplateColumns: `repeat(${cat.columns.length}, 1fr)`,
                      }}
                    >
                      {row.values.map((val, j) => (
                        <span key={j} className="font-mono">
                          {val}
                          {row.isDuplicate && j === row.values.length - 1 && (
                            <span className="ml-1 text-[10px] opacity-60">
                              (dup)
                            </span>
                          )}
                        </span>
                      ))}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center pt-8">
                <motion.div
                  animate={showCollapse ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-muted-foreground text-lg"
                >
                  →
                </motion.div>
              </div>

              {/* Output rows */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">
                  After DISTINCT ({cat.outputRows.length})
                </p>
                <div className="rounded-xl border overflow-hidden text-xs">
                  <div
                    className="grid bg-muted/60 px-3 py-2 font-semibold text-muted-foreground"
                    style={{
                      gridTemplateColumns: `repeat(${cat.outputRows[0]?.values.length ?? 1}, 1fr)`,
                    }}
                  >
                    {selected === "count" ? (
                      <span>result</span>
                    ) : (
                      cat.columns.map((col) => <span key={col}>{col}</span>)
                    )}
                  </div>
                  <AnimatePresence>
                    {showCollapse &&
                      cat.outputRows.map((row, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                          className="grid px-3 py-2 border-t bg-emerald-500/5 hover:bg-muted/30"
                          style={{
                            gridTemplateColumns: `repeat(${row.values.length}, 1fr)`,
                          }}
                        >
                          {row.values.map((val, j) => (
                            <span key={j} className="font-mono text-emerald-700 dark:text-emerald-400">
                              {val}
                            </span>
                          ))}
                        </motion.div>
                      ))}
                  </AnimatePresence>
                  {!showCollapse && (
                    <div className="px-3 py-4 border-t flex items-center justify-center">
                      <p className="text-xs text-muted-foreground italic">
                        Click Run to see deduplication
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Example + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              Example SQL
            </p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]">
              {cat.example}
            </pre>
            <Button size="sm" onClick={handleRun}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              Output
            </p>
            <AnimatePresence mode="wait">
              {outputLines ? (
                <motion.div
                  key="out"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[100px]"
                >
                  {outputLines.map((line, i) => (
                    <p key={i} className="text-emerald-400">
                      <span className="text-zinc-500 select-none mr-2">#</span>
                      {line}
                    </p>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="ph"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[100px] flex items-center justify-center"
                >
                  <p className="text-xs text-muted-foreground italic">
                    Click Run to see output
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
