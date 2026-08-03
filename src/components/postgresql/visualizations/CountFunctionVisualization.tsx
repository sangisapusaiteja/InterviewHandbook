"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CountVariant = "count_all" | "count_column" | "count_distinct";

interface EmployeeRow {
  id: number;
  name: string;
  department: string | null;
  status: string | null;
}

const employees: EmployeeRow[] = [
  { id: 1, name: "Alice", department: "Engineering", status: "active" },
  { id: 2, name: "Bob", department: "Engineering", status: "active" },
  { id: 3, name: "Charlie", department: "Marketing", status: "inactive" },
  { id: 4, name: "Diana", department: "Engineering", status: "active" },
  { id: 5, name: "Eve", department: null, status: "active" },
  { id: 6, name: "Frank", department: "Marketing", status: null },
  { id: 7, name: "Grace", department: "Sales", status: "active" },
  { id: 8, name: "Hank", department: null, status: null },
];

interface VariantInfo {
  label: string;
  sql: string;
  color: string;
  badgeColor: string;
  description: string;
  highlightRow: (row: EmployeeRow) => boolean;
  highlightColumn: string | null;
  result: number;
  explanation: string;
}

const variants: Record<CountVariant, VariantInfo> = {
  count_all: {
    label: "COUNT(*)",
    sql: "SELECT COUNT(*) FROM employees;",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Counts all rows in the table, regardless of NULL values in any column. Every row is included.",
    highlightRow: () => true,
    highlightColumn: null,
    result: 8,
    explanation: "All 8 rows are counted, including rows with NULL values.",
  },
  count_column: {
    label: "COUNT(department)",
    sql: "SELECT COUNT(department) FROM employees;",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Counts rows where the specified column is NOT NULL. Rows with NULL in that column are skipped.",
    highlightRow: (row) => row.department !== null,
    highlightColumn: "department",
    result: 6,
    explanation:
      "6 rows counted. Eve (id=5) and Hank (id=8) are skipped because their department is NULL.",
  },
  count_distinct: {
    label: "COUNT(DISTINCT department)",
    sql: "SELECT COUNT(DISTINCT department) FROM employees;",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Counts the number of unique non-NULL values in the column. Duplicates and NULLs are excluded.",
    highlightRow: (row) => row.department !== null,
    highlightColumn: "department",
    result: 3,
    explanation:
      "3 unique departments: Engineering, Marketing, Sales. NULLs are excluded, duplicates counted once.",
  },
};

const variantOrder: CountVariant[] = ["count_all", "count_column", "count_distinct"];

const columns = ["id", "name", "department", "status"] as const;

export function CountFunctionVisualization() {
  const [selected, setSelected] = useState<CountVariant>("count_all");
  const [showResult, setShowResult] = useState(false);

  const variant = variants[selected];

  const handleSelect = (key: CountVariant) => {
    setSelected(key);
    setShowResult(false);
  };

  const handleRun = () => {
    setShowResult(true);
  };

  const getCellValue = (row: EmployeeRow, col: (typeof columns)[number]) => {
    const val = row[col];
    if (val === null) return "NULL";
    return String(val);
  };

  const isRowHighlighted = (row: EmployeeRow) => {
    return showResult && variant.highlightRow(row);
  };

  const isRowDimmed = (row: EmployeeRow) => {
    return showResult && !variant.highlightRow(row);
  };

  const isColumnHighlighted = (col: string) => {
    return showResult && variant.highlightColumn === col;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">SQL COUNT Function</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Variant selector */}
        <div className="flex flex-wrap gap-2">
          {variantOrder.map((key) => {
            const v = variants[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? v.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <Hash className="h-3 w-3" />
                {v.label}
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
            className={`rounded-xl border p-3 ${variant.color}`}
          >
            <p className="text-sm">{variant.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* SQL query */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Query</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {variant.sql}
          </pre>
          <Button size="sm" onClick={handleRun}>
            <Play className="h-3.5 w-3.5 mr-1" /> Run
          </Button>
        </div>

        {/* Employees table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">
            employees table
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            {/* Header */}
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              {columns.map((col) => (
                <span
                  key={col}
                  className={
                    isColumnHighlighted(col)
                      ? "text-primary font-bold"
                      : ""
                  }
                >
                  {col}
                  {isColumnHighlighted(col) && (
                    <span className="ml-1 text-[10px]">&#8592;</span>
                  )}
                </span>
              ))}
            </div>
            {/* Rows */}
            {employees.map((row) => (
              <motion.div
                key={row.id}
                animate={
                  showResult
                    ? {
                        opacity: isRowDimmed(row) ? 0.35 : 1,
                        scale: isRowHighlighted(row) ? 1 : 0.98,
                      }
                    : { opacity: 1, scale: 1 }
                }
                transition={{ duration: 0.3 }}
                className={`grid grid-cols-4 px-3 py-2 border-t transition-colors ${
                  isRowHighlighted(row)
                    ? selected === "count_all"
                      ? "bg-emerald-500/10"
                      : selected === "count_column"
                        ? "bg-blue-500/10"
                        : "bg-violet-500/10"
                    : ""
                }`}
              >
                {columns.map((col) => {
                  const val = getCellValue(row, col);
                  const isNull = val === "NULL";
                  return (
                    <span
                      key={col}
                      className={`font-mono ${
                        isNull
                          ? "text-red-400 italic"
                          : isColumnHighlighted(col) && isRowHighlighted(row)
                            ? "text-primary font-medium"
                            : "text-muted-foreground"
                      }`}
                    >
                      {val}
                    </span>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Result</p>
          <AnimatePresence mode="wait">
            {showResult ? (
              <motion.div
                key={`${selected}-result`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-4 min-h-[80px]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono text-zinc-500">
                    count
                  </span>
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
                    className={`text-2xl font-bold font-mono ${
                      selected === "count_all"
                        ? "text-emerald-400"
                        : selected === "count_column"
                          ? "text-blue-400"
                          : "text-violet-400"
                    }`}
                  >
                    {variant.result}
                  </motion.span>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs text-zinc-400"
                >
                  {variant.explanation}
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="ph"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[80px] flex items-center justify-center"
              >
                <p className="text-xs text-muted-foreground italic">
                  Click Run to see the count result
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
