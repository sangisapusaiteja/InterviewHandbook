"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle2, XCircle, Flag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TabKey = "commit" | "rollback" | "savepoint" | "nested";

interface TabInfo {
  label: string;
  color: string;
  description: string;
  sql: string;
  output: string[];
}

const tabs: Record<TabKey, TabInfo> = {
  commit: {
    label: "COMMIT",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "COMMIT permanently saves all changes made during the current transaction. Once committed, changes are durable and visible to other sessions. There is no way to undo a committed transaction.",
    sql: `BEGIN;\n\nINSERT INTO accounts (name, balance)\nVALUES ('Alice', 1000.00);\n\nUPDATE accounts\nSET balance = balance - 200\nWHERE name = 'Alice';\n\nCOMMIT;`,
    output: [
      "BEGIN",
      "INSERT 0 1",
      "UPDATE 1",
      "COMMIT",
      "",
      "-- Changes are now permanent!",
      "-- Alice's balance: 800.00",
    ],
  },
  rollback: {
    label: "ROLLBACK",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "ROLLBACK undoes all changes made during the current transaction, restoring the database to the state it was in before BEGIN was issued. Useful when an error occurs or you want to discard changes.",
    sql: `BEGIN;\n\nDELETE FROM accounts\nWHERE name = 'Alice';\n\n-- Oops! Wrong account!\nROLLBACK;\n\n-- Alice's row is still there\nSELECT * FROM accounts\nWHERE name = 'Alice';`,
    output: [
      "BEGIN",
      "DELETE 1",
      "ROLLBACK",
      "",
      " name  | balance",
      "-------+---------",
      " Alice | 800.00",
      "",
      "-- DELETE was undone! Row preserved.",
    ],
  },
  savepoint: {
    label: "SAVEPOINT",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "SAVEPOINT creates a named checkpoint within a transaction. You can ROLLBACK TO SAVEPOINT to undo changes back to that point without aborting the entire transaction. Changes before the savepoint are preserved.",
    sql: `BEGIN;\n\nINSERT INTO orders (item, qty)\nVALUES ('Widget', 10);\n\nSAVEPOINT before_discount;\n\nUPDATE orders\nSET qty = -5 WHERE item = 'Widget';\n-- Oops! Negative qty!\n\nROLLBACK TO SAVEPOINT before_discount;\n\nUPDATE orders\nSET qty = 8 WHERE item = 'Widget';\n\nCOMMIT;`,
    output: [
      "BEGIN",
      "INSERT 0 1",
      "SAVEPOINT",
      "UPDATE 1",
      "ROLLBACK TO SAVEPOINT",
      "UPDATE 1",
      "COMMIT",
      "",
      "-- qty = 8 (bad update was rolled back)",
    ],
  },
  nested: {
    label: "Nested Savepoints",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    description:
      "Savepoints can be nested. Rolling back to an outer savepoint also discards all inner savepoints created after it. This lets you create fine-grained undo points within complex transactions.",
    sql: `BEGIN;\n\nINSERT INTO log (msg) VALUES ('step 1');\nSAVEPOINT sp1;\n\nINSERT INTO log (msg) VALUES ('step 2');\nSAVEPOINT sp2;\n\nINSERT INTO log (msg) VALUES ('step 3');\n-- Undo step 3 only\nROLLBACK TO SAVEPOINT sp2;\n\nINSERT INTO log (msg) VALUES ('step 3 fixed');\nCOMMIT;`,
    output: [
      "BEGIN",
      "INSERT 0 1 -- step 1",
      "SAVEPOINT sp1",
      "INSERT 0 1 -- step 2",
      "SAVEPOINT sp2",
      "INSERT 0 1 -- step 3",
      "ROLLBACK TO SAVEPOINT sp2",
      "INSERT 0 1 -- step 3 fixed",
      "COMMIT",
      "",
      "-- Final log: step 1, step 2, step 3 fixed",
    ],
  },
};

const tabOrder: TabKey[] = ["commit", "rollback", "savepoint", "nested"];

// State diagram data
interface StateStep {
  label: string;
  color: string;
}

