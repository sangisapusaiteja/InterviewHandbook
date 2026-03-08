"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Columns, Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IndexEntry {
  lastName: string;
  firstName: string;
  rowPointer: number;
}

const indexEntries: IndexEntry[] = [
  { lastName: "Adams", firstName: "Alice", rowPointer: 4 },
  { lastName: "Adams", firstName: "Bob", rowPointer: 7 },
  { lastName: "Brown", firstName: "Charlie", rowPointer: 2 },
  { lastName: "Brown", firstName: "Diana", rowPointer: 5 },
  { lastName: "Brown", firstName: "Eve", rowPointer: 8 },
  { lastName: "Clark", firstName: "Frank", rowPointer: 1 },
  { lastName: "Clark", firstName: "Grace", rowPointer: 3 },
  { lastName: "Davis", firstName: "Hank", rowPointer: 6 },
];

interface QueryTest {
  label: string;
  query: string;
  usesIndex: boolean;
  reason: string;
  matchedEntries: number[];
  columnsUsed: ("lastName" | "firstName")[];
}

const queryTests: QueryTest[] = [
  {
    label: "Both columns",
    query: "WHERE last_name = 'Brown'\n  AND first_name = 'Diana'",
    usesIndex: true,
    reason: "Both columns in the index are used -- full index utilization",
    matchedEntries: [3],
    columnsUsed: ["lastName", "firstName"],
  },
  {
    label: "Left prefix only",
    query: "WHERE last_name = 'Brown'",
    usesIndex: true,
    reason: "Uses the leftmost column -- index can be partially used",
    matchedEntries: [2, 3, 4],
    columnsUsed: ["lastName"],
  },
  {
    label: "Right column only",
    query: "WHERE first_name = 'Diana'",
    usesIndex: false,
    reason: "Skips the leftmost column -- index CANNOT be used (leftmost prefix rule)",
    matchedEntries: [3],
    columnsUsed: ["firstName"],
  },
  {
    label: "Range on left",
    query: "WHERE last_name > 'Brown'\n  AND first_name = 'Frank'",
    usesIndex: true,
    reason: "Range on left column uses the index; right column filter applied after",
    matchedEntries: [5],
    columnsUsed: ["lastName", "firstName"],
  },
];

