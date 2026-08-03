"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderRow {
  id: number;
  product: string;
  quantity: number | null;
  price: number | null;
}

const orders: OrderRow[] = [
  { id: 1, product: "Laptop", quantity: 3, price: 999.99 },
  { id: 2, product: "Mouse", quantity: 15, price: 29.99 },
  { id: 3, product: "Keyboard", quantity: null, price: 79.99 },
  { id: 4, product: "Monitor", quantity: 5, price: 349.99 },
  { id: 5, product: "Headset", quantity: 8, price: null },
  { id: 6, product: "Webcam", quantity: 12, price: 59.99 },
];

type QueryKey = "sum_quantity" | "sum_price" | "sum_where";

interface QueryInfo {
  label: string;
  sql: string;
  color: string;
  badgeColor: string;
  highlightColumn: "quantity" | "price";
  filterFn: (row: OrderRow) => boolean;
  valueFn: (row: OrderRow) => number | null;
  description: string;
}

const queries: Record<QueryKey, QueryInfo> = {
  sum_quantity: {
    label: "SUM(quantity)",
    sql: "SELECT SUM(quantity)\nFROM orders;",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    highlightColumn: "quantity",
    filterFn: () => true,
    valueFn: (row) => row.quantity,
    description: "Sums all non-NULL values in the quantity column. Row #3 has NULL and is skipped.",
  },
  sum_price: {
    label: "SUM(price)",
    sql: "SELECT SUM(price)\nFROM orders;",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    highlightColumn: "price",
    filterFn: () => true,
    valueFn: (row) => row.price,
    description: "Sums all non-NULL values in the price column. Row #5 has NULL and is skipped.",
  },
  sum_where: {
    label: "SUM + WHERE",
    sql: "SELECT SUM(price)\nFROM orders\nWHERE quantity > 5;",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    highlightColumn: "price",
    filterFn: (row) => row.quantity !== null && row.quantity > 5,
    valueFn: (row) => row.price,
    description:
      "First filters rows WHERE quantity > 5, then sums the price column. Only matching rows are included.",
  },
};

const queryOrder: QueryKey[] = ["sum_quantity", "sum_price", "sum_where"];

