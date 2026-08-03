"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ActionKey = "specific" | "condition" | "returning" | "truncate";

interface DeleteAction {
  label: string;
  sql: string;
  description: string;
  color: string;
}

const actions: Record<ActionKey, DeleteAction> = {
  specific: {
    label: "DELETE WHERE",
    sql: "DELETE FROM employees\n  WHERE id = 3;",
    description:
      "Deletes specific rows matching a WHERE clause. Only the rows that satisfy the condition are removed. Always use WHERE to avoid accidentally deleting all data.",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  },
  condition: {
    label: "DELETE BY CONDITION",
    sql: "DELETE FROM employees\n  WHERE department = 'Sales';",
    description:
      "Deletes all rows matching a condition. Multiple rows can be removed in a single statement. The number of affected rows is returned.",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  },
  returning: {
    label: "DELETE RETURNING",
    sql: "DELETE FROM employees\n  WHERE salary < 55000\n  RETURNING id, name, salary;",
    description:
      "Deletes rows and returns the deleted data in one step. Useful for logging, auditing, or passing deleted data to another query. PostgreSQL-specific extension.",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  },
  truncate: {
    label: "TRUNCATE",
    sql: "TRUNCATE TABLE employees;",
    description:
      "Removes ALL rows instantly without scanning. Much faster than DELETE for large tables. Does not fire row-level triggers and cannot use WHERE. Resets table storage.",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
  },
};

const actionOrder: ActionKey[] = ["specific", "condition", "returning", "truncate"];

interface RowData {
  id: number;
  name: string;
  department: string;
  salary: number;
}

const initialRows: RowData[] = [
  { id: 1, name: "Alice", department: "Engineering", salary: 85000 },
  { id: 2, name: "Bob", department: "Sales", salary: 52000 },
  { id: 3, name: "Charlie", department: "Sales", salary: 48000 },
  { id: 4, name: "Diana", department: "Engineering", salary: 92000 },
  { id: 5, name: "Eve", department: "Marketing", salary: 54000 },
];

