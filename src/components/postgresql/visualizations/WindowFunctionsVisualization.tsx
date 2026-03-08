"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type WindowFnKey = "row_number" | "rank" | "sum_over" | "avg_over";

interface EmployeeRow {
  name: string;
  department: string;
  salary: number;
}

const employees: EmployeeRow[] = [
  { name: "Alice", department: "Engineering", salary: 95000 },
  { name: "Bob", department: "Engineering", salary: 88000 },
  { name: "Charlie", department: "Engineering", salary: 92000 },
  { name: "Diana", department: "Marketing", salary: 78000 },
  { name: "Eve", department: "Marketing", salary: 82000 },
  { name: "Frank", department: "Sales", salary: 70000 },
  { name: "Grace", department: "Sales", salary: 74000 },
  { name: "Hank", department: "Sales", salary: 71000 },
];

const partitionColors: Record<string, {
  bg: string;
  border: string;
  text: string;
  badge: string;
  highlight: string;
}> = {
  Engineering: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-700 dark:text-emerald-300",
    badge: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    highlight: "bg-emerald-500/15",
  },
  Marketing: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-700 dark:text-blue-300",
    badge: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    highlight: "bg-blue-500/15",
  },
  Sales: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    text: "text-violet-700 dark:text-violet-300",
    badge: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    highlight: "bg-violet-500/15",
  },
};

interface WindowFnInfo {
  label: string;
  color: string;
  description: string;
  sql: string;
  resultColumn: string;
  compute: (emp: EmployeeRow, index: number, partition: EmployeeRow[]) => string;
}

function getPartition(emp: EmployeeRow): EmployeeRow[] {
  return employees
    .filter((e) => e.department === emp.department)
    .sort((a, b) => b.salary - a.salary);
}

function getRankInPartition(emp: EmployeeRow, partition: EmployeeRow[]): number {
  const sorted = [...partition].sort((a, b) => b.salary - a.salary);
  let rank = 1;
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i].salary < sorted[i - 1].salary) {
      rank = i + 1;
    }
    if (sorted[i].name === emp.name) return rank;
  }
  return rank;
}

const windowFunctions: Record<WindowFnKey, WindowFnInfo> = {
  row_number: {
    label: "ROW_NUMBER()",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "Assigns a unique sequential integer to each row within its partition, ordered by the specified column. Unlike RANK(), there are no gaps or ties.",
    sql: `SELECT name, department, salary,\n  ROW_NUMBER() OVER (\n    PARTITION BY department\n    ORDER BY salary DESC\n  ) AS row_num\nFROM employees;`,
    resultColumn: "row_num",
    compute: (_emp, index) => String(index + 1),
  },
  rank: {
    label: "RANK()",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "Assigns a rank to each row within its partition based on the ORDER BY column. Rows with equal values get the same rank, and the next rank is skipped (gaps).",
    sql: `SELECT name, department, salary,\n  RANK() OVER (\n    PARTITION BY department\n    ORDER BY salary DESC\n  ) AS rank\nFROM employees;`,
    resultColumn: "rank",
    compute: (emp, _index, partition) => String(getRankInPartition(emp, partition)),
  },
  sum_over: {
    label: "SUM() OVER",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "Calculates the sum of a column across the entire partition. Every row in the same partition shows the same total — but unlike GROUP BY, all original rows are preserved.",
    sql: `SELECT name, department, salary,\n  SUM(salary) OVER (\n    PARTITION BY department\n  ) AS dept_total\nFROM employees;`,
    resultColumn: "dept_total",
    compute: (_emp, _index, partition) => {
      const total = partition.reduce((s, e) => s + e.salary, 0);
      return "$" + total.toLocaleString();
    },
  },
  avg_over: {
    label: "AVG() OVER",
    color: "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
    description:
      "Calculates the average of a column within each partition. Each row retains its individual data while also showing the partition average — impossible with GROUP BY alone.",
    sql: `SELECT name, department, salary,\n  ROUND(AVG(salary) OVER (\n    PARTITION BY department\n  )) AS dept_avg\nFROM employees;`,
    resultColumn: "dept_avg",
    compute: (_emp, _index, partition) => {
      const avg = partition.reduce((s, e) => s + e.salary, 0) / partition.length;
      return "$" + Math.round(avg).toLocaleString();
    },
  },
};

const fnOrder: WindowFnKey[] = ["row_number", "rank", "sum_over", "avg_over"];

interface ResultRow extends EmployeeRow {
  result: string;
}

