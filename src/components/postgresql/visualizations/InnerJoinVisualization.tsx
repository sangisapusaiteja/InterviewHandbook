"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TabKey = "basic" | "filter" | "aggregate" | "excluded";

interface TabInfo {
  label: string;
  color: string;
  description: string;
  sql: string;
  output: string[];
}

const tabs: Record<TabKey, TabInfo> = {
  basic: {
    label: "Basic INNER JOIN",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "INNER JOIN returns only the rows where there is a match in both tables. Rows without a match in either table are excluded from the result.",
    sql: `SELECT e.name AS employee,\n       d.name AS department\nFROM employees e\nINNER JOIN departments d\n  ON e.department_id = d.id;`,
    output: [
      " employee | department ",
      "----------+-------------",
      " Alice    | Engineering",
      " Bob      | Marketing  ",
      " Charlie  | Engineering",
      "(3 rows)",
    ],
  },
  filter: {
    label: "With WHERE",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "You can add a WHERE clause after the JOIN to further filter the matched rows. The JOIN happens first, then WHERE filters the result.",
    sql: `SELECT e.name AS employee,\n       d.name AS department\nFROM employees e\nINNER JOIN departments d\n  ON e.department_id = d.id\nWHERE d.name = 'Engineering';`,
    output: [
      " employee | department ",
      "----------+-------------",
      " Alice    | Engineering",
      " Charlie  | Engineering",
      "(2 rows)",
    ],
  },
  aggregate: {
    label: "GROUP BY",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "INNER JOIN combined with GROUP BY and aggregate functions like COUNT lets you summarize related data across tables.",
    sql: `SELECT d.name AS department,\n       COUNT(e.id) AS employee_count\nFROM departments d\nINNER JOIN employees e\n  ON d.id = e.department_id\nGROUP BY d.name\nORDER BY employee_count DESC;`,
    output: [
      " department  | employee_count",
      "-------------+---------------",
      " Engineering |             2",
      " Marketing   |             1",
      "(2 rows)",
    ],
  },
  excluded: {
    label: "Excluded Rows",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    description:
      "INNER JOIN excludes rows that have no match. Employees without a department and departments without employees are both omitted from the result.",
    sql: `-- Diana has department_id = NULL\n-- Sales department has no employees\n\nSELECT e.name AS employee,\n       d.name AS department\nFROM employees e\nINNER JOIN departments d\n  ON e.department_id = d.id;\n\n-- Diana is EXCLUDED (no matching dept)\n-- Sales is EXCLUDED (no matching emp)`,
    output: [
      " employee | department ",
      "----------+-------------",
      " Alice    | Engineering",
      " Bob      | Marketing  ",
      " Charlie  | Engineering",
      "(3 rows)",
      "",
      "-- Excluded from results:",
      "-- Diana (department_id IS NULL)",
      "-- Sales dept (no employees)",
    ],
  },
};

const tabOrder: TabKey[] = ["basic", "filter", "aggregate", "excluded"];

interface EmpRow {
  id: number;
  name: string;
  department_id: number | null;
}

interface DeptRow {
  id: number;
  name: string;
}

const employees: EmpRow[] = [
  { id: 1, name: "Alice", department_id: 1 },
  { id: 2, name: "Bob", department_id: 2 },
  { id: 3, name: "Charlie", department_id: 1 },
  { id: 4, name: "Diana", department_id: null },
];

const departments: DeptRow[] = [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Marketing" },
  { id: 3, name: "Sales" },
];

function isEmpMatched(emp: EmpRow, tab: TabKey): boolean {
  if (emp.department_id === null) return false;
  const deptExists = departments.some((d) => d.id === emp.department_id);
  if (!deptExists) return false;
  if (tab === "filter") {
    const dept = departments.find((d) => d.id === emp.department_id);
    return dept?.name === "Engineering";
  }
  return true;
}

function isDeptMatched(dept: DeptRow, tab: TabKey): boolean {
  const hasEmp = employees.some((e) => e.department_id === dept.id);
  if (!hasEmp) return false;
  if (tab === "filter") {
    return dept.name === "Engineering";
  }
  return true;
}

function getMatchedPairs(tab: TabKey): { empId: number; deptId: number }[] {
  const pairs: { empId: number; deptId: number }[] = [];
  for (const emp of employees) {
    if (emp.department_id === null) continue;
    const dept = departments.find((d) => d.id === emp.department_id);
    if (!dept) continue;
    if (tab === "filter" && dept.name !== "Engineering") continue;
    pairs.push({ empId: emp.id, deptId: dept.id });
  }
  return pairs;
}

