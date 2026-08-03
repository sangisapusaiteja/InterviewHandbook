"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type PatternTab = "dashboard" | "gallery" | "magazine" | "cards";

const patternTabs: { key: PatternTab; label: string }[] = [
  { key: "dashboard", label: "Dashboard" },
  { key: "gallery", label: "Image Gallery" },
  { key: "magazine", label: "Magazine" },
  { key: "cards", label: "Responsive Cards" },
];

const interviewTips = [
  { tip: "Start with grid-template-areas for layout questions", detail: "It shows you understand semantic layout naming and is easy to explain verbally." },
  { tip: "Mention responsive design with auto-fit/auto-fill", detail: "Shows awareness of fluid layouts without media queries." },
  { tip: "Explain why Grid over Flexbox for 2D layouts", detail: "Grid controls rows and columns together; Flexbox is one-dimensional." },
  { tip: "Know the fr unit and minmax() well", detail: "These are the most commonly asked grid-specific concepts." },
  { tip: "Be ready to combine Grid and Flexbox", detail: "Real apps use Grid for page layout and Flexbox for component alignment." },
];

export function GridPatternsVisualization() {
  const [activeTab, setActiveTab] = useState<PatternTab>("dashboard");

  return (
    <div className="space-y-6">
      {/* Interactive pattern demos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Grid Patterns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Real-world grid patterns you should know for interviews and production work. Click each tab to see the layout and its code.
          </p>

          <div className="flex gap-1.5 flex-wrap">
            {patternTabs.map((tab) => (
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
            {/* Visual pattern */}
            <div className="rounded-xl border p-4 space-y-3">
              {activeTab === "dashboard" && (
                <>
                  <Badge className="bg-blue-500 text-[10px]">Dashboard Layout</Badge>
                  <p className="text-xs text-muted-foreground">
                    A typical admin dashboard with stat cards, a main chart, and a sidebar widget. Uses named areas and spanning.
                  </p>
                  <div className="space-y-1.5 border-2 border-dashed border-muted-foreground/20 rounded-lg p-1.5">
                    {/* Stats row */}
                    <div className="grid grid-cols-4 gap-1.5">
                      {["Users", "Revenue", "Orders", "Growth"].map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.06 }}
                          className="bg-blue-500/20 border border-blue-500 rounded-md p-2 text-center"
                        >
                          <span className="text-[10px] font-bold text-blue-400">{stat}</span>
                          <span className="block text-[10px] text-muted-foreground mt-0.5">Card</span>
                        </motion.div>
                      ))}
                    </div>
                    {/* Chart + sidebar row */}
                    <div className="flex gap-1.5">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex-[3] bg-emerald-500/20 border border-emerald-500 rounded-md p-4 text-center origin-left"
                      >
                        <span className="text-[10px] font-bold text-emerald-400">Main Chart</span>
                        <span className="block text-[10px] text-muted-foreground mt-0.5">Spans 3 columns</span>
                      </motion.div>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex-[1] bg-purple-500/20 border border-purple-500 rounded-md p-4 text-center origin-left"
                      >
                        <span className="text-[10px] font-bold text-purple-400">Widget</span>
                      </motion.div>
                    </div>
                    {/* Table row */}
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.5 }}
                      className="bg-orange-500/20 border border-orange-500 rounded-md p-3 text-center origin-top"
                    >
                      <span className="text-[10px] font-bold text-orange-400">Data Table (full width)</span>
                    </motion.div>
                  </div>
                </>
              )}

              {activeTab === "gallery" && (
                <>
                  <Badge className="bg-emerald-500 text-[10px]">Image Gallery</Badge>
                  <p className="text-xs text-muted-foreground">
                    A masonry-style gallery where featured images span multiple cells. Uses grid-column and grid-row spanning.
                  </p>
                  <div className="grid grid-cols-4 grid-rows-3 gap-1.5 border-2 border-dashed border-muted-foreground/20 rounded-lg p-1.5">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.05 }} className="col-span-2 row-span-2 bg-emerald-500/20 border border-emerald-500 rounded-md p-3 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-emerald-400">Featured (2x2)</span>
                    </motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} className="bg-blue-500/20 border border-blue-500 rounded-md p-2 flex items-center justify-center">
                      <span className="text-[10px] text-blue-400">Img</span>
                    </motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15 }} className="bg-blue-500/20 border border-blue-500 rounded-md p-2 flex items-center justify-center">
                      <span className="text-[10px] text-blue-400">Img</span>
                    </motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="bg-blue-500/20 border border-blue-500 rounded-md p-2 flex items-center justify-center">
                      <span className="text-[10px] text-blue-400">Img</span>
                    </motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.25 }} className="bg-purple-500/20 border border-purple-500 rounded-md p-2 flex items-center justify-center">
                      <span className="text-[10px] text-purple-400">Img</span>
                    </motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} className="col-span-2 bg-orange-500/20 border border-orange-500 rounded-md p-2 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-orange-400">Wide (2 cols)</span>
                    </motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.35 }} className="bg-blue-500/20 border border-blue-500 rounded-md p-2 flex items-center justify-center">
                      <span className="text-[10px] text-blue-400">Img</span>
                    </motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} className="bg-blue-500/20 border border-blue-500 rounded-md p-2 flex items-center justify-center">
                      <span className="text-[10px] text-blue-400">Img</span>
                    </motion.div>
                  </div>
                </>
              )}

              {activeTab === "magazine" && (
                <>
                  <Badge className="bg-purple-500 text-[10px]">Magazine Layout</Badge>
                  <p className="text-xs text-muted-foreground">
                    A content-heavy layout with a hero section, featured article, and sidebar articles. Common in news and blog sites.
                  </p>
                  <div className="space-y-1.5 border-2 border-dashed border-muted-foreground/20 rounded-lg p-1.5">
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} className="bg-rose-500/20 border border-rose-500 rounded-md p-4 text-center origin-top">
                      <span className="text-[10px] font-bold text-rose-400">Hero Article (full width)</span>
                    </motion.div>
                    <div className="grid grid-cols-3 gap-1.5">
                      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.15 }} className="col-span-2 row-span-2 bg-purple-500/20 border border-purple-500 rounded-md p-4 text-center origin-left">
                        <span className="text-[10px] font-bold text-purple-400">Featured Story</span>
                        <span className="block text-[10px] text-muted-foreground mt-1">Spans 2 cols, 2 rows</span>
                      </motion.div>
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="bg-cyan-500/20 border border-cyan-500 rounded-md p-2 text-center">
                        <span className="text-[10px] text-cyan-400">Side 1</span>
                      </motion.div>
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.25 }} className="bg-cyan-500/20 border border-cyan-500 rounded-md p-2 text-center">
                        <span className="text-[10px] text-cyan-400">Side 2</span>
                      </motion.div>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {["Article", "Article", "Article"].map((item, i) => (
                        <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.35 + i * 0.05 }} className="bg-blue-500/20 border border-blue-500 rounded-md p-2 text-center">
                          <span className="text-[10px] text-blue-400">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "cards" && (
                <>
                  <Badge className="bg-orange-500 text-[10px]">Responsive Card Grid</Badge>
                  <p className="text-xs text-muted-foreground">
                    Cards that automatically reflow from 1 to 4 columns based on container width. Uses auto-fit and minmax() -- no media queries needed.
                  </p>
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-muted-foreground">4 columns (wide)</p>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[1, 2, 3, 4].map((n, i) => (
                        <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.06 }} className="bg-orange-500/20 border border-orange-500 rounded-md p-2 text-center">
                          <span className="text-[10px] font-bold text-orange-400">Card {n}</span>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-[10px] font-bold text-muted-foreground">2 columns (medium)</p>
                    <div className="grid grid-cols-2 gap-1.5 max-w-[60%]">
                      {[1, 2, 3, 4].map((n, i) => (
                        <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.06 }} className="bg-orange-500/20 border border-orange-500 rounded-md p-2 text-center">
                          <span className="text-[10px] font-bold text-orange-400">Card {n}</span>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-[10px] font-bold text-muted-foreground">1 column (narrow)</p>
                    <div className="grid grid-cols-1 gap-1.5 max-w-[30%]">
                      {[1, 2].map((n, i) => (
                        <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 + i * 0.06 }} className="bg-orange-500/20 border border-orange-500 rounded-md p-2 text-center">
                          <span className="text-[10px] font-bold text-orange-400">Card {n}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Code */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {activeTab === "dashboard"
                ? `/* Dashboard Layout */
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "stat1 stat2 stat3 stat4"
    "chart chart chart widget"
    "table table table table";
  gap: 16px;
  padding: 16px;
}

.stat-card:nth-child(1) {
  grid-area: stat1;
}
.stat-card:nth-child(2) {
  grid-area: stat2;
}
.chart  { grid-area: chart; }
.widget { grid-area: widget; }
.table  { grid-area: table; }`
                : activeTab === "gallery"
                ? `/* Image Gallery with Spanning */
.gallery {
  display: grid;
  grid-template-columns:
    repeat(4, 1fr);
  grid-auto-rows: 150px;
  gap: 8px;
}

/* Featured large image */
.gallery .featured {
  grid-column: span 2;
  grid-row: span 2;
}

/* Wide panoramic image */
.gallery .wide {
  grid-column: span 2;
}

/* Tall portrait image */
.gallery .tall {
  grid-row: span 2;
}

/* All images fill their cell */
.gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}`
                : activeTab === "magazine"
                ? `/* Magazine / Blog Layout */
.magazine {
  display: grid;
  grid-template-columns:
    repeat(3, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    "hero    hero    hero"
    "feature feature side1"
    "feature feature side2"
    "art1    art2    art3";
  gap: 16px;
}

.hero    { grid-area: hero; }
.feature { grid-area: feature; }
.side1   { grid-area: side1; }
.side2   { grid-area: side2; }

/* Or use implicit spanning: */
.feature {
  grid-column: 1 / 3;
  grid-row: 2 / 4;
}`
                : `/* Responsive Cards (no media queries!) */
.card-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

/* How it works:
   Container 1000px wide:
   1000 / 250 = 4 columns

   Container 600px wide:
   600 / 250 = 2 columns

   Container 300px wide:
   300 / 250 = 1 column

   auto-fit collapses empty tracks
   so cards expand to fill space.

   minmax(250px, 1fr):
   - minimum 250px per card
   - grows with 1fr if extra space

   This is the MOST useful grid
   pattern for responsive design! */`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Interview tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Tips for CSS Grid</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            {interviewTips.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-3 flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                <div>
                  <p className="text-xs font-bold">{item.tip}</p>
                  <p className="text-[10px] text-muted-foreground">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Quick reference: Most-used patterns */

/* 1. Equal columns */
grid-template-columns: repeat(3, 1fr);

/* 2. Sidebar + main */
grid-template-columns: 250px 1fr;

/* 3. Responsive cards */
grid-template-columns:
  repeat(auto-fit, minmax(250px, 1fr));

/* 4. Full-page layout */
grid-template:
  "header header" auto
  "sidebar main" 1fr
  "footer footer" auto
  / 250px 1fr;

/* 5. Centering anything */
display: grid;
place-items: center;`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
