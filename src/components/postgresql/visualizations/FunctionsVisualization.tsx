"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FnTab = "sql_fn" | "plpgsql" | "return_types";

const tabInfo: Record<FnTab, { label: string; color: string }> = {
  sql_fn: {
    label: "SQL Functions",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  },
  plpgsql: {
    label: "PL/pgSQL Functions",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  },
  return_types: {
    label: "Return Types",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  },
};

const tabOrder: FnTab[] = ["sql_fn", "plpgsql", "return_types"];

const sqlFnExample = `-- Simple SQL function
CREATE FUNCTION tax_amount(price DECIMAL)
RETURNS DECIMAL
LANGUAGE sql
AS $$
  SELECT price * 0.08;
$$;

-- Usage in SELECT
SELECT product, price, tax_amount(price) AS tax
FROM products;`;

const sqlFnOutput = [
  " product   | price  | tax",
  "-----------+--------+------",
  " Widget    | 29.99  | 2.40",
  " Gadget    | 49.99  | 4.00",
  " Gizmo     | 19.99  | 1.60",
];

const plpgsqlExample = `-- PL/pgSQL function with logic
CREATE FUNCTION get_discount(
  customer_id INT
)
RETURNS DECIMAL
LANGUAGE plpgsql
AS $$
DECLARE
  total_orders INT;
  discount DECIMAL;
BEGIN
  SELECT COUNT(*) INTO total_orders
  FROM orders WHERE cust_id = customer_id;

  IF total_orders > 100 THEN
    discount := 0.20;
  ELSIF total_orders > 50 THEN
    discount := 0.10;
  ELSE
    discount := 0.05;
  END IF;

  RETURN discount;
END;
$$;`;

const plpgsqlOutput = [
  "-- Usage in WHERE clause:",
  "SELECT name FROM customers",
  "WHERE get_discount(id) >= 0.10;",
  "",
  " name",
  "--------",
  " Alice   -- 120 orders, 20% discount",
  " Bob     -- 75 orders, 10% discount",
];

const returnTypesData = [
  {
    type: "Scalar",
    color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
    sql: `CREATE FUNCTION total_revenue()
RETURNS DECIMAL AS $$
  SELECT SUM(amount) FROM orders;
$$ LANGUAGE sql;`,
    usage: "SELECT total_revenue(); -- 125000.00",
  },
  {
    type: "TABLE",
    color: "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300",
    sql: `CREATE FUNCTION active_users()
RETURNS TABLE(id INT, name TEXT) AS $$
  SELECT id, name FROM users
  WHERE active = true;
$$ LANGUAGE sql;`,
    usage: "SELECT * FROM active_users();",
  },
  {
    type: "SETOF",
    color: "bg-violet-500/10 border-violet-500/30 text-violet-700 dark:text-violet-300",
    sql: `CREATE FUNCTION recent_orders()
RETURNS SETOF orders AS $$
  SELECT * FROM orders
  WHERE created_at > NOW() - INTERVAL '7d';
$$ LANGUAGE sql;`,
    usage: "SELECT * FROM recent_orders();",
  },
];

const usageContexts = [
  { context: "SELECT", sql: "SELECT tax_amount(99.99);", color: "text-emerald-600 dark:text-emerald-400" },
  { context: "WHERE", sql: "SELECT * FROM items WHERE tax_amount(price) > 5;", color: "text-blue-600 dark:text-blue-400" },
  { context: "Trigger", sql: "CREATE TRIGGER ... EXECUTE FUNCTION audit_log();", color: "text-violet-600 dark:text-violet-400" },
];

export function FunctionsVisualization() {
  const [activeTab, setActiveTab] = useState<FnTab>("sql_fn");
  const [showOutput, setShowOutput] = useState(false);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">PostgreSQL Functions</CardTitle>
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
                  setShowOutput(false);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? t.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <Code2 className="h-3 w-3" />
                {t.label}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "sql_fn" && (
            <motion.div
              key="sql_fn"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3">
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  <strong>SQL functions</strong> contain a single SQL expression. They are simple,
                  inlineable by the optimizer, and great for computed columns.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">Definition</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
                    {sqlFnExample}
                  </pre>
                  <Button size="sm" onClick={() => setShowOutput(true)}>
                    <Play className="h-3.5 w-3.5 mr-1" /> Run
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">Output</p>
                  <AnimatePresence mode="wait">
                    {showOutput ? (
                      <motion.div
                        key="out"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[120px]"
                      >
                        {sqlFnOutput.map((line, i) => (
                          <p key={i} className="text-emerald-400">{line}</p>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="ph"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[120px] flex items-center justify-center"
                      >
                        <p className="text-xs text-muted-foreground italic">
                          Click Run to see output
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "plpgsql" && (
            <motion.div
              key="plpgsql"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>PL/pgSQL functions</strong> support variables, conditionals, loops,
                  and exception handling -- full procedural logic inside the database.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">Definition</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto max-h-[300px] overflow-y-auto">
                    {plpgsqlExample}
                  </pre>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">Usage</p>
                  <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1">
                    {plpgsqlOutput.map((line, i) => (
                      <p
                        key={i}
                        className={
                          line.startsWith("--")
                            ? "text-zinc-500"
                            : line === ""
                            ? ""
                            : "text-blue-400"
                        }
                      >
                        {line || "\u00A0"}
                      </p>
                    ))}
                  </div>

                  {/* Flow diagram */}
                  <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3">
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">
                      Execution flow
                    </p>
                    <div className="flex items-center gap-1 text-[10px]">
                      {["Input: cust_id", "COUNT orders", "IF/ELSIF", "RETURN discount"].map((s, i) => (
                        <div key={s} className="flex items-center gap-1">
                          <span className="px-2 py-1 rounded-lg bg-blue-500/15 border border-blue-500/30 font-medium text-blue-700 dark:text-blue-300">
                            {s}
                          </span>
                          {i < 3 && <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "return_types" && (
            <motion.div
              key="return_types"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-violet-500/10 border-violet-500/30 p-3">
                <p className="text-sm text-violet-700 dark:text-violet-300">
                  Functions can return a <strong>single value</strong> (scalar),
                  a <strong>TABLE</strong>, or a <strong>SETOF</strong> rows.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {returnTypesData.map((rt) => (
                  <motion.div
                    key={rt.type}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-xl border p-3 space-y-2 ${rt.color}`}
                  >
                    <p className="text-xs font-bold">RETURNS {rt.type}</p>
                    <pre className="text-[10px] font-mono bg-background/60 rounded-lg p-2 whitespace-pre overflow-x-auto">
                      {rt.sql}
                    </pre>
                    <div className="bg-background/40 rounded-lg p-2">
                      <p className="text-[10px] font-mono">{rt.usage}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Usage contexts */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">
                  Functions can be used in multiple contexts
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {usageContexts.map((uc) => (
                    <div key={uc.context} className="rounded-xl border bg-muted/20 p-2.5">
                      <p className={`text-xs font-bold ${uc.color} mb-1`}>
                        In {uc.context}
                      </p>
                      <p className="text-[10px] font-mono text-muted-foreground">{uc.sql}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
