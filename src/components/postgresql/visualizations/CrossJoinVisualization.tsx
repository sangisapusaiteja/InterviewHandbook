"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TabKey = "basic" | "combinations" | "grid" | "implicit";

interface TabInfo {
  label: string;
  color: string;
  description: string;
  sql: string;
  example: string;
  output: string[];
  tableA: { name: string; rows: string[] };
  tableB: { name: string; rows: string[] };
}

const tabs: Record<TabKey, TabInfo> = {
  basic: {
    label: "Basic Cross Join",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "A CROSS JOIN returns the Cartesian product of two tables — every row from table A paired with every row from table B. If A has 3 rows and B has 4 rows, the result has 3 × 4 = 12 rows.",
    sql: `SELECT s.size, c.color\nFROM sizes s\nCROSS JOIN colors c\nORDER BY s.size, c.color;`,
    example: `-- sizes: S, M, L\n-- colors: Red, Blue, Green, Black\n\nSELECT s.size, c.color\nFROM sizes s\nCROSS JOIN colors c\nORDER BY s.size, c.color;`,
    output: [
      " size | color",
      "------+-------",
      " S    | Red",
      " S    | Blue",
      " S    | Green",
      " S    | Black",
      " M    | Red",
      " M    | Blue",
      " M    | Green",
      " M    | Black",
      " L    | Red",
      " L    | Blue",
      " L    | Green",
      " L    | Black",
      "(12 rows)",
    ],
    tableA: { name: "sizes", rows: ["S", "M", "L"] },
    tableB: { name: "colors", rows: ["Red", "Blue", "Green", "Black"] },
  },
  combinations: {
    label: "SKU Combinations",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "CROSS JOIN is useful for generating all combinations, such as product SKUs. Combine product names with available variants to create every possible SKU entry.",
    sql: `SELECT\n  p.name || '-' || v.variant AS sku,\n  p.name AS product,\n  v.variant\nFROM products p\nCROSS JOIN variants v;`,
    example: `-- products: Shirt, Hat\n-- variants: Small, Large\n\nSELECT\n  p.name || '-' || v.variant AS sku,\n  p.name AS product,\n  v.variant\nFROM products p\nCROSS JOIN variants v;`,
    output: [
      "    sku     | product | variant",
      "------------+---------+--------",
      " Shirt-Small | Shirt   | Small",
      " Shirt-Large | Shirt   | Large",
      " Hat-Small   | Hat     | Small",
      " Hat-Large   | Hat     | Large",
      "(4 rows)",
    ],
    tableA: { name: "products", rows: ["Shirt", "Hat"] },
    tableB: { name: "variants", rows: ["Small", "Large"] },
  },
  grid: {
    label: "Date Grid",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "CROSS JOIN can create a date grid — every employee paired with every date in a range. This is useful for attendance tracking, scheduling, or filling in missing report data.",
    sql: `SELECT\n  e.name,\n  d.day::DATE\nFROM employees e\nCROSS JOIN\n  generate_series(\n    '2024-01-01', '2024-01-03',\n    '1 day'::INTERVAL\n  ) AS d(day);`,
    example: `-- employees: Alice, Bob\n-- dates: Jan 1, Jan 2, Jan 3\n\nSELECT e.name, d.day::DATE\nFROM employees e\nCROSS JOIN\n  generate_series(\n    '2024-01-01', '2024-01-03',\n    '1 day'::INTERVAL\n  ) AS d(day);`,
    output: [
      " name  |    day",
      "-------+------------",
      " Alice | 2024-01-01",
      " Alice | 2024-01-02",
      " Alice | 2024-01-03",
      " Bob   | 2024-01-01",
      " Bob   | 2024-01-02",
      " Bob   | 2024-01-03",
      "(6 rows)",
    ],
    tableA: { name: "employees", rows: ["Alice", "Bob"] },
    tableB: { name: "dates", rows: ["Jan 1", "Jan 2", "Jan 3"] },
  },
  implicit: {
    label: "Implicit Cross Join",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    description:
      "You can write a cross join implicitly by listing tables separated by commas in the FROM clause (without a JOIN keyword). This older SQL-89 syntax produces the same Cartesian product.",
    sql: `-- Explicit (SQL-92)\nSELECT * FROM A CROSS JOIN B;\n\n-- Implicit (SQL-89, comma syntax)\nSELECT * FROM A, B;`,
    example: `-- Explicit CROSS JOIN\nSELECT d.name AS dept, r.label AS room\nFROM departments d\nCROSS JOIN rooms r;\n\n-- Same result with comma syntax\nSELECT d.name AS dept, r.label AS room\nFROM departments d, rooms r;`,
    output: [
      "   dept    | room",
      "-----------+------",
      " Engineering | A1",
      " Engineering | A2",
      " Marketing   | A1",
      " Marketing   | A2",
      " Sales       | A1",
      " Sales       | A2",
      "(6 rows)",
    ],
    tableA: { name: "departments", rows: ["Engineering", "Marketing", "Sales"] },
    tableB: { name: "rooms", rows: ["A1", "A2"] },
  },
};

