"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ColumnTab = "fixed" | "fr" | "repeat" | "auto-fill" | "auto-fit" | "minmax";

const tabs: { key: ColumnTab; label: string }[] = [
  { key: "fixed", label: "Fixed (px)" },
  { key: "fr", label: "fr Units" },
  { key: "repeat", label: "repeat()" },
  { key: "auto-fill", label: "auto-fill" },
  { key: "auto-fit", label: "auto-fit" },
  { key: "minmax", label: "minmax()" },
];

const tabData: Record<ColumnTab, { badge: string; badgeColor: string; desc: string; columns: string[]; widthLabels: string[]; code: string }> = {
  fixed: {
    badge: "Absolute Sizing",
    badgeColor: "bg-blue-500",
    desc: "Fixed pixel widths give exact column sizes. Not responsive -- columns won't shrink below their set width.",
    columns: ["w-[100px]", "w-[200px]", "w-[150px]"],
    widthLabels: ["100px", "200px", "150px"],
    code: `.container {
  display: grid;
  grid-template-columns: 100px 200px 150px;
  gap: 8px;
}

/* Fixed sizes:
   - Exact pixel widths
   - Not responsive
   - Can cause overflow */`,
  },
  fr: {
    badge: "Fractional Unit",
    badgeColor: "bg-emerald-500",
    desc: "The fr unit distributes remaining space proportionally. 1fr 2fr 1fr means the middle column gets double the space of the others.",
    columns: ["flex-[1]", "flex-[2]", "flex-[1]"],
    widthLabels: ["1fr", "2fr", "1fr"],
    code: `.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 8px;
}

/* fr = fractional unit
   Total fractions: 1+2+1 = 4
   Col 1: 1/4 = 25%
   Col 2: 2/4 = 50%
   Col 3: 1/4 = 25% */`,
  },
  repeat: {
    badge: "Repeat Notation",
    badgeColor: "bg-purple-500",
    desc: "repeat(count, track-size) avoids writing the same track size multiple times. repeat(3, 1fr) is the same as 1fr 1fr 1fr.",
    columns: ["flex-1", "flex-1", "flex-1", "flex-1"],
    widthLabels: ["1fr", "1fr", "1fr", "1fr"],
    code: `.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

/* Shorthand for:
   1fr 1fr 1fr 1fr

   Can also mix:
   repeat(3, 1fr) 200px
   = 1fr 1fr 1fr 200px */`,
  },
  "auto-fill": {
    badge: "Auto Fill",
    badgeColor: "bg-orange-500",
    desc: "auto-fill creates as many columns as possible of the given size. Empty tracks are preserved even if there are no items to fill them.",
    columns: ["flex-1", "flex-1", "flex-1"],
    widthLabels: ["150px", "150px", "150px", "(empty)"],
    code: `.container {
  display: grid;
  grid-template-columns:
    repeat(auto-fill, minmax(150px, 1fr));
  gap: 8px;
}

/* auto-fill:
   - Creates tracks to fill container
   - Keeps EMPTY tracks
   - Tracks have minimum 150px width
   - Grow with 1fr if extra space */`,
  },
  "auto-fit": {
    badge: "Auto Fit",
    badgeColor: "bg-rose-500",
    desc: "auto-fit works like auto-fill but collapses empty tracks to 0. This lets existing items expand to fill the remaining space.",
    columns: ["flex-1", "flex-1", "flex-1"],
    widthLabels: ["stretches", "stretches", "stretches"],
    code: `.container {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
}

/* auto-fit:
   - Creates tracks to fill container
   - COLLAPSES empty tracks to 0
   - Items stretch to fill space
   - Best for responsive grids! */`,
  },
  minmax: {
    badge: "Min-Max Sizing",
    badgeColor: "bg-cyan-500",
    desc: "minmax(min, max) sets a size range. The track will be at least min and at most max. Perfect for responsive column widths.",
    columns: ["flex-1", "flex-1", "flex-1"],
    widthLabels: ["200px-1fr", "200px-1fr", "200px-1fr"],
    code: `.container {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(200px, 1fr));
  gap: 8px;
}

/* minmax(min, max):
   - min: smallest the track can be
   - max: largest the track can be
   - minmax(0, 1fr) = just 1fr
   - minmax(200px, 1fr) = responsive! */`,
  },
};

