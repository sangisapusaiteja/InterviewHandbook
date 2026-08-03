"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const comparisonRows = [
  { feature: "Dimension", grid: "Two-dimensional (rows + columns)", flexbox: "One-dimensional (row OR column)", winner: "grid" },
  { feature: "Layout Direction", grid: "Defines the whole grid structure upfront", flexbox: "Content flows in one direction", winner: "depends" },
  { feature: "Alignment Control", grid: "Controls both axes simultaneously", flexbox: "Primary axis + cross axis separately", winner: "grid" },
  { feature: "Item Placement", grid: "Explicit placement by line or area", flexbox: "Items flow sequentially", winner: "grid" },
  { feature: "Content vs Layout", grid: "Layout-first (structure drives content)", flexbox: "Content-first (content drives layout)", winner: "depends" },
  { feature: "Overlapping Items", grid: "Easy with grid lines", flexbox: "Requires negative margins or position", winner: "grid" },
  { feature: "Equal Heights", grid: "Natural (items in same row match)", flexbox: "align-items: stretch (default)", winner: "tie" },
  { feature: "Dynamic Item Count", grid: "Use auto-fill/auto-fit", flexbox: "flex-wrap handles it naturally", winner: "flexbox" },
  { feature: "Browser Support", grid: "All modern browsers (95%+)", flexbox: "All modern browsers (98%+)", winner: "tie" },
  { feature: "Complexity", grid: "More properties to learn", flexbox: "Simpler mental model", winner: "flexbox" },
];

const decisionFramework = [
  { question: "Do you need to control rows AND columns?", answer: "Grid", icon: "grid" },
  { question: "Is the layout one row or one column of items?", answer: "Flexbox", icon: "flex" },
  { question: "Do you need named template areas?", answer: "Grid", icon: "grid" },
  { question: "Are items flowing and wrapping naturally?", answer: "Flexbox", icon: "flex" },
  { question: "Do items need to overlap?", answer: "Grid", icon: "grid" },
  { question: "Is it a navigation bar or toolbar?", answer: "Flexbox", icon: "flex" },
  { question: "Is it a full page layout?", answer: "Grid", icon: "grid" },
  { question: "Do you need to center a single item?", answer: "Either (both work)", icon: "both" },
];

