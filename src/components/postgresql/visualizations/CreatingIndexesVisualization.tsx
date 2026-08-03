"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TabKey = "syntax" | "before_after" | "tradeoff";

interface TabInfo {
  label: string;
  color: string;
  description: string;
}

const tabs: Record<TabKey, TabInfo> = {
  syntax: {
    label: "CREATE INDEX",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "CREATE INDEX builds a separate data structure that maps column values to row locations. PostgreSQL supports several index types, with B-tree being the default.",
  },
  before_after: {
    label: "Before / After",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "Adding an index dramatically speeds up SELECT queries that filter on the indexed column. The query planner switches from a sequential scan to an index scan.",
  },
  tradeoff: {
    label: "Trade-offs",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    description:
      "Indexes speed up reads but slow down writes. Every INSERT, UPDATE, or DELETE must also update the index. Indexes also consume disk space.",
  },
};

const tabOrder: TabKey[] = ["syntax", "before_after", "tradeoff"];

const syntaxExamples = [
  { label: "Basic index", sql: "CREATE INDEX idx_users_email\n  ON users (email);", note: "Default B-tree index on email column" },
  { label: "Unique index", sql: "CREATE UNIQUE INDEX idx_users_username\n  ON users (username);", note: "Enforces uniqueness + speeds up lookups" },
  { label: "Multi-column", sql: "CREATE INDEX idx_orders_user_date\n  ON orders (user_id, created_at);", note: "Composite index on two columns" },
  { label: "Drop index", sql: "DROP INDEX idx_users_email;", note: "Removes the index from the database" },
];

interface PlanRow {
  operation: string;
  cost: string;
  rows: string;
  time: string;
}

const beforePlan: PlanRow[] = [
  { operation: "Seq Scan on users", cost: "0.00..1254.00", rows: "1", time: "45.230 ms" },
  { operation: "  Filter: (email = 'frank@mail.com')", cost: "", rows: "", time: "" },
  { operation: "  Rows Removed by Filter: 49999", cost: "", rows: "", time: "" },
];

const afterPlan: PlanRow[] = [
  { operation: "Index Scan using idx_users_email", cost: "0.29..8.31", rows: "1", time: "0.045 ms" },
  { operation: "  Index Cond: (email = 'frank@mail.com')", cost: "", rows: "", time: "" },
];

interface MetricBar {
  label: string;
  withoutIndex: number;
  withIndex: number;
  unit: string;
}

const tradeoffMetrics: MetricBar[] = [
  { label: "SELECT speed", withoutIndex: 45, withIndex: 0.05, unit: "ms" },
  { label: "INSERT speed", withoutIndex: 0.5, withIndex: 1.2, unit: "ms" },
  { label: "UPDATE speed", withoutIndex: 0.6, withIndex: 1.4, unit: "ms" },
  { label: "Disk space", withoutIndex: 0, withIndex: 35, unit: "MB" },
];

