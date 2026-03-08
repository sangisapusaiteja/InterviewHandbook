"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Merge, ArrowDown, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TabKey = "do_nothing" | "do_update" | "excluded" | "conditional";

interface TabInfo {
  label: string;
  color: string;
  description: string;
  sql: string;
  output: string[];
}

const tabs: Record<TabKey, TabInfo> = {
  do_nothing: {
    label: "DO NOTHING",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "ON CONFLICT DO NOTHING silently skips the insert if a conflict occurs on the specified constraint. No error is raised and the existing row remains unchanged. Useful for idempotent inserts.",
    sql: `-- Table with unique email constraint
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(100)
);

-- Existing data: (1, 'alice@mail.com', 'Alice')

-- Attempt to insert duplicate email
INSERT INTO users (email, name)
VALUES ('alice@mail.com', 'Alice Updated')
ON CONFLICT (email) DO NOTHING;`,
    output: [
      "INSERT 0 0",
      "",
      "-- No rows inserted (conflict on email)",
      "-- Existing row is unchanged:",
      " id |     email      | name",
      "----+----------------+------",
      "  1 | alice@mail.com | Alice",
    ],
  },
  do_update: {
    label: "DO UPDATE",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "ON CONFLICT DO UPDATE (also called \"upsert\") updates the existing row when a conflict is detected. You specify which columns to update using SET. The row is modified in-place rather than inserting a duplicate.",
    sql: `-- Upsert: insert or update on conflict
INSERT INTO users (email, name)
VALUES ('alice@mail.com', 'Alice Updated')
ON CONFLICT (email)
DO UPDATE SET
    name = 'Alice Updated';`,
    output: [
      "INSERT 0 1",
      "",
      "-- Row updated (conflict on email):",
      " id |     email      |     name",
      "----+----------------+--------------",
      "  1 | alice@mail.com | Alice Updated",
    ],
  },
  excluded: {
    label: "EXCLUDED Table",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "The EXCLUDED table refers to the row that was proposed for insertion. Use EXCLUDED.column to reference the incoming values in the DO UPDATE SET clause, avoiding hardcoding values.",
    sql: `-- Using EXCLUDED to reference incoming values
INSERT INTO users (email, name)
VALUES ('alice@mail.com', 'Alice V2')
ON CONFLICT (email)
DO UPDATE SET
    name = EXCLUDED.name;

-- EXCLUDED.name = 'Alice V2'
-- (the value we tried to insert)`,
    output: [
      "INSERT 0 1",
      "",
      "-- EXCLUDED.name was 'Alice V2'",
      "-- Row updated with incoming values:",
      " id |     email      |   name",
      "----+----------------+----------",
      "  1 | alice@mail.com | Alice V2",
    ],
  },
  conditional: {
    label: "Conditional Upsert",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    description:
      "Add a WHERE clause to DO UPDATE to conditionally update only when certain criteria are met. If the WHERE condition is false, the update is skipped (like DO NOTHING for that row).",
    sql: `-- Only update if the new name is longer
INSERT INTO users (email, name)
VALUES ('alice@mail.com', 'Al')
ON CONFLICT (email)
DO UPDATE SET
    name = EXCLUDED.name
WHERE LENGTH(EXCLUDED.name) > LENGTH(users.name);

-- 'Al' (len 2) < 'Alice' (len 5)
-- so the update is SKIPPED`,
    output: [
      "INSERT 0 0",
      "",
      "-- WHERE condition was FALSE:",
      "-- LENGTH('Al') = 2, LENGTH('Alice') = 5",
      "-- Update skipped, row unchanged:",
      " id |     email      | name",
      "----+----------------+------",
      "  1 | alice@mail.com | Alice",
    ],
  },
};

const tabOrder: TabKey[] = ["do_nothing", "do_update", "excluded", "conditional"];

interface TableRow {
  id: number;
  email: string;
  name: string;
  highlight?: "conflict" | "updated" | "skipped";
}

const existingRows: TableRow[] = [
  { id: 1, email: "alice@mail.com", name: "Alice" },
  { id: 2, email: "bob@mail.com", name: "Bob" },
  { id: 3, email: "carol@mail.com", name: "Carol" },
];

