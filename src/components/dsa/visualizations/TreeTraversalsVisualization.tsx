"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Tree layout ─────────────────────────────────────────────────────────────
//
//          1           ← root  (depth 0)
//        /   \
//       2     3        ← depth 1
//      / \     \
//     4   5     6      ← depth 2
//

type TraversalType = "inorder" | "preorder" | "postorder" | "levelorder";

interface TNode { id: number; val: number; x: number; y: number }

const NODES: TNode[] = [
  { id: 1, val: 1, x: 250, y: 60  },
  { id: 2, val: 2, x: 135, y: 155 },
  { id: 3, val: 3, x: 365, y: 155 },
  { id: 4, val: 4, x: 70,  y: 250 },
  { id: 5, val: 5, x: 200, y: 250 },
  { id: 6, val: 6, x: 365, y: 250 },
];

const EDGES = [
  { from: 1, to: 2 }, { from: 1, to: 3 },
  { from: 2, to: 4 }, { from: 2, to: 5 },
  { from: 3, to: 6 },
];

const nodeMap = new Map(NODES.map(n => [n.id, n]));

// ─── Pre-computed traversal orders ───────────────────────────────────────────

const TRAVERSALS: Record<TraversalType, {
  label: string;
  shortLabel: string;
  order: number[];
  desc: string;
  color: string;
}> = {
  inorder: {
    label: "Inorder (L→N→R)",
    shortLabel: "Inorder",
    order: [4, 2, 5, 1, 3, 6],
    desc: "Left subtree first, then current node, then right subtree. For a BST this produces sorted ascending output.",
    color: "#6366f1",
  },
  preorder: {
    label: "Preorder (N→L→R)",
    shortLabel: "Preorder",
    order: [1, 2, 4, 5, 3, 6],
    desc: "Current node first, then left subtree, then right subtree. The root always appears first — ideal for serialising or copying a tree.",
    color: "#8b5cf6",
  },
  postorder: {
    label: "Postorder (L→R→N)",
    shortLabel: "Postorder",
    order: [4, 5, 2, 6, 3, 1],
    desc: "Left and right subtrees fully processed before the current node. Used for deleting a tree or evaluating expression trees bottom-up.",
    color: "#ec4899",
  },
  levelorder: {
    label: "Level Order (BFS)",
    shortLabel: "Level Order",
    order: [1, 2, 3, 4, 5, 6],
    desc: "Visit nodes level by level using a queue. Node 1 first, then all depth-1 nodes, then all depth-2 nodes. Great for min depth and right side view problems.",
    color: "#0ea5e9",
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function TreeTraversalsVisualization() {
  const [type, setType]       = useState<TraversalType>("inorder");
  const [step, setStep]       = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef              = useRef<ReturnType<typeof setInterval> | null>(null);

  const { order, desc, color } = TRAVERSALS[type];
  const maxStep = order.length;

  function changeType(t: TraversalType) {
    setType(t);
    setStep(0);
    setPlaying(false);
  }

  function reset() {
    setStep(0);
    setPlaying(false);
  }

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setStep(prev => {
          if (prev >= maxStep) { setPlaying(false); return prev; }
          return prev + 1;
        });
      }, 800);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing, maxStep]);

  const visited = new Set(order.slice(0, step));
  const current = step < maxStep ? order[step] : null;
  const result  = order.slice(0, step).map(id => nodeMap.get(id)!.val);

  function nodeStyle(id: number): { fill: string; stroke: string } {
    if (id === current) return { fill: "#f59e0b", stroke: "#d97706" };
    if (visited.has(id)) return { fill: color, stroke: color };
    return { fill: "#f1f5f9", stroke: "#94a3b8" };
  }
  function textColor(id: number): string {
    return (id === current || visited.has(id)) ? "#fff" : "#334155";
  }

  return (
    <div className="space-y-4">

      {/* ── Traversal type buttons ── */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(TRAVERSALS) as TraversalType[]).map(t => (
          <button
            key={t}
            onClick={() => changeType(t)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              type === t
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-accent text-muted-foreground",
            )}
          >
            {TRAVERSALS[t].shortLabel}
          </button>
        ))}
      </div>

      {/* ── SVG tree ── */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <svg viewBox="0 0 480 295" className="w-full" style={{ maxHeight: 295 }}>

          {/* Edges */}
          {EDGES.map(({ from, to }) => {
            const f = nodeMap.get(from)!;
            const t = nodeMap.get(to)!;
            const active = visited.has(from) && visited.has(to);
            return (
              <line
                key={`${from}-${to}`}
                x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                stroke={active ? color : "#cbd5e1"}
                strokeWidth={active ? 2.5 : 1.5}
              />
            );
          })}

          {/* Nodes */}
          {NODES.map(n => {
            const s   = nodeStyle(n.id);
            const rank = order.indexOf(n.id);
            return (
              <g key={n.id}>
                <circle
                  cx={n.x} cy={n.y} r={24}
                  fill={s.fill} stroke={s.stroke} strokeWidth={2.5}
                />
                <text
                  x={n.x} y={n.y + 5}
                  textAnchor="middle"
                  fill={textColor(n.id)}
                  fontSize={15} fontWeight="700"
                >
                  {n.val}
                </text>
                {/* Step badge */}
                {visited.has(n.id) && (
                  <text
                    x={n.x + 29} y={n.y - 12}
                    fill={color} fontSize={10} fontWeight="700"
                  >
                    #{rank + 1}
                  </text>
                )}
              </g>
            );
          })}

          {/* Current node indicator ring */}
          {current !== null && (() => {
            const n = nodeMap.get(current)!;
            return (
              <circle
                cx={n.x} cy={n.y} r={30}
                fill="none"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 3"
                opacity={0.8}
              />
            );
          })()}
        </svg>
      </div>

      {/* ── Description ── */}
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>

      {/* ── Controls ── */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="p-1.5 rounded-lg border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => setPlaying(p => !p)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium"
        >
          {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {playing ? "Pause" : "Play"}
        </button>
        <button
          onClick={() => setStep(s => Math.min(maxStep, s + 1))}
          disabled={step >= maxStep}
          className="p-1.5 rounded-lg border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={reset}
          className="p-1.5 rounded-lg border hover:bg-muted transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <span className="text-xs text-muted-foreground ml-auto">
          Step {step} / {maxStep}
        </span>
      </div>

      {/* ── Result array ── */}
      <div className="rounded-lg border bg-muted/40 p-3">
        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Result
        </div>
        <div className="flex gap-2 flex-wrap min-h-[32px] items-center">
          {result.length === 0
            ? <span className="text-xs text-muted-foreground italic">[ ] — press Play or Next to start</span>
            : result.map((v, i) => (
                <span
                  key={i}
                  className="h-8 w-8 flex items-center justify-center rounded-lg text-white text-sm font-bold"
                  style={{ backgroundColor: color }}
                >
                  {v}
                </span>
              ))}
        </div>
      </div>

      {/* ── Legend ── */}
      <div className="flex flex-wrap gap-4 text-xs">
        {[
          { fill: "#f1f5f9", stroke: "#94a3b8", label: "Not yet visited" },
          { fill: "#f59e0b", stroke: "#d97706", label: "Visiting now"    },
          { fill: color,     stroke: color,     label: "Visited"         },
        ].map(({ fill, stroke, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span
              className="h-3.5 w-3.5 rounded-full border-2 shrink-0"
              style={{ backgroundColor: fill, borderColor: stroke }}
            />
            <span className="text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
