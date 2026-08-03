"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TabKey = "basic" | "left_only" | "right_only" | "reconciliation";

interface TabInfo {
  label: string;
  color: string;
  description: string;
  sql: string;
  output: string[];
}

const tabs: Record<TabKey, TabInfo> = {
  basic: {
    label: "FULL JOIN",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "A FULL OUTER JOIN returns all rows from both tables. Where a match exists, columns from both tables are filled. Where there is no match, the missing side is filled with NULLs.",
    sql: `SELECT
  e.name AS employee,
  d.name AS department
FROM employees e
FULL OUTER JOIN departments d
  ON e.dept_id = d.id;`,
    output: [
      " employee | department ",
      "----------+-------------",
      " Alice    | Engineering",
      " Bob      | Marketing",
      " Charlie  | Engineering",
      " NULL     | Sales",
      " Diana    | NULL",
      "",
      "(5 rows)",
    ],
  },
  left_only: {
    label: "Left Only",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "Filter for rows that exist only in the left table by checking WHERE the right side IS NULL. These are employees with no matching department.",
    sql: `SELECT
  e.name AS employee,
  e.dept_id
FROM employees e
FULL OUTER JOIN departments d
  ON e.dept_id = d.id
WHERE d.id IS NULL;`,
    output: [
      " employee | dept_id",
      "----------+--------",
      " Diana    | 99",
      "",
      "(1 row) -- unmatched left rows",
    ],
  },
  right_only: {
    label: "Right Only",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "Filter for rows that exist only in the right table by checking WHERE the left side IS NULL. These are departments with no employees assigned.",
    sql: `SELECT
  d.id AS dept_id,
  d.name AS department
FROM employees e
FULL OUTER JOIN departments d
  ON e.dept_id = d.id
WHERE e.id IS NULL;`,
    output: [
      " dept_id | department",
      "---------+-----------",
      "       3 | Sales",
      "",
      "(1 row) -- unmatched right rows",
    ],
  },
  reconciliation: {
    label: "Reconciliation",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    description:
      "Use a FULL JOIN to reconcile two datasets. Count matched rows, left-only rows, and right-only rows to identify discrepancies between tables.",
    sql: `SELECT
  CASE
    WHEN e.id IS NOT NULL AND d.id IS NOT NULL
      THEN 'matched'
    WHEN e.id IS NOT NULL
      THEN 'left_only'
    ELSE 'right_only'
  END AS status,
  COUNT(*) AS row_count
FROM employees e
FULL OUTER JOIN departments d
  ON e.dept_id = d.id
GROUP BY status;`,
    output: [
      "   status   | row_count",
      "------------+----------",
      " matched    |        3",
      " left_only  |        1",
      " right_only |        1",
      "",
      "(3 rows) -- reconciliation summary",
    ],
  },
};

const tabOrder: TabKey[] = ["basic", "left_only", "right_only", "reconciliation"];

interface EmpRow {
  id: number;
  name: string;
  dept_id: number | null;
}

interface DeptRow {
  id: number;
  name: string;
}

const employees: EmpRow[] = [
  { id: 1, name: "Alice", dept_id: 1 },
  { id: 2, name: "Bob", dept_id: 2 },
  { id: 3, name: "Charlie", dept_id: 1 },
  { id: 4, name: "Diana", dept_id: 99 },
];

const departments: DeptRow[] = [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Marketing" },
  { id: 3, name: "Sales" },
];

type VennRegion = "left" | "center" | "right";

function getHighlightedRegions(tab: TabKey): VennRegion[] {
  switch (tab) {
    case "basic":
      return ["left", "center", "right"];
    case "left_only":
      return ["left"];
    case "right_only":
      return ["right"];
    case "reconciliation":
      return ["left", "center", "right"];
  }
}

function getLeftOnlyRows() {
  const deptIds = new Set(departments.map((d) => d.id));
  return employees.filter((e) => e.dept_id === null || !deptIds.has(e.dept_id));
}

function getMatchedRows() {
  const deptMap = new Map(departments.map((d) => [d.id, d.name]));
  return employees
    .filter((e) => e.dept_id !== null && deptMap.has(e.dept_id))
    .map((e) => ({ employee: e.name, department: deptMap.get(e.dept_id!)! }));
}

function getRightOnlyRows() {
  const usedDeptIds = new Set(employees.map((e) => e.dept_id).filter(Boolean));
  return departments.filter((d) => !usedDeptIds.has(d.id));
}

