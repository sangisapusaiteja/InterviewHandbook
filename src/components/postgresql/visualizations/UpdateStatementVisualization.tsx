"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Row {
  id: number;
  name: string;
  price: string;
  category: string;
  stock: number;
}

type TabKey = "single" | "multiple_cols" | "expression" | "conditional";

interface UpdateTab {
  label: string;
  color: string;
  description: string;
  sql: string;
  apply: (rows: Row[]) => Row[];
  /** Column names that get modified, used for highlighting */
  modifiedCols: (keyof Row)[];
  /** Row ids that get modified */
  modifiedRows: number[];
  resultMessage: string;
}

const initialRows: Row[] = [
  { id: 1, name: "Laptop", price: "999.99", category: "Electronics", stock: 25 },
  { id: 2, name: "Headphones", price: "49.99", category: "Electronics", stock: 150 },
  { id: 3, name: "Desk Chair", price: "299.99", category: "Furniture", stock: 40 },
  { id: 4, name: "Notebook", price: "12.99", category: "Stationery", stock: 500 },
  { id: 5, name: "Monitor", price: "449.99", category: "Electronics", stock: 30 },
];

const tabs: Record<TabKey, UpdateTab> = {
  single: {
    label: "Single Row",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "Updates a single row by targeting it with a WHERE clause. Only the matched row is modified; all other rows remain unchanged.",
    sql: `UPDATE products\n  SET price = '1099.99'\n  WHERE id = 1;`,
    apply: (rows) =>
      rows.map((r) => (r.id === 1 ? { ...r, price: "1099.99" } : r)),
    modifiedCols: ["price"],
    modifiedRows: [1],
    resultMessage: "UPDATE 1",
  },
  multiple_cols: {
    label: "Multiple Columns",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "Updates multiple columns in one statement. Separate each column assignment with a comma in the SET clause.",
    sql: `UPDATE products\n  SET price = '39.99',\n      category = 'Audio'\n  WHERE id = 2;`,
    apply: (rows) =>
      rows.map((r) =>
        r.id === 2 ? { ...r, price: "39.99", category: "Audio" } : r
      ),
    modifiedCols: ["price", "category"],
    modifiedRows: [2],
    resultMessage: "UPDATE 1",
  },
  expression: {
    label: "Expression",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "Uses an expression in the SET clause to compute new values from existing data. Here, every Electronics product gets a 10% price increase.",
    sql: `UPDATE products\n  SET price = price * 1.1\n  WHERE category = 'Electronics';`,
    apply: (rows) =>
      rows.map((r) =>
        r.category === "Electronics"
          ? { ...r, price: (parseFloat(r.price) * 1.1).toFixed(2) }
          : r
      ),
    modifiedCols: ["price"],
    modifiedRows: [1, 2, 5],
    resultMessage: "UPDATE 3",
  },
  conditional: {
    label: "CASE Expression",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    description:
      "Uses a CASE expression to apply different updates based on conditions. Useful for bulk conditional logic in a single statement.",
    sql: `UPDATE products\n  SET stock = CASE\n    WHEN stock < 50  THEN stock + 100\n    WHEN stock < 200 THEN stock + 50\n    ELSE stock + 10\n  END;`,
    apply: (rows) =>
      rows.map((r) => ({
        ...r,
        stock:
          r.stock < 50
            ? r.stock + 100
            : r.stock < 200
            ? r.stock + 50
            : r.stock + 10,
      })),
    modifiedCols: ["stock"],
    modifiedRows: [1, 2, 3, 4, 5],
    resultMessage: "UPDATE 5",
  },
};

const tabOrder: TabKey[] = ["single", "multiple_cols", "expression", "conditional"];
const columnKeys: (keyof Row)[] = ["id", "name", "price", "category", "stock"];

export function UpdateStatementVisualization() {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [selectedTab, setSelectedTab] = useState<TabKey>("single");
  const [output, setOutput] = useState<string[] | null>(null);
  const [highlightedCells, setHighlightedCells] = useState<Set<string>>(new Set());

  const tab = tabs[selectedTab];

  const handleRun = () => {
    const newRows = tab.apply(rows);
    setRows(newRows);

    // Build set of "rowId-col" keys for highlighting
    const cells = new Set<string>();
    for (const rowId of tab.modifiedRows) {
      for (const col of tab.modifiedCols) {
        cells.add(`${rowId}-${col}`);
      }
    }
    setHighlightedCells(cells);
    setOutput(["UPDATE", `-- ${tab.resultMessage}`]);

    // Clear highlight after animation
    setTimeout(() => setHighlightedCells(new Set()), 1800);
  };

  const handleReset = () => {
    setRows(initialRows);
    setOutput(["-- Table reset to original data"]);
    setHighlightedCells(new Set());
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">UPDATE Statement</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Tab selector */}
        <div className="flex flex-wrap gap-2">
          {tabOrder.map((key) => {
            const t = tabs[key];
            const isActive = selectedTab === key;
            return (
              <motion.button
                key={key}
                onClick={() => {
                  setSelectedTab(key);
                  setOutput(null);
                  setHighlightedCells(new Set());
                }}
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
            key={selectedTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`rounded-xl border p-3 ${tab.color}`}
          >
            <p className="text-sm">{tab.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Data table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Table: products
            </p>
            <Button variant="ghost" size="sm" className="text-xs h-7" onClick={handleReset}>
              Reset
            </Button>
          </div>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-5 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              {columnKeys.map((col) => (
                <span key={col}>{col}</span>
              ))}
            </div>
            <AnimatePresence>
              {rows.map((row) => (
                <motion.div
                  key={row.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-5 px-3 py-2 border-t"
                >
                  {columnKeys.map((col) => {
                    const cellKey = `${row.id}-${col}`;
                    const isHighlighted = highlightedCells.has(cellKey);
                    return (
                      <motion.span
                        key={cellKey}
                        animate={
                          isHighlighted
                            ? {
                                backgroundColor: [
                                  "rgba(34,197,94,0)",
                                  "rgba(34,197,94,0.3)",
                                  "rgba(34,197,94,0)",
                                ],
                              }
                            : {}
                        }
                        transition={
                          isHighlighted
                            ? { duration: 1.2, ease: "easeInOut" }
                            : {}
                        }
                        className={`font-mono rounded px-1 -mx-1 ${
                          col === "id"
                            ? "font-medium text-primary"
                            : "text-muted-foreground"
                        } ${isHighlighted ? "text-emerald-600 dark:text-emerald-400 font-semibold" : ""}`}
                      >
                        {String(row[col])}
                      </motion.span>
                    );
                  })}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* SQL + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">UPDATE SQL</p>
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
              {output ? (
                <motion.div
                  key="out"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[100px]"
                >
                  {output.map((line, i) => (
                    <p key={i} className="text-emerald-400">{line}</p>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="ph"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[100px] flex items-center justify-center"
                >
                  <p className="text-xs text-muted-foreground italic">Click Run to execute</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
