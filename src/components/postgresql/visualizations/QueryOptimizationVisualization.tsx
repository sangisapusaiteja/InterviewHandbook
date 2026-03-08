"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, AlertTriangle, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OptimizationTip {
  id: string;
  label: string;
  category: string;
  badQuery: string;
  goodQuery: string;
  badExplain: string;
  goodExplain: string;
  badTime: string;
  goodTime: string;
  explanation: string;
  color: string;
}

const tips: OptimizationTip[] = [
  {
    id: "select_star",
    label: "Avoid SELECT *",
    category: "Column Selection",
    badQuery: "SELECT *\nFROM orders\nWHERE user_id = 42;",
    goodQuery: "SELECT id, total, created_at\nFROM orders\nWHERE user_id = 42;",
    badExplain: "Seq Scan on orders\n  rows=150  width=824\n  Buffers: shared hit=1250",
    goodExplain: "Index Scan using idx_orders_user\n  rows=150  width=28\n  Buffers: shared hit=12",
    badTime: "12.4 ms",
    goodTime: "0.8 ms",
    explanation: "SELECT * fetches all columns including large text/blob columns, requiring more I/O. Selecting only needed columns can use a covering index and transfers less data.",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  },
  {
    id: "function_on_column",
    label: "Avoid Functions on Indexed Columns",
    category: "Index Usage",
    badQuery: "SELECT * FROM users\nWHERE LOWER(email) = 'alice@mail.com';",
    goodQuery: "-- Option 1: Store lowercase\nSELECT * FROM users\nWHERE email = 'alice@mail.com';\n\n-- Option 2: Expression index\nCREATE INDEX idx_lower_email\n  ON users (LOWER(email));",
    badExplain: "Seq Scan on users\n  Filter: lower(email) = 'alice@mail.com'\n  Rows Removed: 49999",
    goodExplain: "Index Scan using idx_users_email\n  Index Cond: (email = 'alice@mail.com')",
    badTime: "45.2 ms",
    goodTime: "0.05 ms",
    explanation: "Wrapping an indexed column in a function (LOWER, UPPER, CAST) prevents the planner from using the index. Use expression indexes or store normalized values.",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  },
  {
    id: "or_vs_in",
    label: "Use IN Instead of Multiple ORs",
    category: "Query Structure",
    badQuery: "SELECT * FROM products\nWHERE category = 'Electronics'\n   OR category = 'Books'\n   OR category = 'Toys';",
    goodQuery: "SELECT * FROM products\nWHERE category IN\n  ('Electronics', 'Books', 'Toys');",
    badExplain: "Seq Scan on products\n  Filter: ((category = ...) OR ...)\n  Rows Removed: 8500",
    goodExplain: "Bitmap Index Scan on idx_category\n  Index Cond: (category = ANY(...))",
    badTime: "8.3 ms",
    goodTime: "1.2 ms",
    explanation: "Multiple OR conditions may prevent index usage. IN is optimized by the planner and can use bitmap index scans for multiple values.",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  },
  {
    id: "leading_wildcard",
    label: "Avoid Leading Wildcards",
    category: "LIKE Patterns",
    badQuery: "SELECT * FROM users\nWHERE name LIKE '%smith';",
    goodQuery: "-- Use prefix pattern\nSELECT * FROM users\nWHERE name LIKE 'smith%';\n\n-- Or use trigram index\nCREATE INDEX idx_name_trgm\n  ON users USING gin\n  (name gin_trgm_ops);",
    badExplain: "Seq Scan on users\n  Filter: (name ~~ '%smith')\n  Rows Removed: 49800",
    goodExplain: "Index Scan using idx_users_name\n  Index Cond: (name >= 'smith'\n    AND name < 'smiti')",
    badTime: "38.5 ms",
    goodTime: "0.12 ms",
    explanation: "Leading wildcards (%value) force a full table scan because the index is sorted by the beginning of the string. Use prefix patterns or pg_trgm for full-text search.",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
  },
  {
    id: "pagination",
    label: "Use Keyset Pagination",
    category: "Pagination",
    badQuery: "SELECT * FROM posts\nORDER BY created_at DESC\nLIMIT 20 OFFSET 10000;",
    goodQuery: "SELECT * FROM posts\nWHERE created_at < '2024-01-15'\nORDER BY created_at DESC\nLIMIT 20;",
    badExplain: "Sort on posts\n  Sort Key: created_at DESC\n  -> Seq Scan (10020 rows fetched,\n     10000 discarded)",
    goodExplain: "Index Scan Backward\n  using idx_posts_created\n  Index Cond: (created_at < ...)\n  Rows fetched: 20",
    badTime: "125 ms",
    goodTime: "0.3 ms",
    explanation: "OFFSET fetches and discards rows, getting slower as the offset grows. Keyset pagination uses an indexed WHERE clause to start at the right position.",
    color: "bg-pink-500/15 border-pink-500/40 text-pink-700 dark:text-pink-300",
  },
];

