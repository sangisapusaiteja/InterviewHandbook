"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FilterKey = "equality" | "comparison" | "null_check" | "text";

interface TableRow {
  id: number;
  name: string;
  age: number | null;
  city: string | null;
  salary: number;
}

interface FilterInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  example: string;
  output: string[];
  matchingIds: number[];
}

const sampleRows: TableRow[] = [
  { id: 1, name: "Alice", age: 30, city: "New York", salary: 75000 },
  { id: 2, name: "Bob", age: 25, city: null, salary: 55000 },
  { id: 3, name: "Charlie", age: 35, city: "Chicago", salary: 90000 },
  { id: 4, name: "Diana", age: null, city: "New York", salary: 62000 },
  { id: 5, name: "Eve", age: 28, city: "Boston", salary: 80000 },
];

const filters: Record<FilterKey, FilterInfo> = {
  equality: {
    label: "Equality (=)",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Filters rows where a column exactly matches a given value. Uses the = operator for exact comparison.",
    example: `SELECT * FROM employees\nWHERE city = 'New York';`,
    output: [
      " id | name  | age | city     | salary",
      "----+-------+-----+----------+-------",
      "  1 | Alice |  30 | New York | 75000",
      "  4 | Diana |     | New York | 62000",
      "(2 rows)",
    ],
    matchingIds: [1, 4],
  },
  comparison: {
    label: "Comparison (>, <)",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Filters rows using comparison operators: > (greater than), < (less than), >= (greater or equal), <= (less or equal). NULL values are excluded from comparison results.",
    example: `SELECT * FROM employees\nWHERE salary >= 75000;`,
    output: [
      " id | name    | age | city     | salary",
      "----+---------+-----+----------+-------",
      "  1 | Alice   |  30 | New York | 75000",
      "  3 | Charlie |  35 | Chicago  | 90000",
      "  5 | Eve     |  28 | Boston   | 80000",
      "(3 rows)",
    ],
    matchingIds: [1, 3, 5],
  },
  null_check: {
    label: "NULL Check",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Tests for NULL values using IS NULL or IS NOT NULL. You cannot use = NULL because NULL represents an unknown value and is not equal to anything, not even itself.",
    example: `-- Find rows with missing city\nSELECT * FROM employees\nWHERE city IS NULL;\n\n-- NOTE: WHERE city = NULL\n-- would return 0 rows (wrong!)`,
    output: [
      " id | name | age | city | salary",
      "----+------+-----+------+-------",
      "  2 | Bob  |  25 |      | 55000",
      "(1 row)",
    ],
    matchingIds: [2],
  },
  text: {
    label: "Text (LIKE)",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Filters rows by matching text patterns. Use LIKE with % (any characters) and _ (single character). Use ILIKE for case-insensitive matching.",
    example: `SELECT * FROM employees\nWHERE name LIKE 'A%';\n\n-- % matches any sequence of characters\n-- _ matches exactly one character\n-- ILIKE for case-insensitive`,
    output: [
      " id | name  | age | city     | salary",
      "----+-------+-----+----------+-------",
      "  1 | Alice |  30 | New York | 75000",
      "(1 row)",
    ],
    matchingIds: [1],
  },
};

const filterOrder: FilterKey[] = ["equality", "comparison", "null_check", "text"];

export function WhereClauseVisualization() {
  const [selected, setSelected] = useState<FilterKey>("equality");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [showFiltered, setShowFiltered] = useState(false);

  const filter = filters[selected];

  const handleSelect = (key: FilterKey) => {
    setSelected(key);
    setOutputLines(null);
    setShowFiltered(false);
  };

  const handleRun = () => {
    setOutputLines(filter.output);
    setShowFiltered(true);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">WHERE Clause Filtering</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Filter type tabs */}
        <div className="flex flex-wrap gap-2">
          {filterOrder.map((key) => {
            const f = filters[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? f.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <Filter className="h-3 w-3" />
                {f.label}
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
            className={`rounded-xl border p-3 ${filter.color}`}
          >
            <p className="text-sm">{filter.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Mini table showing row filtering */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">
            employees Table {showFiltered && "— filtered rows are grayed out"}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selected}-${showFiltered}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="rounded-xl border overflow-hidden text-xs">
                <div className="grid grid-cols-5 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                  <span>id</span>
                  <span>name</span>
                  <span>age</span>
                  <span>city</span>
                  <span>salary</span>
                </div>
                {sampleRows.map((row) => {
                  const isMatch = filter.matchingIds.includes(row.id);
                  const dimmed = showFiltered && !isMatch;
                  return (
                    <motion.div
                      key={row.id}
                      animate={{
                        opacity: dimmed ? 0.3 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`grid grid-cols-5 px-3 py-2 border-t ${
                        showFiltered && isMatch
                          ? "bg-emerald-500/10"
                          : "hover:bg-muted/30"
                      } ${dimmed ? "line-through decoration-muted-foreground/50" : ""}`}
                    >
                      <code className="font-mono">{row.id}</code>
                      <span>{row.name}</span>
                      <span className={row.age === null ? "italic text-muted-foreground" : ""}>
                        {row.age === null ? "NULL" : row.age}
                      </span>
                      <span className={row.city === null ? "italic text-muted-foreground" : ""}>
                        {row.city === null ? "NULL" : row.city}
                      </span>
                      <span>{row.salary}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* SQL + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Example SQL</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]">
              {filter.example}
            </pre>
            <Button size="sm" onClick={handleRun}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
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
                  <p className="text-xs text-muted-foreground italic">Click Run to see output</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
