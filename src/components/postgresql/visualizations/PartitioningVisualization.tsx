"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Search, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PartTab = "types" | "visual" | "pruning";

const tabInfo: Record<PartTab, { label: string; color: string }> = {
  types: {
    label: "Partition Types",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  },
  visual: {
    label: "Visual Split",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  },
  pruning: {
    label: "Partition Pruning",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  },
};

const tabOrder: PartTab[] = ["types", "visual", "pruning"];

const rangeSQL = `-- Range partitioning by date
CREATE TABLE orders (
  id SERIAL,
  order_date DATE,
  amount DECIMAL
) PARTITION BY RANGE (order_date);

CREATE TABLE orders_2024_q1
  PARTITION OF orders
  FOR VALUES FROM ('2024-01-01')
  TO ('2024-04-01');

CREATE TABLE orders_2024_q2
  PARTITION OF orders
  FOR VALUES FROM ('2024-04-01')
  TO ('2024-07-01');`;

const listSQL = `-- List partitioning by region
CREATE TABLE sales (
  id SERIAL,
  region TEXT,
  amount DECIMAL
) PARTITION BY LIST (region);

CREATE TABLE sales_north
  PARTITION OF sales
  FOR VALUES IN ('NY', 'MA', 'CT');

CREATE TABLE sales_south
  PARTITION OF sales
  FOR VALUES IN ('TX', 'FL', 'GA');`;

const hashSQL = `-- Hash partitioning for even distribution
CREATE TABLE sessions (
  id SERIAL,
  user_id INT,
  data JSONB
) PARTITION BY HASH (user_id);

CREATE TABLE sessions_p0
  PARTITION OF sessions
  FOR VALUES WITH (MODULUS 4, REMAINDER 0);

CREATE TABLE sessions_p1
  PARTITION OF sessions
  FOR VALUES WITH (MODULUS 4, REMAINDER 1);`;

interface OrderRow {
  id: number;
  date: string;
  amount: number;
  quarter: string;
}

const allOrders: OrderRow[] = [
  { id: 1, date: "2024-01-15", amount: 250, quarter: "Q1" },
  { id: 2, date: "2024-02-20", amount: 180, quarter: "Q1" },
  { id: 3, date: "2024-03-05", amount: 320, quarter: "Q1" },
  { id: 4, date: "2024-04-10", amount: 410, quarter: "Q2" },
  { id: 5, date: "2024-05-22", amount: 290, quarter: "Q2" },
  { id: 6, date: "2024-06-30", amount: 175, quarter: "Q2" },
  { id: 7, date: "2024-07-14", amount: 520, quarter: "Q3" },
  { id: 8, date: "2024-08-08", amount: 340, quarter: "Q3" },
  { id: 9, date: "2024-10-01", amount: 450, quarter: "Q4" },
  { id: 10, date: "2024-11-15", amount: 380, quarter: "Q4" },
];

const quarterColors: Record<string, { bg: string; border: string; badge: string }> = {
  Q1: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", badge: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300" },
  Q2: { bg: "bg-blue-500/10", border: "border-blue-500/30", badge: "bg-blue-500/20 text-blue-700 dark:text-blue-300" },
  Q3: { bg: "bg-violet-500/10", border: "border-violet-500/30", badge: "bg-violet-500/20 text-violet-700 dark:text-violet-300" },
  Q4: { bg: "bg-orange-500/10", border: "border-orange-500/30", badge: "bg-orange-500/20 text-orange-700 dark:text-orange-300" },
};

type SelectedQuarter = "all" | "Q1" | "Q2" | "Q3" | "Q4";