export function QueryOptimizationVisualization() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  const tip = tips[selectedIdx];

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    setShowComparison(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Query Optimization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Tip selector */}
        <div className="flex flex-wrap gap-2">
          {tips.map((t, i) => {
            const isActive = selectedIdx === i;
            return (
              <motion.button
                key={t.id}
                onClick={() => handleSelect(i)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive ? t.color + " shadow-sm" : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <Zap className="h-3 w-3" />
                {t.label}
              </motion.button>
            );
          })}
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`rounded-xl border p-3 ${tip.color}`}
          >
            <p className="text-sm">{tip.explanation}</p>
          </motion.div>
        </AnimatePresence>

        {/* Before / After queries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bad query */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <X className="h-3.5 w-3.5 text-red-500" />
              <p className="text-xs font-semibold text-red-600 dark:text-red-400">Bad Pattern</p>
            </div>
            <pre className="text-[10px] font-mono rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 whitespace-pre overflow-x-auto">
              {tip.badQuery}
            </pre>
          </div>

          {/* Good query */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Optimized</p>
            </div>
            <pre className="text-[10px] font-mono rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 whitespace-pre overflow-x-auto">
              {tip.goodQuery}
            </pre>
          </div>
        </div>

        {/* Show EXPLAIN comparison */}
        <Button size="sm" onClick={() => setShowComparison(!showComparison)}>
          {showComparison ? "Hide" : "Show"} EXPLAIN Comparison
        </Button>

        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* Bad explain */}
                <div className="space-y-2">
                  <div className="rounded-xl border border-red-500/30 bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-[10px] space-y-0.5">
                    {tip.badExplain.split("\n").map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="text-red-400"
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                  <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-red-500 shrink-0" />
                    <p className="text-[10px] text-red-700 dark:text-red-300">
                      Execution time: <span className="font-bold">{tip.badTime}</span>
                    </p>
                  </div>
                </div>

                {/* Good explain */}
                <div className="space-y-2">
                  <div className="rounded-xl border border-emerald-500/30 bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-[10px] space-y-0.5">
                    {tip.goodExplain.split("\n").map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 + 0.2 }}
                        className="text-emerald-400"
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                  <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 flex items-center gap-2">
                    <Zap className="h-3 w-3 text-emerald-500 shrink-0" />
                    <p className="text-[10px] text-emerald-700 dark:text-emerald-300">
                      Execution time: <span className="font-bold">{tip.goodTime}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Speed comparison bar */}
              <div className="mt-3 space-y-1.5">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Speed Improvement
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] w-14 text-muted-foreground">Before</span>
                      <div className="flex-1 bg-muted/30 rounded-full h-4 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.6 }}
                          className="h-full rounded-full bg-red-500/40 flex items-center justify-end pr-2"
                        >
                          <span className="text-[9px] font-mono font-bold">{tip.badTime}</span>
                        </motion.div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] w-14 text-muted-foreground">After</span>
                      <div className="flex-1 bg-muted/30 rounded-full h-4 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max((parseFloat(tip.goodTime) / parseFloat(tip.badTime)) * 100, 3)}%` }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="h-full rounded-full bg-emerald-500/40 flex items-center justify-end pr-2 min-w-[50px]"
                        >
                          <span className="text-[9px] font-mono font-bold">{tip.goodTime}</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center px-3">
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {Math.round(parseFloat(tip.badTime) / parseFloat(tip.goodTime))}x
                    </p>
                    <p className="text-[9px] text-muted-foreground">faster</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick reference */}
        <div className="rounded-xl border bg-muted/20 p-3 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Quick Optimization Checklist</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {[
              "Select only columns you need",
              "Add indexes on WHERE/JOIN columns",
              "Avoid functions on indexed columns",
              "Use IN instead of multiple ORs",
              "Avoid leading wildcards in LIKE",
              "Use keyset pagination over OFFSET",
              "Use EXPLAIN ANALYZE to verify",
              "Monitor slow queries with pg_stat",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[10px]">
                <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
