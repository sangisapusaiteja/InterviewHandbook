"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ShieldCheck, ArrowRight, CheckCircle2, XCircle, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TabKey = "acid" | "begin_commit" | "rollback" | "savepoint";

interface TabInfo {
  label: string;
  color: string;
  description: string;
  sql: string;
  output: string[];
}

const tabs: Record<TabKey, TabInfo> = {
  acid: {
    label: "ACID Properties",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "ACID guarantees reliable transactions. Atomicity: all-or-nothing. Consistency: data stays valid. Isolation: concurrent transactions don't interfere. Durability: committed data survives crashes.",
    sql: `-- ACID in action: transferring funds
BEGIN;

-- Atomicity: both statements succeed or neither does
UPDATE accounts SET balance = balance - 500
  WHERE id = 1;
UPDATE accounts SET balance = balance + 500
  WHERE id = 2;

-- Consistency: CHECK constraints verified
-- Isolation: other transactions see old balances
-- Durability: once committed, data is on disk
COMMIT;`,
    output: [
      "BEGIN",
      "UPDATE 1 -- debit account 1",
      "UPDATE 1 -- credit account 2",
      "COMMIT",
      "",
      "-- Atomicity:   Both UPDATEs applied together",
      "-- Consistency: balance CHECK (balance >= 0) holds",
      "-- Isolation:   Other sessions see old values until COMMIT",
      "-- Durability:  Data persisted to WAL on disk",
    ],
  },
  begin_commit: {
    label: "BEGIN...COMMIT",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "BEGIN starts a transaction block. All statements inside execute as a single unit. COMMIT makes all changes permanent. Until COMMIT, other sessions cannot see the changes.",
    sql: `BEGIN;

INSERT INTO orders (customer_id, total)
VALUES (42, 199.99);

INSERT INTO order_items (order_id, product_id, qty)
VALUES (currval('orders_id_seq'), 7, 2);

UPDATE inventory
SET stock = stock - 2
WHERE product_id = 7;

COMMIT;`,
    output: [
      "BEGIN",
      "INSERT 0 1 -- order created",
      "INSERT 0 1 -- order item added",
      "UPDATE 1   -- inventory decremented",
      "COMMIT     -- all 3 changes are now permanent",
      "",
      "-- Without BEGIN/COMMIT each statement",
      "-- auto-commits independently (risky!)",
    ],
  },
  rollback: {
    label: "ROLLBACK",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "ROLLBACK undoes all changes made since BEGIN. Use it when an error occurs or a business rule fails. After ROLLBACK, the database is exactly as it was before BEGIN.",
    sql: `BEGIN;

UPDATE accounts SET balance = balance - 1000
WHERE id = 1;

-- Oops, recipient account doesn't exist!
UPDATE accounts SET balance = balance + 1000
WHERE id = 999;
-- UPDATE 0 (no rows affected)

-- Something went wrong, undo everything
ROLLBACK;

-- Account 1 balance is unchanged!
SELECT balance FROM accounts WHERE id = 1;`,
    output: [
      "BEGIN",
      "UPDATE 1   -- debit applied (tentatively)",
      "UPDATE 0   -- no matching row for id=999!",
      "ROLLBACK   -- all changes undone",
      "",
      " balance",
      "---------",
      " 5000.00  -- original balance restored",
    ],
  },
  savepoint: {
    label: "SAVEPOINT",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    description:
      "SAVEPOINT creates a named checkpoint inside a transaction. ROLLBACK TO undoes changes back to that savepoint without aborting the entire transaction. Useful for partial error recovery.",
    sql: `BEGIN;

INSERT INTO orders (customer_id, total)
VALUES (42, 300.00);

SAVEPOINT order_created;

-- Try to apply a coupon
UPDATE coupons SET used = true
WHERE code = 'SAVE20' AND used = false;
-- UPDATE 0 (coupon already used!)

-- Undo only the coupon step
ROLLBACK TO order_created;

-- Order is still intact, proceed without coupon
UPDATE orders SET status = 'confirmed'
WHERE customer_id = 42;

COMMIT;`,
    output: [
      "BEGIN",
      "INSERT 0 1       -- order created",
      "SAVEPOINT order_created",
      "UPDATE 0         -- coupon not available",
      "ROLLBACK TO SAVEPOINT order_created",
      "UPDATE 1         -- order confirmed (no coupon)",
      "COMMIT           -- order saved without coupon",
    ],
  },
};

