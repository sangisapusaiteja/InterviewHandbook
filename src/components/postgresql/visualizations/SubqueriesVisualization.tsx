"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowDown, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SubqueryKey = "scalar" | "in" | "derived";

interface EmployeeRow {
  name: string;
  department_id: number;
  salary: number;
}

const employees: EmployeeRow[] = [
  { name: "Alice", department_id: 1, salary: 95000 },
  { name: "Bob", department_id: 2, salary: 72000 },
  { name: "Charlie", department_id: 1, salary: 88000 },
  { name: "Diana", department_id: 3, salary: 105000 },
  { name: "Eve", department_id: 2, salary: 67000 },
  { name: "Frank", department_id: 3, salary: 91000 },
];

interface SubqueryInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  innerQuery: string;
  innerLabel: string;
  innerResult: string;
  outerQuery: string;
  outerLabel: string;
  finalResult: string[];
  highlightRows: number[];
}

const subqueries: Record<SubqueryKey, SubqueryInfo> = {
  scalar: {
    label: "Scalar in WHERE",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "A scalar subquery returns a single value. It runs first (inside-out), then the outer query uses that value in a comparison.",
    innerQuery: "SELECT AVG(salary) FROM employees;",
    innerLabel: "Step 1: Inner query calculates the average salary",
    innerResult: "86333.33",
    outerQuery:
      "SELECT name, salary\nFROM employees\nWHERE salary > (\n    SELECT AVG(salary) FROM employees\n);",
    outerLabel: "Step 2: Outer query finds employees earning above average",
    finalResult: [
      " name  | salary ",
      "-------+--------",
      " Alice | 95000  ",
      " Diana | 105000 ",
      " Frank | 91000  ",
    ],
    highlightRows: [0, 3, 5],
  },
  in: {
    label: "Subquery with IN",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "An IN subquery returns a list of values. The outer query checks if a column value exists in that list. Often used to filter by related table conditions.",
    innerQuery:
      "SELECT department_id FROM departments\nWHERE location = 'Floor 3';",
    innerLabel: "Step 1: Inner query finds department IDs on Floor 3",
    innerResult: "1, 3",
    outerQuery:
      "SELECT name, department_id\nFROM employees\nWHERE department_id IN (\n    SELECT department_id FROM departments\n    WHERE location = 'Floor 3'\n);",
    outerLabel: "Step 2: Outer query finds employees in those departments",
    finalResult: [
      " name    | department_id",
      "---------+--------------",
      " Alice   | 1            ",
      " Charlie | 1            ",
      " Diana   | 3            ",
      " Frank   | 3            ",
    ],
    highlightRows: [0, 2, 3, 5],
  },
  derived: {
    label: "Derived Table (FROM)",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "A derived table is a subquery in the FROM clause. It creates a temporary result set that the outer query can select from, like a virtual table.",
    innerQuery:
      "SELECT department_id, AVG(salary) AS avg_sal\nFROM employees\nGROUP BY department_id;",
    innerLabel: "Step 1: Inner query builds a summary table of averages per dept",
    innerResult:
      "dept 1: 91500 | dept 2: 69500 | dept 3: 98000",
    outerQuery:
      "SELECT department_id, avg_sal\nFROM (\n    SELECT department_id,\n           AVG(salary) AS avg_sal\n    FROM employees\n    GROUP BY department_id\n) AS dept_avgs\nWHERE avg_sal > 80000;",
    outerLabel: "Step 2: Outer query filters departments with avg salary > 80K",
    finalResult: [
      " department_id | avg_sal",
      "---------------+--------",
      "       1       | 91500  ",
      "       3       | 98000  ",
    ],
    highlightRows: [0, 2, 3, 5],
  },
};

const subqueryOrder: SubqueryKey[] = ["scalar", "in", "derived"];

type AnimStep = "idle" | "inner" | "result" | "outer";

