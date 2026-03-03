"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

// Weighted directed graph:
// 0→1(4), 0→2(1), 2→1(2), 2→3(5), 1→3(1), 3→4(3)
// Positions: 0:(70,200)  1:(250,70)  2:(250,330)  3:(420,200)  4:(490,330)
const NODES = [
  { id: 0, x: 70,  y: 200 },
  { id: 1, x: 250, y: 70  },
  { id: 2, x: 250, y: 330 },
  { id: 3, x: 420, y: 200 },
  { id: 4, x: 490, y: 330 },
];

const EDGES = [
  { from: 0, to: 1, w: 4 },
  { from: 0, to: 2, w: 1 },
  { from: 2, to: 1, w: 2 },
  { from: 2, to: 3, w: 5 },
  { from: 1, to: 3, w: 1 },
  { from: 3, to: 4, w: 3 },
];

const INF = "∞";

interface DijkStep {
  current: number | null;
  settled: number[];
  dist: (number | string)[];
  relaxed: number[];   // edges relaxed this step (destination nodes updated)
  message: string;
  done?: boolean;
}

const STEPS: DijkStep[] = [
  {
    current: null,
    settled: [],
    dist: [0, INF, INF, INF, INF],
    relaxed: [],
    message: "Initialize: dist=[0,∞,∞,∞,∞]. Push (0, node 0) into priority queue.",
  },
  {
    current: 0,
    settled: [0],
    dist: [0, 4, 1, INF, INF],
    relaxed: [1, 2],
    message: "Pop node 0 (dist=0). Relax 0→1: dist[1]=4. Relax 0→2: dist[2]=1. Push to PQ.",
  },
  {
    current: 2,
    settled: [0, 2],
    dist: [0, 3, 1, 6, INF],
    relaxed: [1, 3],
    message: "Pop node 2 (dist=1, minimum). Relax 2→1: dist[1]=min(4,1+2)=3 ✓ improved! Relax 2→3: dist[3]=6.",
  },
  {
    current: 1,
    settled: [0, 2, 1],
    dist: [0, 3, 1, 4, INF],
    relaxed: [3],
    message: "Pop node 1 (dist=3). Relax 1→3: dist[3]=min(6,3+1)=4 ✓ improved!",
  },
  {
    current: 3,
    settled: [0, 2, 1, 3],
    dist: [0, 3, 1, 4, 7],
    relaxed: [4],
    message: "Pop node 3 (dist=4). Relax 3→4: dist[4]=min(∞,4+3)=7.",
  },
  {
    current: 4,
    settled: [0, 2, 1, 3, 4],
    dist: [0, 3, 1, 4, 7],
    relaxed: [],
    message: "Pop node 4 (dist=7). No outgoing edges. Algorithm complete! Shortest paths from 0: [0,3,1,4,7]",
    done: true,
  },
];

const nodeMap = new Map(NODES.map(n => [n.id, n]));
const R = 22;

function ArrowLine({ from, to, w, active, settled }: {
  from: number; to: number; w: number; active: boolean; settled: boolean;
}) {
  const nf = nodeMap.get(from)!;
  const nt = nodeMap.get(to)!;
  const dx = nt.x - nf.x, dy = nt.y - nf.y;
  const len = Math.sqrt(dx*dx + dy*dy);
  const ux = dx/len, uy = dy/len;
  const sx = nf.x + ux*(R+2), sy = nf.y + uy*(R+2);
  const ex = nt.x - ux*(R+8), ey = nt.y - uy*(R+8);
  const ax1 = ex - ux*9 + uy*5, ay1 = ey - uy*9 - ux*5;
  const ax2 = ex - ux*9 - uy*5, ay2 = ey - uy*9 + ux*5;
  const mx = (sx + ex) / 2, my = (sy + ey) / 2;
  const color = active ? "#f59e0b" : settled ? "#10b981" : "#cbd5e1";
  const width = (active || settled) ? 2.5 : 1.5;
  // Label offset perpendicular
  const ox = -uy * 12, oy = ux * 12;
  return (
    <g>
      <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={color} strokeWidth={width}/>
      <polygon points={`${ex},${ey} ${ax1},${ay1} ${ax2},${ay2}`} fill={color}/>
      {/* Weight label */}
      <rect x={mx + ox - 9} y={my + oy - 9} width={18} height={14} rx={3} fill="#f8fafc" stroke="#e2e8f0" strokeWidth={0.5}/>
      <text x={mx + ox} y={my + oy + 1} textAnchor="middle" fill={active ? "#d97706" : "#64748b"} fontSize={10} fontWeight="700">
        {w}
      </text>
    </g>
  );
}

