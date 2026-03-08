"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Merge, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Employee {
  id: number;
  name: string;
  department: string;
}

const currentEmployees: Employee[] = [
  { id: 1, name: "Alice", department: "Engineering" },
  { id: 2, name: "Bob", department: "Marketing" },
  { id: 3, name: "Charlie", department: "Sales" },
  { id: 4, name: "Diana", department: "Engineering" },
];

const formerEmployees: Employee[] = [
  { id: 5, name: "Charlie", department: "Sales" },
  { id: 6, name: "Eve", department: "HR" },
  { id: 7, name: "Diana", department: "Engineering" },
  { id: 8, name: "Frank", department: "Marketing" },
];

// Duplicates are matched by name + department (simulating UNION on SELECT name, department)
const duplicateNames = ["Charlie", "Diana"];

type Mode = "UNION" | "UNION ALL";

export function UnionVisualization() {
  const [mode, setMode] = useState<Mode>("UNION");
  const [phase, setPhase] = useState<"idle" | "merging" | "deduplicating" | "done">("idle");

  const allRows = [...currentEmployees, ...formerEmployees];

  const unionAllResult = allRows.map((row) => ({
    ...row,
    isDuplicate: duplicateNames.includes(row.name),
    source: currentEmployees.includes(row) ? "A" : "B",
  }));

  const unionResult = unionAllResult.filter((row, index) => {
    if (!row.isDuplicate) return true;
    // Keep only the first occurrence
    return unionAllResult.findIndex((r) => r.name === row.name && r.department === row.department) === index;
  });

  const resultRows = mode === "UNION" ? unionResult : unionAllResult;
  const resultCount = resultRows.length;

  const handleRun = useCallback(() => {
    setPhase("merging");
    setTimeout(() => {
      if (mode === "UNION") {
        setPhase("deduplicating");
        setTimeout(() => setPhase("done"), 1200);
      } else {
        setPhase("done");
      }
    }, 800);
  }, [mode]);

  const handleReset = () => {
    setPhase("idle");
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setPhase("idle");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Merge className="h-5 w-5 text-violet-500" />
          UNION vs UNION ALL
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Mode toggle */}
        <div className="flex gap-2">
          {(["UNION", "UNION ALL"] as Mode[]).map((m) => (
            <motion.button
              key={m}
              onClick={() => handleModeChange(m)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                mode === m
                  ? m === "UNION"
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 shadow-sm"
                    : "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300 shadow-sm"
                  : "bg-background border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {m}
            </motion.button>
          ))}
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`rounded-xl border p-3 ${
              mode === "UNION"
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                : "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300"
            }`}
          >
            <p className="text-sm">
              {mode === "UNION"
                ? "UNION combines results from two queries and removes duplicate rows. Only distinct rows appear in the final result."
                : "UNION ALL combines results from two queries and keeps all rows, including duplicates. It is faster because no deduplication is needed."}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* SQL preview */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">SQL Query</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
{`SELECT name, department FROM current_employees
${mode}
SELECT name, department FROM former_employees;`}
          </pre>
        </div>

        {/* Source tables side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Table A */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              current_employees ({currentEmployees.length} rows)
            </p>
            <div className="rounded-xl border bg-blue-500/5 overflow-hidden">
              <div className="grid grid-cols-2 gap-0 bg-blue-500/10 px-3 py-1.5">
                <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300">name</span>
                <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300">department</span>
              </div>
              {currentEmployees.map((row) => (
                <motion.div
                  key={row.id}
                  className={`grid grid-cols-2 gap-0 px-3 py-1.5 border-t border-blue-500/10 text-xs ${
                    duplicateNames.includes(row.name)
                      ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                      : ""
                  }`}
                  layout
                >
                  <span className="font-mono">{row.name}</span>
                  <span className="text-muted-foreground">{row.department}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Table B */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-violet-600 dark:text-violet-400">
              former_employees ({formerEmployees.length} rows)
            </p>
            <div className="rounded-xl border bg-violet-500/5 overflow-hidden">
              <div className="grid grid-cols-2 gap-0 bg-violet-500/10 px-3 py-1.5">
                <span className="text-[10px] font-bold text-violet-700 dark:text-violet-300">name</span>
                <span className="text-[10px] font-bold text-violet-700 dark:text-violet-300">department</span>
              </div>
              {formerEmployees.map((row) => (
                <motion.div
                  key={row.id}
                  className={`grid grid-cols-2 gap-0 px-3 py-1.5 border-t border-violet-500/10 text-xs ${
                    duplicateNames.includes(row.name)
                      ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                      : ""
                  }`}
                  layout
                >
                  <span className="font-mono">{row.name}</span>
                  <span className="text-muted-foreground">{row.department}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Duplicate legend */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-block w-3 h-3 rounded bg-amber-500/30 border border-amber-500/50" />
          Highlighted rows appear in both tables (duplicates)
        </div>

        {/* Run / Reset */}
        <div className="flex gap-2">
          <Button size="sm" onClick={handleRun} disabled={phase !== "idle"}>
            <Play className="h-3.5 w-3.5 mr-1" /> Run {mode}
          </Button>
          {phase !== "idle" && (
            <Button size="sm" variant="outline" onClick={handleReset}>
              <RefreshCw className="h-3.5 w-3.5 mr-1" /> Reset
            </Button>
          )}
        </div>

        {/* Result table */}
        <AnimatePresence mode="wait">
          {phase !== "idle" && (
            <motion.div
              key={`result-${mode}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-2"
            >
              {/* Row count summary */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Result
                </span>
                <span className="text-xs text-muted-foreground">
                  Table A: {currentEmployees.length} rows + Table B: {formerEmployees.length} rows
                  {" → "}Result: {resultCount} rows
                </span>
                {mode === "UNION" && (
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                    ({allRows.length - resultCount} duplicate{allRows.length - resultCount !== 1 ? "s" : ""} removed)
                  </span>
                )}
              </div>

              <div className="rounded-xl border bg-emerald-500/5 overflow-hidden">
                <div className="grid grid-cols-3 gap-0 bg-emerald-500/10 px-3 py-1.5">
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">name</span>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">department</span>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">source</span>
                </div>

                <AnimatePresence>
                  {(phase === "merging" ? unionAllResult : resultRows).map((row, index) => {
                    const isRemoving =
                      mode === "UNION" &&
                      phase === "deduplicating" &&
                      row.isDuplicate &&
                      row.source === "B";

                    return (
                      <motion.div
                        key={`${row.name}-${row.source}-${index}`}
                        initial={{ opacity: 0, x: row.source === "A" ? -30 : 30 }}
                        animate={{
                          opacity: isRemoving ? 0 : 1,
                          x: 0,
                          height: isRemoving ? 0 : "auto",
                          backgroundColor: isRemoving
                            ? "rgba(245, 158, 11, 0.2)"
                            : row.isDuplicate
                            ? "rgba(245, 158, 11, 0.08)"
                            : "transparent",
                        }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: phase === "merging" ? index * 0.08 : 0,
                        }}
                        className={`grid grid-cols-3 gap-0 px-3 py-1.5 border-t border-emerald-500/10 text-xs overflow-hidden`}
                      >
                        <span className="font-mono">{row.name}</span>
                        <span className="text-muted-foreground">{row.department}</span>
                        <span
                          className={`text-[10px] font-medium ${
                            row.source === "A"
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-violet-600 dark:text-violet-400"
                          }`}
                        >
                          {row.source === "A" ? "current" : "former"}
                        </span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Phase indicator */}
              {phase === "merging" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-muted-foreground italic"
                >
                  Merging rows from both tables...
                </motion.p>
              )}
              {phase === "deduplicating" && mode === "UNION" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-amber-600 dark:text-amber-400 italic"
                >
                  Removing duplicate rows...
                </motion.p>
              )}
              {phase === "done" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-emerald-600 dark:text-emerald-400 font-medium"
                >
                  {mode === "UNION"
                    ? `Done! ${resultCount} unique rows returned.`
                    : `Done! All ${resultCount} rows returned (duplicates kept).`}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
