"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function SQLOutput({ lines }: Readonly<{ lines: string[] | null }>) {
  return (
    <AnimatePresence mode="wait">
      {lines ? (
        <motion.div
          key="out"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[52px]"
        >
          {lines.map((line, i) => (
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
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[52px] flex items-center justify-center"
        >
          <p className="text-xs text-muted-foreground italic">Click Run to see output</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type FeatureKey = "opensource" | "acid" | "datatypes" | "mvcc" | "extensible";

interface Feature {
  label: string;
  category: string;
  color: string;
  badgeColor: string;
  description: string;
  highlights: string[];
  example: string;
  output: string[];
}

const features: Record<FeatureKey, Feature> = {
  opensource: {
    label: "Open Source",
    category: "License",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "PostgreSQL is released under the PostgreSQL License, a permissive open-source license. It is free to use, modify, and distribute for any purpose — commercial or otherwise.",
    highlights: ["Free forever", "No vendor lock-in", "Active community"],
    example: `-- Check PostgreSQL version\nSELECT version();\n\n-- See current user\nSELECT current_user;`,
    output: ["PostgreSQL 16.2 on x86_64-linux", "current_user: postgres"],
  },
  acid: {
    label: "ACID Compliant",
    category: "Reliability",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "PostgreSQL guarantees Atomicity, Consistency, Isolation, and Durability for all transactions. This ensures your data is always reliable, even during crashes or power failures.",
    highlights: ["Atomicity", "Consistency", "Isolation & Durability"],
    example: `-- ACID in action: transaction\nBEGIN;\n  INSERT INTO accounts (name, balance)\n  VALUES ('Alice', 1000);\n  UPDATE accounts SET balance = balance - 500\n  WHERE name = 'Alice';\nCOMMIT;\n\nSELECT name, balance FROM accounts;`,
    output: ["BEGIN", "INSERT 0 1", "UPDATE 1", "COMMIT", "Alice | 500.00"],
  },
  datatypes: {
    label: "Rich Data Types",
    category: "Flexibility",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "PostgreSQL supports an extensive set of data types: integers, text, booleans, dates, JSON/JSONB, arrays, UUIDs, network addresses, geometric types, and even user-defined types.",
    highlights: ["JSONB support", "Arrays", "UUID & custom types"],
    example: `-- Rich data types\nSELECT\n  42 AS integer_val,\n  'Hello'::TEXT AS text_val,\n  TRUE AS bool_val,\n  NOW() AS timestamp_val,\n  '{"key":"val"}'::JSONB AS json_val,\n  ARRAY[1,2,3] AS array_val;`,
    output: [
      "integer_val: 42",
      "text_val: Hello",
      "bool_val: true",
      "timestamp_val: 2024-01-15 10:30:00+00",
      'json_val: {"key": "val"}',
      "array_val: {1,2,3}",
    ],
  },
  mvcc: {
    label: "MVCC",
    category: "Concurrency",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Multi-Version Concurrency Control allows multiple transactions to read and write data simultaneously without blocking each other. Readers never block writers and writers never block readers.",
    highlights: ["No read locks", "Snapshot isolation", "High throughput"],
    example: `-- Session 1: starts a transaction\nBEGIN;\nSELECT balance FROM accounts\nWHERE name = 'Alice';\n-- sees: 1000\n\n-- Session 2 (concurrent):\nUPDATE accounts SET balance = 500\nWHERE name = 'Alice';\n\n-- Session 1 still sees: 1000\n-- (snapshot isolation)`,
    output: [
      "Session 1 sees: balance = 1000",
      "Session 2 updates: balance -> 500",
      "Session 1 still sees: balance = 1000",
      "(Each session has its own snapshot)",
    ],
  },
  extensible: {
    label: "Extensible",
    category: "Ecosystem",
    color: "bg-pink-500/15 border-pink-500/40 text-pink-700 dark:text-pink-300",
    badgeColor: "bg-pink-500/20 text-pink-700 dark:text-pink-300",
    description:
      "PostgreSQL can be extended with custom functions, data types, operators, index types, and procedural languages. Popular extensions include PostGIS, pg_trgm, pgcrypto, and TimescaleDB.",
    highlights: ["Custom functions", "Extensions (PostGIS)", "Multiple languages"],
    example: `-- List installed extensions\nSELECT extname, extversion\nFROM pg_extension;\n\n-- Enable an extension\nCREATE EXTENSION IF NOT EXISTS\n  pg_trgm;\n\n-- Use it: fuzzy text search\nSELECT similarity('PostgreSQL', 'Postgres');`,
    output: [
      "plpgsql | 1.0",
      "pg_trgm | 1.6",
      "CREATE EXTENSION",
      "similarity: 0.6153846",
    ],
  },
};

const order: FeatureKey[] = ["opensource", "acid", "datatypes", "mvcc", "extensible"];

export function IntroductionVisualization() {
  const [selected, setSelected] = useState<FeatureKey>("opensource");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const feature = features[selected];

  const handleSelect = (key: FeatureKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Introduction to PostgreSQL</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Key Features
          </p>
          <div className="relative flex items-center justify-between gap-1">
            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-border -translate-y-1/2 z-0" />
            {order.map((key) => {
              const f = features[key];
              const isActive = selected === key;
              return (
                <motion.button
                  key={key}
                  onClick={() => handleSelect(key)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative z-10 flex flex-col items-center gap-1.5 px-2 py-1.5 rounded-xl border transition-all ${
                    isActive
                      ? f.color + " shadow-sm scale-105"
                      : "bg-background border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <span className="text-xs font-bold">{f.label}</span>
                  <span className="text-[10px] leading-tight text-center max-w-[80px] hidden sm:block">
                    {f.category}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl border p-4 space-y-3 ${feature.color}`}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-lg font-bold">{feature.label}</span>
              <Badge variant="secondary" className={`text-[10px] ${feature.badgeColor}`}>
                {feature.category}
              </Badge>
            </div>
            <p className="text-sm leading-relaxed">{feature.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {feature.highlights.map((h) => (
                <Badge key={h} variant="outline" className="text-[10px] font-normal">
                  {h}
                </Badge>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">SQL</p>
            <AnimatePresence mode="wait">
              <motion.pre
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]"
              >
                {feature.example}
              </motion.pre>
            </AnimatePresence>
            <Button size="sm" onClick={() => setOutputLines(feature.output)}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <SQLOutput lines={outputLines} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
