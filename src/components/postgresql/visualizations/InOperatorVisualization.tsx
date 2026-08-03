"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Check, X, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TabKey = "basic" | "not_in" | "subquery" | "vs_or";

interface ValueCheck {
  value: string;
  matches: boolean;
}

interface InOperatorTab {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  example: string;
  output: string[];
  checklist: ValueCheck[];
}

const tabs: Record<TabKey, InOperatorTab> = {
  basic: {
    label: "Basic IN",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The IN operator checks if a value matches any value in a list. It is a shorthand for multiple OR conditions and improves readability.",
    example: `SELECT name, department
FROM employees
WHERE department IN ('Engineering', 'Design', 'Marketing');

-- Equivalent to:
-- WHERE department = 'Engineering'
--    OR department = 'Design'
--    OR department = 'Marketing'`,
    output: [
      " name     | department ",
      "----------+------------",
      " Alice    | Engineering",
      " Bob      | Design     ",
      " Charlie  | Marketing  ",
      " Diana    | Engineering",
    ],
    checklist: [
      { value: "Engineering", matches: true },
      { value: "Design", matches: true },
      { value: "Marketing", matches: true },
      { value: "Sales", matches: false },
      { value: "HR", matches: false },
    ],
  },
  not_in: {
    label: "NOT IN",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "NOT IN returns rows where the value does NOT match any value in the list. Be cautious with NULLs -- if the list contains NULL, NOT IN returns no rows.",
    example: `SELECT name, status
FROM orders
WHERE status NOT IN ('cancelled', 'refunded');

-- Careful with NULLs!
-- WHERE id NOT IN (1, 2, NULL)
-- returns NO rows (NULL comparison)`,
    output: [
      " name       | status    ",
      "-----------+----------",
      " Order #101 | completed ",
      " Order #102 | shipped   ",
      " Order #105 | pending   ",
      " Order #108 | shipped   ",
    ],
    checklist: [
      { value: "completed", matches: true },
      { value: "shipped", matches: true },
      { value: "pending", matches: true },
      { value: "cancelled", matches: false },
      { value: "refunded", matches: false },
    ],
  },
  subquery: {
    label: "IN + Subquery",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "IN can accept a subquery that returns a single column. This is powerful for filtering rows based on related data in other tables.",
    example: `SELECT name, email
FROM customers
WHERE id IN (
    SELECT customer_id
    FROM orders
    WHERE total > 500
);

-- Finds customers who have
-- placed high-value orders`,
    output: [
      " name    | email              ",
      "---------+--------------------",
      " Alice   | alice@example.com  ",
      " Charlie | charlie@example.com",
      " Eve     | eve@example.com    ",
    ],
    checklist: [
      { value: "Alice (order: $750)", matches: true },
      { value: "Bob (order: $200)", matches: false },
      { value: "Charlie (order: $900)", matches: true },
      { value: "Diana (order: $150)", matches: false },
      { value: "Eve (order: $620)", matches: true },
    ],
  },
  vs_or: {
    label: "IN vs OR",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "IN is functionally equivalent to chaining OR conditions but is more concise, readable, and often optimized better by the query planner.",
    example: `-- Using IN (clean & concise)
SELECT * FROM products
WHERE category IN ('Books', 'Music', 'Games');

-- Using OR (verbose)
SELECT * FROM products
WHERE category = 'Books'
   OR category = 'Music'
   OR category = 'Games';

-- Both produce the same result!`,
    output: [
      " id | name             | category",
      "----+------------------+---------",
      "  1 | SQL Handbook     | Books   ",
      "  3 | Jazz Album       | Music   ",
      "  5 | Chess Set        | Games   ",
      "  7 | Learn PostgreSQL | Books   ",
    ],
    checklist: [
      { value: "Books", matches: true },
      { value: "Music", matches: true },
      { value: "Games", matches: true },
      { value: "Electronics", matches: false },
      { value: "Clothing", matches: false },
    ],
  },
};

const tabOrder: TabKey[] = ["basic", "not_in", "subquery", "vs_or"];

export function InOperatorVisualization() {
  const [selected, setSelected] = useState<TabKey>("basic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: TabKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">PostgreSQL IN Operator</CardTitle>
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
                  isActive
                    ? t.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <ListChecks className="h-3 w-3" />
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

        {/* Value checklist */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">
            Value Checklist
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-wrap gap-2"
            >
              {tab.checklist.map((item, i) => (
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium ${
                    item.matches
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                      : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
                  }`}
                >
                  {item.matches ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                  {item.value}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* SQL + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              Example SQL
            </p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]">
              {tab.example}
            </pre>
            <Button size="sm" onClick={() => setOutputLines(tab.output)}>
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
