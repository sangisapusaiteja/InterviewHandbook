"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const directions = [
  {
    value: "row" as const,
    label: "row",
    mainAxis: "→ Horizontal (left to right)",
    crossAxis: "↓ Vertical (top to bottom)",
    desc: "Default. Items are placed left to right in LTR languages.",
    justify: "justify-content controls horizontal distribution",
    align: "align-items controls vertical alignment",
  },
  {
    value: "row-reverse" as const,
    label: "row-reverse",
    mainAxis: "← Horizontal (right to left)",
    crossAxis: "↓ Vertical (top to bottom)",
    desc: "Items are placed right to left. flex-start is on the right.",
    justify: "justify-content controls horizontal distribution (reversed)",
    align: "align-items controls vertical alignment",
  },
  {
    value: "column" as const,
    label: "column",
    mainAxis: "↓ Vertical (top to bottom)",
    crossAxis: "→ Horizontal (left to right)",
    desc: "Items are placed top to bottom. Main axis becomes vertical.",
    justify: "justify-content controls vertical distribution",
    align: "align-items controls horizontal alignment",
  },
  {
    value: "column-reverse" as const,
    label: "column-reverse",
    mainAxis: "↑ Vertical (bottom to top)",
    crossAxis: "→ Horizontal (left to right)",
    desc: "Items are placed bottom to top. flex-start is at the bottom.",
    justify: "justify-content controls vertical distribution (reversed)",
    align: "align-items controls horizontal alignment",
  },
];

type Direction = "row" | "row-reverse" | "column" | "column-reverse";

const codeExamples: Record<Direction, string> = {
  row: `.container {
  display: flex;
  flex-direction: row; /* default */
}

/* Main axis: horizontal →
   Cross axis: vertical ↓

   justify-content → horizontal
   align-items → vertical */`,
  "row-reverse": `.container {
  display: flex;
  flex-direction: row-reverse;
}

/* Items flow right to left.
   Main axis: horizontal ←
   flex-start is on the right!

   Useful for RTL layouts or
   reversing visual order */`,
  column: `.container {
  display: flex;
  flex-direction: column;
}

/* Main axis: vertical ↓
   Cross axis: horizontal →

   justify-content → vertical
   align-items → horizontal

   Like a vertical stack! */`,
  "column-reverse": `.container {
  display: flex;
  flex-direction: column-reverse;
}

/* Items flow bottom to top.
   Main axis: vertical ↑
   flex-start is at the bottom!

   Useful for chat UIs where
   newest messages appear last */`,
};

const items = [
  { label: "1", color: "bg-blue-500/20 border-blue-500/40" },
  { label: "2", color: "bg-purple-500/20 border-purple-500/40" },
  { label: "3", color: "bg-emerald-500/20 border-emerald-500/40" },
  { label: "4", color: "bg-orange-500/20 border-orange-500/40" },
];

export function FlexDirectionVisualization() {
  const [direction, setDirection] = useState<Direction>("row");

  const current = directions.find((d) => d.value === direction)!;

  const flexClass =
    direction === "row"
      ? "flex-row"
      : direction === "row-reverse"
      ? "flex-row-reverse"
      : direction === "column"
      ? "flex-col"
      : "flex-col-reverse";

  return (
    <div className="space-y-6">
      {/* Interactive direction demo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">flex-direction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The flex-direction property defines the main axis and the direction items are placed in the container.
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {directions.map((d) => (
              <button
                key={d.value}
                onClick={() => setDirection(d.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  direction === d.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <motion.div
            key={direction}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Visual */}
            <div className="rounded-xl border p-4 space-y-3">
              <p className="text-[10px] text-muted-foreground">{current.desc}</p>

              <div className="relative">
                {/* Container with items */}
                <div
                  className={`flex ${flexClass} gap-2 border-2 border-dashed border-blue-400 rounded-lg p-3 min-h-[160px]`}
                >
                  {items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className={`${item.color} border rounded-lg px-4 py-2 text-xs font-bold text-center`}
                    >
                      Item {item.label}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Axis info */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500 text-[8px]">Main</Badge>
                  <span className="text-[10px] text-muted-foreground">{current.mainAxis}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-orange-500 text-[8px]">Cross</Badge>
                  <span className="text-[10px] text-muted-foreground">{current.crossAxis}</span>
                </div>
              </div>
            </div>

            {/* Code */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {codeExamples[direction]}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* How direction affects justify and align */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Direction Changes Axis Meaning</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            When you change flex-direction, the meaning of justify-content and align-items swaps because the axes swap.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border p-4 space-y-3"
            >
              <Badge className="bg-blue-500 text-[10px]">flex-direction: row</Badge>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px]">
                  <code className="text-primary font-bold w-32">justify-content</code>
                  <span className="text-emerald-500">→ Horizontal</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <code className="text-primary font-bold w-32">align-items</code>
                  <span className="text-orange-500">↓ Vertical</span>
                </div>
              </div>
              <div className="flex justify-center items-center gap-2 border-2 border-dashed border-zinc-400 rounded-lg p-3 h-20">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-blue-500/20 border border-blue-500/40 rounded px-2 py-1 text-[9px] font-bold">
                    {n}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground">justify-content: center + align-items: center</p>
            </motion.div>

            {/* Column */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border p-4 space-y-3"
            >
              <Badge className="bg-purple-500 text-[10px]">flex-direction: column</Badge>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px]">
                  <code className="text-primary font-bold w-32">justify-content</code>
                  <span className="text-emerald-500">↓ Vertical</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <code className="text-primary font-bold w-32">align-items</code>
                  <span className="text-orange-500">→ Horizontal</span>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-zinc-400 rounded-lg p-3 h-20">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-purple-500/20 border border-purple-500/40 rounded px-2 py-0.5 text-[9px] font-bold">
                    {n}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground">justify-content: center + align-items: center</p>
            </motion.div>
          </div>

          <div className="rounded-xl border bg-muted/30 p-3">
            <p className="text-[10px] text-muted-foreground">
              <span className="font-bold text-primary">Interview tip:</span> justify-content always works on the main axis, and align-items always works on the cross axis. The direction just determines which physical axis is which.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* All four directions at a glance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Directions at a Glance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {directions.map((d, i) => (
              <motion.div
                key={d.value}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border p-3 space-y-2"
              >
                <code className="text-[10px] text-primary font-bold">{d.value}</code>
                <div
                  className={`flex ${
                    d.value === "row"
                      ? "flex-row"
                      : d.value === "row-reverse"
                      ? "flex-row-reverse"
                      : d.value === "column"
                      ? "flex-col"
                      : "flex-col-reverse"
                  } gap-1 border border-dashed border-zinc-400 rounded-lg p-2 min-h-[60px]`}
                >
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-primary/10 border border-primary/30 rounded px-2 py-0.5 text-[9px] font-bold text-center">
                      {n}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
