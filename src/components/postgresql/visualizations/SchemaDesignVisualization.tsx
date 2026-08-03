"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Square, X, Check, BookOpen, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Principle {
  title: string;
  description: string;
  color: string;
  borderColor: string;
  textColor: string;
}

const principles: Principle[] = [
  {
    title: "Use Consistent Naming",
    description: "snake_case for tables/columns, plural table names, singular column names",
    color: "bg-blue-500/10",
    borderColor: "border-blue-500/40",
    textColor: "text-blue-700 dark:text-blue-300",
  },
  {
    title: "Add Surrogate Primary Keys",
    description: "Use SERIAL or UUID as PK instead of natural keys for stability",
    color: "bg-emerald-500/10",
    borderColor: "border-emerald-500/40",
    textColor: "text-emerald-700 dark:text-emerald-300",
  },
  {
    title: "Include Timestamps",
    description: "Add created_at and updated_at columns to every table for auditing",
    color: "bg-violet-500/10",
    borderColor: "border-violet-500/40",
    textColor: "text-violet-700 dark:text-violet-300",
  },
  {
    title: "Apply Constraints",
    description: "NOT NULL, UNIQUE, CHECK, and FK constraints to enforce data integrity",
    color: "bg-orange-500/10",
    borderColor: "border-orange-500/40",
    textColor: "text-orange-700 dark:text-orange-300",
  },
  {
    title: "Index Frequently Queried Columns",
    description: "Add indexes on columns used in WHERE, JOIN, and ORDER BY clauses",
    color: "bg-pink-500/10",
    borderColor: "border-pink-500/40",
    textColor: "text-pink-700 dark:text-pink-300",
  },
  {
    title: "Normalize to 3NF (Usually)",
    description: "Start normalized, then selectively denormalize only where performance demands it",
    color: "bg-cyan-500/10",
    borderColor: "border-cyan-500/40",
    textColor: "text-cyan-700 dark:text-cyan-300",
  },
];

const badSchema = `CREATE TABLE Data (
    ID int,
    CustomerName varchar(255),
    CustomerEmail varchar(255),
    Prod varchar(100),
    Prod_Price float,
    order_date varchar(50),
    qty int
);
-- No primary key
-- No constraints
-- Mixed naming styles
-- No timestamps
-- Denormalized`;

const goodSchema = `CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price > 0),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customers(customer_id),
    product_id INT NOT NULL REFERENCES products(product_id),
    quantity INT NOT NULL CHECK (quantity > 0),
    ordered_at TIMESTAMP DEFAULT NOW()
);`;

export function SchemaDesignVisualization() {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [showExample, setShowExample] = useState<"bad" | "good">("bad");

  const toggleCheck = (idx: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const allChecked = checked.size === principles.length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Schema Design Best Practices</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Checklist */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs font-semibold text-muted-foreground">Design Principles Checklist</p>
            <span className="text-[9px] text-muted-foreground ml-auto">
              {checked.size}/{principles.length} applied
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {principles.map((p, i) => {
              const isChecked = checked.has(i);
              return (
                <motion.button
                  key={i}
                  onClick={() => toggleCheck(i)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`flex items-start gap-2.5 rounded-xl border p-3 text-left transition-all ${
                    isChecked
                      ? `${p.color} ${p.borderColor}`
                      : "bg-muted/20 border-border hover:bg-muted/40"
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className={`h-4 w-4 shrink-0 mt-0.5 ${p.textColor}`} />
                  ) : (
                    <Square className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
                  )}
                  <div>
                    <p className={`text-xs font-bold ${isChecked ? p.textColor : ""}`}>{p.title}</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">{p.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
          {allChecked && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3 text-center"
            >
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                All design principles applied -- your schema is well-designed!
              </p>
            </motion.div>
          )}
        </div>

        {/* Bad vs Good examples */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Schema Example Comparison</p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={showExample === "bad" ? "destructive" : "outline"}
              onClick={() => setShowExample("bad")}
              className="text-xs"
            >
              <X className="h-3 w-3 mr-1" /> Bad Schema
            </Button>
            <Button
              size="sm"
              variant={showExample === "good" ? "default" : "outline"}
              onClick={() => setShowExample("good")}
              className="text-xs"
            >
              <Check className="h-3 w-3 mr-1" /> Good Schema
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {showExample === "bad" ? (
              <motion.div
                key="bad"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="space-y-2"
              >
                <div className="rounded-xl border bg-red-500/10 border-red-500/30 p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                    <p className="text-xs font-bold text-red-700 dark:text-red-300">Poorly Designed Schema</p>
                  </div>
                  <pre className="text-[10px] font-mono whitespace-pre overflow-x-auto text-red-800 dark:text-red-200">
                    {badSchema}
                  </pre>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
                  {[
                    "No primary key defined",
                    "Mixed naming (ID, CustomerName, Prod)",
                    "No NOT NULL constraints",
                    "Using float for money (use NUMERIC)",
                    "Date stored as varchar",
                    "All data in one table",
                  ].map((issue, i) => (
                    <div key={i} className="flex items-center gap-1 px-2 py-1 rounded bg-red-500/10">
                      <X className="h-3 w-3 text-red-500 shrink-0" />
                      <span className="text-[9px] text-red-700 dark:text-red-300">{issue}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="good"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-2"
              >
                <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Well-Designed Schema</p>
                  </div>
                  <pre className="text-[10px] font-mono whitespace-pre overflow-x-auto text-emerald-800 dark:text-emerald-200">
                    {goodSchema}
                  </pre>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
                  {[
                    "SERIAL primary keys",
                    "Consistent snake_case naming",
                    "NOT NULL on required fields",
                    "NUMERIC for money, CHECK for validation",
                    "TIMESTAMP for dates",
                    "Normalized into 3 tables with FKs",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/10">
                      <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                      <span className="text-[9px] text-emerald-700 dark:text-emerald-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
