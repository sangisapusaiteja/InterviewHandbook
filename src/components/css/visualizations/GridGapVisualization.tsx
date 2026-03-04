"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type GapTab = "uniform" | "row-col" | "none";

export function GridGapVisualization() {
  const [gapTab, setGapTab] = useState<GapTab>("uniform");
  const [gapSize, setGapSize] = useState(16);

  return (
    <div className="space-y-6">
      {/* Interactive gap demo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">gap, row-gap, column-gap</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The gap property sets spacing between grid tracks (rows and columns). It does not add space on the outer edges.
          </p>

          <div className="flex gap-1.5 flex-wrap">
            {([
              { key: "uniform" as GapTab, label: "gap (uniform)" },
              { key: "row-col" as GapTab, label: "row-gap & column-gap" },
              { key: "none" as GapTab, label: "No gap" },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setGapTab(tab.key)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                  gapTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <motion.div
            key={gapTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              {gapTab === "uniform" && (
                <>
                  <Badge className="bg-blue-500 text-[10px]">Uniform Gap</Badge>
                  <p className="text-xs text-muted-foreground">
                    A single gap value sets equal spacing for both rows and columns.
                  </p>
                </>
              )}
              {gapTab === "row-col" && (
                <>
                  <Badge className="bg-purple-500 text-[10px]">Separate Row & Column Gaps</Badge>
                  <p className="text-xs text-muted-foreground">
                    Use row-gap and column-gap for different horizontal and vertical spacing.
                  </p>
                </>
              )}
              {gapTab === "none" && (
                <>
                  <Badge className="bg-zinc-500 text-[10px]">No Gap</Badge>
                  <p className="text-xs text-muted-foreground">
                    Without gap, grid items sit flush against each other with no spacing.
                  </p>
                </>
              )}

              {/* Visual grid */}
              <div
                className="grid grid-cols-3 border-2 border-dashed border-muted-foreground/20 rounded-lg p-2"
                style={{
                  gap: gapTab === "uniform" ? "12px" : gapTab === "row-col" ? "0px" : "0px",
                  rowGap: gapTab === "row-col" ? "20px" : undefined,
                  columnGap: gapTab === "row-col" ? "6px" : undefined,
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-blue-500/20 border border-blue-500 rounded-md p-2 text-center"
                  >
                    <span className="text-[10px] font-bold text-blue-400">{n}</span>
                  </motion.div>
                ))}
              </div>

              {gapTab === "row-col" && (
                <div className="flex gap-4 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-[2px] bg-orange-400 inline-block" /> row-gap: 20px
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-[2px] h-3 bg-cyan-400 inline-block" /> column-gap: 6px
                  </span>
                </div>
              )}
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {gapTab === "uniform"
                ? `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

/* gap is shorthand for:
   row-gap: 12px;
   column-gap: 12px;

   Also supports two values:
   gap: 20px 10px;
   = row-gap: 20px;
     column-gap: 10px;

   Old syntax (still works):
   grid-gap: 12px;
   grid-row-gap: 12px;
   grid-column-gap: 12px; */`
                : gapTab === "row-col"
                ? `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 20px;
  column-gap: 6px;
}

/* Different row and column gaps.

   Equivalent shorthand:
   gap: 20px 6px;
   (first = row, second = column)

   Useful when you want more
   vertical breathing room but
   tighter horizontal spacing. */`
                : `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
}

/* No spacing between items.
   Items sit flush against each
   other.

   Default gap is 0.
   No space on outer edges either
   (gap only affects BETWEEN tracks) */`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Interactive gap slider */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interactive Gap Sizing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold shrink-0">gap: {gapSize}px</label>
            <input
              type="range"
              min={0}
              max={40}
              value={gapSize}
              onChange={(e) => setGapSize(Number(e.target.value))}
              className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <motion.div
            className="grid grid-cols-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-2"
            style={{ gap: `${gapSize}px` }}
            layout
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => (
              <motion.div
                key={i}
                layout
                className="bg-emerald-500/20 border border-emerald-500 rounded-md p-3 text-center"
              >
                <span className="text-[10px] font-bold text-emerald-400">{n}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${gapSize}px;
}`}
          </div>
        </CardContent>
      </Card>

      {/* Gap vs Margin */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Gap vs Margin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground">
            Gap and margin both create space, but they work differently in grid layouts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gap */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl border p-4 space-y-3"
            >
              <Badge className="bg-emerald-500 text-[10px]">gap (Recommended)</Badge>
              <div className="space-y-1.5">
                {[
                  "Only creates space between items",
                  "No doubling of space at edges",
                  "Works with the grid layout system",
                  "Consistent spacing throughout",
                  "No collapsing margin issues",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px]">
                    <span className="text-emerald-400">&#10003;</span>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="border-2 border-emerald-500/30 rounded-lg p-1">
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((n, i) => (
                    <div key={i} className="bg-emerald-500/20 border border-emerald-500 rounded text-[10px] text-center p-1.5 text-emerald-400 font-bold">{n}</div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Margin */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl border p-4 space-y-3"
            >
              <Badge className="bg-orange-500 text-[10px]">margin (Avoid in Grid)</Badge>
              <div className="space-y-1.5">
                {[
                  "Adds space on ALL sides of items",
                  "Doubles space between adjacent items",
                  "Creates unwanted outer spacing",
                  "Doesn't respect grid tracks",
                  "Can cause overflow issues",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px]">
                    <span className="text-red-400">&#10007;</span>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="border-2 border-orange-500/30 rounded-lg p-1">
                <div className="grid grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((n, i) => (
                    <div key={i} className="m-1.5 bg-orange-500/20 border border-orange-500 rounded text-[10px] text-center p-1.5 text-orange-400 font-bold">{n}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Use gap (not margin) in grids */

/* GOOD: gap between tracks */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* AVOID: margin on grid items */
.container { display: grid; }
.item { margin: 8px; }
/* Creates 16px between items (doubled!)
   and 8px unwanted outer spacing */

/* gap only works BETWEEN tracks.
   Use padding on the container
   if you need outer spacing:
   .container { padding: 16px; gap: 16px; } */`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
