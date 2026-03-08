"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ModeKey = "exists" | "not-exists" | "exists-vs-in";

interface ModeInfo {
  label: string;
  color: string;
  description: string;
  sql: string;
}

const modes: Record<ModeKey, ModeInfo> = {
  exists: {
    label: "EXISTS",
    color:
      "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "EXISTS returns TRUE as soon as the subquery finds at least one matching row. It short-circuits — once a match is found, it stops scanning the subquery and moves to the next outer row.",
    sql: `SELECT c.name
FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o
    WHERE o.customer_id = c.id
);`,
  },
  "not-exists": {
    label: "NOT EXISTS",
    color:
      "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "NOT EXISTS returns TRUE only when the subquery returns zero rows. It must scan all matching rows to confirm none exist. Useful for finding rows with no related data.",
    sql: `SELECT c.name
FROM customers c
WHERE NOT EXISTS (
    SELECT 1 FROM orders o
    WHERE o.customer_id = c.id
);`,
  },
  "exists-vs-in": {
    label: "EXISTS vs IN",
    color:
      "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "EXISTS is correlated — it runs the subquery for each outer row and short-circuits on first match. IN collects all subquery values first, then checks membership. EXISTS is often faster with large subqueries; IN can be faster with small result sets.",
    sql: `-- EXISTS (correlated, short-circuits)
SELECT c.name FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o
    WHERE o.customer_id = c.id
);

-- IN (collects all values first)
SELECT c.name FROM customers c
WHERE c.id IN (
    SELECT customer_id FROM orders
);`,
  },
};

const modeOrder: ModeKey[] = ["exists", "not-exists", "exists-vs-in"];

interface Customer {
  id: number;
  name: string;
}

interface Order {
  id: number;
  customer_id: number;
  product: string;
}

const customers: Customer[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Diana" },
  { id: 5, name: "Eve" },
];

const orders: Order[] = [
  { id: 101, customer_id: 1, product: "Laptop" },
  { id: 102, customer_id: 1, product: "Mouse" },
  { id: 103, customer_id: 3, product: "Keyboard" },
  { id: 104, customer_id: 3, product: "Monitor" },
  { id: 105, customer_id: 5, product: "Headset" },
];

function getMatchingOrders(customerId: number): Order[] {
  return orders.filter((o) => o.customer_id === customerId);
}

function hasOrders(customerId: number): boolean {
  return orders.some((o) => o.customer_id === customerId);
}

