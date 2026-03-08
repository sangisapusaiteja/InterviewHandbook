"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TabKey = "three_table" | "four_table" | "mixed_joins" | "summary";

interface TabInfo {
  label: string;
  color: string;
  description: string;
  sql: string;
  example: string;
  output: string[];
}

const tabs: Record<TabKey, TabInfo> = {
  three_table: {
    label: "Three-Table Join",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "A three-table join chains two JOIN clauses to connect orders to customers and products. Each JOIN adds one more table using a foreign key relationship. The query walks the path: orders → customers (via customer_id) → products (via product_id).",
    sql: `CREATE TABLE customers (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(150)\n);\n\nCREATE TABLE products (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    price NUMERIC(10,2)\n);\n\nCREATE TABLE orders (\n    id SERIAL PRIMARY KEY,\n    customer_id INT REFERENCES customers(id),\n    product_id INT REFERENCES products(id),\n    quantity INT DEFAULT 1,\n    ordered_at DATE DEFAULT CURRENT_DATE\n);`,
    example: `SELECT\n    o.id AS order_id,\n    c.name AS customer,\n    p.name AS product,\n    p.price,\n    o.quantity\nFROM orders o\nINNER JOIN customers c ON o.customer_id = c.id\nINNER JOIN products p ON o.product_id = p.id\nORDER BY o.id;`,
    output: [
      " order_id | customer |  product  | price  | quantity",
      "----------+----------+-----------+--------+---------",
      "        1 | Alice    | Laptop    | 999.99 |        1",
      "        2 | Bob      | Keyboard  |  79.99 |        2",
      "        3 | Alice    | Mouse     |  29.99 |        3",
      "        4 | Charlie  | Laptop    | 999.99 |        1",
      "(4 rows)",
    ],
  },
  four_table: {
    label: "Four-Table Join",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "A four-table join uses a junction table (order_items) to model a many-to-many relationship between orders and products. This is the standard pattern for e-commerce: orders → order_items → products, with customers joined separately.",
    sql: `CREATE TABLE order_items (\n    id SERIAL PRIMARY KEY,\n    order_id INT REFERENCES orders(id),\n    product_id INT REFERENCES products(id),\n    quantity INT DEFAULT 1,\n    unit_price NUMERIC(10,2)\n);\n\n-- orders now links only to customers\n-- order_items links orders to products`,
    example: `SELECT\n    o.id AS order_id,\n    c.name AS customer,\n    p.name AS product,\n    oi.quantity,\n    oi.unit_price,\n    (oi.quantity * oi.unit_price) AS line_total\nFROM orders o\nJOIN customers c ON o.customer_id = c.id\nJOIN order_items oi ON oi.order_id = o.id\nJOIN products p ON oi.product_id = p.id\nORDER BY o.id, p.name;`,
    output: [
      " order_id | customer |  product  | quantity | unit_price | line_total",
      "----------+----------+-----------+----------+------------+-----------",
      "        1 | Alice    | Keyboard  |        1 |      79.99 |      79.99",
      "        1 | Alice    | Laptop    |        1 |     999.99 |     999.99",
      "        2 | Bob      | Mouse     |        2 |      29.99 |      59.98",
      "        3 | Charlie  | Laptop    |        1 |     999.99 |     999.99",
      "        3 | Charlie  | Mouse     |        3 |      29.99 |      89.97",
      "(5 rows)",
    ],
  },
  mixed_joins: {
    label: "Mixed Joins",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "You can mix INNER JOIN and LEFT JOIN in the same query. Use INNER JOIN for required relationships (every order must have a customer) and LEFT JOIN for optional ones (a customer might not have a shipping address). Rows without a match in a LEFT JOIN show NULL.",
    sql: `CREATE TABLE shipping_addresses (\n    id SERIAL PRIMARY KEY,\n    customer_id INT REFERENCES customers(id),\n    street VARCHAR(200),\n    city VARCHAR(100),\n    zip VARCHAR(20)\n);`,
    example: `SELECT\n    o.id AS order_id,\n    c.name AS customer,\n    p.name AS product,\n    sa.city AS ship_city\nFROM orders o\nINNER JOIN customers c\n    ON o.customer_id = c.id\nINNER JOIN products p\n    ON o.product_id = p.id\nLEFT JOIN shipping_addresses sa\n    ON sa.customer_id = c.id\nORDER BY o.id;`,
    output: [
      " order_id | customer |  product  | ship_city",
      "----------+----------+-----------+----------",
      "        1 | Alice    | Laptop    | New York",
      "        2 | Bob      | Keyboard  | NULL",
      "        3 | Alice    | Mouse     | New York",
      "        4 | Charlie  | Laptop    | Chicago",
      "(4 rows)",
      "",
      "-- Bob has no shipping address → NULL",
    ],
  },
  summary: {
    label: "Aggregation",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    description:
      "Combine multi-table joins with GROUP BY to aggregate data across relationships. This is powerful for reporting: total revenue per customer, average order size, product sales counts — all from one query joining multiple tables.",
    sql: `-- No extra tables needed.\n-- Uses: customers, orders, order_items, products`,
    example: `SELECT\n    c.name AS customer,\n    COUNT(DISTINCT o.id) AS total_orders,\n    SUM(oi.quantity) AS items_bought,\n    SUM(oi.quantity * oi.unit_price)\n        AS total_spent\nFROM customers c\nJOIN orders o ON o.customer_id = c.id\nJOIN order_items oi ON oi.order_id = o.id\nJOIN products p ON oi.product_id = p.id\nGROUP BY c.name\nORDER BY total_spent DESC;`,
    output: [
      " customer | total_orders | items_bought | total_spent",
      "----------+--------------+--------------+------------",
      " Alice    |            1 |            2 |     1079.98",
      " Charlie  |            1 |            4 |     1089.96",
      " Bob      |            1 |            2 |       59.98",
      "(3 rows)",
    ],
  },
};