const stateFlows: Record<TabKey, { steps: StateStep[]; outcome: "commit" | "rollback"; outcomeLabel: string }> = {
  commit: {
    steps: [
      { label: "BEGIN", color: "bg-blue-500/20 border-blue-500/40 text-blue-700 dark:text-blue-300" },
      { label: "INSERT Alice", color: "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400" },
      { label: "UPDATE balance", color: "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400" },
    ],
    outcome: "commit",
    outcomeLabel: "COMMIT -- Changes saved permanently",
  },
  rollback: {
    steps: [
      { label: "BEGIN", color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-700 dark:text-emerald-300" },
      { label: "DELETE Alice", color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400" },
    ],
    outcome: "rollback",
    outcomeLabel: "ROLLBACK -- All changes discarded",
  },
  savepoint: {
    steps: [
      { label: "BEGIN", color: "bg-violet-500/20 border-violet-500/40 text-violet-700 dark:text-violet-300" },
      { label: "INSERT Widget", color: "bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400" },
      { label: "SAVEPOINT", color: "bg-yellow-500/20 border-yellow-500/40 text-yellow-700 dark:text-yellow-300" },
      { label: "Bad UPDATE", color: "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400 line-through" },
      { label: "ROLLBACK TO SP", color: "bg-red-500/15 border-red-500/40 text-red-600 dark:text-red-400" },
      { label: "Good UPDATE", color: "bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400" },
    ],
    outcome: "commit",
    outcomeLabel: "COMMIT -- Partial rollback preserved good data",
  },
  nested: {
    steps: [
      { label: "BEGIN", color: "bg-orange-500/20 border-orange-500/40 text-orange-700 dark:text-orange-300" },
      { label: "step 1", color: "bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400" },
      { label: "SP1", color: "bg-yellow-500/20 border-yellow-500/40 text-yellow-700 dark:text-yellow-300" },
      { label: "step 2", color: "bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400" },
      { label: "SP2", color: "bg-yellow-500/20 border-yellow-500/40 text-yellow-700 dark:text-yellow-300" },
      { label: "step 3", color: "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400 line-through" },
      { label: "ROLLBACK TO SP2", color: "bg-red-500/15 border-red-500/40 text-red-600 dark:text-red-400" },
      { label: "step 3 fixed", color: "bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400" },
    ],
    outcome: "commit",
    outcomeLabel: "COMMIT -- Nested savepoints allowed precise undo",
  },
};

export function CommitRollbackVisualization() {
  const [selected, setSelected] = useState<TabKey>("commit");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [showDiagram, setShowDiagram] = useState(false);

  const tab = tabs[selected];
  const flow = stateFlows[selected];

  const handleSelect = (key: TabKey) => {
    setSelected(key);
    setOutputLines(null);
    setShowDiagram(false);
  };

  const handleRun = () => {
    setOutputLines(tab.output);
    setShowDiagram(true);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">COMMIT & ROLLBACK</CardTitle>
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
                {key === "commit" && <CheckCircle2 className="h-3 w-3" />}
                {key === "rollback" && <XCircle className="h-3 w-3" />}
                {key === "savepoint" && <Flag className="h-3 w-3" />}
                {key === "nested" && <Flag className="h-3 w-3" />}
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

        {/* State diagram */}
        <AnimatePresence mode="wait">
          {showDiagram && (
            <motion.div
              key={`diagram-${selected}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Transaction Flow
              </p>
              <div className="flex flex-wrap items-center gap-2 py-3">
                {flow.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className={`rounded-lg border px-3 py-1.5 text-[10px] font-medium ${step.color}`}>
                      {step.label}
                    </div>
                    {i < flow.steps.length - 1 && (
                      <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                    )}
                  </motion.div>
                ))}
                <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: flow.steps.length * 0.1 }}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[10px] font-bold ${
                    flow.outcome === "commit"
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                      : "bg-red-500/20 border-red-500/40 text-red-700 dark:text-red-300"
                  }`}
                >
                  {flow.outcome === "commit" ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5" />
                  )}
                  {flow.outcomeLabel}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SQL + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Example SQL</p>
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
              {outputLines ? (
                <motion.div
                  key={`out-${selected}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[100px]"
                >
                  {outputLines.map((line, i) => (
                    <p
                      key={i}
                      className={
                        line.includes("ROLLBACK") && !line.includes("--")
                          ? "text-red-400"
                          : line.startsWith("--") || line.includes("--")
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
