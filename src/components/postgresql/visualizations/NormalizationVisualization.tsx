"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, ArrowRight, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TableRow {
  [key: string]: string | number;
}

const denormalizedData: TableRow[] = [
  { order_id: 1, customer: "Alice", email: "alice@mail.com", product: "Laptop", price: 999, qty: 1 },
  { order_id: 2, customer: "Alice", email: "alice@mail.com", product: "Mouse", price: 25, qty: 2 },
  { order_id: 3, customer: "Bob", email: "bob@mail.com", product: "Laptop", price: 999, qty: 1 },
  { order_id: 4, customer: "Alice", email: "alice@mail.com", product: "Keyboard", price: 75, qty: 1 },
];

const customersTable: TableRow[] = [
  { customer_id: 1, name: "Alice", email: "alice@mail.com" },
  { customer_id: 2, name: "Bob", email: "bob@mail.com" },
];

const productsTable: TableRow[] = [
  { product_id: 1, name: "Laptop", price: 999 },
  { product_id: 2, name: "Mouse", price: 25 },
  { product_id: 3, name: "Keyboard", price: 75 },
];

const ordersTable: TableRow[] = [
  { order_id: 1, customer_id: 1, product_id: 1, qty: 1 },
  { order_id: 2, customer_id: 1, product_id: 2, qty: 2 },
  { order_id: 3, customer_id: 2, product_id: 1, qty: 1 },
  { order_id: 4, customer_id: 1, product_id: 3, qty: 1 },
];

const redundantCells = [
  { row: 1, col: "customer" },
  { row: 1, col: "email" },
  { row: 3, col: "customer" },
  { row: 3, col: "email" },
  { row: 0, col: "product" },
  { row: 0, col: "price" },
  { row: 2, col: "product" },
  { row: 2, col: "price" },
];

function isRedundant(rowIdx: number, col: string): boolean {
  return redundantCells.some((c) => c.row === rowIdx && c.col === col);
}

function MiniTable({ title, data, color, columns }: { title: string; data: TableRow[]; color: string; columns: string[] }) {
  return (
    <div className={`rounded-xl border ${color} p-3`}>
      <p className="text-xs font-bold mb-2">{title}</p>
      <table className="w-full text-[10px]">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="text-left px-1.5 py-1 font-semibold border-b border-current/10">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col} className="px-1.5 py-0.5 font-mono">
                  {String(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function NormalizationVisualization() {
  const [view, setView] = useState<"denormalized" | "normalized">("denormalized");

  const denormCols = ["order_id", "customer", "email", "product", "price", "qty"];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Normalization Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={view === "denormalized" ? "default" : "outline"}
            onClick={() => setView("denormalized")}
            className="text-xs"
          >
            <AlertTriangle className="h-3 w-3 mr-1" /> Denormalized
          </Button>
          <Button
            size="sm"
            variant={view === "normalized" ? "default" : "outline"}
            onClick={() => setView("normalized")}
            className="text-xs"
          >
            <CheckCircle className="h-3 w-3 mr-1" /> Normalized
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {view === "denormalized" ? (
            <motion.div
              key="denorm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-3"
            >
              <div className="rounded-xl border bg-red-500/10 border-red-500/30 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <p className="text-xs font-bold text-red-700 dark:text-red-300">
                    Denormalized: One Table With Redundant Data
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr>
                        {denormCols.map((col) => (
                          <th key={col} className="text-left px-2 py-1 font-semibold border-b border-red-500/20">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {denormalizedData.map((row, ri) => (
                        <tr key={ri}>
                          {denormCols.map((col) => (
                            <td
                              key={col}
                              className={`px-2 py-1 font-mono ${
                                isRedundant(ri, col)
                                  ? "bg-red-500/20 text-red-700 dark:text-red-300 font-bold"
                                  : ""
                              }`}
                            >
                              {String(row[col])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[9px] text-red-600 dark:text-red-400 mt-2">
                  Highlighted cells contain duplicated data -- update anomalies, wasted storage
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="norm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  Normalized: Separated Into Related Tables
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <MiniTable
                  title="customers"
                  data={customersTable}
                  color="bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300"
                  columns={["customer_id", "name", "email"]}
                />
                <MiniTable
                  title="products"
                  data={productsTable}
                  color="bg-violet-500/10 border-violet-500/30 text-violet-700 dark:text-violet-300"
                  columns={["product_id", "name", "price"]}
                />
                <MiniTable
                  title="orders"
                  data={ordersTable}
                  color="bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                  columns={["order_id", "customer_id", "product_id", "qty"]}
                />
              </div>
              <div className="flex items-center gap-2 rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3">
                <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <p className="text-[10px] text-emerald-700 dark:text-emerald-300">
                  Each fact is stored once. Tables are linked via foreign keys (customer_id, product_id).
                  Updates only need to change one row.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
          <span className="font-mono">Redundant Data</span>
          <ArrowRight className="h-3.5 w-3.5" />
          <span className="font-mono">Separate Tables</span>
          <ArrowRight className="h-3.5 w-3.5" />
          <span className="font-mono">No Redundancy</span>
        </div>
      </CardContent>
    </Card>
  );
}
