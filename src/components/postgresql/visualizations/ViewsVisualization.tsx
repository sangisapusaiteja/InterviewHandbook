"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ViewTab = "concept" | "live_data" | "security";

interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
  ssn: string;
}

const baseData: Employee[] = [
  { id: 1, name: "Alice", department: "Engineering", salary: 95000, ssn: "123-45-6789" },
  { id: 2, name: "Bob", department: "Engineering", salary: 88000, ssn: "234-56-7890" },
  { id: 3, name: "Charlie", department: "Marketing", salary: 78000, ssn: "345-67-8901" },
  { id: 4, name: "Diana", department: "Marketing", salary: 82000, ssn: "456-78-9012" },
  { id: 5, name: "Eve", department: "Sales", salary: 70000, ssn: "567-89-0123" },
];

const viewSQL = `CREATE VIEW eng_salaries AS
  SELECT name, salary
  FROM employees
  WHERE department = 'Engineering';`;

const securityViewSQL = `-- Restrict sensitive columns
CREATE VIEW employee_public AS
  SELECT id, name, department
  FROM employees;
-- SSN and salary are hidden!`;

const tabInfo: Record<ViewTab, { label: string; color: string }> = {
  concept: {
    label: "What is a View?",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  },
  live_data: {
    label: "Live Data",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  },
  security: {
    label: "Security",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  },
};

const tabOrder: ViewTab[] = ["concept", "live_data", "security"];

