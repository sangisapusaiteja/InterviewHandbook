"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

// DAG: 0→1, 0→2, 1→3, 2→3, 3→4
// Positions: 0:(100,200)  1:(240,80)  2:(240,320)  3:(380,200)  4:(480,200)
const NODES = [
  { id: 0, x: 100, y: 200 },
  { id: 1, x: 240, y: 80  },
  { id: 2, x: 240, y: 320 },
  { id: 3, x: 380, y: 200 },
  { id: 4, x: 480, y: 200 },
];

const EDGES = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
];

// in-degrees: {0:0, 1:1, 2:1, 3:2, 4:1}
// Kahn's steps

interface TopoStep {
  processed: number[];   // nodes added to result so far
  current: number | null;
  queue: number[];
  inDegrees: number[];
  message: string;
  done?: boolean;
}

const STEPS: TopoStep[] = [
  {
    processed: [],
    current: null,
    queue: [0],
    inDegrees: [0, 1, 1, 2, 1],
    message: "Compute in-degrees: {0:0, 1:1, 2:1, 3:2, 4:1}. Enqueue all zero-in-degree nodes: [0].",
  },
  {
    processed: [0],
    current: 0,
    queue: [1, 2],
    inDegrees: [0, 0, 0, 2, 1],
    message: "Dequeue 0. Add to result. Decrease in-degree of 1→0 and 2→0. Enqueue 1, 2.",
  },
  {
    processed: [0, 1],
    current: 1,
    queue: [2],
    inDegrees: [0, 0, 0, 1, 1],
    message: "Dequeue 1. Add to result. Decrease in-degree of 3→1.",
  },
  {
    processed: [0, 1, 2],
    current: 2,
    queue: [3],
    inDegrees: [0, 0, 0, 0, 1],
    message: "Dequeue 2. Add to result. Decrease in-degree of 3→0. Enqueue 3.",
  },
  {
    processed: [0, 1, 2, 3],
    current: 3,
    queue: [4],
    inDegrees: [0, 0, 0, 0, 0],
    message: "Dequeue 3. Add to result. Decrease in-degree of 4→0. Enqueue 4.",
  },
  {
    processed: [0, 1, 2, 3, 4],
    current: 4,
    queue: [],
    inDegrees: [0, 0, 0, 0, 0],
    message: "Dequeue 4. Add to result. No outgoing edges. Queue empty. Topological Order: 0 → 1 → 2 → 3 → 4 ✓",
    done: true,
  },
];

const nodeMap = new Map(NODES.map(n => [n.id, n]));
const R = 22;

function ArrowLine({ from, to, active, traversed }: { from: number; to: number; active: boolean; traversed: boolean }) {
  const nf = nodeMap.get(from)!;
  const nt = nodeMap.get(to)!;
  const dx = nt.x - nf.x, dy = nt.y - nf.y;
  const len = Math.sqrt(dx*dx + dy*dy);
  const ux = dx/len, uy = dy/len;
  const sx = nf.x + ux*(R+2), sy = nf.y + uy*(R+2);
  const ex = nt.x - ux*(R+8), ey = nt.y - uy*(R+8);
  const ax1 = ex - ux*9 + uy*5, ay1 = ey - uy*9 - ux*5;
  const ax2 = ex - ux*9 - uy*5, ay2 = ey - uy*9 + ux*5;
  const color = active ? "#f59e0b" : traversed ? "#10b981" : "#cbd5e1";
  const width = (active || traversed) ? 2.5 : 1.5;
  return (
    <g>
      <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={color} strokeWidth={width}/>
      <polygon points={`${ex},${ey} ${ax1},${ay1} ${ax2},${ay2}`} fill={color}/>
    </g>
  );
}

