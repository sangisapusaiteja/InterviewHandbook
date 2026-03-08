"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MethodKey = "multi_row" | "select" | "generate" | "copy";

interface BulkMethod {
  label: string;
  color: string;
  description: string;
  sql: string;
  output: string[];
  relativeSpeed: number;
}

const methods: Record<MethodKey, BulkMethod> = {
  multi_row: {
    label: "Multi-row VALUES",
    color:
      "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "Insert multiple rows in a single INSERT statement using the VALUES clause. More efficient than individual INSERT statements because it reduces round-trips to the server.",
    sql: `INSERT INTO employees (first_name, last_name, email)
VALUES
    ('Alice',   'Johnson', 'alice@example.com'),
    ('Bob',     'Smith',   'bob@example.com'),
    ('Charlie', 'Brown',   'charlie@example.com'),
    ('Diana',   'Prince',  'diana@example.com'),
    ('Eve',     'Davis',   'eve@example.com');`,
    output: [
      "INSERT 0 5",
      "-- 5 rows inserted in a single statement",
      "-- ~3x faster than 5 individual INSERTs",
    ],
    relativeSpeed: 60,
  },
  select: {
    label: "INSERT ... SELECT",
    color:
      "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "Insert rows by selecting from another table or query. Ideal for data migration, copying subsets of data, or transforming data between tables.",
    sql: `-- Copy active employees to an archive table
INSERT INTO employees_archive
    (first_name, last_name, email, archived_at)
SELECT
    first_name, last_name, email, NOW()
FROM employees
WHERE is_active = FALSE;`,
    output: [
      "INSERT 0 12",
      "-- 12 inactive employees archived",
      "-- Data stays on the server, no client round-trip",
    ],
    relativeSpeed: 75,
  },
  generate: {
    label: "generate_series()",
    color:
      "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "Use generate_series() to quickly create large volumes of test or seed data. Combines INSERT ... SELECT with PostgreSQL set-returning functions.",
    sql: `-- Generate 10,000 test rows
INSERT INTO employees (first_name, last_name, email)
SELECT
    'User_' || g,
    'Test',
    'user' || g || '@test.com'
FROM generate_series(1, 10000) AS g;`,
    output: [
      "INSERT 0 10000",
      "-- 10,000 rows generated in ~45ms",
      "-- Great for benchmarking and load testing",
    ],
    relativeSpeed: 85,
  },
  copy: {
    label: "COPY Command",
    color:
      "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    description:
      "The fastest way to bulk-load data from CSV/TSV files. COPY bypasses the SQL parser and writes directly to the table, making it significantly faster than INSERT.",
    sql: `-- Server-side COPY (superuser required)
COPY employees (first_name, last_name, email)
FROM '/tmp/employees.csv'
WITH (FORMAT csv, HEADER true, DELIMITER ',');

-- Client-side \\copy (no superuser needed)
\\copy employees (first_name, last_name, email)
FROM 'employees.csv' WITH (FORMAT csv, HEADER);`,
    output: [
      "COPY 50000",
      "-- 50,000 rows loaded from CSV in ~120ms",
      "-- Fastest bulk loading method in PostgreSQL",
    ],
    relativeSpeed: 100,
  },
};

const methodOrder: MethodKey[] = ["multi_row", "select", "generate", "copy"];

const speedBarColors: Record<MethodKey, string> = {
  multi_row: "bg-blue-500",
  select: "bg-emerald-500",
  generate: "bg-violet-500",
  copy: "bg-orange-500",
};

export function BulkInsertsVisualization() {
  const [selectedMethod, setSelectedMethod] = useState<MethodKey>("multi_row");
  const [output, setOutput] = useState<string[] | null>(null);
  const [showChart, setShowChart] = useState(false);

  const method = methods[selectedMethod];

  const handleRun = () => {
    setOutput(method.output);
    setShowChart(true);
  };

  const handleTabChange = (key: MethodKey) => {
    setSelectedMethod(key);
    setOutput(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Bulk Insert Techniques</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Method selector tabs */}
        <div className="flex flex-wrap gap-2">
          {methodOrder.map((key) => {
            const m = methods[key];
            const isActive = selectedMethod === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleTabChange(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? m.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {m.label}
              </motion.button>
            );
          })}
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={selectedMethod}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-sm text-muted-foreground"
          >
            {method.description}
          </motion.p>
        </AnimatePresence>

        {/* SQL + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              SQL Example
            </p>
            <AnimatePresence mode="wait">
              <motion.pre
                key={selectedMethod}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[140px]"
              >
                {method.sql}
              </motion.pre>
            </AnimatePresence>
            <Button size="sm" onClick={handleRun}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              Output
            </p>
            <AnimatePresence mode="wait">
              {output ? (
                <motion.div
                  key="out"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[140px]"
                >
                  {output.map((line, i) => (
                    <p
                      key={i}
                      className={
                        line.startsWith("--")
                          ? "text-zinc-500"
                          : "text-emerald-400"
                      }
                    >
                      {line}
                    </p>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="ph"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[140px] flex items-center justify-center"
                >
                  <p className="text-xs text-muted-foreground italic">
                    Click Run to execute the bulk insert
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Performance comparison bar chart */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Relative Performance Comparison
          </p>
          <div className="space-y-2">
            {methodOrder.map((key, i) => {
              const m = methods[key];
              const isActive = selectedMethod === key;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`rounded-lg border p-3 transition-all ${
                    isActive ? m.color + " shadow-sm" : "hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium">{m.label}</span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {m.relativeSpeed}%
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-muted/60 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${speedBarColors[key]}`}
                      initial={{ width: 0 }}
                      animate={
                        showChart
                          ? { width: `${m.relativeSpeed}%` }
                          : { width: 0 }
                      }
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
          {!showChart && (
            <p className="text-xs text-muted-foreground italic text-center">
              Run any method above to see the performance comparison
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
