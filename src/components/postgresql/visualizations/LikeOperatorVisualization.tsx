"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type OperatorKey = "percent" | "underscore" | "ilike" | "not_like";

interface PatternMatch {
  text: string;
  matches: boolean;
  highlightRanges: [number, number][];
}

interface OperatorInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  example: string;
  output: string[];
  patterns: PatternMatch[];
}

const operators: Record<OperatorKey, OperatorInfo> = {
  percent: {
    label: "% Wildcard",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The % wildcard matches any sequence of zero or more characters. It can be placed at the beginning, end, or both sides of a pattern.",
    example: `-- Starts with 'Post'\nSELECT name FROM products\nWHERE name LIKE 'Post%';\n\n-- Ends with 'SQL'\nSELECT name FROM products\nWHERE name LIKE '%SQL';\n\n-- Contains 'gre'\nSELECT name FROM products\nWHERE name LIKE '%gre%';`,
    output: [
      "-- LIKE 'Post%'",
      "PostgreSQL",
      "Postgres",
      "PostGIS",
      "",
      "-- LIKE '%SQL'",
      "PostgreSQL",
      "MySQL",
      "NoSQL",
      "",
      "-- LIKE '%gre%'",
      "PostgreSQL",
      "Postgres",
    ],
    patterns: [
      { text: "PostgreSQL", matches: true, highlightRanges: [[0, 4]] },
      { text: "Postgres", matches: true, highlightRanges: [[0, 4]] },
      { text: "PostGIS", matches: true, highlightRanges: [[0, 4]] },
      { text: "MySQL", matches: false, highlightRanges: [] },
      { text: "MongoDB", matches: false, highlightRanges: [] },
    ],
  },
  underscore: {
    label: "_ Wildcard",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "The _ wildcard matches exactly one single character. Use multiple underscores to match a specific number of characters.",
    example: `-- Second character is 'o'\nSELECT name FROM products\nWHERE name LIKE '_o%';\n\n-- Exactly 3 characters\nSELECT code FROM products\nWHERE code LIKE '___';\n\n-- Pattern: A_B (A, any char, B)\nSELECT code FROM products\nWHERE code LIKE 'A_B';`,
    output: [
      "-- LIKE '_o%'",
      "PostgreSQL",
      "MongoDB",
      "",
      "-- LIKE '___' (3 chars)",
      "SQL",
      "API",
      "CSV",
      "",
      "-- LIKE 'A_B'",
      "ACB",
      "ADB",
      "AXB",
    ],
    patterns: [
      { text: "PostgreSQL", matches: true, highlightRanges: [[1, 2]] },
      { text: "MongoDB", matches: true, highlightRanges: [[1, 2]] },
      { text: "MySQL", matches: false, highlightRanges: [] },
      { text: "Redis", matches: false, highlightRanges: [] },
      { text: "DotNet", matches: true, highlightRanges: [[1, 2]] },
    ],
  },
  ilike: {
    label: "ILIKE",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "ILIKE is a PostgreSQL extension that performs case-insensitive pattern matching. Standard SQL only has LIKE (case-sensitive).",
    example: `-- Case-sensitive LIKE (misses matches)\nSELECT name FROM users\nWHERE name LIKE 'alice%';\n-- Returns: (nothing)\n\n-- Case-insensitive ILIKE\nSELECT name FROM users\nWHERE name ILIKE 'alice%';\n-- Returns: Alice, ALICE, alice\n\n-- ILIKE with wildcards\nSELECT name FROM users\nWHERE name ILIKE '%SQL%';`,
    output: [
      "-- LIKE 'alice%' (case-sensitive)",
      "alice",
      "",
      "-- ILIKE 'alice%' (case-insensitive)",
      "Alice",
      "ALICE",
      "alice",
      "alice_wonder",
      "",
      "-- ILIKE '%SQL%'",
      "PostgreSQL",
      "mysql",
      "NoSQL",
    ],
    patterns: [
      { text: "Alice", matches: true, highlightRanges: [[0, 5]] },
      { text: "ALICE", matches: true, highlightRanges: [[0, 5]] },
      { text: "alice", matches: true, highlightRanges: [[0, 5]] },
      { text: "Bob", matches: false, highlightRanges: [] },
      { text: "alice_wonder", matches: true, highlightRanges: [[0, 5]] },
    ],
  },
  not_like: {
    label: "NOT LIKE",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "NOT LIKE returns rows that do NOT match the pattern. It is the negation of LIKE. Can also be used as NOT ILIKE for case-insensitive negation.",
    example: `-- Names NOT starting with 'A'\nSELECT name FROM users\nWHERE name NOT LIKE 'A%';\n\n-- Emails NOT from gmail\nSELECT email FROM users\nWHERE email NOT LIKE '%@gmail.com';\n\n-- NOT ILIKE (case-insensitive)\nSELECT name FROM users\nWHERE name NOT ILIKE '%admin%';`,
    output: [
      "-- NOT LIKE 'A%'",
      "Bob",
      "Charlie",
      "Diana",
      "",
      "-- NOT LIKE '%@gmail.com'",
      "bob@yahoo.com",
      "charlie@outlook.com",
      "",
      "-- NOT ILIKE '%admin%'",
      "Bob",
      "Charlie",
      "Diana",
    ],
    patterns: [
      { text: "Alice", matches: false, highlightRanges: [[0, 1]] },
      { text: "Bob", matches: true, highlightRanges: [] },
      { text: "Anna", matches: false, highlightRanges: [[0, 1]] },
      { text: "Charlie", matches: true, highlightRanges: [] },
      { text: "Amy", matches: false, highlightRanges: [[0, 1]] },
    ],
  },
};

