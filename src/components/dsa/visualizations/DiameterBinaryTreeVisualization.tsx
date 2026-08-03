"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

// ─── Tree layout ──────────────────────────────────────────────────────────────
//
//         1           (x=250, y=55)
//        / \
//       2   3         (x=140, y=150), (x=360, y=150)
//      / \
//     4   5           (x=75, y=245), (x=205, y=245)
//    /
//   6                 (x=75, y=340)
//
// Diameter path: 6 → 4 → 2 → 1 → 3  (4 edges)

interface DNode { id: number; val: number; x: number; y: number }

const NODES: DNode[] = [
  { id: 1, val: 1, x: 250, y: 55  },
  { id: 2, val: 2, x: 140, y: 150 },
  { id: 3, val: 3, x: 360, y: 150 },
  { id: 4, val: 4, x: 75,  y: 245 },
  { id: 5, val: 5, x: 205, y: 245 },
  { id: 6, val: 6, x: 75,  y: 340 },
];

const EDGES = [
  { from: 1, to: 2 }, { from: 1, to: 3 },
  { from: 2, to: 4 }, { from: 2, to: 5 },
  { from: 4, to: 6 },
];

const nodeMap = new Map(NODES.map(n => [n.id, n]));

// Diameter path (the actual winning path)
const DIAMETER_PATH_EDGES: Array<[number, number]> = [
  [6, 4], [4, 2], [2, 1], [1, 3],
];
const DIAMETER_PATH_NODES = new Set([6, 4, 2, 1, 3]);

// ─── Pre-computed DFS trace steps ─────────────────────────────────────────────
// Post-order DFS trace (left child first, then right, then current node).
// At each step we show: which node we're computing for, its left/right heights,
// the candidate diameter, and the running global max.

interface DFSStep {
  nodeId:      number;
  leftH:       number;
  rightH:      number;
  candidate:   number;
  globalMax:   number;
  message:     string;
  processed:   number[]; // node ids fully processed
}

const DFS_STEPS: DFSStep[] = [
  {
    nodeId: 6, leftH: -1, rightH: -1, candidate: 0, globalMax: 0,
    processed: [],
    message: "Node 6 (leaf): leftH=-1, rightH=-1. Candidate = -1+(-1)+2 = 0. globalMax = 0. Height returned = 0.",
  },
  {
    nodeId: 4, leftH: 0, rightH: -1, candidate: 1, globalMax: 1,
    processed: [6],
    message: "Node 4: leftH=0 (from 6), rightH=-1 (no right). Candidate = 0+(-1)+2 = 1. globalMax = 1. Height returned = 1.",
  },
  {
    nodeId: 5, leftH: -1, rightH: -1, candidate: 0, globalMax: 1,
    processed: [6, 4],
    message: "Node 5 (leaf): leftH=-1, rightH=-1. Candidate = 0. globalMax stays 1. Height returned = 0.",
  },
  {
    nodeId: 2, leftH: 1, rightH: 0, candidate: 3, globalMax: 3,
    processed: [6, 4, 5],
    message: "Node 2: leftH=1 (subtree of 4), rightH=0 (node 5). Candidate = 1+0+2 = 3. globalMax = 3. Height returned = 2.",
  },
  {
    nodeId: 3, leftH: -1, rightH: -1, candidate: 0, globalMax: 3,
    processed: [6, 4, 5, 2],
    message: "Node 3 (leaf): leftH=-1, rightH=-1. Candidate = 0. globalMax stays 3. Height returned = 0.",
  },
  {
    nodeId: 1, leftH: 2, rightH: 0, candidate: 4, globalMax: 4,
    processed: [6, 4, 5, 2, 3],
    message: "Node 1 (root): leftH=2 (subtree 2→4→6), rightH=0 (node 3). Candidate = 2+0+2 = 4. globalMax = 4! ← Diameter.",
  },
];

type View = "path" | "dfs";

// ─── Component ───────────────────────────────────────────────────────────────

