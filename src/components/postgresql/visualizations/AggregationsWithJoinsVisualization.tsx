"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, Database, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type QueryKey = "count" | "avg" | "multi" | "having";

interface DeptRow {
  id: number;
  name: string;
}

interface EmpRow {
  id: number;
  name: string;
  dept_id: number;
  salary: number;
}

const departments: DeptRow[] = [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Marketing" },
  { id: 3, name: "Sales" },
];

const employees: EmpRow[] = [
  { id: 1, name: "Alice", dept_id: 1, salary: 95000 },
  { id: 2, name: "Bob", dept_id: 2, salary: 72000 },
  { id: 3, name: "Charlie", dept_id: 1, salary: 88000 },
  { id: 4, name: "Diana", dept_id: 3, salary: 65000 },
  { id: 5, name: "Eve", dept_id: 1, salary: 102000 },
  { id: 6, name: "Frank", dept_id: 2, salary: 68000 },
  { id: 7, name: "Grace", dept_id: 3, salary: 71000 },
];

interface JoinedRow {
  emp_name: string;
  dept_name: string;
  salary: number;
}

const joinedData: JoinedRow[] = employees.map((e) => ({
  emp_name: e.name,
  dept_name: departments.find((d) => d.id === e.dept_id)!.name,
  salary: e.salary,
}));

interface QueryInfo {
  label: string;
  color: string;
  description: string;
  sql: string;
  output: string[];
}

const queries: Record<QueryKey, QueryInfo> = {
  count: {
    label: "COUNT per Dept",
    color:
      "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "JOIN the tables, GROUP BY department name, then COUNT the number of employees in each department.",
    sql: `SELECT d.name AS department,
       COUNT(e.id) AS employee_count
FROM departments d
JOIN employees e
  ON d.id = e.department_id
GROUP BY d.name
ORDER BY employee_count DESC;`,
    output: [
      " department  | employee_count",
      "-------------+---------------",
      " Engineering |             3",
      " Marketing   |             2",
      " Sales       |             2",
    ],
  },
  avg: {
    label: "AVG Salary",
    color:
      "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "JOIN the tables, GROUP BY department, then calculate the AVG salary for each department.",
    sql: `SELECT d.name AS department,
       ROUND(AVG(e.salary), 2) AS avg_salary
FROM departments d
JOIN employees e
  ON d.id = e.department_id
GROUP BY d.name
ORDER BY avg_salary DESC;`,
    output: [
      " department  | avg_salary",
      "-------------+-----------",
      " Engineering |  95000.00",
      " Marketing   |  70000.00",
      " Sales       |  68000.00",
    ],
  },
  multi: {
    label: "Multiple Aggregates",
    color:
      "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "Combine COUNT, AVG, MIN, MAX, and SUM in a single query to get a full department summary.",
    sql: `SELECT d.name AS department,
       COUNT(e.id)          AS headcount,
       ROUND(AVG(e.salary)) AS avg_salary,
       MIN(e.salary)        AS min_salary,
       MAX(e.salary)        AS max_salary,
       SUM(e.salary)        AS total_cost
FROM departments d
JOIN employees e
  ON d.id = e.department_id
GROUP BY d.name;`,
    output: [
      " department  | headcount | avg_salary | min_salary | max_salary | total_cost",
      "-------------+-----------+------------+------------+------------+-----------",
      " Engineering |         3 |      95000 |      88000 |     102000 |    285000",
      " Marketing   |         2 |      70000 |      68000 |      72000 |    140000",
      " Sales       |         2 |      68000 |      65000 |      71000 |    136000",
    ],
  },
  having: {
    label: "HAVING Filter",
    color:
      "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "Use HAVING to filter groups after aggregation. Here we only show departments with an average salary above 69000.",
    sql: `SELECT d.name AS department,
       COUNT(e.id) AS headcount,
       ROUND(AVG(e.salary)) AS avg_salary
FROM departments d
JOIN employees e
  ON d.id = e.department_id
GROUP BY d.name
HAVING AVG(e.salary) > 69000
ORDER BY avg_salary DESC;`,
    output: [
      " department  | headcount | avg_salary",
      "-------------+-----------+-----------",
      " Engineering |         3 |      95000",
      " Marketing   |         2 |      70000",
      "",
      "-- Sales excluded: avg_salary 68000 <= 69000",
    ],
  },
};

const queryOrder: QueryKey[] = ["count", "avg", "multi", "having"];

type Step = "tables" | "join" | "group" | "result";

const stepLabels: { key: Step; label: string }[] = [
  { key: "tables", label: "Source Tables" },
  { key: "join", label: "JOIN" },
  { key: "group", label: "GROUP BY" },
  { key: "result", label: "Aggregate" },
];

