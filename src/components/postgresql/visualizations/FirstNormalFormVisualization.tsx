"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, AlertTriangle, CheckCircle, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ViolatingRow {
  student_id: number;
  name: string;
  phone_numbers: string;
  courses: string;
}

interface EnrollmentRow {
  student_id: number;
  course: string;
}

const violatingData: ViolatingRow[] = [
  { student_id: 1, name: "Alice", phone_numbers: "555-0101, 555-0102", courses: "Math, Physics" },
  { student_id: 2, name: "Bob", phone_numbers: "555-0201", courses: "Math, Chemistry, Biology" },
  { student_id: 3, name: "Carol", phone_numbers: "555-0301, 555-0302, 555-0303", courses: "Physics" },
];

const normalizedStudents: Array<{ student_id: number; name: string }> = [
  { student_id: 1, name: "Alice" },
  { student_id: 2, name: "Bob" },
  { student_id: 3, name: "Carol" },
];

const normalizedPhones: Array<{ student_id: number; phone: string }> = [
  { student_id: 1, phone: "555-0101" },
  { student_id: 1, phone: "555-0102" },
  { student_id: 2, phone: "555-0201" },
  { student_id: 3, phone: "555-0301" },
  { student_id: 3, phone: "555-0302" },
  { student_id: 3, phone: "555-0303" },
];

const normalizedEnrollments: EnrollmentRow[] = [
  { student_id: 1, course: "Math" },
  { student_id: 1, course: "Physics" },
  { student_id: 2, course: "Math" },
  { student_id: 2, course: "Chemistry" },
  { student_id: 2, course: "Biology" },
  { student_id: 3, course: "Physics" },
];

const rules = [
  { label: "Atomic values", desc: "Each cell contains a single value, not a list" },
  { label: "No repeating groups", desc: "No arrays or comma-separated values in columns" },
  { label: "Unique rows", desc: "Each row is uniquely identifiable" },
  { label: "Same type per column", desc: "All values in a column share the same data type" },
];

export function FirstNormalFormVisualization() {
  const [showNormalized, setShowNormalized] = useState(false);
  const [highlightedRule, setHighlightedRule] = useState<number | null>(null);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">First Normal Form (1NF)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Rules */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {rules.map((rule, i) => (
            <motion.button
              key={i}
              onHoverStart={() => setHighlightedRule(i)}
              onHoverEnd={() => setHighlightedRule(null)}
              className={`rounded-lg border p-2 text-left transition-all ${
                highlightedRule === i
                  ? "bg-blue-500/15 border-blue-500/40"
                  : "bg-muted/30 border-border"
              }`}
            >
              <p className="text-[10px] font-bold">{rule.label}</p>
              <p className="text-[9px] text-muted-foreground">{rule.desc}</p>
            </motion.button>
          ))}
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant={!showNormalized ? "default" : "outline"}
            onClick={() => setShowNormalized(false)}
            className="text-xs"
          >
            <AlertTriangle className="h-3 w-3 mr-1" /> Before (Violates 1NF)
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setShowNormalized(!showNormalized)} className="text-xs px-2">
            {showNormalized ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
          </Button>
          <Button
            size="sm"
            variant={showNormalized ? "default" : "outline"}
            onClick={() => setShowNormalized(true)}
            className="text-xs"
          >
            <CheckCircle className="h-3 w-3 mr-1" /> After (1NF)
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {!showNormalized ? (
            <motion.div
              key="before"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="rounded-xl border bg-red-500/10 border-red-500/30 p-3">
                <p className="text-xs font-bold text-red-700 dark:text-red-300 mb-2">
                  Violates 1NF: Multi-valued columns
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr>
                        <th className="text-left px-2 py-1 border-b border-red-500/20 font-semibold">student_id</th>
                        <th className="text-left px-2 py-1 border-b border-red-500/20 font-semibold">name</th>
                        <th className="text-left px-2 py-1 border-b border-red-500/20 font-semibold">phone_numbers</th>
                        <th className="text-left px-2 py-1 border-b border-red-500/20 font-semibold">courses</th>
                      </tr>
                    </thead>
                    <tbody>
                      {violatingData.map((row) => (
                        <tr key={row.student_id}>
                          <td className="px-2 py-1 font-mono">{row.student_id}</td>
                          <td className="px-2 py-1">{row.name}</td>
                          <td className="px-2 py-1 bg-red-500/20 font-mono text-red-700 dark:text-red-300">
                            {row.phone_numbers}
                          </td>
                          <td className="px-2 py-1 bg-red-500/20 font-mono text-red-700 dark:text-red-300">
                            {row.courses}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[9px] text-red-600 dark:text-red-400 mt-2">
                  Problem: phone_numbers and courses contain multiple values in a single cell
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="after"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Students */}
                <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3">
                  <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">students</p>
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr>
                        <th className="text-left px-1.5 py-1 border-b border-blue-500/20 font-semibold">student_id</th>
                        <th className="text-left px-1.5 py-1 border-b border-blue-500/20 font-semibold">name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {normalizedStudents.map((r) => (
                        <tr key={r.student_id}>
                          <td className="px-1.5 py-0.5 font-mono">{r.student_id}</td>
                          <td className="px-1.5 py-0.5">{r.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Phones */}
                <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3">
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2">student_phones</p>
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr>
                        <th className="text-left px-1.5 py-1 border-b border-emerald-500/20 font-semibold">student_id</th>
                        <th className="text-left px-1.5 py-1 border-b border-emerald-500/20 font-semibold">phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {normalizedPhones.map((r, i) => (
                        <tr key={i}>
                          <td className="px-1.5 py-0.5 font-mono">{r.student_id}</td>
                          <td className="px-1.5 py-0.5 font-mono">{r.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Enrollments */}
                <div className="rounded-xl border bg-violet-500/10 border-violet-500/30 p-3">
                  <p className="text-xs font-bold text-violet-700 dark:text-violet-300 mb-2">enrollments</p>
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr>
                        <th className="text-left px-1.5 py-1 border-b border-violet-500/20 font-semibold">student_id</th>
                        <th className="text-left px-1.5 py-1 border-b border-violet-500/20 font-semibold">course</th>
                      </tr>
                    </thead>
                    <tbody>
                      {normalizedEnrollments.map((r, i) => (
                        <tr key={i}>
                          <td className="px-1.5 py-0.5 font-mono">{r.student_id}</td>
                          <td className="px-1.5 py-0.5">{r.course}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3">
                <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <p className="text-[10px] text-emerald-700 dark:text-emerald-300">
                  1NF achieved: every cell contains exactly one atomic value. Multi-valued columns
                  have been split into separate tables with one row per value.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
          <span className="font-mono">Multi-valued cells</span>
          <ArrowRight className="h-3.5 w-3.5" />
          <span className="font-mono">One value per cell</span>
        </div>
      </CardContent>
    </Card>
  );
}
