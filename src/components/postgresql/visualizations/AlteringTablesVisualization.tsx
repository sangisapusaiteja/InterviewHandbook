"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ColumnDef {
  name: string;
  type: string;
  nullable: boolean;
}

type ActionKey = "add" | "drop" | "rename" | "type" | "default" | "notnull";

interface AlterAction {
  label: string;
  sql: string;
  description: string;
  color: string;
  apply: (cols: ColumnDef[]) => ColumnDef[];
  resultMessage: string;
}

const initialColumns: ColumnDef[] = [
  { name: "id", type: "SERIAL", nullable: false },
  { name: "name", type: "VARCHAR(50)", nullable: true },
  { name: "email", type: "VARCHAR(100)", nullable: true },
];

const alterActions: Record<ActionKey, AlterAction> = {
  add: {
    label: "ADD COLUMN",
    sql: "ALTER TABLE employees\n  ADD COLUMN age INTEGER;",
    description: "Adds a new column to the table. Existing rows get NULL for the new column (or the DEFAULT value if specified).",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    apply: (cols) => {
      if (cols.some((c) => c.name === "age")) return cols;
      return [...cols, { name: "age", type: "INTEGER", nullable: true }];
    },
    resultMessage: "ALTER TABLE -- column 'age' added",
  },
  drop: {
    label: "DROP COLUMN",
    sql: "ALTER TABLE employees\n  DROP COLUMN IF EXISTS age;",
    description: "Removes a column from the table. The column is marked invisible; disk space is reclaimed during VACUUM.",
    color: "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300",
    apply: (cols) => cols.filter((c) => c.name !== "age"),
    resultMessage: "ALTER TABLE -- column 'age' dropped",
  },
  rename: {
    label: "RENAME COLUMN",
    sql: "ALTER TABLE employees\n  RENAME COLUMN name TO full_name;",
    description: "Renames a column without affecting its data or type. All existing data is preserved.",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    apply: (cols) =>
      cols.map((c) => (c.name === "name" ? { ...c, name: "full_name" } : c.name === "full_name" ? { ...c, name: "name" } : c)),
    resultMessage: "ALTER TABLE -- column renamed",
  },
  type: {
    label: "ALTER TYPE",
    sql: "ALTER TABLE employees\n  ALTER COLUMN email\n  TYPE TEXT;",
    description: "Changes a column's data type. PostgreSQL attempts to cast existing values. Use USING for custom conversion.",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    apply: (cols) =>
      cols.map((c) => {
        if (c.name === "email") {
          return { ...c, type: c.type === "TEXT" ? "VARCHAR(100)" : "TEXT" };
        }
        return c;
      }),
    resultMessage: "ALTER TABLE -- column type changed",
  },
  default: {
    label: "SET DEFAULT",
    sql: "ALTER TABLE employees\n  ALTER COLUMN email\n  SET DEFAULT 'not@provided.com';",
    description: "Sets or changes the default value for a column. The default applies to new INSERT statements, not existing rows.",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    apply: (cols) => cols,
    resultMessage: "ALTER TABLE -- default value set for 'email'",
  },
  notnull: {
    label: "SET NOT NULL",
    sql: "ALTER TABLE employees\n  ALTER COLUMN email\n  SET NOT NULL;",
    description: "Adds a NOT NULL constraint. All existing rows must already have non-NULL values or the command fails.",
    color: "bg-pink-500/15 border-pink-500/40 text-pink-700 dark:text-pink-300",
    apply: (cols) =>
      cols.map((c) => (c.name === "email" ? { ...c, nullable: !c.nullable } : c)),
    resultMessage: "ALTER TABLE -- NOT NULL constraint toggled for 'email'",
  },
};

const actionOrder: ActionKey[] = ["add", "drop", "rename", "type", "default", "notnull"];

export function AlteringTablesVisualization() {
  const [columns, setColumns] = useState<ColumnDef[]>(initialColumns);
  const [selectedAction, setSelectedAction] = useState<ActionKey>("add");
  const [output, setOutput] = useState<string[] | null>(null);

  const action = alterActions[selectedAction];

  const handleRun = () => {
    setColumns((prev) => action.apply(prev));
    setOutput(["ALTER TABLE", action.resultMessage]);
  };

  const handleReset = () => {
    setColumns(initialColumns);
    setOutput(["-- Table reset to original structure"]);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Altering Tables</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Action selector */}
        <div className="flex flex-wrap gap-2">
          {actionOrder.map((key) => {
            const a = alterActions[key];
            const isActive = selectedAction === key;
            return (
              <motion.button
                key={key}
                onClick={() => { setSelectedAction(key); setOutput(null); }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive ? a.color + " shadow-sm" : "bg-background border-border text-muted-foreground hover:bg-muted"
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

        {/* Current table structure */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Current Table: employees
            </p>
            <Button variant="ghost" size="sm" className="text-xs h-7" onClick={handleReset}>
              Reset
            </Button>
          </div>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Column</span>
              <span>Type</span>
              <span>Nullable</span>
            </div>
            <AnimatePresence>
              {columns.map((col) => (
                <motion.div
                  key={col.name}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-3 px-3 py-2 border-t"
                >
                  <code className="font-mono font-medium text-primary">{col.name}</code>
                  <code className="font-mono text-muted-foreground">{col.type}</code>
                  <span>
                    {col.nullable ? (
                      <Badge variant="outline" className="text-[9px]">NULL</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[9px] bg-orange-500/20 text-orange-600">NOT NULL</Badge>
                    )}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* SQL + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">ALTER TABLE SQL</p>
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
                    <p key={i} className="text-emerald-400">{line}</p>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="ph"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-muted/20 px-4 py-3 flex items-center justify-center"
                >
                  <p className="text-xs text-muted-foreground italic">Click Run to execute</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
