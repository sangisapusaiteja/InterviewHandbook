"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Employee {
  id: number;
  name: string;
  department_id: number;
  department: string;
  salary: number;
}

const employees: Employee[] = [
  { id: 1, name: "Alice", department_id: 1, department: "Engineering", salary: 95000 },
  { id: 2, name: "Bob", department_id: 1, department: "Engineering", salary: 78000 },
  { id: 3, name: "Charlie", department_id: 2, department: "Marketing", salary: 72000 },
  { id: 4, name: "Diana", department_id: 1, department: "Engineering", salary: 88000 },
  { id: 5, name: "Eve", department_id: 2, department: "Marketing", salary: 65000 },
  { id: 6, name: "Frank", department_id: 3, department: "Sales", salary: 70000 },
  { id: 7, name: "Grace", department_id: 3, department: "Sales", salary: 82000 },
  { id: 8, name: "Hank", department_id: 2, department: "Marketing", salary: 80000 },
];

function getDeptAvg(deptId: number): number {
  const deptEmps = employees.filter((e) => e.department_id === deptId);
  return Math.round(deptEmps.reduce((sum, e) => sum + e.salary, 0) / deptEmps.length);
}

type Phase = "idle" | "running" | "done";
type RowStatus = "pending" | "outer-highlight" | "inner-scan" | "comparing" | "pass" | "fail";

const QUERY_SQL = `SELECT name, salary, department
FROM employees e1
WHERE salary > (
    SELECT AVG(salary)
    FROM employees e2
    WHERE e2.department_id = e1.department_id
);`;

