"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type PositionType = "static" | "relative" | "absolute" | "fixed" | "sticky";

const positionData: {
  id: PositionType;
  label: string;
  description: string;
  inFlow: boolean;
  offsetWorks: boolean;
  context: string;
  color: string;
}[] = [
  {
    id: "static",
    label: "static",
    description: "Default. Element follows normal document flow. top/right/bottom/left have no effect.",
    inFlow: true,
    offsetWorks: false,
    context: "N/A",
    color: "bg-zinc-500",
  },
  {
    id: "relative",
    label: "relative",
    description: "Stays in normal flow but can be offset from its original position. Creates a positioning context for absolute children.",
    inFlow: true,
    offsetWorks: true,
    context: "Its own original position",
    color: "bg-blue-500",
  },
  {
    id: "absolute",
    label: "absolute",
    description: "Removed from normal flow. Positioned relative to the nearest positioned ancestor (not static).",
    inFlow: false,
    offsetWorks: true,
    context: "Nearest positioned ancestor",
    color: "bg-orange-500",
  },
  {
    id: "fixed",
    label: "fixed",
    description: "Removed from normal flow. Positioned relative to the viewport. Stays in place during scrolling.",
    inFlow: false,
    offsetWorks: true,
    context: "Viewport (browser window)",
    color: "bg-red-500",
  },
  {
    id: "sticky",
    label: "sticky",
    description: "Hybrid of relative and fixed. Acts relative until a scroll threshold, then becomes fixed within its container.",
    inFlow: true,
    offsetWorks: true,
    context: "Scroll container + offset threshold",
    color: "bg-purple-500",
  },
];

const codeExamples: Record<PositionType, string> = {
  static: `/* static — the default */
.box {
  position: static;
  top: 20px;    /* has NO effect */
  left: 30px;   /* has NO effect */
}

/* Every element is position: static
   by default. It follows the normal
   document flow. Offsets are ignored. */`,
  relative: `/* relative — offset from self */
.box {
  position: relative;
  top: 20px;    /* moves DOWN 20px */
  left: 30px;   /* moves RIGHT 30px */
}

/* The original space is preserved.
   Other elements don't move.
   Creates positioning context
   for absolute children. */`,
  absolute: `/* absolute — positioned to ancestor */
.parent {
  position: relative; /* context! */
}

.child {
  position: absolute;
  top: 0;
  right: 0;
}
/* Removed from flow. Positioned
   relative to .parent (the nearest
   positioned ancestor). */`,
  fixed: `/* fixed — relative to viewport */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

/* Stays in place during scrolling.
   Removed from normal document flow.
   Positioned relative to the viewport.
   Add z-index to stay on top. */`,
  sticky: `/* sticky — hybrid behavior */
.table-header {
  position: sticky;
  top: 0;           /* threshold */
  background: white;
  z-index: 10;
}

/* Acts as relative until the user
   scrolls past the top: 0 threshold,
   then "sticks" like fixed within
   its scrolling container.
   Requires a threshold (top/bottom). */`,
};