export function GridVsFlexboxVisualization() {
  const [showCombined, setShowCombined] = useState(false);

  return (
    <div className="space-y-6">
      {/* Comparison table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Grid vs Flexbox Comparison</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Grid and Flexbox are complementary layout systems. Grid excels at 2D page-level layout; Flexbox excels at 1D component-level alignment.
          </p>

          <div className="rounded-xl border overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_1fr_1fr] bg-muted/50 p-2 border-b">
              <span className="text-[10px] font-bold text-muted-foreground">Feature</span>
              <span className="text-[10px] font-bold text-blue-400 text-center">CSS Grid</span>
              <span className="text-[10px] font-bold text-orange-400 text-center">Flexbox</span>
            </div>

            {/* Table rows */}
            <div className="divide-y">
              {comparisonRows.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="grid grid-cols-[1fr_1fr_1fr] p-2 items-start"
                >
                  <span className="text-[10px] font-semibold">{row.feature}</span>
                  <span className={`text-[10px] text-center ${row.winner === "grid" ? "text-blue-400 font-bold" : "text-muted-foreground"}`}>{row.grid}</span>
                  <span className={`text-[10px] text-center ${row.winner === "flexbox" ? "text-orange-400 font-bold" : "text-muted-foreground"}`}>{row.flexbox}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 1D vs 2D visual */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">1D vs 2D: Visual Difference</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Flexbox 1D */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl border p-4 space-y-3"
            >
              <Badge className="bg-orange-500 text-[10px]">Flexbox: 1D Flow</Badge>
              <p className="text-[10px] text-muted-foreground">Items flow along one axis. Wrapping creates independent rows.</p>
              <div className="flex flex-wrap gap-1.5">
                {["Short", "Medium text", "A", "Longer content here", "B", "OK", "More text"].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-orange-500/20 border border-orange-500 rounded-md px-2 py-1.5"
                  >
                    <span className="text-[10px] font-bold text-orange-400">{text}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground">Each row is independent. Columns do NOT align vertically.</p>
            </motion.div>

            {/* Grid 2D */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl border p-4 space-y-3"
            >
              <Badge className="bg-blue-500 text-[10px]">Grid: 2D Structure</Badge>
              <p className="text-[10px] text-muted-foreground">Items are placed in a structured grid. Columns and rows align.</p>
              <div className="grid grid-cols-3 gap-1.5">
                {["Short", "Medium text", "A", "Longer", "B", "OK", "More", "Text", "End"].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-blue-500/20 border border-blue-500 rounded-md px-2 py-1.5 text-center"
                  >
                    <span className="text-[10px] font-bold text-blue-400">{text}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground">Columns are perfectly aligned across all rows.</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Decision framework */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Decision Framework</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground">
            When asked &quot;When do you use Grid vs Flexbox?&quot; in interviews, use this decision framework.
          </p>

          <div className="space-y-2">
            {decisionFramework.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border p-2.5 flex items-center gap-3"
              >
                <span className="text-[10px] text-muted-foreground flex-1">{item.question}</span>
                <Badge className={`text-[10px] shrink-0 ${
                  item.icon === "grid" ? "bg-blue-500" : item.icon === "flex" ? "bg-orange-500" : "bg-emerald-500"
                }`}>
                  {item.answer}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Using both together */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Using Grid + Flexbox Together</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setShowCombined(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !showCombined ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setShowCombined(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                showCombined ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              }`}
            >
              Code Example
            </button>
          </div>

          <motion.div
            key={showCombined ? "combined" : "overview"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {!showCombined ? (
              <div className="rounded-xl border p-4 space-y-3">
                <p className="text-xs text-muted-foreground">
                  In practice, you use both together. Grid handles the overall page layout, Flexbox handles component-level alignment within grid items.
                </p>

                {/* Visual example */}
                <div className="border-2 border-blue-500/30 rounded-lg p-2 space-y-2">
                  <p className="text-[10px] text-blue-400 font-bold text-center">Grid (page layout)</p>
                  {/* Header with flexbox inside */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-2">
                    <div className="flex items-center justify-between border border-dashed border-orange-500/50 rounded p-1.5">
                      <span className="text-[10px] text-orange-400 font-bold">Logo</span>
                      <div className="flex gap-1.5">
                        {["Home", "About", "Contact"].map((link, i) => (
                          <span key={i} className="text-[10px] text-orange-400">{link}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] text-orange-400 text-center mt-1">Flexbox (nav alignment)</p>
                  </div>
                  {/* Content area */}
                  <div className="flex gap-2">
                    <div className="w-[30%] bg-blue-500/10 border border-blue-500/30 rounded-md p-2 text-center">
                      <span className="text-[10px] text-muted-foreground">Sidebar</span>
                    </div>
                    <div className="flex-1 bg-blue-500/10 border border-blue-500/30 rounded-md p-2">
                      <div className="flex flex-wrap gap-1 border border-dashed border-orange-500/50 rounded p-1.5">
                        {["Card 1", "Card 2", "Card 3"].map((card, i) => (
                          <span key={i} className="bg-orange-500/10 border border-orange-500/30 rounded px-1.5 py-0.5 text-[10px] text-orange-400">{card}</span>
                        ))}
                      </div>
                      <p className="text-[10px] text-orange-400 text-center mt-1">Flexbox (card row)</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Grid for page layout */
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  min-height: 100vh;
}

/* Flexbox for nav bar (inside header) */
.header {
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
}

.nav-links {
  display: flex;
  gap: 16px;
}

/* Flexbox for card row (inside main) */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

/* Grid = page structure
   Flexbox = component alignment
   They work great together! */`}
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
