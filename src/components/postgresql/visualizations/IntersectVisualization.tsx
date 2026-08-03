"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Student {
  id: number;
  name: string;
  grade: string;
}

const mathStudents: Student[] = [
  { id: 1, name: "Alice", grade: "A" },
  { id: 2, name: "Bob", grade: "B+" },
  { id: 3, name: "Charlie", grade: "A-" },
  { id: 4, name: "Diana", grade: "B" },
  { id: 5, name: "Eve", grade: "A" },
];

const scienceStudents: Student[] = [
  { id: 1, name: "Charlie", grade: "A" },
  { id: 2, name: "Diana", grade: "B+" },
  { id: 3, name: "Frank", grade: "A-" },
  { id: 4, name: "Eve", grade: "B" },
  { id: 5, name: "Grace", grade: "A" },
];

const commonNames = new Set(
  mathStudents
    .map((s) => s.name)
    .filter((name) => scienceStudents.some((s) => s.name === name))
);

const intersectSQL = `SELECT name FROM math_students
INTERSECT
SELECT name FROM science_students;`;

const joinEquivalentSQL = `SELECT DISTINCT m.name
FROM math_students m
INNER JOIN science_students s
  ON m.name = s.name;`;

export function IntersectVisualization() {
  const [hasRun, setHasRun] = useState(false);
  const [showJoinComparison, setShowJoinComparison] = useState(false);

  const handleRun = () => setHasRun(true);
  const handleReset = () => {
    setHasRun(false);
    setShowJoinComparison(false);
  };

  const resultRows = mathStudents.filter((s) => commonNames.has(s.name));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">SQL INTERSECT Operator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Description */}
        <div className="rounded-xl border p-3 bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300">
          <p className="text-sm">
            INTERSECT returns only the rows that appear in <strong>both</strong>{" "}
            result sets. It performs a set intersection — like the overlapping
            area of a Venn diagram. Duplicates are removed automatically.
          </p>
        </div>

        {/* Venn diagram concept */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Set Intersection Concept
          </p>
          <div className="flex items-center justify-center py-4">
            <svg viewBox="0 0 320 160" className="w-full max-w-sm h-auto">
              {/* Left circle - math */}
              <motion.circle
                cx="120"
                cy="80"
                r="65"
                fill={hasRun ? "rgba(59,130,246,0.12)" : "rgba(59,130,246,0.2)"}
                stroke="rgba(59,130,246,0.6)"
                strokeWidth="2"
                animate={{ fill: hasRun ? "rgba(59,130,246,0.08)" : "rgba(59,130,246,0.2)" }}
                transition={{ duration: 0.5 }}
              />
              {/* Right circle - science */}
              <motion.circle
                cx="200"
                cy="80"
                r="65"
                fill={hasRun ? "rgba(139,92,246,0.12)" : "rgba(139,92,246,0.2)"}
                stroke="rgba(139,92,246,0.6)"
                strokeWidth="2"
                animate={{ fill: hasRun ? "rgba(139,92,246,0.08)" : "rgba(139,92,246,0.2)" }}
                transition={{ duration: 0.5 }}
              />
              {/* Intersection highlight */}
              <defs>
                <clipPath id="clipLeft">
                  <circle cx="120" cy="80" r="65" />
                </clipPath>
              </defs>
              <motion.circle
                cx="200"
                cy="80"
                r="65"
                clipPath="url(#clipLeft)"
                fill={hasRun ? "rgba(16,185,129,0.45)" : "rgba(16,185,129,0.15)"}
                stroke="none"
                animate={{
                  fill: hasRun ? "rgba(16,185,129,0.45)" : "rgba(16,185,129,0.15)",
                }}
                transition={{ duration: 0.5 }}
              />
              {/* Labels */}
              <text x="85" y="50" fontSize="11" fontWeight="600" fill="rgba(59,130,246,0.9)" textAnchor="middle">
                Math
              </text>
              <text x="85" y="63" fontSize="9" fill="rgba(59,130,246,0.7)" textAnchor="middle">
                Only
              </text>
              <text x="235" y="50" fontSize="11" fontWeight="600" fill="rgba(139,92,246,0.9)" textAnchor="middle">
                Science
              </text>
              <text x="235" y="63" fontSize="9" fill="rgba(139,92,246,0.7)" textAnchor="middle">
                Only
              </text>
              <text x="160" y="75" fontSize="11" fontWeight="700" fill="rgba(16,185,129,1)" textAnchor="middle">
                INTERSECT
              </text>
              {/* Names in sections */}
              <text x="80" y="95" fontSize="8" fill="rgba(59,130,246,0.8)" textAnchor="middle">
                Alice, Bob
              </text>
              <text x="160" y="92" fontSize="8" fill="rgba(16,185,129,0.9)" textAnchor="middle">
                Charlie, Diana,
              </text>
              <text x="160" y="103" fontSize="8" fill="rgba(16,185,129,0.9)" textAnchor="middle">
                Eve
              </text>
              <text x="240" y="95" fontSize="8" fill="rgba(139,92,246,0.8)" textAnchor="middle">
                Frank, Grace
              </text>
            </svg>
          </div>
        </div>

        {/* Two tables side by side */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Source Tables
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Math students */}
            <div className="rounded-xl border bg-blue-500/10 p-3">
              <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">
                math_students
              </p>
              <div className="space-y-1">
                <div className="flex gap-4 text-[10px] font-semibold text-blue-600/70 dark:text-blue-400/70 border-b border-blue-500/20 pb-1">
                  <span className="w-8">id</span>
                  <span className="w-16">name</span>
                  <span className="w-10">grade</span>
                </div>
                {mathStudents.map((s) => {
                  const isCommon = commonNames.has(s.name);
                  return (
                    <motion.div
                      key={s.id}
                      className="flex gap-4 text-[11px] py-0.5 rounded px-1"
                      animate={{
                        opacity: hasRun ? (isCommon ? 1 : 0.3) : 1,
                        backgroundColor: hasRun && isCommon ? "rgba(16,185,129,0.15)" : "rgba(0,0,0,0)",
                      }}
                      transition={{ duration: 0.4, delay: hasRun ? 0.1 * s.id : 0 }}
                    >
                      <span className="w-8 font-mono text-muted-foreground">{s.id}</span>
                      <span className={`w-16 font-medium ${hasRun && isCommon ? "text-emerald-700 dark:text-emerald-300" : ""}`}>
                        {s.name}
                      </span>
                      <span className="w-10 text-muted-foreground">{s.grade}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Science students */}
            <div className="rounded-xl border bg-violet-500/10 p-3">
              <p className="text-xs font-bold text-violet-700 dark:text-violet-300 mb-2">
                science_students
              </p>
              <div className="space-y-1">
                <div className="flex gap-4 text-[10px] font-semibold text-violet-600/70 dark:text-violet-400/70 border-b border-violet-500/20 pb-1">
                  <span className="w-8">id</span>
                  <span className="w-16">name</span>
                  <span className="w-10">grade</span>
                </div>
                {scienceStudents.map((s) => {
                  const isCommon = commonNames.has(s.name);
                  return (
                    <motion.div
                      key={s.id}
                      className="flex gap-4 text-[11px] py-0.5 rounded px-1"
                      animate={{
                        opacity: hasRun ? (isCommon ? 1 : 0.3) : 1,
                        backgroundColor: hasRun && isCommon ? "rgba(16,185,129,0.15)" : "rgba(0,0,0,0)",
                      }}
                      transition={{ duration: 0.4, delay: hasRun ? 0.1 * s.id : 0 }}
                    >
                      <span className="w-8 font-mono text-muted-foreground">{s.id}</span>
                      <span className={`w-16 font-medium ${hasRun && isCommon ? "text-emerald-700 dark:text-emerald-300" : ""}`}>
                        {s.name}
                      </span>
                      <span className="w-10 text-muted-foreground">{s.grade}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* SQL query */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">INTERSECT Query</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {intersectSQL}
          </pre>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleRun} disabled={hasRun}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run INTERSECT
            </Button>
            {hasRun && (
              <Button size="sm" variant="outline" onClick={handleReset}>
                <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
              </Button>
            )}
          </div>
        </div>

        {/* Result table */}
        <AnimatePresence mode="wait">
          {hasRun ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              <p className="text-xs font-semibold text-muted-foreground">Result</p>
              <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs">
                <div className="text-emerald-500/70 mb-1">
                  &nbsp;name
                </div>
                <div className="text-emerald-500/70 mb-1 border-b border-emerald-500/20 pb-1">
                  ---------
                </div>
                {resultRows.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 * i }}
                    className="text-emerald-400 py-0.5"
                  >
                    &nbsp;{s.name}
                  </motion.div>
                ))}
                <div className="text-emerald-500/50 mt-1 pt-1 border-t border-emerald-500/20">
                  ({resultRows.length} rows)
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[80px] flex items-center justify-center"
            >
              <p className="text-xs text-muted-foreground italic">
                Click Run INTERSECT to see the result
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* INNER JOIN comparison */}
        {hasRun && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
            <motion.button
              onClick={() => setShowJoinComparison(!showJoinComparison)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="text-xs font-semibold text-violet-700 dark:text-violet-300 hover:underline cursor-pointer"
            >
              {showJoinComparison ? "Hide" : "Show"} INNER JOIN Equivalent
            </motion.button>
            <AnimatePresence>
              {showJoinComparison && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-xl border p-3 bg-violet-500/10 border-violet-500/30 space-y-2">
                    <p className="text-xs text-violet-700 dark:text-violet-300">
                      The same result can be achieved with an INNER JOIN and
                      DISTINCT. INTERSECT is more concise for simple set
                      operations, while JOIN gives more flexibility (e.g.,
                      selecting additional columns).
                    </p>
                    <pre className="text-xs font-mono rounded-lg border bg-muted/40 px-3 py-2 whitespace-pre overflow-x-auto">
                      {joinEquivalentSQL}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
