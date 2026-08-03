"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderRow {
  id: number;
  customer: string;
  product: string;
  amount: number;
}

interface AggregatedGroup {
  customer: string;
  orderCount: number;
  totalAmount: number;
  avgAmount: number;
  rows: OrderRow[];
}

type HavingCondition = "count_gt_2" | "sum_gt_100" | "avg_gt_40" | "count_eq_1";

interface ConditionInfo {
  label: string;
  sql: string;
  fullSQL: string;
  description: string;
  test: (group: AggregatedGroup) => boolean;
}

const sampleOrders: OrderRow[] = [
  { id: 1, customer: "Alice", product: "Laptop", amount: 85 },
  { id: 2, customer: "Bob", product: "Mouse", amount: 15 },
  { id: 3, customer: "Alice", product: "Keyboard", amount: 45 },
  { id: 4, customer: "Charlie", product: "Monitor", amount: 120 },
  { id: 5, customer: "Bob", product: "Webcam", amount: 35 },
  { id: 6, customer: "Alice", product: "USB Hub", amount: 20 },
  { id: 7, customer: "Charlie", product: "Cable", amount: 8 },
  { id: 8, customer: "Bob", product: "Headset", amount: 55 },
];

const conditions: Record<HavingCondition, ConditionInfo> = {
  count_gt_2: {
    label: "COUNT(*) > 2",
    sql: "HAVING COUNT(*) > 2",
    fullSQL: `SELECT customer,
       COUNT(*) AS order_count,
       SUM(amount) AS total
FROM orders
GROUP BY customer
HAVING COUNT(*) > 2;`,
    description: "Keep only customers who placed more than 2 orders.",
    test: (g) => g.orderCount > 2,
  },
  sum_gt_100: {
    label: "SUM(amount) > 100",
    sql: "HAVING SUM(amount) > 100",
    fullSQL: `SELECT customer,
       COUNT(*) AS order_count,
       SUM(amount) AS total
FROM orders
GROUP BY customer
HAVING SUM(amount) > 100;`,
    description: "Keep only customers whose total spending exceeds $100.",
    test: (g) => g.totalAmount > 100,
  },
  avg_gt_40: {
    label: "AVG(amount) > 40",
    sql: "HAVING AVG(amount) > 40",
    fullSQL: `SELECT customer,
       COUNT(*) AS order_count,
       AVG(amount) AS avg_amount
FROM orders
GROUP BY customer
HAVING AVG(amount) > 40;`,
    description: "Keep only customers whose average order value is above $40.",
    test: (g) => g.avgAmount > 40,
  },
  count_eq_1: {
    label: "COUNT(*) = 1",
    sql: "HAVING COUNT(*) = 1",
    fullSQL: `SELECT customer,
       COUNT(*) AS order_count,
       SUM(amount) AS total
FROM orders
GROUP BY customer
HAVING COUNT(*) = 1;`,
    description: "Keep only customers who placed exactly 1 order (none in this dataset).",
    test: (g) => g.orderCount === 1,
  },
};

const conditionOrder: HavingCondition[] = ["count_gt_2", "sum_gt_100", "avg_gt_40", "count_eq_1"];

function buildGroups(rows: OrderRow[]): AggregatedGroup[] {
  const map = new Map<string, OrderRow[]>();
  for (const row of rows) {
    if (!map.has(row.customer)) map.set(row.customer, []);
    map.get(row.customer)!.push(row);
  }
  return Array.from(map.entries()).map(([customer, groupRows]) => ({
    customer,
    orderCount: groupRows.length,
    totalAmount: groupRows.reduce((s, r) => s + r.amount, 0),
    avgAmount: Math.round((groupRows.reduce((s, r) => s + r.amount, 0) / groupRows.length) * 100) / 100,
    rows: groupRows,
  }));
}

const groups = buildGroups(sampleOrders);

