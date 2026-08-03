"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

// ─── Tree layout ──────────────────────────────────────────────────────────────
//
//        -10            (x=250, y=55)
//        /  \
//       9    20         (x=130, y=155), (x=370, y=155)
//           /  \
//          15   7       (x=300, y=255), (x=440, y=255)
//
// Best path: 15 → 20 → 7 = 42

interface MNode { id: number; val: number; x: number; y: number }

const NODES: MNode[] = [
  { id: -10, val: -10, x: 250, y: 55  },
  { id:   9, val:   9, x: 130, y: 155 },
  { id:  20, val:  20, x: 370, y: 155 },
  { id:  15, val:  15, x: 300, y: 255 },
  { id:   7, val:   7, x: 440, y: 255 },
];

const EDGES = [
  { from: -10, to: 9  },
  { from: -10, to: 20 },
  { from: 20,  to: 15 },
  { from: 20,  to: 7  },
];

const nodeMap = new Map(NODES.map(n => [n.id, n]));

// ─── DFS trace steps ──────────────────────────────────────────────────────────
// Post-order DFS. At each node we show leftGain, rightGain, candidate, maxSum.

interface MStep {
  nodeId:    number;
  leftGain:  number;    // max(0, recursed left) — what we get from left arm
  rightGain: number;    // max(0, recursed right)
  candidate: number;    // node.val + leftGain + rightGain
  gainUp:    number;    // what this node returns to parent: node.val + max(l,r)
  maxSum:    number;    // global max so far
  processed: number[];  // node ids done
  message:   string;
}

const DFS_STEPS: MStep[] = [
  {
    nodeId: 9, leftGain: 0, rightGain: 0, candidate: 9, gainUp: 9, maxSum: 9,
    processed: [],
    message: "Node 9 (leaf): leftGain=0, rightGain=0. Candidate = 9+0+0 = 9. maxSum = 9. Gain returned = 9.",
  },
  {
    nodeId: 15, leftGain: 0, rightGain: 0, candidate: 15, gainUp: 15, maxSum: 15,
    processed: [9],
    message: "Node 15 (leaf): leftGain=0, rightGain=0. Candidate = 15. maxSum = 15. Gain returned = 15.",
  },
  {
    nodeId: 7, leftGain: 0, rightGain: 0, candidate: 7, gainUp: 7, maxSum: 15,
    processed: [9, 15],
    message: "Node 7 (leaf): leftGain=0, rightGain=0. Candidate = 7. maxSum stays 15. Gain returned = 7.",
  },
  {
    nodeId: 20, leftGain: 15, rightGain: 7, candidate: 42, gainUp: 35, maxSum: 42,
    processed: [9, 15, 7],
    message: "Node 20: leftGain=max(0,15)=15, rightGain=max(0,7)=7. Candidate = 20+15+7 = 42. maxSum = 42! Gain up = 20+max(15,7) = 35.",
  },
  {
    nodeId: -10, leftGain: 9, rightGain: 35, candidate: 34, gainUp: 25, maxSum: 42,
    processed: [9, 15, 7, 20],
    message: "Node -10 (root): leftGain=max(0,9)=9, rightGain=max(0,35)=35. Candidate = -10+9+35 = 34. maxSum stays 42. Done!",
  },
];

// Path highlight: nodes and edges on the max path (15→20→7)
const MAX_PATH_NODES = new Set([15, 20, 7]);
const MAX_PATH_EDGES: Array<[number, number]> = [[15, 20], [20, 7]];

type View = "path" | "dfs";

// ─── Component ───────────────────────────────────────────────────────────────

