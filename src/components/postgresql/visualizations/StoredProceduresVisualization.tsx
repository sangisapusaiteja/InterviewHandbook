"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, CheckCircle2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const createProcSQL = `CREATE OR REPLACE PROCEDURE transfer_funds(
  sender_id INT,
  receiver_id INT,
  amount DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Debit sender
  UPDATE accounts
  SET balance = balance - amount
  WHERE id = sender_id;

  -- Credit receiver
  UPDATE accounts
  SET balance = balance + amount
  WHERE id = receiver_id;

  -- Verify no negative balance
  IF (SELECT balance FROM accounts
      WHERE id = sender_id) < 0 THEN
    RAISE EXCEPTION 'Insufficient funds';
  END IF;

  COMMIT;
END;
$$;`;

const callSQL = `-- Call the procedure
CALL transfer_funds(1, 2, 500.00);`;

interface Account {
  id: number;
  name: string;
  balance: number;
}

interface FlowStep {
  label: string;
  detail: string;
  status: "pending" | "active" | "done";
}

export function StoredProceduresVisualization() {
  const [step, setStep] = useState(-1);
  const [showDiff, setShowDiff] = useState(false);

  const initialAccounts: Account[] = [
    { id: 1, name: "Alice", balance: 5000 },
    { id: 2, name: "Bob", balance: 3000 },
  ];

  const finalAccounts: Account[] = [
    { id: 1, name: "Alice", balance: 4500 },
    { id: 2, name: "Bob", balance: 3500 },
  ];

  const flowSteps: FlowStep[] = [
    { label: "CALL", detail: "transfer_funds(1, 2, 500)", status: "pending" },
    { label: "BEGIN", detail: "Start implicit transaction", status: "pending" },
    { label: "DEBIT", detail: "UPDATE accounts SET balance = balance - 500 WHERE id = 1", status: "pending" },
    { label: "CREDIT", detail: "UPDATE accounts SET balance = balance + 500 WHERE id = 2", status: "pending" },
    { label: "CHECK", detail: "Verify balance >= 0", status: "pending" },
    { label: "COMMIT", detail: "Transaction committed", status: "pending" },
  ];

  const getStepStatus = (i: number): FlowStep["status"] => {
    if (i < step) return "done";
    if (i === step) return "active";
    return "pending";
  };

  const handleRun = () => {
    setStep(0);
    setShowDiff(false);
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= flowSteps.length) {
        clearInterval(interval);
        setShowDiff(true);
        setStep(flowSteps.length);
        return;
      }
      setStep(current);
    }, 600);
  };

  const handleReset = () => {
    setStep(-1);
    setShowDiff(false);
  };

  const accounts = showDiff ? finalAccounts : initialAccounts;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Stored Procedures</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3">
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            A <strong>stored procedure</strong> is a named block of SQL/PL/pgSQL code stored
            on the server. Unlike functions, procedures can <strong>manage transactions</strong> (COMMIT/ROLLBACK)
            and are invoked with <code className="text-xs bg-emerald-500/20 px-1 py-0.5 rounded">CALL</code>.
          </p>
        </div>

        {/* SQL panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">CREATE PROCEDURE</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto max-h-[300px] overflow-y-auto">
              {createProcSQL}
            </pre>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Invoke with CALL</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
              {callSQL}
            </pre>

            {/* Procedure vs Function */}
            <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-3 space-y-2">
              <p className="text-xs font-bold text-violet-700 dark:text-violet-300">
                Procedure vs Function
              </p>
              <div className="space-y-1.5 text-xs text-violet-700 dark:text-violet-300">
                <div className="flex items-start gap-2">
                  <Settings className="h-3 w-3 mt-0.5 shrink-0" />
                  <span>Procedures: CALL, can COMMIT/ROLLBACK, no return value</span>
                </div>
                <div className="flex items-start gap-2">
                  <Settings className="h-3 w-3 mt-0.5 shrink-0" />
                  <span>Functions: SELECT/WHERE, must return a value, no transaction control</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Execution flow */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Execution Flow
          </p>
          <div className="flex items-center gap-1 overflow-x-auto py-2 px-1">
            {flowSteps.map((s, i) => {
              const status = getStepStatus(i);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-1 shrink-0"
                >
                  <div
                    className={`flex flex-col items-center gap-1 rounded-xl border px-3 py-2 min-w-[85px] transition-all ${
                      status === "done"
                        ? "bg-emerald-500/15 border-emerald-500/40"
                        : status === "active"
                        ? "bg-blue-500/15 border-blue-500/40 shadow-md"
                        : "bg-muted/20 border-border"
                    }`}
                  >
                    {status === "done" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : status === "active" ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                      >
                        <Play className="h-4 w-4 text-blue-500" />
                      </motion.div>
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                    )}
                    <span className="text-[10px] font-bold">{s.label}</span>
                    <span className="text-[9px] text-muted-foreground text-center leading-tight max-w-[80px] truncate">
                      {s.detail.slice(0, 30)}
                    </span>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  )}
                </motion.div>
              );
            })}
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleRun} disabled={step >= 0 && !showDiff}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run Procedure
            </Button>
            {(step >= 0 || showDiff) && (
              <Button size="sm" variant="outline" onClick={handleReset}>
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Account state */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Account Balances</p>
          <div className="rounded-xl border bg-muted/20 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">id</th>
                  <th className="px-3 py-2 text-left font-semibold">name</th>
                  <th className="px-3 py-2 text-right font-semibold">balance</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="wait">
                  {accounts.map((acc) => (
                    <motion.tr
                      key={acc.id + "-" + acc.balance}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`border-b last:border-b-0 ${
                        showDiff && acc.id === 1
                          ? "bg-red-500/10"
                          : showDiff && acc.id === 2
                          ? "bg-emerald-500/10"
                          : ""
                      }`}
                    >
                      <td className="px-3 py-1.5 font-mono">{acc.id}</td>
                      <td className="px-3 py-1.5 font-mono">{acc.name}</td>
                      <td className="px-3 py-1.5 text-right font-mono font-bold">
                        ${acc.balance.toLocaleString()}.00
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            {showDiff && (
              <div className="px-3 py-2 border-t bg-emerald-500/10">
                <p className="text-[10px] text-emerald-700 dark:text-emerald-300 font-medium">
                  $500 transferred from Alice to Bob -- committed
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
