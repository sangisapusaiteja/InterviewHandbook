"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, Layers, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ViewMode = "cte" | "subquery";

interface CTEBlock {
  name: string;
  color: string;
  borderColor: string;
  textColor: string;
  sql: string;
  resultHeaders: string[];
  resultRows: string[][];
}

const cteBlocks: CTEBlock[] = [
  {
    name: "dept_stats",
    color: "bg-emerald-500/15",
    borderColor: "border-emerald-500/40",
    textColor: "text-emerald-700 dark:text-emerald-300",
    sql: `SELECT department,
       COUNT(*) AS emp_count,
       AVG(salary) AS avg_salary
FROM employees
GROUP BY department`,
    resultHeaders: ["department", "emp_count", "avg_salary"],
    resultRows: [
      ["Engineering", "12", "95000"],
      ["Marketing", "8", "72000"],
      ["Sales", "15", "68000"],
      ["HR", "5", "71000"],
    ],
  },
  {
    name: "large_depts",
    color: "bg-blue-500/15",
    borderColor: "border-blue-500/40",
    textColor: "text-blue-700 dark:text-blue-300",
    sql: `SELECT department,
       emp_count,
       avg_salary
FROM dept_stats
WHERE emp_count > 6`,
    resultHeaders: ["department", "emp_count", "avg_salary"],
    resultRows: [
      ["Engineering", "12", "95000"],
      ["Marketing", "8", "72000"],
      ["Sales", "15", "68000"],
    ],
  },
];

const finalQuery = {
  color: "bg-violet-500/15",
  borderColor: "border-violet-500/40",
  textColor: "text-violet-700 dark:text-violet-300",
  sql: `SELECT department,
       avg_salary
FROM large_depts
ORDER BY avg_salary DESC`,
  resultHeaders: ["department", "avg_salary"],
  resultRows: [
    ["Engineering", "95000"],
    ["Marketing", "72000"],
    ["Sales", "68000"],
  ],
};

const fullCTEQuery = `WITH dept_stats AS (
    SELECT department,
           COUNT(*) AS emp_count,
           AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department
),
large_depts AS (
    SELECT department,
           emp_count,
           avg_salary
    FROM dept_stats
    WHERE emp_count > 6
)
SELECT department, avg_salary
FROM large_depts
ORDER BY avg_salary DESC;`;

const nestedSubquery = `SELECT department, avg_salary
FROM (
    SELECT department,
           emp_count,
           avg_salary
    FROM (
        SELECT department,
               COUNT(*) AS emp_count,
               AVG(salary) AS avg_salary
        FROM employees
        GROUP BY department
    ) AS dept_stats
    WHERE emp_count > 6
) AS large_depts
ORDER BY avg_salary DESC;`;