const tabOrder: TabKey[] = ["three_table", "four_table", "mixed_joins", "summary"];

interface SchemaTable {
  name: string;
  color: string;
  columns: { label: string; badge?: string }[];
  x: number;
  y: number;
}

const schemaTables: SchemaTable[] = [
  {
    name: "customers",
    color: "blue",
    columns: [
      { label: "id", badge: "PK" },
      { label: "name" },
      { label: "email" },
    ],
    x: 0,
    y: 0,
  },
  {
    name: "orders",
    color: "emerald",
    columns: [
      { label: "id", badge: "PK" },
      { label: "customer_id", badge: "FK" },
      { label: "product_id", badge: "FK" },
      { label: "quantity" },
    ],
    x: 1,
    y: 0,
  },
  {
    name: "order_items",
    color: "violet",
    columns: [
      { label: "id", badge: "PK" },
      { label: "order_id", badge: "FK" },
      { label: "product_id", badge: "FK" },
      { label: "quantity" },
      { label: "unit_price" },
    ],
    x: 2,
    y: 0,
  },
  {
    name: "products",
    color: "orange",
    columns: [
      { label: "id", badge: "PK" },
      { label: "name" },
      { label: "price" },
    ],
    x: 3,
    y: 0,
  },
];

const colorMap: Record<string, { bg: string; text: string; badge: string }> = {
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-700 dark:text-blue-300",
    badge: "bg-blue-500/20",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-300",
    badge: "bg-emerald-500/20",
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-700 dark:text-violet-300",
    badge: "bg-violet-500/20",
  },
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-700 dark:text-orange-300",
    badge: "bg-orange-500/20",
  },
};

export function MultipleTableJoinsVisualization() {
  const [selected, setSelected] = useState<TabKey>("three_table");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: TabKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Multiple Table Joins</CardTitle>
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

        {/* Schema diagram */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Schema Diagram
          </p>
          <div className="flex items-center justify-center gap-3 py-3 flex-wrap">
            {schemaTables.map((table, idx) => {
              const c = colorMap[table.color];
              return (
                <div key={table.name} className="flex items-center gap-3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`rounded-xl border ${c.bg} p-3 min-w-[130px]`}
                  >
                    <p className={`text-xs font-bold ${c.text} mb-2`}>{table.name}</p>
                    {table.columns.map((col) => (
                      <div key={col.label} className="flex items-center gap-2 text-[10px] py-0.5">
                        {col.badge && (
                          <Badge variant="secondary" className={`text-[8px] px-1 py-0 ${c.badge}`}>
                            {col.badge}
                          </Badge>
                        )}
                        <span className="font-mono text-muted-foreground">{col.label}</span>
                      </div>
                    ))}
                  </motion.div>
                  {idx < schemaTables.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-muted-foreground text-center">
            customers ← orders → order_items → products (foreign key relationships)
          </p>
        </div>

        {/* Table SQL */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Table Definition</p>
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
                        line.startsWith("ERROR") || line.includes("violates")
                          ? "text-red-400"
                          : line.startsWith("--")
                          ? "text-zinc-500"
                          : line === ""
                          ? ""
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
