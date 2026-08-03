"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

// ─── Tree layout ──────────────────────────────────────────────────────────────
//
//           3            (x=250, y=50)
//         /   \
//        5     1         (x=130, y=145), (x=370, y=145)
//       / \   / \
//      6   2 0   8       (x=65,y=240), (x=195,y=240), (x=310,y=240), (x=435,y=240)
//         / \
//        7   4           (x=148,y=335), (x=242,y=335)

interface LNode { id: number; val: number; x: number; y: number }

const NODES: LNode[] = [
  { id: 3, val: 3, x: 250, y: 50  },
  { id: 5, val: 5, x: 130, y: 145 },
  { id: 1, val: 1, x: 370, y: 145 },
  { id: 6, val: 6, x: 65,  y: 240 },
  { id: 2, val: 2, x: 195, y: 240 },
  { id: 0, val: 0, x: 310, y: 240 },
  { id: 8, val: 8, x: 435, y: 240 },
  { id: 7, val: 7, x: 148, y: 335 },
  { id: 4, val: 4, x: 242, y: 335 },
];

const EDGES: Array<{ from: number; to: number }> = [
  { from: 3, to: 5 }, { from: 3, to: 1 },
  { from: 5, to: 6 }, { from: 5, to: 2 },
  { from: 1, to: 0 }, { from: 1, to: 8 },
  { from: 2, to: 7 }, { from: 2, to: 4 },
];

const nodeMap = new Map(NODES.map(n => [n.id, n]));

// ─── Pre-computed LCA scenarios ───────────────────────────────────────────────

interface LCAStep {
  current:   number;        // node being processed
  returned:  number | null; // what this node returns (null = not resolved yet)
  leftRet:   number | null; // what left child returned
  rightRet:  number | null; // what right child returned
  message:   string;
}

interface LCAScenario {
  p:    number;
  q:    number;
  lca:  number;
  label: string;
  steps: LCAStep[];
}

// LCA(5, 1) = 3 — different sides of root
const SCENARIO_5_1: LCAScenario = {
  p: 5, q: 1, lca: 3,
  label: "LCA(5, 1) = 3",
  steps: [
    { current: 5,  returned: 5,    leftRet: null, rightRet: null, message: "Node 5 = p(5) → return node 5 immediately (no need to recurse deeper)." },
    { current: 1,  returned: 1,    leftRet: null, rightRet: null, message: "Node 1 = q(1) → return node 1 immediately." },
    { current: 3,  returned: 3,    leftRet: 5,    rightRet: 1,   message: "Node 3: left returned 5 (non-null), right returned 1 (non-null) → both sides found! Node 3 is the LCA." },
  ],
};

// LCA(5, 4) = 5 — 5 is ancestor of 4
const SCENARIO_5_4: LCAScenario = {
  p: 5, q: 4, lca: 5,
  label: "LCA(5, 4) = 5",
  steps: [
    { current: 5,  returned: 5,    leftRet: null, rightRet: null, message: "Node 5 = p(5) → return node 5 immediately. We stop here — 5 might be the LCA itself." },
    { current: 3,  returned: 5,    leftRet: 5,    rightRet: null, message: "Node 3 (root): left returned 5, right returned null (1's subtree has no p or q). Propagate 5 upward — it's the answer." },
  ],
};

// LCA(6, 4) = 5 — both under node 5
const SCENARIO_6_4: LCAScenario = {
  p: 6, q: 4, lca: 5,
  label: "LCA(6, 4) = 5",
  steps: [
    { current: 6,  returned: 6,    leftRet: null, rightRet: null, message: "Node 6 = p(6) → return node 6 immediately." },
    { current: 7,  returned: null, leftRet: null, rightRet: null, message: "Node 7: neither p nor q. Left=null, Right=null → return null." },
    { current: 4,  returned: 4,    leftRet: null, rightRet: null, message: "Node 4 = q(4) → return node 4 immediately." },
    { current: 2,  returned: 4,    leftRet: null, rightRet: 4,   message: "Node 2: left (7) returned null, right (4) returned 4. Propagate 4 upward." },
    { current: 5,  returned: 5,    leftRet: 6,    rightRet: 4,   message: "Node 5: left returned 6, right returned 4 — both non-null → Node 5 is the LCA! ✓" },
  ],
};

