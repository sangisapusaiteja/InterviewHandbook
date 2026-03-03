"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

// Directed graph: 0→1, 0→2, 1→3, 1→4, 2→4, 3→4
// Positions:
//   0: (80, 200)   1: (240, 80)   2: (240, 320)
//   3: (400, 80)   4: (400, 320)

const NODES = [
  { id: 0, x: 80,  y: 200 },
  { id: 1, x: 240, y: 80  },
  { id: 2, x: 240, y: 320 },
  { id: 3, x: 400, y: 80  },
  { id: 4, x: 400, y: 320 },
];

const EDGES = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 1, to: 3 },
  { from: 1, to: 4 },
  { from: 2, to: 4 },
  { from: 3, to: 4 },
];

interface DFSStep {
  current: number | null;
  visited: number[];
  callStack: number[];
  message: string;
  done?: boolean;
}

const STEPS: DFSStep[] = [
  { current: null, visited: [],            callStack: [],       message: "Start DFS from node 0. Click → to step through." },
  { current: 0,    visited: [0],           callStack: [0],      message: "Visit 0. Mark visited. Call DFS on neighbor 1." },
  { current: 1,    visited: [0, 1],        callStack: [0, 1],   message: "Visit 1. Mark visited. Call DFS on neighbor 3." },
  { current: 3,    visited: [0, 1, 3],     callStack: [0,1,3],  message: "Visit 3. Mark visited. Call DFS on neighbor 4." },
  { current: 4,    visited: [0, 1, 3, 4],  callStack: [0,1,3,4],message: "Visit 4. No unvisited neighbors. Return." },
  { current: 3,    visited: [0, 1, 3, 4],  callStack: [0,1,3],  message: "Back at 3. No more neighbors. Return." },
  { current: 1,    visited: [0, 1, 3, 4],  callStack: [0, 1],   message: "Back at 1. Next neighbor 4 already visited. Return." },
  { current: 0,    visited: [0, 1, 3, 4],  callStack: [0],      message: "Back at 0. Next unvisited neighbor: 2." },
  { current: 2,    visited: [0,1,3,4,2],   callStack: [0, 2],   message: "Visit 2. Mark visited. Neighbor 4 already visited. Return." },
  { current: null, visited: [0,1,3,4,2],   callStack: [],       message: "DFS complete! Visit order: 0 → 1 → 3 → 4 → 2", done: true },
];

const nodeMap = new Map(NODES.map(n => [n.id, n]));
const R = 22;

function arrowLine(
  from: number, to: number,
  pathVisited: boolean,
  isActive: boolean,
) {
  const nf = nodeMap.get(from)!;
  const nt = nodeMap.get(to)!;
  const dx = nt.x - nf.x, dy = nt.y - nf.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len, uy = dy / len;
  const sx = nf.x + ux * (R + 2);
  const sy = nf.y + uy * (R + 2);
  const ex = nt.x - ux * (R + 8);
  const ey = nt.y - uy * (R + 8);
  // arrowhead
  const ax1 = ex - ux * 9 + uy * 5;
  const ay1 = ey - uy * 9 - ux * 5;
  const ax2 = ex - ux * 9 - uy * 5;
  const ay2 = ey - uy * 9 + ux * 5;

  const color = isActive ? "#f59e0b" : pathVisited ? "#6366f1" : "#cbd5e1";
  const width = (isActive || pathVisited) ? 2.5 : 1.5;

  return (
    <g key={`${from}-${to}`}>
      <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={color} strokeWidth={width} />
      <polygon points={`${ex},${ey} ${ax1},${ay1} ${ax2},${ay2}`} fill={color} />
    </g>
  );
}

export function GraphDFSVisualization() {
  const [step, setStep] = useState(0);
  const s = STEPS[step];
  const maxStep = STEPS.length - 1;

  function nodeColor(id: number): { fill: string; stroke: string } {
    if (s.current === id) return { fill: "#f59e0b", stroke: "#d97706" };
    if (s.visited.includes(id)) return { fill: "#10b981", stroke: "#059669" };
    return { fill: "#f1f5f9", stroke: "#94a3b8" };
  }

  function nodeTextColor(id: number): string {
    if (s.current === id || s.visited.includes(id)) return "#fff";
    return "#334155";
  }

  // Determine if an edge was traversed (both endpoints visited consecutively)
  function edgeVisited(from: number, to: number): boolean {
    const fi = s.visited.indexOf(from);
    const ti = s.visited.indexOf(to);
    return fi !== -1 && ti !== -1 && ti === fi + 1;
  }

  return (
    <div className="space-y-4">

      {/* SVG */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <svg viewBox="0 0 520 420" className="w-full" style={{ maxHeight: 420 }}>
          {EDGES.map(({ from, to }) =>
            arrowLine(from, to, edgeVisited(from, to), s.current === from && !s.visited.includes(to)),
          )}
          {NODES.map(n => {
            const c = nodeColor(n.id);
            return (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r={R} fill={c.fill} stroke={c.stroke} strokeWidth={2.5} />
                <text
                  x={n.x} y={n.y + 5}
                  textAnchor="middle"
                  fill={nodeTextColor(n.id)}
                  fontSize={14} fontWeight="700"
                >
                  {n.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Call Stack + Visited Order */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border bg-muted/30 px-3 py-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Call Stack</p>
          <div className="flex gap-1.5 flex-wrap min-h-[24px]">
            {s.callStack.length === 0
              ? <span className="text-xs text-muted-foreground italic">empty</span>
              : s.callStack.map((n, i) => (
                <span
                  key={i}
                  className={cn(
                    "px-2 py-0.5 rounded text-xs font-mono font-bold border",
                    i === s.callStack.length - 1
                      ? "bg-amber-100 dark:bg-amber-900/30 border-amber-400 text-amber-700 dark:text-amber-300"
                      : "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-300 text-indigo-700 dark:text-indigo-300",
                  )}
                >
                  {n}
                </span>
              ))}
          </div>
        </div>
        <div className="rounded-lg border bg-muted/30 px-3 py-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Visit Order</p>
          <div className="flex gap-1 flex-wrap min-h-[24px]">
            {s.visited.length === 0
              ? <span className="text-xs text-muted-foreground italic">none yet</span>
              : s.visited.map((n, i) => (
                <span key={i} className="flex items-center gap-0.5 text-xs font-mono font-bold text-emerald-600">
                  {i > 0 && <span className="text-muted-foreground">→</span>}
                  <span>{n}</span>
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Message */}
      <div className={cn(
        "rounded-lg border px-3 py-2 text-xs min-h-[34px] flex items-center gap-2",
        s.done ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300" : "bg-muted/40",
      )}>
        {s.done && <span className="text-emerald-500 font-bold">✓</span>}
        <span className="text-foreground">{s.message}</span>
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
        <button onClick={() => setStep(0)} className="p-1.5 rounded-lg border hover:bg-muted transition-colors">
          <RotateCcw className="h-4 w-4" />
        </button>
        <span className="text-xs text-muted-foreground ml-auto">
          Step {step + 1} / {maxStep + 1}
        </span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        {[
          { fill: "#f1f5f9", stroke: "#94a3b8", label: "Unvisited" },
          { fill: "#f59e0b", stroke: "#d97706", label: "Current" },
          { fill: "#10b981", stroke: "#059669", label: "Visited" },
        ].map(({ fill, stroke, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full border-2 shrink-0" style={{ backgroundColor: fill, borderColor: stroke }} />
            <span className="text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
