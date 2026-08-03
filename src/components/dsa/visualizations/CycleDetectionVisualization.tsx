"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

// ── Undirected graph: square 0-1-2-3-0 ──────────
// Positions: 0:(120,80) 1:(380,80) 2:(380,280) 3:(120,280)
const UNDIR_NODES = [
  { id: 0, x: 120, y: 80  },
  { id: 1, x: 380, y: 80  },
  { id: 2, x: 380, y: 280 },
  { id: 3, x: 120, y: 280 },
];
const UNDIR_EDGES = [[0,1],[1,2],[2,3],[3,0]];

// ── Directed graph: 0→1→2→3→1 (cycle 1→2→3→1) ─
// Positions: 0:(90,180) 1:(250,80) 2:(410,180) 3:(250,300)
const DIR_NODES = [
  { id: 0, x: 90,  y: 180 },
  { id: 1, x: 250, y: 80  },
  { id: 2, x: 410, y: 180 },
  { id: 3, x: 250, y: 300 },
];
const DIR_EDGES = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 1 }, // back edge → cycle
];

// ── Steps for undirected DFS cycle detection ───
// Color: "unvisited" | "visited" | "current" | "cycle"
interface UndirStep {
  visited: number[];
  current: number | null;
  parent: number | null;
  cycleEdge: [number, number] | null;
  message: string;
  done?: boolean;
}

const UNDIR_STEPS: UndirStep[] = [
  { visited: [],        current: null, parent: null, cycleEdge: null, message: "Start DFS from node 0 (parent = none)." },
  { visited: [0],       current: 0,   parent: null, cycleEdge: null, message: "Visit 0. Explore neighbor 1." },
  { visited: [0, 1],    current: 1,   parent: 0,    cycleEdge: null, message: "Visit 1. Neighbor 0 = parent, skip. Explore 2." },
  { visited: [0,1,2],   current: 2,   parent: 1,    cycleEdge: null, message: "Visit 2. Neighbor 1 = parent, skip. Explore 3." },
  { visited: [0,1,2,3], current: 3,   parent: 2,    cycleEdge: null, message: "Visit 3. Check neighbor 2 = parent, skip. Check neighbor 0..." },
  { visited: [0,1,2,3], current: 3,   parent: 2,    cycleEdge: [3,0], message: "Neighbor 0 is VISITED and NOT parent(2). Back edge found → CYCLE DETECTED!", done: true },
];

// ── Steps for directed 3-color DFS ─────────────
// color: 0=white, 1=gray, 2=black
interface DirStep {
  colors: number[];   // index = node id
  current: number | null;
  backEdge: [number, number] | null;
  message: string;
  done?: boolean;
}

const DIR_STEPS: DirStep[] = [
  { colors: [0,0,0,0], current: null, backEdge: null, message: "All nodes WHITE (unvisited). Start DFS from 0." },
  { colors: [1,0,0,0], current: 0,    backEdge: null, message: "Color 0 GRAY (in call stack). Explore 0→1." },
  { colors: [1,1,0,0], current: 1,    backEdge: null, message: "Color 1 GRAY. Explore 1→2." },
  { colors: [1,1,1,0], current: 2,    backEdge: null, message: "Color 2 GRAY. Explore 2→3." },
  { colors: [1,1,1,1], current: 3,    backEdge: null, message: "Color 3 GRAY. Check neighbor 1..." },
  { colors: [1,1,1,1], current: 3,    backEdge: [3,1], message: "Node 1 is GRAY (still in call stack). Back edge 3→1 found → CYCLE DETECTED!", done: true },
];

const R = 22;

function undirEdgeColor(a: number, b: number, step: UndirStep): string {
  if (step.cycleEdge) {
    const [ca, cb] = step.cycleEdge;
    if ((a === ca && b === cb) || (a === cb && b === ca)) return "#ef4444";
  }
  const viA = step.visited.includes(a);
  const viB = step.visited.includes(b);
  if (viA && viB) return "#6366f1";
  return "#cbd5e1";
}

function undirNodeColor(id: number, step: UndirStep): { fill: string; stroke: string } {
  if (step.cycleEdge && (step.cycleEdge[0] === id || step.cycleEdge[1] === id)) {
    return { fill: "#ef4444", stroke: "#dc2626" };
  }
  if (step.current === id) return { fill: "#f59e0b", stroke: "#d97706" };
  if (step.visited.includes(id)) return { fill: "#6366f1", stroke: "#4f46e5" };
  return { fill: "#f1f5f9", stroke: "#94a3b8" };
}

const COLOR_STYLES = [
  { fill: "#f1f5f9", stroke: "#94a3b8" }, // white
  { fill: "#f59e0b", stroke: "#d97706" }, // gray (in stack)
  { fill: "#10b981", stroke: "#059669" }, // black (done)
];

function dirArrow(from: number, to: number, nodes: typeof DIR_NODES, isBack: boolean, isActive: boolean) {
  const nf = nodes.find(n => n.id === from)!;
  const nt = nodes.find(n => n.id === to)!;
  const dx = nt.x - nf.x, dy = nt.y - nf.y;
  const len = Math.sqrt(dx*dx + dy*dy);
  const ux = dx/len, uy = dy/len;
  const sx = nf.x + ux*(R+2), sy = nf.y + uy*(R+2);
  const ex = nt.x - ux*(R+8), ey = nt.y - uy*(R+8);
  const ax1 = ex - ux*9 + uy*5, ay1 = ey - uy*9 - ux*5;
  const ax2 = ex - ux*9 - uy*5, ay2 = ey - uy*9 + ux*5;
  const color = isBack ? "#ef4444" : isActive ? "#f59e0b" : "#cbd5e1";
  const width = (isBack || isActive) ? 2.5 : 1.5;
  return (
    <g key={`${from}-${to}`}>
      <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={color} strokeWidth={width} strokeDasharray={isBack ? "5 3" : undefined}/>
      <polygon points={`${ex},${ey} ${ax1},${ay1} ${ax2},${ay2}`} fill={color}/>
    </g>
  );
}