export function MaximumPathSumVisualization() {
  const [view, setView] = useState<View>("path");
  const [step, setStep] = useState(0);

  const maxStep = DFS_STEPS.length - 1;
  const cur     = DFS_STEPS[step];

  function reset() { setStep(0); }

  function nodeColor(n: MNode): { fill: string; stroke: string } {
    if (view === "path") {
      if (MAX_PATH_NODES.has(n.id)) return { fill: "#10b981", stroke: "#059669" };
      return { fill: "#f1f5f9", stroke: "#94a3b8" };
    }
    // DFS view
    if (n.id === cur.nodeId)            return { fill: "#6366f1", stroke: "#4f46e5" };
    if (cur.processed.includes(n.id))   return { fill: "#10b981", stroke: "#059669" };
    return { fill: "#f1f5f9", stroke: "#94a3b8" };
  }

  function textColor(n: MNode): string {
    if (view === "path") {
      if (MAX_PATH_NODES.has(n.id)) return "#fff";
      return n.val < 0 ? "#ef4444" : "#334155";
    }
    if (n.id === cur.nodeId || cur.processed.includes(n.id)) return "#fff";
    return n.val < 0 ? "#ef4444" : "#334155";
  }

  function edgeColor(from: number, to: number): string {
    if (view === "path") {
      const onPath = MAX_PATH_EDGES.some(([a, b]) => (a === from && b === to) || (a === to && b === from));
      return onPath ? "#10b981" : "#cbd5e1";
    }
    if (cur.processed.includes(from) && cur.processed.includes(to)) return "#10b981";
    return "#cbd5e1";
  }

  // gain map for processed nodes (to show in DFS view)
  const gainMap: Record<number, number> = { 9: 9, 15: 15, 7: 7, 20: 35, [-10]: 25 };

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
            {v === "path" ? "Max Path" : "DFS Trace"}
          </button>
        ))}
      </div>

      {/* ── SVG ── */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <svg viewBox="0 0 500 305" className="w-full" style={{ maxHeight: 305 }}>

          {/* Edges */}
          {EDGES.map(({ from, to }) => {
            const f = nodeMap.get(from);
            const t = nodeMap.get(to);
            if (!f || !t) return null;
            const ec = edgeColor(from, to);
            const onMaxPath = view === "path" && MAX_PATH_EDGES.some(
              ([a, b]) => (a === from && b === to) || (a === to && b === from)
            );
            return (
              <line
                key={`${from}-${to}`}
                x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                stroke={ec}
                strokeWidth={onMaxPath ? 3.5 : 1.5}
              />
            );
          })}

          {/* Nodes */}
          {NODES.map(n => {
            const c = nodeColor(n);
            return (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r={26} fill={c.fill} stroke={c.stroke} strokeWidth={2.5} />
                <text
                  x={n.x} y={n.y + 5}
                  textAnchor="middle"
                  fill={textColor(n)}
                  fontSize={13} fontWeight="700"
                >
                  {n.val}
                </text>

                {/* DFS view: show gain returned above processed nodes */}
                {view === "dfs" && cur.processed.includes(n.id) && (
                  <text
                    x={n.x + 30} y={n.y - 10}
                    fill="#6366f1" fontSize={9} fontWeight="700"
                  >
                    g={gainMap[n.id]}
                  </text>
                )}

                {/* Path view: "max path" sum label */}
                {view === "path" && n.id === 20 && (
                  <text
                    x={n.x} y={n.y + 40}
                    textAnchor="middle"
                    fill="#10b981" fontSize={9} fontWeight="600"
                  >
                    pivot
                  </text>
                )}
              </g>
            );
          })}

          {/* Path-view: total sum badge */}
          {view === "path" && (
            <g>
              <rect x={175} y={10} width={150} height={28} rx={8} fill="#10b981" opacity={0.15} />
              <text x={250} y={28} textAnchor="middle" fill="#059669" fontSize={12} fontWeight="700">
                15 + 20 + 7 = 42  ← max path
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* ── DFS info panel ── */}
      {view === "dfs" && (
        <>
          <div className="rounded-lg border bg-muted/40 p-3 text-xs space-y-2">
            <p className="text-muted-foreground leading-relaxed">{cur.message}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {[
                { label: "Left Gain",  value: cur.leftGain  },
                { label: "Right Gain", value: cur.rightGain },
                { label: "Candidate",  value: cur.candidate },
                { label: "Gain Up",    value: cur.gainUp    },
              ].map(({ label, value }) => (
                <div key={label} className="rounded bg-background border text-center py-1.5">
                  <div className={cn("font-bold text-sm", value < 0 ? "text-red-500" : "text-primary")}>
                    {value}
                  </div>
                  <div className="text-[10px] text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2 text-xs">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">maxSum so far:</span>
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-300">{cur.maxSum}</span>
            {cur.maxSum === 42 && (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">← Answer!</span>
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

      {/* ── Path-view key insight ── */}
      {view === "path" && (
        <div className="rounded-lg border bg-muted/40 p-3 text-xs space-y-1.5">
          <p className="font-semibold text-foreground">Why 15 → 20 → 7 is the max path:</p>
          <ul className="space-y-1 text-muted-foreground list-disc list-inside">
            <li>At node 20: leftGain = max(0, 15) = 15, rightGain = max(0, 7) = 7</li>
            <li>Candidate = 20 + 15 + 7 = <span className="font-bold text-emerald-500">42</span> (path pivots through node 20)</li>
            <li>Node -10 is excluded — including it would reduce the sum</li>
            <li>Switch to <span className="font-semibold">DFS Trace</span> to see the full gain calculation step by step</li>
          </ul>
        </div>
      )}

      {/* ── Legend ── */}
      <div className="flex flex-wrap gap-4 text-xs">
        {(view === "path"
          ? [
              { fill: "#10b981", stroke: "#059669", label: "On max path (sum = 42)" },
              { fill: "#f1f5f9", stroke: "#94a3b8", label: "Excluded (would reduce sum)" },
            ]
          : [
              { fill: "#f1f5f9", stroke: "#94a3b8", label: "Not yet visited"  },
              { fill: "#6366f1", stroke: "#4f46e5", label: "Computing now"   },
              { fill: "#10b981", stroke: "#059669", label: "Done (g= shown)" },
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
          { label: "Max Path Sum",  value: "42"        },
          { label: "Path Length",   value: "3 nodes"   },
          { label: "Pivot Node",    value: "20"        },
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
