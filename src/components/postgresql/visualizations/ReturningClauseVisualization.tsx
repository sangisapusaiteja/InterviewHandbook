"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type OperationKey = "insert" | "update" | "delete" | "expressions";

interface OperationInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  exampleSQL: string;
  operationSummary: string;
  returnedColumns: string[];
  returnedRows: string[][];
}

const operations: Record<OperationKey, OperationInfo> = {
  insert: {
    label: "INSERT ... RETURNING",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Get auto-generated values (like SERIAL IDs or DEFAULT timestamps) back immediately after inserting, without a separate SELECT query.",
    exampleSQL: `INSERT INTO users (name, email)
VALUES
  ('Alice', 'alice@example.com'),
  ('Bob', 'bob@example.com')
RETURNING id, name, email, created_at;`,
    operationSummary: "INSERT 2 rows into users",
    returnedColumns: ["id", "name", "email", "created_at"],
    returnedRows: [
      ["1", "Alice", "alice@example.com", "2024-01-15 10:30:00"],
      ["2", "Bob", "bob@example.com", "2024-01-15 10:30:01"],
    ],
  },
  update: {
    label: "UPDATE ... RETURNING",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "See the new values of updated rows immediately. Useful for confirming changes or returning modified data to the application layer.",
    exampleSQL: `UPDATE products
SET price = price * 1.10
WHERE category = 'electronics'
RETURNING id, name, price;`,
    operationSummary: "UPDATE products SET price = price * 1.10",
    returnedColumns: ["id", "name", "price"],
    returnedRows: [
      ["3", "Laptop", "1099.89"],
      ["7", "Keyboard", "54.99"],
      ["12", "Monitor", "329.89"],
    ],
  },
  delete: {
    label: "DELETE ... RETURNING",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Retrieve the deleted rows as they are removed. Great for audit logging, undo functionality, or archiving data before it disappears.",
    exampleSQL: `DELETE FROM sessions
WHERE expires_at < NOW()
RETURNING id, user_id, expires_at;`,
    operationSummary: "DELETE expired sessions",
    returnedColumns: ["id", "user_id", "expires_at"],
    returnedRows: [
      ["45", "8", "2024-01-14 23:59:00"],
      ["51", "3", "2024-01-14 18:00:00"],
    ],
  },
  expressions: {
    label: "RETURNING Expressions",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "RETURNING supports arbitrary expressions, not just column names. Compute derived values, concatenate strings, or apply functions on the fly.",
    exampleSQL: `INSERT INTO order_items
  (order_id, product, price, quantity)
VALUES
  (101, 'Widget', 25.00, 4),
  (101, 'Gadget', 49.99, 2)
RETURNING
  id,
  product,
  price * quantity AS total,
  UPPER(product) AS product_upper;`,
    operationSummary: "INSERT 2 rows into order_items",
    returnedColumns: ["id", "product", "total", "product_upper"],
    returnedRows: [
      ["1", "Widget", "100.00", "WIDGET"],
      ["2", "Gadget", "99.98", "GADGET"],
    ],
  },
};

const operationOrder: OperationKey[] = ["insert", "update", "delete", "expressions"];

export function ReturningClauseVisualization() {
  const [selected, setSelected] = useState<OperationKey>("insert");
  const [output, setOutput] = useState<{ columns: string[]; rows: string[][] } | null>(null);

  const op = operations[selected];

  const handleSelect = (key: OperationKey) => {
    setSelected(key);
    setOutput(null);
  };

  const handleRun = () => {
    setOutput({ columns: op.returnedColumns, rows: op.returnedRows });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">RETURNING Clause</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Operation tabs */}
        <div className="flex flex-wrap gap-2">
          {operationOrder.map((key) => {
            const o = operations[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive ? o.color + " shadow-sm" : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {o.label}
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
            className={`rounded-xl border p-3 ${op.color}`}
          >
            <p className="text-sm">{op.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* SQL Example */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Example SQL</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[80px]">
            {op.exampleSQL}
          </pre>
          <Button size="sm" onClick={handleRun}>
            <Play className="h-3.5 w-3.5 mr-1" /> Run
          </Button>
        </div>

        {/* Visual flow: Operation -> Arrow -> Returned Data */}
        <AnimatePresence mode="wait">
          {output ? (
            <motion.div
              key={`flow-${selected}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              <p className="text-xs font-semibold text-muted-foreground">Result Flow</p>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                {/* Left: DML operation */}
                <div className={`rounded-xl border p-4 ${op.color}`}>
                  <p className="text-xs font-semibold mb-1">DML Operation</p>
                  <p className="text-sm font-mono">{op.operationSummary}</p>
                  <p className="text-xs mt-2 opacity-75">
                    {output.rows.length} row{output.rows.length !== 1 ? "s" : ""} affected
                  </p>
                </div>

                {/* Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="hidden md:flex flex-col items-center gap-1"
                >
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground font-medium">RETURNING</span>
                </motion.div>

                {/* Right: Returned data table */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-xl border overflow-hidden text-xs"
                >
                  <div
                    className="grid bg-muted/60 px-3 py-2 font-semibold text-muted-foreground"
                    style={{ gridTemplateColumns: `repeat(${output.columns.length}, 1fr)` }}
                  >
                    {output.columns.map((col) => (
                      <span key={col}>{col}</span>
                    ))}
                  </div>
                  {output.rows.map((row, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + i * 0.08 }}
                      className="grid px-3 py-2 border-t hover:bg-muted/30"
                      style={{ gridTemplateColumns: `repeat(${output.columns.length}, 1fr)` }}
                    >
                      {row.map((cell, j) => (
                        <span key={j} className="font-mono text-emerald-600 dark:text-emerald-400">
                          {cell}
                        </span>
                      ))}
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Benefit callout */}
              <div className="rounded-xl border bg-muted/20 px-4 py-3">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold">Single round-trip:</span> Without RETURNING, you would need a separate SELECT query to retrieve this data.
                  RETURNING gives you the result in one operation.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[100px] flex items-center justify-center"
            >
              <p className="text-xs text-muted-foreground italic">Click Run to see the RETURNING clause in action</p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