export function WindowFunctionsVisualization() {
  const [selected, setSelected] = useState<WindowFnKey>("row_number");
  const [showResult, setShowResult] = useState(false);
  const [showGroupBy, setShowGroupBy] = useState(false);

  const fn = windowFunctions[selected];

  const handleSelect = (key: WindowFnKey) => {
    setSelected(key);
    setShowResult(false);
    setShowGroupBy(false);
  };

  const computeResults = (): ResultRow[] => {
    const departments = ["Engineering", "Marketing", "Sales"];
    const results: ResultRow[] = [];

    for (const dept of departments) {
      const partition = getPartition({ name: "", department: dept, salary: 0 });
      partition.forEach((emp, idx) => {
        results.push({
          ...emp,
          result: fn.compute(emp, idx, partition),
        });
      });
    }

    return results;
  };

  const groupByResults = () => {
    const departments = ["Engineering", "Marketing", "Sales"];
    return departments.map((dept) => {
      const partition = employees.filter((e) => e.department === dept);
      const total = partition.reduce((s, e) => s + e.salary, 0);
      const avg = Math.round(total / partition.length);
      return {
        department: dept,
        count: partition.length,
        total: "$" + total.toLocaleString(),
        avg: "$" + avg.toLocaleString(),
      };
    });
  };

  const results = computeResults();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">SQL Window Functions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Function selector */}
        <div className="flex flex-wrap gap-2">
          {fnOrder.map((key) => {
            const f = windowFunctions[key];
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
                <Layers className="h-3 w-3" />
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
            className={`rounded-xl border p-3 ${fn.color}`}
          >
            <p className="text-sm">{fn.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* SQL */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">SQL Query</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {fn.sql}
          </pre>
        </div>

        {/* Source table + Result table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Source table with partition highlights */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              Source Table (employees)
            </p>
            <div className="rounded-xl border bg-muted/20 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="px-3 py-2 text-left font-semibold">name</th>
                    <th className="px-3 py-2 text-left font-semibold">department</th>
                    <th className="px-3 py-2 text-right font-semibold">salary</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, i) => {
                    const pc = partitionColors[emp.department];
                    return (
                      <motion.tr
                        key={emp.name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className={`border-b last:border-b-0 ${pc.highlight}`}
                      >
                        <td className="px-3 py-1.5 font-mono">{emp.name}</td>
                        <td className="px-3 py-1.5">
                          <span
                            className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${pc.badge}`}
                          >
                            {emp.department}
                          </span>
                        </td>
                        <td className="px-3 py-1.5 text-right font-mono">
                          ${emp.salary.toLocaleString()}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Partition legend */}
            <div className="flex flex-wrap gap-2 pt-1">
              {Object.entries(partitionColors).map(([dept, pc]) => (
                <div
                  key={dept}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${pc.badge}`}
                >
                  <div className={`w-2 h-2 rounded-sm ${pc.bg} ${pc.border} border`} />
                  {dept} partition
                </div>
              ))}
            </div>
          </div>

          {/* Result table */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-muted-foreground">
                Result (all rows preserved)
              </p>
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
            </div>
            {!showResult ? (
              <div className="rounded-xl border bg-muted/20 px-4 py-8 flex flex-col items-center justify-center gap-3 min-h-[280px]">
                <p className="text-xs text-muted-foreground italic">
                  Click Run to apply the window function
                </p>
                <Button size="sm" onClick={() => setShowResult(true)}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border bg-muted/20 overflow-hidden"
              >
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="px-3 py-2 text-left font-semibold">name</th>
                      <th className="px-3 py-2 text-left font-semibold">department</th>
                      <th className="px-3 py-2 text-right font-semibold">salary</th>
                      <th className="px-3 py-2 text-right font-semibold text-amber-600 dark:text-amber-400">
                        {fn.resultColumn}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row, i) => {
                      const pc = partitionColors[row.department];
                      return (
                        <motion.tr
                          key={row.name}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`border-b last:border-b-0 ${pc.highlight}`}
                        >
                          <td className="px-3 py-1.5 font-mono">{row.name}</td>
                          <td className="px-3 py-1.5">
                            <span
                              className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${pc.badge}`}
                            >
                              {row.department}
                            </span>
                          </td>
                          <td className="px-3 py-1.5 text-right font-mono">
                            ${row.salary.toLocaleString()}
                          </td>
                          <td className="px-3 py-1.5 text-right font-mono font-bold text-amber-600 dark:text-amber-400">
                            {row.result}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="px-3 py-2 border-t bg-muted/30">
                  <p className="text-[10px] text-muted-foreground">
                    All {results.length} rows preserved with window function result appended
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* GROUP BY contrast */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <p className="text-xs font-semibold text-muted-foreground">
              Compare: GROUP BY (rows collapsed)
            </p>
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-6"
              onClick={() => setShowGroupBy(!showGroupBy)}
            >
              {showGroupBy ? "Hide" : "Show"} GROUP BY
            </Button>
          </div>

          <AnimatePresence>
            {showGroupBy && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">GROUP BY query</p>
                    <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
{`SELECT department,
  COUNT(*) AS count,
  SUM(salary) AS total,
  ROUND(AVG(salary)) AS avg
FROM employees
GROUP BY department;`}
                    </pre>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Result (only 3 rows)</p>
                    <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 overflow-hidden">
                      <table className="w-full text-xs text-emerald-400">
                        <thead>
                          <tr className="border-b border-zinc-700">
                            <th className="px-3 py-2 text-left font-semibold">department</th>
                            <th className="px-3 py-2 text-right font-semibold">count</th>
                            <th className="px-3 py-2 text-right font-semibold">total</th>
                            <th className="px-3 py-2 text-right font-semibold">avg</th>
                          </tr>
                        </thead>
                        <tbody>
                          {groupByResults().map((row) => (
                            <motion.tr
                              key={row.department}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="border-b border-zinc-800 last:border-b-0"
                            >
                              <td className="px-3 py-1.5 font-mono">{row.department}</td>
                              <td className="px-3 py-1.5 text-right font-mono">{row.count}</td>
                              <td className="px-3 py-1.5 text-right font-mono">{row.total}</td>
                              <td className="px-3 py-1.5 text-right font-mono">{row.avg}</td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="px-3 py-2 border-t border-zinc-800">
                        <p className="text-[10px] text-red-400">
                          Only 3 rows! Individual employee data is lost.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key difference callout */}
                <div className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 mb-1">
                    Key Difference
                  </p>
                  <p className="text-xs text-amber-700/80 dark:text-amber-300/80">
                    <strong>GROUP BY</strong> collapses rows into one row per group (8 rows → 3
                    rows). <strong>Window functions</strong> keep all 8 rows and add a computed
                    column. Use window functions when you need both the detail and the aggregate.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
