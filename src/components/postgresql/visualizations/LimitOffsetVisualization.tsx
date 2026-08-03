"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TabKey = "limit" | "offset" | "pagination" | "top_n";

interface RowData {
  id: number;
  name: string;
  department: string;
  salary: number;
}

interface TabConfig {
  label: string;
  color: string;
  description: string;
  example: string;
  output: string[];
  highlightRange: [number, number]; // [startIndex, endIndex] inclusive
}

const allRows: RowData[] = [
  { id: 1, name: "Alice", department: "Engineering", salary: 95000 },
  { id: 2, name: "Bob", department: "Marketing", salary: 72000 },
  { id: 3, name: "Carol", department: "Engineering", salary: 105000 },
  { id: 4, name: "David", department: "Sales", salary: 68000 },
  { id: 5, name: "Eve", department: "Engineering", salary: 112000 },
  { id: 6, name: "Frank", department: "Marketing", salary: 78000 },
  { id: 7, name: "Grace", department: "Sales", salary: 71000 },
  { id: 8, name: "Hank", department: "Engineering", salary: 98000 },
];

const tabs: Record<TabKey, TabConfig> = {
  limit: {
    label: "LIMIT",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "LIMIT restricts the number of rows returned by a query. It returns the first N rows from the result set.",
    example: `SELECT id, name, department, salary\nFROM employees\nLIMIT 3;`,
    output: [
      " id | name  | department  | salary",
      "----+-------+-------------+--------",
      "  1 | Alice | Engineering | 95000",
      "  2 | Bob   | Marketing   | 72000",
      "  3 | Carol | Engineering | 105000",
      "(3 rows)",
    ],
    highlightRange: [0, 2],
  },
  offset: {
    label: "OFFSET",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "OFFSET skips a specified number of rows before returning results. Often used with LIMIT to paginate data.",
    example: `SELECT id, name, department, salary\nFROM employees\nOFFSET 3;`,
    output: [
      " id | name  | department  | salary",
      "----+-------+-------------+--------",
      "  4 | David | Sales       | 68000",
      "  5 | Eve   | Engineering | 112000",
      "  6 | Frank | Marketing   | 78000",
      "  7 | Grace | Sales       | 71000",
      "  8 | Hank  | Engineering | 98000",
      "(5 rows)",
    ],
    highlightRange: [3, 7],
  },
  pagination: {
    label: "Pagination",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "Combine LIMIT and OFFSET to implement pagination. OFFSET skips rows, then LIMIT controls page size. Page 2 with 3 rows per page:",
    example: `-- Page 2 (3 rows per page)\nSELECT id, name, department, salary\nFROM employees\nLIMIT 3 OFFSET 3;`,
    output: [
      " id | name  | department  | salary",
      "----+-------+-------------+--------",
      "  4 | David | Sales       | 68000",
      "  5 | Eve   | Engineering | 112000",
      "  6 | Frank | Marketing   | 78000",
      "(3 rows)",
    ],
    highlightRange: [3, 5],
  },
  top_n: {
    label: "Top N",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    description:
      "Use ORDER BY with LIMIT to get the top N results. This is one of the most common patterns for finding highest or lowest values.",
    example: `SELECT id, name, department, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 3;`,
    output: [
      " id | name  | department  | salary",
      "----+-------+-------------+--------",
      "  5 | Eve   | Engineering | 112000",
      "  3 | Carol | Engineering | 105000",
      "  8 | Hank  | Engineering | 98000",
      "(3 rows)",
    ],
    highlightRange: [0, 2],
  },
};

const tabOrder: TabKey[] = ["limit", "offset", "pagination", "top_n"];

// For top_n, rows are sorted by salary DESC
const sortedBySalary = [...allRows].sort((a, b) => b.salary - a.salary);

export function LimitOffsetVisualization() {
  const [selected, setSelected] = useState<TabKey>("limit");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];
  const displayRows = selected === "top_n" ? sortedBySalary : allRows;
  const [hlStart, hlEnd] = tab.highlightRange;

  const handleSelect = (key: TabKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">LIMIT & OFFSET</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabOrder.map((key) => {
            const t = tabs[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? t.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.label}
              </motion.button>
            );
          })}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground">{tab.description}</p>

        {/* Visual row representation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <div className="rounded-xl border overflow-hidden text-xs">
              <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                <span>id</span>
                <span>name</span>
                <span>department</span>
                <span>salary</span>
              </div>
              {displayRows.map((row, i) => {
                const isHighlighted = i >= hlStart && i <= hlEnd;
                const isSkipped = selected === "offset" && i < hlStart;
                const isPaginationSkipped =
                  selected === "pagination" && i < hlStart;
                return (
                  <motion.div
                    key={row.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`grid grid-cols-4 px-3 py-2 border-t transition-colors ${
                      isHighlighted
                        ? selected === "limit"
                          ? "bg-blue-500/10 border-l-2 border-l-blue-500"
                          : selected === "offset"
                            ? "bg-emerald-500/10 border-l-2 border-l-emerald-500"
                            : selected === "pagination"
                              ? "bg-violet-500/10 border-l-2 border-l-violet-500"
                              : "bg-orange-500/10 border-l-2 border-l-orange-500"
                        : isSkipped || isPaginationSkipped
                          ? "opacity-40 line-through"
                          : i > hlEnd
                            ? "opacity-40"
                            : "hover:bg-muted/30"
                    }`}
                  >
                    <code className="font-mono font-medium text-primary">
                      {row.id}
                    </code>
                    <span className="text-muted-foreground">{row.name}</span>
                    <span className="text-muted-foreground">
                      {row.department}
                    </span>
                    <span className="text-muted-foreground font-mono">
                      {row.salary.toLocaleString()}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-2 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <span
                  className={`inline-block w-3 h-3 rounded-sm ${
                    selected === "limit"
                      ? "bg-blue-500/30"
                      : selected === "offset"
                        ? "bg-emerald-500/30"
                        : selected === "pagination"
                          ? "bg-violet-500/30"
                          : "bg-orange-500/30"
                  }`}
                />
                Returned rows
              </span>
              {(selected === "offset" || selected === "pagination") && (
                <span className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded-sm bg-muted/60 line-through" />
                  Skipped by OFFSET
                </span>
              )}
              {selected !== "offset" && (
                <span className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded-sm bg-muted/40 opacity-40" />
                  Not returned
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* SQL + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              Example SQL
            </p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]">
              {tab.example}
            </pre>
            <Button size="sm" onClick={() => setOutputLines(tab.output)}>
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