type Tab = "undirected" | "directed";

export function CycleDetectionVisualization() {
  const [tab, setTab]   = useState<Tab>("undirected");
  const [step, setStep] = useState(0);

  const maxStep = tab === "undirected" ? UNDIR_STEPS.length - 1 : DIR_STEPS.length - 1;
  const us = UNDIR_STEPS[Math.min(step, UNDIR_STEPS.length-1)];
  const ds = DIR_STEPS[Math.min(step, DIR_STEPS.length-1)];
  const currentStep = tab === "undirected" ? us : ds;

  function changeTab(t: Tab) { setTab(t); setStep(0); }

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2">
        {(["undirected","directed"] as Tab[]).map(t => (
          <button key={t} onClick={() => changeTab(t)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors",
              tab === t ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent text-muted-foreground",
            )}>
            {t === "undirected" ? "Undirected (parent tracking)" : "Directed (3-color DFS)"}
          </button>
        ))}
      </div>

      {/* SVG */}
      <div className="rounded-xl border bg-card overflow-hidden">
        {tab === "undirected" ? (
          <svg viewBox="0 0 500 370" className="w-full" style={{ maxHeight: 370 }}>
            {UNDIR_EDGES.map(([a,b]) => {
              const na = UNDIR_NODES.find(n=>n.id===a)!;
              const nb = UNDIR_NODES.find(n=>n.id===b)!;
              const color = undirEdgeColor(a, b, us);
              const isRed = color === "#ef4444";
              return (
                <line key={`${a}-${b}`}
                  x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke={color} strokeWidth={isRed ? 3 : 2}
                  strokeDasharray={isRed ? "6 3" : undefined}
                />
              );
            })}
            {UNDIR_NODES.map(n => {
              const c = undirNodeColor(n.id, us);
              const isRed = c.fill === "#ef4444";
              return (
                <g key={n.id}>
                  <circle cx={n.x} cy={n.y} r={R} fill={c.fill} stroke={c.stroke} strokeWidth={2.5} />
                  {isRed && (
                    <circle cx={n.x} cy={n.y} r={R+6} fill="none" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4 3" />
                  )}
                  <text x={n.x} y={n.y+5} textAnchor="middle"
                    fill={(c.fill !== "#f1f5f9") ? "#fff" : "#334155"}
                    fontSize={14} fontWeight="700">{n.id}</text>
                  {us.parent !== null && n.id === us.current && !us.cycleEdge && (
                    <text x={n.x} y={n.y+36} textAnchor="middle" fill="#94a3b8" fontSize={9}>
                      parent={us.parent}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        ) : (
          <svg viewBox="0 0 500 400" className="w-full" style={{ maxHeight: 400 }}>
            {DIR_EDGES.map(({ from, to }) => {
              const isBack = ds.backEdge?.[0] === from && ds.backEdge?.[1] === to;
              const isActive = ds.current === from && ds.colors[to] === 0;
              return dirArrow(from, to, DIR_NODES, isBack ?? false, isActive);
            })}
            {DIR_NODES.map(n => {
              const c = COLOR_STYLES[ds.colors[n.id]];
              const isBackNode = ds.backEdge && (ds.backEdge[0] === n.id || ds.backEdge[1] === n.id);
              return (
                <g key={n.id}>
                  {isBackNode && (
                    <circle cx={n.x} cy={n.y} r={R+7} fill="none" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4 3" />
                  )}
                  <circle cx={n.x} cy={n.y} r={R} fill={isBackNode ? "#ef4444" : c.fill} stroke={isBackNode ? "#dc2626" : c.stroke} strokeWidth={2.5} />
                  <text x={n.x} y={n.y+5} textAnchor="middle"
                    fill={(isBackNode || ds.colors[n.id] !== 0) ? "#fff" : "#334155"}
                    fontSize={14} fontWeight="700">{n.id}</text>
                  {/* Color label */}
                  <text x={n.x} y={n.y+36} textAnchor="middle" fill="#94a3b8" fontSize={9} fontWeight="600">
                    {isBackNode ? "CYCLE!" : ["white","gray","black"][ds.colors[n.id]]}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>

      {/* Message */}
      <div className={cn(
        "rounded-lg border px-3 py-2 text-xs min-h-[34px] flex items-center gap-2",
        currentStep.done
          ? "bg-red-50 dark:bg-red-900/20 border-red-300"
          : "bg-muted/40",
      )}>
        {currentStep.done && <span className="text-red-500 font-bold">⚠</span>}
        <span className="text-foreground">{currentStep.message}</span>
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
        {(tab === "undirected" ? [
          { fill: "#f1f5f9", stroke: "#94a3b8", label: "Unvisited" },
          { fill: "#f59e0b", stroke: "#d97706", label: "Current" },
          { fill: "#6366f1", stroke: "#4f46e5", label: "Visited" },
          { fill: "#ef4444", stroke: "#dc2626", label: "Cycle nodes" },
        ] : [
          { fill: "#f1f5f9", stroke: "#94a3b8", label: "White (unvisited)" },
          { fill: "#f59e0b", stroke: "#d97706", label: "Gray (in stack)" },
          { fill: "#10b981", stroke: "#059669", label: "Black (done)" },
          { fill: "#ef4444", stroke: "#dc2626", label: "Cycle!" },
        ]).map(({ fill, stroke, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full border-2 shrink-0" style={{ backgroundColor: fill, borderColor: stroke }} />
            <span className="text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
