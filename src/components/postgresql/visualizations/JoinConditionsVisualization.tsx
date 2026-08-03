"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TabKey = "on_clause" | "using_clause" | "non_equi" | "on_vs_where";

interface TabInfo {
  label: string;
  color: string;
  description: string;
  sql: string;
  example: string;
  output: string[];
}

const tabs: Record<TabKey, TabInfo> = {
  on_clause: {
    label: "ON Clause",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "The ON clause specifies the join condition using explicit column comparisons. It is the most flexible form — columns can have different names, and you can combine multiple conditions with AND/OR.",
    sql: `-- Tables used:\n-- employees (id, name, department_id)\n-- departments (id, dept_name, floor)\n\nSELECT e.name, d.dept_name\nFROM employees e\nINNER JOIN departments d\n  ON e.department_id = d.id;`,
    example: `-- employees              departments\n-- id | name   | dept_id   id | dept_name   | floor\n-- 1  | Alice  | 10        10 | Engineering | 3\n-- 2  | Bob    | 20        20 | Marketing   | 2\n-- 3  | Carol  | 30        40 | Finance     | 1\n\nSELECT e.name, d.dept_name\nFROM employees e\nINNER JOIN departments d\n  ON e.department_id = d.id;`,
    output: [
      " name  | dept_name",
      "-------+------------",
      " Alice | Engineering",
      " Bob   | Marketing",
      "(2 rows)",
      "",
      "-- Carol (dept_id=30) has no match → excluded",
      "-- Finance (id=40) has no match → excluded",
    ],
  },
  using_clause: {
    label: "USING Clause",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "USING is a shorthand for ON when the join column has the same name in both tables. It removes the duplicate column from the result. You cannot add extra conditions like with ON.",
    sql: `-- When both tables share the column name:\n-- orders (id, customer_id, total)\n-- customers (customer_id, name)\n\n-- USING shorthand:\nSELECT o.id, c.name, o.total\nFROM orders o\nINNER JOIN customers c\n  USING (customer_id);\n\n-- Equivalent ON form:\n--   ON o.customer_id = c.customer_id`,
    example: `-- orders                   customers\n-- id | customer_id | total  customer_id | name\n-- 1  | 101         | 50.00  101         | Alice\n-- 2  | 102         | 30.00  102         | Bob\n-- 3  | 103         | 75.00  104         | Diana\n\nSELECT o.id, c.name, o.total\nFROM orders o\nINNER JOIN customers c USING (customer_id);`,
    output: [
      " id | name  | total",
      "----+-------+------",
      "  1 | Alice | 50.00",
      "  2 | Bob   | 30.00",
      "(2 rows)",
      "",
      "-- USING (customer_id) = ON o.customer_id = c.customer_id",
      "-- Column appears once in result, not twice",
    ],
  },
  non_equi: {
    label: "Non-Equi Joins",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "Non-equi joins use conditions other than equality: BETWEEN, >, <, >=, <=, or <>. Useful for range lookups (e.g., salary grades), date ranges, and interval matching. Each row can match zero, one, or many rows.",
    sql: `-- salary_grades\n-- grade | min_salary | max_salary\n-- 'A'   | 80000      | 999999\n-- 'B'   | 50000      | 79999\n-- 'C'   | 30000      | 49999\n\nSELECT e.name, e.salary, g.grade\nFROM employees e\nJOIN salary_grades g\n  ON e.salary BETWEEN g.min_salary\n                    AND g.max_salary;`,
    example: `-- employees             salary_grades\n-- name   | salary       grade | min    | max\n-- Alice  | 90000        'A'   | 80000  | 999999\n-- Bob    | 55000        'B'   | 50000  | 79999\n-- Carol  | 42000        'C'   | 30000  | 49999\n-- Diana  | 25000\n\nSELECT e.name, e.salary, g.grade\nFROM employees e\nJOIN salary_grades g\n  ON e.salary BETWEEN g.min_salary AND g.max_salary;`,
    output: [
      " name  | salary | grade",
      "-------+--------+------",
      " Alice | 90000  | A",
      " Bob   | 55000  | B",
      " Carol | 42000  | C",
      "(3 rows)",
      "",
      "-- Diana (25000) has no matching grade → excluded",
      "-- Range condition: each row checked against all ranges",
    ],
  },
  on_vs_where: {
    label: "ON vs WHERE",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    description:
      "In a LEFT JOIN, ON and WHERE behave differently. ON filters the right table BEFORE joining (unmatched left rows still appear with NULLs). WHERE filters AFTER the join, removing rows entirely — turning a LEFT JOIN into an INNER JOIN if applied to the right table.",
    sql: `-- CRITICAL DIFFERENCE:\n\n-- 1) Filter in ON → keeps all left rows\nSELECT e.name, d.dept_name\nFROM employees e\nLEFT JOIN departments d\n  ON e.dept_id = d.id\n  AND d.dept_name = 'Engineering';\n\n-- 2) Filter in WHERE → removes non-matching rows\nSELECT e.name, d.dept_name\nFROM employees e\nLEFT JOIN departments d\n  ON e.dept_id = d.id\nWHERE d.dept_name = 'Engineering';`,
    example: `-- employees              departments\n-- name  | dept_id       id | dept_name\n-- Alice | 1             1  | Engineering\n-- Bob   | 2             2  | Marketing\n-- Carol | NULL\n\n-- Query 1: AND in ON clause\n-- Query 2: WHERE clause filter`,
    output: [
      "-- Query 1: Filter in ON (preserves LEFT JOIN)",
      " name  | dept_name",
      "-------+------------",
      " Alice | Engineering",
      " Bob   | NULL         ← kept, but Marketing filtered out",
      " Carol | NULL         ← kept, no dept_id",
      "(3 rows)",
      "",
      "-- Query 2: Filter in WHERE (acts like INNER JOIN)",
      " name  | dept_name",
      "-------+------------",
      " Alice | Engineering",
      "(1 row)              ← Bob & Carol removed!",
    ],
  },
};

