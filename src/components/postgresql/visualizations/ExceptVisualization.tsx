"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Product {
  id: number;
  name: string;
  category: string;
}

const allProducts: Product[] = [
  { id: 1, name: "Laptop", category: "Electronics" },
  { id: 2, name: "Headphones", category: "Electronics" },
  { id: 3, name: "Notebook", category: "Stationery" },
  { id: 4, name: "Pen", category: "Stationery" },
  { id: 5, name: "Mouse", category: "Electronics" },
];

const discontinuedProducts: Product[] = [
  { id: 2, name: "Headphones", category: "Electronics" },
  { id: 4, name: "Pen", category: "Stationery" },
  { id: 6, name: "Tablet", category: "Electronics" },
];

type Direction = "a-b" | "b-a";

function getExceptResult(direction: Direction): Product[] {
  if (direction === "a-b") {
    const bIds = new Set(discontinuedProducts.map((p) => p.id));
    return allProducts.filter((p) => !bIds.has(p.id));
  } else {
    const aIds = new Set(allProducts.map((p) => p.id));
    return discontinuedProducts.filter((p) => !aIds.has(p.id));
  }
}

function getMatchedIds(direction: Direction): Set<number> {
  if (direction === "a-b") {
    const bIds = new Set(discontinuedProducts.map((p) => p.id));
    return new Set(allProducts.filter((p) => bIds.has(p.id)).map((p) => p.id));
  } else {
    const aIds = new Set(allProducts.map((p) => p.id));
    return new Set(discontinuedProducts.filter((p) => aIds.has(p.id)).map((p) => p.id));
  }
}

const sqlSnippets: Record<Direction, { except: string; notExists: string }> = {
  "a-b": {
    except: `SELECT id, name, category
FROM all_products
EXCEPT
SELECT id, name, category
FROM discontinued_products;`,
    notExists: `SELECT a.id, a.name, a.category
FROM all_products a
WHERE NOT EXISTS (
  SELECT 1
  FROM discontinued_products d
  WHERE d.id = a.id
    AND d.name = a.name
    AND d.category = a.category
);`,
  },
  "b-a": {
    except: `SELECT id, name, category
FROM discontinued_products
EXCEPT
SELECT id, name, category
FROM all_products;`,
    notExists: `SELECT d.id, d.name, d.category
FROM discontinued_products d
WHERE NOT EXISTS (
  SELECT 1
  FROM all_products a
  WHERE a.id = d.id
    AND a.name = d.name
    AND a.category = d.category
);`,
  },
};