export function CorrelatedSubqueriesVisualization() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentRow, setCurrentRow] = useState(0);
  const [rowStatuses, setRowStatuses] = useState<RowStatus[]>(
    () => employees.map(() => "pending")
  );
  const [innerHighlights, setInnerHighlights] = useState<number[]>([]);
  const [computedAvg, setComputedAvg] = useState<number | null>(null);
  const [stepLabel, setStepLabel] = useState("");
  const [results, setResults] = useState<number[]>([]);
  const cancelRef = useRef(false);

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => {
      const id = setTimeout(resolve, ms);
      const check = setInterval(() => {
        if (cancelRef.current) {
          clearTimeout(id);
          clearInterval(check);
          resolve();
        }
      }, 50);
    });

  const reset = useCallback(() => {
    cancelRef.current = true;
    setTimeout(() => {
      cancelRef.current = false;
      setPhase("idle");
      setCurrentRow(0);
      setRowStatuses(employees.map(() => "pending"));
      setInnerHighlights([]);
      setComputedAvg(null);
      setStepLabel("");
      setResults([]);
    }, 100);
  }, []);

  const run = useCallback(async () => {
    cancelRef.current = false;
    setPhase("running");
    setResults([]);
    const statuses: RowStatus[] = employees.map(() => "pending");
    setRowStatuses([...statuses]);
    const passing: number[] = [];

    for (let i = 0; i < employees.length; i++) {
      if (cancelRef.current) return;
      const emp = employees[i];
      setCurrentRow(i);

      // Step 1: Highlight outer row
      statuses[i] = "outer-highlight";
      setRowStatuses([...statuses]);
      setInnerHighlights([]);
      setComputedAvg(null);
      setStepLabel(`Picking outer row: ${emp.name}`);
      await sleep(700);
      if (cancelRef.current) return;

      // Step 2: Inner query scan - highlight matching dept rows
      const deptMatches = employees
        .map((e, idx) => (e.department_id === emp.department_id ? idx : -1))
        .filter((idx) => idx >= 0);
      setInnerHighlights(deptMatches);
      statuses[i] = "inner-scan";
      setRowStatuses([...statuses]);
      setStepLabel(
        `Inner query: finding all ${emp.department} employees (dept_id=${emp.department_id})`
      );
      await sleep(900);
      if (cancelRef.current) return;

      // Step 3: Compute average
      const avg = getDeptAvg(emp.department_id);
      setComputedAvg(avg);
      statuses[i] = "comparing";
      setRowStatuses([...statuses]);
      setStepLabel(
        `AVG(salary) for ${emp.department} = $${avg.toLocaleString()}  |  ${emp.name}'s salary = $${emp.salary.toLocaleString()}`
      );
      await sleep(900);
      if (cancelRef.current) return;

      // Step 4: Compare
      const passes = emp.salary > avg;
      statuses[i] = passes ? "pass" : "fail";
      if (passes) passing.push(i);
      setRowStatuses([...statuses]);
      setResults([...passing]);
      setInnerHighlights([]);
      setComputedAvg(null);
      setStepLabel(
        passes
          ? `$${emp.salary.toLocaleString()} > $${avg.toLocaleString()} -- ${emp.name} included in results`
          : `$${emp.salary.toLocaleString()} <= $${avg.toLocaleString()} -- ${emp.name} excluded`
      );
      await sleep(700);
      if (cancelRef.current) return;
    }

    setPhase("done");
    setStepLabel("Query complete! Rows highlighted in green passed the condition.");
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelRef.current = true;
    };
  }, []);

  const rowBg = (idx: number): string => {
    const status = rowStatuses[idx];
    switch (status) {
      case "outer-highlight":
        return "bg-blue-500/20 border-blue-500/50";
      case "inner-scan":
        return "bg-violet-500/20 border-violet-500/50";
      case "comparing":
        return "bg-amber-500/20 border-amber-500/50";
      case "pass":
        return "bg-emerald-500/15 border-emerald-500/40";
      case "fail":
        return "bg-red-500/10 border-red-500/30 opacity-50";
      default:
        return "bg-muted/30 border-border";
    }
  };

  const innerBorder = (idx: number): string => {
    if (innerHighlights.includes(idx)) {
      return "ring-2 ring-violet-400/60";
    }
    return "";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Correlated Subqueries</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Description */}
        <div className="rounded-xl border p-3 bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300">
          <p className="text-sm">
            A correlated subquery references columns from the outer query, so the
            inner query <span className="font-semibold">runs once per outer row</span>.
            This visualization shows the database evaluating each row one at a time.
          </p>
        </div>

        {/* SQL */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Query</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {QUERY_SQL}
          </pre>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {phase === "idle" && (
            <Button size="sm" onClick={run}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run Query
            </Button>
          )}
          {(phase === "running" || phase === "done") && (
            <Button size="sm" variant="outline" onClick={reset}>
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
            </Button>
          )}
          {phase === "running" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/40 text-violet-700 dark:text-violet-300 text-xs font-medium"
            >
              Processing row {currentRow + 1} of {employees.length}
            </motion.div>
          )}
          {phase === "done" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-medium"
            >
              Done -- {results.length} rows matched
            </motion.div>
          )}
        </div>

        {/* Step label */}
        <AnimatePresence mode="wait">
          {stepLabel && (
            <motion.div
              key={stepLabel}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="rounded-lg border bg-muted/50 px-4 py-2 text-xs font-mono"
            >
              {stepLabel}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table + Inner query panel */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Employees table */}
          <div className="lg:col-span-3 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              employees table (outer query)
            </p>
            <div className="rounded-xl border overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-4 gap-px bg-muted/60 px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                <span>Name</span>
                <span>Dept</span>
                <span className="text-right">Salary</span>
                <span className="text-center">Result</span>
              </div>
              {/* Rows */}
              <div className="divide-y divide-border/50">
                {employees.map((emp, idx) => (
                  <motion.div
                    key={emp.id}
                    layout
                    className={`grid grid-cols-4 gap-px px-3 py-2 text-xs border transition-all duration-300 ${rowBg(idx)} ${innerBorder(idx)}`}
                  >
                    <span className="font-medium">{emp.name}</span>
                    <span className="text-muted-foreground">{emp.department}</span>
                    <span className="text-right font-mono">
                      ${emp.salary.toLocaleString()}
                    </span>
                    <span className="text-center">
                      {rowStatuses[idx] === "pass" && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-block px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold"
                        >
                          PASS
                        </motion.span>
                      )}
                      {rowStatuses[idx] === "fail" && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-block px-1.5 py-0.5 rounded bg-red-500/20 text-red-700 dark:text-red-300 text-[10px] font-bold"
                        >
                          FAIL
                        </motion.span>
                      )}
                      {rowStatuses[idx] === "outer-highlight" && (
                        <span className="text-blue-600 dark:text-blue-400 text-[10px]">
                          current
                        </span>
                      )}
                      {rowStatuses[idx] === "inner-scan" && (
                        <span className="text-violet-600 dark:text-violet-400 text-[10px]">
                          scanning...
                        </span>
                      )}
                      {rowStatuses[idx] === "comparing" && (
                        <span className="text-amber-600 dark:text-amber-400 text-[10px]">
                          comparing
                        </span>
                      )}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Inner query panel */}
          <div className="lg:col-span-2 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Inner subquery
            </p>
            <div className="rounded-xl border bg-violet-500/5 border-violet-500/20 p-3 min-h-[200px]">
              <AnimatePresence mode="wait">
                {phase === "idle" && (
                  <motion.p
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-muted-foreground italic pt-8 text-center"
                  >
                    Click Run to watch the correlated subquery execute row by row
                  </motion.p>
                )}

                {phase !== "idle" && innerHighlights.length > 0 && (
                  <motion.div
                    key={`inner-${currentRow}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    <p className="text-[10px] font-mono text-violet-600 dark:text-violet-400">
                      SELECT AVG(salary) FROM employees
                      <br />
                      WHERE department_id = {employees[currentRow]?.department_id}
                    </p>
                    <div className="space-y-1">
                      {innerHighlights.map((hIdx) => (
                        <motion.div
                          key={hIdx}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: innerHighlights.indexOf(hIdx) * 0.1 }}
                          className="flex justify-between text-[11px] font-mono px-2 py-1 rounded bg-violet-500/10 border border-violet-500/20"
                        >
                          <span>{employees[hIdx].name}</span>
                          <span>${employees[hIdx].salary.toLocaleString()}</span>
                        </motion.div>
                      ))}
                    </div>
                    {computedAvg !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-between text-xs font-bold px-2 py-1.5 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-700 dark:text-blue-300"
                      >
                        <span>AVG =</span>
                        <span>${computedAvg.toLocaleString()}</span>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {phase !== "idle" && innerHighlights.length === 0 && (
                  <motion.div
                    key={`between-${currentRow}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-muted-foreground italic pt-8 text-center"
                  >
                    {phase === "done"
                      ? "All rows processed!"
                      : "Moving to next row..."}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Final results */}
            {phase === "done" && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <p className="text-xs font-semibold text-muted-foreground">
                  Query Result
                </p>
                <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1">
                  <p className="text-muted-foreground">
                    {"  name   |   department   |  salary"}
                  </p>
                  <p className="text-muted-foreground">
                    {"---------+----------------+---------"}
                  </p>
                  {results.map((rIdx) => (
                    <p key={rIdx} className="text-emerald-400">
                      {` ${employees[rIdx].name.padEnd(8)}| ${employees[rIdx].department.padEnd(15)}| $${employees[rIdx].salary.toLocaleString()}`}
                    </p>
                  ))}
                  <p className="text-muted-foreground pt-1">
                    ({results.length} row{results.length !== 1 ? "s" : ""})
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
