"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

// ─── BST layout ──────────────────────────────────────────────────────────────
//
//         5          (x=250, y=60)
//        / \
//       3   7        (x=140, y=155), (x=360, y=155)
//      / \ / \
//     2  4 6  8      (x=85,y=250), (x=195,y=250), (x=305,y=250), (x=415,y=250)

type Tab = "insert" | "search" | "validate";

interface BSTNode { id: number; val: number; x: number; y: number }

const BST: BSTNode[] = [
  { id: 5, val: 5, x: 250, y: 60  },
  { id: 3, val: 3, x: 140, y: 155 },
  { id: 7, val: 7, x: 360, y: 155 },
  { id: 2, val: 2, x: 85,  y: 250 },
  { id: 4, val: 4, x: 195, y: 250 },
  { id: 6, val: 6, x: 305, y: 250 },
  { id: 8, val: 8, x: 415, y: 250 },
];

const BST_EDGES = [
  { from: 5, to: 3 }, { from: 5, to: 7 },
  { from: 3, to: 2 }, { from: 3, to: 4 },
  { from: 7, to: 6 }, { from: 7, to: 8 },
];

const bstMap = new Map(BST.map(n => [n.id, n]));

// ─── Pre-computed step sequences ─────────────────────────────────────────────

interface Step {
  current: number | null;        // node being examined
  path:    number[];             // nodes visited so far (highlighted)
  message: string;
  insertPos?: { x: number; y: number; val: number } | null;
  outcome?: "found" | "notfound" | "inserted" | null;
}

// Insert 1 → path: 5 → 3 → 2 → insert left of 2
const INSERT_1_STEPS: Step[] = [
  { current: 5, path: [],         message: "Start at root (5). Compare: 1 < 5 → go left.", insertPos: null, outcome: null },
  { current: 3, path: [5],        message: "At node 3. Compare: 1 < 3 → go left.",          insertPos: null, outcome: null },
  { current: 2, path: [5, 3],     message: "At node 2. Compare: 1 < 2 → go left. Left child is null!", insertPos: null, outcome: null },
  { current: null, path: [5,3,2], message: "Left of node 2 is empty → insert 1 here as a new leaf.", insertPos: { x: 30, y: 340, val: 1 }, outcome: "inserted" },
];

// Insert 9 → path: 5 → 7 → 8 → insert right of 8
const INSERT_9_STEPS: Step[] = [
  { current: 5, path: [],         message: "Start at root (5). Compare: 9 > 5 → go right.", insertPos: null, outcome: null },
  { current: 7, path: [5],        message: "At node 7. Compare: 9 > 7 → go right.",          insertPos: null, outcome: null },
  { current: 8, path: [5, 7],     message: "At node 8. Compare: 9 > 8 → go right. Right child is null!", insertPos: null, outcome: null },
  { current: null, path: [5,7,8], message: "Right of node 8 is empty → insert 9 here as a new leaf.", insertPos: { x: 470, y: 340, val: 9 }, outcome: "inserted" },
];

// Search 4 → path: 5 → 3 → 4 (found)
const SEARCH_4_STEPS: Step[] = [
  { current: 5, path: [],     message: "Start at root (5). Compare: 4 < 5 → go left.",  outcome: null },
  { current: 3, path: [5],    message: "At node 3. Compare: 4 > 3 → go right.",          outcome: null },
  { current: 4, path: [5, 3], message: "At node 4. 4 === 4 → Found! 🎉",                  outcome: "found" },
];

// Search 9 → path: 5 → 7 → 8 → null (not found)
const SEARCH_9_STEPS: Step[] = [
  { current: 5, path: [],         message: "Start at root (5). Compare: 9 > 5 → go right.", outcome: null },
  { current: 7, path: [5],        message: "At node 7. Compare: 9 > 7 → go right.",           outcome: null },
  { current: 8, path: [5, 7],     message: "At node 8. Compare: 9 > 8 → go right. Right child is null.", outcome: null },
  { current: null, path: [5,7,8], message: "Right of node 8 is null → 9 not found in the BST.",           outcome: "notfound" },
];

