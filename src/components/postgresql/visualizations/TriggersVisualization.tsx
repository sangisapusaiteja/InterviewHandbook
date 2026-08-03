"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ArrowRight, Play, Clock, Table2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TriggerTab = "lifecycle" | "audit_example" | "granularity";

const tabInfo: Record<TriggerTab, { label: string; color: string }> = {
  lifecycle: {
    label: "Trigger Lifecycle",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  },
  audit_example: {
    label: "Audit Log Example",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  },
  granularity: {
    label: "Row vs Statement",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  },
};

const tabOrder: TriggerTab[] = ["lifecycle", "audit_example", "granularity"];

interface TimingEvent {
  timing: string;
  event: string;
  color: string;
}

const timingEvents: TimingEvent[] = [
  { timing: "BEFORE", event: "INSERT", color: "bg-emerald-500/15 border-emerald-500/30" },
  { timing: "BEFORE", event: "UPDATE", color: "bg-blue-500/15 border-blue-500/30" },
  { timing: "BEFORE", event: "DELETE", color: "bg-violet-500/15 border-violet-500/30" },
  { timing: "AFTER", event: "INSERT", color: "bg-emerald-500/15 border-emerald-500/30" },
  { timing: "AFTER", event: "UPDATE", color: "bg-blue-500/15 border-blue-500/30" },
  { timing: "AFTER", event: "DELETE", color: "bg-violet-500/15 border-violet-500/30" },
];

const auditFnSQL = `-- 1. Create trigger function
CREATE FUNCTION audit_changes()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (
    table_name, action, old_data,
    new_data, changed_at
  ) VALUES (
    TG_TABLE_NAME, TG_OP,
    row_to_json(OLD),
    row_to_json(NEW),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;`;

const auditTriggerSQL = `-- 2. Attach trigger to table
CREATE TRIGGER employees_audit
  AFTER INSERT OR UPDATE OR DELETE
  ON employees
  FOR EACH ROW
  EXECUTE FUNCTION audit_changes();`;

interface AuditEntry {
  action: string;
  old_data: string;
  new_data: string;
  time: string;
}

const auditSteps: AuditEntry[] = [
  {
    action: "UPDATE",
    old_data: '{"name":"Alice","salary":90000}',
    new_data: '{"name":"Alice","salary":95000}',
    time: "14:32:01",
  },
  {
    action: "INSERT",
    old_data: "null",
    new_data: '{"name":"Frank","salary":72000}',
    time: "14:32:15",
  },
  {
    action: "DELETE",
    old_data: '{"name":"Bob","salary":88000}',
    new_data: "null",
    time: "14:33:02",
  },
];