export function ExceptVisualization() {
  const [direction, setDirection] = useState<Direction>("a-b");
  const [animating, setAnimating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showNotExists, setShowNotExists] = useState(false);

  const matchedIds = getMatchedIds(direction);
  const result = getExceptResult(direction);
  const sourceTable = direction === "a-b" ? allProducts : discontinuedProducts;
  const subtractTable = direction === "a-b" ? discontinuedProducts : allProducts;
  const sourceLabel = direction === "a-b" ? "all_products (A)" : "discontinued_products (B)";
  const subtractLabel = direction === "a-b" ? "discontinued_products (B)" : "all_products (A)";

  const handleRun = () => {
    setShowResult(false);
    setAnimating(true);
    setTimeout(() => {
      setShowResult(true);
      setAnimating(false);
    }, 1200);
  };

  const handleDirectionChange = (dir: Direction) => {
    setDirection(dir);
    setAnimating(false);
    setShowResult(false);
    setShowNotExists(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">SQL EXCEPT Operator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Description */}
        <div className="rounded-xl border p-3 bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300">
          <p className="text-sm">
            <strong>EXCEPT</strong> returns rows from the first query that are not present in the
            second query. Order matters: <code className="font-mono text-xs bg-emerald-500/20 px-1 rounded">A EXCEPT B</code> is
            different from <code className="font-mono text-xs bg-emerald-500/20 px-1 rounded">B EXCEPT A</code>.
          </p>
        </div>

        {/* Direction buttons */}
        <div className="flex flex-wrap gap-2">
          <motion.button
            onClick={() => handleDirectionChange("a-b")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              direction === "a-b"
                ? "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300 shadow-sm"
                : "bg-background border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            <Minus className="h-3 w-3" />
            A EXCEPT B
          </motion.button>
          <motion.button
            onClick={() => handleDirectionChange("b-a")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              direction === "b-a"
                ? "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300 shadow-sm"
                : "bg-background border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            <Minus className="h-3 w-3" />
            B EXCEPT A
          </motion.button>
        </div>

        {/* Set subtraction visual */}
        <div className="flex items-center justify-center gap-3 py-2">
          <div className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
            direction === "a-b"
              ? "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300"
              : "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300"
          }`}>
            {direction === "a-b" ? "A" : "B"}
          </div>
          <Minus className="h-4 w-4 text-muted-foreground" />
          <div className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
            direction === "a-b"
              ? "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300"
              : "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300"
          }`}>
            {direction === "a-b" ? "B" : "A"}
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div className="rounded-lg border px-3 py-1.5 text-xs font-semibold bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300">
            Result ({result.length} rows)
          </div>
        </div>

        {/* Tables side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Source table */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {sourceLabel}
            </p>
            <div className={`rounded-xl border p-3 ${
              direction === "a-b" ? "bg-blue-500/10" : "bg-violet-500/10"
            }`}>
              {/* Header */}
              <div className="grid grid-cols-[40px_1fr_1fr] gap-2 text-[10px] font-bold text-muted-foreground border-b pb-1 mb-1">
                <span>id</span>
                <span>name</span>
                <span>category</span>
              </div>
              {/* Rows */}
              {sourceTable.map((p) => {
                const isMatched = matchedIds.has(p.id);
                return (
                  <motion.div
                    key={p.id}
                    className={`grid grid-cols-[40px_1fr_1fr] gap-2 text-[11px] py-1 rounded transition-all ${
                      animating && isMatched
                        ? "line-through text-red-400 bg-red-500/10"
                        : showResult && isMatched
                        ? "line-through text-red-400/50 bg-red-500/5"
                        : ""
                    }`}
                    animate={
                      animating && isMatched
                        ? { opacity: [1, 0.3], x: [0, 8, 0] }
                        : { opacity: 1, x: 0 }
                    }
                    transition={{ duration: 0.6, delay: isMatched ? 0.3 : 0 }}
                  >
                    <span className="font-mono">{p.id}</span>
                    <span>{p.name}</span>
                    <span className="text-muted-foreground">{p.category}</span>
                    {(animating || showResult) && isMatched && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-2"
                      >
                        <X className="h-3 w-3 text-red-400 inline" />
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Subtract table */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {subtractLabel}
            </p>
            <div className={`rounded-xl border p-3 ${
              direction === "a-b" ? "bg-violet-500/10" : "bg-blue-500/10"
            }`}>
              {/* Header */}
              <div className="grid grid-cols-[40px_1fr_1fr] gap-2 text-[10px] font-bold text-muted-foreground border-b pb-1 mb-1">
                <span>id</span>
                <span>name</span>
                <span>category</span>
              </div>
              {/* Rows */}
              {subtractTable.map((p) => {
                const isInSource = direction === "a-b"
                  ? allProducts.some((a) => a.id === p.id)
                  : discontinuedProducts.some((d) => d.id === p.id);
                return (
                  <motion.div
                    key={p.id}
                    className={`grid grid-cols-[40px_1fr_1fr] gap-2 text-[11px] py-1 rounded transition-all ${
                      (animating || showResult) && isInSource
                        ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300"
                        : ""
                    }`}
                    animate={
                      animating && isInSource
                        ? { scale: [1, 1.03, 1] }
                        : {}
                    }
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <span className="font-mono">{p.id}</span>
                    <span>{p.name}</span>
                    <span className="text-muted-foreground">{p.category}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Run button */}
        <Button size="sm" onClick={handleRun} disabled={animating}>
          <Play className="h-3.5 w-3.5 mr-1" /> Run EXCEPT
        </Button>

        {/* Result table */}
        <AnimatePresence mode="wait">
          {showResult ? (
            <motion.div
              key={`result-${direction}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Result
              </p>
              <div className="rounded-xl border bg-emerald-500/10 p-3">
                {/* Header */}
                <div className="grid grid-cols-[40px_1fr_1fr] gap-2 text-[10px] font-bold text-muted-foreground border-b pb-1 mb-1">
                  <span>id</span>
                  <span>name</span>
                  <span>category</span>
                </div>
                {result.length > 0 ? (
                  result.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="grid grid-cols-[40px_1fr_1fr] gap-2 text-[11px] py-1 text-emerald-700 dark:text-emerald-300"
                    >
                      <span className="font-mono">{p.id}</span>
                      <span>{p.name}</span>
                      <span>{p.category}</span>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground italic py-2">
                    Empty result set — all rows were subtracted.
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ph"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border bg-muted/20 px-4 py-3 flex items-center justify-center"
            >
              <p className="text-xs text-muted-foreground italic">
                Click Run to see the EXCEPT result
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SQL snippets */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">EXCEPT Query</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {sqlSnippets[direction].except}
          </pre>
        </div>

        {/* NOT EXISTS comparison toggle */}
        <div className="space-y-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowNotExists(!showNotExists)}
            className="text-xs"
          >
            {showNotExists ? "Hide" : "Compare with"} NOT EXISTS equivalent
          </Button>

          <AnimatePresence>
            {showNotExists && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="rounded-xl border p-3 bg-violet-500/10 space-y-2">
                  <p className="text-xs font-semibold text-violet-700 dark:text-violet-300">
                    Equivalent NOT EXISTS query
                  </p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
                    {sqlSnippets[direction].notExists}
                  </pre>
                  <p className="text-[11px] text-muted-foreground">
                    EXCEPT removes duplicate rows automatically (like DISTINCT). NOT EXISTS
                    preserves duplicates unless you add DISTINCT explicitly.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