export function CTEVisualization() {
  const [viewMode, setViewMode] = useState<ViewMode>("cte");
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleRun = () => {
    setShowResult(false);
    setActiveStep(0);
    setTimeout(() => setActiveStep(1), 800);
    setTimeout(() => setActiveStep(2), 1600);
    setTimeout(() => {
      setShowResult(true);
      setActiveStep(null);
    }, 2400);
  };

  const handleReset = () => {
    setActiveStep(null);
    setShowResult(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">
          Common Table Expressions (CTEs)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Concept explanation */}
        <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3">
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            CTEs let you define{" "}
            <span className="font-bold">named building blocks</span> using{" "}
            <code className="text-xs bg-emerald-500/20 px-1 py-0.5 rounded">
              WITH
            </code>
            . Each block is a temporary result set you can reference by name in
            subsequent blocks or the final query -- like variables for your SQL.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex gap-2">
          <motion.button
            onClick={() => {
              setViewMode("cte");
              handleReset();
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              viewMode === "cte"
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 shadow-sm"
                : "bg-background border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            <Layers className="h-3 w-3" />
            CTE Approach
          </motion.button>
          <motion.button
            onClick={() => {
              setViewMode("subquery");
              handleReset();
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              viewMode === "subquery"
                ? "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300 shadow-sm"
                : "bg-background border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            <Code2 className="h-3 w-3" />
            Nested Subquery
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "cte" ? (
            <motion.div
              key="cte-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Pipeline flow diagram */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Data Flow Pipeline
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0">
                  {/* WITH clause label */}
                  <div className="shrink-0 rounded-lg border border-dashed border-muted-foreground/30 px-2 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">
                    WITH
                  </div>

                  <ArrowRight className="hidden sm:block h-4 w-4 text-muted-foreground shrink-0 mx-1" />

                  {/* CTE blocks */}
                  {cteBlocks.map((block, i) => (
                    <div key={block.name} className="flex items-center gap-0">
                      <motion.div
                        animate={{
                          scale: activeStep === i ? 1.05 : 1,
                          boxShadow:
                            activeStep === i
                              ? "0 0 16px rgba(16, 185, 129, 0.3)"
                              : "none",
                        }}
                        className={`rounded-xl border ${block.borderColor} ${block.color} p-2.5 min-w-[130px]`}
                      >
                        <p
                          className={`text-xs font-bold ${block.textColor} mb-1.5`}
                        >
                          {block.name}
                        </p>
                        <div className="rounded-md bg-background/60 p-1.5">
                          <div className="flex gap-2 text-[9px] font-mono font-semibold text-muted-foreground border-b border-border pb-1 mb-1">
                            {block.resultHeaders.map((h) => (
                              <span key={h} className="flex-1 truncate">
                                {h}
                              </span>
                            ))}
                          </div>
                          {block.resultRows.slice(0, 3).map((row, ri) => (
                            <div
                              key={ri}
                              className="flex gap-2 text-[9px] font-mono py-0.5"
                            >
                              {row.map((cell, ci) => (
                                <span key={ci} className="flex-1 truncate">
                                  {cell}
                                </span>
                              ))}
                            </div>
                          ))}
                          {block.resultRows.length > 3 && (
                            <p className="text-[8px] text-muted-foreground mt-0.5">
                              +{block.resultRows.length - 3} more...
                            </p>
                          )}
                        </div>
                      </motion.div>

                      <ArrowRight className="hidden sm:block h-4 w-4 text-muted-foreground shrink-0 mx-1" />
                    </div>
                  ))}

                  {/* Final SELECT */}
                  <motion.div
                    animate={{
                      scale: activeStep === 2 ? 1.05 : 1,
                      boxShadow:
                        activeStep === 2
                          ? "0 0 16px rgba(139, 92, 246, 0.3)"
                          : "none",
                    }}
                    className={`rounded-xl border ${finalQuery.borderColor} ${finalQuery.color} p-2.5 min-w-[120px]`}
                  >
                    <p
                      className={`text-xs font-bold ${finalQuery.textColor} mb-1.5`}
                    >
                      Final SELECT
                    </p>
                    <div className="rounded-md bg-background/60 p-1.5">
                      <div className="flex gap-2 text-[9px] font-mono font-semibold text-muted-foreground border-b border-border pb-1 mb-1">
                        {finalQuery.resultHeaders.map((h) => (
                          <span key={h} className="flex-1 truncate">
                            {h}
                          </span>
                        ))}
                      </div>
                      {finalQuery.resultRows.map((row, ri) => (
                        <div
                          key={ri}
                          className="flex gap-2 text-[9px] font-mono py-0.5"
                        >
                          {row.map((cell, ci) => (
                            <span key={ci} className="flex-1 truncate">
                              {cell}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Full CTE SQL */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">
                  Full CTE Query
                </p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
                  {fullCTEQuery}
                </pre>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleRun}>
                    <Play className="h-3.5 w-3.5 mr-1" /> Run Step-by-Step
                  </Button>
                  {(activeStep !== null || showResult) && (
                    <Button size="sm" variant="outline" onClick={handleReset}>
                      Reset
                    </Button>
                  )}
                </div>
              </div>

              {/* Step-by-step output */}
              <AnimatePresence mode="wait">
                {showResult && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1"
                  >
                    <p className="text-emerald-400"> department | avg_salary</p>
                    <p className="text-emerald-400">
                      -------------+-----------
                    </p>
                    {finalQuery.resultRows.map((row, i) => (
                      <p key={i} className="text-emerald-400">
                        {` ${row[0].padEnd(12)}| ${row[1]}`}
                      </p>
                    ))}
                    <p className="text-muted-foreground mt-1">
                      (3 rows)
                    </p>
                  </motion.div>
                )}
                {activeStep !== null && !showResult && (
                  <motion.div
                    key={`step-${activeStep}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl border bg-muted/20 px-4 py-3"
                  >
                    <p className="text-xs text-muted-foreground italic">
                      {activeStep === 0 &&
                        "Building dept_stats: grouping employees by department..."}
                      {activeStep === 1 &&
                        "Building large_depts: filtering departments with > 6 employees..."}
                      {activeStep === 2 &&
                        "Running final SELECT: ordering by avg_salary DESC..."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Key benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  {
                    title: "Named Blocks",
                    desc: "Each CTE has a meaningful name, making the query self-documenting",
                    color:
                      "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
                  },
                  {
                    title: "Chainable",
                    desc: "Later CTEs can reference earlier ones, building complexity step by step",
                    color:
                      "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300",
                  },
                  {
                    title: "Readable",
                    desc: "Logic flows top-to-bottom instead of inside-out like nested subqueries",
                    color:
                      "bg-violet-500/10 border-violet-500/30 text-violet-700 dark:text-violet-300",
                  },
                ].map((benefit) => (
                  <div
                    key={benefit.title}
                    className={`rounded-xl border p-2.5 ${benefit.color}`}
                  >
                    <p className="text-xs font-bold mb-0.5">{benefit.title}</p>
                    <p className="text-[10px] leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="subquery-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Nested subquery SQL */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">
                  Equivalent Nested Subquery
                </p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
                  {nestedSubquery}
                </pre>
              </div>

              {/* Comparison callout */}
              <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3 space-y-2">
                <p className="text-xs font-bold text-orange-700 dark:text-orange-300">
                  Why CTEs are better here:
                </p>
                <ul className="space-y-1.5">
                  {[
                    "Subqueries nest inside-out, making you read from the innermost level outward",
                    "Each level requires an alias (AS dept_stats, AS large_depts) buried inside parentheses",
                    "Adding another step means wrapping everything in yet another SELECT ... FROM (...)",
                    "CTEs read top-to-bottom like a recipe -- each step clearly named and separated",
                  ].map((point) => (
                    <li
                      key={point}
                      className="text-xs flex items-start gap-2 text-orange-700 dark:text-orange-300"
                    >
                      <span className="mt-0.5 shrink-0">*</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Side-by-side line count comparison */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center">
                  <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                    {fullCTEQuery.split("\n").length}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium">
                    lines (CTE)
                  </p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
                    Top-to-bottom flow
                  </p>
                </div>
                <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3 text-center">
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {nestedSubquery.split("\n").length}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium">
                    lines (Subquery)
                  </p>
                  <p className="text-[10px] text-orange-600 dark:text-orange-400 mt-1 font-semibold">
                    Inside-out nesting
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
