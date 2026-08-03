"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Eye, Timer, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ModeKey = "explain" | "analyze";

interface PlanNode {
  id: string;
  type: string;
  icon: string;
  color: string;
  details: {
    cost: string;
    rows: number;
    width: number;
  };
  analyzeDetails?: {
    actualTime: string;
    actualRows: number;
    loops: number;
  };
  children?: string[];
  indent: number;
}

const planNodes: Record<string, PlanNode> = {
  sort: {
    id: "sort",
    type: "Sort",
    icon: "↕",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    details: { cost: "120.45..125.67", rows: 150, width: 52 },
    analyzeDetails: { actualTime: "2.150..2.380", actualRows: 150, loops: 1 },
    children: ["hash_join"],
    indent: 0,
  },
  hash_join: {
    id: "hash_join",
    type: "Hash Join",
    icon: "⋈",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    details: { cost: "45.20..118.90", rows: 150, width: 52 },
    analyzeDetails: { actualTime: "0.890..2.100", actualRows: 150, loops: 1 },
    children: ["idx_scan", "hash"],
    indent: 1,
  },
  idx_scan: {
    id: "idx_scan",
    type: "Index Scan using idx_orders_user",
    icon: "🔍",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    details: { cost: "0.29..42.50", rows: 150, width: 28 },
    analyzeDetails: { actualTime: "0.025..0.450", actualRows: 150, loops: 1 },
    indent: 2,
  },
  hash: {
    id: "hash",
    type: "Hash",
    icon: "#",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    details: { cost: "1.05..1.05", rows: 5, width: 24 },
    analyzeDetails: { actualTime: "0.015..0.015", actualRows: 5, loops: 1 },
    children: ["seq_scan"],
    indent: 2,
  },
  seq_scan: {
    id: "seq_scan",
    type: "Seq Scan on categories",
    icon: "📋",
    color: "bg-pink-500/15 border-pink-500/40 text-pink-700 dark:text-pink-300",
    details: { cost: "1.00..1.05", rows: 5, width: 24 },
    analyzeDetails: { actualTime: "0.005..0.008", actualRows: 5, loops: 1 },
    indent: 3,
  },
};

const nodeOrder = ["sort", "hash_join", "idx_scan", "hash", "seq_scan"];

const nodeTypeDescriptions: Record<string, string> = {
  "Seq Scan": "Reads every row in the table sequentially. Fast for small tables or when most rows are needed.",
  "Index Scan": "Uses an index to find specific rows. Efficient for selective queries on indexed columns.",
  "Hash Join": "Builds a hash table from one input, probes it with the other. Good for equi-joins.",
  "Sort": "Sorts rows by the specified key. Required for ORDER BY, MERGE JOIN, or DISTINCT.",
  "Hash": "Builds an in-memory hash table from the child node output for use in Hash Join.",
};

type QueryKey = "join_query" | "simple_query";

interface QueryOption {
  label: string;
  sql: string;
}

const queries: Record<QueryKey, QueryOption> = {
  join_query: {
    label: "JOIN Query",
    sql: `SELECT o.id, o.total, c.name AS category\nFROM orders o\nJOIN categories c ON o.category_id = c.id\nWHERE o.user_id = 42\nORDER BY o.total DESC;`,
  },
  simple_query: {
    label: "Simple Query",
    sql: `EXPLAIN ANALYZE\nSELECT * FROM orders\nWHERE user_id = 42;`,
  },
};

