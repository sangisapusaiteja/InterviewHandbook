"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Play, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FtsTab = "pipeline" | "search" | "comparison";

const tabInfo: Record<FtsTab, { label: string; color: string }> = {
  pipeline: {
    label: "Text Search Pipeline",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  },
  search: {
    label: "Interactive Search",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  },
  comparison: {
    label: "LIKE vs Full-Text",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  },
};

const tabOrder: FtsTab[] = ["pipeline", "search", "comparison"];

interface DocResult {
  title: string;
  body: string;
  rank: number;
  matchedTerms: string[];
}

const documents: DocResult[] = [
  {
    title: "PostgreSQL Performance Tuning",
    body: "Learn how to optimize PostgreSQL queries with indexing strategies and query planning.",
    rank: 0.85,
    matchedTerms: ["postgresql", "queri", "index"],
  },
  {
    title: "Database Indexing Guide",
    body: "A comprehensive guide to creating and managing indexes in PostgreSQL databases.",
    rank: 0.72,
    matchedTerms: ["index", "postgresql", "databas"],
  },
  {
    title: "SQL Query Optimization",
    body: "Tips for writing efficient SQL queries that leverage PostgreSQL features.",
    rank: 0.61,
    matchedTerms: ["queri", "postgresql"],
  },
];

const pipelineSteps = [
  { label: "Document", example: '"PostgreSQL queries and indexing"', color: "bg-emerald-500/15 border-emerald-500/30" },
  { label: "to_tsvector()", example: "'postgresql':1 'queri':2 'index':4", color: "bg-blue-500/15 border-blue-500/30" },
  { label: "Query", example: '"PostgreSQL & indexing"', color: "bg-emerald-500/15 border-emerald-500/30" },
  { label: "to_tsquery()", example: "'postgresql' & 'index'", color: "bg-violet-500/15 border-violet-500/30" },
  { label: "@@  match", example: "tsvector @@ tsquery = true", color: "bg-orange-500/15 border-orange-500/30" },
];

const searchSQL = `-- Full-text search with ranking
SELECT title, body,
  ts_rank(
    to_tsvector('english', body),
    to_tsquery('english', 'postgresql & indexing')
  ) AS rank
FROM articles
WHERE to_tsvector('english', body)
  @@ to_tsquery('english', 'postgresql & indexing')
ORDER BY rank DESC;`;