const operatorOrder: OperatorKey[] = ["percent", "underscore", "ilike", "not_like"];

function HighlightedText({
  text,
  matches,
  highlightRanges,
  color,
}: PatternMatch & { color: string }) {
  if (highlightRanges.length === 0) {
    return (
      <span className={matches ? "text-foreground" : "text-muted-foreground line-through"}>
        {text}
      </span>
    );
  }

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  highlightRanges.forEach(([start, end], i) => {
    if (start > lastIndex) {
      parts.push(
        <span key={`before-${i}`} className="text-foreground">
          {text.slice(lastIndex, start)}
        </span>
      );
    }
    parts.push(
      <span key={`hl-${i}`} className={`font-bold ${color} rounded px-0.5`}>
        {text.slice(start, end)}
      </span>
    );
    lastIndex = end;
  });

  if (lastIndex < text.length) {
    parts.push(
      <span key="after" className="text-foreground">
        {text.slice(lastIndex)}
      </span>
    );
  }

  return <>{parts}</>;
}

export function LikeOperatorVisualization() {
  const [selected, setSelected] = useState<OperatorKey>("percent");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const op = operators[selected];

  const handleSelect = (key: OperatorKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  const highlightColor =
    selected === "percent"
      ? "text-blue-600 dark:text-blue-400 bg-blue-500/20"
      : selected === "underscore"
        ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/20"
        : selected === "ilike"
          ? "text-violet-600 dark:text-violet-400 bg-violet-500/20"
          : "text-orange-600 dark:text-orange-400 bg-orange-500/20";

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">LIKE Operator & Pattern Matching</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Operator tabs */}
        <div className="flex flex-wrap gap-2">
          {operatorOrder.map((key) => {
            const o = operators[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? o.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {o.label}
              </motion.button>
            );
          })}
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`rounded-xl border p-3 ${op.color}`}
          >
            <p className="text-sm">{op.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Pattern matching demo */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Pattern Matching Demo</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-xl border overflow-hidden text-xs"
            >
              <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                <span>Value</span>
                <span>Pattern</span>
                <span>Match?</span>
              </div>
              {op.patterns.map((p, i) => (
                <motion.div
                  key={p.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-3 px-3 py-2 border-t hover:bg-muted/30 items-center"
                >
                  <code className="font-mono">
                    <HighlightedText {...p} color={highlightColor} />
                  </code>
                  <span className="text-muted-foreground font-mono">
                    {selected === "percent" && "'Post%'"}
                    {selected === "underscore" && "'_o%'"}
                    {selected === "ilike" && "ILIKE 'alice%'"}
                    {selected === "not_like" && "NOT LIKE 'A%'"}
                  </span>
                  <span>
                    {p.matches ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" /> Match
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-500 dark:text-red-400 font-medium">
                        <span className="h-2 w-2 rounded-full bg-red-500" /> No match
                      </span>
                    )}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Example + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Example SQL</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]">
              {op.example}
            </pre>
            <Button size="sm" onClick={() => setOutputLines(op.output)}>
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
                  {outputLines.map((line, i) =>
                    line === "" ? (
                      <div key={i} className="h-2" />
                    ) : (
                      <p
                        key={i}
                        className={line.startsWith("--") ? "text-zinc-500" : "text-emerald-400"}
                      >
                        <span className="text-zinc-500 select-none mr-2">
                          {line.startsWith("--") ? "" : "#"}
                        </span>
                        {line}
                      </p>
                    )
                  )}
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
