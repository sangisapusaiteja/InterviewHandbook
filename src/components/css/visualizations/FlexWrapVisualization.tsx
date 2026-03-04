"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type WrapValue = "nowrap" | "wrap" | "wrap-reverse";

const wrapValues: {
  value: WrapValue;
  label: string;
  desc: string;
}[] = [
  {
    value: "nowrap",
    label: "nowrap",
    desc: "Default. All items are forced onto a single line. Items may shrink or overflow the container.",
  },
  {
    value: "wrap",
    label: "wrap",
    desc: "Items wrap to the next line when they cannot fit. New lines are added below (in row direction).",
  },
  {
    value: "wrap-reverse",
    label: "wrap-reverse",
    desc: "Items wrap in reverse. New lines are added above (in row direction). The cross axis is flipped.",
  },
];

const tailwindWrapMap: Record<WrapValue, string> = {
  nowrap: "flex-nowrap",
  wrap: "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse",
};

const codeExamples: Record<WrapValue, string> = {
  nowrap: `.container {
  display: flex;
  flex-wrap: nowrap; /* default */
  width: 300px;
}

/* All items on ONE line.
   If they don't fit, they:
   1. Shrink (if flex-shrink > 0)
   2. Overflow the container

   Items will NEVER wrap.
   This is the default behavior. */`,
  wrap: `.container {
  display: flex;
  flex-wrap: wrap;
  width: 300px;
}

/* Items wrap to new lines.

   [1] [2] [3] [4]
   [5] [6] [7]

   Each line is independent.
   align-content controls
   space between lines.

   Most common for responsive
   card grids and tag lists. */`,
  "wrap-reverse": `.container {
  display: flex;
  flex-wrap: wrap-reverse;
  width: 300px;
}

/* Items wrap upward!

   [5] [6] [7]
   [1] [2] [3] [4]

   Cross axis is reversed.
   New lines appear above.

   Rarely used but useful for
   bottom-up layouts. */`,
};

const flexFlowExamples = [
  { dir: "row", wrap: "wrap", shorthand: "row wrap", desc: "Horizontal wrapping (most common)" },
  { dir: "column", wrap: "wrap", shorthand: "column wrap", desc: "Vertical columns that wrap right" },
  { dir: "row", wrap: "nowrap", shorthand: "row nowrap", desc: "Horizontal single line (default)" },
  { dir: "row-reverse", wrap: "wrap", shorthand: "row-reverse wrap", desc: "Right-to-left with wrapping" },
];

