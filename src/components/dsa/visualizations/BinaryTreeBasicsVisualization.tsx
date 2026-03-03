"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type View = "structure" | "terminology" | "properties";

interface NodeInfo {
  id: number;
  val: number;
  x: number;
  y: number;
  depth: number;
  isLeaf: boolean;
  isRoot: boolean;
}

//          1          ← root     (depth 0)
//        /   \
//       2     3       ← internal (depth 1)
//      / \   / \
//     4   5 6   7     ← depth 2
//    /
//   8                 ← leaf     (depth 3)
//
// Height = 3  (path 1→2→4→8)   |   Leaves: 5, 6, 7, 8

const NODES: NodeInfo[] = [
  { id: 1, val: 1, x: 250, y: 55,  depth: 0, isLeaf: false, isRoot: true  },
  { id: 2, val: 2, x: 125, y: 145, depth: 1, isLeaf: false, isRoot: false },
  { id: 3, val: 3, x: 375, y: 145, depth: 1, isLeaf: false, isRoot: false },
  { id: 4, val: 4, x: 62,  y: 235, depth: 2, isLeaf: false, isRoot: false },
  { id: 5, val: 5, x: 188, y: 235, depth: 2, isLeaf: true,  isRoot: false },
  { id: 6, val: 6, x: 312, y: 235, depth: 2, isLeaf: true,  isRoot: false },
  { id: 7, val: 7, x: 438, y: 235, depth: 2, isLeaf: true,  isRoot: false },
  { id: 8, val: 8, x: 62,  y: 315, depth: 3, isLeaf: true,  isRoot: false },
];

const EDGES = [
  { from: 1, to: 2 }, { from: 1, to: 3 },
  { from: 2, to: 4 }, { from: 2, to: 5 },
  { from: 3, to: 6 }, { from: 3, to: 7 },
  { from: 4, to: 8 },
];

const nodeMap = new Map(NODES.map((n) => [n.id, n]));

const DEPTH_COLORS = [
  { fill: "#6366f1", stroke: "#4f46e5" }, // indigo  — depth 0
  { fill: "#8b5cf6", stroke: "#7c3aed" }, // violet  — depth 1
  { fill: "#a855f7", stroke: "#9333ea" }, // purple  — depth 2
  { fill: "#ec4899", stroke: "#db2777" }, // pink    — depth 3
];

const STATS = [
  { label: "Nodes",    value: "8" },
  { label: "Height",   value: "3" },
  { label: "Leaves",   value: "4" },
  { label: "Internal", value: "4" },
];

