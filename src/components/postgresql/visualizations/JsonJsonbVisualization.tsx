"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Braces, Play, Search, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type JsonTab = "compare" | "operators" | "indexing";

const tabInfo: Record<JsonTab, { label: string; color: string }> = {
  compare: {
    label: "JSON vs JSONB",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  },
  operators: {
    label: "JSONB Operators",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  },
  indexing: {
    label: "GIN Indexing",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  },
};

const tabOrder: JsonTab[] = ["compare", "operators", "indexing"];

interface OperatorExample {
  operator: string;
  description: string;
  sql: string;
  result: string;
}

const operators: OperatorExample[] = [
  {
    operator: "->",
    description: "Get JSON object field as JSON",
    sql: `SELECT data->'address' FROM users WHERE id = 1;`,
    result: '{"city": "NYC", "zip": "10001"}',
  },
  {
    operator: "->>",
    description: "Get JSON object field as text",
    sql: `SELECT data->>'name' FROM users WHERE id = 1;`,
    result: "Alice",
  },
  {
    operator: "@>",
    description: "Contains (left contains right)",
    sql: `SELECT * FROM users\nWHERE data @> '{"role":"admin"}';`,
    result: "Returns rows where data contains role=admin",
  },
  {
    operator: "?",
    description: "Key exists",
    sql: `SELECT * FROM users\nWHERE data ? 'phone';`,
    result: "Returns rows where 'phone' key exists",
  },
  {
    operator: "#>",
    description: "Get value at path as JSON",
    sql: `SELECT data#>'{address,city}' FROM users;`,
    result: '"NYC"',
  },
];

const sampleJSON = `{
  "name": "Alice",
  "role": "admin",
  "address": {
    "city": "NYC",
    "zip": "10001"
  },
  "tags": ["vip", "active"]
}`;

const ginIndexSQL = `-- Create GIN index on JSONB column
CREATE INDEX idx_users_data
  ON users USING GIN (data);

-- Now these queries use the index:
SELECT * FROM users
  WHERE data @> '{"role":"admin"}';

SELECT * FROM users
  WHERE data ? 'phone';

-- Path-specific index (smaller, faster):
CREATE INDEX idx_users_role
  ON users USING GIN ((data->'role'));`;

export function JsonJsonbVisualization() {
  const [activeTab, setActiveTab] = useState<JsonTab>("compare");
  const [selectedOp, setSelectedOp] = useState(0);
  const [showResult, setShowResult] = useState(false);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">JSON & JSONB</CardTitle>
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
                  setShowResult(false);
                  setSelectedOp(0);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? t.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <Braces className="h-3 w-3" />
                {t.label}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "compare" && (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* JSON */}
                <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4 space-y-3">
                  <p className="text-xs font-bold text-orange-700 dark:text-orange-300">
                    JSON (text storage)
                  </p>
                  <div className="space-y-2 text-xs text-orange-700 dark:text-orange-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      Stores exact text input (preserves whitespace)
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      Re-parses on every access
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      Cannot be indexed
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      Preserves duplicate keys
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      Slightly faster writes
                    </div>
                  </div>
                </div>

                {/* JSONB */}
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-3">
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    JSONB (binary storage)
                  </p>
                  <div className="space-y-2 text-xs text-emerald-700 dark:text-emerald-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Stores decomposed binary format
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      No re-parsing needed (fast reads)
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Supports GIN indexes
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Removes duplicate keys (keeps last)
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Slightly slower writes (conversion cost)
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample data */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Sample JSONB Column Data</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
                  {sampleJSON}
                </pre>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  <strong>Recommendation:</strong> Use JSONB in almost all cases. Use JSON only
                  when you need to preserve exact formatting or key order.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "operators" && (
            <motion.div
              key="operators"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  JSONB supports powerful operators for querying nested data without
                  extracting it into separate columns.
                </p>
              </div>

              {/* Operator buttons */}
              <div className="flex flex-wrap gap-2">
                {operators.map((op, i) => (
                  <motion.button
                    key={op.operator}
                    onClick={() => {
                      setSelectedOp(i);
                      setShowResult(false);
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all ${
                      selectedOp === i
                        ? "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300 shadow-sm"
                        : "bg-background border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {op.operator}
                  </motion.button>
                ))}
              </div>

              {/* Selected operator detail */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedOp}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="space-y-3"
                >
                  <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3">
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-1">
                      {operators[selectedOp].operator} -- {operators[selectedOp].description}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">Query</p>
                      <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
                        {operators[selectedOp].sql}
                      </pre>
                      <Button size="sm" onClick={() => setShowResult(true)}>
                        <Play className="h-3.5 w-3.5 mr-1" /> Run
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">Result</p>
                      <AnimatePresence mode="wait">
                        {showResult ? (
                          <motion.div
                            key="res"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs min-h-[60px]"
                          >
                            <p className="text-emerald-400">{operators[selectedOp].result}</p>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="ph"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[60px] flex items-center justify-center"
                          >
                            <p className="text-xs text-muted-foreground italic">
                              Click Run to see result
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === "indexing" && (
            <motion.div
              key="indexing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-violet-500/10 border-violet-500/30 p-3">
                <p className="text-sm text-violet-700 dark:text-violet-300">
                  <strong>GIN indexes</strong> (Generalized Inverted Index) make JSONB containment
                  and existence operators fast -- even on millions of rows.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">GIN Index SQL</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
                  {ginIndexSQL}
                </pre>
              </div>

              {/* Performance comparison */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground">Query Performance (1M rows)</p>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium flex items-center gap-1">
                      <Search className="h-3 w-3" /> Without index (seq scan)
                    </span>
                    <span className="font-mono text-muted-foreground">~1200ms</span>
                  </div>
                  <div className="h-5 rounded-lg bg-muted/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "90%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-red-500/30 rounded-lg flex items-center justify-end pr-2"
                    >
                      <span className="text-[9px] font-bold text-red-600 dark:text-red-400">
                        Full table scan
                      </span>
                    </motion.div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium flex items-center gap-1">
                      <Database className="h-3 w-3" /> With GIN index
                    </span>
                    <span className="font-mono text-muted-foreground">~3ms</span>
                  </div>
                  <div className="h-5 rounded-lg bg-muted/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "6%" }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                      className="h-full bg-emerald-500/40 rounded-lg min-w-[70px] flex items-center justify-end pr-2"
                    >
                      <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                        Index scan
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-2.5">
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-0.5">
                    Indexed operators
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    @&gt; , ? , ?| , ?&amp; , @?
                  </p>
                </div>
                <div className="rounded-xl border bg-orange-500/10 border-orange-500/30 p-2.5">
                  <p className="text-xs font-bold text-orange-700 dark:text-orange-300 mb-0.5">
                    Not indexed
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    -&gt; , -&gt;&gt; (use expression index instead)
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
