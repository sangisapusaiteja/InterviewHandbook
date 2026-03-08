"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, AlertTriangle, CheckCircle, Columns } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OriginalRow {
  student_id: number;
  course_id: number;
  course_name: string;
  instructor: string;
  grade: string;
}

const originalData: OriginalRow[] = [
  { student_id: 1, course_id: 101, course_name: "Math", instructor: "Dr. Smith", grade: "A" },
  { student_id: 2, course_id: 101, course_name: "Math", instructor: "Dr. Smith", grade: "B" },
  { student_id: 1, course_id: 102, course_name: "Physics", instructor: "Dr. Jones", grade: "A" },
  { student_id: 3, course_id: 101, course_name: "Math", instructor: "Dr. Smith", grade: "C" },
  { student_id: 2, course_id: 102, course_name: "Physics", instructor: "Dr. Jones", grade: "B" },
];

const coursesTable = [
  { course_id: 101, course_name: "Math", instructor: "Dr. Smith" },
  { course_id: 102, course_name: "Physics", instructor: "Dr. Jones" },
];

const enrollmentsTable = [
  { student_id: 1, course_id: 101, grade: "A" },
  { student_id: 2, course_id: 101, grade: "B" },
  { student_id: 1, course_id: 102, grade: "A" },
  { student_id: 3, course_id: 101, grade: "C" },
  { student_id: 2, course_id: 102, grade: "B" },
];

const partialDepCells = ["course_name", "instructor"];

export function SecondNormalFormVisualization() {
  const [step, setStep] = useState<0 | 1 | 2>(0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Second Normal Form (2NF)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Explanation */}
        <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            <span className="font-bold">2NF rule:</span> Must be in 1NF, and every non-key column must depend on the
            <span className="font-bold"> entire</span> composite primary key, not just part of it.
          </p>
        </div>

        {/* Step buttons */}
        <div className="flex gap-2">
          <Button size="sm" variant={step === 0 ? "default" : "outline"} onClick={() => setStep(0)} className="text-xs">
            <AlertTriangle className="h-3 w-3 mr-1" /> Step 1: Identify Partial Dependency
          </Button>
          <Button size="sm" variant={step === 1 ? "default" : "outline"} onClick={() => setStep(1)} className="text-xs">
            <Columns className="h-3 w-3 mr-1" /> Step 2: Decompose
          </Button>
          <Button size="sm" variant={step === 2 ? "default" : "outline"} onClick={() => setStep(2)} className="text-xs">
            <CheckCircle className="h-3 w-3 mr-1" /> Step 3: Result (2NF)
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
                  enrollments (PK: student_id + course_id)
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr>
                        {["student_id", "course_id", "course_name", "instructor", "grade"].map((col) => (
                          <th
                            key={col}
                            className={`text-left px-2 py-1 border-b font-semibold ${
                              col === "student_id" || col === "course_id"
                                ? "border-blue-500/30 text-blue-700 dark:text-blue-300"
                                : partialDepCells.includes(col)
                                ? "border-red-500/30 text-red-700 dark:text-red-300"
                                : "border-border"
                            }`}
                          >
                            {col}
                            {(col === "student_id" || col === "course_id") && " [PK]"}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {originalData.map((row, i) => (
                        <tr key={i}>
                          <td className="px-2 py-1 font-mono font-bold text-blue-700 dark:text-blue-300">{row.student_id}</td>
                          <td className="px-2 py-1 font-mono font-bold text-blue-700 dark:text-blue-300">{row.course_id}</td>
                          <td className="px-2 py-1 font-mono bg-red-500/15 text-red-700 dark:text-red-300">{row.course_name}</td>
                          <td className="px-2 py-1 font-mono bg-red-500/15 text-red-700 dark:text-red-300">{row.instructor}</td>
                          <td className="px-2 py-1 font-mono">{row.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-[10px] text-red-700 dark:text-red-300">
                    <span className="font-bold">Partial dependency found:</span> course_name and instructor depend only on
                    course_id (part of the composite key), NOT on the full key (student_id + course_id).
                  </p>
                </div>
              </div>

              {/* Dependency arrows */}
              <div className="flex items-center justify-center gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-blue-500/15 font-mono text-blue-700 dark:text-blue-300">course_id</span>
                <ArrowRight className="h-3.5 w-3.5 text-red-500" />
                <span className="px-2 py-1 rounded bg-red-500/15 font-mono text-red-700 dark:text-red-300">course_name, instructor</span>
                <span className="text-muted-foreground ml-2">(partial dependency)</span>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="rounded-xl border bg-orange-500/10 border-orange-500/30 p-3 min-w-[200px]">
                  <p className="text-xs font-bold text-orange-700 dark:text-orange-300 mb-1">Original table</p>
                  <p className="text-[9px] text-muted-foreground font-mono">
                    student_id, course_id, course_name, instructor, grade
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
                <div className="space-y-2">
                  <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">courses</p>
                    <p className="text-[9px] text-muted-foreground font-mono">
                      course_id [PK], course_name, instructor
                    </p>
                  </div>
                  <div className="rounded-xl border bg-violet-500/10 border-violet-500/30 p-3">
                    <p className="text-xs font-bold text-violet-700 dark:text-violet-300">enrollments</p>
                    <p className="text-[9px] text-muted-foreground font-mono">
                      student_id [PK], course_id [PK,FK], grade
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border bg-orange-500/10 border-orange-500/30 p-3">
                <p className="text-[10px] text-orange-700 dark:text-orange-300">
                  Move the partially dependent columns (course_name, instructor) to a new table keyed by
                  the part of the key they depend on (course_id).
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
                <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3">
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2">courses</p>
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr>
                        <th className="text-left px-1.5 py-1 border-b border-emerald-500/20 font-semibold">course_id [PK]</th>
                        <th className="text-left px-1.5 py-1 border-b border-emerald-500/20 font-semibold">course_name</th>
                        <th className="text-left px-1.5 py-1 border-b border-emerald-500/20 font-semibold">instructor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coursesTable.map((r) => (
                        <tr key={r.course_id}>
                          <td className="px-1.5 py-0.5 font-mono font-bold">{r.course_id}</td>
                          <td className="px-1.5 py-0.5">{r.course_name}</td>
                          <td className="px-1.5 py-0.5">{r.instructor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="rounded-xl border bg-violet-500/10 border-violet-500/30 p-3">
                  <p className="text-xs font-bold text-violet-700 dark:text-violet-300 mb-2">enrollments</p>
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr>
                        <th className="text-left px-1.5 py-1 border-b border-violet-500/20 font-semibold">student_id [PK]</th>
                        <th className="text-left px-1.5 py-1 border-b border-violet-500/20 font-semibold">course_id [PK,FK]</th>
                        <th className="text-left px-1.5 py-1 border-b border-violet-500/20 font-semibold">grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollmentsTable.map((r, i) => (
                        <tr key={i}>
                          <td className="px-1.5 py-0.5 font-mono">{r.student_id}</td>
                          <td className="px-1.5 py-0.5 font-mono">{r.course_id}</td>
                          <td className="px-1.5 py-0.5 font-mono">{r.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3">
                <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <p className="text-[10px] text-emerald-700 dark:text-emerald-300">
                  2NF achieved: every non-key column depends on the entire primary key.
                  No more partial dependencies.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