// Validate — show bounds per node (pre-order DFS)
const VALIDATE_STEPS: Array<{ nodeId: number; min: string; max: string; valid: boolean; message: string }> = [
  { nodeId: 5, min: "-∞", max: "+∞", valid: true, message: "Node 5: range (-∞, +∞). 5 is inside → valid ✓" },
  { nodeId: 3, min: "-∞", max: "5",  valid: true, message: "Node 3: range (-∞, 5). 3 < 5 → valid ✓" },
  { nodeId: 2, min: "-∞", max: "3",  valid: true, message: "Node 2: range (-∞, 3). 2 < 3 → valid ✓" },
  { nodeId: 4, min: "3",  max: "5",  valid: true, message: "Node 4: range (3, 5). 3 < 4 < 5 → valid ✓" },
  { nodeId: 7, min: "5",  max: "+∞", valid: true, message: "Node 7: range (5, +∞). 7 > 5 → valid ✓" },
  { nodeId: 6, min: "5",  max: "7",  valid: true, message: "Node 6: range (5, 7). 5 < 6 < 7 → valid ✓" },
  { nodeId: 8, min: "7",  max: "+∞", valid: true, message: "Node 8: range (7, +∞). 8 > 7 → valid ✓" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function BinarySearchTreeVisualization() {
  const [tab,      setTab]      = useState<Tab>("insert");
  const [insertV,  setInsertV]  = useState<1 | 9>(1);
  const [searchV,  setSearchV]  = useState<4 | 9>(4);
  const [step,     setStep]     = useState(0);

  // derive step sequence based on current tab/selection
  const steps: Step[] =
    tab === "insert" ? (insertV === 1 ? INSERT_1_STEPS : INSERT_9_STEPS) :
    tab === "search" ? (searchV === 4 ? SEARCH_4_STEPS : SEARCH_9_STEPS) :
    [];

  const maxStep  = tab === "validate" ? VALIDATE_STEPS.length - 1 : steps.length - 1;
  const curStep  = tab === "validate" ? null : steps[Math.min(step, steps.length - 1)];

  // validated nodes (for validate tab)
  const validatedIds = new Set(
    tab === "validate" ? VALIDATE_STEPS.slice(0, step + 1).map(s => s.nodeId) : []
  );
  const currentValidateStep = tab === "validate" ? VALIDATE_STEPS[step] : null;

  function changeTab(t: Tab) { setTab(t); setStep(0); }
  function reset()           { setStep(0); }

  // ── node coloring ──
  function nodeColor(node: BSTNode): { fill: string; stroke: string } {
    if (tab === "validate") {
      if (node.id === currentValidateStep?.nodeId)
        return { fill: "#3b82f6", stroke: "#2563eb" };        // checking now — blue
      if (validatedIds.has(node.id))
        return { fill: "#10b981", stroke: "#059669" };         // validated — green
      return { fill: "#f1f5f9", stroke: "#94a3b8" };
    }

    if (!curStep) return { fill: "#f1f5f9", stroke: "#94a3b8" };
    if (node.id === curStep.current) {
      if (curStep.outcome === "found") return { fill: "#10b981", stroke: "#059669" };
      return { fill: "#f59e0b", stroke: "#d97706" };           // currently examining — amber
    }
    if (curStep.path.includes(node.id)) return { fill: "#6366f1", stroke: "#4f46e5" }; // path — indigo
    return { fill: "#f1f5f9", stroke: "#94a3b8" };
  }

  function textColor(node: BSTNode): string {
    if (tab === "validate") {
      if (node.id === currentValidateStep?.nodeId || validatedIds.has(node.id)) return "#fff";
    } else {
      if (!curStep) return "#334155";
      if (node.id === curStep.current || curStep.path.includes(node.id)) return "#fff";
    }
    return "#334155";
  }

  const message =
    tab === "validate"
      ? (currentValidateStep?.message ?? "")
      : (curStep?.message ?? "");

  return (
    <div className="space-y-4">

      {/* ── Tabs ── */}
      <div className="flex flex-wrap gap-2">
        {(["insert", "search", "validate"] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => changeTab(t)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors",
              tab === t
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-accent text-muted-foreground",
            )}
          >
            {t}
          </button>
        ))}

        {/* sub-selection */}
        {tab === "insert" && (
          <div className="flex gap-1.5 ml-auto">
            {([1, 9] as const).map(v => (
              <button
                key={v}
                onClick={() => { setInsertV(v); setStep(0); }}
                className={cn(
                  "px-2.5 py-1 rounded text-xs font-mono font-semibold transition-colors",
                  insertV === v ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground hover:bg-accent",
                )}
              >
                Insert {v}
              </button>
            ))}
          </div>
        )}
        {tab === "search" && (
          <div className="flex gap-1.5 ml-auto">
            {([4, 9] as const).map(v => (
              <button
                key={v}
                onClick={() => { setSearchV(v); setStep(0); }}
                className={cn(
                  "px-2.5 py-1 rounded text-xs font-mono font-semibold transition-colors",
                  searchV === v ? "bg-violet-500 text-white" : "bg-muted text-muted-foreground hover:bg-accent",
                )}
              >
                Search {v}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── SVG ── */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <svg viewBox="0 0 500 375" className="w-full" style={{ maxHeight: 375 }}>

          {/* Edges */}
          {BST_EDGES.map(({ from, to }) => {
            const f = bstMap.get(from)!;
            const t = bstMap.get(to)!;
            const inPath = curStep?.path.includes(from) && curStep?.path.includes(to);
            return (
              <line
                key={`${from}-${to}`}
                x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                stroke={inPath ? "#6366f1" : "#cbd5e1"}
                strokeWidth={inPath ? 2.5 : 1.5}
              />
            );
          })}

          {/* Edge to inserted node */}
          {curStep?.insertPos && (() => {
            const parent = curStep.path[curStep.path.length - 1];
            const p = bstMap.get(parent)!;
            return (
              <line
                x1={p.x} y1={p.y}
                x2={curStep.insertPos!.x} y2={curStep.insertPos!.y}
                stroke="#10b981" strokeWidth={2} strokeDasharray="5 3"
              />
            );
          })()}

          {/* BST nodes */}
          {BST.map(n => {
            const c = nodeColor(n);
            return (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r={23} fill={c.fill} stroke={c.stroke} strokeWidth={2.5} />
                <text
                  x={n.x} y={n.y + 5}
                  textAnchor="middle"
                  fill={textColor(n)}
                  fontSize={14} fontWeight="700"
                >
                  {n.val}
                </text>
                {/* Validate: show min/max bounds under each node */}
                {tab === "validate" && validatedIds.has(n.id) && (() => {
                  const vs = VALIDATE_STEPS.find(s => s.nodeId === n.id)!;
                  return (
                    <text
                      x={n.x} y={n.y + 36}
                      textAnchor="middle"
                      fill="#10b981" fontSize={8} fontWeight="600"
                    >
                      ({vs.min}, {vs.max})
                    </text>
                  );
                })()}
              </g>
            );
          })}

          {/* Newly inserted node */}
          {curStep?.insertPos && (
            <g>
              <circle
                cx={curStep.insertPos.x} cy={curStep.insertPos.y} r={23}
                fill="#10b981" stroke="#059669" strokeWidth={2.5}
              />
              <text
                x={curStep.insertPos.x} y={curStep.insertPos.y + 5}
                textAnchor="middle" fill="#fff"
                fontSize={14} fontWeight="700"
              >
                {curStep.insertPos.val}
              </text>
              <text
                x={curStep.insertPos.x} y={curStep.insertPos.y + 37}
                textAnchor="middle"
                fill="#10b981" fontSize={9} fontWeight="600"
              >
                new leaf
              </text>
            </g>
          )}

          {/* Not found X */}
          {curStep?.outcome === "notfound" && (() => {
            const last = curStep.path[curStep.path.length - 1];
            const p    = bstMap.get(last)!;
            const cx   = searchV === 9 ? p.x + 55 : p.x - 55;
            return (
              <g>
                <circle cx={cx} cy={p.y + 90} r={22} fill="none" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 3" />
                <text x={cx} y={p.y + 95} textAnchor="middle" fill="#ef4444" fontSize={13} fontWeight="700">✕</text>
              </g>
            );
          })()}
        </svg>
      </div>

      {/* ── Message ── */}
      <div className="rounded-lg border bg-muted/40 px-3 py-2 text-xs min-h-[34px] flex items-center gap-2">
        {curStep?.outcome === "found"     && <span className="text-emerald-500 font-bold">✓</span>}
        {curStep?.outcome === "notfound"  && <span className="text-red-500 font-bold">✗</span>}
        {curStep?.outcome === "inserted"  && <span className="text-emerald-500 font-bold">+</span>}
        <span className="text-foreground">{message || "Use the buttons below to step through."}</span>
      </div>

      {/* ── Controls ── */}
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
          Step {step + 1} / {maxStep + 1}
        </span>
      </div>

      {/* ── Legend ── */}
      <div className="flex flex-wrap gap-4 text-xs">
        {tab !== "validate" && [
          { fill: "#f1f5f9", stroke: "#94a3b8", label: "Untouched" },
          { fill: "#f59e0b", stroke: "#d97706", label: "Comparing" },
          { fill: "#6366f1", stroke: "#4f46e5", label: "Path taken" },
          { fill: "#10b981", stroke: "#059669", label: "Result"    },
        ].map(({ fill, stroke, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full border-2 shrink-0" style={{ backgroundColor: fill, borderColor: stroke }} />
            <span className="text-muted-foreground">{label}</span>
          </div>
        ))}
        {tab === "validate" && [
          { fill: "#f1f5f9", stroke: "#94a3b8", label: "Not checked yet" },
          { fill: "#3b82f6", stroke: "#2563eb", label: "Checking now"    },
          { fill: "#10b981", stroke: "#059669", label: "Valid ✓"         },
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