export function ExistsOperatorVisualization() {
  const [selected, setSelected] = useState<ModeKey>("exists");
  const [animating, setAnimating] = useState(false);
  const [activeCustomer, setActiveCustomer] = useState<number | null>(null);
  const [checkedCustomers, setCheckedCustomers] = useState<Set<number>>(
    new Set()
  );
  const [matchedOrders, setMatchedOrders] = useState<Set<number>>(new Set());
  const [shortCircuited, setShortCircuited] = useState<number | null>(null);

  const mode = modes[selected];

  const handleSelect = (key: ModeKey) => {
    setSelected(key);
    resetState();
  };

  const resetState = () => {
    setAnimating(false);
    setActiveCustomer(null);
    setCheckedCustomers(new Set());
    setMatchedOrders(new Set());
    setShortCircuited(null);
  };

  const runAnimation = async () => {
    resetState();
    setAnimating(true);

    for (const customer of customers) {
      setActiveCustomer(customer.id);
      setShortCircuited(null);

      const matching = getMatchingOrders(customer.id);

      if (selected === "exists" || selected === "exists-vs-in") {
        if (matching.length > 0) {
          // Show the first match (short-circuit)
          setMatchedOrders(new Set([matching[0].id]));
          await delay(600);
          setShortCircuited(matching[0].id);
          await delay(400);
        } else {
          // No match found, scan all orders briefly
          for (const order of orders) {
            setMatchedOrders(new Set([order.id]));
            await delay(200);
          }
          setMatchedOrders(new Set());
          await delay(300);
        }
      } else {
        // NOT EXISTS: must check all orders
        for (const order of orders) {
          setMatchedOrders(new Set([order.id]));
          await delay(200);
          if (order.customer_id === customer.id) {
            // Found a match, NOT EXISTS = false
            break;
          }
        }
        await delay(300);
      }

      setCheckedCustomers((prev) => new Set([...prev, customer.id]));
      setMatchedOrders(new Set());
      setShortCircuited(null);
      await delay(200);
    }

    setActiveCustomer(null);
    setAnimating(false);
  };

  const getCustomerStatus = (
    customerId: number
  ): "included" | "excluded" | "active" | "pending" => {
    if (activeCustomer === customerId) return "active";
    if (!checkedCustomers.has(customerId)) return "pending";
    const has = hasOrders(customerId);
    if (selected === "not-exists") return has ? "excluded" : "included";
    return has ? "included" : "excluded";
  };

  const getCustomerBg = (status: string) => {
    switch (status) {
      case "included":
        return "bg-emerald-500/20 border-emerald-500/50";
      case "excluded":
        return "bg-zinc-500/10 border-zinc-500/30";
      case "active":
        return "bg-blue-500/20 border-blue-500/50";
      default:
        return "bg-muted/30 border-border";
    }
  };

  const getCustomerBoolLabel = (customerId: number): string | null => {
    if (!checkedCustomers.has(customerId)) return null;
    const has = hasOrders(customerId);
    if (selected === "not-exists") return has ? "FALSE" : "TRUE";
    return has ? "TRUE" : "FALSE";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">EXISTS Operator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Mode selector */}
        <div className="flex flex-wrap gap-2">
          {modeOrder.map((key) => {
            const m = modes[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => !animating && handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? m.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <Search className="h-3 w-3" />
                {m.label}
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
            className={`rounded-xl border p-3 ${mode.color}`}
          >
            <p className="text-sm">{mode.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Interactive table visualization */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Interactive Visualization
            </p>
            <Button size="sm" onClick={runAnimation} disabled={animating}>
              <Play className="h-3.5 w-3.5 mr-1" />
              {animating ? "Running..." : "Run Query"}
            </Button>
          </div>

          <div className="flex items-start justify-center gap-6 py-4">
            {/* Customers table */}
            <div className="rounded-xl border bg-blue-500/5 p-3 min-w-[160px]">
              <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">
                customers
              </p>
              <div className="flex gap-2 text-[10px] text-muted-foreground font-semibold mb-1 px-1">
                <span className="w-6">id</span>
                <span className="flex-1">name</span>
                <span className="w-12 text-right">result</span>
              </div>
              {customers.map((c) => {
                const status = getCustomerStatus(c.id);
                const boolLabel = getCustomerBoolLabel(c.id);
                return (
                  <motion.div
                    key={c.id}
                    animate={
                      status === "active"
                        ? { scale: [1, 1.02, 1], transition: { repeat: Infinity, duration: 1 } }
                        : { scale: 1 }
                    }
                    className={`flex items-center gap-2 text-[11px] py-1 px-1 my-0.5 rounded-md border transition-colors ${getCustomerBg(
                      status
                    )}`}
                  >
                    <span className="font-mono w-6">{c.id}</span>
                    <span className="flex-1">{c.name}</span>
                    <span className="w-12 text-right">
                      {boolLabel && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`text-[9px] font-bold px-1 py-0.5 rounded ${
                            boolLabel === "TRUE"
                              ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                              : "bg-zinc-500/20 text-zinc-500"
                          }`}
                        >
                          {boolLabel}
                        </motion.span>
                      )}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Connection arrows */}
            <div className="flex flex-col items-center justify-center gap-1 pt-8">
              {activeCustomer !== null && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col items-center gap-1"
                >
                  <ArrowRight className="h-5 w-5 text-blue-500" />
                  <span className="text-[9px] text-blue-500 font-medium">
                    {selected === "not-exists" ? "scan all" : "find first"}
                  </span>
                  {shortCircuited !== null && (
                    <motion.span
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400"
                    >
                      short-circuit!
                    </motion.span>
                  )}
                </motion.div>
              )}
            </div>

            {/* Orders table */}
            <div className="rounded-xl border bg-violet-500/5 p-3 min-w-[200px]">
              <p className="text-xs font-bold text-violet-700 dark:text-violet-300 mb-2">
                orders
              </p>
              <div className="flex gap-2 text-[10px] text-muted-foreground font-semibold mb-1 px-1">
                <span className="w-6">id</span>
                <span className="w-12">cust_id</span>
                <span className="flex-1">product</span>
              </div>
              {orders.map((o) => {
                const isBeingChecked = matchedOrders.has(o.id);
                const isMatch =
                  activeCustomer !== null &&
                  o.customer_id === activeCustomer &&
                  isBeingChecked;
                const isShortCircuit = shortCircuited === o.id;
                return (
                  <motion.div
                    key={o.id}
                    animate={
                      isShortCircuit
                        ? {
                            scale: [1, 1.05, 1],
                            transition: { duration: 0.3 },
                          }
                        : {}
                    }
                    className={`flex items-center gap-2 text-[11px] py-1 px-1 my-0.5 rounded-md border transition-colors ${
                      isShortCircuit
                        ? "bg-emerald-500/30 border-emerald-500/60"
                        : isMatch
                        ? "bg-emerald-500/20 border-emerald-500/40"
                        : isBeingChecked
                        ? "bg-blue-500/15 border-blue-500/30"
                        : "bg-muted/20 border-border"
                    }`}
                  >
                    <span className="font-mono w-6">{o.id}</span>
                    <span className="font-mono w-12">{o.customer_id}</span>
                    <span className="flex-1">{o.product}</span>
                    {isShortCircuit && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[8px] font-bold text-emerald-700 dark:text-emerald-300"
                      >
                        MATCH
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Result summary after animation */}
          <AnimatePresence>
            {!animating && checkedCustomers.size === customers.length && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3"
              >
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-1">
                  Query Result
                </p>
                <div className="flex flex-wrap gap-2">
                  {customers
                    .filter((c) => {
                      const has = hasOrders(c.id);
                      return selected === "not-exists" ? !has : has;
                    })
                    .map((c) => (
                      <span
                        key={c.id}
                        className="text-xs font-mono bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md"
                      >
                        {c.name}
                      </span>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SQL */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">SQL</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {mode.sql}
          </pre>
        </div>

        {/* EXISTS vs IN comparison (only in that mode) */}
        {selected === "exists-vs-in" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Comparison
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-xl border bg-emerald-500/5 p-3 space-y-2">
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  EXISTS
                </p>
                <ul className="text-[11px] space-y-1 text-muted-foreground">
                  <li>Correlated subquery (runs per outer row)</li>
                  <li>Short-circuits on first match</li>
                  <li>Better with large subquery results</li>
                  <li>Can reference outer query columns</li>
                  <li>Handles NULL naturally</li>
                </ul>
              </div>
              <div className="rounded-xl border bg-blue-500/5 p-3 space-y-2">
                <p className="text-xs font-bold text-blue-700 dark:text-blue-300">
                  IN
                </p>
                <ul className="text-[11px] space-y-1 text-muted-foreground">
                  <li>Collects all subquery values first</li>
                  <li>Compares outer value against full list</li>
                  <li>Better with small subquery results</li>
                  <li>Cannot reference outer query columns</li>
                  <li>NULL in list causes issues (three-valued logic)</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
