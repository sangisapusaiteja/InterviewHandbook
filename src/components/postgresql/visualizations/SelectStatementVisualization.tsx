"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Table, Columns3, Calculator, FunctionSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CategoryKey = "all_columns" | "specific" | "expressions" | "functions";

const tableColumns = ["id", "name", "email", "salary", "department"];
const tableRows = [
  ["1", "Alice", "alice@mail.com", "75000", "Engineering"],
  ["2", "Bob", "bob@mail.com", "68000", "Marketing"],
  ["3", "Carol", "carol@mail.com", "82000", "Engineering"],
];

interface SelectCategory {
  label: string;
  icon: React.ReactNode;
  color: string;
  badgeColor: string;
  description: string;
  highlightedColumns: number[];
  example: string;
  output: string[];
}

const categories: Record<CategoryKey, SelectCategory> = {
  all_columns: {
    label: "SELECT *",
    icon: <Table className="h-3.5 w-3.5" />,
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "SELECT * retrieves all columns from a table. Useful for quick exploration, but avoid in production — always specify the columns you need.",
    highlightedColumns: [0, 1, 2, 3, 4],
    example: `-- Retrieve every column from employees\nSELECT * FROM employees;\n\n-- Equivalent to listing all columns:\nSELECT id, name, email, salary, department\nFROM employees;`,
    output: [
      "id | name  | email          | salary | department",
      "---+-------+----------------+--------+------------",
      " 1 | Alice | alice@mail.com | 75000  | Engineering",
      " 2 | Bob   | bob@mail.com   | 68000  | Marketing",
      " 3 | Carol | carol@mail.com | 82000  | Engineering",
      "(3 rows)",
    ],
  },
  specific: {
    label: "Specific Columns",
    icon: <Columns3 className="h-3.5 w-3.5" />,
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Select only the columns you need. This reduces data transfer, improves performance, and makes queries self-documenting.",
    highlightedColumns: [1, 3],
    example: `-- Only fetch name and salary\nSELECT name, salary\nFROM employees;\n\n-- With column aliases\nSELECT name AS employee_name,\n       salary AS annual_pay\nFROM employees;`,
    output: [
      "employee_name | annual_pay",
      "--------------+-----------",
      "Alice         | 75000",
      "Bob           | 68000",
      "Carol         | 82000",
      "(3 rows)",
    ],
  },
  expressions: {
    label: "Expressions",
    icon: <Calculator className="h-3.5 w-3.5" />,
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "SELECT can compute expressions on the fly — arithmetic, string concatenation, conditional logic, and more.",
    highlightedColumns: [1, 3],
    example: `-- Calculated columns\nSELECT name,\n       salary,\n       salary * 0.10 AS bonus,\n       salary + salary * 0.10 AS total_pay\nFROM employees;\n\n-- String concatenation\nSELECT name || ' (' || department || ')'\n       AS employee_info\nFROM employees;`,
    output: [
      "name  | salary | bonus | total_pay",
      "------+--------+-------+----------",
      "Alice | 75000  | 7500  | 82500",
      "Bob   | 68000  | 6800  | 74800",
      "Carol | 82000  | 8200  | 90200",
      "(3 rows)",
    ],
  },
  functions: {
    label: "Functions",
    icon: <FunctionSquare className="h-3.5 w-3.5" />,
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "PostgreSQL provides powerful built-in functions — aggregate, string, date, and math functions — that you can use directly in SELECT.",
    highlightedColumns: [1, 3, 4],
    example: `-- Aggregate functions\nSELECT COUNT(*) AS total,\n       AVG(salary) AS avg_salary,\n       MAX(salary) AS highest,\n       MIN(salary) AS lowest,\n       SUM(salary) AS payroll\nFROM employees;\n\n-- String functions\nSELECT UPPER(name) AS shout,\n       LENGTH(email) AS email_len\nFROM employees;`,
    output: [
      "total | avg_salary | highest | lowest | payroll",
      "------+------------+---------+--------+--------",
      "    3 | 75000.00   |   82000 |  68000 | 225000",
      "(1 row)",
      "",
      "shout | email_len",
      "------+----------",
      "ALICE | 14",
      "BOB   | 12",
      "CAROL | 14",
      "(3 rows)",
    ],
  },
};

const categoryOrder: CategoryKey[] = [
  "all_columns",
  "specific",
  "expressions",
  "functions",
];

export function SelectStatementVisualization() {
  const [selected, setSelected] = useState<CategoryKey>("all_columns");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const cat = categories[selected];

  const handleSelect = (key: CategoryKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">SELECT Statement</CardTitle>
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
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? c.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {c.icon}
                {c.label}
              </motion.button>
            );
          })}
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={selected + "-desc"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-muted-foreground leading-relaxed"
          >
            {cat.description}
          </motion.p>
        </AnimatePresence>

        {/* Visual table representation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              employees table
            </p>
            <div className="rounded-xl border overflow-hidden text-xs">
              {/* Header row */}
              <div className="grid grid-cols-5 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                {tableColumns.map((col, i) => (
                  <motion.span
                    key={col}
                    animate={{
                      opacity: cat.highlightedColumns.includes(i) ? 1 : 0.3,
                    }}
                    className={
                      cat.highlightedColumns.includes(i)
                        ? "text-primary font-bold"
                        : ""
                    }
                  >
                    {col}
                  </motion.span>
                ))}
              </div>
              {/* Data rows */}
              {tableRows.map((row, ri) => (
                <div
                  key={ri}
                  className="grid grid-cols-5 px-3 py-2 border-t hover:bg-muted/30"
                >
                  {row.map((cell, ci) => (
                    <motion.span
                      key={ci}
                      animate={{
                        opacity: cat.highlightedColumns.includes(ci) ? 1 : 0.3,
                      }}
                      className={`font-mono ${
                        cat.highlightedColumns.includes(ci)
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {cell}
                    </motion.span>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Example + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              Example SQL
            </p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]">
              {cat.example}
            </pre>
            <Button size="sm" onClick={() => setOutputLines(cat.output)}>
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