export function BinaryTreeBasicsVisualization() {
  const [view, setView]       = useState<View>("structure");
  const [hovered, setHovered] = useState<number | null>(null);

  const getNodeStyle = (node: NodeInfo) => {
    if (view === "terminology") {
      if (node.isRoot) return { fill: "#10b981", stroke: "#059669" };
      if (node.isLeaf) return { fill: "#f59e0b", stroke: "#d97706" };
      return { fill: "#3b82f6", stroke: "#2563eb" };
    }
    if (view === "properties") {
      return DEPTH_COLORS[node.depth] ?? DEPTH_COLORS[0];
    }
    // structure view
    if (hovered === node.id) return { fill: "#6366f1", stroke: "#4f46e5" };
    return { fill: "#e2e8f0", stroke: "#94a3b8" };
  };

  const getTextColor = (node: NodeInfo) => {
    if (view === "structure" && hovered !== node.id) return "#1e293b";
    return "#ffffff";
  };

  const hoveredNode = NODES.find((n) => n.id === hovered);

  return (
    <div className="space-y-4">

      {/* ── View selector ── */}
      <div className="flex gap-2 flex-wrap">
        {(
          [
            ["structure",  "Structure"],
            ["terminology","Terminology"],
            ["properties", "Height & Depth"],
          ] as [View, string][]
        ).map(([v, label]) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              view === v
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-accent text-muted-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── SVG tree diagram ── */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <svg viewBox="0 0 500 365" className="w-full" style={{ maxHeight: 365 }}>

          {/* Level labels — properties view */}
          {view === "properties" &&
            [55, 145, 235, 315].map((y, i) => (
              <text key={i} x={10} y={y + 5} fill="#94a3b8" fontSize={10} fontWeight="600">
                L{i}
              </text>
            ))}

          {/* Height bracket — properties view */}
          {view === "properties" && (
            <g>
              <line x1={478} y1={55}  x2={478} y2={315} stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 3" />
              <line x1={470} y1={55}  x2={486} y2={55}  stroke="#94a3b8" strokeWidth={1.5} />
              <line x1={470} y1={315} x2={486} y2={315} stroke="#94a3b8" strokeWidth={1.5} />
              <text x={490} y={192} fill="#94a3b8" fontSize={11} fontWeight="700">h=3</text>
            </g>
          )}

          {/* Edges */}
          {EDGES.map(({ from, to }) => {
            const f = nodeMap.get(from)!;
            const t = nodeMap.get(to)!;
            return (
              <line
                key={`${from}-${to}`}
                x1={f.x} y1={f.y}
                x2={t.x} y2={t.y}
                stroke="#94a3b8"
                strokeWidth={2}
              />
            );
          })}

          {/* Nodes */}
          {NODES.map((node) => {
            const style = getNodeStyle(node);
            return (
              <g
                key={node.id}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={node.x} cy={node.y} r={22}
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth={2}
                />
                <text
                  x={node.x} y={node.y + 5}
                  textAnchor="middle"
                  fill={getTextColor(node)}
                  fontSize={14}
                  fontWeight="700"
                >
                  {node.val}
                </text>

                {/* Depth label — properties view */}
                {view === "properties" && (
                  <text
                    x={node.x + 27} y={node.y + 4}
                    textAnchor="start" fill="#64748b" fontSize={10}
                  >
                    d={node.depth}
                  </text>
                )}

                {/* Role label — terminology view */}
                {view === "terminology" && (
                  <text
                    x={node.x} y={node.y + 38}
                    textAnchor="middle"
                    fill={style.stroke}
                    fontSize={9} fontWeight="600"
                  >
                    {node.isRoot ? "root" : node.isLeaf ? "leaf" : "internal"}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Terminology legend ── */}
      {view === "terminology" && (
        <div className="flex flex-wrap gap-4 text-xs">
          {[
            { color: "#10b981", label: "Root — no parent, single entry point" },
            { color: "#3b82f6", label: "Internal — has at least one child" },
            { color: "#f59e0b", label: "Leaf — both children are null" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Depth legend ── */}
      {view === "properties" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {DEPTH_COLORS.map((c, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg bg-muted/40 px-2.5 py-2 text-xs">
              <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: c.fill }} />
              <div>
                <div className="font-semibold">Depth {i}</div>
                <div className="text-muted-foreground">{i === 0 ? "Root" : `Level ${i}`}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Hover info — structure view ── */}
      {view === "structure" && (
        <div className="rounded-lg border bg-muted/40 px-3 py-2 text-xs text-muted-foreground min-h-[34px]">
          {hoveredNode ? (
            <span>
              <span className="font-semibold text-foreground">Node {hoveredNode.val}</span>
              {" — "}depth: {hoveredNode.depth}
              {" — "}
              {hoveredNode.isRoot
                ? "Root node (no parent)"
                : hoveredNode.isLeaf
                ? "Leaf node (no children)"
                : "Internal node (has children)"}
            </span>
          ) : (
            "Hover over a node to inspect its properties"
          )}
        </div>
      )}

      {/* ── Stats row ── */}
      <div className="grid grid-cols-4 gap-2 text-xs">
        {STATS.map(({ label, value }) => (
          <div key={label} className="rounded-lg bg-muted/50 border text-center py-2">
            <div className="font-bold text-sm text-primary">{value}</div>
            <div className="text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