// LCA(7, 8) = 3 — opposite sides of the root
const SCENARIO_7_8: LCAScenario = {
  p: 7, q: 8, lca: 3,
  label: "LCA(7, 8) = 3",
  steps: [
    { current: 6,  returned: null, leftRet: null, rightRet: null, message: "Node 6 (leaf): not 7 or 8 → return null." },
    { current: 7,  returned: 7,    leftRet: null, rightRet: null, message: "Node 7 = p(7) → return node 7." },
    { current: 4,  returned: null, leftRet: null, rightRet: null, message: "Node 4 (leaf): not 7 or 8 → return null." },
    { current: 2,  returned: 7,    leftRet: 7,    rightRet: null, message: "Node 2: left returned 7, right returned null → propagate 7 upward." },
    { current: 5,  returned: 7,    leftRet: null, rightRet: 7,   message: "Node 5: left (6) returned null, right (2-subtree) returned 7 → propagate 7 upward." },
    { current: 8,  returned: 8,    leftRet: null, rightRet: null, message: "Node 8 = q(8) → return node 8." },
    { current: 1,  returned: 8,    leftRet: null, rightRet: 8,   message: "Node 1: left (0) returned null, right returned 8 → propagate 8 upward." },
    { current: 3,  returned: 3,    leftRet: 7,    rightRet: 8,   message: "Node 3 (root): left subtree returned 7, right subtree returned 8 — both non-null → Node 3 is the LCA! ✓" },
  ],
};

const SCENARIOS: LCAScenario[] = [SCENARIO_5_1, SCENARIO_5_4, SCENARIO_6_4, SCENARIO_7_8];

// ─── Component ───────────────────────────────────────────────────────────────

