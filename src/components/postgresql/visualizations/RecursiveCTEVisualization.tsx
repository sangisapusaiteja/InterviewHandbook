"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrgNode {
  id: number;
  name: string;
  title: string;
  managerId: number | null;
  level: number;
}

const orgData: OrgNode[] = [
  { id: 1, name: "Alice", title: "CEO", managerId: null, level: 0 },
  { id: 2, name: "Bob", title: "VP Engineering", managerId: 1, level: 1 },
  { id: 3, name: "Carol", title: "VP Marketing", managerId: 1, level: 1 },
  { id: 4, name: "Dave", title: "Eng Manager", managerId: 2, level: 2 },
  { id: 5, name: "Eve", title: "Eng Manager", managerId: 2, level: 2 },
  { id: 6, name: "Frank", title: "Mkt Manager", managerId: 3, level: 2 },
  { id: 7, name: "Grace", title: "Engineer", managerId: 4, level: 3 },
  { id: 8, name: "Hank", title: "Engineer", managerId: 4, level: 3 },
  { id: 9, name: "Ivy", title: "Engineer", managerId: 5, level: 3 },
  { id: 10, name: "Jack", title: "Marketer", managerId: 6, level: 3 },
];

const levelColors = [
  {
    bg: "bg-emerald-500/15",
    border: "border-emerald-500/50",
    text: "text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500",
    row: "bg-emerald-500/10",
    label: "emerald",
  },
  {
    bg: "bg-blue-500/15",
    border: "border-blue-500/50",
    text: "text-blue-700 dark:text-blue-300",
    dot: "bg-blue-500",
    row: "bg-blue-500/10",
    label: "blue",
  },
  {
    bg: "bg-violet-500/15",
    border: "border-violet-500/50",
    text: "text-violet-700 dark:text-violet-300",
    dot: "bg-violet-500",
    row: "bg-violet-500/10",
    label: "violet",
  },
  {
    bg: "bg-amber-500/15",
    border: "border-amber-500/50",
    text: "text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
    row: "bg-amber-500/10",
    label: "amber",
  },
];

const maxLevel = 3;

const sqlQuery = `WITH RECURSIVE org_tree AS (
  -- Base case: start from the CEO
  SELECT id, name, title, manager_id, 0 AS level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive case: find direct reports
  SELECT e.id, e.name, e.title, e.manager_id,
         ot.level + 1
  FROM employees e
  JOIN org_tree ot ON e.manager_id = ot.id
)
SELECT * FROM org_tree ORDER BY level, id;`;

function getChildrenOf(parentId: number): OrgNode[] {
  return orgData.filter((n) => n.managerId === parentId);
}