export function PositionPropertyVisualization() {
  const [activePosition, setActivePosition] = useState<PositionType>("static");
  const current = positionData.find((p) => p.id === activePosition)!;

  return (
    <div className="space-y-6">
      {/* Position type selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">CSS Position Property</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The <code className="text-primary font-mono text-xs">position</code> property determines how an element is placed in the document and which offset properties (<code className="text-primary font-mono text-xs">top</code>, <code className="text-primary font-mono text-xs">right</code>, <code className="text-primary font-mono text-xs">bottom</code>, <code className="text-primary font-mono text-xs">left</code>) take effect.
          </p>

          <div className="flex flex-wrap gap-2">
            {positionData.map((pos) => (
              <button
                key={pos.id}
                onClick={() => setActivePosition(pos.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activePosition === pos.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {pos.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activePosition}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Visual demo */}
            <div className="rounded-xl border p-4 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={`${current.color} text-[10px]`}>position: {activePosition}</Badge>
                <Badge variant="outline" className={`text-[10px] ${current.inFlow ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" : "border-red-500 text-red-600 dark:text-red-400"}`}>
                  {current.inFlow ? "In flow" : "Out of flow"}
                </Badge>
                <Badge variant="outline" className={`text-[10px] ${current.offsetWorks ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" : "border-red-500 text-red-600 dark:text-red-400"}`}>
                  {current.offsetWorks ? "Offsets work" : "Offsets ignored"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{current.description}</p>

              {/* Visual diagram */}
              <div className="bg-muted/30 rounded-lg p-4 relative min-h-[160px] overflow-hidden">
                {activePosition === "static" && (
                  <div className="space-y-2">
                    <div className="bg-zinc-500/20 border border-zinc-500 p-2 rounded text-[10px] font-mono text-zinc-600 dark:text-zinc-400">Element A</div>
                    <div className="bg-zinc-400/20 border-2 border-zinc-400 p-2 rounded text-[10px] font-mono text-zinc-600 dark:text-zinc-400">Target (static, top:20px ignored)</div>
                    <div className="bg-zinc-500/20 border border-zinc-500 p-2 rounded text-[10px] font-mono text-zinc-600 dark:text-zinc-400">Element C</div>
                  </div>
                )}
                {activePosition === "relative" && (
                  <div className="space-y-2">
                    <div className="bg-zinc-500/20 border border-zinc-500 p-2 rounded text-[10px] font-mono text-zinc-600 dark:text-zinc-400">Element A</div>
                    <div className="relative">
                      <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 p-2 rounded text-[10px] font-mono text-blue-300 dark:text-blue-700 opacity-50">Original spot</div>
                      <div className="absolute top-3 left-6 bg-blue-500/20 border-2 border-blue-500 p-2 rounded text-[10px] font-mono text-blue-600 dark:text-blue-400">Moved (top: 12px, left: 24px)</div>
                    </div>
                    <div className="bg-zinc-500/20 border border-zinc-500 p-2 rounded text-[10px] font-mono text-zinc-600 dark:text-zinc-400 mt-4">Element C (unaffected)</div>
                  </div>
                )}
                {activePosition === "absolute" && (
                  <div className="relative">
                    <div className="border-2 border-dashed border-zinc-400 dark:border-zinc-600 rounded-lg p-3 min-h-[120px]">
                      <span className="text-[9px] text-muted-foreground">position: relative (parent)</span>
                      <div className="mt-2 space-y-2">
                        <div className="bg-zinc-500/20 border border-zinc-500 p-2 rounded text-[10px] font-mono text-zinc-600 dark:text-zinc-400">Sibling A</div>
                        <div className="bg-zinc-500/20 border border-zinc-500 p-2 rounded text-[10px] font-mono text-zinc-600 dark:text-zinc-400">Sibling B (no gap, absolute is out of flow)</div>
                      </div>
                      <div className="absolute top-2 right-2 bg-orange-500/20 border-2 border-orange-500 p-2 rounded text-[10px] font-mono text-orange-600 dark:text-orange-400">Absolute (top:0, right:0)</div>
                    </div>
                  </div>
                )}
                {activePosition === "fixed" && (
                  <div className="space-y-2">
                    <div className="bg-red-500/20 border-2 border-red-500 p-2 rounded text-[10px] font-mono text-red-600 dark:text-red-400 text-center">Fixed navbar (top: 0, viewport-relative)</div>
                    <div className="bg-zinc-500/10 rounded-lg p-2 space-y-1 opacity-60">
                      <div className="bg-zinc-500/20 p-1 rounded text-[9px] text-muted-foreground text-center">Page content scrolls underneath</div>
                      <div className="bg-zinc-500/20 p-1 rounded text-[9px] text-muted-foreground text-center">More content...</div>
                      <div className="bg-zinc-500/20 p-1 rounded text-[9px] text-muted-foreground text-center">Even more content...</div>
                    </div>
                  </div>
                )}
                {activePosition === "sticky" && (
                  <div className="space-y-1 max-h-[140px] overflow-y-auto rounded-lg border">
                    <div className="bg-zinc-500/10 p-2 text-[9px] text-muted-foreground">Content above...</div>
                    <div className="sticky top-0 bg-purple-500/20 border-y border-purple-500 p-2 text-[10px] font-mono text-purple-600 dark:text-purple-400 z-10">Sticky header (top: 0)</div>
                    <div className="p-2 space-y-1">
                      {Array.from({ length: 6 }, (_, i) => (
                        <div key={i} className="bg-zinc-500/10 p-1.5 rounded text-[9px] text-muted-foreground">Row {i + 1} - scroll to see sticky behavior</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-lg bg-muted/50 p-2">
                <p className="text-[10px] text-muted-foreground"><strong>Positioning context:</strong> {current.context}</p>
              </div>
            </div>

            {/* Code example */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {codeExamples[activePosition]}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Quick reference table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Position Values Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Position</th>
                  <th className="text-left p-2">In Flow?</th>
                  <th className="text-left p-2">Offsets?</th>
                  <th className="text-left p-2">Relative To</th>
                  <th className="text-left p-2">Creates Context?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { pos: "static", flow: "Yes", offsets: "No", rel: "N/A", context: "No" },
                  { pos: "relative", flow: "Yes", offsets: "Yes", rel: "Own original position", context: "Yes" },
                  { pos: "absolute", flow: "No", offsets: "Yes", rel: "Nearest positioned ancestor", context: "Yes" },
                  { pos: "fixed", flow: "No", offsets: "Yes", rel: "Viewport", context: "Yes" },
                  { pos: "sticky", flow: "Yes*", offsets: "Yes", rel: "Scroll container + threshold", context: "Yes" },
                ].map((row) => (
                  <tr key={row.pos} className="border-b last:border-0">
                    <td className="p-2 font-mono font-bold text-primary">{row.pos}</td>
                    <td className="p-2">{row.flow}</td>
                    <td className="p-2">{row.offsets}</td>
                    <td className="p-2 text-muted-foreground">{row.rel}</td>
                    <td className="p-2">{row.context}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[9px] text-muted-foreground mt-2">* Sticky is in flow until the scroll threshold is reached, then behaves like fixed within its container.</p>
        </CardContent>
      </Card>

      {/* Positioning context explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Understanding Positioning Context</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-orange-500 text-[10px]">How absolute finds its parent</Badge>
              <div className="space-y-1.5">
                {[
                  { step: "1", label: "Look at direct parent", desc: "Is it positioned (not static)?" },
                  { step: "2", label: "Walk up the DOM tree", desc: "Check each ancestor for position != static" },
                  { step: "3", label: "Found positioned ancestor?", desc: "Use it as the reference point" },
                  { step: "4", label: "No positioned ancestor?", desc: "Falls back to the <html> element (viewport)" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">{item.step}</span>
                    <div>
                      <p className="text-[11px] font-bold">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Common pattern: relative parent
   + absolute child */

.card {
  position: relative; /* context */
}

.card .badge {
  position: absolute;
  top: -8px;
  right: -8px;
}

/* Without position: relative on .card,
   the badge would be positioned relative
   to the viewport or <html> — a common
   bug in interviews! */`}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interview scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                q: "What is the difference between relative and absolute positioning?",
                code: `/* relative: offset from itself, stays in flow */\n.box { position: relative; top: 10px; }\n\n/* absolute: offset from positioned parent, out of flow */\n.badge { position: absolute; top: 0; right: 0; }`,
                answer: "Relative moves the element from its original position but preserves its space in the flow. Absolute removes it from the flow and positions it relative to the nearest positioned ancestor.",
              },
              {
                q: "Why would you use position: relative without any offset?",
                code: `.parent {\n  position: relative;\n  /* no top/left/right/bottom */\n}\n.child {\n  position: absolute;\n  top: 0; right: 0;\n}`,
                answer: "To create a positioning context for absolute children. This is the most common use of position: relative — the element stays exactly where it is, but becomes the reference point for absolute descendants.",
              },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl border p-4 space-y-2">
                <p className="text-xs font-bold text-primary">{item.q}</p>
                <div className="rounded-lg bg-zinc-950 p-2 font-mono text-[10px] text-emerald-400 whitespace-pre overflow-x-auto">{item.code}</div>
                <p className="text-[10px] text-muted-foreground"><strong>Answer:</strong> {item.answer}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