export function LowestCommonAncestorVisualization() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [step, setStep]               = useState(0);

  const scenario = SCENARIOS[scenarioIdx];
  const maxStep  = scenario.steps.length - 1;
  const curStep  = scenario.steps[step];

  function changeScenario(idx: number) {
    setScenarioIdx(idx);
    setStep(0);
  }
  function reset() { setStep(0); }

  // nodes that have been processed (returned something) up to current step
  const processedMap = new Map<number, number | null>();
  for (let i = 0; i <= step; i++) {
    processedMap.set(scenario.steps[i].current, scenario.steps[i].returned);
  }

  const lcaFound = step === maxStep;

  function nodeColor(n: LNode): { fill: string; stroke: string } {
    const isP   = n.val === scenario.p;
    const isQ   = n.val === scenario.q;
    const isLCA = lcaFound && n.val === scenario.lca;

    if (isLCA)                      return { fill: "#f59e0b", stroke: "#d97706" }; // LCA — gold
    if (n.id === curStep.current)   return { fill: "#6366f1", stroke: "#4f46e5" }; // processing — indigo
    if (processedMap.has(n.id)) {
      const ret = processedMap.get(n.id);
      if (ret !== null && ret !== undefined) return { fill: "#10b981", stroke: "#059669" }; // returned non-null — green
      return { fill: "#94a3b8", stroke: "#64748b" }; // returned null — gray
    }
    if (isP || isQ)                 return { fill: "#ec4899", stroke: "#db2777" }; // target nodes — pink
    return { fill: "#f1f5f9", stroke: "#94a3b8" };
  }

  function textColor(n: LNode): string {
    if (n.id === curStep.current)   return "#fff";
    if (processedMap.has(n.id))     return "#fff";
    if (n.val === scenario.p || n.val === scenario.q) return "#fff";
    return "#334155";
  }

  return (
    <div className="space-y-4">

      {/* ── Scenario selector ── */}
      <div className="flex flex-wrap gap-2">
        {SCENARIOS.map((s, i) => (
          <button
            key={i}
            onClick={() => changeScenario(i)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-colors",
              scenarioIdx === i
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-accent text-muted-foreground",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ── p and q labels ── */}
      <div className="flex gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-pink-500 shrink-0" />
          <span className="text-muted-foreground">p = <span className="font-bold text-foreground">{scenario.p}</span></span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-pink-500 shrink-0" />
          <span className="text-muted-foreground">q = <span className="font-bold text-foreground">{scenario.q}</span></span>
        </div>
        {lcaFound && (
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="h-3 w-3 rounded-full bg-amber-400 shrink-0" />
            <span className="font-semibold text-amber-600 dark:text-amber-400">LCA = {scenario.lca}</span>
          </div>
        )}
      </div>

      {/* ── SVG ── */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <svg viewBox="0 0 500 385" className="w-full" style={{ maxHeight: 385 }}>

          {/* Edges */}
          {EDGES.map(({ from, to }) => {
            const f = nodeMap.get(from)!;
            const t = nodeMap.get(to)!;
            return (
              <line
                key={`${from}-${to}`}
                x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                stroke="#cbd5e1" strokeWidth={1.5}
              />
            );
          })}

          {/* Nodes */}
          {NODES.map(n => {
            const c = nodeColor(n);
            const ret = processedMap.get(n.id);
            return (
              <g key={n.id}>
                {/* LCA glow ring */}
                {lcaFound && n.val === scenario.lca && (
                  <circle cx={n.x} cy={n.y} r={30} fill="none" stroke="#f59e0b" strokeWidth={2.5} strokeDasharray="5 3" />
                )}
                <circle cx={n.x} cy={n.y} r={22} fill={c.fill} stroke={c.stroke} strokeWidth={2.5} />
                <text
                  x={n.x} y={n.y + 5}
                  textAnchor="middle"
                  fill={textColor(n)}
                  fontSize={13} fontWeight="700"
                >
                  {n.val}
                </text>
                {/* Show return value badge */}
                {processedMap.has(n.id) && (
                  <text
                    x={n.x + 26} y={n.y - 10}
                    fill={ret !== null && ret !== undefined ? "#10b981" : "#94a3b8"}
                    fontSize={9} fontWeight="700"
                  >
                    ↑{ret !== null && ret !== undefined ? ret : "null"}
                  </text>
                )}
                {/* p/q label */}
                {(n.val === scenario.p || n.val === scenario.q) && !processedMap.has(n.id) && (
                  <text
                    x={n.x} y={n.y + 35}
                    textAnchor="middle"
                    fill="#ec4899" fontSize={9} fontWeight="700"
                  >
                    {n.val === scenario.p ? "p" : "q"}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Step message ── */}
      <div className="rounded-lg border bg-muted/40 px-3 py-2.5 text-xs min-h-[40px] flex items-start gap-2">
        <span className="mt-0.5 text-indigo-500 font-bold shrink-0">→</span>
        <span>{curStep.message}</span>
      </div>

      {/* ── Left/right return info ── */}
      {(curStep.leftRet !== null || curStep.rightRet !== null) && (
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg border bg-background p-2 text-center">
            <div className="text-muted-foreground mb-1">Left returned</div>
            <div className={cn("font-bold text-sm", curStep.leftRet !== null ? "text-emerald-500" : "text-muted-foreground")}>
              {curStep.leftRet ?? "null"}
            </div>
          </div>
          <div className="rounded-lg border bg-background p-2 text-center">
            <div className="text-muted-foreground mb-1">Right returned</div>
            <div className={cn("font-bold text-sm", curStep.rightRet !== null ? "text-emerald-500" : "text-muted-foreground")}>
              {curStep.rightRet ?? "null"}
            </div>
          </div>
        </div>
      )}

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
        {[
          { fill: "#ec4899", stroke: "#db2777", label: "Target (p or q)"  },
          { fill: "#6366f1", stroke: "#4f46e5", label: "Processing now"   },
          { fill: "#10b981", stroke: "#059669", label: "Returned non-null" },
          { fill: "#94a3b8", stroke: "#64748b", label: "Returned null"     },
          { fill: "#f59e0b", stroke: "#d97706", label: "LCA found!"        },
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