const incomingRow = { email: "alice@mail.com", name: "Alice Updated" };

export function UpsertVisualization() {
  const [selected, setSelected] = useState<TabKey>("do_nothing");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [animated, setAnimated] = useState(false);

  const tab = tabs[selected];

  const handleSelect = (key: TabKey) => {
    setSelected(key);
    setOutputLines(null);
    setAnimated(false);
  };

  const handleRun = () => {
    setAnimated(true);
    setOutputLines(tab.output);
  };

  const isUpdateResult = selected === "do_update" || selected === "excluded";

  const resultRows: TableRow[] = animated
    ? existingRows.map((r) => {
        if (r.email === incomingRow.email) {
          if (isUpdateResult) {
            return {
              ...r,
              name: selected === "excluded" ? "Alice V2" : "Alice Updated",
              highlight: "updated" as const,
            };
          }
          return { ...r, highlight: "skipped" as const };
        }
        return r;
      })
    : existingRows;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">UPSERT (ON CONFLICT)</CardTitle>
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
                <Merge className="h-3 w-3" />
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

        {/* Visual flow diagram */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Conflict Flow
          </p>
          <div className="flex flex-col items-center gap-2 py-3">
            {/* Incoming row */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border-2 border-dashed border-amber-500/50 bg-amber-500/10 px-4 py-2 text-xs font-mono"
            >
              <span className="text-amber-700 dark:text-amber-300 font-semibold">INSERT </span>
              <span className="text-muted-foreground">
                ({incomingRow.email}, &apos;{incomingRow.name}&apos;)
              </span>
            </motion.div>

            <ArrowDown className="h-4 w-4 text-muted-foreground" />

            {/* Existing table */}
            <div className="rounded-xl border bg-muted/30 p-3 min-w-[280px]">
              <p className="text-xs font-bold text-muted-foreground mb-2">users table</p>
              <div className="space-y-1">
                {resultRows.map((row) => (
                  <motion.div
                    key={row.id}
                    layout
                    className={`flex items-center gap-3 text-[11px] font-mono px-2 py-1 rounded-md transition-colors ${
                      row.highlight === "conflict" || (animated && row.email === incomingRow.email && !isUpdateResult)
                        ? "bg-red-500/15 border border-red-500/30"
                        : row.highlight === "updated"
                        ? "bg-emerald-500/15 border border-emerald-500/30"
                        : row.highlight === "skipped"
                        ? "bg-orange-500/15 border border-orange-500/30"
                        : "bg-background/50"
                    }`}
                  >
                    <span className="w-4 text-muted-foreground">{row.id}</span>
                    <span className="flex-1">{row.email}</span>
                    <span className="text-muted-foreground">{row.name}</span>
                    {animated && row.email === incomingRow.email && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {isUpdateResult ? (
                          <RefreshCw className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <XCircle className="h-3 w-3 text-orange-500" />
                        )}
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>
              {animated && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className={`text-[10px] mt-2 font-medium ${
                    isUpdateResult
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-orange-600 dark:text-orange-400"
                  }`}
                >
                  {isUpdateResult
                    ? "Conflict detected -- row updated (DO UPDATE)"
                    : selected === "conditional"
                    ? "Conflict detected -- WHERE false, update skipped"
                    : "Conflict detected -- insert skipped (DO NOTHING)"}
                </motion.p>
              )}
            </div>
          </div>
        </div>

        {/* SQL + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Example SQL</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]">
              {tab.sql}
            </pre>
            <Button size="sm" onClick={handleRun}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <AnimatePresence mode="wait">
              {outputLines ? (
                <motion.div
                  key={`out-${selected}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[100px]"
                >
                  {outputLines.map((line, i) => (
                    <p
                      key={i}
                      className={
                        line.startsWith("ERROR") || line.includes("violates")
                          ? "text-red-400"
                          : line === ""
                          ? ""
                          : line.startsWith("--") || line.includes("--")
                          ? "text-zinc-400"
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