const tabOrder: TabKey[] = ["acid", "begin_commit", "rollback", "savepoint"];

interface TimelineStep {
  label: string;
  icon: "begin" | "operation" | "savepoint" | "commit" | "rollback";
  status: "success" | "error" | "neutral" | "checkpoint";
}

const timelines: Record<TabKey, TimelineStep[]> = {
  acid: [
    { label: "BEGIN", icon: "begin", status: "neutral" },
    { label: "Debit $500", icon: "operation", status: "success" },
    { label: "Credit $500", icon: "operation", status: "success" },
    { label: "Constraints OK", icon: "operation", status: "success" },
    { label: "COMMIT", icon: "commit", status: "success" },
  ],
  begin_commit: [
    { label: "BEGIN", icon: "begin", status: "neutral" },
    { label: "INSERT order", icon: "operation", status: "success" },
    { label: "INSERT item", icon: "operation", status: "success" },
    { label: "UPDATE stock", icon: "operation", status: "success" },
    { label: "COMMIT", icon: "commit", status: "success" },
  ],
  rollback: [
    { label: "BEGIN", icon: "begin", status: "neutral" },
    { label: "Debit $1000", icon: "operation", status: "success" },
    { label: "Credit id=999", icon: "operation", status: "error" },
    { label: "ROLLBACK", icon: "rollback", status: "error" },
  ],
  savepoint: [
    { label: "BEGIN", icon: "begin", status: "neutral" },
    { label: "INSERT order", icon: "operation", status: "success" },
    { label: "SAVEPOINT", icon: "savepoint", status: "checkpoint" },
    { label: "Apply coupon", icon: "operation", status: "error" },
    { label: "ROLLBACK TO", icon: "rollback", status: "checkpoint" },
    { label: "Confirm order", icon: "operation", status: "success" },
    { label: "COMMIT", icon: "commit", status: "success" },
  ],
};

function StepIcon({ step }: { step: TimelineStep }) {
  const base = "h-5 w-5";
  switch (step.status) {
    case "success":
      return <CheckCircle2 className={`${base} text-emerald-500`} />;
    case "error":
      return <XCircle className={`${base} text-red-500`} />;
    case "checkpoint":
      return <Flag className={`${base} text-orange-500`} />;
    default:
      return <ArrowRight className={`${base} text-blue-500`} />;
  }
}

export function TransactionsVisualization() {
  const [selected, setSelected] = useState<TabKey>("acid");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];
  const timeline = timelines[selected];

  const handleSelect = (key: TabKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">PostgreSQL Transactions</CardTitle>
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
                <ShieldCheck className="h-3 w-3" />
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

        {/* Transaction timeline */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Transaction Flow
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1 overflow-x-auto py-3 px-1"
            >
              {timeline.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-1 shrink-0"
                >
                  <div
                    className={`flex flex-col items-center gap-1 rounded-xl border px-3 py-2 min-w-[80px] ${
                      step.status === "success"
                        ? "bg-emerald-500/10 border-emerald-500/30"
                        : step.status === "error"
                        ? "bg-red-500/10 border-red-500/30"
                        : step.status === "checkpoint"
                        ? "bg-orange-500/10 border-orange-500/30"
                        : "bg-blue-500/10 border-blue-500/30"
                    }`}
                  >
                    <StepIcon step={step} />
                    <span className="text-[10px] font-medium text-center leading-tight">
                      {step.label}
                    </span>
                  </div>
                  {i < timeline.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* SQL + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Example SQL</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]">
              {tab.sql}
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
                        line.includes("ERROR") || line.includes("ROLLBACK")
                          ? "text-red-400"
                          : line === ""
                          ? ""
                          : line.includes("COMMIT") || line.includes("Success") || line.includes("INSERT") || line.includes("UPDATE")
                          ? "text-emerald-400"
                          : "text-zinc-400"
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
