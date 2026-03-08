"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRightLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TabKey = "basic" | "nulls" | "vs_left" | "anti_join";

interface TabInfo {
  label: string;
  color: string;
  description: string;
  sql: string;
  example: string;
  output: string[];
}

const tabs: Record<TabKey, TabInfo> = {
  basic: {
    label: "Basic RIGHT JOIN",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "RIGHT JOIN returns all rows from the right table and the matched rows from the left table. If there is no match in the left table, NULL values are returned for left table columns.",
    sql: `SELECT e.name AS employee,\n       d.name AS department\nFROM employees e\nRIGHT JOIN departments d\n  ON e.department_id = d.id;`,
    example: `-- All departments are preserved,\n-- even if no employee belongs to them.\n\nSELECT e.name AS employee,\n       d.name AS department\nFROM employees e\nRIGHT JOIN departments d\n  ON e.department_id = d.id;`,
    output: [
      " employee  | department ",
      "-----------+------------",
      " Alice     | Engineering",
      " Charlie   | Engineering",
      " Bob       | Marketing  ",
      " NULL      | Design     ",
    ],
  },
  nulls: {
    label: "NULLs for Unmatched",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "When a right table row has no matching row in the left table, all columns from the left table are filled with NULL. This is how RIGHT JOIN preserves every row from the right side.",
    sql: `SELECT e.id AS emp_id,\n       e.name AS employee,\n       d.id AS dept_id,\n       d.name AS department\nFROM employees e\nRIGHT JOIN departments d\n  ON e.department_id = d.id;`,
    example: `-- Notice emp_id and employee are NULL\n-- for the 'Design' department because\n-- no employee references dept_id = 3.\n\nSELECT e.id AS emp_id,\n       e.name AS employee,\n       d.id AS dept_id,\n       d.name AS department\nFROM employees e\nRIGHT JOIN departments d\n  ON e.department_id = d.id;`,
    output: [
      " emp_id | employee  | dept_id | department ",
      "--------+-----------+---------+------------",
      "      1 | Alice     |       1 | Engineering",
      "      3 | Charlie   |       1 | Engineering",
      "      2 | Bob       |       2 | Marketing  ",
      "   NULL | NULL      |       3 | Design     ",
    ],
  },
  vs_left: {
    label: "LEFT JOIN Equivalence",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "A RIGHT JOIN is equivalent to a LEFT JOIN with the tables swapped. In practice, most developers prefer LEFT JOIN for readability. Understanding this mirror relationship is key for interviews.",
    sql: `-- These two queries produce identical results:\n\n-- Using RIGHT JOIN:\nSELECT e.name, d.name\nFROM employees e\nRIGHT JOIN departments d\n  ON e.department_id = d.id;\n\n-- Equivalent LEFT JOIN (tables swapped):\nSELECT e.name, d.name\nFROM departments d\nLEFT JOIN employees e\n  ON e.department_id = d.id;`,
    example: `-- RIGHT JOIN: employees RIGHT JOIN departments\n-- LEFT JOIN:  departments LEFT JOIN employees\n--\n-- Both keep ALL departments.\n-- The only difference is table order.\n\nSELECT e.name AS employee,\n       d.name AS department\nFROM departments d\nLEFT JOIN employees e\n  ON e.department_id = d.id;`,
    output: [
      " employee  | department ",
      "-----------+------------",
      " Alice     | Engineering",
      " Charlie   | Engineering",
      " Bob       | Marketing  ",
      " NULL      | Design     ",
      "",
      "-- Same result as the RIGHT JOIN!",
    ],
  },
  anti_join: {
    label: "Anti-Join Pattern",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    description:
      "A RIGHT JOIN anti-join finds rows in the right table that have NO match in the left table. Filter with WHERE left_table.key IS NULL to isolate unmatched right rows.",
    sql: `-- Find departments with no employees\nSELECT d.id, d.name AS department\nFROM employees e\nRIGHT JOIN departments d\n  ON e.department_id = d.id\nWHERE e.id IS NULL;`,
    example: `-- Anti-join: only keep right rows\n-- where the left side is NULL.\n-- Useful for finding "orphan" records.\n\nSELECT d.id, d.name AS department\nFROM employees e\nRIGHT JOIN departments d\n  ON e.department_id = d.id\nWHERE e.id IS NULL;`,
    output: [
      " id | department",
      "----+-----------",
      "  3 | Design    ",
      "",
      "(1 row) -- only unmatched right rows",
    ],
  },
};

