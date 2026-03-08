"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TabKey = "numeric" | "dates" | "not_between" | "equivalent";

interface RangePoint {
  value: string;
  inRange: boolean;
}

interface BetweenTab {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  example: string;
  output: string[];
  rangeLabel: string;
  rangePoints: RangePoint[];
  rangeLow: string;
  rangeHigh: string;
}

const tabs: Record<TabKey, BetweenTab> = {
  numeric: {
    label: "Numeric",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "BETWEEN selects values within a given range, inclusive of both endpoints. Works with integers, decimals, and numeric types.",
    example: `SELECT * FROM products
WHERE price BETWEEN 10 AND 50;

-- Returns rows where
-- price >= 10 AND price <= 50`,
    output: [
      " id | name       | price",
      "----+------------+------",
      "  2 | Mouse      | 25.00",
      "  3 | Keyboard   | 45.00",
      "  5 | USB Cable  | 10.00",
      "  7 | Webcam     | 50.00",
      "(4 rows)",
    ],
    rangeLabel: "price",
    rangeLow: "10",
    rangeHigh: "50",
    rangePoints: [
      { value: "5", inRange: false },
      { value: "10", inRange: true },
      { value: "25", inRange: true },
      { value: "45", inRange: true },
      { value: "50", inRange: true },
      { value: "75", inRange: false },
      { value: "99", inRange: false },
    ],
  },
  dates: {
    label: "Dates",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "BETWEEN works with DATE, TIMESTAMP, and other temporal types. Both start and end dates are included in the result.",
    example: `SELECT * FROM orders
WHERE order_date BETWEEN
  '2024-01-01' AND '2024-03-31';

-- All orders in Q1 2024`,
    output: [
      " id | customer  | order_date",
      "----+-----------+-----------",
      " 12 | Alice     | 2024-01-05",
      " 15 | Bob       | 2024-02-14",
      " 18 | Charlie   | 2024-03-01",
      " 21 | Alice     | 2024-03-31",
      "(4 rows)",
    ],
    rangeLabel: "order_date",
    rangeLow: "Jan 1",
    rangeHigh: "Mar 31",
    rangePoints: [
      { value: "Dec 15", inRange: false },
      { value: "Jan 5", inRange: true },
      { value: "Feb 14", inRange: true },
      { value: "Mar 1", inRange: true },
      { value: "Mar 31", inRange: true },
      { value: "Apr 10", inRange: false },
      { value: "Jun 1", inRange: false },
    ],
  },
  not_between: {
    label: "NOT BETWEEN",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "NOT BETWEEN excludes values within the given range. It returns rows where the value is strictly less than the low end OR strictly greater than the high end.",
    example: `SELECT * FROM products
WHERE price NOT BETWEEN 20 AND 60;

-- Returns rows where
-- price < 20 OR price > 60`,
    output: [
      " id | name        | price",
      "----+-------------+-------",
      "  1 | USB Cable   |  10.00",
      "  5 | Sticker     |   3.50",
      "  8 | Monitor     |  75.00",
      "  9 | Laptop      | 999.00",
      "(4 rows)",
    ],
    rangeLabel: "price",
    rangeLow: "20",
    rangeHigh: "60",
    rangePoints: [
      { value: "3.5", inRange: true },
      { value: "10", inRange: true },
      { value: "20", inRange: false },
      { value: "35", inRange: false },
      { value: "60", inRange: false },
      { value: "75", inRange: true },
      { value: "999", inRange: true },
    ],
  },
  equivalent: {
    label: "Equivalent",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "BETWEEN is syntactic sugar for >= AND <=. Both expressions produce identical results and query plans.",
    example: `-- These two queries are identical:

-- Using BETWEEN
SELECT * FROM employees
WHERE salary BETWEEN 50000 AND 80000;

-- Using >= AND <=
SELECT * FROM employees
WHERE salary >= 50000
  AND salary <= 80000;`,
    output: [
      " id | name    | salary",
      "----+---------+-------",
      "  2 | Bob     | 55000",
      "  4 | Diana   | 72000",
      "  6 | Frank   | 80000",
      "  7 | Grace   | 50000",
      "(4 rows) -- Same result for both!",
    ],
    rangeLabel: "salary",
    rangeLow: "50k",
    rangeHigh: "80k",
    rangePoints: [
      { value: "35k", inRange: false },
      { value: "50k", inRange: true },
      { value: "55k", inRange: true },
      { value: "72k", inRange: true },
      { value: "80k", inRange: true },
      { value: "95k", inRange: false },
      { value: "120k", inRange: false },
    ],
  },
};

