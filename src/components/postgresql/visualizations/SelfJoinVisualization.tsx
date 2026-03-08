"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TabKey = "hierarchy" | "peers" | "comparison" | "multi_level";

interface TabInfo {
  label: string;
  color: string;
  description: string;
  sql: string;
  example: string;
  output: string[];
}

const tabs: Record<TabKey, TabInfo> = {
  hierarchy: {
    label: "Hierarchy",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "A self join connects a table to itself. The classic use case is an employee-manager hierarchy where each employee has a manager_id referencing another row in the same employees table.",
    sql: `CREATE TABLE employees (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    manager_id INT REFERENCES employees(id)\n);`,
    example: `-- Find each employee and their manager\nSELECT\n    e.name AS employee,\n    m.name AS manager\nFROM employees e\nLEFT JOIN employees m\n    ON e.manager_id = m.id;`,
    output: [
      " employee | manager",
      "----------+---------",
      " Alice    | NULL",
      " Bob      | Alice",
      " Charlie  | Alice",
      " Diana    | Bob",
      " Eve      | Bob",
      " Frank    | Charlie",
    ],
  },
  peers: {
    label: "Peers",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "Find peers — employees who share the same manager. Self join the table twice with the same manager_id, excluding rows where an employee is paired with themselves.",
    sql: `-- Employees who share the same manager\nSELECT\n    e1.name AS employee_1,\n    e2.name AS employee_2,\n    m.name  AS shared_manager\nFROM employees e1\nJOIN employees e2\n    ON e1.manager_id = e2.manager_id\n    AND e1.id < e2.id\nJOIN employees m\n    ON e1.manager_id = m.id;`,
    example: `-- Using the same employees table:\n-- Alice (CEO, no manager)\n-- Bob & Charlie report to Alice\n-- Diana & Eve report to Bob\n-- Frank reports to Charlie\n\nSELECT e1.name, e2.name, m.name AS mgr\nFROM employees e1\nJOIN employees e2\n  ON e1.manager_id = e2.manager_id\n  AND e1.id < e2.id\nJOIN employees m\n  ON e1.manager_id = m.id;`,
    output: [
      " employee_1 | employee_2 | shared_manager",
      "------------+------------+----------------",
      " Bob        | Charlie    | Alice",
      " Diana      | Eve        | Bob",
    ],
  },
  comparison: {
    label: "Comparison",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "Self joins let you compare rows within the same table. For example, find employees who were hired after their manager, or compare salaries between peers.",
    sql: `-- Employees table with salary\nCREATE TABLE employees (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    salary NUMERIC(10,2),\n    manager_id INT REFERENCES employees(id)\n);`,
    example: `-- Find employees earning more than\n-- their manager\nSELECT\n    e.name  AS employee,\n    e.salary AS emp_salary,\n    m.name  AS manager,\n    m.salary AS mgr_salary\nFROM employees e\nJOIN employees m\n    ON e.manager_id = m.id\nWHERE e.salary > m.salary;`,
    output: [
      " employee | emp_salary | manager | mgr_salary",
      "----------+------------+---------+------------",
      " Diana    |   95000.00 | Bob     |   90000.00",
      " Frank    |   88000.00 | Charlie |   85000.00",
    ],
  },
  multi_level: {
    label: "Multi-Level",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    description:
      "Chain multiple self joins to traverse more than one level. Join the table three times to get employee \u2192 manager \u2192 grand-manager in a single query.",
    sql: `-- Three-level hierarchy query\nSELECT\n    e.name  AS employee,\n    m.name  AS manager,\n    gm.name AS grand_manager\nFROM employees e\nLEFT JOIN employees m\n    ON e.manager_id = m.id\nLEFT JOIN employees gm\n    ON m.manager_id = gm.id;`,
    example: `-- Trace the full chain:\n-- employee -> manager -> grand_manager\nSELECT\n    e.name  AS employee,\n    m.name  AS manager,\n    gm.name AS grand_manager\nFROM employees e\nLEFT JOIN employees m\n    ON e.manager_id = m.id\nLEFT JOIN employees gm\n    ON m.manager_id = gm.id\nWHERE gm.id IS NOT NULL;`,
    output: [
      " employee | manager | grand_manager",
      "----------+---------+---------------",
      " Diana    | Bob     | Alice",
      " Eve      | Bob     | Alice",
      " Frank    | Charlie | Alice",
    ],
  },
};

const tabOrder: TabKey[] = ["hierarchy", "peers", "comparison", "multi_level"];

// Org chart data
interface OrgNode {
  id: number;
  name: string;
  role: string;
  managerId: number | null;
}

const orgData: OrgNode[] = [
  { id: 1, name: "Alice", role: "CEO", managerId: null },
  { id: 2, name: "Bob", role: "VP Eng", managerId: 1 },
  { id: 3, name: "Charlie", role: "VP Sales", managerId: 1 },
  { id: 4, name: "Diana", role: "Dev Lead", managerId: 2 },
  { id: 5, name: "Eve", role: "Dev Lead", managerId: 2 },
  { id: 6, name: "Frank", role: "Sales Lead", managerId: 3 },
];

