"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Play, RotateCcw, Copy, Check, Database, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { usePGlite } from "@/hooks/usePGlite";
import type { SQLResult } from "@/hooks/usePGlite";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface SQLEditorSectionProps {
  defaultCode: string;
  language: string;
}

function formatCellValue(value: unknown) {
  if (value === null || value === undefined) {
    return <span className="text-zinc-500 italic">NULL</span>;
  }
  if (typeof value === "boolean") {
    return (
      <span className={value ? "text-emerald-400" : "text-orange-400"}>
        {String(value)}
      </span>
    );
  }
  if (typeof value === "number") {
    return <span className="text-violet-400">{String(value)}</span>;
  }
  if (typeof value === "object") {
    return <span className="text-amber-400">{JSON.stringify(value)}</span>;
  }
  return <span className="text-zinc-200">{String(value)}</span>;
}

function ResultTable({ result, index }: { result: SQLResult; index: number }) {
  if (result.columns.length === 0) return null;

  return (
    <div className="rounded-md border border-zinc-800">
      <div className="flex items-center justify-between bg-zinc-800/80 px-3 py-1.5 rounded-t-md">
        <span className="text-[11px] font-medium text-zinc-300">
          Query {index + 1}
        </span>
        <span className="text-[10px] text-zinc-500">
          {result.rows.length} row{result.rows.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-[12px] font-mono">
          <thead>
            <tr className="bg-zinc-900 border-b border-zinc-800">
              {result.columns.map((col) => (
                <th
                  key={col}
                  className="px-3 py-2 text-left font-semibold text-emerald-400 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-zinc-800/60 hover:bg-zinc-800/30 ${
                  i % 2 === 1 ? "bg-zinc-900/40" : ""
                }`}
              >
                {result.columns.map((col) => (
                  <td key={col} className="px-3 py-1.5 whitespace-nowrap">
                    {formatCellValue(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SQLEditorSection({ defaultCode, language }: SQLEditorSectionProps) {
  const [code, setCode] = useState(defaultCode);
  const [results, setResults] = useState<SQLResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const { theme } = useTheme();
  const { exec, isReady, isLoading } = usePGlite();

  const runCode = useCallback(async () => {
    if (!isReady) return;
    setIsRunning(true);
    setError(null);
    setResults([]);
    setExecutionTime(null);

    const start = performance.now();
    try {
      const res = await exec(code);
      setExecutionTime(performance.now() - start);
      setResults(res);
    } catch (err) {
      setExecutionTime(performance.now() - start);
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setIsRunning(false);
    }
  }, [code, isReady, exec]);

  const resetCode = useCallback(() => {
    setCode(defaultCode);
    setResults([]);
    setError(null);
    setExecutionTime(null);
  }, [defaultCode]);

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available
    }
  }, [code]);

  const statementResults = results.filter((r) => r.columns.length === 0);
  const tableResults = results.filter((r) => r.columns.length > 0);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Editor */}
      <Card className="flex flex-col flex-1 min-w-0">
        <CardHeader className="pb-3 shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">SQL Editor</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={copyCode} className="h-8">
                {copied ? (
                  <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5 mr-1" />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button variant="ghost" size="sm" onClick={resetCode} className="h-8">
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                Reset
              </Button>
              <Button
                size="sm"
                onClick={runCode}
                disabled={isRunning || !isReady}
                className="h-8"
              >
                {isRunning ? (
                  <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                ) : (
                  <Play className="h-3.5 w-3.5 mr-1" />
                )}
                {isRunning ? "Running..." : "Run SQL"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1">
          <div className="border-t rounded-b-lg overflow-hidden">
            <Editor
              height="500px"
              language={language}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme={theme === "dark" ? "vs-dark" : "light"}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: "on",
                padding: { top: 16 },
                renderLineHighlight: "line",
                cursorBlinking: "smooth",
                smoothScrolling: true,
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Results - side by side */}
      <div className="flex-1 min-w-0">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3 shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Database className="h-5 w-5 text-emerald-500" />
                Query Results
              </CardTitle>
              {executionTime !== null && (
                <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded">
                  {executionTime.toFixed(0)}ms
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <div className="border-t bg-zinc-950 rounded-b-lg overflow-auto h-[200px] lg:h-[500px]">
              <div className="p-4 min-w-min">
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center gap-3 py-16"
                      >
                        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                        <p className="text-zinc-400 text-sm">Starting PostgreSQL...</p>
                        <p className="text-zinc-600 text-xs">First load may take a few seconds</p>
                      </motion.div>
                    ) : !isReady ? (
                      <motion.div
                        key="error-init"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-2 py-16"
                      >
                        <p className="text-red-400 text-sm">Failed to start PostgreSQL.</p>
                        <p className="text-zinc-500 text-xs">Try refreshing the page.</p>
                      </motion.div>
                    ) : error ? (
                      <motion.div
                        key="err"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="rounded-md bg-red-500/10 border border-red-500/20 p-4"
                      >
                        <p className="text-red-400 text-xs font-bold mb-1.5">ERROR</p>
                        <p className="text-red-300 text-sm font-mono whitespace-pre-wrap leading-relaxed">
                          {error}
                        </p>
                      </motion.div>
                    ) : results.length > 0 ? (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        {/* DDL/DML summary */}
                        {statementResults.length > 0 && (
                          <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                            <span className="text-emerald-400 text-sm">
                              {statementResults.length} statement{statementResults.length !== 1 ? "s" : ""} executed
                            </span>
                          </div>
                        )}

                        {/* SELECT result tables */}
                        {tableResults.map((r, i) => (
                          <ResultTable key={`tbl-${i}`} result={r} index={i} />
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center gap-3 py-16 text-center"
                      >
                        <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center">
                          <Play className="h-4 w-4 text-zinc-500" />
                        </div>
                        <div>
                          <p className="text-zinc-400 text-sm">Click &quot;Run SQL&quot; to execute</p>
                          <p className="text-zinc-600 text-xs mt-1">
                            Real PostgreSQL via WebAssembly
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
