"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const problems = [
  {
    label: "Vertical Centering",
    before: "margin hacks, table-cell, transform tricks",
    after: "align-items: center",
    icon: "↕",
  },
  {
    label: "Equal-Height Columns",
    before: "JavaScript or faux columns with backgrounds",
    after: "Flex items stretch by default",
    icon: "▐▌",
  },
  {
    label: "Spacing & Distribution",
    before: "Calculated margins, float clearing",
    after: "justify-content: space-between",
    icon: "⟷",
  },
  {
    label: "Source Order Independence",
    before: "Markup order = visual order",
    after: "order property rearranges items",
    icon: "⇄",
  },
];

const terminology = [
  {
    term: "Flex Container",
    desc: "The parent element with display: flex. Controls the layout of its direct children.",
    color: "bg-blue-500",
  },
  {
    term: "Flex Items",
    desc: "The direct children of a flex container. Automatically become flex items.",
    color: "bg-purple-500",
  },
  {
    term: "Main Axis",
    desc: "The primary axis along which flex items are laid out. Default is horizontal (row).",
    color: "bg-emerald-500",
  },
  {
    term: "Cross Axis",
    desc: "The axis perpendicular to the main axis. Default is vertical (column).",
    color: "bg-orange-500",
  },
];

export function FlexboxIntroVisualization() {
  const [showComparison, setShowComparison] = useState<"before" | "after">("before");

  return (
    <div className="space-y-6">
      {/* What problems flexbox solves */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Problems Flexbox Solves</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Before flexbox, CSS layout relied on floats, positioning, and table hacks. Flexbox provides a clean, one-dimensional layout model.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {problems.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border p-3 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{p.icon}</span>
                  <span className="text-xs font-bold">{p.label}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-start gap-1.5">
                    <Badge className="bg-red-500/80 text-[8px] shrink-0">Before</Badge>
                    <span className="text-[10px] text-muted-foreground">{p.before}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Badge className="bg-emerald-500/80 text-[8px] shrink-0">After</Badge>
                    <span className="text-[10px] text-muted-foreground">{p.after}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Before vs After comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Before Flexbox vs With Flexbox</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            {(["before", "after"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setShowComparison(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  showComparison === mode
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {mode === "before" ? "Without Flexbox" : "With Flexbox"}
              </button>
            ))}
          </div>

          <motion.div
            key={showComparison}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Visual demo */}
            <div className="rounded-xl border p-4 space-y-3">
              <Badge className={showComparison === "before" ? "bg-red-500 text-[10px]" : "bg-emerald-500 text-[10px]"}>
                {showComparison === "before" ? "Float-based Layout" : "Flexbox Layout"}
              </Badge>
              {showComparison === "before" ? (
                <div className="space-y-2">
                  <div className="relative overflow-hidden">
                    <div className="bg-blue-500/20 border border-blue-500/40 rounded p-2 text-[10px] text-center float-left w-[30%]" style={{ height: 60 }}>
                      Sidebar
                    </div>
                    <div className="bg-purple-500/20 border border-purple-500/40 rounded p-2 text-[10px] text-center float-left w-[70%]" style={{ height: 80 }}>
                      Main Content (taller)
                    </div>
                    <div className="clear-both" />
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    Columns have different heights. Need clearfix hacks. Vertical centering is a nightmare.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <motion.div
                      initial={{ height: 60 }}
                      animate={{ height: 80 }}
                      className="bg-blue-500/20 border border-blue-500/40 rounded p-2 text-[10px] text-center w-[30%] flex items-center justify-center"
                    >
                      Sidebar
                    </motion.div>
                    <div className="bg-purple-500/20 border border-purple-500/40 rounded p-2 text-[10px] text-center w-[70%] flex items-center justify-center" style={{ height: 80 }}>
                      Main Content
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    Equal heights automatically. Centering is trivial. No float clearing needed.
                  </p>
                </div>
              )}
            </div>

            {/* Code */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {showComparison === "before"
                ? `/* Float-based layout */
.sidebar {
  float: left;
  width: 30%;
}
.main {
  float: left;
  width: 70%;
}
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
/* Equal heights? Good luck... */`
                : `/* Flexbox layout */
.container {
  display: flex;
  gap: 8px;
}
.sidebar {
  width: 30%;
}
.main {
  width: 70%;
}
/* Equal heights: automatic!
   Centering: align-items: center
   No clearfix needed */`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Flexbox Terminology */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Flexbox Terminology</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Visual axis diagram */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-xl border-2 border-dashed border-blue-400 p-6 w-full max-w-md"
            >
              <span className="absolute -top-3 left-3 bg-background px-2 text-[10px] text-blue-400 font-bold">
                Flex Container (display: flex)
              </span>

              {/* Main axis arrow */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2">
                <span className="text-[9px] text-emerald-500 font-bold">Main Axis →</span>
              </div>

              {/* Cross axis arrow */}
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90">
                <span className="text-[9px] text-orange-500 font-bold">Cross Axis →</span>
              </div>

              <div className="flex gap-3 justify-center pt-3">
                {[1, 2, 3].map((n) => (
                  <motion.div
                    key={n}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: n * 0.1 }}
                    className="bg-purple-500/20 border-2 border-purple-500/60 rounded-lg px-4 py-3 text-xs text-center font-semibold"
                  >
                    Item {n}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Terminology list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {terminology.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-3 flex items-start gap-3"
              >
                <span className={`w-2 h-2 rounded-full ${t.color} mt-1.5 shrink-0`} />
                <div>
                  <p className="text-xs font-bold">{t.term}</p>
                  <p className="text-[10px] text-muted-foreground">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Basic code example */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Getting Started with Flexbox</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Just add <code className="text-[11px] bg-muted px-1 rounded">display: flex</code> to a container. Its direct children become flex items immediately.
              </p>
              <div className="rounded-xl border p-4 space-y-2">
                <p className="text-[10px] font-bold text-muted-foreground">Result:</p>
                <div className="flex gap-2">
                  {["A", "B", "C"].map((letter, i) => (
                    <motion.div
                      key={letter}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-blue-500/20 border border-blue-500/40 rounded-lg px-4 py-2 text-xs font-bold text-center"
                    >
                      {letter}
                    </motion.div>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Items flow horizontally (row direction) by default and stretch to equal height.
                </p>
              </div>

              <div className="rounded-xl border p-3 space-y-2">
                <p className="text-[10px] font-bold">Key Defaults:</p>
                <div className="space-y-1">
                  {[
                    { prop: "flex-direction", val: "row", note: "items flow left-to-right" },
                    { prop: "flex-wrap", val: "nowrap", note: "items stay on one line" },
                    { prop: "justify-content", val: "flex-start", note: "items packed at start" },
                    { prop: "align-items", val: "stretch", note: "items stretch to fill height" },
                  ].map((d, i) => (
                    <div key={i} className="flex items-center gap-1 text-[10px]">
                      <code className="text-primary font-bold">{d.prop}:</code>
                      <code className="text-emerald-500">{d.val}</code>
                      <span className="text-muted-foreground">— {d.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`<!-- HTML -->
<div class="container">
  <div class="item">A</div>
  <div class="item">B</div>
  <div class="item">C</div>
</div>

/* CSS */
.container {
  display: flex;
  gap: 8px;
}

.item {
  padding: 8px 16px;
  background: rgba(59,130,246,0.2);
  border: 1px solid rgba(59,130,246,0.4);
  border-radius: 8px;
}

/* That's it! Items are now
   laid out horizontally with
   equal heights and spacing. */`}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
