"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type InsertMode = "single" | "multi" | "defaults" | "select";

interface InsertExample {
  label: string;
  color: string;
  description: string;
  sql: string;
  outputLines: string[];
  newRows: Record<string, string>[];
}

const tableColumns = ["id", "first_name", "last_name", "email", "salary"];

const existingRows: Record<string, string>[] = [
  { id: "1", first_name: "Alice", last_name: "Smith", email: "alice@example.com", salary: "75000.00" },
  { id: "2", first_name: "Bob", last_name: "Jones", email: "bob@example.com", salary: "68000.00" },
];

const insertExamples: Record<InsertMode, InsertExample> = {
  single: {
    label: "Single Row",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description: "Insert a single row by specifying column names and values.",
    sql: `INSERT INTO employees
    (first_name, last_name, email, salary)
VALUES
    ('Charlie', 'Brown', 'charlie@example.com', 82000.00);`,
    outputLines: [
      "INSERT 0 1",
      "-- 1 row inserted into employees",
    ],
    newRows: [
      { id: "3", first_name: "Charlie", last_name: "Brown", email: "charlie@example.com", salary: "82000.00" },
    ],
  },
  multi: {
    label: "Multi-Row",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description: "Insert multiple rows in a single statement for better performance.",
    sql: `INSERT INTO employees
    (first_name, last_name, email, salary)
VALUES
    ('Diana', 'Prince', 'diana@example.com', 91000.00),
    ('Eve', 'Adams', 'eve@example.com', 73000.00),
    ('Frank', 'Castle', 'frank@example.com', 85000.00);`,
    outputLines: [
      "INSERT 0 3",
      "-- 3 rows inserted into employees",
    ],
    newRows: [
      { id: "3", first_name: "Diana", last_name: "Prince", email: "diana@example.com", salary: "91000.00" },
      { id: "4", first_name: "Eve", last_name: "Adams", email: "eve@example.com", salary: "73000.00" },
      { id: "5", first_name: "Frank", last_name: "Castle", email: "frank@example.com", salary: "85000.00" },
    ],
  },
  defaults: {
    label: "With Defaults",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description: "Omit columns to use their DEFAULT values, or explicitly use the DEFAULT keyword.",
    sql: `INSERT INTO employees
    (first_name, last_name)
VALUES
    ('Grace', 'Hopper');

-- email defaults to NULL
-- salary defaults to NULL`,
    outputLines: [
      "INSERT 0 1",
      "-- 1 row inserted (email=NULL, salary=NULL)",
    ],
    newRows: [
      { id: "3", first_name: "Grace", last_name: "Hopper", email: "NULL", salary: "NULL" },
    ],
  },
  select: {
    label: "INSERT ... SELECT",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    description: "Insert rows selected from another table or query result.",
    sql: `INSERT INTO employees
    (first_name, last_name, email, salary)
SELECT
    first_name, last_name, email, salary
FROM contractors
WHERE contract_end < CURRENT_DATE;`,
    outputLines: [
      "INSERT 0 2",
      "-- 2 rows copied from contractors into employees",
    ],
    newRows: [
      { id: "3", first_name: "Hank", last_name: "Pym", email: "hank@example.com", salary: "79000.00" },
      { id: "4", first_name: "Ivy", last_name: "Lee", email: "ivy@example.com", salary: "88000.00" },
    ],
  },
};

const modeOrder: InsertMode[] = ["single", "multi", "defaults", "select"];

export function InsertStatementVisualization() {
  const [selectedMode, setSelectedMode] = useState<InsertMode>("single");
  const [executed, setExecuted] = useState(false);
  const [output, setOutput] = useState<string[] | null>(null);

  const example = insertExamples[selectedMode];

  const handleModeChange = (mode: InsertMode) => {
    setSelectedMode(mode);
    setExecuted(false);
    setOutput(null);
  };

  const handleRun = () => {
    setExecuted(true);
    setOutput(example.outputLines);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">INSERT Statement</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Mode selector */}
        <div className="flex flex-wrap gap-2">
          {modeOrder.map((mode) => {
            const ex = insertExamples[mode];
            const isActive = selectedMode === mode;
            return (
              <motion.button
                key={mode}
                onClick={() => handleModeChange(mode)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? ex.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {ex.label}
              </motion.button>
            );
          })}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground">{example.description}</p>

        {/* Table visualization */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMode + String(executed)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <div className="rounded-xl border overflow-hidden text-xs">
              {/* Table header */}
              <div className="grid grid-cols-5 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                {tableColumns.map((col) => (
                  <span key={col}>{col}</span>
                ))}
              </div>

              {/* Existing rows */}
              {existingRows.map((row) => (
                <div key={row.id} className="grid grid-cols-5 px-3 py-2 border-t hover:bg-muted/30">
                  {tableColumns.map((col) => (
                    <code key={col} className="font-mono text-muted-foreground">
                      {row[col]}
                    </code>
                  ))}
                </div>
              ))}

              {/* New rows (animated in after Run) */}
              {executed &&
                example.newRows.map((row, i) => (
                  <motion.div
                    key={row.id + "-" + i}
                    initial={{ opacity: 0, x: -20, backgroundColor: "rgba(34, 197, 94, 0.2)" }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      backgroundColor: "rgba(34, 197, 94, 0)",
                    }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="grid grid-cols-5 px-3 py-2 border-t"
                  >
                    {tableColumns.map((col) => (
                      <code
                        key={col}
                        className={`font-mono ${
                          row[col] === "NULL"
                            ? "text-orange-500 italic"
                            : "text-emerald-600 dark:text-emerald-400 font-medium"
                        }`}
                      >
                        {row[col]}
                      </code>
                    ))}
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* SQL + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">INSERT SQL</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]">
              {example.sql}
            </pre>
            <Button size="sm" onClick={handleRun}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <AnimatePresence mode="wait">
              {output ? (
                <motion.div
                  key="out"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[100px]"
                >
                  {output.map((line, i) => (
                    <p key={i} className="text-emerald-400">{line}</p>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="ph"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[100px] flex items-center justify-center"
                >
                  <p className="text-xs text-muted-foreground italic">Click Run to execute the INSERT</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