const tabOrder: TabKey[] = ["basic", "combinations", "grid", "implicit"];

const cellColors: Record<TabKey, string> = {
  basic: "bg-blue-500/20 border-blue-500/30",
  combinations: "bg-emerald-500/20 border-emerald-500/30",
  grid: "bg-violet-500/20 border-violet-500/30",
  implicit: "bg-orange-500/20 border-orange-500/30",
};

const headerColors: Record<TabKey, string> = {
  basic: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  combinations: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  grid: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  implicit: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
};

export function CrossJoinVisualization() {
  const [selected, setSelected] = useState<TabKey>("basic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: TabKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">CROSS JOIN — Cartesian Product</CardTitle>
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
                <Grid3X3 className="h-3 w-3" />
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

        {/* Cartesian product grid */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Cartesian Product Grid ({tab.tableA.rows.length} × {tab.tableB.rows.length} = {tab.tableA.rows.length * tab.tableB.rows.length} rows)
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="overflow-x-auto"
            >
              <div className="inline-block min-w-full">
                {/* Header row: empty corner + table B columns */}
                <div className="flex">
                  <div className="w-24 shrink-0 p-1.5">
                    <div className="rounded-lg border border-dashed border-muted-foreground/30 px-2 py-1.5 text-[10px] text-muted-foreground text-center">
                      {tab.tableA.name} ↓ \ {tab.tableB.name} →
                    </div>
                  </div>
                  {tab.tableB.rows.map((colVal) => (
                    <div key={colVal} className="flex-1 min-w-[80px] p-1.5">
                      <div className={`rounded-lg px-2 py-1.5 text-[11px] font-semibold text-center ${headerColors[selected]}`}>
                        {colVal}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Data rows */}
                {tab.tableA.rows.map((rowVal, rowIdx) => (
                  <div key={rowVal} className="flex">
                    {/* Row header */}
                    <div className="w-24 shrink-0 p-1.5">
                      <div className={`rounded-lg px-2 py-1.5 text-[11px] font-semibold text-center ${headerColors[selected]}`}>
                        {rowVal}
                      </div>
                    </div>

                    {/* Intersection cells */}
                    {tab.tableB.rows.map((colVal, colIdx) => (
                      <motion.div
                        key={`${rowVal}-${colVal}`}
                        className="flex-1 min-w-[80px] p-1.5"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: rowIdx * 0.08 + colIdx * 0.06,
                          duration: 0.25,
                        }}
                      >
                        <div
                          className={`rounded-lg border px-2 py-1.5 text-[10px] font-mono text-center ${cellColors[selected]}`}
                        >
                          {rowVal}, {colVal}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* SQL Definition */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">SQL Syntax</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {tab.sql}
          </pre>
        </div>

        {/* Example + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Example</p>
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[100px]"
                >
                  {outputLines.map((line, i) => (
                    <p
                      key={i}
                      className={
                        line.startsWith("(")
                          ? "text-zinc-500"
                          : line.includes("---") || line.includes("===")
                          ? "text-zinc-600"
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
