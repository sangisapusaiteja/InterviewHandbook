"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Database, ToggleLeft, ToggleRight, Clock, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const normalizedTables = {
  orders: [
    { order_id: 1, customer_id: 1, product_id: 1, qty: 2 },
    { order_id: 2, customer_id: 2, product_id: 3, qty: 1 },
    { order_id: 3, customer_id: 1, product_id: 2, qty: 5 },
  ],
  customers: [
    { customer_id: 1, name: "Alice", email: "alice@mail.com" },
    { customer_id: 2, name: "Bob", email: "bob@mail.com" },
  ],
  products: [
    { product_id: 1, name: "Laptop", price: 999 },
    { product_id: 2, name: "Mouse", price: 25 },
    { product_id: 3, name: "Keyboard", price: 75 },
  ],
};

const denormalizedTable = [
  { order_id: 1, customer_name: "Alice", email: "alice@mail.com", product_name: "Laptop", price: 999, qty: 2 },
  { order_id: 2, customer_name: "Bob", email: "bob@mail.com", product_name: "Keyboard", price: 75, qty: 1 },
  { order_id: 3, customer_name: "Alice", email: "alice@mail.com", product_name: "Mouse", price: 25, qty: 5 },
];

interface Metric {
  label: string;
  normalized: string;
  denormalized: string;
  icon: "clock" | "drive";
  winner: "normalized" | "denormalized";
}

const metrics: Metric[] = [
  { label: "Read Query (SELECT)", normalized: "~15ms (3 JOINs)", denormalized: "~3ms (1 table)", icon: "clock", winner: "denormalized" },
  { label: "Write Query (UPDATE)", normalized: "~2ms (1 table)", denormalized: "~12ms (many rows)", icon: "clock", winner: "normalized" },
  { label: "Storage Used", normalized: "~120 KB", denormalized: "~200 KB", icon: "drive", winner: "normalized" },
  { label: "Data Consistency", normalized: "Guaranteed", denormalized: "Risk of anomalies", icon: "drive", winner: "normalized" },
];

export function DenormalizationVisualization() {
  const [view, setView] = useState<"normalized" | "denormalized">("normalized");

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Denormalization Trade-offs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Explanation */}
        <div className="rounded-xl border bg-orange-500/10 border-orange-500/30 p-3">
          <p className="text-xs text-orange-700 dark:text-orange-300">
            <span className="font-bold">Denormalization</span> intentionally adds redundancy to improve read
            performance. It trades storage space and write complexity for faster queries.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant={view === "normalized" ? "default" : "outline"}
            onClick={() => setView("normalized")}
            className="text-xs"
          >
            <Database className="h-3 w-3 mr-1" /> Normalized (3 tables)
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setView(view === "normalized" ? "denormalized" : "normalized")} className="text-xs px-2">
            {view === "denormalized" ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
          </Button>
          <Button
            size="sm"
            variant={view === "denormalized" ? "default" : "outline"}
            onClick={() => setView("denormalized")}
            className="text-xs"
          >
            <Zap className="h-3 w-3 mr-1" /> Denormalized (1 table)
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {view === "normalized" ? (
            <motion.div
              key="norm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-3"
            >
              <p className="text-xs font-semibold text-muted-foreground">3 Separate Tables (JOINs required)</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3">
                  <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">orders</p>
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr>
                        {["order_id", "customer_id", "product_id", "qty"].map((c) => (
                          <th key={c} className="text-left px-1 py-0.5 border-b border-blue-500/20 font-semibold">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {normalizedTables.orders.map((r) => (
                        <tr key={r.order_id}>
                          <td className="px-1 py-0.5 font-mono">{r.order_id}</td>
                          <td className="px-1 py-0.5 font-mono">{r.customer_id}</td>
                          <td className="px-1 py-0.5 font-mono">{r.product_id}</td>
                          <td className="px-1 py-0.5 font-mono">{r.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3">
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2">customers</p>
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr>
                        {["customer_id", "name", "email"].map((c) => (
                          <th key={c} className="text-left px-1 py-0.5 border-b border-emerald-500/20 font-semibold">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {normalizedTables.customers.map((r) => (
                        <tr key={r.customer_id}>
                          <td className="px-1 py-0.5 font-mono">{r.customer_id}</td>
                          <td className="px-1 py-0.5">{r.name}</td>
                          <td className="px-1 py-0.5 font-mono text-[9px]">{r.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="rounded-xl border bg-violet-500/10 border-violet-500/30 p-3">
                  <p className="text-xs font-bold text-violet-700 dark:text-violet-300 mb-2">products</p>
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr>
                        {["product_id", "name", "price"].map((c) => (
                          <th key={c} className="text-left px-1 py-0.5 border-b border-violet-500/20 font-semibold">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {normalizedTables.products.map((r) => (
                        <tr key={r.product_id}>
                          <td className="px-1 py-0.5 font-mono">{r.product_id}</td>
                          <td className="px-1 py-0.5">{r.name}</td>
                          <td className="px-1 py-0.5 font-mono">{r.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <pre className="text-[10px] font-mono rounded-xl border bg-muted/40 px-3 py-2 overflow-x-auto">
{`SELECT o.order_id, c.name, p.name, p.price, o.qty
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN products p ON o.product_id = p.product_id;`}
              </pre>
            </motion.div>
          ) : (
            <motion.div
              key="denorm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <p className="text-xs font-semibold text-muted-foreground">Single Table (no JOINs needed)</p>
              <div className="rounded-xl border bg-orange-500/10 border-orange-500/30 p-3">
                <p className="text-xs font-bold text-orange-700 dark:text-orange-300 mb-2">order_details (denormalized)</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr>
                        {["order_id", "customer_name", "email", "product_name", "price", "qty"].map((c) => (
                          <th key={c} className="text-left px-1.5 py-1 border-b border-orange-500/20 font-semibold">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {denormalizedTable.map((r) => (
                        <tr key={r.order_id}>
                          <td className="px-1.5 py-0.5 font-mono">{r.order_id}</td>
                          <td className="px-1.5 py-0.5">{r.customer_name}</td>
                          <td className="px-1.5 py-0.5 font-mono text-[9px]">{r.email}</td>
                          <td className="px-1.5 py-0.5">{r.product_name}</td>
                          <td className="px-1.5 py-0.5 font-mono">{r.price}</td>
                          <td className="px-1.5 py-0.5 font-mono">{r.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <pre className="text-[10px] font-mono rounded-xl border bg-muted/40 px-3 py-2 overflow-x-auto">
{`SELECT * FROM order_details;
-- No JOINs needed! Much faster reads.`}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Performance comparison */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Performance Comparison</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-lg border bg-muted/20 p-2.5 flex items-center gap-3">
                {m.icon === "clock" ? (
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <HardDrive className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold">{m.label}</p>
                  <div className="flex gap-3 mt-0.5">
                    <span className={`text-[9px] font-mono ${m.winner === "normalized" ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-muted-foreground"}`}>
                      Norm: {m.normalized}
                    </span>
                    <span className={`text-[9px] font-mono ${m.winner === "denormalized" ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-muted-foreground"}`}>
                      Denorm: {m.denormalized}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
