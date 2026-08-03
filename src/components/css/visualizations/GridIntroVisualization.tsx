"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const gridTerms = [
  { term: "Grid Container", desc: "The element with display: grid. It becomes the context for grid layout.", color: "bg-blue-500" },
  { term: "Grid Item", desc: "Direct children of the grid container. They are placed into cells.", color: "bg-emerald-500" },
  { term: "Grid Line", desc: "The dividing lines between columns and rows. Numbered starting at 1.", color: "bg-orange-500" },
  { term: "Grid Track", desc: "A full row or column. The space between two adjacent grid lines.", color: "bg-purple-500" },
  { term: "Grid Cell", desc: "A single unit of the grid, the intersection of a row and column track.", color: "bg-rose-500" },
  { term: "Grid Area", desc: "A rectangular region spanning one or more cells, named or implicit.", color: "bg-cyan-500" },
];

export function GridIntroVisualization() {
  const [view, setView] = useState<"2d" | "1d">("2d");

  return (
    <div className="space-y-6">
      {/* What is CSS Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What is CSS Grid?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            CSS Grid is a two-dimensional layout system that lets you control both rows and columns simultaneously. It was designed for complex page layouts that were previously difficult or impossible with floats and positioning.
          </p>

          <div className="rounded-xl border p-4 space-y-3">
            <p className="text-xs font-bold">Problems Grid Solves</p>
            <div className="space-y-2">
              {[
                { problem: "Complex page layouts", solution: "Define rows AND columns in one system" },
                { problem: "Equal-height columns", solution: "Grid tracks stretch naturally" },
                { problem: "Centering content", solution: "place-items: center in one line" },
                { problem: "Responsive redesigns", solution: "Change grid-template-areas per breakpoint" },
                { problem: "Overlapping elements", solution: "Place items on the same cells" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-2 text-xs"
                >
                  <span className="text-red-400 shrink-0">&#10007;</span>
                  <span className="text-muted-foreground flex-1">{item.problem}</span>
                  <span className="text-emerald-400 shrink-0">&#10003;</span>
                  <span className="flex-1">{item.solution}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2D vs 1D comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Grid (2D) vs Flexbox (1D)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            {(["2d", "1d"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setView(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  view === mode
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {mode === "2d" ? "CSS Grid (2D)" : "Flexbox (1D)"}
              </button>
            ))}
          </div>

          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              {view === "2d" ? (
                <>
                  <Badge className="bg-blue-500 text-[10px]">Two-Dimensional</Badge>
                  <p className="text-xs text-muted-foreground">
                    Grid controls both rows and columns at the same time. Items can span across rows and columns, creating complex layouts.
                  </p>
                  <div className="grid grid-cols-3 grid-rows-3 gap-1.5">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} className="col-span-3 bg-blue-500/20 border border-blue-500 rounded-md p-2 text-[10px] text-center font-semibold text-blue-400">Header (3 cols)</motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="row-span-2 bg-purple-500/20 border border-purple-500 rounded-md p-2 text-[10px] text-center font-semibold text-purple-400">Sidebar (2 rows)</motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} className="col-span-2 bg-emerald-500/20 border border-emerald-500 rounded-md p-2 text-[10px] text-center font-semibold text-emerald-400">Main Content</motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} className="col-span-2 bg-orange-500/20 border border-orange-500 rounded-md p-2 text-[10px] text-center font-semibold text-orange-400">Footer</motion.div>
                  </div>
                </>
              ) : (
                <>
                  <Badge className="bg-orange-500 text-[10px]">One-Dimensional</Badge>
                  <p className="text-xs text-muted-foreground">
                    Flexbox works along a single axis at a time (either row or column). Great for component-level alignment.
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex gap-1.5">
                      {["A", "B", "C", "D"].map((item, i) => (
                        <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.08 }} className="flex-1 bg-orange-500/20 border border-orange-500 rounded-md p-2 text-[10px] text-center font-semibold text-orange-400">{item}</motion.div>
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground text-center">Row axis only (or column only)</p>
                  </div>
                </>
              )}
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {view === "2d"
                ? `/* CSS Grid: 2D layout */
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 10px;
}

.header  { grid-column: 1 / -1; }
.sidebar { grid-row: 2 / 4; }
.main    { grid-column: 2; }
.footer  { grid-column: 2; }`
                : `/* Flexbox: 1D layout */
.container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.item {
  flex: 1;
}

/* Only controls ONE axis
   at a time (row or column) */`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Grid Terminology */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Grid Terminology</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Visual diagram */}
          <div className="rounded-xl border p-4 space-y-3">
            <div className="relative">
              {/* Grid lines visual */}
              <div className="grid grid-cols-3 grid-rows-2 gap-0 border-2 border-dashed border-blue-400 rounded-lg overflow-hidden">
                {[1, 2, 3, 4, 5, 6].map((cell, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="border border-dashed border-blue-300/40 p-3 flex items-center justify-center"
                  >
                    <span className="text-[10px] text-muted-foreground font-mono">Cell {cell}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-2 flex gap-2 flex-wrap justify-center">
                <span className="text-[10px] text-blue-400 font-mono">Lines: 1--2--3--4 (cols)</span>
                <span className="text-[10px] text-purple-400 font-mono">Lines: 1--2--3 (rows)</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {gridTerms.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-2.5 flex items-start gap-3"
              >
                <span className={`w-2 h-2 rounded-full ${item.color} mt-1 shrink-0`} />
                <div>
                  <p className="text-xs font-bold">{item.term}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Basic grid example */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic Grid Example</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-3">
              <p className="text-xs font-bold">Result</p>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((n, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-blue-500/20 border border-blue-500 rounded-md p-3 text-center text-xs font-bold text-blue-400"
                  >
                    {n}
                  </motion.div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground">
                3 columns of equal width, items auto-placed into cells
              </p>
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}

/* Items are placed automatically
   into the next available cell.

   1fr = 1 fractional unit
   Each column gets equal space */`}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