export function SumFunctionVisualization() {
  const [selected, setSelected] = useState<QueryKey>("sum_quantity");
  const [running, setRunning] = useState(false);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const [runningTotal, setRunningTotal] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const query = queries[selected];

  const handleSelect = (key: QueryKey) => {
    setSelected(key);
    setRunning(false);
    setAnimatingIndex(null);
    setRunningTotal(null);
    setFinished(false);
  };

  const handleRun = () => {
    setRunning(true);
    setAnimatingIndex(null);
    setRunningTotal(null);
    setFinished(false);

    const filteredRows = orders.filter(query.filterFn);
    let total = 0;
    let step = 0;

    const interval = setInterval(() => {
      if (step >= filteredRows.length) {
        clearInterval(interval);
        setAnimatingIndex(null);
        setFinished(true);
        return;
      }

      const row = filteredRows[step];
      const rowIndex = orders.indexOf(row);
      const value = query.valueFn(row);

      setAnimatingIndex(rowIndex);

      if (value !== null) {
        total = Math.round((total + value) * 100) / 100;
        setRunningTotal(total);
      }

      step++;
    }, 500);
  };

  const getRowHighlight = (index: number) => {
    if (!running) return "";
    const row = orders[index];
    const matchesFilter = query.filterFn(row);

    if (!matchesFilter) {
      return "opacity-40";
    }
    if (animatingIndex === index) {
      return "bg-yellow-500/20 dark:bg-yellow-400/15";
    }
    if (animatingIndex !== null && index < animatingIndex && matchesFilter) {
      return "bg-emerald-500/10 dark:bg-emerald-400/10";
    }
    return "";
  };

  const getCellHighlight = (index: number, column: string) => {
    if (!running) return "";
    const row = orders[index];
    const matchesFilter = query.filterFn(row);
    if (!matchesFilter) return "";

    if (column === query.highlightColumn && animatingIndex === index) {
      const value = query.valueFn(row);
      if (value === null) {
        return "ring-2 ring-orange-400/60 bg-orange-500/15 rounded";
      }
      return "ring-2 ring-emerald-400/60 bg-emerald-500/15 rounded font-bold";
    }
    return "";
  };

  const computeTotal = () => {
    const filteredRows = orders.filter(query.filterFn);
    let total = 0;
    for (const row of filteredRows) {
      const v = query.valueFn(row);
      if (v !== null) total = Math.round((total + v) * 100) / 100;
    }
    return total;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calculator className="h-5 w-5 text-emerald-500" />
          SQL SUM() Function
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Query selector */}
        <div className="flex flex-wrap gap-2">
          {queryOrder.map((key) => {
            const q = queries[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? q.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {q.label}
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
            className={`rounded-xl border p-3 ${query.color}`}
          >
            <p className="text-sm">{query.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* SQL query */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">SQL Query</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {query.sql}
          </pre>
        </div>

        {/* Table + Result */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Orders table */}
          <div className="lg:col-span-2 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">orders table</p>
            <div className="rounded-xl border overflow-hidden text-xs">
              <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                <span>id</span>
                <span>product</span>
                <span
                  className={
                    running && query.highlightColumn === "quantity"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : ""
                  }
                >
                  quantity {running && query.highlightColumn === "quantity" && " <--"}
                </span>
                <span
                  className={
                    running && query.highlightColumn === "price"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : ""
                  }
                >
                  price {running && query.highlightColumn === "price" && " <--"}
                </span>
              </div>
              {orders.map((row, i) => (
                <motion.div
                  key={row.id}
                  className={`grid grid-cols-4 px-3 py-2 border-t transition-all duration-300 ${getRowHighlight(i)}`}
                  layout
                >
                  <span className="text-muted-foreground">{row.id}</span>
                  <span>{row.product}</span>
                  <span className={`transition-all duration-300 px-1 ${getCellHighlight(i, "quantity")}`}>
                    {row.quantity !== null ? (
                      row.quantity
                    ) : (
                      <span className="text-orange-500 italic">NULL</span>
                    )}
                  </span>
                  <span className={`transition-all duration-300 px-1 ${getCellHighlight(i, "price")}`}>
                    {row.price !== null ? (
                      `$${row.price.toFixed(2)}`
                    ) : (
                      <span className="text-orange-500 italic">NULL</span>
                    )}
                  </span>
                </motion.div>
              ))}
            </div>
            <Button size="sm" onClick={handleRun} disabled={running && !finished}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>

          {/* Result panel */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Result</p>
            <AnimatePresence mode="wait">
              {running ? (
                <motion.div
                  key={`result-${selected}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-4 font-mono text-xs space-y-3 min-h-[160px]"
                >
                  {/* Running total */}
                  {runningTotal !== null && (
                    <div className="space-y-1">
                      <p className="text-zinc-500 text-[10px] uppercase tracking-wider">Running Total</p>
                      <motion.p
                        key={runningTotal}
                        initial={{ scale: 1.3, color: "#34d399" }}
                        animate={{ scale: 1, color: "#6ee7b7" }}
                        className="text-2xl font-bold text-emerald-300"
                      >
                        {query.highlightColumn === "price" ? `$${runningTotal.toFixed(2)}` : runningTotal}
                      </motion.p>
                    </div>
                  )}

                  {/* NULL skip indicator */}
                  {animatingIndex !== null && query.valueFn(orders[animatingIndex]) === null && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-orange-400 text-[11px]"
                    >
                      NULL skipped -- not added to sum
                    </motion.p>
                  )}

                  {/* Filter skip indicator */}
                  {selected === "sum_where" && animatingIndex !== null && !query.filterFn(orders[animatingIndex]) && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-zinc-500 text-[11px]"
                    >
                      Row filtered out by WHERE clause
                    </motion.p>
                  )}

                  {/* Final result */}
                  {finished && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-t border-zinc-700 pt-3 space-y-1"
                    >
                      <p className="text-zinc-500 text-[10px] uppercase tracking-wider">Final Result</p>
                      <p className="text-emerald-400">
                        <span className="text-zinc-500 select-none mr-2">#</span>
                        sum ={" "}
                        {query.highlightColumn === "price"
                          ? `$${computeTotal().toFixed(2)}`
                          : computeTotal()}
                      </p>
                      <p className="text-zinc-600 text-[10px] mt-2">(1 row)</p>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="ph"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[160px] flex items-center justify-center"
                >
                  <p className="text-xs text-muted-foreground italic">
                    Click Run to see SUM in action
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Key concept */}
            <div className="rounded-xl border bg-muted/30 px-3 py-2.5">
              <p className="text-[11px] font-semibold text-muted-foreground mb-1">Key Concept</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                SUM() ignores NULL values automatically. If all values are NULL, the result is NULL (not 0).
                Use COALESCE(SUM(col), 0) to return 0 instead.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