export function RecursiveCTEVisualization() {
  const [currentIteration, setCurrentIteration] = useState(-1);

  const visibleNodes = orgData.filter((n) => n.level <= currentIteration);
  const highlightedLevel = currentIteration;
  const isComplete = currentIteration > maxLevel;
  const isStarted = currentIteration >= 0;

  const handleStep = () => {
    if (currentIteration <= maxLevel) {
      setCurrentIteration((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentIteration(-1);
  };

  const renderTreeNode = (node: OrgNode): React.ReactNode => {
    const isVisible = node.level <= currentIteration;
    const isHighlighted = node.level === highlightedLevel;
    const color = levelColors[node.level];
    const children = getChildrenOf(node.id);

    if (!isVisible) return null;

    return (
      <motion.div
        key={node.id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.05 * (node.id % 4) }}
        className="flex flex-col items-center"
      >
        <div
          className={`rounded-lg border px-3 py-1.5 text-center transition-all ${
            isHighlighted
              ? `${color.bg} ${color.border} ${color.text} shadow-md ring-2 ring-offset-1 ring-offset-background ${
                  node.level === 0
                    ? "ring-emerald-500/40"
                    : node.level === 1
                    ? "ring-blue-500/40"
                    : node.level === 2
                    ? "ring-violet-500/40"
                    : "ring-amber-500/40"
                }`
              : `${color.bg} ${color.border} ${color.text}`
          }`}
        >
          <p className="text-xs font-bold leading-tight">{node.name}</p>
          <p className="text-[10px] opacity-75">{node.title}</p>
        </div>

        {children.length > 0 && children.some((c) => c.level <= currentIteration) && (
          <div className="flex flex-col items-center">
            <div className="w-px h-3 bg-border" />
            <div className="flex gap-2 md:gap-3">
              {children.map((child) => {
                if (child.level > currentIteration) return null;
                return (
                  <div key={child.id} className="flex flex-col items-center">
                    <div className="w-px h-3 bg-border" />
                    {renderTreeNode(child)}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  const root = orgData.find((n) => n.managerId === null)!;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recursive CTE — Org Chart Traversal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* SQL Query */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            SQL Query
          </p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {sqlQuery}
          </pre>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <Button
            size="sm"
            onClick={handleStep}
            disabled={isComplete}
          >
            <Play className="h-3.5 w-3.5 mr-1.5" />
            {!isStarted
              ? "Start (Base Case)"
              : isComplete
              ? "Complete"
              : "Next Iteration"}
          </Button>
          {isStarted && (
            <Button size="sm" variant="outline" onClick={handleReset}>
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
              Reset
            </Button>
          )}
          {isStarted && !isComplete && (
            <span className="text-xs text-muted-foreground">
              Iteration {currentIteration} — {currentIteration === 0 ? "Base case" : "Recursive step"}
            </span>
          )}
          {isComplete && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              No more rows found — recursion complete
            </span>
          )}
        </div>

        {/* Iteration Legend */}
        <div className="flex flex-wrap gap-3">
          {levelColors.map((color, i) => (
            <div
              key={i}
              className={`flex items-center gap-1.5 text-[10px] font-medium ${
                i <= currentIteration
                  ? color.text
                  : "text-muted-foreground/40"
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  i <= currentIteration ? color.dot : "bg-muted-foreground/20"
                }`}
              />
              Iter {i}
              {i === 0 ? " (Base)" : ""}
            </div>
          ))}
        </div>

        {/* Tree Visualization */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Org Chart Tree
          </p>
          <div className="rounded-xl border bg-muted/20 p-4 min-h-[120px] flex items-start justify-center overflow-x-auto">
            <AnimatePresence mode="sync">
              {isStarted ? (
                renderTreeNode(root)
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-muted-foreground italic py-8"
                >
                  Click &quot;Start&quot; to begin recursive traversal
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* How it works callout */}
        {isStarted && !isComplete && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIteration}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className={`rounded-xl border p-3 ${levelColors[Math.min(currentIteration, 3)].bg} ${levelColors[Math.min(currentIteration, 3)].border}`}
            >
              <p className={`text-sm font-medium ${levelColors[Math.min(currentIteration, 3)].text}`}>
                {currentIteration === 0 && (
                  <>
                    <span className="font-bold">Base case:</span> SELECT employees WHERE manager_id IS NULL
                    <ChevronRight className="inline h-3.5 w-3.5 mx-1" />
                    Found the CEO (root node). This is the anchor member of the CTE.
                  </>
                )}
                {currentIteration === 1 && (
                  <>
                    <span className="font-bold">Iteration 1:</span> JOIN employees ON manager_id = CEO.id
                    <ChevronRight className="inline h-3.5 w-3.5 mx-1" />
                    Found 2 VPs who report directly to the CEO.
                  </>
                )}
                {currentIteration === 2 && (
                  <>
                    <span className="font-bold">Iteration 2:</span> JOIN employees ON manager_id IN (VP ids)
                    <ChevronRight className="inline h-3.5 w-3.5 mx-1" />
                    Found 3 Managers who report to the VPs.
                  </>
                )}
                {currentIteration === 3 && (
                  <>
                    <span className="font-bold">Iteration 3:</span> JOIN employees ON manager_id IN (Manager ids)
                    <ChevronRight className="inline h-3.5 w-3.5 mx-1" />
                    Found 4 Engineers/Marketers at the leaf level.
                  </>
                )}
              </p>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Result Table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Running Result Table
          </p>
          <div className="rounded-xl border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-3 py-2 font-semibold">id</th>
                  <th className="text-left px-3 py-2 font-semibold">name</th>
                  <th className="text-left px-3 py-2 font-semibold">title</th>
                  <th className="text-left px-3 py-2 font-semibold">manager_id</th>
                  <th className="text-left px-3 py-2 font-semibold">level</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {visibleNodes.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground italic">
                        No rows yet — click Start to begin
                      </td>
                    </tr>
                  ) : (
                    visibleNodes.map((node) => {
                      const color = levelColors[node.level];
                      const isNewRow = node.level === highlightedLevel;
                      return (
                        <motion.tr
                          key={node.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.03 * node.id }}
                          className={`border-t ${isNewRow ? color.row : ""}`}
                        >
                          <td className="px-3 py-1.5 font-mono">{node.id}</td>
                          <td className={`px-3 py-1.5 font-medium ${isNewRow ? color.text : ""}`}>
                            {node.name}
                          </td>
                          <td className="px-3 py-1.5">{node.title}</td>
                          <td className="px-3 py-1.5 font-mono">
                            {node.managerId === null ? "NULL" : node.managerId}
                          </td>
                          <td className="px-3 py-1.5">
                            <span
                              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${color.bg} ${color.text}`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${color.dot}`} />
                              {node.level}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          {visibleNodes.length > 0 && (
            <p className="text-[10px] text-muted-foreground">
              {visibleNodes.length} row{visibleNodes.length !== 1 ? "s" : ""} returned
              {isComplete ? " (final)" : " so far"}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
