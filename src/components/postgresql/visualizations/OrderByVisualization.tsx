"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SortKey = "asc" | "desc" | "multiple" | "nulls";

interface Row {
  id: number;
  name: string;
  salary: string;
  department: string;
}

interface SortCategory {
  label: string;
  color: string;
  description: string;
  example: string;
  unsorted: Row[];
  sorted: Row[];
  output: string[];
  sortIndicators: { column: string; direction: "asc" | "desc" }[];
}

const categories: Record<SortKey, SortCategory> = {
  asc: {
    label: "ASC",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "Sorts results in ascending order (A-Z, 0-9). This is the default when no direction is specified.",
    example: `SELECT id, name, salary\nFROM employees\nORDER BY salary ASC;`,
    unsorted: [
      { id: 3, name: "Charlie", salary: "$85,000", department: "Sales" },
      { id: 1, name: "Alice", salary: "$55,000", department: "Engineering" },
      { id: 4, name: "Diana", salary: "$72,000", department: "Marketing" },
      { id: 2, name: "Bob", salary: "$60,000", department: "Engineering" },
    ],
    sorted: [
      { id: 1, name: "Alice", salary: "$55,000", department: "Engineering" },
      { id: 2, name: "Bob", salary: "$60,000", department: "Engineering" },
      { id: 4, name: "Diana", salary: "$72,000", department: "Marketing" },
      { id: 3, name: "Charlie", salary: "$85,000", department: "Sales" },
    ],
    output: [
      " id |  name   | salary ",
      "----+---------+---------",
      "  1 | Alice   | $55,000",
      "  2 | Bob     | $60,000",
      "  4 | Diana   | $72,000",
      "  3 | Charlie | $85,000",
      "(4 rows)",
    ],
    sortIndicators: [{ column: "salary", direction: "asc" }],
  },
  desc: {
    label: "DESC",
    color:
      "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "Sorts results in descending order (Z-A, 9-0). Useful for finding highest values first.",
    example: `SELECT id, name, salary\nFROM employees\nORDER BY salary DESC;`,
    unsorted: [
      { id: 3, name: "Charlie", salary: "$85,000", department: "Sales" },
      { id: 1, name: "Alice", salary: "$55,000", department: "Engineering" },
      { id: 4, name: "Diana", salary: "$72,000", department: "Marketing" },
      { id: 2, name: "Bob", salary: "$60,000", department: "Engineering" },
    ],
    sorted: [
      { id: 3, name: "Charlie", salary: "$85,000", department: "Sales" },
      { id: 4, name: "Diana", salary: "$72,000", department: "Marketing" },
      { id: 2, name: "Bob", salary: "$60,000", department: "Engineering" },
      { id: 1, name: "Alice", salary: "$55,000", department: "Engineering" },
    ],
    output: [
      " id |  name   | salary ",
      "----+---------+---------",
      "  3 | Charlie | $85,000",
      "  4 | Diana   | $72,000",
      "  2 | Bob     | $60,000",
      "  1 | Alice   | $55,000",
      "(4 rows)",
    ],
    sortIndicators: [{ column: "salary", direction: "desc" }],
  },
  multiple: {
    label: "Multi-Column",
    color:
      "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "Sort by multiple columns. First sorts by department ASC, then by salary DESC within each department.",
    example: `SELECT id, name, department, salary\nFROM employees\nORDER BY department ASC,\n         salary DESC;`,
    unsorted: [
      { id: 3, name: "Charlie", salary: "$85,000", department: "Sales" },
      { id: 1, name: "Alice", salary: "$55,000", department: "Engineering" },
      { id: 4, name: "Diana", salary: "$72,000", department: "Marketing" },
      { id: 2, name: "Bob", salary: "$60,000", department: "Engineering" },
    ],
    sorted: [
      { id: 2, name: "Bob", salary: "$60,000", department: "Engineering" },
      { id: 1, name: "Alice", salary: "$55,000", department: "Engineering" },
      { id: 4, name: "Diana", salary: "$72,000", department: "Marketing" },
      { id: 3, name: "Charlie", salary: "$85,000", department: "Sales" },
    ],
    output: [
      " id |  name   | department  | salary ",
      "----+---------+-------------+---------",
      "  2 | Bob     | Engineering | $60,000",
      "  1 | Alice   | Engineering | $55,000",
      "  4 | Diana   | Marketing   | $72,000",
      "  3 | Charlie | Sales       | $85,000",
      "(4 rows)",
    ],
    sortIndicators: [
      { column: "department", direction: "asc" },
      { column: "salary", direction: "desc" },
    ],
  },
  nulls: {
    label: "NULLS",
    color:
      "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    description:
      "Control where NULLs appear. NULLS FIRST puts them at the top; NULLS LAST puts them at the bottom.",
    example: `SELECT id, name, salary\nFROM employees\nORDER BY salary ASC\n  NULLS FIRST;\n\n-- Default behavior:\n-- ASC  → NULLS LAST\n-- DESC → NULLS FIRST`,
    unsorted: [
      { id: 3, name: "Charlie", salary: "$85,000", department: "Sales" },
      { id: 5, name: "Eve", salary: "NULL", department: "Engineering" },
      { id: 1, name: "Alice", salary: "$55,000", department: "Engineering" },
      { id: 6, name: "Frank", salary: "NULL", department: "Marketing" },
    ],
    sorted: [
      { id: 5, name: "Eve", salary: "NULL", department: "Engineering" },
      { id: 6, name: "Frank", salary: "NULL", department: "Marketing" },
      { id: 1, name: "Alice", salary: "$55,000", department: "Engineering" },
      { id: 3, name: "Charlie", salary: "$85,000", department: "Sales" },
    ],
    output: [
      " id |  name   | salary ",
      "----+---------+---------",
      "  5 | Eve     | NULL",
      "  6 | Frank   | NULL",
      "  1 | Alice   | $55,000",
      "  3 | Charlie | $85,000",
      "(4 rows)",
    ],
    sortIndicators: [{ column: "salary", direction: "asc" }],
  },
};