export function HavingClauseVisualization() {
  const [selected, setSelected] = useState<HavingCondition>("count_gt_2");
  const [step, setStep] = useState<"idle" | "grouped" | "filtered">("idle");

  const condition = conditions[selected];

  const handleSelect = (key: HavingCondition) => {
    setSelected(key);
    setStep("idle");
  };

  const handleRun = () => {
    setStep("grouped");
    setTimeout(() => setStep("filtered"), 800);
  };

  const passesFilter = (g: AggregatedGroup) => condition.test(g);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">HAVING Clause -- Filter Groups After Aggregation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* WHERE vs HAVING callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-xl border p-3 bg-blue-500/10 border-blue-500/30">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">WHERE -- Filters Rows</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Applied <strong>before</strong> GROUP BY. Operates on individual rows. Cannot use aggregate functions.
            </p>
            <pre className="text-[10px] font-mono mt-2 text-blue-600 dark:text-blue-400 opacity-80">
              {`SELECT ... FROM orders\n WHERE amount > 20   -- row filter\n GROUP BY customer;`}
            </pre>
          </div>
          <div className="rounded-xl border p-3 bg-violet-500/10 border-violet-500/30">
            <p className="text-xs font-semibold text-violet-700 dark:text-violet-300 mb-1">HAVING -- Filters Groups</p>
            <p className="text-xs text-violet-600 dark:text-violet-400">
              Applied <strong>after</strong> GROUP BY. Operates on aggregated groups. Uses aggregate functions.
            </p>
            <pre className="text-[10px] font-mono mt-2 text-violet-600 dark:text-violet-400 opacity-80">
              {`SELECT ... FROM orders\n GROUP BY customer\n HAVING COUNT(*) > 2; -- group filter`}
            </pre>
          </div>
        </div>

        {/* Pipeline diagram */}
        <div className="flex items-center justify-center gap-1 flex-wrap text-[10px] font-semibold">
          <span className="px-2 py-1 rounded bg-muted border text-muted-foreground">Rows</span>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
          <span className="px-2 py-1 rounded bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-300">WHERE</span>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
          <span className="px-2 py-1 rounded bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300">GROUP BY</span>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
          <span className="px-2 py-1 rounded bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300">Aggregation</span>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
          <span className="px-2 py-1 rounded bg-violet-500/15 border-violet-500/30 text-violet-700 dark:text-violet-300">HAVING</span>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
          <span className="px-2 py-1 rounded bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300">Result</span>
        </div>

        {/* Condition selector */}
        <div className="flex flex-wrap gap-2">
          {conditionOrder.map((key) => {
            const c = conditions[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300 shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <Filter className="h-3 w-3" />
                {c.label}
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
            className="rounded-xl border p-3 bg-violet-500/10 border-violet-500/30 text-violet-700 dark:text-violet-300"
          >
            <p className="text-sm">{condition.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Original table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Original Table: orders</p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>id</span>
              <span>customer</span>
              <span>product</span>
              <span>amount</span>
            </div>
            {sampleOrders.map((row) => (
              <div key={row.id} className="grid grid-cols-4 px-3 py-1.5 border-t hover:bg-muted/30">
                <code className="font-mono text-muted-foreground">{row.id}</code>
                <code className="font-mono font-medium text-primary">{row.customer}</code>
                <code className="font-mono text-muted-foreground">{row.product}</code>
                <code className="font-mono text-muted-foreground">${row.amount}</code>
              </div>
            ))}
          </div>
        </div>

        {/* SQL + Run */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">SQL Query</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
              {condition.fullSQL}
            </pre>
            <Button size="sm" onClick={handleRun}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>

          {/* Aggregated groups with HAVING result */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              {step === "idle" ? "Grouped Results" : step === "grouped" ? "Grouping..." : `After ${condition.sql}`}
            </p>
            <AnimatePresence mode="wait">
              {step === "idle" ? (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[120px] flex items-center justify-center"
                >
                  <p className="text-xs text-muted-foreground italic">Click Run to see HAVING in action</p>
                </motion.div>
              ) : (
                <motion.div
                  key={`${selected}-${step}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2 min-h-[120px]"
                >
                  {groups.map((group) => {
                    const passes = passesFilter(group);
                    const showFilter = step === "filtered";
                    const filtered = showFilter && !passes;

                    return (
                      <motion.div
                        key={group.customer}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: filtered ? 0.4 : 1,
                          x: 0,
                          scale: filtered ? 0.97 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`rounded-xl border px-3 py-2 text-xs transition-all ${
                          filtered
                            ? "bg-red-500/5 border-red-500/30 line-through"
                            : showFilter && passes
                            ? "bg-emerald-500/10 border-emerald-500/40"
                            : "bg-muted/30 border-border"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold ${filtered ? "text-red-500 dark:text-red-400" : "text-primary"}`}>
                            {group.customer}
                          </span>
                          <div className="flex gap-3 text-muted-foreground">
                            <span>COUNT: <strong className={filtered ? "text-red-400" : "text-foreground"}>{group.orderCount}</strong></span>
                            <span>SUM: <strong className={filtered ? "text-red-400" : "text-foreground"}>${group.totalAmount}</strong></span>
                            <span>AVG: <strong className={filtered ? "text-red-400" : "text-foreground"}>${group.avgAmount}</strong></span>
                          </div>
                        </div>
                        <div className="mt-1 text-[10px] text-muted-foreground">
                          {group.rows.map((r) => r.product).join(", ")}
                        </div>
                        {showFilter && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-1"
                          >
                            {passes ? (
                              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                Passes {condition.sql}
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-red-500 dark:text-red-400">
                                Filtered out by {condition.sql}
                              </span>
                            )}
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Final result table */}
        <AnimatePresence>
          {step === "filtered" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Final Result</p>
              <div className="rounded-xl border border-emerald-500/30 overflow-hidden text-xs">
                <div className="grid grid-cols-3 bg-emerald-500/10 px-3 py-2 font-semibold text-emerald-700 dark:text-emerald-300">
                  <span>customer</span>
                  <span>order_count</span>
                  <span>{selected === "avg_gt_40" ? "avg_amount" : "total"}</span>
                </div>
                {groups.filter(passesFilter).length === 0 ? (
                  <div className="px-3 py-3 text-center text-muted-foreground italic">
                    No groups match this condition -- (0 rows)
                  </div>
                ) : (
                  groups.filter(passesFilter).map((group) => (
                    <motion.div
                      key={group.customer}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-3 px-3 py-2 border-t border-emerald-500/20 hover:bg-emerald-500/5"
                    >
                      <code className="font-mono font-medium text-primary">{group.customer}</code>
                      <code className="font-mono text-muted-foreground">{group.orderCount}</code>
                      <code className="font-mono text-muted-foreground">
                        ${selected === "avg_gt_40" ? group.avgAmount : group.totalAmount}
                      </code>
                    </motion.div>
                  ))
                )}
              </div>
              <p className="text-[10px] text-muted-foreground">
                ({groups.filter(passesFilter).length} {groups.filter(passesFilter).length === 1 ? "row" : "rows"})
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