export function DiameterBinaryTreeVisualization() {
  const [view, setView] = useState<View>("path");
  const [step, setStep] = useState(0);

  const maxStep = DFS_STEPS.length - 1;
  const cur     = DFS_STEPS[step];

  function reset() { setStep(0); }

  // ── Node coloring ──
  function nodeColor(n: DNode): { fill: string; stroke: string } {
    if (view === "path") {
      if (DIAMETER_PATH_NODES.has(n.id)) return { fill: "#f59e0b", stroke: "#d97706" };
      return { fill: "#f1f5f9", stroke: "#94a3b8" };
    }
    // DFS view
    if (n.id === cur.nodeId)           return { fill: "#6366f1", stroke: "#4f46e5" }; // currently processing
    if (cur.processed.includes(n.id))  return { fill: "#10b981", stroke: "#059669" }; // done
    return { fill: "#f1f5f9", stroke: "#94a3b8" };
  }

  function textColor(n: DNode): string {
    if (view === "path") {
      return DIAMETER_PATH_NODES.has(n.id) ? "#fff" : "#334155";
    }
    if (n.id === cur.nodeId || cur.processed.includes(n.id)) return "#fff";
    return "#334155";
  }

  function edgeColor(from: number, to: number): string {
    if (view === "path") {
      const isDP = DIAMETER_PATH_EDGES.some(
        ([a, b]) => (a === from && b === to) || (a === to && b === from)
      );
      return isDP ? "#f59e0b" : "#cbd5e1";
    }
    // DFS view: highlight edges between processed nodes
    if (cur.processed.includes(from) && cur.processed.includes(to)) return "#10b981";
    return "#cbd5e1";
  }

  return (
    <div className="space-y-4">

      {/* ── View switcher ── */}
      <div className="flex gap-2">
        {(["path", "dfs"] as View[]).map(v => (
          <button
            key={v}
            onClick={() => { setView(v); setStep(0); }}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              view === v
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-accent text-muted-foreground",
            )}
          >
            {v === "path" ? "Diameter Path" : "DFS Walkthrough"}
          </button>
        ))}
      </div>

      {/* ── SVG ── */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <svg viewBox="0 0 470 385" className="w-full" style={{ maxHeight: 385 }}>

          {/* Edges */}
          {EDGES.map(({ from, to }) => {
            const f = nodeMap.get(from)!;
            const t = nodeMap.get(to)!;
            const ec = edgeColor(from, to);
            const isDiam = view === "path" && DIAMETER_PATH_EDGES.some(
              ([a, b]) => (a === from && b === to) || (a === to && b === from)
            );
            return (
              <line
                key={`${from}-${to}`}
                x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                stroke={ec}
                strokeWidth={isDiam ? 3.5 : 1.5}
              />
            );
          })}

          {/* Path-view: draw the cross-root edge (3→1 already via edge 1-3) */}

          {/* Nodes */}
          {NODES.map(n => {
            const c = nodeColor(n);
            return (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r={22} fill={c.fill} stroke={c.stroke} strokeWidth={2.5} />
                <text
                  x={n.x} y={n.y + 5}
                  textAnchor="middle"
                  fill={textColor(n)}
                  fontSize={14} fontWeight="700"
                >
                  {n.val}
                </text>

                {/* DFS view: show height returned by each processed node */}
                {view === "dfs" && cur.processed.includes(n.id) && (() => {
                  const hMap: Record<number, number> = { 6: 0, 4: 1, 5: 0, 2: 2, 3: 0, 1: 3 };
                  return (
                    <text
                      x={n.x + 27} y={n.y - 8}
                      fill="#6366f1" fontSize={9} fontWeight="700"
                    >
                      h={hMap[n.id]}
                    </text>
                  );
                })()}
              </g>
            );
          })}

          {/* Path-view: "4 edges" label */}
          {view === "path" && (
            <text x={235} y={20} textAnchor="middle" fill="#f59e0b" fontSize={11} fontWeight="700">
              Diameter = 4 edges (path: 6→4→2→1→3)
            </text>
          )}
        </svg>
      </div>

      {/* ── DFS info panel ── */}
      {view === "dfs" && (
        <>
          <div className="rounded-lg border bg-muted/40 p-3 text-xs space-y-1.5">
            <p className="text-muted-foreground">{cur.message}</p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { label: "Left Height",  value: cur.leftH  },
                { label: "Right Height", value: cur.rightH },
                { label: "Candidate",    value: cur.candidate },
              ].map(({ label, value }) => (
                <div key={label} className="rounded bg-background border text-center py-1.5">
                  <div className="font-bold text-sm text-primary">{value}</div>
                  <div className="text-[10px] text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 px-3 py-2 text-xs">
            <span className="font-semibold text-amber-700 dark:text-amber-400">Global Max so far:</span>
            <span className="text-lg font-bold text-amber-600 dark:text-amber-300">{cur.globalMax}</span>
            {cur.globalMax === 4 && (
              <span className="text-amber-600 dark:text-amber-400 font-semibold ml-1">← Diameter!</span>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="p-1.5 rounded-lg border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setStep(s => Math.min(maxStep, s + 1))}
              disabled={step >= maxStep}
              className="p-1.5 rounded-lg border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button onClick={reset} className="p-1.5 rounded-lg border hover:bg-muted transition-colors">
              <RotateCcw className="h-4 w-4" />
            </button>
            <span className="text-xs text-muted-foreground ml-auto">
              Node {step + 1} / {maxStep + 1}
            </span>
          </div>
        </>
      )}

      {/* ── Path-view info ── */}
      {view === "path" && (
        <div className="rounded-lg border bg-muted/40 p-3 text-xs space-y-1.5">
          <p className="font-semibold text-foreground">How the diameter is found:</p>
          <p className="text-muted-foreground">
            At node 1 (root): leftH = height of subtree rooted at 2 = 2, rightH = height of node 3 = 0.
          </p>
          <p className="text-muted-foreground">
            Candidate = leftH + rightH + 2 = 2 + 0 + 2 = <span className="font-bold text-amber-500">4 edges</span>.
            This is the longest path in the tree — the diameter.
          </p>
          <p className="text-muted-foreground">
            Switch to <span className="font-semibold">DFS Walkthrough</span> to see the post-order computation at each node.
          </p>
        </div>
      )}

      {/* ── Legend ── */}
      <div className="flex flex-wrap gap-4 text-xs">
        {(view === "path"
          ? [
              { fill: "#f59e0b", stroke: "#d97706", label: "Diameter path (4 edges)" },
              { fill: "#f1f5f9", stroke: "#94a3b8", label: "Not on diameter"         },
            ]
          : [
              { fill: "#f1f5f9", stroke: "#94a3b8", label: "Not yet visited" },
              { fill: "#6366f1", stroke: "#4f46e5", label: "Computing now"  },
              { fill: "#10b981", stroke: "#059669", label: "Done (h= shown)" },
            ]
        ).map(({ fill, stroke, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full border-2 shrink-0" style={{ backgroundColor: fill, borderColor: stroke }} />
            <span className="text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        {[
          { label: "Nodes",    value: "6" },
          { label: "Diameter", value: "4 edges" },
          { label: "Height",   value: "3" },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg bg-muted/50 border text-center py-2">
            <div className="font-bold text-sm text-primary">{value}</div>
            <div className="text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