export function InnerJoinVisualization() {
  const [selected, setSelected] = useState<TabKey>("basic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];
  const matchedPairs = getMatchedPairs(selected);

  const handleSelect = (key: TabKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">INNER JOIN</CardTitle>
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
                <Link2 className="h-3 w-3" />
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

        {/* Venn diagram + table visualization */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Join Visualization
          </p>

          {/* Venn diagram */}
          <div className="flex items-center justify-center py-4">
            <svg width="280" height="140" viewBox="0 0 280 140" className="overflow-visible">
              {/* Left circle - Employees */}
              <circle
                cx="100"
                cy="70"
                r="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-blue-400/50"
              />
              <circle
                cx="100"
                cy="70"
                r="60"
                fill="currentColor"
                className="text-blue-500/10"
              />
              {/* Right circle - Departments */}
              <circle
                cx="180"
                cy="70"
                r="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-emerald-400/50"
              />
              <circle
                cx="180"
                cy="70"
                r="60"
                fill="currentColor"
                className="text-emerald-500/10"
              />
              {/* Intersection highlight */}
              <clipPath id="clip-left">
                <circle cx="100" cy="70" r="60" />
              </clipPath>
              <circle
                cx="180"
                cy="70"
                r="60"
                fill="currentColor"
                className="text-yellow-500/25"
                clipPath="url(#clip-left)"
              />
              {/* Labels */}
              <text x="65" y="30" fontSize="11" fontWeight="600" fill="currentColor" className="text-blue-600 dark:text-blue-300">
                employees
              </text>
              <text x="185" y="30" fontSize="11" fontWeight="600" fill="currentColor" className="text-emerald-600 dark:text-emerald-300">
                departments
              </text>
              <text x="125" y="75" fontSize="10" fontWeight="700" textAnchor="middle" fill="currentColor" className="text-yellow-700 dark:text-yellow-300">
                INNER
              </text>
              <text x="125" y="88" fontSize="10" fontWeight="700" textAnchor="middle" fill="currentColor" className="text-yellow-700 dark:text-yellow-300">
                JOIN
              </text>
            </svg>
          </div>

          {/* Table rows with connection lines */}
          <div className="flex items-start justify-center gap-6 py-3">
            {/* Employees table */}
            <div className="rounded-xl border bg-blue-500/10 p-3 min-w-[160px]">
              <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">employees</p>
              {employees.map((e) => {
                const matched = isEmpMatched(e, selected);
                return (
                  <motion.div
                    key={e.id}
                    animate={{ opacity: matched ? 1 : 0.35 }}
                    className={`flex items-center gap-2 text-[10px] py-1 px-1 rounded ${
                      matched ? "" : "line-through decoration-muted-foreground/40"
                    }`}
                  >
                    <span className="font-mono w-3">{e.id}</span>
                    <span className={matched ? "text-foreground" : "text-muted-foreground"}>
                      {e.name}
                    </span>
                    <span className="font-mono text-muted-foreground ml-auto">
                      dept:{e.department_id ?? "NULL"}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Connection indicators */}
            <div className="flex flex-col items-center justify-center gap-1 pt-7 min-w-[60px]">
              {matchedPairs.length > 0 ? (
                matchedPairs.map((pair, i) => (
                  <motion.div
                    key={`${pair.empId}-${pair.deptId}`}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-1"
                  >
                    <div className="h-px w-4 bg-yellow-500/60" />
                    <div className="h-2 w-2 rounded-full bg-yellow-500/80" />
                    <div className="h-px w-4 bg-yellow-500/60" />
                  </motion.div>
                ))
              ) : (
                <p className="text-[9px] text-muted-foreground italic">no matches</p>
              )}
            </div>

            {/* Departments table */}
            <div className="rounded-xl border bg-emerald-500/10 p-3 min-w-[140px]">
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2">departments</p>
              {departments.map((d) => {
                const matched = isDeptMatched(d, selected);
                return (
                  <motion.div
                    key={d.id}
                    animate={{ opacity: matched ? 1 : 0.35 }}
                    className={`flex items-center gap-2 text-[10px] py-1 px-1 rounded ${
                      matched ? "" : "line-through decoration-muted-foreground/40"
                    }`}
                  >
                    <span className="font-mono w-3">{d.id}</span>
                    <span className={matched ? "text-foreground" : "text-muted-foreground"}>
                      {d.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Excluded row callout for the excluded tab */}
          {selected === "excluded" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3 text-xs text-orange-700 dark:text-orange-300"
            >
              <p className="font-semibold mb-1">Excluded from results:</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li><span className="font-mono">Diana</span> -- department_id is NULL, no match</li>
                <li><span className="font-mono">Sales</span> -- no employees reference this department</li>
              </ul>
            </motion.div>
          )}
        </div>

        {/* SQL + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">SQL Query</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]">
              {tab.sql}
            </pre>
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
                        line.startsWith("--")
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