export function SubqueriesVisualization() {
  const [selected, setSelected] = useState<SubqueryKey>("scalar");
  const [step, setStep] = useState<AnimStep>("idle");

  const sq = subqueries[selected];

  const handleSelect = (key: SubqueryKey) => {
    setSelected(key);
    setStep("idle");
  };

  const handleRun = () => {
    setStep("inner");
    setTimeout(() => setStep("result"), 1200);
    setTimeout(() => setStep("outer"), 2800);
  };

  const handleReset = () => {
    setStep("idle");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">SQL Subqueries</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Subquery type selector */}
        <div className="flex flex-wrap gap-2">
          {subqueryOrder.map((key) => {
            const s = subqueries[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? s.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <Layers className="h-3 w-3" />
                {s.label}
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
            className={`rounded-xl border p-3 ${sq.color}`}
          >
            <p className="text-sm">{sq.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Employees table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            employees table
          </p>
          <div className="rounded-xl border bg-muted/40 overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b bg-muted/60">
                  <th className="px-3 py-1.5 text-left font-semibold">name</th>
                  <th className="px-3 py-1.5 text-left font-semibold">department_id</th>
                  <th className="px-3 py-1.5 text-left font-semibold">salary</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, i) => {
                  const isHighlighted =
                    step === "outer" && sq.highlightRows.includes(i);
                  return (
                    <motion.tr
                      key={emp.name}
                      animate={{
                        backgroundColor: isHighlighted
                          ? "rgba(16, 185, 129, 0.15)"
                          : "rgba(0, 0, 0, 0)",
                      }}
                      transition={{ duration: 0.4 }}
                      className="border-b last:border-b-0"
                    >
                      <td className="px-3 py-1.5">{emp.name}</td>
                      <td className="px-3 py-1.5">{emp.department_id}</td>
                      <td className="px-3 py-1.5">
                        {emp.salary.toLocaleString()}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Run button */}
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={handleRun}
            disabled={step !== "idle"}
          >
            <Play className="h-3.5 w-3.5 mr-1" /> Run Subquery
          </Button>
          {step !== "idle" && (
            <Button size="sm" variant="outline" onClick={handleReset}>
              Reset
            </Button>
          )}
        </div>

        {/* Step-by-step animation */}
        <AnimatePresence mode="wait">
          {step === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <p className="text-xs font-semibold text-muted-foreground">
                Full Query
              </p>
              <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
                {sq.outerQuery}
              </pre>
              <p className="text-xs text-muted-foreground italic">
                Click Run to see the inside-out execution order
              </p>
            </motion.div>
          )}

          {step === "inner" && (
            <motion.div
              key="inner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center h-5 w-5 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                  1
                </span>
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                  {sq.innerLabel}
                </p>
              </div>
              <motion.pre
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="text-xs font-mono rounded-xl border-2 border-blue-500/50 bg-blue-500/5 px-4 py-3 whitespace-pre overflow-x-auto"
              >
                {sq.innerQuery}
              </motion.pre>
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <ArrowDown className="h-5 w-5 text-blue-500" />
                </motion.div>
              </div>
              <p className="text-xs text-muted-foreground text-center italic">
                Executing inner query...
              </p>
            </motion.div>
          )}

          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center h-5 w-5 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                  1
                </span>
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                  Inner query result
                </p>
              </div>
              <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto text-muted-foreground">
                {sq.innerQuery}
              </pre>
              <div className="flex justify-center">
                <ArrowDown className="h-5 w-5 text-emerald-500" />
              </div>
              {/* Highlighted result box */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border-2 border-emerald-500/60 bg-emerald-500/10 px-4 py-3 text-center"
              >
                <p className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide mb-1">
                  Inner Query Returns
                </p>
                <p className="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-300">
                  {sq.innerResult}
                </p>
              </motion.div>
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <ArrowDown className="h-5 w-5 text-violet-500" />
                </motion.div>
              </div>
              <p className="text-xs text-muted-foreground text-center italic">
                Passing result to outer query...
              </p>
            </motion.div>
          )}

          {step === "outer" && (
            <motion.div
              key="outer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              {/* Inner result reminder */}
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 px-3 py-2 flex items-center gap-2">
                <span className="flex items-center justify-center h-4 w-4 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[9px] font-bold">
                  1
                </span>
                <p className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300">
                  Inner result: <span className="font-bold">{sq.innerResult}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center h-5 w-5 rounded-full bg-violet-500/20 text-violet-700 dark:text-violet-300 text-[10px] font-bold">
                  2
                </span>
                <p className="text-xs font-semibold text-violet-700 dark:text-violet-300">
                  {sq.outerLabel}
                </p>
              </div>
              <pre className="text-xs font-mono rounded-xl border-2 border-violet-500/50 bg-violet-500/5 px-4 py-3 whitespace-pre overflow-x-auto">
                {sq.outerQuery}
              </pre>

              {/* Final result */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <p className="text-xs font-semibold text-muted-foreground">
                  Final Result
                </p>
                <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-0.5">
                  {sq.finalResult.map((line, i) => (
                    <p
                      key={i}
                      className={
                        i <= 1
                          ? "text-muted-foreground"
                          : "text-emerald-400"
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
