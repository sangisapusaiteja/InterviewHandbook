"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type AlignContentValue = "stretch" | "flex-start" | "flex-end" | "center" | "space-between" | "space-around";

const alignContentValues: {
  value: AlignContentValue;
  label: string;
  desc: string;
}[] = [
  {
    value: "stretch",
    label: "stretch",
    desc: "Default. Lines stretch to fill the remaining space in the cross axis.",
  },
  {
    value: "flex-start",
    label: "flex-start",
    desc: "Lines are packed at the start of the cross axis (top).",
  },
  {
    value: "flex-end",
    label: "flex-end",
    desc: "Lines are packed at the end of the cross axis (bottom).",
  },
  {
    value: "center",
    label: "center",
    desc: "Lines are centered in the cross axis.",
  },
  {
    value: "space-between",
    label: "space-between",
    desc: "First line at top, last line at bottom, equal space between lines.",
  },
  {
    value: "space-around",
    label: "space-around",
    desc: "Equal space around each line. Edges get half the gap.",
  },
];

const tailwindContentMap: Record<AlignContentValue, string> = {
  stretch: "content-stretch",
  "flex-start": "content-start",
  "flex-end": "content-end",
  center: "content-center",
  "space-between": "content-between",
  "space-around": "content-around",
};

const codeExamples: Record<AlignContentValue, string> = {
  stretch: `.container {
  display: flex;
  flex-wrap: wrap;
  align-content: stretch; /* default */
  height: 200px;
}

/* Each line stretches to fill
   its share of the cross axis.

   Requires: flex-wrap: wrap AND
   container has explicit height AND
   multiple lines of items. */`,
  "flex-start": `.container {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 200px;
}

/* All lines packed at the top.
   Extra space is at the bottom.

   |[1][2][3][4]              |
   |[5][6]                    |
   |                          |
   |                          | */`,
  "flex-end": `.container {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
  height: 200px;
}

/* All lines packed at bottom.
   Extra space is at the top.

   |                          |
   |                          |
   |[1][2][3][4]              |
   |[5][6]                    | */`,
  center: `.container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  height: 200px;
}

/* All lines centered vertically.

   |                          |
   |[1][2][3][4]              |
   |[5][6]                    |
   |                          | */`,
  "space-between": `.container {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  height: 200px;
}

/* First line at top, last at
   bottom. Equal space between.

   |[1][2][3][4]              |
   |                          |
   |                          |
   |[5][6]                    | */`,
  "space-around": `.container {
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  height: 200px;
}

/* Equal space around each line.

   |                          |
   |[1][2][3][4]              |
   |                          |
   |[5][6]                    |
   |                          | */`,
};

