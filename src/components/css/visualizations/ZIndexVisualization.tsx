"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ViewTab = "stacking" | "context" | "values" | "rules";

export function ZIndexVisualization() {
  const [activeTab, setActiveTab] = useState<ViewTab>("stacking");

  return (
    <div className="space-y-6">
      {/* Main interactive card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Z-Index and Stacking Context</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The <code className="text-primary font-mono text-xs">z-index</code> property controls the stacking order of positioned elements. Higher values appear on top.
          </p>

          <div className="flex flex-wrap gap-2">
            {([
              { id: "stacking" as const, label: "Stacking Order" },
              { id: "context" as const, label: "Stacking Context" },
              { id: "values" as const, label: "Common Values" },
              { id: "rules" as const, label: "Rules" },
            ]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {activeTab === "stacking" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Visual stacking demo */}
                <div className="rounded-xl border p-4 space-y-3">
                  <Badge className="bg-blue-500 text-[10px]">Visual Stacking</Badge>
                  <p className="text-xs text-muted-foreground">Elements with higher z-index values appear on top of elements with lower values.</p>

                  <div className="bg-muted/30 rounded-lg p-6 relative h-[200px]">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0 }}
                      className="absolute top-4 left-4 w-32 h-20 bg-red-500/30 border-2 border-red-500 rounded-lg flex items-center justify-center"
                      style={{ zIndex: 1 }}
                    >
                      <div className="text-center">
                        <p className="text-[10px] font-mono font-bold text-red-600 dark:text-red-400">z-index: 1</p>
                        <p className="text-[9px] text-muted-foreground">Bottom</p>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="absolute top-10 left-12 w-32 h-20 bg-yellow-500/30 border-2 border-yellow-500 rounded-lg flex items-center justify-center"
                      style={{ zIndex: 2 }}
                    >
                      <div className="text-center">
                        <p className="text-[10px] font-mono font-bold text-yellow-600 dark:text-yellow-400">z-index: 2</p>
                        <p className="text-[9px] text-muted-foreground">Middle</p>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-16 left-20 w-32 h-20 bg-emerald-500/30 border-2 border-emerald-500 rounded-lg flex items-center justify-center"
                      style={{ zIndex: 3 }}
                    >
                      <div className="text-center">
                        <p className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">z-index: 3</p>
                        <p className="text-[9px] text-muted-foreground">Top</p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-2">
                    <p className="text-[10px] text-muted-foreground"><strong>Key rule:</strong> z-index only works on positioned elements (relative, absolute, fixed, sticky) — not static.</p>
                  </div>
                </div>

                {/* Code example */}
                <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* z-index requires positioning */
.box-static {
  z-index: 999;
  /* Has NO effect! Element is static. */
}

.box-positioned {
  position: relative;  /* or absolute/fixed */
  z-index: 999;
  /* Works! Element stacks on top. */
}

/* Default stacking (no z-index):
   Later elements in DOM appear on top
   of earlier elements when overlapping */

