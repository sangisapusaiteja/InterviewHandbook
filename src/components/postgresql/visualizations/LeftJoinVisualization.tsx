"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TabKey = "basic" | "nulls" | "anti_join" | "vs_inner";

interface TabInfo {
  label: string;
  color: string;
  description: string;
  sql: string;
  output: string[];
  highlightUnmatched: boolean;
  showAntiJoin: boolean;
  showInnerComparison: boolean;
}

const tabs: Record<TabKey, TabInfo> = {
  basic: {
    label: "Basic LEFT JOIN",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "LEFT JOIN returns all rows from the left table, plus matched rows from the right table. If there is no match, the right side columns contain NULL. Every left row is preserved.",
    sql: `SELECT a.name AS author, b.title AS book
FROM authors a
LEFT JOIN books b
  ON a.id = b.author_id;`,
    output: [
      " author  |       book",
      "---------+------------------",
      " Alice   | SQL Basics",
      " Alice   | Query Patterns",
      " Bob     | Data Models",
      " Charlie | NULL",
    ],
    highlightUnmatched: false,
    showAntiJoin: false,
    showInnerComparison: false,
  },
  nulls: {
    label: "NULL Values",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "When a left row has no match in the right table, all right-side columns are filled with NULL. This is the key difference from INNER JOIN — unmatched left rows are kept, not discarded.",
    sql: `SELECT a.name AS author,
       b.title AS book,
       b.year AS published
FROM authors a
LEFT JOIN books b
  ON a.id = b.author_id;`,
    output: [
      " author  |      book      | published",
      "---------+----------------+----------",
      " Alice   | SQL Basics     | 2021",
      " Alice   | Query Patterns | 2023",
      " Bob     | Data Models    | 2022",
      " Charlie | NULL           | NULL",
    ],
    highlightUnmatched: true,
    showAntiJoin: false,
    showInnerComparison: false,
  },
  anti_join: {
    label: "Anti Join",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "LEFT JOIN + WHERE right_key IS NULL finds rows in the left table that have NO match in the right table. This pattern is called an anti join — useful for finding orphan or missing records.",
    sql: `-- Find authors with no books
SELECT a.name AS author
FROM authors a
LEFT JOIN books b
  ON a.id = b.author_id
WHERE b.id IS NULL;`,
    output: [
      " author",
      "---------",
      " Charlie",
      "",
      "(1 row) -- only unmatched left rows",
    ],
    highlightUnmatched: false,
    showAntiJoin: true,
    showInnerComparison: false,
  },
  vs_inner: {
    label: "vs INNER JOIN",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    description:
      "INNER JOIN only returns rows where both sides match. LEFT JOIN keeps all left rows regardless. The difference is visible when a left row has no match — INNER drops it, LEFT keeps it with NULLs.",
    sql: `-- LEFT JOIN: 4 rows (Charlie with NULLs)
SELECT a.name, b.title
FROM authors a LEFT JOIN books b
  ON a.id = b.author_id;

-- INNER JOIN: 3 rows (Charlie excluded)
SELECT a.name, b.title
FROM authors a INNER JOIN books b
  ON a.id = b.author_id;`,
    output: [
      "LEFT JOIN  (4 rows):",
      " Alice   | SQL Basics",
      " Alice   | Query Patterns",
      " Bob     | Data Models",
      " Charlie | NULL          <-- kept!",
      "",
      "INNER JOIN (3 rows):",
      " Alice   | SQL Basics",
      " Alice   | Query Patterns",
      " Bob     | Data Models",
      "                          <-- Charlie gone",
    ],
    highlightUnmatched: false,
    showAntiJoin: false,
    showInnerComparison: true,
  },
};

const tabOrder: TabKey[] = ["basic", "nulls", "anti_join", "vs_inner"];

interface AuthorRow {
  id: number;
  name: string;
}
interface BookRow {
  id: number;
  title: string;
  author_id: number;
}