export function AggregationsWithJoinsVisualization() {
  const [selected, setSelected] = useState<QueryKey>("count");
  const [step, setStep] = useState<Step>("tables");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const query = queries[selected];

  const handleSelect = (key: QueryKey) => {
    setSelected(key);
    setStep("tables");
    setOutputLines(null);
  };

  const handleRun = () => {
    setOutputLines(query.output);
    setStep("result");
  };

  const groupedByDept: Record<string, JoinedRow[]> = {};
  for (const row of joinedData) {
    if (!groupedByDept[row.dept_name]) groupedByDept[row.dept_name] = [];
    groupedByDept[row.dept_name].push(row);
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">
          Aggregations with JOINs
        </CardTitle>
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
                <Layers className="h-3 w-3" />
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

        {/* Step-by-step flow indicator */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Pipeline
          </p>
          <div className="flex items-center gap-1 flex-wrap">
            {stepLabels.map((s, i) => (
              <div key={s.key} className="flex items-center gap-1">
                <motion.button
                  onClick={() => setStep(s.key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    step === s.key
                      ? "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300 shadow-sm"
                      : "bg-background border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {s.label}
                </motion.button>
                {i < stepLabels.length - 1 && (
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {step === "tables" && (
            <motion.div
              key="tables"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-2"
            >
              <p className="text-xs font-semibold text-muted-foreground">
                Source Tables
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Departments table */}
                <div className="rounded-xl border bg-blue-500/10 p-3">
                  <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-1.5">
                    <Database className="h-3 w-3" /> departments
                  </p>
                  <div className="font-mono text-[11px] space-y-0.5">
                    <div className="flex gap-4 text-muted-foreground font-semibold border-b border-blue-500/20 pb-1 mb-1">
                      <span className="w-8">id</span>
                      <span>name</span>
                    </div>
                    {departments.map((d) => (
                      <div key={d.id} className="flex gap-4">
                        <span className="w-8 text-blue-600 dark:text-blue-400">
                          {d.id}
                        </span>
                        <span>{d.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Employees table */}
                <div className="rounded-xl border bg-emerald-500/10 p-3">
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
                    <Database className="h-3 w-3" /> employees
                  </p>
                  <div className="font-mono text-[11px] space-y-0.5">
                    <div className="flex gap-4 text-muted-foreground font-semibold border-b border-emerald-500/20 pb-1 mb-1">
                      <span className="w-8">id</span>
                      <span className="w-16">name</span>
                      <span className="w-12">dept_id</span>
                      <span>salary</span>
                    </div>
                    {employees.map((e) => (
                      <div key={e.id} className="flex gap-4">
                        <span className="w-8 text-emerald-600 dark:text-emerald-400">
                          {e.id}
                        </span>
                        <span className="w-16">{e.name}</span>
                        <span className="w-12 text-blue-600 dark:text-blue-400">
                          {e.dept_id}
                        </span>
                        <span>{e.salary.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === "join" && (
            <motion.div
              key="join"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-2"
            >
              <p className="text-xs font-semibold text-muted-foreground">
                Joined Table{" "}
                <span className="font-normal italic">
                  (departments JOIN employees ON d.id = e.department_id)
                </span>
              </p>
              <div className="rounded-xl border bg-violet-500/10 p-3 overflow-x-auto">
                <div className="font-mono text-[11px] space-y-0.5 min-w-[300px]">
                  <div className="flex gap-6 text-muted-foreground font-semibold border-b border-violet-500/20 pb-1 mb-1">
                    <span className="w-20">emp_name</span>
                    <span className="w-24">dept_name</span>
                    <span>salary</span>
                  </div>
                  {joinedData.map((row, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-6"
                    >
                      <span className="w-20">{row.emp_name}</span>
                      <span className="w-24 text-violet-600 dark:text-violet-400">
                        {row.dept_name}
                      </span>
                      <span>{row.salary.toLocaleString()}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === "group" && (
            <motion.div
              key="group"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-2"
            >
              <p className="text-xs font-semibold text-muted-foreground">
                Grouped by Department
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.entries(groupedByDept).map(
                  ([deptName, rows], groupIdx) => {
                    const colors = [
                      "bg-blue-500/10 border-blue-500/30",
                      "bg-emerald-500/10 border-emerald-500/30",
                      "bg-violet-500/10 border-violet-500/30",
                    ];
                    const textColors = [
                      "text-blue-700 dark:text-blue-300",
                      "text-emerald-700 dark:text-emerald-300",
                      "text-violet-700 dark:text-violet-300",
                    ];
                    return (
                      <motion.div
                        key={deptName}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: groupIdx * 0.1 }}
                        className={`rounded-xl border p-3 ${colors[groupIdx % 3]}`}
                      >
                        <p
                          className={`text-xs font-bold mb-2 ${textColors[groupIdx % 3]}`}
                        >
                          {deptName}
                        </p>
                        <div className="font-mono text-[11px] space-y-0.5">
                          {rows.map((r, i) => (
                            <div key={i} className="flex justify-between">
                              <span>{r.emp_name}</span>
                              <span className="text-muted-foreground">
                                ${r.salary.toLocaleString()}
                              </span>
                            </div>
                          ))}
                          <div className="border-t border-current/10 pt-1 mt-1 text-[10px] text-muted-foreground">
                            COUNT: {rows.length} | AVG: $
                            {Math.round(
                              rows.reduce((s, r) => s + r.salary, 0) /
                                rows.length
                            ).toLocaleString()}
                          </div>
                        </div>
                      </motion.div>
                    );
                  }
                )}
              </div>
            </motion.div>
          )}

          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-2"
            >
              <p className="text-xs font-semibold text-muted-foreground">
                Aggregated Result
              </p>
              {outputLines ? (
                <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1">
                  {outputLines.map((line, i) => (
                    <p
                      key={i}
                      className={
                        line.startsWith("--")
                          ? "text-yellow-400 italic"
                          : line === ""
                            ? ""
                            : "text-emerald-400"
                      }
                    >
                      {line || "\u00A0"}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[80px] flex items-center justify-center">
                  <p className="text-xs text-muted-foreground italic">
                    Click Run Query to see the aggregated result
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* SQL + Run */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">
            SQL Query
          </p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {query.sql}
          </pre>
          <Button size="sm" onClick={handleRun}>
            <Play className="h-3.5 w-3.5 mr-1" /> Run Query
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