export function FlexWrapVisualization() {
  const [wrapVal, setWrapVal] = useState<WrapValue>("nowrap");
  const [itemCount, setItemCount] = useState(8);

  const current = wrapValues.find((w) => w.value === wrapVal)!;

  return (
    <div className="space-y-6">
      {/* Interactive wrap demo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">flex-wrap</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Controls whether flex items are forced onto a single line or can wrap to multiple lines.
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {wrapValues.map((w) => (
              <button
                key={w.value}
                onClick={() => setWrapVal(w.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  wrapVal === w.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>

          {/* Item count control */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Items:</span>
            <div className="flex gap-1">
              {[4, 6, 8, 12].map((count) => (
                <button
                  key={count}
                  onClick={() => setItemCount(count)}
                  className={`px-2 py-1 rounded text-[10px] font-semibold transition-all ${
                    itemCount === count
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={`${wrapVal}-${itemCount}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Visual */}
            <div className="rounded-xl border p-4 space-y-3">
              <p className="text-[10px] text-muted-foreground">{current.desc}</p>

              <div
                className={`flex ${tailwindWrapMap[wrapVal]} gap-2 border-2 border-dashed border-blue-400 rounded-lg p-3 ${
                  wrapVal === "nowrap" ? "overflow-x-auto" : "min-h-[100px]"
                }`}
              >
                {Array.from({ length: itemCount }, (_, i) => i + 1).map((n) => (
                  <motion.div
                    key={n}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: n * 0.03 }}
                    className="bg-blue-500/20 border border-blue-500/40 rounded-lg px-4 py-2 text-[10px] font-bold shrink-0 min-w-[48px] text-center"
                  >
                    {n}
                  </motion.div>
                ))}
              </div>

              {wrapVal === "nowrap" && itemCount > 6 && (
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-2">
                  <p className="text-[10px] text-orange-500">
                    Items overflow! Without wrap, items shrink or spill out of the container.
                  </p>
                </div>
              )}
            </div>

            {/* Code */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {codeExamples[wrapVal]}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* What happens when items overflow */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Overflow Behavior Without Wrap</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            When flex-wrap is nowrap (default), items that exceed the container width will first try to shrink, then overflow.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border p-4 space-y-3"
            >
              <Badge className="bg-orange-500 text-[10px]">Items shrink (flex-shrink: 1)</Badge>
              <div className="flex gap-1 border-2 border-dashed border-orange-400 rounded-lg p-2 w-full">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <div
                    key={n}
                    className="bg-orange-500/20 border border-orange-500/40 rounded px-1 py-1.5 text-[8px] font-bold text-center flex-shrink"
                  >
                    {n}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground">
                Default: items shrink to fit. Content may become unreadable.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border p-4 space-y-3"
            >
              <Badge className="bg-emerald-500 text-[10px]">Items wrap (flex-wrap: wrap)</Badge>
              <div className="flex flex-wrap gap-1 border-2 border-dashed border-emerald-400 rounded-lg p-2 w-full">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <div
                    key={n}
                    className="bg-emerald-500/20 border border-emerald-500/40 rounded px-3 py-1.5 text-[10px] font-bold text-center"
                  >
                    {n}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground">
                With wrap: items flow to next line and keep their size.
              </p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* flex-flow shorthand */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">flex-flow Shorthand</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <code className="text-[11px] bg-muted px-1 rounded">flex-flow</code> is a shorthand for{" "}
            <code className="text-[11px] bg-muted px-1 rounded">flex-direction</code> +{" "}
            <code className="text-[11px] bg-muted px-1 rounded">flex-wrap</code>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {flexFlowExamples.map((ex, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-lg border p-3 flex items-center gap-3"
                >
                  <code className="text-[11px] text-primary font-bold whitespace-nowrap">
                    flex-flow: {ex.shorthand}
                  </code>
                  <span className="text-[10px] text-muted-foreground">{ex.desc}</span>
                </motion.div>
              ))}
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* flex-flow shorthand */

/* These are equivalent: */
.container {
  flex-direction: row;
  flex-wrap: wrap;
}
.container {
  flex-flow: row wrap;
}

/* More examples: */
.vertical-wrap {
  flex-flow: column wrap;
}
.reversed {
  flex-flow: row-reverse wrap;
}

/* Default value: */
.default {
  flex-flow: row nowrap;
}`}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All wrap values at a glance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Wrap Values at a Glance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {wrapValues.map((w, i) => (
              <motion.div
                key={w.value}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border p-3 space-y-2"
              >
                <code className="text-[10px] text-primary font-bold block text-center">{w.value}</code>
                <div
                  className={`flex ${tailwindWrapMap[w.value]} gap-1 border border-dashed border-zinc-400 rounded-lg p-2 ${
                    w.value === "nowrap" ? "overflow-hidden" : "min-h-[70px]"
                  }`}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div
                      key={n}
                      className="bg-primary/10 border border-primary/20 rounded px-2 py-1 text-[8px] font-bold shrink-0"
                    >
                      {n}
                    </div>
                  ))}
                </div>
                <p className="text-[9px] text-muted-foreground text-center">{w.desc.split(".")[0]}.</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key takeaways */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Takeaways</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { tip: "nowrap is the default", desc: "Flex items will shrink and potentially overflow without wrap." },
              { tip: "wrap enables responsive layouts", desc: "Combined with percentage or min-width, items reflow naturally on smaller screens." },
              { tip: "flex-flow is the shorthand", desc: "Combines flex-direction and flex-wrap: flex-flow: row wrap" },
              { tip: "wrap-reverse is rarely needed", desc: "Used when you want new lines to appear above/before existing ones." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-3 flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs font-bold">{item.tip}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