// Positions for the org chart tree layout
const nodePositions: Record<number, { x: number; y: number }> = {
  1: { x: 200, y: 20 },
  2: { x: 100, y: 100 },
  3: { x: 300, y: 100 },
  4: { x: 40, y: 180 },
  5: { x: 160, y: 180 },
  6: { x: 300, y: 180 },
};

function getHighlightedNodes(tab: TabKey): Set<number> {
  switch (tab) {
    case "hierarchy":
      return new Set([1, 2, 3, 4, 5, 6]);
    case "peers":
      return new Set([2, 3, 4, 5]);
    case "comparison":
      return new Set([2, 3, 4, 6]);
    case "multi_level":
      return new Set([1, 2, 3, 4, 5, 6]);
  }
}

function getHighlightedEdges(tab: TabKey): Set<string> {
  switch (tab) {
    case "hierarchy":
      return new Set(["2-1", "3-1", "4-2", "5-2", "6-3"]);
    case "peers":
      return new Set(["2-1", "3-1", "4-2", "5-2"]);
    case "comparison":
      return new Set(["4-2", "6-3"]);
    case "multi_level":
      return new Set(["2-1", "3-1", "4-2", "5-2", "6-3"]);
  }
}

const tabNodeColor: Record<TabKey, string> = {
  hierarchy: "border-blue-500 bg-blue-500/20",
  peers: "border-emerald-500 bg-emerald-500/20",
  comparison: "border-violet-500 bg-violet-500/20",
  multi_level: "border-orange-500 bg-orange-500/20",
};

const tabEdgeColor: Record<TabKey, string> = {
  hierarchy: "stroke-blue-500",
  peers: "stroke-emerald-500",
  comparison: "stroke-violet-500",
  multi_level: "stroke-orange-500",
};

export function SelfJoinVisualization() {
  const [selected, setSelected] = useState<TabKey>("hierarchy");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];
  const highlightedNodes = getHighlightedNodes(selected);
  const highlightedEdges = getHighlightedEdges(selected);

  const handleSelect = (key: TabKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  // Build edges from orgData
  const edges = orgData
    .filter((n) => n.managerId !== null)
    .map((n) => ({
      childId: n.id,
      parentId: n.managerId!,
      key: `${n.id}-${n.managerId}`,
    }));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Self Join</CardTitle>
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
                <Users className="h-3 w-3" />
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

        {/* Org Chart Diagram */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Org Chart — Same Table as Both &quot;employee&quot; and &quot;manager&quot;
          </p>
          <div className="rounded-xl border bg-muted/20 p-4 flex justify-center">
            <svg viewBox="0 0 400 250" className="w-full max-w-[420px] h-auto">
              {/* Edges */}
              {edges.map((edge) => {
                const from = nodePositions[edge.parentId];
                const to = nodePositions[edge.childId];
                const isHighlighted = highlightedEdges.has(edge.key);
                return (
                  <motion.line
                    key={edge.key}
                    x1={from.x + 45}
                    y1={from.y + 40}
                    x2={to.x + 45}
                    y2={to.y + 8}
                    strokeWidth={isHighlighted ? 2 : 1}
                    className={
                      isHighlighted
                        ? tabEdgeColor[selected]
                        : "stroke-muted-foreground/30"
                    }
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                );
              })}
              {/* Nodes */}
              {orgData.map((node) => {
                const pos = nodePositions[node.id];
                const isHighlighted = highlightedNodes.has(node.id);
                return (
                  <motion.g
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: node.id * 0.06 }}
                  >
                    <rect
                      x={pos.x}
                      y={pos.y}
                      width={90}
                      height={46}
                      rx={10}
                      className={
                        isHighlighted
                          ? `fill-current ${tabNodeColor[selected]} stroke-2`
                          : "fill-muted stroke-muted-foreground/20 stroke-1"
                      }
                      style={{ fillOpacity: isHighlighted ? 0.25 : 0.1 }}
                    />
                    <text
                      x={pos.x + 45}
                      y={pos.y + 20}
                      textAnchor="middle"
                      className={`text-[11px] font-semibold ${
                        isHighlighted ? "fill-foreground" : "fill-muted-foreground"
                      }`}
                    >
                      {node.name}
                    </text>
                    <text
                      x={pos.x + 45}
                      y={pos.y + 34}
                      textAnchor="middle"
                      className="text-[9px] fill-muted-foreground"
                    >
                      {node.role}
                    </text>
                  </motion.g>
                );
              })}
              {/* Table label */}
              <text x={200} y={245} textAnchor="middle" className="text-[10px] fill-muted-foreground italic">
                employees table (self-referencing via manager_id)
              </text>
            </svg>
          </div>
        </div>

        {/* Table SQL */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">SQL</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {tab.sql}
          </pre>
        </div>

        {/* Example + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Example</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]">
              {tab.example}
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
                        line.startsWith("ERROR") || line.includes("violates")
                          ? "text-red-400"
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