export function TopologicalSortVisualization() {
  const [step, setStep] = useState(0);
  const s = STEPS[step];
  const maxStep = STEPS.length - 1;

  function nodeColor(id: number): { fill: string; stroke: string } {
    if (s.current === id) return { fill: "#f59e0b", stroke: "#d97706" };
    if (s.processed.includes(id)) return { fill: "#10b981", stroke: "#059669" };
    if (s.queue.includes(id)) return { fill: "#e0e7ff", stroke: "#6366f1" };
    return { fill: "#f1f5f9", stroke: "#94a3b8" };
  }

  function nodeTextColor(id: number): string {
    if (s.current === id || s.processed.includes(id)) return "#fff";
    if (s.queue.includes(id)) return "#4f46e5";
    return "#334155";
  }

  function edgeTraversed(from: number, to: number): boolean {
    const fi = s.processed.indexOf(from);
    const ti = s.processed.indexOf(to);
    return fi !== -1 && ti !== -1;
  }

  return (
    <div className="space-y-4">

      {/* SVG */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <svg viewBox="0 0 540 420" className="w-full" style={{ maxHeight: 420 }}>
          {EDGES.map(({ from, to }) => (
            <ArrowLine key={`${from}-${to}`}
              from={from} to={to}
              active={s.current === from}
              traversed={edgeTraversed(from, to)}
            />
          ))}
          {NODES.map(n => {
            const c = nodeColor(n.id);
            const posInResult = s.processed.indexOf(n.id);
            return (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r={R} fill={c.fill} stroke={c.stroke} strokeWidth={2.5}/>
                <text x={n.x} y={n.y+5} textAnchor="middle" fill={nodeTextColor(n.id)} fontSize={14} fontWeight="700">
                  {n.id}
                </text>
                {/* In-degree badge */}
                <circle cx={n.x+18} cy={n.y-18} r={10} fill="#e2e8f0" stroke="#94a3b8" strokeWidth={1}/>
                <text x={n.x+18} y={n.y-14} textAnchor="middle" fill="#334155" fontSize={9} fontWeight="700">
                  {s.inDegrees[n.id]}
                </text>
                {/* Position in result */}
                {posInResult !== -1 && (
                  <text x={n.x} y={n.y-32} textAnchor="middle" fill="#10b981" fontSize={10} fontWeight="700">
                    #{posInResult + 1}
                  </text>
                )}
              </g>
            );
          })}

          {/* In-degree legend */}
          <text x={8} y={380} fill="#94a3b8" fontSize={9}>
            ⬛ = in-degree
          </text>
        </svg>
      </div>

      {/* Result + Queue */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border bg-muted/30 px-3 py-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Result (topo order)</p>
          <div className="flex gap-1 flex-wrap min-h-[24px] items-center">
            {s.processed.length === 0
              ? <span className="text-xs text-muted-foreground italic">none yet</span>
              : s.processed.map((n, i) => (
                <span key={i} className="flex items-center gap-0.5 text-xs font-mono font-bold text-emerald-600">
                  {i > 0 && <span className="text-muted-foreground mx-0.5">→</span>}
                  <span>{n}</span>
                </span>
              ))}
          </div>
        </div>
        <div className="rounded-lg border bg-muted/30 px-3 py-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Queue (in-degree = 0)</p>
          <div className="flex gap-1.5 flex-wrap min-h-[24px] items-center">
            {s.queue.length === 0
              ? <span className="text-xs text-muted-foreground italic">empty</span>
              : s.queue.map((n, i) => (
                <span key={i} className="px-2 py-0.5 rounded text-xs font-mono font-bold border bg-indigo-50 dark:bg-indigo-900/20 border-indigo-300 text-indigo-700 dark:text-indigo-300">
                  {n}
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
          { fill: "#f1f5f9", stroke: "#94a3b8", label: "Not processed" },
          { fill: "#e0e7ff", stroke: "#6366f1", label: "In queue" },
          { fill: "#f59e0b", stroke: "#d97706", label: "Processing" },
          { fill: "#10b981", stroke: "#059669", label: "Done" },
        ].map(({ fill, stroke, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full border-2 shrink-0" style={{ backgroundColor: fill, borderColor: stroke }}/>
            <span className="text-muted-foreground">{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-full bg-slate-200 border border-slate-400 flex items-center justify-center text-[8px] font-bold text-slate-600">n</span>
          <span className="text-muted-foreground">in-degree</span>
        </div>
      </div>
    </div>
  );
}