export function CreatingIndexesVisualization() {
  const [selected, setSelected] = useState<TabKey>("syntax");
  const [showOutput, setShowOutput] = useState(false);

  const tab = tabs[selected];

  const handleSelect = (key: TabKey) => {
    setSelected(key);
    setShowOutput(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Creating Indexes</CardTitle>
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
                {key === "tradeoff" ? <AlertTriangle className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
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

        {/* Syntax tab */}
        {selected === "syntax" && (
          <div className="space-y-3">
            {syntaxExamples.map((ex) => (
              <div key={ex.label} className="space-y-1">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {ex.label}
                </p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
                  {ex.sql}
                </pre>
                <p className="text-[10px] text-muted-foreground">{ex.note}</p>
              </div>
            ))}
          </div>
        )}

        {/* Before / After tab */}
        {selected === "before_after" && (
          <div className="space-y-3">
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-2 whitespace-pre overflow-x-auto">
              {`SELECT * FROM users WHERE email = 'frank@mail.com';\n-- Table has 50,000 rows`}
            </pre>
            <Button size="sm" onClick={() => setShowOutput(true)} disabled={showOutput}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run EXPLAIN ANALYZE
            </Button>

            <AnimatePresence>
              {showOutput && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {/* Before */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                      Before (no index)
                    </p>
                    <div className="rounded-xl border border-orange-500/30 bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-[10px] space-y-0.5">
                      {beforePlan.map((row, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={row.cost ? "text-orange-400" : "text-orange-400/60"}
                        >
                          {row.operation}
                          {row.cost && <span className="text-muted-foreground"> (cost={row.cost})</span>}
                          {row.time && <span className="text-red-400 font-bold"> {row.time}</span>}
                        </motion.p>
                      ))}
                    </div>
                    <div className="rounded-lg bg-orange-500/10 border border-orange-500/20 px-3 py-2">
                      <p className="text-[10px] text-orange-700 dark:text-orange-300">
                        Scanned all 50,000 rows. Execution time: <span className="font-bold">45.230 ms</span>
                      </p>
                    </div>
                  </div>

                  {/* After */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      After (with index)
                    </p>
                    <div className="rounded-xl border border-emerald-500/30 bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-[10px] space-y-0.5">
                      {afterPlan.map((row, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 + 0.3 }}
                          className={row.cost ? "text-emerald-400" : "text-emerald-400/60"}
                        >
                          {row.operation}
                          {row.cost && <span className="text-muted-foreground"> (cost={row.cost})</span>}
                          {row.time && <span className="text-emerald-300 font-bold"> {row.time}</span>}
                        </motion.p>
                      ))}
                    </div>
                    <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2">
                      <p className="text-[10px] text-emerald-700 dark:text-emerald-300">
                        Direct lookup via index. Execution time: <span className="font-bold">0.045 ms</span> (1000x faster)
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Trade-off tab */}
        {selected === "tradeoff" && (
          <div className="space-y-4">
            <div className="space-y-3">
              {tradeoffMetrics.map((metric) => {
                const maxVal = Math.max(metric.withoutIndex, metric.withIndex, 1);
                const withoutPct = Math.max((metric.withoutIndex / maxVal) * 100, 3);
                const withPct = Math.max((metric.withIndex / maxVal) * 100, 3);
                const isBetterWith = metric.withIndex < metric.withoutIndex;
                const isBetterWithout = metric.withoutIndex < metric.withIndex;
                return (
                  <div key={metric.label} className="space-y-1.5">
                    <p className="text-xs font-semibold">{metric.label}</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] w-20 text-muted-foreground">No index</span>
                        <div className="flex-1 bg-muted/30 rounded-full h-4 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${withoutPct}%` }}
                            transition={{ duration: 0.6 }}
                            className={`h-full rounded-full flex items-center justify-end pr-2 ${
                              isBetterWithout ? "bg-emerald-500/40" : "bg-orange-500/40"
                            }`}
                          >
                            <span className="text-[9px] font-mono font-bold">
                              {metric.withoutIndex} {metric.unit}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] w-20 text-muted-foreground">With index</span>
                        <div className="flex-1 bg-muted/30 rounded-full h-4 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${withPct}%` }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`h-full rounded-full flex items-center justify-end pr-2 ${
                              isBetterWith ? "bg-emerald-500/40" : "bg-orange-500/40"
                            }`}
                          >
                            <span className="text-[9px] font-mono font-bold">
                              {metric.withIndex} {metric.unit}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3">
              <p className="text-xs font-semibold text-orange-700 dark:text-orange-300 mb-1">
                <AlertTriangle className="h-3 w-3 inline mr-1" />
                When NOT to index
              </p>
              <ul className="text-[10px] text-orange-700/80 dark:text-orange-300/80 space-y-0.5 list-disc list-inside">
                <li>Small tables (sequential scan is fast enough)</li>
                <li>Columns rarely used in WHERE / JOIN / ORDER BY</li>
                <li>Tables with heavy write workloads and few reads</li>
                <li>Low-cardinality columns (e.g., boolean, status with 2-3 values)</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
