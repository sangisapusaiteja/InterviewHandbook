"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Zap, Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TableRow {
  id: number;
  name: string;
  email: string;
}

const tableRows: TableRow[] = [
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
  { id: 3, name: "Charlie", email: "charlie@mail.com" },
  { id: 4, name: "Diana", email: "diana@mail.com" },
  { id: 5, name: "Eve", email: "eve@mail.com" },
  { id: 6, name: "Frank", email: "frank@mail.com" },
  { id: 7, name: "Grace", email: "grace@mail.com" },
  { id: 8, name: "Hank", email: "hank@mail.com" },
];

const TARGET_NAME = "Frank";
const TARGET_INDEX = 5;

type ScanMode = "sequential" | "index";

export function WhatIsIndexVisualization() {
  const [mode, setMode] = useState<ScanMode>("sequential");
  const [scanning, setScanning] = useState(false);
  const [currentRow, setCurrentRow] = useState(-1);
  const [found, setFound] = useState(false);
  const [rowsScanned, setRowsScanned] = useState(0);

  const reset = useCallback(() => {
    setScanning(false);
    setCurrentRow(-1);
    setFound(false);
    setRowsScanned(0);
  }, []);

  const handleModeChange = (m: ScanMode) => {
    setMode(m);
    reset();
  };

  const startScan = () => {
    reset();
    setScanning(true);
  };

  useEffect(() => {
    if (!scanning || found) return;

    if (mode === "sequential") {
      const next = currentRow + 1;
      if (next >= tableRows.length) {
        setScanning(false);
        return;
      }
      const timer = setTimeout(() => {
        setCurrentRow(next);
        setRowsScanned((r) => r + 1);
        if (tableRows[next].name === TARGET_NAME) {
          setFound(true);
          setScanning(false);
        }
      }, 400);
      return () => clearTimeout(timer);
    } else {
      // Index scan: jump directly after a brief pause
      const timer = setTimeout(() => {
        setCurrentRow(TARGET_INDEX);
        setRowsScanned(1);
        setFound(true);
        setScanning(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [scanning, currentRow, found, mode]);

  const seqColor = "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300";
  const idxColor = "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300";

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">What Is an Index?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Book analogy */}
        <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3 space-y-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <p className="text-xs font-bold text-blue-700 dark:text-blue-300">Book Analogy</p>
          </div>
          <p className="text-xs text-blue-700/80 dark:text-blue-300/80">
            Imagine finding a topic in a 500-page book. Without an index, you read every page
            (sequential scan). With the index at the back, you look up the topic and jump directly
            to the right page (index scan).
          </p>
        </div>

        {/* Mode selector */}
        <div className="flex flex-wrap gap-2">
          {([
            { key: "sequential" as ScanMode, label: "Sequential Scan", icon: Search, color: seqColor },
            { key: "index" as ScanMode, label: "Index Scan", icon: Zap, color: idxColor },
          ]).map((item) => {
            const isActive = mode === item.key;
            return (
              <motion.button
                key={item.key}
                onClick={() => handleModeChange(item.key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive ? item.color + " shadow-sm" : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="h-3 w-3" />
                {item.label}
              </motion.button>
            );
          })}
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`rounded-xl border p-3 ${mode === "sequential" ? seqColor : idxColor}`}
          >
            <p className="text-sm">
              {mode === "sequential"
                ? "Sequential scan reads every row from top to bottom until the target is found. O(n) complexity -- slow for large tables."
                : "Index scan uses a pre-built data structure to jump directly to the target row. O(log n) complexity -- fast even on millions of rows."}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Search target */}
        <div className="flex items-center gap-3">
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-2 flex-1 overflow-x-auto">
            {`SELECT * FROM users WHERE name = '${TARGET_NAME}';`}
          </pre>
          <div className="flex gap-2">
            <Button size="sm" onClick={startScan} disabled={scanning}>
              <Search className="h-3.5 w-3.5 mr-1" /> Scan
            </Button>
            <Button size="sm" variant="outline" onClick={reset} disabled={scanning}>
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Table visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Data table */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              users table
            </p>
            <div className="rounded-xl border bg-muted/20 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="px-3 py-2 text-left font-semibold">id</th>
                    <th className="px-3 py-2 text-left font-semibold">name</th>
                    <th className="px-3 py-2 text-left font-semibold">email</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, i) => {
                    const isCurrentRow = currentRow === i;
                    const isFound = found && row.name === TARGET_NAME;
                    const isScannedPast = mode === "sequential" && i < currentRow && !isFound;
                    return (
                      <motion.tr
                        key={row.id}
                        animate={{
                          backgroundColor: isFound
                            ? "rgba(16, 185, 129, 0.2)"
                            : isCurrentRow
                            ? "rgba(251, 146, 60, 0.15)"
                            : isScannedPast
                            ? "rgba(251, 146, 60, 0.05)"
                            : "transparent",
                        }}
                        transition={{ duration: 0.2 }}
                        className="border-b last:border-b-0"
                      >
                        <td className="px-3 py-1.5 font-mono">{row.id}</td>
                        <td className={`px-3 py-1.5 font-mono ${isFound ? "font-bold text-emerald-600 dark:text-emerald-400" : ""}`}>
                          {row.name}
                        </td>
                        <td className="px-3 py-1.5 font-mono text-muted-foreground">{row.email}</td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Index structure (shown for index scan) */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {mode === "index" ? "Index on name" : "No index"}
            </p>
            {mode === "index" ? (
              <div className="rounded-xl border bg-emerald-500/5 border-emerald-500/20 p-3 space-y-1.5">
                <p className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                  idx_users_name (B-tree)
                </p>
                {[...tableRows]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((row) => {
                    const isTarget = row.name === TARGET_NAME;
                    const isHighlighted = found && isTarget;
                    return (
                      <motion.div
                        key={row.id}
                        animate={{
                          backgroundColor: isHighlighted ? "rgba(16, 185, 129, 0.2)" : "transparent",
                          scale: isHighlighted ? 1.02 : 1,
                        }}
                        className="flex items-center gap-2 text-[10px] py-0.5 px-2 rounded"
                      >
                        <span className={`font-mono ${isHighlighted ? "font-bold text-emerald-600 dark:text-emerald-400" : ""}`}>
                          {row.name}
                        </span>
                        <span className="text-muted-foreground ml-auto font-mono">
                          → row {row.id}
                        </span>
                      </motion.div>
                    );
                  })}
              </div>
            ) : (
              <div className="rounded-xl border bg-orange-500/5 border-orange-500/20 p-3 flex items-center justify-center min-h-[200px]">
                <p className="text-xs text-muted-foreground italic">
                  No index -- must scan every row
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Speed comparison */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`rounded-xl border p-3 text-center ${seqColor}`}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1">Sequential Scan</p>
            <p className="text-2xl font-bold">{found && mode === "sequential" ? rowsScanned : TARGET_INDEX + 1}</p>
            <p className="text-[10px]">rows scanned</p>
            <p className="text-[9px] mt-1 opacity-70">O(n) -- checks every row</p>
          </div>
          <div className={`rounded-xl border p-3 text-center ${idxColor}`}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1">Index Scan</p>
            <p className="text-2xl font-bold">1</p>
            <p className="text-[10px]">rows scanned</p>
            <p className="text-[9px] mt-1 opacity-70">O(log n) -- direct lookup</p>
          </div>
        </div>

        {/* Status */}
        <AnimatePresence>
          {found && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-700 dark:text-emerald-300"
            >
              <p className="font-semibold">
                Found &quot;{TARGET_NAME}&quot; after scanning {rowsScanned} row{rowsScanned > 1 ? "s" : ""}
                {mode === "sequential" ? " (had to check each row)" : " (jumped directly via index)"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
