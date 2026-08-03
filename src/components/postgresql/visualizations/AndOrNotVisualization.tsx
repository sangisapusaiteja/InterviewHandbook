"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type OperatorKey = "and_op" | "or_op" | "not_op" | "combined";

interface RowData {
  id: number;
  name: string;
  age: number;
  department: string;
  salary: number;
}

interface OperatorInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  exampleSQL: string;
  output: string[];
  truthTable: { a: boolean; b: boolean; result: boolean }[];
  filterLogic: (row: RowData) => boolean;
  conditionLabels: string[];
  conditionChecks: ((row: RowData) => boolean)[];
}

const sampleData: RowData[] = [
  { id: 1, name: "Alice", age: 30, department: "Engineering", salary: 85000 },
  { id: 2, name: "Bob", age: 25, department: "Marketing", salary: 55000 },
  { id: 3, name: "Carol", age: 35, department: "Engineering", salary: 95000 },
  { id: 4, name: "Dave", age: 28, department: "Sales", salary: 60000 },
  { id: 5, name: "Eve", age: 32, department: "Marketing", salary: 72000 },
  { id: 6, name: "Frank", age: 40, department: "Engineering", salary: 110000 },
];

const operators: Record<OperatorKey, OperatorInfo> = {
  and_op: {
    label: "AND",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "AND requires both conditions to be TRUE. A row is included only when every condition joined by AND evaluates to true.",
    exampleSQL: `SELECT * FROM employees
WHERE department = 'Engineering'
  AND salary > 90000;`,
    output: [
      " id | name  | age | department  | salary",
      "----+-------+-----+-------------+--------",
      "  3 | Carol |  35 | Engineering | 95000",
      "  6 | Frank |  40 | Engineering | 110000",
      "(2 rows)",
    ],
    truthTable: [
      { a: true, b: true, result: true },
      { a: true, b: false, result: false },
      { a: false, b: true, result: false },
      { a: false, b: false, result: false },
    ],
    conditionLabels: ["dept = 'Engineering'", "salary > 90000"],
    conditionChecks: [
      (r) => r.department === "Engineering",
      (r) => r.salary > 90000,
    ],
    filterLogic: (r) => r.department === "Engineering" && r.salary > 90000,
  },
  or_op: {
    label: "OR",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "OR requires at least one condition to be TRUE. A row is included when any condition joined by OR evaluates to true.",
    exampleSQL: `SELECT * FROM employees
WHERE department = 'Engineering'
   OR department = 'Marketing';`,
    output: [
      " id | name  | age | department  | salary",
      "----+-------+-----+-------------+--------",
      "  1 | Alice |  30 | Engineering | 85000",
      "  2 | Bob   |  25 | Marketing   | 55000",
      "  3 | Carol |  35 | Engineering | 95000",
      "  5 | Eve   |  32 | Marketing   | 72000",
      "  6 | Frank |  40 | Engineering | 110000",
      "(5 rows)",
    ],
    truthTable: [
      { a: true, b: true, result: true },
      { a: true, b: false, result: true },
      { a: false, b: true, result: true },
      { a: false, b: false, result: false },
    ],
    conditionLabels: ["dept = 'Engineering'", "dept = 'Marketing'"],
    conditionChecks: [
      (r) => r.department === "Engineering",
      (r) => r.department === "Marketing",
    ],
    filterLogic: (r) =>
      r.department === "Engineering" || r.department === "Marketing",
  },
  not_op: {
    label: "NOT",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "NOT negates a condition. It returns rows where the condition is FALSE. Often combined with other operators like IN, BETWEEN, or LIKE.",
    exampleSQL: `SELECT * FROM employees
WHERE NOT department = 'Engineering';

-- Equivalent to:
-- WHERE department != 'Engineering'`,
    output: [
      " id | name | age | department | salary",
      "----+------+-----+------------+--------",
      "  2 | Bob  |  25 | Marketing  | 55000",
      "  4 | Dave |  28 | Sales      | 60000",
      "  5 | Eve  |  32 | Marketing  | 72000",
      "(3 rows)",
    ],
    truthTable: [
      { a: true, b: false, result: false },
      { a: false, b: false, result: true },
    ],
    conditionLabels: ["dept = 'Engineering'"],
    conditionChecks: [(r) => r.department === "Engineering"],
    filterLogic: (r) => r.department !== "Engineering",
  },
  combined: {
    label: "Combined",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Operators can be combined. AND has higher precedence than OR. Use parentheses to control evaluation order and make intent clear.",
    exampleSQL: `-- Without parentheses (AND binds first):
SELECT * FROM employees
WHERE department = 'Marketing'
   OR department = 'Engineering'
  AND salary > 90000;

-- With parentheses (OR evaluated first):
SELECT * FROM employees
WHERE (department = 'Marketing'
   OR department = 'Engineering')
  AND salary > 90000;`,
    output: [
      "-- Without parentheses:",
      " id | name  | age | department  | salary",
      "----+-------+-----+-------------+--------",
      "  2 | Bob   |  25 | Marketing   | 55000",
      "  3 | Carol |  35 | Engineering | 95000",
      "  5 | Eve   |  32 | Marketing   | 72000",
      "  6 | Frank |  40 | Engineering | 110000",
      "(4 rows)",
      "",
      "-- With parentheses:",
      " id | name  | age | department  | salary",
      "----+-------+-----+-------------+--------",
      "  3 | Carol |  35 | Engineering | 95000",
      "  6 | Frank |  40 | Engineering | 110000",
      "(2 rows)",
    ],
    truthTable: [],
    conditionLabels: [
      "dept = 'Marketing'",
      "dept = 'Engineering'",
      "salary > 90000",
    ],
    conditionChecks: [
      (r) => r.department === "Marketing",
      (r) => r.department === "Engineering",
      (r) => r.salary > 90000,
    ],
    filterLogic: (r) =>
      (r.department === "Marketing" || r.department === "Engineering") &&
      r.salary > 90000,
  },
};