/* Negative z-index */
.behind {
  position: relative;
  z-index: -1;
  /* Goes BEHIND its parent's background
     but still above the parent's
     stacking context parent */
}`}
                </div>
              </div>
            )}

            {activeTab === "context" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border p-4 space-y-3">
                  <Badge className="bg-orange-500 text-[10px]">Stacking Context</Badge>
                  <p className="text-xs text-muted-foreground">A stacking context is an isolated layer. Children of different stacking contexts cannot interleave.</p>

                  <div className="bg-muted/30 rounded-lg p-4 relative h-[200px]">
                    {/* Context A */}
                    <div className="absolute top-2 left-2 w-[45%] border-2 border-blue-500 rounded-lg p-2 bg-blue-500/10" style={{ zIndex: 1 }}>
                      <p className="text-[9px] font-mono font-bold text-blue-500">Context A (z-index: 1)</p>
                      <div className="relative mt-1">
                        <div className="bg-blue-400/30 border border-blue-400 rounded p-1 text-[8px] font-mono text-blue-600 dark:text-blue-400" style={{ zIndex: 999 }}>
                          Child (z-index: 999)
                        </div>
                      </div>
                    </div>
                    {/* Context B */}
                    <div className="absolute top-8 left-[30%] w-[45%] border-2 border-orange-500 rounded-lg p-2 bg-orange-500/10" style={{ zIndex: 2 }}>
                      <p className="text-[9px] font-mono font-bold text-orange-500">Context B (z-index: 2)</p>
                      <div className="relative mt-1">
                        <div className="bg-orange-400/30 border border-orange-400 rounded p-1 text-[8px] font-mono text-orange-600 dark:text-orange-400" style={{ zIndex: 1 }}>
                          Child (z-index: 1)
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 text-center">
                      <p className="text-[9px] text-muted-foreground">Context B (z:2) is on top of Context A (z:1)</p>
                      <p className="text-[9px] text-red-500 font-bold">Child z:999 in A cannot beat parent B&apos;s z:2!</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl border p-4 space-y-2">
                    <Badge className="bg-purple-500 text-[10px]">What Creates a Stacking Context?</Badge>
                    <div className="space-y-1.5">
                      {[
                        { prop: "position + z-index", desc: "Any positioned element with z-index != auto" },
                        { prop: "opacity < 1", desc: "opacity: 0.99 creates a new context" },
                        { prop: "transform", desc: "Any transform (even transform: translateZ(0))" },
                        { prop: "filter", desc: "filter: blur(0) or any filter value" },
                        { prop: "will-change", desc: "will-change: transform, opacity, etc." },
                        { prop: "isolation: isolate", desc: "Explicitly creates a stacking context" },
                        { prop: "mix-blend-mode", desc: "Any value other than normal" },
                        { prop: "contain: layout/paint", desc: "CSS containment properties" },
                      ].map((item, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="flex items-start gap-2">
                          <code className="text-[9px] font-mono text-primary font-bold shrink-0 w-28">{item.prop}</code>
                          <p className="text-[9px] text-muted-foreground">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Stacking context trap */
.parent-a { position: relative; z-index: 1; }
.parent-b { position: relative; z-index: 2; }

.parent-a .child {
  position: absolute;
  z-index: 99999;
  /* STILL behind .parent-b!
     z-index only competes within
     the same stacking context. */
}`}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "values" && (
              <div className="space-y-4">
                <div className="rounded-xl border p-4">
                  <p className="text-xs font-bold text-primary mb-3">Common Z-Index Scale</p>
                  <p className="text-[10px] text-muted-foreground mb-3">Use a consistent scale to avoid z-index wars. Here is a widely used convention:</p>
                  <div className="space-y-2">
                    {[
                      { value: "-1", label: "Behind", use: "Background decorations", color: "bg-zinc-500" },
                      { value: "0", label: "Base", use: "Default / auto", color: "bg-zinc-400" },
                      { value: "1-9", label: "Low", use: "Hover effects, subtle overlaps", color: "bg-blue-400" },
                      { value: "10-99", label: "Medium", use: "Sticky headers, floating elements", color: "bg-emerald-500" },
                      { value: "100-999", label: "High", use: "Dropdowns, popovers, tooltips", color: "bg-yellow-500" },
                      { value: "1000-9999", label: "Overlay", use: "Modals, sidebars, drawers", color: "bg-orange-500" },
                      { value: "10000+", label: "Maximum", use: "Toasts, notifications, debug tools", color: "bg-red-500" },
                    ].map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-3 rounded-lg border p-2.5">
                        <div className={`${item.color} text-white rounded px-2 py-1 text-[10px] font-mono font-bold min-w-[70px] text-center`}>{item.value}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold">{item.label}</p>
                          <p className="text-[10px] text-muted-foreground">{item.use}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* CSS Custom Properties for z-index */
:root {
  --z-behind:      -1;
  --z-base:         0;
  --z-hover:        1;
  --z-sticky:      10;
  --z-dropdown:   100;
  --z-overlay:   1000;
  --z-modal:     9000;
  --z-toast:    10000;
}

.dropdown { z-index: var(--z-dropdown); }
.modal    { z-index: var(--z-modal); }
.toast    { z-index: var(--z-toast); }

/* This prevents z-index: 99999 chaos
   and makes the scale manageable. */`}
                </div>
              </div>
            )}

            {activeTab === "rules" && (
              <div className="space-y-4">
                <div className="rounded-xl border p-4 space-y-3">
                  <Badge className="bg-blue-500 text-[10px]">Default Stacking Order (no z-index)</Badge>
                  <p className="text-xs text-muted-foreground">When no z-index is set, elements stack in this order from bottom to top:</p>
                  <div className="space-y-1.5">
                    {[
                      { step: "1", label: "Root element background and borders", color: "bg-zinc-500" },
                      { step: "2", label: "Non-positioned block elements (in DOM order)", color: "bg-zinc-400" },
                      { step: "3", label: "Non-positioned floating elements", color: "bg-blue-400" },
                      { step: "4", label: "Non-positioned inline elements", color: "bg-emerald-400" },
                      { step: "5", label: "Positioned elements (in DOM order)", color: "bg-orange-500" },
                    ].map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-2">
                        <span className={`w-5 h-5 ${item.color} text-white rounded flex items-center justify-center text-[9px] font-bold shrink-0`}>{item.step}</span>
                        <p className="text-[10px]">{item.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border p-4 space-y-2">
                    <Badge className="bg-emerald-500 text-[10px]">Best Practices</Badge>
                    <div className="space-y-1.5 text-xs">
                      {[
                        "Use a z-index scale with CSS variables",
                        "Avoid arbitrary large values (z-index: 99999)",
                        "Use isolation: isolate to contain z-index scope",
                        "Document your z-index layers in a design system",
                        "Prefer stacking contexts over high z-index values",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-emerald-500 shrink-0 mt-0.5">+</span>
                          <span className="text-[10px]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border p-4 space-y-2">
                    <Badge className="bg-red-500 text-[10px]">Common Mistakes</Badge>
                    <div className="space-y-1.5 text-xs">
                      {[
                        "Using z-index on static elements (no effect)",
                        "Escalating z-index values (999 -> 9999 -> 99999)",
                        "Not understanding stacking contexts",
                        "Forgetting that opacity/transform create contexts",
                        "Using z-index to fix layout issues instead of proper structure",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-red-500 shrink-0 mt-0.5">-</span>
                          <span className="text-[10px]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>

      {/* Interview questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                q: "Why does z-index: 9999 not work?",
                code: `/* Common trap: */\n.element {\n  z-index: 9999;  /* no effect if... */\n}\n\n/* Reason 1: element is position: static */\n/* Fix: add position: relative */\n\n/* Reason 2: parent creates a stacking\n   context with a lower z-index */\n.parent { position: relative; z-index: 1; }\n.element { z-index: 9999; /* trapped! */ }`,
                answer: "Two common reasons: (1) The element is not positioned (z-index only works on positioned elements). (2) An ancestor creates a stacking context with a lower z-index, and z-index values only compete within the same context.",
              },
              {
                q: "What is a stacking context?",
                answer: "A stacking context is an isolated 3D layer in the rendering. Elements within a stacking context are stacked independently of elements outside it. It is created by certain CSS properties: position + z-index, opacity < 1, transform, filter, isolation: isolate, and others.",
              },
              {
                q: "How would you debug a z-index issue?",
                answer: "1) Check if the element is positioned (not static). 2) Walk up the DOM to find if any ancestor creates a stacking context (look for opacity, transform, filter, z-index). 3) Compare the z-index of the stacking contexts, not the individual elements. 4) Use browser DevTools to visualize stacking layers.",
              },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl border p-4 space-y-2">
                <p className="text-xs font-bold text-primary">{item.q}</p>
                {"code" in item && (
                  <div className="rounded-lg bg-zinc-950 p-2 font-mono text-[10px] text-emerald-400 whitespace-pre overflow-x-auto">{item.code}</div>
                )}
                <p className="text-[10px] text-muted-foreground"><strong>Answer:</strong> {item.answer}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