export function PartitioningVisualization() {
  const [activeTab, setActiveTab] = useState<PartTab>("types");
  const [selectedType, setSelectedType] = useState<"range" | "list" | "hash">("range");
  const [queryQuarter, setQueryQuarter] = useState<SelectedQuarter>("all");

  const typeSQLMap = { range: rangeSQL, list: listSQL, hash: hashSQL };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Table Partitioning</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Tab selector */}
        <div className="flex flex-wrap gap-2">
          {tabOrder.map((key) => {
            const t = tabInfo[key];
            const isActive = activeTab === key;
            return (
              <motion.button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setQueryQuarter("all");
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? t.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <LayoutGrid className="h-3 w-3" />
                {t.label}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "types" && (
            <motion.div
              key="types"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3">
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  Partitioning splits a large table into smaller, more manageable pieces.
                  PostgreSQL supports three strategies: <strong>Range</strong>, <strong>List</strong>,
                  and <strong>Hash</strong>.
                </p>
              </div>

              {/* Type selector */}
              <div className="flex gap-2">
                {(["range", "list", "hash"] as const).map((type) => (
                  <motion.button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium capitalize transition-all ${
                      selectedType === type
                        ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 shadow-sm"
                        : "bg-background border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {type}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedType}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">SQL</p>
                      <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto max-h-[280px] overflow-y-auto">
                        {typeSQLMap[selectedType]}
                      </pre>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">How it works</p>
                      {selectedType === "range" && (
                        <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3 space-y-2">
                          <p className="text-xs text-emerald-700 dark:text-emerald-300">
                            Rows are placed into partitions based on a <strong>continuous range</strong> of
                            values (dates, numbers, timestamps).
                          </p>
                          <div className="flex items-center gap-1 text-[10px]">
                            {["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"].map((range, i) => (
                              <div key={range} className="flex items-center gap-1">
                                <span className={`px-2 py-1 rounded-lg border ${Object.values(quarterColors)[i].bg} ${Object.values(quarterColors)[i].border}`}>
                                  {range}
                                </span>
                                {i < 3 && <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedType === "list" && (
                        <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3 space-y-2">
                          <p className="text-xs text-blue-700 dark:text-blue-300">
                            Rows are placed into partitions based on <strong>discrete values</strong> in
                            a list (regions, categories, status codes).
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div className="px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-center">
                              North: NY, MA, CT
                            </div>
                            <div className="px-2 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-center">
                              South: TX, FL, GA
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedType === "hash" && (
                        <div className="rounded-xl border bg-violet-500/10 border-violet-500/30 p-3 space-y-2">
                          <p className="text-xs text-violet-700 dark:text-violet-300">
                            Rows are distributed across partitions using a <strong>hash function</strong>.
                            Ensures even distribution when there is no natural range or list.
                          </p>
                          <div className="grid grid-cols-4 gap-1 text-[10px]">
                            {[0, 1, 2, 3].map((i) => (
                              <div key={i} className="px-2 py-1 rounded-lg bg-violet-500/10 border border-violet-500/30 text-center font-mono">
                                mod 4 = {i}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === "visual" && (
            <motion.div
              key="visual"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  A large <strong>orders</strong> table split into quarterly partitions.
                  Each partition stores only rows for its date range.
                </p>
              </div>

              {/* Full table */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">
                  Full Table: orders ({allOrders.length} rows)
                </p>
                <div className="rounded-xl border bg-muted/20 overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b bg-muted/40">
                        <th className="px-2 py-2 text-left font-semibold">id</th>
                        <th className="px-2 py-2 text-left font-semibold">order_date</th>
                        <th className="px-2 py-2 text-right font-semibold">amount</th>
                        <th className="px-2 py-2 text-center font-semibold">partition</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allOrders.map((order, i) => {
                        const qc = quarterColors[order.quarter];
                        return (
                          <motion.tr
                            key={order.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className={`border-b last:border-b-0 ${qc.bg}`}
                          >
                            <td className="px-2 py-1 font-mono">{order.id}</td>
                            <td className="px-2 py-1 font-mono">{order.date}</td>
                            <td className="px-2 py-1 text-right font-mono">${order.amount}</td>
                            <td className="px-2 py-1 text-center">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${qc.badge}`}>
                                {order.quarter}
                              </span>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Partitions */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Split Into Partitions</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(["Q1", "Q2", "Q3", "Q4"] as const).map((q) => {
                    const qc = quarterColors[q];
                    const rows = allOrders.filter((o) => o.quarter === q);
                    return (
                      <motion.div
                        key={q}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`rounded-xl border p-2 ${qc.bg} ${qc.border}`}
                      >
                        <div className="flex items-center gap-1 mb-1.5">
                          <Calendar className="h-3 w-3" />
                          <p className="text-[10px] font-bold">orders_2024_{q.toLowerCase()}</p>
                        </div>
                        <p className="text-[9px] text-muted-foreground mb-1">
                          {rows.length} rows
                        </p>
                        {rows.map((r) => (
                          <div key={r.id} className="text-[9px] font-mono flex justify-between">
                            <span>{r.date}</span>
                            <span>${r.amount}</span>
                          </div>
                        ))}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "pruning" && (
            <motion.div
              key="pruning"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-violet-500/10 border-violet-500/30 p-3">
                <p className="text-sm text-violet-700 dark:text-violet-300">
                  <strong>Partition pruning</strong> lets PostgreSQL skip irrelevant partitions
                  during query execution. Only partitions matching the WHERE clause are scanned.
                </p>
              </div>

              {/* Quarter selector */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">
                  Select a quarter to query
                </p>
                <div className="flex gap-2">
                  {(["all", "Q1", "Q2", "Q3", "Q4"] as const).map((q) => (
                    <Button
                      key={q}
                      size="sm"
                      variant={queryQuarter === q ? "default" : "outline"}
                      className="text-xs h-7"
                      onClick={() => setQueryQuarter(q)}
                    >
                      <Search className="h-3 w-3 mr-1" />
                      {q === "all" ? "All" : q}
                    </Button>
                  ))}
                </div>
              </div>

              {queryQuarter !== "all" && (
                <div className="space-y-2">
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
{`SELECT * FROM orders
WHERE order_date >= '2024-${queryQuarter === "Q1" ? "01" : queryQuarter === "Q2" ? "04" : queryQuarter === "Q3" ? "07" : "10"}-01'
  AND order_date < '2024-${queryQuarter === "Q1" ? "04" : queryQuarter === "Q2" ? "07" : queryQuarter === "Q3" ? "10" : "13"}-01';`}</pre>
                </div>
              )}

              {/* Partition scan visualization */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(["Q1", "Q2", "Q3", "Q4"] as const).map((q) => {
                  const qc = quarterColors[q];
                  const isScanned = queryQuarter === "all" || queryQuarter === q;
                  const rows = allOrders.filter((o) => o.quarter === q);
                  return (
                    <motion.div
                      key={q}
                      animate={{
                        opacity: isScanned ? 1 : 0.3,
                        scale: isScanned ? 1 : 0.95,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`rounded-xl border p-2 ${qc.bg} ${qc.border}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] font-bold">{q}</p>
                        {isScanned ? (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-medium">
                            SCANNED
                          </span>
                        ) : (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-muted/40 text-muted-foreground font-medium">
                            SKIPPED
                          </span>
                        )}
                      </div>
                      <p className="text-[9px] text-muted-foreground">{rows.length} rows</p>
                    </motion.div>
                  );
                })}
              </div>

              {queryQuarter !== "all" && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    <strong>Result:</strong> Only the {queryQuarter} partition was scanned
                    ({allOrders.filter((o) => o.quarter === queryQuarter).length} rows).
                    The other {allOrders.length - allOrders.filter((o) => o.quarter === queryQuarter).length} rows
                    in 3 partitions were completely skipped.
                  </p>
                </div>
              )}

              {queryQuarter === "all" && (
                <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3">
                  <p className="text-xs text-orange-700 dark:text-orange-300">
                    <strong>No filter:</strong> All 4 partitions must be scanned ({allOrders.length} rows total).
                    Add a WHERE clause on the partition key to enable pruning.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