const operatorOrder: OperatorKey[] = ["and_op", "or_op", "not_op", "combined"];

export function AndOrNotVisualization() {
  const [selected, setSelected] = useState<OperatorKey>("and_op");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  const op = operators[selected];

  const handleSelect = (key: OperatorKey) => {
    setSelected(key);
    setOutputLines(null);
    setShowFilter(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">AND, OR, NOT Operators</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Operator tabs */}
        <div className="flex flex-wrap gap-2">
          {operatorOrder.map((key) => {
            const o = operators[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? o.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {o.label}
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
            className={`rounded-xl border p-3 ${op.color}`}
          >
            <p className="text-sm">{op.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Truth table (for and_op, or_op, not_op) */}
        {op.truthTable.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`tt-${selected}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-2"
            >
              <p className="text-xs font-semibold text-muted-foreground">
                Truth Table
              </p>
              <div className="rounded-xl border overflow-hidden text-xs">
                <div
                  className={`grid ${selected === "not_op" ? "grid-cols-2" : "grid-cols-3"} bg-muted/60 px-3 py-2 font-semibold text-muted-foreground`}
                >
                  <span>A</span>
                  {selected !== "not_op" && <span>B</span>}
                  <span>
                    {selected === "and_op"
                      ? "A AND B"
                      : selected === "or_op"
                        ? "A OR B"
                        : "NOT A"}
                  </span>
                </div>
                {op.truthTable.map((row, i) => (
                  <div
                    key={i}
                    className={`grid ${selected === "not_op" ? "grid-cols-2" : "grid-cols-3"} px-3 py-2 border-t hover:bg-muted/30 font-mono`}
                  >
                    <span
                      className={
                        row.a ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"
                      }
                    >
                      {row.a ? "TRUE" : "FALSE"}
                    </span>
                    {selected !== "not_op" && (
                      <span
                        className={
                          row.b ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"
                        }
                      >
                        {row.b ? "TRUE" : "FALSE"}
                      </span>
                    )}
                    <span
                      className={`font-bold ${
                        row.result ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"
                      }`}
                    >
                      {row.result ? "TRUE" : "FALSE"}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Visual row filter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground">
              Row Filter Visualization
            </p>
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              onClick={() => setShowFilter(!showFilter)}
            >
              {showFilter ? "Hide" : "Show"} Filter
            </Button>
          </div>
          <AnimatePresence>
            {showFilter && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="rounded-xl border overflow-hidden text-xs">
                  <div className="grid grid-cols-[40px_70px_40px_100px_70px_repeat(var(--cond-cols),80px)_60px] bg-muted/60 px-3 py-2 font-semibold text-muted-foreground"
                    style={
                      {
                        "--cond-cols": op.conditionLabels.length,
                        gridTemplateColumns: `40px 70px 40px 100px 70px ${op.conditionLabels.map(() => "100px").join(" ")} 60px`,
                      } as React.CSSProperties
                    }
                  >
                    <span>ID</span>
                    <span>Name</span>
                    <span>Age</span>
                    <span>Dept</span>
                    <span>Salary</span>
                    {op.conditionLabels.map((label, i) => (
                      <span key={i} className="truncate" title={label}>
                        {label}
                      </span>
                    ))}
                    <span>Result</span>
                  </div>
                  {sampleData.map((row) => {
                    const passes = op.filterLogic(row);
                    const checks = op.conditionChecks.map((fn) => fn(row));
                    return (
                      <motion.div
                        key={row.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: row.id * 0.05 }}
                        className={`grid px-3 py-2 border-t font-mono transition-colors ${
                          passes
                            ? "bg-emerald-500/10"
                            : "bg-red-500/5 text-muted-foreground"
                        }`}
                        style={{
                          gridTemplateColumns: `40px 70px 40px 100px 70px ${op.conditionLabels.map(() => "100px").join(" ")} 60px`,
                        }}
                      >
                        <span>{row.id}</span>
                        <span>{row.name}</span>
                        <span>{row.age}</span>
                        <span>{row.department}</span>
                        <span>{row.salary}</span>
                        {checks.map((c, i) => (
                          <span
                            key={i}
                            className={
                              c
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-red-500 dark:text-red-400"
                            }
                          >
                            {c ? "TRUE" : "FALSE"}
                          </span>
                        ))}
                        <span
                          className={`font-bold ${
                            passes
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-red-500 dark:text-red-400"
                          }`}
                        >
                          {passes ? "PASS" : "FAIL"}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SQL + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              Example SQL
            </p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]">
              {op.exampleSQL}
            </pre>
            <Button size="sm" onClick={() => setOutputLines(op.output)}>
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
                    <p
                      key={i}
                      className={
                        line.startsWith("--")
                          ? "text-zinc-500"
                          : line.includes("rows")
                            ? "text-zinc-400"
                            : "text-emerald-400"
                      }
                    >
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