export function FullTextSearchVisualization() {
  const [activeTab, setActiveTab] = useState<FtsTab>("pipeline");
  const [pipelineStep, setPipelineStep] = useState(-1);
  const [showResults, setShowResults] = useState(false);

  const handlePipeline = () => {
    setPipelineStep(0);
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= pipelineSteps.length) {
        clearInterval(interval);
        return;
      }
      setPipelineStep(current);
    }, 700);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Full-Text Search</CardTitle>
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
                  setPipelineStep(-1);
                  setShowResults(false);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? t.color + " shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <Search className="h-3 w-3" />
                {t.label}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "pipeline" && (
            <motion.div
              key="pipeline"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3">
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  Full-text search converts documents into <strong>tsvector</strong> tokens
                  and queries into <strong>tsquery</strong> terms, then matches them using
                  the <code className="text-xs bg-emerald-500/20 px-1 py-0.5 rounded">@@</code> operator.
                </p>
              </div>

              {/* Pipeline visualization */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Processing Pipeline
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 overflow-x-auto py-2">
                  {pipelineSteps.map((ps, i) => (
                    <div key={ps.label} className="flex items-center gap-0 shrink-0">
                      <motion.div
                        animate={{
                          scale: pipelineStep === i ? 1.05 : 1,
                          boxShadow:
                            pipelineStep === i
                              ? "0 0 12px rgba(16, 185, 129, 0.3)"
                              : "none",
                        }}
                        className={`rounded-xl border p-2.5 min-w-[130px] transition-colors ${
                          pipelineStep >= i ? ps.color : "bg-muted/20 border-border"
                        }`}
                      >
                        <p className="text-[10px] font-bold mb-1">{ps.label}</p>
                        <p className="text-[9px] font-mono text-muted-foreground break-all">
                          {ps.example}
                        </p>
                      </motion.div>
                      {i < pipelineSteps.length - 1 && (
                        <ArrowRight className="hidden sm:block h-3.5 w-3.5 text-muted-foreground shrink-0 mx-1" />
                      )}
                    </div>
                  ))}
                </div>
                <Button size="sm" onClick={handlePipeline}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Animate Pipeline
                </Button>
              </div>

              {/* Key concepts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  {
                    title: "tsvector",
                    desc: "Sorted list of normalized lexemes (word stems) with positions",
                    color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
                  },
                  {
                    title: "tsquery",
                    desc: "Boolean combination of lexemes using & (AND), | (OR), ! (NOT)",
                    color: "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300",
                  },
                  {
                    title: "ts_rank()",
                    desc: "Scores relevance based on term frequency, proximity, and coverage",
                    color: "bg-violet-500/10 border-violet-500/30 text-violet-700 dark:text-violet-300",
                  },
                ].map((concept) => (
                  <div
                    key={concept.title}
                    className={`rounded-xl border p-2.5 ${concept.color}`}
                  >
                    <p className="text-xs font-bold mb-0.5">{concept.title}</p>
                    <p className="text-[10px] leading-relaxed">{concept.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "search" && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Search for <strong>&quot;postgresql &amp; indexing&quot;</strong> across articles.
                  Results are ranked by relevance using <code className="text-xs bg-blue-500/20 px-1 py-0.5 rounded">ts_rank</code>.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Query</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
                  {searchSQL}
                </pre>
                <Button size="sm" onClick={() => setShowResults(true)}>
                  <Search className="h-3.5 w-3.5 mr-1" /> Search
                </Button>
              </div>

              <AnimatePresence mode="wait">
                {showResults && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <p className="text-xs font-semibold text-muted-foreground">
                      Results (ranked by relevance)
                    </p>
                    {documents.map((doc, i) => (
                      <motion.div
                        key={doc.title}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 }}
                        className="rounded-xl border bg-muted/20 p-3 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold">{doc.title}</p>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-700 dark:text-blue-300">
                            rank: {doc.rank.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{doc.body}</p>
                        <div className="flex gap-1 pt-1">
                          {doc.matchedTerms.map((term) => (
                            <span
                              key={term}
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                            >
                              {term}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === "comparison" && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-violet-500/10 border-violet-500/30 p-3">
                <p className="text-sm text-violet-700 dark:text-violet-300">
                  Full-text search offers major advantages over
                  <code className="text-xs bg-violet-500/20 px-1 py-0.5 rounded mx-1">LIKE</code>
                  and
                  <code className="text-xs bg-violet-500/20 px-1 py-0.5 rounded mx-1">ILIKE</code>
                  for searching natural language text.
                </p>
              </div>

              <div className="rounded-xl border bg-muted/20 overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="px-3 py-2 text-left font-semibold">Feature</th>
                      <th className="px-3 py-2 text-center font-semibold text-orange-600 dark:text-orange-400">
                        LIKE / ILIKE
                      </th>
                      <th className="px-3 py-2 text-center font-semibold text-emerald-600 dark:text-emerald-400">
                        Full-Text Search
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Stemming (run/running/ran)", like: "No", fts: "Yes" },
                      { feature: "Relevance ranking", like: "No", fts: "Yes (ts_rank)" },
                      { feature: "Boolean operators", like: "No", fts: "AND, OR, NOT" },
                      { feature: "Index support", like: "Only prefix (%)", fts: "GIN / GiST" },
                      { feature: "Stop word removal", like: "No", fts: "Yes (the, a, is...)" },
                      { feature: "Language awareness", like: "No", fts: "30+ languages" },
                      { feature: "Performance at scale", like: "Slow (seq scan)", fts: "Fast (indexed)" },
                    ].map((row) => (
                      <tr key={row.feature} className="border-b last:border-b-0">
                        <td className="px-3 py-1.5 font-medium">{row.feature}</td>
                        <td className="px-3 py-1.5 text-center text-orange-600 dark:text-orange-400">
                          {row.like}
                        </td>
                        <td className="px-3 py-1.5 text-center text-emerald-600 dark:text-emerald-400 font-medium">
                          {row.fts}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3">
                  <p className="text-xs font-bold text-orange-700 dark:text-orange-300 mb-1">
                    LIKE / ILIKE
                  </p>
                  <pre className="text-[10px] font-mono bg-background/60 rounded-lg p-2 whitespace-pre">
{`SELECT * FROM articles
WHERE body ILIKE '%running%';
-- No stemming: misses "run", "ran"`}</pre>
                </div>
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <Zap className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      Full-Text Search
                    </p>
                  </div>
                  <pre className="text-[10px] font-mono bg-background/60 rounded-lg p-2 whitespace-pre">
{`SELECT * FROM articles
WHERE to_tsvector(body)
  @@ to_tsquery('running');
-- Finds "run", "running", "ran"`}</pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