export function TriggersVisualization() {
  const [activeTab, setActiveTab] = useState<TriggerTab>("lifecycle");
  const [animStep, setAnimStep] = useState(-1);
  const [auditVisible, setAuditVisible] = useState(0);

  const handleAnimate = () => {
    setAnimStep(0);
    setTimeout(() => setAnimStep(1), 700);
    setTimeout(() => setAnimStep(2), 1400);
    setTimeout(() => setAnimStep(3), 2100);
  };

  const handleShowAudit = () => {
    setAuditVisible(0);
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setAuditVisible(count);
      if (count >= auditSteps.length) clearInterval(interval);
    }, 600);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">PostgreSQL Triggers</CardTitle>
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
                  setAnimStep(-1);
                  setAuditVisible(0);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? t.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <Zap className="h-3 w-3" />
                {t.label}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "lifecycle" && (
            <motion.div
              key="lifecycle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3">
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  Triggers fire automatically <strong>BEFORE</strong> or <strong>AFTER</strong> a
                  data-modifying event (INSERT, UPDATE, DELETE). They execute a trigger function
                  you define.
                </p>
              </div>

              {/* Timing grid */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Trigger Matrix</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1" />
                  {["INSERT", "UPDATE", "DELETE"].map((ev) => (
                    <div key={ev} className="text-center text-[10px] font-bold text-muted-foreground">
                      {ev}
                    </div>
                  ))}
                </div>
                {["BEFORE", "AFTER"].map((timing) => (
                  <div key={timing} className="grid grid-cols-3 gap-2">
                    {timingEvents
                      .filter((te) => te.timing === timing)
                      .map((te) => (
                        <motion.div
                          key={te.timing + te.event}
                          whileHover={{ scale: 1.05 }}
                          className={`rounded-lg border p-2 text-center cursor-default ${te.color}`}
                        >
                          <p className="text-[10px] font-bold">{te.timing}</p>
                          <p className="text-[9px] text-muted-foreground">{te.event}</p>
                        </motion.div>
                      ))}
                  </div>
                ))}
              </div>

              {/* Animated flow */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Trigger Flow (AFTER UPDATE)</p>
                <div className="flex items-center gap-1 overflow-x-auto py-2">
                  {[
                    { label: "UPDATE fires", step: 0 },
                    { label: "AFTER trigger", step: 1 },
                    { label: "Function runs", step: 2 },
                    { label: "Complete", step: 3 },
                  ].map((item, i) => (
                    <div key={item.label} className="flex items-center gap-1 shrink-0">
                      <motion.div
                        animate={{
                          scale: animStep === item.step ? 1.1 : 1,
                          boxShadow:
                            animStep === item.step
                              ? "0 0 12px rgba(16, 185, 129, 0.4)"
                              : "none",
                        }}
                        className={`rounded-xl border px-3 py-2 min-w-[90px] text-center transition-colors ${
                          animStep >= item.step
                            ? "bg-emerald-500/15 border-emerald-500/40"
                            : "bg-muted/20 border-border"
                        }`}
                      >
                        <Zap className={`h-3.5 w-3.5 mx-auto mb-1 ${animStep >= item.step ? "text-emerald-500" : "text-muted-foreground"}`} />
                        <p className="text-[10px] font-medium">{item.label}</p>
                      </motion.div>
                      {i < 3 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
                    </div>
                  ))}
                </div>
                <Button size="sm" onClick={handleAnimate}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Animate Flow
                </Button>
              </div>
            </motion.div>
          )}

          {activeTab === "audit_example" && (
            <motion.div
              key="audit_example"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  A common use case: automatically log every change to a table into an
                  <strong> audit_log</strong> table using a trigger.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">Trigger Function</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto max-h-[220px] overflow-y-auto">
                    {auditFnSQL}
                  </pre>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">Create Trigger</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
                    {auditTriggerSQL}
                  </pre>
                </div>
              </div>

              {/* Audit log result */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <p className="text-xs font-semibold text-muted-foreground">Audit Log Output</p>
                  <Button size="sm" onClick={handleShowAudit}>
                    <Play className="h-3.5 w-3.5 mr-1" /> Simulate Changes
                  </Button>
                </div>
                <div className="rounded-xl border bg-muted/20 overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b bg-muted/40">
                        <th className="px-2 py-2 text-left font-semibold">action</th>
                        <th className="px-2 py-2 text-left font-semibold">old_data</th>
                        <th className="px-2 py-2 text-left font-semibold">new_data</th>
                        <th className="px-2 py-2 text-right font-semibold">time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {auditSteps.slice(0, auditVisible).map((entry, i) => (
                          <motion.tr
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`border-b last:border-b-0 ${
                              entry.action === "INSERT"
                                ? "bg-emerald-500/10"
                                : entry.action === "UPDATE"
                                ? "bg-blue-500/10"
                                : "bg-red-500/10"
                            }`}
                          >
                            <td className="px-2 py-1.5 font-mono font-bold">{entry.action}</td>
                            <td className="px-2 py-1.5 font-mono text-[10px] max-w-[150px] truncate">
                              {entry.old_data}
                            </td>
                            <td className="px-2 py-1.5 font-mono text-[10px] max-w-[150px] truncate">
                              {entry.new_data}
                            </td>
                            <td className="px-2 py-1.5 text-right font-mono">{entry.time}</td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                      {auditVisible === 0 && (
                        <tr>
                          <td colSpan={4} className="px-3 py-4 text-center text-muted-foreground italic text-xs">
                            No audit entries yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "granularity" && (
            <motion.div
              key="granularity"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-violet-500/10 border-violet-500/30 p-3">
                <p className="text-sm text-violet-700 dark:text-violet-300">
                  Triggers can fire <strong>FOR EACH ROW</strong> (once per affected row) or
                  <strong> FOR EACH STATEMENT</strong> (once per SQL statement, regardless of rows).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* FOR EACH ROW */}
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Table2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      FOR EACH ROW
                    </p>
                  </div>
                  <pre className="text-[10px] font-mono bg-background/60 rounded-lg p-2 whitespace-pre overflow-x-auto">
{`UPDATE employees SET salary = salary * 1.1
WHERE department = 'Engineering';
-- 5 rows updated`}</pre>
                  <div className="space-y-1">
                    {["Row 1: Alice", "Row 2: Bob", "Row 3: Charlie", "Row 4: Diana", "Row 5: Eve"].map((r) => (
                      <div key={r} className="flex items-center gap-2 text-[10px]">
                        <Zap className="h-3 w-3 text-emerald-500 shrink-0" />
                        <span className="text-emerald-700 dark:text-emerald-300">Trigger fires: {r}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                    Fires 5 times (once per row)
                  </p>
                </div>

                {/* FOR EACH STATEMENT */}
                <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-300">
                      FOR EACH STATEMENT
                    </p>
                  </div>
                  <pre className="text-[10px] font-mono bg-background/60 rounded-lg p-2 whitespace-pre overflow-x-auto">
{`UPDATE employees SET salary = salary * 1.1
WHERE department = 'Engineering';
-- 5 rows updated`}</pre>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px]">
                      <Zap className="h-3 w-3 text-blue-500 shrink-0" />
                      <span className="text-blue-700 dark:text-blue-300">Trigger fires once for entire UPDATE</span>
                    </div>
                  </div>
                  <p className="text-[10px] font-bold text-blue-700 dark:text-blue-300">
                    Fires 1 time (regardless of row count)
                  </p>
                  <p className="text-[9px] text-muted-foreground">
                    OLD/NEW not available -- use for notifications or logging the statement itself
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