const categoryOrder: SortKey[] = ["asc", "desc", "multiple", "nulls"];

export function OrderByVisualization() {
  const [selected, setSelected] = useState<SortKey>("asc");
  const [sorted, setSorted] = useState(false);
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const cat = categories[selected];

  const handleSelect = (key: SortKey) => {
    setSelected(key);
    setSorted(false);
    setOutputLines(null);
  };

  const handleRun = () => {
    setSorted(true);
    setOutputLines(cat.output);
  };

  const rows = sorted ? cat.sorted : cat.unsorted;
  const showDept = selected === "multiple";

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">ORDER BY Clause</CardTitle>
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
        <p className="text-sm text-muted-foreground">{cat.description}</p>

        {/* Sort indicators */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-muted-foreground">
            Sort by:
          </span>
          {cat.sortIndicators.map((ind, i) => (
            <motion.span
              key={ind.column + ind.direction}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-medium ${cat.color}`}
            >
              {ind.column}
              {ind.direction === "asc" ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              {i < cat.sortIndicators.length - 1 && (
                <span className="text-muted-foreground ml-1">,</span>
              )}
            </motion.span>
          ))}
        </div>

        {/* Animated rows table */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected + String(sorted)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <div className="rounded-xl border overflow-hidden text-xs">
              <div
                className={`grid ${showDept ? "grid-cols-4" : "grid-cols-3"} bg-muted/60 px-3 py-2 font-semibold text-muted-foreground`}
              >
                <span>id</span>
                <span>name</span>
                {showDept && <span>department</span>}
                <span>salary</span>
              </div>
              {rows.map((row, i) => (
                <motion.div
                  key={row.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: sorted ? i * 0.08 : 0, duration: 0.3 }}
                  className={`grid ${showDept ? "grid-cols-4" : "grid-cols-3"} px-3 py-2 border-t hover:bg-muted/30`}
                >
                  <code className="font-mono text-muted-foreground">
                    {row.id}
                  </code>
                  <code className="font-mono font-medium text-primary">
                    {row.name}
                  </code>
                  {showDept && (
                    <code className="font-mono text-muted-foreground">
                      {row.department}
                    </code>
                  )}
                  <code
                    className={`font-mono ${row.salary === "NULL" ? "text-orange-500 italic" : "text-muted-foreground"}`}
                  >
                    {row.salary}
                  </code>
                </motion.div>
              ))}
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