export function AlignContentVisualization() {
  const [alignContent, setAlignContent] = useState<AlignContentValue>("stretch");
  const [showComparison, setShowComparison] = useState(false);

  const current = alignContentValues.find((a) => a.value === alignContent)!;

  return (
    <div className="space-y-6">
      {/* When align-content applies */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">When Does align-content Apply?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            align-content only works when there are <strong>multiple lines</strong> of flex items. It requires three conditions to be met:
          </p>

          <div className="space-y-2">
            {[
              { step: "1", label: "flex-wrap: wrap", desc: "The container must allow wrapping to create multiple lines." },
              { step: "2", label: "Multiple lines exist", desc: "Items must actually overflow and wrap to a second (or more) line." },
              { step: "3", label: "Extra cross-axis space", desc: "The container must have more height than the lines need." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lg border p-3 flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                  {item.step}
                </span>
                <div>
                  <p className="text-xs font-bold">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-xl border bg-muted/30 p-3">
            <p className="text-[10px] text-muted-foreground">
              <span className="font-bold text-primary">Remember:</span> If your flex container is single-line (nowrap), align-content has no effect. Use align-items instead for single-line containers.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Interactive align-content demo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">align-content Values</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {alignContentValues.map((a) => (
              <button
                key={a.value}
                onClick={() => setAlignContent(a.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  alignContent === a.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>

          <motion.div
            key={alignContent}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Visual */}
            <div className="rounded-xl border p-4 space-y-3">
              <p className="text-[10px] text-muted-foreground">{current.desc}</p>

              <div
                className={`flex flex-wrap ${tailwindContentMap[alignContent]} gap-2 border-2 border-dashed border-blue-400 rounded-lg p-3 h-48`}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <motion.div
                    key={n}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: n * 0.03 }}
                    className="bg-blue-500/20 border border-blue-500/40 rounded-lg px-3 py-1.5 text-[10px] font-bold"
                  >
                    {n}
                  </motion.div>
                ))}
              </div>

              <Badge variant="outline" className="text-[9px]">
                flex-wrap: wrap + height: 200px
              </Badge>
            </div>

            {/* Code */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {codeExamples[alignContent]}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* align-items vs align-content comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">align-items vs align-content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            These two properties are commonly confused. They both work on the cross axis but affect different things.
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setShowComparison(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !showComparison ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              }`}
            >
              align-items
            </button>
            <button
              onClick={() => setShowComparison(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                showComparison ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              }`}
            >
              align-content
            </button>
          </div>

          <motion.div
            key={String(showComparison)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              <Badge className={showComparison ? "bg-purple-500 text-[10px]" : "bg-blue-500 text-[10px]"}>
                {showComparison ? "align-content: center" : "align-items: center"}
              </Badge>

              {showComparison ? (
                <div className="flex flex-wrap content-center gap-2 border-2 border-dashed border-purple-400 rounded-lg p-3 h-40">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className="bg-purple-500/20 border border-purple-500/40 rounded px-3 py-1.5 text-[10px] font-bold">
                      {n}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-2 border-2 border-dashed border-blue-400 rounded-lg p-3 h-40">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className={`bg-blue-500/20 border border-blue-500/40 rounded px-3 text-[10px] font-bold ${n % 2 === 0 ? "py-3" : "py-1"}`}>
                      {n}
                    </div>
                  ))}
                </div>
              )}

              <p className="text-[10px] text-muted-foreground">
                {showComparison
                  ? "align-content positions the wrapped LINES as a group within the container."
                  : "align-items positions each item WITHIN its line on the cross axis."}
              </p>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {showComparison
                ? `/* align-content */
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  height: 200px;
}

/* Affects: the LINES as a group
   Requires: flex-wrap + multi-line
   Controls: spacing between lines

   Think of it like justify-content
   but for the cross axis, working
   on lines instead of items. */`
                : `/* align-items */
.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 200px;
}

/* Affects: individual ITEMS
   Works: single-line & multi-line
   Controls: item position within
   each line

   Aligns each item within its
   own line on the cross axis. */`}
            </div>
          </motion.div>

          {/* Quick comparison table */}
          <div className="rounded-xl border overflow-hidden">
            <div className="grid grid-cols-3 text-[10px] font-bold bg-muted/50 p-2 border-b">
              <span>Property</span>
              <span>align-items</span>
              <span>align-content</span>
            </div>
            {[
              { label: "Affects", items: "Individual items", content: "Lines of items" },
              { label: "Works with", items: "Single or multi-line", content: "Multi-line only" },
              { label: "Requires wrap?", items: "No", content: "Yes" },
              { label: "Controls", items: "Position within line", content: "Line distribution" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 text-[10px] p-2 border-b last:border-b-0">
                <span className="font-bold text-muted-foreground">{row.label}</span>
                <span>{row.items}</span>
                <span>{row.content}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interview tip */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Takeaways</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { tip: "align-content needs multi-line flex", desc: "It requires flex-wrap: wrap AND items that actually wrap to multiple lines." },
              { tip: "It controls line distribution, not item position", desc: "Think of it as justify-content for the cross axis, applied to lines." },
              { tip: "align-items and align-content can work together", desc: "align-content positions lines; align-items positions items within each line." },
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