export function DeleteStatementVisualization() {
  const [selectedAction, setSelectedAction] = useState<ActionKey>("specific");
  const [rows, setRows] = useState<RowData[]>(initialRows);
  const [deletedIds, setDeletedIds] = useState<Set<number>>(new Set());
  const [output, setOutput] = useState<string[] | null>(null);
  const [hasRun, setHasRun] = useState(false);

  const action = actions[selectedAction];

  const handleRun = () => {
    setHasRun(true);

    switch (selectedAction) {
      case "specific": {
        const target = rows.find((r) => r.id === 3);
        if (!target) {
          setOutput(["DELETE 0", "-- No row with id = 3 found"]);
        } else {
          setDeletedIds(new Set([3]));
          setTimeout(() => {
            setRows((prev) => prev.filter((r) => r.id !== 3));
            setDeletedIds(new Set());
          }, 800);
          setOutput(["DELETE 1"]);
        }
        break;
      }
      case "condition": {
        const targets = rows.filter((r) => r.department === "Sales");
        if (targets.length === 0) {
          setOutput(["DELETE 0", "-- No rows with department = 'Sales'"]);
        } else {
          const ids = new Set(targets.map((r) => r.id));
          setDeletedIds(ids);
          setTimeout(() => {
            setRows((prev) => prev.filter((r) => r.department !== "Sales"));
            setDeletedIds(new Set());
          }, 800);
          setOutput([`DELETE ${targets.length}`]);
        }
        break;
      }
      case "returning": {
        const targets = rows.filter((r) => r.salary < 55000);
        if (targets.length === 0) {
          setOutput(["DELETE 0", "-- No rows with salary < 55000"]);
        } else {
          const ids = new Set(targets.map((r) => r.id));
          setDeletedIds(ids);
          const returning = [
            " id |  name   | salary",
            "----+---------+--------",
            ...targets.map(
              (r) =>
                ` ${String(r.id).padEnd(2)} | ${r.name.padEnd(7)} | ${r.salary}`
            ),
            `(${targets.length} rows)`,
          ];
          setTimeout(() => {
            setRows((prev) => prev.filter((r) => r.salary >= 55000));
            setDeletedIds(new Set());
          }, 800);
          setOutput([`DELETE ${targets.length}`, "", ...returning]);
        }
        break;
      }
      case "truncate": {
        if (rows.length === 0) {
          setOutput(["TRUNCATE TABLE", "-- Table already empty"]);
        } else {
          const ids = new Set(rows.map((r) => r.id));
          setDeletedIds(ids);
          setTimeout(() => {
            setRows([]);
            setDeletedIds(new Set());
          }, 800);
          setOutput(["TRUNCATE TABLE", `-- All ${rows.length} rows removed instantly`]);
        }
        break;
      }
    }
  };

  const handleReset = () => {
    setRows(initialRows);
    setDeletedIds(new Set());
    setOutput(null);
    setHasRun(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">DELETE Statement</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Action selector */}
        <div className="flex flex-wrap gap-2">
          {actionOrder.map((key) => {
            const a = actions[key];
            const isActive = selectedAction === key;
            return (
              <motion.button
                key={key}
                onClick={() => {
                  setSelectedAction(key);
                  setOutput(null);
                  setHasRun(false);
                  setDeletedIds(new Set());
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? a.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {a.label}
              </motion.button>
            );
          })}
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAction}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`rounded-xl border p-3 ${action.color}`}
          >
            <p className="text-sm">{action.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Visual table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Table: employees
            </p>
            <Button variant="ghost" size="sm" className="text-xs h-7" onClick={handleReset}>
              <RotateCcw className="h-3 w-3 mr-1" /> Reset
            </Button>
          </div>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>id</span>
              <span>name</span>
              <span>department</span>
              <span>salary</span>
            </div>
            <AnimatePresence>
              {rows.map((row) => {
                const isDeleting = deletedIds.has(row.id);
                return (
                  <motion.div
                    key={row.id}
                    initial={{ opacity: 1, height: "auto" }}
                    animate={{
                      opacity: isDeleting ? 0.3 : 1,
                      height: "auto",
                    }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`grid grid-cols-4 px-3 py-2 border-t transition-colors ${
                      isDeleting ? "bg-red-500/10" : ""
                    }`}
                  >
                    <code
                      className={`font-mono font-medium ${
                        isDeleting ? "line-through text-red-500" : "text-primary"
                      }`}
                    >
                      {row.id}
                    </code>
                    <span
                      className={
                        isDeleting
                          ? "line-through text-red-500"
                          : "text-muted-foreground"
                      }
                    >
                      {row.name}
                    </span>
                    <span
                      className={
                        isDeleting
                          ? "line-through text-red-500"
                          : "text-muted-foreground"
                      }
                    >
                      {row.department}
                    </span>
                    <span
                      className={`font-mono ${
                        isDeleting
                          ? "line-through text-red-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      {row.salary}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {rows.length === 0 && !hasRun && (
              <div className="px-3 py-4 text-center text-muted-foreground text-xs italic">
                No rows
              </div>
            )}
            {rows.length === 0 && hasRun && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-3 py-4 text-center text-muted-foreground text-xs italic"
              >
                Table is empty
              </motion.div>
            )}
          </div>
        </div>

        {/* SQL + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">SQL</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
              {action.sql}
            </pre>
            <Button size="sm" onClick={handleRun}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <AnimatePresence mode="wait">
              {output ? (
                <motion.div
                  key="out"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1"
                >
                  {output.map((line, i) => (
                    <p
                      key={i}
                      className={
                        line.startsWith("ERROR")
                          ? "text-red-400"
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
                  className="rounded-xl border bg-muted/20 px-4 py-3 flex items-center justify-center"
                >
                  <p className="text-xs text-muted-foreground italic">
                    Click Run to execute
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* TRUNCATE vs DELETE comparison */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            TRUNCATE vs DELETE
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Feature</span>
              <span>DELETE</span>
              <span>TRUNCATE</span>
            </div>
            {[
              ["WHERE clause", "Yes", "No"],
              ["Speed (large tables)", "Slow (row by row)", "Very fast"],
              ["Fires row triggers", "Yes", "No"],
              ["RETURNING clause", "Yes", "No"],
              ["MVCC overhead", "Yes (dead tuples)", "Minimal"],
              ["Can rollback", "Yes", "Yes"],
              ["Resets sequences", "No", "With RESTART IDENTITY"],
            ].map(([feature, del, trunc]) => (
              <div
                key={feature}
                className="grid grid-cols-3 px-3 py-2 border-t hover:bg-muted/30"
              >
                <span className="font-medium">{feature}</span>
                <span className="text-muted-foreground">{del}</span>
                <span className="text-muted-foreground">{trunc}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