export function DijkstraVisualization() {
  const [step, setStep] = useState(0);
  const s = STEPS[step];
  const maxStep = STEPS.length - 1;

  function nodeColor(id: number): { fill: string; stroke: string } {
    if (s.current === id) return { fill: "#f59e0b", stroke: "#d97706" };
    if (s.settled.includes(id)) return { fill: "#10b981", stroke: "#059669" };
    return { fill: "#f1f5f9", stroke: "#94a3b8" };
  }

  function nodeTextColor(id: number): string {
    if (s.current === id || s.settled.includes(id)) return "#fff";
    return "#334155";
  }

  function edgeActive(from: number, to: number): boolean {
    return s.current === from && s.relaxed.includes(to);
  }

  function edgeSettled(from: number, to: number): boolean {
    return s.settled.includes(from) && s.settled.includes(to);
  }

  return (
    <div className="space-y-4">

      {/* SVG */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <svg viewBox="0 0 560 420" className="w-full" style={{ maxHeight: 420 }}>
          {EDGES.map(({ from, to, w }) => (
            <ArrowLine key={`${from}-${to}`}
              from={from} to={to} w={w}
              active={edgeActive(from, to)}
              settled={edgeSettled(from, to)}
            />
          ))}
          {NODES.map(n => {
            const c = nodeColor(n.id);
            const d = s.dist[n.id];
            const isImproved = s.relaxed.includes(n.id);
            return (
              <g key={n.id}>
                {isImproved && (
                  <circle cx={n.x} cy={n.y} r={R+7} fill="none" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 3"/>
                )}
                <circle cx={n.x} cy={n.y} r={R} fill={c.fill} stroke={c.stroke} strokeWidth={2.5}/>
                <text x={n.x} y={n.y+5} textAnchor="middle" fill={nodeTextColor(n.id)} fontSize={14} fontWeight="700">
                  {n.id}
                </text>
                {/* Distance label below */}
                <rect x={n.x-16} y={n.y+26} width={32} height={16} rx={4}
                  fill={d === INF ? "#f1f5f9" : isImproved ? "#fef3c7" : "#ecfdf5"}
                  stroke={d === INF ? "#e2e8f0" : isImproved ? "#f59e0b" : "#10b981"}
                  strokeWidth={1}
                />
                <text x={n.x} y={n.y+38} textAnchor="middle"
                  fill={d === INF ? "#94a3b8" : isImproved ? "#d97706" : "#059669"}
                  fontSize={10} fontWeight="700">
                  {d}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Distance Table */}
      <div className="rounded-lg border bg-muted/30 px-3 py-2">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Distance Table</p>
        <div className="grid grid-cols-5 gap-1.5 text-xs font-mono">
          {NODES.map(n => {
            const d = s.dist[n.id];
            const isSettled = s.settled.includes(n.id);
            const isCurrent = s.current === n.id;
            const isImproved = s.relaxed.includes(n.id);
            return (
              <div
                key={n.id}
                className={cn(
                  "rounded-lg border p-2 text-center transition-colors",
                  isCurrent ? "border-amber-400 bg-amber-50 dark:bg-amber-900/20"
                  : isImproved ? "border-amber-300 bg-amber-50/50 dark:bg-amber-900/10"
                  : isSettled ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20"
                  : "border-border bg-card",
                )}
              >
                <div className="text-[10px] text-muted-foreground mb-0.5">node {n.id}</div>
                <div className={cn(
                  "font-bold text-sm",
                  isCurrent ? "text-amber-600"
                  : isImproved ? "text-amber-500"
                  : isSettled ? "text-emerald-600"
                  : d === INF ? "text-muted-foreground" : "text-foreground",
                )}>
                  {d}
                </div>
                {isSettled && <div className="text-[9px] text-emerald-500 mt-0.5">final</div>}
              </div>
            );
          })}
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
        <button onClick={() => setStep(s => Math.max(0, s-1))} disabled={step===0}
          className="p-1.5 rounded-lg border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          <ChevronLeft className="h-4 w-4"/>
        </button>
        <button onClick={() => setStep(s => Math.min(maxStep, s+1))} disabled={step>=maxStep}
          className="p-1.5 rounded-lg border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          <ChevronRight className="h-4 w-4"/>
        </button>
        <button onClick={() => setStep(0)} className="p-1.5 rounded-lg border hover:bg-muted transition-colors">
          <RotateCcw className="h-4 w-4"/>
        </button>
        <span className="text-xs text-muted-foreground ml-auto">Step {step+1} / {maxStep+1}</span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        {[
          { fill: "#f1f5f9", stroke: "#94a3b8", label: "Unvisited" },
          { fill: "#f59e0b", stroke: "#d97706", label: "Current (min dist)" },
          { fill: "#10b981", stroke: "#059669", label: "Settled (final)" },
        ].map(({ fill, stroke, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full border-2 shrink-0" style={{ backgroundColor: fill, borderColor: stroke }}/>
            <span className="text-muted-foreground">{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-amber-500 border border-amber-400 rounded px-1">↓</span>
          <span className="text-muted-foreground">Distance updated</span>
        </div>
      </div>
    </div>
  );
}
