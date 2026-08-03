"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CategoryKey = "numeric" | "text" | "datetime" | "boolean" | "special";

interface DataTypeCategory {
  label: string;
  color: string;
  badgeColor: string;
  types: { name: string; size: string; description: string }[];
  example: string;
  output: string[];
}

const categories: Record<CategoryKey, DataTypeCategory> = {
  numeric: {
    label: "Numeric",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    types: [
      { name: "SMALLINT", size: "2 bytes", description: "-32,768 to 32,767" },
      { name: "INTEGER", size: "4 bytes", description: "-2.1B to 2.1B" },
      { name: "BIGINT", size: "8 bytes", description: "-9.2 quintillion to 9.2 quintillion" },
      { name: "NUMERIC(p,s)", size: "variable", description: "Exact precision (e.g., money)" },
      { name: "REAL", size: "4 bytes", description: "6 decimal digits precision" },
      { name: "DOUBLE PRECISION", size: "8 bytes", description: "15 decimal digits precision" },
      { name: "SERIAL", size: "4 bytes", description: "Auto-incrementing integer" },
    ],
    example: `SELECT\n  42 AS integer_val,\n  3.14159::NUMERIC(7,5) AS precise,\n  1000000::BIGINT AS big,\n  1.5::REAL AS approx;\n\n-- Exact vs floating point\nSELECT 0.1::NUMERIC + 0.2::NUMERIC AS exact,\n       0.1::REAL + 0.2::REAL AS approx;`,
    output: [
      "integer_val: 42",
      "precise: 3.14159",
      "big: 1000000",
      "approx: 1.5",
      "exact: 0.3",
      "approx: 0.30000001192092896",
    ],
  },
  text: {
    label: "Text",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    types: [
      { name: "CHAR(n)", size: "n bytes", description: "Fixed-length, padded with spaces" },
      { name: "VARCHAR(n)", size: "up to n", description: "Variable-length with limit" },
      { name: "TEXT", size: "unlimited", description: "Variable-length, no limit" },
    ],
    example: `SELECT\n  'Hello'::CHAR(10) AS fixed,\n  LENGTH('Hello'::CHAR(10)) AS char_len,\n  'Hello'::VARCHAR(50) AS variable,\n  'Hello World'::TEXT AS unlimited;\n\nSELECT\n  UPPER('hello') AS upper,\n  LOWER('HELLO') AS lower,\n  CONCAT('Postgre', 'SQL') AS joined;`,
    output: [
      "fixed: 'Hello     '",
      "char_len: 10",
      "variable: 'Hello'",
      "unlimited: 'Hello World'",
      "upper: HELLO",
      "lower: hello",
      "joined: PostgreSQL",
    ],
  },
  datetime: {
    label: "Date / Time",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    types: [
      { name: "DATE", size: "4 bytes", description: "Date only (no time)" },
      { name: "TIME", size: "8 bytes", description: "Time only (no date)" },
      { name: "TIMESTAMP", size: "8 bytes", description: "Date + time (no timezone)" },
      { name: "TIMESTAMPTZ", size: "8 bytes", description: "Date + time + timezone" },
      { name: "INTERVAL", size: "16 bytes", description: "Duration / time span" },
    ],
    example: `SELECT\n  CURRENT_DATE AS today,\n  CURRENT_TIME AS now_time,\n  NOW() AS full_timestamp;\n\n-- Date arithmetic\nSELECT\n  CURRENT_DATE + INTERVAL '7 days' AS next_week,\n  CURRENT_DATE - INTERVAL '1 month' AS last_month,\n  AGE(TIMESTAMP '2000-01-01') AS age;`,
    output: [
      "today: 2024-01-15",
      "now_time: 10:30:00",
      "full_timestamp: 2024-01-15 10:30:00+00",
      "next_week: 2024-01-22",
      "last_month: 2023-12-15",
      "age: 24 years 15 days",
    ],
  },
  boolean: {
    label: "Boolean",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    types: [
      { name: "BOOLEAN", size: "1 byte", description: "TRUE, FALSE, or NULL" },
    ],
    example: `SELECT\n  TRUE AS yes,\n  FALSE AS no,\n  NULL::BOOLEAN AS unknown;\n\n-- Boolean expressions\nSELECT\n  TRUE AND FALSE AS and_result,\n  TRUE OR FALSE AS or_result,\n  NOT TRUE AS not_result;\n\n-- PostgreSQL accepts many boolean literals:\n-- TRUE: true, 't', 'yes', 'y', 'on', '1'\n-- FALSE: false, 'f', 'no', 'n', 'off', '0'`,
    output: [
      "yes: true",
      "no: false",
      "unknown: NULL",
      "and_result: false",
      "or_result: true",
      "not_result: false",
    ],
  },
  special: {
    label: "Special",
    color: "bg-pink-500/15 border-pink-500/40 text-pink-700 dark:text-pink-300",
    badgeColor: "bg-pink-500/20 text-pink-700 dark:text-pink-300",
    types: [
      { name: "UUID", size: "16 bytes", description: "Universally unique identifier" },
      { name: "JSON", size: "variable", description: "JSON text (preserves formatting)" },
      { name: "JSONB", size: "variable", description: "Binary JSON (fast queries, indexable)" },
      { name: "ARRAY", size: "variable", description: "Array of any data type" },
      { name: "BYTEA", size: "variable", description: "Binary data (images, files)" },
      { name: "INET", size: "7-19 bytes", description: "IPv4 or IPv6 network address" },
    ],
    example: `-- UUID\nSELECT gen_random_uuid() AS id;\n\n-- JSONB\nSELECT '{"name":"Alice","age":30}'::JSONB\n  ->> 'name' AS extracted;\n\n-- Array\nSELECT ARRAY[1,2,3] AS nums,\n       ARRAY['a','b','c'] AS letters;\n\n-- Network\nSELECT '192.168.1.0/24'::INET AS network;`,
    output: [
      "id: a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "extracted: Alice",
      "nums: {1,2,3}",
      "letters: {a,b,c}",
      "network: 192.168.1.0/24",
    ],
  },
};

const categoryOrder: CategoryKey[] = ["numeric", "text", "datetime", "boolean", "special"];

export function DataTypesVisualization() {
  const [selected, setSelected] = useState<CategoryKey>("numeric");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const cat = categories[selected];

  const handleSelect = (key: CategoryKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">PostgreSQL Data Types</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {categoryOrder.map((key) => {
            const c = categories[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive ? c.color + " shadow-sm" : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {c.label}
              </motion.button>
            );
          })}
        </div>

        {/* Types table */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <div className="rounded-xl border overflow-hidden text-xs">
              <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                <span>Type</span>
                <span>Size</span>
                <span>Description</span>
              </div>
              {cat.types.map((t) => (
                <div key={t.name} className="grid grid-cols-3 px-3 py-2 border-t hover:bg-muted/30">
                  <code className="font-mono text-primary font-medium">{t.name}</code>
                  <span className="text-muted-foreground">{t.size}</span>
                  <span className="text-muted-foreground">{t.description}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Example + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Example SQL</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]">
              {cat.example}
            </pre>
            <Button size="sm" onClick={() => setOutputLines(cat.output)}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <AnimatePresence mode="wait">
              {outputLines ? (
                <motion.div
                  key="out"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[100px]"
                >
                  {outputLines.map((line, i) => (
                    <p key={i} className="text-emerald-400">
                      <span className="text-zinc-500 select-none mr-2">#</span>
                      {line}
                    </p>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="ph"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[100px] flex items-center justify-center"
                >
                  <p className="text-xs text-muted-foreground italic">Click Run to see output</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
