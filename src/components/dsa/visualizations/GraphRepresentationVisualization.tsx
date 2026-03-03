"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// Graph: 5 nodes, 6 undirected edges
// 0:(130,120)  1:(340,80)  2:(70,260)  3:(270,260)  4:(400,200)
// Edges: 0-1, 0-2, 1-3, 2-3, 2-4, 3-4

const NODES = [
  { id: 0, x: 130, y: 120 },
  { id: 1, x: 340, y: 80  },
  { id: 2, x: 70,  y: 260 },
  { id: 3, x: 270, y: 260 },
  { id: 4, x: 400, y: 200 },
];

const EDGES = [
  [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 4],
];

const ADJ_LIST: number[][] = [
  [1, 2],    // 0
  [0, 3],    // 1
  [0, 3, 4], // 2
  [1, 2, 4], // 3
  [2, 3],    // 4
];

const nodeMap = new Map(NODES.map(n => [n.id, n]));

type Tab = "list" | "matrix";

export function GraphRepresentationVisualization() {
  const [tab, setTab]           = useState<Tab>("list");
  const [hovered, setHovered]   = useState<number | null>(null);

  const isHighlightedEdge = (a: number, b: number) => {
    if (hovered === null) return false;
    return a === hovered || b === hovered;
  };

  const isHighlightedNode = (id: number) => {
    if (hovered === null) return false;
    return id === hovered || ADJ_LIST[hovered].includes(id);
  };

  const nodeColor = (id: number) => {
    if (hovered === null) return { fill: "#f1f5f9", stroke: "#94a3b8" };
    if (id === hovered)   return { fill: "#f59e0b", stroke: "#d97706" };
    if (ADJ_LIST[hovered].includes(id)) return { fill: "#6366f1", stroke: "#4f46e5" };
    return { fill: "#f1f5f9", stroke: "#cbd5e1" };
  };

  const textColor = (id: number) => {
    if (hovered === null) return "#334155";
    if (id === hovered || ADJ_LIST[hovered].includes(id)) return "#fff";
    return "#94a3b8";
  };

  // 5×5 matrix row values
  const matrix: number[][] = Array.from({ length: 5 }, () => new Array(5).fill(0));
  EDGES.forEach(([u, v]) => { matrix[u][v] = 1; matrix[v][u] = 1; });

  return (
    <div className="space-y-4">

      {/* Tabs */}
      <div className="flex gap-2">
        {(["list", "matrix"] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => { setTab(t); setHovered(null); }}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors",
              tab === t
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-accent text-muted-foreground",
            )}
          >
            {t === "list" ? "Adjacency List" : "Adjacency Matrix"}
          </button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground self-center">
          Click a node to highlight its connections
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Graph SVG */}
        <div className="rounded-xl border bg-card overflow-hidden">
          <svg viewBox="0 0 500 360" className="w-full" style={{ maxHeight: 360 }}>
            {/* Edges */}
            {EDGES.map(([a, b]) => {
              const na = nodeMap.get(a)!;
              const nb = nodeMap.get(b)!;
              const hi = isHighlightedEdge(a, b);
              return (
                <line
                  key={`${a}-${b}`}
                  x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke={hi ? "#6366f1" : "#cbd5e1"}
                  strokeWidth={hi ? 2.5 : 1.5}
                />
              );
            })}

            {/* Nodes */}
            {NODES.map(n => {
              const c = nodeColor(n.id);
              return (
                <g
                  key={n.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => setHovered(hovered === n.id ? null : n.id)}
                >
                  <circle cx={n.x} cy={n.y} r={24} fill={c.fill} stroke={c.stroke} strokeWidth={2.5} />
                  <text
                    x={n.x} y={n.y + 5}
                    textAnchor="middle"
                    fill={textColor(n.id)}
                    fontSize={15} fontWeight="700"
                  >
                    {n.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Data Structure Panel */}
        <div className="rounded-xl border bg-card p-4 font-mono text-xs overflow-auto">
          {tab === "list" ? (
            <div className="space-y-1.5">
              <p className="text-muted-foreground mb-2 font-sans font-semibold text-[11px] uppercase tracking-wide">Adjacency List</p>
              {ADJ_LIST.map((neighbors, id) => (
                <div
                  key={id}
                  onClick={() => setHovered(hovered === id ? null : id)}
                  style={{ cursor: "pointer" }}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors",
                    hovered === id
                      ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-300"
                      : isHighlightedNode(id)
                      ? "bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200"
                      : "hover:bg-muted border border-transparent",
                  )}
                >
                  <span className={cn(
                    "font-bold w-4",
                    hovered === id ? "text-amber-600" : isHighlightedNode(id) ? "text-indigo-600" : "text-foreground",
                  )}>
                    {id}
                  </span>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-foreground">[{neighbors.join(", ")}]</span>
                </div>
              ))}
              <div className="mt-3 pt-3 border-t text-muted-foreground font-sans text-[10px] space-y-0.5">
                <p>Space: O(V + E)</p>
                <p>Find neighbors: O(degree)</p>
                <p>Edge exists: O(degree)</p>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <p className="text-muted-foreground mb-2 font-sans font-semibold text-[11px] uppercase tracking-wide">Adjacency Matrix (5×5)</p>
              {/* Header row */}
              <div className="flex gap-1.5 ml-6">
                {[0,1,2,3,4].map(c => (
                  <span key={c} className={cn(
                    "w-7 text-center font-bold",
                    hovered === c ? "text-amber-500" : "text-muted-foreground",
                  )}>{c}</span>
                ))}
              </div>
              {matrix.map((row, r) => (
                <div key={r} className={cn(
                  "flex items-center gap-1.5 rounded-lg px-1 py-0.5 transition-colors",
                  hovered === r ? "bg-amber-50 dark:bg-amber-900/20" : "",
                )}>
                  <span className={cn("w-5 font-bold mr-1", hovered === r ? "text-amber-600" : "text-muted-foreground")}>{r}</span>
                  {row.map((val, c) => {
                    const highlighted = hovered !== null && (r === hovered || c === hovered) && val === 1;
                    return (
                      <span
                        key={c}
                        className={cn(
                          "w-7 h-7 flex items-center justify-center rounded font-mono font-semibold text-xs border transition-colors",
                          highlighted
                            ? "bg-indigo-500 text-white border-indigo-600"
                            : val === 1
                            ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border-emerald-200"
                            : "bg-muted text-muted-foreground border-transparent",
                        )}
                      >
                        {val}
                      </span>
                    );
                  })}
                </div>
              ))}
              <div className="mt-3 pt-3 border-t text-muted-foreground font-sans text-[10px] space-y-0.5">
                <p>Space: O(V²)</p>
                <p>Find neighbors: O(V)</p>
                <p>Edge exists: O(1)</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        {[
          { fill: "#f1f5f9", stroke: "#94a3b8", label: "Unselected" },
          { fill: "#f59e0b", stroke: "#d97706", label: "Selected node" },
          { fill: "#6366f1", stroke: "#4f46e5", label: "Neighbor" },
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