export function FullJoinVisualization() {
  const [selected, setSelected] = useState<TabKey>("basic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];
  const highlighted = getHighlightedRegions(selected);

  const leftOnly = getLeftOnlyRows();
  const matched = getMatchedRows();
  const rightOnly = getRightOnlyRows();

  const handleSelect = (key: TabKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  const isRegionActive = (region: VennRegion) => highlighted.includes(region);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">FULL OUTER JOIN</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Tab selector */}
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive ? t.color + " shadow-sm" : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <CircleDot className="h-3 w-3" />
                {t.label}
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
            className={`rounded-xl border p-3 ${tab.color}`}
          >
            <p className="text-sm">{tab.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Venn Diagram */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Venn Diagram
          </p>
          <div className="flex items-center justify-center py-4">
            <div className="relative w-[340px] h-[180px]">
              {/* Left circle */}
              <motion.div
                animate={{
                  opacity: isRegionActive("left") || isRegionActive("center") ? 1 : 0.25,
                  scale: isRegionActive("left") || isRegionActive("center") ? 1 : 0.97,
                }}
                className="absolute left-0 top-0 w-[210px] h-[180px] rounded-full border-2 border-blue-500/60 bg-blue-500/10 flex items-start justify-start pl-5 pt-6"
              >
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-blue-700 dark:text-blue-300 mb-1">
                    employees
                  </p>
                  {leftOnly.map((e) => (
                    <motion.p
                      key={e.id}
                      animate={{ opacity: isRegionActive("left") ? 1 : 0.3 }}
                      className="text-[10px] font-mono text-blue-600 dark:text-blue-400"
                    >
                      {e.name} (dept:{e.dept_id})
                    </motion.p>
                  ))}
                </div>
              </motion.div>

              {/* Right circle */}
              <motion.div
                animate={{
                  opacity: isRegionActive("right") || isRegionActive("center") ? 1 : 0.25,
                  scale: isRegionActive("right") || isRegionActive("center") ? 1 : 0.97,
                }}
                className="absolute right-0 top-0 w-[210px] h-[180px] rounded-full border-2 border-emerald-500/60 bg-emerald-500/10 flex items-start justify-end pr-5 pt-6"
              >
                <div className="space-y-1 text-right">
                  <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 mb-1">
                    departments
                  </p>
                  {rightOnly.map((d) => (
                    <motion.p
                      key={d.id}
                      animate={{ opacity: isRegionActive("right") ? 1 : 0.3 }}
                      className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400"
                    >
                      {d.name} (id:{d.id})
                    </motion.p>
                  ))}
                </div>
              </motion.div>

              {/* Center overlap */}
              <motion.div
                animate={{
                  opacity: isRegionActive("center") ? 1 : 0.25,
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] text-center"
              >
                <p className="text-[10px] font-bold text-violet-700 dark:text-violet-300 mb-1">
                  matched
                </p>
                {matched.map((m, i) => (
                  <motion.p
                    key={i}
                    animate={{ opacity: isRegionActive("center") ? 1 : 0.3 }}
                    className="text-[9px] font-mono text-violet-600 dark:text-violet-400 leading-tight"
                  >
                    {m.employee} - {m.department}
                  </motion.p>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* SQL */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">SQL Query</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {tab.sql}
          </pre>
        </div>

        {/* Run + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Source Tables</p>
            <div className="rounded-xl border bg-muted/40 px-4 py-3 space-y-3">
              <div>
                <p className="text-[10px] font-bold text-blue-700 dark:text-blue-300 mb-1">employees</p>
                {employees.map((e) => (
                  <p key={e.id} className="text-[10px] font-mono text-muted-foreground">
                    {e.id} | {e.name} | dept_id: {e.dept_id}
                  </p>
                ))}
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 mb-1">departments</p>
                {departments.map((d) => (
                  <p key={d.id} className="text-[10px] font-mono text-muted-foreground">
                    {d.id} | {d.name}
                  </p>
                ))}
              </div>
            </div>
            <Button size="sm" onClick={() => setOutputLines(tab.output)}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <AnimatePresence mode="wait">
              {outputLines ? (
                <motion.div
                  key="out"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[100px]"
                >
                  {outputLines.map((line, i) => (
                    <p
                      key={i}
                      className={
                        line.includes("NULL")
                          ? "text-orange-400"
                          : line.startsWith("(")
                          ? "text-muted-foreground"
                          : line === ""
                          ? ""
                          : "text-emerald-400"
                      }
                    >
                      {line || "\u00A0"}
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