const tabOrder: TabKey[] = ["on_clause", "using_clause", "non_equi", "on_vs_where"];

interface SyntaxRow {
  feature: string;
  on: string;
  using: string;
}

const syntaxComparison: SyntaxRow[] = [
  { feature: "Column names", on: "Can differ between tables", using: "Must be identical" },
  { feature: "Syntax", on: "ON a.col = b.col", using: "USING (col)" },
  { feature: "Result columns", on: "Both columns appear", using: "Single column (deduped)" },
  { feature: "Extra conditions", on: "AND / OR supported", using: "Not supported" },
  { feature: "Multi-column", on: "ON a.x = b.x AND a.y = b.y", using: "USING (x, y)" },
];

export function JoinConditionsVisualization() {
  const [selected, setSelected] = useState<TabKey>("on_clause");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: TabKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Join Conditions</CardTitle>
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

        {/* ON vs USING comparison table */}
        {(selected === "on_clause" || selected === "using_clause") && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              ON vs USING Comparison
            </p>
            <div className="rounded-xl border overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/40">
                    <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Feature</th>
                    <th className="text-left px-3 py-2 font-semibold text-blue-700 dark:text-blue-300">ON</th>
                    <th className="text-left px-3 py-2 font-semibold text-emerald-700 dark:text-emerald-300">USING</th>
                  </tr>
                </thead>
                <tbody>
                  {syntaxComparison.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                      <td className="px-3 py-1.5 font-medium text-muted-foreground">{row.feature}</td>
                      <td className="px-3 py-1.5 font-mono text-[11px]">{row.on}</td>
                      <td className="px-3 py-1.5 font-mono text-[11px]">{row.using}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Non-equi range matching diagram */}
        {selected === "non_equi" && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Range Matching vs Equality
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 py-2">
              <div className="rounded-xl border bg-blue-500/10 p-3 flex-1 min-w-[160px]">
                <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">Equality (=)</p>
                <p className="text-[11px] text-muted-foreground mb-1">Each row matches exactly 0 or 1 row</p>
                <pre className="text-[10px] font-mono text-blue-700 dark:text-blue-300">ON a.id = b.id</pre>
              </div>
              <div className="rounded-xl border bg-violet-500/10 p-3 flex-1 min-w-[160px]">
                <p className="text-xs font-bold text-violet-700 dark:text-violet-300 mb-2">Range (BETWEEN)</p>
                <p className="text-[11px] text-muted-foreground mb-1">Each row checked against all ranges</p>
                <pre className="text-[10px] font-mono text-violet-700 dark:text-violet-300">ON val BETWEEN min AND max</pre>
              </div>
              <div className="rounded-xl border bg-orange-500/10 p-3 flex-1 min-w-[160px]">
                <p className="text-xs font-bold text-orange-700 dark:text-orange-300 mb-2">Inequality (&gt;, &lt;)</p>
                <p className="text-[11px] text-muted-foreground mb-1">Can produce many matches per row</p>
                <pre className="text-[10px] font-mono text-orange-700 dark:text-orange-300">ON a.date &gt; b.date</pre>
              </div>
            </div>
          </div>
        )}

        {/* SQL Definition */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">SQL Syntax</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {tab.sql}
          </pre>
        </div>

        {/* Example + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Example</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]">
              {tab.example}
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
                          ? "text-zinc-500"
                          : line.includes("←")
                          ? "text-orange-400"
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