export function ExplainAnalyzeVisualization() {
  const [mode, setMode] = useState<ModeKey>("explain");
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showPlan, setShowPlan] = useState(false);

  const handleModeChange = (m: ModeKey) => {
    setMode(m);
    setShowPlan(false);
    setSelectedNode(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">EXPLAIN / EXPLAIN ANALYZE</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Mode selector */}
        <div className="flex flex-wrap gap-2">
          {([
            { key: "explain" as ModeKey, label: "EXPLAIN", icon: Eye, desc: "Estimated plan", color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300" },
            { key: "analyze" as ModeKey, label: "EXPLAIN ANALYZE", icon: Timer, desc: "Actual execution", color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300" },
          ]).map((item) => {
            const isActive = mode === item.key;
            return (
              <motion.button
                key={item.key}
                onClick={() => handleModeChange(item.key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive ? item.color + " shadow-sm" : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="h-3 w-3" />
                {item.label}
              </motion.button>
            );
          })}
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`rounded-xl border p-3 ${
              mode === "explain"
                ? "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300"
                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
            }`}
          >
            <p className="text-sm">
              {mode === "explain"
                ? "EXPLAIN shows the query plan the planner chooses, with estimated costs and row counts. The query is NOT executed."
                : "EXPLAIN ANALYZE actually runs the query and shows real timing and row counts alongside the estimates. Use this to find performance bottlenecks."}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* SQL */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Query</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {`${mode === "analyze" ? "EXPLAIN ANALYZE\n" : "EXPLAIN\n"}${queries.join_query.sql}`}
          </pre>
          <Button size="sm" onClick={() => setShowPlan(true)} disabled={showPlan}>
            <Play className="h-3.5 w-3.5 mr-1" /> Show Plan
          </Button>
        </div>

        {/* Query plan tree */}
        <AnimatePresence>
          {showPlan && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Plan nodes */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Query Plan
                </p>
                <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 p-3 space-y-1">
                  {nodeOrder.map((nodeId, i) => {
                    const node = planNodes[nodeId];
                    const isSelected = selectedNode === nodeId;
                    const indent = node.indent * 20;
                    return (
                      <motion.div
                        key={nodeId}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <motion.button
                          onClick={() => setSelectedNode(isSelected ? null : nodeId)}
                          whileHover={{ scale: 1.01 }}
                          className={`w-full text-left px-3 py-1.5 rounded-lg transition-all ${
                            isSelected
                              ? "bg-white/10 ring-1 ring-white/20"
                              : "hover:bg-white/5"
                          }`}
                          style={{ paddingLeft: `${indent + 12}px` }}
                        >
                          <div className="flex items-start gap-2 flex-wrap">
                            {node.indent > 0 && (
                              <span className="text-muted-foreground text-[10px]">→</span>
                            )}
                            <span className="text-[10px]">{node.icon}</span>
                            <span className="text-[10px] font-mono font-bold text-white/90">
                              {node.type}
                            </span>
                            <span className="text-[9px] font-mono text-muted-foreground ml-auto">
                              cost={node.details.cost}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-0.5" style={{ paddingLeft: `${(node.indent > 0 ? 24 : 16)}px` }}>
                            <span className="text-[9px] font-mono text-blue-400">
                              rows={node.details.rows}
                            </span>
                            <span className="text-[9px] font-mono text-violet-400">
                              width={node.details.width}
                            </span>
                            {mode === "analyze" && node.analyzeDetails && (
                              <>
                                <span className="text-[9px] font-mono text-emerald-400">
                                  time={node.analyzeDetails.actualTime}
                                </span>
                                <span className="text-[9px] font-mono text-amber-400">
                                  actual={node.analyzeDetails.actualRows}
                                </span>
                              </>
                            )}
                          </div>
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </div>

                {mode === "analyze" && (
                  <div className="rounded-lg border bg-zinc-900 dark:bg-zinc-950 px-4 py-2 font-mono text-[10px]">
                    <p className="text-emerald-400">Planning Time: 0.125 ms</p>
                    <p className="text-amber-400">Execution Time: 2.452 ms</p>
                  </div>
                )}
              </div>

              {/* Selected node details */}
              <AnimatePresence mode="wait">
                {selectedNode && (
                  <motion.div
                    key={selectedNode}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className={`rounded-xl border p-3 space-y-2 ${planNodes[selectedNode].color}`}
                  >
                    <p className="text-xs font-bold">
                      {planNodes[selectedNode].icon} {planNodes[selectedNode].type}
                    </p>
                    {(() => {
                      const typeKey = Object.keys(nodeTypeDescriptions).find((k) =>
                        planNodes[selectedNode].type.includes(k)
                      );
                      return typeKey ? (
                        <p className="text-[10px]">{nodeTypeDescriptions[typeKey]}</p>
                      ) : null;
                    })()}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="rounded-lg bg-background/50 px-2 py-1.5">
                        <p className="text-[9px] font-semibold text-muted-foreground">Estimated Cost</p>
                        <p className="text-xs font-mono font-bold">{planNodes[selectedNode].details.cost}</p>
                      </div>
                      <div className="rounded-lg bg-background/50 px-2 py-1.5">
                        <p className="text-[9px] font-semibold text-muted-foreground">Estimated Rows</p>
                        <p className="text-xs font-mono font-bold">{planNodes[selectedNode].details.rows}</p>
                      </div>
                      {mode === "analyze" && planNodes[selectedNode].analyzeDetails && (
                        <>
                          <div className="rounded-lg bg-background/50 px-2 py-1.5">
                            <p className="text-[9px] font-semibold text-muted-foreground">Actual Time (ms)</p>
                            <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                              {planNodes[selectedNode].analyzeDetails!.actualTime}
                            </p>
                          </div>
                          <div className="rounded-lg bg-background/50 px-2 py-1.5">
                            <p className="text-[9px] font-semibold text-muted-foreground">Actual Rows</p>
                            <p className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                              {planNodes[selectedNode].analyzeDetails!.actualRows}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Legend */}
              <div className="rounded-xl border bg-muted/20 p-3 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Node Types</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {Object.entries(nodeTypeDescriptions).map(([type, desc]) => (
                    <div key={type} className="flex items-start gap-1.5 text-[10px]">
                      <ArrowDown className="h-3 w-3 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <span className="font-mono font-bold">{type}</span>
                        <span className="text-muted-foreground"> -- {desc.split(".")[0]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key difference callout */}
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 mb-1">
                  EXPLAIN vs EXPLAIN ANALYZE
                </p>
                <p className="text-[10px] text-amber-700/80 dark:text-amber-300/80">
                  <strong>EXPLAIN</strong> shows the planner&apos;s estimates without running the query.
                  <strong> EXPLAIN ANALYZE</strong> actually executes the query and shows real metrics.
                  Use ANALYZE to verify that estimates match reality -- large discrepancies indicate
                  stale statistics (run <span className="font-mono">ANALYZE table_name</span>).
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