export function ViewsVisualization() {
  const [activeTab, setActiveTab] = useState<ViewTab>("concept");
  const [showView, setShowView] = useState(false);
  const [updatedSalary, setUpdatedSalary] = useState(false);

  const currentData = updatedSalary
    ? baseData.map((e) =>
        e.name === "Alice" ? { ...e, salary: 105000 } : e
      )
    : baseData;

  const engView = currentData.filter((e) => e.department === "Engineering");

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">SQL Views</CardTitle>
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
                  setShowView(false);
                  setUpdatedSalary(false);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? t.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <Eye className="h-3 w-3" />
                {t.label}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "concept" && (
            <motion.div
              key="concept"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3">
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  A <strong>view</strong> is a saved SQL query that acts like a virtual table.
                  It stores no data itself -- each time you query the view, the underlying
                  SELECT runs automatically.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Create View</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
                  {viewSQL}
                </pre>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Base table */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">Base Table (employees)</p>
                  <div className="rounded-xl border bg-muted/20 overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b bg-muted/40">
                          <th className="px-3 py-2 text-left font-semibold">name</th>
                          <th className="px-3 py-2 text-left font-semibold">department</th>
                          <th className="px-3 py-2 text-right font-semibold">salary</th>
                        </tr>
                      </thead>
                      <tbody>
                        {baseData.map((emp, i) => (
                          <motion.tr
                            key={emp.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className={`border-b last:border-b-0 ${
                              emp.department === "Engineering"
                                ? "bg-emerald-500/15"
                                : ""
                            }`}
                          >
                            <td className="px-3 py-1.5 font-mono">{emp.name}</td>
                            <td className="px-3 py-1.5">{emp.department}</td>
                            <td className="px-3 py-1.5 text-right font-mono">
                              ${emp.salary.toLocaleString()}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* View result */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">
                    View: eng_salaries
                  </p>
                  {!showView ? (
                    <div className="rounded-xl border bg-muted/20 px-4 py-8 flex flex-col items-center justify-center gap-3 min-h-[180px]">
                      <p className="text-xs text-muted-foreground italic">
                        Query the view to see results
                      </p>
                      <Button size="sm" onClick={() => setShowView(true)}>
                        <Eye className="h-3.5 w-3.5 mr-1" /> SELECT * FROM eng_salaries
                      </Button>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-xl border bg-muted/20 overflow-hidden"
                    >
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b bg-emerald-500/15">
                            <th className="px-3 py-2 text-left font-semibold">name</th>
                            <th className="px-3 py-2 text-right font-semibold">salary</th>
                          </tr>
                        </thead>
                        <tbody>
                          {baseData
                            .filter((e) => e.department === "Engineering")
                            .map((emp) => (
                              <motion.tr
                                key={emp.id}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="border-b last:border-b-0 bg-emerald-500/10"
                              >
                                <td className="px-3 py-1.5 font-mono">{emp.name}</td>
                                <td className="px-3 py-1.5 text-right font-mono">
                                  ${emp.salary.toLocaleString()}
                                </td>
                              </motion.tr>
                            ))}
                        </tbody>
                      </table>
                      <div className="px-3 py-2 border-t bg-muted/30">
                        <p className="text-[10px] text-muted-foreground">
                          Virtual table -- no data stored, query runs each time
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "live_data" && (
            <motion.div
              key="live_data"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Views always reflect <strong>current data</strong>. When the base table
                  changes, the view automatically shows updated results.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">Base Table</p>
                  <div className="rounded-xl border bg-muted/20 overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b bg-muted/40">
                          <th className="px-3 py-2 text-left font-semibold">name</th>
                          <th className="px-3 py-2 text-left font-semibold">dept</th>
                          <th className="px-3 py-2 text-right font-semibold">salary</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentData.map((emp) => (
                          <tr
                            key={emp.id}
                            className={`border-b last:border-b-0 ${
                              emp.name === "Alice" && updatedSalary
                                ? "bg-orange-500/15"
                                : emp.department === "Engineering"
                                ? "bg-emerald-500/10"
                                : ""
                            }`}
                          >
                            <td className="px-3 py-1.5 font-mono">{emp.name}</td>
                            <td className="px-3 py-1.5">{emp.department}</td>
                            <td className="px-3 py-1.5 text-right font-mono">
                              ${emp.salary.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Button
                    size="sm"
                    variant={updatedSalary ? "outline" : "default"}
                    onClick={() => setUpdatedSalary(!updatedSalary)}
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    {updatedSalary
                      ? "Revert Alice salary"
                      : "UPDATE Alice salary to $105k"}
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">
                    View: eng_salaries (auto-updated)
                  </p>
                  <div className="rounded-xl border bg-muted/20 overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b bg-emerald-500/15">
                          <th className="px-3 py-2 text-left font-semibold">name</th>
                          <th className="px-3 py-2 text-right font-semibold">salary</th>
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence mode="wait">
                          {engView.map((emp) => (
                            <motion.tr
                              key={emp.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className={`border-b last:border-b-0 ${
                                emp.name === "Alice" && updatedSalary
                                  ? "bg-orange-500/15"
                                  : "bg-emerald-500/10"
                              }`}
                            >
                              <td className="px-3 py-1.5 font-mono">{emp.name}</td>
                              <td className="px-3 py-1.5 text-right font-mono font-bold">
                                ${emp.salary.toLocaleString()}
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                    <div className="px-3 py-2 border-t bg-muted/30">
                      <p className="text-[10px] text-muted-foreground">
                        {updatedSalary
                          ? "View reflects the updated salary automatically"
                          : "Change the base table to see the view update"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-violet-500/10 border-violet-500/30 p-3">
                <p className="text-sm text-violet-700 dark:text-violet-300">
                  Views can <strong>restrict column access</strong>. Grant users access to the
                  view instead of the base table to hide sensitive data like SSN and salary.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Security View SQL</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
                  {securityViewSQL}
                </pre>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <EyeOff className="h-3.5 w-3.5 text-red-500" />
                    <p className="text-xs font-semibold text-muted-foreground">
                      Full Table (restricted)
                    </p>
                  </div>
                  <div className="rounded-xl border bg-red-500/5 border-red-500/20 overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b bg-muted/40">
                          <th className="px-2 py-2 text-left font-semibold">id</th>
                          <th className="px-2 py-2 text-left font-semibold">name</th>
                          <th className="px-2 py-2 text-left font-semibold">dept</th>
                          <th className="px-2 py-2 text-right font-semibold text-red-500">salary</th>
                          <th className="px-2 py-2 text-right font-semibold text-red-500">ssn</th>
                        </tr>
                      </thead>
                      <tbody>
                        {baseData.map((emp) => (
                          <tr key={emp.id} className="border-b last:border-b-0">
                            <td className="px-2 py-1.5 font-mono">{emp.id}</td>
                            <td className="px-2 py-1.5 font-mono">{emp.name}</td>
                            <td className="px-2 py-1.5">{emp.department}</td>
                            <td className="px-2 py-1.5 text-right font-mono text-red-500/60">
                              ${emp.salary.toLocaleString()}
                            </td>
                            <td className="px-2 py-1.5 text-right font-mono text-red-500/60">
                              {emp.ssn}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                    <p className="text-xs font-semibold text-muted-foreground">
                      View: employee_public (safe)
                    </p>
                  </div>
                  <div className="rounded-xl border bg-emerald-500/5 border-emerald-500/20 overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b bg-emerald-500/15">
                          <th className="px-3 py-2 text-left font-semibold">id</th>
                          <th className="px-3 py-2 text-left font-semibold">name</th>
                          <th className="px-3 py-2 text-left font-semibold">department</th>
                        </tr>
                      </thead>
                      <tbody>
                        {baseData.map((emp) => (
                          <motion.tr
                            key={emp.id}
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="border-b last:border-b-0 bg-emerald-500/10"
                          >
                            <td className="px-3 py-1.5 font-mono">{emp.id}</td>
                            <td className="px-3 py-1.5 font-mono">{emp.name}</td>
                            <td className="px-3 py-1.5">{emp.department}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="px-3 py-2 border-t bg-emerald-500/10">
                      <p className="text-[10px] text-emerald-700 dark:text-emerald-300 font-medium">
                        Salary and SSN columns are not exposed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