const authors: AuthorRow[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const books: BookRow[] = [
  { id: 1, title: "SQL Basics", author_id: 1 },
  { id: 2, title: "Query Patterns", author_id: 1 },
  { id: 3, title: "Data Models", author_id: 2 },
];

function getMatchedBooks(authorId: number): BookRow[] {
  return books.filter((b) => b.author_id === authorId);
}

const lineColors = [
  "stroke-blue-400",
  "stroke-emerald-400",
  "stroke-violet-400",
];

export function LeftJoinVisualization() {
  const [selected, setSelected] = useState<TabKey>("basic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: TabKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  // Build connection lines data
  const connections: { authorIdx: number; bookIdx: number; colorClass: string }[] = [];
  let colorIdx = 0;
  authors.forEach((a, aIdx) => {
    const matched = getMatchedBooks(a.id);
    matched.forEach((b) => {
      const bIdx = books.indexOf(b);
      connections.push({ authorIdx: aIdx, bookIdx: bIdx, colorClass: lineColors[colorIdx % lineColors.length] });
    });
    if (matched.length > 0) colorIdx++;
  });

  const unmatchedAuthors = authors.filter((a) => getMatchedBooks(a.id).length === 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">LEFT JOIN</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Tab selector */}
        <div className="flex flex-wrap gap-2">
          {tabOrder.map((key) => {
            const t = tabs[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive ? t.color + " shadow-sm" : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.label}
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
            className={`rounded-xl border p-3 ${tab.color}`}
          >
            <p className="text-sm">{tab.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Relationship diagram: authors <-> books */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {tab.showAntiJoin
              ? "Anti Join Diagram"
              : tab.showInnerComparison
              ? "LEFT vs INNER JOIN"
              : "Table Relationship"}
          </p>
          <div className="flex items-start justify-center gap-6 py-3">
            {/* Authors (left table) */}
            <div className="rounded-xl border bg-blue-500/10 p-3 min-w-[130px]">
              <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">
                authors (LEFT)
              </p>
              {authors.map((a) => {
                const hasMatch = getMatchedBooks(a.id).length > 0;
                const isHighlighted =
                  (!hasMatch && tab.highlightUnmatched) ||
                  (!hasMatch && tab.showAntiJoin);
                const isDimmed = tab.showAntiJoin && hasMatch;
                return (
                  <motion.div
                    key={a.id}
                    className={`flex items-center gap-2 text-[11px] py-1 px-1.5 rounded-md mb-0.5 ${
                      isHighlighted
                        ? "bg-amber-500/20 border border-amber-500/40"
                        : isDimmed
                        ? "opacity-30"
                        : ""
                    }`}
                    animate={isHighlighted ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <span className="font-mono text-muted-foreground w-4">{a.id}</span>
                    <span className="font-medium">{a.name}</span>
                    {!hasMatch && (tab.highlightUnmatched || tab.showAntiJoin) && (
                      <span className="ml-auto text-[9px] text-amber-600 dark:text-amber-400 font-semibold">
                        NO MATCH
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Connection arrows */}
            <div className="flex flex-col items-center justify-center pt-6 gap-0">
              <svg width="60" height={Math.max(authors.length, books.length) * 28 + 10} className="overflow-visible">
                {!tab.showAntiJoin &&
                  connections.map((c, i) => {
                    const y1 = c.authorIdx * 28 + 14;
                    const y2 = c.bookIdx * 28 + 14;
                    const dimmed = tab.showInnerComparison ? "" : "";
                    return (
                      <motion.line
                        key={i}
                        x1={0}
                        y1={y1}
                        x2={60}
                        y2={y2}
                        className={`${c.colorClass} ${dimmed}`}
                        strokeWidth={2}
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: i * 0.15, duration: 0.4 }}
                      />
                    );
                  })}
                {/* Show unmatched arrow with X for anti join */}
                {tab.showAntiJoin &&
                  unmatchedAuthors.map((a) => {
                    const aIdx = authors.indexOf(a);
                    const y = aIdx * 28 + 14;
                    return (
                      <g key={a.id}>
                        <motion.line
                          x1={0}
                          y1={y}
                          x2={40}
                          y2={y}
                          className="stroke-amber-500"
                          strokeWidth={2}
                          strokeDasharray="4 3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        />
                        <motion.text
                          x={46}
                          y={y + 4}
                          className="fill-red-500 text-[11px] font-bold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          X
                        </motion.text>
                      </g>
                    );
                  })}
                {/* Show unmatched dashed line for nulls and basic */}
                {!tab.showAntiJoin &&
                  unmatchedAuthors.map((a) => {
                    const aIdx = authors.indexOf(a);
                    const y = aIdx * 28 + 14;
                    return (
                      <motion.line
                        key={`unmatched-${a.id}`}
                        x1={0}
                        y1={y}
                        x2={60}
                        y2={y}
                        className="stroke-amber-400"
                        strokeWidth={1.5}
                        strokeDasharray="4 3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                      />
                    );
                  })}
              </svg>
            </div>

            {/* Books (right table) */}
            <div className={`rounded-xl border bg-emerald-500/10 p-3 min-w-[160px] ${tab.showAntiJoin ? "opacity-30" : ""}`}>
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2">
                books (RIGHT)
              </p>
              {books.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center gap-2 text-[11px] py-1 px-1.5 mb-0.5"
                >
                  <span className="font-mono text-muted-foreground w-4">{b.id}</span>
                  <span className="font-medium truncate">{b.title}</span>
                  <span className="ml-auto text-[9px] text-muted-foreground">
                    aid:{b.author_id}
                  </span>
                </div>
              ))}
              {/* NULL row for unmatched */}
              {!tab.showAntiJoin && (tab.highlightUnmatched || selected === "basic" || selected === "vs_inner") && (
                <motion.div
                  className="flex items-center gap-2 text-[11px] py-1 px-1.5 mb-0.5 rounded-md bg-amber-500/10 border border-dashed border-amber-500/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="font-mono text-amber-600 dark:text-amber-400 text-[10px]">NULL</span>
                  <span className="text-amber-600 dark:text-amber-400 text-[9px] italic">no match</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* INNER vs LEFT comparison note */}
          {tab.showInnerComparison && (
            <div className="flex gap-3 text-[11px] justify-center mt-1">
              <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-700 dark:text-blue-300">
                LEFT JOIN: 4 rows (Charlie kept)
              </span>
              <span className="px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/30 text-orange-700 dark:text-orange-300">
                INNER JOIN: 3 rows (Charlie dropped)
              </span>
            </div>
          )}
        </div>

        {/* SQL + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">SQL Query</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]">
              {tab.sql}
            </pre>
            <Button size="sm" onClick={() => setOutputLines(tab.output)}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <AnimatePresence mode="wait">
              {outputLines ? (
                <motion.div
                  key="out"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[100px]"
                >
                  {outputLines.map((line, i) => (
                    <p
                      key={i}
                      className={
                        line.includes("NULL")
                          ? "text-amber-400"
                          : line.includes("<--")
                          ? "text-amber-400"
                          : line.startsWith("LEFT") || line.startsWith("INNER")
                          ? "text-blue-400"
                          : line.includes("---") || line.includes("===")
                          ? "text-muted-foreground"
                          : line === ""
                          ? ""
                          : "text-emerald-400"
                      }
                    >
                      {line || "\u00A0"}
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