const tabOrder: TabKey[] = ["basic", "nulls", "vs_left", "anti_join"];

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
];

const departments: DeptRow[] = [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Marketing" },
  { id: 3, name: "Design" },
];

function getHighlightForDept(tabKey: TabKey, deptId: number): string {
  const hasMatch = employees.some((e) => e.department_id === deptId);
  if (tabKey === "anti_join" && !hasMatch) return "ring-2 ring-orange-400";
  if (!hasMatch) return "ring-2 ring-red-400/50";
  return "";
}

export function RightJoinVisualization() {
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
        <CardTitle className="text-lg">RIGHT JOIN</CardTitle>
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
                <ArrowRightLeft className="h-3 w-3" />
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

        {/* Mini tables diagram */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {selected === "vs_left"
              ? "Mirror Relationship"
              : "Table Diagram — Right Table Fully Preserved"}
          </p>
          <div className="flex items-center justify-center gap-4 py-3">
            {/* Left table: employees */}
            <div className="rounded-xl border bg-muted/30 p-3 min-w-[160px]">
              <p className="text-xs font-bold text-muted-foreground mb-2">
                employees <span className="font-normal">(left)</span>
              </p>
              {employees.map((e) => {
                const matched =
                  selected === "anti_join"
                    ? false
                    : departments.some((d) => d.id === e.department_id);
                return (
                  <div
                    key={e.id}
                    className={`flex items-center gap-2 text-[10px] py-0.5 ${
                      selected === "anti_join" ? "opacity-40" : ""
                    }`}
                  >
                    <span className="font-mono w-4 text-right">{e.id}</span>
                    <span className={matched ? "" : "text-muted-foreground"}>
                      {e.name}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[8px] px-1 py-0"
                    >
                      dept:{e.department_id}
                    </Badge>
                  </div>
                );
              })}
              {selected !== "anti_join" && (
                <div className="flex items-center gap-2 text-[10px] py-0.5 text-red-400 italic">
                  <span className="font-mono w-4 text-right">-</span>
                  <span>NULL (no match for Design)</span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-1 shrink-0">
              <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
              {selected === "vs_left" && (
                <Badge
                  variant="secondary"
                  className="text-[8px] px-1.5 py-0 bg-violet-500/20 text-violet-700 dark:text-violet-300"
                >
                  swap = LEFT JOIN
                </Badge>
              )}
            </div>

            {/* Right table: departments — fully preserved */}
            <div className="rounded-xl border bg-blue-500/10 p-3 min-w-[160px]">
              <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">
                departments <span className="font-normal">(right)</span>
              </p>
              {departments.map((d) => {
                const highlight = getHighlightForDept(selected, d.id);
                const hasMatch = employees.some(
                  (e) => e.department_id === d.id
                );
                return (
                  <div
                    key={d.id}
                    className={`flex items-center gap-2 text-[10px] py-0.5 rounded px-1 ${highlight}`}
                  >
                    <Badge
                      variant="secondary"
                      className="text-[8px] px-1 py-0 bg-blue-500/20"
                    >
                      PK
                    </Badge>
                    <span className="font-mono">{d.id}</span>
                    <span
                      className={
                        !hasMatch
                          ? "text-red-500 dark:text-red-400 font-semibold"
                          : "text-muted-foreground"
                      }
                    >
                      {d.name}
                    </span>
                    {!hasMatch && (
                      <Badge
                        variant="outline"
                        className="text-[8px] px-1 py-0 border-red-400/50 text-red-500 dark:text-red-400"
                      >
                        no match
                      </Badge>
                    )}
                    {hasMatch && (
                      <Badge
                        variant="outline"
                        className="text-[8px] px-1 py-0 border-emerald-400/50 text-emerald-600 dark:text-emerald-400"
                      >
                        matched
                      </Badge>
                    )}
                  </div>
                );
              })}
              <p className="text-[9px] text-blue-600 dark:text-blue-400 mt-1 italic">
                All rows kept in result
              </p>
            </div>
          </div>
        </div>

        {/* SQL definition */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">SQL</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {tab.sql}
          </pre>
        </div>

        {/* Example + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              Example
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[100px]"
                >
                  {outputLines.map((line, i) => (
                    <p
                      key={i}
                      className={
                        line.includes("NULL")
                          ? "text-red-400"
                          : line.startsWith("--")
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