export function CompositeIndexVisualization() {
  const [selectedTest, setSelectedTest] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const test = queryTests[selectedTest];

  const handleSelect = (idx: number) => {
    setSelectedTest(idx);
    setShowResult(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Composite Index</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Description */}
        <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3">
          <div className="flex items-center gap-2 mb-1">
            <Columns className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <p className="text-xs font-bold text-blue-700 dark:text-blue-300">Multi-Column Index</p>
          </div>
          <p className="text-xs text-blue-700/80 dark:text-blue-300/80">
            A composite index covers multiple columns. The index is sorted by the first column, then
            by the second column within each first-column group. The &quot;leftmost prefix&quot; rule determines
            which queries can use the index.
          </p>
        </div>

        {/* SQL */}
        <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
          {`CREATE INDEX idx_people_name\n  ON people (last_name, first_name);`}
        </pre>

        {/* Leftmost prefix rule */}
        <div className="rounded-xl border bg-violet-500/10 border-violet-500/30 p-3 space-y-2">
          <p className="text-xs font-bold text-violet-700 dark:text-violet-300">Leftmost Prefix Rule</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300">
                last_name
              </div>
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <div className="px-2.5 py-1 rounded-lg bg-blue-500/20 border border-blue-500/40 text-[10px] font-mono font-bold text-blue-700 dark:text-blue-300">
                first_name
              </div>
            </div>
          </div>
          <p className="text-[10px] text-violet-700/70 dark:text-violet-300/70">
            The index can be used for queries that filter on <span className="font-mono font-bold">last_name</span> alone
            or <span className="font-mono font-bold">last_name + first_name</span> together.
            It CANNOT be used for <span className="font-mono font-bold">first_name</span> alone.
          </p>
        </div>

        {/* Query test selector */}
        <div className="flex flex-wrap gap-2">
          {queryTests.map((qt, i) => (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                selectedTest === i
                  ? qt.usesIndex
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 shadow-sm"
                    : "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300 shadow-sm"
                  : "bg-background border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {qt.usesIndex ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
              {qt.label}
            </motion.button>
          ))}
        </div>

        {/* Query + index visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Query */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Query</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
              {`SELECT * FROM people\n${test.query};`}
            </pre>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTest}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className={`rounded-xl border p-3 ${
                  test.usesIndex
                    ? "bg-emerald-500/10 border-emerald-500/30"
                    : "bg-red-500/10 border-red-500/30"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {test.usesIndex ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <X className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                  )}
                  <p className={`text-xs font-bold ${
                    test.usesIndex
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-red-700 dark:text-red-300"
                  }`}>
                    {test.usesIndex ? "Uses Index" : "Cannot Use Index"}
                  </p>
                </div>
                <p className={`text-[10px] ${
                  test.usesIndex
                    ? "text-emerald-700/80 dark:text-emerald-300/80"
                    : "text-red-700/80 dark:text-red-300/80"
                }`}>
                  {test.reason}
                </p>
              </motion.div>
            </AnimatePresence>
            <Button size="sm" onClick={() => setShowResult(true)} disabled={showResult}>
              Show Index Scan
            </Button>
          </div>

          {/* Index entries */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Index: idx_people_name
            </p>
            <div className="rounded-xl border bg-muted/20 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className={`px-3 py-2 text-left font-semibold ${
                      test.columnsUsed.includes("lastName") ? "text-emerald-600 dark:text-emerald-400" : ""
                    }`}>
                      last_name
                    </th>
                    <th className={`px-3 py-2 text-left font-semibold ${
                      test.columnsUsed.includes("firstName") ? "text-blue-600 dark:text-blue-400" : ""
                    }`}>
                      first_name
                    </th>
                    <th className="px-3 py-2 text-right font-semibold text-muted-foreground">
                      row →
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {indexEntries.map((entry, i) => {
                    const isMatched = showResult && test.matchedEntries.includes(i);
                    const isSkipped = showResult && !test.usesIndex;
                    return (
                      <motion.tr
                        key={i}
                        animate={{
                          backgroundColor: isMatched
                            ? "rgba(16, 185, 129, 0.15)"
                            : isSkipped
                            ? "rgba(239, 68, 68, 0.05)"
                            : "transparent",
                          opacity: showResult && !isMatched && test.usesIndex ? 0.4 : 1,
                        }}
                        transition={{ duration: 0.3, delay: showResult ? i * 0.05 : 0 }}
                        className="border-b last:border-b-0"
                      >
                        <td className={`px-3 py-1.5 font-mono ${
                          test.columnsUsed.includes("lastName") && isMatched ? "font-bold text-emerald-600 dark:text-emerald-400" : ""
                        }`}>
                          {entry.lastName}
                        </td>
                        <td className={`px-3 py-1.5 font-mono ${
                          test.columnsUsed.includes("firstName") && isMatched ? "font-bold text-blue-600 dark:text-blue-400" : ""
                        }`}>
                          {entry.firstName}
                        </td>
                        <td className="px-3 py-1.5 text-right font-mono text-muted-foreground">
                          row {entry.rowPointer}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {showResult && !test.usesIndex && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] text-red-600 dark:text-red-400 italic"
              >
                Index skipped -- falls back to sequential scan of entire table
              </motion.p>
            )}
          </div>
        </div>

        {/* Column usage summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`rounded-xl border p-3 text-center ${
            test.columnsUsed.includes("lastName")
              ? "bg-emerald-500/10 border-emerald-500/30"
              : "bg-muted/20 border-border"
          }`}>
            <p className="text-[10px] font-mono font-bold">last_name</p>
            <p className={`text-xs mt-0.5 ${
              test.columnsUsed.includes("lastName")
                ? "text-emerald-700 dark:text-emerald-300"
                : "text-muted-foreground"
            }`}>
              {test.columnsUsed.includes("lastName") ? "Used in query" : "Not used"}
            </p>
          </div>
          <div className={`rounded-xl border p-3 text-center ${
            test.columnsUsed.includes("firstName")
              ? "bg-blue-500/10 border-blue-500/30"
              : "bg-muted/20 border-border"
          }`}>
            <p className="text-[10px] font-mono font-bold">first_name</p>
            <p className={`text-xs mt-0.5 ${
              test.columnsUsed.includes("firstName")
                ? "text-blue-700 dark:text-blue-300"
                : "text-muted-foreground"
            }`}>
              {test.columnsUsed.includes("firstName")
                ? test.columnsUsed.includes("lastName") ? "Used in query" : "Used but index skipped"
                : "Not used"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
