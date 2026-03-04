"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const containerProps = [
  { prop: "grid-template-columns", desc: "Defines column sizes and count", example: "1fr 1fr 1fr", category: "Sizing" },
  { prop: "grid-template-rows", desc: "Defines row sizes and count", example: "auto 1fr auto", category: "Sizing" },
  { prop: "grid-template-areas", desc: "Names regions of the grid", example: "\"header header\" \"sidebar main\"", category: "Sizing" },
  { prop: "gap", desc: "Sets spacing between tracks", example: "16px", category: "Spacing" },
  { prop: "justify-items", desc: "Aligns items along inline (row) axis", example: "start | center | end | stretch", category: "Alignment" },
  { prop: "align-items", desc: "Aligns items along block (column) axis", example: "start | center | end | stretch", category: "Alignment" },
  { prop: "justify-content", desc: "Aligns the grid within the container (row)", example: "start | center | space-between", category: "Alignment" },
  { prop: "align-content", desc: "Aligns the grid within the container (col)", example: "start | center | space-between", category: "Alignment" },
  { prop: "grid-auto-flow", desc: "Controls auto-placement algorithm", example: "row | column | dense", category: "Flow" },
  { prop: "grid-auto-rows", desc: "Size of implicitly created rows", example: "minmax(100px, auto)", category: "Flow" },
  { prop: "grid-auto-columns", desc: "Size of implicitly created columns", example: "1fr", category: "Flow" },
];

export function GridContainerVisualization() {
  const [displayType, setDisplayType] = useState<"grid" | "inline-grid">("grid");
  const [filterCat, setFilterCat] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(containerProps.map(p => p.category)))];
  const filteredProps = filterCat === "all" ? containerProps : containerProps.filter(p => p.category === filterCat);

  return (
    <div className="space-y-6">
      {/* display: grid vs inline-grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">display: grid vs inline-grid</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            {(["grid", "inline-grid"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setDisplayType(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  displayType === mode
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                display: {mode}
              </button>
            ))}
          </div>

          <motion.div
            key={displayType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              <Badge className={displayType === "grid" ? "bg-blue-500 text-[10px]" : "bg-purple-500 text-[10px]"}>
                {displayType === "grid" ? "Block-Level Grid" : "Inline-Level Grid"}
              </Badge>
              <p className="text-xs text-muted-foreground">
                {displayType === "grid"
                  ? "The container behaves as a block-level element. It takes the full width and starts on a new line."
                  : "The container behaves as an inline element. It only takes the space it needs and flows inline with other content."}
              </p>
              <div className="rounded-lg border p-3 bg-muted/30 space-y-2">
                <p className="text-[10px] text-muted-foreground">Text before</p>
                <div className={displayType === "grid" ? "border-2 border-blue-500 rounded-md p-2" : "inline-block border-2 border-purple-500 rounded-md p-2"}>
                  <div className="grid grid-cols-2 gap-1 w-32">
                    {[1, 2, 3, 4].map((n, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.06 }}
                        className={`${displayType === "grid" ? "bg-blue-500/20 border-blue-500" : "bg-purple-500/20 border-purple-500"} border rounded text-[10px] text-center p-1 font-mono`}
                      >
                        {n}
                      </motion.div>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground">Text after</p>
              </div>
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {displayType === "grid"
                ? `/* Block-level grid container */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
}

/* Takes full available width.
   Starts on a new line.
   Children become grid items. */`
                : `/* Inline-level grid container */
.container {
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
}

/* Only as wide as needed.
   Sits inline with text.
   Children still become grid items. */`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Container properties overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Container Properties Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all capitalize ${
                  filterCat === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filteredProps.map((item, i) => (
              <motion.div
                key={item.prop}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-lg border p-2.5 flex items-start gap-3"
              >
                <code className="text-[11px] text-primary font-bold shrink-0 min-w-[170px]">{item.prop}</code>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                  <code className="text-[10px] text-emerald-400 font-mono">{item.example}</code>
                </div>
                <Badge variant="outline" className="text-[8px] shrink-0">{item.category}</Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How container affects children */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How Grid Container Affects Children</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {[
              { rule: "Direct children become grid items", detail: "Only immediate children are affected. Nested elements are not grid items.", icon: "1" },
              { rule: "float, display: inline-block, vertical-align are ignored", detail: "Grid items ignore these legacy properties. display: grid overrides them.", icon: "2" },
              { rule: "Items are placed in grid cells automatically", detail: "By default, items fill cells left to right, top to bottom (grid-auto-flow: row).", icon: "3" },
              { rule: "Items stretch to fill their cell by default", detail: "Both justify-items and align-items default to stretch.", icon: "4" },
              { rule: "Anonymous grid items are created for text nodes", detail: "Plain text directly inside a grid container becomes its own grid item.", icon: "5" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-3 flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">{item.icon}</span>
                <div>
                  <p className="text-xs font-bold">{item.rule}</p>
                  <p className="text-[10px] text-muted-foreground">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`<div class="container">
  <!-- These become grid items: -->
  <header>Header</header>
  <nav>Sidebar</nav>
  <main>Content</main>
  <footer>Footer</footer>

  <!-- NOT a grid item (nested): -->
  <!-- <main><p>...</p></main> -->
  <!-- The <p> is NOT a grid item -->
</div>

.container {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
}`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
