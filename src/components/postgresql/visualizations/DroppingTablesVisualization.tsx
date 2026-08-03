"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ActionKey = "drop" | "drop_if" | "cascade" | "truncate" | "truncate_restart";

interface DropAction {
  label: string;
  sql: string;
  description: string;
  color: string;
  danger: boolean;
}

const actions: Record<ActionKey, DropAction> = {
  drop: {
    label: "DROP TABLE",
    sql: "DROP TABLE orders;",
    description: "Permanently removes the table, its data, indexes, triggers, and constraints. Cannot be undone without a backup.",
    color: "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300",
    danger: true,
  },
  drop_if: {
    label: "DROP IF EXISTS",
    sql: "DROP TABLE IF EXISTS temp_data;",
    description: "Same as DROP TABLE but does not throw an error if the table does not exist. Safe to use in scripts.",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    danger: false,
  },
  cascade: {
    label: "DROP CASCADE",
    sql: "DROP TABLE orders CASCADE;",
    description: "Drops the table AND all dependent objects (views, foreign keys referencing this table). Use with extreme caution.",
    color: "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300",
    danger: true,
  },
  truncate: {
    label: "TRUNCATE",
    sql: "TRUNCATE TABLE orders;",
    description: "Removes ALL rows from the table but keeps the table structure, indexes, and constraints intact. Much faster than DELETE.",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    danger: false,
  },
  truncate_restart: {
    label: "TRUNCATE + RESTART",
    sql: "TRUNCATE TABLE orders\n  RESTART IDENTITY;",
    description: "Removes all rows AND resets auto-incrementing sequences (SERIAL/IDENTITY) back to their initial values.",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    danger: false,
  },
};

const actionOrder: ActionKey[] = ["drop", "drop_if", "cascade", "truncate", "truncate_restart"];

interface TableState {
  name: string;
  rows: number;
  exists: boolean;
  deps: string[];
}

const initialTables: TableState[] = [
  { name: "orders", rows: 150, exists: true, deps: ["order_items (FK)", "order_summary (VIEW)"] },
  { name: "order_items", rows: 400, exists: true, deps: [] },
  { name: "temp_data", rows: 0, exists: false, deps: [] },
];

export function DroppingTablesVisualization() {
  const [selectedAction, setSelectedAction] = useState<ActionKey>("drop");
  const [tables, setTables] = useState<TableState[]>(initialTables);
  const [output, setOutput] = useState<string[] | null>(null);

  const action = actions[selectedAction];

  const handleRun = () => {
    switch (selectedAction) {
      case "drop": {
        const t = tables.find((t) => t.name === "orders");
        if (t && !t.exists) {
          setOutput(["ERROR: table \"orders\" does not exist"]);
        } else if (t && t.deps.length > 0) {
          setOutput([
            'ERROR: cannot drop table "orders" because other objects depend on it',
            `DETAIL: ${t.deps.join(", ")} depend on it`,
            "HINT: Use DROP ... CASCADE to drop dependent objects too.",
          ]);
        } else {
          setTables(tables.map((tb) => (tb.name === "orders" ? { ...tb, exists: false, rows: 0 } : tb)));
          setOutput(["DROP TABLE"]);
        }
        break;
      }
      case "drop_if":
        setOutput(["NOTICE: table \"temp_data\" does not exist, skipping", "DROP TABLE"]);
        break;
      case "cascade":
        setTables(
          tables.map((tb) =>
            tb.name === "orders" ? { ...tb, exists: false, rows: 0, deps: [] } : tb
          )
        );
        setOutput([
          "DROP TABLE CASCADE",
          "-- Dropped: orders",
          "-- Dropped dependent: order_items (FK reference)",
          "-- Dropped dependent: order_summary (VIEW)",
        ]);
        break;
      case "truncate":
        setTables(tables.map((tb) => (tb.name === "orders" ? { ...tb, rows: 0 } : tb)));
        setOutput(["TRUNCATE TABLE", "-- All rows removed, table structure preserved"]);
        break;
      case "truncate_restart":
        setTables(tables.map((tb) => (tb.name === "orders" ? { ...tb, rows: 0 } : tb)));
        setOutput(["TRUNCATE TABLE", "-- All rows removed", "-- SERIAL sequence reset to 1"]);
        break;
    }
  };

  const handleReset = () => {
    setTables(initialTables);
    setOutput(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Dropping Tables</CardTitle>
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
            <div className="flex items-center gap-2 mb-1">
              {action.danger && (
                <Badge variant="destructive" className="text-[9px]">DESTRUCTIVE</Badge>
              )}
            </div>
            <p className="text-sm">{action.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Table states */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Tables on Server
            </p>
            <Button variant="ghost" size="sm" className="text-xs h-7" onClick={handleReset}>
              <RotateCcw className="h-3 w-3 mr-1" /> Reset
            </Button>
          </div>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Table</span>
              <span>Status</span>
              <span>Rows</span>
              <span>Dependencies</span>
            </div>
            {tables.map((t) => (
              <div key={t.name} className="grid grid-cols-4 px-3 py-2 border-t">
                <code className="font-mono font-medium">{t.name}</code>
                <span>
                  {t.exists ? (
                    <Badge variant="secondary" className="text-[9px] bg-emerald-500/20 text-emerald-600">EXISTS</Badge>
                  ) : (
                    <Badge variant="outline" className="text-[9px] text-muted-foreground">GONE</Badge>
                  )}
                </span>
                <span className="text-muted-foreground font-mono">{t.exists ? t.rows : "-"}</span>
                <span className="text-muted-foreground text-[10px]">
                  {t.deps.length > 0 ? t.deps.join(", ") : "-"}
                </span>
              </div>
            ))}
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
                    <p key={i} className={line.startsWith("ERROR") ? "text-red-400" : "text-emerald-400"}>
                      {line}
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
                  <p className="text-xs text-muted-foreground italic">Click Run to execute</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Comparison table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            DROP vs TRUNCATE vs DELETE
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Feature</span>
              <span>DROP</span>
              <span>TRUNCATE</span>
              <span>DELETE</span>
            </div>
            {[
              ["Removes structure", "Yes", "No", "No"],
              ["Removes data", "Yes", "All rows", "WHERE rows"],
              ["Speed", "Fast", "Fast", "Slow (row by row)"],
              ["Fires triggers", "No", "No", "Yes"],
              ["Can rollback", "Yes", "Yes", "Yes"],
              ["WHERE clause", "N/A", "No", "Yes"],
            ].map(([feature, drop, trunc, del]) => (
              <div key={feature} className="grid grid-cols-4 px-3 py-2 border-t hover:bg-muted/30">
                <span className="font-medium">{feature}</span>
                <span className="text-muted-foreground">{drop}</span>
                <span className="text-muted-foreground">{trunc}</span>
                <span className="text-muted-foreground">{del}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
