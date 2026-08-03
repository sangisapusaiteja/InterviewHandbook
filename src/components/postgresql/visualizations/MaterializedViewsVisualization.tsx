"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Clock, Zap, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CompareMode = "overview" | "performance" | "staleness";

const modeInfo: Record<CompareMode, { label: string; color: string }> = {
  overview: {
    label: "View vs Materialized",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  },
  performance: {
    label: "Performance",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  },
  staleness: {
    label: "Staleness & Refresh",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
  },
};

const modeOrder: CompareMode[] = ["overview", "performance", "staleness"];

const createMatViewSQL = `CREATE MATERIALIZED VIEW sales_summary AS
  SELECT region, SUM(amount) AS total,
         COUNT(*) AS orders
  FROM orders
  GROUP BY region;`;

const refreshSQL = `-- Refresh to get latest data
REFRESH MATERIALIZED VIEW sales_summary;

-- Non-blocking refresh (allows reads during refresh)
REFRESH MATERIALIZED VIEW CONCURRENTLY
  sales_summary;`;

interface SalesRow {
  region: string;
  total: number;
  orders: number;
}

const initialData: SalesRow[] = [
  { region: "North", total: 45000, orders: 120 },
  { region: "South", total: 38000, orders: 95 },
  { region: "East", total: 52000, orders: 140 },
  { region: "West", total: 41000, orders: 110 },
];

const updatedData: SalesRow[] = [
  { region: "North", total: 48500, orders: 132 },
  { region: "South", total: 39200, orders: 99 },
  { region: "East", total: 55800, orders: 153 },
  { region: "West", total: 43100, orders: 118 },
];

export function MaterializedViewsVisualization() {
  const [mode, setMode] = useState<CompareMode>("overview");
  const [isStale, setIsStale] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const matViewData = refreshed ? updatedData : initialData;

  const handleNewData = () => {
    setIsStale(true);
    setRefreshed(false);
  };

  const handleRefresh = () => {
    setRefreshed(true);
    setIsStale(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Materialized Views</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Mode selector */}
        <div className="flex flex-wrap gap-2">
          {modeOrder.map((key) => {
            const m = modeInfo[key];
            const isActive = mode === key;
            return (
              <motion.button
                key={key}
                onClick={() => {
                  setMode(key);
                  setIsStale(false);
                  setRefreshed(false);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? m.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <Database className="h-3 w-3" />
                {m.label}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {mode === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Create Materialized View</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
                  {createMatViewSQL}
                </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Regular view */}
                <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-300">
                      Regular View
                    </p>
                  </div>
                  <div className="space-y-2 text-xs text-blue-700 dark:text-blue-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Stores only the query definition
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Re-executes query on every access
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Always returns current data
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Can be slow for complex queries
                    </div>
                  </div>
                </div>

                {/* Materialized view */}
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      Materialized View
                    </p>
                  </div>
                  <div className="space-y-2 text-xs text-emerald-700 dark:text-emerald-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Stores the query result on disk
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Reads from cached result (fast)
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Data can become stale
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Must REFRESH to update
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {mode === "performance" && (
            <motion.div
              key="performance"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Materialized views trade <strong>freshness</strong> for <strong>speed</strong>.
                  The query runs once at creation/refresh, then reads are instant.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground">Query Time Comparison</p>

                {/* Regular view bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-blue-700 dark:text-blue-300">Regular View</span>
                    <span className="font-mono text-muted-foreground">~850ms per query</span>
                  </div>
                  <div className="h-6 rounded-lg bg-muted/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-blue-500/40 rounded-lg flex items-center justify-end pr-2"
                    >
                      <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300">
                        Computes every time
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Materialized view bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-emerald-700 dark:text-emerald-300">Materialized View</span>
                    <span className="font-mono text-muted-foreground">~2ms per query</span>
                  </div>
                  <div className="h-6 rounded-lg bg-muted/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "5%" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full bg-emerald-500/40 rounded-lg min-w-[80px] flex items-center justify-end pr-2"
                    >
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                        Cached
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Refresh cost bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-orange-700 dark:text-orange-300">REFRESH cost (one-time)</span>
                    <span className="font-mono text-muted-foreground">~850ms</span>
                  </div>
                  <div className="h-6 rounded-lg bg-muted/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                      className="h-full bg-orange-500/30 rounded-lg flex items-center justify-end pr-2"
                    >
                      <span className="text-[10px] font-bold text-orange-700 dark:text-orange-300">
                        Rebuilds cache
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  <strong>Best for:</strong> Dashboard queries, aggregation reports, and any
                  expensive query accessed frequently but where slight staleness is acceptable.
                </p>
              </div>
            </motion.div>
          )}

          {mode === "staleness" && (
            <motion.div
              key="staleness"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Refresh SQL</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
                  {refreshSQL}
                </pre>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Live data */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">
                    Live Data (base tables)
                  </p>
                  <div className="rounded-xl border bg-muted/20 overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b bg-muted/40">
                          <th className="px-3 py-2 text-left font-semibold">region</th>
                          <th className="px-3 py-2 text-right font-semibold">total</th>
                          <th className="px-3 py-2 text-right font-semibold">orders</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(isStale || refreshed ? updatedData : initialData).map((row) => (
                          <tr key={row.region} className="border-b last:border-b-0">
                            <td className="px-3 py-1.5 font-mono">{row.region}</td>
                            <td className="px-3 py-1.5 text-right font-mono">
                              ${row.total.toLocaleString()}
                            </td>
                            <td className="px-3 py-1.5 text-right font-mono">{row.orders}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleNewData}
                    disabled={isStale || refreshed}
                  >
                    <Database className="h-3.5 w-3.5 mr-1" />
                    Simulate new orders
                  </Button>
                </div>

                {/* Materialized view */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-muted-foreground">
                      Materialized View
                    </p>
                    {isStale && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-500/20 text-red-600 dark:text-red-400">
                        STALE
                      </span>
                    )}
                    {refreshed && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                        FRESH
                      </span>
                    )}
                  </div>
                  <div
                    className={`rounded-xl border overflow-hidden ${
                      isStale
                        ? "border-red-500/30 bg-red-500/5"
                        : refreshed
                        ? "border-emerald-500/30 bg-emerald-500/5"
                        : "bg-muted/20"
                    }`}
                  >
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b bg-muted/40">
                          <th className="px-3 py-2 text-left font-semibold">region</th>
                          <th className="px-3 py-2 text-right font-semibold">total</th>
                          <th className="px-3 py-2 text-right font-semibold">orders</th>
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence mode="wait">
                          {matViewData.map((row) => (
                            <motion.tr
                              key={row.region + row.total}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className={`border-b last:border-b-0 ${
                                isStale ? "text-muted-foreground" : ""
                              }`}
                            >
                              <td className="px-3 py-1.5 font-mono">{row.region}</td>
                              <td className="px-3 py-1.5 text-right font-mono">
                                ${row.total.toLocaleString()}
                              </td>
                              <td className="px-3 py-1.5 text-right font-mono">{row.orders}</td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                    {isStale && (
                      <div className="px-3 py-2 border-t bg-red-500/10">
                        <p className="text-[10px] text-red-600 dark:text-red-400 font-medium">
                          Cached data is outdated -- needs REFRESH
                        </p>
                      </div>
                    )}
                  </div>
                  {isStale && (
                    <Button size="sm" onClick={handleRefresh}>
                      <RefreshCw className="h-3.5 w-3.5 mr-1" />
                      REFRESH MATERIALIZED VIEW
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
