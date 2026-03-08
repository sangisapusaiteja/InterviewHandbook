"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, AlertTriangle, CheckCircle, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OriginalRow {
  emp_id: number;
  emp_name: string;
  dept_id: number;
  dept_name: string;
  dept_location: string;
}

const originalData: OriginalRow[] = [
  { emp_id: 1, emp_name: "Alice", dept_id: 10, dept_name: "Engineering", dept_location: "Floor 3" },
  { emp_id: 2, emp_name: "Bob", dept_id: 20, dept_name: "Marketing", dept_location: "Floor 2" },
  { emp_id: 3, emp_name: "Carol", dept_id: 10, dept_name: "Engineering", dept_location: "Floor 3" },
  { emp_id: 4, emp_name: "Dave", dept_id: 30, dept_name: "Sales", dept_location: "Floor 1" },
  { emp_id: 5, emp_name: "Eve", dept_id: 20, dept_name: "Marketing", dept_location: "Floor 2" },
];

const employeesTable = [
  { emp_id: 1, emp_name: "Alice", dept_id: 10 },
  { emp_id: 2, emp_name: "Bob", dept_id: 20 },
  { emp_id: 3, emp_name: "Carol", dept_id: 10 },
  { emp_id: 4, emp_name: "Dave", dept_id: 30 },
  { emp_id: 5, emp_name: "Eve", dept_id: 20 },
];

const departmentsTable = [
  { dept_id: 10, dept_name: "Engineering", dept_location: "Floor 3" },
  { dept_id: 20, dept_name: "Marketing", dept_location: "Floor 2" },
  { dept_id: 30, dept_name: "Sales", dept_location: "Floor 1" },
];

export function ThirdNormalFormVisualization() {
  const [step, setStep] = useState<0 | 1 | 2>(0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Third Normal Form (3NF)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Explanation */}
        <div className="rounded-xl border bg-violet-500/10 border-violet-500/30 p-3">
          <p className="text-xs text-violet-700 dark:text-violet-300">
            <span className="font-bold">3NF rule:</span> Must be in 2NF, and no non-key column can depend on
            another non-key column (no transitive dependencies).
          </p>
        </div>

        {/* Step buttons */}
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant={step === 0 ? "default" : "outline"} onClick={() => setStep(0)} className="text-xs">
            <AlertTriangle className="h-3 w-3 mr-1" /> Identify Transitive Dep
          </Button>
          <Button size="sm" variant={step === 1 ? "default" : "outline"} onClick={() => setStep(1)} className="text-xs">
            <GitBranch className="h-3 w-3 mr-1" /> Dependency Diagram
          </Button>
          <Button size="sm" variant={step === 2 ? "default" : "outline"} onClick={() => setStep(2)} className="text-xs">
            <CheckCircle className="h-3 w-3 mr-1" /> Result (3NF)
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="rounded-xl border bg-red-500/10 border-red-500/30 p-3">
                <p className="text-xs font-bold text-red-700 dark:text-red-300 mb-2">
                  employees (PK: emp_id) -- has transitive dependency
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr>
                        {["emp_id", "emp_name", "dept_id", "dept_name", "dept_location"].map((col) => (
                          <th
                            key={col}
                            className={`text-left px-2 py-1 border-b font-semibold ${
                              col === "emp_id"
                                ? "border-blue-500/30 text-blue-700 dark:text-blue-300"
                                : col === "dept_name" || col === "dept_location"
                                ? "border-red-500/30 text-red-700 dark:text-red-300"
                                : "border-border"
                            }`}
                          >
                            {col}
                            {col === "emp_id" && " [PK]"}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {originalData.map((row) => (
                        <tr key={row.emp_id}>
                          <td className="px-2 py-1 font-mono font-bold text-blue-700 dark:text-blue-300">{row.emp_id}</td>
                          <td className="px-2 py-1">{row.emp_name}</td>
                          <td className="px-2 py-1 font-mono">{row.dept_id}</td>
                          <td className="px-2 py-1 bg-red-500/15 text-red-700 dark:text-red-300">{row.dept_name}</td>
                          <td className="px-2 py-1 bg-red-500/15 text-red-700 dark:text-red-300">{row.dept_location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[9px] text-red-600 dark:text-red-400 mt-2">
                  dept_name and dept_location depend on dept_id, not on emp_id (the primary key).
                  This is a transitive dependency: emp_id -{">"} dept_id -{">"} dept_name/dept_location.
                </p>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <p className="text-xs font-semibold text-muted-foreground">Dependency Diagram</p>

              {/* Transitive chain */}
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="px-3 py-2 rounded-lg bg-blue-500/15 border border-blue-500/40"
                >
                  <p className="text-xs font-bold text-blue-700 dark:text-blue-300">emp_id</p>
                  <p className="text-[9px] text-muted-foreground">(Primary Key)</p>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  <ArrowRight className="h-5 w-5 text-emerald-500" />
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="px-3 py-2 rounded-lg bg-orange-500/15 border border-orange-500/40"
                >
                  <p className="text-xs font-bold text-orange-700 dark:text-orange-300">dept_id</p>
                  <p className="text-[9px] text-muted-foreground">(Non-key)</p>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <ArrowRight className="h-5 w-5 text-red-500" />
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="px-3 py-2 rounded-lg bg-red-500/15 border border-red-500/40"
                >
                  <p className="text-xs font-bold text-red-700 dark:text-red-300">dept_name</p>
                  <p className="text-xs font-bold text-red-700 dark:text-red-300">dept_location</p>
                  <p className="text-[9px] text-muted-foreground">(Transitive)</p>
                </motion.div>
              </div>

              <div className="rounded-xl border bg-orange-500/10 border-orange-500/30 p-3 text-center">
                <p className="text-[10px] text-orange-700 dark:text-orange-300">
                  <span className="font-bold">A -{">"} B -{">"} C</span> means C transitively depends on A through B.
                  To achieve 3NF, move B and C into their own table.
                </p>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3">
                  <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">employees</p>
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr>
                        <th className="text-left px-1.5 py-1 border-b border-blue-500/20 font-semibold">emp_id [PK]</th>
                        <th className="text-left px-1.5 py-1 border-b border-blue-500/20 font-semibold">emp_name</th>
                        <th className="text-left px-1.5 py-1 border-b border-blue-500/20 font-semibold">dept_id [FK]</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeesTable.map((r) => (
                        <tr key={r.emp_id}>
                          <td className="px-1.5 py-0.5 font-mono font-bold">{r.emp_id}</td>
                          <td className="px-1.5 py-0.5">{r.emp_name}</td>
                          <td className="px-1.5 py-0.5 font-mono">{r.dept_id}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3">
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2">departments</p>
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr>
                        <th className="text-left px-1.5 py-1 border-b border-emerald-500/20 font-semibold">dept_id [PK]</th>
                        <th className="text-left px-1.5 py-1 border-b border-emerald-500/20 font-semibold">dept_name</th>
                        <th className="text-left px-1.5 py-1 border-b border-emerald-500/20 font-semibold">dept_location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentsTable.map((r) => (
                        <tr key={r.dept_id}>
                          <td className="px-1.5 py-0.5 font-mono font-bold">{r.dept_id}</td>
                          <td className="px-1.5 py-0.5">{r.dept_name}</td>
                          <td className="px-1.5 py-0.5">{r.dept_location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3">
                <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <p className="text-[10px] text-emerald-700 dark:text-emerald-300">
                  3NF achieved: no non-key column depends on another non-key column. Every non-key column
                  depends directly on the primary key only.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
