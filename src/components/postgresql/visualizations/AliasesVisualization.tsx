"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AliasKey = "column" | "expression" | "table" | "quotes";

interface ColumnRename {
  original: string;
  alias: string;
}

interface AliasCategory {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  example: string;
  output: string[];
  renames: ColumnRename[];
}

const aliases: Record<AliasKey, AliasCategory> = {
  column: {
    label: "Column Aliases",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Use AS to give a column a temporary name in the result set. The alias only exists for the duration of the query.",
    example: `SELECT\n  first_name AS name,\n  email AS contact_email,\n  department AS dept\nFROM employees;`,
    output: [
      "name       | contact_email       | dept",
      "-----------+---------------------+------------",
      "Alice      | alice@company.com   | Engineering",
      "Bob        | bob@company.com     | Marketing",
      "Charlie    | charlie@company.com | Sales",
    ],
    renames: [
      { original: "first_name", alias: "name" },
      { original: "email", alias: "contact_email" },
      { original: "department", alias: "dept" },
    ],
  },
  expression: {
    label: "Expression Aliases",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Aliases are especially useful for computed columns and expressions. Without an alias, PostgreSQL generates a generic column name like ?column?.",
    example: `SELECT\n  first_name,\n  salary * 12 AS annual_salary,\n  salary * 12 * 0.8 AS after_tax,\n  CONCAT(first_name, ' ', last_name) AS full_name\nFROM employees;`,
    output: [
      "first_name | annual_salary | after_tax | full_name",
      "-----------+--------------+----------+-----------",
      "Alice      | 96000.00     | 76800.00 | Alice Smith",
      "Bob        | 84000.00     | 67200.00 | Bob Jones",
      "Charlie    | 72000.00     | 57600.00 | Charlie Lee",
    ],
    renames: [
      { original: "salary * 12", alias: "annual_salary" },
      { original: "salary * 12 * 0.8", alias: "after_tax" },
      { original: "CONCAT(...)", alias: "full_name" },
    ],
  },
  table: {
    label: "Table Aliases",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Table aliases shorten table names in queries, especially useful in JOINs. The AS keyword is optional for table aliases.",
    example: `SELECT\n  e.first_name,\n  e.salary,\n  d.name AS department\nFROM employees AS e\nJOIN departments AS d\n  ON e.department_id = d.id;`,
    output: [
      "first_name | salary   | department",
      "-----------+----------+------------",
      "Alice      | 8000.00  | Engineering",
      "Bob        | 7000.00  | Marketing",
      "Charlie    | 6000.00  | Sales",
    ],
    renames: [
      { original: "employees", alias: "e" },
      { original: "departments", alias: "d" },
    ],
  },
  quotes: {
    label: "Quoted Aliases",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      'Use double quotes for aliases with spaces, special characters, or mixed case. Without quotes, PostgreSQL folds aliases to lowercase.',
    example: `SELECT\n  first_name AS "First Name",\n  salary AS "Monthly Salary ($)",\n  hire_date AS "Date of Joining",\n  department AS "Dept / Division"\nFROM employees;`,
    output: [
      "First Name | Monthly Salary ($) | Date of Joining | Dept / Division",
      "-----------+--------------------+-----------------+-----------------",
      "Alice      | 8000.00            | 2022-03-15      | Engineering",
      "Bob        | 7000.00            | 2021-07-01      | Marketing",
      "Charlie    | 6000.00            | 2023-01-10      | Sales",
    ],
    renames: [
      { original: "first_name", alias: '"First Name"' },
      { original: "salary", alias: '"Monthly Salary ($)"' },
      { original: "hire_date", alias: '"Date of Joining"' },
      { original: "department", alias: '"Dept / Division"' },
    ],
  },
};

const aliasOrder: AliasKey[] = ["column", "expression", "table", "quotes"];

export function AliasesVisualization() {
  const [selected, setSelected] = useState<AliasKey>("column");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const cat = aliases[selected];

  const handleSelect = (key: AliasKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">SQL Aliases</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {aliasOrder.map((key) => {
            const c = aliases[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? c.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {c.label}
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
            className={`rounded-xl border p-3 ${cat.color}`}
          >
            <p className="text-sm">{cat.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Column rename visualization */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected + "-renames"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              {selected === "table" ? "Table" : "Column"} Renaming
            </p>
            <div className="flex flex-wrap gap-3">
              {cat.renames.map((r, i) => (
                <motion.div
                  key={r.original}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 rounded-xl border bg-muted/30 px-3 py-2"
                >
                  <code className="text-xs font-mono text-muted-foreground">
                    {r.original}
                  </code>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  <code
                    className={`text-xs font-mono font-semibold ${
                      selected === "column"
                        ? "text-blue-600 dark:text-blue-400"
                        : selected === "expression"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : selected === "table"
                            ? "text-violet-600 dark:text-violet-400"
                            : "text-orange-600 dark:text-orange-400"
                    }`}
                  >
                    {r.alias}
                  </code>
                </motion.div>
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