const tabOrder: TabKey[] = ["numeric", "dates", "not_between", "equivalent"];

export function BetweenVisualization() {
  const [selected, setSelected] = useState<TabKey>("numeric");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];
  const isNotBetween = selected === "not_between";

  const handleSelect = (key: TabKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">BETWEEN Operator</CardTitle>
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
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? t.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
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

        {/* Range visualization */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`range-${selected}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-3"
          >
            <p className="text-xs font-semibold text-muted-foreground">
              {isNotBetween ? "NOT BETWEEN" : "BETWEEN"} Range &mdash;{" "}
              <code className="font-mono text-primary">
                {tab.rangeLabel} {isNotBetween ? "NOT " : ""}BETWEEN {tab.rangeLow} AND{" "}
                {tab.rangeHigh}
              </code>
            </p>
            <div className="rounded-xl border bg-muted/20 px-4 py-5">
              {/* Number line */}
              <div className="relative">
                {/* Track */}
                <div className="h-2 rounded-full bg-muted/60 relative">
                  {/* Highlighted range */}
                  {(() => {
                    const total = tab.rangePoints.length;
                    const lowIdx = tab.rangePoints.findIndex(
                      (p) => p.value === tab.rangeLow || p.value === tab.rangePoints.find((pp) => pp.inRange)?.value
                    );
                    const highIdx =
                      total -
                      1 -
                      [...tab.rangePoints]
                        .reverse()
                        .findIndex(
                          (p) =>
                            p.value === tab.rangeHigh ||
                            p.value === [...tab.rangePoints].reverse().find((pp) => pp.inRange)?.value
                        );
                    const left = (lowIdx / (total - 1)) * 100;
                    const width = ((highIdx - lowIdx) / (total - 1)) * 100;
                    return (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        style={{
                          left: `${left}%`,
                          width: `${width}%`,
                          originX: 0,
                        }}
                        className={`absolute inset-y-0 rounded-full ${
                          isNotBetween
                            ? "bg-violet-400/30 dark:bg-violet-500/25 border border-dashed border-violet-400/50"
                            : "bg-blue-400/40 dark:bg-blue-500/30"
                        }`}
                      />
                    );
                  })()}
                </div>

                {/* Points */}
                <div className="flex justify-between mt-3">
                  {tab.rangePoints.map((point, i) => {
                    const included = point.inRange;
                    return (
                      <motion.div
                        key={point.value}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded-full border-2 transition-colors ${
                            included
                              ? isNotBetween
                                ? "bg-violet-500 border-violet-400 shadow-sm shadow-violet-500/30"
                                : "bg-blue-500 border-blue-400 shadow-sm shadow-blue-500/30"
                              : "bg-muted border-border"
                          }`}
                        />
                        <span
                          className={`text-[10px] font-mono ${
                            included
                              ? isNotBetween
                                ? "text-violet-600 dark:text-violet-400 font-semibold"
                                : "text-blue-600 dark:text-blue-400 font-semibold"
                              : "text-muted-foreground"
                          }`}
                        >
                          {point.value}
                        </span>
                        {(point.value === tab.rangeLow || point.value === tab.rangeHigh) && (
                          <span className="text-[9px] text-muted-foreground font-medium">
                            {point.value === tab.rangeLow ? "low" : "high"}
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="flex gap-4 mt-4 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      isNotBetween ? "bg-violet-500" : "bg-blue-500"
                    }`}
                  />
                  <span>Included in result</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-muted border border-border" />
                  <span>Excluded from result</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Example SQL + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Example SQL</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]">
              {tab.example}
            </pre>
            <Button size="sm" onClick={() => setOutputLines(tab.output)}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <AnimatePresence mode="wait">
              {outputLines ? (
                <motion.div
                  key="out"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[100px]"
                >
                  {outputLines.map((line, i) => (
                    <p key={i} className="text-emerald-400">
                      <span className="text-zinc-500 select-none mr-2">#</span>
                      {line}
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