export function GridTemplateColumnsVisualization() {
  const [activeTab, setActiveTab] = useState<ColumnTab>("fixed");

  const data = tabData[activeTab];

  return (
    <div className="space-y-6">
      {/* Main interactive section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">grid-template-columns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Defines the number and size of columns in the grid. Choose a sizing method below to see how it works.
          </p>

          {/* Tabs */}
          <div className="flex gap-1.5 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                  activeTab === tab.key
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
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Visual */}
            <div className="rounded-xl border p-4 space-y-3">
              <Badge className={`${data.badgeColor} text-[10px]`}>{data.badge}</Badge>
              <p className="text-xs text-muted-foreground">{data.desc}</p>

              {/* Column visualization */}
              <div className="space-y-2">
                <div className="flex gap-1.5">
                  {data.columns.map((col, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`${
                        activeTab === "fixed"
                          ? i === 0 ? "w-[60px]" : i === 1 ? "w-[120px]" : "w-[90px]"
                          : activeTab === "fr"
                          ? i === 1 ? "flex-[2]" : "flex-[1]"
                          : "flex-1"
                      } bg-blue-500/20 border border-blue-500 rounded-md p-2 text-center origin-left`}
                    >
                      <span className="text-[10px] font-bold text-blue-400">{data.widthLabels[i]}</span>
                    </motion.div>
                  ))}
                  {activeTab === "auto-fill" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex-1 border border-dashed border-blue-300/30 rounded-md p-2 text-center"
                    >
                      <span className="text-[10px] text-muted-foreground">(empty track)</span>
                    </motion.div>
                  )}
                </div>

                {/* Second row of items */}
                <div className="flex gap-1.5">
                  {data.columns.map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className={`${
                        activeTab === "fixed"
                          ? i === 0 ? "w-[60px]" : i === 1 ? "w-[120px]" : "w-[90px]"
                          : activeTab === "fr"
                          ? i === 1 ? "flex-[2]" : "flex-[1]"
                          : "flex-1"
                      } bg-emerald-500/20 border border-emerald-500 rounded-md p-2 text-center`}
                    >
                      <span className="text-[10px] font-mono text-emerald-400">Item {i + data.columns.length + 1}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Code */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {data.code}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* fr unit deep dive */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Understanding fr Units</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground">
            The <code className="text-primary font-mono text-[11px]">fr</code> unit distributes <strong>remaining free space</strong> after fixed-size tracks are allocated.
          </p>

          <div className="rounded-xl border p-4 space-y-3">
            <p className="text-[10px] font-bold text-muted-foreground">Container: 600px wide</p>

            {/* Example 1 */}
            <div className="space-y-1">
              <code className="text-[10px] text-primary font-mono">grid-template-columns: 200px 1fr 1fr</code>
              <div className="flex gap-1">
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="w-[33%] bg-orange-500/20 border border-orange-500 rounded p-1.5 text-center origin-left">
                  <span className="text-[10px] text-orange-400 font-bold">200px (fixed)</span>
                </motion.div>
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.1 }} className="flex-1 bg-blue-500/20 border border-blue-500 rounded p-1.5 text-center origin-left">
                  <span className="text-[10px] text-blue-400 font-bold">1fr (200px)</span>
                </motion.div>
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2 }} className="flex-1 bg-blue-500/20 border border-blue-500 rounded p-1.5 text-center origin-left">
                  <span className="text-[10px] text-blue-400 font-bold">1fr (200px)</span>
                </motion.div>
              </div>
              <p className="text-[10px] text-muted-foreground">600 - 200 = 400px remaining, split into 2fr = 200px each</p>
            </div>

            {/* Example 2 */}
            <div className="space-y-1 pt-2 border-t">
              <code className="text-[10px] text-primary font-mono">grid-template-columns: 1fr 2fr 1fr</code>
              <div className="flex gap-1">
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="flex-[1] bg-purple-500/20 border border-purple-500 rounded p-1.5 text-center origin-left">
                  <span className="text-[10px] text-purple-400 font-bold">1fr (150px)</span>
                </motion.div>
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.1 }} className="flex-[2] bg-purple-500/20 border border-purple-500 rounded p-1.5 text-center origin-left">
                  <span className="text-[10px] text-purple-400 font-bold">2fr (300px)</span>
                </motion.div>
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2 }} className="flex-[1] bg-purple-500/20 border border-purple-500 rounded p-1.5 text-center origin-left">
                  <span className="text-[10px] text-purple-400 font-bold">1fr (150px)</span>
                </motion.div>
              </div>
              <p className="text-[10px] text-muted-foreground">600px total, 4 fractions: 1/4=150, 2/4=300, 1/4=150</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* auto-fill vs auto-fit comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">auto-fill vs auto-fit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground">
            Both create responsive grids, but they handle leftover space differently.
          </p>

          <div className="space-y-3">
            {/* auto-fill */}
            <div className="rounded-xl border p-3 space-y-2">
              <Badge className="bg-orange-500 text-[10px]">auto-fill</Badge>
              <p className="text-[10px] text-muted-foreground">Keeps empty tracks -- items stay at their minimum size.</p>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((n, i) => (
                  <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.08 }} className="w-[80px] bg-orange-500/20 border border-orange-500 rounded p-1.5 text-center shrink-0">
                    <span className="text-[10px] font-bold text-orange-400">{n}</span>
                  </motion.div>
                ))}
                <div className="flex-1 border border-dashed border-orange-300/20 rounded p-1.5 text-center">
                  <span className="text-[10px] text-muted-foreground">empty tracks</span>
                </div>
              </div>
            </div>

            {/* auto-fit */}
            <div className="rounded-xl border p-3 space-y-2">
              <Badge className="bg-rose-500 text-[10px]">auto-fit</Badge>
              <p className="text-[10px] text-muted-foreground">Collapses empty tracks -- items expand to fill the row.</p>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((n, i) => (
                  <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.08 }} className="flex-1 bg-rose-500/20 border border-rose-500 rounded p-1.5 text-center">
                    <span className="text-[10px] font-bold text-rose-400">{n}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* auto-fill: keeps empty tracks */
.grid-fill {
  grid-template-columns:
    repeat(auto-fill, minmax(150px, 1fr));
}

/* auto-fit: collapses empty tracks */
.grid-fit {
  grid-template-columns:
    repeat(auto-fit, minmax(150px, 1fr));
}

/* Key difference:
   With 3 items in a 900px container
   and minmax(150px, 1fr):

   auto-fill: 6 tracks (3 empty)
              items stay 150px
   auto-fit:  3 tracks (expanded)
              items grow to 300px */`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
